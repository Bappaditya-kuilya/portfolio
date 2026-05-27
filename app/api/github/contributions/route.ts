import { NextRequest, NextResponse } from "next/server";

type ActivityDay = {
  date: string;
  count: number;
};

type ContributionCalendarDay = {
  contributionCount: number;
  date: string;
};

type ContributionCalendarWeek = {
  contributionDays: ContributionCalendarDay[];
};

type GraphqlResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: ContributionCalendarWeek[];
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const CONTRIBUTION_CELL_PATTERN =
  /data-date="(\d{4}-\d{2}-\d{2})"[\s\S]*?<tool-tip[^>]*>([^<]+)<\/tool-tip>/g;

const CONTRIBUTION_QUERY = `
  query Contributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

function buildYearRange() {
  const today = new Date();
  const from = new Date(today);
  from.setDate(today.getDate() - 364);

  return {
    from: from.toISOString().slice(0, 10),
    to: today.toISOString().slice(0, 10),
  };
}

function extractCount(label: string) {
  if (label.startsWith("No contributions")) {
    return 0;
  }

  const match = label.match(/(\d+)\s+contributions?/i);
  return match?.[1] ? Number.parseInt(match[1], 10) : 0;
}

async function fetchPublicContributionCalendar(username: string, from: string, to: string) {
  const response = await fetch(`https://github.com/users/${username}/contributions?from=${from}&to=${to}`, {
    headers: {
      "User-Agent": "byakuya-portfolio",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Unable to load public contribution calendar");
  }

  const markup = await response.text();
  const days: ActivityDay[] = [];
  let match: RegExpExecArray | null;

  while ((match = CONTRIBUTION_CELL_PATTERN.exec(markup)) !== null) {
    days.push({
      date: match[1],
      count: extractCount(match[2]),
    });
  }

  return {
    days,
    source: "public",
  } as const;
}

async function fetchAuthenticatedContributionCalendar(username: string, from: string, to: string, token: string) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "byakuya-portfolio",
    },
    body: JSON.stringify({
      query: CONTRIBUTION_QUERY,
      variables: {
        login: username,
        from: `${from}T00:00:00Z`,
        to: `${to}T23:59:59Z`,
      },
    }),
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error("Unable to load authenticated contribution calendar");
  }

  const payload = (await response.json()) as GraphqlResponse;
  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message ?? "GitHub GraphQL error");
  }

  const weeks = payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const days = weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
    }))
  );

  return {
    days,
    source: "authenticated",
  } as const;
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const { from, to } = buildYearRange();
  const token = process.env.GITHUB_TOKEN;

  try {
    const result = token
      ? await fetchAuthenticatedContributionCalendar(username, from, to, token)
      : await fetchPublicContributionCalendar(username, from, to);

    return NextResponse.json(result);
  } catch (error) {
    if (token) {
      try {
        const fallback = await fetchPublicContributionCalendar(username, from, to);
        return NextResponse.json(fallback);
      } catch {
        return NextResponse.json({ error: "Unable to load contributions" }, { status: 500 });
      }
    }

    return NextResponse.json({ error: "Unable to load contributions" }, { status: 500 });
  }
}
