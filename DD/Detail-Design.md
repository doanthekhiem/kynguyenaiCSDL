# Detail Design - KynguyenAI.vn v3.0

> **Phiên bản**: 1.0
> **Cập nhật**: 13/01/2026
> **Mục đích**: Tài liệu thiết kế chi tiết để triển khai code mà không cần đọc lại HLD/US

---

## Mục lục

1. [Project Initialization](#1-project-initialization)
2. [Folder Structure](#2-folder-structure)
3. [Core Libraries Setup](#3-core-libraries-setup)
4. [Type Definitions](#4-type-definitions)
5. [UI Components](#5-ui-components)
6. [API Routes](#6-api-routes)
7. [Pages Structure](#7-pages-structure)
8. [US → Implementation Mapping](#8-us--implementation-mapping)

---

## 1. Project Initialization

### 1.1 Khởi tạo Project

```bash
# Tạo Next.js 16 project
npx create-next-app@latest kynguyenai-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Di chuyển vào thư mục
cd kynguyenai-web
```

### 1.2 Package.json

```json
{
  "name": "kynguyenai-web",
  "version": "3.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",

    "googleapis": "^140.0.0",
    "@supabase/supabase-js": "^2.45.0",
    "@supabase/ssr": "^0.5.0",

    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.0",
    "lucide-react": "^0.460.0",

    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-dropdown-menu": "^2.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-scroll-area": "^1.2.0",

    "nanoid": "^5.0.8",
    "date-fns": "^4.1.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/typography": "^0.5.15",
    "tailwindcss-animate": "^1.0.7",
    "postcss": "^8.4.49",
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.0.0"
  }
}
```

### 1.3 next.config.ts

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  // React Compiler (stable in Next.js 16)
  reactCompiler: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co'
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com'
      }
    ],
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default config
```

### 1.4 tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    },
    "target": "ES2022"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 1.5 tailwind.config.ts

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      // Bento Grid configurations
      gridTemplateColumns: {
        'bento': 'repeat(4, minmax(0, 1fr))',
        'bento-md': 'repeat(2, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        'bento': 'repeat(auto-fill, 200px)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
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

### 1.6 Environment Variables (.env.example)

```bash
# .env.example
# Copy file này thành .env.local và điền các giá trị thực

# =============================================
# GOOGLE SHEETS (Phase 1-2)
# =============================================
# Service Account JSON (stringify)
GOOGLE_SERVICE_ACCOUNT={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}

# Google Sheets ID (từ URL của sheet)
GOOGLE_SHEETS_ID=1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# =============================================
# PERPLEXITY API (Phase 1 - Optional cho frontend)
# =============================================
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxxxxxxxxxx

# =============================================
# OPENAI API (Fallback)
# =============================================
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# =============================================
# SUPABASE (Phase 3-4)
# =============================================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# =============================================
# REVALIDATION
# =============================================
# Secret cho webhook revalidation từ Make.com
REVALIDATE_SECRET=your-random-secret-string-here

# =============================================
# APP CONFIG
# =============================================
NEXT_PUBLIC_APP_URL=https://kynguyenai.vn
NEXT_PUBLIC_APP_NAME=KynguyenAI

# =============================================
# AFFILIATE (Phase 5)
# =============================================
# Udemy Affiliate ID
UDEMY_AFFILIATE_ID=xxxxxxxx
# DigitalOcean Referral
DIGITALOCEAN_REFERRAL=xxxxxxxx

# =============================================
# ANALYTICS (Optional)
# =============================================
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 1.7 CSS Variables (src/app/globals.css)

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 199 89% 48%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 199 89% 48%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 199 89% 48%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 199 89% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## 2. Folder Structure

### 2.1 Cấu trúc Thư mục Chi tiết

```
kynguyenai-web/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.tsx                      # Homepage (Bento Grid)
│   │   ├── globals.css                   # Global styles
│   │   │
│   │   ├── (main)/                       # Route Group: Public pages
│   │   │   ├── category/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx          # Category listing
│   │   │   ├── article/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx          # Article detail
│   │   │   ├── tools/
│   │   │   │   ├── page.tsx              # Tools listing
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx          # Tool detail
│   │   │   │   └── submit/
│   │   │   │       └── page.tsx          # Submit new tool
│   │   │   └── go/
│   │   │       └── [code]/
│   │   │           └── route.ts          # Affiliate redirect
│   │   │
│   │   ├── (auth)/                       # Route Group: Auth pages
│   │   │   ├── layout.tsx                # Auth layout
│   │   │   ├── login/
│   │   │   │   └── page.tsx              # Login page
│   │   │   ├── register/
│   │   │   │   └── page.tsx              # Register page
│   │   │   ├── callback/
│   │   │   │   └── route.ts              # OAuth callback
│   │   │   └── error/
│   │   │       └── page.tsx              # Auth error page
│   │   │
│   │   ├── (protected)/                  # Route Group: Authenticated pages
│   │   │   ├── layout.tsx                # Protected layout (auth check)
│   │   │   ├── bookmarks/
│   │   │   │   └── page.tsx              # User bookmarks
│   │   │   ├── history/
│   │   │   │   └── page.tsx              # Reading history
│   │   │   ├── settings/
│   │   │   │   └── page.tsx              # User settings
│   │   │   └── dashboard/
│   │   │       └── submissions/
│   │   │           └── page.tsx          # My submissions
│   │   │
│   │   ├── admin/                        # Admin pages
│   │   │   ├── layout.tsx                # Admin layout (role check)
│   │   │   ├── page.tsx                  # Admin dashboard
│   │   │   ├── tools/
│   │   │   │   ├── page.tsx              # Manage tools
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx          # Edit tool
│   │   │   │   └── submissions/
│   │   │   │       └── page.tsx          # Review submissions
│   │   │   ├── affiliate/
│   │   │   │   └── page.tsx              # Affiliate management
│   │   │   └── sponsored/
│   │   │       └── page.tsx              # Sponsored tiles
│   │   │
│   │   └── api/                          # API Routes
│   │       ├── articles/
│   │       │   ├── route.ts              # GET /api/articles
│   │       │   └── [id]/
│   │       │       └── route.ts          # GET /api/articles/[id]
│   │       ├── tools/
│   │       │   ├── route.ts              # GET /api/tools
│   │       │   ├── categories/
│   │       │   │   └── route.ts          # GET /api/tools/categories
│   │       │   ├── submit/
│   │       │   │   └── route.ts          # POST /api/tools/submit
│   │       │   └── [slug]/
│   │       │       ├── route.ts          # GET /api/tools/[slug]
│   │       │       ├── vote/
│   │       │       │   └── route.ts      # POST /api/tools/[slug]/vote
│   │       │       └── reviews/
│   │       │           └── route.ts      # GET, POST /api/tools/[slug]/reviews
│   │       ├── subscribe/
│   │       │   └── route.ts              # POST /api/subscribe
│   │       ├── revalidate/
│   │       │   └── route.ts              # POST /api/revalidate
│   │       ├── github/
│   │       │   └── trending/
│   │       │       └── route.ts          # GET /api/github/trending
│   │       ├── auth/
│   │       │   └── [...supabase]/
│   │       │       └── route.ts          # Supabase Auth handlers
│   │       ├── user/
│   │       │   ├── bookmarks/
│   │       │   │   └── route.ts          # GET, POST /api/user/bookmarks
│   │       │   ├── history/
│   │       │   │   └── route.ts          # GET, POST /api/user/history
│   │       │   └── submissions/
│   │       │       └── route.ts          # GET /api/user/submissions
│   │       ├── sponsored/
│   │       │   └── click/
│   │       │       └── [id]/
│   │       │           └── route.ts      # GET /api/sponsored/click/[id]
│   │       └── admin/
│   │           └── tools/
│   │               ├── route.ts          # Admin CRUD tools
│   │               └── submissions/
│   │                   └── route.ts      # Admin review submissions
│   │
│   ├── components/                       # React Components
│   │   ├── ui/                           # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   └── separator.tsx
│   │   │
│   │   ├── bento/                        # Bento Grid components
│   │   │   ├── BentoGrid.tsx             # Grid container
│   │   │   ├── BentoTile.tsx             # Base tile component
│   │   │   ├── HeroTile.tsx              # Hero article (2x2)
│   │   │   ├── TallTile.tsx              # Tall tile (1x2)
│   │   │   ├── WideTile.tsx              # Wide tile (2x1)
│   │   │   ├── StandardTile.tsx          # Standard tile (1x1)
│   │   │   └── SponsoredTile.tsx         # Sponsored content tile
│   │   │
│   │   ├── article/                      # Article components
│   │   │   ├── ArticleCard.tsx           # Article card for grid
│   │   │   ├── ArticleDetail.tsx         # Article detail view
│   │   │   ├── ArticleList.tsx           # Article list with pagination
│   │   │   ├── CategoryBadge.tsx         # Category badge
│   │   │   └── ShareButtons.tsx          # Social share buttons
│   │   │
│   │   ├── tools/                        # AI Tools components
│   │   │   ├── ToolCard.tsx              # Tool card for grid
│   │   │   ├── ToolGrid.tsx              # Tools grid layout
│   │   │   ├── ToolDetail.tsx            # Tool detail view
│   │   │   ├── VoteButton.tsx            # Vote button with animation
│   │   │   ├── ReviewList.tsx            # Reviews list
│   │   │   ├── ReviewForm.tsx            # Review submission form
│   │   │   ├── ToolSubmitForm.tsx        # Submit new tool form
│   │   │   ├── CategoryFilter.tsx        # Category filter
│   │   │   └── SearchBar.tsx             # Search tools
│   │   │
│   │   ├── github/                       # GitHub Trending components
│   │   │   ├── GitHubCard.tsx            # GitHub repo card
│   │   │   └── GitHubTrendingList.tsx    # Trending repos list
│   │   │
│   │   ├── subscription/                 # Newsletter components
│   │   │   └── SubscribeForm.tsx         # Newsletter signup form
│   │   │
│   │   ├── auth/                         # Auth components
│   │   │   ├── LoginForm.tsx             # Login form
│   │   │   ├── RegisterForm.tsx          # Register form
│   │   │   ├── OAuthButtons.tsx          # Google/GitHub OAuth buttons
│   │   │   ├── UserMenu.tsx              # User dropdown menu
│   │   │   └── AuthGuard.tsx             # Auth protection wrapper
│   │   │
│   │   ├── layout/                       # Layout components
│   │   │   ├── Header.tsx                # Site header
│   │   │   ├── Footer.tsx                # Site footer
│   │   │   ├── Navigation.tsx            # Main navigation
│   │   │   ├── MobileMenu.tsx            # Mobile menu
│   │   │   └── ThemeToggle.tsx           # Dark/Light mode toggle
│   │   │
│   │   └── common/                       # Shared components
│   │       ├── LoadingSpinner.tsx        # Loading indicator
│   │       ├── EmptyState.tsx            # Empty state message
│   │       ├── ErrorBoundary.tsx         # Error boundary
│   │       ├── Pagination.tsx            # Pagination component
│   │       └── BookmarkButton.tsx        # Bookmark toggle button
│   │
│   ├── lib/                              # Utility libraries
│   │   ├── sheets.ts                     # Google Sheets client
│   │   ├── supabase/
│   │   │   ├── client.ts                 # Supabase browser client
│   │   │   ├── server.ts                 # Supabase server client
│   │   │   └── middleware.ts             # Supabase middleware
│   │   ├── perplexity.ts                 # Perplexity API client
│   │   ├── utils.ts                      # General utilities (cn, etc.)
│   │   ├── validations.ts                # Zod schemas
│   │   └── constants.ts                  # App constants
│   │
│   ├── hooks/                            # Custom React hooks
│   │   ├── useAuth.ts                    # Auth hook
│   │   ├── useBookmarks.ts               # Bookmarks hook
│   │   ├── useDebounce.ts                # Debounce hook
│   │   └── useIntersectionObserver.ts    # Intersection observer hook
│   │
│   ├── types/                            # TypeScript definitions
│   │   ├── article.ts                    # Article types
│   │   ├── tool.ts                       # AI Tool types
│   │   ├── user.ts                       # User types
│   │   ├── api.ts                        # API response types
│   │   └── index.ts                      # Type exports
│   │
│   └── config/                           # App configuration
│       ├── site.ts                       # Site metadata
│       ├── navigation.ts                 # Navigation config
│       └── categories.ts                 # Categories config
│
├── public/                               # Static assets
│   ├── favicon.ico
│   ├── logo.svg
│   └── og-image.png
│
├── supabase/                             # Supabase configurations
│   └── migrations/
│       └── 001_ai_tools_tables.sql       # Database schema
│
├── .env.example                          # Environment template
├── .env.local                            # Local environment (gitignore)
├── next.config.ts                        # Next.js config
├── tailwind.config.ts                    # Tailwind config
├── tsconfig.json                         # TypeScript config
├── package.json                          # Dependencies
└── README.md                             # Project readme
```

### 2.2 Mapping Thư mục → US

| Thư mục | US liên quan |
|---------|--------------|
| `app/api/articles/` | US-NF-ARTICLE-001 |
| `app/api/subscribe/` | US-UF-SUBSCRIPTION-001 |
| `app/api/revalidate/` | US-NF-ARTICLE-001 (AC-5.2) |
| `app/api/tools/` | US-TL-TOOLS-001 đến 005 |
| `app/(auth)/` | US-PF-AUTH-001 |
| `app/(protected)/` | US-PF-AUTH-002, 003 |
| `app/admin/` | US-NF-ARTICLE-002, US-TL-TOOLS-005 |
| `app/go/[code]/` | US-SF-MONETIZATION-001 |
| `components/bento/` | US-NF-ARTICLE-001 |
| `components/tools/` | US-TL-TOOLS-001, 002, 003 |
| `components/subscription/` | US-UF-SUBSCRIPTION-001 |
| `lib/sheets.ts` | US-DF-DATA-PIPELINE-001, US-NF-ARTICLE-001 |
| `lib/supabase/` | US-PF-AUTH-001, US-TL-TOOLS-* |

---

## 3. Core Libraries Setup

### 3.1 Google Sheets Client (lib/sheets.ts)

```typescript
// src/lib/sheets.ts
import { google } from 'googleapis'

// Types
export interface Article {
  id: string
  url_hash: string
  title_hash: string
  title_vi: string
  summary_vi: string
  original_url: string
  thumbnail: string | null
  category: 'ai-news' | 'ai-tools' | 'ai-tutorial' | 'ai-vietnam'
  source: string
  published_at: string
  tile_size: 'hero' | 'tall' | 'wide' | 'standard'
  is_featured: boolean
  status: 'draft' | 'published' | 'archived'
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
  email: string
  status: 'pending' | 'confirmed'
  subscribed_at: string
}

// Initialize Google Auth
const getAuth = () => {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT!)
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

// Initialize Sheets client
const getSheets = () => {
  const auth = getAuth()
  return google.sheets({ version: 'v4', auth })
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!

// =============================================
// ARTICLES
// =============================================

/**
 * Lấy danh sách bài viết đã publish
 * @param limit - Số lượng bài viết tối đa
 * @param offset - Vị trí bắt đầu
 * @param category - Filter theo category (optional)
 * @param featured - Filter bài featured (optional)
 */
export async function getPublishedArticles(options: {
  limit?: number
  offset?: number
  category?: string
  featured?: boolean
} = {}): Promise<{ data: Article[]; total: number }> {
  const { limit = 20, offset = 0, category, featured } = options

  const sheets = getSheets()

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Articles!A2:N', // Skip header row
  })

  const rows = response.data.values || []

  // Parse rows to articles
  let articles: Article[] = rows
    .filter((row) => row[12] === 'published') // status = published
    .map((row) => ({
      id: row[0] || '',
      url_hash: row[1] || '',
      title_hash: row[2] || '',
      title_vi: row[3] || '',
      summary_vi: row[4] || '',
      original_url: row[5] || '',
      thumbnail: row[6] || null,
      category: row[7] as Article['category'],
      source: row[8] || '',
      published_at: row[9] || '',
      tile_size: (row[10] as Article['tile_size']) || 'standard',
      is_featured: row[11] === 'TRUE',
      status: row[12] as Article['status'],
      created_at: row[13] || '',
    }))

  // Apply filters
  if (category) {
    articles = articles.filter((a) => a.category === category)
  }

  if (featured !== undefined) {
    articles = articles.filter((a) => a.is_featured === featured)
  }

  // Sort by published_at DESC
  articles.sort((a, b) =>
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  )

  const total = articles.length

  // Apply pagination
  const paginated = articles.slice(offset, offset + limit)

  return { data: paginated, total }
}

/**
 * Lấy chi tiết một bài viết theo ID
 * @param id - Article ID
 */
export async function getArticleById(id: string): Promise<Article | null> {
  const sheets = getSheets()

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Articles!A2:N',
  })

  const rows = response.data.values || []

  const row = rows.find((r) => r[0] === id && r[12] === 'published')

  if (!row) return null

  return {
    id: row[0] || '',
    url_hash: row[1] || '',
    title_hash: row[2] || '',
    title_vi: row[3] || '',
    summary_vi: row[4] || '',
    original_url: row[5] || '',
    thumbnail: row[6] || null,
    category: row[7] as Article['category'],
    source: row[8] || '',
    published_at: row[9] || '',
    tile_size: (row[10] as Article['tile_size']) || 'standard',
    is_featured: row[11] === 'TRUE',
    status: row[12] as Article['status'],
    created_at: row[13] || '',
  }
}

/**
 * Lấy bài viết featured
 */
export async function getFeaturedArticle(): Promise<Article | null> {
  const { data } = await getPublishedArticles({ featured: true, limit: 1 })
  return data[0] || null
}

// =============================================
// GITHUB TRENDING
// =============================================

/**
 * Lấy danh sách GitHub repos trending
 * @param limit - Số lượng repos
 */
export async function getGitHubTrending(limit = 10): Promise<GitHubRepo[]> {
  const sheets = getSheets()

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'GitHub_Trending!A2:F',
  })

  const rows = response.data.values || []

  return rows.slice(0, limit).map((row) => ({
    repo_name: row[0] || '',
    url: row[1] || '',
    description_vi: row[2] || '',
    stars: parseInt(row[3]) || 0,
    language: row[4] || '',
    trending_date: row[5] || '',
  }))
}

// =============================================
// SUBSCRIBERS
// =============================================

/**
 * Thêm subscriber mới
 * @param email - Email đăng ký
 */
export async function addSubscriber(email: string): Promise<{ success: boolean; message: string }> {
  const sheets = getSheets()
  const normalizedEmail = email.toLowerCase().trim()

  // Check duplicate
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Subscribers!A2:A',
  })

  const existingEmails = (existing.data.values || []).map((row) => row[0]?.toLowerCase())

  if (existingEmails.includes(normalizedEmail)) {
    return { success: false, message: 'Email đã được đăng ký trước đó' }
  }

  // Add new subscriber
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Subscribers!A:C',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[normalizedEmail, 'pending', new Date().toISOString()]],
    },
  })

  return { success: true, message: 'Đăng ký thành công!' }
}
```

### 3.2 Supabase Client (lib/supabase/)

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

```typescript
// src/lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refreshing the auth token
  const { data: { user } } = await supabase.auth.getUser()

  return supabaseResponse
}
```

### 3.3 Utility Functions (lib/utils.ts)

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes với clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date sang tiếng Việt
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }
  return new Date(date).toLocaleDateString('vi-VN', defaultOptions)
}

/**
 * Format relative time (e.g., "2 giờ trước")
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const then = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Vừa xong'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} ngày trước`

  return formatDate(date)
}

/**
 * Truncate text với ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Generate slug từ text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '')    // Remove special chars
    .replace(/\s+/g, '-')            // Replace spaces with -
    .replace(/-+/g, '-')             // Replace multiple - with single -
    .trim()
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Delay function
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Get category label tiếng Việt
 */
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'ai-news': 'Tin tức AI',
    'ai-tools': 'Công cụ AI',
    'ai-tutorial': 'Hướng dẫn',
    'ai-vietnam': 'AI Việt Nam',
  }
  return labels[category] || category
}

/**
 * Get pricing type label tiếng Việt
 */
export function getPricingLabel(pricing: string): string {
  const labels: Record<string, string> = {
    'free': 'Miễn phí',
    'freemium': 'Freemium',
    'paid': 'Trả phí',
    'enterprise': 'Doanh nghiệp',
  }
  return labels[pricing] || pricing
}
```

### 3.4 Validations (lib/validations.ts)

```typescript
// src/lib/validations.ts
import { z } from 'zod'

// =============================================
// SUBSCRIBE
// =============================================
export const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, 'Email không được để trống')
    .email('Email không đúng định dạng'),
})

