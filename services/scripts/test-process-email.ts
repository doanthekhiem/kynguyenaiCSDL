// Test script to process newsletter emails
// Usage: npx tsx scripts/test-process-email.ts [message-id]
// If no message-id provided, will list recent unread newsletters

import dotenv from "dotenv";
import path from "path";

console.log("Current directory:", process.cwd());
const envPath = path.resolve(process.cwd(), ".env");
console.log(`Loading env from ${envPath}`);
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error("Error loading .env:", result.error);
} else {
  console.log(".env loaded successfully");
}

console.log("PERPLEXITY_API_KEY present:", !!process.env.PERPLEXITY_API_KEY);
if (process.env.PERPLEXITY_API_KEY) {
  console.log("PERPLEXITY_API_KEY length:", process.env.PERPLEXITY_API_KEY.length);
}
console.log("GMAIL_CLIENT_ID present:", !!process.env.GMAIL_CLIENT_ID);

import { google, gmail_v1 } from "googleapis";
import { parseNewsletterEmail } from "../lib/newsletter/email-parser";
import { processNewsItems, translateAndCategorize } from "../lib/newsletter/perplexity";
import { createClient } from "@supabase/supabase-js";

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

// Capture console output
const logBuffer: string[] = [];
const originalLog = console.log;
const originalError = console.error;

console.log = (...args) => {
  const msg = args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" ");
  logBuffer.push(`[LOG] ${msg}`);
  originalLog(...args);
};

console.error = (...args) => {
  const msg = args
    .map((a) => {
      if (a instanceof Error) return `${a.message}\n${a.stack}`;
      return typeof a === "object" ? JSON.stringify(a, null, 2) : String(a);
    })
    .join(" ");
  logBuffer.push(`[ERR] ${msg}`);
  originalError(...args);
};

function getGmailClient(): gmail_v1.Gmail {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error("Missing Gmail API credentials");
  }
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return google.gmail({ version: "v1", auth: oAuth2Client });
}

async function listRecentEmails(maxResults = 10) {
  const gmail = getGmailClient();

  // List all recent emails (both read and unread) from newsletter sources
  const query = `(from:*@beehiiv.com OR from:*@substack.com OR from:*@therundown.ai OR from:*@tldr.tech OR from:*@alphasignal.ai OR from:newsletter)`;

  const res = await gmail.users.messages.list({
    userId: "me",
    q: query,
    maxResults,
  });

  const messages = res.data.messages || [];
  console.log(`\n📬 Found ${messages.length} recent newsletter emails:\n`);

  for (const msg of messages) {
    if (!msg.id) continue;
    const details = await gmail.users.messages.get({
      userId: "me",
      id: msg.id,
      format: "metadata",
      metadataHeaders: ["Subject", "From", "Date"],
    });

    const headers = details.data.payload?.headers;
    const subject = headers?.find((h) => h.name === "Subject")?.value || "No Subject";
    const from = headers?.find((h) => h.name === "From")?.value || "";
    const date = headers?.find((h) => h.name === "Date")?.value || "";
    const isUnread = details.data.labelIds?.includes("UNREAD");

    console.log(`   ID: ${msg.id}`);
    console.log(`   ${isUnread ? "🆕" : "📖"} ${subject.substring(0, 70)}`);
    console.log(`   From: ${from}`);
    console.log(`   Date: ${date}`);
    console.log("");
  }

  return messages;
}

async function getEmailById(messageId: string) {
  const gmail = getGmailClient();

  const details = await gmail.users.messages.get({
    userId: "me",
    id: messageId,
    format: "full",
  });

  const payload = details.data.payload;
  const headers = payload?.headers;

  const subject = headers?.find((h) => h.name === "Subject")?.value || "";
  const from = headers?.find((h) => h.name === "From")?.value || "";

  let htmlBody = "";
  let textBody = "";

  const decode = (data: string) => Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8");

  if (payload?.body?.data) {
    htmlBody = decode(payload.body.data);
  } else if (payload?.parts) {
    const findPart = (parts: gmail_v1.Schema$MessagePart[], mimeType: string): string => {
      for (const part of parts) {
        if (part.mimeType === mimeType && part.body?.data) {
          return decode(part.body.data);
        }
        if (part.parts) {
          const nested = findPart(part.parts, mimeType);
          if (nested) return nested;
        }
      }
      return "";
    };
    htmlBody = findPart(payload.parts, "text/html");
    textBody = findPart(payload.parts, "text/plain");
  }

  return {
    id: messageId,
    subject,
    from,
    htmlBody,
    textBody,
    receivedAt: new Date(parseInt(details.data.internalDate || "0")),
    snippet: details.data.snippet || "",
  };
}

