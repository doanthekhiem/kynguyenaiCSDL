// Newsletter Data Access Functions
// KynguyenAI v3.0

import { createServerClient } from "../supabase/server";
import type {
  NewsletterNews,
  NewsletterNewsWithRelations,
  NewsletterCategory,
  NewsletterSource,
  NewsletterListParams,
  NewsletterListResponse,
  ProcessingQueueItem,
  ProcessedNewsItem,
} from "@/types";

// ============================================
// NEWSLETTER SOURCES
// ============================================

export async function getNewsletterSources(): Promise<NewsletterSource[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("newsletter_sources")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching newsletter sources:", error);
    return [];
  }

  return (data || []) as NewsletterSource[];
}

export async function getSourceBySlug(slug: string): Promise<NewsletterSource | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("newsletter_sources").select("*").eq("slug", slug).single();

  if (error) {
    console.error("Error fetching source:", error);
    return null;
  }

  return data as NewsletterSource;
}

export async function matchSourceByEmail(emailFrom: string): Promise<NewsletterSource | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("newsletter_sources").select("*").eq("is_active", true);

  if (error) {
    console.error("Error fetching sources:", error);
    return null;
  }

  // Match email against patterns
  for (const source of data || []) {
    if (source.email_pattern) {
      // Convert SQL LIKE pattern to regex
      const pattern = source.email_pattern.replace(/%/g, ".*").replace(/_/g, ".");
      const regex = new RegExp(pattern, "i");
      if (regex.test(emailFrom)) {
        return source as NewsletterSource;
      }
    }
  }

  return null;
}

// ============================================
// NEWSLETTER CATEGORIES
// ============================================

export async function getNewsletterCategories(): Promise<NewsletterCategory[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("newsletter_categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching newsletter categories:", error);
    return [];
  }

  return (data || []) as NewsletterCategory[];
}

export async function getCategoryBySlug(slug: string): Promise<NewsletterCategory | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("newsletter_categories").select("*").eq("slug", slug).single();

  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }

  return data as NewsletterCategory;
}

// ============================================
// NEWSLETTER NEWS
// ============================================

export async function getNewsletterNews(params: NewsletterListParams = {}): Promise<NewsletterListResponse> {
  const supabase = createServerClient();
  const { limit = 20, offset = 0, category, source, featured } = params;

  // Build query
  let query = supabase
    .from("newsletter_news")
    .select(
      `
      *,
      source:newsletter_sources(*),
      category:newsletter_categories(*)
    `,
      { count: "exact" },
    )
    .eq("status", "published");

  // Filter by category
  if (category) {
    const cat = await getCategoryBySlug(category);
    if (cat) {
      query = query.eq("category_id", cat.id);
    }
  }

  // Filter by source
  if (source) {
    const src = await getSourceBySlug(source);
    if (src) {
      query = query.eq("source_id", src.id);
    }
  }

  // Filter featured
  if (featured !== undefined) {
    query = query.eq("is_featured", featured);
  }

  // Sort by published date (newest first)
  query = query.order("published_at", { ascending: false });

  // Pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching newsletter news:", error);
    return {
      data: [],
      pagination: { total: 0, limit, offset, hasMore: false },
    };
  }

  return {
    data: (data || []) as NewsletterNewsWithRelations[],
    pagination: {
      total: count || 0,
      limit,
      offset,
      hasMore: offset + limit < (count || 0),
    },
  };
}

