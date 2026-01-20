// API Route: POST /api/tools/[slug]/vote - Toggle vote on tool
// KynguyenAI v3.0

import { NextRequest, NextResponse } from "next/server";
import { toggleVote } from "@/lib/supabase/tools";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // In a real app, get userId from auth session
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const result = await toggleVote(slug, userId);

    return NextResponse.json({
      ...result,
      message: result.voted ? "Vote added!" : "Vote removed!",
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to toggle vote" }, { status: 500 });
  }
}
