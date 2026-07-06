"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// ---- Self-contained inline SVG icons (no external icon library) -----------

type IconProps = { className?: string };
type IconComponent = React.FC<IconProps>;

function makeIcon(paths: React.ReactNode): IconComponent {
  const Icon = ({ className }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
  return Icon;
}

const Server = makeIcon(
  <>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </>
);

const Cloud = makeIcon(
  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
);

const Shield = makeIcon(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />);

const GitBranch = makeIcon(
  <>
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </>
);

const KeyRound = makeIcon(
  <>
    <circle cx="8" cy="15" r="4" />
    <line x1="10.85" y1="12.15" x2="19" y2="4" />
    <line x1="18" y1="5" x2="20.5" y2="7.5" />
    <line x1="15" y1="8" x2="17" y2="10" />
  </>
);

const Lock = makeIcon(
  <>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </>
);

const Home = makeIcon(
  <>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </>
);

const Bot = makeIcon(
  <>
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M12 8V4" />
    <circle cx="12" cy="3" r="1" />
    <circle cx="9" cy="13" r="1" />
    <circle cx="15" cy="13" r="1" />
    <path d="M4 14H2" />
    <path d="M22 14h-2" />
  </>
);

const Film = makeIcon(
  <>
    <rect x="2" y="2" width="20" height="20" rx="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </>
);

const BookOpen = makeIcon(
  <>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </>
);

const FileText = makeIcon(
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </>
);

const FolderOpen = makeIcon(
  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
);

const Monitor = makeIcon(
  <>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </>
);

const HardDrive = makeIcon(
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </>
);

const Users = makeIcon(
  <>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>
);

const Laptop = makeIcon(
  <>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </>
);

const Grid3x3 = makeIcon(
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </>
);

const ExternalLink = makeIcon(
  <>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </>
);

const Cpu = makeIcon(
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </>
);

const MousePointerClick = makeIcon(
  <>
    <path d="M9 9l5 12 1.8-5.2L21 14z" />
    <path d="M7.2 2.2 8 5.1" />
    <path d="m5.1 8-2.9-.8" />
    <path d="M14 4.1 12 6" />
    <path d="m6 12-1.9 2" />
  </>
);

// ---- Data model (sourced from the homelab documentation) ------------------
// Each node maps to a hoverable hotspot over the architecture image.
// hotspot values are percentages relative to the 1672x941 diagram.

type Hotspot = { left: number; top: number; width: number; height: number };

type HomelabNode = {
  id: string;
  name: string;
  icon: IconComponent;
  color: string; // 6-digit hex used for accents/glow
  url?: string;
  subtitle: string;
  details: string[];
  tags?: string[];
  hotspot: Hotspot;
};

const NODES: HomelabNode[] = [
  // Zone 1 — External Network & Security (Public Cloud)
  {
    id: "users",
    name: "Remote Users",
    icon: Users,
    color: "#38bdf8",
    subtitle: "Browser / mobile app",
    details: [
      "Public visitors reach every app over HTTPS.",
      "All requests enter through the Cloudflare edge — nothing hits the home network directly.",
    ],
    tags: ["Public", "HTTPS"],
    hotspot: { left: 2.2, top: 16.5, width: 10, height: 15 },
  },
  {
    id: "github",
    name: "GitOps Source of Truth",
    icon: GitBranch,
    color: "#e5e7eb",
    url: "https://github.com/yashbhangale",
    subtitle: "GitHub repo · source of truth",
    details: [
      "Every Kubernetes manifest lives in Git.",
      "ArgoCD continuously syncs this repo to the cluster — push a change, it applies.",
    ],
    tags: ["GitOps", "IaC"],
    hotspot: { left: 15.4, top: 16.5, width: 12.5, height: 15 },
  },
  {
    id: "sealed-key",
    name: "Sealed Secrets Public Key",
    icon: KeyRound,
    color: "#facc15",
    subtitle: "Encrypts secrets before Git",
    details: [
      "The controller's public key encrypts secrets client-side.",
      "Encrypted SealedSecrets are safe to commit publicly — only the in-cluster controller can decrypt them.",
    ],
    tags: ["Secrets", "Encryption"],
    hotspot: { left: 27.8, top: 16.5, width: 11, height: 15 },
  },

  // Zone 2 — Public Internet & Edge Security
  {
    id: "cf-edge",
    name: "Cloudflare Edge",
    icon: Shield,
    color: "#f59e0b",
    subtitle: "WAF · DDoS · TLS termination",
    details: [
      "All external traffic passes through Cloudflare.",
      "TLS terminates at the edge; WAF and DDoS protection run here before traffic ever reaches home.",
    ],
    tags: ["WAF", "DDoS", "TLS"],
    hotspot: { left: 5.5, top: 38, width: 17, height: 19 },
  },

  // Remote Administrator Access
  {
    id: "admin",
    name: "Administrator Access",
    icon: Laptop,
    color: "#a78bfa",
    subtitle: "iPad / laptop",
    details: [
      "kubectl / SSH / K3s API management from any device.",
      "Never exposed to the public internet — only reachable over the tailnet.",
    ],
    tags: ["Admin only"],
    hotspot: { left: 1.4, top: 58, width: 11.5, height: 16 },
  },
  {
    id: "tailscale",
    name: "Tailscale VPN",
    icon: Grid3x3,
    color: "#8b5cf6",
    subtitle: "Zero-config mesh VPN",
    details: [
      "Node Tailscale IP: 100.111.171.112",
      "Secure path to the K3s control plane with no router port-forwarding.",
    ],
    tags: ["VPN", "Mesh"],
    hotspot: { left: 13.2, top: 58, width: 11.5, height: 16 },
  },

  // Zone 3 — Ingress & Network Tier (DMZ)
  {
    id: "tunnel",
    name: "Cloudflare Tunnel",
    icon: Cloud,
    color: "#f97316",
    subtitle: "cloudflared pod · hostname routing",
    details: [
      "Runs as a pod in the cloudflared namespace (survives node IP changes).",
      "Tunnel ID: f5d445db-9f0b-47f0-90b8-e344cb5f3325",
      "Routes each hostname to an in-cluster service DNS name.",
    ],
    tags: ["Ingress", "Zero-trust"],
    hotspot: { left: 27.5, top: 37.5, width: 12.5, height: 18 },
  },
  {
    id: "k3s-api",
    name: "K3s Control Plane API",
    icon: Server,
    color: "#60a5fa",
    subtitle: "Port 6443",
    details: [
      "Kubernetes API server for the single node.",
      "Reachable only over Tailscale — the tunnel is dedicated to app ingress, never the API.",
    ],
    tags: ["API", ":6443"],
    hotspot: { left: 39.2, top: 56, width: 6, height: 24 },
  },

  // Zone 4 — Management Namespace
  {
    id: "argocd",
    name: "ArgoCD",
    icon: GitBranch,
    color: "#ef7b4d",
    url: "https://argocd.yashbhangale.site",
    subtitle: "GitOps continuous delivery",
    details: [
      "Namespace: argocd · Helm chart argo-cd-9.6.0 (app v3.4.4)",
      "Keeps the cluster in sync with the Git repo automatically.",
    ],
    tags: ["GitOps", "Helm"],
    hotspot: { left: 47.3, top: 43, width: 8.5, height: 14 },
  },
  {
    id: "github-sync",
    name: "GitHub (pulled by ArgoCD)",
    icon: GitBranch,
    color: "#cbd5e1",
    url: "https://github.com/yashbhangale",
    subtitle: "Manifests pulled by ArgoCD",
    details: [
      "ArgoCD pulls the desired state from this repository.",
      "The repo — including encrypted secrets — is safe to apply directly.",
    ],
    tags: ["Git"],
    hotspot: { left: 55.6, top: 43, width: 8.5, height: 14 },
  },
  {
    id: "sealed-controller",
    name: "Sealed Secrets Controller",
    icon: KeyRound,
    color: "#facc15",
    subtitle: "Bitnami · kube-system",
    details: [
      "Holds the private key — the only thing that can decrypt a SealedSecret.",
      "Turns committed ciphertext into real Kubernetes Secrets in the cluster.",
    ],
    tags: ["Secrets"],
    hotspot: { left: 65.5, top: 43, width: 11, height: 14 },
  },
  {
    id: "sealedsecret",
    name: "SealedSecret",
    icon: Lock,
    color: "#eab308",
    subtitle: "Encrypted secret object",
    details: [
      "Contains only encryptedData (ciphertext).",
      "Used for the cloudflared tunnel credentials, committed safely to Git.",
    ],
    tags: ["Encrypted"],
    hotspot: { left: 80.9, top: 43, width: 8.5, height: 14 },
  },

  // Zone 4 — Application Namespaces
  {
    id: "homeassistant",
    name: "Home Assistant",
    icon: Home,
    color: "#41bdf5",
    url: "https://ha.yashbhangale.site",
    subtitle: "Home automation",
    details: [
      "Namespace: homeassistant · Port 8123 · Storage 10Gi",
      "Central hub for smart-home automation.",
    ],
    tags: ["Automation"],
    hotspot: { left: 45.3, top: 61, width: 7.2, height: 16 },
  },
  {
    id: "nextcloud",
    name: "Nextcloud",
    icon: Cloud,
    color: "#0ea5e9",
    url: "https://nextcloud.yashbhangale.site",
    subtitle: "Files, sync & sharing",
    details: [
      "Namespace: nextcloud · Port 8080",
      "20Gi + shared media (read-write).",
      "Deployed via Helm; writes the shared media library.",
    ],
    tags: ["Files", "Helm"],
    hotspot: { left: 51.6, top: 61, width: 6.8, height: 16 },
  },
  {
    id: "paperless",
    name: "Paperless-ngx",
    icon: FileText,
    color: "#22c55e",
    url: "https://paperless.yashbhangale.site",
    subtitle: "Document management",
    details: [
      "Namespace: paperless · Port 8000",
      "5Gi data + 20Gi media + 2Gi consume.",
      "Runs a companion Redis broker in the same namespace.",
    ],
    tags: ["OCR", "Redis"],
    hotspot: { left: 57.5, top: 61, width: 6.8, height: 16 },
  },
  {
    id: "filebrowser",
    name: "Filebrowser",
    icon: FolderOpen,
    color: "#60a5fa",
    url: "https://files.yashbhangale.site",
    subtitle: "Web file manager",
    details: [
      "Namespace: filebrowser · Port 80",
      "1Gi config + shared media (read-write).",
      "Organizes everything under /srv/media.",
    ],
    tags: ["Files"],
    hotspot: { left: 63.4, top: 61, width: 6.8, height: 16 },
  },
  {
    id: "openwebui",
    name: "Open WebUI",
    icon: Bot,
    color: "#818cf8",
    url: "https://openui.yashbhangale.site",
    subtitle: "Local LLM interface",
    details: [
      "Namespace: openwebui · Port 80 · Storage 10Gi",
      "OLLAMA_BASE_URL=http://192.168.0.107:11434",
    ],
    tags: ["LLM", "Ollama"],
    hotspot: { left: 70.3, top: 61, width: 7.5, height: 16 },
  },
  {
    id: "jellyfin",
    name: "Jellyfin",
    icon: Film,
    color: "#a855f7",
    url: "https://jellyfin.yashbhangale.site",
    subtitle: "Movies · TV · music",
    details: [
      "Namespace: jellyfin · Port 8096",
      "5Gi config + 50Gi media + shared media (read-only).",
    ],
    tags: ["Streaming"],
    hotspot: { left: 78, top: 61, width: 5.8, height: 16 },
  },
  {
    id: "kavita",
    name: "Kavita",
    icon: BookOpen,
    color: "#f472b6",
    url: "https://kavita.yashbhangale.site",
    subtitle: "Books · comics · manga",
    details: [
      "Namespace: kavita · Port 5000",
      "2Gi config + 20Gi library + shared media (read-only).",
      "Each book must live in its own subfolder.",
    ],
    tags: ["Library"],
    hotspot: { left: 83, top: 61, width: 5.8, height: 16 },
  },
  {
    id: "kasm",
    name: "Kasm Workspaces",
    icon: Monitor,
    color: "#f43f5e",
    url: "https://kasm.yashbhangale.site",
    subtitle: "Streaming desktops",
    details: [
      "Namespace: kasm · Port 443 (self-signed)",
      "30Gi /opt + shared media (read-write) · 6Gi memory limit.",
      "Privileged Docker-in-Docker container.",
    ],
    tags: ["DinD", "Privileged"],
    hotspot: { left: 89, top: 61, width: 7.5, height: 16 },
  },

  // Zone 4 — Storage
  {
    id: "storage",
    name: "HostPath & PVCs",
    icon: HardDrive,
    color: "#94a3b8",
    subtitle: "Shared media library · /srv/media",
    details: [
      "A single /srv/media folder shared across apps — upload once, read everywhere.",
      "Writers: Nextcloud, Filebrowser, Kasm (RW). Readers: Jellyfin, Kavita (RO).",
      "Each namespace has its own hostPath PV + PVC (storageClassName: shared-media).",
    ],
    tags: ["hostPath", "Shared"],
    hotspot: { left: 65.8, top: 84, width: 10.5, height: 12 },
  },
];

// Positions the floating tooltip near its hotspot while keeping it inside the
// image frame. Horizontal center is clamped; the tooltip flips above/below the
// hotspot depending on whether it sits in the top or bottom half of the image.
function getTooltipStyle(node: HomelabNode): React.CSSProperties {
  const centerX = node.hotspot.left + node.hotspot.width / 2;
  const clampedX = Math.min(Math.max(centerX, 24), 76);
  const isTopHalf = node.hotspot.top + node.hotspot.height / 2 < 50;

  const style: React.CSSProperties = {
    left: `${clampedX}%`,
    transform: "translateX(-50%)",
  };

  if (isTopHalf) {
    style.top = `calc(${node.hotspot.top + node.hotspot.height}% + 8px)`;
  } else {
    style.bottom = `calc(${100 - node.hotspot.top}% + 8px)`;
  }

  return style;
}

// ---- Hoverable hotspot over the diagram image -----------------------------

function HotspotButton({
  node,
  isActive,
  showAll,
  onHover,
}: {
  node: HomelabNode;
  isActive: boolean;
  showAll: boolean;
  onHover: (id: string | null) => void;
}) {
  const openService = () => {
    if (node.url) window.open(node.url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      onClick={openService}
      aria-label={`${node.name} — ${node.subtitle}${node.url ? " (opens live service)" : ""}`}
      className={`group absolute z-10 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
        node.url ? "cursor-pointer" : "cursor-help"
      }`}
      style={{
        left: `${node.hotspot.left}%`,
        top: `${node.hotspot.top}%`,
        width: `${node.hotspot.width}%`,
        height: `${node.hotspot.height}%`,
        backgroundColor: isActive ? `${node.color}26` : "transparent",
        boxShadow: isActive
          ? `inset 0 0 0 1.5px ${node.color}, 0 8px 24px -8px ${node.color}`
          : undefined,
      }}
    >
      {/* Resting outline when "highlight zones" is on */}
      <span
        className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-200"
        style={{
          boxShadow:
            showAll && !isActive ? `inset 0 0 0 1px ${node.color}70` : "none",
        }}
      />
      {/* Hover fill + border */}
      <span
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          backgroundColor: `${node.color}24`,
          boxShadow: `inset 0 0 0 1.5px ${node.color}`,
        }}
      />
      {/* Live-service pulse indicator */}
      {node.url && (
        <span className="pointer-events-none absolute right-1 top-1 flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
            style={{ backgroundColor: node.color }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full ring-1 ring-black/20"
            style={{ backgroundColor: node.color }}
          />
        </span>
      )}
    </button>
  );
}

// ---- Main component -------------------------------------------------------

export function HomelabShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const active = NODES.find((n) => n.id === hoveredId) ?? null;
  const ActiveIcon = active?.icon;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
        {/* Window chrome header */}
        <div className="flex items-center justify-between gap-2 border-b bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="h-3 w-3 rounded-full bg-red-400/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
              <div className="h-3 w-3 rounded-full bg-green-400/60" />
            </div>
            <span className="ml-2 font-mono text-xs text-muted-foreground sm:text-sm">
              My HomeLab
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="hidden items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
              aria-pressed={showAll}
            >
              <MousePointerClick className="h-3.5 w-3.5" />
              {showAll ? "Hide zones" : "Highlight zones"}
            </button>
            <Badge variant="secondary" className="text-xs">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Self-hosted · Live
            </Badge>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          {/* Interactive architecture image */}
          <div
            className="relative w-full select-none overflow-hidden rounded-lg border bg-[#0b1120]"
            style={{ aspectRatio: "1672 / 941" }}
          >
            <Image
              src="/imgs/arch.png"
              alt="Homelab architecture diagram: remote users reach Cloudflare edge and tunnel into a single K3s node hosting nine self-hosted services, with admin access over Tailscale and GitOps via ArgoCD."
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
            />

            {/* Hoverable hotspots */}
            {NODES.map((node) => (
              <HotspotButton
                key={node.id}
                node={node}
                isActive={hoveredId === node.id}
                showAll={showAll}
                onHover={setHoveredId}
              />
            ))}

            {/* Hover tooltip — floats over the diagram, anchored to the hotspot */}
            <AnimatePresence>
              {active && ActiveIcon && (
                <motion.div
                  key={active.id}
                  role="tooltip"
                  initial={{ opacity: 0, scale: 0.96, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 4 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  className="pointer-events-none absolute z-30 w-[min(270px,80%)] overflow-hidden rounded-lg border bg-popover/95 text-left shadow-2xl backdrop-blur-md"
                  style={{ ...getTooltipStyle(active), borderColor: `${active.color}66` }}
                >
                  {/* Accent bar */}
                  <span
                    className="block h-1 w-full"
                    style={{ backgroundColor: active.color }}
                  />

                  <div className="p-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                        style={{
                          color: active.color,
                          backgroundColor: `${active.color}1f`,
                        }}
                      >
                        <ActiveIcon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold leading-tight text-popover-foreground">
                          {active.name}
                        </div>
                        <div className="truncate text-[11px] text-muted-foreground">
                          {active.subtitle}
                        </div>
                      </div>
                    </div>

                    {active.tags && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {active.tags.map((t) => (
                          <Badge key={t} variant="secondary" className="text-[10px]">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <ul className="mt-2 space-y-1">
                      {active.details.map((d, i) => (
                        <li
                          key={i}
                          className="flex gap-1.5 text-[11.5px] leading-snug text-muted-foreground"
                        >
                          <span
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                            style={{ backgroundColor: active.color }}
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    {active.url && (
                      <div
                        className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-medium"
                        style={{ color: active.color }}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Click to open live service
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hint row */}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Hover any block for details · pulsing dots open live services
            </span>
            <a
              href="/imgs/arch.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary transition-opacity hover:opacity-80"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View full image
            </a>
          </div>


        </div>
      </div>
    </div>
  );
}
