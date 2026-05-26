"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Code2,
  ExternalLink,
  GitCommitVertical,
  Github,
  GitFork,
  Layers3,
  Sparkles,
  Star,
} from "lucide-react";

const GITHUB_USERNAME = "Bappaditya-kuilya";

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
};

type GithubEvent = {
  id: string;
  type: string;
  created_at: string;
};

type ActivityDay = {
  date: string;
  count: number;
};

const languageColors: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#7dd3fc",
  Python: "#f4b6d2",
  HTML: "#ff9f7e",
  CSS: "#8b5cf6",
  Java: "#f59e0b",
  "C++": "#9ca3af",
  C: "#a5b4fc",
  Shell: "#34d399",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getActivityTone(count: number) {
  if (count >= 8) return "bg-sakura shadow-[0_0_16px_rgba(255,126,182,0.55)]";
  if (count >= 5) return "bg-sakura/75 shadow-[0_0_12px_rgba(255,126,182,0.35)]";
  if (count >= 2) return "bg-sakura/45";
  if (count === 1) return "bg-sakura/25";
  return "bg-white/[0.04]";
}

function buildActivityDays(events: GithubEvent[]) {
  const days: ActivityDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let index = 83; index >= 0; index -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    days.push({
      date: date.toISOString().slice(0, 10),
      count: 0,
    });
  }

  events.forEach((event) => {
    const day = event.created_at.slice(0, 10);
    const activityDay = days.find((item) => item.date === day);
    if (activityDay) {
      activityDay.count += 1;
    }
  });

  return days;
}

