// API Route: Newsletter Categories
// GET /api/newsletter/categories

import { NextResponse } from "next/server";
import { getNewsletterCategories } from "@/lib/newsletter";

export async function GET() {
  try {
    const categories = await getNewsletterCategories();

    return NextResponse.json({
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching newsletter categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
