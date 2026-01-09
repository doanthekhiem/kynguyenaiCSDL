# US-PS-019 - Từ chối khóa học

## User story Title
US-PS-019 - Từ chối khóa học-COURSE_REJECT (Reject Course)

Là một **Quản trị viên nhà trường-SCHOOL_ADMIN của trường tư-SOCIAL_SCHOOL**

Tôi muốn thực hiện **từ chối khóa học** tại **trang Review Khóa học của sản phẩm LMS**

Để **đánh dấu khóa học không phù hợp và không cho phép Giảng viên chủ trì resubmit**

---

## Acceptance criteria

### AC-1: Happy Path - Từ chối khóa học với lý do bắt buộc
- **Tại** trang "Review nội dung Khóa học" với khóa học có submission_status thuộc Đang được review-UNDER_REVIEW
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn nút "Từ chối", điền lý do từ chối (tối thiểu 50 ký tự), và confirm
- **Thì** hệ thống:
  - Cập nhật submission_status từ Đang được review-UNDER_REVIEW → Đã từ chối-REJECTED
  - Cập nhật course_status = Đã lưu trữ - Archived
  - Lưu rejection notes vào database với timestamp
  - Gửi email thông báo từ chối đến Giảng viên chủ trì-OWNER  
  - Hiển thị toast message "Đã từ chối khóa học thành công"
  - Vô hiệu hóa tất cả actions trên khóa học này (không cho phép approve, request revision, hay resubmit)

### AC-2: Validation - Lý do từ chối bắt buộc nhập
- **Tại** modal "Từ chối khóa học" với khóa học có submission_status =  UNDER_REVIEW
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN chưa nhập lý do từ chối (hoặc nhập < 50 ký tự) và nhấn "Xác nhận từ chối"
- **Thì** hệ thống:
  <!-- Hiển thị validation error: "Vui lòng nhập lý do từ chối (tối thiểu 50 ký tự)">
  - Highlight trường "Lý do từ chối" màu đỏ -->
  - Disable nút "Xác nhận từ chối"
  <!-- - Trả về HTTP 400 nếu API call-->

### AC-3: Rich Text Editor - Nhập lý do từ chối chi tiết
- **Tại** modal "Từ chối khóa học"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn vào trường "Lý do từ chối"
- **Thì** hệ thống hiển thị Rich Text Editor với:
  - Toolbar: Bold, Italic, Underline, Bullet list, Numbered list
  - Placeholder: "Nhập lý do từ chối chi tiết (tối thiểu 50 ký tự, tối đa 2000 ký tự)..."
  - Character counter ở góc dưới phải: "50/2000"
  <!--- Hỗ trợ paste text từ clipboard (strip HTML tags)

### AC-4: Confirmation - Xác nhận từ chối trước khi thực hiện
- **Tại** trang "Review nội dung Khóa học" với khóa học đã điền đầy đủ rejection notes (≥ 50 ký tự)
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn "Xác nhận từ chối"
- **Thì** hệ thống hiển thị confirmation dialog:
  - Tiêu đề: "⚠️ Xác nhận từ chối khóa học?"
  - Nội dung: "Khóa học này sẽ chuyển sang trạng thái Đã lưu trữ-ARCHIVED." Giảng viên chủ trì sẽ **không thể resubmit** khóa học này. Bạn có chắc chắn muốn từ chối?"
  - 2 buttons: "Hủy" (secondary), "Đồng ý từ chối" 

### AC-5: Email Notification - Gửi email thông báo từ chối
- **Tại** sau khi khóa học chuyển submission_status → REJECTED thành công
- **Khi** hệ thống trigger CourseRejectedEvent
- **Thì** Email Service gửi email đến Giảng viên chủ trì-OWNER với:
  - Subject: "⛔ Khóa học của bạn đã bị từ chối - [Tên khóa học]"
  - Body: Thông báo khóa học bị từ chối, lý do chi tiết, không có CTA (vì không thể resubmit)
  <!-- - Retry: 3 lần với exponential backoff (1s, 3s, 9s)
  - Nếu fail sau 3 lần → log error với code EMAIL-FAIL-019 -->

