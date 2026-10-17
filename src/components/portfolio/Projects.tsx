import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="section-space" aria-labelledby="selected-projects-title">
      <div className="site-width">
        <div className="section-heading"><h2 id="selected-projects-title">Selected work.</h2><Link href="/projects" className="text-action">All projects <ArrowRight size={18} /></Link></div>
        <div className="selected-projects">
          {featuredProjects.map(project => (
            <Link key={project.id} href={`/projects#${project.id}`} className="work-row">
              <div className="work-preview"><Image src={project.image} alt={project.architectureAlt || project.title} width={project.imageWidth ?? 1280} height={project.imageHeight ?? 853} sizes="(max-width: 600px) 180px, 220px" /></div>
              <div className="work-copy"><h3>{project.shortTitle}</h3><p>{project.summary}</p><span>{project.technologies.slice(0, 3).join(" · ")}</span></div>
              <ArrowUpRight className="work-arrow" size={25} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
