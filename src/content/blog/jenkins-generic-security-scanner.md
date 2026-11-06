---
title: "Building a Jenkins security scanner that starts with a repository URL"
description: "Inside my generic DevSecOps pipeline: project profiling, conditional scanners, SBOMs, and a shared HTML report, with an honest look at the current implementation."
date: "2026-11-07"
updated: "2026-11-07"
author: "Yash Bhangale"
tags: ["DevSecOps", "Jenkins", "Trivy", "Semgrep", "SBOM", "Security Automation", "Docker"]
category: "DevSecOps"
image: "/blog/images/jenkins-security-scanner/cover.png"
imageWidth: 1280
imageHeight: 702
imageAlt: "Security scanner architecture: a repository profiler selects relevant tools and feeds their results into reports and delivery channels"
---

I wanted a security pipeline where the first question was simply: which repository do you want to scan?

Normally, that turns into several other questions. Does it contain Terraform? Are there Kubernetes manifests? Which dependency scanner should run? Where should the reports go? Repeating those decisions in every project's Jenkinsfile felt unnecessary.

So I built a generic pipeline that accepts a repository URL, profiles the project, and chooses relevant scanning stages. The code is open source in [security-scanner](https://github.com/yashbhangale/security-scanner).

The architecture above captures the broader design. The current public Jenkinsfile runs **conditional sequential stages**, rather than parallel fan-out. It publishes Jenkins artifacts and supports email delivery. Parallel execution and Slack delivery are extensions to that implementation, not features I want to imply are already present in the released pipeline.

## 1. Give Jenkins a consistent entry point

The job takes `REPO_URL` and `BRANCH`, with optional email and SonarQube settings. It also has a `SCAN_LEVEL` choice: `basic` or `full`.

The pipeline checks out the scanner tooling and the target repository separately. That separation is useful: I can update the scanning workflow without requiring every application repository to adopt a new pipeline file.

To reproduce the setup, start with the repository's Docker and Jenkins instructions, configure the required Jenkins plugins and credentials, and create a Pipeline job using its Jenkinsfile. Configure SonarQube separately if you want that stage, then trigger a build with a test repository you control.

The target's source is input to the scanners. It should not automatically become a trusted Jenkins pipeline or gain access to the scanner job's credentials.

## 2. Profile the repository before selecting tools

The project profiler is the part I found most interesting to build. It examines files and project markers to identify languages, frameworks, and infrastructure, then writes `project-profile.json`.

It is a practical heuristic. A Dockerfile is a useful signal for Docker linting; Terraform files are useful signals for IaC checks. Matching YAML patterns is less precise than fully understanding a deployment, so I expect detection to need refinement as more repositories pass through it.

The full profile currently includes several broad scanners by default and adds infrastructure-specific ones when it finds relevant markers:

| Tool | Role in this pipeline |
| --- | --- |
| Trivy | Broad filesystem vulnerability and configuration scanning |
| Gitleaks | Potential secret detection |
| Semgrep | Static analysis of source code |
| SonarQube | Code analysis, with server and project configuration |
| Syft | Software bill of materials generation |
| Grype | Vulnerability analysis using the inventory |
| Checkov | Infrastructure configuration checks |
| Hadolint | Dockerfile linting |
| kube-linter | Kubernetes manifest checks |

The profiler recommends Checkov for supported infrastructure markers, Hadolint when Dockerfiles are present, and kube-linter for Kubernetes-related content. The basic pipeline mode narrows execution to Trivy and Gitleaks. SonarQube also depends on its configured project settings.

That is more accurate than saying every tool is selected independently from a perfect understanding of the project. The implementation is deliberately inspectable in [project-profiler.sh](https://github.com/yashbhangale/security-scanner/blob/main/scripts/project-profiler.sh).

## 3. Make execution dependencies explicit

My initial description of this project emphasized running scans in parallel. Looking at the published implementation, the stages currently execute in sequence and use conditions to skip irrelevant work.

![My Jenkins Stage View showing separate scanning stages, completed runs, and skipped stages](/blog/images/jenkins-security-scanner/stage-view.png)

Parallelizing independent checks is a reasonable next step, but I would preserve real dependencies. In particular, the SBOM needs to exist before a stage that consumes it. Shared output paths also need to be separated so two scanners cannot overwrite one another's files.

Jenkins supports [parallel and conditional stages](https://www.jenkins.io/doc/book/pipeline/syntax/). The pipeline structure should express those relationships rather than wrapping every command in a parallel block and hoping the artifacts arrive in time.

I have not measured a scan-time improvement that I can responsibly attach to this article. The immediate benefit is a reusable entry point and consistent stage selection.

## 4. Preserve raw results alongside the dashboard

The reporting stage reads the scanner reports and renders an HTML dashboard. Jenkins archives the output directory and publishes the HTML report. When an email recipient is configured, the job sends the HTML report as an attachment.

The output collection includes formats such as JSON, SARIF, and SBOM artifacts, depending on the scanner. That does not mean every tool produces every format, or that all findings have identical meanings. A secret alert, a Dockerfile lint warning, and a vulnerable package need different follow-up.

I want the dashboard to be an entry point into the evidence. Keeping original artifacts lets an engineer inspect the rule, affected file or package, and scanner details instead of relying only on a summary count.

For reproducibility, a production rollout should also record the source commit, tool versions, rulesets, and vulnerability database freshness. Otherwise two scans of the same source can look different without any explanation.

## 5. Keep execution status separate from security status

A completed Jenkins job does not prove that an application is secure. A scanner can find issues successfully, fail to run, or produce no usable report. Those conditions need different treatment.

The current pipeline allows missing HTML output and empty artifact archives in its publishing steps. That is convenient during development, but report publication alone is not a coverage gate.

Before adopting it as an organizational control, I would define required scanners, fail explicitly on missing required results, and distinguish tool errors from policy violations. Then I would introduce agreed severity thresholds and an exception process. A green stage should have a documented meaning.

## 6. Treat repository scanning as a trust boundary

Docker helps package the toolchain consistently. It does not automatically make an untrusted repository safe to process.

For an internal rollout, I would validate repository URLs and branches, isolate workers, scope checkout credentials, and avoid executing the target repository's build scripts by default. Credentials belong in the [Jenkins credential system](https://www.jenkins.io/doc/book/security/credentials/), with access limited to the stages that need them.

Repository contents and scanner output should also be treated as untrusted input when creating shell commands, rendering HTML, or generating notifications. Public scan reports can expose source paths, package inventories, and potential secrets, so report access needs deliberate configuration.

## Where I want to take it next

The next useful additions are dependency and license policies, clearer prioritization, and independent-stage parallelism. AI-assisted summaries could help explain findings, provided they retain references to the original evidence and do not invent fixes.

Slack is another delivery adapter I would add after defining who receives which results. It appears in the architecture, but the current Jenkinsfile's notification stage is email-based.

The [public project](https://github.com/yashbhangale/security-scanner) is a working starting point for that internal scanner workflow. The part I would preserve as it grows is the profiler: first understand enough about the repository to choose useful work, then make the results easy to inspect.
