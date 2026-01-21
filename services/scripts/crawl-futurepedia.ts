/**
 * Futurepedia AI Tools Crawler
 * Crawls AI tools data from https://www.futurepedia.io/ai-tools
 *
 * Usage:
 *   npx tsx scripts/crawl-futurepedia.ts --test --limit 10  # Test with 10 tools
 *   npx tsx scripts/crawl-futurepedia.ts                     # Full crawl
 */

import { chromium, Browser, Page } from "playwright";
import * as fs from "fs";
import * as path from "path";

// ============================================
// Configuration
// ============================================

const BASE_URL = "https://www.futurepedia.io";
const OUTPUT_DIR = path.join(__dirname, "../data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "futurepedia-tools.json");
const PROGRESS_FILE = path.join(OUTPUT_DIR, "crawl-progress.json");

// Rate limiting
const DELAY_BETWEEN_PAGES = 1500; // 1.5 seconds
const DELAY_BETWEEN_TOOLS = 800; // 0.8 seconds

// Categories to crawl
const CATEGORIES = [
  "productivity",
  "video",
  "text-generators",
  "business",
  "image",
  "automations",
  "art",
  "audio-generators",
  "code",
  "misc-tools",
];

// ============================================
// Types
// ============================================

interface CrawledTool {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo_url: string | null;
  website_url: string;
  pricing_type: string;
  pricing_details: string | null;
  categories: string[];
  tags: string[];
  rating: number;
  review_count: number;
  bookmark_count: number;
  source_url: string;
  crawled_at: string;
}

interface CrawlProgress {
  completed_categories: string[];
  current_category: string | null;
  current_page: number;
  total_tools_crawled: number;
  last_updated: string;
}

// ============================================
// Helper Functions
// ============================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadProgress(): CrawlProgress {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
    }
  } catch (e) {
    console.log("⚠️ Could not load progress file, starting fresh");
  }
  return {
    completed_categories: [],
    current_category: null,
    current_page: 1,
    total_tools_crawled: 0,
    last_updated: new Date().toISOString(),
  };
}

function saveProgress(progress: CrawlProgress): void {
  progress.last_updated = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

function loadExistingTools(): CrawledTool[] {
  try {
    if (fs.existsSync(OUTPUT_FILE)) {
      return JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8"));
    }
  } catch (e) {
    console.log("⚠️ Could not load existing tools file, starting fresh");
  }
  return [];
}

function saveTools(tools: CrawledTool[]): void {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(tools, null, 2));
}

function mapPricingType(pricing: string): string {
  const lower = pricing.toLowerCase().trim();
  if (lower.includes("free trial")) return "freemium";
  if (lower === "free") return "free";
  if (lower === "freemium") return "freemium";
  if (lower === "paid") return "paid";
  if (lower.includes("enterprise") || lower.includes("contact")) return "enterprise";
  return "freemium"; // Default
}

// ============================================
// Crawler Functions
// ============================================

async function extractToolsFromListPage(page: Page): Promise<{ slugs: string[]; hasMore: boolean }> {
  // Wait for page content to load - use networkidle for client-side rendering
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => null);
  await page.waitForTimeout(3000); // Extra wait for client-side rendering

  // Extract tool slugs - Futurepedia uses absolute URLs for tool links
  const slugs = await page.evaluate(() => {
    // Match both absolute and relative tool links
    const links = Array.from(document.querySelectorAll('a[href*="/tool/"]'));
    const uniqueSlugs = new Set<string>();

    links.forEach((link) => {
      // Use the resolved href property (always absolute)
      const href = (link as HTMLAnchorElement).href || link.getAttribute("href") || "";
      if (href) {
        const match = href.match(/\/tool\/([^/?#]+)/);
        if (match) {
          uniqueSlugs.add(match[1]);
        }
      }
    });

    return Array.from(uniqueSlugs);
  });

  // Check if there are more pages
  const hasMore = await page.evaluate(() => {
    // Look for pagination or "Load More" button
    const paginationLinks = document.querySelectorAll('a[href*="page="]');
    const currentUrl = window.location.href;
    const currentPage = parseInt(new URL(currentUrl).searchParams.get("page") || "1");

    let maxPage = currentPage;
    paginationLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href) {
        const match = href.match(/page=(\d+)/);
        if (match) {
          maxPage = Math.max(maxPage, parseInt(match[1]));
        }
      }
    });

    return currentPage < maxPage;
  });

  return { slugs, hasMore };
}

