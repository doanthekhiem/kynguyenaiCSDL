# Tech Stack - KynguyenAI.vn

## 1. Tổng quan Công nghệ

### 1.1 Stack Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        KYNGUYENAI TECH STACK                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   FRONTEND                           BACKEND                         │
│   ┌─────────────────────┐           ┌─────────────────────┐         │
│   │ Next.js 14/15       │           │ Node.js v22 LTS     │         │
│   │ React 18+           │           │ TypeScript 5.x      │         │
│   │ TypeScript          │           │ Apollo GraphQL      │         │
│   └─────────────────────┘           └─────────────────────┘         │
│                                                                      │
│   STYLING                            DATABASE                        │
│   ┌─────────────────────┐           ┌─────────────────────┐         │
│   │ Tailwind CSS 3.x    │           │ PostgreSQL 15       │         │
│   │ Shadcn UI           │           │ Supabase            │         │
│   │ Radix UI            │           │ Redis (Upstash)     │         │
│   └─────────────────────┘           └─────────────────────┘         │
│                                                                      │
│   AI SERVICES                        DEPLOYMENT                      │
│   ┌─────────────────────┐           ┌─────────────────────┐         │
│   │ Gemini Flash 1.5    │           │ Vercel              │         │
│   │ OpenAI GPT-4o-mini  │           │ Supabase Cloud      │         │
│   │                     │           │ Upstash Redis       │         │
│   └─────────────────────┘           └─────────────────────┘         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Tiêu chí Lựa chọn

| Tiêu chí | Yêu cầu | Giải pháp |
|----------|---------|-----------|
| **Chi phí thấp** | Free tier / Pay-as-you-go | Vercel, Supabase, Gemini Flash |
| **Developer Experience** | Type-safe, hot reload | TypeScript, Next.js |
| **Performance** | Fast TTFB, SEO | ISR, React Server Components |
| **Scalability** | Handle traffic spikes | Serverless, CDN |
| **Simplicity** | Easy to maintain | Monorepo, minimal services |

---

## 2. Frontend Stack

### 2.1 Next.js 14/15

**Version:** 14.x hoặc 15.x (App Router)

**Lý do chọn:**
- React Server Components (RSC) giúp giảm JS bundle
- Incremental Static Regeneration (ISR) tối ưu cho news site
- Built-in image optimization
- API Routes cho serverless functions
- Excellent DX với Fast Refresh

**Cấu hình chính:**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  experimental: {
    // Optimize memory for ISR
    isrMemoryCacheSize: 50 * 1024 * 1024,
  },
  images: {
    remotePatterns: [
      { hostname: 'newsdata.io' },
      { hostname: 'avatars.githubusercontent.com' },
    ],
  },
  // Enable React Compiler (Next.js 15)
  reactCompiler: true,
}

export default config
```

### 2.2 React 18+

**Features sử dụng:**
- Server Components
- Suspense for data fetching
- Streaming SSR
- Concurrent rendering

### 2.3 TypeScript 5.x

**Cấu hình:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 2.4 Tailwind CSS 3.x

**Lý do chọn:**
- Utility-first approach phù hợp với rapid development
- Purge CSS giúp bundle size nhỏ
- Dễ dàng implement Dark Mode
- Excellent support cho responsive design

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
        // Custom brand colors
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
      gridTemplateColumns: {
        // Bento grid custom columns
        bento: 'repeat(4, minmax(0, 1fr))',
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

### 2.5 Shadcn UI

**Lý do chọn:**
- Copy-paste components (không phải dependency)
- Built on Radix UI (accessibility)
- Fully customizable
- Dark mode support

**Components sử dụng:**

| Component | Use case |
|-----------|----------|
| `Card` | Article tiles, Bento items |
| `Badge` | Tags, categories |
| `Button` | Actions, CTAs |
| `ScrollArea` | GitHub trending list |
| `Skeleton` | Loading states |
| `Toast` | Notifications |
| `Input` | Newsletter subscription |

---

## 3. Backend Stack

### 3.1 Node.js v22 LTS

**Version:** 22.x (LTS)

**Features:**
- Native ESM support
- Built-in fetch API
- Better performance
- Long-term support

### 3.2 TypeScript

**Shared config với Frontend:**

```json
// packages/shared/tsconfig.base.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

### 3.3 Apollo GraphQL

