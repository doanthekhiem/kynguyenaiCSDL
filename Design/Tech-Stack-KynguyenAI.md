# Technology Stacks - kynguyenAI.vn

Đây là các stacks được sử dụng trong toàn bộ dự án kynguyenAI.vn, từ Frontend → Animation → AI Integration → Backend → Database → Deployment.

---

## 1. FRONTEND STACK

### 1.1 Core Framework

| Technology | Version | Mô tả |
|------------|---------|-------|
| **Next.js** | 15.x | React framework với App Router, Server Components, API Routes |
| **React** | 19.x | UI library với concurrent features |
| **TypeScript** | 5.x | Type safety cho toàn bộ codebase |

### 1.2 UI & Styling

| Technology | Version | Mô tả |
|------------|---------|-------|
| **Tailwind CSS** | 3.4.x | Utility-first CSS framework |
| **Shadcn/ui** | Latest | Pre-built accessible components |
| **Radix UI** | Latest | Headless UI primitives |
| **Lucide Icons** | Latest | Icon library |

### 1.3 Animation & 3D

| Technology | Version | Mô tả |
|------------|---------|-------|
| **GSAP** | 3.12.x | GreenSock Animation Platform |
| **GSAP ScrollTrigger** | 3.12.x | Scroll-based animations |
| **React Three Fiber** | 8.x | React renderer cho Three.js |
| **Three.js** | 0.160.x | 3D graphics library |
| **@react-three/drei** | 9.x | Useful helpers cho R3F |
| **Framer Motion** | 11.x | Alternative animation library (simple animations) |

### 1.4 State Management

| Technology | Version | Mô tả |
|------------|---------|-------|
| **Zustand** | 4.5.x | Lightweight state management |
| **SWR** | 2.x | Data fetching và caching |

---

## 2. AI INTEGRATION STACK

### 2.1 AI SDK & Orchestration

| Technology | Provider | Mô tả |
|------------|----------|-------|
| **Vercel AI SDK** | Vercel | Unified interface cho AI providers |
| **@ai-sdk/openai** | OpenAI | GPT-4o, GPT-4o-mini |
| **@ai-sdk/anthropic** | Anthropic | Claude 3.5 Sonnet |
| **@ai-sdk/google** | Google | Gemini (backup) |

### 2.2 AI Models - Text Generation

| Model | Provider | Use Case | Cost |
|-------|----------|----------|------|
| **GPT-4o** | OpenAI | Logic, data processing, Vietnamese | $2.5/1M input, $10/1M output |
| **GPT-4o-mini** | OpenAI | Fast responses, simple tasks | $0.15/1M input, $0.6/1M output |
| **Claude 3.5 Sonnet** | Anthropic | Creative writing, storytelling | $3/1M input, $15/1M output |

### 2.3 AI Models - Image Generation

| Model | Provider | Use Case | Cost | Speed |
|-------|----------|----------|------|-------|
| **Flux.1 Pro** | Replicate/Fal.ai | High-quality postcards | ~$0.05/image | 10-15s |
| **Flux.1 Schnell** | Replicate/Fal.ai | Fast previews | ~$0.01/image | 2-3s |
| **SDXL Turbo** | Groq/DeepInfra | Free tier thumbnails | ~$0.001/image | <1s |
| **DALL-E 3** | OpenAI | Backup option | $0.04/image | 15-20s |

### 2.4 AI Models - Embeddings (RAG)

| Model | Provider | Dimensions | Cost |
|-------|----------|------------|------|
| **text-embedding-3-small** | OpenAI | 1536 | $0.02/1M tokens |
| **text-embedding-3-large** | OpenAI | 3072 | $0.13/1M tokens |

---

## 3. BACKEND STACK

### 3.1 API Layer

| Technology | Mô tả |
|------------|-------|
| **Next.js API Routes** | Serverless API endpoints |
| **Edge Functions** | Low-latency global execution |
| **Vercel AI SDK (Core)** | streamText(), streamObject() |

### 3.2 Authentication

| Technology | Provider | Mô tả |
|------------|----------|-------|
| **Supabase Auth** | Supabase | Built-in authentication |
| **OAuth 2.0** | Google, Facebook | Social login |
| **Magic Links** | Supabase | Passwordless login |

### 3.3 Queue & Background Jobs

| Technology | Mô tả |
|------------|-------|
| **Vercel KV** | Redis-compatible KV store cho queue |
| **Inngest** | Background job processing (alternative) |

---

## 4. DATABASE STACK

### 4.1 Primary Database

| Technology | Provider | Mô tả |
|------------|----------|-------|
| **PostgreSQL** | Supabase | Relational database |
| **pgvector** | Supabase | Vector embeddings cho RAG |
| **Row Level Security** | Supabase | Data isolation |

### 4.2 Storage

| Technology | Provider | Mô tả |
|------------|----------|-------|
| **Supabase Storage** | Supabase | Object storage cho images |
| **Vercel Blob** | Vercel | Alternative storage option |

### 4.3 Caching

| Technology | Provider | Mô tả |
|------------|----------|-------|
| **Vercel KV** | Vercel | Redis-compatible caching |
| **Edge Config** | Vercel | Feature flags, configurations |

---

## 5. DEPLOYMENT STACK

### 5.1 Hosting & CDN

| Technology | Mô tả |
|------------|-------|
| **Vercel** | Hosting platform với Edge Network |
| **Vercel Edge Network** | Global CDN |
| **Vercel Image Optimization** | On-the-fly image optimization |

### 5.2 CI/CD

