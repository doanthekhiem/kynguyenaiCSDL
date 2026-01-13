# US-CF-AI-PROCESSING-001: Dịch thuật và Tóm tắt Nội dung bằng AI

## Nội dung

Là **Hệ thống KynguyenAI.vn**
Tôi muốn **tự động dịch tiêu đề và tóm tắt nội dung tin tức từ tiếng Anh sang tiếng Việt**
Tại **Make.com automation workflow với Perplexity API**
Để **cung cấp nội dung AI bằng tiếng Việt chất lượng cao cho lập trình viên Việt Nam**

---

## Màn hình/Dialog liên quan

- **Không có màn hình UI** - Đây là quy trình xử lý nền
- **Make.com Dashboard:** Module HTTP gọi Perplexity API
- **Google Sheets:** Sheet AI_Logs để tracking

---

## Acceptance Criteria

### NHÓM 1: Dịch thuật và Tóm tắt

#### AC-1.1 – Gọi Perplexity API thành công (Happy Path)

- **Tại:** Make.com Scenario - Module HTTP
- **Khi:** Có bài viết mới cần xử lý (title + description)
- **Thì:**
  - Gọi Perplexity API:
    - Endpoint: https://api.perplexity.ai/chat/completions
    - Model: llama-3.1-sonar-small-128k-online
    - Temperature: 0.3 (để đảm bảo output nhất quán)
    - Max tokens: 500
  - Gửi prompt với yêu cầu:
    1. Dịch tiêu đề sang tiếng Việt
    2. Tóm tắt nội dung trong 2-3 câu (tối đa 200 từ)
    3. Phân loại vào category phù hợp
  - Nhận response JSON:
    ```json
    {
      "title_vi": "Tiêu đề tiếng Việt",
      "summary_vi": "Tóm tắt bằng tiếng Việt...",
      "category": "ai-news"
    }
    ```

**Inline Business Rule:**
- KHÔNG dịch các thuật ngữ kỹ thuật: React, Vue, API, REST, GraphQL, OAuth, JWT, Docker, Kubernetes, Git, GitHub, TypeScript, JavaScript, Python, Rust, Go, Node.js, AI, LLM, GPT, Transformer, Fine-tuning, RAG, Prompt Engineering...
- KHÔNG dịch tên sản phẩm: ChatGPT, Claude, Gemini, Copilot, VS Code...

---

#### AC-1.2 – Bảo toàn thuật ngữ kỹ thuật (Happy Path)

- **Tại:** Response từ AI
- **Khi:** Nội dung có chứa thuật ngữ kỹ thuật
- **Thì:**
  - Giữ nguyên các thuật ngữ trong danh sách:
    - Framework/Library: React, Vue, Angular, Next.js, Nuxt.js...
    - Ngôn ngữ: Python, JavaScript, TypeScript, Rust, Go...
    - Công nghệ: API, REST, GraphQL, WebSocket, OAuth, JWT...
    - AI/ML: LLM, GPT, Transformer, Fine-tuning, RAG, Prompt Engineering, Embedding, Vector DB...
    - DevOps: Docker, Kubernetes, CI/CD, Terraform...
    - Tên sản phẩm: ChatGPT, Claude, Gemini, Midjourney, Stable Diffusion...
  - Ví dụ đúng: "OpenAI vừa ra mắt GPT-5 với khả năng suy luận được cải thiện"
  - Ví dụ sai: "Trí tuệ mở vừa ra mắt GPT-5..."

---

#### AC-1.3 – Phân loại Category tự động (Happy Path)

- **Tại:** Response từ AI
- **Khi:** AI phân tích nội dung bài viết
- **Thì:**
  - Phân loại vào 1 trong 4 category:
    - `ai-news`: Tin tức chung về AI (announcement, release, update)
    - `ai-tools`: Công cụ và sản phẩm AI (tool, app, product, launch)
    - `ai-tutorial`: Hướng dẫn và học tập (tutorial, how-to, guide, learn)
    - `ai-vietnam`: Tin AI liên quan Việt Nam (Vietnam, Vietnamese)

---

### NHÓM 2: Xử lý Lỗi và Fallback

#### AC-2.1 – Fallback sang OpenAI khi Perplexity lỗi 429 (Alternative Path)

- **Tại:** Make.com Scenario - Error Handler
- **Khi:** Perplexity API trả về lỗi 429 (Rate Limit)
- **Thì:**
  - Retry 1 lần sau 60 giây
  - Nếu vẫn lỗi → Chuyển sang OpenAI GPT-4o-mini
  - Sử dụng cùng prompt
  - Ghi log: ai_provider = "openai", error_message = "Perplexity rate limit"

---

#### AC-2.2 – Fallback khi Perplexity timeout (Alternative Path)

- **Tại:** Make.com Scenario - Error Handler
- **Khi:** Request timeout > 30 giây
- **Thì:**
  - Không retry Perplexity
  - Fallback ngay sang OpenAI
  - Ghi log với error_message = "Perplexity timeout"

---

#### AC-2.3 – Fallback khi Perplexity server error (Alternative Path)

- **Tại:** Make.com Scenario - Error Handler
- **Khi:** Perplexity API trả về lỗi 5xx (Server Error)
- **Thì:**
  - Không retry Perplexity
  - Fallback ngay sang OpenAI
  - Ghi log với error_message = "Perplexity server error"

