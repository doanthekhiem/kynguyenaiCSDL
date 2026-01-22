// GitHub Trending Scraper - KynguyenAI v3.0
// Fetches real data from github.com/trending

import type { GitHubRepo } from "@/types";

// Cache configuration
interface CacheEntry {
  data: GitHubRepo[];
  timestamp: number;
}

const cache: Map<string, CacheEntry> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch GitHub Trending repositories
 * @param limit - Number of repos to return (default: 10)
 * @param language - Filter by programming language (optional)
 * @param since - Time range: "daily" | "weekly" | "monthly" (default: "daily")
 */
export async function fetchGitHubTrending(
  limit = 10,
  language?: string,
  since: "daily" | "weekly" | "monthly" = "daily",
): Promise<GitHubRepo[]> {
  const cacheKey = `${language || "all"}-${since}`;

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data.slice(0, limit);
  }

  try {
    // Build URL
    let url = `https://github.com/trending?since=${since}`;
    if (language) {
      url = `https://github.com/trending/${encodeURIComponent(language)}?since=${since}`;
    }

    // Fetch HTML
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      next: { revalidate: 300 }, // ISR: 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub trending: ${response.status}`);
    }

    const html = await response.text();
    const repos = parseGitHubTrending(html);

    // Update cache
    cache.set(cacheKey, {
      data: repos,
      timestamp: Date.now(),
    });

    return repos.slice(0, limit);
  } catch (error) {
    console.error("Error fetching GitHub trending:", error);

    // Return cached data if available (even if stale)
    if (cached) {
      return cached.data.slice(0, limit);
    }

    return [];
  }
}

/**
 * Parse star count from various formats (e.g., "12,345", "12k", "1.2M")
 */
function parseStarCount(starStr: string): number {
  if (!starStr) return 0;

  const cleaned = starStr.trim().replace(/,/g, "");

  // Handle k/K suffix (thousands)
  if (/k$/i.test(cleaned)) {
    return Math.round(parseFloat(cleaned.replace(/k$/i, "")) * 1000);
  }

  // Handle m/M suffix (millions)
  if (/m$/i.test(cleaned)) {
    return Math.round(parseFloat(cleaned.replace(/m$/i, "")) * 1000000);
  }

  return parseInt(cleaned, 10) || 0;
}

/**
 * Parse GitHub Trending HTML and extract repository data
 */
function parseGitHubTrending(html: string): GitHubRepo[] {
  const repos: GitHubRepo[] = [];

  // Split by article tags to get each repository
  const articlePattern = /<article class="Box-row"[^>]*>([\s\S]*?)<\/article>/g;
  let articleMatch;

  while ((articleMatch = articlePattern.exec(html)) !== null) {
    const articleHtml = articleMatch[1];

    try {
      // Extract repo name (owner/repo)
      const repoNameMatch = articleHtml.match(
        /href="\/([^"]+)"[^>]*>\s*<span[^>]*>([^<]+)<\/span>\s*<span[^>]*>\/\s*<\/span>\s*([^<]+)/,
      );
      const repoName = repoNameMatch
        ? `${repoNameMatch[2].trim()}/${repoNameMatch[3].trim()}`
        : extractRepoNameFallback(articleHtml);

      if (!repoName) continue;

      // Extract URL
      const url = `https://github.com/${repoName.trim()}`;

      // Extract description
      const descMatch = articleHtml.match(/<p[^>]*class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/);
      const description = descMatch ? descMatch[1].replace(/<[^>]+>/g, "").trim() : "";

      // Extract stars - GitHub displays stars like: <a href="/owner/repo/stargazers">3,318</a>
      // Stars link appears BEFORE forks link in the HTML
      // The star count is directly inside the anchor tag, after any SVG icons
      let stars = 0;

      // Look for the FIRST occurrence of stargazers with its number
      // Pattern: href ending with /stargazers" followed by content with a number
      // Use a more controlled regex that stops at </a>
      const allStarsMatches = articleHtml.match(/href="\/[^"]+\/stargazers"[^>]*>[\s\S]*?<\/a>/);

      if (allStarsMatches) {
        // Extract number from within this match
        const numberMatch = allStarsMatches[0].match(/(\d[\d,]*)\s*<\/a>/);
        if (numberMatch) {
          stars = parseStarCount(numberMatch[1]);
        }
      }

      // Fallback: try to extract using different approach if no match
      if (stars === 0) {
        // Look for pattern: >3,318</a> specifically within stargazers context
        const fallbackMatch = articleHtml.match(/\/stargazers"[^>]*>[^<]*?(\d[\d,]*)/);
        if (fallbackMatch) {
          stars = parseStarCount(fallbackMatch[1]);
        }
      }

      // Extract language
      const langMatch = articleHtml.match(/itemprop="programmingLanguage">([^<]+)<\/span>/);
      const language = langMatch ? langMatch[1].trim() : "Unknown";

      // Extract today's stars - look for the trending indicator at the end
      const todayStarsMatch =
        articleHtml.match(/([\d,]+)\s*stars?\s*today/i) ||
        articleHtml.match(/([\d,]+)\s*stars?\s*this week/i) ||
        articleHtml.match(/([\d,]+)\s*stars?\s*this month/i);
      const todayStars = todayStarsMatch ? parseInt(todayStarsMatch[1].replace(/,/g, ""), 10) : 0;

      repos.push({
        repo_name: repoName.trim(),
        url,
        description_vi: description || `Repository ${repoName} đang trending trên GitHub`,
        stars,
        language,
        trending_date: new Date().toISOString(),
        today_stars: todayStars,
      });
    } catch (e) {
      console.error("Error parsing repo:", e);
      continue;
    }
  }

  return repos;
}

/**
 * Fallback method to extract repo name
 */
function extractRepoNameFallback(html: string): string | null {
  // Try alternate pattern - look for h2 with repo link
  const h2Match = html.match(/<h2[^>]*>[\s\S]*?<a[^>]*href="\/([^"]+)"[^>]*>/);
  if (h2Match) {
    return h2Match[1];
  }

  // Try looking for the main repo link
  const linkMatch = html.match(/<a[^>]*href="\/([^\/]+\/[^\/]+)"[^>]*class="[^"]*"/);
  if (linkMatch) {
    return linkMatch[1];
  }

  return null;
}

/**
 * Clear the cache (useful for manual refresh)
 */
export function clearGitHubTrendingCache(): void {
  cache.clear();
}

/**
 * Get available programming languages for filter
 */
export const POPULAR_LANGUAGES = [
  "python",
  "javascript",
  "typescript",
  "java",
  "go",
  "rust",
  "c++",
  "c",
  "c#",
  "php",
  "ruby",
  "swift",
  "kotlin",
  "scala",
] as const;
