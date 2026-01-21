// API Route: POST /api/tools/[slug]/vote - Toggle vote on tool
// KynguyenAI v3.0

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { toggleVote } from "@/lib/supabase/tools";

interface RouteParams {
  params: Promise<{ slug: string }>;
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

    const result = await toggleVote(slug, profile.id);

    return NextResponse.json({
      ...result,
      message: result.voted ? "Vote added!" : "Vote removed!",
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to toggle vote" }, { status: 500 });
  }
}
