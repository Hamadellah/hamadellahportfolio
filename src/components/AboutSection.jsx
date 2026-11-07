import { useState } from "react";
import { COLORS } from "../theme";
import { useIsMobile } from "../hooks";
import { Reveal, SectionDivider, SectionHeader, GlassCard, GlowOrb } from "./ui";

export default function AboutSection() {
  const isMobile = useIsMobile();
  return (
    <>
    <SectionDivider color1="#00f5ff" color2="#4f8ef7" />
    <section id="about" style={{ padding: isMobile ? "70px 1.25rem" : "100px 2rem", position: "relative" }}>
      <GlowOrb x="70%" y="50%" color={COLORS.blue} size={300} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader tag="01. About Me" title="Who I Am" />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "4rem", alignItems: "center" }}>
          <Reveal effect="fadeLeft" delay={100}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.9, fontSize: 15, marginBottom: "1.25rem", fontFamily: "'Space Grotesk', sans-serif" }}>
              Full-Stack Web Developer specialized in PHP/Laravel and React, with a background in Digital Infrastructure, Systems and Networks. I build secure, scalable and user-focused web applications, from REST APIs and authentication to modern responsive interfaces.
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.9, fontSize: 15, marginBottom: "1.5rem", fontFamily: "'Space Grotesk', sans-serif" }}>
              Motivated and rigorous, I combine backend development, frontend integration and infrastructure knowledge to build complete digital solutions.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0.75rem" }}>
              {[["📍", "Beni Mellal, Morocco"], ["📧", "hamadellahotman13@gmail.com"], ["📱", "+212 688082991"], ["🌐", "Arabic, French, English"]].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "'Space Grotesk', sans-serif", wordBreak: "break-all" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[{ icon: "⚡", title: "Full-Stack Dev", desc: "PHP, Laravel, REST API on the back end; React, JavaScript on the front end", color: "#00ff88" },
              { icon: "🧩", title: "Frameworks", desc: "Laravel, React, Bootstrap, Tailwind CSS", color: "#b855ff" },
              { icon: "🌐", title: "Networking", desc: "CCNA certified: TCP/IP configuration, IP addressing & subnetting, routing", color: "#00f5ff" },
              { icon: "🖥️", title: "Systems", desc: "Windows Server, Linux administration, virtualization (VirtualBox / VMware)", color: "#4f8ef7" },
            ].map(({ icon, title, desc, color }, i) => (
              <Reveal key={title} effect="fadeIn" delay={150 + i * 100}>
              <GlassCard accentColor={color} style={{ padding: "1rem" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
                <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif" }}>{desc}</p>
              </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
