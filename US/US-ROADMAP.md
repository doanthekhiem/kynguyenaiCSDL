# Roadmap Triển khai User Stories - KynguyenAI.vn

## Tổng quan

Tài liệu này sắp xếp thứ tự triển khai các User Story theo **dependencies** (phụ thuộc) và **business priority** (ưu tiên kinh doanh).

---

## Sơ đồ Dependencies

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DEPENDENCY FLOW                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   PHASE 1: CORE DATA INFRASTRUCTURE (Nền tảng dữ liệu)                      │
│   ════════════════════════════════════════════════════                      │
│                                                                              │
│   ┌──────────────────────┐                                                  │
│   │  US-DF-DATA-PIPELINE │ ◄─── Cần làm TRƯỚC TIÊN                         │
│   │  (Thu thập tin tức)  │      (Không có data = không có gì hiển thị)     │
│   └──────────┬───────────┘                                                  │
│              │                                                               │
│              ▼                                                               │
│   ┌──────────────────────┐                                                  │
│   │  US-CF-AI-PROCESSING │ ◄─── Phụ thuộc vào Data Pipeline                │
│   │  (Dịch & Tóm tắt)    │      (Xử lý data sau khi thu thập)              │
│   └──────────┬───────────┘                                                  │
│              │                                                               │
│              ▼                                                               │
│   PHASE 2: CONTENT DISPLAY (Hiển thị nội dung)                              │
│   ════════════════════════════════════════════                              │
│                                                                              │
│   ┌──────────────────────┐                                                  │
│   │  US-NF-ARTICLE       │ ◄─── Phụ thuộc vào AI Processing                │
│   │  (Hiển thị bài viết) │      (Cần có data đã xử lý để hiển thị)         │
│   └──────────┬───────────┘                                                  │
│              │                                                               │
│              │                                                               │
│   PHASE 3: USER ENGAGEMENT (Tương tác người dùng)                           │
│   ════════════════════════════════════════════════                          │
│              │                                                               │
│              ├─────────────────────────────────────┐                        │
│              ▼                                     ▼                        │
│   ┌──────────────────────┐          ┌──────────────────────┐               │
│   │  US-UF-SUBSCRIPTION  │          │  US-PF-AUTH          │               │
│   │  (Đăng ký Newsletter)│          │  (Xác thực)          │               │
│   └──────────────────────┘          └──────────────────────┘               │
│              │                                     │                        │
│              │         Độc lập với nhau            │                        │
│              │                                     │                        │
│   PHASE 4: MONETIZATION (Kiếm tiền)                                         │
│   ═════════════════════════════════                                         │
│              │                                     │                        │
│              └─────────────────┬───────────────────┘                        │
│                                ▼                                            │
│                   ┌──────────────────────┐                                  │
│                   │  US-SF-MONETIZATION  │ ◄─── Cần có traffic trước       │
│                   │  (Affiliate & Ads)   │      (Có user mới có revenue)   │
│                   └──────────────────────┘                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Chi tiết Thứ tự Triển khai

### PHASE 1: Core Data Infrastructure (Tuần 1-2)

> **Mục tiêu:** Có dữ liệu để hiển thị trên website

| STT | User Story | Mô tả | Priority | Dependencies |
|-----|------------|-------|----------|--------------|
| 1.1 | **US-DF-DATA-PIPELINE-001** | Thu thập tin tức tự động qua Make.com | P0 | Không |
| 1.2 | **US-CF-AI-PROCESSING-001** | Dịch và tóm tắt nội dung bằng AI | P0 | 1.1 |
| 1.3 | **US-DF-DATA-PIPELINE-002** | Thu thập GitHub Trending | P2 | 1.1 |

**Checklist Phase 1:**
- [ ] Cấu hình Make.com account
- [ ] Kết nối Gmail để watch newsletters
- [ ] Tạo Google Sheets với đúng schema
- [ ] Cấu hình Perplexity API key
- [ ] Cấu hình OpenAI API key (fallback)
- [ ] Test scenario với 1 email newsletter
- [ ] Verify dữ liệu lưu đúng vào Sheets

---

### PHASE 2: Content Display (Tuần 2-3)

> **Mục tiêu:** Website hiển thị được nội dung

| STT | User Story | Mô tả | Priority | Dependencies |
|-----|------------|-------|----------|--------------|
| 2.1 | **US-NF-ARTICLE-001** | Hiển thị Bento Grid và danh sách bài viết | P0 | Phase 1 |
| 2.2 | **US-NF-ARTICLE-002** | Quản lý bài viết (Admin qua Sheets) | P1 | 2.1 |

**Checklist Phase 2:**
- [ ] Cấu hình Google Service Account
- [ ] Implement lib/sheets.ts
- [ ] Tạo API routes (/api/articles, /api/articles/[id])
- [ ] Build Bento Grid component
- [ ] Tạo trang danh mục (/category/[slug])
- [ ] Tạo trang chi tiết bài (/article/[id])
- [ ] Implement ISR revalidation
- [ ] Setup webhook /api/revalidate

---

### PHASE 3: User Engagement (Tuần 3-4)

> **Mục tiêu:** Thu hút và giữ chân người dùng

