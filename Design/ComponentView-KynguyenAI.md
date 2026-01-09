# COMPONENT VIEW - KYNGUYENAI.VN (NEWS AGGREGATOR)

# TỔNG QUAN KIẾN TRÚC HỆ THỐNG

## 1. Kiến trúc Tổng quan

KynguyenAI.vn được thiết kế theo mô hình **News Aggregator Architecture** với **AI-Powered Content Pipeline**, tận dụng tối đa sức mạnh của Next.js 15 App Router, Bento Grid UI và các AI APIs để tự động tuyển chọn, dịch và trình bày tin tức công nghệ.

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    KYNGUYENAI.VN - NEWS AGGREGATOR ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│  │                              CLIENT LAYER                                        │ │
│  │  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐                │ │
│  │  │   Web Browser   │   │  Mobile Browser │   │   Social Share  │                │ │
│  │  │   (Desktop)     │   │   (PWA Ready)   │   │   (OG Preview)  │                │ │
│  │  └────────┬────────┘   └────────┬────────┘   └────────┬────────┘                │ │
│  │           │                     │                     │                          │ │
│  │           └─────────────────────┴─────────────────────┘                          │ │
│  │                                 │                                                 │ │
│  └─────────────────────────────────┼─────────────────────────────────────────────────┘ │
│                                    │                                                   │
│                                    ▼                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│  │                         FRONTEND APPLICATION LAYER                               │ │
│  │                              (Next.js 15 App Router)                             │ │
│  │  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐                │ │
│  │  │  Homepage       │   │  Category Pages │   │  Article Detail │                │ │
│  │  │  (Bento Grid)   │   │  (Frontend/AI)  │   │  (Vietnamese)   │                │ │
│  │  └────────┬────────┘   └────────┬────────┘   └────────┬────────┘                │ │
│  │           │                     │                     │                          │ │
│  │  ┌────────┴─────────────────────┴─────────────────────┴────────┐                │ │
│  │  │         REACT COMPONENTS (Bento Grid + Dark Mode)            │                │ │
│  │  │         • NewsTile (1x1, 1x2, 2x1, 2x2)                      │                │ │
│  │  │         • DebateTile (AI Debate Widget)                      │                │ │
│  │  │         • GitHubTrendingTile                                 │                │ │
│  │  │         • AffiliateTile, SponsoredTile                       │                │ │
│  │  └──────────────────────────────┬───────────────────────────────┘                │ │
│  │                                 │                                                 │ │
│  │  ┌──────────────────────────────┴───────────────────────────────┐                │ │
│  │  │           STATE MANAGEMENT (Zustand + SWR)                   │                │ │
│  │  └──────────────────────────────────────────────────────────────┘                │ │
│  └─────────────────────────────────┼─────────────────────────────────────────────────┘ │
│                                    │                                                   │
│                                    ▼                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│  │                              API LAYER                                           │ │
│  │                       (Next.js API Routes + Edge Functions)                      │ │
│  │  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐                │ │
│  │  │ /api/news/*     │   │ /api/ai/*       │   │ /api/github/*   │                │ │
│  │  │ News fetching   │   │ AI Translation  │   │ Trending repos  │                │ │
│  │  └────────┬────────┘   └────────┬────────┘   └────────┬────────┘                │ │
│  │           │                     │                     │                          │ │
│  │  ┌────────┴─────────────────────┴─────────────────────┴────────┐                │ │
│  │  │              Vercel AI SDK (for streaming translation)       │                │ │
│  │  └──────────────────────────────┬───────────────────────────────┘                │ │
│  └─────────────────────────────────┼─────────────────────────────────────────────────┘ │
│                                    │                                                   │
│         ┌──────────────────────────┼──────────────────────────┐                       │
│         │                          │                          │                       │
│         ▼                          ▼                          ▼                       │
│  ┌─────────────────┐   ┌─────────────────────┐   ┌─────────────────┐                 │
│  │  NEWS SOURCES   │   │    DATA LAYER       │   │  AI PROVIDERS   │                 │
│  │  ─────────────  │   │    ───────────      │   │  ─────────────  │                 │
│  │  • NewsData.io  │   │  Supabase           │   │  • Gemini       │                 │
│  │  • GitHub API   │   │  • PostgreSQL       │   │    Flash 1.5    │                 │
│  │  • Manual Feed  │   │  • Full-text        │   │  • OpenAI       │                 │
│  │                 │   │    Search           │   │    (fallback)   │                 │
│  └─────────────────┘   └─────────────────────┘   └─────────────────┘                 │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. COMPONENT BREAKDOWN

### 2.1 Client Layer

| Component | Technology | Mô tả |
|-----------|-----------|-------|
| **Web Browser (Desktop)** | Modern browsers | Chrome, Firefox, Safari, Edge - Bento Grid layout |
| **Mobile Browser (PWA)** | Responsive + PWA | iOS Safari, Chrome Android - Single column layout |
| **Social Share Preview** | Open Graph meta | Facebook, Twitter, LinkedIn preview cards |

### 2.2 Frontend Application Layer

| Component | Technology | Mô tả |
|-----------|-----------|-------|
| **kynguyenai-web** | Next.js 15 (App Router) | Main application với ISR (Incremental Static Regeneration) |
| **Homepage** | React + Bento Grid | Trang chủ với dynamic Bento Grid layout |
| **Category Pages** | React + Filtering | Frontend, Backend, AI, API, DevOps categories |
| **Article Detail** | React + Markdown | Bài viết chi tiết với bản dịch tiếng Việt |
| **AI Debate Widget** | React + Streaming | Real-time AI debate display |
| **State Management** | Zustand | Global state cho filters, user preferences |
| **Data Fetching** | SWR | Client-side data fetching với caching |

### 2.3 API Layer (Backend for Frontend)

| API Route | Chức năng | Technology |
|-----------|-----------|------------|
| **/api/news/fetch** | Lấy tin tức từ NewsData.io | Edge Function |
| **/api/news/translate** | Dịch bài viết sang tiếng Việt | Edge Function + Gemini |
| **/api/ai/debate** | Generate AI debate | Streaming API + Gemini |
| **/api/github/trending** | Lấy GitHub trending repos | Edge Function |
| **/api/search** | Full-text search tiếng Việt | Edge Function + PostgreSQL |
| **/api/newsletter/subscribe** | Đăng ký newsletter | Edge Function + Resend |

