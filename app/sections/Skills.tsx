"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers3,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
} from "lucide-react";

const skills = [
  { name: "Python", level: 95, category: "Language", color: "#ff7eb6", icon: Terminal, accent: "sakura" },
  { name: "JavaScript", level: 90, category: "Language", color: "#e8d7b9", icon: Code2, accent: "champagne" },
  { name: "React", level: 88, category: "Frontend", color: "#9fb3c8", icon: Layers3, accent: "steel" },
  { name: "Node.js", level: 85, category: "Backend", color: "#f4b6d2", icon: Server, accent: "sakura" },
  { name: "TensorFlow", level: 82, category: "AI/ML", color: "#e8d7b9", icon: BrainCircuit, accent: "champagne" },
  { name: "LLM APIs", level: 90, category: "AI/ML", color: "#ff7eb6", icon: Cpu, accent: "sakura" },
  { name: "Docker", level: 78, category: "DevOps", color: "#9fb3c8", icon: Server, accent: "steel" },
  { name: "Git", level: 92, category: "Tools", color: "#f4b6d2", icon: GitBranch, accent: "sakura" },
  { name: "Streamlit", level: 85, category: "Tools", color: "#e8d7b9", icon: Sparkles, accent: "champagne" },
  { name: "SQL", level: 80, category: "Database", color: "#9fb3c8", icon: Database, accent: "steel" },
  { name: "Linux", level: 88, category: "System", color: "#ff7eb6", icon: Terminal, accent: "sakura" },
  { name: "DSA", level: 85, category: "Core", color: "#e8d7b9", icon: ShieldCheck, accent: "champagne" },
];

const categories = ["All", "Language", "Frontend", "Backend", "AI/ML", "DevOps", "Tools", "Database", "System", "Core"];

const stats = [
  { value: "8.11", label: "CGPA", detail: "academic precision", icon: Trophy },
  { value: "Winner", label: "Hackathon", detail: "rapid execution", icon: Sparkles },
  { value: "60+", label: "LeetCode", detail: "problem solving", icon: Code2 },
  { value: "AI", label: "Systems Builder", detail: "automation focus", icon: BrainCircuit },
];

function getAccentClass(accent: string) {
  if (accent === "steel") return "from-[#9fb3c8]/25 via-white/[0.03] to-transparent";
  if (accent === "champagne") return "from-[#e8d7b9]/25 via-white/[0.03] to-transparent";
  return "from-sakura/25 via-white/[0.03] to-transparent";
}

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const circumference = 2 * Math.PI * 34;
  const offset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 28, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
      className="group relative min-h-[16.5rem] overflow-hidden rounded-[6px] border border-white/[0.08] bg-[#0a090d]/70 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
      whileHover={{ y: -8, scale: 1.015 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${getAccentClass(skill.accent)} opacity-70 transition-opacity duration-500 group-hover:opacity-100`} />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40" />
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-white/10 bg-white/[0.025] transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute bottom-0 left-0 h-28 w-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.055),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[6px] border border-white/10 bg-white/[0.045] text-foreground shadow-inner">
              <skill.icon className="h-5 w-5" style={{ color: skill.color }} />
            </div>
            <p className="font-inter text-[10px] uppercase tracking-[0.24em] text-foreground-muted">
              {skill.category}
            </p>
          </div>

          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
              <motion.circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke={skill.color}
                strokeLinecap="round"
                strokeWidth="4"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={isInView ? { strokeDashoffset: offset } : {}}
                transition={{ duration: 1.35, delay: index * 0.05 + 0.25, ease: "easeOut" }}
                className="drop-shadow-[0_0_10px_rgba(255,126,182,0.45)]"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-jetbrains text-sm text-foreground">{skill.level}%</span>
            </div>
          </div>
        </div>

        <h4 className="mb-5 font-cinzel text-2xl text-foreground transition-colors duration-300 group-hover:text-sakura">
          {skill.name}
        </h4>

        <div className="mt-auto">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-inter text-[10px] uppercase tracking-[0.24em] text-foreground-muted">
              Mastery
            </span>
            <span className="font-inter text-[10px] uppercase tracking-[0.24em] text-foreground-muted">
              calibrated
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-black/40">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : {}}
              transition={{ duration: 1.2, delay: index * 0.05 + 0.35, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${skill.color}, rgba(255,255,255,0.88))`,
                boxShadow: `0 0 22px ${skill.color}66`,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 + index * 0.08 }}
      className="group relative overflow-hidden rounded-[6px] border border-white/[0.08] bg-white/[0.025] p-6 text-center backdrop-blur-xl"
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sakura/60 to-transparent" />
      <stat.icon className="mx-auto mb-4 h-5 w-5 text-sakura/70 transition-transform duration-500 group-hover:scale-110" />
      <p className="mb-1 font-cinzel text-3xl text-foreground transition-colors duration-300 group-hover:text-sakura">
        {stat.value}
      </p>
      <p className="font-inter text-sm text-foreground-muted">{stat.label}</p>
      <p className="mt-2 font-inter text-[10px] uppercase tracking-[0.22em] text-foreground-muted/70">
        {stat.detail}
      </p>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredSkills = useMemo(
    () => skills.filter((skill) => activeCategory === "All" || skill.category === activeCategory),
    [activeCategory]
  );
  const averageLevel = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length);

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,126,182,0.035),transparent)] pointer-events-none" />
      <div className="absolute left-1/2 top-24 h-px w-[70rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-sakura/25 to-transparent" />
      <div className="absolute right-0 top-0 h-[36rem] w-[36rem] bg-violet-glow/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-sakura/40" />
              <span className="font-inter text-xs uppercase tracking-[0.3em] text-sakura">
                Technical Skills
              </span>
            </div>
            <h2 className="font-cormorant text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
              Arsenal of
              <br />
              <span className="text-gradient-sakura">living expertise.</span>
            </h2>
          </div>

          <div className="rounded-[6px] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-inter text-[10px] uppercase tracking-[0.28em] text-sakura">
                  Mastery Index
                </p>
                <p className="mt-1 font-cormorant text-2xl text-foreground">
                  Precision stack calibrated for AI systems.
                </p>
              </div>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-sakura/20 bg-sakura/10">
                <span className="font-jetbrains text-lg text-sakura">{averageLevel}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-[4px] border px-3 py-2 font-inter text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
                    activeCategory === category
                      ? "border-sakura/50 bg-sakura/15 text-foreground shadow-[0_0_22px_rgba(255,126,182,0.12)]"
                      : "border-white/[0.08] bg-white/[0.025] text-foreground-muted hover:border-sakura/25 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
