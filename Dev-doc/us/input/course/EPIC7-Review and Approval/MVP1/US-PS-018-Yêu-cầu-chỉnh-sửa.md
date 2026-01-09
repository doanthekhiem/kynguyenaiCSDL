# US-PS-018 - Yêu cầu chỉnh sửa khóa học

## User story Title
US-PS-018 - Yêu cầu chỉnh sửa khóa học-COURSE_REVISION_REQUEST (Request Course Revision)

Là một **Quản trị viên nhà trường-SCHOOL_ADMIN của trường tư-SOCIAL_SCHOOL**

Tôi muốn thực hiện **yêu cầu Giảng viên chủ trì chỉnh sửa lại nội dung khóa học kèm review notes hướng dẫn cụ thể** tại **trang Review Khóa học của sản phẩm LMS**

Để **Giảng viên chủ trì hiểu rõ vấn đề cần sửa, cải thiện chất lượng nội dung, và resubmit khóa học để xem xét lại**

---

## Acceptance criteria

### AC-1: Happy Path - Yêu cầu chỉnh sửa khóa học thành công
- **Tại** trang "Review nội dung Khóa học" với khóa học có submission_status = **Đang được review-UNDER_REVIEW**
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn nút "Yêu cầu chỉnh sửa", nhập review notes hướng dẫn (bắt buộc) vào ô text, sau đó nhấn "Xác nhận"
- **Thì** hệ thống:
  + Cập nhật submission_status = **Cần chỉnh sửa-NEED_REVISION**,
  + Ghi nhận reviewed_by = admin_id, reviewed_at = hiện tại, revision_notes = nội dung review notes, 
  + Gửi email thông báo cho Giảng viên chủ trì "Khóa học của bạn cần chỉnh sửa" kèm review notes, 
  + Gửi sự kiện "CourseRevisionRequestedEvent", 
  + Hiển thị thông báo "Đã gửi yêu cầu chỉnh sửa cho Giảng viên chủ trì"

### AC-2: Validation - Review notes là bắt buộc
- **Tại** hộp thoại "Yêu cầu chỉnh sửa"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN để trống ô review notes hoặc nhập < 20 ký tự, sau đó nhấn "Xác nhận"
- **Thì** hệ thống hiển thị thông báo lỗi "Review notes là bắt buộc và phải có ít nhất 20 ký tự để hướng dẫn rõ ràng", không cho phép submit, highlight ô review notes màu đỏ

### AC-3: Rich text editor cho review notes
- **Tại** hộp thoại "Yêu cầu chỉnh sửa", ô review notes
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhập review notes
- **Thì** hệ thống cung cấp rich text editor với: bold, italic, bullet list, numbered list, link, cho phép format text để hướng dẫn rõ ràng, hiển thị character counter (0/2000), hỗ trợ tiếng Việt có dấu

<!-- ### AC-4: Suggest common revision reasons
- **Tại** hộp thoại "Yêu cầu chỉnh sửa"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN click vào "Gợi ý lý do phổ biến"
- **Thì** hệ thống hiển thị dropdown với các template: "Video chưa rõ ràng, cần quay lại", "Thiếu ví dụ thực tế", "Nội dung chưa đầy đủ", "Tài liệu bài học bị lỗi", "Bài kiểm tra/trắc nghiệm có lỗi", cho phép Admin chọn template để tự động điền vào review notes, Admin có thể chỉnh sửa lại template -->

### AC-5: Track revision history
- **Tại** Hệ thống, trong quá trình xử lý yêu cầu chỉnh sửa nội dung
- **Khi** Có yêu cầu “request revision” được gửi từ School admin
- **Thì** hệ thống:
  + Tạo một bản ghi lịch sử chỉnh sửa mới, gồm:
    - Số lần chỉnh sửa (tự động tăng theo mỗi yêu cầu)
    - Trạng thái trước khi yêu cầu chỉnh sửa
    - Trạng thái mới = “Cần chỉnh sửa-Need revision”
    - Ghi chú yêu cầu chỉnh sửa
    - Người yêu cầu chỉnh sửa
    - Thời điểm yêu cầu
  + Cho phép xem lại toàn bộ lịch sử chỉnh sửa từ trang review nội dung khóa học, phục vụ theo dõi, đối chiếu và kiểm toán.

