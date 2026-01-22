// Types - KynguyenAI v3.0
// Based on Detail-Design.md specifications

// ============ ARTICLE TYPES ============
export type TileSize = "hero" | "tall" | "wide" | "standard";

export type ArticleCategory = "AI Tools" | "AI News" | "AI Tutorial";

export type ArticleSource = "AlphaSignal" | "TLDR AI" | "The Rundown AI" | "Import AI" | "AI Breakfast";

export type ArticleStatus = "draft" | "published" | "archived";

export interface Article {
  id: string;
  url_hash: string;
  title_hash: string;
  title_vi: string;
  summary_vi: string;
  original_url: string;
  thumbnail: string | null;
  category: ArticleCategory;
  source: ArticleSource;
  published_at: string;
  tile_size: TileSize;
  is_featured: boolean;
  status: ArticleStatus;
  created_at: string;
}

export interface ArticleListResponse {
  data: Article[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// ============ GITHUB TYPES ============
export interface GitHubRepo {
  repo_name: string;
  url: string;
  description_vi: string;
  stars: number;
  language: string;
  trending_date: string;
  today_stars?: number; // Stars gained today/this week/this month
}

// ============ TOOL TYPES ============
export type PricingType = "free" | "freemium" | "paid" | "enterprise";
export type ToolStatus = "pending" | "approved" | "rejected" | "archived";
export type SubmitterRelation = "maker" | "user" | "other";
export type ReviewStatus = "published" | "hidden" | "flagged";

export interface ToolCategory {
  id: string;
  slug: string;
  name: string;
  name_vi: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  is_active: boolean;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo_url: string | null;
  website_url: string;
  category_id: string | null;
  category?: ToolCategory;
  pricing_type: PricingType;
  pricing_details: string | null;
  twitter_url: string | null;
  github_url: string | null;
  discord_url: string | null;
  screenshots: string[];
  video_url: string | null;
  vote_count: number;
  review_count: number;
  average_rating: number;
  status: ToolStatus;
  featured: boolean;
  featured_date: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface ToolVote {
  id: string;
  tool_id: string;
  user_id: string;
  created_at: string;
}

export interface ToolReview {
  id: string;
  tool_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  content: string;
  status: ReviewStatus;
  helpful_count: number;
  created_at: string;
  updated_at: string;
  user?: {
    display_name: string | null;
    avatar_url: string | null;
  };
}

export interface ToolSubmission {
  id: string;
  name: string;
  tagline: string;
  description: string;
  website_url: string;
  logo_url: string | null;
  category_id: string | null;
  pricing_type: PricingType;
  pricing_details: string | null;
  twitter_url: string | null;
  github_url: string | null;
  submitted_by: string;
  submitter_relation: SubmitterRelation;
  status: "pending" | "approved" | "rejected";
  reviewer_notes: string | null;
  created_at: string;
}

export interface ToolListResponse {
  data: Tool[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface VoteResponse {
  voted: boolean;
  vote_count: number;
  message: string;
}

// ============ USER TYPES ============
export type UserRole = "user" | "admin";

export interface UserProfile {
  id: string;
  auth_id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  favorite_categories: string[];
  theme: "light" | "dark" | "system";
  language: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  article_id: string;
  created_at: string;
  article?: {
    title_vi: string;
    thumbnail: string | null;
    category: string;
  };
}

export interface ReadingHistory {
  id: string;
  user_id: string;
  article_id: string;
  read_percentage: number;
  time_spent: number;
  created_at: string;
  updated_at: string;
  article?: {
    title_vi: string;
    thumbnail: string | null;
    category: string;
  };
}

// ============ SUBSCRIBER TYPES ============
export interface Subscriber {
  email: string;
  status: "pending" | "confirmed";
  subscribed_at: string;
}

// ============ API TYPES ============
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: string;
  code?: string;
  details?: unknown;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface ArticlesParams extends PaginationParams {
  category?: string;
  featured?: boolean;
}

export interface ToolsParams extends PaginationParams {
  category?: string;
  search?: string;
  sort?: "votes" | "newest" | "rating";
  featured?: boolean;
}

export interface RevalidateResponse {
  revalidated: boolean;
  source?: string;
  timestamp?: string;
}

// ============ COMPONENT PROPS ============
export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export interface ArticleCardProps {
  article: Article;
  className?: string;
}

export interface ToolCardProps {
  tool: Tool;
  userVoted?: boolean;
  className?: string;
}