### AC-6: Rejection History - Lưu lịch sử từ chối
- **Tại** khóa học có submission_status = REJECTED
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn "Xem lịch sử"
- **Thì** hệ thống hiển thị rejection history:
  - Rejection notes (full text với formatting)
  - Rejected by: Tên School Admin
  - Rejected at: Timestamp (dd/MM/yyyy HH:mm)
  - Mã khóa học và tên khóa học

### AC-7: Validation - Không thể từ chối khóa học đã được approve
- **Tại** trang "Review nội dung Khóa học" với khóa học có submission_status = Đã duyệt-APPROVED
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN cố gắng nhấn "Từ chối"
- **Thì** hệ thống:
  - Vô hiệu hóa nút "Từ chối", hiển thị tooltip: "Không thể từ chối khóa học đã được phê duyệt"
  - Trả về HTTP 400 nếu API call với error message: "Cannot reject approved course"

### AC-8: Danh sách Update - Cập nhật danh sách sau khi từ chối
- **Tại** trang "Danh sách duyệt khóa học" sau khi reject khóa học thành công
- **Khi** hệ thống nhận CourseRejectedEvent
- **Thì** danh sách tự động refresh và:
  - Xóa khóa học khỏi danh sách chờ duyệt (vì đã ARCHIVED)

### AC-9: Không cho phép thay đổi status sau khi REJECTED
- **Tại** khóa học có submission_status = REJECTED
- **Khi** cố gắng thay đổi status
- **Thì** hệ thống:
  - Vô hiệu hóa tất cả actions (Approve, Request Revision)
  - Hiển thị message: "Khóa học đã bị từ chối. Không thể thực hiện thay đổi."
  - Trả về HTTP 403 nếu API call với error code: REJECT-FINAL-001

### AC-10: Error Handling - Xử lý lỗi khi reject thất bại
- **Tại** trang "Review nội dung Khóa học" sau khi confirm reject
- **Khi** API reject khóa học thất bại (timeout, DB connection error, service unavailable)
- **Thì** hệ thống:
  - Hiển thị error toast: "⚠️ Không thể từ chối khóa học. Vui lòng thử lại."
  - Không thay đổi status của khóa học (rollback)
  - Cho phép School Admin retry bằng cách nhấn "Từ chối" lại

<!-- ### AC-11: Email Fail Handling - Xử lý khi gửi email thất bại
- **Tại** sau khi khóa học chuyển submission_status → REJECTED thành công nhưng email gửi thất bại
- **Khi** Email Service retry 3 lần đều fail
- **Thì** hệ thống:
  - Vẫn giữ submission_status = REJECTED (không rollback)
  - Hiển thị warning notification cho School Admin: "⚠️ Khóa học đã từ chối nhưng email thông báo chưa gửi được. Vui lòng kiểm tra email service."
  - Tạo background job để retry gửi email sau 30 phút -->

### AC-12: Kiểm tra phân quyền - Chỉ School Admin
- **Tại** API endpoint /api/courses/{courseId}/reject
- **Khi** người dùng không phải Quản trị viên nhà trường-SCHOOL_ADMIN cố gắng reject
- **Thì** hệ thống trả về 403 Không có quyền với thông báo "Bạn không có quyền thực hiện hành động này"

---

## Inline business rule