### AC-6: Thông báo cho Giảng viên chủ trì
- **Tại** dịch vụ notification khi nhận sự kiện "CourseRevisionRequestedEvent"
- **Khi** sự kiện được xử lý từ hệ thống
- **Thì** hệ thống 
  + Gửi email đến Giảng viên chủ trì-OWNER với tiêu đề "Yêu cầu chỉnh sửa khóa học - [Tên khóa học]", 
  + Nội dung bao gồm: tên khóa học, mã khóa học, review notes chi tiết, <!-- suggested deadline (7 ngày từ hôm nay),--> link để chỉnh sửa và resubmit khóa học, lời động viên

### AC-7: Tự động mở lại trạng thái khóa học
- **Tại** Hệ thống, trong quá trình xử lý yêu cầu chỉnh sửa
- **Khi** Trạng thái submit của khóa học được chuyển sang **Cần chỉnh sửa-NEED_REVISION**
- **Thì** hệ thống:
  + Cập nhật course_status = **Đang xây dựng nội dung-CONTENT_BUILDING**, 
  + Cho phép Giảng viên chủ trì edit nội dung khóa học, upload video/tài liệu mới, resubmit khóa học với submission_type = REVISION

### AC-8: Prevent approve sau khi request revision
- **Tại** trang "Review nội dung Khóa học" với khóa học có submission_status = **Cần chỉnh sửa-NEED_REVISION**
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN cố gắng approve
- **Thì** hệ thống:
  + Vô hiệu hóa nút "Approve khóa học"
  + Hiển thị message "Khóa học đang chờ Giảng viên chủ trì chỉnh sửa. Không thể approve", 
  + Nếu vẫn gọi API thì trả về lỗi 400 "Cannot approve course with NEED_REVISION status"
  + Không thay đổi bất kỳ trạng thái hay dữ liệu nào của khóa học.

### AC-9: Hiển thị khóa học cần sửa trên danh sách
- **Tại** trang "Danh sách duyệt khóa học" sau khi request revision
- **Khi** khóa học có submission_status = **Cần chỉnh sửa-NEED_REVISION**
- **Thì** hệ thống hiển thị khóa học "Cần chỉnh sửa", filter "Cần chỉnh sửa" để xem tất cả khóa học đang chờ sửa

### AC-10: Hủy yêu cầu chỉnh sửa với confirmation
- **Tại** hộp thoại "Yêu cầu chỉnh sửa"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn "Hủy"
- **Thì** hệ thống đóng dialog, không thay đổi submission_status, không gửi email, quay lại trang review

### AC-11: Xử lý lỗi khi request revision
- **Tại** hệ thống backend khi xử lý request revision
- **Khi** kết nối cơ sở dữ liệu bị lỗi
- **Thì** hệ thống 
  + Hoàn tác giao dịch
  + Giữ nguyên submission_status 
  + Hiển thị thông báo lỗi "Không thể gửi yêu cầu chỉnh sửa. Vui lòng thử lại"
  + Cho phép Quản trị viên hoặc Reviewer gửi lại yêu cầu khi lỗi được khắc phục.

<!-- ### AC-12: Xử lý lỗi gửi email notification
- **Tại** dịch vụ notification khi gửi email revision request
- **Khi** máy chủ email lỗi hoặc địa chỉ email Giảng viên chủ trì không hợp lệ
- **Thì** hệ thống thử gửi lại email 3 lần với khoảng cách tăng dần (1 giây, 3 giây, 9 giây), nếu vẫn thất bại thì ghi nhận lỗi, khóa học vẫn chuyển status thành công (email là secondary), hiển thị cảnh báo "Đã gửi yêu cầu chỉnh sửa nhưng email có thể chưa được gửi đến Giảng viên chủ trì" -->

### AC-13: Kiểm tra phân quyền - Chỉ School Admin
- **Tại** API endpoint /api/courses/{courseId}/request-revision
- **Khi** người dùng không phải Quản trị viên nhà trường-SCHOOL_ADMIN cố gắng request revision
- **Thì** hệ thống trả về 403 Không có quyền với thông báo "Bạn không có quyền thực hiện hành động này"

---

## Inline business rule

