# Kiến trúc Component - KynguyenAI.vn

## 1. Tổng quan Kiến trúc

### 1.1 Kiến trúc Tổng thể

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           KYNGUYENAI.VN ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                          FRONTEND LAYER                                  │   │
│   │  ┌─────────────────────────────────────────────────────────────────┐    │   │
│   │  │                      nf-web (Next.js 14/15)                      │    │   │
│   │  │  - Bento Grid UI (Tailwind + Shadcn)                            │    │   │
│   │  │  - React Server Components                                       │    │   │
│   │  │  - ISR (Incremental Static Regeneration)                        │    │   │
│   │  │  - Dark Mode by default                                         │    │   │
│   │  └─────────────────────────────────────────────────────────────────┘    │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                         │
│                                        ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                           BFF LAYER                                      │   │
│   │  ┌─────────────────────────────────────────────────────────────────┐    │   │
│   │  │                   nf-graph (Apollo GraphQL)                      │    │   │
│   │  │  - Query aggregation                                            │    │   │
│   │  │  - Caching layer                                                │    │   │
│   │  │  - Rate limiting                                                │    │   │
│   │  └─────────────────────────────────────────────────────────────────┘    │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                         │
│                                        ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                        BACKEND SERVICES                                  │   │
│   │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐           │   │
│   │  │nf-article  │ │nf-aggreg.  │ │cf-ai-proc  │ │df-pipeline │           │   │
│   │  └────────────┘ └────────────┘ └────────────┘ └────────────┘           │   │
│   │  ┌────────────┐ ┌────────────┐ ┌────────────┐                          │   │
│   │  │uf-subscr.  │ │sf-monetize │ │pf-auth     │                          │   │
│   │  └────────────┘ └────────────┘ └────────────┘                          │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                         │
│                                        ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                          DATA LAYER                                      │   │
│   │  ┌─────────────────────────┐    ┌─────────────────────────┐             │   │
│   │  │  PostgreSQL (Supabase)  │    │    Redis (Queue/Cache)  │             │   │
│   │  └─────────────────────────┘    └─────────────────────────┘             │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                         │
│                                        ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                       EXTERNAL SERVICES                                  │   │
│   │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐           │   │
│   │  │NewsData.io │ │GitHub API  │ │Gemini API  │ │Resend      │           │   │
│   │  └────────────┘ └────────────┘ └────────────┘ └────────────┘           │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Nguyên tắc Thiết kế

| Nguyên tắc | Mô tả | Áp dụng |
|------------|-------|---------|
| **Simplicity First** | Ưu tiên đơn giản, tránh over-engineering | Monorepo, serverless functions |
| **Automation** | Tự động hóa tối đa | Cron jobs, AI processing |
| **Cost Efficiency** | Tối ưu chi phí vận hành | Gemini Flash, Vercel free tier |
| **Scalability** | Khả năng mở rộng | ISR, Redis queue |
| **Developer Experience** | Trải nghiệm phát triển tốt | TypeScript, hot reload |

---

## 2. Frontend Layer

### 2.1 nf-web - Ứng dụng Web Chính

**Công nghệ:**
- Next.js 14/15 với App Router
- React Server Components (RSC)
- Tailwind CSS + Shadcn UI
- TypeScript

**Chức năng chính:**

| Module | Mô tả | Route |
|--------|-------|-------|
| **Home** | Trang chủ Bento Grid | `/` |
| **Category** | Danh mục tin tức | `/category/[slug]` |
| **Article** | Chi tiết bài viết | `/article/[id]` |
| **Search** | Tìm kiếm | `/search` |
| **Trending** | GitHub Trending | `/trending` |
| **Newsletter** | Đăng ký newsletter | `/subscribe` |

**Cấu trúc thư mục:**

```
nf-web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home - Bento Grid
│   ├── category/[slug]/page.tsx
│   ├── article/[id]/page.tsx
│   ├── search/page.tsx
│   ├── trending/page.tsx
│   └── subscribe/page.tsx
├── components/
│   ├── bento/
│   │   ├── BentoGrid.tsx
│   │   ├── HeroTile.tsx           # 2x2 tile
│   │   ├── TallTile.tsx           # 1x2 tile
│   │   ├── StandardTile.tsx       # 1x1 tile
│   │   └── SponsoredTile.tsx      # Native ads
│   ├── article/
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleDetail.tsx
│   │   └── ArticleList.tsx
│   ├── github/
│   │   └── TrendingList.tsx
│   └── ui/                         # Shadcn components
├── lib/
│   ├── api.ts                      # GraphQL client
│   └── utils.ts
└── styles/
    └── globals.css
```

