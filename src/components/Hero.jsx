import { Component, useEffect, useMemo, useRef, useState } from "react";
import { COLORS, CV_URL, CV_FILENAME } from "../theme";
import { useIsMobile, useTypingEffect } from "../hooks";
import { Reveal, GlowOrb } from "./ui";
import Scene from "./Scene";
import WebGLFallback, { hasWebGL } from "./WebGLFallback";
import { pickParticleCount } from "../utils/generatePoints";

class PortraitBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.error("[portrait] falling back to the static image:", err);
    this.props.onFail?.();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function HeroSection({ play, onReady }) {
  const typed = useTypingEffect(["Full-Stack Web Developer", "PHP/Laravel Developer", "React Developer", "REST API Developer", "Laravel & React Developer"]);
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const webgl = useMemo(() => hasWebGL(), []);
  const count = useMemo(() => pickParticleCount(), []);
  const reducedMotion = useMemo(() => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false, []);

  // Pause the render loop while the hero is off-screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // No WebGL: nothing to wait for.
  useEffect(() => {
    if (!webgl) onReady?.();
  }, [webgl, onReady]);

  const fallback = <WebGLFallback compact={isMobile} />;

  return (
    <section ref={sectionRef} id="home" style={{ minHeight: "100svh", display: "flex", alignItems: isMobile ? "flex-end" : "center", position: "relative", overflow: "hidden", padding: isMobile ? "56svh 1.25rem 3rem" : "0 2rem" }}>
      {/* 3D particle portrait — the visual centrepiece */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: isMobile ? "62svh" : "100%", zIndex: 0 }}>
        {webgl ? (
          <PortraitBoundary fallback={fallback} onFail={onReady}>
            <Scene count={count} play={play} active={visible} reducedMotion={reducedMotion} onReady={onReady} />
          </PortraitBoundary>
        ) : (
          fallback
        )}
      </div>
      {/* soft vignette so the copy stays readable over the particles */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: isMobile ? "linear-gradient(180deg, transparent 38%, rgba(5,5,16,0.92) 66%)" : "linear-gradient(90deg, rgba(5,5,16,0.88) 0%, rgba(5,5,16,0.55) 34%, transparent 58%)" }} />

      <GlowOrb x="-100px" y="10%" color={COLORS.cyan} size={isMobile ? 250 : 500} />
      <GlowOrb x="60%" y="20%" color={COLORS.purple} size={isMobile ? 200 : 400} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "4rem", alignItems: "center", pointerEvents: "none" }}>
        {/* Text side */}
        <div style={{ pointerEvents: "auto" }}>
          <Reveal effect="fadeLeft" delay={100}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 20, padding: "6px 14px", marginBottom: "1.25rem" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00ff88", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ color: COLORS.cyan, fontSize: 12, fontFamily: "'Space Grotesk', sans-serif" }}>Available for opportunities</span>
          </div>
          </Reveal>
          <Reveal effect="fadeLeft" delay={220}>
          <h1 style={{ fontSize: "clamp(2rem, 8vw, 4rem)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 1rem", fontFamily: "'Space Grotesk', sans-serif", color: "#fff" }}>
            Hi, I'm <span style={{ background: "linear-gradient(135deg, #00f5ff, #b855ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Othmane</span>
          </h1>
          </Reveal>
          <Reveal effect="fadeLeft" delay={340}>
          <div style={{ fontSize: "clamp(1rem, 4vw, 1.8rem)", fontWeight: 600, minHeight: 44, marginBottom: "1.25rem", fontFamily: "'Space Grotesk', sans-serif" }}>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>I'm a </span>
            <span style={{ color: COLORS.cyan }}>{typed}</span>
            <span style={{ color: COLORS.cyan, animation: "blink 1s infinite" }}>|</span>
          </div>
          </Reveal>
          <Reveal effect="fadeLeft" delay={440}>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 480, marginBottom: "2rem", fontSize: 15, fontFamily: "'Space Grotesk', sans-serif" }}>
            Full-Stack Web Developer specialized in PHP/Laravel and React, building secure REST APIs and MySQL-backed applications with Docker — backed by a Digital Infrastructure, Systems & Networks foundation.
          </p>
          </Reveal>
          <Reveal effect="fadeUp" delay={560}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "linear-gradient(135deg, #00f5ff, #4f8ef7)", color: "#000", padding: "12px 24px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14 }}>View Projects →</button>
            <a href="mailto:hamadellahotman13@gmail.com" style={{ background: "transparent", color: COLORS.cyan, padding: "12px 24px", borderRadius: 8, border: `1px solid ${COLORS.cyan}`, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, textDecoration: "none", display: "inline-block" }}>Get In Touch</a>
            <a href={CV_URL} download={CV_FILENAME} style={{ background: "rgba(255,255,255,0.05)", color: "#fff", padding: "12px 24px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>📄 Download CV</a>
          </div>
          </Reveal>
          <Reveal effect="fadeUp" delay={700}>
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem" }}>
            {[["4", "Featured Projects"], ["2", "CCNA Certs"], ["FR/EN/AR", "Languages"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 26, fontWeight: 800, background: "linear-gradient(135deg, #00f5ff, #b855ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "'Space Grotesk', sans-serif" }}>{n}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Space Grotesk', sans-serif" }}>{l}</div>
              </div>
            ))}
          </div>
          </Reveal>
        </div>

        {/* Portrait side: the canvas fills the hero, this column only reserves the space */}
        {!isMobile && (
          <div style={{ position: "relative", height: 420 }}>
            {[{ top: "8%", right: "2%", label: "Laravel", icon: "⚡" }, { bottom: "14%", left: "6%", label: "React", icon: "⚛️" }, { top: "44%", right: "-2%", label: "REST API", icon: "🔌" }].map(({ top, right, bottom, left, label, icon }) => (
              <div key={label} style={{ position: "absolute", top, right, bottom, left, background: "rgba(10,10,26,0.8)", border: "1px solid rgba(0,245,255,0.2)", backdropFilter: "blur(10px)", borderRadius: 12, padding: "7px 12px", display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {webgl && <div aria-hidden="true" style={{ position: "absolute", bottom: 18, left: 0, width: isMobile ? "100%" : "50%", textAlign: "center", zIndex: 2, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontFamily: "'Space Grotesk', sans-serif", pointerEvents: "none" }}>
        {isMobile ? "Touch the portrait" : "Move your cursor · the portrait follows"}
      </div>}
    </section>
  );
}