async function deleteOldData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase credentials");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("📦 Deleting old newsletter_news data...");
  const { error: newsError } = await supabase
    .from("newsletter_news")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (newsError) {
    console.error("Error deleting newsletter_news:", newsError);
  } else {
    console.log("✅ Deleted all newsletter_news records");
  }

  console.log("📦 Deleting old processing queue...");
  const { error: queueError } = await supabase
    .from("newsletter_processing_queue")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (queueError) {
    console.error("Error deleting processing queue:", queueError);
  } else {
    console.log("✅ Deleted all processing queue records");
  }
}

async function processEmail(messageId: string) {
  console.log(`📧 Fetching email with ID: ${messageId}`);
  const email = await getEmailById(messageId);
  console.log(`   Subject: ${email.subject}`);
  console.log(`   From: ${email.from}`);
  console.log(`   Received: ${email.receivedAt}`);
  console.log(`   HTML Body Length: ${email.htmlBody.length} chars`);
  console.log("");

  // Parse the email
  console.log("📝 Parsing email content...");
  const parsedItems = parseNewsletterEmail(email.htmlBody);
  console.log(`   Found ${parsedItems.length} news items`);
  console.log("");

  if (parsedItems.length === 0) {
    console.log("⚠️ No news items found in email. Check email parser.");
    console.log("\n📋 Sample of HTML body (first 2000 chars):");
    console.log(email.htmlBody.substring(0, 2000));
    return;
  }

  // Print parsed items
  console.log("📋 Parsed Items:");
  parsedItems.slice(0, 5).forEach((item, i) => {
    console.log(`   ${i + 1}. ${item.title.substring(0, 60)}...`);
    console.log(`      Summary: ${item.summary ? item.summary.substring(0, 100) + "..." : "(empty)"}`);
    console.log(`      Link: ${item.link.substring(0, 80)}...`);
    console.log("");
  });

  // Test translation with first item
  console.log("🌐 Testing Perplexity translation on first item...");
  console.log(`   🔑 API Key configured: ${!!process.env.PERPLEXITY_API_KEY}`);
  if (process.env.PERPLEXITY_API_KEY) {
    console.log(`   🔑 API Key length: ${process.env.PERPLEXITY_API_KEY.length}`);
    console.log(`   🔑 API Key start: ${process.env.PERPLEXITY_API_KEY.substring(0, 5)}...`);
  }

  const firstItem = parsedItems[0];
  try {
    const translated = await translateAndCategorize(firstItem.title, firstItem.summary);
    console.log("   ✅ Translation result:");
    console.log(`      title_vi: ${translated.title_vi}`);
    console.log(`      summary_vi: ${translated.summary_vi}`);
    console.log(`      category: ${translated.category_slug}`);
  } catch (error) {
    console.error("   ❌ Translation failed with error:", error);
  }
  console.log("");

  // Process all items (limit to 5 for testing)
  console.log("⏳ Processing all items with Perplexity (this may take a while)...");
  const processedItems = await processNewsItems(parsedItems.slice(0, 5), 1000);
  console.log(`   ✅ Processed ${processedItems.length} items`);
  console.log("");

  // Print processed results
  console.log("📊 Processed Results:");
  processedItems.forEach((item, i) => {
    console.log(`\n   === Item ${i + 1} ===`);
    console.log(`   Original Title: ${item.title.substring(0, 60)}...`);
    console.log(`   Vietnamese Title: ${item.title_vi}`);
    console.log(`   Vietnamese Summary: ${item.summary_vi}`);
    console.log(`   Category: ${item.category_slug}`);
    console.log(`   URL: ${item.actual_url.substring(0, 80)}...`);
  });

  // Write results to JSON file for verification
  const resultData = {
    messageId,
    emailSubject: email.subject,
    parsedItemsCount: parsedItems.length,
    processedItems: processedItems.map((item) => ({
      originalTitle: item.title,
      vietnameseTitle: item.title_vi,
      vietnameseSummary: item.summary_vi,
      category: item.category_slug,
      url: item.actual_url,
    })),
  };

  const fs = await import("fs");
  fs.writeFileSync("test_result.json", JSON.stringify(resultData, null, 2));
  console.log("✅ Results written to test_result.json");

  fs.writeFileSync("execution_log.txt", logBuffer.join("\n"));
  console.log("📝 Logs written to execution_log.txt");

  console.log("\n✅ Test completed successfully!");
}

async function main() {
  const messageId = process.argv[2];

  console.log("🚀 Newsletter Processing Test Script");
  console.log("====================================\n");

  if (!messageId) {
    console.log("No message ID provided. Listing recent newsletter emails...\n");
    const messages = await listRecentEmails();

    if (messages.length > 0) {
      console.log("\n📌 To process an email, run:");
      console.log(`   npx tsx scripts/test-process-email.ts ${messages[0].id}`);
    }
    return;
  }

  // Delete old data first
  await deleteOldData();
  console.log("");

  // Process the email
  await processEmail(messageId);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
