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
  return (
    <div className="min-h-screen bg-background">
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
