import { useState } from "react";
import { COLORS } from "../theme";
import { useIsMobile } from "../hooks";
import { Reveal, SectionDivider, SectionHeader, GlassCard, GlowOrb } from "./ui";

const SERVICES = [
  { icon: "⚡", title: "Web Development", desc: "PHP/Laravel and React apps with clean code, MVC architecture, database design, and REST APIs.", color: "#00ff88" },
  { icon: "🌐", title: "Network Design", desc: "LAN/WAN architecture, IP addressing & subnetting, routing, and network documentation.", color: "#00f5ff" },
  { icon: "🖥️", title: "Server Admin", desc: "Windows Server & Linux setup, system administration, and maintenance.", color: "#4f8ef7" },
  { icon: "☁️", title: "Virtualization", desc: "VirtualBox & VMware setup, VM deployment and configuration.", color: "#b855ff" },
  { icon: "🐳", title: "Dockerized Deployments", desc: "Containerizing full-stack apps with Docker for consistent, portable environments.", color: "#ffd700" },
  { icon: "📊", title: "IT Consulting", desc: "Infrastructure planning, tech evaluation, and digital transformation roadmaps.", color: "#ff6b6b" },
];

export default function ServicesSection() {
  const isMobile = useIsMobile();
  return (
    <>
    <SectionDivider color1="#b855ff" color2="#00ff88" />
    <section id="services" style={{ padding: isMobile ? "70px 1.25rem" : "100px 2rem", position: "relative" }}>
      <GlowOrb x="80%" y="40%" color={COLORS.purple} size={300} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader tag="05. Services" title="What I Offer" center />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} effect="slideUp" delay={i * 100}>
            <GlassCard accentColor={s.color}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: `${s.color}22`, border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: "1rem" }}>{s.icon}</div>
              <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.7, fontFamily: "'Space Grotesk', sans-serif" }}>{s.desc}</p>
            </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
