import { skillCategories } from "@/data/profile";
const names: Record<keyof typeof skillCategories, string> = { cloud: "Cloud & infrastructure", devops: "Delivery & observability", backend: "Backend & systems", frontend: "Frontend & Web3", databases: "Data & persistence", tools: "Tools & workflow" };
const order = ["cloud", "devops", "backend", "frontend", "databases", "tools"] as const;
export function Skills() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-title">
      <div className="site-width"><div className="section-heading"><h2 id="skills-title">The toolkit.</h2><p>Across the stack, with a focus on infrastructure.</p></div><dl className="skills-list">{order.map(key => <div key={key}><dt>{names[key]}</dt><dd>{skillCategories[key].join(" · ")}</dd></div>)}</dl></div>
    </section>
  );
}
