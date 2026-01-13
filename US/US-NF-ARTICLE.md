# US-NF-ARTICLE-001: Hiển thị Danh sách Bài viết trên Website

## Nội dung

Là **Người dùng KynguyenAI.vn**
Tôi muốn **xem danh sách bài viết tin tức AI được hiển thị theo dạng Bento Grid**
Tại **Trang chủ và các trang danh mục trên KynguyenAI.vn**
Để **dễ dàng khám phá và đọc các tin tức AI mới nhất**

---

## Màn hình/Dialog liên quan

- **Màn hình chính:** Trang chủ (/) - Bento Grid
- **Màn hình 2:** Trang danh mục (/category/[slug])
- **Màn hình 3:** Trang chi tiết bài viết (/article/[id])

---

## Acceptance Criteria

### NHÓM 1: Hiển thị Bento Grid trên Trang chủ

#### AC-1.1 – Hiển thị Bento Grid với bài viết (Happy Path)

- **Tại:** Trang chủ (/)
- **Khi:** Người dùng truy cập trang chủ
- **Thì:**
  - Hiển thị Bento Grid với các bài viết
  - Bài Hero (is_featured = TRUE, tile_size = "hero"):
    - Chiếm diện tích lớn nhất
    - Hiển thị hình ảnh lớn
    - Tiêu đề nổi bật
    - Tóm tắt đầy đủ
  - Các bài viết khác hiển thị theo tile_size:
    - `hero`: 2 cột × 2 hàng
    - `tall`: 1 cột × 2 hàng
    - `wide`: 2 cột × 1 hàng
    - `standard`: 1 cột × 1 hàng
  - Mỗi tile hiển thị:
    - Hình thu nhỏ (thumbnail)
    - Tiêu đề tiếng Việt (title_vi)
    - Danh mục (category)
    - Nguồn (source)
    - Ngày xuất bản

---

#### AC-1.2 – Lọc bài viết theo trạng thái (Happy Path)

- **Tại:** Trang chủ và các trang danh mục
- **Khi:** Hệ thống load dữ liệu
- **Thì:**
  - Chỉ hiển thị bài viết có status = "published"
  - KHÔNG hiển thị bài có status = "draft" hoặc "archived"
  - Sắp xếp theo ngày xuất bản (published_at) mới nhất trước

---

#### AC-1.3 – Không có bài viết nào (Edge Case)

- **Tại:** Trang chủ
- **Khi:** Google Sheets trống hoặc không có bài published
- **Thì:**
  - Hiển thị thông báo: "Chưa có bài viết nào"
  - Không hiển thị lỗi hệ thống

---

### NHÓM 2: Hiển thị theo Danh mục

#### AC-2.1 – Xem bài viết theo danh mục (Happy Path)

- **Tại:** Trang danh mục (/category/[slug])
- **Khi:** Người dùng truy cập trang danh mục (VD: /category/ai-tools)
- **Thì:**
  - Hiển thị tiêu đề danh mục:
    - ai-tools → "AI Tools"
    - ai-news → "AI News"
    - ai-tutorial → "AI Tutorial"
    - ai-vietnam → "AI Vietnam"
  - Hiển thị danh sách bài viết thuộc danh mục đó
  - Sắp xếp theo ngày xuất bản mới nhất
  - Phân trang: 20 bài/trang

---

#### AC-2.2 – Danh mục không tồn tại (Error Case)

- **Tại:** URL /category/[slug]
- **Khi:** slug không nằm trong danh sách danh mục hợp lệ
- **Thì:**
  - Chuyển hướng về trang 404
  - Hiển thị thông báo: "Danh mục không tồn tại"

---

#### AC-2.3 – Danh mục trống (Edge Case)

- **Tại:** Trang danh mục
- **Khi:** Không có bài viết nào trong danh mục
- **Thì:**
  - Hiển thị tiêu đề danh mục
  - Thông báo: "Chưa có bài viết trong danh mục này"
  - Gợi ý: "Xem các bài viết khác" với link về trang chủ

---

### NHÓM 3: Xem Chi tiết Bài viết

#### AC-3.1 – Xem chi tiết bài viết (Happy Path)

- **Tại:** Trang chi tiết bài viết (/article/[id])
- **Khi:** Người dùng click vào một bài viết
- **Thì:**
  - Hiển thị đầy đủ thông tin:
    - Tiêu đề tiếng Việt (title_vi)
    - Tiêu đề gốc tiếng Anh (title_en)
    - Tóm tắt tiếng Việt (summary_vi)
    - Danh mục
    - Tags
    - Nguồn (source)
    - Ngày xuất bản
    - Hình ảnh (thumbnail)
  - Nút "Đọc bài gốc" → Mở original_url trong tab mới
  - Nút Bookmark (cho người dùng đã đăng nhập)
  - Nút Share

