// API Route: Test Newsletter Sync
// POST /api/newsletter/test-sync - Manually trigger newsletter sync for testing

import { NextRequest, NextResponse } from "next/server";
import {
  isGmailConfigured,
  fetchUnreadNewsletters,
  isPerplexityConfigured,
} from "@/lib/newsletter";

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const logs: string[] = [];

  try {
    logs.push(`[${new Date().toISOString()}] Starting test sync...`);

    // Check Gmail configuration
    if (!isGmailConfigured()) {
      logs.push(`[${new Date().toISOString()}] ERROR: Gmail API not configured`);
      return NextResponse.json(
        {
          success: false,
          error: "Gmail API not configured",
          logs,
          duration: Date.now() - startTime,
        },
        { status: 500 }
      );
    }
    logs.push(`[${new Date().toISOString()}] ✓ Gmail API configured`);

    // Check Perplexity configuration
    if (!isPerplexityConfigured()) {
      logs.push(`[${new Date().toISOString()}] ERROR: Perplexity API not configured`);
      return NextResponse.json(
        {
          success: false,
          error: "Perplexity API not configured",
          logs,
          duration: Date.now() - startTime,
        },
        { status: 500 }
      );
    }
    logs.push(`[${new Date().toISOString()}] ✓ Perplexity API configured`);

    // Fetch unread newsletters
    logs.push(`[${new Date().toISOString()}] Fetching unread newsletters...`);
    const emails = await fetchUnreadNewsletters(10);
    logs.push(`[${new Date().toISOString()}] Found ${emails.length} unread emails`);

    if (emails.length === 0) {
      logs.push(`[${new Date().toISOString()}] No emails to process`);
      return NextResponse.json({
        success: true,
        message: "No new newsletters to process",
        emailsFound: 0,
        logs,
        duration: Date.now() - startTime,
      });
    }

    // Log email details
    emails.forEach((email, index) => {
      logs.push(
        `[${new Date().toISOString()}] Email ${index + 1}: ${email.subject} (from: ${email.from})`
      );
    });

    // Simulate processing flow for first email (if exists)
    if (emails.length > 0) {
      const firstEmail = emails[0];
      logs.push(`[${new Date().toISOString()}] ──────────────────────────────────────`);
      logs.push(`[${new Date().toISOString()}] Processing flow for: ${firstEmail.subject}`);
      logs.push(`[${new Date().toISOString()}] Step 1: Check queue for duplicates...`);
      
      // Import functions to test
      try {
        const { getQueueItem, matchSourceByEmail, parseNewsletterEmail } = await import("@/lib/newsletter");
        
        // Check queue
        const queueItem = await getQueueItem(firstEmail.id);
        if (queueItem) {
          logs.push(`[${new Date().toISOString()}]   → Email already in queue: ${queueItem.status}`);
        } else {
          logs.push(`[${new Date().toISOString()}]   → Email not in queue, will be added`);
        }
        
        // Match source
        logs.push(`[${new Date().toISOString()}] Step 2: Match source from email...`);
        const source = await matchSourceByEmail(firstEmail.from);
        if (source) {
          logs.push(`[${new Date().toISOString()}]   → Source matched: ${source.name} (${source.slug})`);
        } else {
          logs.push(`[${new Date().toISOString()}]   → No source matched`);
        }
        
        // Parse email
        logs.push(`[${new Date().toISOString()}] Step 3: Parse email HTML to extract news items...`);
        const parsedItems = parseNewsletterEmail(firstEmail.htmlBody);
        logs.push(`[${new Date().toISOString()}]   → Found ${parsedItems.length} news items`);
        
        if (parsedItems.length > 0) {
          logs.push(`[${new Date().toISOString()}]   → Sample items:`);
          parsedItems.slice(0, 3).forEach((item, idx) => {
            logs.push(`[${new Date().toISOString()}]     ${idx + 1}. ${item.title.substring(0, 60)}...`);
          });
          
          logs.push(`[${new Date().toISOString()}] Step 4: Would process items (translate & categorize)...`);
          logs.push(`[${new Date().toISOString()}]   → This requires Perplexity API calls (skipped in test mode)`);
          logs.push(`[${new Date().toISOString()}]   → Each item would be:`);
          logs.push(`[${new Date().toISOString()}]     - Translated to Vietnamese`);
          logs.push(`[${new Date().toISOString()}]     - Categorized (ai-models, ai-tools, etc.)`);
          logs.push(`[${new Date().toISOString()}]     - URL resolved (if redirect)`);
          logs.push(`[${new Date().toISOString()}]     - Thumbnail extracted`);
          
          logs.push(`[${new Date().toISOString()}] Step 5: Would save to database...`);
          logs.push(`[${new Date().toISOString()}]   → Check duplicates by URL hash`);
          logs.push(`[${new Date().toISOString()}]   → Create newsletter_news records`);
          logs.push(`[${new Date().toISOString()}]   → Link to source and category`);
        } else {
          logs.push(`[${new Date().toISOString()}]   ⚠ No news items found in email HTML`);
        }
        
        logs.push(`[${new Date().toISOString()}] Step 6: Would mark email as processed...`);
        logs.push(`[${new Date().toISOString()}]   → Remove UNREAD label`);
        logs.push(`[${new Date().toISOString()}]   → Add "KynguyenAI-Processed" label`);
        logs.push(`[${new Date().toISOString()}]   → Update queue status to "completed"`);
      } catch (error) {
        logs.push(`[${new Date().toISOString()}]   ⚠ Error simulating flow: ${error instanceof Error ? error.message : "Unknown"}`);
      }
      
      logs.push(`[${new Date().toISOString()}] ──────────────────────────────────────`);
    }

    logs.push(`[${new Date().toISOString()}] Test sync completed successfully`);

    return NextResponse.json({
      success: true,
      message: `Found ${emails.length} email(s)`,
      emailsFound: emails.length,
      emails: emails.map((e) => ({
        id: e.id,
        subject: e.subject,
        from: e.from,
        receivedAt: e.receivedAt,
      })),
      logs,
      duration: Date.now() - startTime,
    });
  } catch (error) {
    logs.push(`[${new Date().toISOString()}] ERROR: ${error instanceof Error ? error.message : "Unknown error"}`);
    console.error("Test sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to test sync",
        message: error instanceof Error ? error.message : "Unknown error",
        logs,
        duration: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}
