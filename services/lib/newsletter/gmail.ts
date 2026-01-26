import { google, gmail_v1 } from "googleapis";

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

// Check if Gmail is configured
export function isGmailConfigured(): boolean {
  return !!(CLIENT_ID && CLIENT_SECRET && REFRESH_TOKEN);
}

// Initialize OAuth2 Client
export function getGmailClient(): gmail_v1.Gmail {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error("Missing Gmail API credentials");
  }

  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  return google.gmail({ version: "v1", auth: oAuth2Client });
}

// Type for Gmail message
export interface GmailMessage {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  htmlBody: string;
  textBody: string;
  receivedAt: Date;
  snippet: string;
}

// Test Gmail connection
export async function testConnection(): Promise<boolean> {
  try {
    const gmail = getGmailClient();
    const profile = await gmail.users.getProfile({ userId: "me" });
    console.log("Gmail connected:", profile.data.emailAddress);
    return true;
  } catch (error) {
    console.error("Gmail connection test failed:", error);
    return false;
  }
}

// Fetch unread newsletters
export async function fetchUnreadNewsletters(maxResults = 10): Promise<GmailMessage[]> {
  try {
    const gmail = getGmailClient();

    // Query for unread emails from newsletter senders
    // Also check for emails without the processed label (in case they were read but not processed)
    // Include specific subdomains for The Rundown AI (daily.therundown.ai, technews.therundown.ai)
    const query = `(from:*@beehiiv.com OR from:*@substack.com OR from:*@therundown.ai OR from:news@daily.therundown.ai OR from:crew@technews.therundown.ai OR from:*@tldr.tech OR from:*@alphasignal.ai) (is:unread OR -label:KynguyenAI-Processed)`;

    console.log(`Searching emails with query: ${query}`);

    const res = await gmail.users.messages.list({
      userId: "me",
      q: query,
      maxResults,
    });

    const messages = res.data.messages;
    if (!messages || messages.length === 0) {
      return [];
    }

    const emailDetails: GmailMessage[] = [];

    for (const message of messages) {
      if (!message.id) continue;

      const details = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
        format: "full",
      });

      const payload = details.data.payload;
      const headers = payload?.headers;

      const subject = headers?.find((h) => h.name === "Subject")?.value || "";
      const from = headers?.find((h) => h.name === "From")?.value || "";

      let htmlBody = "";
      let textBody = "";

      // Helper to decode base64
      const decode = (data: string) =>
        Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8");

      if (payload?.body?.data) {
        htmlBody = decode(payload.body.data);
      } else if (payload?.parts) {
        // Handle multipart
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

      emailDetails.push({
        id: message.id,
        threadId: message.threadId || "",
        subject,
        from,
        htmlBody,
        textBody,
        receivedAt: new Date(parseInt(details.data.internalDate || "0")),
        snippet: details.data.snippet || "",
      });
    }

    return emailDetails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
}

// Mark email as processed (remove UNREAD label)
export async function markAsProcessed(messageId: string): Promise<void> {
  try {
    const gmail = getGmailClient();
    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      requestBody: {
        removeLabelIds: ["UNREAD"],
      },
    });
  } catch (error) {
    console.error(`Error marking email ${messageId} as processed:`, error);
  }
}

// Add a label to email
export async function addLabel(messageId: string, labelName: string): Promise<void> {
  try {
    const gmail = getGmailClient();

    // Try to find the label first
    const labelsRes = await gmail.users.labels.list({ userId: "me" });
    let labelId = labelsRes.data.labels?.find((l) => l.name === labelName)?.id;

    // Create label if it doesn't exist
    if (!labelId) {
      try {
        const createRes = await gmail.users.labels.create({
          userId: "me",
          requestBody: {
            name: labelName,
            labelListVisibility: "labelShow",
            messageListVisibility: "show",
          },
        });
        labelId = createRes.data.id;
      } catch {
        console.log(`Label ${labelName} might already exist or cannot be created`);
        return;
      }
    }

    if (labelId) {
      await gmail.users.messages.modify({
        userId: "me",
        id: messageId,
        requestBody: {
          addLabelIds: [labelId],
        },
      });
    }
  } catch (error) {
    console.error(`Error adding label to email ${messageId}:`, error);
  }
}
