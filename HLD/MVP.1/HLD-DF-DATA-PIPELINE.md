# HLD-DF-DATA-PIPELINE - Pipeline Xử lý Dữ liệu

> **Phiên bản**: 3.0 - No-Code Automation
> **Cập nhật**: 13/01/2026
> **Thay đổi chính**: Thay Vercel Cron bằng Make.com automation

---

## 1. Bối cảnh

### 1.1 Bối cảnh Nghiệp vụ

**Vấn đề cần giải quyết:**
- Cần thu thập tin tức từ nhiều nguồn một cách tự động
- Đảm bảo dữ liệu được xử lý liên tục, không bị gián đoạn
- Loại bỏ tin trùng lặp (deduplication)
- Xử lý AI (dịch + tóm tắt) cho mỗi bài viết

**Giải pháp v3.0:**
- Make.com automation - no-code workflow
- Nguồn tin từ email newsletters (AlphaSignal, TLDR AI)
- Hash-based deduplication (url + title)
- Perplexity API dịch và tóm tắt
- Google Sheets lưu trữ

### 1.2 So sánh: v2.0 vs v3.0

| Tiêu chí | v2.0 (Vercel Cron) | v3.0 (Make.com) |
|----------|-------------------|-----------------|
| **Automation** | Code Vercel Cron | No-code Make.com |
| **Nguồn tin** | NewsData.io API | Email newsletters |
| **AI API** | Gemini Flash | Perplexity Sonar |
| **Database** | Airtable | Google Sheets |
| **Dedup** | URL check | Hash-based (url + title) |
| **Chi phí** | ~$2-5/tháng | $0/tháng |
| **Complexity** | Cần code | Visual workflow |

---

## 2. Kiến trúc Make.com

### 2.1 Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    DATA PIPELINE v3.0 (MAKE.COM)                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   EMAIL NEWSLETTERS                                                              │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │  AlphaSignal | TLDR AI | The Rundown AI | Import AI | AI Breakfast      │   │
│   └──────────────────────────────────┬──────────────────────────────────────┘   │
│                                      │                                           │
│                                      ▼                                           │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                    MAKE.COM SCENARIO                                     │   │
│   │                                                                          │   │
│   │   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐            │   │
│   │   │  WATCH   │ → │  PARSE   │ → │ ITERATOR │ → │  DEDUP   │            │   │
│   │   │  GMAIL   │   │  EMAIL   │   │  (Loop)  │   │  CHECK   │            │   │
│   │   └──────────┘   └──────────┘   └──────────┘   └────┬─────┘            │   │
│   │                                                      │                   │   │
│   │                                         ┌────────────┴────────────┐      │   │
│   │                                         │                         │      │   │
│   │                                         ▼                         ▼      │   │
│   │                                    ┌──────────┐             ┌─────────┐  │   │
│   │                                    │   SKIP   │             │   AI    │  │   │
│   │                                    │ (Exists) │             │PROCESS  │  │   │
│   │                                    └──────────┘             └────┬────┘  │   │
│   │                                                                  │       │   │
│   │                                                                  ▼       │   │
│   │                                                            ┌──────────┐  │   │
│   │                                                            │  SAVE    │  │   │
│   │                                                            │ SHEETS   │  │   │
│   │                                                            └────┬─────┘  │   │
│   │                                                                 │        │   │
│   │                                                                 ▼        │   │
│   │                                                           ┌──────────┐   │   │
│   │                                                           │ WEBHOOK  │   │   │
│   │                                                           │ VERCEL   │   │   │
│   │                                                           └──────────┘   │   │
│   │                                                                          │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Module Configuration Chi tiết

| # | Module | Type | Configuration |
|---|--------|------|---------------|
| 1 | Watch Gmail | Gmail - Watch emails | Filter: from contains "alphasignal" OR "tldr" OR "therundown" |
| 2 | Parse Email | Text Parser | Pattern: Extract URLs, titles, descriptions from HTML |
| 3 | Iterator | Flow Control | Array: `{{parsed.articles}}` |
| 4 | Normalize URL | Tools - Set variable | Remove tracking params, lowercase |
| 5 | Generate Hash | Tools - Set variable | `{{md5(normalized_url)}}` |
| 6 | Search Sheets | Google Sheets - Search rows | Filter: `url_hash = {{url_hash}}` |
| 7 | Router | Flow Control | If exists → Skip, Else → Continue |
| 8 | HTTP Perplexity | HTTP - Make a request | POST to /chat/completions |
| 9 | Add Row | Google Sheets - Add a row | Append article data |
| 10 | Webhook | HTTP - Make a request | POST to /api/revalidate |

