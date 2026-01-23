# HLD-NF-NEWSLETTER-TRACKING - Thu thập tin tức từ Newsletter

> **Phiên bản**: 1.0
> **Cập nhật**: 23/01/2026
> **Trạng thái**: IMPLEMENTED

---

## 1. Tổng quan

Tính năng tự động thu thập tin tức AI từ các newsletter (beehiiv, substack), dịch sang tiếng Việt bằng Perplexity API, phân loại tự động, và hiển thị trên website.

### 1.1 Mục tiêu

- Thu thập tin tức AI từ newsletter emails tự động
- Dịch title và summary sang tiếng Việt
- Phân loại tin tức theo category
- Loại bỏ tin trùng lặp (deduplication)
- Hiển thị tin tức trên homepage và trang /newsletter

### 1.2 Nguồn Newsletter hỗ trợ

| Source | Email Pattern | Website |
|--------|--------------|---------|
| The Rundown AI | *@therundown.ai | therundown.ai |
| TLDR AI | *@tldr.tech | tldr.tech/ai |
| AlphaSignal | *@alphasignal.ai | alphasignal.ai |
| AI Breakfast | *@aibreakfast.beehiiv.com | aibreakfast.beehiiv.com |
| Import AI | *@importai.substack.com | importai.substack.com |
| Ben's Bites | *@bensbites.beehiiv.com | bensbites.beehiiv.com |

---

## 2. Kiến trúc

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    NEWSLETTER TRACKING ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────────┐                                                        │
│   │   Gmail     │  Newsletter emails arrive                              │
│   │   Inbox     │                                                        │
│   └──────┬──────┘                                                        │
│          │ Gmail API (OAuth2)                                            │
│          ▼                                                               │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │             Vercel Cron (every 10 minutes)                       │   │
│   │                  POST /api/newsletter/sync                       │   │
│   └───────────────────────────┬─────────────────────────────────────┘   │
│                               │                                          │
│          ┌────────────────────┼────────────────────┐                    │
│          ▼                    ▼                    ▼                    │
│   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐            │
│   │   Email     │      │ Perplexity  │      │  Supabase   │            │
│   │   Parser    │  →   │    API      │  →   │  Database   │            │
│   │  (beehiiv)  │      │ (Translate) │      │   (Store)   │            │
│   └─────────────┘      └─────────────┘      └─────────────┘            │
│                                                                          │
│          Extract:              Process:              Save:              │
│          - Title               - Dịch tiếng Việt     - newsletter_news  │
│          - Summary             - Phân loại           - processing_queue │
│          - Link                - Generate hash                          │
│          - Thumbnail                                                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema

### 3.1 Bảng `newsletter_sources`

Quản lý các nguồn newsletter.

```sql
CREATE TABLE newsletter_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    name_vi VARCHAR(200),
    email_pattern VARCHAR(500),  -- SQL LIKE pattern
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.2 Bảng `newsletter_categories`

Danh mục phân loại tin tức.

```sql
CREATE TABLE newsletter_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_vi VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Categories được seed:**

| Slug | Name | Name_vi |
|------|------|---------|
| ai-models | AI Models | Mô hình AI |
| ai-tools | AI Tools | Công cụ AI |
| ai-research | AI Research | Nghiên cứu AI |
| ai-business | AI Business | AI Doanh nghiệp |
| ai-regulation | AI Regulation | Quy định AI |
| ai-tutorials | AI Tutorials | Hướng dẫn AI |
| ai-funding | AI Funding | Đầu tư AI |
| general | General | Tổng hợp |

### 3.3 Bảng `newsletter_news`

Lưu trữ tin tức đã xử lý.

```sql
CREATE TABLE newsletter_news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Deduplication
    url_hash VARCHAR(64) UNIQUE NOT NULL,  -- SHA256 of original_url

    -- Original content (English)
    original_title VARCHAR(500) NOT NULL,
    original_summary TEXT,
    original_url VARCHAR(1000) NOT NULL,

    -- Translated content (Vietnamese)
    title_vi VARCHAR(500) NOT NULL,
    summary_vi TEXT NOT NULL,

    -- Media
    thumbnail_url VARCHAR(1000),

    -- Relationships
    source_id UUID REFERENCES newsletter_sources(id),
    category_id UUID REFERENCES newsletter_categories(id),

    -- Email metadata
    email_subject VARCHAR(500),
    email_received_at TIMESTAMPTZ,
    email_id VARCHAR(200),

    -- Status
    is_featured BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'published',

    -- AI Processing
    perplexity_model VARCHAR(100),
    auto_categorized BOOLEAN DEFAULT true,

    -- Timestamps
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.4 Bảng `newsletter_processing_queue`

Theo dõi trạng thái xử lý email.

```sql
CREATE TABLE newsletter_processing_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email_id VARCHAR(200) UNIQUE NOT NULL,
    email_subject VARCHAR(500),
    email_from VARCHAR(500),
    email_received_at TIMESTAMPTZ,
    status VARCHAR(20) DEFAULT 'pending',
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    error_message TEXT,
    items_count INTEGER DEFAULT 0,
    items_processed INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);