| Trường thông tin | Mã BR  | Business rule              | Ghi chú |
|------------------|--------|----------------------------|---------|
| Lý do từ chối | BR-PS-129 | Bắt buộc nhập khi reject khóa học | Đảm bảo có lý do rõ ràng |
| Lý do từ chối | BR-PS-130 | Tối thiểu 50 ký tự, tối đa 3000 ký tự | Đủ chi tiết nhưng không quá dài |
| Lý do từ chối | BR-PS-131 | Hỗ trợ rich text formatting (bold, italic, list) | UX improvement |
| Status hợp lệ để reject | BR-PS-132 | Chỉ reject được khóa học có submission_status thuộc (SUBMITTED, UNDER_REVIEW) | Không reject APPROVED, NEED_REVISION |
| Status sau reject | BR-PS-133 | Sau khi reject, submission_status = REJECTED, course_status = REJECTED (final, không thể thay đổi) | Permanent rejection |
| Email retry | BR-PS-134 | Retry gửi email 3 lần với exponential backoff (1s, 3s, 9s) | Resilience |
| Rejection notes format | BR-PS-135 | Strip HTML tags khi paste từ clipboard, chỉ giữ basic formatting | Security và data integrity |
| Rejected course actions | BR-PS-136 | Khi status = REJECTED, vô hiệu hóa tất cả actions (approve, request revision, resubmit) | Business rule |

---

## System rule
- Khóa học có submission_status = REJECTED là trạng thái cuối cùng (terminal state), không thể thay đổi sang trạng thái khác
- Giảng viên chủ trì không thể resubmit khóa học đã bị reject (khác với NEED_REVISION cho phép resubmit)
- Email notification phải được gửi trong vòng 5 phút sau khi reject thành công, nếu fail thì retry background job
- Rejection notes phải được mã hóa và lưu trữ an toàn, có audit log để tracking ai reject khi nào
- 1 khóa học = 1 Giảng viên chủ trì-LEAD_INSTRUCTOR xây dựng toàn bộ nội dung

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng quản lý chất lượng khóa học nghiêm ngặt bằng cách reject khóa học không đạt yêu cầu và không cho phép resubmit**

Trọng số của story này là **5**

Story được coi là thành công khi nó đảm bảo được:
- School Admin có thể reject khóa học với lý do chi tiết (≥ 50 ký tự) trong ≤ 30 giây
- Email notification được gửi thành công ≥ 99% trường hợp (với retry mechanism)
- Giảng viên chủ trì nhận được thông báo từ chối rõ ràng, không thể resubmit (tránh confusion)
- Rejection history được lưu trữ đầy đủ với timestamp, reviewer name, notes

---

## Dependencies
- **US-PS-015** - Xem danh sách khóa học chờ duyệt
- **US-PS-016** - Review nội dung khóa học (preview khóa học trước khi reject)
- **US-PS-017** - Approve khóa học (reject là action đối lập với approve)
- **US-PS-018** - Yêu cầu chỉnh sửa (reject khác với request revision: reject = final, không resubmit)
- **Email Service** - Gửi email thông báo từ chối đến Giảng viên chủ trì
- **Notification Service** - Hiển thị toast notification, warning khi email fail
- **Event Bus** - Trigger CourseRejectedEvent để update danh sách và gửi email

---

## Impact Analysis
- **Course Management**: Khi khóa học bị reject, khóa học không thể tiếp tục workflow (REJECTED là terminal state)
- **Giảng viên chủ trì Dashboard**: Giảng viên chủ trì cần được thông báo rõ ràng rằng khóa học bị reject và không thể resubmit (tránh nhầm lẫn với NEED_REVISION)
- **Reporting & Analytics**: Rejection metrics cần được tracking để phân tích chất lượng khóa học
- **Audit & Compliance**: Rejection history phải lưu trữ đầy đủ để audit, kiểm tra lại quyết định reject

---

## UI/UX Design