### 2.2 Bento Grid Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BENTO GRID LAYOUT                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Desktop (4 columns)                                                │
│   ┌────────────────────────┬──────────────┬──────────────┐          │
│   │                        │              │              │          │
│   │      HERO ARTICLE      │   TRENDING   │   AI TOOL    │          │
│   │        (2x2)           │   GITHUB     │   OF THE     │          │
│   │     (Tin AI nổi bật)   │    (1x2)     │    DAY       │          │
│   │                        │   (AI/ML)    │   (1x1)      │          │
│   │                        │              ├──────────────┤          │
│   │                        │              │  SPONSORED   │          │
│   │                        │              │   (1x1)      │          │
│   └────────────────────────┴──────────────┴──────────────┘          │
│   ┌──────────────┬──────────────┬──────────────┬──────────────┐     │
│   │  AI TOOLS    │  AI NEWS     │ AI TUTORIAL  │ AI VIETNAM   │     │
│   │   (1x1)      │   (1x1)      │   (1x1)      │   (1x1)      │     │
│   └──────────────┴──────────────┴──────────────┴──────────────┘     │
│                                                                      │
│   Mobile (1 column - stacked)                                        │
│   ┌──────────────────────────────────────────────────────────┐      │
│   │                      HERO ARTICLE                         │      │
│   ├──────────────────────────────────────────────────────────┤      │
│   │                  TRENDING GITHUB (AI/ML)                  │      │
│   ├──────────────────────────────────────────────────────────┤      │
│   │                      AI TOOL OF THE DAY                   │      │
│   ├──────────────────────────────────────────────────────────┤      │
│   │                      AI NEWS / TUTORIAL                   │      │
│   └──────────────────────────────────────────────────────────┘      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Tile Types:**

| Tile | Size | CSS Class | Nội dung |
|------|------|-----------|----------|
| **Hero** | 2x2 | `col-span-2 row-span-2` | Breaking AI news, tin AI nổi bật |
| **Tall** | 1x2 | `col-span-1 row-span-2` | Danh sách cuộn (GitHub AI trending) |
| **Standard** | 1x1 | `col-span-1 row-span-1` | Tin AI theo category |
| **Wide** | 2x1 | `col-span-2 row-span-1` | Banner, sponsored AI tools |

---

## 3. BFF Layer

### 3.1 nf-graph - GraphQL Gateway

**Công nghệ:**
- Apollo Server
- GraphQL
- TypeScript

**Schema chính:**

```graphql
# Types
type Article {
  id: ID!
  titleVi: String!
  summaryVi: String
  originalUrl: String!
  thumbnailUrl: String
  category: Category!
  tags: [Tag!]!
  source: Source!
  publishedAt: DateTime!
  tileSize: TileSize!
  isFeatured: Boolean!
}

type GitHubRepo {
  id: ID!
  fullName: String!
  url: String!
  description: String
  descriptionVi: String
  language: String
  starsCount: Int!
  starsToday: Int
  trendingRank: Int
}

type Category {
  id: ID!
  name: String!
  slug: String!
}

type Source {
  id: ID!
  name: String!
  url: String!
}

enum TileSize {
  HERO      # 2x2
  TALL      # 1x2
  STANDARD  # 1x1
  WIDE      # 2x1
}

# Queries
type Query {
  # Home page content
  featuredArticles(limit: Int = 10): [Article!]!
  latestArticles(limit: Int = 20, offset: Int = 0): ArticleConnection!

  # Category
  articlesByCategory(
    categorySlug: String!
    limit: Int = 20
    offset: Int = 0
  ): ArticleConnection!

  # Single article
  article(id: ID!): Article

  # GitHub
  trendingGitHubRepos(
    language: String
    limit: Int = 10
  ): [GitHubRepo!]!

  # Search
  searchArticles(query: String!, limit: Int = 20): [Article!]!

  # Categories
  categories: [Category!]!
}

# Mutations
type Mutation {
  subscribeNewsletter(email: String!): SubscriptionResult!
  confirmSubscription(token: String!): SubscriptionResult!
  unsubscribe(token: String!): SubscriptionResult!
}

# Pagination
type ArticleConnection {
  edges: [ArticleEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type ArticleEdge {
  node: Article!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}
```

---

## 4. Backend Services

### 4.1 Tổng quan Services

| Service | Prefix | Stack | Chức năng |
|---------|--------|-------|-----------|
| **nf-article** | NF | Node.js/TS | CRUD bài viết, phân loại |
| **nf-aggregation** | NF | Node.js/TS | Thu thập tin từ API ngoài |
| **cf-ai-processor** | CF | Node.js/TS | Xử lý AI (tóm tắt, dịch) |
| **df-data-pipeline** | DF | Node.js/TS | Pipeline ETL, cron jobs |
| **uf-subscription** | UF | Node.js/TS | Newsletter, email |
| **sf-monetization** | SF | Node.js/TS | Affiliate, sponsored |
| **pf-auth** | PF | Node.js/TS | Xác thực (tùy chọn) |