| STT | User Story | Mô tả | Priority | Dependencies |
|-----|------------|-------|----------|--------------|
| 3.1 | **US-UF-SUBSCRIPTION-001** | Form đăng ký Newsletter | P2 | Phase 2 |
| 3.2 | **US-PF-AUTH-001** | Đăng nhập/Đăng ký | P1 (Optional) | Phase 2 |
| 3.3 | **US-PF-AUTH-002** | Quản lý hồ sơ | P2 | 3.2 |
| 3.4 | **US-PF-AUTH-003** | Bookmarks & Lịch sử đọc | P1 | 3.2 |

**Lưu ý:**
- US-UF-SUBSCRIPTION-001 và US-PF-AUTH có thể làm song song vì độc lập.
- Authentication là **tùy chọn cho MVP**, website vẫn hoạt động đầy đủ cho anonymous users.

**Checklist Phase 3:**
- [ ] Tạo form Subscribe trên homepage
- [ ] Implement API /api/subscribe
- [ ] (Optional) Cấu hình Supabase Auth
- [ ] (Optional) Setup Google & GitHub OAuth
- [ ] (Optional) Implement bookmark feature

---

### PHASE 4: Monetization (Tuần 4-5+)

> **Mục tiêu:** Tạo nguồn thu từ website

| STT | User Story | Mô tả | Priority | Dependencies |
|-----|------------|-------|----------|--------------|
| 4.1 | **US-SF-MONETIZATION-001** | Affiliate Marketing | P0 | Phase 2 + Traffic |
| 4.2 | **US-SF-MONETIZATION-002** | Sponsored Tiles | P1 | Phase 2 + Traffic |

**Lưu ý:**
- Chỉ triển khai Monetization SAU KHI có traffic ổn định.
- Cần có Affiliate IDs từ các đối tác (Udemy, Coursera, DigitalOcean...).
- Sponsored Tiles cần có sponsors/advertisers.

**Checklist Phase 4:**
- [ ] Đăng ký affiliate programs
- [ ] Implement tracking system
- [ ] Setup Redis/Upstash cho rate limiting
- [ ] Build Admin dashboard cho affiliate
- [ ] (Later) Build Sponsored Tiles system

---

## Timeline Tổng quan

```
Tuần 1        Tuần 2        Tuần 3        Tuần 4        Tuần 5+
  │             │             │             │             │
  ▼             ▼             ▼             ▼             ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ PHASE 1 │ │ PHASE 1 │ │ PHASE 2 │ │ PHASE 3 │ │ PHASE 4 │
│ Data    │ │ + AI    │ │ Display │ │ Engage  │ │ Revenue │
│ Pipeline│ │ Process │ │ Content │ │ Users   │ │         │
└─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
     │           │           │           │           │
     ▼           ▼           ▼           ▼           ▼
  Make.com    Perplexity   Bento Grid  Subscribe   Affiliate
  Gmail       OpenAI       API Routes  Auth(Opt)   Sponsored
  Sheets      Fallback     ISR Cache   Bookmark
```

---

## MVP Scope (Phạm vi Minimum Viable Product)

### Bắt buộc cho MVP:
1. **US-DF-DATA-PIPELINE-001** - Thu thập tin tức
2. **US-CF-AI-PROCESSING-001** - Dịch và tóm tắt
3. **US-NF-ARTICLE-001** - Hiển thị bài viết

### Nên có cho MVP:
4. **US-UF-SUBSCRIPTION-001** - Form đăng ký newsletter
5. **US-NF-ARTICLE-002** - Quản lý bài viết

### Tùy chọn (có thể làm sau):
6. **US-PF-AUTH-001/002/003** - Xác thực và bookmark
7. **US-DF-DATA-PIPELINE-002** - GitHub Trending
8. **US-SF-MONETIZATION-001/002** - Kiếm tiền

---

## Rủi ro và Giải pháp

| Rủi ro | Xác suất | Tác động | Giải pháp |
|--------|----------|----------|-----------|
| Make.com free tier hết ops | Trung bình | Cao | Monitor usage, upgrade nếu cần |
| Perplexity API rate limit | Thấp | Trung bình | Đã có fallback OpenAI |
| Google Sheets chậm | Thấp | Thấp | Migrate sang Supabase nếu cần |
| Newsletter format thay đổi | Trung bình | Trung bình | Update parser patterns |

---

## Metrics Theo dõi

| Phase | Metric | Target |
|-------|--------|--------|
| Phase 1 | Bài viết mới/ngày | >= 20 |
| Phase 1 | Tỷ lệ AI xử lý thành công | >= 95% |
| Phase 2 | Lighthouse Performance | >= 90 |
| Phase 2 | Time to First Contentful Paint | <= 1.5s |
| Phase 3 | Email subscribers | >= 100 (Phase 2 Newsletter) |
| Phase 4 | Affiliate CTR | >= 1% |

---

## Kết luận

**Thứ tự ưu tiên làm:**

1. **Làm ngay:** Data Pipeline + AI Processing + Article Display
2. **Làm tiếp:** Subscription Form + Admin Management
3. **Làm sau:** Authentication + Bookmarks
4. **Làm khi có traffic:** Monetization

**Công thức đơn giản:**
```
Data → Process → Display → Engage → Monetize
```