export type SubscribeInput = z.infer<typeof subscribeSchema>

// =============================================
// AUTH
// =============================================
export const loginSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

export const registerSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  password: z
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
    .regex(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ thường')
    .regex(/[0-9]/, 'Mật khẩu phải có ít nhất 1 số'),
  display_name: z.string().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>

// =============================================
// TOOL SUBMISSION
// =============================================
export const toolSubmissionSchema = z.object({
  name: z.string().min(1, 'Tên công cụ không được để trống').max(200),
  tagline: z.string().min(1, 'Tagline không được để trống').max(300),
  description: z.string().min(100, 'Mô tả phải có ít nhất 100 ký tự').max(5000),
  website_url: z.string().url('URL không hợp lệ'),
  logo_url: z.string().url('URL không hợp lệ').optional().or(z.literal('')),
  category_id: z.string().uuid('Vui lòng chọn danh mục'),
  pricing_type: z.enum(['free', 'freemium', 'paid', 'enterprise']),
  pricing_details: z.string().max(200).optional(),
  twitter_url: z.string().url().optional().or(z.literal('')),
  github_url: z.string().url().optional().or(z.literal('')),
  submitter_relation: z.enum(['maker', 'user', 'other']),
})

export type ToolSubmissionInput = z.infer<typeof toolSubmissionSchema>

// =============================================
// REVIEW
// =============================================
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().max(200).optional(),
  content: z.string().min(50, 'Nội dung phải có ít nhất 50 ký tự').max(2000),
})

