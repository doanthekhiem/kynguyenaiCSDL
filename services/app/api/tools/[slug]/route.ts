// API Route: GET /api/tools/[slug] - Get single tool
// KynguyenAI v3.0

import { NextRequest, NextResponse } from "next/server";
import { getToolBySlug } from "@/lib/supabase/tools";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const tool = await getToolBySlug(slug);

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    return NextResponse.json({ data: tool });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch tool" }, { status: 500 });
  }
}
