import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function Contact() {
  return (
    <footer id="contact" className="contact-section">
      <div className="site-width"><div className="contact-layout"><h2>Let’s build<br />something solid.</h2><div><p>Have an infrastructure challenge, a product to ship, or an engineering role in mind? I’d like to hear about it.</p><a className="contact-email" href="mailto:yashbhangale9@gmail.com">yashbhangale9@gmail.com <ArrowUpRight size={22} /></a><a href="tel:+918169362024" className="contact-phone">+91 81693 62024</a><p className="contact-location">Maharashtra, India · Open to remote work</p></div></div><div className="footer-links"><span>© {new Date().getFullYear()} Yash Bhangale</span><div><a href="https://github.com/yashbhangale" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} /></a><a href="https://linkedin.com/in/yashbhangale" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14} /></a><a href="https://notes.yashbhangale.site" target="_blank" rel="noopener noreferrer">Notes <ArrowUpRight size={14} /></a><Link href="/ask-ai">Ask AI <ArrowUpRight size={14} /></Link></div></div></div>
    </footer>
  );
}
