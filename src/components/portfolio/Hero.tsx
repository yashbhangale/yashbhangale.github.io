import Link from "next/link";
import { ArrowDown, ArrowUpRight, MessageSquare, Download } from "lucide-react";
import { SystemExplorer } from "@/components/portfolio/SystemExplorer";

import { resumeDownloadUrl } from "@/data/profile";

export function Hero() {
  return (
    <section id="hero" className="hero-field" aria-labelledby="intro-title">
      <div className="site-width hero-layout">
        <div className="hero-intro">
          <h1 id="intro-title"><span>Cloud.</span><span>Code.</span><span className="hero-accent">Control.</span></h1>
          <p className="hero-role">I’m Yash Bhangale.<br />Cloud / DevOps Engineer · AWS · Kubernetes · AI Infrastructure.</p>
          <p className="hero-description">I design and automate secure cloud platforms—from enterprise AWS landing zones and Kubernetes GPU infrastructure to DevSecOps pipelines and infrastructure governance.</p>
          <div className="hero-actions"><a href={resumeDownloadUrl} className="manual-button" target="_blank" rel="noopener noreferrer">Download résumé <Download size={17} /></a><Link href="#projects" className="hero-ai-link">Explore my work <ArrowDown size={17} /></Link><Link href="/ask-ai" className="hero-ai-link"><MessageSquare size={16} /> Ask my AI <ArrowUpRight size={16} /></Link></div>
          <div className="hero-contact" aria-label="Contact Yash">
            <a className="hero-contact-email" href="mailto:yashbhangale9@gmail.com"><span>Let’s talk</span><span>yashbhangale9@gmail.com <ArrowUpRight size={16} /></span></a>
            <div className="hero-contact-links"><a href="tel:+918169362024">+91 81693 62024</a><a href="https://linkedin.com/in/yashbhangale" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} /></a></div>
          </div>
        </div>
        <SystemExplorer />
        <div className="hero-footnote"><span>Maharashtra, India · Open to international remote roles</span><a href="mailto:yashbhangale9@gmail.com">Let’s build something that works <ArrowUpRight size={14} /></a></div>
      </div>
    </section>
  );
}