| Trường thông tin        | Mã BR     | Business rule                                                    | Ghi chú                                |
|-------------------------|-----------|------------------------------------------------------------------|----------------------------------------|
| Trạng thái submission   | BR-PS-119 | Chỉ request revision được khóa học có submission_status = UNDER_REVIEW  | Validation                     |
| Trạng thái sau revision | BR-PS-120 | submission_status: UNDER_REVIEW → NEED_REVISION, course_status: READY_FOR_REVIEW → CONTENT_BUILDING | State transition           |
| Review notes            | BR-PS-121 | Bắt buộc nhập, tối thiểu 20 ký tự, tối đa 2000 ký tự            | Mandatory field                        |
| Review notes format     | BR-PS-122 | Hỗ trợ rich text (bold, italic, list), hỗ trợ tiếng Việt có dấu | Rich text editor                       |
| Revision metadata       | BR-PS-123 | Lưu reviewed_by, reviewed_at, revision_notes, revision_number    | Audit trail                            |
| GV chủ trì resubmit     | BR-PS-125 | Cho phép Giảng viên chủ trì resubmit với submission_type = REVISION | Resubmission allowed                |
| Prevent approve         | BR-PS-126 | Không thể approve khóa học có submission_status = NEED_REVISION  | Business logic                         |
| Revision history        | BR-PS-127 | Tạo revision history record mỗi lần request revision             | History tracking                       |
<!--| Suggested deadline      | BR-PS-124 | Gợi ý deadline = 7 ngày từ thời điểm request revision           | Soft deadline                          | -->

---

## System rule
- Request revision operation phải atomic
- Revision_number tự động increment từ số revision trước đó
- Email retry mechanism: 3 lần với exponential backoff (1s, 3s, 9s)
- Rich text notes được sanitize trước khi lưu (XSS prevention)
- Suggested deadline không bắt buộc, chỉ là gợi ý
- Giảng viên chủ trì có thể resubmit không giới hạn số lần
- Mỗi resubmission tạo version mới của course submission
- 1 khóa học = 1 Giảng viên chủ trì-OWNER xây dựng toàn bộ nội dung

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho School Admin yêu cầu Giảng viên chủ trì chỉnh sửa nội dung khóa học kèm hướng dẫn cụ thể, tạo feedback loop hiệu quả, cải thiện chất lượng nội dung thông qua iteration**

Trọng số của story này là **5**

Story được coi là thành công khi nó đảm bảo được:
- 100% revision requests có review notes >= 20 ký tự (đảm bảo hướng dẫn rõ ràng)
- Tỷ lệ gửi email notification >= 98%
- Rich text editor hoạt động mượt mà, không có XSS vulnerabilities
- 80% Giảng viên chủ trì resubmit trong vòng suggested deadline (7 ngày)
- Trung bình 1.5 revisions/khóa học (không quá nhiều iteration)
- 90% khóa học được approve sau lần revision đầu tiên

---

## Dependencies
- **lf-course service**: Update submission_status, course_status, lưu revision notes, revision history
- **notification-service**: Gửi email thông báo revision request
- **US-PS-016**: Phải review nội dung khóa học trước khi request revision
- **US-PS-014 (GV chủ trì resubmit)**: Giảng viên chủ trì phải có khả năng resubmit khóa học

---

## Impact Analysis

- **Business Process**:
  - Feedback loop rõ ràng giữa Admin và Giảng viên chủ trì
  - Quality assurance thông qua iteration
  - Revision history giúp track improvements
  - Suggested deadline giảm thời gian chờ

- **User Experience**:
  - Rich text editor giúp hướng dẫn rõ ràng
  - Templates tiết kiệm thời gian cho Admin
  - Email notification kịp thời cho Giảng viên chủ trì
  - Clear visibility về khóa học cần sửa

- **Performance**:
  - Revision history không ảnh hưởng performance (indexed)
  - Rich text sanitization đảm bảo security
  - Email async không block operation

---

## UI/UX Design

### Request Revision Dialog
```
┌──────────────────────────────────────────┐
│  Yêu cầu chỉnh sửa khóa học              │
├──────────────────────────────────────────┤
│                                          │
│  Khóa học:                               │
│  📚 PRIV-20251210-001                    │
│  Toán nâng cao                           │
│  GV chủ trì: Nguyễn Văn A                │
│                                          │
│  Review notes * (bắt buộc):              │
│  [💡 Gợi ý lý do phổ biến ▼]             │
│  ┌────────────────────────────────────┐  │
│  │ [B] [I] [•] [1.] [🔗]              │  │
│  │                                    │  │
│  │ Cần chỉnh sửa các nội dung sau:    │  │
│  │ • Chương 1, Bài 1.1: Video chưa rõ │  │
│  │ • Chương 2, Bài 2.3: Thiếu ví dụ   │  │
│  │ • Bổ sung thêm bài tập thực hành   │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│  (180/2000 ký tự)                        │
│                                          │
│  💡 Gợi ý deadline: 7 ngày (20/12/2025)  │
│                                          │
│  Notes sẽ được gửi cho GV chủ trì qua   │
│  email và hiển thị khi họ xem feedback. │
│                                          │
│     [Hủy] [Xác nhận yêu cầu chỉnh sửa]   │
└──────────────────────────────────────────┘
```

