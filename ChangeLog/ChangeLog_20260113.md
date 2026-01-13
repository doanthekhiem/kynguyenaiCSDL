# ChangeLog - 13/01/2026

## Tóm tắt: Nâng cấp lên v3.0 - No-Code Automation

### Lý do thay đổi

- v2.0 vẫn yêu cầu code Vercel Cron Job (phức tạp cho FE developer)
- Muốn tận dụng $5 free credits/tháng từ Perplexity API
- Make.com cho phép automation hoàn toàn no-code
- Google Sheets unlimited free (thay vì Airtable giới hạn 1000 records)
- BentoGrids.com cung cấp UI templates sẵn có

---

## Thay đổi chính v2.0 → v3.0

| Thành phần | v2.0 | v3.0 |
|------------|------|------|
| **Next.js** | 14/15 | **16** (React 19.2, Turbopack default) |
| **UI Templates** | Shadcn tự code | **BentoGrids.com** templates |
| **AI API** | Gemini Flash 1.5 | **Perplexity Sonar** |
| **Nguồn tin** | NewsData.io + GitHub API | **Make.com** (Email newsletters) |
| **Database** | Airtable (1000 records) | **Google Sheets** (unlimited) |
| **Automation** | Vercel Cron Job | **Make.com** (no-code) |
| **Deduplication** | URL check đơn giản | **Hash-based** (url + title) |

---

## Chi phí

### v2.0 (trước)
| Service | Chi phí |
|---------|---------|
| Vercel | $0 |
| Airtable | $0 (giới hạn 1000 records) |
| NewsData.io | $0 |
| Gemini | $0-5/tháng |
| **Tổng** | **$0-5/tháng** |

### v3.0 (sau)
| Service | Chi phí |
|---------|---------|
| Vercel | $0 |
| Google Sheets | **$0** (unlimited) |
| Make.com | **$0** (1000 ops/tháng free) |
| Perplexity | **$0** ($5 free credits đủ dùng) |
| **Tổng** | **$0/tháng** |

---

## Files đã cập nhật

### 1. Design/Tech-Stack.md
**Phiên bản**: 3.0
**Thay đổi:**
- Loại bỏ: Gemini Flash, NewsData.io, Airtable, Vercel Cron
- Thêm: Next.js 16 + React 19.2, Perplexity Sonar API, Make.com automation, Google Sheets
- Thêm: BentoGrids.com (design patterns, không phải library)
- Thêm: Multi-layer deduplication strategy (URL hash + title hash)
- Thêm: Chi tiết Make.com scenario configuration
- Thêm: Google Sheets schema với columns mới (url_hash, title_hash, ai_provider)

### 2. Design/ComponentView.md
**Phiên bản**: 3.0
**Thay đổi:**
- Loại bỏ: Kiến trúc với Vercel Cron Job
- Thêm: Kiến trúc Make.com automation hub
- Thêm: Chi tiết 10 modules trong Make.com scenario
- Thêm: Deduplication flow diagram
- Thêm: Email newsletter sources (AlphaSignal, TLDR AI, The Rundown AI, Import AI)
- Thêm: Gmail → Make.com → Perplexity → Google Sheets → Vercel flow

### 3. HLD/MVP.1/HLD-DF-DATA-PIPELINE.md
**Phiên bản**: 3.0
**Thay đổi:**
- Loại bỏ: Vercel Cron implementation
- Loại bỏ: NewsData.io integration
- Loại bỏ: TypeScript cron job code
- Thêm: Make.com scenario với 10 modules
- Thêm: Gmail Watch module configuration
- Thêm: HTML to Text parsing
- Thêm: Text Parser patterns cho các newsletters
- Thêm: Iterator cho multiple articles
- Thêm: Google Sheets Search (dedup check)
- Thêm: Perplexity API HTTP module
- Thêm: OpenAI fallback module
- Thêm: Webhook trigger cho Vercel revalidation

### 4. HLD/MVP.1/HLD-CF-AI-PROCESSING.md
**Phiên bản**: 3.0
**Thay đổi:**
- Loại bỏ: Gemini API integration code
- Loại bỏ: TypeScript AI processor files
- Thêm: Perplexity Sonar API specification
- Thêm: Make.com HTTP module configuration
- Thêm: Request/Response format cho Perplexity
- Thêm: Error handling flow trong Make.com
- Thêm: OpenAI fallback trong Make.com
- Giữ nguyên: Prompt engineering (cùng nội dung)
- Giữ nguyên: Category definitions
- Thêm: AI_Logs sheet cho monitoring

### 5. HLD/MVP.1/HLD-NF-ARTICLE.md
**Phiên bản**: 3.0
**Thay đổi:**
- Loại bỏ: Airtable schema và API code
- Thêm: Google Sheets schema với columns mới
- Thêm: url_hash, title_hash columns cho deduplication
- Thêm: ai_provider column để track AI provider used
- Thêm: Google Sheets API implementation code
- Thêm: Google Service Account setup guide
- Thêm: On-demand revalidation từ Make.com
- Thêm: Performance optimization với unstable_cache
- Thêm: Migration path từ Airtable và đến Supabase

