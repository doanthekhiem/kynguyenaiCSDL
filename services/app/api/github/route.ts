// API Route: GitHub Trending (optional)
// GET /api/github?limit=10
import { NextRequest, NextResponse } from "next/server";
import { getGitHubTrending } from "@/lib/sheets";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const repos = await getGitHubTrending(limit);

    return NextResponse.json({
      repos,
      total: repos.length,
    });
  } catch (error) {
    console.error("Error fetching GitHub trending:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub trending" },
      { status: 500 }
    );
  }
}
