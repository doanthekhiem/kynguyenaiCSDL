# US-DF-DATA-PIPELINE-001: Thu thập Tin tức Tự động qua Make.com

## Nội dung

Là **Hệ thống KynguyenAI.vn**
Tôi muốn **tự động thu thập tin tức AI từ các newsletter qua email**
Tại **Make.com automation workflow**
Để **cung cấp nguồn tin tức AI cập nhật liên tục cho người dùng mà không cần can thiệp thủ công**

---

## Màn hình/Dialog liên quan

- **Không có màn hình UI** - Đây là quy trình tự động chạy nền
- **Make.com Dashboard:** Quản lý và giám sát Scenario
- **Google Sheets:** Xem dữ liệu thu thập được

---

## Acceptance Criteria

### NHÓM 1: Thu thập Email Newsletter

#### AC-1.1 – Watch Gmail và phát hiện Newsletter mới (Happy Path)

- **Tại:** Make.com Scenario - Module Watch Gmail
- **Khi:** Có email mới từ các nguồn newsletter đã cấu hình
- **Thì:**
  - Phát hiện email từ các nguồn:
    - AlphaSignal (newsletter@alphasignal.ai)
    - TLDR AI (dan@tldrnewsletter.com)
    - The Rundown AI (team@therundown.ai)
    - Import AI (jack@importai.net)
    - AI Breakfast (hi@aibreakfast.beehiiv.com)
  - Đánh dấu email là đã đọc
  - Chuyển nội dung email sang module tiếp theo

**Inline Business Rule:**
- Chỉ xử lý email từ danh sách nguồn đã cấu hình.
- Email được đánh dấu đã đọc để tránh xử lý lại.

---

#### AC-1.2 – Parse nội dung Email HTML (Happy Path)

- **Tại:** Make.com Scenario - Module Text Parser
- **Khi:** Nhận được nội dung email HTML
- **Thì:**
  - Trích xuất thông tin bài viết từ HTML:
    - Tiêu đề (title)
    - URL gốc (url)
    - Mô tả ngắn (description)
  - Tạo danh sách các bài viết từ email
  - Trả về mảng articles cho module Iterator

---

#### AC-1.3 – Lỗi parse email không đúng format (Error Case)

- **Tại:** Make.com Scenario - Module Text Parser
- **Khi:** Email có format khác với pattern đã cấu hình
- **Thì:**
  - Bỏ qua email này
  - Ghi log lỗi vào Google Sheets (sheet AI_Logs)
  - Tiếp tục xử lý các email khác (Resume error handling)

---

### NHÓM 2: Deduplication (Loại bỏ Trùng lặp)

#### AC-2.1 – Normalize URL và tạo Hash (Happy Path)

- **Tại:** Make.com Scenario - Module Set Variable
- **Khi:** Xử lý từng bài viết trong Iterator
- **Thì:**
  - Normalize URL:
    - Chuyển về lowercase
    - Loại bỏ tracking params (utm_source, utm_medium, utm_campaign, ref, source, fbclid, gclid...)
    - Loại bỏ trailing slash
  - Tạo url_hash = MD5(normalized_url)
  - Tạo title_hash = MD5(normalized_title)

**Inline Business Rule:**
- Ví dụ: `https://TechCrunch.com/ai?utm_source=newsletter&ref=abc` → `https://techcrunch.com/ai`

---

#### AC-2.2 – Kiểm tra trùng lặp trong Google Sheets (Happy Path)

- **Tại:** Make.com Scenario - Module Google Sheets Search
- **Khi:** Đã có url_hash và title_hash
- **Thì:**
  - Tìm kiếm trong Google Sheets:
    - Tìm row có url_hash trùng HOẶC title_hash trùng
  - Nếu tìm thấy → Router chuyển sang SKIP
  - Nếu không tìm thấy → Router chuyển sang CONTINUE

---

#### AC-2.3 – Bỏ qua bài viết trùng lặp (Alternative Path)