### Common Revision Templates Dropdown
```
┌──────────────────────────────────────────┐
│  💡 Gợi ý lý do phổ biến                 │
├──────────────────────────────────────────┤
│  • Video chưa rõ ràng, cần quay lại      │
│  • Thiếu ví dụ thực tế                   │
│  • Nội dung chưa đầy đủ                  │
│  • Tài liệu bài học bị lỗi               │
│  • Bài kiểm tra/trắc nghiệm có lỗi       │
└──────────────────────────────────────────┘
```

### Success Notification
```
┌────────────────────────────────────────────────┐
│  ✓ Đã gửi yêu cầu chỉnh sửa thành công        │
├────────────────────────────────────────────────┤
│                                                │
│  Khóa học: PRIV-20251210-001 - Toán nâng cao   │
│  GV chủ trì: Nguyễn Văn A                      │
│  Status: NEED_REVISION                         │
│                                                │
│  Review notes đã được gửi qua email.           │
│  Suggested deadline: 20/12/2025                │
│                                                │
│  GV chủ trì có thể resubmit sau khi chỉnh sửa. │
│                                                │
│             [OK] [Quay lại danh sách]          │
└────────────────────────────────────────────────┘
```

**UI Behaviors**:
- Rich text editor với toolbar rõ ràng
- Character counter update real-time
- Template dropdown với hover preview
- Validation error highlight màu đỏ
- Success notification tự động close sau 5 giây

---

## Email Template

### Email: Yêu cầu chỉnh sửa khóa học

**Subject**: ⚠️ Yêu cầu chỉnh sửa khóa học - [Tên khóa học]

**Body**:
```
Chào [Tên Giảng viên chủ trì],

School Admin đã xem xét khóa học của bạn và có một số góp ý để cải thiện chất lượng.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 Khóa học: [Tên khóa học]
🔖 Mã khóa học: [Mã khóa học]
⚠️ Trạng thái: Cần chỉnh sửa 
🕐 Thời gian yêu cầu: [DD/MM/YYYY HH:MM]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Nhận xét và hướng dẫn chi tiết:

[Review notes - rich text formatted]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Chỉnh sửa và Resubmit khóa học]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Đừng lo lắng! Đây là quy trình bình thường để đảm bảo chất lượng khóa học.
Chúng tôi tin tưởng bạn sẽ cải thiện nội dung tốt hơn.

Nếu có thắc mắc, vui lòng liên hệ School Admin.

Trân trọng,
[Tên trường]
```

**Trong đó**
- [Tên khóa học]: Tên khóa học 
- [Tên Giảng viên chủ trì]: Tên giảng viên chủ trì được mời để soạn nội dung
- [Mã khóa học]: Mã khóa học
- [DD/MM/YYYY HH:MM]: Thời gian thực tế ghi nhận yêu cầu chỉnh sửa nội dung
- [Review notes - rich text formatted]: Review notes nhập khi yêu cầu chỉnh sửa nội dung
- [Chỉnh sửa và Resubmit khóa học]: link tới khóa học có nội dung cần chỉnh sửa
- [Tên trường]: Tên social school

---

## Out of Scope Item

### Business Operations:
- **Revision limit**: Giới hạn số lần revision (hiện tại unlimited - có thể thêm sau)
- **Escalation workflow**: Tự động escalate nếu Giảng viên chủ trì không sửa sau 2 tuần (automation - out of scope)

### Technical:
- **Video annotation**: Admin comment trực tiếp trên timeline video (annotation tool - phức tạp)
- **Suggested edits**: AI suggest cách sửa cụ thể (AI feature - out of scope)

### Features:
- **Revision templates library**: Admin tạo và lưu custom templates (template management - out of scope)
- **Auto-reminder**: Tự động nhắc Giảng viên chủ trì nếu quá deadline (automation - có thể làm sau)
