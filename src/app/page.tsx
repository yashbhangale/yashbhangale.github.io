import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { Navigation } from "@/components/portfolio/Navigation";
import { AnchorHandler } from "@/components/portfolio/AnchorHandler";
import { AIWidget } from "@/components/ai/AIWidget";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yash Bhangale",
    "jobTitle": "Software Engineer",
    "description": "Software Engineer specializing in backend development, cloud integration, and scalable applications",
    "url": "https://yashbhangale.github.io",
    "sameAs": [
      "https://github.com/yashbhangale",
      "https://linkedin.com/in/yashbhangale",
      "https://twitter.com/yashbhangale"
    ],
    "knowsAbout": [
      "Node.js",
      "Python", 
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Java",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Kubernetes",
      "DevOps",
      "Backend Development",
      "Cloud Computing",
      "Web Development"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "B.Tech AI & Data Science"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Engineer",
      "occupationLocation": {
        "@type": "Place",
        "name": "Remote"
      },
      "skills": "Backend Development, Cloud Integration, Full-Stack Development"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <AnchorHandler />
      <Navigation />
      <main className="space-y-16 sm:space-y-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <AIWidget />
    </div>
  );
}