```

---

## 4. Gmail API Integration

### 4.1 OAuth2 Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Google    │     │   Script    │     │    .env     │
│   Cloud     │ ──▶ │  Authorize  │ ──▶ │   Store     │
│   Console   │     │             │     │   Token     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                                        │
      │  1. Create OAuth2 credentials          │
      │  2. Enable Gmail API                   │
      │                                        │
      ▼                                        ▼
┌─────────────────────────────────────────────────────┐
│              Gmail API Client                        │
│  - fetchUnreadNewsletters()                         │
│  - markAsProcessed()                                │
│  - addLabel()                                       │
└─────────────────────────────────────────────────────┘
```

### 4.2 Environment Variables

```env
GMAIL_CLIENT_ID=xxx.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=xxx
GMAIL_REFRESH_TOKEN=xxx  # Never expires unless revoked
```

### 4.3 Query Filter

```typescript
// Fetch unread newsletters from specific senders
q: 'from:(*@beehiiv.com OR *@substack.com OR *@therundown.ai) is:unread'
```

---

## 5. Email Parser

### 5.1 Supported Formats

| Format | Pattern | Structure |
|--------|---------|-----------|
| beehiiv | link.mail.beehiiv.com/ss/c/... | Table-based with redirect links |
| Substack | *.substack.com | Article-based with direct links |
| Generic | - | Heading + link patterns |

### 5.2 Parsing Strategy

```typescript
function parseNewsletterEmail(html: string): ParsedNewsItem[] {
  // Try parsers in order of specificity
  return parseBeehiivFormat(html) ||
         parseSubstackFormat(html) ||
         parseGenericFormat(html);
}
```

### 5.3 beehiiv Link Resolution

beehiiv uses tracking links that need to be resolved:

```
Input:  https://link.mail.beehiiv.com/ss/c/u001.xxx/...
Output: https://actual-article-url.com/article
```

```typescript
async function resolveRedirectLink(beehiivUrl: string): Promise<string> {
  const response = await fetch(beehiivUrl, { method: 'HEAD', redirect: 'follow' });
  return response.url;  // Final URL after redirects
}
```

---

## 6. Perplexity API Integration

### 6.1 Translation + Categorization

Một API call xử lý cả dịch và phân loại:

```typescript
const prompt = `
Translate this AI news to Vietnamese and categorize it.
Keep technical terms and company names in English.

Title: ${title}
Summary: ${summary}

Categories: ai-models, ai-tools, ai-research, ai-business,
            ai-regulation, ai-tutorials, ai-funding, general

Response format (JSON only):
{
  "title_vi": "...",
  "summary_vi": "...",
  "category_slug": "..."
}
`;
```

### 6.2 Model & Settings

```typescript
{
  model: "llama-3.1-sonar-small-128k-online",
  temperature: 0.1,  // Low for consistent translations
  max_tokens: 1000
}
```

### 6.3 Rate Limiting

- Delay 500-1000ms between API calls
- Max 10 items per sync run
- Retry logic with exponential backoff

---

## 7. API Routes

### 7.1 POST /api/newsletter/sync

Cron endpoint để sync newsletter emails.

```typescript
// Called by Vercel Cron every 10 minutes
// Headers: x-cron-secret or Authorization: Bearer {secret}

Response:
{
  success: true,
  message: "Processed 2 email(s)",
  processed: 2,
  created: 8,
  skipped: 2,  // Duplicates
  duration: 15420  // ms
}
```

### 7.2 GET /api/newsletter

List newsletter news với filtering.

```typescript
// Query params:
// - limit: number (default 20)
// - offset: number (default 0)
// - category: string (category slug)
// - source: string (source slug)
// - featured: boolean

Response:
{
  data: NewsletterNewsWithRelations[],
  pagination: { total, limit, offset, hasMore }
}
```

