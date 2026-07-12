import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  Boxes,
  Cloud,
  Cpu,
  ExternalLink,
  GitBranch,
  HardDrive,
  ImageIcon,
  KeyRound,
  Lock,
  Network,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Navigation } from "@/components/portfolio/Navigation";
import { AIWidget } from "@/components/ai/AIWidget";
import { Badge } from "@/components/ui/badge";
import { InteractiveDiagram } from "@/components/portfolio/homelab/InteractiveDiagram";
import {
  LIVE_SERVICES,
  NODE_BY_ID,
  ZONES,
  type HomelabNode,
} from "@/components/portfolio/homelab/data";

export const metadata: Metadata = {
  title: "Homelab Architecture",
  description:
    "A deep dive into Yash Bhangale's self-hosted homelab: a single K3s node behind Cloudflare Tunnel and Tailscale, running nine services with GitOps via ArgoCD and Sealed Secrets. Interactive diagram plus a full zone-by-zone breakdown.",
  keywords: [
    "homelab architecture",
    "k3s single node",
    "cloudflare tunnel",
    "tailscale vpn",
    "argocd gitops",
    "sealed secrets",
    "self-hosted services",
    "kubernetes homelab",
    "jellyfin nextcloud paperless",
    "yash bhangale homelab",
  ],
  alternates: {
    canonical: "https://yashbhangale.site/homelab",
  },
  openGraph: {
    title: "Homelab Architecture | Yash Bhangale",
    description:
      "Interactive diagram and full breakdown of a single-node K3s homelab: zero-trust ingress, VPN-only admin, GitOps delivery, and nine self-hosted services.",
    url: "https://yashbhangale.site/homelab",
    siteName: "Hire Yash Bhangale - DevOps & Cloud Specialist",
    type: "website",
    images: [
      {
        url: "/imgs/arch.png",
        width: 1672,
        height: 941,
        alt: "Homelab architecture diagram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Homelab Architecture | Yash Bhangale",
    description:
      "Interactive diagram and full breakdown of a single-node K3s homelab with zero-trust ingress and GitOps delivery.",
    images: ["/imgs/arch.png"],
  },
};

const SPECS = [
  { icon: Server, label: "Single K3s node · Ubuntu host" },
  { icon: Cpu, label: "Ryzen 5 · 15.5 GB RAM" },
  { icon: Boxes, label: "9 self-hosted services" },
  { icon: Lock, label: "Admin via Tailscale" },
];

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Zero-trust ingress",
    body: "No router ports are forwarded. A Cloudflare Tunnel pod dials out and routes each hostname to an in-cluster service, with WAF, DDoS protection, and TLS handled at the edge.",
  },
  {
    icon: Network,
    title: "Private control plane",
    body: "The K3s API (:6443) and all admin access are reachable only over a Tailscale mesh VPN  never exposed to the public internet.",
  },
  {
    icon: GitBranch,
    title: "GitOps everything",
    body: "ArgoCD continuously reconciles the cluster against a Git repository. Push a manifest change and it applies automatically  the repo is the single source of truth.",
  },
  {
    icon: KeyRound,
    title: "Secrets safe in Git",
    body: "Sealed Secrets encrypt values with a public key client-side. Only the in-cluster controller holds the private key, so encrypted secrets are safe to commit publicly.",
  },
  {
    icon: HardDrive,
    title: "Shared media library",
    body: "A single /srv/media hostPath is mounted across apps  writers like Nextcloud and Filebrowser add files, readers like Jellyfin and Kavita serve them. Upload once, read everywhere.",
  },
  {
    icon: Cloud,
    title: "Namespace isolation",
    body: "Each service runs in its own Kubernetes namespace with dedicated persistent volumes, keeping configuration, storage, and blast radius separated.",
  },
];

function LiveDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2 w-2" title="Live service">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

