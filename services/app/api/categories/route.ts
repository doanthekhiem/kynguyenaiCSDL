// API Route: GET /api/categories - List all tool categories
// KynguyenAI v3.0

import { NextResponse } from "next/server";
import { getToolCategories } from "@/lib/supabase/tools";

export async function GET() {
  try {
    const categories = await getToolCategories();

    return NextResponse.json({ data: categories });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
