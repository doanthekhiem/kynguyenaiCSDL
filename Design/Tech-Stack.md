# Tech Stack - KynguyenAI.vn (v3.1 - Newsletter Tracking)

> **Phiên bản**: 3.1
> **Cập nhật**: 23/01/2026
> **Thay đổi chính**: Gmail API + Vercel Cron cho Newsletter Tracking, Supabase PostgreSQL

---

## 1. Tổng quan Công nghệ

### 1.1 Stack Overview v3.0

```
┌─────────────────────────────────────────────────────────────────────┐
│                   KYNGUYENAI TECH STACK v3.0                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   AUTOMATION                          DATABASE                       │
│   ┌─────────────────────┐           ┌─────────────────────┐         │
│   │ Make.com            │           │ Google Sheets       │         │
│   │ (No-code workflow)  │     →     │ (Unlimited free)    │         │
│   │ Watch Gmail         │           │ Familiar UI         │         │
│   └─────────────────────┘           └─────────────────────┘         │
│                                                                      │
│   FRONTEND                            AI SERVICES                    │
│   ┌─────────────────────┐           ┌─────────────────────┐         │
│   │ Next.js 16          │           │ Perplexity Sonar    │         │
│   │ React 19.2          │           │ ($5 free/tháng)     │         │
│   │ BentoGrids.com      │           │ Search + Translate  │         │
│   └─────────────────────┘           └─────────────────────┘         │
│                                                                      │
│   STYLING                            DEPLOYMENT                      │
│   ┌─────────────────────┐           ┌─────────────────────┐         │
│   │ Tailwind CSS 4.x    │           │ Vercel              │         │
│   │ CSS Grid (Bento)    │           │ (Free Tier)         │         │
│   │ Shadcn UI           │           │ ISR + Webhook       │         │
│   └─────────────────────┘           └─────────────────────┘         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 So sánh v2.0 vs v3.0 vs v3.1

| Thành phần | v2.0 (Cũ) | v3.0 | v3.1 (Mới) |
|------------|-----------|------|------------|
| **Next.js** | 14/15 | 16 | **16** (React 19.2) |
| **UI Kit** | Shadcn tự code | BentoGrids.com | **BentoGrids + Custom** |
| **AI API** | Gemini Flash | Perplexity Sonar | **Perplexity API** |
| **Nguồn tin** | NewsData.io | Make.com | **Gmail API Direct** |
| **Database** | Airtable | Google Sheets | **Supabase PostgreSQL** |
| **Automation** | Vercel Cron | Make.com | **Vercel Cron + Gmail API** |
| **Dedup** | URL check | Hash MD5 | **SHA256 URL Hash** |
| **Chi phí** | $0-5/tháng | $0/tháng | **$0/tháng** |

### 1.3 Tiêu chí Lựa chọn

| Tiêu chí | Yêu cầu | Giải pháp v3.0 |
|----------|---------|----------------|
| **Dễ sử dụng** | FE dev không cần code backend | Make.com no-code automation |
| **Chi phí thấp** | $0/tháng | Tất cả free tier |
| **Đơn giản** | Không cần viết Cron job | Make.com Watch Gmail |
| **Performance** | Fast TTFB, SEO | Next.js 16 ISR + Turbopack |
| **Dễ scale** | Migrate khi cần | Google Sheets → Supabase |

---

## 2. Frontend Stack

### 2.1 Next.js 16 (React 19.2)

**Version:** 16.x (Released Oct 2025)

**Tính năng mới:**
- **React 19.2** - View Transitions, `useEffectEvent()`, Activity component
- **Turbopack** - Default bundler (2-5x faster builds, 10x faster Fast Refresh)
- **React Compiler** - Automatic memoization (stable)
- **Cache Components** - Opt-in caching với `"use cache"` directive
- **DevTools MCP** - AI-assisted debugging
- **`proxy.ts`** - Thay thế `middleware.ts` cho network boundary
- **Enhanced Logging** - Development và build logs chi tiết

**Breaking Changes:**
- Node.js 20.9+ (dropped Node 18)
- TypeScript 5.1+
- Turbopack là default (dùng `--webpack` để opt out)
- Async `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()`
- Loại bỏ AMP support, `next lint`

**Lý do chọn:**
- Framework production-ready mới nhất
- Built-in image optimization
- API Routes cho serverless functions
- Vercel deploy zero-config

**Cấu hình chính:**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  // React Compiler (stable in Next.js 16)
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' }, // Google Sheets images
      { hostname: 'avatars.githubusercontent.com' },
    ],
  },
}

export default config
```

