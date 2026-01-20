// Data Access Layer - KynguyenAI v3.0
// Unified API for fetching tools data
// Supports both mock data and Supabase

import type { Tool, ToolCategory, ToolReview } from "@/types";

// Environment flag to switch between mock and Supabase
const USE_SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY ? true : false;

// Re-export types
export type { Tool, ToolCategory, ToolReview };

// Tool with category (for consistency)
export type ToolWithCategory = Tool & {
  category?: ToolCategory;
};

// ============================================
// TOOL CATEGORIES
// ============================================

export async function getCategories(): Promise<ToolCategory[]> {
  if (USE_SUPABASE) {
    const { getToolCategories } = await import("@/lib/supabase/tools");
    return getToolCategories();
  } else {
    const { mockToolCategories } = await import("@/lib/mockdata");
    return mockToolCategories;
  }
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
  data: Tool[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export async function getToolsList(params: GetToolsParams = {}): Promise<GetToolsResult> {
  const { limit = 20, offset = 0 } = params;

  if (USE_SUPABASE) {
    const { getTools } = await import("@/lib/supabase/tools");
    const result = await getTools(params);
    return {
      data: result.data as unknown as Tool[],
      pagination: result.pagination,
    };
  } else {
    const { getMockTools } = await import("@/lib/mockdata");
    const result = getMockTools(params);

    return {
      data: result.data,
      pagination: {
        total: result.total,
        limit,
        offset,
        hasMore: offset + limit < result.total,
      },
    };
  }
}

export async function getToolDetail(slug: string): Promise<Tool | null> {
  if (USE_SUPABASE) {
    const { getToolBySlug } = await import("@/lib/supabase/tools");
    const tool = await getToolBySlug(slug);
    return tool as unknown as Tool | null;
  } else {
    const { getMockToolBySlug } = await import("@/lib/mockdata");
    return getMockToolBySlug(slug);
  }
}

export async function getFeaturedTools(limit = 5): Promise<Tool[]> {
  const result = await getToolsList({ featured: true, limit, sort: "votes" });
  return result.data;
}

// ============================================
// TOOL REVIEWS
// ============================================

export async function getReviewsForTool(toolSlug: string, limit = 10): Promise<ToolReview[]> {
  if (USE_SUPABASE) {
    const { getToolReviews } = await import("@/lib/supabase/tools");
    const reviews = await getToolReviews(toolSlug, limit);
    return reviews as unknown as ToolReview[];
  } else {
    const { getMockToolBySlug, getMockToolReviews } = await import("@/lib/mockdata");
    const tool = getMockToolBySlug(toolSlug);
    if (!tool) return [];
    return getMockToolReviews(tool.id);
  }
}
