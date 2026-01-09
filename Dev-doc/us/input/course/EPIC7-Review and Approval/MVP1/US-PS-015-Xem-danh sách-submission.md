# US-PS-015 - Xem danh sách khóa học chờ duyệt

## User story Title
US-PS-015 - Xem danh sách khóa học chờ duyệt-COURSE_REVIEW_LIST (View Course Review List)

Là một **Quản trị viên nhà trường-SCHOOL_ADMIN của trường tư-SOCIAL_SCHOOL**

Tôi muốn thực hiện **xem danh sách các khóa học đã được Giảng viên chủ trì submit chờ duyệt** tại **trang Danh sách duyệt khóa học của sản phẩm LMS**

Để **quản lý và theo dõi tiến độ review nội dung khóa học, đảm bảo tất cả khóa học được xem xét kịp thời**

---

## Acceptance criteria

### AC-1: Happy Path - Xem danh sách khóa học chờ duyệt
- **Tại** trang "Danh sách duyệt khóa học"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN truy cập trang danh sách
- **Thì** hệ thống hiển thị danh sách tất cả khóa học có trạng thái **Sẵn sàng duyệt-READY_FOR_REVIEW** với thông tin: 
  + mã khóa học-COURSE_CODE, 
  + tên khóa học-COURSE_TITLE, 
  + tên Giảng viên chủ trì, 
  + ngày submit, 
  + số chương-Section, 
  + số bài học-Lecture, 
  + trạng thái submission (Đã submit-SUBMITTED / Đang được review-UNDER_REVIEW / Cần chỉnh sửa-NEED_REVISION)

### AC-2: Hiển thị chi tiết cấu trúc khóa học
- **Tại** trang "Danh sách duyệt khóa học", dòng khóa học
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn vào chi tiết 1 khóa học
- **Thì** hệ thống điều hướng tới màn hình Review nội dung khóa học: danh sách các Chương-Section, mỗi chương hiển thị danh sách Bài học-Lecture (tên bài, loại bài: Video/Bài giảng/Bài kiểm tra/Bài trắc nghiệm)

### AC-3: Filter khóa học theo trạng thái submission
- **Tại** trang "Danh sách duyệt khóa học"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN chọn filter trạng thái: **Đã submit-SUBMITTED** / **Đang được review-UNDER_REVIEW** / **Cần chỉnh sửa-NEED_REVISION**
- **Thì** hệ thống chỉ hiển thị các khóa học có trạng thái submission được chọn, cập nhật số lượng hiển thị

### AC-4: Search khóa học
- **Tại** trang "Danh sách duyệt khóa học"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhập từ khóa vào ô search (mã khóa học, tên khóa học, hoặc tên Giảng viên chủ trì)
- **Thì** hệ thống hiển thị kết quả tìm kiếm real-time, highlight từ khóa tìm được, hiển thị số kết quả tìm thấy

### AC-5: Hiển thị thống kê tổng quan
- **Tại** trang "Danh sách duyệt khóa học"
- **Khi** trang được tải
- **Thì** hệ thống hiển thị section "Tổng quan" ở đầu trang với: tổng số khóa học chờ duyệt, số khóa học đang chờ review-SUBMITTED (badge màu cam), số khóa học đang được review-UNDER_REVIEW (badge màu xanh dương), số khóa học cần chỉnh sửa-NEED_REVISION (badge màu vàng)

### AC-6: Sắp xếp danh sách khóa học
- **Tại** trang "Danh sách duyệt khóa học"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN chọn sắp xếp theo: Thời gian submit (mới nhất/cũ nhất), Tên khóa học (a->z)
- **Thì** hệ thống sắp xếp lại danh sách khóa học theo tiêu chí đã chọn, hiển thị icon mũi tên chỉ hướng sắp xếp (ascending/descending)

### AC-7: Quick action từ danh sách
- **Tại** trang "Danh sách duyệt khóa học", dòng khóa học
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn nút "Xem chi tiết" hoặc "Review" trên khóa học
- **Thì** hệ thống chuyển đến trang review nội dung khóa học (US-PS-016), giữ nguyên context để quay lại danh sách

### AC-8: Hiển thị khóa học cần ưu tiên xem xét
- **Tại** trang "Danh sách duyệt khóa học"
- **Khi** có khóa học đã submit quá 3 ngày chưa được review (trạng thái SUBMITTED)
- **Thì** hệ thống hiển thị badge "Cần xem xét khẩn cấp" màu đỏ bên cạnh khóa học, sắp xếp khóa học ưu tiên lên đầu danh sách khi filter "Đã submit"

<!--### AC-9: Refresh data
- **Tại** trang "Danh sách duyệt khóa học"
- **Khi** có khóa học mới được submit hoặc trạng thái khóa học thay đổi
- **Thì** hệ thống tự động cập nhật danh sách sau 30 giây hoặc hiển thị notification "Có cập nhật mới. Click để refresh", cho phép Quản trị viên refresh thủ công bằng nút "Refresh" -->

