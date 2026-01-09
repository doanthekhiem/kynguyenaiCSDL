# Technology Stacks - KynguyenAI.vn (News Aggregator)

Đây là các stacks được sử dụng trong toàn bộ dự án KynguyenAI.vn News Aggregator, từ Frontend → UI Components → AI Integration → Backend → Database → Deployment.

---

## 1. FRONTEND STACK

### 1.1 Core Framework

| Technology | Version | Mô tả |
|------------|---------|-------|
| **Next.js** | 15.x | React framework với App Router, ISR, API Routes |
| **React** | 19.x | UI library với concurrent features |
| **TypeScript** | 5.x | Type safety cho toàn bộ codebase |

### 1.2 UI & Styling

| Technology | Version | Mô tả |
|------------|---------|-------|
| **Tailwind CSS** | 3.4.x | Utility-first CSS framework |
| **Shadcn/ui** | Latest | Pre-built accessible components (Button, Card, Dialog, etc.) |
| **Radix UI** | Latest | Headless UI primitives |
| **Lucide Icons** | Latest | Icon library (React icons) |
| **next/font** | Built-in | Font optimization (Google Fonts) |

### 1.3 Bento Grid & Layout

| Technology | Version | Mô tả |
|------------|---------|-------|
| **CSS Grid** | Native | Bento Grid layout engine |
| **React Grid Layout** | 1.4.x | Optional: Dynamic grid rearrangement |
| **Framer Motion** | 11.x | Smooth tile animations, transitions |

### 1.4 State Management & Data Fetching

| Technology | Version | Mô tả |
|------------|---------|-------|
| **Zustand** | 4.5.x | Lightweight state management (filters, user prefs) |
| **SWR** | 2.x | Data fetching, caching, revalidation |
| **React Hook Form** | 7.x | Form handling (newsletter subscribe) |
| **Zod** | 3.x | Schema validation |

### 1.5 Markdown & Code Rendering

| Technology | Version | Mô tả |
|------------|---------|-------|
| **react-markdown** | 9.x | Render markdown content |
| **remark-gfm** | 4.x | GitHub Flavored Markdown support |
| **rehype-highlight** | 7.x | Syntax highlighting |
| **Shiki** | 1.x | Alternative syntax highlighter (better themes) |

---

## 2. AI INTEGRATION STACK

### 2.1 AI SDK & Orchestration

| Technology | Provider | Mô tả |
|------------|----------|-------|
| **Vercel AI SDK** | Vercel | Unified interface cho AI providers, streaming support |
| **@ai-sdk/google** | Google | Gemini Flash 1.5 integration |
| **@ai-sdk/openai** | OpenAI | GPT-4o mini (fallback) |

### 2.2 AI Models - Text Generation & Translation

| Model | Provider | Use Case | Cost |
|-------|----------|----------|------|
| **Gemini Flash 1.5** | Google | Vietnamese translation, AI debates | ~$50/tháng (~$0.002/1K tokens) |
| **GPT-4o mini** | OpenAI | Fallback translation | $0.15/1M input, $0.6/1M output |

### 2.3 Translation Prompt Engineering

```typescript
// Optimized prompt for Vietnamese translation
const translationPrompt = `
Translate the following tech news article to Vietnamese.
Rules:
1. Keep ALL technical terms in English (Frontend, API, Hook, State, Component, Props, React, Next.js, etc.)
2. Use natural Vietnamese tone ("Chúng ta", not "Bạn" or robotic)
3. Preserve code examples exactly as-is
4. Keep markdown formatting
5. If the article is too short, expand with context

Article:
{content}
`;
```

---

## 3. BACKEND STACK

### 3.1 API Layer

| Technology | Mô tả |
|------------|-------|
| **Next.js API Routes** | Serverless API endpoints |
| **Edge Functions** | Low-latency global execution (news fetching, search) |
| **Vercel AI SDK (Core)** | streamText() cho AI translation streaming |
| **Vercel Cron Jobs** | Scheduled tasks (fetch news, generate debates) |

