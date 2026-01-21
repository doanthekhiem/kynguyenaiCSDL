// API Route: GET/POST /api/tools/[slug]/reviews
// KynguyenAI v3.0

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { getToolReviews, createReview, getToolBySlug } from "@/lib/supabase/tools";

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

    // Get current user from auth
    const supabase = createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Get user profile ID
    const { data: profile } = await supabase.from("user_profiles").select("id").eq("auth_id", user.id).single();

    if (!profile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    const body = await request.json();
    const { rating, content, title } = body;

    // Validate required fields
    if (!rating || !content) {
      return NextResponse.json({ error: "Missing required fields: rating, content" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    if (content.length < 50) {
      return NextResponse.json({ error: "Content must be at least 50 characters" }, { status: 400 });
    }

    // Check if user already reviewed this tool
    const tool = await getToolBySlug(slug);
    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    const { data: existingReview } = await supabase
      .from("tool_reviews")
      .select("id")
      .eq("tool_id", tool.id)
      .eq("user_id", profile.id)
      .single();

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this tool" }, { status: 409 });
    }

    const review = await createReview({
      toolSlug: slug,
      userId: profile.id,
      rating,
      title: title || undefined,
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
