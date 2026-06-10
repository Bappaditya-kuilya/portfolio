"use client";

import SakuraParticles from "./components/SakuraParticles";
import CustomCursor from "./components/CustomCursor";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Journey from "./sections/Journey";
import Skills from "./sections/Skills";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Premium pointer */}
      <CustomCursor />

      {/* Atmospheric Effects */}
      <SakuraParticles />

      {/* Vignette Overlay */}
      <div className="vignette" />

      {/* Moonlight Bloom Effects */}
      <div className="moonlight-bloom top-0 right-0" style={{ transform: "translate(30%, -30%)" }} />
      <div 
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-20"
        style={{
          background: "radial-gradient(circle, rgba(255,126,182,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          bottom: "10%",
          left: "-10%",
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <Hero />
      <About />
      <Projects />
      <Journey />
      <Skills />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}
