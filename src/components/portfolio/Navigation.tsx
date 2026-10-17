"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { usePathname } from "next/navigation";

const resumeUrl = "https://drive.google.com/file/d/1n-1y_jhFgNIF7MCfV0ktf_QFfucBD5cX/view";
const links = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Writing", href: "/blog" },
  { label: "Ask AI", href: "/ask-ai" },
];
function subscribeTheme(callback: () => void) {
  window.addEventListener("portfolio-theme", callback);
  return () => window.removeEventListener("portfolio-theme", callback);
}
function themeSnapshot() { return document.documentElement.classList.contains("dark"); }

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDark = useSyncExternalStore(subscribeTheme, themeSnapshot, () => true);
  useEffect(() => {
    try { document.documentElement.classList.toggle("dark", localStorage.getItem("portfolio-theme-v2") !== "light"); } catch { /* Use the default theme when storage is unavailable. */ }
    window.dispatchEvent(new Event("portfolio-theme"));
  }, []);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  const toggleTheme = () => {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("portfolio-theme-v2", dark ? "dark" : "light"); } catch { /* Theme still works for this visit. */ }
    window.dispatchEvent(new Event("portfolio-theme"));
  };
  return (
    <header className="site-header">
      <nav className="site-width nav-layout" aria-label="Main navigation">
        <Link className="wordmark" href="/" onClick={() => setMenuOpen(false)}>Yash Bhangale<span aria-hidden="true">.</span></Link>
        <div className="nav-desktop">
          {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={14} /></a>
        </div>
        <div className="nav-utilities">
          <a className="nav-contact" href="mailto:yashbhangale9@gmail.com">Let’s talk <ArrowUpRight size={15} /></a>
          <button className="icon-button" onClick={toggleTheme} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {menuOpen && <div id="mobile-navigation" className="mobile-navigation">
          {[...links, { label: "Skills", href: "/#skills" }, { label: "Homelab", href: "/homelab" }, { label: "Contact", href: "/#contact" }].map(link => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={16} /></Link>)}
          <a href="https://notes.yashbhangale.site" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Notes <ArrowUpRight size={16} /></a>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Résumé <ArrowUpRight size={16} /></a>
        </div>}
      </nav>
    </header>
  );
}