- **Tại:** Make.com Scenario - Router
- **Khi:** Phát hiện bài viết đã tồn tại (url_hash hoặc title_hash trùng)
- **Thì:**
  - Không xử lý AI cho bài này
  - Không lưu vào Google Sheets
  - Tiếp tục với bài viết tiếp theo trong Iterator

---

### NHÓM 3: Xử lý AI (Dịch và Tóm tắt)

#### AC-3.1 – Gọi Perplexity API để dịch và tóm tắt (Happy Path)

- **Tại:** Make.com Scenario - Module HTTP (Perplexity)
- **Khi:** Bài viết mới (không trùng lặp)
- **Thì:**
  - Gọi Perplexity API với:
    - Model: llama-3.1-sonar-small-128k-online
    - Prompt yêu cầu dịch tiêu đề và tóm tắt nội dung sang tiếng Việt
    - Yêu cầu giữ nguyên thuật ngữ kỹ thuật (LLM, GPT, Transformer, Fine-tuning...)
    - Yêu cầu phân loại category (ai-news, ai-tools, ai-tutorial, ai-vietnam)
  - Nhận response JSON với:
    - title_vi: Tiêu đề tiếng Việt
    - summary_vi: Tóm tắt 2-3 câu
    - category: Phân loại

---

#### AC-3.2 – Fallback sang OpenAI khi Perplexity lỗi (Alternative Path)

- **Tại:** Make.com Scenario - Router Error Handler
- **Khi:** Perplexity API trả về lỗi (429 Rate Limit, 500 Server Error, Timeout)
- **Thì:**
  - Retry 1 lần sau 60 giây (cho 429)
  - Nếu vẫn lỗi → Fallback sang OpenAI GPT-4o-mini
  - Gọi OpenAI API với cùng prompt
  - Ghi log ai_provider = "openai"

---

#### AC-3.3 – Xử lý response AI không hợp lệ (Error Case)

- **Tại:** Make.com Scenario - Module JSON Parse
- **Khi:** Response từ AI không phải JSON hợp lệ
- **Thì:**
  - Lưu bài với status = "draft" (cần review)
  - Giữ nguyên title gốc nếu không có title_vi
  - Dùng description gốc nếu không có summary_vi
  - Đặt category = "ai-news" (mặc định)

---

### NHÓM 4: Lưu trữ vào Google Sheets

#### AC-4.1 – Lưu bài viết mới vào Google Sheets (Happy Path)

- **Tại:** Make.com Scenario - Module Google Sheets Add Row
- **Khi:** Đã có kết quả từ AI
- **Thì:**
  - Thêm row mới vào sheet Articles với các cột:
    - id: UUID tự sinh
    - url_hash, title_hash: Để dedup
    - title_en: Tiêu đề gốc
    - title_vi: Tiêu đề tiếng Việt
    - summary_vi: Tóm tắt tiếng Việt
    - original_url: URL gốc
    - category: Phân loại từ AI
    - source: Tên nguồn (AlphaSignal, TLDR...)
    - published_at: Ngày hiện tại
    - tile_size: "standard" (mặc định)
    - is_featured: FALSE
    - status: "published"
    - ai_provider: perplexity/openai
    - created_at: Thời gian hiện tại

---

#### AC-4.2 – Trigger Revalidation cho Website (Happy Path)

- **Tại:** Make.com Scenario - Module HTTP Webhook
- **Khi:** Đã lưu xong bài viết mới
- **Thì:**
  - Gọi webhook đến Vercel: POST /api/revalidate
  - Gửi kèm REVALIDATE_SECRET để xác thực
  - Trigger ISR revalidation cho trang chủ
  - Website cập nhật nội dung mới

---

### NHÓM 5: Monitoring và Error Handling

#### AC-5.1 – Ghi log xử lý AI (Happy Path)

