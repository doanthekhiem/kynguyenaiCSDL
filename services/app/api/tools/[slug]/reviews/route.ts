// API Route: GET/POST /api/tools/[slug]/reviews
// KynguyenAI v3.0

import { NextRequest, NextResponse } from "next/server";
import { getToolReviews, createReview } from "@/lib/supabase/tools";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");

    const reviews = await getToolReviews(slug, limit);

    return NextResponse.json({ data: reviews });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // Validate required fields
    const { userId, rating, content } = body;

    if (!userId || !rating || !content) {
      return NextResponse.json({ error: "Missing required fields: userId, rating, content" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const review = await createReview({
      toolSlug: slug,
      userId,
      rating,
      title: body.title,
      content,
    });

    return NextResponse.json({
      data: review,
      message: "Review submitted successfully!",
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