### 2.2 BentoGrids.com Templates

**LƯU Ý:** BentoGrids.com là website tham khảo design patterns, KHÔNG phải thư viện.

**Cách sử dụng:**
1. Truy cập https://bentogrids.com
2. Chọn template phù hợp
3. Copy code CSS Grid + Tailwind
4. Customize cho project

**Implementation:**

```typescript
// components/bento/BentoGrid.tsx
interface BentoGridProps {
  children: React.ReactNode
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
      {children}
    </div>
  )
}

// Hero tile (2x2)
export function HeroTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6">
      {children}
    </div>
  )
}

// Tall tile (1x2)
export function TallTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="row-span-2 bg-gray-100 rounded-xl p-4">
      {children}
    </div>
  )
}

// Standard tile (1x1)
export function StandardTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border rounded-xl p-4 hover:shadow-lg transition">
      {children}
    </div>
  )
}
```

### 2.3 Tailwind CSS 4.x

**Cấu hình:**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
      // Bento grid configurations
      gridTemplateColumns: {
        bento: 'repeat(4, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        bento: 'repeat(auto-fill, 200px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}

export default config
```

### 2.4 Shadcn UI

**Components sử dụng:**

| Component | Use case |
|-----------|----------|
| `Card` | Article tiles, Bento items |
| `Badge` | Tags, categories |
| `Button` | Actions, CTAs |
| `ScrollArea` | GitHub trending list |
| `Skeleton` | Loading states |
| `Input` | Newsletter subscription |

---

## 3. Database: Google Sheets

### 3.1 Tại sao chọn Google Sheets?

| Ưu điểm | Mô tả |
|---------|-------|
| **Unlimited free** | Không giới hạn records |
| **UI quen thuộc** | Ai cũng biết dùng Excel/Sheets |
| **API miễn phí** | Google Sheets API |
| **Make.com native** | Tích hợp sẵn trong Make.com |
| **Easy backup** | Download CSV/Excel bất cứ lúc nào |
| **Real-time edit** | Nhiều người edit cùng lúc |

### 3.2 Google Sheets vs Airtable

| Tiêu chí | Google Sheets | Airtable |
|----------|---------------|----------|
| **Free records** | **Unlimited** | 1,000 |
| **UI quản lý** | Tốt (quen thuộc) | Xuất sắc |
| **API** | Google Sheets API | REST API |
| **Make.com** | Native integration | Native integration |
| **Phù hợp** | **>1000 records** | <1000 records |

**Kết luận:** Chọn **Google Sheets** vì unlimited free records.

### 3.3 Google Sheets Schema

**Sheet: Articles**

| Column | Type | Mô tả |
|--------|------|-------|
| A: id | Text | Auto-generated UUID |
| B: url_hash | Text | MD5 hash cho dedup |
| C: title_hash | Text | MD5 hash cho dedup |
| D: title_vi | Text | Tiêu đề tiếng Việt |
| E: summary_vi | Text | Tóm tắt tiếng Việt |
| F: original_url | URL | Link gốc |
| G: thumbnail | URL | Link ảnh |
| H: category | Text | AI Tools / AI News / AI Tutorial |
| I: source | Text | AlphaSignal / TLDR AI |
| J: published_at | Date | Ngày đăng |
| K: tile_size | Text | hero / tall / standard |
| L: is_featured | Boolean | TRUE/FALSE |
| M: status | Text | draft / published |
| N: created_at | Date | Ngày tạo |

**Sheet: GitHub_Trending (optional)**

| Column | Type | Mô tả |
|--------|------|-------|
| A: repo_name | Text | owner/repo |
| B: url | URL | GitHub URL |
| C: description_vi | Text | Mô tả tiếng Việt |
| D: stars | Number | Số stars |
| E: language | Text | Python / JavaScript |
| F: trending_date | Date | Ngày trending |

### 3.4 Google Sheets Client

```typescript
// lib/sheets.ts
import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT!),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
})

