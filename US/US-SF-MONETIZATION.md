# US-SF-MONETIZATION-001: Quản lý Affiliate Marketing

## Nội dung

Là **Admin hệ thống KynguyenAI**
Tôi muốn **quản lý các chương trình affiliate và theo dõi hiệu quả các link affiliate**
Tại **trang quản trị Admin trên KynguyenAI.vn**
Để **tối ưu hóa doanh thu từ affiliate marketing và đo lường hiệu quả kinh doanh**

---

## Màn hình/Dialog liên quan

- **Màn hình chính:** Quản lý Affiliate Programs
- **Màn hình 2:** Quản lý Affiliate Links
- **Màn hình 3:** Báo cáo doanh thu Affiliate
- **Dialog 1:** Tạo mới Affiliate Link
- **Dialog 2:** Xem chi tiết thống kê Link

---

## Acceptance Criteria

### NHÓM 1: Quản lý Chương trình Affiliate

#### AC-1.1 – Hiển thị danh sách chương trình Affiliate (Happy Path)

- **Tại:** Màn hình "Quản lý Affiliate Programs"
- **Khi:** Admin truy cập màn hình quản lý Affiliate
- **Thì:**
  - Hiển thị danh sách các chương trình affiliate với các thông tin:
    - Tên chương trình (Udemy, Coursera, DigitalOcean, Vercel...)
    - URL gốc
    - Tham số tracking
    - Tỷ lệ hoa hồng
    - Loại hoa hồng (Phần trăm / Cố định)
    - Trạng thái (Hoạt động / Không hoạt động)
  - Cho phép bật/tắt trạng thái chương trình

**Inline Business Rule:**
- Chỉ hiển thị link từ các chương trình đang hoạt động trên website

---

#### AC-1.2 – Cấu hình chương trình Affiliate (Alternative Path)

- **Tại:** Màn hình "Quản lý Affiliate Programs"
- **Khi:** Admin chỉnh sửa cấu hình chương trình
- **Thì:**
  - Cho phép cập nhật các thông tin:
    - Tỷ lệ hoa hồng
    - Tham số tracking
    - Trạng thái hoạt động
  - Lưu thay đổi thành công
  - Hiển thị thông báo: MSG_001 "Cập nhật chương trình thành công"

---

### NHÓM 2: Quản lý Link Affiliate

#### AC-2.1 – Tạo mới Link Affiliate (Happy Path)

- **Tại:** Dialog "Tạo mới Affiliate Link"
- **Khi:** Admin nhập thông tin và nhấn "Tạo link"
- **Thì:**
  - Tự động tạo URL affiliate từ URL gốc
  - Tự động sinh mã ngắn (short code) 8 ký tự
  - Lưu vào hệ thống với các thông tin:
    - Tên link
    - URL gốc
    - URL affiliate (đã thêm tham số tracking)
    - Mã ngắn
    - Metadata (danh mục, bài viết liên quan)
  - Hiển thị thông báo: MSG_002 "Tạo link affiliate thành công"
  - Copy mã ngắn vào clipboard

**Bảng mô tả trường nhập liệu:**

| Tên trường | Field Name | Loại | Bắt buộc | Mặc định | Format/Giá trị | Rule nhập liệu |
|------------|------------|------|----------|----------|----------------|----------------|
| Chương trình | program_id | Dropdown | Có | - | Danh sách chương trình Affiliate đang hoạt động | Chỉ hiển thị chương trình có status = active |
| Tên link | name | Text | Có | - | Tối đa 200 ký tự | - |
| URL gốc | original_url | URL | Có | - | URL hợp lệ | Phải là URL thuộc domain của chương trình đã chọn |
| Danh mục | category | Dropdown | Không | - | programming, web-development, data-science, ai-ml, cloud, devops | - |
| Bài viết liên quan | article_id | Dropdown | Không | - | Danh sách bài viết đã publish | - |

---

#### AC-2.2 – Hiển thị danh sách Link Affiliate (Happy Path)

