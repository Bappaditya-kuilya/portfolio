// Curated case studies — EDIT THESE with your real work.
//
// These render above the auto-pulled GitHub grid as the "headline" projects.
// Recruiters read problem → approach → result far more than a repo name.
// Keep metrics honest and specific; delete the array (set to []) to hide the
// section entirely until you're ready.

export type FeaturedProject = {
  title: string;
  tagline: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Workflow Automation Engine",
    tagline: "AI Systems",
    problem:
      "Describe the real pain point this solved — e.g. a manual process that took X hours.",
    approach:
      "Describe how you built it — the architecture, the LLM/agent design, the key decision.",
    result:
      "Quantify the outcome — e.g. cut a task from 2h to 5min, processed N items, etc.",
    stack: ["Python", "LLM APIs", "Docker"],
    repoUrl: "https://github.com/Bappaditya-kuilya",
  },
  {
    title: "Token Optimization Toolkit",
    tagline: "LLM Utilities",
    problem: "What inefficiency or cost problem did this address?",
    approach: "What technique did you apply (caching, prompt compression, batching)?",
    result: "Concrete numbers: % tokens saved, latency reduced, cost per call.",
    stack: ["Python", "LLM APIs"],
    repoUrl: "https://github.com/Bappaditya-kuilya",
  },
];
