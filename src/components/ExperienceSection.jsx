import { useState } from "react";
import { COLORS } from "../theme";
import { useIsMobile } from "../hooks";
import { Reveal, SectionDivider, SectionHeader, GlassCard, GlowOrb } from "./ui";

export default function ExperienceSection() {
  const isMobile = useIsMobile();
  const items = [
    { year: "2025–2026", title: "Spécialisation Développement Web PHP", org: "ENAA — École Numérique Ahmed Al Hansali", desc: "Advanced specialization in PHP web development, deepening full-stack skills built during the ISTA program.", color: COLORS.cyan, icon: "💻", kind: "Education" },
    { year: "2022–2024", title: "Technicien Spécialisé en Infrastructures Digitales", org: "ISTA NTIC Beni Mellal — Option Systèmes et Réseaux", desc: "Specialized diploma in digital infrastructure: networking, system administration, virtualization, and PHP/Laravel web development.", color: COLORS.purple, icon: "🎓", kind: "Education" },
    { year: "2023", title: "CCNAv7 – Introduction to Networks", org: "Cisco Networking Academy", desc: "OSI model, TCP/IP, basic routing and switching, IPv4/IPv6 addressing, and Ethernet technologies.", color: COLORS.blue, icon: "🌐", kind: "Certification" },
    { year: "2023", title: "CCNAv7 – Enterprise Networking, Security & Automation", org: "Cisco Networking Academy", desc: "OSPF, BGP, ACLs, VPNs, network security concepts, and automation fundamentals.", color: "#00ff88", icon: "🔒", kind: "Certification" },
  ];

  if (isMobile) {
    return (
      <>
      <SectionDivider color1="#4f8ef7" color2="#b855ff" />
      <section id="experience" style={{ padding: "70px 1.25rem", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHeader tag="04. Education & Certifications" title="My Journey" />
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", paddingLeft: "1.5rem", borderLeft: `2px solid rgba(0,245,255,0.2)` }}>
            {items.map((item, i) => (
              <Reveal key={item.title} effect="fadeLeft" delay={i * 120}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: -28, top: 18, width: 14, height: 14, borderRadius: "50%", background: item.color, boxShadow: `0 0 12px ${item.color}` }} />
                <GlassCard accentColor={item.color} style={{ padding: "1rem" }}>
                  <span style={{ fontSize: 20, marginBottom: 6, display: "block" }}>{item.icon}</span>
                  <span style={{ fontSize: 11, color: item.color, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1 }}>{item.kind} · {item.year}</span>
                  <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: "5px 0", fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                  <div style={{ fontSize: 12, color: item.color, marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>{item.org}</div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>{item.desc}</p>
                </GlassCard>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      </>
    );
  }

  return (
    <>
    <SectionDivider color1="#4f8ef7" color2="#b855ff" />
    <section id="experience" style={{ padding: "100px 2rem", position: "relative" }}>
      <GlowOrb x="-5%" y="50%" color={COLORS.cyan} size={300} />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader tag="04. Education & Certifications" title="My Journey" center />
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, transparent, rgba(0,245,255,0.3), transparent)", transform: "translateX(-50%)" }} />
          {items.map((item, i) => (
            <Reveal key={item.title} effect={i % 2 === 0 ? "fadeLeft" : "fadeRight"} delay={i * 100}>
            <div style={{ display: "flex", gap: "2rem", marginBottom: "2.5rem", flexDirection: i % 2 === 0 ? "row" : "row-reverse", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <GlassCard accentColor={item.color}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                  <span style={{ fontSize: 11, color: item.color, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1 }}>{item.kind} · {item.year}</span>
                  <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: "5px 0", fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                  <div style={{ fontSize: 12, color: item.color, marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>{item.org}</div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>{item.desc}</p>
                </GlassCard>
              </div>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: item.color, flexShrink: 0, marginTop: 18, boxShadow: `0 0 16px ${item.color}`, zIndex: 1 }} />
              <div style={{ flex: 1 }} />
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