---

## 3. Module Implementation

### 3.1 Module 1: Watch Gmail

**Configuration:**
```
Connection: Gmail
Folder: INBOX
Search criteria: "from:(alphasignal OR tldr OR therundown)"
Maximum number of results: 10
Mark email as read: Yes
```

**Filter (Optional):**
```
Only process if:
- Subject contains "AI" OR "artificial intelligence" OR "machine learning"
```

### 3.2 Module 2: Text Parser - Extract Articles

**Pattern để extract từ email HTML:**

```
# For AlphaSignal format
Pattern: <a href="(?P<url>https?://[^"]+)"[^>]*>(?P<title>[^<]+)</a>[\s\S]*?<p>(?P<description>[^<]{50,300})</p>

# For TLDR AI format
Pattern: <h3[^>]*>(?P<title>[^<]+)</h3>[\s\S]*?<a href="(?P<url>https?://[^"]+)"
```

**Output mapping:**
```json
{
  "articles": [
    {
      "title": "{{title}}",
      "url": "{{url}}",
      "description": "{{description}}"
    }
  ]
}
```

### 3.3 Module 4-5: URL Normalization & Hash

**Set Variable - Normalize URL:**
```javascript
// Make.com expression
{{replace(replace(replace(
  lower(1.url),
  "?utm_source=[^&]*", ""),
  "?utm_medium=[^&]*", ""),
  "?ref=[^&]*", "")
}}
```

**Set Variable - Generate Hash:**
```javascript
{{md5(4.normalized_url)}}
{{md5(lower(replace(1.title, "[^a-zA-Z0-9 ]", "")))}}
```

### 3.4 Module 6: Google Sheets - Search

**Configuration:**
```
Connection: Google
Spreadsheet: KynguyenAI Articles
Sheet: Articles
Filter: Column B (url_hash) = {{5.url_hash}}
Maximum number of returned rows: 1
```

### 3.5 Module 7: Router (Dedup Decision)

**Route 1 - SKIP (Duplicate exists):**
```
Condition: {{6.bundle.length}} > 0
Action: Stop/Continue to next iteration
```

**Route 2 - CONTINUE (New article):**
```
Condition: {{6.bundle.length}} = 0
Action: Continue to Perplexity module
```

### 3.6 Module 8: HTTP - Perplexity API

**Configuration:**
```
URL: https://api.perplexity.ai/chat/completions
Method: POST
Headers:
  Authorization: Bearer {{PERPLEXITY_API_KEY}}
  Content-Type: application/json
```

**Body:**
```json
{
  "model": "sonar",
  "messages": [
    {
      "role": "system",
      "content": "Bạn là Biên tập viên AI. Dịch tiêu đề và tóm tắt nội dung sang tiếng Việt. Giữ nguyên thuật ngữ AI (LLM, GPT, Transformer, Fine-tuning, Prompt Engineering, RAG). Trả về JSON format."
    },
    {
      "role": "user",
      "content": "Dịch và tóm tắt bài viết này:\n\nTitle: {{1.title}}\nDescription: {{1.description}}\n\nTrả về JSON:\n{\"title_vi\": \"...\", \"summary_vi\": \"...\", \"category\": \"AI Tools|AI News|AI Tutorial|AI Vietnam\"}"
    }
  ],
  "temperature": 0.3
}
```

**Parse Response:**
```javascript
// Extract from response
title_vi: {{parseJSON(8.body.choices[0].message.content).title_vi}}
summary_vi: {{parseJSON(8.body.choices[0].message.content).summary_vi}}
category: {{parseJSON(8.body.choices[0].message.content).category}}
```

### 3.7 Module 9: Google Sheets - Add Row

