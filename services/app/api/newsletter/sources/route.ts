// API Route: Newsletter Sources
// GET /api/newsletter/sources

import { NextResponse } from "next/server";
import { getNewsletterSources } from "@/lib/newsletter";

export async function GET() {
  try {
    const sources = await getNewsletterSources();

    return NextResponse.json({
      data: sources,
    });
  } catch (error) {
    console.error("Error fetching newsletter sources:", error);
    return NextResponse.json(
      { error: "Failed to fetch sources" },
      { status: 500 }
    );
  }
}
