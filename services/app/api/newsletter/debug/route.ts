// API Route: Newsletter Debug Info
// GET /api/newsletter/debug - Get debug information about newsletter sync

import { NextResponse } from "next/server";
import {
  isGmailConfigured,
  isPerplexityConfigured,
  testGmailConnection,
  testPerplexityConnection,
  getPendingQueueItems,
  getNewsletterNews,
  getNewsletterSources,
} from "@/lib/newsletter";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    // Check configurations
    const gmailConfigured = isGmailConfigured();
    const perplexityConfigured = isPerplexityConfigured();

    // Test connections
    let gmailConnection = false;
    let perplexityConnection = false;
    if (gmailConfigured) {
      try {
        gmailConnection = await testGmailConnection();
      } catch (error) {
        console.error("Gmail connection test error:", error);
      }
    }
    if (perplexityConfigured) {
      try {
        perplexityConnection = await testPerplexityConnection();
      } catch (error) {
        console.error("Perplexity connection test error:", error);
      }
    }

    // Get database stats
    const supabase = createServerClient();

    // Count newsletter news
    const { count: newsCount } = await supabase
      .from("newsletter_news")
      .select("*", { count: "exact", head: true })
      .eq("status", "published");

    // Count by status
    const { count: pendingCount } = await supabase
      .from("newsletter_processing_queue")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    const { count: processingCount } = await supabase
      .from("newsletter_processing_queue")
      .select("*", { count: "exact", head: true })
      .eq("status", "processing");

    const { count: completedCount } = await supabase
      .from("newsletter_processing_queue")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed");

    const { count: failedCount } = await supabase
      .from("newsletter_processing_queue")
      .select("*", { count: "exact", head: true })
      .eq("status", "failed");

    // Get recent queue items
    const { data: recentQueue } = await supabase
      .from("newsletter_processing_queue")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    // Get recent news
    const recentNews = await getNewsletterNews({ limit: 5, offset: 0 });
    const sources = await getNewsletterSources();
    const pendingItems = await getPendingQueueItems(5);

    // Get latest news date
    const { data: latestNews } = await supabase
      .from("newsletter_news")
      .select("published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1)
      .single();

    return NextResponse.json({
      config: {
        gmail: {
          configured: gmailConfigured,
          connected: gmailConnection,
        },
        perplexity: {
          configured: perplexityConfigured,
          connected: perplexityConnection,
        },
      },
      stats: {
        news: {
          total: newsCount || 0,
          latestDate: latestNews?.published_at || null,
        },
        queue: {
          pending: pendingCount || 0,
          processing: processingCount || 0,
          completed: completedCount || 0,
          failed: failedCount || 0,
        },
        sources: sources.length,
      },
      recent: {
        queue: recentQueue || [],
        news: recentNews.data || [],
        pendingItems: pendingItems || [],
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Debug info error:", error);
    return NextResponse.json(
      {
        error: "Failed to get debug info",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