---

#### AC-3.2 – Bài viết không tồn tại (Error Case)

- **Tại:** URL /article/[id]
- **Khi:** ID không tồn tại trong Google Sheets
- **Thì:**
  - Hiển thị trang 404
  - Thông báo: "Bài viết không tồn tại hoặc đã bị xóa"
  - Gợi ý: "Quay về trang chủ"

---

#### AC-3.3 – Bài viết ở trạng thái draft (Error Case)

- **Tại:** URL /article/[id]
- **Khi:** Bài viết có status = "draft" hoặc "archived"
- **Thì:**
  - Hiển thị trang 404 (không tiết lộ bài tồn tại nhưng chưa publish)

---

### NHÓM 4: API Endpoints

#### AC-4.1 – API lấy danh sách bài viết (Happy Path)

- **Tại:** API Route GET /api/articles
- **Khi:** Client gọi API với params
- **Thì:**
  - Hỗ trợ các query params:
    - `limit`: Số bài trả về (mặc định: 20, max: 100)
    - `offset`: Offset cho phân trang (mặc định: 0)
    - `category`: Lọc theo danh mục
    - `featured`: Chỉ lấy bài nổi bật (true/false)
  - Response JSON:
    ```json
    {
      "data": [...],
      "pagination": {
        "total": 150,
        "limit": 20,
        "offset": 0,
        "hasMore": true
      }
    }
    ```

---

#### AC-4.2 – API lấy chi tiết bài viết (Happy Path)

- **Tại:** API Route GET /api/articles/[id]
- **Khi:** Client gọi API với ID
- **Thì:**
  - Trả về chi tiết bài viết nếu tồn tại và published
  - Response JSON với đầy đủ fields

---

#### AC-4.3 – API lỗi khi bài không tồn tại (Error Case)

- **Tại:** API Route GET /api/articles/[id]
- **Khi:** ID không tồn tại
- **Thì:**
  - HTTP Status: 404
  - Response:
    ```json
    {
      "error": "Not Found",
      "code": "ARTICLE_NOT_FOUND",
      "message": "Article with id xxx not found"
    }
    ```

---

### NHÓM 5: Caching và Performance

#### AC-5.1 – ISR Caching (Happy Path)

- **Tại:** Trang chủ và trang danh mục
- **Khi:** Trang được request
- **Thì:**
  - Sử dụng ISR (Incremental Static Regeneration)
  - Revalidate mỗi 300 giây (5 phút)
  - Trang được cache và serve từ CDN

---

#### AC-5.2 – On-demand Revalidation (Alternative Path)

- **Tại:** API Route POST /api/revalidate
- **Khi:** Make.com gọi webhook sau khi thêm bài mới
- **Thì:**
  - Xác thực REVALIDATE_SECRET
  - Invalidate cache cho trang chủ
  - Trang chủ rebuild với dữ liệu mới ở request tiếp theo

---

#### AC-5.3 – Revalidation không có secret (Error Case)

- **Tại:** API Route POST /api/revalidate
- **Khi:** Request thiếu hoặc sai REVALIDATE_SECRET
- **Thì:**
  - HTTP Status: 401
  - Response: `{"error": "Invalid secret"}`
  - KHÔNG thực hiện revalidation

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Status Filter | BR_AR_01 | Chỉ hiển thị bài status = "published" | - |
| Sort Order | BR_AR_02 | Sắp xếp theo published_at DESC | Mới nhất trước |
| Pagination | BR_AR_03 | 20 bài/trang, max 100 | - |
| ISR Revalidate | BR_AR_04 | 300 giây (5 phút) | - |
| Tile Sizes | BR_AR_05 | hero, tall, wide, standard | - |
| Default Tile | BR_AR_06 | "standard" nếu không chỉ định | - |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **giao diện hiển thị bài viết chính** cho người dùng, là điểm tiếp xúc đầu tiên với nội dung KynguyenAI.

Trọng số của story này là **P0 (Ưu tiên cao nhất)**

Story được coi là thành công khi đảm bảo được:

- Time to First Contentful Paint (FCP) <= 1.5 giây
- Lighthouse Performance score >= 90
- Trang chủ cập nhật nội dung mới trong vòng 5 phút
- SEO-friendly với đầy đủ meta tags

---

## ASSUMPTION

1. Google Sheets API đã được cấu hình với Service Account.
2. Bento Grid layout đã được thiết kế sẵn.
3. Tất cả bài viết có thumbnail hợp lệ (hoặc placeholder image).
4. ISR được hỗ trợ trên Vercel deployment.

---

## UI/UX Design

*{Capture màn hình của UI/UX đã được phê duyệt}*

---

# US-NF-ARTICLE-002: Quản lý Bài viết (Admin)

## Nội dung