### 2.4 News Sources Layer

| Provider | Data Source | Refresh Rate | Cost |
|----------|------------|--------------|------|
| **NewsData.io** | Global tech news (Hacker News, TechCrunch, etc.) | Mỗi 1 giờ | $99/tháng |
| **GitHub API** | Trending repositories (TypeScript, JavaScript, Python, etc.) | Mỗi 6 giờ | Miễn phí |
| **Manual Feed** | Editor-curated important news | On-demand | Miễn phí |

### 2.5 AI Provider Layer

| Provider | Model | Use Case | Cost |
|----------|-------|----------|------|
| **Google Gemini** | Flash 1.5 | Vietnamese translation | ~$50/tháng (1M articles × $0.002) |
| **OpenAI** | GPT-4o mini | Fallback translation | $0.15/1M input tokens |

### 2.6 Data Layer

| Component | Technology | Mô tả |
|-----------|-----------|-------|
| **Supabase PostgreSQL** | PostgreSQL 15 | Primary database cho articles, users, subscriptions |
| **Full-text Search** | PostgreSQL tsvector | Tìm kiếm tiếng Việt |
| **Supabase Auth** | Built-in Auth | Authentication cho premium users |
| **Row Level Security** | PostgreSQL RLS | Data isolation per user |

### 2.7 Storage Layer

| Bucket | Content Type | Access |
|--------|-------------|--------|
| **article-images** | Thumbnail images từ news sources | Public CDN |
| **og-images** | Open Graph images cho social share | Public CDN |

---

## 3. FRONTEND COMPONENTS DETAIL

### 3.1 Page Structure (Next.js App Router)