const sheets = google.sheets({ version: 'v4', auth })

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!

export async function getPublishedArticles(limit = 20) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Articles!A2:N', // Skip header row
  })

  const rows = response.data.values || []

  return rows
    .filter((row) => row[12] === 'published') // status = published
    .slice(0, limit)
    .map((row) => ({
      id: row[0],
      url_hash: row[1],
      title_hash: row[2],
      title_vi: row[3],
      summary_vi: row[4],
      original_url: row[5],
      thumbnail: row[6],
      category: row[7],
      source: row[8],
      published_at: row[9],
      tile_size: row[10],
      is_featured: row[11] === 'TRUE',
      status: row[12],
      created_at: row[13],
    }))
}
```

---

## 4. AI Services: Perplexity API

### 4.1 Tại sao chọn Perplexity?

| Ưu điểm | Mô tả |
|---------|-------|
| **$5 FREE/tháng** | Pro subscription |
| **Search tích hợp** | Không cần NewsData.io |
| **Sonar model** | Nhanh, rẻ |
| **Grounded responses** | Có citations |

### 4.2 Pricing chi tiết

| Model | Input | Output | Request Fee |
|-------|-------|--------|-------------|
| **Sonar** | $1/1M tokens | $1/1M tokens | $5/1000 requests |
| Sonar Pro | $3/1M tokens | $15/1M tokens | $5-10/1000 requests |

**Ước tính chi phí 30 bài/ngày:**
```
30 bài × 30 ngày = 900 requests/tháng
900 × $0.005 = $4.50/tháng
→ Trong $5 free credits!
```

### 4.3 Perplexity Integration (trong Make.com)

Make.com sẽ gọi Perplexity API trực tiếp qua HTTP module.

**API Endpoint:** `https://api.perplexity.ai/chat/completions`

**Request:**
```json
{
  "model": "sonar",
  "messages": [
    {
      "role": "system",
      "content": "Bạn là Biên tập viên AI. Nhiệm vụ: Dịch tiêu đề và tóm tắt nội dung sang tiếng Việt. Giữ nguyên thuật ngữ AI (LLM, GPT, Transformer, Fine-tuning, etc.)"
    },
    {
      "role": "user",
      "content": "Dịch và tóm tắt bài viết này:\n\nTitle: {{title}}\nContent: {{content}}\n\nTrả về JSON: {\"title_vi\": \"...\", \"summary_vi\": \"...\", \"category\": \"AI Tools|AI News|AI Tutorial\"}"
    }
  ],
  "temperature": 0.3
}
```

**Response:**
```json
{
  "choices": [
    {
      "message": {
        "content": "{\"title_vi\": \"...\", \"summary_vi\": \"...\", \"category\": \"AI News\"}"
      }
    }
  ]
}
```

### 4.4 Perplexity Client (nếu cần từ Next.js)

```typescript
// lib/perplexity.ts
const PERPLEXITY_API = 'https://api.perplexity.ai/chat/completions'

export async function summarizeAndTranslate(
  title: string,
  content: string
): Promise<{ title_vi: string; summary_vi: string; category: string }> {
  const response = await fetch(PERPLEXITY_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar',
      messages: [
        {
          role: 'system',
          content: 'Bạn là Biên tập viên AI. Dịch và tóm tắt sang tiếng Việt. Giữ nguyên thuật ngữ kỹ thuật.',
        },
        {
          role: 'user',
          content: `Dịch và tóm tắt:\n\nTitle: ${title}\nContent: ${content}\n\nTrả về JSON: {"title_vi": "...", "summary_vi": "...", "category": "AI Tools|AI News|AI Tutorial"}`,
        },
      ],
      temperature: 0.3,
    }),
  })

  const data = await response.json()
  const text = data.choices[0].message.content

  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Invalid AI response')

  return JSON.parse(jsonMatch[0])
}
```

