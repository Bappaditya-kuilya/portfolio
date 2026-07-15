"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award, Code } from "lucide-react";

const milestones = [
  {
    icon: GraduationCap,
    title: "B.Tech Computer Science",
    organization: "University of Engineering & Management, Kolkata",
    period: "2024 — 2028 (Present)",
    description: "Pursuing B.Tech in Computer Science Engineering with a focus on systems, software development, and AI-driven problem solving.",
    highlights: ["AI/ML Focus", "Hackathon Winner 2026", "Engineering Journey"],
  },
  {
    icon: Code,
    title: "AI Systems Engineering",
    organization: "Self-Directed Learning & Projects",
    period: "2024 — Present",
    description: "Building intelligent systems, automation tools, and LLM-powered applications. Deep expertise in Python, TensorFlow, and modern web stacks.",
    highlights: ["AI Workflows", "Security Tooling", "LLM Optimization"],
  },
  {
    icon: Award,
    title: "Full Stack Development",
    organization: "Projects, Freelance Builds & Product Prototypes",
    period: "2024 — Present",
    description: "Designing and shipping end-to-end web products across frontend, backend, APIs, and deployment workflows with a strong product engineering mindset.",
    highlights: ["React & Next.js", "Backend APIs", "Hackathon Winner 2026"],
  },
  {
    icon: Briefcase,
    title: "Open Source Contributor",
    organization: "GitHub Community",
    period: "2026 — Present",
    description: "Contributing to AI/ML open source projects, building tools that help developers work smarter with language models.",
    highlights: ["LLM Tools", "Python Libraries", "Documentation"],
  },
];

function TimelineItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isLeft = index % 2 === 0;

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative flex items-center gap-8 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? "lg:text-right" : "lg:text-left"}`}>
        <div className="glass-card rounded-sm p-6 lg:p-8 hover:border-sakura/30 transition-all duration-500">
          <div className={`flex items-center gap-3 mb-4 ${isLeft ? "lg:justify-end" : ""}`}>
            <div className="p-2 rounded-sm bg-sakura/10 text-sakura">
              <milestone.icon className="w-5 h-5" />
            </div>
            <span className="font-jetbrains text-xs text-sakura tracking-wider">
              {milestone.period}
            </span>
          </div>

          <h3 className="font-cinzel text-xl text-foreground mb-1">{milestone.title}</h3>
          <p className="font-inter text-sm text-sakura-light mb-4">{milestone.organization}</p>
          <p className="font-inter text-sm text-foreground-muted leading-relaxed mb-4">
            {milestone.description}
          </p>

          <div className={`flex flex-wrap gap-2 ${isLeft ? "lg:justify-end" : ""}`}>
            {milestone.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-3 py-1 border border-sakura/20 rounded-sm text-xs font-inter text-sakura-light"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center Line */}
      <div className="hidden lg:flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-sakura border-4 border-background" />
        <div className="w-px h-full bg-sakura/20 min-h-[100px]" />
      </div>

      {/* Spacer */}
      <div className="flex-1 hidden lg:block" />
    </m.div>
  );
}

export default function Journey() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sakura/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-sakura/40" />
            <span className="font-inter text-xs text-sakura tracking-[0.3em] uppercase">
              Journey
            </span>
            <div className="h-px w-12 bg-sakura/40" />
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            Path of <span className="text-gradient-sakura">Discipline</span>
          </h2>
        </m.div>

        {/* Timeline */}
        <div className="relative space-y-12 lg:space-y-0">
          {/* Vertical Line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-sakura/10 -translate-x-1/2" />

          {milestones.map((milestone, index) => (
            <TimelineItem key={milestone.title} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
