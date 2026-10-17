"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight, Bell, Box, Boxes, Check, ChevronRight, CircleDollarSign, Cloud,
  Code2, Container, Cpu, Database, FileCode2, FileText, GitBranch, HardDrive,
  KeyRound, Layers3, LockKeyhole, Network, ScanSearch, Server,
  ShieldCheck, Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./SystemExplorer.css";

type SystemId = "cloud" | "security" | "scaling";
type Node = {
  id: string; title: string; subtitle: string; detail: string;
  capabilities: string[]; tags: string[]; icon: LucideIcon;
  x: number; y: number; w: number; h: number; accent?: "yellow" | "cyan";
};
type Group = { title: string; x: number; y: number; w: number; h: number; icon: LucideIcon };
type Path = { d: string; tone?: "yellow" | "cyan"; delay?: number };
type System = {
  tab: string; icon: LucideIcon; label: string; target: string; summary: string;
  stack: string; defaultNode: string; groups: Group[]; nodes: Node[]; paths: Path[];
};
const n = (
  id: string, title: string, subtitle: string, icon: LucideIcon,
  x: number, y: number, w: number, h: number, detail: string,
  capabilities: string[], tags: string[], accent?: Node["accent"],
): Node => ({ id, title, subtitle, icon, x, y, w, h, detail, capabilities, tags, accent });

