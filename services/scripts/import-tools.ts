/**
 * Import Crawled Tools to Supabase
 * Imports data from futurepedia-tools.json to Supabase
 *
 * Usage:
 *   npx tsx scripts/import-tools.ts --dry-run    # Preview import
 *   npx tsx scripts/import-tools.ts              # Run import
 */

import * as dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// ============================================
// Configuration
// ============================================

const DATA_FILE = path.join(__dirname, "../data/futurepedia-tools.json");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  console.log("Make sure you have .env with:");
  console.log("  NEXT_PUBLIC_SUPABASE_URL=...");
  console.log("  SUPABASE_SERVICE_ROLE_KEY=...");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================
// Category Mapping
// ============================================

const CATEGORY_MAPPING: Record<string, string> = {
  // Futurepedia category -> KynguyenAI category slug
  productivity: "productivity",
  "personal-assistant": "productivity",
  research: "research",
  "spreadsheet-assistant": "productivity",
  translators: "productivity",
  presentations: "productivity",

  video: "video-generation",
  "video-enhancer": "video-generation",
  "video-editing": "video-generation",
  "video-generators": "video-generation",
  "text-to-video": "video-generation",

  "text-generators": "text-generation",
  "prompt-generators": "text-generation",
  "writing-generators": "text-generation",
  paraphrasing: "text-generation",
  storyteller: "text-generation",
  "copywriting-assistant": "text-generation",

  business: "marketing",
  "website-builders": "marketing",
  marketing: "marketing",
  finance: "marketing",
  "project-management": "productivity",
  "social-media": "marketing",

  image: "image-generation",
  "design-generators": "design",
  "image-generators": "image-generation",
  "image-editing": "image-generation",
  "text-to-image": "image-generation",

  automations: "automation",
  workflows: "automation",
  "ai-agents": "automation",

  art: "design",
  "cartoon-generators": "design",
  "portrait-generators": "design",
  "avatar-generator": "design",
  "logo-generator": "design",
  "3D-generator": "design",

  "audio-generators": "audio-generation",
  "audio-editing": "audio-generation",
  "text-to-speech": "audio-generation",
  "music-generator": "audio-generation",
  transcriber: "audio-generation",

  code: "code-assistant",
  "code-assistant": "code-assistant",
  "low-code-no-code": "code-assistant",

  "misc-tools": "other",
  fitness: "other",
  religion: "other",
  students: "research",
  "fashion-assistant": "other",
  "gift-ideas": "other",
};

