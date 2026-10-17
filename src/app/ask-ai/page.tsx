import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/portfolio/Navigation";
import { Contact } from "@/components/portfolio/Contact";
import { AIChatbot } from "@/components/ai/AIChatbot";

export const metadata: Metadata = {
  title: "Ask AI",
  description: "Ask Yash Bhangale’s AI assistant about his projects, infrastructure experience, skills, and work.",
  alternates: { canonical: "https://yashbhangale.site/ask-ai" },
  openGraph: { title: "Ask AI | Yash Bhangale", description: "Explore Yash’s engineering work through a dedicated AI assistant.", url: "https://yashbhangale.site/ask-ai", type: "website" },
};

export default function AskAIPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="site-width ai-page">
        <div className="ai-page-layout">
          <div className="ai-page-intro">
            <h1>Ask.<br /><span>Explore.</span><br />Go deeper.</h1>
            <p>Curious about my work? Ask about the AWS landing zone, DevSecOps scanner, Kubernetes homelab, or the tools I use. This is your shortcut to the details.</p>
            <Link href="/projects" className="text-action">Prefer to browse? View projects <ArrowUpRight size={17} /></Link>
            <p className="ai-note">Powered by Gemini. AI answers can be imperfect—use the project pages for the source details, or contact me directly.</p>
          </div>
          <div className="ai-chat-surface"><AIChatbot /></div>
        </div>
      </main>
      <Contact />
    </div>
  );
}
