import { useState, useEffect } from "react";
import { COLORS, NAV_ITEMS, CV_URL, CV_FILENAME } from "../theme";

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled || menuOpen ? "rgba(5,5,16,0.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(0,245,255,0.08)" : "none", transition: "all 0.3s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, padding: "0 1.25rem" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, background: "linear-gradient(135deg, #00f5ff, #b855ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>OH.</span>
        {/* Desktop nav */}
        <div id="desktop-nav" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => scrollTo(item)} style={{ background: "none", border: "none", cursor: "pointer", color: active === item.toLowerCase() ? COLORS.cyan : "rgba(255,255,255,0.6)", fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 500, transition: "color 0.2s", borderBottom: active === item.toLowerCase() ? `2px solid ${COLORS.cyan}` : "2px solid transparent", paddingBottom: 2 }}>{item}</button>
          ))}
          <a href={CV_URL} download={CV_FILENAME} style={{ background: "transparent", color: COLORS.cyan, border: `1px solid ${COLORS.cyan}`, padding: "8px 18px", borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", whiteSpace: "nowrap" }}>Download CV</a>
          <a href="mailto:hamadellahotman13@gmail.com" style={{ background: "linear-gradient(135deg, #00f5ff, #4f8ef7)", color: "#000", padding: "8px 20px", borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", whiteSpace: "nowrap" }}>Hire Me</a>
        </div>
        {/* Hamburger */}
        <button id="hamburger-btn" onClick={() => setMenuOpen(m => !m)} style={{ display: "none", background: "none", border: "1px solid rgba(0,245,255,0.3)", borderRadius: 8, cursor: "pointer", color: "#fff", fontSize: 20, width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "rgba(5,5,16,0.98)", padding: "0.5rem 1.25rem 1.5rem", borderTop: "1px solid rgba(0,245,255,0.1)" }}>
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => scrollTo(item)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", color: active === item.toLowerCase() ? COLORS.cyan : "rgba(255,255,255,0.8)", fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, padding: "14px 0" }}>{item}</button>
          ))}
          <a href={CV_URL} download={CV_FILENAME} style={{ display: "block", marginTop: "1rem", background: "transparent", color: COLORS.cyan, border: `1px solid ${COLORS.cyan}`, padding: "12px", borderRadius: 8, textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif" }}>Download CV</a>
          <a href="mailto:hamadellahotman13@gmail.com" style={{ display: "block", marginTop: "0.75rem", background: "linear-gradient(135deg, #00f5ff, #4f8ef7)", color: "#000", padding: "12px", borderRadius: 8, textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif" }}>Hire Me</a>
        </div>
      )}
    </nav>
  );
}