- **Tại:** Màn hình "Quản lý Affiliate Links"
- **Khi:** Admin truy cập màn hình
- **Thì:**
  - Hiển thị table với các cột:
    - Tên link
    - Chương trình
    - Mã ngắn
    - Số lượt click
    - Số chuyển đổi
    - Doanh thu
    - Trạng thái
    - Ngày tạo
  - Cho phép sắp xếp theo các cột
  - Cho phép tìm kiếm theo tên link

---

#### AC-2.3 – Tracking Click Affiliate Link (Happy Path)

- **Tại:** Endpoint `/go/[code]`
- **Khi:** Người dùng click vào link affiliate
- **Thì:**
  - Ghi nhận thông tin click:
    - User Agent
    - IP Address
    - Session ID
    - Referrer
    - Thời gian click
  - Tăng số lượt click của link
  - Chuyển hướng người dùng đến URL affiliate

**Inline Business Rule:**
- Không tính click từ bot (phát hiện qua User Agent)
- Giới hạn 10 click/IP/giờ để chống gian lận

---

#### AC-2.4 – Ghi nhận Chuyển đổi từ Webhook (Alternative Path)

- **Tại:** API Webhook nhận từ đối tác Affiliate
- **Khi:** Đối tác gửi thông báo chuyển đổi thành công
- **Thì:**
  - Xác thực webhook từ đối tác
  - Tính hoa hồng theo loại:
    - Phần trăm: số tiền × tỷ lệ hoa hồng
    - Cố định: số tiền cố định
  - Cập nhật thống kê link:
    - Tăng số chuyển đổi
    - Cộng doanh thu
  - Ghi log doanh thu

---

#### AC-2.5 – Lỗi khi tạo link với URL không hợp lệ (Error Case)

- **Tại:** Dialog "Tạo mới Affiliate Link"
- **Khi:** Admin nhập URL không thuộc domain của chương trình
- **Thì:**
  - Hiển thị lỗi: ERR_001 "URL không hợp lệ. URL phải thuộc domain của chương trình đã chọn."
  - Không cho phép submit form

---

#### AC-2.6 – Link Affiliate không tồn tại (Error Case)

- **Tại:** Endpoint `/go/[code]`
- **Khi:** Người dùng truy cập link với mã không tồn tại hoặc đã bị vô hiệu
- **Thì:**
  - Chuyển hướng về trang chủ
  - Không ghi nhận click

---

### NHÓM 3: Phát hiện và Ngăn chặn Gian lận Click

#### AC-3.1 – Phát hiện Click Spam từ cùng IP (Edge Case)

- **Tại:** Endpoint `/go/[code]`
- **Khi:** Phát hiện IP click quá 10 lần/giờ cho cùng một link
- **Thì:**
  - Không ghi nhận click
  - Ghi log cảnh báo gian lận
  - Vẫn chuyển hướng người dùng bình thường

**Inline Business Rule:**
- Giới hạn: 10 click/IP/giờ cho mỗi link
- Giới hạn: 5 click/session/giờ cho mỗi link

---

#### AC-3.2 – Phát hiện Click từ Bot (Edge Case)

- **Tại:** Endpoint `/go/[code]`
- **Khi:** User Agent chứa các pattern đáng ngờ (bot, crawler, spider, curl, wget, python-requests)
- **Thì:**
  - Không ghi nhận click
  - Ghi log cảnh báo
  - Vẫn chuyển hướng bình thường

---

### NHÓM 4: Báo cáo và Thống kê

#### AC-4.1 – Xem báo cáo tổng quan doanh thu (Happy Path)

- **Tại:** Màn hình "Báo cáo doanh thu"
- **Khi:** Admin truy cập màn hình báo cáo
- **Thì:**
  - Hiển thị các chỉ số tổng quan:
    - Tổng doanh thu (theo khoảng thời gian)
    - Doanh thu từ Affiliate
    - Doanh thu từ Sponsored
    - Tổng số click
    - Tổng số chuyển đổi
    - Tỷ lệ chuyển đổi
  - Biểu đồ doanh thu theo ngày
  - Top 10 link hiệu quả nhất

---

#### AC-4.2 – Lọc báo cáo theo thời gian (Alternative Path)