- **Tại:** Make.com Scenario - Module Google Sheets Add Row (AI_Logs sheet)
- **Khi:** Hoàn thành xử lý mỗi bài viết
- **Thì:**
  - Ghi log vào sheet AI_Logs:
    - timestamp: Thời gian xử lý
    - article_title: Tiêu đề bài
    - provider: perplexity/openai
    - tokens_used: Số tokens (nếu có)
    - status: success/error
    - error_message: Lỗi nếu có

---

#### AC-5.2 – Xử lý khi Google Sheets API limit (Error Case)

- **Tại:** Make.com Scenario
- **Khi:** Google Sheets API trả về lỗi rate limit
- **Thì:**
  - Tự động retry sau 60 giây (Make.com retry settings)
  - Tối đa 3 lần retry
  - Nếu vẫn lỗi → Ghi log và bỏ qua bài này

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| URL Normalization | BR_DP_01 | Loại bỏ utm_*, ref, source, fbclid, gclid | - |
| Dedup Layer 1 | BR_DP_02 | Check url_hash trong Sheets | MD5(normalized_url) |
| Dedup Layer 2 | BR_DP_03 | Check title_hash trong Sheets | MD5(normalized_title) |
| AI Fallback | BR_DP_04 | Perplexity → OpenAI khi lỗi | - |
| Default Category | BR_DP_05 | "ai-news" nếu AI không phân loại được | - |
| Default Status | BR_DP_06 | "published" cho bài AI xử lý thành công | "draft" nếu lỗi |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **pipeline tự động thu thập và xử lý tin tức AI**, giúp website luôn có nội dung mới mà không cần nhập liệu thủ công.

Trọng số của story này là **P0 (Ưu tiên cao nhất)**

Story được coi là thành công khi đảm bảo được:

- Thu thập >= 20-30 bài viết mới mỗi ngày
- Tỷ lệ dedup chính xác >= 99%
- Tỷ lệ AI xử lý thành công >= 95%
- Chi phí hàng tháng <= $5 (trong free tier)
- Make.com operations <= 1000/tháng (free tier)

---

## ASSUMPTION

1. Gmail account đã được kết nối với Make.com.
2. Google Sheets đã được tạo với đúng schema.
3. Perplexity API key đã được cấu hình.
4. Các newsletter sources gửi email với format tương đối nhất quán.
5. Make.com scenario chạy trigger-based (khi có email mới) hoặc mỗi 15 phút.

---

## UI/UX Design

*{Không áp dụng - Đây là backend automation}*

---

# US-DF-DATA-PIPELINE-002: Thu thập GitHub Trending Repositories

## Nội dung

Là **Hệ thống KynguyenAI.vn**
Tôi muốn **tự động thu thập các repositories AI/ML đang trending trên GitHub**
Tại **Make.com automation workflow (tích hợp với Data Pipeline)**
Để **hiển thị các dự án AI hot trên Bento Grid, giúp lập trình viên cập nhật xu hướng**

---

## Màn hình/Dialog liên quan

- **Không có màn hình UI cho backend**
- **Frontend:** Component GitHub Trending Card trên Bento Grid
- **Google Sheets:** Sheet GitHub_Trending

---

## Acceptance Criteria

### NHÓM 1: Thu thập GitHub Trending

#### AC-1.1 – Fetch repositories từ GitHub Search API (Happy Path)

- **Tại:** Make.com Scenario hoặc Vercel Cron (nếu cần)
- **Khi:** Scheduled job chạy (mỗi 6 giờ)
- **Thì:**
  - Gọi GitHub Search API với query:
    - Topics: machine-learning, ai, llm, deep-learning
    - Created trong 7 ngày gần nhất
    - Stars > 50
    - Sort by stars, descending
    - Limit: 5 repos
  - Trích xuất thông tin:
    - full_name (owner/repo)
    - html_url
    - description
    - stargazers_count
    - language
    - topics

---

#### AC-1.2 – Dịch description sang tiếng Việt (Happy Path)

