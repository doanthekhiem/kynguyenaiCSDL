# US-PS-015 - Xem dashboard submission

## User story Title
US-PS-015 - Xem dashboard submission (View Submission Dashboard)

Là một **School Admin của trường tư**
Tôi muốn thực hiện **xem tổng quan tất cả submissions của các giảng viên** tại **trang Content Review Dashboard của sản phẩm LMS**
Để **quản lý và theo dõi tiến độ review nội dung, đảm bảo tất cả submissions được xem xét kịp thời**

---

## Acceptance criteria

### AC-1: Happy Path - Xem dashboard submission với dữ liệu đầy đủ
- **Tại** trang "Content Review Dashboard" với khóa học ở trạng thái **Đang xây dựng nội dung** hoặc **Sẵn sàng review**
- **Khi** Quản trị viên nhà trường truy cập trang dashboard
- **Thì** hệ thống hiển thị danh sách tất cả submissions grouped by instructor với thông tin: tên giảng viên, vai trò, số lượng submissions theo trạng thái (Đã nộp chờ review, Đang được review, Đã duyệt, Cần chỉnh sửa), tổng số submissions, tiến độ hoàn thành (%), cho phép expand/collapse từng instructor để xem chi tiết submissions

### AC-2: Hiển thị submissions grouped by section
- **Tại** trang "Content Review Dashboard"
- **Khi** Quản trị viên chọn tab "Group by Section"
- **Thì** hệ thống hiển thị danh sách tất cả sections của khóa học với thông tin: tên section, số lượng lectures, số submissions theo trạng thái, tiến độ review (%), cho phép expand section để xem chi tiết lectures và submissions

### AC-3: Filter submissions theo trạng thái
- **Tại** trang "Content Review Dashboard"
- **Khi** Quản trị viên chọn filter trạng thái: **Đã nộp chờ review** / **Đang được review** / **Đã duyệt** / **Cần chỉnh sửa**
- **Thì** hệ thống chỉ hiển thị submissions có trạng thái được chọn, cập nhật số lượng hiển thị, giữ nguyên grouping (by instructor hoặc by section)

### AC-4: Search submissions theo tên lecture hoặc instructor
- **Tại** trang "Content Review Dashboard"
- **Khi** Quản trị viên nhập từ khóa vào ô search (tên lecture hoặc tên instructor)
- **Thì** hệ thống hiển thị kết quả tìm kiếm real-time, highlight từ khóa tìm được, hiển thị số kết quả tìm thấy

### AC-5: Hiển thị thống kê tổng quan
- **Tại** trang "Content Review Dashboard"
- **Khi** trang được tải
- **Thì** hệ thống hiển thị section "Tổng quan" ở đầu trang với: tổng số submissions, số submissions đang chờ review (badge màu cam), số submissions cần chỉnh sửa (badge màu vàng), số submissions đã duyệt (badge màu xanh), tiến độ review tổng thể (progress bar), số giảng viên đang tham gia

### AC-6: Sắp xếp submissions
- **Tại** trang "Content Review Dashboard"
- **Khi** Quản trị viên chọn sắp xếp theo: Thời gian submit (mới nhất/cũ nhất), Trạng thái, Tên instructor, Tên lecture
- **Thì** hệ thống sắp xếp lại danh sách submissions theo tiêu chí đã chọn, hiển thị icon mũi tên chỉ hướng sắp xếp (ascending/descending)

### AC-7: Quick action từ dashboard
- **Tại** trang "Content Review Dashboard", dòng submission
- **Khi** Quản trị viên nhấn nút "Preview" hoặc "Review" trên submission
- **Thì** hệ thống chuyển đến trang preview submission (US-PS-016) hoặc trang review nội dung, giữ nguyên context để quay lại dashboard

### AC-8: Hiển thị priority submissions
- **Tại** trang "Content Review Dashboard"
- **Khi** có submissions đã submit quá 3 ngày chưa được review
- **Thì** hệ thống hiển thị badge "Cần xem xét khẩn cấp" màu đỏ bên cạnh submission, sắp xếp priority submissions lên đầu danh sách khi filter "Đang chờ review"

### AC-9: Refresh data real-time
- **Tại** trang "Content Review Dashboard"
- **Khi** có submission mới được submit hoặc trạng thái submission thay đổi (do instructor hoặc admin khác)
- **Thì** hệ thống tự động cập nhật dashboard sau 30 giây hoặc hiển thị notification "Có cập nhật mới. Click để refresh", cho phép Quản trị viên refresh thủ công bằng nút "Refresh"

### AC-10: Xử lý trường hợp không có submissions
- **Tại** trang "Content Review Dashboard"
- **Khi** khóa học chưa có submission nào
- **Thì** hệ thống hiển thị empty state với icon và message "Chưa có submission nào. Giảng viên đang xây dựng nội dung.", hiển thị danh sách giảng viên đã được mời và vai trò, gợi ý "Theo dõi tiến độ tại tab Quản lý giảng viên"

