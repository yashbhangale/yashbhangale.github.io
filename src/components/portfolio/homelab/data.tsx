// Shared data model + inline icons for the homelab architecture showcase.
// Used by both the homepage <HomelabShowcase /> and the dedicated /homelab route.

// ---- Self-contained inline SVG icons (no external icon library) -----------

type IconProps = { className?: string };
export type IconComponent = React.FC<IconProps>;

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

// ---- Data model (sourced from the homelab documentation) ------------------
// Each node maps to a hoverable/tappable hotspot over the architecture image.
// hotspot values are percentages relative to the 1672x941 diagram.

export type Hotspot = { left: number; top: number; width: number; height: number };

export type HomelabNode = {
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

const BASE_NODES: HomelabNode[] = [
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

// Single, on-brand blue accent applied to every node so the whole diagram
// stays monochrome (blue / white / black) and matches the portfolio theme.
// The per-node `color` values above are intentionally overridden here.
export const ACCENT = "#3b82f6";

export const NODES: HomelabNode[] = BASE_NODES.map((n) => ({
  ...n,
  color: ACCENT,
}));

// Quick lookup by id.
export const NODE_BY_ID: Record<string, HomelabNode> = Object.fromEntries(
  NODES.map((n) => [n.id, n])
);

// Publicly reachable, live self-hosted services.
export const LIVE_SERVICES = NODES.filter((n) =>
  n.url?.includes("yashbhangale.site")
);

// ---- Zone groupings (for the detailed /homelab analysis page) -------------

export type Zone = {
  id: string;
  title: string;
  summary: string;
  nodeIds: string[];
};

export const ZONES: Zone[] = [
  {
    id: "external",
    title: "External Network & Security",
    summary:
      "The public cloud tier: visitors, the GitOps source of truth, and the public key used to seal secrets — all outside the home network.",
    nodeIds: ["users", "github", "sealed-key"],
  },
  {
    id: "edge",
    title: "Public Internet & Edge Security",
    summary:
      "Cloudflare terminates TLS and filters every request with WAF + DDoS protection before anything reaches home.",
    nodeIds: ["cf-edge"],
  },
  {
    id: "admin",
    title: "Remote Administrator Access",
    summary:
      "A private, VPN-only management path. The control plane is never exposed to the public internet.",
    nodeIds: ["admin", "tailscale"],
  },
  {
    id: "ingress",
    title: "Ingress & Network Tier (DMZ)",
    summary:
      "A zero-trust Cloudflare Tunnel handles app ingress, while the K3s API stays reachable only over Tailscale.",
    nodeIds: ["tunnel", "k3s-api"],
  },
  {
    id: "management",
    title: "Management Namespace",
    summary:
      "GitOps delivery (ArgoCD) and secret management (Sealed Secrets) that keep the cluster continuously in sync with Git.",
    nodeIds: ["argocd", "github-sync", "sealed-controller", "sealedsecret"],
  },
  {
    id: "apps",
    title: "Application Namespaces",
    summary:
      "Nine self-hosted services, each isolated in its own namespace with dedicated storage.",
    nodeIds: [
      "homeassistant",
      "nextcloud",
      "paperless",
      "filebrowser",
      "openwebui",
      "jellyfin",
      "kavita",
      "kasm",
    ],
  },
  {
    id: "storage",
    title: "Storage",
    summary:
      "A shared hostPath media library plus per-app persistent volumes — upload once, read everywhere.",
    nodeIds: ["storage"],
  },
];

// ---- Tooltip positioning helper -------------------------------------------
// Positions the floating tooltip near its hotspot while keeping it inside the
// image frame. Horizontal center is clamped; the tooltip flips above/below the
// hotspot depending on whether it sits in the top or bottom half of the image.
export function getTooltipStyle(node: HomelabNode): React.CSSProperties {
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