```
app/
├── (main)/
│   ├── page.tsx                    # Homepage với Bento Grid
│   ├── [category]/
│   │   └── page.tsx               # Category pages (frontend, ai, api, etc.)
│   ├── article/
│   │   └── [slug]/
│   │       └── page.tsx           # Article detail page
│   └── layout.tsx                 # Main layout với header/footer
│
├── (features)/
│   ├── debate/
│   │   └── [debateId]/
│   │       └── page.tsx           # AI Debate detail page
│   ├── search/
│   │   └── page.tsx               # Search results page
│   └── newsletter/
│       └── page.tsx               # Newsletter subscription
│
├── api/
│   ├── news/
│   │   ├── fetch/route.ts
│   │   ├── translate/route.ts
│   │   └── [id]/route.ts
│   ├── ai/
│   │   ├── debate/route.ts
│   │   └── translate/route.ts
│   ├── github/
│   │   └── trending/route.ts
│   ├── search/
│   │   └── route.ts
│   └── newsletter/
│       └── subscribe/route.ts
│
└── layout.tsx                      # Root layout
```

### 3.2 React Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                      COMPONENT HIERARCHY                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  <RootLayout>                                                    │
│  ├── <Providers>                                                 │
│  │   ├── <ZustandProvider>      # State management               │
│  │   ├── <SupabaseProvider>     # Auth context                   │
│  │   └── <ThemeProvider>        # Dark mode (default)            │
│  │                                                               │
│  ├── <HomePage>                                                  │
│  │   ├── <Header>               # Navigation + search            │
│  │   ├── <BentoGrid>            # Main content grid              │
│  │   │   ├── <HeroTile>         # 2x2 breaking news              │
│  │   │   ├── <NewsTile>         # 1x1 regular news               │
│  │   │   ├── <FeaturedTile>     # 1x2 featured article           │
│  │   │   ├── <DebateTile>       # 2x2 AI debate                  │
│  │   │   ├── <GitHubTile>       # 2x1 trending repos             │
│  │   │   ├── <AffiliateTile>    # 1x1 affiliate product          │
│  │   │   └── <SponsoredTile>    # Sponsored content              │
│  │   ├── <CategoryFilter>       # Filter by Frontend/AI/etc.     │
│  │   └── <Footer>               # Links + newsletter CTA         │
│  │                                                               │
│  ├── <CategoryPage>                                              │
│  │   ├── <Header>                                                │
│  │   ├── <CategoryHero>         # Category description           │
│  │   ├── <ArticleList>          # Filtered articles              │
│  │   │   ├── <ArticleCard>      # Article preview card           │
│  │   │   └── <LoadMore>         # Pagination                     │
│  │   └── <Footer>                                                │
│  │                                                               │
│  ├── <ArticleDetailPage>                                         │
│  │   ├── <Header>                                                │
│  │   ├── <ArticleHeader>        # Title, date, source            │
│  │   ├── <ArticleContent>       # Vietnamese translation         │
│  │   │   ├── <MarkdownRenderer> # Render markdown content        │
│  │   │   └── <CodeBlock>        # Syntax highlighted code        │
│  │   ├── <OriginalLink>         # Link to original article       │
│  │   ├── <ShareButtons>         # Social share                   │
│  │   ├── <RelatedArticles>      # Similar articles               │
│  │   └── <Footer>                                                │
│  │                                                               │
│  ├── <DebatePage>                                                │
│  │   ├── <Header>                                                │
│  │   ├── <DebateHeader>         # Debate topic                   │
│  │   ├── <DebateContent>        # Two-column AI arguments        │
│  │   │   ├── <ArgumentColumn>   # Left: AI Agent 1               │
│  │   │   └── <ArgumentColumn>   # Right: AI Agent 2              │
│  │   ├── <VoteWidget>           # User voting                    │
│  │   └── <Footer>                                                │
│  │                                                               │
│  └── <SearchPage>                                                │
│      ├── <Header>                                                │
│      ├── <SearchBar>            # Search input                   │
│      ├── <SearchResults>        # Results list                   │
│      │   └── <ArticleCard>      # Article preview                │
│      └── <Footer>                                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 State Management (Zustand Stores)

