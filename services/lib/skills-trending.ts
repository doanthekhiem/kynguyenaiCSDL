// Skills.sh Trending Scraper - KynguyenAI v3.0
// Fetches real data from skills.sh/trending

import type { AgentSkill } from "@/types";

// Cache configuration
interface CacheEntry {
  data: AgentSkill[];
  timestamp: number;
}

const cache: Map<string, CacheEntry> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch Skills.sh Trending
 * @param limit - Number of skills to return (default: 10)
 * @param type - "trending" for 24h or "alltime" for all-time ranking
 */
export async function fetchSkillsTrending(
  limit = 10,
  type: "trending" | "alltime" = "trending",
): Promise<AgentSkill[]> {
  const cacheKey = `skills-${type}`;

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data.slice(0, limit);
  }

  try {
    // Build URL
    const url = type === "trending" ? "https://skills.sh/trending" : "https://skills.sh/";

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
      throw new Error(`Failed to fetch skills trending: ${response.status}`);
    }

    const html = await response.text();
    const skills = parseSkillsTrending(html);

    // Update cache
    cache.set(cacheKey, {
      data: skills,
      timestamp: Date.now(),
    });

    return skills.slice(0, limit);
  } catch (error) {
    console.error("Error fetching skills trending:", error);

    // Return cached data if available (even if stale)
    if (cached) {
      return cached.data.slice(0, limit);
    }

    return [];
  }
}

/**
 * Parse install count from various formats (e.g., "5.2K", "1.2M", "803")
 */
function parseInstallCount(str: string): number {
  if (!str) return 0;

  const cleaned = str.trim().replace(/,/g, "");

  // Handle K suffix (thousands)
  if (/k$/i.test(cleaned)) {
    return Math.round(parseFloat(cleaned.replace(/k$/i, "")) * 1000);
  }

  // Handle M suffix (millions)
  if (/m$/i.test(cleaned)) {
    return Math.round(parseFloat(cleaned.replace(/m$/i, "")) * 1000000);
  }

  return parseInt(cleaned, 10) || 0;
}

/**
 * Parse Skills.sh HTML and extract skill data
 * Based on the actual HTML structure observed from skills.sh
 *
 * Structure:
 * <a class="group grid..." href="/owner/repo/skill-name">
 *   <span ...>39</span>  <!-- rank -->
 *   <h3 ...>form-cro</h3>  <!-- skill name -->
 *   <p ...>coreyhaines31/marketingskills</p>  <!-- owner -->
 *   <span ...>330</span>  <!-- installs -->
 * </a>
 */
function parseSkillsTrending(html: string): AgentSkill[] {
  const skills: AgentSkill[] = [];

  try {
    // Pattern to extract skill listing blocks
    // Each skill is in an <a> tag with href like "/owner/repo/skill-name"
    // The class attribute comes BEFORE href in skills.sh HTML
    // Example: <a class="group grid..." href="/vercel-labs/agent-skills/vercel-react-best-practices">
    const skillBlockPattern =
      /<a[^>]*class="[^"]*group[^"]*grid[^"]*"[^>]*href="\/([^"\/]+)\/([^"\/]+)\/([^"\/]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    let match;

    while ((match = skillBlockPattern.exec(html)) !== null) {
      const owner = `${match[1]}/${match[2]}`;
      const skillName = match[3];
      const blockContent = match[4];

      // Extract rank from the block (first number in a span)
      const rankMatch = blockContent.match(/<span[^>]*>(\d+)<\/span>/);
      const rank = rankMatch ? parseInt(rankMatch[1], 10) : 0;

      if (rank === 0) continue;

      // Extract installs - look for the last span with a number (possibly with K/M suffix)
      // Pattern: <span ...font-mono...text-foreground...>330</span> or similar
      const allSpans = blockContent.match(/<span[^>]*>([^<]+)<\/span>/g) || [];
      let installsDisplay = "0";

      // Find span containing install count (usually the last numeric span)
      for (let i = allSpans.length - 1; i >= 0; i--) {
        const spanContent = allSpans[i].match(/>([^<]+)</);
        if (spanContent) {
          const content = spanContent[1].trim();
          // Check if it's a number (possibly with K/M suffix)
          if (/^\d+(?:[.,]\d+)?[KMkm]?$/.test(content)) {
            installsDisplay = content.toUpperCase().replace(",", ".");
            break;
          }
        }
      }

      const installs = parseInstallCount(installsDisplay);

      // Build URL
      const url = `https://skills.sh/${owner}/${skillName}`;

      // Avoid duplicates
      if (skills.some((s) => s.name === skillName && s.owner === owner)) {
        continue;
      }

      skills.push({
        rank,
        name: skillName,
        owner,
        url,
        installs,
        installs_display: installsDisplay,
        trending_date: new Date().toISOString(),
      });
    }

    // Sort by rank
    skills.sort((a, b) => a.rank - b.rank);
  } catch (e) {
    console.error("Error parsing skills:", e);
  }

  return skills;
}

/**
 * Clear the cache (useful for manual refresh)
 */
export function clearSkillsTrendingCache(): void {
  cache.clear();
}

/**
 * Get skill categories for potential filtering
 */
export const SKILL_CATEGORIES = [
  "react",
  "next.js",
  "marketing",
  "design",
  "expo",
  "testing",
  "devops",
  "performance",
] as const;