### 1. Review Submission Page - Reject Button
```
┌─────────────────────────────────────────────────────────────────┐
│ Preview Submission: Section 1 - Lecture 3: Giới thiệu Python   │
│                                                                 │
│ Status: [🔵 Đang được review-UNDER_REVIEW]                      │
│                                                                 │
│ [Video Player: Introduction to Python - 15:30]                 │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Actions:                                                    │ │
│ │ [✅ Approve]  [📝 Request Revision]  [⛔ Reject]           │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Reject Modal - Nhập lý do từ chối
```
┌───────────────────────────────────────────────────────────────┐
│  ⛔ Từ chối nội dung                                    [X]   │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Submission: Section 1 - Lecture 3: Giới thiệu Python        │
│  Instructor: Nguyễn Văn A (owner@school.edu.vn)              │
│                                                               │
│  Lý do từ chối *                                              │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ [B] [I] [U] [•] [1.]                                    │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │ Nhập lý do từ chối chi tiết (tối thiểu 50 ký tự,       │  │
│  │ tối đa 3000 ký tự)...                                   │  │
│  │                                                         │  │
│  │                                                         │  │
│  │                                                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                              50/3000 ký tự    │
│                                                               │
│  ⚠️ Lưu ý: Submission này sẽ chuyển sang trạng thái          │
│     "Đã từ chối-REJECTED". Instructor sẽ KHÔNG THỂ resubmit │
│     nội dung này.                                             │
│                                                               │
│  [Hủy]                            [⛔ Xác nhận từ chối]      │
└───────────────────────────────────────────────────────────────┘
```

### 3. Confirmation Dialog - Xác nhận từ chối
```
┌─────────────────────────────────────────────────────────┐
│  ⚠️ Xác nhận từ chối nội dung?                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Submission này sẽ chuyển sang trạng thái               │
│  "Đã từ chối-REJECTED". Instructor sẽ KHÔNG THỂ        │
│  resubmit nội dung này. Bạn có chắc chắn muốn từ chối?  │
│                                                         │
│  [Hủy]                        [Đồng ý từ chối]         │
└─────────────────────────────────────────────────────────┘
```

### 4. Dashboard - Submission Rejected Badge
```
┌───────────────────────────────────────────────────────────────┐
│ Dashboard Submissions                                         │
│                                                               │
│ Filter: [All] [Đã nộp] [Đang review] [Đã duyệt] [🔴 Đã từ chối] │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ Section 1 - Lecture 3: Giới thiệu Python               │   │
│ │ Instructor: Nguyễn Văn A                                │   │
│ │ Status: [🔴 Đã từ chối-REJECTED]                        │   │
│ │ Rejected at: 10/12/2025 14:30                          │   │
│ │ Rejected by: Admin Trần Thị B                           │   │
│ │ [Xem lịch sử từ chối]                                   │   │
│ └─────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
```

### 5. Bulk Reject Modal
```
┌───────────────────────────────────────────────────────────────┐
│  ⛔ Từ chối hàng loạt (Bulk Reject)                     [X]  │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Bạn đã chọn 15 submissions để từ chối:                      │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ ☑ Section 1 - Lecture 3: Giới thiệu Python             │  │
│  │ ☑ Section 2 - Lecture 1: Biến và kiểu dữ liệu          │  │
│  │ ☑ Section 2 - Lecture 5: Vòng lặp for                  │  │
│  │ ... (12 submissions khác)                               │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                               │
│  Lý do từ chối chung *                                        │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Nội dung chưa đạt yêu cầu về chất lượng âm thanh       │  │
│  │ và hình ảnh. Vui lòng quay lại video với thiết bị      │  │
│  │ chuyên nghiệp hơn.                                      │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                              120/3000 ký tự   │
│                                                               │
│  ⚠️ Tất cả 15 submissions sẽ không thể resubmit             │
│                                                               │
│  [Hủy]                            [⛔ Từ chối 15 submissions] │
└───────────────────────────────────────────────────────────────┘
```

### 6. Rejection History Modal
```
┌───────────────────────────────────────────────────────────────┐
│  📜 Lịch sử từ chối                                    [X]   │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Submission: Section 1 - Lecture 3: Giới thiệu Python        │
│  Type: �� VIDEO                                               │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Rejected by: 👤 Admin Trần Thị B                        │  │
│  │ Rejected at: 10/12/2025 14:30                          │  │
│  │                                                         │  │
│  │ Lý do từ chối:                                          │  │
│  │ ───────────────────────────────────────────────────────│  │
│  │ Nội dung video không phù hợp với chương trình đào tạo: │  │
│  │                                                         │  │
│  │ • Âm thanh có nhiễu, không rõ ràng                     │  │
│  │ • Slide bị mờ, khó đọc                                 │  │
│  │ • Nội dung giảng dạy sai kiến thức cơ bản về Python    │  │
│  │                                                         │  │
│  │ Vui lòng liên hệ School Admin nếu có thắc mắc.        │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                               │
│  [Đóng]                                                       │
└───────────────────────────────────────────────────────────────┘
```

### 7. Email Template - Submission Rejected Notification

**Subject**: ⛔ Nội dung của bạn đã bị từ chối - [Tên khóa học]

**Body**:
```
Xin chào [Tên giảng viên chủ trì],

