"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Target, Wrench, TrendingUp } from "lucide-react";
import { featuredProjects } from "../../lib/featuredProjects";

export default function FeaturedProjects() {
  if (featuredProjects.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px w-12 bg-sakura/40" />
        <span className="font-inter text-xs uppercase tracking-[0.3em] text-sakura">
          Featured Work
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-card group relative overflow-hidden rounded-sm p-7"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sakura/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 font-inter text-[10px] uppercase tracking-[0.24em] text-sakura/80">
                  {project.tagline}
                </p>
                <h3 className="font-cinzel text-2xl text-foreground transition-colors duration-300 group-hover:text-sakura">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source`}
                    className="rounded-sm border border-foreground/10 p-2 text-foreground-muted transition-all duration-300 hover:border-sakura/30 hover:text-sakura"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live`}
                    className="rounded-sm border border-foreground/10 p-2 text-foreground-muted transition-all duration-300 hover:border-sakura/30 hover:text-sakura"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <dl className="space-y-4">
              {[
                { icon: Target, label: "Problem", value: project.problem },
                { icon: Wrench, label: "Approach", value: project.approach },
                { icon: TrendingUp, label: "Result", value: project.result },
              ].map((row) => (
                <div key={row.label} className="flex gap-3">
                  <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-sakura/70" />
                  <div>
                    <dt className="font-inter text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
                      {row.label}
                    </dt>
                    <dd className="font-inter text-sm leading-relaxed text-foreground-dim">
                      {row.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-sakura/10 pt-4">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm border border-sakura/15 bg-sakura/5 px-3 py-1 font-jetbrains text-xs text-sakura-light"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
