// API Route: POST /api/tools/[slug]/vote - Toggle vote on tool
// KynguyenAI v3.0

import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@/lib/supabase/route-handler";
import { createServerClient } from "@/lib/supabase/server";
import { toggleVote } from "@/lib/supabase/tools";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // Get current user from auth using cookie-based client
    const supabase = await createRouteHandlerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Get or create user profile ID using service client for RLS bypass
    const serviceClient = createServerClient();
    let { data: profile } = await serviceClient.from("user_profiles").select("id").eq("auth_id", user.id).single();

    // Auto-create profile if not found
    if (!profile) {
      const { data: newProfile, error: createError } = await serviceClient
        .from("user_profiles")
        .insert({
          auth_id: user.id,
          email: user.email,
          display_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
          avatar_url: user.user_metadata?.avatar_url || null,
        })
        .select("id")
        .single();

      if (createError || !newProfile) {
        console.error("Failed to create user profile:", createError);
        return NextResponse.json({ error: "Failed to create user profile" }, { status: 500 });
      }
      profile = newProfile;
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