### 4.2 nf-article - Quản lý Bài viết

```
nf-article/
├── src/
│   ├── controllers/
│   │   ├── article.controller.ts
│   │   └── category.controller.ts
│   ├── services/
│   │   ├── article.service.ts
│   │   └── category.service.ts
│   ├── repositories/
│   │   ├── article.repository.ts
│   │   └── category.repository.ts
│   ├── models/
│   │   ├── article.model.ts
│   │   ├── category.model.ts
│   │   └── tag.model.ts
│   └── events/
│       ├── article.events.ts
│       └── publishers/
└── package.json
```

**Responsibilities:**
- CRUD operations cho articles
- Quản lý categories và tags
- Phát events khi article thay đổi trạng thái

### 4.3 nf-aggregation - Thu thập Dữ liệu

```
nf-aggregation/
├── src/
│   ├── providers/
│   │   ├── newsdata.provider.ts      # NewsData.io
│   │   ├── github.provider.ts        # GitHub API
│   │   └── base.provider.ts
│   ├── services/
│   │   ├── aggregation.service.ts
│   │   └── deduplication.service.ts
│   ├── filters/
│   │   ├── relevance.filter.ts
│   │   └── spam.filter.ts
│   └── scheduler/
│       └── cron.scheduler.ts
└── package.json
```

**Responsibilities:**
- Fetch dữ liệu từ NewsData.io
- Fetch GitHub trending repos
- Lọc và deduplicate
- Push vào Redis queue

### 4.4 cf-ai-processor - Xử lý AI

```
cf-ai-processor/
├── src/
│   ├── providers/
│   │   ├── gemini.provider.ts        # Primary
│   │   └── openai.provider.ts        # Fallback
│   ├── services/
│   │   ├── summarization.service.ts
│   │   ├── translation.service.ts
│   │   └── categorization.service.ts
│   ├── prompts/
│   │   ├── summarize.prompt.ts
│   │   ├── translate.prompt.ts
│   │   └── categorize.prompt.ts
│   └── workers/
│       └── queue.worker.ts
└── package.json
```

**Responsibilities:**
- Tóm tắt nội dung bằng Gemini/GPT
- Dịch sang tiếng Việt (giữ thuật ngữ AI: LLM, GPT, Transformer, Fine-tuning...)
- Phân loại tự động vào 4 categories: AI Tools, AI News, AI Tutorial, AI Vietnam
- Quản lý token usage và chi phí

### 4.5 df-data-pipeline - Pipeline Dữ liệu

```
df-data-pipeline/
├── src/
│   ├── orchestrator/
│   │   └── pipeline.orchestrator.ts
│   ├── stages/
│   │   ├── fetch.stage.ts
│   │   ├── filter.stage.ts
│   │   ├── process.stage.ts
│   │   ├── store.stage.ts
│   │   └── publish.stage.ts
│   ├── schedulers/
│   │   └── cron.config.ts
│   └── monitors/
│       └── health.monitor.ts
└── package.json
```

**Responsibilities:**
- Orchestrate toàn bộ pipeline
- Schedule cron jobs (15 phút/lần)
- Monitor pipeline health
- Trigger ISR revalidation

### 4.6 uf-subscription - Newsletter

```
uf-subscription/
├── src/
│   ├── services/
│   │   ├── subscription.service.ts
│   │   └── newsletter.service.ts
│   ├── templates/
│   │   ├── welcome.template.ts
│   │   ├── weekly.template.ts
│   │   └── confirm.template.ts
│   └── workers/
│       └── email.worker.ts
└── package.json
```

**Responsibilities:**
- Quản lý subscribers
- Gửi email confirmation
- Generate và gửi weekly newsletter
- Handle unsubscribe

### 4.7 sf-monetization - Kiếm tiền

```
sf-monetization/
├── src/
│   ├── services/
│   │   ├── affiliate.service.ts
│   │   └── sponsored.service.ts
│   ├── models/
│   │   ├── affiliate-link.model.ts
│   │   └── sponsored-tile.model.ts
│   └── analytics/
│       └── click.tracker.ts
└── package.json
```

**Responsibilities:**
- Quản lý affiliate links
- Quản lý sponsored tiles
- Track clicks và conversions
- Generate reports

---

## 5. Data Layer

### 5.1 PostgreSQL (Supabase)

**Schemas:**

