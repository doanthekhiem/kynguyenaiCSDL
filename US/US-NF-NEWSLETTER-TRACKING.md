# US-NF-NEWSLETTER-TRACKING - User Stories: Newsletter Tracking

> **Phiên bản**: 1.0
> **Cập nhật**: 23/01/2026
> **Trạng thái**: IMPLEMENTED

---

## Tổng quan

User Stories cho tính năng thu thập và hiển thị tin tức AI từ newsletter emails.

---

## Epic: Newsletter News Aggregation

### US-NEWSLETTER-001: Xem tin tức AI mới nhất

**As a** người dùng
**I want to** xem tin tức AI mới nhất từ các newsletter hàng đầu
**So that** tôi có thể cập nhật xu hướng AI mà không cần đăng ký nhiều newsletter

**Acceptance Criteria:**
- [x] Trang /newsletter hiển thị danh sách tin tức
- [x] Tin tức được dịch sang tiếng Việt
- [x] Hiển thị nguồn newsletter gốc
- [x] Click vào tin sẽ mở link gốc

**Implementation:**
- [app/newsletter/page.tsx](../../services/app/newsletter/page.tsx)
- [components/newsletter/NewsletterCard.tsx](../../services/components/newsletter/NewsletterCard.tsx)

---

### US-NEWSLETTER-002: Lọc tin theo danh mục

**As a** người dùng
**I want to** lọc tin tức theo danh mục (AI Models, AI Tools, Research...)
**So that** tôi có thể tập trung vào chủ đề quan tâm

**Acceptance Criteria:**
- [x] Hiển thị filter tabs theo category
- [x] Click category filter danh sách tin
- [x] URL update với query param (?category=ai-tools)
- [x] Hiển thị số lượng tin trong mỗi category

**Implementation:**
- Category filter trong [app/newsletter/page.tsx](../../services/app/newsletter/page.tsx)
- Categories từ API `/api/newsletter/categories`

---

### US-NEWSLETTER-003: Lọc tin theo nguồn

**As a** người dùng
**I want to** lọc tin tức theo nguồn newsletter
**So that** tôi có thể theo dõi newsletter yêu thích

**Acceptance Criteria:**
- [x] Hiển thị filter dropdown theo source
- [x] Hỗ trợ: The Rundown AI, TLDR AI, AlphaSignal, Ben's Bites...
- [x] URL update với query param (?source=the-rundown-ai)

**Implementation:**
- Source filter trong [app/newsletter/page.tsx](../../services/app/newsletter/page.tsx)
- Sources từ API `/api/newsletter/sources`

---

### US-NEWSLETTER-004: Xem tin nổi bật trên Homepage

**As a** người dùng
**I want to** xem tin tức AI nổi bật ngay trên trang chủ
**So that** tôi có thể nhanh chóng cập nhật tin mới nhất

**Acceptance Criteria:**
- [x] Section "Tin tức AI mới nhất" trên homepage
- [x] Hiển thị 5 tin mới nhất
- [x] 1 tin featured lớn + 4 tin nhỏ
- [x] Link "Xem tất cả" đến /newsletter

**Implementation:**
- [components/newsletter/NewsletterNewsSection.tsx](../../services/components/newsletter/NewsletterNewsSection.tsx)
- Integrated trong [app/page.tsx](../../services/app/page.tsx)

---

## Epic: Newsletter Processing (Backend)

### US-NEWSLETTER-005: Tự động thu thập tin từ email

**As a** system
**I want to** tự động đọc email newsletter và trích xuất tin tức
**So that** tin tức được cập nhật liên tục

**Acceptance Criteria:**
- [x] Kết nối Gmail API qua OAuth2
- [x] Đọc email từ các sender newsletter
- [x] Parse HTML để trích xuất: title, summary, link, thumbnail
- [x] Hỗ trợ format beehiiv và substack
- [x] Resolve redirect links (beehiiv tracking URLs)

**Implementation:**
- [lib/newsletter/gmail.ts](../../services/lib/newsletter/gmail.ts)
- [lib/newsletter/email-parser.ts](../../services/lib/newsletter/email-parser.ts)
- [scripts/gmail-authorize.ts](../../services/scripts/gmail-authorize.ts)

---

### US-NEWSLETTER-006: Dịch tin tức sang tiếng Việt

**As a** system
**I want to** tự động dịch tiêu đề và tóm tắt tin tức sang tiếng Việt
**So that** người dùng Việt Nam có thể đọc dễ dàng