### 3.2 News Aggregation

| Technology | Provider | Mô tả |
|------------|----------|-------|
| **NewsData.io** | NewsData.io | Global tech news aggregation API |
| **GitHub REST API** | GitHub | Trending repositories |
| **RSS Parsers** | n8n/custom | Optional: Direct RSS feed parsing (Dev.to, Hacker News) |

### 3.3 Authentication

| Technology | Provider | Mô tả |
|------------|----------|-------|
| **Supabase Auth** | Supabase | Built-in authentication |
| **OAuth 2.0** | Google | Social login (optional for premium) |
| **JWT** | Supabase | Token-based auth |

### 3.4 Workflow Automation (Optional)

| Technology | Mô tả |
|------------|-------|
| **n8n** | Self-hosted workflow automation (alternative to Vercel Cron) |
| **Inngest** | Background job processing (alternative) |

---

## 4. DATABASE STACK

### 4.1 Primary Database

| Technology | Provider | Mô tả |
|------------|----------|-------|
| **PostgreSQL** | Supabase | Relational database (v15) |
| **Full-text Search** | PostgreSQL tsvector | Vietnamese text search |
| **Row Level Security** | Supabase | Data isolation per user |

### 4.2 Database Schema

```sql
-- Core tables
- articles         -- News articles (original + Vietnamese)
- debates          -- AI debates
- github_trending  -- GitHub trending repos
- users            -- User accounts
- newsletter_subscribers
- user_preferences
```

### 4.3 Storage

| Technology | Provider | Mô tả |
|------------|----------|-------|
| **Supabase Storage** | Supabase | Object storage cho images (article thumbnails, OG images) |
| **Vercel Blob** | Vercel | Alternative storage option |

### 4.4 Caching

| Technology | Provider | Mô tả |
|------------|----------|-------|
| **Upstash Redis** | Upstash | Serverless Redis cho rate limiting, caching |
| **Vercel Edge Config** | Vercel | Feature flags, configurations |

---

## 5. DEPLOYMENT STACK

### 5.1 Hosting & CDN

| Technology | Mô tả |
|------------|-------|
| **Vercel** | Hosting platform với Edge Network |
| **Vercel Edge Network** | Global CDN với ISR caching |
| **Vercel Image Optimization** | On-the-fly image optimization |
| **ISR (Incremental Static Regeneration)** | Homepage: 5 phút, Categories: 10 phút, Articles: 1 giờ |

### 5.2 CI/CD

| Technology | Mô tả |
|------------|-------|
| **GitHub Actions** | CI pipeline (lint, type-check, build) |
| **Vercel Git Integration** | Auto-deploy on push to main |
| **Preview Deployments** | PR preview URLs |

### 5.3 Monitoring & Analytics

| Technology | Mô tả |
|------------|-------|
| **Vercel Analytics** | Web analytics (page views, performance) |
| **Vercel Speed Insights** | Core Web Vitals monitoring |
| **Sentry** | Error tracking & performance monitoring |
| **PostHog** | Product analytics (optional, for user behavior) |
| **Supabase Logs** | Database query logs |

---

## 6. EXTERNAL SERVICES

### 6.1 News Sources

| Service | API Type | Cost | Rate Limit |
|---------|----------|------|------------|
| **NewsData.io** | REST | $99/month (Standard plan) | 200 requests/hour |
| **GitHub API** | REST | Free | 5,000 requests/hour (authenticated) |

### 6.2 Email & Newsletter

| Service | Use Case | Cost |
|---------|----------|------|
| **Resend** | Transactional emails, newsletter | $20/month (3,000 emails/month) |
| **Supabase Auth** | Built-in email auth | Included |

### 6.3 Payment (Future - Year 2+)

| Service | Market | Mô tả |
|---------|--------|-------|
| **MoMo** | Vietnam | Mobile payment gateway |
| **ZaloPay** | Vietnam | Mobile payment gateway |
| **Stripe** | International | Credit card processing |

---

## 7. DEVELOPMENT TOOLS