**Server:**

```typescript
// packages/nf-graph/src/server.ts
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
})

export default startServerAndCreateNextHandler(server)
```

**Client:**

```typescript
// packages/nf-web/src/lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    fetch,
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first',
    },
  },
})
```

---

## 4. Database Stack

### 4.1 PostgreSQL 15 (Supabase)

**Lý do chọn Supabase:**
- Managed PostgreSQL
- Built-in Auth (nếu cần)
- Realtime subscriptions
- Free tier generous (500MB)
- REST và GraphQL API tự động

**Connection:**

```typescript
// packages/shared/src/db/client.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)
```

### 4.2 Redis (Upstash)

**Lý do chọn Upstash:**
- Serverless Redis
- HTTP-based (works in Edge)
- Pay-per-request
- Free tier (10K commands/day)

**Connection:**

```typescript
// packages/shared/src/queue/redis.ts
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Queue operations
export const queue = {
  async push(job: Job) {
    await redis.lpush('queue:processing', JSON.stringify(job))
  },

  async pop() {
    const data = await redis.rpop('queue:processing')
    return data ? JSON.parse(data) : null
  },
}
```

---

## 5. AI Services

### 5.1 Google Gemini Flash 1.5 (Primary)

**Lý do chọn:**
- Chi phí rẻ (~$0.075/1M input tokens)
- Tốc độ nhanh
- Context window lớn (1M tokens)
- Chất lượng tốt cho summarization

**Integration:**

```typescript
// packages/cf-ai-processor/src/providers/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.3,
    maxOutputTokens: 1024,
  },
})

export async function summarize(content: string): Promise<string> {
  const prompt = `
    Bạn là Biên tập viên chuyên về AI. Hãy tóm tắt bài viết sau thành 3 điểm chính.
    Giữ nguyên thuật ngữ AI (LLM, GPT, Transformer, Fine-tuning, Prompt Engineering, RAG...).

    Bài viết:
    ${content}
  `

  const result = await model.generateContent(prompt)
  return result.response.text()
}
```

### 5.2 OpenAI GPT-4o-mini (Fallback)

**Lý do làm fallback:**
- Ổn định cao
- Chất lượng tốt khi Gemini gặp vấn đề
- Chi phí hợp lý (~$0.15/1M input tokens)

**Integration:**

```typescript
// packages/cf-ai-processor/src/providers/openai.ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function summarize(content: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'Bạn là Biên tập viên chuyên về AI, giữ nguyên thuật ngữ AI khi dịch...',
      },
      {
        role: 'user',
        content: `Tóm tắt bài viết AI sau:\n\n${content}`,
      },
    ],
    temperature: 0.3,
    max_tokens: 1024,
  })

  return response.choices[0].message.content || ''
}
```

### 5.3 Chi phí AI ước tính

| Scenario | Volume | Gemini Cost | OpenAI Cost |
|----------|--------|-------------|-------------|
| MVP (50 articles/day) | ~500K tokens/day | ~$1.1/month | ~$2.3/month |
| Growth (200 articles/day) | ~2M tokens/day | ~$4.5/month | ~$9/month |
| Scale (500 articles/day) | ~5M tokens/day | ~$11/month | ~$23/month |

---

## 6. External APIs

### 6.1 NewsData.io

**Pricing:**

| Plan | Price | Requests | Features |
|------|-------|----------|----------|
| Free | $0 | 200/day | Basic |
| Basic | $79/month | 50K/month | full_content |
| Professional | $179/month | 200K/month | Historical |

**Integration:**

```typescript
// packages/nf-aggregation/src/providers/newsdata.ts
const NEWSDATA_API = 'https://newsdata.io/api/1/news'

interface NewsDataResponse {
  status: string
  totalResults: number
  results: Article[]
  nextPage?: string
}

export async function fetchAINews(page?: string): Promise<NewsDataResponse> {
  const params = new URLSearchParams({
    apikey: process.env.NEWSDATA_API_KEY!,
    category: 'technology,science',
    language: 'en',
    q: 'AI OR "artificial intelligence" OR ChatGPT OR GPT OR LLM OR "machine learning"',
    full_content: '1', // Paid feature
  })

  if (page) {
    params.set('page', page)
  }

  const response = await fetch(`${NEWSDATA_API}?${params}`)
  return response.json()
}
```

