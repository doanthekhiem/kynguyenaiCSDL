// Google Sheets Client - KynguyenAI v3.0
import { google } from "googleapis";
import type { Article, GitHubRepo } from "@/types";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || "{}"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!;

/**
 * Fetch published articles from Google Sheets
 */
export async function getPublishedArticles(limit = 20): Promise<Article[]> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Articles!A2:N", // Skip header row
  });

  const rows = response.data.values || [];

  return rows
    .filter((row) => row[12] === "published") // status = published
    .slice(0, limit)
    .map((row) => ({
      id: row[0] || "",
      url_hash: row[1] || "",
      title_hash: row[2] || "",
      title_vi: row[3] || "",
      summary_vi: row[4] || "",
      original_url: row[5] || "",
      thumbnail: row[6] || null,
      category: row[7] || "AI News",
      source: row[8] || "TLDR AI",
      published_at: row[9] || "",
      tile_size: row[10] || "standard",
      is_featured: row[11] === "TRUE",
      status: row[12] || "draft",
      created_at: row[13] || "",
    })) as Article[];
}

/**
 * Fetch articles by category
 */
export async function getArticlesByCategory(
  category: string,
  limit = 20
): Promise<Article[]> {
  const articles = await getPublishedArticles(100);
  return articles.filter((article) => article.category === category).slice(0, limit);
}

/**
 * Fetch featured articles
 */
export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  const articles = await getPublishedArticles(50);
  return articles.filter((article) => article.is_featured).slice(0, limit);
}

/**
 * Fetch single article by ID
 */
export async function getArticleById(id: string): Promise<Article | null> {
  const articles = await getPublishedArticles(100);
  return articles.find((article) => article.id === id) || null;
}

/**
 * Fetch GitHub trending repos (optional)
 */
export async function getGitHubTrending(limit = 10): Promise<GitHubRepo[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "GitHub_Trending!A2:F",
    });

    const rows = response.data.values || [];

    return rows.slice(0, limit).map((row) => ({
      repo_name: row[0] || "",
      url: row[1] || "",
      description_vi: row[2] || "",
      stars: parseInt(row[3] || "0", 10),
      language: row[4] || "",
      trending_date: row[5] || "",
    }));
  } catch {
    // Sheet might not exist yet
    return [];
  }
}