### AC-11: Xử lý lỗi kết nối khi tải dashboard
- **Tại** trang "Content Review Dashboard"
- **Khi** kết nối cơ sở dữ liệu bị lỗi hoặc service không khả dụng
- **Thì** hệ thống hiển thị thông báo lỗi "Không thể tải dashboard. Vui lòng thử lại sau", hiển thị nút "Thử lại", ghi nhận lỗi DB-CONN-004

### AC-12: Kiểm tra phân quyền - Chỉ School Admin của khóa học
- **Tại** URL /courses/{courseId}/review-dashboard
- **Khi** người dùng không phải School Admin của khóa học cố gắng truy cập
- **Thì** hệ thống chuyển hướng về trang 403 Không có quyền truy cập với thông báo "Bạn không có quyền xem dashboard review của khóa học này", ghi nhận lại nỗ lực truy cập trái phép

---

## Inline business rule

| Trường thông tin        | Mã BR     | Business rule                                                    | Ghi chú                                |
|-------------------------|-----------|------------------------------------------------------------------|----------------------------------------|
| Trạng thái khóa học     | BR-PS-093 | Chỉ hiển thị dashboard khi status thuộc (CONTENT_BUILDING, READY_FOR_REVIEW, CONTENT_APPROVED) | Kiểm tra nghiệp vụ                     |
| Submissions             | BR-PS-094 | Hiển thị tất cả submissions của khóa học, không phân biệt instructor | Tổng quan đầy đủ                       |
| Grouping                | BR-PS-095 | Hỗ trợ 2 loại grouping: by Instructor, by Section               | Linh hoạt xem                          |
| Filter trạng thái       | BR-PS-096 | Filter theo: SUBMITTED, UNDER_REVIEW, APPROVED, NEEDS_REVISION   | 4 trạng thái chính                     |
| Search                  | BR-PS-097 | Search theo tên lecture hoặc tên instructor (case-insensitive)   | Tìm kiếm linh hoạt                     |
| Sắp xếp                 | BR-PS-098 | Hỗ trợ sắp xếp: submitted_at, status, instructor_name, lecture_title | Nhiều tiêu chí                     |
| Priority submissions    | BR-PS-099 | Submissions submit > 3 ngày và status = SUBMITTED được đánh dấu priority | Cảnh báo khẩn cấp                  |
| Refresh interval        | BR-PS-100 | Auto-refresh data sau 30 giây hoặc manual refresh                | Real-time update                       |
| Tiến độ review          | BR-PS-101 | Công thức: (số APPROVED / tổng submissions) * 100               | Phần trăm hoàn thành                   |

---

## System rule
- Dashboard chỉ hiển thị submissions của khóa học hiện tại (tenant isolation)
- Số liệu thống kê được tính real-time từ database
- Grouping by Instructor: instructor_id làm key
- Grouping by Section: section_id làm key
- Priority badge hiển thị khi: submitted_at < (current_time - 3 days) AND status = SUBMITTED
- Auto-refresh sử dụng polling mechanism với interval 30s
- Cache dashboard data trong 10 giây để giảm tải database

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho School Admin theo dõi tổng quan tiến độ review nội dung của tất cả giảng viên, xác định submissions cần ưu tiên xem xét, đảm bảo quy trình review diễn ra trơn tru và đúng hạn**

Trọng số của story này là **5**

Story được coi là thành công khi nó đảm bảo được:
- Admin có thể xem tổng quan dashboard trong vòng 2 giây (page load time)
- 100% submissions được hiển thị đầy đủ với trạng thái chính xác
- Filter và search hoạt động chính xác 100%
- Priority submissions được highlight đúng 100% (submit > 3 ngày)
- Auto-refresh hoạt động mượt mà không làm gián đoạn trải nghiệm
- Trung bình Admin review submissions trong vòng 1 ngày sau khi submit (giảm 50% so với không có dashboard)

---

## Dependencies
- **lf-course service**: Lấy danh sách submissions, instructor info, section info
- **lf-curriculum service**: Lấy thông tin lecture
- **US-PS-003**: Instructors đã được mời và chấp nhận lời mời
- **US-PS-011 (Instructor submit content)**: Phải có submissions để hiển thị trên dashboard

---

## Impact Analysis

- **Business Process**:
  - Admin có visibility đầy đủ về tiến độ review
  - Giảm thời gian phản hồi cho instructors
  - Priority submissions được xử lý ưu tiên
  - Tăng hiệu quả quy trình review

- **User Experience**:
  - Dashboard trực quan, dễ sử dụng
  - Grouping linh hoạt (by Instructor / by Section)
  - Filter và search mạnh mẽ
  - Real-time updates giữ data luôn mới

- **Performance**:
  - Cache 10 giây giảm tải database
  - Lazy loading khi expand instructor/section
  - Pagination nếu > 50 submissions

---

## UI/UX Design