### 7.3 GET /api/newsletter/categories

List tất cả categories active.

### 7.4 GET /api/newsletter/sources

List tất cả sources active.

---

## 8. Frontend Components

### 8.1 Component Hierarchy

```
components/newsletter/
├── NewsletterCard.tsx
│   ├── NewsletterCard (standard card)
│   ├── NewsletterCardCompact (compact card)
│   └── NewsletterCardFeatured (hero card)
├── NewsletterNewsSection.tsx (homepage section)
└── index.ts
```

### 8.2 Pages

```
app/newsletter/
└── page.tsx  # Main listing with filters
```

### 8.3 Homepage Integration

```tsx
// app/page.tsx
<Suspense fallback={<NewsletterNewsSkeleton />}>
  <NewsletterNewsSection />
</Suspense>
```

---

## 9. Cron Configuration

### 9.1 Vercel Cron

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/newsletter/sync",
      "schedule": "*/10 * * * *"  // Every 10 minutes
    }
  ]
}
```

### 9.2 Authentication

Cron requests must include secret:

```typescript
// Vercel automatically adds header for cron jobs
// Manual testing: x-cron-secret: {CRON_SECRET}
```

---

## 10. Deduplication Strategy

### 10.1 URL Hash

```typescript
function generateUrlHash(url: string): string {
  const normalized = url
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .replace(/\?.*$/, '');  // Remove query params

  return crypto.createHash('sha256').update(normalized).digest('hex');
}
```

### 10.2 Database Constraint

```sql
url_hash VARCHAR(64) UNIQUE NOT NULL
```

Duplicate inserts will fail silently (ON CONFLICT DO NOTHING behavior).

---

## 11. Error Handling

### 11.1 Processing Queue

Failed emails are tracked in `newsletter_processing_queue`:

```typescript
{
  status: 'failed',
  retry_count: 2,
  error_message: 'Perplexity API timeout',
  max_retries: 3
}
```

### 11.2 Fallback Translation

If Perplexity API fails:

```typescript
{
  title_vi: '[EN] Original English Title',
  summary_vi: '[EN] Original English Summary',
  category_slug: 'general'
}
```

---

## 12. Security Considerations

### 12.1 API Authentication

- Gmail: OAuth2 with refresh token
- Perplexity: API key in env
- Cron: Secret header validation

### 12.2 Row Level Security

```sql
-- Public can only see published news
CREATE POLICY "Public can view published news"
    ON newsletter_news FOR SELECT
    USING (status = 'published');

-- Service role can access all
CREATE POLICY "Service role full access"
    ON newsletter_news FOR ALL
    USING (auth.role() = 'service_role');
```

---

## 13. Monitoring & Logging

### 13.1 Sync Logs

Mỗi sync run trả về:

```json
{
  "processed": 2,
  "created": 5,
  "skipped": 3,
  "errors": ["Email X: Timeout"],
  "duration": 12500
}
```

### 13.2 Health Check

```typescript
GET /api/newsletter/sync

Response:
{
  status: "ready" | "not_configured",
  gmail: "configured" | "missing",
  perplexity: "configured" | "missing"
}
```

---

## 14. Files Reference

| File | Purpose |
|------|---------|
| `supabase/migrations/002_newsletter_news.sql` | Database schema |
| `lib/newsletter/gmail.ts` | Gmail API client |
| `lib/newsletter/email-parser.ts` | Parse HTML emails |
| `lib/newsletter/perplexity.ts` | Translation & categorization |
| `lib/newsletter/data.ts` | Supabase queries |
| `app/api/newsletter/sync/route.ts` | Cron endpoint |
| `app/api/newsletter/route.ts` | List API |
| `app/newsletter/page.tsx` | Listing page |
| `components/newsletter/NewsletterCard.tsx` | Card components |
| `scripts/gmail-authorize.ts` | OAuth2 token script |

---

## 15. Xem thêm

- [HLD-CF-AI-PROCESSING.md](./HLD-CF-AI-PROCESSING.md) - Perplexity AI pattern
- [HLD-DF-DATA-PIPELINE.md](./HLD-DF-DATA-PIPELINE.md) - Data pipeline pattern
- [DD-Newsletter-Tracking.md](../../DD/DD-Newsletter-Tracking.md) - Detail design
