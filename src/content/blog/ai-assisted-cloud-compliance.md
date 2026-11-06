---
title: "Building an AI-assisted workflow for cloud audit evidence"
description: "How I combined read-only AWS collectors, repeatable control checks, and AI-assisted documentation to make cloud audit preparation less manual."
date: "2026-11-07"
updated: "2026-11-07"
author: "Yash Bhangale"
tags: ["AWS", "AI Agents", "Cloud Security", "Compliance", "Boto3", "Kiro", "DevSecOps"]
category: "Cloud Security"
image: "/blog/images/ai-compliance/cover.png"
imageWidth: 1600
imageHeight: 900
imageAlt: "Read-only AWS evidence collection followed by control checks, snapshot comparison, AI-assisted drafting, and human review"
---

Audit preparation has a particular kind of repetition. Open a console, find a setting, collect evidence, explain what it means, and update a document. Then do it again for another account. By the next audit cycle, some of those documents are already out of date.

I wanted to explore how much of that work could become a repeatable engineering workflow. The result was an experiment combining AWS APIs, Python collectors, control definitions, and an AI agent that helps interpret evidence and draft documentation.

I developed it using **Kiro**. The useful part is portable: the prompts, context, and evidence workflow can also be used in other agentic coding environments. I published the implementation in [ai-compliance-copilot](https://github.com/yashbhangale/ai-compliance-copilot).

This is an account of the experiment and a practical way to try it. It is not a claim that an agent certified an environment or replaced an auditor.

## 1. Start with questions that infrastructure can answer

I began with checks that have observable technical evidence: encryption settings, logging configuration, IAM configuration, network exposure, and backup policies.

A question such as “is encryption enabled on these resources?” can be translated into API queries and an explicit rule. “Does the organization have an effective security culture?” cannot be established by listing AWS resources.

That distinction kept the scope manageable. The toolkit includes check modules for IAM, encryption, logging, networking, and backups. Each module gathers a defined slice of information rather than asking a model to guess the state of the account.

For a new control, I would first write down:

1. The requirement and the accounts and Regions it covers.
2. The API fields needed to evaluate it.
3. The rule that produces a result.
4. Exceptions, missing permissions, and evidence that still needs a person.

Control mappings can help organize the output against a framework. They still need review against the applicable version, scope, and organizational policy.

## 2. Give the collector a narrow AWS role

The collection side uses AWS CLI or Boto3 with read-only permissions. That restriction belongs in IAM as well as in the agent instructions. A prompt saying “do not change anything” is not an access control.

For a real deployment, I would build an action allowlist from the collectors, scope resources where the API supports it, and use temporary credentials. Boto3 supports the standard AWS credential providers, including profiles and role credentials; the [credential documentation](https://docs.aws.amazon.com/boto3/latest/guide/credentials.html) explains that configuration.

Read-only access also needs care. Some read APIs can return sensitive data. Evidence gathering should collect the configuration needed for a control, avoid secret values and application content, and restrict access to the resulting files.

The working boundary is simple: **collect and report; review remediation separately**. The evidence workflow should not acquire write access just because it can propose a fix.

## 3. Keep collection, validation, and writing separate

The repository has two complementary parts. Python runs the repeatable collection and checks. Steering files and prompts guide an AI agent through the evidence and documentation work.

The Python entry point runs these stages:

```text
evidence_collector.py
        ↓
control_validator.py
        ↓
drift_detector.py
        ↓
report_generator.py
```

Collected evidence goes into dated output directories. Control definitions live in `config/controls.yaml`, and generated reports go into `output/reports/`.

This separation matters when something looks wrong. I want to trace a statement back to an API response and a rule, rather than debug a paragraph that sounds convincing.

The agent can then help explain a failed check, draft a control description, or suggest remediation. Those drafts should identify the evidence they rely on and leave uncertainty visible. An access-denied response is missing coverage, not proof that a control passed.

## 4. Try the mock workflow before connecting AWS

The repository includes mock data, which makes it possible to inspect the workflow without credentials. On a Linux shell or WSL, the starting point is:

```bash
git clone https://github.com/yashbhangale/ai-compliance-copilot.git
cd ai-compliance-copilot
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
COMPLIANCE_MOCK=1 python agents/run_all.py
```

Inspect both the evidence and the reports. Mock results demonstrate the software flow; they say nothing about the security of a real AWS account.

For live collection, copy `config/config.template.yaml` to `config/config.yaml`, set the intended Region and collection settings, and configure an authorized read-only AWS profile. Remove the mock environment variable before running the live workflow:

```bash
export AWS_PROFILE=audit-readonly
python agents/run_all.py
```

Use a test account first and verify which APIs the collectors call. Review configuration and dependencies before introducing any tool into an audit environment.

## 5. Distinguish configuration drift from documentation drift

The implemented drift detector compares collected snapshots. That can reveal a resource or setting changing between runs.

Documentation drift is a further question. A document may say that every environment has a particular backup policy while current evidence shows an exception. Reviewing that mismatch requires the document, its scope, and the technical evidence together.

AI is useful for finding and explaining those inconsistencies. The generated explanation still needs a reviewer to decide whether the document is wrong, the configuration is wrong, or an approved exception exists. Comparing two JSON snapshots alone does not resolve that decision.

## 6. Produce evidence someone else can inspect

A useful report should make the next person's work easier. My preferred review format includes the control, the observed condition, collection time, account and Region scope, result, evidence reference, and any limitation.

For example, “logging is configured” is too broad. Which trail? Which Regions? Was collection successful? Does the finding concern configuration only, or did someone also verify delivery and retention?

The same applies to backups. A backup plan is evidence of configuration. Successful restores require separate evidence.

Before sharing a report, redact identifiers where appropriate, review the AI-written text, and keep the underlying evidence in an access-controlled location. A polished summary should never hide a failed collector or an untested assumption.

## What I took from the experiment

The most useful automation was making the questions explicit. Once a check has defined inputs, a rule, and an evidence trail, it becomes much easier to repeat and review.

The agent helps with the work around those facts: interpreting results, bringing context together, and drafting documents. I still want engineers and control owners making the final call on exceptions, applicability, and remediation.

The [repository](https://github.com/yashbhangale/ai-compliance-copilot) contains the Python agents, check modules, prompts, templates, and Kiro steering files if you want to explore that separation in detail.