---

## 5. Automation: Make.com

### 5.1 Tại sao chọn Make.com?

| Ưu điểm | Mô tả |
|---------|-------|
| **No-code** | Không cần viết code |
| **Gmail integration** | Watch email tự động |
| **1000 ops/month free** | Đủ cho 30 bài/ngày |
| **Visual workflow** | Dễ debug và modify |
| **Native integrations** | Google Sheets, Airtable, HTTP |

### 5.2 Make.com Pricing

| Plan | Ops/month | Cost |
|------|-----------|------|
| **Free** | 1,000 | $0 |
| Core | 10,000 | $10.59/mo |
| Pro | 50,000 | $18.82/mo |

**30 bài/ngày = ~900 ops/tháng → Đủ trong Free tier!**

### 5.3 Make.com Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MAKE.COM AUTOMATION FLOW                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   1. TRIGGER: Watch Gmail                                           │
│      └── Filter: From AlphaSignal, TLDR AI, The Rundown AI         │
│      └── Trigger: Every 15 minutes                                  │
│                                                                      │
│   2. PARSE: Text Parser - Extract from HTML                         │
│      └── Extract links, titles, descriptions                        │
│      └── Output: Array of articles                                  │
│                                                                      │
│   3. ITERATOR: Loop through articles                                │
│                                                                      │
│   4. DEDUP: Check duplicate                                         │
│      └── Tính url_hash = MD5(normalized_url)                       │
│      └── Search in Google Sheets                                    │
│      └── Nếu tìm thấy → Skip                                       │
│                                                                      │
│   5. AI: HTTP Module → Perplexity API                              │
│      └── Summarize + Translate to Vietnamese                       │
│      └── Get: title_vi, summary_vi, category                       │
│                                                                      │
│   6. STORE: Google Sheets - Add Row                                 │
│      └── Append to Articles sheet                                   │
│      └── Include: url_hash, title_hash, AI output                  │
│                                                                      │
│   7. NOTIFY: HTTP Module → Webhook                                  │
│      └── POST to /api/revalidate                                    │
│      └── Trigger Next.js ISR                                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.4 Email Newsletter Sources

| Newsletter | Topic | Frequency |
|------------|-------|-----------|
| **AlphaSignal** | AI research papers | Daily |
| **TLDR AI** | AI news digest | Daily |
| **The Rundown AI** | AI news summary | Daily |
| **Import AI** | AI/ML deep dives | Weekly |
| **AI Breakfast** | AI news | Daily |

---

## 6. Deduplication Strategy

### 6.1 Vấn đề

- Cùng 1 tin có thể xuất hiện trong nhiều newsletters
- URL có thể khác nhau (tracking params, shorteners)
- Cần phát hiện trùng lặp về NỘI DUNG, không chỉ URL

### 6.2 Multi-layer Deduplication

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DEDUPLICATION STRATEGY                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Layer 1: URL Normalization                                        │
│   └── Loại bỏ tracking params (?utm_*, ?ref=, ?source=)            │
│   └── Chuẩn hóa: lowercase, remove trailing slash                  │
│   └── Hash: MD5(normalized_url) → url_hash                         │
│                                                                      │
│   Layer 2: Title Similarity                                         │
│   └── Normalize title: lowercase, remove punctuation               │
│   └── Hash: MD5(normalized_title) → title_hash                     │
│   └── Match: url_hash OR title_hash = duplicate                    │
│                                                                      │
│   Layer 3: Content Fingerprint (optional, future)                  │
│   └── Extract first 200 words                                      │
│   └── Hash content → content_hash                                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.3 Implementation trong Make.com

