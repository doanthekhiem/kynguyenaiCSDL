# US-TL-TOOLS-001: Xem Danh sách Công cụ AI

## Nội dung

Là **Người dùng KynguyenAI.vn**
Tôi muốn **xem danh sách các công cụ AI được tổng hợp và vote bởi cộng đồng**
Tại **trang /tools trên KynguyenAI.vn**
Để **khám phá và tìm kiếm các công cụ AI phù hợp với nhu cầu**

---

## Màn hình/Dialog liên quan

- **Màn hình chính:** Trang danh sách công cụ (/tools)
- **Màn hình 2:** Trang chi tiết công cụ (/tools/[slug])

---

## Acceptance Criteria

### NHÓM 1: Hiển thị Danh sách

#### AC-1.1 – Hiển thị danh sách công cụ (Happy Path)

- **Tại:** Trang /tools
- **Khi:** Người dùng truy cập trang
- **Thì:**
  - Hiển thị danh sách công cụ AI đã được duyệt (status = approved)
  - Mỗi card hiển thị:
    - Logo/Icon
    - Tên công cụ
    - Tagline (mô tả ngắn)
    - Danh mục
    - Loại giá (Free/Freemium/Paid/Enterprise)
    - Số vote
    - Nút vote
    - Rating trung bình (nếu có reviews)
  - Mặc định sắp xếp theo số vote (cao nhất trước)
  - Phân trang: 20 công cụ/trang

---

#### AC-1.2 – Lọc theo danh mục (Alternative Path)

- **Tại:** Trang /tools
- **Khi:** Người dùng chọn danh mục từ bộ lọc
- **Thì:**
  - Chỉ hiển thị công cụ thuộc danh mục đã chọn
  - URL cập nhật: /tools?category=text-generation
  - Số lượng kết quả được cập nhật
  - Danh mục có sẵn:
    - Text Generation (Tạo văn bản)
    - Image Generation (Tạo hình ảnh)
    - Video Generation (Tạo video)
    - Audio Generation (Tạo âm thanh)
    - Code Assistant (Hỗ trợ lập trình)
    - Chatbot
    - Productivity (Năng suất)
    - Research (Nghiên cứu)
    - Marketing
    - Design (Thiết kế)
    - Data Analysis (Phân tích dữ liệu)
    - Automation (Tự động hóa)
    - Other (Khác)

---

#### AC-1.3 – Tìm kiếm công cụ (Alternative Path)

- **Tại:** Trang /tools
- **Khi:** Người dùng nhập từ khóa vào ô tìm kiếm
- **Thì:**
  - Tìm kiếm trong tên và tagline
  - Kết quả cập nhật realtime (debounce 300ms)
  - URL cập nhật: /tools?search=keyword
  - Highlight từ khóa trong kết quả (nếu có)

---

#### AC-1.4 – Sắp xếp danh sách (Alternative Path)

- **Tại:** Trang /tools
- **Khi:** Người dùng chọn cách sắp xếp từ dropdown
- **Thì:**
  - Hỗ trợ các kiểu sắp xếp:
    - Nhiều vote nhất (mặc định)
    - Mới nhất
    - Đánh giá cao nhất
  - URL cập nhật: /tools?sort=votes|newest|rating

---

#### AC-1.5 – Danh sách trống (Edge Case)

- **Tại:** Trang /tools
- **Khi:** Không có công cụ nào trong danh sách (hoặc sau khi filter)
- **Thì:**
  - Hiển thị thông báo: "Chưa có công cụ nào"
  - Nếu đang filter: "Không tìm thấy công cụ phù hợp. Thử bỏ bớt bộ lọc."
  - Hiển thị nút "Gửi công cụ mới" cho người dùng đã đăng nhập

---

### NHÓM 2: Xem Chi tiết Công cụ

#### AC-2.1 – Xem chi tiết công cụ (Happy Path)

- **Tại:** Trang /tools/[slug]
- **Khi:** Người dùng click vào một công cụ
- **Thì:**
  - Hiển thị đầy đủ thông tin:
    - Logo lớn
    - Tên công cụ
    - Tagline
    - Mô tả đầy đủ
    - Danh mục
    - Loại giá + chi tiết giá (nếu có)
    - Website URL
    - Social links (Twitter, GitHub, Discord)
    - Screenshots/Video demo
    - Số vote + nút vote
    - Rating trung bình + số reviews
  - Nút "Truy cập website" → Mở website trong tab mới
  - Danh sách reviews bên dưới
  - Form viết review (nếu đã đăng nhập)

