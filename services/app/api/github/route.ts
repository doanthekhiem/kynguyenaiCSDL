// API Route: GitHub Trending
// GET /api/github?limit=10&language=python&since=daily
import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubTrending } from "@/lib/github-trending";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const language = searchParams.get("language") || undefined;
    const since = (searchParams.get("since") as "daily" | "weekly" | "monthly") || "daily";

    const repos = await fetchGitHubTrending(limit, language, since);

    return NextResponse.json({
      repos,
      total: repos.length,
      filters: {
        language: language || "all",
        since,
      },
    });
  } catch (error) {
    console.error("Error fetching GitHub trending:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub trending" }, { status: 500 });
  }
}