```javascript
// Custom JavaScript module trong Make.com

function normalizeUrl(url) {
  try {
    const urlObj = new URL(url);
    // Remove tracking params
    const cleanParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'ref', 'source', 'via'];
    cleanParams.forEach(p => urlObj.searchParams.delete(p));
    // Normalize
    return urlObj.origin + urlObj.pathname.toLowerCase().replace(/\/$/, '');
  } catch {
    return url.toLowerCase();
  }
}

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ')    // Normalize spaces
    .trim();
}

// In Make.com, use built-in MD5 function
// url_hash = md5(normalizeUrl(url))
// title_hash = md5(normalizeTitle(title))
```

### 6.4 Check Duplicate Flow

1. **Tính hash:**
   - `url_hash = MD5(normalized_url)`
   - `title_hash = MD5(normalized_title)`

2. **Search trong Google Sheets:**
   - Filter: `url_hash = {{url_hash}} OR title_hash = {{title_hash}}`

3. **Decision:**
   - Nếu tìm thấy → Router → Stop (skip duplicate)
   - Nếu không → Continue → AI Processing

---

## 7. Deployment: Vercel

### 7.1 Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "devCommand": "next dev",
  "installCommand": "npm install"
}
```

### 7.2 ISR Configuration

```typescript
// app/page.tsx
export const revalidate = 300 // 5 minutes

// Hoặc dùng on-demand revalidation
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/')
  revalidatePath('/category/[slug]')

  return NextResponse.json({ revalidated: true })
}
```

### 7.3 Environment Variables

```bash
# .env.local

# Google Sheets
GOOGLE_SERVICE_ACCOUNT={"type":"service_account",...}
GOOGLE_SHEETS_ID=1xxxxxxxxxxxxxxxx

# Perplexity (nếu cần từ Next.js)
PERPLEXITY_API_KEY=pplx-xxxxxxxx

# Revalidation
REVALIDATE_SECRET=your-random-secret

# App
NEXT_PUBLIC_APP_URL=https://kynguyenai.vn
```

---

## 8. Project Structure

```
kynguyenai-web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home - Bento Grid
│   ├── category/[slug]/page.tsx
│   ├── article/[id]/page.tsx
│   └── api/
│       ├── articles/route.ts       # Fetch từ Google Sheets
│       ├── revalidate/route.ts     # Webhook từ Make.com
│       └── github/route.ts         # GitHub trending (optional)
├── components/
│   ├── bento/
│   │   ├── BentoGrid.tsx
│   │   ├── HeroTile.tsx
│   │   ├── TallTile.tsx
│   │   └── StandardTile.tsx
│   ├── ArticleCard.tsx
│   └── ui/                         # Shadcn components
├── lib/
│   ├── sheets.ts                   # Google Sheets client
│   └── perplexity.ts               # Perplexity client (nếu cần)
├── types/
│   └── index.ts
├── .env.local
├── vercel.json
├── tailwind.config.ts
└── package.json
```

---

## 9. Tổng kết Chi phí v3.0

### 9.1 MVP Phase: $0/tháng

| Service | Plan | Cost/month |
|---------|------|------------|
| Vercel | Hobby (Free) | $0 |
| **Google Sheets** | Free (Unlimited) | $0 |
| **Make.com** | Free (1000 ops) | $0 |
| **Perplexity** | $5 credits (Pro) | $0* |
| GitHub API | Free | $0 |
| Domain | .vn | ~$10/year |
| **Total** | | **$0/tháng** |

*Lưu ý Perplexity: Cần Pro subscription ($20/tháng) để được $5 API credits, HOẶC dùng pay-as-you-go (~$4.50/tháng)

### 9.2 Scale Phase (khi cần)

| Service | Plan | Cost/month |
|---------|------|------------|
| Vercel | Pro | $20 |
| Supabase | Free/Pro | $0-25 |
| Make.com | Core | $10.59 |
| Perplexity | Pay-as-you-go | ~$10 |
| **Total** | | **~$45-65/tháng** |

---

## 10. Migration Path

### 10.1 Google Sheets → Supabase

```
┌─────────────────────────────────────────────────────────────────────┐
│                      MIGRATION PATH                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Phase 1 (Hiện tại) - v3.0                                         │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Google Sheets (Unlimited) + Make.com                       │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                          │                                           │
│                          ▼ Download CSV                              │
│   Phase 2 (Khi cần SQL queries)                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Supabase (PostgreSQL) + Edge Functions                     │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                          │                                           │
│                          ▼ Nếu cần caching                          │
│   Phase 3 (Khi traffic cao)                                         │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Supabase + Upstash Redis + Queue                           │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 10.2 Migration Steps

