import { skillCategories } from "@/data/profile";
const names: Record<keyof typeof skillCategories, string> = { cloud: "Cloud foundations", platform: "Kubernetes & platforms", security: "Security & governance", delivery: "Delivery & observability", ai: "AI infrastructure & cost", engineering: "Supporting engineering" };
const order = ["cloud", "platform", "security", "delivery", "ai", "engineering"] as const;
export function Skills() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-title">
      <div className="site-width"><div className="section-heading"><h2 id="skills-title">The toolkit.</h2><p>AWS, Kubernetes, security, and AI infrastructure first.</p></div><dl className="skills-list">{order.map(key => <div key={key}><dt>{names[key]}</dt><dd>{skillCategories[key].join(" · ")}</dd></div>)}</dl></div>
    </section>
  );
}