const systems: Record<SystemId, System> = {
  cloud: {
    tab: "Cloud", icon: Cloud, label: "AWS Landing Zone", target: "aws-landing-zone",
    summary: "A multi-account AWS foundation with centralized governance, security, audit, backups, and isolated environments.",
    stack: "AWS Organizations · IAM Identity Center · SCPs · CloudTrail · AWS Config · Terraform",
    defaultNode: "organization",
    groups: [
      { title: "Governance & security", x: 55, y: 5, w: 42, h: 25, icon: ShieldCheck },
      { title: "Security OU", x: 2, y: 43, w: 29, h: 28, icon: LockKeyhole },
      { title: "Shared services OU", x: 34, y: 43, w: 29, h: 28, icon: Network },
      { title: "Workloads OU", x: 66, y: 43, w: 32, h: 28, icon: Boxes },
      { title: "Cross-account foundations", x: 2, y: 79, w: 96, h: 17, icon: Database },
    ],
    nodes: [
      n("identity", "People & CI/CD", "Federated access", KeyRound, 2, 12, 17, 16, "Employees, administrators, and delivery pipelines enter through federated identities and assigned roles.", ["Central access through IAM Identity Center", "Role-based access to member accounts"], ["SSO", "IAM"], "cyan"),
      n("organization", "AWS Organizations", "Account governance", Network, 24, 10, 25, 20, "The management account governs the multi-account structure, organizational units, account baselines, and billing.", ["Dedicated security and shared accounts", "SCP guardrails across organizational units", "Centralized billing and cost visibility"], ["Organizations", "Control Tower"], "yellow"),
      n("guardrails", "IAM & SCPs", "Access · policies", ShieldCheck, 57, 13, 18, 12, "IAM Identity Center assigns human access; service control policies set the maximum permissions for member accounts.", ["Federated access", "Organization-wide guardrails"], ["Identity Center", "SCPs"]),
      n("audit", "CloudTrail & Config", "Audit · compliance", FileText, 77, 13, 18, 12, "Organization trails and AWS Config record activity and resource configuration across accounts for centralized review.", ["Centralized audit trails", "Configuration monitoring"], ["CloudTrail", "AWS Config"], "cyan"),
      n("security", "Security account", "Threat detection", ShieldCheck, 4, 52, 12, 13, "A dedicated security account aggregates security posture and threat findings without sharing workload administration.", ["Security Hub and GuardDuty findings", "Separated security administration"], ["Security Hub", "GuardDuty"]),
      n("logs", "Log archive", "Audit trail", Database, 17, 52, 12, 13, "A dedicated log archive account receives cross-account CloudTrail, Config, and other operational logs.", ["Centralized log storage", "Restricted access and retention"], ["CloudTrail", "S3"], "cyan"),
      n("network", "Network hub", "Shared connectivity", Network, 36, 52, 12, 13, "Shared infrastructure provides network connectivity and services to isolated workload environments.", ["Transit Gateway hub", "Shared DNS and routing patterns"], ["Transit Gateway", "VPC"]),
      n("backup", "Backup account", "Recovery boundary", HardDrive, 49, 52, 12, 13, "A separate backup account supports recovery foundations and reduces the blast radius of workload account compromise.", ["Cross-account backup planning", "Recovery separation"], ["AWS Backup", "Vault"]),
      n("dev", "Dev", "Workload account", Box, 68, 52, 9, 13, "Development workloads run in their own account with environment-specific access and infrastructure.", ["Isolated workloads", "Terraform provisioning"], ["Dev", "Terraform"]),
      n("uat", "UAT", "Workload account", Box, 78, 52, 9, 13, "UAT has a separate workload account for validation before production rollout.", ["Separate access boundary", "Repeatable infrastructure"], ["UAT", "Terraform"]),
      n("prod", "Prod", "Workload account", Box, 88, 52, 9, 13, "Production workloads are isolated from development and testing, with tighter operational controls.", ["Account isolation", "Production guardrails"], ["Production", "Terraform"], "yellow"),
      n("monitoring", "Observability", "Cross-account signals", Bell, 4, 86, 20, 8, "Centralized logs and monitoring give operators a cross-account view of health and activity.", ["CloudWatch metrics and logs", "Central audit visibility"], ["CloudWatch", "CloudTrail"]),
      n("cost", "Cost & billing", "Budgets · allocation", CircleDollarSign, 27, 86, 20, 8, "Consolidated billing, budgets, and account boundaries improve spending visibility across environments.", ["Consolidated billing", "Budgets and cost allocation"], ["Budgets", "Cost Explorer"]),
      n("iac", "Infrastructure as code", "Repeatable environments", FileCode2, 50, 86, 22, 8, "Terraform provisions consistent infrastructure across the environment accounts.", ["Consistent Dev/UAT/Prod setup", "Reviewable infrastructure changes"], ["Terraform", "IaC"]),
      n("recovery", "Backup & recovery", "Protected copies", HardDrive, 75, 86, 21, 8, "Central backup foundations support recovery across workload accounts.", ["Dedicated backup boundary", "Recovery planning"], ["AWS Backup", "S3"]),
    ],
    paths: [
      { d: "M190 120 H240" }, { d: "M490 120 H550", tone: "cyan" },
      { d: "M365 180 V227 H165 V258" }, { d: "M365 180 V227 H485 V258", tone: "cyan", delay: -1.2 },
      { d: "M365 180 V227 H820 V258", delay: -2 },
      { d: "M165 426 V474" }, { d: "M485 426 V474", tone: "cyan" }, { d: "M820 426 V474" },
    ],
  },
  security: {
    tab: "Security", icon: ShieldCheck, label: "DevSecOps Scanner", target: "security-scanner",
    summary: "One Jenkins pipeline profiles a repository, runs the relevant scanners in parallel, and produces consolidated reports.",
    stack: "Jenkins · Docker · Trivy · Gitleaks · Semgrep · SonarQube · Syft · Grype · Checkov · Hadolint · kube-linter",
    defaultNode: "profiler",
    groups: [
      { title: "Project intake", x: 2, y: 5, w: 96, h: 25, icon: GitBranch },
      { title: "Conditional scans · parallel", x: 2, y: 38, w: 72, h: 39, icon: ScanSearch },
      { title: "Consolidated output", x: 77, y: 38, w: 21, h: 39, icon: FileText },
      { title: "Delivery", x: 2, y: 84, w: 96, h: 12, icon: Bell },
    ],
    nodes: [
      n("repository", "Repository URL", "Git source", GitBranch, 4, 13, 18, 12, "A user submits a Git repository URL; the pipeline checks out the source before analysis.", ["Generic input for any repository", "Source checkout"], ["Git", "URL"]),
      n("jenkins", "Jenkins", "Build orchestration", Workflow, 28, 13, 18, 12, "Jenkins orchestrates the generic Docker-based workflow and parallel scanner stages.", ["One reusable pipeline", "Parallel execution"], ["Jenkins", "Docker"], "yellow"),
      n("profiler", "Project Profiler", "Stack detection", ScanSearch, 52, 13, 20, 12, "The profiler detects code, dependencies, Docker, Terraform, and Kubernetes manifests, then selects relevant scanners.", ["Technology-aware tool selection", "Avoids irrelevant scans", "No project-specific scanner list"], ["Languages", "Infrastructure"], "cyan"),
      n("routing", "Scanner routing", "Relevant tools only", GitBranch, 78, 13, 18, 12, "Profiler output enables the applicable scanner stages. General repository checks also run.", ["Trivy and Gitleaks broadly applicable", "Conditional source, dependency, IaC, and container checks"], ["Conditional", "Parallel"]),
      n("trivy", "Trivy", "Vulnerabilities", ShieldCheck, 4, 48, 21, 10, "Trivy scans applicable source, configuration, or container artifacts for vulnerabilities and misconfigurations.", ["Vulnerability scanning", "Broad repository coverage"], ["Trivy"]),
      n("gitleaks", "Gitleaks", "Secrets", KeyRound, 27, 48, 21, 10, "Gitleaks detects secrets committed to the repository.", ["Secret detection", "Credential exposure checks"], ["Gitleaks"]),
      n("semgrep", "Semgrep / SonarQube", "Source analysis", Code2, 50, 48, 21, 10, "Source scanners analyze code where the repository contains supported languages and frameworks.", ["Static code analysis", "Code quality and maintainability"], ["Semgrep", "SonarQube"], "cyan"),
      n("syft", "Syft / Grype", "SBOM · dependencies", Boxes, 4, 62, 21, 10, "Syft builds an SBOM and Grype checks identified dependencies for known vulnerabilities.", ["Software bill of materials", "Dependency vulnerability analysis"], ["Syft", "Grype"]),
      n("checkov", "Checkov / Hadolint", "IaC · Docker", FileCode2, 27, 62, 21, 10, "Checkov runs for Terraform files and Hadolint checks Dockerfiles when those assets are present.", ["Terraform policy checks", "Dockerfile linting"], ["Checkov", "Hadolint"]),
      n("kube", "kube-linter", "Kubernetes manifests", Container, 50, 62, 21, 10, "kube-linter validates Kubernetes manifests when the project contains them.", ["Manifest checks", "Kubernetes best practices"], ["kube-linter"]),
      n("aggregate", "Aggregator", "Correlate findings", Layers3, 79, 47, 17, 12, "Scanner results are collected and normalized into a consolidated view.", ["One findings report", "Cross-tool correlation"], ["Findings", "JSON"], "yellow"),
      n("reports", "Reports", "HTML · JSON · SARIF", FileText, 79, 62, 17, 11, "The pipeline publishes dashboards and machine-readable reports, plus generated SBOM artifacts.", ["HTML dashboard", "JSON and SARIF", "SBOM artifacts"], ["HTML", "SARIF", "SBOM"]),
      n("delivery", "Jenkins · Email · Slack", "Artifacts & notifications", Bell, 30, 87, 40, 7, "Reports are accessible as Jenkins artifacts and delivered through email and Slack notifications.", ["Archived pipeline artifacts", "Email and Slack delivery"], ["Jenkins", "Email", "Slack"]),
    ],
    paths: [
      { d: "M220 114 H280" }, { d: "M460 114 H520" }, { d: "M720 114 H780", tone: "cyan" },
      { d: "M870 150 V211 H145 V278" }, { d: "M870 211 H375 V278", tone: "cyan", delay: -1.2 },
      { d: "M870 211 H605 V278", delay: -1.8 }, { d: "M870 211 H145 V366", tone: "cyan" },
      { d: "M870 211 H375 V366", delay: -1.4 }, { d: "M870 211 H605 V366", tone: "cyan" },
      { d: "M735 315 H770", tone: "cyan" },
      { d: "M735 399 H770", delay: -1.5 }, { d: "M865 350 V370" },
      { d: "M865 440 V493 H700", tone: "cyan" },
    ],
  },
  scaling: {
    tab: "Autoscaling", icon: Box, label: "EKS Autoscaling", target: "karpenter-autoscaling",
    summary: "Pending GPU workloads trigger just-in-time EC2 capacity. Karpenter later consolidates underused nodes.",
    stack: "Amazon EKS · Kubernetes · Karpenter · NodePool · Amazon EC2 · Spot · Consolidation",
    defaultNode: "karpenter",
    groups: [
      { title: "Demand & scheduling", x: 2, y: 6, w: 43, h: 39, icon: Boxes },
      { title: "Karpenter provisioning", x: 50, y: 6, w: 21, h: 39, icon: Workflow },
      { title: "EC2 GPU capacity", x: 76, y: 6, w: 22, h: 68, icon: Cpu },
      { title: "Schedule & consolidate", x: 2, y: 55, w: 69, h: 38, icon: Server },
    ],
    nodes: [
      n("workloads", "AI workloads", "Training · inference", FileCode2, 4, 15, 17, 13, "Training jobs and inference deployments create GPU pod demand on the EKS cluster.", ["Bursty AI demand", "GPU resource requests"], ["Pods", "GPU"]),
      n("pending", "Pending pods", "Unschedulable demand", Boxes, 25, 15, 18, 13, "Pods remain pending when existing nodes cannot satisfy their CPU, memory, or GPU requests.", ["Scheduler reports unschedulable pods", "Capacity demand becomes visible"], ["EKS", "Scheduler"], "yellow"),
      n("karpenter", "Karpenter", "Provisioning controller", Workflow, 52, 14, 17, 13, "Karpenter responds to unschedulable pods and chooses suitable EC2 capacity from its configured constraints.", ["Right-sized instance selection", "Just-in-time provisioning", "Spot where appropriate"], ["Karpenter", "EKS"], "yellow"),
      n("nodepool", "NodePool", "Requirements · limits", Layers3, 52, 30, 17, 10, "NodePool defines scheduling requirements, capacity types, and disruption behavior for provisioned nodes.", ["Instance requirements", "Spot / On-Demand selection"], ["NodePool", "Capacity type"]),
      n("ec2class", "EC2NodeClass", "AWS infrastructure", Cloud, 77, 15, 19, 11, "EC2NodeClass supplies AWS-specific details such as subnets, security groups, and node image selection.", ["Subnet and security group selection", "Node configuration"], ["EC2NodeClass", "AWS"]),
      n("instances", "GPU instances", "EC2 · Spot / On-Demand", Cpu, 77, 32, 19, 13, "Karpenter launches suitable GPU-capable EC2 instances to satisfy pending pod resource requests.", ["Runtime capacity matching", "Spot for tolerant workloads"], ["EC2", "GPU"], "cyan"),
      n("registered", "Nodes join EKS", "Kubernetes capacity", Server, 77, 52, 19, 14, "Provisioned instances register as Kubernetes nodes so the scheduler can place pending pods.", ["Node registration", "Pods receive capacity"], ["EKS", "Kubernetes"]),
      n("scheduled", "Scheduled pods", "GPU jobs run", Boxes, 31, 66, 27, 15, "The scheduler places eligible workloads on available GPU nodes. The diagram shows the lifecycle, not live utilization.", ["GPU jobs run on matching nodes", "Capacity follows workload demand"], ["Pods", "GPU nodes"], "yellow"),
      n("consolidation", "Consolidation", "Remove idle capacity", Check, 4, 66, 22, 15, "After jobs complete or demand falls, Karpenter can replace or remove underused nodes according to disruption settings.", ["Lower idle capacity", "Controlled node disruption"], ["Karpenter", "Scale down"], "cyan"),
    ],
    paths: [
      { d: "M210 128 H250" }, { d: "M430 128 H500" }, { d: "M690 128 H760", tone: "cyan" },
      { d: "M605 162 V178" }, { d: "M865 156 V192" }, { d: "M865 270 V312" },
      { d: "M865 396 V448 H580", tone: "cyan" }, { d: "M310 448 H260" },
    ],
  },
};
const ids: SystemId[] = ["cloud", "security", "scaling"];