- **Tại:** Màn hình "Báo cáo doanh thu"
- **Khi:** Admin chọn khoảng thời gian (7 ngày, 30 ngày, 90 ngày, tùy chỉnh)
- **Thì:**
  - Cập nhật tất cả các chỉ số và biểu đồ theo khoảng thời gian đã chọn

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Short Code | BR_AF_01 | Mã ngắn 8 ký tự, duy nhất trong hệ thống | Tự động sinh bằng nanoid |
| Click Count | BR_AF_02 | Không đếm click từ bot và spam | Dựa vào User Agent và Rate Limit |
| Rate Limit IP | BR_AF_03 | Tối đa 10 click/IP/giờ/link | Dùng Redis để tracking |
| Rate Limit Session | BR_AF_04 | Tối đa 5 click/session/giờ/link | Dùng Redis để tracking |
| Commission | BR_AF_05 | Tính theo loại: PERCENTAGE hoặc FIXED | Cấu hình theo chương trình |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **hệ thống theo dõi và quản lý doanh thu affiliate marketing**, giúp tối ưu hóa nguồn thu từ liên kết tiếp thị, đóng góp khoảng 40% doanh thu dự kiến của KynguyenAI.vn.

Trọng số của story này là **P0 (Ưu tiên cao)**

Story được coi là thành công khi đảm bảo được:

- Tỷ lệ tracking click chính xác >= 99%
- Thời gian redirect <= 200ms
- Tỷ lệ phát hiện click gian lận >= 95%
- Admin có thể tạo link affiliate trong < 30 giây

---

## ASSUMPTION

1. Các đối tác affiliate (Udemy, Coursera, DigitalOcean, Vercel) đã được đăng ký và có Affiliate ID hợp lệ.
2. Webhook từ đối tác tuân theo format đã thống nhất.
3. Redis/Upstash đã được cấu hình để tracking rate limit.
4. Chỉ Admin mới có quyền truy cập trang quản lý Affiliate.

---

## UI/UX Design

*{Capture màn hình của UI/UX đã được phê duyệt}*

---

# US-SF-MONETIZATION-002: Quản lý Sponsored Tiles (Quảng cáo Tài trợ)

## Nội dung

Là **Admin hệ thống KynguyenAI**
Tôi muốn **quản lý các chiến dịch quảng cáo tài trợ (Sponsored Tiles) trên Bento Grid**
Tại **trang quản trị Admin trên KynguyenAI.vn**
Để **tạo nguồn thu bền vững từ các nhà tài trợ muốn quảng bá sản phẩm/dịch vụ**

---

## Màn hình/Dialog liên quan

- **Màn hình chính:** Quản lý Sponsored Campaigns
- **Màn hình 2:** Quản lý Sponsors (Nhà tài trợ)
- **Màn hình 3:** Thống kê chiến dịch
- **Dialog 1:** Tạo/Chỉnh sửa Campaign
- **Dialog 2:** Tạo/Chỉnh sửa Sponsor

---

## Acceptance Criteria

### NHÓM 1: Quản lý Nhà tài trợ (Sponsors)

#### AC-1.1 – Tạo mới Nhà tài trợ (Happy Path)

- **Tại:** Dialog "Tạo mới Sponsor"
- **Khi:** Admin nhập thông tin và nhấn "Lưu"
- **Thì:**
  - Tạo bản ghi Sponsor mới với các thông tin:
    - Tên công ty
    - Tên người liên hệ
    - Email
    - Số điện thoại
    - Thông tin thanh toán (JSON)
    - Trạng thái: Hoạt động
  - Hiển thị thông báo: MSG_003 "Tạo nhà tài trợ thành công"

**Bảng mô tả trường nhập liệu:**

| Tên trường | Field Name | Loại | Bắt buộc | Mặc định | Format/Giá trị | Rule nhập liệu |
|------------|------------|------|----------|----------|----------------|----------------|
| Tên công ty | company_name | Text | Có | - | Tối đa 200 ký tự | - |
| Tên người liên hệ | contact_name | Text | Không | - | Tối đa 100 ký tự | - |
| Email | email | Email | Có | - | Email hợp lệ | - |
| Số điện thoại | phone | Text | Không | - | Tối đa 20 ký tự | - |

---

### NHÓM 2: Quản lý Chiến dịch Quảng cáo