export type ReviewInput = z.infer<typeof reviewSchema>

// =============================================
// USER PROFILE
// =============================================
export const profileUpdateSchema = z.object({
  display_name: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional().or(z.literal('')),
})

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
```

### 3.5 Constants (lib/constants.ts)

```typescript
// src/lib/constants.ts

// =============================================
// CATEGORIES
// =============================================
export const ARTICLE_CATEGORIES = [
  { slug: 'ai-news', name: 'Tin tức AI', icon: 'newspaper' },
  { slug: 'ai-tools', name: 'Công cụ AI', icon: 'wrench' },
  { slug: 'ai-tutorial', name: 'Hướng dẫn', icon: 'book-open' },
  { slug: 'ai-vietnam', name: 'AI Việt Nam', icon: 'flag' },
] as const

export const TOOL_CATEGORIES = [
  { slug: 'text-generation', name: 'Tạo văn bản', icon: 'pen-tool' },
  { slug: 'image-generation', name: 'Tạo hình ảnh', icon: 'image' },
  { slug: 'video-generation', name: 'Tạo video', icon: 'video' },
  { slug: 'audio-generation', name: 'Tạo âm thanh', icon: 'music' },
  { slug: 'code-assistant', name: 'Hỗ trợ lập trình', icon: 'code' },
  { slug: 'chatbot', name: 'Chatbot', icon: 'message-circle' },
  { slug: 'productivity', name: 'Năng suất', icon: 'zap' },
  { slug: 'research', name: 'Nghiên cứu', icon: 'search' },
  { slug: 'marketing', name: 'Marketing', icon: 'megaphone' },
  { slug: 'design', name: 'Thiết kế', icon: 'palette' },
  { slug: 'data-analysis', name: 'Phân tích dữ liệu', icon: 'bar-chart' },
  { slug: 'automation', name: 'Tự động hóa', icon: 'settings' },
  { slug: 'other', name: 'Khác', icon: 'grid' },
] as const

