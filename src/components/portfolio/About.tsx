export function About() {
  return (
    <section id="about" className="section-space" aria-labelledby="about-title">
      <div className="site-width about-layout">
        <div className="about-person"><video autoPlay loop muted playsInline preload="auto" poster="/resized.png" width={180} height={180} aria-label="Animated portrait of Yash Bhangale"><source src="/yash-bhangale.webm" type="video/webm" /><source src="/yash-bhangale.mp4" type="video/mp4" /></video><h2 id="about-title">Builder first.{" "}<br />Always learning.</h2></div>
        <div className="about-copy"><p className="large-prose">My work sits between software and the systems it runs on.</p><p>I started with AI and data science, moved into full-stack development, and found my focus in cloud infrastructure and DevOps. Today, I combine that software background with infrastructure automation, security, and cloud architecture.</p><p>From client cloud environments to my own Kubernetes homelab, I learn by building the whole thing—and understanding what happens when it breaks.</p><div className="recognition"><h3>Along the way</h3><p>Mumbai Hacks — 1st prize<br />Smart India Hackathon — Runner-up</p><p>B.Tech, Artificial Intelligence &amp; Data Science<br />Dattameghe College of Engineering · Graduated 2025 · CGPA 8.3</p></div></div>
      </div>
    </section>
  );
}
