import { useCallback, useEffect, useState } from "react";
import { NAV_ITEMS } from "./theme";
import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import WhatIBuildSection from "./components/WhatIBuildSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

export default function App() {
  const [portraitReady, setPortraitReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [active, setActive] = useState("home");

  const onPortraitReady = useCallback(() => setPortraitReady(true), []);
  const onLoaderDone = useCallback(() => setLoaderDone(true), []);

  // Highlight the nav item of the section in view.
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.toLowerCase());
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.3 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Safety net: never trap the visitor behind the loader.
  useEffect(() => {
    const t = setTimeout(() => setPortraitReady(true), 25000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: "transparent", minHeight: "100vh", color: "#fff", position: "relative", overflowX: "hidden" }}>
      <AmbientBackground />
      <Navbar active={active} />
      <Hero play={loaderDone} onReady={onPortraitReady} />
      <AboutSection />
      <WhatIBuildSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
      {!loaderDone && <Loader ready={portraitReady} onDone={onLoaderDone} />}
    </div>
  );
}