#### AC-2.1 – Tạo mới Chiến dịch (Happy Path)

- **Tại:** Dialog "Tạo mới Campaign"
- **Khi:** Admin nhập thông tin chiến dịch và nhấn "Lưu"
- **Thì:**
  - Tạo chiến dịch với trạng thái "Bản nháp" (DRAFT)
  - Lưu các thông tin:
    - Nhà tài trợ
    - Tên chiến dịch
    - Loại tile (job, course, product, banner)
    - Kích thước tile (small, medium, large)
    - Nội dung (tiêu đề, mô tả, hình ảnh, CTA, logo)
    - URL đích
    - Ngân sách
    - Ngày bắt đầu, ngày kết thúc
  - Hiển thị thông báo: MSG_004 "Tạo chiến dịch thành công"

**Bảng mô tả trường nhập liệu:**

| Tên trường | Field Name | Loại | Bắt buộc | Mặc định | Format/Giá trị | Rule nhập liệu |
|------------|------------|------|----------|----------|----------------|----------------|
| Nhà tài trợ | sponsor_id | Dropdown | Có | - | Danh sách Sponsors đang hoạt động | - |
| Tên chiến dịch | name | Text | Có | - | Tối đa 200 ký tự | - |
| Loại tile | tile_type | Dropdown | Có | - | job, course, product, banner | - |
| Kích thước | tile_size | Dropdown | Có | medium | small, medium, large | - |
| Tiêu đề | content.title | Text | Có | - | Tối đa 100 ký tự | - |
| Mô tả | content.description | Textarea | Không | - | Tối đa 300 ký tự | - |
| Hình ảnh | content.image | URL | Không | - | URL hợp lệ | - |
| Logo | content.logo | URL | Không | - | URL hợp lệ | - |
| CTA | content.cta | Text | Không | "Tìm hiểu thêm" | Tối đa 30 ký tự | - |
| URL đích | target_url | URL | Có | - | URL hợp lệ | - |
| Ngân sách | budget | Number | Có | - | >= 0 | Đơn vị: USD |
| Ngày bắt đầu | start_date | Date | Có | - | >= Ngày hiện tại | - |
| Ngày kết thúc | end_date | Date | Có | - | > Ngày bắt đầu | - |

---

#### AC-2.2 – Chuyển trạng thái Chiến dịch (Alternative Path)

- **Tại:** Màn hình "Chi tiết Chiến dịch"
- **Khi:** Admin thực hiện các thao tác chuyển trạng thái
- **Thì:**
  - Các chuyển đổi trạng thái hợp lệ:
    - DRAFT → PENDING: Submit để duyệt
    - DRAFT → CANCELLED: Hủy chiến dịch
    - PENDING → ACTIVE: Duyệt và ngày bắt đầu đã đến
    - PENDING → DRAFT: Từ chối, yêu cầu sửa
    - ACTIVE → PAUSED: Tạm dừng (hết ngân sách hoặc manual)
    - ACTIVE → COMPLETED: Ngày kết thúc đã đến
    - PAUSED → ACTIVE: Tiếp tục
    - PAUSED → CANCELLED: Hủy
  - Cập nhật trạng thái
  - Hiển thị thông báo: MSG_005 "Cập nhật trạng thái thành công"

**Inline Business Rule:**
- Chiến dịch ACTIVE sẽ tự động chuyển sang PAUSED khi ngân sách cạn kiệt.
- Chiến dịch ACTIVE sẽ tự động chuyển sang COMPLETED khi hết ngày kết thúc.

---

#### AC-2.3 – Hiển thị Sponsored Tile trên Website (Happy Path)

- **Tại:** Trang chủ KynguyenAI.vn (Bento Grid)
- **Khi:** Có chiến dịch đang ACTIVE, trong thời gian hiệu lực, còn ngân sách
- **Thì:**
  - Hiển thị Sponsored Tile với:
    - Badge "Tài trợ" ở góc phải trên
    - Logo nhà tài trợ (nếu có)
    - Hình ảnh (nếu có và kích thước không phải small)
    - Tiêu đề
    - Mô tả (nếu có và kích thước không phải small)
    - Nút CTA
  - Kích thước tile theo cấu hình (small, medium, large)

