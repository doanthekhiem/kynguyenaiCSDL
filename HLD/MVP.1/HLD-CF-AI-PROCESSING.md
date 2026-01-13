# HLD-CF-AI-PROCESSING - Xử lý AI (Tóm tắt & Dịch thuật)

> **Phiên bản**: 3.0 - Make.com + Perplexity
> **Cập nhật**: 13/01/2026
> **Thay đổi chính**: Sử dụng Perplexity Sonar API thay Gemini, tích hợp trong Make.com

---

## 1. Bối cảnh

### 1.1 Bối cảnh Nghiệp vụ

**Vấn đề cần giải quyết:**
- Tin tức công nghệ quốc tế chủ yếu bằng tiếng Anh
- Lập trình viên Việt Nam cần nội dung Việt hóa chất lượng cao
- Bản dịch tự động thường không giữ được thuật ngữ kỹ thuật
- Cần tóm tắt ngắn gọn để tiết kiệm thời gian đọc

**Giải pháp v3.0:**
- Sử dụng **Perplexity Sonar API** ($5 free credits/tháng)
- Xử lý trong **Make.com** (no-code automation)
- Fallback sang OpenAI GPT-4o-mini khi cần
- Prompt engineering để bảo toàn thuật ngữ kỹ thuật

### 1.2 Kiến trúc v3.0

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AI PROCESSING (v3.0 - Make.com)                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────────────────────────────────────────────────────┐      │
│   │              MAKE.COM SCENARIO                            │      │
│   │                                                           │      │
│   │   1. Parse email newsletter (từ Gmail)                   │      │
│   │   2. Gọi Perplexity API để dịch + tóm tắt               │      │
│   │   3. Lưu kết quả vào Google Sheets                       │      │
│   │                                                           │      │
│   └──────────────────────────────────────────────────────────┘      │
│                              │                                       │
│              ┌───────────────┼───────────────┐                      │
│              ▼               ▼               ▼                      │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│   │  Perplexity  │    │   OpenAI     │    │   Google     │         │
│   │  Sonar API   │    │  (Fallback)  │    │   Sheets     │         │
│   └──────────────┘    └──────────────┘    └──────────────┘         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. So sánh: v2.0 vs v3.0

| Tiêu chí | v2.0 (Gemini) | v3.0 (Perplexity) |
|----------|---------------|-------------------|
| **AI Provider** | Gemini Flash 1.5 | **Perplexity Sonar** |
| **Chi phí** | Free tier (limited) | **$5 free/tháng** |
| **Tích hợp** | Next.js Cron Job | **Make.com HTTP** |
| **Search grounding** | Không | **Có (citations)** |
| **Fallback** | OpenAI GPT-4o-mini | OpenAI GPT-4o-mini |
| **Code cần viết** | TypeScript client | **Không (no-code)** |

---

## 3. Perplexity API

### 3.1 API Overview

| Spec | Giá trị |
|------|---------|
| **Endpoint** | `https://api.perplexity.ai/chat/completions` |
| **Model** | `llama-3.1-sonar-small-128k-online` |
| **Input cost** | $1/1M tokens |
| **Output cost** | $1/1M tokens |
| **Request fee** | $5/1000 requests |
| **Free credits** | $5/tháng (Pro subscription) |

### 3.2 Ước tính chi phí

```
Input per article:  ~500 tokens (title + content)
Output per article: ~200 tokens (title_vi + summary_vi)

Daily usage (30 bài):
- Input:  30 × 500 = 15,000 tokens → $0.015
- Output: 30 × 200 = 6,000 tokens  → $0.006
- Requests: 30 × $0.005 = $0.15

Monthly cost:
- Tokens: (15,000 + 6,000) × 30 days × $1/1M = ~$0.63
- Requests: 900 × $0.005 = $4.50
- Total: ~$5.13/tháng

→ Vừa đủ trong $5 free credits!
```

---

## 4. Prompt Engineering

### 4.1 Combined Prompt (Dịch + Tóm tắt)

```
Bạn là chuyên gia dịch thuật và tóm tắt tin tức công nghệ. Nhiệm vụ:

1. DỊCH tiêu đề sang tiếng Việt
2. TÓM TẮT nội dung trong 2-3 câu (tối đa 200 từ tiếng Việt)
3. PHÂN LOẠI vào 1 category phù hợp

QUY TẮC QUAN TRỌNG:
- KHÔNG dịch các thuật ngữ kỹ thuật: React, Vue, API, REST, GraphQL, OAuth, JWT, Docker, Kubernetes, Git, GitHub, TypeScript, JavaScript, Python, Rust, Go, Node.js, AI, LLM, GPT, etc.
- KHÔNG dịch tên sản phẩm: ChatGPT, Claude, Gemini, Copilot, VS Code, etc.
- Giữ giọng văn chuyên nghiệp, trung lập
- Tập trung vào thông tin quan trọng nhất

Xử lý bài viết sau:

---
Title: {{title}}
Content: {{content}}
---

Trả về JSON với format chính xác:
{
  "title_vi": "Tiêu đề tiếng Việt",
  "summary_vi": "Tóm tắt 2-3 câu bằng tiếng Việt",
  "category": "ai-news | ai-tools | ai-tutorial | ai-vietnam"
}
```

