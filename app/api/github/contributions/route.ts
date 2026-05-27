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

type ContributionResult = {
  days: ActivityDay[];
  total: number;
  source: "public" | "authenticated";
};

const CONTRIBUTION_CELL_PATTERN = /<[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*>/g;
const CONTRIBUTION_TOTAL_PATTERN = /<h2[^>]*id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s+contributions?/i;

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

function extractAttribute(markup: string, attribute: string) {
  const pattern = new RegExp(`${attribute}="([^"]*)"`, "i");
  return markup.match(pattern)?.[1] ?? null;
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
  const totalMatch = markup.match(CONTRIBUTION_TOTAL_PATTERN);
  const total = totalMatch?.[1] ? Number.parseInt(totalMatch[1].replaceAll(",", ""), 10) : 0;
  let match: RegExpExecArray | null;

  while ((match = CONTRIBUTION_CELL_PATTERN.exec(markup)) !== null) {
    const tagMarkup = match[0];
    const dataCount = extractAttribute(tagMarkup, "data-count");
    const dataLevel = extractAttribute(tagMarkup, "data-level");
    const ariaLabel = extractAttribute(tagMarkup, "aria-label");

    days.push({
      date: match[1],
      count: dataCount
        ? Number.parseInt(dataCount, 10)
        : dataLevel
          ? Number.parseInt(dataLevel, 10)
          : extractCount(ariaLabel ?? ""),
    });
  }

  if (days.length === 0) {
    throw new Error("Unable to parse public contribution calendar");
  }

  return {
    days,
    total,
    source: "public",
  } satisfies ContributionResult;
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
  const total = payload.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
  const days = weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
    }))
  );

  return {
    days,
    total,
    source: "authenticated",
  } satisfies ContributionResult;
}

function getContributionTotal(days: ActivityDay[]) {
  return days.reduce((sum, day) => sum + day.count, 0);
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const { from, to } = buildYearRange();
  const token = process.env.GITHUB_TOKEN;

  try {
    if (token) {
      const [authenticatedResult, publicResult] = await Promise.allSettled([
        fetchAuthenticatedContributionCalendar(username, from, to, token),
        fetchPublicContributionCalendar(username, from, to),
      ]);

      if (authenticatedResult.status === "fulfilled" && publicResult.status === "fulfilled") {
        const authenticatedTotal = getContributionTotal(authenticatedResult.value.days);
        const publicTotal = getContributionTotal(publicResult.value.days);

        return NextResponse.json(publicTotal > authenticatedTotal ? publicResult.value : authenticatedResult.value);
      }

      if (publicResult.status === "fulfilled") {
        return NextResponse.json(publicResult.value);
      }

      if (authenticatedResult.status === "fulfilled") {
        return NextResponse.json(authenticatedResult.value);
      }

      return NextResponse.json({ error: "Unable to load contributions" }, { status: 500 });
    }

    const result = await fetchPublicContributionCalendar(username, from, to);

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
