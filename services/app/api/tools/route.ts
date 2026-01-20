// API Route: GET /api/tools - List all tools
// POST /api/tools - Submit new tool
// KynguyenAI v3.0

import { NextRequest, NextResponse } from "next/server";
import { getTools, submitTool } from "@/lib/supabase/tools";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params = {
      limit: parseInt(searchParams.get("limit") || "20"),
      offset: parseInt(searchParams.get("offset") || "0"),
      category: searchParams.get("category") || undefined,
      search: searchParams.get("search") || undefined,
      sort: (searchParams.get("sort") as "votes" | "newest" | "rating") || "votes",
      featured: searchParams.get("featured") === "true" ? true : undefined,
    };

    const result = await getTools(params);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, tagline, description, website_url, pricing_type } = body;

    if (!name || !tagline || !description || !website_url || !pricing_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const tool = await submitTool({
      name,
      tagline,
      description,
      website_url,
      logo_url: body.logo_url,
      category_id: body.category_id,
      pricing_type,
      pricing_details: body.pricing_details,
      twitter_url: body.twitter_url,
      github_url: body.github_url,
    });

    return NextResponse.json({
      data: tool,
      message: "Tool submitted successfully! It will be reviewed by our team.",
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to submit tool" }, { status: 500 });
  }
}
