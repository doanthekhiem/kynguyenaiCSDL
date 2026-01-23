# Detail Design - Newsletter Tracking

> **Phiên bản**: 1.0
> **Cập nhật**: 23/01/2026
> **Mục đích**: Chi tiết implementation để triển khai Newsletter Tracking feature

---

## 1. File Structure

```
services/
├── lib/
│   └── newsletter/
│       ├── index.ts           # Module exports
│       ├── gmail.ts           # Gmail API client
│       ├── email-parser.ts    # Parse newsletter HTML
│       ├── perplexity.ts      # Translation & categorization
│       └── data.ts            # Supabase queries
├── app/
│   ├── api/
│   │   └── newsletter/
│   │       ├── route.ts           # GET /api/newsletter
│   │       ├── sync/
│   │       │   └── route.ts       # POST /api/newsletter/sync
│   │       ├── categories/
│   │       │   └── route.ts       # GET /api/newsletter/categories
│   │       └── sources/
│   │           └── route.ts       # GET /api/newsletter/sources
│   └── newsletter/
│       └── page.tsx               # Newsletter listing page
├── components/
│   └── newsletter/
│       ├── index.ts
│       ├── NewsletterCard.tsx     # Card components
│       └── NewsletterNewsSection.tsx  # Homepage section
├── scripts/
│   └── gmail-authorize.ts         # OAuth2 token script
└── types/
    └── index.ts                   # Newsletter types added

supabase/
└── migrations/
    └── 002_newsletter_news.sql    # Database schema
```

---

## 2. Type Definitions

### 2.1 Core Types

```typescript
// types/index.ts

export type NewsletterStatus = "draft" | "published" | "archived" | "rejected";
export type QueueStatus = "pending" | "processing" | "completed" | "failed" | "skipped";

export interface NewsletterSource {
  id: string;
  slug: string;
  name: string;
  name_vi: string | null;
  email_pattern: string | null;
  logo_url: string | null;
  website_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface NewsletterCategory {
  id: string;
  slug: string;
  name: string;
  name_vi: string;
  icon: string | null;
  color: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface NewsletterNews {
  id: string;
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
  is_featured: boolean;
  status: NewsletterStatus;
  perplexity_model: string | null;
  auto_categorized: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  source?: NewsletterSource | null;
  category?: NewsletterCategory | null;
}

export interface NewsletterNewsWithRelations extends NewsletterNews {
  source: NewsletterSource | null;
  category: NewsletterCategory | null;
}
```

### 2.2 API Types

```typescript
export interface NewsletterListParams {
  limit?: number;
  offset?: number;
  category?: string;
  source?: string;
  featured?: boolean;
}

export interface NewsletterListResponse {
  data: NewsletterNewsWithRelations[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface ParsedNewsItem {
  title: string;
  summary: string;
  link: string;
  thumbnail: string | null;
}

export interface ProcessedNewsItem extends ParsedNewsItem {
  title_vi: string;
  summary_vi: string;
  category_slug: string;
  actual_url: string;
  url_hash: string;
}
```

---

## 3. Gmail Integration

### 3.1 OAuth2 Client Setup

```typescript
// lib/newsletter/gmail.ts

import { google, gmail_v1 } from "googleapis";

function getOAuth2Client() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  return oauth2Client;
}

export function getGmailClient(): gmail_v1.Gmail {
  const auth = getOAuth2Client();
  return google.gmail({ version: "v1", auth });
}
```

### 3.2 Fetch Newsletters

```typescript
const NEWSLETTER_SENDERS = [
  "@beehiiv.com",
  "@mail.beehiiv.com",
  "@substack.com",
  "@therundown.ai",
  "@tldr.tech",
  "@alphasignal.ai",
];

export async function fetchUnreadNewsletters(maxResults = 10): Promise<GmailMessage[]> {
  const gmail = getGmailClient();
  const senderQuery = NEWSLETTER_SENDERS.map(s => `from:${s}`).join(" OR ");
  const query = `(${senderQuery}) is:unread`;

  const listResponse = await gmail.users.messages.list({
    userId: "me",
    q: query,
    maxResults,
  });

  // Fetch full message details for each...
}
```

### 3.3 OAuth2 Authorization Script

```bash
# Get refresh token (run once)
npx tsx scripts/gmail-authorize.ts
```

