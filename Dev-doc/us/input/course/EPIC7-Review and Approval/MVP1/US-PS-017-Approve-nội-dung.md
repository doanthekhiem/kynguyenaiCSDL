# US-PS-017 - Approve khóa học

## User story Title
US-PS-017 - Approve khóa học-COURSE_APPROVE (Approve Course)

Là một **Quản trị viên nhà trường-SCHOOL_ADMIN của trường tư-SOCIAL_SCHOOL**

Tôi muốn thực hiện **phê duyệt toàn bộ nội dung khóa học sau khi kiểm tra chất lượng đạt chuẩn** tại **trang Review Khóa học của sản phẩm LMS**

Để **cho phép nội dung khóa học được công khai, chuyển tiếp quy trình workflow, và thông báo cho Giảng viên chủ trì về kết quả phê duyệt**

---

## Acceptance criteria

### AC-1: Happy Path - Approve khóa học thành công
- **Tại** trang "Review nội dung Khóa học" với khóa học có submission_status = **Đang được review-UNDER_REVIEW**
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn nút "Approve khóa học", xác nhận hộp thoại "Phê duyệt khóa học này?", sau đó nhấn "Xác nhận"
- **Thì** hệ thống:
  + cập nhật submission_status = **Đã duyệt-APPROVED**, 
  + cập nhật course_status = **Nội dung đã duyệt-CONTENT_APPROVED**, 
  + ghi nhận approved_by = admin_id và approved_at = hiện tại, 
  + gửi email thông báo cho Giảng viên chủ trì "Khóa học của bạn đã được phê duyệt", 
  + gửi sự kiện "CourseApprovedEvent", 
  + hiển thị thông báo "Đã phê duyệt khóa học [Mã khóa học - Tên khóa học] thành công"

### AC-2: Approve khóa học với review notes tùy chọn
- **Tại** hộp thoại "Approve Khóa học"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhập review notes (không bắt buộc) vào ô text, sau đó nhấn "Xác nhận"
- **Thì** hệ thống lưu review_notes kèm submission, hiển thị notes trong email gửi Giảng viên chủ trì, cho phép Giảng viên chủ trì xem notes từ lịch sử submission

### AC-3: Validation - Không approve khóa học đã approved
- **Tại** trang "Review nội dung Khóa học" với khóa học có submission_status = **Đã duyệt-APPROVED**
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN cố gắng approve lại
- **Thì** hệ thống vô hiệu hóa nút "Approve khóa học", hiển thị message "Khóa học này đã được phê duyệt", nếu vẫn gọi API thì trả về lỗi 400 "Cannot approve already approved course"

### AC-4: Validation - Không approve khóa học chưa được review
- **Tại** trang "Review Khóa học-COURSE_REVIEW" với khóa học có submission_status = **Đã submit-SUBMITTED** (chưa chuyển UNDER_REVIEW)
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn "Approve khóa học"
- **Thì** hệ thống không hiển thị nút "Approve khóa học"

### AC-5: Gửi email thông báo approve cho Giảng viên chủ trì
- **Tại** dịch vụ notification khi nhận sự kiện "CourseApprovedEvent"
- **Khi** sự kiện được xử lý từ hệ thống
- **Thì** hệ thống gửi email đến Giảng viên chủ trì-OWNER với tiêu đề "Khóa học của bạn đã được phê duyệt", nội dung bao gồm: tên khóa học, mã khóa học, thời gian approve, review notes (nếu có), lời khen ngợi, các bước tiếp theo

### AC-6: Xử lý lỗi khi approve - Database error
- **Tại** hệ thống backend khi xử lý approve
- **Khi** kết nối cơ sở dữ liệu bị lỗi
- **Thì** hệ thống hoàn tác giao dịch, submission_status và course_status không thay đổi, hiển thị thông báo lỗi "Không thể phê duyệt khóa học. Vui lòng thử lại", ghi nhận lỗi APPROVE-FAIL-001

<!-- ### AC-7: Xử lý lỗi gửi email notification
- **Tại** dịch vụ notification khi gửi email approve
- **Khi** máy chủ email lỗi hoặc địa chỉ email Giảng viên chủ trì không hợp lệ
- **Thì** hệ thống thử gửi lại email 3 lần với khoảng cách tăng dần (1 giây, 3 giây, 9 giây), nếu vẫn thất bại thì ghi nhận lỗi EMAIL-FAIL-003, khóa học vẫn được approve thành công (email là secondary concern), hiển thị cảnh báo cho Admin "Đã approve nhưng email có thể chưa được gửi đến Giảng viên chủ trì" -->