### 4.2 Category Definitions

| Category | Mô tả | Keywords |
|----------|-------|----------|
| `ai-news` | Tin tức chung về AI | announcement, release, update |
| `ai-tools` | Công cụ và sản phẩm AI | tool, app, product, launch |
| `ai-tutorial` | Hướng dẫn và học tập | tutorial, how-to, guide, learn |
| `ai-vietnam` | Tin AI liên quan Việt Nam | Vietnam, Vietnamese |

---

## 5. Make.com Implementation

### 5.1 HTTP Module Configuration

**Module: HTTP - Make a request**

| Setting | Value |
|---------|-------|
| URL | `https://api.perplexity.ai/chat/completions` |
| Method | POST |
| Headers | `Authorization: Bearer {{PERPLEXITY_API_KEY}}`, `Content-Type: application/json` |

**Request Body:**

```json
{
  "model": "llama-3.1-sonar-small-128k-online",
  "messages": [
    {
      "role": "system",
      "content": "Bạn là chuyên gia dịch thuật và tóm tắt tin tức công nghệ..."
    },
    {
      "role": "user",
      "content": "Xử lý bài viết sau:\n\nTitle: {{1.title}}\nContent: {{1.content}}\n\nTrả về JSON..."
    }
  ],
  "temperature": 0.3,
  "max_tokens": 500
}
```

### 5.2 Response Parsing

**Module: JSON - Parse JSON**

```
Input: {{2.data.choices[0].message.content}}

Output mapping:
- title_vi: {{3.title_vi}}
- summary_vi: {{3.summary_vi}}
- category: {{3.category}}
```

### 5.3 Error Handling trong Make.com

```
┌─────────────────────────────────────────────────────────────┐
│                    ERROR HANDLING FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Perplexity API ──► Success? ──► Save to Sheets            │
│        │                                                      │
│        │ Error (rate limit, timeout)                         │
│        ▼                                                      │
│   Router (Error Handler)                                     │
│        │                                                      │
│        ├──► 429 Rate Limit ──► Sleep 60s ──► Retry          │
│        │                                                      │
│        ├──► 500 Server Error ──► OpenAI Fallback            │
│        │                                                      │
│        └──► Other Error ──► Log to Sheets (errors tab)      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Fallback to OpenAI

### 6.1 Khi nào dùng Fallback

| Scenario | Action |
|----------|--------|
| Perplexity 429 (Rate limit) | Retry sau 60s, sau đó fallback |
| Perplexity 500 (Server error) | Fallback ngay |
| Perplexity timeout (>30s) | Fallback ngay |
| Invalid JSON response | Fallback ngay |

### 6.2 OpenAI HTTP Module

**URL:** `https://api.openai.com/v1/chat/completions`

**Request Body:**

```json
{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "system",
      "content": "Bạn là chuyên gia dịch thuật và tóm tắt tin tức công nghệ..."
    },
    {
      "role": "user",
      "content": "Xử lý bài viết sau:\n\nTitle: {{1.title}}\nContent: {{1.content}}\n\nTrả về JSON..."
    }
  ],
  "response_format": { "type": "json_object" },
  "temperature": 0.3,
  "max_tokens": 500
}
```

### 6.3 OpenAI Pricing

| Metric | Giá |
|--------|-----|
| Input | $0.15/1M tokens |
| Output | $0.60/1M tokens |

**Chi phí fallback (nếu 10% bài dùng OpenAI):**
```
90 bài × 700 tokens × $0.375/1M = ~$0.02/tháng
→ Không đáng kể
```

---

## 7. Complete Make.com Scenario