| Schema | Mô tả | Tables |
|--------|-------|--------|
| `nf` | News Foundation | article, category, tag, source |
| `cf` | Content Foundation | ai_job, prompt_template |
| `uf` | User Foundation | subscriber, preference |
| `sf` | Store Foundation | affiliate_link, sponsored_tile, click_event |

### 5.2 Redis

**Use cases:**

| Key Pattern | Purpose | TTL |
|-------------|---------|-----|
| `queue:processing` | Processing queue | - |
| `queue:failed` | Failed jobs (DLQ) | 7 days |
| `cache:article:{id}` | Article cache | 5 min |
| `cache:trending` | GitHub trending cache | 1 hour |
| `rate:{ip}` | Rate limiting | 1 min |

---

## 6. External Services

### 6.1 Tích hợp API

| Service | Purpose | Rate Limit | Cost |
|---------|---------|------------|------|
| **NewsData.io** | News aggregation | 200 req/day (free) | $0-79/mo |
| **GitHub API** | Trending repos | 5000 req/hour | Free |
| **Gemini Flash 1.5** | AI processing | - | ~$0.075/1M tokens |
| **OpenAI GPT-4o-mini** | Fallback AI | - | ~$0.15/1M tokens |
| **Resend** | Email delivery | 100/day (free) | $0-20/mo |

### 6.2 Integration Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                     EXTERNAL INTEGRATIONS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────┐         ┌─────────────┐         ┌─────────────┐   │
│   │ NewsData.io │         │ GitHub API  │         │ Resend      │   │
│   │             │         │             │         │             │   │
│   │ - /news     │         │ - /trending │         │ - /emails   │   │
│   │ - /sources  │         │ - /repos    │         │ - /domains  │   │
│   └──────┬──────┘         └──────┬──────┘         └──────┬──────┘   │
│          │                       │                       │          │
│          └───────────────┬───────┴───────────────────────┘          │
│                          │                                          │
│                          ▼                                          │
│          ┌───────────────────────────────┐                          │
│          │      nf-aggregation           │                          │
│          │      df-data-pipeline         │                          │
│          └───────────────┬───────────────┘                          │
│                          │                                          │
│                          ▼                                          │
│   ┌─────────────┐    ┌─────────────┐                               │
│   │ Gemini API  │    │ OpenAI API  │                               │
│   │             │    │             │                               │
│   │ - /generate │    │ - /chat     │                               │
│   │   (primary) │    │  (fallback) │                               │
│   └──────┬──────┘    └──────┬──────┘                               │
│          │                  │                                       │
│          └────────┬─────────┘                                       │
│                   │                                                 │
│                   ▼                                                 │
│          ┌───────────────────────────────┐                          │
│          │      cf-ai-processor          │                          │
│          └───────────────────────────────┘                          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7. Deployment Architecture

### 7.1 Vercel Deployment

```
┌─────────────────────────────────────────────────────────────────────┐
│                      VERCEL DEPLOYMENT                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                    CDN (Edge Network)                        │   │
│   │  - Static assets                                            │   │
│   │  - ISR cached pages                                         │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              ▼                                       │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                 Serverless Functions                         │   │
│   │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │   │
│   │  │ nf-graph    │ │ API routes  │ │ Cron jobs   │            │   │
│   │  │ (GraphQL)   │ │ (REST)      │ │ (scheduled) │            │   │
│   │  └─────────────┘ └─────────────┘ └─────────────┘            │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              ▼                                       │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                   External Services                          │   │
│   │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │   │
│   │  │ Supabase    │ │ Upstash     │ │ External    │            │   │
│   │  │ (Postgres)  │ │ (Redis)     │ │ APIs        │            │   │
│   │  └─────────────┘ └─────────────┘ └─────────────┘            │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.2 ISR Configuration

```typescript
// next.config.js
export default {
  experimental: {
    isrMemoryCacheSize: 50 * 1024 * 1024, // 50MB
  },
}

// app/page.tsx
export const revalidate = 300 // 5 minutes

// app/article/[id]/page.tsx
export const revalidate = 3600 // 1 hour
```

---

## 8. Monitoring và Observability

### 8.1 Metrics

| Metric | Tool | Alert Threshold |
|--------|------|-----------------|
| Response time | Vercel Analytics | > 3s |
| Error rate | Sentry | > 1% |
| Pipeline success | Custom | < 90% |
| API quota usage | Custom | > 80% |
| Cost per day | Custom | > $5 |

### 8.2 Logging

```
┌─────────────────────────────────────────────────────────────────────┐
│                      LOGGING ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Application Logs ────► Vercel Logs ────► Log Drain (optional)     │
│                                                                      │
│   Error Tracking ──────► Sentry                                     │
│                                                                      │
│   Analytics ───────────► Vercel Analytics                           │
│                          PostHog (optional)                         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```
