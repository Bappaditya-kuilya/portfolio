import dynamic from "next/dynamic";
import Atmosphere from "./components/Atmosphere";
import MotionProvider from "./components/MotionProvider";
import Navigation from "./components/Navigation";
import Hero from "./sections/Hero";
import Footer from "./components/Footer";

// Below-the-fold, content-bearing sections are code-split into their own
// chunks. They are still server-rendered (ssr: true by default), so all
// textual content stays in the HTML for SEO — only their client JS is
// deferred until after the hero is interactive.
const About = dynamic(() => import("./sections/About"));
const Projects = dynamic(() => import("./sections/Projects"));
const Journey = dynamic(() => import("./sections/Journey"));
const Skills = dynamic(() => import("./sections/Skills"));
const Resume = dynamic(() => import("./sections/Resume"));
const Contact = dynamic(() => import("./sections/Contact"));

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Atmospheric overlays (deferred, non-blocking) */}
      <Atmosphere />

      {/* Static vignette + moonlight bloom (CSS only, no JS) */}
      <div className="vignette" />
      <div
        className="moonlight-bloom top-0 right-0"
        style={{ transform: "translate(30%, -30%)" }}
      />
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-20"
        style={{
          background: "radial-gradient(circle, rgba(255,126,182,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          bottom: "10%",
          left: "-10%",
        }}
      />

      <MotionProvider>
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Journey />
        <Skills />
        <Resume />
        <Contact />
        <Footer />
      </MotionProvider>
    </main>
  );
}
