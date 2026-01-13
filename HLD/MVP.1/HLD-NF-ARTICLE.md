# HLD - Quản lý Bài viết (Phiên bản v3.0 với Google Sheets)

> **Phiên bản**: 3.0 - Google Sheets Database
> **Cập nhật**: 13/01/2026
> **Thay đổi chính**: Sử dụng Google Sheets thay Airtable (unlimited free)

---

## 1. Bối cảnh

### 1.1 Bối cảnh Kinh doanh

Quản lý bài viết tin tức AI trên KynguyenAI.vn. Đây là module cốt lõi, lưu trữ và cung cấp nội dung đã được xử lý AI cho người dùng.

**Chức năng chính:**
- Lưu trữ bài viết đã được tóm tắt và Việt hóa
- Phân loại bài viết theo 4 danh mục: AI Tools, AI News, AI Tutorial, AI Vietnam
- Quản lý tags và metadata
- Cung cấp API cho frontend hiển thị Bento Grid
- **Deduplication** - Ngăn chặn bài trùng lặp

### 1.2 So sánh: Airtable vs Google Sheets

| Tiêu chí | Airtable (v2.0) | Google Sheets (v3.0) |
|----------|-----------------|----------------------|
| **Free records** | 1000 | **Unlimited** |
| **API** | REST, dễ dùng | Google Sheets API |
| **UI quản lý** | Xuất sắc | Tốt (quen thuộc) |
| **Make.com** | Native | **Native** |
| **Chi phí scale** | $20/mo | **$0** |