---

#### AC-2.4 – Xử lý response JSON không hợp lệ (Error Case)

- **Tại:** Make.com Scenario - Module JSON Parse
- **Khi:** Response không phải JSON hợp lệ hoặc thiếu fields
- **Thì:**
  - Nếu thiếu title_vi: Sử dụng title gốc (tiếng Anh)
  - Nếu thiếu summary_vi: Sử dụng description gốc
  - Nếu thiếu category hoặc category không hợp lệ: Đặt mặc định "ai-news"
  - Đặt status = "draft" (cần review thủ công)
  - Ghi log: status = "error", error_message = "Invalid JSON"

---

### NHÓM 3: Quản lý Chi phí

#### AC-3.1 – Giới hạn tokens per request (Happy Path)

- **Tại:** Make.com Scenario - HTTP Request
- **Khi:** Gửi request đến AI API
- **Thì:**
  - Giới hạn max_tokens = 500 cho response
  - Input prompt không vượt quá 1000 tokens
  - Nếu content quá dài → Truncate về 500 ký tự

---

#### AC-3.2 – Theo dõi usage hàng ngày (Happy Path)

- **Tại:** Google Sheets - Sheet AI_Logs
- **Khi:** Hoàn thành xử lý mỗi bài
- **Thì:**
  - Ghi log:
    - timestamp
    - article_title
    - provider (perplexity/openai)
    - tokens_used (nếu có trong response)
    - status (success/error)
    - error_message (nếu có)

---

### NHÓM 4: Quality Assurance

#### AC-4.1 – Kiểm tra độ dài summary (Happy Path)

- **Tại:** Make.com Scenario - Post-processing
- **Khi:** Nhận summary_vi từ AI
- **Thì:**
  - Nếu summary_vi > 300 ký tự → Truncate và thêm "..."
  - Nếu summary_vi < 50 ký tự → Đánh dấu status = "draft" để review

---

#### AC-4.2 – Validate category (Happy Path)

- **Tại:** Make.com Scenario - Post-processing
- **Khi:** Nhận category từ AI
- **Thì:**
  - Nếu category không nằm trong ["ai-news", "ai-tools", "ai-tutorial", "ai-vietnam"]
  - → Đặt mặc định "ai-news"

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Thuật ngữ kỹ thuật | BR_AI_01 | KHÔNG dịch, giữ nguyên tiếng Anh | Danh sách chuẩn |
| Tên sản phẩm | BR_AI_02 | KHÔNG dịch | ChatGPT, Claude, Gemini... |
| Temperature | BR_AI_03 | Sử dụng 0.3 cho output nhất quán | - |
| Max tokens | BR_AI_04 | Output <= 500 tokens | - |
| Input limit | BR_AI_05 | Content <= 500 ký tự nếu quá dài | Truncate |
| Fallback order | BR_AI_06 | Perplexity → (retry 1x) → OpenAI | - |
| Default category | BR_AI_07 | "ai-news" nếu không xác định được | - |
| Summary length | BR_AI_08 | 50-300 ký tự | Truncate hoặc draft |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **nội dung AI chất lượng cao bằng tiếng Việt**, giúp lập trình viên Việt Nam tiếp cận tin tức công nghệ quốc tế mà không cần đọc tiếng Anh.

Trọng số của story này là **P0 (Ưu tiên cao nhất)**

Story được coi là thành công khi đảm bảo được:

- Tỷ lệ dịch thành công >= 95%
- Bảo toàn thuật ngữ kỹ thuật 100%
- Chi phí AI <= $5/tháng (trong Perplexity free credits)
- Fallback sang OpenAI hoạt động trong 100% trường hợp Perplexity lỗi

---

## ASSUMPTION

1. Perplexity API key đã được cấu hình với $5 free credits.
2. OpenAI API key đã được cấu hình làm fallback.
3. Prompt đã được tối ưu để đảm bảo output JSON hợp lệ.
4. Nội dung đầu vào chủ yếu là tiếng Anh từ các nguồn tin công nghệ.

---

## Prompt Engineering

### System Prompt mẫu

```
Bạn là chuyên gia dịch thuật và tóm tắt tin tức công nghệ.
Nhiệm vụ:

1. DỊCH tiêu đề sang tiếng Việt
2. TÓM TẮT nội dung trong 2-3 câu (tối đa 200 từ tiếng Việt)
3. PHÂN LOẠI vào 1 category phù hợp

QUY TẮC QUAN TRỌNG:
- KHÔNG dịch các thuật ngữ kỹ thuật: React, Vue, API, REST, GraphQL, OAuth, JWT, Docker, Kubernetes, Git, GitHub, TypeScript, JavaScript, Python, Rust, Go, Node.js, AI, LLM, GPT, etc.
- KHÔNG dịch tên sản phẩm: ChatGPT, Claude, Gemini, Copilot, VS Code, etc.
- Giữ giọng văn chuyên nghiệp, trung lập
- Tập trung vào thông tin quan trọng nhất

Trả về JSON với format chính xác:
{
  "title_vi": "Tiêu đề tiếng Việt",
  "summary_vi": "Tóm tắt 2-3 câu bằng tiếng Việt",
  "category": "ai-news | ai-tools | ai-tutorial | ai-vietnam"
}
```

---

## UI/UX Design

*{Không áp dụng - Đây là backend processing}*
