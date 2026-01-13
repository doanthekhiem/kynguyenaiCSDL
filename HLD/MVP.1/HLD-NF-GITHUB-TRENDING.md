# HLD-NF-GITHUB-TRENDING - Tích hợp GitHub Trending

> **Phiên bản**: 2.0 - Đơn giản hóa cho MVP
> **Cập nhật**: 26/12/2024
> **Thay đổi chính**: Tích hợp vào Cron Job chung, lưu vào Airtable

---

## 1. Trạng thái: MERGED

**Lưu ý:** Chức năng này đã được tích hợp vào file [HLD-DF-DATA-PIPELINE.md](./HLD-DF-DATA-PIPELINE.md).

Trong kiến trúc MVP đơn giản, việc fetch GitHub trending được thực hiện trong Cron Job chung thay vì service riêng.

---

## 2. Tóm tắt

### 2.1 Mục tiêu

- Thu thập repos AI/ML trending trên GitHub
- Dịch mô tả sang tiếng Việt
- Hiển thị trên homepage trong Bento Grid

### 2.2 Kiến trúc MVP

```
┌─────────────────────────────────────────────────────────────────────┐
│                   GITHUB TRENDING (IN CRON JOB)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   CRON JOB /api/cron                                                 │
│   │                                                                  │
│   ├── 1. Fetch from GitHub Search API                               │
│   │       • Query: topic:machine-learning OR topic:ai               │
│   │       • Sort by stars, last 7 days                              │
│   │       • Limit: 5 repos                                          │
│   │                                                                  │
│   ├── 2. Check duplicate in Airtable                                │
│   │                                                                  │
│   ├── 3. Translate description with Gemini                         │
│   │                                                                  │
│   └── 4. Save to Airtable (GitHub_Trending table)                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Airtable Schema

### Table: GitHub_Trending

| Field | Type | Mô tả |
|-------|------|-------|
| repo_name | Single line text | Primary, format: "owner/repo" |
| url | URL | GitHub URL |
| description_vi | Long text | Mô tả tiếng Việt (dịch bởi AI) |
| stars | Number | Số stars |
| language | Single select | Python, JavaScript, TypeScript, etc. |
| trending_date | Date | Ngày fetch |

---

## 4. GitHub API Integration

### 4.1 Fetcher Function

```typescript
// lib/github.ts

export interface GitHubRepo {
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
}

export async function fetchGitHubTrending(): Promise<GitHubRepo[]> {
  // Fetch AI/ML repos created in last 7 days
  const date = new Date();
  date.setDate(date.getDate() - 7);
  const since = date.toISOString().split('T')[0];

  const query = encodeURIComponent(
    `topic:machine-learning OR topic:ai OR topic:llm OR topic:deep-learning created:>${since} stars:>50`
  );

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=5`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        // Optional: Add token for higher rate limits
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();
  return data.items || [];
}
```

### 4.2 Rate Limits

| Auth | Limit | Notes |
|------|-------|-------|
| Unauthenticated | 60/hour | Chia sẻ với tất cả users từ cùng IP |
| With Token | 5,000/hour | Đủ cho mọi use case |

**Khuyến nghị:** Dùng Personal Access Token để tránh rate limit issues.

---

## 5. Processing trong Cron

### 5.1 Flow

```typescript
// Trong app/api/cron/route.ts

// Fetch GitHub trending
console.log('Fetching GitHub trending...');
const repos = await fetchGitHubTrending();

for (const repo of repos) {
  try {
    // Check duplicate
    const exists = await checkGitHubDuplicate(repo.full_name);
    if (exists) continue;

    // Translate description with AI
    let descriptionVi = repo.description || '';
    if (repo.description) {
      const translated = await processArticle(
        repo.full_name,
        repo.description
      );
      if (translated) {
        descriptionVi = translated.summary_vi;
      }
    }

    // Save to Airtable
    await githubTable.create({
      repo_name: repo.full_name,
      url: repo.html_url,
      description_vi: descriptionVi,
      stars: repo.stargazers_count,
      language: repo.language || 'Unknown',
      trending_date: new Date().toISOString().split('T')[0],
    });

    results.github.saved++;

  } catch (error) {
    console.error(`Error processing repo: ${repo.full_name}`, error);
  }
}
```

### 5.2 Dedup Check

```typescript
async function checkGitHubDuplicate(repoName: string): Promise<boolean> {
  const records = await githubTable.select({
    filterByFormula: `{repo_name} = "${repoName}"`,
    maxRecords: 1,
  }).firstPage();

  return records.length > 0;
}
```

---

## 6. Frontend Display

### 6.1 API Route

```typescript
// app/api/github/trending/route.ts

import { NextResponse } from 'next/server';
import { githubTable } from '@/lib/airtable';

export async function GET() {
  const records = await githubTable.select({
    maxRecords: 10,
    sort: [{ field: 'stars', direction: 'desc' }],
  }).firstPage();

  const repos = records.map(record => ({
    id: record.id,
    repoName: record.get('repo_name'),
    url: record.get('url'),
    descriptionVi: record.get('description_vi'),
    stars: record.get('stars'),
    language: record.get('language'),
  }));

  return NextResponse.json({ data: repos });
}
```

### 6.2 Component

```typescript
// components/github-trending-card.tsx

interface GitHubCardProps {
  repo: {
    repoName: string;
    url: string;
    descriptionVi: string;
    stars: number;
    language: string;
  };
}

export function GitHubCard({ repo }: GitHubCardProps) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg border hover:shadow-md transition"
    >
      <h3 className="font-semibold text-sm truncate">{repo.repoName}</h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {repo.descriptionVi}
      </p>
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
        <span>⭐ {repo.stars.toLocaleString()}</span>
        <span>{repo.language}</span>
      </div>
    </a>
  );
}
```

---

## 7. Đã loại bỏ

Các thành phần sau đã được loại bỏ trong kiến trúc MVP:

- ❌ Separate `nf-github-trending` service
- ❌ PostgreSQL tables (github_trending, github_trending_history, github_language)
- ❌ Redis caching layer
- ❌ Cheerio HTML scraper (dùng GitHub Search API thay thế)
- ❌ Multi-layer cache strategy
- ❌ GraphQL API
- ❌ State machine (FETCHED → TRANSLATING → ACTIVE)
- ❌ History tracking

---

## 8. Kế hoạch Scale

Khi cần mở rộng:

```
MVP                          →  Scale Phase
──────────────────────────────────────────────────
5 repos/run                  →  25 repos/run
Inline trong cron            →  Separate cron job
Airtable storage             →  Supabase PostgreSQL
No caching                   →  Redis cache
Search API only              →  Trending page scraper
No history                   →  Star growth tracking
```

---

## 9. Xem thêm

- [HLD-DF-DATA-PIPELINE.md](./HLD-DF-DATA-PIPELINE.md) - Chi tiết Cron Job
- [HLD-CF-AI-PROCESSING.md](./HLD-CF-AI-PROCESSING.md) - Dịch description