```typescript
// stores/newsStore.ts
interface NewsState {
  // Filters
  selectedCategory: 'all' | 'frontend' | 'backend' | 'api' | 'ai' | 'devops';
  dateRange: 'today' | 'week' | 'month';

  // Articles
  articles: Article[];
  featuredArticle: Article | null;

  // Actions
  setCategory: (category: string) => void;
  fetchArticles: () => Promise<void>;
  searchArticles: (query: string) => Promise<Article[]>;
}

// stores/userStore.ts
interface UserState {
  user: User | null;
  subscription: 'free' | 'premium';
  preferences: {
    theme: 'dark' | 'light';
    language: 'vi' | 'en';
    notifications: boolean;
  };

  updatePreferences: (prefs: Partial<Preferences>) => void;
}

// stores/debateStore.ts
interface DebateState {
  currentDebate: Debate | null;
  pastDebates: Debate[];
  userVotes: Map<string, 'agent1' | 'agent2'>;

  loadDebate: (debateId: string) => Promise<void>;
  vote: (debateId: string, choice: 'agent1' | 'agent2') => void;
}
```

---

## 4. BENTO GRID LAYOUT SYSTEM

### 4.1 Grid Configuration

```typescript
// Bento Grid Layout Structure
const bentoGridLayout = {
  desktop: {
    columns: 4,
    rows: 'auto',
    gap: '16px',
    tiles: [
      { type: 'hero', size: '2x2', position: [0, 0] },      // Breaking news
      { type: 'featured', size: '1x2', position: [2, 0] },  // Featured article
      { type: 'news', size: '1x1', position: [3, 0] },      // Regular news
      { type: 'news', size: '1x1', position: [3, 1] },
      { type: 'debate', size: '2x2', position: [0, 2] },    // AI debate
      { type: 'github', size: '2x1', position: [2, 2] },    // GitHub trending
      { type: 'affiliate', size: '1x1', position: [2, 3] }, // Affiliate
      { type: 'sponsored', size: '1x1', position: [3, 3] }, // Sponsored
      // ... more tiles
    ]
  },
  mobile: {
    columns: 1,
    rows: 'auto',
    gap: '12px',
    // All tiles collapse to 1x1 or 1x2
  }
};
```

### 4.2 Tile Types

| Tile Type | Size | Content | Refresh Rate |
|-----------|------|---------|--------------|
| **HeroTile** | 2x2 | Breaking news với large image | Real-time |
| **FeaturedTile** | 1x2 | Featured article với excerpt | Mỗi giờ |
| **NewsTile** | 1x1 | Regular news với thumbnail | Mỗi giờ |
| **DebateTile** | 2x2 | AI debate với streaming | Mỗi ngày |
| **GitHubTile** | 2x1 | Trending repos list | Mỗi 6 giờ |
| **AffiliateTile** | 1x1 | Affiliate product | Static |
| **SponsoredTile** | 1x1 | Sponsored content | Static |

---

## 5. API LAYER DETAIL

### 5.1 News Pipeline Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      NEWS PROCESSING PIPELINE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   External News Source (NewsData.io)                             │
│        │                                                          │
│        ▼                                                          │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              STEP 1: FETCH & FILTER                      │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  • Fetch từ NewsData.io API                             │   │
│   │  • Filter: keywords (React, Next.js, AI, API, etc.)     │   │
│   │  • Filter: domains (dev.to, hackernews, techcrunch)     │   │
│   │  • Deduplicate: remove duplicates                       │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              STEP 2: AI TRANSLATION                      │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  • Send to Gemini Flash 1.5                             │   │
│   │  • Prompt: Translate to Vietnamese, keep tech terms     │   │
│   │  • Output: Vietnamese summary + title                   │   │
│   │  • Store original + translation                         │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              STEP 3: CATEGORIZATION                      │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  • Auto-categorize: Frontend, Backend, AI, API, DevOps  │   │
│   │  • Extract tags: React, TypeScript, Next.js, etc.       │   │
│   │  • Calculate relevance score                            │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              STEP 4: STORAGE & INDEX                     │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  • Save to PostgreSQL (articles table)                  │   │
│   │  • Create full-text search index (tsvector)             │   │
│   │  • Generate OG image                                    │   │
│   │  • Trigger ISR revalidation                             │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 AI Debate Generation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI DEBATE GENERATION FLOW                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   Daily Cron Job (9:00 AM Vietnam time)                         │
│        │                                                          │
│        ▼                                                          │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              SELECT DEBATE TOPIC                         │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  • Predefined topics: "React vs Vue", "TypeScript vs JS" │   │
│   │  • Or: Trending topic from recent articles              │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              GENERATE ARGUMENTS                          │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  • AI Agent 1: Pro argument (3 rounds)                  │   │
│   │  • AI Agent 2: Con argument (3 rounds)                  │   │
│   │  • Each round: 200-300 words in Vietnamese              │   │
│   │  • Use Gemini Flash 1.5 for cost efficiency             │   │
│   └────────────────────────┬────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              STORE & PUBLISH                             │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │  • Save to debates table                                 │   │
│   │  • Update homepage Bento Grid                            │   │
│   │  • Enable user voting                                    │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. DATA LAYER DETAIL