### 7.1 Package Management

| Tool | Version | Mô tả |
|------|---------|-------|
| **pnpm** | 9.x | Fast, disk-efficient package manager |
| **Node.js** | 20.x LTS | JavaScript runtime |

### 7.2 Code Quality

| Tool | Mô tả |
|------|-------|
| **ESLint** | JavaScript/TypeScript linting |
| **Prettier** | Code formatting |
| **Husky** | Git hooks |
| **lint-staged** | Pre-commit linting |
| **TypeScript** | Type checking |

### 7.3 Testing (Future)

| Tool | Mô tả |
|------|-------|
| **Vitest** | Unit testing |
| **React Testing Library** | Component testing |
| **Playwright** | E2E testing |

### 7.4 IDE & Extensions

| Tool | Mô tả |
|------|-------|
| **VS Code** | Recommended IDE |
| **ESLint Extension** | In-editor linting |
| **Tailwind CSS IntelliSense** | Tailwind autocomplete |
| **Prettier Extension** | Auto-formatting on save |

---

## 8. TECHNOLOGY STACK DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────────┐
│               KYNGUYENAI.VN NEWS AGGREGATOR - TECH STACK                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│   FRONTEND                                                                    │
│   ══════════                                                                  │
│   • Next.js 15 (App Router + ISR)    • TypeScript 5.x                        │
│   • React 19                          • Tailwind CSS + Shadcn/ui             │
│   • Bento Grid (CSS Grid)             • Framer Motion (Animations)           │
│   • Zustand (State)                   • SWR (Data fetching)                  │
│   • react-markdown + Shiki            • React Hook Form + Zod                │
│                                                                               │
│   ─────────────────────────────────────────────────────────────────────────  │
│                                                                               │
│   AI INTEGRATION                                                              │
│   ══════════════                                                              │
│   • Vercel AI SDK                     • Gemini Flash 1.5 (Google)            │
│   • GPT-4o mini (OpenAI fallback)     • Streaming translation                │
│                                                                               │
│   ─────────────────────────────────────────────────────────────────────────  │
│                                                                               │
│   BACKEND & APIs                                                              │
│   ═══════════════                                                             │
│   • Next.js API Routes                • Edge Functions                       │
│   • NewsData.io API                   • GitHub REST API                      │
│   • Vercel Cron Jobs                  • Supabase Auth                        │
│                                                                               │
│   ─────────────────────────────────────────────────────────────────────────  │
│                                                                               │
│   DATABASE & STORAGE                                                          │
│   ══════════════════                                                          │
│   • Supabase PostgreSQL 15            • Full-text Search (tsvector)          │
│   • Supabase Storage                  • Upstash Redis (caching)              │
│   • Vercel Edge Config                                                       │
│                                                                               │
│   ─────────────────────────────────────────────────────────────────────────  │
│                                                                               │
│   DEPLOYMENT                                                                  │
│   ══════════                                                                  │
│   • Vercel Platform                   • Vercel Edge Network (CDN)            │
│   • ISR (5min/10min/1hr)              • GitHub Actions (CI)                  │
│   • Preview Deployments                                                      │
│                                                                               │
│   ─────────────────────────────────────────────────────────────────────────  │
│                                                                               │
│   MONITORING & ANALYTICS                                                      │
│   ══════════════════════                                                      │
│   • Vercel Analytics                  • Vercel Speed Insights                │
│   • Sentry (Errors)                   • PostHog (Product analytics)          │
│                                                                               │
│   ─────────────────────────────────────────────────────────────────────────  │
│                                                                               │
│   EMAIL & NEWSLETTER                                                          │
│   ══════════════════                                                          │
│   • Resend (3,000 emails/month)                                              │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. VERSION PINNING & DEPENDENCIES