| Technology | Mô tả |
|------------|-------|
| **GitHub Actions** | CI pipeline (lint, test, build) |
| **Vercel Git Integration** | Auto-deploy on push |
| **Preview Deployments** | PR preview URLs |

### 5.3 Monitoring & Analytics

| Technology | Mô tả |
|------------|-------|
| **Vercel Analytics** | Web analytics |
| **Vercel Speed Insights** | Core Web Vitals |
| **Sentry** | Error tracking |
| **PostHog** | Product analytics (alternative) |

---

## 6. DEVELOPMENT TOOLS

### 6.1 Package Management

| Tool | Version | Mô tả |
|------|---------|-------|
| **pnpm** | 9.x | Fast, disk-efficient package manager |
| **Node.js** | 20.x LTS | JavaScript runtime |

### 6.2 Code Quality

| Tool | Mô tả |
|------|-------|
| **ESLint** | JavaScript/TypeScript linting |
| **Prettier** | Code formatting |
| **Husky** | Git hooks |
| **lint-staged** | Pre-commit linting |

### 6.3 Testing

| Tool | Mô tả |
|------|-------|
| **Vitest** | Unit testing |
| **React Testing Library** | Component testing |
| **Playwright** | E2E testing |

### 6.4 IDE & Extensions

| Tool | Mô tả |
|------|-------|
| **VS Code** | Recommended IDE |
| **ESLint Extension** | In-editor linting |
| **Tailwind CSS IntelliSense** | Tailwind autocomplete |
| **Prisma** | Database schema highlighting |

---

## 7. THIRD-PARTY SERVICES

### 7.1 Payment (Future)

| Service | Market | Mô tả |
|---------|--------|-------|
| **MoMo** | Vietnam | Mobile payment gateway |
| **ZaloPay** | Vietnam | Mobile payment gateway |
| **Stripe** | International | Credit card processing |

### 7.2 Email & Notifications

| Service | Mô tả |
|---------|-------|
| **Resend** | Transactional emails |
| **Supabase** | Built-in email auth |

### 7.3 Content Moderation

| Service | Mô tả |
|---------|-------|
| **OpenAI Moderation API** | Text content moderation |
| **Replicate Safety** | Image content filtering |

---

## 8. INFRASTRUCTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           KYNGUYENAI.VN TECH STACK                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│   CLIENT                                                                      │
│   ══════                                                                      │
│   • Next.js 15 (App Router)    • TypeScript 5.x                              │
│   • React 19                   • Tailwind CSS + Shadcn/ui                    │
│   • GSAP ScrollTrigger         • React Three Fiber                           │
│   • Zustand (State)            • SWR (Data fetching)                         │
│                                                                               │
│   ─────────────────────────────────────────────────────────────────────────  │
│                                                                               │
│   AI INTEGRATION                                                              │
│   ══════════════                                                              │
│   • Vercel AI SDK              • OpenAI (GPT-4o)                             │
│   • Anthropic (Claude)         • Replicate (Flux Pro)                        │
│   • Fal.ai (Flux)              • Groq (SDXL Turbo)                           │
│                                                                               │
│   ─────────────────────────────────────────────────────────────────────────  │
│                                                                               │
│   BACKEND                                                                     │
│   ═══════                                                                     │
│   • Next.js API Routes         • Edge Functions                              │
│   • Vercel KV (Cache)          • Supabase Auth                               │
│                                                                               │
│   ─────────────────────────────────────────────────────────────────────────  │
│                                                                               │
│   DATABASE & STORAGE                                                          │
│   ══════════════════                                                          │
│   • Supabase PostgreSQL        • pgvector (RAG)                              │
│   • Supabase Storage           • Vercel Blob (backup)                        │
│                                                                               │
│   ─────────────────────────────────────────────────────────────────────────  │
│                                                                               │
│   DEPLOYMENT                                                                  │
│   ══════════                                                                  │
│   • Vercel Platform            • GitHub Actions (CI)                         │
│   • Vercel Edge Network        • Preview Deployments                         │
│                                                                               │
│   ─────────────────────────────────────────────────────────────────────────  │
│                                                                               │
│   MONITORING                                                                  │
│   ══════════                                                                  │
│   • Vercel Analytics           • Sentry (Errors)                             │
│   • Speed Insights             • PostHog (Product)                           │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. VERSION PINNING

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "@ai-sdk/openai": "^0.0.50",
    "@ai-sdk/anthropic": "^0.0.40",
    "ai": "^3.3.0",
    "zustand": "^4.5.0",
    "swr": "^2.2.0",
    "gsap": "^3.12.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.100.0",
    "three": "^0.160.0",
    "@supabase/supabase-js": "^2.40.0",
    "@supabase/ssr": "^0.3.0"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "prettier": "^3.2.0",
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
# Next.js
NEXT_PUBLIC_APP_URL=https://kynguyenai.vn

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# AI Providers
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
REPLICATE_API_TOKEN=r8_xxx
FAL_KEY=xxx
GROQ_API_KEY=gsk_xxx

# Vercel KV
KV_URL=xxx
KV_REST_API_URL=xxx
KV_REST_API_TOKEN=xxx
KV_REST_API_READ_ONLY_TOKEN=xxx

# Analytics (Optional)
SENTRY_DSN=xxx
NEXT_PUBLIC_POSTHOG_KEY=xxx
```

---

**Tài liệu liên quan:**
- [BusinessContextVision-KynguyenAI.md](./BusinessContextVision-KynguyenAI.md) - Tầm nhìn kinh doanh
- [ComponentView-KynguyenAI.md](./ComponentView-KynguyenAI.md) - Kiến trúc hệ thống
