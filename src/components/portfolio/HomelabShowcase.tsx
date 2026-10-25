import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HomelabShowcase() {
  return (
    <section className="lab-section" aria-labelledby="lab-title">
      <div className="site-width lab-layout">
        <div><h2 id="lab-title">The work{" "}<br />after work.</h2><p>An old gaming laptop. A Kubernetes cluster. A place to build, break, and understand the systems I work with.</p><p className="lab-services">K3s · ArgoCD · Cloudflare Tunnel · Tailscale<br />Self-hosted storage, media, local AI, and automation.</p><Link href="/homelab" className="text-action">Explore my homelab <ArrowUpRight size={18} /></Link></div>
        <Link href="/homelab" className="lab-plate" aria-label="Explore the interactive Kubernetes homelab architecture"><Image src="/imgs/homelab-public.svg" alt="K3s homelab architecture with GitOps, Cloudflare Tunnel ingress, private Tailscale access, and self-hosted applications" width={1672} height={941} sizes="(max-width: 800px) 100vw, 56vw" /></Link>
      </div>
    </section>
  );
}
