// API Route: Newsletter Sync
// POST /api/newsletter/sync (called by cron job)
// Fetches emails from Gmail, parses, translates, and stores in Supabase

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  isGmailConfigured,
  fetchUnreadNewsletters,
  markAsProcessed,
  addLabel,
  parseNewsletterEmail,
  processNewsItems,
  isPerplexityConfigured,
  matchSourceByEmail,
  addToProcessingQueue,
  updateQueueStatus,
  batchCreateNewsletterNews,
} from "@/lib/newsletter";

export const maxDuration = 60; // Allow up to 60 seconds for processing

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Verify cron secret
    const secret =
      request.headers.get("x-cron-secret") ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check Gmail configuration
    if (!isGmailConfigured()) {
      return NextResponse.json(
        { error: "Gmail API not configured" },
        { status: 500 }
      );
    }

    // Check Perplexity configuration
    if (!isPerplexityConfigured()) {
      return NextResponse.json(
        { error: "Perplexity API not configured" },
        { status: 500 }
      );
    }

    // Fetch unread newsletters from Gmail
    const emails = await fetchUnreadNewsletters(10);

    if (emails.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No new newsletters to process",
        processed: 0,
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
        // Add to processing queue
        await addToProcessingQueue(
          email.id,
          email.subject,
          email.from,
          email.receivedAt
        );

        // Update status to processing
        await updateQueueStatus(email.id, "processing");

        // Match source
        const source = await matchSourceByEmail(email.from);

        // Parse email HTML
        const parsedItems = parseNewsletterEmail(email.htmlBody);

        if (parsedItems.length === 0) {
          await updateQueueStatus(email.id, "skipped", {
            error_message: "No news items found in email",
          });
          await markAsProcessed(email.id);
          continue;
        }

        // Process items (translate & categorize)
        const processedItems = await processNewsItems(parsedItems, 500); // 500ms delay between API calls

        // Batch create in database
        const { created, skipped } = await batchCreateNewsletterNews(
          processedItems,
          {
            email_id: email.id,
            email_subject: email.subject,
            email_received_at: email.receivedAt,
            source_id: source?.id || null,
          }
        );

        totalCreated += created;
        totalSkipped += skipped;

        // Update queue status
        await updateQueueStatus(email.id, "completed", {
          items_count: parsedItems.length,
          items_processed: created,
        });

        // Mark email as read and add label
        await markAsProcessed(email.id);
        await addLabel(email.id, "KynguyenAI-Processed");

        processedEmails.push(email.subject);
      } catch (emailError) {
        console.error(`Error processing email ${email.id}:`, emailError);
        errors.push(
          `${email.subject}: ${emailError instanceof Error ? emailError.message : "Unknown error"}`
        );

        await updateQueueStatus(email.id, "failed", {
          error_message:
            emailError instanceof Error ? emailError.message : "Unknown error",
        });
      }
    }

    // Revalidate pages if we created any news
    if (totalCreated > 0) {
      revalidatePath("/");
      revalidatePath("/newsletter");
      revalidatePath("/newsletter/category/[slug]", "page");
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${emails.length} email(s)`,
      processed: emails.length,
      created: totalCreated,
      skipped: totalSkipped,
      emails: processedEmails,
      errors: errors.length > 0 ? errors : undefined,
      duration: Date.now() - startTime,
    });
  } catch (error) {
    console.error("Newsletter sync error:", error);
    return NextResponse.json(
      {
        error: "Failed to sync newsletters",
        message: error instanceof Error ? error.message : "Unknown error",
        duration: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

// Health check / status
export async function GET() {
  const gmailConfigured = isGmailConfigured();
  const perplexityConfigured = isPerplexityConfigured();

  return NextResponse.json({
    status: gmailConfigured && perplexityConfigured ? "ready" : "not_configured",
    gmail: gmailConfigured ? "configured" : "missing",
    perplexity: perplexityConfigured ? "configured" : "missing",
    message: "Newsletter sync endpoint",
  });
}
