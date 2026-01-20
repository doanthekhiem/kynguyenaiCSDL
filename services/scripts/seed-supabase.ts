// Seed Script: Import mock data to Supabase
// Run with: npx tsx scripts/seed-supabase.ts
// Requires .env.local with Supabase credentials

import { createClient } from "@supabase/supabase-js";

// Import mock data
import { mockToolCategories, mockTools } from "../lib/mockdata/tools";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  console.log("Make sure you have .env.local with:");
  console.log("  NEXT_PUBLIC_SUPABASE_URL=...");
  console.log("  SUPABASE_SERVICE_ROLE_KEY=...");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedCategories() {
  console.log("📁 Seeding tool categories...");

  const categories = mockToolCategories.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    name_vi: cat.name_vi,
    description: cat.description,
    icon: cat.icon,
    display_order: cat.display_order,
    is_active: cat.is_active,
  }));

  const { data, error } = await supabase.from("tool_categories").upsert(categories, { onConflict: "slug" }).select();

  if (error) {
    console.error("❌ Error seeding categories:", error);
    return null;
  }

  console.log(`✅ Seeded ${data.length} categories`);
  return data;
}

async function seedTools(categories: { id: string; slug: string }[]) {
  console.log("🔧 Seeding AI tools...");

  // Create category slug to ID map
  const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));

  // Map mock category IDs to real category slugs
  const mockCategorySlugMap: Record<string, string> = {
    "cat-001": "text-generation",
    "cat-002": "image-generation",
    "cat-003": "video-generation",
    "cat-004": "audio-generation",
    "cat-005": "code-assistant",
    "cat-006": "chatbot",
    "cat-007": "productivity",
    "cat-008": "research",
    "cat-009": "marketing",
    "cat-010": "design",
  };

  const tools = mockTools.map((tool) => {
    const categorySlug = mockCategorySlugMap[tool.category_id || ""];
    const categoryId = categorySlug ? categoryMap.get(categorySlug) : null;

    return {
      slug: tool.slug,
      name: tool.name,
      tagline: tool.tagline,
      description: tool.description,
      logo_url: tool.logo_url,
      website_url: tool.website_url,
      category_id: categoryId,
      pricing_type: tool.pricing_type,
      pricing_details: tool.pricing_details,
      twitter_url: tool.twitter_url,
      github_url: tool.github_url,
      discord_url: tool.discord_url,
      screenshots: tool.screenshots || [],
      video_url: tool.video_url,
      vote_count: tool.vote_count,
      review_count: tool.review_count,
      average_rating: tool.average_rating,
      status: "approved", // Publish all mock tools
      featured: tool.featured,
      featured_date: tool.featured_date,
      published_at: tool.published_at,
    };
  });

  const { data, error } = await supabase.from("tools").upsert(tools, { onConflict: "slug" }).select();

  if (error) {
    console.error("❌ Error seeding tools:", error);
    return;
  }

  console.log(`✅ Seeded ${data.length} tools`);
}

async function main() {
  console.log("🚀 Starting Supabase seed...\n");

  // Seed categories first
  const categories = await seedCategories();

  if (!categories) {
    console.error("❌ Failed to seed categories, aborting");
    process.exit(1);
  }

  // Then seed tools with category IDs
  await seedTools(categories);

  console.log("\n✨ Seeding complete!");
}

main().catch(console.error);
