import { COLORS } from "../theme";

export default function Footer() {
  return (
    <footer style={{ padding: "2.5rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontSize: 26, fontWeight: 800, background: "linear-gradient(135deg, #00f5ff, #b855ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "0.5rem" }}>OH.</div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", marginBottom: "1.25rem" }}>Othmane Hamadellah — Full-Stack Web Developer & Infrastructure Technician</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem" }}>
          {[["💼", "https://www.linkedin.com/in/othmane-hamadellah-83924b310"], ["🐙", "https://github.com/Hamadellah"], ["📧", "mailto:hamadellahotman13@gmail.com"], ["📱", "tel:+212688082991"]].map(([icon, href]) => (
            <a key={href} href={href} style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,245,255,0.15)"; e.currentTarget.style.borderColor = "rgba(0,245,255,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
              {icon}
            </a>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, fontFamily: "'Space Grotesk', sans-serif" }}>© 2026 Othmane Hamadellah. Crafted with passion.</p>
      </div>
    </footer>
  );
}
