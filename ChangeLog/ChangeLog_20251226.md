# ChangeLog - 26/12/2024

## Tóm tắt: Đơn giản hóa Kiến trúc cho FE Developer

### Lý do thay đổi

- Kiến trúc cũ quá phức tạp (7 microservices, PostgreSQL, Redis, GraphQL)
- Không phù hợp với FE developer ít kinh nghiệm database
- Chi phí vận hành cao ($20-50/tháng)
- Thời gian triển khai lâu (2-3 tuần)
- Yêu cầu: ~30 bài viết tự động/ngày, dễ làm, có thể scale sau

---

## Thay đổi chính

| Thành phần | Cũ | Mới |
|------------|-----|-----|
| **Database** | PostgreSQL (Supabase) | Airtable |
| **Cache** | Redis (Upstash) | Không cần |
| **Backend** | 7 microservices | Next.js API Routes |
| **BFF** | Apollo GraphQL | Không cần |
| **Queue** | Redis Queue | Không cần |
| **Cron** | Multiple cron jobs | 1 Vercel Cron |
| **Chi phí** | $20-50/tháng | $0-5/tháng |

---

## Files đã cập nhật

### 1. Design/ComponentView.md
**Thay đổi:** Viết lại hoàn toàn
- Loại bỏ: 7 microservices, BFF Layer, Redis Queue
- Thêm: Kiến trúc đơn giản với Next.js + Airtable
- Thêm: Airtable schema cho 3 tables (Articles, GitHub_Trending, Subscribers)
- Thêm: Flow xử lý tự động với Vercel Cron

### 2. Design/Tech-Stack.md
**Thay đổi:** Viết lại hoàn toàn
- Loại bỏ: PostgreSQL, Supabase, Redis, Upstash, Apollo GraphQL
- Thêm: Airtable (database + UI quản lý)
- Giữ nguyên: Next.js 14, Tailwind CSS, Shadcn/UI
- Giữ nguyên: Gemini Flash 1.5, OpenAI fallback
- Thêm: Migration path từ Airtable → Supabase

### 3. HLD/MVP.1/HLD-NF-ARTICLE.md
**Thay đổi:** Viết lại - Phiên bản 2.0
- Loại bỏ: PostgreSQL schema, Supabase Row-Level Security
- Loại bỏ: State machine phức tạp (7 states → 3 states)
- Thêm: Airtable table schema
- Thêm: Next.js API Routes implementation
- Đơn giản hóa: State chỉ còn draft/published/archived

### 4. HLD/MVP.1/HLD-CF-AI-PROCESSING.md
**Thay đổi:** Viết lại - Phiên bản 2.0
- Loại bỏ: Redis Job Queue, Worker pattern
- Loại bỏ: AI_PROCESSING_JOB table, AI_COST_LOG table
- Loại bỏ: Dead Letter Queue, Budget management
- Thêm: Xử lý đồng bộ trong Cron Job
- Giữ nguyên: Gemini integration, OpenAI fallback, Prompt engineering

### 5. HLD/MVP.1/HLD-DF-DATA-PIPELINE.md
**Thay đổi:** Viết lại - Phiên bản 2.0
- Loại bỏ: Pipeline Orchestrator class
- Loại bỏ: 5+ cron jobs → 1 cron job
- Loại bỏ: Redis dedup cache
- Thêm: Vercel Cron đơn giản
- Thêm: Dedup bằng Airtable formula check
- Thêm: Alternative với external cron (cron-job.org)

### 6. HLD/MVP.1/HLD-NF-AGGREGATION.md
**Thay đổi:** Đánh dấu MERGED
- Chức năng được tích hợp vào HLD-DF-DATA-PIPELINE.md
- Giữ lại: NewsData.io integration documentation
- Giữ lại: Basic filtering rules

### 7. HLD/MVP.1/HLD-NF-GITHUB-TRENDING.md
**Thay đổi:** Đánh dấu MERGED
- Chức năng được tích hợp vào HLD-DF-DATA-PIPELINE.md
- Giữ lại: GitHub API integration documentation
- Loại bỏ: Cheerio scraper, Redis cache, PostgreSQL tables

### 8. HLD/MVP.1/HLD-UF-SUBSCRIPTION.md
**Thay đổi:** Đánh dấu DEFERRED
- MVP chỉ thu thập email (không gửi newsletter)
- Loại bỏ: Double opt-in, Resend integration, Email templates
- Thêm: Simple subscribe form + Airtable storage
- Thêm: Migration path cho Phase 2

---

## Kiến trúc mới

```
┌─────────────────────────────────────────────────────────────┐
│                    KIẾN TRÚC ĐƠN GIẢN                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              VERCEL (Free Tier)                      │   │
│   │  ┌─────────────────────────────────────────────┐    │   │
│   │  │           Next.js 14 App                     │    │   │
│   │  │  • Frontend (React + Tailwind + Shadcn)     │    │   │
│   │  │  • API Routes (/api/*)                       │    │   │
│   │  │  • Cron Job (1 job, chạy mỗi 30 phút)       │    │   │
│   │  └─────────────────────────────────────────────┘    │   │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                 │
│                            ▼                                 │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              AIRTABLE (Free Tier)                    │   │
│   │  • 1000 records miễn phí                            │   │
│   │  • UI quản lý như Excel/Notion                      │   │
│   │  • Không cần biết SQL                               │   │
│   │  • API sẵn có                                       │   │
│   └─────────────────────────────────────────────────────┘   │
│                            │                                 │
│                            ▼                                 │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              EXTERNAL APIs                           │   │
│   │  • NewsData.io (tin tức AI)                         │   │
│   │  • GitHub API (trending repos)                      │   │
│   │  • Gemini API (dịch + tóm tắt)                      │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Chi phí mới

| Service | Free Tier | Dự kiến sử dụng | Chi phí |
|---------|-----------|-----------------|---------|
| Vercel | 100k requests | ~50k requests | $0 |
| Airtable | 1000 records | ~900 records/tháng | $0 |
| NewsData.io | 200 requests/ngày | ~48 requests/ngày | $0 |
| GitHub API | 5000/giờ | ~100/ngày | $0 |
| Gemini Flash | Free tier | ~30 bài × 30 ngày | ~$2-5 |

**Tổng:** $0-5/tháng (trước đây: $20-50/tháng)

---

## Lưu ý Migration

Khi cần scale lên (>1000 bài, >10k users):

```
Airtable (1000 records)
        │
        ▼ Migrate dễ dàng
Supabase (PostgreSQL + UI quản lý)
        │
        ▼ Nếu cần thêm
Redis (Upstash) cho caching
```

**Cách migrate:**
1. Export CSV từ Airtable
2. Import vào Supabase
3. Update lib/airtable.ts → lib/supabase.ts
4. Test và deploy

---

## Files không thay đổi

- `Design/BusinessContextVision.md` - Không ảnh hưởng
- `HLD/MVP.1/HLD-SF-MONETIZATION.md` - Giữ nguyên concept
- `HLD/MVP.1/HLD-PF-AUTH.md` - Không cần auth cho MVP

---

## Người thực hiện

- Thay đổi được thực hiện theo yêu cầu đơn giản hóa kiến trúc
- Mục tiêu: Phù hợp cho FE developer, dễ triển khai, chi phí thấp