async function extractToolDetail(page: Page, slug: string): Promise<CrawledTool | null> {
  const toolUrl = `${BASE_URL}/tool/${slug}`;

  try {
    await page.goto(toolUrl, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    // Extract data using individual selectors to avoid tsx compilation issues
    const name = await page.$eval("h1", (el) => el.textContent?.trim() || "").catch(() => "");

    if (!name) {
      console.log(`  ⚠️ Could not extract name for ${slug}`);
      return null;
    }

    // Extract tagline - paragraph near h1
    const tagline = await page
      .evaluate(() => {
        const h1 = document.querySelector("h1");
        if (h1) {
          const nextP = h1.parentElement?.querySelector("p");
          return nextP?.textContent?.trim() || "";
        }
        return "";
      })
      .catch(() => "");

    // Extract description - first long paragraph
    const description = await page
      .evaluate(() => {
        const paragraphs = document.querySelectorAll("p");
        for (let i = 0; i < paragraphs.length; i++) {
          const text = paragraphs[i].textContent?.trim() || "";
          if (text.length > 100 && !text.includes("cookie")) {
            return text;
          }
        }
        return "";
      })
      .catch(() => "");

    // Extract logo URL
    const logo_url = await page
      .evaluate(() => {
        const logoImg = document.querySelector('img[alt*="logo" i], img[src*="logo"]');
        if (logoImg) {
          return logoImg.getAttribute("src");
        }
        const imgs = document.querySelectorAll("img");
        for (let i = 0; i < imgs.length; i++) {
          const src = imgs[i].getAttribute("src") || "";
          if (src && !src.includes("avatar") && !src.includes("user") && imgs[i].width > 50) {
            return src;
          }
        }
        return null;
      })
      .catch(() => null);

    // Extract website URL
    const website_url = await page
      .evaluate(() => {
        const visitLinks = document.querySelectorAll('a[href*="http"]');
        for (let i = 0; i < visitLinks.length; i++) {
          const link = visitLinks[i];
          const text = link.textContent?.toLowerCase() || "";
          const href = link.getAttribute("href") || "";
          if (
            (text.includes("visit") || text.includes("website")) &&
            !href.includes("futurepedia") &&
            !href.includes("twitter") &&
            !href.includes("youtube")
          ) {
            return href;
          }
        }
        return "";
      })
      .catch(() => "");

    // Extract pricing type
    const pricing_type = await page
      .evaluate(() => {
        const bodyText = document.body.textContent?.toLowerCase() || "";
        if (bodyText.includes("free trial")) return "freemium";
        if (bodyText.match(/\bfree\b/) && !bodyText.includes("freemium")) return "free";
        if (bodyText.includes("freemium")) return "freemium";
        if (bodyText.includes("paid")) return "paid";
        return "freemium";
      })
      .catch(() => "freemium");

    // Extract tags from category links
    const tags = await page
      .evaluate(() => {
        const result: string[] = [];
        const hashtagLinks = document.querySelectorAll('a[href*="/ai-tools/"]');
        hashtagLinks.forEach(function (link) {
          const text = link.textContent?.trim().replace("#", "") || "";
          if (text && text.length < 50) {
            result.push(text);
          }
        });
        return result;
      })
      .catch(() => []);

    // Extract rating
    const rating = await page
      .evaluate(() => {
        const match = document.body.textContent?.match(/Rated\s+([\d.]+)\s+out\s+of\s+5/i);
        return match ? parseFloat(match[1]) : 0;
      })
      .catch(() => 0);

    // Extract review count
    const review_count = await page
      .evaluate(() => {
        const match = document.body.textContent?.match(/(\d+)\s+review/i);
        return match ? parseInt(match[1]) : 0;
      })
      .catch(() => 0);

    // Extract bookmark count
    const bookmark_count = await page
      .evaluate(() => {
        const match = document.body.textContent?.match(/(\d+)\s*(save|bookmark)/i);
        return match ? parseInt(match[1]) : 0;
      })
      .catch(() => 0);

    return {
      name,
      slug,
      tagline: tagline || name,
      description: description || tagline || name,
      logo_url,
      website_url,
      pricing_type: mapPricingType(pricing_type),
      pricing_details: null,
      categories: [],
      tags,
      rating,
      review_count,
      bookmark_count,
      source_url: toolUrl,
      crawled_at: new Date().toISOString(),
    };
  } catch (error) {
    console.log(`  ❌ Error crawling ${slug}:`, (error as Error).message);
    return null;
  }
}

// ============================================
// Main Crawler
// ============================================

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const isTest = args.includes("--test");
  const limitIndex = args.indexOf("--limit");
  const limit = limitIndex !== -1 ? parseInt(args[limitIndex + 1]) : Infinity;
  const resetProgress = args.includes("--reset");

  console.log("🚀 Futurepedia AI Tools Crawler");
  console.log(`   Mode: ${isTest ? "TEST" : "FULL"}`);
  console.log(`   Limit: ${limit === Infinity ? "None" : limit}`);
  console.log("");

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load progress
  let progress = resetProgress
    ? {
        completed_categories: [],
        current_category: null,
        current_page: 1,
        total_tools_crawled: 0,
        last_updated: new Date().toISOString(),
      }
    : loadProgress();

  let tools = resetProgress ? [] : loadExistingTools();
  const existingSlugs = new Set(tools.map((t) => t.slug));

  console.log(`📊 Loaded ${tools.length} existing tools`);
  console.log(`📊 Completed categories: ${progress.completed_categories.join(", ") || "None"}`);
  console.log("");

  // Launch browser
  const browser: Browser = await chromium.launch({
    headless: true,
    args: ["--disable-dev-shm-usage"],
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  const page: Page = await context.newPage();

  let totalCrawled = 0;

  try {
    for (const category of CATEGORIES) {
      // Skip completed categories
      if (progress.completed_categories.includes(category)) {
        console.log(`⏭️ Skipping completed category: ${category}`);
        continue;
      }

      console.log(`\n📁 Category: ${category}`);
      progress.current_category = category;

      let pageNum = progress.current_category === category ? progress.current_page : 1;
      let hasMore = true;

      while (hasMore && totalCrawled < limit) {
        const categoryUrl = `${BASE_URL}/ai-tools/${category}?page=${pageNum}`;
        console.log(`   📄 Page ${pageNum}: ${categoryUrl}`);

        try {
          await page.goto(categoryUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
          await sleep(DELAY_BETWEEN_PAGES);

          const { slugs, hasMore: morePages } = await extractToolsFromListPage(page);
          hasMore = morePages;

          console.log(`      Found ${slugs.length} tools`);

          // Crawl each tool
          for (const slug of slugs) {
            if (totalCrawled >= limit) break;

            // Skip if already crawled
            if (existingSlugs.has(slug)) {
              console.log(`      ⏭️ ${slug} (already crawled)`);
              continue;
            }

            console.log(`      🔍 Crawling: ${slug}`);
            const tool = await extractToolDetail(page, slug);

            if (tool) {
              tool.categories = [category];
              tools.push(tool);
              existingSlugs.add(slug);
              totalCrawled++;
              progress.total_tools_crawled++;

              // Save periodically
              if (totalCrawled % 10 === 0) {
                saveTools(tools);
                saveProgress(progress);
                console.log(`      💾 Saved (${tools.length} tools total)`);
              }
            }

            await sleep(DELAY_BETWEEN_TOOLS);
          }

          pageNum++;
          progress.current_page = pageNum;
          saveProgress(progress);
        } catch (error) {
          console.log(`   ❌ Error on page ${pageNum}:`, (error as Error).message);
          hasMore = false;
        }
      }

      // Mark category as complete
      if (totalCrawled < limit) {
        progress.completed_categories.push(category);
        progress.current_page = 1;
        saveProgress(progress);
      }

      if (totalCrawled >= limit) {
        console.log(`\n⚠️ Reached limit of ${limit} tools`);
        break;
      }
    }
  } finally {
    await browser.close();
  }

  // Final save
  saveTools(tools);
  saveProgress(progress);

  console.log("\n✅ Crawl complete!");
  console.log(`   Total tools: ${tools.length}`);
  console.log(`   New tools this run: ${totalCrawled}`);
  console.log(`   Output: ${OUTPUT_FILE}`);
}

main().catch(console.error);
