# Kiến trúc Component - KynguyenAI.vn (v3.0 - No-Code Automation)

> **Phiên bản**: 3.0
> **Cập nhật**: 13/01/2026
> **Thay đổi chính**: Make.com thay Vercel Cron, Google Sheets thay Airtable

---

## 1. Tổng quan Kiến trúc

### 1.1 Kiến trúc Tổng thể v3.0

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     KYNGUYENAI.VN - ARCHITECTURE v3.0                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                      MAKE.COM (Automation Hub)                           │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │   │
│   │  │Watch Gmail  │→ │Parse Email  │→ │Perplexity   │→ │Save to      │    │   │
│   │  │(Newsletters)│  │(Extract)    │  │API (Dịch)   │  │Google Sheets│    │   │
│   │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │   │
│   │                                                              │          │   │
│   │                                                              ▼          │   │
│   │                                                      Webhook to Vercel  │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                      GOOGLE SHEETS (Database)                            │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                      │   │
│   │  │  Articles   │  │  GitHub     │  │ Subscribers │                      │   │
│   │  │  Sheet      │  │  Trending   │  │  Sheet      │                      │   │
│   │  │ (Unlimited) │  │  (Optional) │  │ (Airtable)  │                      │   │
│   │  └─────────────┘  └─────────────┘  └─────────────┘                      │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                         │
│                                        ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                         VERCEL (Free Tier)                               │   │
│   │  ┌─────────────────────────────────────────────────────────────────┐    │   │
│   │  │                      Next.js 16 App                              │    │   │
│   │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │    │   │
│   │  │  │  Frontend   │  │ API Routes  │  │ Revalidate  │              │    │   │
│   │  │  │(BentoGrid)  │  │(/api/*)     │  │ Webhook     │              │    │   │
│   │  │  └─────────────┘  └─────────────┘  └─────────────┘              │    │   │
│   │  └─────────────────────────────────────────────────────────────────┘    │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 So sánh v2.0 vs v3.0

| Thành phần | v2.0 | v3.0 |
|------------|------|------|
| **Automation** | Vercel Cron (code) | **Make.com** (no-code) |
| **Database** | Airtable (1000 records) | **Google Sheets** (unlimited) |
| **AI** | Gemini Flash | **Perplexity Sonar** |
| **Nguồn tin** | NewsData.io API | **Email newsletters** |
| **Next.js** | 14/15 | **16** (React 19.2) |
| **Dedup** | URL check | **Hash-based** (url + title) |

### 1.3 Nguyên tắc Thiết kế

| Nguyên tắc | Mô tả | Áp dụng v3.0 |
|------------|-------|--------------|
| **No-Code First** | Không cần viết backend | Make.com automation |
| **Zero Cost** | $0/tháng | All free tiers |
| **No SQL Required** | Không cần biết SQL | Google Sheets (Excel-like) |
| **Easy to Scale** | Dễ nâng cấp sau | Sheets → Supabase |
| **FE Developer Friendly** | Phù hợp FE developer | TypeScript, React 19 |

---

## 2. Automation Layer (Make.com)

### 2.1 Make.com Workflow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         MAKE.COM SCENARIO                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐                 │
│   │   1. WATCH   │      │   2. PARSE   │      │   3. LOOP    │                 │
│   │    GMAIL     │ ──→  │    EMAIL     │ ──→  │  (Iterator)  │                 │
│   │  (Trigger)   │      │  (Extract)   │      │              │                 │
│   └──────────────┘      └──────────────┘      └──────┬───────┘                 │
│                                                       │                          │
│                                                       ▼                          │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐                 │
│   │   4. DEDUP   │      │   5. AI      │      │   6. SAVE    │                 │
│   │   CHECK      │ ──→  │  PERPLEXITY  │ ──→  │   SHEETS     │                 │
│   │ (Hash check) │      │ (Translate)  │      │              │                 │
│   └──────────────┘      └──────────────┘      └──────┬───────┘                 │
│                                                       │                          │
│                                                       ▼                          │
│                                                ┌──────────────┐                 │
│                                                │  7. WEBHOOK  │                 │
│                                                │   VERCEL     │                 │
│                                                │ (Revalidate) │                 │
│                                                └──────────────┘                 │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Module Chi tiết

| Step | Module | Configuration |
|------|--------|---------------|
| 1 | **Watch Gmail** | Filter: From contains "alphasignal" OR "tldr" |
| 2 | **Text Parser** | Extract: URLs, titles, descriptions from HTML |
| 3 | **Iterator** | Loop through extracted articles array |
| 4 | **Google Sheets - Search** | Find by url_hash to check duplicate |
| 5 | **HTTP - Perplexity** | POST to /chat/completions |
| 6 | **Google Sheets - Add Row** | Append article data |
| 7 | **HTTP - Webhook** | POST to /api/revalidate |

### 2.3 Deduplication Flow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         DEDUP FLOW IN MAKE.COM                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   Input URL: https://techcrunch.com/ai-news?utm_source=newsletter               │
│                                                                                  │
│   Step 1: Normalize URL                                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │  Remove: ?utm_source, ?utm_medium, ?ref, ?source                        │   │
│   │  Lowercase: techcrunch.com/ai-news                                      │   │
│   │  Remove trailing slash                                                  │   │
│   │  Output: https://techcrunch.com/ai-news                                 │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
│   Step 2: Generate Hash                                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │  url_hash = MD5(normalized_url)                                         │   │
│   │  title_hash = MD5(lowercase(title))                                     │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
│   Step 3: Search in Google Sheets                                               │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │  IF url_hash exists OR title_hash exists                                │   │
│   │     → SKIP (Router → Stop)                                              │   │
│   │  ELSE                                                                   │   │
│   │     → CONTINUE (→ Perplexity → Save)                                    │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Email Sources

| Newsletter | Email From | Frequency | Content |
|------------|------------|-----------|---------|
| **AlphaSignal** | newsletter@alphasignal.ai | Daily | AI research |
| **TLDR AI** | dan@tldrnewsletter.com | Daily | AI digest |
| **The Rundown AI** | team@therundown.ai | Daily | AI news |
| **Import AI** | jack@importai.net | Weekly | AI deep dives |
| **AI Breakfast** | hi@aibreakfast.beehiiv.com | Daily | AI summary |

---

## 3. Data Layer (Google Sheets)

### 3.1 Tại sao Google Sheets thay Airtable?

| Tiêu chí | Google Sheets | Airtable |
|----------|---------------|----------|
| **Free records** | **Unlimited** | 1,000 |
| **UI quen thuộc** | Excel-like (familiar) | Xuất sắc |
| **Make.com** | Native integration | Native integration |
| **API** | Google Sheets API | REST API |
| **Collaboration** | Google Workspace | Limited |

### 3.2 Schema: Sheet "Articles"

| Column | Name | Type | Mô tả |
|--------|------|------|-------|
| A | id | Text | UUID auto-generated |
| B | url_hash | Text | MD5 hash cho dedup |
| C | title_hash | Text | MD5 hash cho dedup |
| D | title_vi | Text | Tiêu đề tiếng Việt |
| E | summary_vi | Text | Tóm tắt tiếng Việt |
| F | original_url | URL | Link bài gốc |
| G | thumbnail | URL | Ảnh thumbnail |
| H | category | Text | AI Tools / AI News / AI Tutorial |
| I | source | Text | AlphaSignal / TLDR AI |
| J | published_at | Date | Ngày publish |
| K | tile_size | Text | hero / tall / standard |
| L | is_featured | Boolean | TRUE / FALSE |
| M | status | Text | draft / published |
| N | created_at | Date | Ngày tạo |

### 3.3 Schema: Sheet "GitHub_Trending" (Optional)

| Column | Name | Type | Mô tả |
|--------|------|------|-------|
| A | repo_name | Text | owner/repo |
| B | url | URL | GitHub URL |
| C | description_vi | Text | Mô tả tiếng Việt |
| D | stars | Number | Số stars |
| E | language | Text | Python / JavaScript |
| F | trending_date | Date | Ngày trending |

### 3.4 Schema: Airtable "Subscribers" (Giữ nguyên)

Subscribers vẫn dùng Airtable vì:
- Cần UI đẹp để quản lý
- Số lượng ít (<1000)
- Không cần unlimited

| Field | Type | Mô tả |
|-------|------|-------|
| email | Email | Email subscriber |
| status | Single select | pending / confirmed |
| subscribed_at | Date | Ngày đăng ký |

---

## 4. Frontend Layer (Next.js 16)

### 4.1 Next.js 16 Features

**Tính năng mới (Released Oct 2025):**
- **React 19.2** - View Transitions, `useEffectEvent()`, Activity component
- **Turbopack** - Default bundler (2-5x faster builds, 10x faster Fast Refresh)
- **React Compiler** - Automatic memoization (stable)
- **Cache Components** - Opt-in caching với `"use cache"` directive
- **DevTools MCP** - AI-assisted debugging
- **`proxy.ts`** - Thay thế `middleware.ts` cho network boundary

**Breaking Changes:**
- Node.js 20.9+ required
- Async `params`, `searchParams`, `cookies()`, `headers()`
- Turbopack là default bundler

### 4.2 Cấu trúc thư mục

```
kynguyenai-web/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Trang chủ - Bento Grid
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx        # Danh mục tin theo category
│   ├── article/
│   │   └── [id]/
│   │       └── page.tsx        # Chi tiết bài viết
│   └── api/
│       ├── articles/
│       │   └── route.ts        # GET articles từ Google Sheets
│       ├── revalidate/
│       │   └── route.ts        # Webhook từ Make.com
│       └── subscribe/
│           └── route.ts        # POST subscribe (→ Airtable)
├── components/
│   ├── bento/                  # Từ bentogrids.com
│   │   ├── BentoGrid.tsx
│   │   ├── HeroTile.tsx
│   │   ├── TallTile.tsx
│   │   └── StandardTile.tsx
│   ├── article/
│   │   ├── ArticleCard.tsx
│   │   └── ArticleDetail.tsx
│   └── ui/                     # Shadcn components
├── lib/
│   ├── sheets.ts               # Google Sheets client
│   ├── airtable.ts             # Airtable client (subscribers only)
│   └── perplexity.ts           # Perplexity client (optional)
├── types/
│   └── index.ts
├── .env.local
└── package.json
```

### 4.3 API Routes

| Endpoint | Method | Data Source | Mô tả |
|----------|--------|-------------|-------|
| `/api/articles` | GET | Google Sheets | Lấy danh sách bài viết |
| `/api/articles?category=ai-tools` | GET | Google Sheets | Lấy theo category |
| `/api/revalidate` | POST | - | Webhook từ Make.com |
| `/api/subscribe` | POST | Airtable | Đăng ký newsletter |

### 4.4 Bento Grid Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                     BENTO GRID (bentogrids.com)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Desktop (4 columns)                                                │
│   ┌────────────────────────┬──────────────┬──────────────┐          │
│   │                        │              │              │          │
│   │      HERO ARTICLE      │   AI TOOL    │   AI NEWS    │          │
│   │        (2x2)           │   OF DAY     │   (1x1)      │          │
│   │     (Tin AI hot)       │   (1x2)      │              │          │
│   │                        │              ├──────────────┤          │
│   │                        │              │  SPONSORED   │          │
│   │                        │              │   (1x1)      │          │
│   └────────────────────────┴──────────────┴──────────────┘          │
│   ┌──────────────┬──────────────┬──────────────┬──────────────┐     │
│   │  AI TOOLS    │  AI NEWS     │ AI TUTORIAL  │ AI VIETNAM   │     │
│   │   (1x1)      │   (1x1)      │   (1x1)      │   (1x1)      │     │
│   └──────────────┴──────────────┴──────────────┴──────────────┘     │
│                                                                      │
│   CSS Grid Implementation:                                           │
│   grid-template-columns: repeat(4, 1fr)                             │
│   auto-rows: 200px                                                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.5 Tile Types

| Tile | CSS Class | Grid Span | Use Case |
|------|-----------|-----------|----------|
| **Hero** | `col-span-2 row-span-2` | 2x2 | Breaking news |
| **Tall** | `row-span-2` | 1x2 | GitHub trending |
| **Standard** | (default) | 1x1 | Regular articles |
| **Wide** | `col-span-2` | 2x1 | Banners |

---

## 5. AI Processing (Perplexity)

### 5.1 Integration Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                  PERPLEXITY API (IN MAKE.COM)                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   HTTP Module Configuration:                                         │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  URL: https://api.perplexity.ai/chat/completions            │   │
│   │  Method: POST                                                │   │
│   │  Headers:                                                    │   │
│   │    Authorization: Bearer {{PERPLEXITY_API_KEY}}             │   │
│   │    Content-Type: application/json                           │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│   Request Body:                                                      │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  {                                                           │   │
│   │    "model": "sonar",                                        │   │
│   │    "messages": [                                            │   │
│   │      {                                                      │   │
│   │        "role": "system",                                    │   │
│   │        "content": "Bạn là Biên tập viên AI. Dịch và tóm tắt│   │
│   │                    sang tiếng Việt. Giữ thuật ngữ AI."     │   │
│   │      },                                                     │   │
│   │      {                                                      │   │
│   │        "role": "user",                                      │   │
│   │        "content": "Title: {{title}}\nContent: {{content}}" │   │
│   │      }                                                      │   │
│   │    ],                                                       │   │
│   │    "temperature": 0.3                                       │   │
│   │  }                                                          │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│   Response Parsing:                                                  │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  title_vi = {{response.choices[0].message.content.title_vi}}│   │
│   │  summary_vi = {{response.choices[0].message.content...}}    │   │
│   │  category = {{response.choices[0].message.content.category}}│   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 Prompt Template

```
Bạn là Biên tập viên AI chuyên nghiệp. Nhiệm vụ:

1. Dịch tiêu đề sang tiếng Việt (tự nhiên, hấp dẫn)
2. Tóm tắt nội dung thành 2-3 câu tiếng Việt
3. Phân loại vào 1 trong 4 category: AI Tools, AI News, AI Tutorial, AI Vietnam

QUAN TRỌNG: Giữ nguyên thuật ngữ AI:
- LLM, GPT, Transformer, Fine-tuning
- Prompt Engineering, RAG, Vector Database
- Machine Learning, Deep Learning, Neural Network

Input:
Title: {{title}}
Content: {{content}}

Output JSON:
{
  "title_vi": "...",
  "summary_vi": "...",
  "category": "AI Tools | AI News | AI Tutorial | AI Vietnam"
}
```

---

## 6. Deployment

### 6.1 Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "devCommand": "next dev --turbo",
  "installCommand": "npm install"
}
```

**LƯU Ý:** Không cần cron configuration vì Make.com xử lý automation.

### 6.2 ISR Configuration

```typescript
// app/page.tsx
export const revalidate = 300 // 5 minutes fallback

// On-demand revalidation via webhook
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  // Revalidate pages
  revalidatePath('/')
  revalidatePath('/category/[slug]', 'page')

  return NextResponse.json({ revalidated: true, time: Date.now() })
}
```

### 6.3 Environment Variables

```bash
# .env.local

# Google Sheets
GOOGLE_SERVICE_ACCOUNT={"type":"service_account",...}
GOOGLE_SHEETS_ID=1xxxxxxxxxxxxxxxx

# Airtable (for subscribers)
AIRTABLE_API_KEY=pat_xxxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxxxx

# Revalidation
REVALIDATE_SECRET=your-random-secret

# App
NEXT_PUBLIC_APP_URL=https://kynguyenai.vn
```

### 6.4 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      DEPLOYMENT ARCHITECTURE v3.0                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   EMAIL NEWSLETTERS                                                  │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  AlphaSignal | TLDR AI | The Rundown AI | Import AI         │   │
│   └──────────────────────────────┬──────────────────────────────┘   │
│                                  │                                   │
│                                  ▼                                   │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    MAKE.COM (Free Tier)                      │   │
│   │  • Watch Gmail (trigger)                                    │   │
│   │  • Parse email (extract articles)                           │   │
│   │  • HTTP → Perplexity (translate)                           │   │
│   │  • Google Sheets (save)                                     │   │
│   │  • Webhook → Vercel (revalidate)                           │   │
│   └──────────────────────────────┬──────────────────────────────┘   │
│                                  │                                   │
│              ┌───────────────────┼───────────────────┐              │
│              │                   │                   │              │
│              ▼                   ▼                   ▼              │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│   │  GOOGLE SHEETS   │  │    PERPLEXITY    │  │      VERCEL      │ │
│   │   (Database)     │  │      (AI)        │  │   (Next.js 16)   │ │
│   │   Unlimited      │  │   $5 free/mo     │  │   Free Tier      │ │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘ │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7. Chi phí Ước tính

### 7.1 v3.0: $0/tháng

| Service | Free Tier | Sử dụng dự kiến | Chi phí |
|---------|-----------|-----------------|---------|
| **Vercel** | 100k requests | ~50k requests | $0 |
| **Google Sheets** | Unlimited | ~900 records/tháng | $0 |
| **Make.com** | 1000 ops/month | ~900 ops/tháng | $0 |
| **Perplexity** | $5 credits (Pro) | ~$4.50/tháng | $0* |
| **Airtable** | 1000 records | ~100 subscribers | $0 |
| **TOTAL** | | | **$0/tháng** |

*Perplexity: Cần Pro subscription ($20/tháng) cho $5 credits, hoặc pay-as-you-go (~$4.50/tháng)

### 7.2 So sánh chi phí v2.0 vs v3.0

| | v2.0 | v3.0 |
|---|------|------|
| Database | Airtable Free (1000 records) | Google Sheets (Unlimited) |
| AI | Gemini (~$2-5/tháng) | Perplexity ($0-5/tháng) |
| Automation | Vercel Cron (free) | Make.com (free) |
| **Total** | **$0-5/tháng** | **$0/tháng** |

---

## 8. TypeScript Types

```typescript
// types/index.ts

export interface Article {
  id: string
  url_hash: string
  title_hash: string
  title_vi: string
  summary_vi: string
  original_url: string
  thumbnail?: string
  category: 'AI Tools' | 'AI News' | 'AI Tutorial' | 'AI Vietnam'
  source: string
  published_at: string
  tile_size: 'hero' | 'tall' | 'standard' | 'wide'
  is_featured: boolean
  status: 'draft' | 'published'
  created_at: string
}

export interface GitHubRepo {
  repo_name: string
  url: string
  description_vi: string
  stars: number
  language: string
  trending_date: string
}

export interface Subscriber {
  id: string
  email: string
  status: 'pending' | 'confirmed'
  subscribed_at: string
}
```

---

## 9. Migration Path

### 9.1 Google Sheets → Supabase

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MIGRATION PATH                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Phase 1 (Hiện tại): Google Sheets + Make.com                      │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Chi phí: $0/tháng                                          │   │
│   │  Giới hạn: API rate limits, no SQL queries                  │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              ▼                                       │
│   Phase 2: Supabase + Make.com (khi cần SQL)                        │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Migrate: Download CSV → Import Supabase                    │   │
│   │  Update: lib/sheets.ts → lib/supabase.ts                   │   │
│   │  Chi phí: $0 (Supabase free tier)                          │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              ▼                                       │
│   Phase 3: Full Stack (khi cần real-time, auth)                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Add: Upstash Redis (caching)                               │   │
│   │  Add: Supabase Auth                                         │   │
│   │  Chi phí: ~$20-50/tháng                                     │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.2 Make.com → Vercel Cron (nếu cần)

Khi cần control nhiều hơn:
1. Viết cron job trong `/api/cron/route.ts`
2. Add Vercel Cron config
3. Migrate logic từ Make.com sang code

---

## 10. Setup Guide

### 10.1 Setup Make.com (15 phút)

1. Đăng ký tại [make.com](https://www.make.com)
2. Tạo Scenario mới
3. Add modules:
   - Gmail → Watch emails
   - Text Parser → Extract from HTML
   - Iterator → Loop articles
   - Google Sheets → Search rows (dedup)
   - HTTP → Perplexity API
   - Google Sheets → Add row
   - HTTP → Webhook to Vercel
4. Configure filters và connections
5. Enable scenario

### 10.2 Setup Google Sheets (5 phút)

1. Tạo Google Sheet mới
2. Tạo sheet "Articles" với columns A-N theo schema
3. Enable Google Sheets API trong Google Cloud Console
4. Tạo Service Account
5. Share Sheet với Service Account email

### 10.3 Deploy Next.js (10 phút)

```bash
# Create project (Next.js 16)
npx create-next-app@latest kynguyenai-web --typescript --tailwind --app

# Install dependencies
cd kynguyenai-web
npm install googleapis

# Add environment variables
# Copy .env.local

# Deploy to Vercel
git push origin main
# Import in Vercel Dashboard
```

---

## 11. Xem thêm

- [Tech-Stack.md](./Tech-Stack.md) - Chi tiết tech stack v3.0
- [HLD-DF-DATA-PIPELINE.md](../HLD/MVP.1/HLD-DF-DATA-PIPELINE.md) - Chi tiết Make.com flow
- [HLD-CF-AI-PROCESSING.md](../HLD/MVP.1/HLD-CF-AI-PROCESSING.md) - Chi tiết Perplexity
- Make.com: https://www.make.com
- Google Sheets API: https://developers.google.com/sheets/api
- Perplexity API: https://docs.perplexity.ai
- BentoGrids: https://bentogrids.com
