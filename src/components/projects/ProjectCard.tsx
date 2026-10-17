import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article id={project.id} className="catalog-project">
      <figure className="project-figure">
        <a href={project.image} target="_blank" rel="noopener noreferrer" className="project-image" aria-label={`Open ${project.shortTitle} image at full size`}>
          <Image src={project.image} alt={project.architectureAlt || project.title} width={project.imageWidth ?? 1280} height={project.imageHeight ?? 853} sizes="(max-width: 800px) 100vw, 48vw" style={{ width: "100%", height: "100%" }} />
        </a>
        <figcaption><span>{project.category}</span><span>{project.status}</span></figcaption>
      </figure>
      <div className="project-content">
        <h2>{project.shortTitle}</h2>
        <p>{project.summary}</p>
        <p className="technology-line">{project.technologies.slice(0, 5).join(" · ")}</p>
        <details className="manual-details">
          <summary>Read project details<span className="sr-only"> for {project.shortTitle}</span></summary>
          <div>
            <p>{project.description}</p>
            <h3>What I built</h3>
            <ul>{project.achievements.map(achievement => <li key={achievement}>{achievement}</li>)}</ul>
            {project.pipelineScreenshot && <figure className="pipeline-figure"><a href={project.pipelineScreenshot.src} target="_blank" rel="noopener noreferrer" aria-label="Open Jenkins pipeline stage view at full size"><Image src={project.pipelineScreenshot.src} alt={project.pipelineScreenshot.alt} width={project.pipelineScreenshot.width} height={project.pipelineScreenshot.height} sizes="(max-width: 800px) 100vw, 48vw" /></a><figcaption>{project.pipelineScreenshot.caption}. Select image to view full size.</figcaption></figure>}
            <h3>Full stack</h3><p className="technology-line">{project.technologies.join(" · ")}</p>
          </div>
        </details>
        <div className="project-links">
          <a href={project.image} target="_blank" rel="noopener noreferrer">{project.architecture ? "View architecture" : "View image"}<ArrowUpRight size={14} /><span className="sr-only"> for {project.shortTitle}</span></a>
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">View code <ArrowUpRight size={14} /><span className="sr-only"> for {project.shortTitle}</span></a>}
          {project.liveUrl && project.liveUrl !== project.githubUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">View site <ArrowUpRight size={14} /><span className="sr-only"> for {project.shortTitle}</span></a>}
          {project.referenceUrl && <a href={project.referenceUrl} target="_blank" rel="noopener noreferrer">Reference <ArrowUpRight size={14} /><span className="sr-only"> for {project.shortTitle}</span></a>}
          {project.detailsUrl && <Link href={project.detailsUrl}>Explore homelab <ArrowUpRight size={14} /></Link>}
        </div>
      </div>
    </article>
  );
}