---

#### AC-2.2 – Công cụ không tồn tại (Error Case)

- **Tại:** URL /tools/[slug]
- **Khi:** slug không tồn tại hoặc công cụ chưa được duyệt
- **Thì:**
  - Hiển thị trang 404
  - Thông báo: "Công cụ không tồn tại hoặc đang chờ duyệt"
  - Gợi ý: "Xem danh sách công cụ" với link về /tools

---

### NHÓM 3: API Endpoints

#### AC-3.1 – API lấy danh sách công cụ (Happy Path)

- **Tại:** API Route GET /api/tools
- **Khi:** Client gọi API với params
- **Thì:**
  - Hỗ trợ các query params:
    - `limit`: Số công cụ trả về (mặc định: 20, max: 100)
    - `offset`: Offset cho phân trang (mặc định: 0)
    - `category`: Lọc theo danh mục (slug)
    - `search`: Tìm kiếm theo tên/tagline
    - `sort`: Sắp xếp (votes|newest|rating)
    - `featured`: Chỉ lấy công cụ nổi bật (true/false)
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

#### AC-3.2 – API lấy chi tiết công cụ (Happy Path)

- **Tại:** API Route GET /api/tools/[slug]
- **Khi:** Client gọi API với slug
- **Thì:**
  - Trả về chi tiết công cụ nếu tồn tại và approved
  - Response JSON với đầy đủ fields + category info + tags

---

#### AC-3.3 – API lấy danh mục (Happy Path)

- **Tại:** API Route GET /api/tools/categories
- **Khi:** Client gọi API
- **Thì:**
  - Trả về danh sách tất cả danh mục active
  - Sắp xếp theo display_order

---

### NHÓM 4: Caching và Performance

#### AC-4.1 – ISR Caching (Happy Path)

- **Tại:** Trang /tools và /tools/[slug]
- **Khi:** Trang được request
- **Thì:**
  - Sử dụng ISR (Incremental Static Regeneration)
  - Revalidate mỗi 300 giây (5 phút)
  - Trang được cache và serve từ CDN

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Status Filter | BR_TL_01 | Chỉ hiển thị công cụ status = "approved" | - |
| Default Sort | BR_TL_02 | Sắp xếp theo vote_count DESC | Mới nhất trước |
| Pagination | BR_TL_03 | 20 công cụ/trang, max 100 | - |
| ISR Revalidate | BR_TL_04 | 300 giây (5 phút) | - |
| Search | BR_TL_05 | Tìm trong name và tagline | Case insensitive |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **trang khám phá công cụ AI chính** cho người dùng.

Trọng số của story này là **P0 (Ưu tiên cao nhất)**

Story được coi là thành công khi đảm bảo được:

- Time to Interactive <= 2 giây
- Lighthouse Performance score >= 90
- Bounce rate <= 40%

---

## ASSUMPTION

1. Supabase PostgreSQL đã được cấu hình.
2. Database schema đã được migrate.
3. User Profile table đã tồn tại (từ US-PF-AUTH).

---

## UI/UX Design

*{Capture màn hình của UI/UX đã được phê duyệt}*

---

# US-TL-TOOLS-002: Vote cho Công cụ AI

## Nội dung

Là **Người dùng đã đăng nhập trên KynguyenAI.vn**
Tôi muốn **vote cho các công cụ AI mà tôi thấy hữu ích**
Tại **trang danh sách hoặc chi tiết công cụ**
Để **giúp cộng đồng biết đến những công cụ chất lượng**

---

## Màn hình/Dialog liên quan

- **Component:** Nút Vote trên ToolCard
- **Component:** Nút Vote trên trang chi tiết

---

## Acceptance Criteria

### NHÓM 1: Vote công cụ

#### AC-1.1 – Vote công cụ thành công (Happy Path)

- **Tại:** Nút vote trên ToolCard hoặc trang chi tiết
- **Khi:** Người dùng đã đăng nhập click nút vote
- **Thì:**
  - Tạo bản ghi vote trong database
  - Số vote tăng lên 1 (optimistic update)
  - Nút vote chuyển sang trạng thái "đã vote" (filled, primary color)
  - Animation feedback (scale up nhẹ)

---

#### AC-1.2 – Bỏ vote (Alternative Path)

- **Tại:** Nút vote
- **Khi:** Người dùng click vào công cụ đã vote
- **Thì:**
  - Xóa bản ghi vote trong database
  - Số vote giảm 1 (optimistic update)
  - Nút vote trở về trạng thái chưa vote (outline)