---

## 4. Email Parser

### 4.1 beehiiv Format

```typescript
// lib/newsletter/email-parser.ts

function parseBeehiivFormat(html: string): ParsedNewsItem[] | null {
  const items: ParsedNewsItem[] = [];

  // Pattern: Table cells with title links
  const newsBlockPattern =
    /<td[^>]*>[\s\S]*?<a[^>]*href="(https?:\/\/link\.mail\.beehiiv\.com[^"]*)"[^>]*>([^<]+)<\/a>/gi;

  let match;
  while ((match = newsBlockPattern.exec(html)) !== null) {
    const [fullMatch, link, title] = match;
    const summary = extractSurroundingText(html, match.index, 500);
    const thumbnail = extractNearbyImage(html, match.index, 1000);

    items.push({ title: cleanHtmlText(title), summary, link, thumbnail });
  }

  return items.length > 0 ? items : null;
}
```

### 4.2 URL Hash Generation

```typescript
import { createHash } from "crypto";

export function generateUrlHash(url: string): string {
  const normalized = url
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .replace(/\?.*$/, "");

  return createHash("sha256").update(normalized).digest("hex");
}
```

### 4.3 Resolve Redirect Links

```typescript
export async function resolveRedirectLink(beehiivUrl: string): Promise<string> {
  const response = await fetch(beehiivUrl, {
    method: "HEAD",
    redirect: "follow",
  });
  return response.url;
}
```

---

## 5. Perplexity Integration

### 5.1 API Call

```typescript
// lib/newsletter/perplexity.ts

const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";
const MODEL = "llama-3.1-sonar-small-128k-online";

async function callPerplexity(prompt: string): Promise<string> {
  const response = await fetch(PERPLEXITY_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: "You are a translator and AI news analyst..." },
        { role: "user", content: prompt },
      ],
      temperature: 0.1,
      max_tokens: 1000,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
```

### 5.2 Combined Translation + Categorization

```typescript
export async function translateAndCategorize(
  title: string,
  summary: string
): Promise<{ title_vi: string; summary_vi: string; category_slug: string }> {
  const prompt = `
Translate this AI news to Vietnamese and categorize it.
Keep technical terms and company names in English.

Title: ${title}
Summary: ${summary}

Categories: ai-models, ai-tools, ai-research, ai-business,
            ai-regulation, ai-tutorials, ai-funding, general

Response format (JSON only):
{"title_vi": "...", "summary_vi": "...", "category_slug": "..."}
`;

  const response = await callPerplexity(prompt);
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch[0]);
}
```

---

## 6. Data Access Layer

### 6.1 Query Newsletter News

```typescript
// lib/newsletter/data.ts

export async function getNewsletterNews(
  params: NewsletterListParams = {}
): Promise<NewsletterListResponse> {
  const supabase = createServerClient();
  const { limit = 20, offset = 0, category, source, featured } = params;

  let query = supabase
    .from("newsletter_news")
    .select(`*, source:newsletter_sources(*), category:newsletter_categories(*)`, { count: "exact" })
    .eq("status", "published");

  if (category) {
    const cat = await getCategoryBySlug(category);
    if (cat) query = query.eq("category_id", cat.id);
  }

  if (source) {
    const src = await getSourceBySlug(source);
    if (src) query = query.eq("source_id", src.id);
  }

  if (featured !== undefined) {
    query = query.eq("is_featured", featured);
  }

  query = query.order("published_at", { ascending: false }).range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  return {
    data: data as NewsletterNewsWithRelations[],
    pagination: { total: count || 0, limit, offset, hasMore: offset + limit < (count || 0) },
  };
}
```

### 6.2 Create Newsletter News

```typescript
export async function createNewsletterNews(input: CreateNewsletterNewsInput): Promise<NewsletterNews | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("newsletter_news")
    .insert({ ...input, status: "published" })
    .select()
    .single();

  if (error?.code === "23505") {
    // Duplicate - silent fail
    return null;
  }

  return data;
}
```

---

## 7. API Routes

### 7.1 Sync Endpoint

