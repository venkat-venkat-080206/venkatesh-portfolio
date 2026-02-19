"use client";

import { Canvas } from "@react-three/fiber";
import HeroBackground from "@/components/dom/HeroBackground";
import HeroTitle from "@/components/dom/HeroTitle";
import IridescentTrail from "@/components/dom/IridescentTrail";
import AboutMe from "@/components/dom/AboutMe";
import MySkills from "@/components/dom/MySkills";
import LivingParticleBackground from "@/components/dom/LivingParticleBackground";
import GradientBackground from "@/components/dom/GradientBackground";
import SelectedWorks from "@/components/dom/SelectedWorks";
import Certificates from "@/components/dom/Certificates";
import Contact from "@/components/dom/Contact";
import BentoMenu from "@/components/dom/BentoMenu";

export default function Home() {
  return (
    <main className="relative w-full">

      {/* LAYER 1: Fixed Background (z-0) - Gradient + Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 2.8], fov: 65 }} dpr={[1, 2]} gl={{ alpha: true }}>
          <GradientBackground />
          <LivingParticleBackground />
        </Canvas>
      </div>

      {/* LAYER 2: Hero Section (z-20) - Opaque Black, covers background initially */}
      <section className="relative z-20 w-full h-screen overflow-hidden">
        <HeroTitle />
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: true }}>
            <HeroBackground />
            <IridescentTrail />
          </Canvas>
        </div>
      </section>

      {/* LAYER 3: Content Sections (z-10) - Vertical Stack */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Section 2: About Me */}
        <AboutMe />
        {/* Section 3: Skills */}
        <MySkills />

        {/* Section 4: Selected Works */}
        <SelectedWorks />

        {/* Section 5: Certificates */}
        <Certificates />

        {/* Section 6: Contact */}
        <Contact />
      </div>

      <BentoMenu />

    </main>
  );
}