### AC-10: Xử lý trường hợp không có khóa học chờ duyệt
- **Tại** trang "Danh sách duyệt khóa học"
- **Khi** không có khóa học nào ở trạng thái **Sẵn sàng duyệt-READY_FOR_REVIEW**
- **Thì** hệ thống hiển thị empty state với icon và message "Chưa có khóa học nào cần duyệt. Các Giảng viên chủ trì đang xây dựng nội dung."

### AC-11: Xử lý lỗi kết nối khi tải danh sách
- **Tại** trang "Danh sách duyệt khóa học"
- **Khi** kết nối cơ sở dữ liệu bị lỗi hoặc service không khả dụng
- **Thì** hệ thống hiển thị thông báo lỗi "Không thể tải danh sách. Vui lòng thử lại sau", hiển thị nút "Thử lại", ghi nhận lỗi DB-CONN-004

### AC-12: Kiểm tra phân quyền - Chỉ School Admin
- **Tại** URL /courses/review-list
- **Khi** người dùng không phải Quản trị viên nhà trường-SCHOOL_ADMIN cố gắng truy cập
- **Thì** hệ thống chuyển hướng về trang 403 Không có quyền truy cập với thông báo "Bạn không có quyền xem danh sách duyệt khóa học", ghi nhận lại nỗ lực truy cập trái phép

---

## Inline business rule

| Trường thông tin        | Mã BR     | Business rule                                                    | Ghi chú                                |
|-------------------------|-----------|------------------------------------------------------------------|----------------------------------------|
| Trạng thái khóa học     | BR-PS-093 | Chỉ hiển thị khóa học khi status = READY_FOR_REVIEW              | Khóa học đã được submit để duyệt       |
| Danh sách khóa học      | BR-PS-094 | Hiển thị tất cả khóa học chờ duyệt thuộc trường tư của School Admin | Theo phạm vi quản lý                   |
| Filter trạng thái       | BR-PS-095 | Filter theo: SUBMITTED, UNDER_REVIEW, NEED_REVISION              | 3 trạng thái submission                |
| Search                  | BR-PS-096 | Search theo mã khóa học, tên khóa học, tên Giảng viên chủ trì (case-insensitive) | Tìm kiếm linh hoạt          |
| Sắp xếp                 | BR-PS-097 | Hỗ trợ sắp xếp: submitted_at, course_title    | Nhiều tiêu chí                         |
| Priority courses        | BR-PS-098 | Khóa học submit > 3 ngày và submission_status = SUBMITTED được đánh dấu priority | Cảnh báo khẩn cấp           |
---

## System rule
- Danh sách chỉ hiển thị khóa học thuộc trường tư của School Admin (tenant isolation)
- Số liệu thống kê được tính real-time từ database
- Priority badge hiển thị khi: submitted_at < (current_time - 3 days) AND submission_status = SUBMITTED
- Auto-refresh sử dụng polling mechanism với interval 30s
- Cache data trong 10 giây để giảm tải database
- 1 khóa học = 1 Giảng viên chủ trì-LEAD_INSTRUCTOR xây dựng toàn bộ nội dung

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho School Admin theo dõi danh sách khóa học chờ duyệt từ các Giảng viên chủ trì, xác định khóa học cần ưu tiên xem xét, đảm bảo quy trình review diễn ra trơn tru và đúng hạn**

Trọng số của story này là **5**

Story được coi là thành công khi nó đảm bảo được:
- Admin có thể xem danh sách khóa học chờ duyệt trong vòng 2 giây (page load time)
- 100% khóa học chờ duyệt được hiển thị đầy đủ với trạng thái chính xác
- Filter và search hoạt động chính xác 100%
- Khóa học cần ưu tiên được highlight đúng 100% (submit > 3 ngày)
- Auto-refresh hoạt động mượt mà không làm gián đoạn trải nghiệm
- Trung bình Admin review khóa học trong vòng 3 ngày sau khi submit

---

## Dependencies
- **lf-course service**: Lấy danh sách khóa học, thông tin Giảng viên chủ trì, cấu trúc chương/bài học
- **US-PS-003**: Giảng viên chủ trì đã được mời và chấp nhận lời mời xây dựng khóa học
- **US-PS-011 (Giảng viên submit khóa học)**: Phải có khóa học đã submit để hiển thị trên danh sách

---

## Impact Analysis

- **Business Process**:
  - Admin có visibility đầy đủ về các khóa học chờ duyệt
  - Giảm thời gian phản hồi cho Giảng viên chủ trì
  - Khóa học ưu tiên được xử lý trước
  - Tăng hiệu quả quy trình review

- **User Experience**:
  - Danh sách trực quan, dễ sử dụng
  - Expand để xem chi tiết cấu trúc khóa học
  - Filter và search mạnh mẽ
  - Real-time updates giữ data luôn mới

