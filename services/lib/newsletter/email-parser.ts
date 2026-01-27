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
  const seenUrls = new Set<string>();

  // Helper to add item if not duplicate
  const addItem = (title: string, link: string, summary: string, source: string) => {
    if (!title || !link) return;
    
    // Normalize URL for deduplication
    const normalizedUrl = link.toLowerCase().trim().split("?")[0].split("#")[0];
    if (seenUrls.has(normalizedUrl)) return;
    seenUrls.add(normalizedUrl);

    // Skip sponsor/ad content
    const titleLower = title.toLowerCase();
    if (titleLower.includes("sponsor") || titleLower.includes("advertisement") || titleLower.includes("advert")) {
      return;
    }

    // Minimum title length check
    if (title.length < 10) return;

    items.push({
      title: title.trim(),
      link: link.trim(),
      summary: summary.trim(),
      source,
    });
  };

  // Strategy 1: Find headline-like links with descriptions (h1, h2, h3, h4)
  $("h1 a, h2 a, h3 a, h4 a").each((_, el) => {
    const $el = $(el);
    const title = $el.text().trim();
    const link = $el.attr("href");

    if (title && link) {
      // Try to find summary in next sibling
      let summary = "";
      const parent = $el.closest("h1, h2, h3, h4");
      const nextP = parent.next("p");
      if (nextP.length) {
        summary = nextP.text().trim();
      } else {
        // Try to find summary in parent's next sibling
        const parentNext = parent.next();
        if (parentNext.is("p")) {
          summary = parentNext.text().trim();
        }
      }

      addItem(title, link, summary, "heading");
    }
  });

  // Strategy 2: Look for bold/strong links (if no items found yet)
  if (items.length === 0) {
    $("strong a, b a, .font-bold a, .font-semibold a").each((_, el) => {
      const $el = $(el);
      const title = $el.text().trim();
      const link = $el.attr("href");

      if (title && link && title.split(" ").length >= 3) {
        let summary = "";
        const parent = $el.closest("p, div, td");
        const nextP = parent.next("p");
        if (nextP.length) {
          summary = nextP.text().trim();
        } else {
          // Try same element's text after the link
          const parentText = parent.text().trim();
          const linkIndex = parentText.indexOf(title);
          if (linkIndex >= 0) {
            const afterLink = parentText.substring(linkIndex + title.length).trim();
            if (afterLink.length > 20) {
              summary = afterLink.substring(0, 200);
            }
          }
        }

        addItem(title, link, summary, "bold");
      }
    });
  }

  // Strategy 3: Look for table-based layouts (common in newsletters)
  if (items.length === 0) {
    $("table a, td a").each((_, el) => {
      const $el = $(el);
      const title = $el.text().trim();
      const link = $el.attr("href");

      if (title && link && title.length > 15 && title.split(" ").length >= 3) {
        // Check if it's in a table cell with other content
        const $cell = $el.closest("td");
        const cellText = $cell.text().trim();
        
        // Extract summary from cell text (text after the link)
        let summary = "";
        const linkIndex = cellText.indexOf(title);
        if (linkIndex >= 0) {
          const afterLink = cellText.substring(linkIndex + title.length).trim();
          if (afterLink.length > 20 && afterLink.length < 500) {
            summary = afterLink;
          }
        }

        addItem(title, link, summary, "table");
      }
    });
  }

  // Strategy 4: Look for div-based card layouts
  if (items.length === 0) {
    $("div a").each((_, el) => {
      const $el = $(el);
      const title = $el.text().trim();
      const link = $el.attr("href");

      if (title && link && title.length > 20 && title.split(" ").length >= 4) {
        // Check if parent div has class names suggesting it's a news item
        const $parent = $el.closest("div");
        const parentClasses = $parent.attr("class") || "";
        const parentId = $parent.attr("id") || "";
        
        // Skip if it's clearly not a news item (navigation, footer, etc.)
        if (
          parentClasses.includes("nav") ||
          parentClasses.includes("footer") ||
          parentClasses.includes("header") ||
          parentId.includes("nav") ||
          parentId.includes("footer")
        ) {
          return;
        }

        // Try to find summary in sibling elements
        let summary = "";
        const $next = $parent.next("p, div");
        if ($next.length && $next.text().trim().length > 20) {
          summary = $next.text().trim().substring(0, 200);
        }

        addItem(title, link, summary, "div");
      }
    });
  }

  // Strategy 5: Last resort - any link with substantial text
  if (items.length === 0) {
    $("a[href]").each((_, el) => {
      const $el = $(el);
      const title = $el.text().trim();
      const link = $el.attr("href") || "";

      // Skip if it's clearly not a news link
      if (
        !link ||
        link.startsWith("#") ||
        link.startsWith("mailto:") ||
        link.includes("unsubscribe") ||
        link.includes("preferences") ||
        title.length < 20 ||
        title.split(" ").length < 4
      ) {
        return;
      }

      // Check if link looks like an article URL
      const isArticleUrl =
        link.includes("/article/") ||
        link.includes("/post/") ||
        link.includes("/news/") ||
        link.includes("/blog/") ||
        link.includes("medium.com") ||
        link.includes("substack.com") ||
        (link.match(/https?:\/\/[^\/]+\/[^\/]+/) && !link.match(/\.(jpg|png|gif|svg|pdf|zip)$/i));

      if (isArticleUrl) {
        addItem(title, link, "", "fallback");
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
