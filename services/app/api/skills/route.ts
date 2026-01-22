// API Route: GET /api/skills - List skills with pagination
// KynguyenAI v3.0

import { NextRequest, NextResponse } from "next/server";
import { fetchSkillsTrending } from "@/lib/skills-trending";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const type = (searchParams.get("type") as "trending" | "alltime") || "trending";
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");

    // Fetch all skills (cached), then paginate
    const allSkills = await fetchSkillsTrending(1000, type);

    const paginated = allSkills.slice(offset, offset + limit);
    const total = allSkills.length;

    return NextResponse.json({
      data: paginated,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}