- **Tại:** Make.com Scenario - Module HTTP (Perplexity/OpenAI)
- **Khi:** Có description từ GitHub
- **Thì:**
  - Gọi AI API để dịch description sang tiếng Việt
  - Giữ nguyên thuật ngữ kỹ thuật
  - Nếu description rỗng → Để trống description_vi

---

#### AC-1.3 – Kiểm tra repo đã tồn tại (Happy Path)

- **Tại:** Make.com Scenario - Module Google Sheets Search
- **Khi:** Xử lý từng repo trong kết quả
- **Thì:**
  - Tìm kiếm repo_name trong sheet GitHub_Trending
  - Nếu tồn tại → Skip (không cập nhật)
  - Nếu chưa tồn tại → Tiếp tục xử lý và lưu

---

#### AC-1.4 – Lưu repo vào Google Sheets (Happy Path)

- **Tại:** Make.com Scenario - Module Google Sheets Add Row
- **Khi:** Repo mới chưa có trong Sheets
- **Thì:**
  - Thêm row mới vào sheet GitHub_Trending:
    - repo_name: owner/repo
    - url: GitHub URL
    - description_vi: Mô tả tiếng Việt
    - stars: Số stars
    - language: Ngôn ngữ chính
    - trending_date: Ngày fetch

---

### NHÓM 2: Hiển thị trên Website

#### AC-2.1 – API lấy danh sách GitHub Trending (Happy Path)

- **Tại:** API Route /api/github/trending
- **Khi:** Frontend gọi API
- **Thì:**
  - Lấy top 10 repos từ Google Sheets
  - Sắp xếp theo stars (cao nhất trước)
  - Trả về JSON:
    ```json
    {
      "data": [
        {
          "repoName": "owner/repo",
          "url": "https://github.com/...",
          "descriptionVi": "Mô tả tiếng Việt",
          "stars": 1234,
          "language": "Python"
        }
      ]
    }
    ```

---

#### AC-2.2 – Hiển thị GitHub Card trên Bento Grid (Happy Path)

- **Tại:** Trang chủ KynguyenAI.vn - Bento Grid
- **Khi:** Có dữ liệu từ API
- **Thì:**
  - Hiển thị GitHub Card với:
    - Tên repo (owner/repo)
    - Mô tả tiếng Việt
    - Số stars
    - Ngôn ngữ chính
    - Icon ngôn ngữ (nếu có)
  - Click vào card → Mở GitHub page trong tab mới

---

#### AC-2.3 – Hiển thị khi không có dữ liệu (Edge Case)

- **Tại:** Bento Grid
- **Khi:** Không có repo nào trong Google Sheets
- **Thì:**
  - Không hiển thị section GitHub Trending
  - Hoặc hiển thị placeholder: "Đang cập nhật..."

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Query Condition | BR_GH_01 | Stars > 50, created trong 7 ngày | Lọc repos có chất lượng |
| Dedup | BR_GH_02 | Check repo_name unique | Không lưu trùng |
| Limit | BR_GH_03 | Tối đa 5 repos/lần fetch | Tiết kiệm API quota |
| Schedule | BR_GH_04 | Chạy mỗi 6 giờ | Cập nhật 4 lần/ngày |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **danh sách dự án AI trending từ GitHub**, giúp lập trình viên Việt Nam cập nhật xu hướng công nghệ.

Trọng số của story này là **P2 (Ưu tiên thấp)**

Story được coi là thành công khi đảm bảo được:

- Thu thập được >= 10 repos mới mỗi tuần
- Dữ liệu cập nhật trong vòng 6 giờ
- Không bị rate limit từ GitHub API

---

## ASSUMPTION

1. GitHub Personal Access Token đã được cấu hình để tránh rate limit.
2. Chỉ thu thập repos có topics liên quan đến AI/ML.
3. Không tracking star history (giữ đơn giản cho MVP).

---

## UI/UX Design

*{Capture màn hình của UI/UX đã được phê duyệt}*
