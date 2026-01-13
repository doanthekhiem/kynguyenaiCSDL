# US-PF-AUTH-001: Đăng nhập và Đăng ký Người dùng

## Nội dung

Là **Người dùng KynguyenAI.vn**
Tôi muốn **đăng nhập hoặc đăng ký tài khoản bằng nhiều phương thức khác nhau**
Tại **trang Đăng nhập trên KynguyenAI.vn**
Để **cá nhân hóa trải nghiệm, lưu bài viết yêu thích và theo dõi lịch sử đọc**

---

## Màn hình/Dialog liên quan

- **Màn hình chính:** Trang Đăng nhập (/auth/login)
- **Màn hình 2:** Trang Đăng ký (/auth/register)
- **Màn hình 3:** Trang Lỗi xác thực (/auth/error)
- **Màn hình 4:** Callback OAuth (/auth/callback)

---

## Acceptance Criteria

### NHÓM 1: Đăng nhập bằng Magic Link

#### AC-1.1 – Đăng nhập bằng Magic Link thành công (Happy Path)

- **Tại:** Màn hình "Đăng nhập"
- **Khi:** Người dùng nhập email hợp lệ và nhấn "Gửi link đăng nhập"
- **Thì:**
  - Hệ thống gửi email chứa link đăng nhập đến địa chỉ email
  - Hiển thị thông báo: MSG_AUTH_001 "Vui lòng kiểm tra email để lấy link đăng nhập"
  - Link đăng nhập có hiệu lực trong 24 giờ
  - Khi click vào link:
    - Tạo session và JWT token
    - Tạo hoặc cập nhật User Profile
    - Chuyển hướng về trang chủ hoặc trang trước đó

**Bảng mô tả trường nhập liệu:**

| Tên trường | Field Name | Loại | Bắt buộc | Mặc định | Format/Giá trị | Rule nhập liệu |
|------------|------------|------|----------|----------|----------------|----------------|
| Email | email | Email | Có | - | Email hợp lệ | - |

---

#### AC-1.2 – Magic Link hết hạn (Error Case)

- **Tại:** Click vào Magic Link từ email
- **Khi:** Link đã hết hạn (> 24 giờ) hoặc đã được sử dụng
- **Thì:**
  - Chuyển hướng đến trang /auth/error
  - Hiển thị thông báo: ERR_AUTH_001 "Link đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu link mới."
  - Hiển thị nút "Yêu cầu link mới" để quay lại trang đăng nhập

---

### NHÓM 2: Đăng nhập bằng OAuth

#### AC-2.1 – Đăng nhập bằng Google OAuth thành công (Happy Path)

- **Tại:** Màn hình "Đăng nhập"
- **Khi:** Người dùng nhấn "Đăng nhập với Google"
- **Thì:**
  - Chuyển hướng đến trang đăng nhập Google
  - Sau khi xác thực thành công trên Google:
    - Callback về /auth/callback
    - Tạo session và JWT token
    - Tạo hoặc cập nhật User Profile với thông tin từ Google:
      - Email
      - Tên hiển thị
      - Ảnh đại diện
    - Cập nhật thời gian đăng nhập cuối
    - Chuyển hướng về trang chủ

---

#### AC-2.2 – Đăng nhập bằng GitHub OAuth thành công (Happy Path)

- **Tại:** Màn hình "Đăng nhập"
- **Khi:** Người dùng nhấn "Đăng nhập với GitHub"
- **Thì:**
  - Chuyển hướng đến trang đăng nhập GitHub
  - Yêu cầu quyền: read:user, user:email
  - Sau khi xác thực thành công:
    - Xử lý tương tự như Google OAuth
    - Lấy email từ GitHub (có thể là email riêng tư)

---

#### AC-2.3 – Người dùng từ chối cấp quyền OAuth (Error Case)

- **Tại:** Trang OAuth của Google/GitHub
- **Khi:** Người dùng từ chối cấp quyền hoặc hủy đăng nhập
- **Thì:**
  - Callback về /auth/callback với mã lỗi
  - Chuyển hướng đến /auth/error
  - Hiển thị thông báo: ERR_AUTH_002 "Đăng nhập bị hủy. Vui lòng thử lại."