// =============================================
// PRICING TYPES
// =============================================
export const PRICING_TYPES = [
  { value: 'free', label: 'Miễn phí' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Trả phí' },
  { value: 'enterprise', label: 'Doanh nghiệp' },
] as const

// =============================================
// PAGINATION
// =============================================
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// =============================================
// CACHE
// =============================================
export const ISR_REVALIDATE_SECONDS = 300 // 5 minutes

// =============================================
// ERROR CODES
// =============================================
export const ERROR_CODES = {
  // Subscribe errors
  ERR_SUB_001: 'Email không đúng định dạng',
  ERR_SUB_002: 'Email đã được đăng ký trước đó',
  ERR_SUB_003: 'Đã xảy ra lỗi, vui lòng thử lại sau',

  // Auth errors
  ERR_AUTH_001: 'Email hoặc mật khẩu không đúng',
  ERR_AUTH_002: 'Email đã được đăng ký',
  ERR_AUTH_003: 'Phiên đăng nhập hết hạn',
  ERR_AUTH_004: 'Không có quyền truy cập',

  // Tool errors
  ERR_TOOL_001: 'Công cụ không tồn tại',
  ERR_TOOL_002: 'Bạn đã vote cho công cụ này',
  ERR_TOOL_003: 'Bạn đã đánh giá công cụ này',
  ERR_TOOL_004: 'Tên công cụ đã tồn tại',

  // Article errors
  ERR_ART_001: 'Bài viết không tồn tại',
} as const

// =============================================
// RATE LIMITS
// =============================================
export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: 5,
  LOGIN_WINDOW: 15 * 60 * 1000, // 15 minutes
  SIGNUP_PER_HOUR: 3,
  MAGIC_LINK_PER_HOUR: 5,
  AFFILIATE_CLICKS_PER_IP_HOUR: 10,
} as const
```

---

## 4. Type Definitions

### 4.1 Article Types (types/article.ts)

```typescript
// src/types/article.ts

export type ArticleCategory = 'ai-news' | 'ai-tools' | 'ai-tutorial' | 'ai-vietnam'
export type TileSize = 'hero' | 'tall' | 'wide' | 'standard'
export type ArticleStatus = 'draft' | 'published' | 'archived'

export interface Article {
  id: string
  url_hash: string
  title_hash: string
  title_vi: string
  summary_vi: string
  original_url: string
  thumbnail: string | null
  category: ArticleCategory
  source: string
  published_at: string
  tile_size: TileSize
  is_featured: boolean
  status: ArticleStatus
  created_at: string
}

export interface ArticleListResponse {
  data: Article[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

export interface GitHubRepo {
  repo_name: string
  url: string
  description_vi: string
  stars: number
  language: string
  trending_date: string
}
```

### 4.2 Tool Types (types/tool.ts)

```typescript
// src/types/tool.ts

export type PricingType = 'free' | 'freemium' | 'paid' | 'enterprise'
export type ToolStatus = 'pending' | 'approved' | 'rejected' | 'archived'
export type SubmitterRelation = 'maker' | 'user' | 'other'
export type ReviewStatus = 'published' | 'hidden' | 'flagged'

export interface ToolCategory {
  id: string
  slug: string
  name: string
  name_vi: string
  description: string | null
  icon: string | null
  display_order: number
  is_active: boolean
}

export interface Tool {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  logo_url: string | null
  website_url: string
  category_id: string | null
  category?: ToolCategory
  pricing_type: PricingType
  pricing_details: string | null
  twitter_url: string | null
  github_url: string | null
  discord_url: string | null
  screenshots: string[]
  video_url: string | null
  vote_count: number
  review_count: number
  average_rating: number
  status: ToolStatus
  featured: boolean
  featured_date: string | null
  created_at: string
  updated_at: string
  published_at: string | null
}

export interface ToolVote {
  id: string
  tool_id: string
  user_id: string
  created_at: string
}

export interface ToolReview {
  id: string
  tool_id: string
  user_id: string
  rating: number
  title: string | null
  content: string
  status: ReviewStatus
  helpful_count: number
  created_at: string
  updated_at: string
  // Joined fields
  user?: {
    display_name: string | null
    avatar_url: string | null
  }
}

export interface ToolSubmission {
  id: string
  name: string
  tagline: string
  description: string
  website_url: string
  logo_url: string | null
  category_id: string | null
  pricing_type: PricingType
  pricing_details: string | null
  twitter_url: string | null
  github_url: string | null
  submitted_by: string
  submitter_relation: SubmitterRelation
  status: 'pending' | 'approved' | 'rejected'
  reviewer_notes: string | null
  created_at: string
}

export interface ToolListResponse {
  data: Tool[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

export interface VoteResponse {
  voted: boolean
  vote_count: number
  message: string
}
```

### 4.3 User Types (types/user.ts)

```typescript
// src/types/user.ts

export type UserRole = 'user' | 'admin'

export interface UserProfile {
  id: string
  auth_id: string
  email: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  role: UserRole
  created_at: string
  updated_at: string
  last_login: string | null
}

export interface UserPreferences {
  id: string
  user_id: string
  favorite_categories: string[]
  theme: 'light' | 'dark' | 'system'
  language: string
}

export interface Bookmark {
  id: string
  user_id: string
  article_id: string
  created_at: string
  // Joined fields
  article?: {
    title_vi: string
    thumbnail: string | null
    category: string
  }
}

export interface ReadingHistory {
  id: string
  user_id: string
  article_id: string
  read_percentage: number
  time_spent: number // seconds
  created_at: string
  updated_at: string
  // Joined fields
  article?: {
    title_vi: string
    thumbnail: string | null
    category: string
  }
}
```

### 4.4 API Response Types (types/api.ts)

```typescript
// src/types/api.ts

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  error: string
  code?: string
  details?: unknown
}

export interface PaginationParams {
  limit?: number
  offset?: number
}

export interface ArticlesParams extends PaginationParams {
  category?: string
  featured?: boolean
}

export interface ToolsParams extends PaginationParams {
  category?: string
  search?: string
  sort?: 'votes' | 'newest' | 'rating'
  featured?: boolean
}

export interface RevalidateResponse {
  revalidated: boolean
  source?: string
}
```

### 4.5 Type Exports (types/index.ts)

```typescript
// src/types/index.ts

export * from './article'
export * from './tool'
export * from './user'
export * from './api'
```

---

## 5. UI Components

### 5.1 Shadcn UI Setup

```bash
# Cài đặt Shadcn UI
npx shadcn@latest init

# Thêm các components cần thiết
npx shadcn@latest add button card input badge skeleton toast avatar dropdown-menu dialog tabs scroll-area separator
```

### 5.2 Bento Grid Components

```typescript
// src/components/bento/BentoGrid.tsx
import { cn } from '@/lib/utils'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]',
        className
      )}
    >
      {children}
    </div>
  )
}
```

```typescript
// src/components/bento/BentoTile.tsx
import { cn } from '@/lib/utils'
import type { TileSize } from '@/types'