### 6.1 Database Schema Overview

```sql
-- Articles Table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  title_vi VARCHAR(500) NOT NULL,
  summary TEXT NOT NULL,
  summary_vi TEXT NOT NULL,
  content TEXT,
  content_vi TEXT,
  source_url TEXT NOT NULL,
  source_name VARCHAR(100),
  category VARCHAR(50) NOT NULL, -- frontend, backend, ai, api, devops
  tags TEXT[], -- [react, typescript, nextjs]
  image_url TEXT,
  published_at TIMESTAMPTZ NOT NULL,
  relevance_score INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Full-text search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('vietnamese', coalesce(title_vi, '')), 'A') ||
    setweight(to_tsvector('vietnamese', coalesce(summary_vi, '')), 'B')
  ) STORED
);

CREATE INDEX articles_search_idx ON articles USING GIN (search_vector);
CREATE INDEX articles_category_idx ON articles (category);
CREATE INDEX articles_published_idx ON articles (published_at DESC);

-- Debates Table
CREATE TABLE debates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic VARCHAR(500) NOT NULL,
  description TEXT,
  agent1_name VARCHAR(100),
  agent2_name VARCHAR(100),
  agent1_arguments JSONB, -- [{round: 1, text: "..."}]
  agent2_arguments JSONB,
  votes_agent1 INTEGER DEFAULT 0,
  votes_agent2 INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active', -- active, archived
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GitHub Trending Table
CREATE TABLE github_trending (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_name VARCHAR(200) NOT NULL,
  repo_url TEXT NOT NULL,
  description TEXT,
  description_vi TEXT,
  language VARCHAR(50),
  stars INTEGER,
  stars_today INTEGER,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users & Subscriptions
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) NOT NULL,
  subscription_tier VARCHAR(20) DEFAULT 'free', -- free, premium
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- User Preferences
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  theme VARCHAR(20) DEFAULT 'dark',
  preferred_categories TEXT[],
  email_frequency VARCHAR(20) DEFAULT 'weekly' -- daily, weekly, monthly
);
```

---

## 7. EXTERNAL INTEGRATIONS

### 7.1 Integration Matrix

| Service | API | Auth Method | Rate Limit | Cost |
|---------|-----|-------------|------------|------|
| **NewsData.io** | REST | API Key | 200 requests/hour | $99/month |
| **GitHub API** | REST | Token | 5000 requests/hour | Free |
| **Gemini Flash 1.5** | REST + Streaming | API Key | No strict limit | $0.002/1K tokens |
| **Resend** | REST | API Key | 3000 emails/month | $20/month |

### 7.2 Cron Jobs Schedule

| Job | Frequency | Function | Runtime |
|-----|-----------|----------|---------|
| **fetch-news** | Mỗi 1 giờ | Fetch news từ NewsData.io | Edge Function |
| **translate-articles** | Mỗi 1 giờ | Translate new articles | Edge Function |
| **github-trending** | Mỗi 6 giờ | Fetch GitHub trending | Edge Function |
| **generate-debate** | Mỗi ngày 9:00 AM | Generate daily AI debate | Serverless Function |
| **send-newsletter** | Thứ 2 8:00 AM | Send weekly newsletter | Serverless Function |

