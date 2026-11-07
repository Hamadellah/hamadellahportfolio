import { useState } from "react";
import { COLORS } from "../theme";
import { useIsMobile } from "../hooks";
import { Reveal, SectionDivider, SectionHeader, GlassCard, GlowOrb } from "./ui";

const PROJECTS = [
  {
    title: "PharmaFEFO — Pharmaceutical Stock Management",
    desc: "Developed a pharmaceutical stock management application based on the FEFO (First Expired, First Out) method. The system manages medicine batches, expiration dates, stock entries and exits, expiry alerts, returns, and expired-product loss tracking.",
    tags: ["PHP", "MySQL", "PDO", "MVC", "Bootstrap"],
    color: "#00f5ff",
    emoji: "💊",
    href: "https://github.com/Hamadellah/parmaciefefo.git",
    demo: null
  },
  {
    title: "BDE Events — Student Event Management",
    desc: "Full-stack student event management platform built with a Laravel REST API and React. Includes authentication, role-based access control, event management, reservations, capacity tracking and digital reservation tickets.",
    tags: ["Laravel", "PHP", "React", "MySQL", "REST API", "Sanctum", "Docker"],
    color: "#b855ff",
    emoji: "🎟️",
    href: "https://github.com/Hamadellah/BDE-Events.git",
    demo: null
  },
  {
    title: "LinkUp — Professional Social Network",
    desc: "Developed a professional social networking platform with secure authentication, user profiles, posts, likes, comments, follow/unfollow, reposts, and saved posts. Implemented Laravel Eloquent relationships, Form Requests, middleware, and Policies for access control.",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS", "REST API"],
    color: "#ff4d8d",
    emoji: "🌐",
    href: "https://github.com/Hamadellah/linkUP.git",
    demo: null
  },
  {
    title: "EduQuiz — Academic Management Platform",
    desc: "Contributed to a team-based academic management platform featuring dedicated dashboards for administrators, teachers, and students. The application manages users, classes, courses, enrollments, academic progress, and role-based access.",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap"],
    color: "#39d98a",
    emoji: "📚",
    href: "https://github.com/Ihsane-benmouina/EduQuiz-Application-de-Quiz.git",
    demo: null
  },
];

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)", border: `1px solid ${hovered ? project.color + "55" : "rgba(255,255,255,0.08)"}`, borderRadius: 16, overflow: "hidden", transition: "all 0.35s ease", transform: hovered ? "translateY(-6px)" : "translateY(0)", boxShadow: hovered ? `0 16px 50px ${project.color}22` : "none" }}>
      <div style={{ height: 150, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 60, opacity: hovered ? 1 : 0.7, transition: "all 0.3s", transform: hovered ? "scale(1.1)" : "scale(1)" }}>{project.emoji}</div>
        <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.25)", transition: "background 0.3s" }} />
      </div>
      <div style={{ padding: "1rem 1.25rem" }}>
        <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6, marginBottom: "0.75rem", fontFamily: "'Space Grotesk', sans-serif" }}>{project.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: "0.9rem" }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}33`, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a href={project.href} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: "center", background: project.color, color: "#000", border: "none", borderRadius: 6, padding: "8px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", textDecoration: "none" }}>GitHub ↗</a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: "center", background: "transparent", color: project.color, border: `1px solid ${project.color}`, borderRadius: 6, padding: "8px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", textDecoration: "none" }}>Live Demo ↗</a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const isMobile = useIsMobile();
  return (
    <>
    <SectionDivider color1="#00f5ff" color2="#b855ff" />
    <section id="projects" style={{ padding: isMobile ? "70px 1.25rem" : "100px 2rem", position: "relative" }}>
      <GlowOrb x="50%" y="20%" color={COLORS.cyan} size={300} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader tag="03. Projects" title="Featured Work" center />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} effect="slideUp" delay={i * 100}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
