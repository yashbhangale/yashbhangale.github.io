import type { Metadata } from "next";
import { Contact } from "@/components/portfolio/Contact";
import { Navigation } from "@/components/portfolio/Navigation";
import { AIWidget } from "@/components/ai/AIWidget";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Cloud infrastructure, DevSecOps automation, Kubernetes platforms, AI tooling, and products built by Yash Bhangale. Explore architectures and implementation details.",
  alternates: { canonical: "https://yashbhangale.site/projects" },
  openGraph: {
    title: "Projects | Yash Bhangale",
    description: "Selected infrastructure, automation, and product engineering work, with architecture diagrams and source code.",
    url: "https://yashbhangale.site/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content">
        <header className="catalog-header">
          <div className="site-width">
            <h1>Projects.</h1>
            <div className="catalog-intro"><p>Cloud foundations, security automation, self-hosted systems, and products. The architecture and the work behind each build.</p><span>{projects.length} projects · Built by Yash Bhangale</span></div>
          </div>
        </header>
        <div className="site-width project-catalog">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </main>
      <Contact />
      <AIWidget />
    </div>
  );
}
