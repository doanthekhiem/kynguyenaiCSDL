# HLD-NF-SKILLS-TRENDING - Tích hợp AI Agent Skills Trending

> **Phiên bản**: 1.0
> **Cập nhật**: 22/01/2026
> **Thay đổi chính**: Tích hợp skills.sh trending, tương tự GitHub Trending

---

## 1. Trạng thái: ACTIVE

Chức năng hiển thị AI Agent Skills đang trending từ skills.sh, song song với GitHub Trending.

---

## 2. Tóm tắt

### 2.1 Mục tiêu

- Thu thập AI Agent Skills đang trending từ skills.sh
- Hiển thị trên homepage trong Bento Grid (song song với GitHub Trending)
- Cung cấp trang `/skills` đầy đủ với bộ lọc

### 2.2 Nguồn dữ liệu

| Nguồn        | URL                        | Nội dung                              |
| ------------ | -------------------------- | ------------------------------------- |
| Trending 24h | https://skills.sh/trending | Skills trending trong 24 giờ          |
| All Time     | https://skills.sh/         | Skills xếp hạng theo tổng số installs |

### 2.3 Kiến trúc

```
┌─────────────────────────────────────────────────────────────────────┐
│                   AI SKILLS TRENDING ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   skills.sh/trending                                                 │
│         │                                                            │
│         ▼                                                            │
│   ┌─────────────────────────────────┐                               │
│   │   lib/skills-trending.ts        │                               │
│   │   • fetchSkillsTrending()       │                               │
│   │   • parseSkillsTrending()       │                               │
│   │   • In-memory cache (5 min)     │                               │
│   └─────────────────────────────────┘                               │
│         │                                                            │
│         ├─────────────────┬─────────────────┐                       │
│         ▼                 ▼                 ▼                       │
│   ┌───────────┐    ┌───────────────┐  ┌──────────────┐             │
│   │ HeroSection│   │ /skills page  │  │ /api/skills  │             │
│   │ SkillsTile │   │ Full listing  │  │ (optional)   │             │
│   └───────────┘    └───────────────┘  └──────────────┘             │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Data Types

### 3.1 AgentSkill Interface

```typescript
// types/index.ts

export interface AgentSkill {
  rank: number; // Thứ hạng (1, 2, 3...)
  name: string; // Tên skill: "vercel-react-best-practices"
  owner: string; // Owner/repo: "vercel-labs/agent-skills"
  url: string; // Link chi tiết: "https://skills.sh/..."
  installs: number; // Số lượt cài đặt: 5200
  installs_display: string; // Hiển thị: "5.2K"
  trending_date: string; // ISO date
}
```

---

## 4. Scraper Implementation

### 4.1 Skills Fetcher

```typescript
// lib/skills-trending.ts

export async function fetchSkillsTrending(
  limit = 10,
  type: "trending" | "alltime" = "trending",
): Promise<AgentSkill[]> {
  // Check in-memory cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data.slice(0, limit);
  }

  // Fetch HTML from skills.sh
  const url = type === "trending" ? "https://skills.sh/trending" : "https://skills.sh/";

  const response = await fetch(url, {
    headers: { "User-Agent": "..." },
    next: { revalidate: 300 }, // ISR: 5 minutes
  });

  const html = await response.text();
  const skills = parseSkillsTrending(html);

  // Update cache
  cache.set(cacheKey, { data: skills, timestamp: Date.now() });

  return skills.slice(0, limit);
}
```

### 4.2 HTML Parser

Skills.sh HTML structure:

```html
<a class="group grid..." href="/owner/repo/skill-name">
  <span>1</span>
  <!-- rank -->
  <h3>skill-name</h3>
  <!-- skill name -->
  <p>owner/repo</p>
  <!-- owner -->
  <span>5.3K</span>
  <!-- installs -->
</a>
```

Regex pattern:

```typescript
const skillBlockPattern =
  /<a[^>]*class="[^"]*group[^"]*grid[^"]*"[^>]*href="\/([^"\/]+)\/([^"\/]+)\/([^"\/]+)"[^>]*>([\s\S]*?)<\/a>/gi;
```

### 4.3 Caching Strategy

| Layer           | TTL       | Purpose                  |
| --------------- | --------- | ------------------------ |
| In-memory cache | 5 minutes | Tránh fetch quá nhiều    |
| Next.js ISR     | 5 minutes | Static page regeneration |

---

## 5. Frontend Components

### 5.1 SkillsTile (BentoGrid)

```typescript
// components/bento/BentoGrid.tsx

export function SkillsTile({ children, className }) {
  return (
    <div className={cn(
      "row-span-2 relative overflow-hidden",
      "bg-gradient-to-b from-[hsl(280,60%,12%)] to-[hsl(300,50%,8%)]",
      "border border-purple-500/20 rounded-2xl p-5",
      // ... purple/pink theme
    )}>
      {children}
    </div>
  );
}
```

### 5.2 HeroSection Integration

```typescript
// components/home/HeroSection.tsx

export async function HeroSection() {
  const githubRepos = await fetchGitHubTrending(5);
  const trendingSkills = await fetchSkillsTrending(5);

  return (
    <BentoGrid>
      <HeroTile>{/* Featured article */}</HeroTile>
      <GitHubTile>{/* GitHub Trending */}</GitHubTile>
      <SkillsTile>{/* AI Skills Trending */}</SkillsTile>
      {/* Articles */}
    </BentoGrid>
  );
}
```

### 5.3 Skills Page

```typescript
// app/skills/page.tsx

export const revalidate = 300; // ISR: 5 minutes

export default async function SkillsTrendingPage({ searchParams }) {
  const type = searchParams.type || "trending";
  const skills = await fetchSkillsTrending(50, type);

  return (
    <>
      <Header />
      <FilterButtons type={type} />  {/* Trending 24h | All Time */}
      <SkillsList skills={skills} />
      <Footer />
    </>
  );
}
```

---

## 6. URLs & Routes

| Route                   | Description                             |
| ----------------------- | --------------------------------------- |
| `/`                     | Home page với Skills tile               |
| `/skills`               | Full skills listing (default: trending) |
| `/skills?type=trending` | Trending 24h                            |
| `/skills?type=alltime`  | All time ranking                        |

---

## 7. Comparison với GitHub Trending

| Feature        | GitHub Trending     | Skills Trending    |
| -------------- | ------------------- | ------------------ |
| **Source**     | github.com/trending | skills.sh/trending |
| **Data type**  | Repositories        | AI Agent Skills    |
| **Metric**     | Stars               | Installs           |
| **Filters**    | Language, Time      | Time only          |
| **Tile color** | Cyan/dark           | Purple/pink        |

---

## 8. Performance

### 8.1 Metrics

- First fetch: ~500-1000ms (cold)
- Cached fetch: ~0ms (from memory)
- Page ISR: 5 minutes revalidation

### 8.2 Fallback

Nếu skills.sh không trả lời:

1. Return cached data (even if stale)
2. Return empty array nếu không có cache

---

## 9. Files thay đổi

### Mới tạo

- `types/index.ts` - AgentSkill interface
- `lib/skills-trending.ts` - Scraper
- `app/skills/page.tsx` - Dedicated page

### Cập nhật

- `components/bento/BentoGrid.tsx` - SkillsTile component
- `components/home/HeroSection.tsx` - Skills tile integration

---

## 10. Xem thêm

- [HLD-NF-GITHUB-TRENDING.md](./HLD-NF-GITHUB-TRENDING.md) - GitHub Trending (tương tự)
- [Detail-Design.md](../DD/Detail-Design.md) - Thiết kế chi tiết