```typescript
// app/api/newsletter/sync/route.ts

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  // 1. Verify cron secret
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Fetch emails from Gmail
  const emails = await fetchUnreadNewsletters(10);

  // 3. Process each email
  for (const email of emails) {
    const parsedItems = parseNewsletterEmail(email.htmlBody);
    const processedItems = await processNewsItems(parsedItems);
    await batchCreateNewsletterNews(processedItems, emailMetadata);
    await markAsProcessed(email.id);
  }

  // 4. Revalidate pages
  revalidatePath("/");
  revalidatePath("/newsletter");

  return NextResponse.json({ success: true, created: totalCreated });
}
```

### 7.2 List Endpoint

```typescript
// app/api/newsletter/route.ts

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const params = {
    limit: parseInt(searchParams.get("limit") || "20"),
    offset: parseInt(searchParams.get("offset") || "0"),
    category: searchParams.get("category") || undefined,
    source: searchParams.get("source") || undefined,
  };

  const result = await getNewsletterNews(params);
  return NextResponse.json(result);
}
```

---

## 8. Frontend Components

### 8.1 NewsletterCard

```tsx
// components/newsletter/NewsletterCard.tsx

export function NewsletterCard({ news }: NewsletterCardProps) {
  return (
    <Link href={news.original_url} target="_blank" rel="noopener noreferrer">
      <article className="...">
        {news.thumbnail_url && <Image src={news.thumbnail_url} ... />}

        <div className="flex gap-2">
          {news.category && (
            <span className={getNewsletterCategoryColor(news.category.slug)}>
              {news.category.name_vi}
            </span>
          )}
          {news.source && <span>{news.source.name}</span>}
        </div>

        <h3>{news.title_vi}</h3>
        <p>{truncateText(news.summary_vi, 120)}</p>

        <div className="flex justify-between">
          <span>{formatRelativeTime(news.published_at)}</span>
          <span>Đọc thêm →</span>
        </div>
      </article>
    </Link>
  );
}
```

### 8.2 Homepage Section

```tsx
// components/newsletter/NewsletterNewsSection.tsx

export async function NewsletterNewsSection() {
  const news = await getLatestNewsletterNews(5);

  if (news.length === 0) return null;

  const [featured, ...rest] = news;

  return (
    <section className="py-12">
      <div className="flex justify-between mb-8">
        <h2>Tin tức AI mới nhất</h2>
        <Link href="/newsletter">Xem tất cả →</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NewsletterCardFeatured news={featured} />
        <div className="grid grid-cols-2 gap-4">
          {rest.map(item => <NewsletterCard key={item.id} news={item} />)}
        </div>
      </div>
    </section>
  );
}
```

---

## 9. Environment Variables

```env
# Gmail OAuth2
GMAIL_CLIENT_ID=xxx.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=xxx
GMAIL_REFRESH_TOKEN=xxx

# Perplexity API
PERPLEXITY_API_KEY=pplx-xxx

# Cron Authentication
CRON_SECRET=xxx
```

---

## 10. Vercel Cron Config

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/newsletter/sync",
      "schedule": "*/10 * * * *"
    }
  ]
}
```

---

## 11. Database Migration

Run in Supabase SQL Editor:

```sql
-- See: supabase/migrations/002_newsletter_news.sql

-- 4 tables created:
-- 1. newsletter_sources (6 sources seeded)
-- 2. newsletter_categories (8 categories seeded)
-- 3. newsletter_news (main news table)
-- 4. newsletter_processing_queue (tracking table)

-- RLS policies for public read, admin write
-- Triggers for updated_at
```

---

## 12. Setup Steps

1. **Database**: Run migration `002_newsletter_news.sql` in Supabase
2. **Gmail OAuth2**:
   - Create OAuth2 credentials in Google Cloud Console
   - Enable Gmail API
   - Run: `npx tsx scripts/gmail-authorize.ts`
   - Copy refresh token to `.env`
3. **Gmail Filter**: Create label `AI-Newsletters` and filter for newsletter senders
4. **Environment**: Add all env variables to Vercel
5. **Deploy**: Push to Vercel, cron will auto-start

---

## 13. Testing

```bash
# Test Gmail connection
curl http://localhost:3000/api/newsletter/sync

# Manual sync trigger
curl -X POST http://localhost:3000/api/newsletter/sync \
  -H "x-cron-secret: your-secret"

# List news
curl http://localhost:3000/api/newsletter?limit=10

# List categories
curl http://localhost:3000/api/newsletter/categories
```
