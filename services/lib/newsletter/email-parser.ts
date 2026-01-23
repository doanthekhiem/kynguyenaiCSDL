import * as cheerio from "cheerio";
import crypto from "crypto";

export interface ParsedNewsItem {
  title: string;
  summary: string;
  link: string;
  imageUrl?: string;
  source?: string;
}

// Generate unique hash for deduplication
export function generateUrlHash(url: string): string {
  if (!url) return "";
  const normalized = url
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .replace(/\?.*$/, "") // Remove query params for aggressive deduplication
    .replace(/#.*$/, "");

  return crypto.createHash("sha256").update(normalized).digest("hex");
}

// Detect newsletter source from email sender
export function detectNewsletterSource(from: string): string {
  const lower = from.toLowerCase();
  if (lower.includes("therundown")) return "the-rundown-ai";
  if (lower.includes("tldr")) return "tldr-ai";
  if (lower.includes("alphasignal")) return "alphasignal";
  if (lower.includes("bensbites")) return "ben-bites";
  if (lower.includes("beehiiv")) return "beehiiv";
  if (lower.includes("substack")) return "substack";
  return "unknown";
}

// Extract all links from HTML
export function extractAllLinks(html: string): { url: string; text: string }[] {
  const $ = cheerio.load(html);
  const links: { url: string; text: string }[] = [];

  $("a[href]").each((_, el) => {
    const $el = $(el);
    const url = $el.attr("href") || "";
    const text = $el.text().trim();
    if (url && !url.startsWith("#") && !url.startsWith("mailto:")) {
      links.push({ url, text });
    }
  });

  return links;
}

// Main parser function
export function parseNewsletterEmail(html: string): ParsedNewsItem[] {
  const $ = cheerio.load(html);
  const items: ParsedNewsItem[] = [];

  // Strategy: Find headline-like links with descriptions
  // Look for h2/h3 > a patterns
  $("h2 a, h3 a").each((_, el) => {
    const $el = $(el);
    const title = $el.text().trim();
    const link = $el.attr("href");

    if (title && link && title.length > 10) {
      // Skip sponsor/ad content
      if (title.toLowerCase().includes("sponsor")) return;
      if (title.toLowerCase().includes("advertisement")) return;

      // Try to find summary in next sibling
      let summary = "";
      const parent = $el.closest("h2, h3");
      const nextP = parent.next("p");
      if (nextP.length) {
        summary = nextP.text().trim();
      }

      items.push({
        title,
        link,
        summary: summary || "",
        source: "parsed",
      });
    }
  });

  // Generic fallback: look for bold/strong links
  if (items.length === 0) {
    $("strong a, b a").each((_, el) => {
      const $el = $(el);
      const title = $el.text().trim();
      const link = $el.attr("href");

      if (title && link && title.split(" ").length >= 3) {
        let summary = "";
        const parent = $el.closest("p, div");
        const nextP = parent.next("p");
        if (nextP.length) {
          summary = nextP.text().trim();
        }

        items.push({
          title,
          link,
          summary: summary || "",
          source: "generic",
        });
      }
    });
  }

  return items;
}

// Resolve beehiiv/tracking redirect links
export async function resolveRedirectLink(url: string): Promise<string> {
  if (!url) return "";
  if (!url.includes("beehiiv.com") && !url.includes("click.convertkit") && !url.includes("link.mail")) {
    return url;
  }

  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow" });
    return response.url;
  } catch (e) {
    console.error("Error resolving URL:", url, e);
    return url;
  }
}