```json
{
  "name": "kynguyenai-news-aggregator",
  "version": "2.0.0",
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.4.0",

    "tailwindcss": "^3.4.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "lucide-react": "^0.400.0",

    "ai": "^3.3.0",
    "@ai-sdk/google": "^0.0.40",
    "@ai-sdk/openai": "^0.0.50",

    "zustand": "^4.5.0",
    "swr": "^2.2.0",
    "react-hook-form": "^7.50.0",
    "zod": "^3.22.0",

    "react-markdown": "^9.0.0",
    "remark-gfm": "^4.0.0",
    "rehype-highlight": "^7.0.0",
    "shiki": "^1.0.0",

    "framer-motion": "^11.0.0",

    "@supabase/supabase-js": "^2.40.0",
    "@supabase/ssr": "^0.3.0",
    "@vercel/blob": "^0.20.0",
    "@upstash/redis": "^1.28.0",

    "resend": "^3.0.0",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",

    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.0",

    "vitest": "^1.4.0",
    "@playwright/test": "^1.42.0",

    "husky": "^9.0.0",
    "lint-staged": "^15.2.0"
  }
}
```

---

## 10. ENVIRONMENT VARIABLES

```bash
# App Config
NEXT_PUBLIC_APP_URL=https://kynguyenai.vn
NEXT_PUBLIC_APP_NAME=KynguyenAI

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1...

# AI Providers
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...  # Gemini Flash 1.5
OPENAI_API_KEY=sk-...                   # GPT-4o mini (fallback)

# News Sources
NEWSDATA_API_KEY=pub_xxx                # NewsData.io
GITHUB_TOKEN=ghp_xxx                    # GitHub API

# Email
RESEND_API_KEY=re_xxx                   # Resend

# Upstash Redis (Rate limiting, caching)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxx...

# Vercel Edge Config (Feature flags)
EDGE_CONFIG=https://edge-config.vercel.com/xxx

# Analytics (Optional)
SENTRY_DSN=https://xxx@sentry.io/xxx
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Cron Job Secret (để secure cron endpoints)
CRON_SECRET=xxx_random_secret_xxx
```

---

## 11. COST BREAKDOWN (Monthly)

| Category | Service | Cost |
|----------|---------|------|
| **Hosting** | Vercel Pro | $20 |
| **Database** | Supabase Pro | $25 |
| **News API** | NewsData.io Standard | $99 |
| **AI Translation** | Gemini Flash 1.5 (~1M articles/month) | $50 |
| **Email** | Resend (3,000 emails/month) | $20 |
| **Caching** | Upstash Redis (10K commands/day) | $0 (Free tier) |
| **Monitoring** | Sentry | $10 |
| **Domain** | kynguyenai.vn | $2/year (~$0.17/month) |
| **Total** | | **~$224/month** |

**Variable Costs**:
- Additional AI translation nếu > 1M articles: $0.002/1K tokens
- Additional emails nếu > 3,000: $1/1,000 emails

---

## 12. MIGRATION FROM V1 (Vietnam 2045) TO V2 (News Aggregator)

### Removed Technologies (No Longer Needed)

| Technology | Reason |
|------------|--------|
| **GSAP ScrollTrigger** | No scrollytelling, no complex animations |
| **React Three Fiber** | No 3D visualization |
| **Three.js** | No 3D globe |
| **Replicate/Fal.ai** | No image generation |
| **OpenAI Embeddings** | No RAG chatbot (simplified) |
| **pgvector** | No vector search |
| **Vercel KV** | Replaced with Upstash Redis |

### Added Technologies (New Requirements)

| Technology | Reason |
|------------|--------|
| **NewsData.io** | News aggregation source |
| **GitHub REST API** | Trending repos |
| **react-markdown** | Render news articles |
| **Shiki** | Syntax highlighting cho code examples |
| **Upstash Redis** | Rate limiting, caching |
| **Resend** | Newsletter |

---

**Tài liệu liên quan:**
- [BusinessContextVision-KynguyenAI-v2.md](./BusinessContextVision-KynguyenAI-v2.md) - Tầm nhìn kinh doanh
- [ComponentView-KynguyenAI.md](./ComponentView-KynguyenAI.md) - Kiến trúc hệ thống