- **Performance**:
  - Cache 10 giây giảm tải database
  - Lazy loading khi expand khóa học
  - Pagination nếu > 50 khóa học

---

## UI/UX Design

### Danh sách khóa học chờ duyệt - Overview
```
┌─────────────────────────────────────────────────────────────────┐
│ Danh sách duyệt khóa học                       [🔄 Refresh]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📊 Tổng quan                                                   │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐ │
│  │ Tổng số      │ Chờ review   │ Đang review  │ Cần sửa      │ │
│  │ khóa học     │              │              │              │ │
│  │     12       │      5 🟠    │      3 🔵    │      4 🟡    │ │
│  └──────────────┴──────────────┴──────────────┴──────────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Filter: [Tất cả ▼] | Search: [____________] 🔍                │
│                                                                 │
│  Sort by: [Thời gian submit ▼] [↓ Mới nhất]                    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ ▼ [📚] PRIV-20251210-001 | Toán nâng cao                   │ │
│  │    GV chủ trì: Nguyễn Văn A | Submit: 10/12/2025          │ │
│  │    Chương: 5 | Bài học: 20 | ⚠️ Cần xem xét khẩn cấp       │ │
│  │    Trạng thái: 🟠 Đã nộp chờ review-SUBMITTED              │ │
│  │    [Xem chi tiết] [Review]                                 │ │
│  │                                                             │ │
│  │    ┌─────────────────────────────────────────────────────┐ │ │
│  │    │ Chương 1: Giới thiệu (4 bài)                        │ │ │
│  │    │   • Bài 1.1: Tổng quan (Video)                      │ │ │
│  │    │   • Bài 1.2: Lý thuyết cơ bản (Bài giảng)           │ │ │
│  │    │   • Bài 1.3: Bài tập (Bài kiểm tra)                 │ │ │
│  │    │   • Bài 1.4: Trắc nghiệm (Bài trắc nghiệm)          │ │ │
│  │    ├─────────────────────────────────────────────────────┤ │ │
│  │    │ Chương 2: Phép tính (5 bài)                         │ │ │
│  │    │   ...                                                │ │ │
│  │    └─────────────────────────────────────────────────────┘ │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ ▶ [📚] PRIV-20251212-002 | Tiếng Anh giao tiếp            │ │
│  │    GV chủ trì: Trần Thị B | Submit: 12/12/2025            │ │
│  │    Chương: 8 | Bài học: 32                                │ │
│  │    Trạng thái: 🔵 Đang được review-UNDER_REVIEW           │ │
│  │    [Xem chi tiết] [Tiếp tục Review]                       │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ ▶ [📚] PRIV-20251208-003 | Lập trình Python               │ │
│  │    GV chủ trì: Lê Văn C | Submit: 08/12/2025              │ │
│  │    Chương: 10 | Bài học: 45                               │ │
│  │    Trạng thái: 🟡 Cần chỉnh sửa-NEED_REVISION             │ │
│  │    [Xem chi tiết] [Xem phản hồi]                          │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Showing 3 of 12 khóa học | [1] [2] [3] [>]                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        📋                                       │
│                                                                 │
│          Chưa có khóa học nào cần duyệt                         │
│                                                                 │
│  Các Giảng viên chủ trì đang xây dựng nội dung.                 │
│  Bạn sẽ nhận thông báo khi có khóa học mới được submit.         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**UI Behaviors**:
- Expand/collapse khóa học bằng click vào header để xem cấu trúc chương/bài học
- Badge màu: 🟠 SUBMITTED (Đã nộp chờ review), 🔵 UNDER_REVIEW (Đang được review), 🟡 NEED_REVISION (Cần chỉnh sửa)
- Priority badge ⚠️ hiển thị nếu submit > 3 ngày và chưa được review
- Real-time notification ở góc phải khi có update mới
- Smooth animation khi filter/sort

---

## Out of Scope Item

### Business Operations:
- **Batch approve**: Approve nhiều khóa học cùng lúc (có thể làm sau)
- **Export danh sách to Excel/PDF**: Export báo cáo chi tiết (có thể làm sau)
- **Email digest**: Gửi email tổng hợp khóa học chờ review hàng ngày (automation - out of scope)

### Technical:
- **Advanced analytics**: Thống kê chi tiết thời gian review trung bình, trends (analytics feature)
- **Notification system**: Push notification real-time khi có khóa học mới submit (có thể làm sau)
- **Assignment system**: Assign khóa học cho specific reviewers (phức tạp - out of scope)

### Features:
- **Compare versions**: So sánh phiên bản khóa học cũ và mới khi Giảng viên chủ trì resubmit (version control - out of scope)
- **Collaborative review**: Nhiều admins review cùng khóa học với comments (collaboration feature - out of scope)
- **Review templates**: Admin tạo review checklist templates (template system - out of scope)
