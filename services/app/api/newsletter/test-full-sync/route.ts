// API Route: Test Full Newsletter Sync (actually processes)
// POST /api/newsletter/test-full-sync - Manually trigger full newsletter sync for testing

import { NextRequest, NextResponse } from "next/server";
import {
  isGmailConfigured,
  fetchUnreadNewsletters,
  isPerplexityConfigured,
  getQueueItem,
  addToProcessingQueue,
  updateQueueStatus,
  matchSourceByEmail,
  parseNewsletterEmail,
  processNewsItems,
  batchCreateNewsletterNews,
  markAsProcessed,
  addLabel,
} from "@/lib/newsletter";

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const logs: string[] = [];

  try {
    logs.push(`[${new Date().toISOString()}] Starting FULL test sync...`);

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
    const emails = await fetchUnreadNewsletters(5); // Limit to 5 for testing
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

    let totalCreated = 0;
    let totalSkipped = 0;
    const processedEmails: string[] = [];
    const errors: string[] = [];

    // Process each email
    for (const email of emails) {
      try {
        logs.push(`[${new Date().toISOString()}] ──────────────────────────────────────`);
        logs.push(`[${new Date().toISOString()}] Processing: ${email.subject}`);
        logs.push(`[${new Date().toISOString()}] From: ${email.from}`);

        // Check if email is already in queue or processed
        const existingQueueItem = await getQueueItem(email.id);

        // Skip if already completed or currently processing
        if (existingQueueItem && (existingQueueItem.status === "completed" || existingQueueItem.status === "processing")) {
          logs.push(`[${new Date().toISOString()}] ⚠ Skipping - already ${existingQueueItem.status}`);
          continue;
        }

        // Add to processing queue (or update if exists)
        if (!existingQueueItem) {
          logs.push(`[${new Date().toISOString()}] Step 1: Adding to processing queue...`);
          await addToProcessingQueue(email.id, email.subject, email.from, email.receivedAt);
          logs.push(`[${new Date().toISOString()}]   ✓ Added to queue`);
        } else {
          logs.push(`[${new Date().toISOString()}] Step 1: Email already in queue (status: ${existingQueueItem.status})`);
        }

        // Update status to processing
        logs.push(`[${new Date().toISOString()}] Step 2: Updating status to processing...`);
        await updateQueueStatus(email.id, "processing");
        logs.push(`[${new Date().toISOString()}]   ✓ Status updated`);

        // Match source
        logs.push(`[${new Date().toISOString()}] Step 3: Matching source...`);
        const source = await matchSourceByEmail(email.from);
        if (source) {
          logs.push(`[${new Date().toISOString()}]   ✓ Source matched: ${source.name} (${source.slug})`);
        } else {
          logs.push(`[${new Date().toISOString()}]   ⚠ No source matched`);
        }

        // Parse email HTML
        logs.push(`[${new Date().toISOString()}] Step 4: Parsing email HTML...`);
        logs.push(`[${new Date().toISOString()}]   → HTML length: ${email.htmlBody.length} characters`);
        const parsedItems = parseNewsletterEmail(email.htmlBody);
        logs.push(`[${new Date().toISOString()}]   → Found ${parsedItems.length} news items`);
        
        // Debug: Check HTML structure
        if (parsedItems.length === 0) {
          logs.push(`[${new Date().toISOString()}]   ⚠ DEBUG: No items found, checking HTML structure...`);
          const { extractAllLinks } = await import("@/lib/newsletter");
          const allLinks = extractAllLinks(email.htmlBody);
          logs.push(`[${new Date().toISOString()}]   → Total links in HTML: ${allLinks.length}`);
          if (allLinks.length > 0) {
            logs.push(`[${new Date().toISOString()}]   → Sample links (first 5):`);
            allLinks.slice(0, 5).forEach((link, idx) => {
              logs.push(`[${new Date().toISOString()}]     ${idx + 1}. "${link.text.substring(0, 50)}" -> ${link.url.substring(0, 60)}...`);
            });
          }
        }

        if (parsedItems.length === 0) {
          logs.push(`[${new Date().toISOString()}]   ⚠ No news items found - marking as skipped`);
          await updateQueueStatus(email.id, "skipped", {
            error_message: "No news items found in email",
          });
          await markAsProcessed(email.id);
          continue;
        }

        // Log sample items
        logs.push(`[${new Date().toISOString()}]   → Sample items:`);
        parsedItems.slice(0, 3).forEach((item, idx) => {
          logs.push(`[${new Date().toISOString()}]     ${idx + 1}. ${item.title.substring(0, 60)}...`);
        });

        // Process items (translate & categorize)
        logs.push(`[${new Date().toISOString()}] Step 5: Processing items (translate & categorize)...`);
        logs.push(`[${new Date().toISOString()}]   → This will call Perplexity API for each item (500ms delay)`);
        const processedItems = await processNewsItems(parsedItems, 500);
        logs.push(`[${new Date().toISOString()}]   ✓ Processed ${processedItems.length} items`);

        // Log sample processed items
        if (processedItems.length > 0) {
          logs.push(`[${new Date().toISOString()}]   → Sample processed items:`);
          processedItems.slice(0, 2).forEach((item, idx) => {
            logs.push(`[${new Date().toISOString()}]     ${idx + 1}. ${item.title_vi.substring(0, 50)}...`);
            logs.push(`[${new Date().toISOString()}]        Category: ${item.category_slug}`);
            logs.push(`[${new Date().toISOString()}]        URL: ${item.actual_url.substring(0, 60)}...`);
          });
        }

        // Batch create in database
        logs.push(`[${new Date().toISOString()}] Step 6: Saving to database...`);
        const { created, skipped } = await batchCreateNewsletterNews(processedItems, {
          email_id: email.id,
          email_subject: email.subject,
          email_received_at: email.receivedAt,
          source_id: source?.id || null,
        });
        logs.push(`[${new Date().toISOString()}]   ✓ Created: ${created}, Skipped: ${skipped}`);

        totalCreated += created;
        totalSkipped += skipped;

        // Update queue status
        logs.push(`[${new Date().toISOString()}] Step 7: Updating queue status...`);
        await updateQueueStatus(email.id, "completed", {
          items_count: parsedItems.length,
          items_processed: created,
        });
        logs.push(`[${new Date().toISOString()}]   ✓ Status updated to completed`);

        // Mark email as read and add label
        logs.push(`[${new Date().toISOString()}] Step 8: Marking email as processed...`);
        await markAsProcessed(email.id);
        await addLabel(email.id, "KynguyenAI-Processed");
        logs.push(`[${new Date().toISOString()}]   ✓ Email marked as processed`);

        processedEmails.push(email.subject);
        logs.push(`[${new Date().toISOString()}] ✓ Successfully processed: ${email.subject}`);
      } catch (emailError) {
        logs.push(`[${new Date().toISOString()}] ✗ ERROR processing email: ${emailError instanceof Error ? emailError.message : "Unknown error"}`);
        console.error(`Error processing email ${email.id}:`, emailError);
        errors.push(`${email.subject}: ${emailError instanceof Error ? emailError.message : "Unknown error"}`);

        await updateQueueStatus(email.id, "failed", {
          error_message: emailError instanceof Error ? emailError.message : "Unknown error",
        });
      }
    }

    logs.push(`[${new Date().toISOString()}] ──────────────────────────────────────`);
    logs.push(`[${new Date().toISOString()}] Summary:`);
    logs.push(`[${new Date().toISOString()}]   - Emails processed: ${processedEmails.length}`);
    logs.push(`[${new Date().toISOString()}]   - News created: ${totalCreated}`);
    logs.push(`[${new Date().toISOString()}]   - News skipped: ${totalSkipped}`);
    logs.push(`[${new Date().toISOString()}]   - Errors: ${errors.length}`);

    return NextResponse.json({
      success: true,
      message: `Processed ${emails.length} email(s)`,
      processed: emails.length,
      created: totalCreated,
      skipped: totalSkipped,
      emails: processedEmails,
      errors: errors.length > 0 ? errors : undefined,
      logs,
      duration: Date.now() - startTime,
    });
  } catch (error) {
    logs.push(`[${new Date().toISOString()}] ERROR: ${error instanceof Error ? error.message : "Unknown error"}`);
    console.error("Test full sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to test full sync",
        message: error instanceof Error ? error.message : "Unknown error",
        logs,
        duration: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}