---

### NHÓM 3: Đăng nhập bằng Email/Password

#### AC-3.1 – Đăng nhập bằng Email/Password thành công (Happy Path)

- **Tại:** Màn hình "Đăng nhập" (tab Email/Password)
- **Khi:** Người dùng nhập email và mật khẩu đúng, nhấn "Đăng nhập"
- **Thì:**
  - Xác thực thông tin đăng nhập
  - Tạo session và JWT token
  - Cập nhật thời gian đăng nhập cuối
  - Chuyển hướng về trang chủ

**Bảng mô tả trường nhập liệu:**

| Tên trường | Field Name | Loại | Bắt buộc | Mặc định | Format/Giá trị | Rule nhập liệu |
|------------|------------|------|----------|----------|----------------|----------------|
| Email | email | Email | Có | - | Email hợp lệ | - |
| Mật khẩu | password | Password | Có | - | Tối thiểu 6 ký tự | - |

---

#### AC-3.2 – Đăng nhập với thông tin sai (Error Case)

- **Tại:** Màn hình "Đăng nhập"
- **Khi:** Người dùng nhập email hoặc mật khẩu không đúng
- **Thì:**
  - Hiển thị lỗi: ERR_AUTH_003 "Email hoặc mật khẩu không đúng"
  - Không tiết lộ email có tồn tại hay không (bảo mật)

---

### NHÓM 4: Đăng ký Tài khoản mới

#### AC-4.1 – Đăng ký bằng Email/Password thành công (Happy Path)

- **Tại:** Màn hình "Đăng ký"
- **Khi:** Người dùng nhập thông tin hợp lệ và nhấn "Đăng ký"
- **Thì:**
  - Tạo tài khoản mới trên Supabase Auth
  - Gửi email xác nhận đến địa chỉ email
  - Hiển thị thông báo: MSG_AUTH_002 "Vui lòng kiểm tra email để xác nhận tài khoản"
  - Sau khi xác nhận email:
    - Tạo User Profile
    - Cho phép đăng nhập

**Bảng mô tả trường nhập liệu:**

| Tên trường | Field Name | Loại | Bắt buộc | Mặc định | Format/Giá trị | Rule nhập liệu |
|------------|------------|------|----------|----------|----------------|----------------|
| Email | email | Email | Có | - | Email hợp lệ | Chưa tồn tại trong hệ thống |
| Mật khẩu | password | Password | Có | - | Tối thiểu 8 ký tự, có chữ hoa, chữ thường, số | - |
| Tên hiển thị | display_name | Text | Không | - | Tối đa 100 ký tự | - |

---

#### AC-4.2 – Đăng ký với email đã tồn tại (Error Case)

- **Tại:** Màn hình "Đăng ký"
- **Khi:** Người dùng nhập email đã có trong hệ thống
- **Thì:**
  - Hiển thị lỗi: ERR_AUTH_004 "Email này đã được sử dụng. Vui lòng đăng nhập hoặc sử dụng email khác."

---

### NHÓM 5: Đăng xuất

#### AC-5.1 – Đăng xuất thành công (Happy Path)

- **Tại:** User Menu (dropdown)
- **Khi:** Người dùng nhấn "Đăng xuất"
- **Thì:**
  - Xóa session và token
  - Xóa cookies liên quan đến xác thực
  - Chuyển hướng về trang chủ
  - User Menu hiển thị nút "Đăng nhập" thay vì thông tin người dùng

---

### NHÓM 6: Protected Routes

#### AC-6.1 – Truy cập trang yêu cầu đăng nhập khi chưa đăng nhập (Error Case)

- **Tại:** Các trang: /dashboard, /bookmarks, /settings
- **Khi:** Người dùng chưa đăng nhập cố truy cập các trang này
- **Thì:**
  - Chuyển hướng đến /auth/login
  - Lưu URL hiện tại vào query param `next`
  - Sau khi đăng nhập thành công, chuyển về URL ban đầu

---

