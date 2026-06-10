import { NextRequest, NextResponse } from "next/server";

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
  has_pages?: boolean;
};

// Server-side proxy for the user's repositories.
//
// Why this exists: calling api.github.com directly from the browser is
// unauthenticated and limited to 60 requests/hour PER VISITOR IP. Under any
// real traffic the public site would hit the cap and fall into its error
// state. Proxying here lets us (a) cache the result with revalidate and
// (b) optionally attach a GITHUB_TOKEN to raise the limit to 5000/hour.
export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "byakuya-portfolio",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`,
      {
        headers,
        next: { revalidate: 900 },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "GitHub API request failed" }, { status: 502 });
    }

    const data = (await response.json()) as GithubRepo[];
    const repos = data
      .filter((repo) => !repo.fork && !repo.archived)
      .sort((a, b) => {
        const scoreA =
          a.stargazers_count * 3 + a.forks_count * 2 + new Date(a.pushed_at).getTime() / 1_000_000_000_000;
        const scoreB =
          b.stargazers_count * 3 + b.forks_count * 2 + new Date(b.pushed_at).getTime() / 1_000_000_000_000;
        return scoreB - scoreA;
      });

    return NextResponse.json({ repos });
  } catch {
    return NextResponse.json({ error: "Unable to load repositories" }, { status: 500 });
  }
}