**Acceptance Criteria:**
- [x] Sử dụng Perplexity API để dịch
- [x] Giữ nguyên tên công ty, sản phẩm (OpenAI, ChatGPT...)
- [x] Dịch tự nhiên, dễ đọc
- [x] Fallback nếu API lỗi: hiển thị [EN] + text gốc

**Implementation:**
- [lib/newsletter/perplexity.ts](../../services/lib/newsletter/perplexity.ts)
- Function `translateToVietnamese()`

---

### US-NEWSLETTER-007: Phân loại tin tức tự động

**As a** system
**I want to** tự động phân loại tin tức vào category phù hợp
**So that** người dùng có thể lọc theo chủ đề

**Acceptance Criteria:**
- [x] Sử dụng AI để phân loại
- [x] 8 categories: AI Models, AI Tools, AI Research, AI Business, AI Regulation, AI Tutorials, AI Funding, General
- [x] Fallback về "General" nếu không xác định được

**Implementation:**
- [lib/newsletter/perplexity.ts](../../services/lib/newsletter/perplexity.ts)
- Function `categorizeNews()`
- Combined function `translateAndCategorize()`

---

### US-NEWSLETTER-008: Loại bỏ tin trùng lặp

**As a** system
**I want to** không lưu tin trùng lặp
**So that** người dùng không thấy tin lặp

**Acceptance Criteria:**
- [x] Generate SHA256 hash từ URL
- [x] Check duplicate trước khi insert
- [x] Normalize URL trước khi hash (remove query params, trailing slash)

**Implementation:**
- [lib/newsletter/email-parser.ts](../../services/lib/newsletter/email-parser.ts) - `generateUrlHash()`
- Database constraint: `url_hash VARCHAR(64) UNIQUE`

---

### US-NEWSLETTER-009: Chạy sync định kỳ

**As a** system
**I want to** tự động sync newsletter mỗi 10 phút
**So that** tin tức được cập nhật liên tục

**Acceptance Criteria:**
- [x] Vercel Cron trigger mỗi 10 phút
- [x] Endpoint `/api/newsletter/sync`
- [x] Authentication bằng secret header
- [x] Mark email as read sau khi xử lý
- [x] Add label "KynguyenAI-Processed"

**Implementation:**
- [app/api/newsletter/sync/route.ts](../../services/app/api/newsletter/sync/route.ts)
- [vercel.json](../../services/vercel.json) - cron config

---

## Epic: Admin & Monitoring

### US-NEWSLETTER-010: Health check endpoint

**As an** admin
**I want to** kiểm tra trạng thái newsletter sync
**So that** tôi biết hệ thống có hoạt động bình thường

**Acceptance Criteria:**
- [x] GET /api/newsletter/sync trả về status
- [x] Check Gmail configured
- [x] Check Perplexity configured

**Implementation:**
- GET handler trong [app/api/newsletter/sync/route.ts](../../services/app/api/newsletter/sync/route.ts)

---

### US-NEWSLETTER-011: Processing queue tracking

**As an** admin
**I want to** theo dõi trạng thái xử lý email
**So that** tôi có thể debug khi có lỗi

**Acceptance Criteria:**
- [x] Lưu mỗi email vào processing_queue
- [x] Track status: pending, processing, completed, failed, skipped
- [x] Lưu error message nếu fail
- [x] Track retry count

**Implementation:**
- Table `newsletter_processing_queue`
- Functions trong [lib/newsletter/data.ts](../../services/lib/newsletter/data.ts)

---

## Priority Matrix

| Story | Priority | Complexity | Status |
|-------|----------|------------|--------|
| US-001 | P0 | Medium | ✅ Done |
| US-002 | P1 | Low | ✅ Done |
| US-003 | P1 | Low | ✅ Done |
| US-004 | P0 | Medium | ✅ Done |
| US-005 | P0 | High | ✅ Done |
| US-006 | P0 | Medium | ✅ Done |
| US-007 | P1 | Medium | ✅ Done |
| US-008 | P0 | Low | ✅ Done |
| US-009 | P0 | Medium | ✅ Done |
| US-010 | P2 | Low | ✅ Done |
| US-011 | P2 | Low | ✅ Done |

---

## Definition of Done

- [x] Code implemented và TypeScript không lỗi
- [x] Database migration tạo đúng schema
- [x] API routes hoạt động
- [x] Frontend hiển thị đúng
- [x] Tài liệu cập nhật

---

## Xem thêm

- [HLD-NF-NEWSLETTER-TRACKING.md](../../HLD/MVP.1/HLD-NF-NEWSLETTER-TRACKING.md) - High Level Design
- [DD-Newsletter-Tracking.md](../../DD/DD-Newsletter-Tracking.md) - Detail Design