Là **Admin hệ thống KynguyenAI**
Tôi muốn **quản lý bài viết: xem, sửa, thay đổi trạng thái, đánh dấu nổi bật**
Tại **Google Sheets hoặc trang Admin (nếu có)**
Để **kiểm soát chất lượng và nội dung hiển thị trên website**

---

## Màn hình/Dialog liên quan

- **Màn hình chính:** Google Sheets - Sheet Articles
- **Màn hình phụ (tương lai):** Admin Dashboard

---

## Acceptance Criteria

### NHÓM 1: Xem và Lọc Bài viết

#### AC-1.1 – Xem danh sách tất cả bài viết (Happy Path)

- **Tại:** Google Sheets - Sheet Articles
- **Khi:** Admin mở Google Sheets
- **Thì:**
  - Hiển thị tất cả bài viết với đầy đủ cột:
    - id, url_hash, title_hash
    - title_en, title_vi, summary_vi
    - original_url, thumbnail
    - category, tags, source
    - published_at, tile_size, is_featured
    - status, ai_provider, created_at
  - Cho phép sắp xếp và lọc theo Google Sheets filter

---

#### AC-1.2 – Lọc bài cần review (Alternative Path)

- **Tại:** Google Sheets
- **Khi:** Admin filter status = "draft"
- **Thì:**
  - Hiển thị các bài cần review (AI xử lý lỗi hoặc chất lượng thấp)
  - Admin có thể chỉnh sửa và đổi status sang "published"

---

### NHÓM 2: Chỉnh sửa Bài viết

#### AC-2.1 – Sửa nội dung bài viết (Happy Path)

- **Tại:** Google Sheets - Row bài viết
- **Khi:** Admin chỉnh sửa các ô
- **Thì:**
  - Cho phép sửa các trường:
    - title_vi: Tiêu đề tiếng Việt
    - summary_vi: Tóm tắt
    - category: Danh mục
    - tags: Tags (comma-separated)
    - tile_size: Kích thước tile
    - is_featured: TRUE/FALSE
    - status: draft/published/archived
    - thumbnail: URL hình ảnh
  - Google Sheets tự động lưu
  - Website cập nhật sau ISR revalidate (5 phút) hoặc manual revalidate

---

#### AC-2.2 – Đánh dấu bài nổi bật (Happy Path)

- **Tại:** Google Sheets - Cột is_featured
- **Khi:** Admin đổi is_featured = TRUE
- **Thì:**
  - Bài viết được đánh dấu nổi bật
  - Hiển thị ở vị trí Hero trên Bento Grid (nếu cũng có tile_size = "hero")
  - Chỉ nên có 1 bài is_featured = TRUE tại một thời điểm

---

### NHÓM 3: Thay đổi Trạng thái

#### AC-3.1 – Publish bài viết (Happy Path)

- **Tại:** Google Sheets - Cột status
- **Khi:** Admin đổi status từ "draft" sang "published"
- **Thì:**
  - Bài viết xuất hiện trên website sau lần revalidate tiếp theo

---

#### AC-3.2 – Archive bài viết (Alternative Path)

- **Tại:** Google Sheets - Cột status
- **Khi:** Admin đổi status sang "archived"
- **Thì:**
  - Bài viết không còn hiển thị trên website
  - Dữ liệu vẫn được giữ lại trong Sheets
  - Có thể khôi phục bằng cách đổi lại status = "published"

---

#### AC-3.3 – Unpublish bài viết (Alternative Path)

- **Tại:** Google Sheets - Cột status
- **Khi:** Admin đổi status từ "published" sang "draft"
- **Thì:**
  - Bài viết không còn hiển thị công khai
  - Người dùng truy cập URL cũ sẽ thấy trang 404

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Featured | BR_ADMIN_01 | Chỉ nên có 1 bài is_featured = TRUE | Hiển thị Hero |
| Status Values | BR_ADMIN_02 | draft, published, archived | 3 trạng thái |
| Category Values | BR_ADMIN_03 | ai-tools, ai-news, ai-tutorial, ai-vietnam | 4 danh mục |
| Tile Size Values | BR_ADMIN_04 | hero, tall, wide, standard | 4 kích thước |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **khả năng quản lý nội dung** cho Admin, đảm bảo chất lượng bài viết trước khi xuất bản.

Trọng số của story này là **P1 (Ưu tiên trung bình)**

Story được coi là thành công khi đảm bảo được:

- Admin có thể publish/unpublish bài trong < 1 phút
- Tỷ lệ bài cần manual review <= 5%

---

## ASSUMPTION

1. Admin có quyền truy cập Google Sheets.
2. Không cần xây dựng Admin UI riêng cho MVP, sử dụng Google Sheets.
3. Manual revalidation có thể được trigger qua curl hoặc tool đơn giản.

---

## UI/UX Design

*{Không áp dụng - Sử dụng Google Sheets interface}*