### AC-8: Kiểm tra phân quyền - Chỉ School Admin
- **Tại** API endpoint /api/courses/{courseId}/approve
- **Khi** người dùng không phải Quản trị viên nhà trường-SCHOOL_ADMIN cố gắng approve
- **Thì** hệ thống trả về 403 Không có quyền với thông báo "Bạn không có quyền phê duyệt khóa học này", ghi nhận lại nỗ lực trái phép

### AC-9: Tự động tạo PIM khi khóa học được phê duyệt

- **Tại**: Hệ thống backend sau khi khóa học được School Admin phê duyệt thành công
- **Khi**: submission_status chuyển sang **Đã duyệt – APPROVED** và course_status chuyển sang **Nội dung đã duyệt – CONTENT_APPROVED**
- **Thì hệ thống**:
  + Tự động kích hoạt quy trình tạo PIM cho Social School.
  + Tự động tạo PIM cho Individual (Giảng viên chủ trì) đã tham gia khóa học.
  + Gửi sự kiện: "CoursePIMGeneratedEvent" để các dịch vụ liên quan có thể tiếp tục xử lý (ví dụ: content packaging, marketplace onboarding…).
  + Ghi nhận timestamp và trạng thái tạo PIM cho mục đích theo dõi và kiểm toán.

---

## Inline business rule

| Trường thông tin        | Mã BR     | Business rule                                                    | Ghi chú                                |
|-------------------------|-----------|------------------------------------------------------------------|----------------------------------------|
| Trạng thái submission   | BR-PS-110 | Chỉ approve được khóa học có submission_status = UNDER_REVIEW hoặc SUBMITTED | Validation                         |
| Trạng thái sau approve  | BR-PS-111 | submission_status: UNDER_REVIEW → APPROVED, course_status: READY_FOR_REVIEW → CONTENT_APPROVED | State transition           |
| Approved metadata       | BR-PS-112 | Lưu approved_by, approved_at, review_notes khi approve           | Audit trail                            |
| Review notes            | BR-PS-113 | Không bắt buộc, tối đa 2000 ký tự, hỗ trợ tiếng Việt có dấu     | Optional field                         |
| Email notification      | BR-PS-114 | Gửi email cho Giảng viên chủ trì-LEAD_INSTRUCTOR khi khóa học được approve | Communication                    |
| Event publishing        | BR-PS-115 | Publish CourseApprovedEvent sau khi approve thành công           | Event-driven                           |

---

## System rule
- Approve operation phải atomic (all or nothing)
- Review_notes được encrypt khi lưu vào database
- Email retry mechanism: 3 lần với exponential backoff (1s, 3s, 9s)
- 1 khóa học = 1 Giảng viên chủ trì-LEAD_INSTRUCTOR xây dựng toàn bộ nội dung
- Approve khóa học = approve toàn bộ nội dung (tất cả chương và bài học)

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho School Admin phê duyệt toàn bộ nội dung khóa học sau khi review, tự động chuyển tiếp course workflow, thông báo kịp thời cho Giảng viên chủ trì, đảm bảo quy trình review - approve diễn ra hiệu quả**

Trọng số của story này là **5**

Story được coi là thành công khi nó đảm bảo được:
- 100% approve operations hoàn thành thành công (với database healthy)
- Tỷ lệ gửi email notification >= 98%
- Course status transition hoạt động chính xác 100%
- Trung bình Admin approve 1 khóa học trong < 10 giây (từ nhấn nút đến hoàn tất)
- 90% Giảng viên chủ trì nhận email approve trong vòng 1 phút

---

## Dependencies
- **lf-course service**: Update submission_status, update course_status
- **notification-service**: Gửi email thông báo approve
- **US-PS-016**: Phải review nội dung khóa học trước khi approve
- **US-PS-015**: Danh sách khóa học chờ duyệt

---

## Impact Analysis

- **Business Process**:
  - Quy trình approve rõ ràng, minh bạch
  - Course status transition tự động
  - Email notification tăng communication với Giảng viên chủ trì

- **User Experience**:
  - Approve đơn giản, nhanh chóng (1 click + confirm)
  - Giảng viên chủ trì nhận feedback kịp thời