---

#### AC-1.3 – Vote khi chưa đăng nhập (Edge Case)

- **Tại:** Nút vote
- **Khi:** Người dùng chưa đăng nhập click vote
- **Thì:**
  - Hiển thị tooltip/dialog: "Vui lòng đăng nhập để vote"
  - Nút "Đăng nhập" dẫn đến /auth/login?next=/tools/[slug]
  - Sau đăng nhập, quay về trang công cụ

---

### NHÓM 2: API Endpoints

#### AC-2.1 – API toggle vote (Happy Path)

- **Tại:** API Route POST /api/tools/[slug]/vote
- **Khi:** User đã xác thực gọi API
- **Thì:**
  - Nếu chưa vote: Tạo vote mới
  - Nếu đã vote: Xóa vote
  - Response:
    ```json
    {
      "voted": true,
      "vote_count": 42,
      "message": "Vote added" | "Vote removed"
    }
    ```

---

#### AC-2.2 – API vote khi chưa đăng nhập (Error Case)

- **Tại:** API Route POST /api/tools/[slug]/vote
- **Khi:** Request không có auth token
- **Thì:**
  - HTTP Status: 401
  - Response: `{"error": "Unauthorized", "message": "Please login to vote"}`

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Vote Limit | BR_VOTE_01 | Mỗi user chỉ được 1 vote cho mỗi tool | - |
| Vote Toggle | BR_VOTE_02 | Vote có thể toggle (thêm/xóa) | - |
| Auth Required | BR_VOTE_03 | Chỉ user đã xác thực mới được vote | - |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **hệ thống vote** để community đánh giá công cụ.

Trọng số của story này là **P0 (Ưu tiên cao nhất)**

Story được coi là thành công khi đảm bảo được:

- Thời gian phản hồi vote <= 200ms
- Tỷ lệ người dùng vote >= 10% người dùng đăng nhập

---

## ASSUMPTION

1. Supabase Auth đã được cấu hình (US-PF-AUTH).
2. User Profile đã tồn tại cho tất cả authenticated users.

---

# US-TL-TOOLS-003: Viết Review cho Công cụ AI

## Nội dung

Là **Người dùng đã đăng nhập trên KynguyenAI.vn**
Tôi muốn **viết đánh giá và cho điểm các công cụ AI đã sử dụng**
Tại **trang chi tiết công cụ (/tools/[slug])**
Để **chia sẻ trải nghiệm với cộng đồng**

---

## Màn hình/Dialog liên quan

- **Component:** ToolReviewForm trên trang chi tiết
- **Component:** ToolReviewList hiển thị danh sách reviews

---

## Acceptance Criteria

### NHÓM 1: Tạo Review

#### AC-1.1 – Tạo review thành công (Happy Path)

- **Tại:** Form review trên trang chi tiết công cụ
- **Khi:** Người dùng đã đăng nhập nhập đầy đủ thông tin và submit
- **Thì:**
  - Tạo bản ghi review trong database
  - Cập nhật average_rating và review_count của tool (trigger)
  - Hiển thị review mới trong danh sách (realtime update)
  - Thông báo: "Đánh giá của bạn đã được đăng"
  - Ẩn form, hiển thị review của user với nút Edit/Delete

**Bảng mô tả trường nhập liệu:**

| Tên trường | Field Name | Loại | Bắt buộc | Format/Giá trị | Rule nhập liệu |
|------------|------------|------|----------|----------------|----------------|
| Đánh giá | rating | Stars | Có | 1-5 sao | Click để chọn |
| Tiêu đề | title | Text | Không | Max 200 ký tự | - |
| Nội dung | content | Textarea | Có | Min 50, Max 2000 ký tự | - |

---

#### AC-1.2 – Một user chỉ review một lần (Edge Case)

- **Tại:** Form review
- **Khi:** User đã có review cho tool này
- **Thì:**
  - Ẩn form tạo mới
  - Hiển thị review hiện tại của user
  - Hiển thị nút "Chỉnh sửa" và "Xóa"

---

#### AC-1.3 – Chỉnh sửa review (Alternative Path)

- **Tại:** Review card của user
- **Khi:** User click nút "Chỉnh sửa"
- **Thì:**
  - Chuyển review sang edit mode
  - Pre-fill form với dữ liệu hiện tại
  - Cho phép sửa rating, title, content
  - Khi lưu: Cập nhật review + trigger cập nhật rating