export async function getNewsletterNewsById(id: string): Promise<NewsletterNewsWithRelations | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("newsletter_news")
    .select(
      `
      *,
      source:newsletter_sources(*),
      category:newsletter_categories(*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching news item:", error);
    return null;
  }

  return data as NewsletterNewsWithRelations;
}

export async function getFeaturedNewsletterNews(limit = 6): Promise<NewsletterNewsWithRelations[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("newsletter_news")
    .select(
      `
      *,
      source:newsletter_sources(*),
      category:newsletter_categories(*)
    `,
    )
    .eq("status", "published")
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured news:", error);
    return [];
  }

  return (data || []) as NewsletterNewsWithRelations[];
}

export async function getLatestNewsletterNews(limit = 10): Promise<NewsletterNewsWithRelations[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("newsletter_news")
    .select(
      `
      *,
      source:newsletter_sources(*),
      category:newsletter_categories(*)
    `,
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }

  return (data || []) as NewsletterNewsWithRelations[];
}

// ============================================
// CREATE/UPDATE NEWSLETTER NEWS
// ============================================

interface CreateNewsletterNewsInput {
  url_hash: string;
  original_title: string;
  original_summary: string | null;
  original_url: string;
  title_vi: string;
  summary_vi: string;
  thumbnail_url: string | null;
  source_id: string | null;
  category_id: string | null;
  email_subject: string | null;
  email_received_at: string | null;
  email_id: string | null;
  perplexity_model?: string;
  auto_categorized?: boolean;
  is_featured?: boolean;
  status?: string;
}

export async function createNewsletterNews(input: CreateNewsletterNewsInput): Promise<NewsletterNews | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("newsletter_news")
    .insert({
      ...input,
      status: input.status || "published",
      perplexity_model: input.perplexity_model || "sonar",
      auto_categorized: input.auto_categorized ?? true,
      is_featured: input.is_featured ?? false,
    })
    .select()
    .single();

  if (error) {
    // Check if it's a duplicate error
    if (error.code === "23505") {
      console.log(`Duplicate news item: ${input.original_title}`);
      return null;
    }
    console.error("Error creating newsletter news:", error);
    return null;
  }

  return data as NewsletterNews;
}

/**
 * Check if a news item already exists by URL hash
 */
export async function checkDuplicate(urlHash: string): Promise<boolean> {
  const supabase = createServerClient();

  const { data, error } = await supabase.from("newsletter_news").select("id").eq("url_hash", urlHash).single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = not found
    console.error("Error checking duplicate:", error);
  }

  return !!data;
}

/**
 * Batch create news items from processed items
 */
export async function batchCreateNewsletterNews(
  items: ProcessedNewsItem[],
  emailMetadata: {
    email_id: string;
    email_subject: string;
    email_received_at: Date;
    source_id: string | null;
  },
): Promise<{ created: number; skipped: number }> {
  const supabase = createServerClient();

  // Get category IDs
  const categories = await getNewsletterCategories();
  const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));

  let created = 0;
  let skipped = 0;

  for (const item of items) {
    // Check duplicate
    const isDuplicate = await checkDuplicate(item.url_hash);
    if (isDuplicate) {
      skipped++;
      continue;
    }

    const input: CreateNewsletterNewsInput = {
      url_hash: item.url_hash,
      original_title: item.title,
      original_summary: item.summary,
      original_url: item.actual_url,
      title_vi: item.title_vi,
      summary_vi: item.summary_vi,
      thumbnail_url: item.thumbnail,
      source_id: emailMetadata.source_id,
      category_id: categoryMap.get(item.category_slug) || null,
      email_subject: emailMetadata.email_subject,
      email_received_at: emailMetadata.email_received_at.toISOString(),
      email_id: emailMetadata.email_id,
    };

    const result = await createNewsletterNews(input);
    if (result) {
      created++;
    } else {
      skipped++;
    }
  }

  return { created, skipped };
}

// ============================================
// PROCESSING QUEUE
// ============================================

export async function addToProcessingQueue(
  emailId: string,
  emailSubject: string,
  emailFrom: string,
  emailReceivedAt: Date,
): Promise<ProcessingQueueItem | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("newsletter_processing_queue")
    .insert({
      email_id: emailId,
      email_subject: emailSubject,
      email_from: emailFrom,
      email_received_at: emailReceivedAt.toISOString(),
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      console.log(`Email already in queue: ${emailId}`);
      return null;
    }
    console.error("Error adding to queue:", error);
    return null;
  }

  return data as ProcessingQueueItem;
}

export async function updateQueueStatus(
  emailId: string,
  status: "processing" | "completed" | "failed" | "skipped",
  options?: {
    items_count?: number;
    items_processed?: number;
    error_message?: string;
  },
): Promise<void> {
  const supabase = createServerClient();

  const updateData: Record<string, unknown> = {
    status,
    ...(status === "completed" || status === "failed" ? { processed_at: new Date().toISOString() } : {}),
    ...options,
  };

  const { error } = await supabase.from("newsletter_processing_queue").update(updateData).eq("email_id", emailId);

  if (error) {
    console.error("Error updating queue status:", error);
  }
}

export async function getQueueItem(emailId: string): Promise<ProcessingQueueItem | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("newsletter_processing_queue")
    .select("*")
    .eq("email_id", emailId)
    .single();

  if (error) {
    if (error.code !== "PGRST116") {
      console.error("Error getting queue item:", error);
    }
    return null;
  }

  return data as ProcessingQueueItem;
}

export async function getPendingQueueItems(limit = 10): Promise<ProcessingQueueItem[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("newsletter_processing_queue")
    .select("*")
    .eq("status", "pending")
    .lt("retry_count", 3) // Only items that haven't exceeded retries
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error getting pending queue items:", error);
    return [];
  }

  return (data || []) as ProcessingQueueItem[];
}

export async function incrementRetryCount(emailId: string): Promise<void> {
  const supabase = createServerClient();

  const { error } = await supabase.rpc("increment_retry_count", {
    p_email_id: emailId,
  });

  if (error) {
    // Fallback if RPC doesn't exist
    const { data } = await supabase
      .from("newsletter_processing_queue")
      .select("retry_count")
      .eq("email_id", emailId)
      .single();

    if (data) {
      await supabase
        .from("newsletter_processing_queue")
        .update({ retry_count: (data.retry_count || 0) + 1 })
        .eq("email_id", emailId);
    }
  }
}