function NodeCard({ node }: { node: HomelabNode }) {
  const Icon = node.icon;
  return (
    <div
      className="flex h-full flex-col rounded-xl border bg-card/60 p-4 transition-colors hover:bg-card"
      style={{ borderColor: `${node.color}33` }}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ color: node.color, backgroundColor: `${node.color}1f` }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold leading-tight">{node.name}</h3>
            {node.url && <LiveDot color={node.color} />}
          </div>
          <p className="text-xs text-muted-foreground">{node.subtitle}</p>
        </div>
      </div>

      {node.tags && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {node.tags.map((t) => (
            <Badge key={t} variant="secondary" className="text-[10px]">
              {t}
            </Badge>
          ))}
        </div>
      )}

      <ul className="mt-3 space-y-1.5">
        {node.details.map((d, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: node.color }}
            />
            <span>{d}</span>
          </li>
        ))}
      </ul>

      {node.url && (
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 self-start rounded-md px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: node.color }}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open live service
        </a>
      )}
    </div>
  );
}

export default function HomelabPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Homelab Architecture",
    description:
      "A single-node K3s homelab behind Cloudflare Tunnel and Tailscale, running nine self-hosted services with GitOps via ArgoCD and Sealed Secrets.",
    url: "https://yashbhangale.site/homelab",
    image: "https://yashbhangale.site/imgs/arch.png",
    author: {
      "@type": "Person",
      name: "Yash Bhangale",
      url: "https://yashbhangale.site",
      jobTitle: "DevOps Engineer",
    },
    about: [
      "Kubernetes",
      "K3s",
      "Cloudflare Tunnel",
      "Tailscale",
      "ArgoCD",
      "GitOps",
      "Self-hosting",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navigation />

      <div className="container mx-auto px-4 py-10 sm:py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        {/* Header */}
        <header className="mt-6 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Homelab <span className="text-primary">Architecture</span>
            </h1>
            <Badge variant="secondary" className="text-xs">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              Self-hosted · Live
            </Badge>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A production-style homelab running on a{" "}
            <span className="font-medium text-foreground">single K3s node</span>.
            Public traffic enters only through the Cloudflare edge and a
            zero-trust tunnel; administration happens exclusively over a
            Tailscale VPN; and the whole cluster is delivered with GitOps via
            ArgoCD. Explore the interactive diagram below, or dig into the full
            zone-by-zone breakdown.
          </p>

          {/* Specs */}
          <div className="flex flex-wrap gap-2">
            {SPECS.map((s) => {
              const Icon = s.icon;
              return (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {s.label}
                </span>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="/imgs/arch.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <ImageIcon className="h-4 w-4" />
              View full-resolution diagram
            </a>
            <a
              href="https://github.com/yashbhangale"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <GitBranch className="h-4 w-4" />
              GitOps repository
            </a>
          </div>
        </header>

        {/* Interactive diagram */}
        <section className="mt-10">
          <div className="overflow-hidden rounded-xl border bg-card p-3 shadow-lg sm:p-4">
            <InteractiveDiagram priority minWidth={820} />
          </div>
        </section>

        {/* Key design principles */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Key design principles
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-xl border bg-card/60 p-5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-semibold">{p.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Zone-by-zone breakdown */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Zone-by-zone breakdown
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Traffic flows from the public cloud, through Cloudflare and the
            tunnel, into the cluster tiers. Here is every component grouped by
            its zone.
          </p>

          <div className="mt-8 space-y-12">
            {ZONES.map((zone, zi) => {
              const nodes = zone.nodeIds
                .map((id) => NODE_BY_ID[id])
                .filter(Boolean) as HomelabNode[];
              return (
                <div key={zone.id}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-primary">
                      {String(zi + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">{zone.title}</h3>
                      <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
                        {zone.summary}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {nodes.map((node) => (
                      <NodeCard key={node.id} node={node} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live services quick access */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Live services
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {LIVE_SERVICES.length} publicly reachable, self-hosted services.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LIVE_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border bg-card/60 p-3 transition-all hover:-translate-y-0.5 hover:bg-card hover:shadow-md"
                  style={{ borderColor: `${s.color}33` }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-transform group-hover:scale-110"
                    style={{ color: s.color, backgroundColor: `${s.color}1f` }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium leading-tight">
                      {s.name}
                    </span>
                    <span className="block truncate text-[11px] text-muted-foreground">
                      {s.subtitle}
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              );
            })}
          </div>
        </section>
      </div>

      <AIWidget />
    </div>
  );
}