interface BentoTileProps {
  children: React.ReactNode
  size?: TileSize
  className?: string
}

const sizeClasses: Record<TileSize, string> = {
  hero: 'col-span-2 row-span-2',
  tall: 'row-span-2',
  wide: 'col-span-2',
  standard: '',
}

export function BentoTile({ children, size = 'standard', className }: BentoTileProps) {
  return (
    <div
      className={cn(
        'bg-card rounded-xl border overflow-hidden transition-all hover:shadow-lg',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  )
}
```

```typescript
// src/components/bento/HeroTile.tsx
import { BentoTile } from './BentoTile'
import type { Article } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { CategoryBadge } from '@/components/article/CategoryBadge'

interface HeroTileProps {
  article: Article
}

export function HeroTile({ article }: HeroTileProps) {
  return (
    <BentoTile size="hero" className="group relative">
      <Link href={`/article/${article.id}`}>
        {/* Background Image */}
        {article.thumbnail && (
          <Image
            src={article.thumbnail}
            alt={article.title_vi}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <CategoryBadge category={article.category} className="mb-3" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-2">
            {article.title_vi}
          </h2>
          <p className="text-sm text-white/80 line-clamp-2 hidden md:block">
            {article.summary_vi}
          </p>
          <div className="flex items-center gap-2 mt-3 text-sm text-white/60">
            <span>{article.source}</span>
            <span>•</span>
            <span>{new Date(article.published_at).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
      </Link>
    </BentoTile>
  )
}
```

```typescript
// src/components/bento/StandardTile.tsx
import { BentoTile } from './BentoTile'
import type { Article } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { CategoryBadge } from '@/components/article/CategoryBadge'

interface StandardTileProps {
  article: Article
}

export function StandardTile({ article }: StandardTileProps) {
  return (
    <BentoTile size="standard" className="group">
      <Link href={`/article/${article.id}`} className="flex flex-col h-full">
        {/* Thumbnail */}
        {article.thumbnail && (
          <div className="relative h-24 overflow-hidden">
            <Image
              src={article.thumbnail}
              alt={article.title_vi}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <CategoryBadge category={article.category} size="sm" className="mb-2" />
          <h3 className="font-semibold line-clamp-2 flex-1 group-hover:text-primary transition-colors">
            {article.title_vi}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span>{article.source}</span>
          </div>
        </div>
      </Link>
    </BentoTile>
  )
}
```

```typescript
// src/components/bento/TallTile.tsx
import { BentoTile } from './BentoTile'
import type { Article } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { CategoryBadge } from '@/components/article/CategoryBadge'

interface TallTileProps {
  article: Article
}

export function TallTile({ article }: TallTileProps) {
  return (
    <BentoTile size="tall" className="group">
      <Link href={`/article/${article.id}`} className="flex flex-col h-full">
        {/* Thumbnail */}
        {article.thumbnail && (
          <div className="relative h-1/2 overflow-hidden">
            <Image
              src={article.thumbnail}
              alt={article.title_vi}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <CategoryBadge category={article.category} className="mb-2" />
          <h3 className="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {article.title_vi}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
            {article.summary_vi}
          </p>
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <span>{article.source}</span>
            <span>•</span>
            <span>{new Date(article.published_at).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
      </Link>
    </BentoTile>
  )
}
```

```typescript
// src/components/bento/SponsoredTile.tsx
import { BentoTile } from './BentoTile'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface SponsoredTileProps {
  id: string
  title: string
  description?: string
  image_url?: string
  logo_url?: string
  target_url: string
  cta_text?: string
  size?: 'standard' | 'wide'
}

export function SponsoredTile({
  id,
  title,
  description,
  image_url,
  logo_url,
  target_url,
  cta_text = 'Xem thêm',
  size = 'standard',
}: SponsoredTileProps) {
  const handleClick = () => {
    // Track click via API
    fetch(`/api/sponsored/click/${id}`)
  }

  return (
    <BentoTile size={size} className="group relative bg-gradient-to-br from-primary/5 to-primary/10">
      <a
        href={target_url}
        target="_blank"
        rel="noopener sponsored"
        onClick={handleClick}
        className="flex flex-col h-full p-4"
      >
        {/* Sponsored Badge */}
        <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
          Tài trợ
        </Badge>

        {/* Logo */}
        {logo_url && (
          <div className="relative w-10 h-10 mb-3">
            <Image src={logo_url} alt={title} fill className="object-contain" />
          </div>
        )}

        {/* Content */}
        <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
            {description}
          </p>
        )}

        {/* CTA */}
        <span className="text-sm font-medium text-primary mt-auto">
          {cta_text} →
        </span>
      </a>
    </BentoTile>
  )
}
```

### 5.3 Article Components

```typescript
// src/components/article/CategoryBadge.tsx
import { Badge } from '@/components/ui/badge'
import { cn, getCategoryLabel } from '@/lib/utils'
import type { ArticleCategory } from '@/types'

interface CategoryBadgeProps {
  category: ArticleCategory
  size?: 'sm' | 'default'
  className?: string
}

const categoryColors: Record<ArticleCategory, string> = {
  'ai-news': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'ai-tools': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'ai-tutorial': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'ai-vietnam': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export function CategoryBadge({ category, size = 'default', className }: CategoryBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        categoryColors[category],
        size === 'sm' && 'text-xs px-2 py-0.5',
        className
      )}
    >
      {getCategoryLabel(category)}
    </Badge>
  )
}
```

```typescript
// src/components/article/ArticleCard.tsx
import type { Article } from '@/types'
import { HeroTile } from '@/components/bento/HeroTile'
import { TallTile } from '@/components/bento/TallTile'
import { StandardTile } from '@/components/bento/StandardTile'

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  switch (article.tile_size) {
    case 'hero':
      return <HeroTile article={article} />
    case 'tall':
      return <TallTile article={article} />
    default:
      return <StandardTile article={article} />
  }
}
```

### 5.4 Tool Components

```typescript
// src/components/tools/ToolCard.tsx
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VoteButton } from './VoteButton'
import type { Tool } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { getPricingLabel } from '@/lib/utils'

interface ToolCardProps {
  tool: Tool
  userVoted?: boolean
}

export function ToolCard({ tool, userVoted = false }: ToolCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {/* Logo */}
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            {tool.logo_url ? (
              <Image src={tool.logo_url} alt={tool.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                {tool.name[0]}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/tools/${tool.slug}`}>
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {tool.tagline}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline">{getPricingLabel(tool.pricing_type)}</Badge>
          {tool.category && (
            <Badge variant="secondary">{tool.category.name_vi}</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 justify-between">
        {/* Rating */}
        {tool.review_count > 0 && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{tool.average_rating.toFixed(1)}</span>
            <span>({tool.review_count})</span>
          </div>
        )}

        {/* Vote */}
        <VoteButton
          toolSlug={tool.slug}
          voteCount={tool.vote_count}
          initialVoted={userVoted}
        />
      </CardFooter>
    </Card>
  )
}
```

```typescript
// src/components/tools/VoteButton.tsx
'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

interface VoteButtonProps {
  toolSlug: string
  voteCount: number
  initialVoted?: boolean
}

export function VoteButton({ toolSlug, voteCount, initialVoted = false }: VoteButtonProps) {
  const { user } = useAuth()
  const [voted, setVoted] = useState(initialVoted)
  const [count, setCount] = useState(voteCount)
  const [isPending, startTransition] = useTransition()

  const handleVote = () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để vote')
      return
    }

    // Optimistic update
    setVoted(!voted)
    setCount((prev) => (voted ? prev - 1 : prev + 1))

    startTransition(async () => {
      try {
        const res = await fetch(`/api/tools/${toolSlug}/vote`, {
          method: 'POST',
        })

        const data = await res.json()

        if (!res.ok) {
          // Revert on error
          setVoted(voted)
          setCount(voteCount)
          toast.error(data.error || 'Đã xảy ra lỗi')
          return
        }

        // Sync with server state
        setVoted(data.voted)
        setCount(data.vote_count)
      } catch {
        // Revert on error
        setVoted(voted)
        setCount(voteCount)
        toast.error('Đã xảy ra lỗi')
      }
    })
  }

  return (
    <Button
      variant={voted ? 'default' : 'outline'}
      size="sm"
      onClick={handleVote}
      disabled={isPending}
      className={cn(
        'gap-1 transition-all',
        voted && 'bg-primary text-primary-foreground'
      )}
    >
      <ChevronUp className={cn('w-4 h-4', voted && 'animate-bounce')} />
      <span>{count}</span>
    </Button>
  )
}
```

### 5.5 Subscription Component

```typescript
// src/components/subscription/SubscribeForm.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { subscribeSchema } from '@/lib/validations'
import { Loader2, CheckCircle, Mail } from 'lucide-react'

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate
    const result = subscribeSchema.safeParse({ email })
    if (!result.success) {
      toast.error(result.error.errors[0].message)
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Đã xảy ra lỗi')
        return
      }

      setIsSuccess(true)
      toast.success('Đăng ký thành công!')
      setEmail('')
    } catch {
      toast.error('Đã xảy ra lỗi, vui lòng thử lại sau')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-6">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Đăng ký thành công!</h3>
        <p className="text-muted-foreground">
          Cảm ơn bạn đã đăng ký nhận tin AI hàng tuần.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-semibold">Đăng ký nhận tin AI</h3>
      </div>

      <p className="text-muted-foreground mb-4">
        Nhận tin tức AI mới nhất mỗi tuần qua email.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Đăng ký'
          )}
        </Button>
      </form>
    </div>
  )
}
```

### 5.6 Layout Components

```typescript
// src/components/layout/Header.tsx
import Link from 'next/link'
import { Navigation } from './Navigation'
import { UserMenu } from '@/components/auth/UserMenu'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">KynguyenAI</span>
        </Link>

        {/* Navigation */}
        <Navigation />

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
```

```typescript
// src/components/layout/Navigation.tsx
import Link from 'next/link'
import { ARTICLE_CATEGORIES } from '@/lib/constants'

export function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Trang chủ
      </Link>

      {ARTICLE_CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {cat.name}
        </Link>
      ))}

      <Link
        href="/tools"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        AI Tools
      </Link>
    </nav>
  )
}
```

```typescript
// src/components/layout/Footer.tsx
import Link from 'next/link'
import { ARTICLE_CATEGORIES } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">KynguyenAI</h3>
            <p className="text-sm text-muted-foreground">
              Nền tảng tin tức và công cụ AI hàng đầu cho cộng đồng developer Việt Nam.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Danh mục</h4>
            <ul className="space-y-2">
              {ARTICLE_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Tài nguyên</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI Tools Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/submit"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Gửi công cụ mới
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Thông tin</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} KynguyenAI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
```

---

## 6. API Routes

### 6.1 Articles API

```typescript
// src/app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPublishedArticles } from '@/lib/sheets'
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '@/lib/constants'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const limit = Math.min(
      parseInt(searchParams.get('limit') || String(DEFAULT_PAGE_SIZE)),
      MAX_PAGE_SIZE
    )
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category') || undefined
    const featured = searchParams.get('featured') === 'true' ? true : undefined

    const { data, total } = await getPublishedArticles({
      limit,
      offset,
      category,
      featured,
    })

    return NextResponse.json({
      data,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải bài viết' },
      { status: 500 }
    )
  }
}
```

```typescript
// src/app/api/articles/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getArticleById } from '@/lib/sheets'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const article = await getArticleById(id)

    if (!article) {
      return NextResponse.json(
        { error: 'Bài viết không tồn tại' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: article })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi' },
      { status: 500 }
    )
  }
}
```

### 6.2 Subscribe API

```typescript
// src/app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { addSubscriber } from '@/lib/sheets'
import { subscribeSchema } from '@/lib/validations'
import { ERROR_CODES } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate
    const result = subscribeSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: ERROR_CODES.ERR_SUB_001, code: 'ERR_SUB_001' },
        { status: 400 }
      )
    }

    // Add subscriber
    const { success, message } = await addSubscriber(result.data.email)

    if (!success) {
      return NextResponse.json(
        { error: message, code: 'ERR_SUB_002' },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, message })
  } catch (error) {
    console.error('Error subscribing:', error)
    return NextResponse.json(
      { error: ERROR_CODES.ERR_SUB_003, code: 'ERR_SUB_003' },
      { status: 500 }
    )
  }
}
```

### 6.3 Revalidate API

```typescript
// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-revalidate-secret')

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Revalidate all article-related paths
    revalidatePath('/')
    revalidatePath('/category/[slug]', 'page')
    revalidatePath('/article/[id]', 'page')

    return NextResponse.json({
      revalidated: true,
      source: 'make.com',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}
```

### 6.4 Tools API

```typescript
// src/app/api/tools/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '@/lib/constants'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)

    const limit = Math.min(
      parseInt(searchParams.get('limit') || String(DEFAULT_PAGE_SIZE)),
      MAX_PAGE_SIZE
    )
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category') || undefined
    const search = searchParams.get('search') || undefined
    const sort = searchParams.get('sort') || 'votes'
    const featured = searchParams.get('featured') === 'true'

    // Build query
    let query = supabase
      .from('ai_tools')
      .select('*, category:ai_tool_categories(*)', { count: 'exact' })
      .eq('status', 'approved')

    // Filters
    if (category) {
      query = query.eq('category_id', category)
    }

    if (featured) {
      query = query.eq('featured', true)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,tagline.ilike.%${search}%`)
    }

    // Sort
    switch (sort) {
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'rating':
        query = query.order('average_rating', { ascending: false })
        break
      default:
        query = query.order('vote_count', { ascending: false })
    }

    // Pagination
    query = query.range(offset, offset + limit - 1)

    const { data, count, error } = await query

    if (error) throw error

    return NextResponse.json({
      data: data || [],
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: offset + limit < (count || 0),
      },
    })
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi' },
      { status: 500 }
    )
  }
}
```

```typescript
// src/app/api/tools/[slug]/vote/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = await createClient()
    const { slug } = await params

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Vui lòng đăng nhập để vote' },
        { status: 401 }
      )
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('user_profile')
      .select('id')
      .eq('auth_id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 400 }
      )
    }

    // Get tool
    const { data: tool } = await supabase
      .from('ai_tools')
      .select('id, vote_count')
      .eq('slug', slug)
      .eq('status', 'approved')
      .single()

    if (!tool) {
      return NextResponse.json(
        { error: 'Công cụ không tồn tại' },
        { status: 404 }
      )
    }

    // Check if already voted
    const { data: existingVote } = await supabase
      .from('ai_tool_votes')
      .select('id')
      .eq('tool_id', tool.id)
      .eq('user_id', profile.id)
      .single()

    if (existingVote) {
      // Remove vote
      await supabase
        .from('ai_tool_votes')
        .delete()
        .eq('id', existingVote.id)

      // Get updated count
      const { data: updatedTool } = await supabase
        .from('ai_tools')
        .select('vote_count')
        .eq('id', tool.id)
        .single()

      return NextResponse.json({
        voted: false,
        vote_count: updatedTool?.vote_count || tool.vote_count - 1,
        message: 'Đã bỏ vote',
      })
    } else {
      // Add vote
      await supabase
        .from('ai_tool_votes')
        .insert({
          tool_id: tool.id,
          user_id: profile.id,
        })

      // Get updated count
      const { data: updatedTool } = await supabase
        .from('ai_tools')
        .select('vote_count')
        .eq('id', tool.id)
        .single()

      return NextResponse.json({
        voted: true,
        vote_count: updatedTool?.vote_count || tool.vote_count + 1,
        message: 'Đã vote thành công',
      })
    }
  } catch (error) {
    console.error('Error voting:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi' },
      { status: 500 }
    )
  }
}
```

### 6.5 Affiliate Redirect

```typescript
// src/app/go/[code]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params
    const supabase = await createClient()

    // Get affiliate link
    const { data: link } = await supabase
      .from('affiliate_links')
      .select('id, affiliate_url, status')
      .eq('short_code', code)
      .single()

    if (!link || link.status !== 'active') {
      // Redirect to homepage if link not found
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Track click (async, don't wait)
    const userAgent = request.headers.get('user-agent') || ''
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    // Skip bot tracking
    const botPatterns = ['bot', 'spider', 'crawl', 'curl', 'wget', 'python-requests']
    const isBot = botPatterns.some(p => userAgent.toLowerCase().includes(p))

    if (!isBot) {
      supabase
        .from('affiliate_clicks')
        .insert({
          link_id: link.id,
          user_agent: userAgent.slice(0, 500),
          ip_address: ip,
          referrer: request.headers.get('referer') || null,
        })
        .then(() => {})
        .catch(() => {})
    }

    return NextResponse.redirect(link.affiliate_url)
  } catch {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
```

---

## 7. Pages Structure

### 7.1 Root Layout

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata: Metadata = {
  title: {
    default: 'KynguyenAI - Tin tức và Công cụ AI cho Developer Việt Nam',
    template: '%s | KynguyenAI',
  },
  description: 'Nền tảng tin tức AI hàng đầu cho cộng đồng developer Việt Nam. Cập nhật tin tức AI, công cụ AI mới nhất mỗi ngày.',
  keywords: ['AI', 'Machine Learning', 'Deep Learning', 'LLM', 'GPT', 'Việt Nam', 'Developer'],
  authors: [{ name: 'KynguyenAI Team' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://kynguyenai.vn',
    siteName: 'KynguyenAI',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 7.2 Homepage

```typescript
// src/app/page.tsx
import { BentoGrid } from '@/components/bento/BentoGrid'
import { ArticleCard } from '@/components/article/ArticleCard'
import { SubscribeForm } from '@/components/subscription/SubscribeForm'
import { getPublishedArticles, getGitHubTrending, getFeaturedArticle } from '@/lib/sheets'
import { GitHubTrendingList } from '@/components/github/GitHubTrendingList'
import { ISR_REVALIDATE_SECONDS } from '@/lib/constants'

export const revalidate = ISR_REVALIDATE_SECONDS

export default async function HomePage() {
  const [
    { data: articles },
    featured,
    githubRepos,
  ] = await Promise.all([
    getPublishedArticles({ limit: 20 }),
    getFeaturedArticle(),
    getGitHubTrending(5),
  ])

  // Separate featured from others
  const regularArticles = articles.filter((a) => !a.is_featured)

  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tin tức AI mới nhất</h1>
        <p className="text-muted-foreground">
          Cập nhật hàng ngày từ các nguồn tin AI uy tín nhất thế giới
        </p>
      </section>

      {/* Bento Grid */}
      <BentoGrid className="mb-12">
        {/* Featured Article */}
        {featured && <ArticleCard article={featured} />}

        {/* GitHub Trending (Tall Tile) */}
        <div className="row-span-2 bg-card rounded-xl border p-4">
          <h2 className="font-semibold mb-4">GitHub Trending</h2>
          <GitHubTrendingList repos={githubRepos} />
        </div>

        {/* Regular Articles */}
        {regularArticles.slice(0, 10).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </BentoGrid>

      {/* Newsletter Subscription */}
      <section className="max-w-md mx-auto">
        <SubscribeForm />
      </section>
    </div>
  )
}
```

### 7.3 Category Page

```typescript
// src/app/(main)/category/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPublishedArticles } from '@/lib/sheets'
import { ArticleList } from '@/components/article/ArticleList'
import { ARTICLE_CATEGORIES, ISR_REVALIDATE_SECONDS } from '@/lib/constants'
import type { Metadata } from 'next'

export const revalidate = ISR_REVALIDATE_SECONDS

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = ARTICLE_CATEGORIES.find((c) => c.slug === slug)

  if (!category) return {}

  return {
    title: category.name,
    description: `Tin tức ${category.name} mới nhất trên KynguyenAI`,
  }
}

export async function generateStaticParams() {
  return ARTICLE_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }))
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const { page } = await searchParams

  // Validate category
  const category = ARTICLE_CATEGORIES.find((c) => c.slug === slug)
  if (!category) {
    notFound()
  }

  const currentPage = parseInt(page || '1')
  const limit = 20
  const offset = (currentPage - 1) * limit

  const { data: articles, total } = await getPublishedArticles({
    category: slug,
    limit,
    offset,
  })

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground">
          {total} bài viết trong danh mục này
        </p>
      </div>

      <ArticleList
        articles={articles}
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={`/category/${slug}`}
      />
    </div>
  )
}
```

### 7.4 Article Detail Page

```typescript
// src/app/(main)/article/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getArticleById } from '@/lib/sheets'
import { ArticleDetail } from '@/components/article/ArticleDetail'
import { ISR_REVALIDATE_SECONDS } from '@/lib/constants'
import type { Metadata } from 'next'