---

## 8. DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    VERCEL PLATFORM                       │   │
│   │  ─────────────────────────────────────────────────────  │   │
│   │                                                          │   │
│   │  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   │   │
│   │  │   Edge      │   │  Serverless │   │   Static    │   │   │
│   │  │  Functions  │   │  Functions  │   │   Assets    │   │   │
│   │  │  (Global)   │   │  (Regional) │   │   (ISR)     │   │   │
│   │  └─────────────┘   └─────────────┘   └─────────────┘   │   │
│   │        │                 │                 │             │   │
│   │        └─────────────────┴─────────────────┘             │   │
│   │                          │                               │   │
│   │                    Vercel Edge Network                   │   │
│   │              (Global CDN with ISR caching)               │   │
│   │                                                          │   │
│   └──────────────────────────┬──────────────────────────────┘   │
│                              │                                    │
│         ┌────────────────────┼────────────────────┐              │
│         │                    │                    │              │
│         ▼                    ▼                    ▼              │
│   ┌───────────┐       ┌───────────┐       ┌───────────┐         │
│   │ Supabase  │       │ News APIs │       │ Analytics │         │
│   │           │       │           │       │           │         │
│   │ •PostgreSQL       │ •NewsData │       │ •Vercel   │         │
│   │ •Auth     │       │  .io      │       │  Analytics│         │
│   │ •Storage  │       │ •GitHub   │       │ •Sentry   │         │
│   └───────────┘       └───────────┘       └───────────┘         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 8.1 ISR Strategy

| Page Type | Revalidation Time | Reason |
|-----------|------------------|--------|
| **Homepage** | 300s (5 phút) | Fresh content mà vẫn fast |
| **Category Pages** | 600s (10 phút) | Balanced freshness |
| **Article Detail** | 3600s (1 giờ) | Static content, rarely changes |
| **Debate Page** | on-demand | Generated daily, no auto-revalidate |

---

## 9. PERFORMANCE OPTIMIZATION

### 9.1 Frontend Optimizations

| Technique | Implementation | Impact |
|-----------|---------------|--------|
| **ISR** | Next.js ISR với revalidation | Fast load times |
| **Image Optimization** | next/image + Vercel Image Optimization | 60% faster images |
| **Font Optimization** | next/font với subsets | No layout shift |
| **Code Splitting** | Next.js App Router auto-splitting | Smaller bundles |
| **Prefetching** | Prefetch category pages | Instant navigation |

### 9.2 Backend Optimizations

| Technique | Implementation | Impact |
|-----------|---------------|--------|
| **Edge Caching** | Vercel Edge Network | <100ms global latency |
| **Database Indexing** | PostgreSQL indexes on category, date | Fast queries |
| **Connection Pooling** | Supabase built-in pooling | Handle burst traffic |
| **Rate Limiting** | Upstash Redis | Prevent abuse |

---

## 10. SECURITY CONSIDERATIONS

### 10.1 API Key Protection

| Key Type | Storage | Access |
|----------|---------|--------|
| NewsData.io API Key | Vercel Environment Variables | Server-side only |
| GitHub Token | Vercel Environment Variables | Server-side only |
| Gemini API Key | Vercel Environment Variables | Server-side only |
| Supabase Anon Key | Public (client-side) | RLS protected |

### 10.2 Rate Limiting

| Endpoint | Free Tier | Premium Tier |
|----------|-----------|--------------|
| /api/search | 30 requests/hour | Unlimited |
| /api/newsletter/subscribe | 5 requests/day | N/A |
| Homepage | No limit | No limit |

---

**Tài liệu liên quan:**
- [BusinessContextVision-KynguyenAI-v2.md](./BusinessContextVision-KynguyenAI-v2.md) - Tầm nhìn kinh doanh
- [Tech-Stack-KynguyenAI.md](./Tech-Stack-KynguyenAI.md) - Chi tiết công nghệ