**Column Mapping:**

| Column | Value |
|--------|-------|
| A: id | `{{uuid}}` |
| B: url_hash | `{{5.url_hash}}` |
| C: title_hash | `{{5.title_hash}}` |
| D: title_vi | `{{8.parsed.title_vi}}` |
| E: summary_vi | `{{8.parsed.summary_vi}}` |
| F: original_url | `{{1.url}}` |
| G: thumbnail | (empty or extracted) |
| H: category | `{{8.parsed.category}}` |
| I: source | `{{1.source}}` (AlphaSignal/TLDR) |
| J: published_at | `{{now}}` |
| K: tile_size | `standard` |
| L: is_featured | `FALSE` |
| M: status | `published` |
| N: created_at | `{{now}}` |

### 3.8 Module 10: Webhook - Vercel Revalidate

**Configuration:**
```
URL: https://kynguyenai.vn/api/revalidate
Method: POST
Headers:
  x-revalidate-secret: {{REVALIDATE_SECRET}}
  Content-Type: application/json
Body: {"revalidated": true, "source": "make.com"}
```

---

## 4. Deduplication Strategy

### 4.1 Multi-Layer Approach

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    DEDUPLICATION FLOW                                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   INPUT: Article URL + Title                                                    │
│                                                                                  │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │  LAYER 1: URL NORMALIZATION                                             │   │
│   │                                                                          │   │
│   │  Original:  https://techcrunch.com/ai?utm_source=newsletter&ref=abc    │   │
│   │  Normalized: https://techcrunch.com/ai                                  │   │
│   │                                                                          │   │
│   │  Remove: ?utm_*, ?ref=, ?source=, ?via=                                │   │
│   │  Action: lowercase, remove trailing slash                              │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                  │                                               │
│                                  ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │  LAYER 2: HASH GENERATION                                               │   │
│   │                                                                          │   │
│   │  url_hash = MD5("https://techcrunch.com/ai")                           │   │
│   │           = "a1b2c3d4e5f6..."                                          │   │
│   │                                                                          │   │
│   │  title_hash = MD5(lowercase(remove_punctuation(title)))                │   │
│   │             = "f6e5d4c3b2a1..."                                         │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                  │                                               │
│                                  ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │  LAYER 3: LOOKUP IN GOOGLE SHEETS                                       │   │
│   │                                                                          │   │
│   │  Query: WHERE url_hash = "a1b2c3..." OR title_hash = "f6e5d4..."       │   │
│   │                                                                          │   │
│   │  Result:                                                                 │   │
│   │    - Found → DUPLICATE → Skip                                           │   │
│   │    - Not Found → NEW → Process                                          │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Why Two Hashes?

| Scenario | url_hash | title_hash | Result |
|----------|----------|------------|--------|
| Same article, different tracking params | Match | Match | SKIP |
| Same article, different domain (syndication) | No match | Match | SKIP |
| Different article, same domain path | Match | No match | SKIP |
| Completely new article | No match | No match | PROCESS |

---

## 5. Email Newsletter Sources

### 5.1 Newsletter Details

| Newsletter | Email Pattern | Frequency | Content Type |
|------------|---------------|-----------|--------------|
| **AlphaSignal** | `newsletter@alphasignal.ai` | Daily | AI research papers, tools |
| **TLDR AI** | `dan@tldrnewsletter.com` | Daily | AI news digest |
| **The Rundown AI** | `team@therundown.ai` | Daily | AI news summary |
| **Import AI** | `jack@importai.net` | Weekly | Deep dives, analysis |
| **AI Breakfast** | `hi@aibreakfast.beehiiv.com` | Daily | Quick AI updates |

### 5.2 Gmail Filter Setup

Create Gmail filter để organize newsletters:
```
From: alphasignal.ai OR tldrnewsletter.com OR therundown.ai OR importai.net OR aibreakfast.beehiiv.com
Action: Apply label "AI-Newsletters"
```

Make.com Watch Gmail module sẽ monitor label này.

---

## 6. Error Handling

### 6.1 Make.com Error Handling