---

#### AC-1.4 – Xóa review (Alternative Path)

- **Tại:** Review card của user
- **Khi:** User click nút "Xóa" và xác nhận
- **Thì:**
  - Xóa review khỏi database
  - Cập nhật average_rating và review_count
  - Hiển thị lại form tạo review mới

---

### NHÓM 2: Xem Reviews

#### AC-2.1 – Xem danh sách reviews (Happy Path)

- **Tại:** Trang chi tiết công cụ
- **Khi:** Trang load
- **Thì:**
  - Hiển thị danh sách reviews (status = published)
  - Mỗi review hiển thị:
    - Avatar + Tên user
    - Rating (stars)
    - Tiêu đề
    - Nội dung
    - Ngày đăng
  - Sắp xếp theo ngày mới nhất
  - Phân trang: 10 reviews/lần, load more button

---

### NHÓM 3: API Endpoints

#### AC-3.1 – API lấy reviews (Happy Path)

- **Tại:** API Route GET /api/tools/[slug]/reviews
- **Khi:** Client gọi API
- **Thì:**
  - Trả về danh sách reviews (published) với user info
  - Params: limit, offset
  - Response bao gồm user avatar, display_name

---

#### AC-3.2 – API tạo review (Happy Path)

- **Tại:** API Route POST /api/tools/[slug]/reviews
- **Khi:** User đã xác thực gọi API
- **Thì:**
  - Validate: rating 1-5, content min 50 chars
  - Kiểm tra user chưa có review
  - Tạo review mới
  - Response: review object

---

#### AC-3.3 – API tạo review trùng (Error Case)

- **Tại:** API Route POST /api/tools/[slug]/reviews
- **Khi:** User đã có review cho tool này
- **Thì:**
  - HTTP Status: 409 (Conflict)
  - Response: `{"error": "Review exists", "message": "You already reviewed this tool"}`

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Review Limit | BR_RV_01 | Mỗi user chỉ được 1 review cho mỗi tool | UNIQUE(tool_id, user_id) |
| Rating Range | BR_RV_02 | Rating từ 1 đến 5 sao | - |
| Content Min | BR_RV_03 | Nội dung tối thiểu 50 ký tự | - |
| Content Max | BR_RV_04 | Nội dung tối đa 2000 ký tự | - |
| Auth Required | BR_RV_05 | Chỉ user đã xác thực mới được review | - |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **hệ thống đánh giá** để community chia sẻ trải nghiệm.

Trọng số của story này là **P1 (Ưu tiên trung bình)**

Story được coi là thành công khi đảm bảo được:

- Tỷ lệ user viết review >= 5% người dùng đăng nhập
- Độ dài trung bình review >= 100 ký tự

---

# US-TL-TOOLS-004: Gửi Công cụ AI Mới

## Nội dung

Là **Người dùng đã đăng nhập trên KynguyenAI.vn**
Tôi muốn **gửi công cụ AI mới để được đăng lên website**
Tại **trang /tools/submit**
Để **giới thiệu công cụ mình phát triển hoặc biết đến**

---

## Màn hình/Dialog liên quan

- **Màn hình chính:** Trang gửi công cụ (/tools/submit)
- **Màn hình 2:** Trang xem submissions của tôi (/dashboard/submissions)

---

## Acceptance Criteria

### NHÓM 1: Gửi Tool mới

#### AC-1.1 – Gửi tool thành công (Happy Path)

- **Tại:** Trang /tools/submit
- **Khi:** Người dùng đã đăng nhập điền form và submit
- **Thì:**
  - Validate tất cả trường bắt buộc
  - Tạo bản ghi trong ai_tool_submissions với status = pending
  - Hiển thị thông báo: "Công cụ của bạn đã được gửi và đang chờ duyệt"
  - Chuyển về trang "Submissions của tôi" hoặc /tools

**Bảng mô tả trường nhập liệu:**

| Tên trường | Field Name | Loại | Bắt buộc | Format/Giá trị | Rule nhập liệu |
|------------|------------|------|----------|----------------|----------------|
| Tên công cụ | name | Text | Có | Max 200 ký tự | - |
| Tagline | tagline | Text | Có | Max 300 ký tự | Mô tả ngắn 1 dòng |
| Mô tả | description | Textarea | Có | Min 100, Max 5000 ký tự | - |
| Website | website_url | URL | Có | URL hợp lệ | https:// |
| Logo | logo_url | URL | Không | URL hình ảnh | - |
| Danh mục | category_id | Dropdown | Có | Từ danh sách categories | - |
| Loại giá | pricing_type | Dropdown | Có | free/freemium/paid/enterprise | - |
| Chi tiết giá | pricing_details | Text | Không | Max 200 ký tự | VD: "From $10/month" |
| Twitter | twitter_url | URL | Không | URL Twitter | - |
| GitHub | github_url | URL | Không | URL GitHub | - |
| Quan hệ | submitter_relation | Dropdown | Có | maker/user/other | Bạn là? |

