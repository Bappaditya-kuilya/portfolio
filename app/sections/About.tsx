"use client";

import { m, useInView } from "framer-motion";
import { MapPin, GraduationCap, Target, Activity, Heart, Languages } from "lucide-react";
import { useRef } from "react";

const infoCards = [
  {
    icon: MapPin,
    label: "Location",
    value: "Kolkata, India",
    description: "Building from the City of Joy",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Tech CSE",
    description: "University of Engineering & Management",
    subvalue: "CGPA 8.11",
  },
  {
    icon: Target,
    label: "Focus",
    value: "AI Systems",
    description: "Intelligent automation & LLM engineering",
  },
  {
    icon: Activity,
    label: "Status",
    value: "Available",
    description: "Open to opportunities & collaborations",
  },
  {
    icon: Heart,
    label: "Interests",
    value: "ML Research",
    description: "Deep learning, NLP, System design",
  },
  {
    icon: Languages,
    label: "Languages",
    value: "English, Bengali",
    description: "Hindi — conversational",
  },
];

function InfoCard({ card, index }: { card: typeof infoCards[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card rounded-sm p-6 group hover:scale-[1.02] transition-all duration-500"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-sm bg-sakura/10 text-sakura group-hover:bg-sakura/20 transition-colors duration-300">
          <card.icon className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="font-inter text-[10px] text-foreground-muted tracking-[0.2em] uppercase">
            {card.label}
          </p>
          <p className="font-cinzel text-lg text-foreground">{card.value}</p>
          {card.subvalue && (
            <p className="font-jetbrains text-sm text-sakura">{card.subvalue}</p>
          )}
          <p className="font-inter text-sm text-foreground-muted leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>
    </m.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sakura/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-sakura/40" />
            <span className="font-inter text-xs text-sakura tracking-[0.3em] uppercase">
              About Me
            </span>
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-3xl">
            Building Intelligent
            <br />
            <span className="text-gradient-sakura">Systems That Matter.</span>
          </h2>
        </m.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Bio */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card rounded-sm p-8">
              <p className="font-inter text-foreground-dim leading-relaxed text-lg mb-6">
                I&apos;m a Computer Science Engineering student passionate about creating AI-powered systems, 
                automation tools, and seamless digital experiences.
              </p>
              <p className="font-inter text-foreground-muted leading-relaxed mb-6">
                I believe in writing clean code, building scalable architectures, and crafting products 
                that actually make a difference. My approach combines technical precision with artistic 
                sensibility — every line of code is written with intention.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-sakura/10">
                <div className="w-10 h-10 rounded-full bg-sakura/20 flex items-center justify-center">
                  <span className="font-cinzel text-sm text-sakura">B</span>
                </div>
                <div>
                  <p className="font-cormorant text-lg text-foreground italic">Bappaditya Kuilya</p>
                  <p className="font-inter text-xs text-foreground-muted">AI Systems Engineer</p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="glass-card rounded-sm p-6 border-l-2 border-sakura/30">
              <p className="font-cormorant text-xl text-foreground-dim italic leading-relaxed">
                &ldquo;Discipline, Grace, Precision. That is the way I build.&rdquo;
              </p>
            </div>
          </m.div>

          {/* Info Cards Grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {infoCards.map((card, index) => (
              <InfoCard key={card.label} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