#### AC-6.2 – Truy cập trang Admin khi không có quyền (Error Case)

- **Tại:** Các trang: /admin/*
- **Khi:** Người dùng đã đăng nhập nhưng không có role "admin"
- **Thì:**
  - Chuyển hướng về trang chủ
  - Không hiển thị thông báo lỗi (tránh tiết lộ sự tồn tại của trang admin)

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Magic Link | BR_AUTH_01 | Hiệu lực 24 giờ, chỉ dùng được 1 lần | - |
| Session | BR_AUTH_02 | Hết hạn sau 7 ngày không hoạt động | - |
| Session Refresh | BR_AUTH_03 | Tự động refresh nếu còn < 1 ngày | - |
| Password | BR_AUTH_04 | Tối thiểu 8 ký tự, có chữ hoa, thường, số | Cho đăng ký mới |
| Rate Limit Login | BR_AUTH_05 | Tối đa 5 lần thử/15 phút | - |
| Rate Limit Signup | BR_AUTH_06 | Tối đa 3 lần đăng ký/giờ | - |
| Rate Limit Magic Link | BR_AUTH_07 | Tối đa 5 lần gửi/15 phút | - |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **hệ thống xác thực người dùng** cho phép cá nhân hóa trải nghiệm, là nền tảng cho các tính năng bookmark, lịch sử đọc và gói premium trong tương lai.

Trọng số của story này là **P1 (Tùy chọn cho MVP)**

Story được coi là thành công khi đảm bảo được:

- Tỷ lệ đăng nhập thành công >= 99%
- Thời gian xác thực OAuth <= 3 giây
- Email Magic Link gửi trong < 10 giây
- Không có lỗ hổng bảo mật liên quan đến xác thực

---

## ASSUMPTION

1. Website vẫn hoạt động đầy đủ cho người dùng ẩn danh (anonymous users).
2. Xác thực là tính năng tùy chọn, chỉ bắt buộc cho một số tính năng nâng cao.
3. Supabase Auth đã được cấu hình với Google và GitHub OAuth.
4. Email template Magic Link đã được tùy chỉnh theo branding KynguyenAI.

---

## UI/UX Design

*{Capture màn hình của UI/UX đã được phê duyệt}*

---

# US-PF-AUTH-002: Quản lý Hồ sơ và Tùy chọn Người dùng

## Nội dung

Là **Người dùng đã đăng nhập trên KynguyenAI.vn**
Tôi muốn **xem và cập nhật thông tin hồ sơ cá nhân, quản lý tùy chọn cài đặt**
Tại **trang Cài đặt (/settings) trên KynguyenAI.vn**
Để **tùy chỉnh trải nghiệm theo sở thích cá nhân**

---

## Màn hình/Dialog liên quan

- **Màn hình chính:** Trang Cài đặt (/settings)
- **Dialog 1:** Xác nhận xóa tài khoản

---

## Acceptance Criteria

### NHÓM 1: Xem và Cập nhật Hồ sơ

#### AC-1.1 – Xem thông tin hồ sơ (Happy Path)

- **Tại:** Màn hình "Cài đặt"
- **Khi:** Người dùng đã đăng nhập truy cập trang cài đặt
- **Thì:**
  - Hiển thị các thông tin:
    - Ảnh đại diện
    - Tên hiển thị
    - Email (không cho sửa)
    - Giới thiệu ngắn (bio)
    - Ngày tạo tài khoản
    - Lần đăng nhập cuối

---

#### AC-1.2 – Cập nhật thông tin hồ sơ (Happy Path)

- **Tại:** Màn hình "Cài đặt"
- **Khi:** Người dùng chỉnh sửa thông tin và nhấn "Lưu thay đổi"
- **Thì:**
  - Cập nhật các thông tin cho phép sửa:
    - Tên hiển thị
    - Giới thiệu ngắn
    - Ảnh đại diện (URL)
  - Hiển thị thông báo: MSG_PROFILE_001 "Cập nhật hồ sơ thành công"

**Bảng mô tả trường nhập liệu:**

| Tên trường | Field Name | Loại | Bắt buộc | Mặc định | Format/Giá trị | Rule nhập liệu |
|------------|------------|------|----------|----------|----------------|----------------|
| Tên hiển thị | display_name | Text | Không | - | Tối đa 100 ký tự | - |
| Giới thiệu | bio | Textarea | Không | - | Tối đa 500 ký tự | - |
| Ảnh đại diện | avatar_url | URL | Không | - | URL hợp lệ, ảnh | - |

---

### NHÓM 2: Quản lý Tùy chọn

#### AC-2.1 – Lưu tùy chọn người dùng (Happy Path)

- **Tại:** Màn hình "Cài đặt" → Tab "Tùy chọn"
- **Khi:** Người dùng thay đổi các tùy chọn
- **Thì:**
  - Lưu tùy chọn vào hệ thống:
    - Danh mục yêu thích
    - Chế độ hiển thị (sáng/tối)
    - Ngôn ngữ ưu tiên
  - Tự động lưu khi thay đổi (auto-save)
  - Hiển thị thông báo nhỏ: "Đã lưu"

---

### NHÓM 3: Xóa Tài khoản

#### AC-3.1 – Xóa tài khoản (Alternative Path)

- **Tại:** Màn hình "Cài đặt" → Khu vực "Vùng nguy hiểm"
- **Khi:** Người dùng nhấn "Xóa tài khoản"
- **Thì:**
  - Hiển thị dialog xác nhận với:
    - Cảnh báo: "Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn."
    - Yêu cầu nhập lại email để xác nhận
  - Khi xác nhận đúng email:
    - Xóa User Profile và tất cả dữ liệu liên quan (bookmarks, lịch sử đọc, tùy chọn)
    - Đăng xuất người dùng
    - Chuyển hướng về trang chủ
    - Hiển thị thông báo: MSG_PROFILE_002 "Tài khoản đã được xóa"

---

## Business Value & Success Metrics

Story này sẽ cung cấp **khả năng quản lý hồ sơ** cho người dùng, tăng sự gắn kết và cá nhân hóa.

Trọng số của story này là **P2 (Ưu tiên thấp)**

Story được coi là thành công khi đảm bảo được:

- Người dùng có thể cập nhật hồ sơ trong < 5 giây
- Tùy chọn được lưu tự động và đồng bộ giữa các thiết bị

---

## ASSUMPTION

1. Row Level Security (RLS) đã được cấu hình để người dùng chỉ truy cập được dữ liệu của mình.
2. Xóa tài khoản sẽ cascade xóa tất cả dữ liệu liên quan.

---

## UI/UX Design

*{Capture màn hình của UI/UX đã được phê duyệt}*

---

# US-PF-AUTH-003: Quản lý Bookmarks và Lịch sử Đọc

## Nội dung

Là **Người dùng đã đăng nhập trên KynguyenAI.vn**
Tôi muốn **lưu bài viết yêu thích và xem lại lịch sử đọc**
Tại **trang Bài đã lưu (/bookmarks) và các trang bài viết**
Để **dễ dàng quay lại đọc những bài viết quan trọng**

---

## Màn hình/Dialog liên quan

- **Màn hình chính:** Trang Bài đã lưu (/bookmarks)
- **Component:** Nút Bookmark trên mỗi bài viết

---

## Acceptance Criteria

### NHÓM 1: Bookmark Bài viết

#### AC-1.1 – Bookmark bài viết (Happy Path)

- **Tại:** Trang chi tiết bài viết hoặc card bài viết trên Bento Grid
- **Khi:** Người dùng đã đăng nhập nhấn nút Bookmark (icon bookmark)
- **Thì:**
  - Lưu bài viết vào danh sách bookmark của người dùng
  - Đổi icon sang trạng thái "đã lưu" (filled)
  - Hiển thị thông báo nhỏ: "Đã lưu bài viết"

---

#### AC-1.2 – Bỏ Bookmark bài viết (Alternative Path)

- **Tại:** Trang chi tiết bài viết hoặc card bài viết
- **Khi:** Người dùng nhấn nút Bookmark trên bài đã được lưu
- **Thì:**
  - Xóa bài viết khỏi danh sách bookmark
  - Đổi icon sang trạng thái "chưa lưu" (outline)
  - Hiển thị thông báo nhỏ: "Đã bỏ lưu"

---

#### AC-1.3 – Bookmark khi chưa đăng nhập (Edge Case)

- **Tại:** Trang chi tiết bài viết hoặc card bài viết
- **Khi:** Người dùng chưa đăng nhập nhấn nút Bookmark
- **Thì:**
  - Hiển thị dialog/tooltip: "Vui lòng đăng nhập để lưu bài viết"
  - Có link/nút dẫn đến trang đăng nhập

---

### NHÓM 2: Xem Danh sách Bookmarks

#### AC-2.1 – Xem danh sách bài đã lưu (Happy Path)

- **Tại:** Màn hình "Bài đã lưu" (/bookmarks)
- **Khi:** Người dùng đã đăng nhập truy cập trang
- **Thì:**
  - Hiển thị danh sách bài viết đã bookmark:
    - Hình thu nhỏ
    - Tiêu đề (tiếng Việt)
    - Tóm tắt
    - Danh mục
    - Ngày lưu
  - Sắp xếp theo ngày lưu (mới nhất trước)
  - Phân trang: 20 bài/trang

---

#### AC-2.2 – Danh sách bookmark trống (Edge Case)

- **Tại:** Màn hình "Bài đã lưu"
- **Khi:** Người dùng chưa bookmark bài nào
- **Thì:**
  - Hiển thị thông báo: "Bạn chưa lưu bài viết nào"
  - Hiển thị gợi ý: "Nhấn biểu tượng bookmark trên các bài viết để lưu lại"
  - Nút "Khám phá bài viết" dẫn về trang chủ

---

### NHÓM 3: Lịch sử Đọc

#### AC-3.1 – Ghi nhận lịch sử đọc (Happy Path)

- **Tại:** Trang chi tiết bài viết
- **Khi:** Người dùng đã đăng nhập đọc bài viết
- **Thì:**
  - Ghi nhận vào lịch sử đọc:
    - ID bài viết
    - Phần trăm đã đọc (dựa trên scroll)
    - Thời gian đọc (giây)
    - Thời điểm đọc
  - Cập nhật nếu đã có trong lịch sử (không tạo bản ghi trùng)

---

#### AC-3.2 – Xem lịch sử đọc (Alternative Path)

- **Tại:** Màn hình "Lịch sử đọc" (/history)
- **Khi:** Người dùng truy cập trang lịch sử
- **Thì:**
  - Hiển thị danh sách bài đã đọc:
    - Thông tin bài viết
    - Phần trăm đã đọc
    - Thời điểm đọc
  - Sắp xếp theo thời điểm đọc (gần nhất trước)
  - Cho phép xóa từng bài hoặc xóa tất cả lịch sử

---

#### AC-3.3 – Xóa lịch sử đọc (Alternative Path)

- **Tại:** Màn hình "Lịch sử đọc"
- **Khi:** Người dùng nhấn "Xóa tất cả lịch sử"
- **Thì:**
  - Hiển thị dialog xác nhận
  - Khi xác nhận: Xóa toàn bộ lịch sử đọc
  - Hiển thị thông báo: MSG_HISTORY_001 "Đã xóa lịch sử đọc"

---

## Business Value & Success Metrics

Story này sẽ cung cấp **tính năng bookmark và lịch sử đọc**, giúp người dùng quản lý nội dung quan tâm và tăng engagement.

Trọng số của story này là **P1 (Ưu tiên trung bình)**

Story được coi là thành công khi đảm bảo được:

- Thời gian toggle bookmark <= 500ms
- Tỷ lệ người dùng đăng nhập sử dụng bookmark >= 30%

---

## ASSUMPTION

1. Tracking tiến độ đọc dựa trên scroll position.
2. Mỗi người dùng chỉ có 1 bản ghi lịch sử đọc cho mỗi bài viết (upsert).

---

## UI/UX Design

*{Capture màn hình của UI/UX đã được phê duyệt}*