1. **Google Sheets → Supabase:**
   - Download CSV từ Google Sheets
   - Tạo Supabase project
   - Import CSV vào Supabase tables
   - Đổi `lib/sheets.ts` → `lib/supabase.ts`
   - Update Make.com scenario (Supabase module)

2. **Make.com → Vercel Cron (nếu cần):**
   - Khi cần control nhiều hơn
   - Viết cron job trong `/api/cron`
   - Migrate workflow từ Make.com sang code

---

## 11. Development Tools

### 11.1 Package.json

```json
{
  "name": "kynguyenai-web",
  "version": "3.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "googleapis": "^140.0.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "tailwindcss": "^4.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0"
  }
}
```

### 11.2 Code Quality

| Tool | Purpose |
|------|---------|
| ESLint | Linting |
| Prettier | Formatting |
| TypeScript | Type checking |
| Turbopack | Fast dev server |

---

## 12. Newsletter Tracking Stack (v3.1)

### 12.1 Công nghệ mới

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Email Fetching** | Gmail API + OAuth2 | Fetch email trực tiếp |
| **Cron** | Vercel Cron | Scheduled sync mỗi 10 phút |
| **Database** | Supabase PostgreSQL | Lưu tin tức, RLS security |
| **AI** | Perplexity API | Dịch + phân loại |
| **Dedup** | SHA256 | URL hash deduplication |

### 12.2 Gmail API Integration

```typescript
// lib/newsletter/gmail.ts
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: "v1", auth: oauth2Client });

export async function fetchUnreadNewsletters() {
  const response = await gmail.users.messages.list({
    userId: "me",
    q: "(from:*@beehiiv.com OR from:*@substack.com) is:unread",
    maxResults: 10,
  });
  // ... parse messages
}
```

### 12.3 Vercel Cron Configuration

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

### 12.4 Supabase Schema

```sql
-- newsletter_news table
CREATE TABLE newsletter_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url_hash VARCHAR(64) UNIQUE NOT NULL,
  original_title VARCHAR(500) NOT NULL,
  original_url VARCHAR(1000) NOT NULL,
  title_vi VARCHAR(500) NOT NULL,
  summary_vi TEXT NOT NULL,
  thumbnail_url VARCHAR(1000),
  source_id UUID REFERENCES newsletter_sources(id),
  category_id UUID REFERENCES newsletter_categories(id),
  published_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 12.5 Environment Variables (v3.1)

```env
# Gmail OAuth2 (new)
GMAIL_CLIENT_ID=your-client-id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REFRESH_TOKEN=your-refresh-token

# Cron Authentication (new)
CRON_SECRET=your-cron-secret

# Existing
PERPLEXITY_API_KEY=pplx-xxx
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

---

## 13. Xem thêm

- [ComponentView.md](./ComponentView.md) - Kiến trúc tổng quan
- [HLD-DF-DATA-PIPELINE.md](../HLD/MVP.1/HLD-DF-DATA-PIPELINE.md) - Chi tiết Make.com flow
- [HLD-CF-AI-PROCESSING.md](../HLD/MVP.1/HLD-CF-AI-PROCESSING.md) - Chi tiết Perplexity integration
- [HLD-NF-NEWSLETTER-TRACKING.md](../HLD/MVP.1/HLD-NF-NEWSLETTER-TRACKING.md) - Newsletter Tracking HLD
- [DD-Newsletter-Tracking.md](../DD/DD-Newsletter-Tracking.md) - Newsletter Detail Design
- Next.js 16: https://nextjs.org/blog/next-16
- Gmail API: https://developers.google.com/gmail/api
- Perplexity API: https://docs.perplexity.ai
- Supabase: https://supabase.com
- BentoGrids: https://bentogrids.com