// Default categories that should exist
const DEFAULT_CATEGORIES = [
  { slug: "text-generation", name: "Text Generation", name_vi: "Tạo văn bản", icon: "pen-tool", display_order: 1 },
  { slug: "image-generation", name: "Image Generation", name_vi: "Tạo hình ảnh", icon: "image", display_order: 2 },
  { slug: "video-generation", name: "Video Generation", name_vi: "Tạo video", icon: "video", display_order: 3 },
  { slug: "audio-generation", name: "Audio Generation", name_vi: "Tạo âm thanh", icon: "music", display_order: 4 },
  { slug: "code-assistant", name: "Code Assistant", name_vi: "Hỗ trợ lập trình", icon: "code", display_order: 5 },
  { slug: "chatbot", name: "Chatbot", name_vi: "Chatbot", icon: "message-circle", display_order: 6 },
  { slug: "productivity", name: "Productivity", name_vi: "Năng suất", icon: "zap", display_order: 7 },
  { slug: "research", name: "Research", name_vi: "Nghiên cứu", icon: "search", display_order: 8 },
  { slug: "marketing", name: "Marketing", name_vi: "Marketing", icon: "megaphone", display_order: 9 },
  { slug: "design", name: "Design", name_vi: "Thiết kế", icon: "palette", display_order: 10 },
  { slug: "automation", name: "Automation", name_vi: "Tự động hóa", icon: "settings", display_order: 11 },
  { slug: "other", name: "Other", name_vi: "Khác", icon: "grid", display_order: 12 },
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

// ============================================
// Helper Functions
// ============================================

function generateSlug(name: string, existingSlugs: Set<string>): string {
  let base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (!existingSlugs.has(base)) {
    return base;
  }

  // Add number suffix if slug exists
  let counter = 2;
  while (existingSlugs.has(`${base}-${counter}`)) {
    counter++;
  }
  return `${base}-${counter}`;
}

function validatePricingType(type: string): "free" | "freemium" | "paid" | "enterprise" {
  const valid = ["free", "freemium", "paid", "enterprise"];
  if (valid.includes(type)) {
    return type as "free" | "freemium" | "paid" | "enterprise";
  }
  return "freemium";
}

// ============================================
// Import Functions
// ============================================

async function ensureCategories(): Promise<Map<string, string>> {
  console.log("📁 Ensuring categories exist...");

  // Upsert categories
  const { data, error } = await supabase
    .from("tool_categories")
    .upsert(DEFAULT_CATEGORIES, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("❌ Error upserting categories:", error);
    throw error;
  }

  // Create slug -> id map
  const categoryMap = new Map<string, string>();
  for (const cat of data || []) {
    categoryMap.set(cat.slug, cat.id);
  }

  console.log(`✅ ${categoryMap.size} categories ready`);
  return categoryMap;
}

async function getExistingToolSlugs(): Promise<Set<string>> {
  const { data, error } = await supabase.from("tools").select("slug");

  if (error) {
    console.error("❌ Error fetching existing slugs:", error);
    return new Set();
  }

  return new Set((data || []).map((t) => t.slug));
}

async function getExistingWebsiteUrls(): Promise<Set<string>> {
  const { data, error } = await supabase.from("tools").select("website_url");

  if (error) {
    console.error("❌ Error fetching existing URLs:", error);
    return new Set();
  }

  return new Set((data || []).map((t) => t.website_url.toLowerCase()));
}

async function importTools(tools: CrawledTool[], categoryMap: Map<string, string>, dryRun: boolean): Promise<void> {
  console.log(`\n📥 Importing ${tools.length} tools...`);

  const existingSlugs = await getExistingToolSlugs();
  const existingUrls = await getExistingWebsiteUrls();

  const toInsert: any[] = [];
  let skipped = 0;
  let duplicates = 0;

  for (const tool of tools) {
    // Skip if website URL already exists (duplicate)
    if (tool.website_url && existingUrls.has(tool.website_url.toLowerCase())) {
      duplicates++;
      continue;
    }

    // Skip if required fields missing
    if (!tool.name || !tool.website_url) {
      skipped++;
      continue;
    }

    // Generate unique slug
    const slug = generateSlug(tool.name, existingSlugs);
    existingSlugs.add(slug);

    // Map category
    const futurepediaCategory = tool.categories?.[0] || "other";
    const kynguyenaiCategory = CATEGORY_MAPPING[futurepediaCategory] || "other";
    const categoryId = categoryMap.get(kynguyenaiCategory) || categoryMap.get("other");

    const record = {
      slug,
      name: tool.name,
      tagline: tool.tagline || tool.name,
      description: tool.description || tool.tagline || tool.name,
      logo_url: tool.logo_url,
      website_url: tool.website_url,
      category_id: categoryId,
      pricing_type: validatePricingType(tool.pricing_type),
      pricing_details: tool.pricing_details,
      screenshots: [],
      video_url: null,
      vote_count: tool.bookmark_count || 0,
      review_count: tool.review_count || 0,
      average_rating: tool.rating || 0,
      status: "approved",
      featured: false,
      featured_date: null,
      published_at: new Date().toISOString(),
    };

    toInsert.push(record);
    existingUrls.add(tool.website_url.toLowerCase());
  }

  console.log(`   📊 To insert: ${toInsert.length}`);
  console.log(`   ⏭️ Skipped (missing data): ${skipped}`);
  console.log(`   🔄 Duplicates: ${duplicates}`);

  if (dryRun) {
    console.log("\n🔍 DRY RUN - No changes made");
    console.log("Sample records:");
    console.log(JSON.stringify(toInsert.slice(0, 3), null, 2));
    return;
  }

  // Batch insert (Supabase recommends batches of 1000)
  const BATCH_SIZE = 500;
  let inserted = 0;

  for (let i = 0; i < toInsert.length; i += BATCH_SIZE) {
    const batch = toInsert.slice(i, i + BATCH_SIZE);

    const { data, error } = await supabase.from("tools").upsert(batch, { onConflict: "slug" }).select();

    if (error) {
      console.error(`❌ Error inserting batch ${i / BATCH_SIZE + 1}:`, error);
      continue;
    }

    inserted += (data || []).length;
    console.log(`   ✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${(data || []).length} inserted`);
  }

  console.log(`\n✅ Import complete: ${inserted} tools inserted`);
}

// ============================================
// Main
// ============================================

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  console.log("🚀 Futurepedia Tools Import");
  console.log(`   Mode: ${dryRun ? "DRY RUN" : "LIVE"}`);
  console.log("");

  // Check if data file exists
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Data file not found: ${DATA_FILE}`);
    console.log("Run the crawler first: npx tsx scripts/crawl-futurepedia.ts");
    process.exit(1);
  }

  // Load crawled tools
  const tools: CrawledTool[] = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  console.log(`📂 Loaded ${tools.length} tools from ${DATA_FILE}`);

  // Ensure categories exist
  const categoryMap = await ensureCategories();

  // Import tools
  await importTools(tools, categoryMap, dryRun);
}

main().catch(console.error);
