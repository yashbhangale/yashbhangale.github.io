"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";

type SystemId = "cloud" | "security" | "scaling";
const systems = {
  cloud: {
    label: "AWS Landing Zone", target: "aws-landing-zone", summary: "One organization. Isolated environments. Security and audit controls built into the foundation.",
    detail: "Terraform · AWS Organizations · CloudTrail · AWS Config", flow: "Govern → isolate → operate",
    nodes: [
      { name: "Organization", detail: "AWS control plane", x: 16, y: 50 },
      { name: "Security", detail: "SCPs · IAM", x: 50, y: 18 },
      { name: "Audit", detail: "CloudTrail · Config", x: 50, y: 50 },
      { name: "Workloads", detail: "Account isolation", x: 50, y: 82 },
      { name: "Environments", detail: "Dev · UAT · Prod", x: 84, y: 50 },
    ],
    paths: ["M96 200 H170 V72 H300", "M96 200 H300", "M96 200 H170 V328 H300", "M300 328 H430 V200 H504"],
  },
  security: {
    label: "DevSecOps Scanner", target: "security-scanner", summary: "A repository URL becomes a project profile, targeted parallel scans, and one consolidated report.",
    detail: "Jenkins · Docker · 9 security tools · HTML / JSON / SARIF", flow: "Profile → scan → aggregate",
    nodes: [
      { name: "Repository", detail: "Git source", x: 16, y: 50 },
      { name: "Profiler", detail: "Detect the stack", x: 50, y: 18 },
      { name: "Scanners", detail: "Relevant tools only", x: 50, y: 50 },
      { name: "Aggregator", detail: "Normalize findings", x: 50, y: 82 },
      { name: "Reports", detail: "HTML · SARIF · SBOM", x: 84, y: 50 },
    ],
    paths: ["M96 200 H170 V72 H300", "M300 72 V200", "M300 200 V328", "M300 328 H430 V200 H504"],
  },
  scaling: {
    label: "EKS Autoscaling", target: "karpenter-autoscaling", summary: "Pending pods drive capacity. Karpenter provisions suitable instances, then consolidates when demand falls.",
    detail: "Amazon EKS · Karpenter · EC2 Spot · Node consolidation", flow: "Demand → provision → consolidate",
    nodes: [
      { name: "Pending pods", detail: "Workload demand", x: 16, y: 50 },
      { name: "Karpenter", detail: "Resource requests", x: 50, y: 18 },
      { name: "EC2 capacity", detail: "Right-sized nodes", x: 50, y: 50 },
      { name: "Consolidation", detail: "Remove idle nodes", x: 50, y: 82 },
      { name: "AI workloads", detail: "Training · Inference", x: 84, y: 50 },
    ],
    paths: ["M96 200 H170 V72 H300", "M300 72 V200", "M300 200 H504", "M300 200 V328", "M300 328 H430 V200 H504"],
  },
} satisfies Record<SystemId, { label: string; target: string; summary: string; detail: string; flow: string; nodes: { name: string; detail: string; x: number; y: number }[]; paths: string[] }>;
const ids: SystemId[] = ["cloud", "security", "scaling"];

export function SystemExplorer() {
  const [selected, setSelected] = useState<SystemId>("cloud");
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const system = systems[selected];
  useEffect(() => {
    let intersecting = false;
    const update = () => setVisible(intersecting && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; update(); });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return (
    <div ref={root} className="system-explorer" data-running={visible && !paused}>
      <div className="explorer-toolbar"><span>System explorer</span><button className="explorer-play" onClick={() => setPaused(!paused)} aria-label={paused ? "Play system animation" : "Pause system animation"}>{paused ? <Play size={14} /> : <Pause size={14} />}<span>{paused ? "Play" : "Pause"}</span></button></div>
      <div className="explorer-tabs" role="tablist" aria-label="Explore project architecture">
        {ids.map((id, index) => <button key={id} ref={el => { controls.current[index] = el; }} id={`system-tab-${id}`} role="tab" aria-selected={selected === id} aria-controls="system-panel" tabIndex={selected === id ? 0 : -1} onClick={() => setSelected(id)} onKeyDown={event => {
          const next = event.key === "ArrowRight" ? (index + 1) % ids.length : event.key === "ArrowLeft" ? (index + ids.length - 1) % ids.length : event.key === "Home" ? 0 : event.key === "End" ? ids.length - 1 : null;
          if (next !== null) { event.preventDefault(); setSelected(ids[next]); controls.current[next]?.focus(); }
        }}>{id === "cloud" ? "Cloud" : id === "security" ? "Security" : "Autoscaling"}</button>)}
      </div>
      <div id="system-panel" role="tabpanel" aria-labelledby={`system-tab-${selected}`} tabIndex={0}>
        <div className="system-map" key={selected} role="img" aria-label={`${system.label}: ${system.flow}. Nodes: ${system.nodes.map(node => node.name + ": " + node.detail).join("; ")}. Simplified architecture, not live telemetry.`}>
          <svg viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
            {system.paths.map((path, index) => <g key={path}><path className="flow-base" d={path} /><path className={`flow-trace flow-trace-${index % 3}`} d={path} /></g>)}
          </svg>
          {system.nodes.map((node, index) => <div key={node.name} className={`system-node system-node-${index}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} aria-hidden="true"><span>{node.name}</span><small>{node.detail}</small></div>)}
        </div>
        <div className="system-readout" aria-live="polite"><p>{system.summary}</p><span>{system.detail}</span><Link href={`/projects#${system.target}`}>Explore {system.label} <ArrowUpRight size={15} /></Link></div>
      </div>
      <div className="explorer-footnote"><span>Architecture overview</span><span>Choose a system to explore</span></div>
    </div>
  );
}
