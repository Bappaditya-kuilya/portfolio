"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Download, Eye, FileText, Award, BookOpen, Briefcase, Code, X } from "lucide-react";

const resumePdfPath = "/resume.pdf";

const resumeHighlights = [
  {
    icon: BookOpen,
    title: "Education",
    items: [
      "B.Tech CSE — UEM Kolkata",
      "CGPA: 8.11 / 10",
      "Focus: AI/ML Systems",
    ],
  },
  {
    icon: Code,
    title: "Technical Stack",
    items: [
      "Python, JavaScript, React",
      "TensorFlow, LLM APIs",
      "Docker, Git, Linux",
    ],
  },
  {
    icon: Briefcase,
    title: "Projects",
    items: [
      "AI Systems — Workflow Automation",
      "Security Tooling — Root Analysis",
      "LLM Utilities — Token Optimization",
    ],
  },
  {
    icon: Award,
    title: "Achievements",
    items: [
      "Hackathon Winner",
      "160+ LeetCode Problems",
      "Open Source Contributor",
    ],
  },
];

export default function Resume() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sakura/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-sakura/40" />
            <span className="font-inter text-xs text-sakura tracking-[0.3em] uppercase">
              Resume
            </span>
            <div className="h-px w-12 bg-sakura/40" />
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4">
            Professional <span className="text-gradient-sakura">Credentials</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Resume Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Resume Card */}
            <div className="glass-card rounded-sm p-8 relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-sakura/30" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-sakura/30" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-sakura/30" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-sakura/30" />

              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-sakura/10 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-sakura" />
                </div>

                <div>
                  <h3 className="font-cinzel text-2xl text-foreground mb-2">
                    Bappaditya Kuilya
                  </h3>
                  <p className="font-inter text-foreground-muted">
                    AI Systems Engineer • Full Stack Developer
                  </p>
                </div>

                <div className="h-px w-32 mx-auto bg-sakura/20" />

                <p className="font-cormorant text-lg text-foreground-dim italic max-w-md mx-auto">
                  "Building intelligent systems with precision, discipline, and cinematic engineering."
                </p>

                {/* Actions */}
                <div className="flex justify-center gap-4 pt-4">
                  <motion.button
                    onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                    className="flex items-center gap-2 px-6 py-3 bg-sakura/20 border border-sakura/40 rounded-sm text-sm font-inter text-foreground hover:bg-sakura/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </motion.button>
                  <motion.a
                    href={resumePdfPath}
                    download
                    className="flex items-center gap-2 px-6 py-3 border border-foreground/20 rounded-sm text-sm font-inter text-foreground-muted hover:border-foreground/40 hover:text-foreground transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Years", value: "3+" },
                { label: "Projects", value: "10+" },
                { label: "Skills", value: "12+" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="glass-card rounded-sm p-4 text-center"
                  whileHover={{ scale: 1.05, borderColor: "rgba(255,126,182,0.3)" }}
                >
                  <p className="font-cinzel text-2xl text-sakura">{stat.value}</p>
                  <p className="font-inter text-xs text-foreground-muted mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {resumeHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="glass-card rounded-sm p-6 group hover:border-sakura/30 transition-all duration-500"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-sm bg-sakura/10 text-sakura group-hover:bg-sakura/20 transition-colors duration-300">
                    <highlight.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-cinzel text-lg text-foreground mb-3 group-hover:text-sakura transition-colors duration-300">
                      {highlight.title}
                    </h4>
                    <ul className="space-y-2">
                      {highlight.items.map((item) => (
                        <li
                          key={item}
                          className="font-inter text-sm text-foreground-muted flex items-center gap-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-sakura/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Preview Modal */}
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-sm p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-cinzel text-2xl text-foreground">Resume Preview</h3>
                  <p className="font-inter text-sm text-foreground-muted">
                    Live PDF preview from the uploaded resume file.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={resumePdfPath}
                    download
                    className="hidden items-center gap-2 border border-sakura/30 px-4 py-2 font-inter text-sm text-sakura transition-colors duration-300 hover:bg-sakura/10 sm:flex"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    aria-label="Close resume preview"
                    className="border border-foreground/10 p-2 text-foreground-muted transition-colors duration-300 hover:border-sakura/30 hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden rounded-sm border border-sakura/10 bg-white">
                <iframe
                  src={`${resumePdfPath}#toolbar=1&navpanes=0&view=FitH`}
                  title="Bappaditya Kuilya resume PDF"
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
