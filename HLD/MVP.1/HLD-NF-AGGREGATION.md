# HLD-NF-AGGREGATION - Thu thập Tin tức (News Aggregation)

> **Phiên bản**: 2.0 - Đơn giản hóa cho MVP
> **Cập nhật**: 26/12/2024
> **Thay đổi chính**: Tích hợp vào Cron Job chung, không cần service riêng

---

## 1. Trạng thái: MERGED

**Lưu ý:** Chức năng này đã được tích hợp vào file [HLD-DF-DATA-PIPELINE.md](./HLD-DF-DATA-PIPELINE.md).

Trong kiến trúc MVP đơn giản, việc thu thập tin tức được thực hiện trực tiếp trong Cron Job thay vì một service riêng biệt.

---

## 2. Tóm tắt Thay đổi

### 2.1 Thiết kế cũ (Service riêng biệt)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    NF-AGGREGATION SERVICE                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────┐         ┌─────────────┐         ┌─────────────┐   │
│   │NewsData.io  │         │ GitHub API  │         │  (Future)   │   │
│   │    API      │         │  Trending   │         │ HackerNews  │   │
│   └──────┬──────┘         └──────┬──────┘         └──────┬──────┘   │
│          │                       │                       │          │
│          └───────────────┬───────┴───────────────────────┘          │
│                          │                                          │
│                          ▼                                          │
│                 ┌─────────────────┐                                 │
│                 │  nf-aggregation │                                 │
│                 │    (Fetcher)    │                                 │
│                 └────────┬────────┘                                 │
│                          │                                          │
│          ┌───────────────┼───────────────┐                          │
│          │               │               │                          │
│          ▼               ▼               ▼                          │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                  │
│   │  Filtering  │ │   Dedup     │ │  nf-article │                  │
│   │   Engine    │ │   Check     │ │   (Store)   │                  │
│   └─────────────┘ └─────────────┘ └─────────────┘                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Thiết kế mới (Tích hợp trong Cron)

```
┌─────────────────────────────────────────────────────────────────────┐
│               CRON JOB /api/cron (bao gồm aggregation)               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   // 1. FETCH NEWS (trước đây là nf-aggregation)                    │
│   const articles = await fetchNewsData();                           │
│                                                                      │
│   // 2. CHECK DUPLICATE (trước đây là dedup service)                │
│   const exists = await checkDuplicate(article.link);                │
│                                                                      │
│   // 3. AI PROCESS (trước đây là cf-ai-processing)                  │
│   const processed = await processArticle(title, content);           │
│                                                                      │
│   // 4. SAVE (trước đây là nf-article)                              │
│   await articlesTable.create({ ... });                              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. NewsData.io Integration

### 3.1 Fetcher Function

```typescript
// lib/newsdata.ts

export interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  description: string;
  content?: string;
  pubDate: string;
  image_url?: string;
  source_id: string;
  source_name: string;
  category: string[];
  language: string;
  keywords?: string[];
}

export async function fetchNewsData(): Promise<NewsDataArticle[]> {
  const API_KEY = process.env.NEWSDATA_API_KEY;

  if (!API_KEY) {
    throw new Error('NEWSDATA_API_KEY is not configured');
  }

  // AI-focused search query
  const params = new URLSearchParams({
    apikey: API_KEY,
    q: 'AI OR "artificial intelligence" OR ChatGPT OR GPT OR LLM OR "machine learning"',
    category: 'technology,science',
    language: 'en',
    size: '10', // Limit to 10 per request
  });

  const response = await fetch(
    `https://newsdata.io/api/1/news?${params}`
  );

  if (!response.ok) {
    throw new Error(`NewsData API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(`NewsData error: ${data.results?.message}`);
  }

  return data.results || [];
}
```

### 3.2 Quota Management

| Tier | Requests/Day | Requests/Month | Cost |
|------|-------------|----------------|------|
| Free | 200 | 6,000 | $0 |
| Basic | 2,000 | 60,000 | $79/month |

**Với Cron mỗi 30 phút:**
- 48 runs/day × 1 request = 48 requests/day
- Dư sức trong Free tier

---

## 4. Filtering Rules (Đơn giản hóa)

### 4.1 Basic Validation

```typescript
// Trong cron handler
function isValidArticle(article: NewsDataArticle): boolean {
  // Required fields
  if (!article.title || !article.link) {
    return false;
  }

  // Minimum title length
  if (article.title.length < 10) {
    return false;
  }

  // Valid URL
  try {
    new URL(article.link);
  } catch {
    return false;
  }

  return true;
}
```

### 4.2 Spam Detection (Optional)

```typescript
const SPAM_PATTERNS = [
  /\b(buy now|limited offer|click here)\b/i,
  /\b(casino|gambling|lottery)\b/i,
];

function isSpam(article: NewsDataArticle): boolean {
  const text = `${article.title} ${article.description || ''}`;

  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) {
      return true;
    }
  }

  return false;
}
```

---

## 5. Deduplication (Đơn giản)

### 5.1 URL-based Check

```typescript
// Trong cron handler
async function checkDuplicate(url: string): Promise<boolean> {
  const records = await articlesTable.select({
    filterByFormula: `{original_url} = "${url}"`,
    maxRecords: 1,
  }).firstPage();

  return records.length > 0;
}
```

**Lưu ý:** Cách này đơn giản nhưng chậm hơn Redis cache. Phù hợp cho MVP với ~50 requests/day.

---

## 6. Đã loại bỏ

Các thành phần sau đã được loại bỏ trong kiến trúc MVP:

- ❌ `nf-aggregation` service riêng biệt
- ❌ Filter Chain Architecture (RequiredFieldsFilter, SpamFilter, RelevanceFilter)
- ❌ DeduplicationService class với Redis cache
- ❌ QuotaService class với Redis tracking
- ❌ Multiple news providers (HackerNews, ProductHunt)
- ❌ PostgreSQL tables cho dedup hashes

---

## 7. Kế hoạch Scale

Khi cần mở rộng:

```
MVP                          →  Scale Phase
──────────────────────────────────────────────────
Inline trong cron            →  Separate aggregation service
1 source (NewsData.io)       →  Multiple sources
URL check trong Airtable     →  Redis dedup cache
No filtering                 →  AI-powered relevance scoring
```

---

## 8. Xem thêm

- [HLD-DF-DATA-PIPELINE.md](./HLD-DF-DATA-PIPELINE.md) - Chi tiết implementation
- [HLD-CF-AI-PROCESSING.md](./HLD-CF-AI-PROCESSING.md) - Xử lý AI
- [HLD-NF-ARTICLE.md](./HLD-NF-ARTICLE.md) - Lưu trữ bài viết