---

#### AC-2.4 – Tracking Impression (Lượt hiển thị) (Happy Path)

- **Tại:** Bento Grid trên trang chủ
- **Khi:** Sponsored Tile xuất hiện trong viewport của người dùng (>= 50% diện tích)
- **Thì:**
  - Ghi nhận impression với thông tin:
    - Campaign ID
    - Vị trí hiển thị (homepage, article, sidebar)
    - User Agent
    - IP Address
    - Session ID
    - Thời gian hiển thị
  - Không đếm trùng trong vòng 1 giờ cho cùng session

**Inline Business Rule:**
- Deduplicate impression: Chỉ đếm 1 lần/session/giờ

---

#### AC-2.5 – Tracking Click và Tính phí CPC (Happy Path)

- **Tại:** Endpoint `/api/sponsored/click/[id]`
- **Khi:** Người dùng click vào Sponsored Tile
- **Thì:**
  - Ghi nhận click với thông tin tương tự impression
  - Tính phí CPC và cộng vào "spent" của chiến dịch:
    - Small tile: $0.05/click
    - Medium tile: $0.10/click
    - Large tile: $0.20/click
  - Nếu spent >= budget → Tự động chuyển trạng thái sang PAUSED
  - Chuyển hướng đến URL đích

---

#### AC-2.6 – Chiến dịch hết ngân sách (Edge Case)

- **Tại:** Hệ thống tự động
- **Khi:** Số tiền đã chi (spent) >= Ngân sách (budget)
- **Thì:**
  - Tự động chuyển trạng thái sang PAUSED
  - Không hiển thị Sponsored Tile nữa
  - Ghi log sự kiện "CampaignBudgetDepleted"
  - (Tương lai) Gửi email thông báo cho Admin

---

#### AC-2.7 – Xem thống kê Chiến dịch (Happy Path)

- **Tại:** Màn hình "Chi tiết Chiến dịch"
- **Khi:** Admin xem chi tiết một chiến dịch
- **Thì:**
  - Hiển thị các chỉ số:
    - Tổng số impressions
    - Tổng số clicks
    - Tỷ lệ CTR (Click-through rate) = clicks / impressions × 100
    - Ngân sách còn lại = budget - spent
    - Chi phí trung bình mỗi click (CPC)
  - Biểu đồ impressions và clicks theo ngày

---

#### AC-2.8 – Chiến dịch chưa đến ngày bắt đầu (Edge Case)

- **Tại:** Bento Grid
- **Khi:** Chiến dịch ở trạng thái ACTIVE nhưng chưa đến ngày bắt đầu
- **Thì:**
  - Không hiển thị Sponsored Tile

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Impression | BR_SP_01 | Deduplicate 1 lần/session/giờ | Dùng IntersectionObserver |
| CPC Small | BR_SP_02 | $0.05/click | - |
| CPC Medium | BR_SP_03 | $0.10/click | - |
| CPC Large | BR_SP_04 | $0.20/click | - |
| Auto Pause | BR_SP_05 | Tự động PAUSE khi spent >= budget | - |
| Auto Complete | BR_SP_06 | Tự động COMPLETE khi hết end_date | - |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **nền tảng quảng cáo native (Sponsored Tiles)** giúp tạo nguồn thu bền vững từ các nhà tài trợ, dự kiến đóng góp khoảng 35% doanh thu.

Trọng số của story này là **P1 (Ưu tiên trung bình)**

Story được coi là thành công khi đảm bảo được:

- CTR trung bình >= 0.5%
- Impression tracking chính xác >= 99%
- Không có trường hợp quảng cáo hiển thị khi hết ngân sách
- Thời gian load Sponsored Tile <= 100ms

---

## ASSUMPTION

1. Website đã có Bento Grid layout sẵn sàng để tích hợp Sponsored Tile.
2. Quảng cáo tuân theo nguyên tắc Native Ads (hòa nhập với nội dung).
3. Không có popup hoặc video tự phát.
4. Tất cả nội dung tài trợ được đánh dấu rõ ràng với badge "Tài trợ".

---

## UI/UX Design

*{Capture màn hình của UI/UX đã được phê duyệt}*
