import Image from "next/image";
import { ArrowUpRight, BriefcaseBusiness, Building2 } from "lucide-react";
import { certifications, workExperience, resumeUrl } from "@/data/profile";

export function Experience() {
  return (
    <section id="experience" className="section-space" aria-labelledby="experience-title">
      <div className="site-width">
        <div className="section-heading">
          <h2 id="experience-title">Experience.</h2>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-action">View résumé <ArrowUpRight size={18} /></a>
        </div>
        <div className="experience-list">
          {workExperience.map((item, index) => (
            <article key={item.company} className="experience-row">
              <div className="experience-date">{item.period}<span>{item.location.replace("½ ", "")}</span></div>
              <div className="experience-content">
                <div className="experience-heading">
                  <div className={`experience-logo${item.logo ? "" : " experience-logo-placeholder"}`} aria-hidden="true">
                    {item.logo ? <Image src={item.logo} alt="" width={80} height={64} sizes="80px" /> : item.company === "Freelance Projects" ? <BriefcaseBusiness size={26} /> : <Building2 size={26} />}
                  </div>
                  <div>
                    <h3>{item.position}</h3>
                    <p className="experience-company">{item.website ? <a href={`https://${item.website}`} target="_blank" rel="noopener noreferrer">{item.company} <ArrowUpRight size={14} /></a> : item.company}</p>
                  </div>
                </div>
                <p>{item.description}</p>
                <details className="manual-details" open={index === 0}>
                  <summary>Ownership &amp; outcomes</summary>
                  <div><ul>{item.achievements.map(achievement => <li key={achievement}>{achievement}</li>)}</ul><p className="technology-line">{item.technologies.join(" · ")}</p></div>
                </details>
              </div>
            </article>
          ))}
        </div>
        <div className="certification-list"><h3>Certifications &amp; learning</h3><dl>{certifications.map(cert => <div key={cert.name}><dt>{cert.name}</dt><dd>{cert.description}<span>{cert.issuer}</span></dd></div>)}</dl></div>
      </div>
    </section>
  );
}
