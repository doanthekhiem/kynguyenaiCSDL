// API Route: GET /api/tools/[slug]/vote-status - Check if user has voted
// KynguyenAI v3.0

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { hasUserVoted, getToolBySlug } from "@/lib/supabase/tools";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // Get current user from auth
    const supabase = createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ hasVoted: false, authenticated: false });
    }

    // Get user profile ID
    const { data: profile } = await supabase.from("user_profiles").select("id").eq("auth_id", user.id).single();

    if (!profile) {
      return NextResponse.json({ hasVoted: false, authenticated: true });
    }

    // Get tool
    const tool = await getToolBySlug(slug);
    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    // Check vote status
    const voted = await hasUserVoted(tool.id, profile.id);

    return NextResponse.json({
      hasVoted: voted,
      authenticated: true,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to check vote status" }, { status: 500 });
  }
}
