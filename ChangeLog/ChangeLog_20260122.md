# ChangeLog - 22/01/2026

## Tóm tắt: Tích hợp AI Agent Skills Trending

### Lý do thay đổi

- Mở rộng nội dung trending song song với GitHub Trending
- Giới thiệu AI Agent Skills từ skills.sh đến người dùng Việt Nam
- Tận dụng kiến trúc scraping đã có từ GitHub Trending

---

## Thay đổi chính

| Thành phần           | Trước           | Sau                          |
| -------------------- | --------------- | ---------------------------- |
| **Trending sources** | GitHub only     | GitHub + **Skills.sh**       |
| **BentoGrid tiles**  | GitHub Trending | GitHub + **Skills Trending** |
| **Pages**            | `/github`       | `/github` + **`/skills`**    |
| **Types**            | GitHubRepo      | GitHubRepo + **AgentSkill**  |

---

## Files mới

### 1. types/index.ts

**Thay đổi:** Thêm AgentSkill interface

```typescript
export interface AgentSkill {
  rank: number;
  name: string;
  owner: string;
  url: string;
  installs: number;
  installs_display: string;
  trending_date: string;
}
```

### 2. lib/skills-trending.ts

**Mới tạo:** Scraper cho skills.sh

- `fetchSkillsTrending(limit, type)` - Fetch skills
- `parseSkillsTrending(html)` - Parse HTML
- `parseInstallCount(str)` - Parse "5.2K" → 5200
- In-memory cache 5 phút

### 3. app/skills/page.tsx

**Mới tạo:** Trang Skills Trending đầy đủ

- Bộ lọc: Trending (24h) | All Time
- Danh sách skills với rank, name, owner, installs
- Skeleton loading
- ISR revalidate 5 phút

### 4. HLD/MVP.1/HLD-NF-SKILLS-TRENDING.md

**Mới tạo:** Tài liệu HLD cho tính năng

---

## Files cập nhật

### 1. components/bento/BentoGrid.tsx

**Thay đổi:** Thêm SkillsTile component

- Gradient tím/hồng để phân biệt với GitHub (xanh cyan)
- Glow effect khi hover

### 2. components/home/HeroSection.tsx

**Thay đổi:**

- Import `fetchSkillsTrending`
- Import `SkillsTile`
- Thêm SkillsTile vào BentoGrid bên cạnh GitHubTile
- Thêm icons: SkillsIcon, DownloadIcon

---

## Kiến trúc

```
┌─────────────────────────────────────────────────────────────────────┐
│                   HOME PAGE - HERO SECTION                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌───────────────────┬────────────────┬────────────────┐           │
│   │                   │                │                │           │
│   │   Featured        │   GitHub       │   AI Skills    │           │
│   │   Article         │   Trending     │   Trending     │           │
│   │   (2x2)           │   (Cyan)       │   (Purple)     │           │
│   │                   │                │                │           │
│   │                   │   1. repo-1    │   1. skill-1   │           │
│   │                   │   2. repo-2    │   2. skill-2   │           │
│   │                   │   3. repo-3    │   3. skill-3   │           │
│   │                   │   4. repo-4    │   4. skill-4   │           │
│   │                   │   5. repo-5    │   5. skill-5   │           │
│   │                   │                │                │           │
│   └───────────────────┴────────────────┴────────────────┘           │
│                                                                      │
│   ┌────────┬────────┬────────┬────────┬────────┬────────┐          │
│   │ Article│ Article│ Article│ Article│ Article│ Article│          │
│   └────────┴────────┴────────┴────────┴────────┴────────┘          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Top Skills Trending (22/01/2026)

| Rank | Skill                       | Owner                    | Installs |
| ---- | --------------------------- | ------------------------ | -------- |
| 1    | vercel-react-best-practices | vercel-labs/agent-skills | 5.3K     |
| 2    | remotion-best-practices     | remotion-dev/skills      | 4.5K     |
| 3    | web-design-guidelines       | vercel-labs/agent-skills | 3.9K     |
| 4    | frontend-design             | anthropics/skills        | 1.2K     |
| 5    | skill-creator               | anthropics/skills        | 813      |

---

## Caching Strategy

| Layer           | TTL        | Purpose                         |
| --------------- | ---------- | ------------------------------- |
| In-memory cache | 5 phút     | Tránh fetch skills.sh quá nhiều |
| Next.js ISR     | 5 phút     | Static page regeneration        |
| Fallback        | Stale data | Nếu skills.sh không trả lời     |

---

## URLs

| Route                   | Description               |
| ----------------------- | ------------------------- |
| `/`                     | Home page với Skills tile |
| `/skills`               | Full skills listing       |
| `/skills?type=trending` | Trending 24h              |
| `/skills?type=alltime`  | All time ranking          |

---

## Người thực hiện

- Feature: AI Agent Skills Trending
- Ngày: 22/01/2026
- Mục tiêu: Mở rộng nguồn trending nội dung AI