export const revalidate = ISR_REVALIDATE_SECONDS

interface ArticlePageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params
  const article = await getArticleById(id)

  if (!article) return {}

  return {
    title: article.title_vi,
    description: article.summary_vi,
    openGraph: {
      title: article.title_vi,
      description: article.summary_vi,
      images: article.thumbnail ? [article.thumbnail] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params
  const article = await getArticleById(id)

  if (!article) {
    notFound()
  }

  return (
    <div className="container py-8">
      <ArticleDetail article={article} />
    </div>
  )
}
```

### 7.5 Tools Page

```typescript
// src/app/(main)/tools/page.tsx
import { Suspense } from 'react'
import { ToolGrid } from '@/components/tools/ToolGrid'
import { CategoryFilter } from '@/components/tools/CategoryFilter'
import { SearchBar } from '@/components/tools/SearchBar'
import { Skeleton } from '@/components/ui/skeleton'
import { createClient } from '@/lib/supabase/server'
import { ISR_REVALIDATE_SECONDS } from '@/lib/constants'
import type { Metadata } from 'next'

export const revalidate = ISR_REVALIDATE_SECONDS

export const metadata: Metadata = {
  title: 'AI Tools Directory',
  description: 'Khám phá và vote cho các công cụ AI hữu ích được cộng đồng bình chọn',
}

interface ToolsPageProps {
  searchParams: Promise<{
    category?: string
    search?: string
    sort?: string
    page?: string
  }>
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  // Get categories
  const { data: categories } = await supabase
    .from('ai_tool_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Tools Directory</h1>
        <p className="text-muted-foreground">
          Khám phá và vote cho các công cụ AI được cộng đồng bình chọn
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar defaultValue={params.search} />
        <CategoryFilter
          categories={categories || []}
          selected={params.category}
        />
      </div>

      {/* Tools Grid */}
      <Suspense fallback={<ToolGridSkeleton />}>
        <ToolGrid
          category={params.category}
          search={params.search}
          sort={(params.sort as 'votes' | 'newest' | 'rating') || 'votes'}
          page={parseInt(params.page || '1')}
        />
      </Suspense>
    </div>
  )
}

function ToolGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <Skeleton key={i} className="h-48 rounded-xl" />
      ))}
    </div>
  )
}
```

---

## 8. US → Implementation Mapping

### 8.1 Phase 1: Core Data Infrastructure

#### US-DF-DATA-PIPELINE-001: Thu thập Tin tức Tự động

| Nhiệm vụ | Files/Components | Status |
|----------|------------------|--------|
| Cấu hình Make.com | External (make.com) | [ ] |
| Tạo Google Sheets schema | Google Sheets UI | [ ] |
| Setup Gmail watch | Make.com module | [ ] |
| Cấu hình deduplication | Make.com JS module | [ ] |

#### US-CF-AI-PROCESSING-001: Dịch thuật và Tóm tắt

| Nhiệm vụ | Files/Components | Status |
|----------|------------------|--------|
| Perplexity API module | Make.com HTTP module | [ ] |
| OpenAI fallback module | Make.com HTTP module | [ ] |
| Prompt engineering | Make.com text data | [ ] |

### 8.2 Phase 2: Content Display

#### US-NF-ARTICLE-001: Hiển thị Danh sách Bài viết

| Nhiệm vụ | Files/Components | Status |
|----------|------------------|--------|
| Google Sheets client | `src/lib/sheets.ts` | [ ] |
| Articles API | `src/app/api/articles/route.ts` | [ ] |
| Article detail API | `src/app/api/articles/[id]/route.ts` | [ ] |
| Bento Grid components | `src/components/bento/*` | [ ] |
| Article card components | `src/components/article/*` | [ ] |
| Homepage | `src/app/page.tsx` | [ ] |
| Category page | `src/app/(main)/category/[slug]/page.tsx` | [ ] |
| Article detail page | `src/app/(main)/article/[id]/page.tsx` | [ ] |
| Revalidation API | `src/app/api/revalidate/route.ts` | [ ] |

### 8.3 Phase 3: User Engagement

#### US-UF-SUBSCRIPTION-001: Đăng ký Newsletter

| Nhiệm vụ | Files/Components | Status |
|----------|------------------|--------|
| Subscribe form | `src/components/subscription/SubscribeForm.tsx` | [ ] |
| Subscribe API | `src/app/api/subscribe/route.ts` | [ ] |
| Validation schema | `src/lib/validations.ts` | [ ] |

#### US-PF-AUTH-001: Đăng nhập và Đăng ký

| Nhiệm vụ | Files/Components | Status |
|----------|------------------|--------|
| Supabase client setup | `src/lib/supabase/*` | [ ] |
| Login page | `src/app/(auth)/login/page.tsx` | [ ] |
| Register page | `src/app/(auth)/register/page.tsx` | [ ] |
| OAuth callback | `src/app/(auth)/callback/route.ts` | [ ] |
| Auth components | `src/components/auth/*` | [ ] |
| useAuth hook | `src/hooks/useAuth.ts` | [ ] |

#### US-PF-AUTH-002/003: Profile và Bookmarks

| Nhiệm vụ | Files/Components | Status |
|----------|------------------|--------|
| Settings page | `src/app/(protected)/settings/page.tsx` | [ ] |
| Bookmarks page | `src/app/(protected)/bookmarks/page.tsx` | [ ] |
| History page | `src/app/(protected)/history/page.tsx` | [ ] |
| Bookmark API | `src/app/api/user/bookmarks/route.ts` | [ ] |
| History API | `src/app/api/user/history/route.ts` | [ ] |

### 8.4 Phase 4: AI Tools Directory

#### US-TL-TOOLS-001 đến 005

| Nhiệm vụ | Files/Components | Status |
|----------|------------------|--------|
| Database migration | `supabase/migrations/001_ai_tools_tables.sql` | [ ] |
| Tools API | `src/app/api/tools/route.ts` | [ ] |
| Tool detail API | `src/app/api/tools/[slug]/route.ts` | [ ] |
| Vote API | `src/app/api/tools/[slug]/vote/route.ts` | [ ] |
| Reviews API | `src/app/api/tools/[slug]/reviews/route.ts` | [ ] |
| Submit API | `src/app/api/tools/submit/route.ts` | [ ] |
| Tool components | `src/components/tools/*` | [ ] |
| Tools page | `src/app/(main)/tools/page.tsx` | [ ] |
| Tool detail page | `src/app/(main)/tools/[slug]/page.tsx` | [ ] |
| Submit page | `src/app/(main)/tools/submit/page.tsx` | [ ] |
| Admin tools page | `src/app/admin/tools/page.tsx` | [ ] |

### 8.5 Phase 5: Monetization

#### US-SF-MONETIZATION-001: Affiliate Marketing

| Nhiệm vụ | Files/Components | Status |
|----------|------------------|--------|
| Affiliate redirect | `src/app/go/[code]/route.ts` | [ ] |
| Click tracking | Database table + API | [ ] |
| Admin dashboard | `src/app/admin/affiliate/page.tsx` | [ ] |

#### US-SF-MONETIZATION-002: Sponsored Tiles

| Nhiệm vụ | Files/Components | Status |
|----------|------------------|--------|
| Sponsored tile component | `src/components/bento/SponsoredTile.tsx` | [ ] |
| Click tracking API | `src/app/api/sponsored/click/[id]/route.ts` | [ ] |
| Admin campaigns page | `src/app/admin/sponsored/page.tsx` | [ ] |

---

## Checklist Triển khai

### Setup ban đầu
- [ ] Chạy `npx create-next-app@latest`
- [ ] Copy package.json dependencies
- [ ] Chạy `npm install`
- [ ] Setup Shadcn UI (`npx shadcn@latest init`)
- [ ] Thêm Shadcn components cần thiết
- [ ] Tạo file `.env.local` từ `.env.example`
- [ ] Tạo Google Service Account và lấy credentials
- [ ] Tạo Google Sheets với schema đúng
- [ ] Setup Supabase project (Phase 3+)

### Verification
- [ ] `npm run build` - không có lỗi
- [ ] `npm run dev` - chạy được localhost
- [ ] API `/api/articles` - trả về data
- [ ] Homepage load được bài viết
- [ ] ISR revalidation hoạt động

---

## Ghi chú Quan trọng

1. **Next.js 16 Breaking Changes:**
   - Params và searchParams là Promise, cần `await`
   - Node.js 20.9+ required
   - TypeScript 5.1+ required

2. **Google Sheets Limits:**
   - 500 requests/100 seconds/project
   - 100 requests/100 seconds/user

3. **Supabase RLS:**
   - Đảm bảo enable RLS trên tất cả tables
   - Test policies trước khi deploy

4. **Make.com Free Tier:**
   - 1000 operations/month
   - Monitor usage thường xuyên

5. **Perplexity API:**
   - $5 request fee per 1000 calls
   - Có fallback sang OpenAI

---

> **Cập nhật cuối**: 13/01/2026
> **Tác giả**: KynguyenAI Team
> **Version**: 1.0
