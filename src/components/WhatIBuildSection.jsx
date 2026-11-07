import { useState } from "react";
import { COLORS } from "../theme";
import { useIsMobile } from "../hooks";
import { Reveal, SectionDivider, SectionHeader, GlassCard, GlowOrb } from "./ui";

const WHAT_I_BUILD = [
  { icon: "⚡", label: "Full-Stack Web Applications", color: "#00ff88" },
  { icon: "🔐", label: "Secure REST APIs & Authentication", color: "#00f5ff" },
  { icon: "📊", label: "Admin Dashboards", color: "#4f8ef7" },
  { icon: "🎟️", label: "Event & Reservation Systems", color: "#b855ff" },
  { icon: "🌐", label: "Responsive React Interfaces", color: "#ff4d8d" },
  { icon: "🐳", label: "Dockerized Applications", color: "#ffd700" },
];

export default function WhatIBuildSection() {
  const isMobile = useIsMobile();
  return (
    <>
    <SectionDivider color1="#00f5ff" color2="#b855ff" />
    <section id="what-i-build" style={{ padding: isMobile ? "60px 1.25rem" : "80px 2rem", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader tag="What I Build" title="Building Blocks" center />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {WHAT_I_BUILD.map((item, i) => (
            <Reveal key={item.label} effect="fadeIn" delay={i * 80}>
              <GlassCard accentColor={item.color} style={{ textAlign: "center", padding: "1.25rem 1rem" }}>
                <div style={{ fontSize: 30, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 13, color: "#fff", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.4 }}>{item.label}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