---

## Kiến trúc mới v3.0

```
┌─────────────────────────────────────────────────────────────────────┐
│                    KIẾN TRÚC v3.0 - NO-CODE AUTOMATION               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │              EMAIL NEWSLETTERS                               │   │
│   │  • AlphaSignal (AI news)                                    │   │
│   │  • TLDR AI (daily digest)                                   │   │
│   │  • The Rundown AI                                           │   │
│   │  • Import AI                                                │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              ▼                                       │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │              GMAIL (Newsletter inbox)                        │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              ▼                                       │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │              MAKE.COM (Automation Hub)                       │   │
│   │  1. Watch Gmail for new newsletters                         │   │
│   │  2. Parse HTML → extract articles                           │   │
│   │  3. Calculate url_hash, title_hash (dedup)                  │   │
│   │  4. Check Google Sheets for duplicates                      │   │
│   │  5. Call Perplexity API → translate/summarize               │   │
│   │  6. Fallback to OpenAI if needed                            │   │
│   │  7. Save to Google Sheets                                   │   │
│   │  8. Trigger Vercel revalidation                             │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│              ┌───────────────┼───────────────┐                      │
│              ▼               ▼               ▼                      │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│   │  Perplexity  │    │   Google     │    │   Vercel     │         │
│   │  Sonar API   │    │   Sheets     │    │   Next.js 16 │         │
│   │  (AI)        │    │   (Database) │    │   (Frontend) │         │
│   └──────────────┘    └──────────────┘    └──────────────┘         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Deduplication Strategy (MỚI)

### Multi-layer Deduplication

```
Layer 1: URL Normalization
├── Loại bỏ tracking params (?utm_*, ?ref=, ?fbclid, etc.)
├── Chuẩn hóa: lowercase, remove trailing slash
└── Hash: MD5(normalized_url) → url_hash column

Layer 2: Title Similarity
├── Normalize: lowercase, remove punctuation
└── Hash: MD5(normalized_title) → title_hash column

Check Flow trong Make.com:
1. Tính url_hash từ article URL
2. Search trong Google Sheets column B (url_hash)
3. Nếu tìm thấy → Skip (duplicate)
4. Nếu không → Continue processing
```

---

## Files không thay đổi

- `Design/BusinessContextVision.md` - Không ảnh hưởng
- `HLD/MVP.1/HLD-SF-MONETIZATION.md` - Giữ nguyên concept
- `HLD/MVP.1/HLD-UF-SUBSCRIPTION.md` - Vẫn dùng simple form (DEFERRED)
- `HLD/MVP.1/HLD-PF-AUTH.md` - Không cần auth cho MVP

---

## Files cần XÓA (không còn sử dụng trong v3.0)

Các files code sau sẽ không còn cần thiết vì chức năng chuyển sang Make.com:

- `lib/gemini.ts` - Thay bằng Make.com HTTP module
- `lib/openai-fallback.ts` - Thay bằng Make.com HTTP module
- `lib/ai-processor.ts` - Thay bằng Make.com scenario
- `lib/airtable.ts` - Thay bằng `lib/sheets.ts`
- `app/api/cron/route.ts` - Thay bằng Make.com scheduler

---

## Migration Guide

### Bước 1: Setup Make.com
1. Tạo tài khoản Make.com (free tier)
2. Đăng ký email newsletters: AlphaSignal, TLDR AI, The Rundown AI
3. Setup scenario theo HLD-DF-DATA-PIPELINE.md

### Bước 2: Setup Google Sheets
1. Tạo Google Sheet mới với schema từ HLD-NF-ARTICLE.md
2. Enable Google Sheets API trong Google Cloud Console
3. Tạo Service Account và download JSON key
4. Share Sheet với service account email

### Bước 3: Setup Perplexity API
1. Đăng ký Perplexity (pay-as-you-go hoặc Pro)
2. Tạo API key
3. Thêm vào Make.com connections

### Bước 4: Update Next.js
1. Upgrade lên Next.js 16: `npx @next/codemod@canary upgrade latest`
2. Xóa các files không cần: gemini.ts, openai-fallback.ts, ai-processor.ts, airtable.ts
3. Tạo lib/sheets.ts mới
4. Update API routes để fetch từ Google Sheets

### Bước 5: Connect Make.com → Vercel
1. Thêm REVALIDATE_SECRET vào Vercel env
2. Cấu hình webhook trong Make.com scenario
3. Test end-to-end flow

---

## Kế hoạch Scale (Future)

Khi cần mở rộng:

```
Current (v3.0)              →  Scale Phase
─────────────────────────────────────────────
Make.com Free (1000 ops)    →  Make.com Core ($10.59/mo)
Perplexity $5 credits       →  Pay-as-you-go (~$15/mo)
Google Sheets               →  Supabase + Redis cache
Single scenario             →  Parallel processing
ISR 5 minutes               →  Real-time với Supabase
```

---

## Người thực hiện

- Thay đổi được thực hiện theo yêu cầu nâng cấp kiến trúc
- Mục tiêu: No-code automation, phù hợp cho FE developer, chi phí $0/tháng
