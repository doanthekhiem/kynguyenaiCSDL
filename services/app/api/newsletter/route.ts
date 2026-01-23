// API Route: Newsletter News List
// GET /api/newsletter?limit=20&offset=0&category=ai-tools&source=the-rundown-ai

import { NextRequest, NextResponse } from "next/server";
import { getNewsletterNews } from "@/lib/newsletter";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params = {
      limit: parseInt(searchParams.get("limit") || "20", 10),
      offset: parseInt(searchParams.get("offset") || "0", 10),
      category: searchParams.get("category") || undefined,
      source: searchParams.get("source") || undefined,
      featured: searchParams.get("featured") === "true" ? true : undefined,
    };

    const result = await getNewsletterNews(params);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching newsletter news:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter news" },
      { status: 500 }
    );
  }
}
