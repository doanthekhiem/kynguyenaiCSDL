// Supabase Data Access Functions - Tools
// KynguyenAI v3.0

import { createServerClient } from "./server";
import type { Tool, ToolCategory, ToolWithCategory, ToolReview, ReviewWithUser } from "./types";

// ============================================
// TOOL CATEGORIES
// ============================================

export async function getToolCategories(): Promise<ToolCategory[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("tool_categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return (data || []) as ToolCategory[];
}

export async function getCategoryBySlug(slug: string): Promise<ToolCategory | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("tool_categories").select("*").eq("slug", slug).single();

  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }

  return data as ToolCategory;
}

// ============================================
// TOOLS
// ============================================

interface GetToolsParams {
  limit?: number;
  offset?: number;
  category?: string;
  search?: string;
  sort?: "votes" | "newest" | "rating";
  featured?: boolean;
}

interface GetToolsResult {
  data: ToolWithCategory[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export async function getTools(params: GetToolsParams = {}): Promise<GetToolsResult> {
  const supabase = createServerClient();
  const { limit = 20, offset = 0, category, search, sort = "votes", featured } = params;

  // Build query
  let query = supabase
    .from("tools")
    .select(
      `
      *,
      category:tool_categories(*)
    `,
      { count: "exact" },
    )
    .eq("status", "approved");

  // Filter by category
  if (category) {
    // Get category ID first
    const { data: cat } = await supabase.from("tool_categories").select("id").eq("slug", category).single();

    if (cat) {
      query = query.eq("category_id", cat.id);
    }
  }

  // Filter featured
  if (featured !== undefined) {
    query = query.eq("featured", featured);
  }

  // Search
  if (search) {
    query = query.or(`name.ilike.%${search}%,tagline.ilike.%${search}%,description.ilike.%${search}%`);
  }

  // Sort
  switch (sort) {
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "rating":
      query = query.order("average_rating", { ascending: false });
      break;
    case "votes":
    default:
      query = query.order("vote_count", { ascending: false });
      break;
  }

  // Pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching tools:", error);
    return {
      data: [],
      pagination: { total: 0, limit, offset, hasMore: false },
    };
  }

  const total = count || 0;

  return {
    data: (data || []) as ToolWithCategory[],
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    },
  };
}

export async function getToolBySlug(slug: string): Promise<ToolWithCategory | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("tools")
    .select(
      `
      *,
      category:tool_categories(*)
    `,
    )
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (error) {
    console.error("Error fetching tool:", error);
    return null;
  }

  return data as ToolWithCategory;
}

export async function getFeaturedTools(limit = 5): Promise<ToolWithCategory[]> {
  const result = await getTools({ featured: true, limit, sort: "votes" });
  return result.data;
}

// ============================================
// TOOL VOTES
// ============================================

export async function toggleVote(toolSlug: string, userId: string): Promise<{ voted: boolean; vote_count: number }> {
  const supabase = createServerClient();

  // Get tool ID
  const tool = await getToolBySlug(toolSlug);
  if (!tool) {
    throw new Error("Tool not found");
  }

  // Check existing vote
  const { data: existingVote } = await supabase
    .from("tool_votes")
    .select("id")
    .eq("tool_id", tool.id)
    .eq("user_id", userId)
    .single();

  if (existingVote) {
    // Remove vote
    await supabase.from("tool_votes").delete().eq("id", existingVote.id);

    // Decrement vote count
    await supabase
      .from("tools")
      .update({ vote_count: tool.vote_count - 1 })
      .eq("id", tool.id);

    return { voted: false, vote_count: tool.vote_count - 1 };
  } else {
    // Add vote
    await supabase.from("tool_votes").insert({ tool_id: tool.id, user_id: userId });

    // Increment vote count
    await supabase
      .from("tools")
      .update({ vote_count: tool.vote_count + 1 })
      .eq("id", tool.id);

    return { voted: true, vote_count: tool.vote_count + 1 };
  }
}

export async function hasUserVoted(toolId: string, userId: string): Promise<boolean> {
  const supabase = createServerClient();

  const { data } = await supabase.from("tool_votes").select("id").eq("tool_id", toolId).eq("user_id", userId).single();

  return !!data;
}

// ============================================
// TOOL REVIEWS
// ============================================

export async function getToolReviews(toolSlug: string, limit = 20): Promise<ReviewWithUser[]> {
  const supabase = createServerClient();

  // Get tool ID
  const tool = await getToolBySlug(toolSlug);
  if (!tool) {
    return [];
  }

  const { data, error } = await supabase
    .from("tool_reviews")
    .select(
      `
      *,
      user:user_profiles(display_name, avatar_url)
    `,
    )
    .eq("tool_id", tool.id)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return (data || []) as ReviewWithUser[];
}

interface CreateReviewParams {
  toolSlug: string;
  userId: string;
  rating: number;
  title?: string;
  content: string;
}

export async function createReview(params: CreateReviewParams): Promise<ToolReview | null> {
  const supabase = createServerClient();
  const { toolSlug, userId, rating, title, content } = params;

  // Get tool
  const tool = await getToolBySlug(toolSlug);
  if (!tool) {
    throw new Error("Tool not found");
  }

  // Create review
  const { data, error } = await supabase
    .from("tool_reviews")
    .insert({
      tool_id: tool.id,
      user_id: userId,
      rating,
      title: title || null,
      content,
      status: "published",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating review:", error);
    throw error;
  }

  // Update tool stats
  const { data: reviews } = await supabase
    .from("tool_reviews")
    .select("rating")
    .eq("tool_id", tool.id)
    .eq("status", "published");

  if (reviews && reviews.length > 0) {
    const avgRating = reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length;

    await supabase
      .from("tools")
      .update({
        review_count: reviews.length,
        average_rating: Math.round(avgRating * 10) / 10,
      })
      .eq("id", tool.id);
  }

  return data as ToolReview;
}

// ============================================
// SUBSCRIBERS
// ============================================

export async function addSubscriber(email: string): Promise<{ success: boolean; message: string }> {
  const supabase = createServerClient();

  const { error } = await supabase.from("subscribers").insert({ email, status: "pending" });

  if (error) {
    if (error.code === "23505") {
      // Unique violation
      return { success: false, message: "Email đã được đăng ký" };
    }
    console.error("Error adding subscriber:", error);
    return { success: false, message: "Có lỗi xảy ra, vui lòng thử lại" };
  }

  return { success: true, message: "Đăng ký thành công!" };
}

// ============================================
// TOOL SUBMISSION
// ============================================

interface SubmitToolParams {
  name: string;
  tagline: string;
  description: string;
  website_url: string;
  logo_url?: string;
  category_id?: string;
  pricing_type: Tool["pricing_type"];
  pricing_details?: string;
  twitter_url?: string;
  github_url?: string;
}

export async function submitTool(params: SubmitToolParams): Promise<Tool | null> {
  const supabase = createServerClient();

  // Generate slug from name
  const slug = params.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const { data, error } = await supabase
    .from("tools")
    .insert({
      ...params,
      slug,
      status: "pending",
      featured: false,
      screenshots: [],
    })
    .select()
    .single();

  if (error) {
    console.error("Error submitting tool:", error);
    throw error;
  }

  return data as Tool;
}