---

#### AC-1.2 – Gửi tool khi chưa đăng nhập (Edge Case)

- **Tại:** Trang /tools/submit
- **Khi:** Người dùng chưa đăng nhập truy cập
- **Thì:**
  - Chuyển hướng đến /auth/login?next=/tools/submit
  - Sau đăng nhập, quay về form submit

---

#### AC-1.3 – Xem submissions của tôi (Alternative Path)

- **Tại:** Dashboard hoặc trang riêng
- **Khi:** User đã đăng nhập
- **Thì:**
  - Hiển thị danh sách submissions đã gửi
  - Mỗi submission hiển thị:
    - Tên tool
    - Ngày gửi
    - Trạng thái (Pending/Approved/Rejected)
    - Ghi chú từ reviewer (nếu rejected)
  - Nếu approved: Link đến trang tool

---

### NHÓM 2: API Endpoints

#### AC-2.1 – API gửi submission (Happy Path)

- **Tại:** API Route POST /api/tools/submit
- **Khi:** User đã xác thực gọi API
- **Thì:**
  - Validate tất cả trường
  - Tạo submission với status = pending
  - Response: submission object với ID

---

#### AC-2.2 – API lấy submissions của user (Happy Path)

- **Tại:** API Route GET /api/user/submissions
- **Khi:** User đã xác thực gọi API
- **Thì:**
  - Trả về danh sách submissions của user hiện tại
  - Bao gồm thông tin trạng thái và reviewer notes

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Auth Required | BR_SUB_01 | Chỉ user đã xác thực mới được submit | - |
| Name Unique | BR_SUB_02 | Tên tool không được trùng với existing tools | Kiểm tra trước submit |
| URL Valid | BR_SUB_03 | Website URL phải hợp lệ và accessible | - |
| Description Min | BR_SUB_04 | Mô tả tối thiểu 100 ký tự | - |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **khả năng crowdsourcing** để mở rộng database tools.

Trọng số của story này là **P1 (Ưu tiên trung bình)**

Story được coi là thành công khi đảm bảo được:

- Số submission mới >= 5/tuần
- Tỷ lệ approval >= 60%

---

# US-TL-TOOLS-005: Quản lý Công cụ AI (Admin)

## Nội dung

Là **Admin hệ thống KynguyenAI**
Tôi muốn **quản lý danh sách công cụ AI và duyệt submissions**
Tại **trang /admin/tools**
Để **kiểm soát chất lượng nội dung trên website**

---

## Màn hình/Dialog liên quan

- **Màn hình chính:** Trang quản lý tools (/admin/tools)
- **Màn hình 2:** Trang chỉnh sửa tool (/admin/tools/[id])
- **Màn hình 3:** Trang duyệt submissions (/admin/tools/submissions)

---

## Acceptance Criteria

### NHÓM 1: Quản lý Tools

#### AC-1.1 – Xem danh sách tools (Happy Path)

- **Tại:** Trang /admin/tools
- **Khi:** Admin truy cập
- **Thì:**
  - Hiển thị table với tất cả tools (mọi status)
  - Cột hiển thị:
    - Logo (nhỏ)
    - Tên
    - Danh mục
    - Votes
    - Reviews
    - Rating
    - Status (badge màu)
    - Ngày tạo
    - Actions (Edit, Delete, Feature)
  - Lọc theo status: All/Pending/Approved/Rejected/Archived
  - Tìm kiếm theo tên
  - Phân trang

---

#### AC-1.2 – Tạo tool mới (Happy Path)

- **Tại:** Dialog/Page "Tạo tool mới"
- **Khi:** Admin nhập đầy đủ thông tin và submit
- **Thì:**
  - Tạo tool với status = approved (hoặc tùy chọn)
  - Tự động generate slug từ tên
  - Set approved_by = admin hiện tại
  - Set published_at = now (nếu approved)

---

#### AC-1.3 – Chỉnh sửa tool (Alternative Path)