**Enable error handling for each module:**
```
Settings → Error handling:
  - Resume: Continue with next bundle
  - Ignore: Skip failed item
  - Break: Stop entire scenario (use for critical errors)
```

### 6.2 Common Errors & Solutions

| Error | Module | Solution |
|-------|--------|----------|
| Gmail connection expired | Watch Gmail | Reconnect OAuth |
| Parse failed - HTML changed | Text Parser | Update pattern |
| Perplexity rate limit | HTTP | Add delay, retry |
| Sheets API limit | Add Row | Add delay between writes |
| Invalid JSON from AI | HTTP | Add JSON validation |

### 6.3 Retry Configuration

```
Module settings → Advanced:
  - Number of retries: 3
  - Retry interval: 60 seconds
```

---

## 7. Scheduling

### 7.1 Make.com Schedule

**Scenario settings:**
```
Scheduling: On
Run scenario: When data arrives (Watch Gmail trigger)
```

**Alternative - Time-based:**
```
Run scenario: Every 15 minutes
Maximum number of cycles: 1
```

### 7.2 Expected Volume

```
Daily newsletters: ~5 (one from each source)
Articles per newsletter: ~5-10
Total daily articles: ~30-50

After dedup:
- Unique articles: ~20-30/day
- Perplexity API calls: ~30/day
- Make.com operations: ~150/day (well under 1000 free limit)
```

---

## 8. Monitoring

### 8.1 Make.com Dashboard

**Metrics to monitor:**
- Scenario runs per day
- Operations used
- Error rate
- Average execution time

### 8.2 Webhook Logging (Optional)

Add webhook to log results:
```
URL: https://webhook.site/your-unique-url
Method: POST
Body: {
  "timestamp": "{{now}}",
  "articles_processed": "{{length(articles)}}",
  "status": "success"
}
```

---

## 9. Environment Variables (Make.com)

Store in Make.com → Connections/Variables:

| Variable | Description |
|----------|-------------|
| `PERPLEXITY_API_KEY` | Perplexity API key |
| `GOOGLE_SHEETS_ID` | Google Sheets document ID |
| `REVALIDATE_SECRET` | Secret for Vercel webhook |

---

## 10. Migration từ v2.0

### 10.1 Checklist

- [ ] Setup Make.com account (free tier)
- [ ] Connect Gmail account
- [ ] Connect Google Sheets
- [ ] Create scenario với 10 modules
- [ ] Test với 1 newsletter
- [ ] Enable scenario scheduling
- [ ] Disable Vercel Cron (nếu còn)
- [ ] Monitor for 1 week

### 10.2 Rollback Plan

Nếu Make.com không hoạt động tốt:
1. Re-enable Vercel Cron
2. Update `/api/cron/route.ts`
3. Điều chỉnh NewsData.io thay email

---

## 11. Kế hoạch Scale

### 11.1 Khi nào cần scale?

- Make.com > 1000 ops/month → Upgrade to Core ($10.59/mo)
- Google Sheets chậm → Migrate to Supabase
- Cần real-time → Add Upstash Redis

### 11.2 Scale Path

```
Current (v3.0)                    →  Scale Phase
──────────────────────────────────────────────────
Make.com Free                     →  Make.com Core/Pro
Google Sheets                     →  Supabase PostgreSQL
Perplexity API                    →  Multiple AI providers
Single scenario                   →  Multiple scenarios
~30 articles/day                  →  ~200 articles/day
```

---

## Appendix: So sánh với v2.0

### Đã loại bỏ:
- ❌ Vercel Cron job
- ❌ NewsData.io API
- ❌ `/api/cron/route.ts` endpoint
- ❌ Gemini API (thay bằng Perplexity)
- ❌ Airtable (thay bằng Google Sheets)
- ❌ Simple URL dedup (thay bằng hash-based)

### Thêm mới:
- ✅ Make.com automation
- ✅ Email newsletters source
- ✅ Perplexity Sonar API
- ✅ Google Sheets database
- ✅ Multi-layer deduplication
- ✅ Webhook revalidation

### Giữ lại (tương tự):
- ✅ AI processing concept
- ✅ Revalidation webhook
- ✅ Error handling (simplified)
- ✅ Rate limiting awareness