function Architecture({ system, selectedNode, running, onSelect }: { system: System; selectedNode: string; running: boolean; onSelect: (id: string) => void }) {
  return <div className="infra-map-scroll" role="region" aria-label={`${system.label} architecture diagram. Scroll horizontally to explore on a narrow screen.`} tabIndex={0}>
    <div className="infra-map" key={system.label}>
      <svg className="infra-wires" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker id="infra-arrow-yellow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#ffbf00" /></marker>
          <marker id="infra-arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#60d4d4" /></marker>
        </defs>
        {system.paths.map((path, index) => <g key={`${path.d}-${index}`} className={`infra-wire infra-wire-${path.tone ?? "yellow"}`}>
          <path className="infra-wire-base" d={path.d} markerEnd={`url(#infra-arrow-${path.tone ?? "yellow"})`} />
          <path className="infra-wire-motion" d={path.d} style={{ animationDelay: `${path.delay ?? -(index % 4) * 0.65}s` }} />
          {running && <circle className="infra-particle" r="3.5"><animateMotion path={path.d} dur={`${3.2 + (index % 3) * 0.6}s`} begin={`${path.delay ?? -(index % 4) * 0.65}s`} repeatCount="indefinite" /></circle>}
        </g>)}
      </svg>
      {system.groups.map(group => <div className="infra-group" key={group.title} style={{ left: `${group.x}%`, top: `${group.y}%`, width: `${group.w}%`, height: `${group.h}%` }} aria-hidden="true"><span><group.icon size={13} strokeWidth={1.8} />{group.title}</span></div>)}
      {system.nodes.map(item => <button
        className={`infra-node${selectedNode === item.id ? " is-selected" : ""}${item.accent ? ` infra-node-${item.accent}` : ""}${item.w <= 12 ? " infra-node-compact" : ""}`}
        key={item.id} type="button" aria-pressed={selectedNode === item.id}
        aria-label={`${item.title}: ${item.subtitle}. Show details.`}
        onClick={() => onSelect(item.id)}
        style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.w}%`, height: `${item.h}%` }}
      ><item.icon className="infra-node-icon" size={17} strokeWidth={1.8} aria-hidden="true" /><span className="infra-node-text"><strong>{item.title}</strong><small>{item.subtitle}</small></span></button>)}
    </div>
  </div>;
}

export function SystemExplorer() {
  const [selected, setSelected] = useState<SystemId>("cloud");
  const [selectedNodes, setSelectedNodes] = useState<Record<SystemId, string>>({ cloud: "organization", security: "profiler", scaling: "karpenter" });
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const system = systems[selected];
  const active = system.nodes.find(item => item.id === selectedNodes[selected]) ?? system.nodes[0];
  const running = visible && !reducedMotion;

  useEffect(() => {
    let intersecting = false;
    const update = () => setVisible(intersecting && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; update(); }, { threshold: 0.04 });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", update);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionUpdate = () => setReducedMotion(media.matches);
    motionUpdate();
    media.addEventListener("change", motionUpdate);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); media.removeEventListener("change", motionUpdate); };
  }, []);

  return <div ref={root} className="infra-explorer" data-running={running}>
    <div className="infra-toolbar"><span>System explorer</span></div>
    <div className="infra-tabs" role="tablist" aria-label="Explore project architecture">
      {ids.map((id, index) => {
        const Icon = systems[id].icon;
        return <button key={id} ref={el => { controls.current[index] = el; }} id={`system-tab-${id}`} type="button" role="tab" aria-selected={selected === id} aria-controls="system-panel" tabIndex={selected === id ? 0 : -1} onClick={() => setSelected(id)} onKeyDown={event => {
          const next = event.key === "ArrowRight" ? (index + 1) % ids.length : event.key === "ArrowLeft" ? (index + ids.length - 1) % ids.length : event.key === "Home" ? 0 : event.key === "End" ? ids.length - 1 : null;
          if (next !== null) { event.preventDefault(); setSelected(ids[next]); controls.current[next]?.focus(); }
        }}><Icon size={16} strokeWidth={1.8} aria-hidden="true" />{systems[id].tab}</button>;
      })}
    </div>
    <div id="system-panel" role="tabpanel" aria-labelledby={`system-tab-${selected}`} className="infra-panel">
      <Architecture system={system} selectedNode={active.id} running={running} onSelect={id => setSelectedNodes(current => ({ ...current, [selected]: id }))} />
      <div className="infra-detail" aria-live="polite" aria-atomic="true">
        <div className="infra-detail-heading"><span className="infra-detail-icon"><active.icon size={24} strokeWidth={1.7} /></span><div><strong>{active.title}</strong><span>{active.subtitle}</span></div><span className="infra-detail-cue">Selected node</span></div>
        <p>{active.detail}</p>
        <div className="infra-tags">{active.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="infra-capabilities"><strong>Key capabilities</strong><ul>{active.capabilities.map(capability => <li key={capability}><Check size={13} strokeWidth={2.4} aria-hidden="true" />{capability}</li>)}</ul></div>
      </div>
    </div>
    <div className="infra-readout"><div><p>{system.summary}</p><span>{system.stack}</span><Link href={`/projects#${system.target}`}>Explore {system.label} <ArrowUpRight size={15} /></Link></div><div className="infra-indicators" aria-hidden="true">{ids.map(id => <span key={id} className={selected === id ? "is-active" : ""} />)}</div></div>
    <div className="infra-footnote"><span>Architecture overview · select a node for details</span><span><ChevronRight size={12} /> Simplified from project design</span></div>
  </div>;
}