- **Tại:** Trang /admin/tools/[id]
- **Khi:** Admin chỉnh sửa và lưu
- **Thì:**
  - Cập nhật tất cả trường
  - Cho phép sửa status
  - Cho phép sửa featured
  - Cập nhật updated_at

---

#### AC-1.4 – Xóa tool (Alternative Path)

- **Tại:** Trang admin tools
- **Khi:** Admin click Delete và xác nhận
- **Thì:**
  - Xóa tool (hard delete) hoặc set status = archived
  - Cascade xóa votes và reviews liên quan

---

#### AC-1.5 – Feature/Unfeature tool (Alternative Path)

- **Tại:** Trang admin tools
- **Khi:** Admin toggle Featured
- **Thì:**
  - Set featured = true/false
  - Set featured_date = today (nếu featured)
  - Tool nổi bật hiển thị ở đầu danh sách

---

### NHÓM 2: Duyệt Submissions

#### AC-2.1 – Xem danh sách submissions (Happy Path)

- **Tại:** Trang /admin/tools/submissions
- **Khi:** Admin truy cập
- **Thì:**
  - Hiển thị submissions pending (ưu tiên) + all
  - Mỗi submission card hiển thị:
    - Tên tool
    - Tagline
    - Website
    - Người gửi + relation (maker/user)
    - Ngày gửi
    - Nút: Preview, Approve, Reject

---

#### AC-2.2 – Approve submission (Happy Path)

- **Tại:** Submission card/detail
- **Khi:** Admin click "Approve"
- **Thì:**
  - Tạo bản ghi ai_tools từ submission data
  - Generate slug
  - Set status = approved, approved_by, approved_at, published_at
  - Cập nhật submission:
    - status = approved
    - approved_tool_id = new tool id
    - reviewed_at = now
  - (Tùy chọn) Gửi email thông báo cho người gửi

---

#### AC-2.3 – Reject submission (Alternative Path)

- **Tại:** Submission card/detail
- **Khi:** Admin click "Reject" và nhập lý do
- **Thì:**
  - Cập nhật submission:
    - status = rejected
    - reviewer_notes = lý do
    - reviewer_id = admin
    - reviewed_at = now
  - (Tùy chọn) Gửi email thông báo (kèm lý do) cho người gửi

---

### NHÓM 3: API Endpoints

#### AC-3.1 – API admin CRUD tools

- **Tại:** API Routes /api/admin/tools/*
- **Khi:** Admin gọi API
- **Thì:**
  - GET /api/admin/tools: List all tools (với filter status)
  - POST /api/admin/tools: Create new tool
  - PUT /api/admin/tools/[id]: Update tool
  - DELETE /api/admin/tools/[id]: Delete tool
  - PUT /api/admin/tools/[id]/status: Update status
  - PUT /api/admin/tools/[id]/featured: Toggle featured

---

#### AC-3.2 – API admin submissions

- **Tại:** API Routes /api/admin/tools/submissions/*
- **Khi:** Admin gọi API
- **Thì:**
  - GET /api/admin/tools/submissions: List submissions
  - PUT /api/admin/tools/submissions/[id]/approve: Approve
  - PUT /api/admin/tools/submissions/[id]/reject: Reject (body: notes)

---

#### AC-3.3 – API không phải admin (Error Case)

- **Tại:** Tất cả /api/admin/* routes
- **Khi:** User không có role admin
- **Thì:**
  - HTTP Status: 403
  - Response: `{"error": "Forbidden", "message": "Admin access required"}`

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Admin Only | BR_ADMIN_01 | Chỉ user có role = admin mới truy cập được | - |
| Featured Limit | BR_ADMIN_02 | Nên có tối đa 10 tools featured cùng lúc | Soft limit |
| Slug Unique | BR_ADMIN_03 | Slug phải unique, auto-generate từ name | - |
| Review Time | BR_ADMIN_04 | Submissions nên được review trong 24h | KPI |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **khả năng quản lý nội dung** cho Admin.

Trọng số của story này là **P0 (Ưu tiên cao nhất)**

Story được coi là thành công khi đảm bảo được:

- Thời gian duyệt submission <= 24h
- Tỷ lệ spam submissions <= 10%
- Admin có thể CRUD tools trong < 2 phút

---

## ASSUMPTION

1. Role admin đã được định nghĩa trong user_profile table.
2. Admin dashboard layout đã có sẵn.
3. RLS policies đã được cấu hình cho admin access.

---

## UI/UX Design

*{Capture màn hình của UI/UX đã được phê duyệt}*