### 6.2 GitHub API

**Rate Limit:** 5,000 requests/hour (authenticated)

**Integration:**

```typescript
// packages/nf-aggregation/src/providers/github.ts
const GITHUB_API = 'https://api.github.com'

export async function fetchAITrendingRepos(language?: string) {
  // GitHub doesn't have official trending API
  // Use github-trending-api or scrape
  const date = new Date()
  date.setDate(date.getDate() - 7)
  const since = date.toISOString().split('T')[0]

  // Focus on AI/ML repositories
  const aiTopics = 'topic:machine-learning OR topic:deep-learning OR topic:llm OR topic:ai OR topic:gpt OR topic:transformers'
  const query = language
    ? `language:${language} (${aiTopics}) created:>${since}`
    : `(${aiTopics}) created:>${since}`

  const response = await fetch(
    `${GITHUB_API}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  )

  return response.json()
}
```

### 6.3 Resend (Email)

**Pricing:**

| Plan | Price | Emails/month |
|------|-------|--------------|
| Free | $0 | 100/day |
| Pro | $20/month | 50K |

**Integration:**

```typescript
// packages/uf-subscription/src/providers/resend.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendNewsletter(
  to: string[],
  subject: string,
  html: string
) {
  const { data, error } = await resend.emails.send({
    from: 'KynguyenAI <newsletter@kynguyenai.vn>',
    to,
    subject,
    html,
  })

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`)
  }

  return data
}
```

---

## 7. Deployment Stack

### 7.1 Vercel

**Lý do chọn:**
- Native Next.js support
- Automatic CI/CD
- Edge Network (CDN)
- Serverless Functions
- Free tier generous

**Cấu hình:**

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "crons": [
    {
      "path": "/api/cron/fetch-news",
      "schedule": "*/15 * * * *"
    },
    {
      "path": "/api/cron/send-newsletter",
      "schedule": "0 8 * * 1"
    }
  ]
}
```

### 7.2 Environment Variables

```bash
# .env.example

# Database
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx

# Redis
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# AI
GEMINI_API_KEY=xxx
OPENAI_API_KEY=xxx

# External APIs
NEWSDATA_API_KEY=xxx
GITHUB_TOKEN=xxx

# Email
RESEND_API_KEY=xxx

# App
NEXT_PUBLIC_APP_URL=https://kynguyenai.vn
NEXT_PUBLIC_GRAPHQL_URL=/api/graphql
```

---

## 8. Development Tools

### 8.1 Package Manager

**pnpm** - Fast, disk space efficient

```bash
# Install
npm install -g pnpm

# Workspace setup
pnpm init
```

### 8.2 Monorepo Structure

```
kynguyenai/
├── apps/
│   └── web/                 # Next.js app
├── packages/
│   ├── shared/              # Shared utilities, types
│   ├── nf-graph/            # GraphQL server
│   ├── nf-aggregation/      # News fetching
│   ├── cf-ai-processor/     # AI processing
│   └── uf-subscription/     # Newsletter
├── pnpm-workspace.yaml
├── package.json
└── turbo.json
```

### 8.3 Code Quality

| Tool | Purpose |
|------|---------|
| ESLint | Linting |
| Prettier | Formatting |
| TypeScript | Type checking |
| Husky | Git hooks |
| lint-staged | Pre-commit checks |

```json
// package.json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "prepare": "husky install"
  }
}
```

---

## 9. Tổng kết Chi phí

### 9.1 MVP Phase (Tháng 1-2)

| Service | Plan | Cost/month |
|---------|------|------------|
| Vercel | Hobby | $0 |
| Supabase | Free | $0 |
| Upstash Redis | Free | $0 |
| NewsData.io | Free | $0 |
| Gemini | Pay-as-you-go | ~$2 |
| Resend | Free | $0 |
| Domain | .vn | ~$10/year |
| **Total** | | **~$2/month** |

### 9.2 Growth Phase (Tháng 3-6)

| Service | Plan | Cost/month |
|---------|------|------------|
| Vercel | Pro | $20 |
| Supabase | Pro | $25 |
| Upstash Redis | Pay-as-you-go | $5 |
| NewsData.io | Basic | $79 |
| Gemini | Pay-as-you-go | ~$10 |
| Resend | Pro | $20 |
| **Total** | | **~$160/month** |
