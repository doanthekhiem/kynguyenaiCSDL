// API Route: Fetch Articles from Google Sheets
// GET /api/articles?limit=20&category=AI+News
import { NextRequest, NextResponse } from "next/server";
import {
  getPublishedArticles,
  getArticlesByCategory,
  getFeaturedArticles,
} from "@/lib/sheets";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured") === "true";

    let articles;

    if (featured) {
      articles = await getFeaturedArticles(limit);
    } else if (category) {
      articles = await getArticlesByCategory(category, limit);
    } else {
      articles = await getPublishedArticles(limit);
    }

    return NextResponse.json({
      articles,
      total: articles.length,
      limit,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