Nội dung bạn đã submit cho khóa học “[Tên khóa học]” hiện chưa thể được phê duyệt. Reviewer đã xem xét và gửi lại yêu cầu chỉnh sửa để đảm bảo nội dung đạt tiêu chuẩn chất lượng trước khi chuyển sang bước tiếp theo.

─────────────────────────────────────

📋 THÔNG TIN SUBMISSION
─────────────────────────────────────
📚 Khóa học: [Tên khóa học]  
🔖 Mã khóa học: [Mã khóa học] 
⚠️ Trạng thái: Đã lưu trữ
🕐 Thời điểm từ chối: [dd/MM/yyyy HH:mm]  

─────────────────────────────────────

⛔ LÝ DO TỪ CHỐI
─────────────────────────────────────
"[Lý do từ chối]"

─────────────────────────────────────

⚠️ LƯU Ý QUAN TRỌNG
─────────────────────────────────────
Submission này đã chuyển sang trạng thái "Đã lưu trữ - ARCHIVED". Bạn KHÔNG THỂ resubmit nội dung này.

Nếu có thắc mắc, vui lòng liên hệ trực tiếp với Quản trị viên nhà trường qua email: [school_admin_email]"

Cảm ơn bạn đã luôn đồng hành và hoàn thiện chất lượng nội dung giảng dạy.

Trân trọng,
[Social School]

---
Email này được gửi tự động. Vui lòng không reply.
```

**Trong đó**
- [Tên khóa học]: Tên khóa học 
- [Tên Giảng viên chủ trì]: Tên giảng viên chủ trì 
- [Mã khóa học]: Mã khóa học
- [DD/MM/YYYY HH:MM]: Thời gian thực tế ghi nhận sự kiện reject submission
- [Lý do từ chối]: Lý do từ chối
- [school_admin_email]: Email của social school
- [Social School]: Tên social school

---

## Out of Scope Item

### Business Operation:
- **Appeal Process**: Instructor không thể appeal (kháng cáo) quyết định reject, muốn thay đổi phải liên hệ trực tiếp School Admin
- **Re-assign Lecture**: Sau khi reject, School Admin không thể re-assign lecture cho instructor khác trong cùng US này (cần US khác)
- **Partial Reject**: Không hỗ trợ reject một phần nội dung (ví dụ reject chỉ slide 5-10), phải reject toàn bộ submission
- **Reject with Suggestion**: Không có tính năng suggest instructor khác hoặc suggest resources để improve (chỉ có rejection notes)

### Technical Debt:
- **Undo Reject**: Không hỗ trợ undo rejection (REJECTED là final state)
- **Reject Analytics Dashboard**: Không có dashboard riêng để phân tích rejection rate, common rejection reasons
- **Auto Reject**: Không hỗ trợ auto-reject dựa trên AI/ML scoring (ví dụ: auto reject nếu video quality < threshold)
- **Rejection Templates**: Không có sẵn rejection templates dropdown (chỉ có rich text editor để nhập manual)

### Role & Permission:
- **CONTRIBUTOR reject**: Chỉ School Admin mới có quyền reject, CONTRIBUTOR/REVIEWER không có quyền này
- **Instructor self-reject**: Instructor không thể tự reject submission của mình