```
┌─────────────────────────────────────────────────────────────┐
│          MAKE.COM SCENARIO: AI Processing                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   [1] Gmail Watch                                            │
│        │                                                      │
│        ▼                                                      │
│   [2] HTML to Text                                           │
│        │                                                      │
│        ▼                                                      │
│   [3] Text Parser (extract articles)                         │
│        │                                                      │
│        ▼                                                      │
│   [4] Iterator (for each article)                            │
│        │                                                      │
│        ▼                                                      │
│   [5] Google Sheets Search (dedup check)                     │
│        │                                                      │
│        ├── Found ──► Skip (end)                              │
│        │                                                      │
│        └── Not found ──► Continue                            │
│             │                                                 │
│             ▼                                                 │
│   [6] HTTP - Perplexity API                                  │
│        │                                                      │
│        ├── Success ──► [8] JSON Parse                        │
│        │                                                      │
│        └── Error ──► [7] HTTP - OpenAI Fallback              │
│                           │                                   │
│                           ▼                                   │
│   [8] JSON Parse                                             │
│        │                                                      │
│        ▼                                                      │
│   [9] Google Sheets Add Row                                  │
│        │                                                      │
│        ▼                                                      │
│   [10] HTTP Webhook (revalidate Vercel) [optional]          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Response Examples

### 8.1 Perplexity API Response

```json
{
  "id": "chatcmpl-xxx",
  "model": "llama-3.1-sonar-small-128k-online",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "{\n  \"title_vi\": \"OpenAI công bố GPT-5 với khả năng suy luận nâng cao\",\n  \"summary_vi\": \"OpenAI vừa ra mắt GPT-5, phiên bản mới nhất của mô hình ngôn ngữ chủ lực. Mô hình mới có khả năng suy luận được cải thiện đáng kể, hiểu ngữ cảnh tốt hơn và giảm hallucination. GPT-5 sẽ có sẵn qua API từ tháng sau.\",\n  \"category\": \"ai-news\"\n}"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 450,
    "completion_tokens": 180,
    "total_tokens": 630
  }
}
```

### 8.2 Parsed Result

```json
{
  "title_vi": "OpenAI công bố GPT-5 với khả năng suy luận nâng cao",
  "summary_vi": "OpenAI vừa ra mắt GPT-5, phiên bản mới nhất của mô hình ngôn ngữ chủ lực. Mô hình mới có khả năng suy luận được cải thiện đáng kể, hiểu ngữ cảnh tốt hơn và giảm hallucination. GPT-5 sẽ có sẵn qua API từ tháng sau.",
  "category": "ai-news"
}
```

---

## 9. Quality Assurance

### 9.1 Translation Quality Checks

| Check | Mô tả | Action |
|-------|-------|--------|
| Empty title_vi | AI không trả về title | Dùng title gốc |
| Empty summary_vi | AI không trả về summary | Dùng description gốc |
| Invalid category | Category không hợp lệ | Default "ai-news" |
| Too long summary | >300 chars | Truncate |

### 9.2 Manual Review Process

```
Google Sheets "Articles" có cột "status":
- "published" → Hiển thị trên website
- "draft" → Cần review (AI fail hoặc quality thấp)

Admin review draft articles:
1. Mở Google Sheets
2. Filter status = "draft"
3. Review và edit title_vi, summary_vi
4. Đổi status = "published"
```

---

## 10. Monitoring

### 10.1 Make.com Dashboard

| Metric | Theo dõi |
|--------|----------|
| Scenario runs | Số lần chạy/ngày |
| Operations used | Ops đã dùng / 1000 free |
| Errors | Số lỗi và loại lỗi |
| Duration | Thời gian chạy mỗi scenario |

### 10.2 Google Sheets Logging

Thêm sheet "AI_Logs" để track:

| Column | Mô tả |
|--------|-------|
| timestamp | Thời gian xử lý |
| article_title | Title bài viết |
| provider | perplexity / openai |
| tokens_used | Số tokens |
| status | success / error |
| error_message | Lỗi nếu có |

---

## 11. Environment Variables (Make.com)

```
# Trong Make.com > Connections
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxx (optional, for fallback)

# Trong Make.com > Variables
REVALIDATE_SECRET=your_secret_key
VERCEL_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/xxx
```

---

## 12. Migration từ v2.0

### 12.1 Những gì thay đổi

| Component | v2.0 | v3.0 |
|-----------|------|------|
| AI Client | `lib/gemini.ts` | Make.com HTTP module |
| Fallback | `lib/openai-fallback.ts` | Make.com HTTP module |
| Processor | `lib/ai-processor.ts` | Make.com scenario |
| Cron trigger | `app/api/cron/route.ts` | Make.com scheduler |

### 12.2 Những gì giữ nguyên

- ✅ Prompt engineering (cùng nội dung)
- ✅ Category definitions
- ✅ Translation quality rules
- ✅ Error handling strategy

### 12.3 Files cần XÓA (không còn dùng)

- ❌ `lib/gemini.ts`
- ❌ `lib/openai-fallback.ts`
- ❌ `lib/ai-processor.ts`
- ❌ `app/api/cron/route.ts`

---

## 13. Kế hoạch Scale

Khi cần scale lên (>100 bài/ngày):

```
Current (v3.0)              →  Scale Phase
─────────────────────────────────────────────
Make.com Free (1000 ops)    →  Make.com Core ($10.59/mo)
Perplexity $5 credits       →  Pay-as-you-go (~$15/mo)
Single scenario             →  Parallel processing
Google Sheets               →  Supabase + Redis cache
```

---

## Xem thêm

- [Design/Tech-Stack.md](../../Design/Tech-Stack.md) - Stack v3.0
- [HLD-DF-DATA-PIPELINE.md](./HLD-DF-DATA-PIPELINE.md) - Make.com flow
- Perplexity API: https://docs.perplexity.ai
- Make.com HTTP module: https://www.make.com/en/help/app/http