### Content Review Dashboard - Overview
```
┌─────────────────────────────────────────────────────────────────┐
│ Khóa học: Toán nâng cao | Trạng thái: Đang xây dựng nội dung    │
│ Content Review Dashboard                       [🔄 Refresh]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📊 Tổng quan                                                   │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐ │
│  │ Tổng số      │ Chờ review   │ Cần sửa      │ Đã duyệt     │ │
│  │ submissions  │              │              │              │ │
│  │     45       │     12 🟠    │      8 🟡    │     20 🟢    │ │
│  └──────────────┴──────────────┴──────────────┴──────────────┘ │
│                                                                 │
│  Tiến độ review: [████████████░░░░░░░░] 62% (28/45)            │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  View: ● Group by Instructor  ○ Group by Section               │
│                                                                 │
│  Filter: [Tất cả ▼] | Search: [____________] 🔍                │
│                                                                 │
│  Sort by: [Thời gian submit ▼] [↓ Mới nhất]                    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ ▼ [👤] Nguyễn Văn A | OWNER                                │ │
│  │    Submissions: 15 | Chờ review: 3 | Cần sửa: 2 | Duyệt: 10│ │
│  │    Progress: [██████████████░░] 67%                        │ │
│  │                                                             │ │
│  │    ┌─────────────────────────────────────────────────────┐ │ │
│  │    │ 🔴 Bài 1.1: Giới thiệu | SUBMITTED                   │ │ │
│  │    │ Submitted: 10/12/2025 (3 ngày trước) ⚠️ Khẩn cấp    │ │ │
│  │    │ [Preview] [Review]                                   │ │ │
│  │    ├─────────────────────────────────────────────────────┤ │ │
│  │    │ 🟡 Bài 1.2: Lý thuyết | NEEDS_REVISION              │ │ │
│  │    │ Submitted: 12/12/2025 | Reviewed: 13/12/2025        │ │ │
│  │    │ [View Feedback] [Preview]                            │ │ │
│  │    ├─────────────────────────────────────────────────────┤ │ │
│  │    │ 🟢 Bài 1.3: Thực hành | APPROVED                    │ │ │
│  │    │ Submitted: 11/12/2025 | Approved: 12/12/2025        │ │ │
│  │    │ [Preview]                                            │ │ │
│  │    └─────────────────────────────────────────────────────┘ │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ ▼ [👤] Trần Thị B | CONTRIBUTOR                            │ │
│  │    Submissions: 8 | Chờ review: 2 | Cần sửa: 1 | Duyệt: 5 │ │
│  │    Progress: [███████████░░░░] 62%                         │ │
│  │    ...                                                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Showing 2 of 3 instructors                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Group by Section View
```
┌─────────────────────────────────────────────────────────────────┐
│  View: ○ Group by Instructor  ● Group by Section               │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ ▼ Section 1: Giới thiệu (5 lectures)                       │ │
│  │    Submissions: 5 | Chờ review: 1 | Cần sửa: 1 | Duyệt: 3 │ │
│  │    Progress: [████████████░░] 60%                          │ │
│  │                                                             │ │
│  │    ┌─────────────────────────────────────────────────────┐ │ │
│  │    │ 🔴 Lecture 1.1 | Nguyễn Văn A | SUBMITTED           │ │ │
│  │    │ 🟢 Lecture 1.2 | Nguyễn Văn A | APPROVED            │ │ │
│  │    │ 🟡 Lecture 1.3 | Trần Thị B | NEEDS_REVISION        │ │ │
│  │    └─────────────────────────────────────────────────────┘ │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ ▶ Section 2: Lý thuyết (8 lectures)                        │ │
│  │    Submissions: 8 | Chờ review: 3 | Cần sửa: 2 | Duyệt: 3 │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        📋                                       │
│                                                                 │
│          Chưa có submission nào                                 │
│                                                                 │
│  Giảng viên đang xây dựng nội dung.                             │
│  Bạn sẽ nhận thông báo khi có submission mới.                   │
│                                                                 │
│  Giảng viên đã tham gia:                                        │
│  • Nguyễn Văn A (OWNER)                                         │
│  • Trần Thị B (CONTRIBUTOR)                                     │
│                                                                 │
│               [Theo dõi tiến độ giảng viên]                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**UI Behaviors**:
- Expand/collapse instructor hoặc section bằng click vào header
- Badge màu: 🔴 SUBMITTED, 🟡 NEEDS_REVISION, 🟢 APPROVED, 🔵 UNDER_REVIEW
- Priority badge ⚠️ hiển thị nếu submit > 3 ngày
- Real-time notification ở góc phải khi có update mới
- Smooth animation khi filter/sort

---

## Out of Scope Item

### Business Operations:
- **Batch approve**: Approve nhiều submissions cùng lúc (có thể làm sau)
- **Export dashboard to Excel/PDF**: Export báo cáo chi tiết (có thể làm sau)
- **Email digest**: Gửi email tổng hợp submissions chờ review hàng ngày (automation - out of scope)

### Technical:
- **Advanced analytics**: Thống kê chi tiết thời gian review trung bình, trends (analytics feature)
- **Notification system**: Push notification real-time khi có submission mới (có thể làm sau)
- **Assignment system**: Assign submissions cho specific reviewers (phức tạp - out of scope)

### Features:
- **Compare versions**: So sánh submission cũ và mới khi instructor resubmit (version control - out of scope)
- **Collaborative review**: Nhiều admins review cùng submission với comments (collaboration feature - out of scope)
- **Review templates**: Admin tạo review checklist templates (template system - out of scope)
