import { NextRequest, NextResponse } from "next/server";

type ActivityDay = {
  date: string;
  count: number;
};

const CONTRIBUTION_CELL_PATTERN = /data-date="(\d{4}-\d{2}-\d{2})"[\s\S]*?aria-label="([^"]+)"/g;

function extractCount(label: string) {
  if (label.startsWith("No contributions")) {
    return 0;
  }

  const match = label.match(/(\d+) contribution/);
  return match?.[1] ? Number.parseInt(match[1], 10) : 0;
}

function buildYearRange() {
  const today = new Date();
  const from = new Date(today);
  from.setDate(today.getDate() - 364);

  return {
    from: from.toISOString().slice(0, 10),
    to: today.toISOString().slice(0, 10),
  };
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const { from, to } = buildYearRange();
  const response = await fetch(`https://github.com/users/${username}/contributions?from=${from}&to=${to}`, {
    headers: {
      "User-Agent": "byakuya-portfolio",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to load contributions" }, { status: response.status });
  }

  const markup = await response.text();
  const days: ActivityDay[] = [];
  let match: RegExpExecArray | null;

  while ((match = CONTRIBUTION_CELL_PATTERN.exec(markup)) !== null) {
    const date = match[1];
    const label = match[2];
    days.push({
      date,
      count: extractCount(label),
    });
  }

  return NextResponse.json({ days });
}
