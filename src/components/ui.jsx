import { useState } from "react";
import { COLORS } from "../theme";
import { useReveal } from "../hooks";

// Wrapper: animates children into view with a chosen effect
export function Reveal({ children, effect = "fadeUp", delay = 0, style = {} }) {
  const [ref, visible] = useReveal(0.1);
  const base = { transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`, willChange: "opacity, transform" };
  const hidden = {
    fadeUp:    { opacity: 0, transform: "translateY(48px)" },
    fadeLeft:  { opacity: 0, transform: "translateX(-60px)" },
    fadeRight: { opacity: 0, transform: "translateX(60px)" },
    fadeIn:    { opacity: 0, transform: "scale(0.94)" },
    slideUp:   { opacity: 0, transform: "translateY(80px) scale(0.97)" },
  }[effect] || { opacity: 0 };
  const shown = { opacity: 1, transform: "translateY(0) translateX(0) scale(1)" };
  return (
    <div ref={ref} style={{ ...base, ...(visible ? shown : hidden), ...style }}>
      {children}
    </div>
  );
}

// Stagger wrapper: each child gets an increasing delay
export function RevealGroup({ children, effect = "fadeUp", stagger = 100, baseDelay = 0 }) {
  return (
    <>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Reveal key={i} effect={effect} delay={baseDelay + i * stagger}>{child}</Reveal>
          ))
        : <Reveal effect={effect} delay={baseDelay}>{children}</Reveal>}
    </>
  );
}

// Glowing divider between sections
export function SectionDivider({ color1 = "#00f5ff", color2 = "#b855ff" }) {
  const [ref, visible] = useReveal(0.5);
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 2rem", overflow: "hidden" }}>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, transparent, ${color1}44)`, transition: "opacity 1s ease", opacity: visible ? 1 : 0 }} />
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color1, margin: "0 12px", boxShadow: `0 0 12px ${color1}`, transition: "opacity 0.8s 0.3s ease, transform 0.8s 0.3s cubic-bezier(0.22,1,0.36,1)", opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0)" }} />
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color2, margin: "0 8px", boxShadow: `0 0 10px ${color2}`, transition: "opacity 0.8s 0.45s ease, transform 0.8s 0.45s cubic-bezier(0.22,1,0.36,1)", opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0)" }} />
      <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#fff", margin: "0 8px", transition: "opacity 0.8s 0.55s ease, transform 0.8s 0.55s cubic-bezier(0.22,1,0.36,1)", opacity: visible ? 0.4 : 0, transform: visible ? "scale(1)" : "scale(0)" }} />
      <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${color2}44, transparent)`, transition: "opacity 1s ease", opacity: visible ? 1 : 0 }} />
    </div>
  );
}

export function GlowOrb({ x, y, color, size = 300 }) {
  return <div style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: color, filter: "blur(80px)", opacity: 0.1, pointerEvents: "none" }} />;
}

export function GlassCard({ children, accentColor = COLORS.cyan, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)", border: `1px solid ${hovered ? accentColor + "44" : "rgba(255,255,255,0.08)"}`, borderRadius: 16, padding: "1.25rem", transition: "all 0.3s ease", boxShadow: hovered ? `0 0 30px ${accentColor}22` : "none", transform: hovered ? "translateY(-4px)" : "translateY(0)", ...style }}>
      {children}
    </div>
  );
}

export function SectionHeader({ tag, title, center = false }) {
  return (
    <Reveal effect="fadeUp" delay={0}>
    <div style={{ marginBottom: "3rem", textAlign: center ? "center" : "left" }}>
      <span style={{ color: COLORS.cyan, fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>{tag}</span>
      <h2 style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)", fontWeight: 800, color: "#fff", margin: "0.5rem 0 0", fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h2>
      <div style={{ width: 60, height: 3, background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.purple})`, borderRadius: 2, marginTop: "1rem", marginLeft: center ? "auto" : 0, marginRight: center ? "auto" : 0 }} />
    </div>
    </Reveal>
  );
}
