// Mock Data Index - KynguyenAI v3.0
// Central export for all mock data

// Articles
export {
  mockArticles,
  getMockArticles,
  getMockArticleById,
  getMockFeaturedArticle,
} from "./articles";

// Tools
export {
  mockTools,
  mockToolsWithCategories,
  mockToolCategories,
  mockToolReviews,
  getMockTools,
  getMockToolBySlug,
  getMockToolReviews,
} from "./tools";

// GitHub
export { mockGitHubRepos, getMockGitHubTrending } from "./github";

// Sponsored & Affiliate
export {
  mockSponsoredTiles,
  mockAffiliateLinks,
  getMockSponsoredTiles,
  getMockAffiliateLink,
} from "./sponsored";
export type { SponsoredTile, AffiliateLink } from "./sponsored";

// Re-export types
export type { Article, GitHubRepo, Tool, ToolCategory, ToolReview } from "@/types";