function ContributionGraph({ activity }: { activity: ActivityDay[] }) {
  const total = activity.reduce((sum, day) => sum + day.count, 0);
  const activeDays = activity.filter((day) => day.count > 0).length;

  return (
    <div className="glass-card rounded-sm p-5 lg:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <GitCommitVertical className="h-4 w-4 text-sakura" />
            <span className="font-inter text-xs uppercase tracking-[0.3em] text-sakura">
              Live GitHub Pulse
            </span>
          </div>
          <p className="font-cormorant text-2xl text-foreground">Contribution activity</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-right">
          <div>
            <p className="font-cinzel text-2xl text-foreground">{total}</p>
            <p className="font-inter text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
              Events
            </p>
          </div>
          <div>
            <p className="font-cinzel text-2xl text-foreground">{activeDays}</p>
            <p className="font-inter text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
              Active Days
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
          {activity.map((day) => (
            <div
              key={day.date}
              title={`${formatDate(day.date)}: ${day.count} public event${day.count === 1 ? "" : "s"}`}
              className={`h-3 w-3 rounded-[2px] border border-white/[0.03] transition-transform duration-300 hover:scale-125 ${getActivityTone(day.count)}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 text-foreground-muted">
        <p className="font-inter text-xs">Public GitHub activity from recent events</p>
        <div className="flex items-center gap-1">
          <span className="font-inter text-[10px]">Less</span>
          {[0, 1, 3, 6, 9].map((count) => (
            <span key={count} className={`h-3 w-3 rounded-[2px] ${getActivityTone(count)}`} />
          ))}
          <span className="font-inter text-[10px]">More</span>
        </div>
      </div>
    </div>
  );
}

function RepoCard({ repo, index }: { repo: GithubRepo; index: number }) {
  const languageColor = languageColors[repo.language ?? ""] ?? "#ff7eb6";
  const topics = repo.topics?.slice(0, 3) ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group relative min-h-[19rem] overflow-hidden rounded-sm border border-sakura/10 bg-white/[0.025] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-sakura/30 hover:bg-white/[0.04]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sakura/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-sakura/15 bg-sakura/10 text-sakura">
          <Code2 className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${repo.name} source on GitHub`}
            className="rounded-sm border border-foreground/10 p-2 text-foreground-muted transition-all duration-300 hover:border-sakura/30 hover:text-sakura"
          >
            <Github className="h-4 w-4" />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${repo.name} live project`}
              className="rounded-sm border border-foreground/10 p-2 text-foreground-muted transition-all duration-300 hover:border-sakura/30 hover:text-sakura"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <h3 className="mb-3 font-cinzel text-2xl text-foreground transition-colors duration-300 group-hover:text-sakura">
        {repo.name.replaceAll("-", " ")}
      </h3>
      <p className="line-clamp-3 min-h-[4.5rem] font-inter text-sm leading-relaxed text-foreground-muted">
        {repo.description ?? "A public repository from the engineering arsenal, refined through code and iteration."}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {repo.language && (
          <span className="inline-flex items-center gap-2 rounded-sm border border-foreground/10 bg-background-secondary/70 px-3 py-1 text-xs font-inter text-foreground-dim">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: languageColor }} />
            {repo.language}
          </span>
        )}
        {topics.map((topic) => (
          <span
            key={topic}
            className="rounded-sm border border-sakura/15 bg-sakura/5 px-3 py-1 text-xs font-inter text-sakura-light"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-sakura/10 pt-4">
        <div className="flex items-center gap-4 text-foreground-muted">
          <span className="inline-flex items-center gap-1.5 font-jetbrains text-xs">
            <Star className="h-3.5 w-3.5" />
            {repo.stargazers_count}
          </span>
          <span className="inline-flex items-center gap-1.5 font-jetbrains text-xs">
            <GitFork className="h-3.5 w-3.5" />
            {repo.forks_count}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-inter text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(repo.pushed_at)}
        </span>
      </div>
    </motion.article>
  );
}

function RepoSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="min-h-[19rem] rounded-sm border border-sakura/10 bg-white/[0.025] p-6"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="h-11 w-11 rounded-sm bg-sakura/10" />
        <div className="h-9 w-20 rounded-sm bg-white/[0.05]" />
      </div>
      <div className="mb-4 h-7 w-2/3 rounded-sm bg-white/[0.06]" />
      <div className="space-y-3">
        <div className="h-3 w-full rounded-sm bg-white/[0.045]" />
        <div className="h-3 w-5/6 rounded-sm bg-white/[0.045]" />
        <div className="h-3 w-2/3 rounded-sm bg-white/[0.045]" />
      </div>
      <div className="mt-8 flex gap-2">
        <div className="h-7 w-20 rounded-sm bg-white/[0.05]" />
        <div className="h-7 w-24 rounded-sm bg-white/[0.05]" />
      </div>
      <div className="mt-8 h-px bg-sakura/10" />
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasGithubError, setHasGithubError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGithubArsenal() {
      try {
        const repoResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`, {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" },
        });

        if (!repoResponse.ok) {
          throw new Error("GitHub API request failed");
        }

        const repoData = (await repoResponse.json()) as GithubRepo[];
        const polishedRepos = repoData
          .filter((repo) => !repo.fork && !repo.archived)
          .sort((a, b) => {
            const scoreA = a.stargazers_count * 3 + a.forks_count * 2 + new Date(a.pushed_at).getTime() / 1000000000000;
            const scoreB = b.stargazers_count * 3 + b.forks_count * 2 + new Date(b.pushed_at).getTime() / 1000000000000;
            return scoreB - scoreA;
          });

        setRepos(polishedRepos);
        setHasGithubError(false);

        const eventResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`, {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" },
        });

        if (eventResponse.ok) {
          const eventData = (await eventResponse.json()) as GithubEvent[];
          setEvents(eventData);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setRepos([]);
          setEvents([]);
          setHasGithubError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadGithubArsenal();

    return () => controller.abort();
  }, []);

  const activity = useMemo(() => buildActivityDays(events), [events]);
  const repoCount = repos.length;
  const languageCount = new Set(repos.map((repo) => repo.language).filter(Boolean)).size;
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden py-32">
      <div className="absolute left-0 top-24 h-[42rem] w-[42rem] rounded-full bg-sakura/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[34rem] w-[34rem] rounded-full bg-violet-glow/5 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-sakura/40" />
              <span className="font-inter text-xs uppercase tracking-[0.3em] text-sakura">
                Project Arsenal
              </span>
            </div>
            <h2 className="max-w-3xl font-cormorant text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
              A living gallery of
              <br />
              <span className="text-gradient-sakura">disciplined engineering.</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Repos", value: isLoading ? "..." : repoCount.toString(), icon: Layers3 },
              { label: "Languages", value: isLoading ? "..." : languageCount.toString(), icon: Code2 },
              { label: "Stars", value: isLoading ? "..." : totalStars.toString(), icon: Star },
            ].map((item) => (
              <div key={item.label} className="rounded-sm border border-sakura/10 bg-white/[0.025] p-4">
                <item.icon className="mb-3 h-4 w-4 text-sakura" />
                <p className="font-cinzel text-2xl text-foreground">{item.value}</p>
                <p className="font-inter text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]"
        >
          <div className="glass-card relative overflow-hidden rounded-sm p-7">
            <div className="absolute right-0 top-0 h-48 w-48 translate-x-1/3 -translate-y-1/3 rounded-full bg-sakura/10 blur-[80px]" />
            <Sparkles className="mb-6 h-7 w-7 text-sakura" />
            <h3 className="mb-4 font-cinzel text-3xl text-foreground">GitHub-linked showcase</h3>
            <p className="font-inter leading-relaxed text-foreground-muted">
              Public repositories are pulled directly from GitHub and arranged as a refined arsenal, so new work can surface here as your profile grows.
            </p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 border border-sakura/30 bg-sakura/10 px-5 py-3 font-inter text-sm text-foreground transition-all duration-300 hover:border-sakura/50 hover:bg-sakura/20"
            >
              Open GitHub
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <ContributionGraph activity={activity} />
        </motion.div>

        {hasGithubError && (
          <div className="mb-6 rounded-sm border border-sakura/20 bg-sakura/5 px-4 py-3 font-inter text-sm text-foreground-muted">
            GitHub public data is temporarily unavailable. The profile link above remains available.
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <RepoSkeleton key={index} index={index} />)
            : repos.map((repo, index) => <RepoCard key={repo.id} repo={repo} index={index} />)}
        </motion.div>

        {!isLoading && repos.length === 0 && !hasGithubError && (
          <div className="mt-6 rounded-sm border border-sakura/10 bg-white/[0.025] p-8 text-center">
            <p className="font-cormorant text-2xl text-foreground">No public repositories found.</p>
            <p className="mt-2 font-inter text-sm text-foreground-muted">
              New public repositories from GitHub will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
