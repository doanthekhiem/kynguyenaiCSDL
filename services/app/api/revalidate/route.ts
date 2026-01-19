// API Route: On-demand ISR Revalidation
// POST /api/revalidate (called by Make.com webhook)
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const secret = request.headers.get("x-revalidate-secret");

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    // Revalidate all pages
    revalidatePath("/");
    revalidatePath("/category/[slug]", "page");
    revalidatePath("/article/[id]", "page");

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Revalidation endpoint ready",
  });
}