- **Performance**:
  - Transaction đảm bảo data integrity
  - Email async không block approve operation

---

## UI/UX Design

### Approve Confirmation Dialog
```
┌──────────────────────────────────────────┐
│  Phê duyệt khóa học                      │
├──────────────────────────────────────────┤
│                                          │
│  Bạn chuẩn bị phê duyệt:                 │
│  📚 PRIV-20251210-001                    │
│  Toán nâng cao                           │
│  GV chủ trì: Nguyễn Văn A                │
│                                          │
│  Khóa học gồm:                           │
│  • 5 Chương                              │
│  • 20 Bài học                            │
│                                          │
│  Review notes (không bắt buộc):          │
│  ┌────────────────────────────────────┐  │
│  │ Nội dung tốt, các bài giảng rõ ràng│  │
│  │ Bài tập phong phú.                 │  │
│  └────────────────────────────────────┘  │
│  (0/2000 ký tự)                          │
│                                          │
│  Notes này sẽ được gửi cho GV chủ trì.  │
│                                          │
│           [Hủy] [Xác nhận phê duyệt]     │
└──────────────────────────────────────────┘
```

### Success Notification
```
┌────────────────────────────────────────────────┐
│  ✓ Đã phê duyệt khóa học thành công           │
├────────────────────────────────────────────────┤
│                                                │
│  📚 PRIV-20251210-001 - Toán nâng cao          │
│  GV chủ trì: Nguyễn Văn A                      │
│  Approved at: 13/12/2025 15:45                 │
│                                                │
│  Trạng thái khóa học:                          │
│  ✓ Nội dung đã duyệt - CONTENT_APPROVED        │
│                                                │
│  Email notification đã được gửi.               │
│                                                │
│  Bước tiếp theo:                               │
│  → Tạo PIM (Product Information)               │
│  → Thiết lập giá khóa học                      │
│  → Publish khóa học                            │
│                                                │
│             [OK] [Quay lại danh sách]          │
└────────────────────────────────────────────────┘
```

**UI Behaviors**:
- Approve button highlight màu xanh khi hover
- Confirmation dialog có animation fade in
- Success notification tự động close sau 5 giây

---

## Email Template

### Email: Khóa học được phê duyệt

**Subject**: 🎉 Khóa học của bạn đã được phê duyệt - [Tên khóa học]

**Body**:
```
Chào [Tên Giảng viên chủ trì],

Chúc mừng! Khóa học của bạn đã được School Admin phê duyệt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 Khóa học: [Tên khóa học]
🔖 Mã khóa học: [Mã khóa học]
✅ Trạng thái: Nội dung đã duyệt 
🕐 Thời gian phê duyệt: [DD/MM/YYYY HH:MM]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 Nhận xét từ Admin:
"[Review notes - nếu có]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Xem khóa học]

Nội dung khóa học của bạn đã sẵn sàng để tiếp tục quy trình đưa tạo sản phẩm lên Online store

Cảm ơn bạn đã đóng góp nội dung chất lượng!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Trân trọng,
[Tên trường]
```

**Trong đó**
- [Tên khóa học]: Tên khóa học 
- [Tên Giảng viên chủ trì]: Tên giảng viên chủ trì được mời để soạn nội dung
- [Mã khóa học]: Mã khóa học
- [DD/MM/YYYY HH:MM]: Thời gian thực tế ghi nhận nội dung được phê duyệt
- [Review notes - nếu có]: Review note nếu có khi phê duyệt
- [Xem khóa học]: link tới khóa học được approve
- [Tên trường]: Tên social school

---

## Out of Scope Item

### Business Operations:
- **Conditional approve**: Approve với điều kiện (phức tạp)
- **Approve with expiry**: Approval có thời hạn, sau X ngày phải review lại (version control - out of scope)
- **Delegation**: Admin delegate quyền approve cho người khác (authorization - out of scope)

### Technical:
- **Approval workflow**: Require 2 admins approve (multi-level approval - phức tạp)
- **Auto-approve**: AI tự động approve dựa trên criteria (AI - out of scope)
- **Approval analytics**: Track approval rate, time to approve (analytics - out of scope)

### Features:
- **Partial approve**: Approve một phần khóa học (phức tạp - out of scope)
- **Approve scheduling**: Schedule approve vào thời điểm cụ thể (scheduling - out of scope)