### 1.3 Kiến trúc v3.0

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ARTICLE MANAGEMENT - v3.0                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    Next.js 16 App (Vercel)                   │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │   │
│   │  │  Frontend   │  │ API Routes  │  │ Revalidate  │          │   │
│   │  │  (React 19) │  │ /api/*      │  │ Webhook     │          │   │
│   │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │   │
│   │         │                │                │                  │   │
│   │         └────────────────┼────────────────┘                  │   │
│   │                          │                                    │   │
│   └──────────────────────────┼────────────────────────────────────┘   │
│                              │                                        │
│                              ▼                                        │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    GOOGLE SHEETS                              │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │   │
│   │  │  Articles   │  │  GitHub     │  │  AI_Logs    │          │   │
│   │  │   Sheet     │  │  Trending   │  │   Sheet     │          │   │
│   │  └─────────────┘  └─────────────┘  └─────────────┘          │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              ▲                                        │
│                              │                                        │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    MAKE.COM                                   │   │
│   │  • Watch Gmail → Parse → AI Process → Save to Sheets        │   │
│   │  • Trigger Vercel Revalidation                               │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.4 Phạm vi

**Trong phạm vi:**
- CRUD operations cho Articles qua Google Sheets API
- Phân loại bài viết theo category
- Deduplication với hash-based strategy
- API Routes cho frontend
- On-demand revalidation từ Make.com

**Ngoài phạm vi:**
- Xử lý AI (tích hợp trong Make.com - xem HLD-CF-AI-PROCESSING.md)
- Authentication (không cần cho MVP)

---

## 2. Data Model (Google Sheets)

### 2.1 Sheet: Articles

| Column | Type | Mô tả | Required |
|--------|------|-------|----------|
| `id` | String | Auto-generated (UUID) | Yes |
| `url_hash` | String | MD5 của normalized URL (dedup) | Yes |
| `title_hash` | String | MD5 của normalized title (dedup) | Yes |
| `title_en` | String | Tiêu đề gốc (English) | Yes |
| `title_vi` | String | Tiêu đề tiếng Việt | Yes |
| `summary_vi` | String | Tóm tắt tiếng Việt (2-3 câu) | Yes |
| `original_url` | URL | Link bài gốc | Yes |
| `thumbnail` | URL | Ảnh thumbnail | No |
| `category` | String | `ai-tools` / `ai-news` / `ai-tutorial` / `ai-vietnam` | Yes |
| `tags` | String | Comma-separated tags | No |
| `source` | String | Tên nguồn (AlphaSignal, TLDR AI...) | Yes |
| `published_at` | Date | Ngày publish gốc | Yes |
| `tile_size` | String | `hero` / `tall` / `standard` / `wide` | Yes |
| `is_featured` | Boolean | TRUE/FALSE | No |
| `status` | String | `draft` / `published` / `archived` | Yes |
| `ai_provider` | String | perplexity / openai | No |
| `created_at` | Date | Thời gian tạo | Auto |

### 2.2 Sheet: GitHub_Trending (Optional)

| Column | Type | Mô tả |
|--------|------|-------|
| `repo_name` | String | owner/repo |
| `url` | URL | GitHub URL |
| `description_vi` | String | Mô tả tiếng Việt |
| `stars` | Number | Số stars |
| `language` | String | Python / JavaScript |
| `trending_date` | Date | Ngày trending |

### 2.3 Sheet: AI_Logs

| Column | Type | Mô tả |
|--------|------|-------|
| `timestamp` | DateTime | Thời gian xử lý |
| `article_title` | String | Title bài viết |
| `provider` | String | perplexity / openai |
| `tokens_used` | Number | Số tokens |
| `status` | String | success / error |
| `error_message` | String | Lỗi nếu có |

### 2.4 Category Options

| Category | Mô tả | Tile mặc định |
|----------|-------|---------------|
| **ai-tools** | Công cụ AI mới | standard |
| **ai-news** | Tin tức AI | standard |
| **ai-tutorial** | Hướng dẫn sử dụng AI | standard |
| **ai-vietnam** | AI tại Việt Nam | standard |

### 2.5 Tags Options

```
LLM, GPT, Transformer, Fine-tuning, RAG,
Prompt Engineering, ChatGPT, Claude, Gemini,
Machine Learning, Deep Learning, Computer Vision,
NLP, Image Generation, Code Assistant
```

---

## 3. Deduplication Strategy

### 3.1 Multi-layer Deduplication

```
┌─────────────────────────────────────────────────────────────┐
│                    DEDUPLICATION STRATEGY                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Layer 1: URL Normalization                                │
│   └── Loại bỏ tracking params (?utm_*, ?ref=, etc.)        │
│   └── Chuẩn hóa: lowercase, remove trailing slash          │
│   └── Hash: MD5(normalized_url)                            │
│                                                              │
│   Layer 2: Title Similarity                                 │
│   └── Normalize title: lowercase, remove punctuation       │
│   └── Hash: MD5(normalized_title)                          │
│   └── Check against existing hashes                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 URL Normalization Logic

```javascript
// Trong Make.com hoặc Next.js
function normalizeUrl(url) {
  const urlObj = new URL(url);
  // Remove tracking params
  const trackingParams = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'ref', 'source', 'fbclid', 'gclid', 'mc_cid', 'mc_eid'
  ];
  trackingParams.forEach(p => urlObj.searchParams.delete(p));
  // Normalize
  return urlObj.origin + urlObj.pathname.toLowerCase().replace(/\/$/, '');
}

function generateHash(text) {
  // MD5 hash
  return crypto.createHash('md5').update(text).digest('hex');
}
```

### 3.3 Dedup Check trong Make.com

```
Module: Google Sheets - Search Rows

Search column: url_hash
Search value: {{calculated_url_hash}}

If found → Skip (Router to end)
If not found → Continue processing
```

---

## 4. Article Lifecycle (Đơn giản)

### 4.1 State Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    ARTICLE LIFECYCLE                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────┐         ┌─────────────┐         ┌──────────┐  │
│   │  DRAFT  │────────►│  PUBLISHED  │────────►│ ARCHIVED │  │
│   └─────────┘         └─────────────┘         └──────────┘  │
│        │                     │                               │
│        │    Auto publish     │    After 30 days              │
│        │    by Make.com      │    or manual                  │
│        │                     │                               │
│        └─────────────────────┘                               │
│           (có thể bỏ qua draft)                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 State Transitions

| From | To | Trigger | Mô tả |
|------|-----|---------|-------|
| - | `draft` | AI processing fail | Cần review manual |
| - | `published` | Make.com automation | Tự động (bỏ qua draft) |
| `draft` | `published` | Admin action | Admin duyệt bài |
| `published` | `archived` | Manual/Auto | Sau 30 ngày hoặc admin archive |
| `published` | `draft` | Admin action | Unpublish bài |

---

## 5. API Design

### 5.1 API Endpoints (Next.js 16 API Routes)

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/articles` | Lấy danh sách bài viết | Public |
| GET | `/api/articles/[id]` | Lấy chi tiết bài viết | Public |
| GET | `/api/articles/featured` | Lấy bài nổi bật | Public |
| GET | `/api/articles/category/[slug]` | Lấy theo category | Public |
| POST | `/api/revalidate` | Trigger ISR revalidation | Secret |

### 5.2 GET /api/articles

**Query Parameters:**

| Param | Type | Default | Mô tả |
|-------|------|---------|-------|
| `limit` | number | 20 | Số bài trả về |
| `offset` | number | 0 | Offset cho pagination |
| `category` | string | - | Filter theo category |
| `featured` | boolean | - | Chỉ lấy bài featured |

**Response:**

```typescript
// GET /api/articles?limit=10&category=ai-tools

{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title_vi": "Claude 3.5 Sonnet - Mô hình AI mới từ Anthropic",
      "title_en": "Claude 3.5 Sonnet Released",
      "summary_vi": "Anthropic vừa ra mắt Claude 3.5 Sonnet với khả năng xử lý code vượt trội...",
      "original_url": "https://...",
      "thumbnail": "https://...",
      "category": "ai-tools",
      "tags": ["LLM", "Claude", "Anthropic"],
      "source": "AlphaSignal",
      "published_at": "2026-01-15",
      "tile_size": "hero",
      "is_featured": true
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## 6. Google Sheets API Implementation

### 6.1 Setup Google Service Account

1. Tạo project trong Google Cloud Console
2. Enable Google Sheets API
3. Tạo Service Account
4. Download JSON key
5. Share Google Sheet với service account email

### 6.2 Base Client

```typescript
// lib/sheets.ts
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID!;
const ARTICLES_SHEET = 'Articles';

// Types
export interface Article {
  id: string;
  url_hash: string;
  title_hash: string;
  title_en: string;
  title_vi: string;
  summary_vi: string;
  original_url: string;
  thumbnail?: string;
  category: 'ai-tools' | 'ai-news' | 'ai-tutorial' | 'ai-vietnam';
  tags: string[];
  source: string;
  published_at: string;
  tile_size: 'hero' | 'tall' | 'standard' | 'wide';
  is_featured: boolean;
  status: 'draft' | 'published' | 'archived';
  ai_provider?: string;
  created_at: string;
}
```

### 6.3 Query Functions

```typescript
// lib/sheets.ts (continued)

interface QueryOptions {
  limit?: number;
  offset?: number;
  category?: string | null;
  featured?: boolean;
}

export async function getPublishedArticles(options: QueryOptions = {}) {
  const { limit = 20, offset = 0, category, featured } = options;

  // Fetch all data from Articles sheet
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${ARTICLES_SHEET}!A:R`, // All columns
  });

  const rows = response.data.values || [];
  if (rows.length <= 1) return { records: [], total: 0 }; // Only header

  const headers = rows[0];
  const data = rows.slice(1);

  // Parse rows to objects
  let articles = data.map(row => {
    const article: Record<string, any> = {};
    headers.forEach((header, index) => {
      article[header] = row[index] || '';
    });
    // Parse tags from comma-separated string
    article.tags = article.tags ? article.tags.split(',').map((t: string) => t.trim()) : [];
    article.is_featured = article.is_featured === 'TRUE';
    return article as Article;
  });

  // Filter by status = published
  articles = articles.filter(a => a.status === 'published');

  // Filter by category
  if (category) {
    articles = articles.filter(a => a.category === category);
  }

  // Filter by featured
  if (featured) {
    articles = articles.filter(a => a.is_featured);
  }

  // Sort by published_at DESC
  articles.sort((a, b) =>
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  // Pagination
  const total = articles.length;
  const paginated = articles.slice(offset, offset + limit);

  return {
    records: paginated,
    total,
  };
}

export async function getArticleById(id: string): Promise<Article | null> {
  const { records } = await getPublishedArticles({ limit: 1000 });
  return records.find(a => a.id === id) || null;
}

export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  const { records } = await getPublishedArticles({ featured: true, limit });
  return records;
}

export async function checkDuplicate(urlHash: string): Promise<boolean> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${ARTICLES_SHEET}!B:B`, // url_hash column
  });

  const hashes = response.data.values?.flat() || [];
  return hashes.includes(urlHash);
}
```

### 6.4 API Route Implementation

```typescript
// app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPublishedArticles } from '@/lib/sheets';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';

    const { records, total } = await getPublishedArticles({
      limit,
      offset,
      category,
      featured,
    });

    return NextResponse.json({
      data: records,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
```

---

## 7. On-demand Revalidation

### 7.1 Revalidate API Route

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { secret, path, tag } = await request.json();

    // Verify secret
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Revalidate by path or tag
    if (path) {
      revalidatePath(path);
    }
    if (tag) {
      revalidateTag(tag);
    }

    // Default: revalidate homepage
    if (!path && !tag) {
      revalidatePath('/');
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}
```

### 7.2 Make.com Webhook Configuration

```
Module: HTTP - Make a request

URL: https://kynguyenai.vn/api/revalidate
Method: POST
Headers: Content-Type: application/json
Body: {
  "secret": "{{REVALIDATE_SECRET}}",
  "path": "/"
}
```

---

## 8. Frontend Integration

### 8.1 Fetch Articles in Server Component

```typescript
// app/page.tsx
import { getPublishedArticles, getFeaturedArticles } from '@/lib/sheets';
import { BentoGrid } from '@/components/bento/BentoGrid';

export const revalidate = 300; // ISR: 5 minutes

export default async function HomePage() {
  const [featured, latest] = await Promise.all([
    getFeaturedArticles(1),
    getPublishedArticles({ limit: 12 }),
  ]);

  return (
    <main>
      <BentoGrid
        heroArticle={featured[0]}
        articles={latest.records}
      />
    </main>
  );
}
```

### 8.2 Category Page

```typescript
// app/category/[slug]/page.tsx
import { getPublishedArticles } from '@/lib/sheets';
import { ArticleList } from '@/components/ArticleList';

export const revalidate = 300;

interface Props {
  params: { slug: string };
}

const categoryNames: Record<string, string> = {
  'ai-tools': 'AI Tools',
  'ai-news': 'AI News',
  'ai-tutorial': 'AI Tutorial',
  'ai-vietnam': 'AI Vietnam',
};

export default async function CategoryPage({ params }: Props) {
  const { records } = await getPublishedArticles({
    category: params.slug,
    limit: 20,
  });

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8">
        {categoryNames[params.slug] || params.slug}
      </h1>
      <ArticleList articles={records} />
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(categoryNames).map(slug => ({ slug }));
}
```

---

## 9. Caching Strategy

### 9.1 ISR (Incremental Static Regeneration)

| Page | Revalidate | Mô tả |
|------|------------|-------|
| Home `/` | 300s (5 min) | Cập nhật thường xuyên |
| Category `/category/*` | 300s (5 min) | Cập nhật thường xuyên |
| Article `/article/*` | 3600s (1 hour) | Ít thay đổi |

### 9.2 On-demand Revalidation Flow

```
Make.com adds new article to Sheets
        │
        ▼
Make.com calls /api/revalidate webhook
        │
        ▼
Next.js invalidates cached pages
        │
        ▼
Next request rebuilds page with new data
```

---

## 10. Error Handling

### 10.1 Error Types

| Error | HTTP | Mô tả |
|-------|------|-------|
| `ARTICLE_NOT_FOUND` | 404 | Bài viết không tồn tại |
| `INVALID_CATEGORY` | 400 | Category không hợp lệ |
| `SHEETS_ERROR` | 500 | Lỗi kết nối Google Sheets |
| `RATE_LIMIT` | 429 | Vượt quá rate limit |

### 10.2 Error Response Format

```typescript
interface ErrorResponse {
  error: string;
  code: string;
  message: string;
}

// Example
{
  "error": "Not Found",
  "code": "ARTICLE_NOT_FOUND",
  "message": "Article with id xxx not found"
}
```

---

## 11. Environment Variables

```bash
# Google Sheets
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
GOOGLE_SPREADSHEET_ID=1ABC...xyz

# Revalidation
REVALIDATE_SECRET=your_secret_key
```

---

## 12. Google Sheets Limits & Optimization

### 12.1 API Limits

| Limit | Value | Giải pháp |
|-------|-------|-----------|
| Read requests | 300/min | ISR caching (5 min) |
| Write requests | 300/min | Batch writes từ Make.com |
| Cells per sheet | 10 million | Đủ cho years of data |
| API quota | 500 requests/100s/user | Phân tán requests |

### 12.2 Performance Optimization

```typescript
// Tối ưu: Cache data trong memory (optional)
import { unstable_cache } from 'next/cache';

export const getCachedArticles = unstable_cache(
  async (options: QueryOptions) => getPublishedArticles(options),
  ['articles'],
  { revalidate: 300 } // 5 minutes
);
```

---

## 13. Migration Path

### 13.1 Từ Airtable sang Google Sheets

```
Airtable Base
     │
     ▼ Export CSV
CSV File
     │
     ▼ Import vào Google Sheets
Google Sheets
     │
     ▼ Update lib/airtable.ts → lib/sheets.ts
Next.js App
```

### 13.2 Từ Google Sheets sang Supabase (Future)

Khi cần:
- Real-time updates
- Complex queries
- Better performance

```
Google Sheets
     │
     ▼ Export CSV
CSV File
     │
     ▼ Import vào Supabase
Supabase (PostgreSQL)
     │
     ▼ Update lib/sheets.ts → lib/supabase.ts
Next.js App
```

---

## 14. Xem thêm

- [Design/Tech-Stack.md](../../Design/Tech-Stack.md) - Stack v3.0
- [HLD-CF-AI-PROCESSING.md](./HLD-CF-AI-PROCESSING.md) - AI Processing
- [HLD-DF-DATA-PIPELINE.md](./HLD-DF-DATA-PIPELINE.md) - Make.com flow
- Google Sheets API: https://developers.google.com/sheets/api
- Next.js ISR: https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
