# US-PS-013 - Xem feedback review từ School Admin

## User story Title
US-PS-013 - Xem feedback review từ School Admin (View Review Feedback from School Admin)

Là một **Giảng viên chủ trì-OWNER**

Tôi muốn thực hiện **xem feedback từ School Admin của Social School sau khi họ review nội dung khóa học** tại **trang Quản lý nội dung khóa học Individual của sản phẩm LMS**

Để **hiểu ý kiến đánh giá từ phía Trường, biết nội dung được phê duyệt hay cần chỉnh sửa, và thực hiện hành động tiếp theo phù hợp**

---

## Acceptance criteria

### AC-1: Happy Path - Nhận thông báo khi có feedback mới từ School Admin
- **Tại** hệ thống LMS và email cá nhân của Giảng viên chủ trì
- **Khi** School Admin của Social School hoàn tất review và gửi feedback
- **Thì** hệ thống:
  - Gửi email đến Giảng viên chủ trì với tiêu đề "[Tên trường] đã gửi feedback cho khóa học [Tên khóa học]"
  - Tạo thông báo trong LMS "Bạn có feedback mới từ [Tên trường] cho khóa học [Tên khóa học]"
  - Email chứa: kết quả review (Đã phê duyệt/Cần chỉnh sửa/Từ chối), feedback tóm tắt, nút "Xem chi tiết"
  - Hiển thị badge thông báo chưa đọc trên icon thông báo
  - Hiển thị indicator "Có feedback mới" trên khóa học tại trang Quản lý nội dung

### AC-2: Happy Path - Xem feedback phê duyệt (Approved) từ School Admin
- **Tại** trang chi tiết khóa học Individual có trạng thái submission là **Đã phê duyệt**
- **Khi** Giảng viên chủ trì truy cập trang sau khi nhận thông báo feedback
- **Thì** hệ thống:
  - Hiển thị trạng thái submission là "Đã phê duyệt-APPROVED"
  - Hiển thị thông tin reviewer (School Admin), tên trường, thời điểm review
  - Hiển thị feedback từ School Admin (lời nhận xét, đánh giá)
  - Cập nhật trạng thái khóa học thành **Nội dung đã duyệt-CONTENT_APPROVED**
  - Hiển thị thông báo "Chúc mừng! Nội dung khóa học của bạn đã được [Tên trường] phê duyệt."

### AC-3: Happy Path - Xem feedback yêu cầu chỉnh sửa (Revision Requested) từ School Admin
- **Tại** trang chi tiết khóa học Individual có trạng thái submission là "Đang được review-Under review" 
- **Khi** School admin gửi feedback và yêu cầu chỉnh sửa. Và Giảng viên chủ trì truy cập trang sau khi nhận thông báo feedback
- **Thì** hệ thống:
  - Hiển thị thông tin reviewer (School Admin), tên trường, thời điểm review
  - Hiển thị feedback chi tiết từ School Admin
  - Cập nhật trạng thái submission thành **Cần chỉnh sửa-Need revision**
  - Cho phép chỉnh sửa lại nội dung (bật chế độ edit)
  - Hiển thị nút "Bắt đầu chỉnh sửa"

### AC-4: Alternative Path - Xem lịch sử feedback từ Social School
- **Tại** trang chi tiết khóa học có nhiều lần submit và review
- **Khi** Giảng viên chủ trì nhấn "Xem lịch sử feedback"
- **Thì** hệ thống:
  - Hiển thị danh sách tất cả các lần submit và feedback theo thời gian (mới nhất trước)
  - Mỗi entry hiển thị:
    - Thời điểm submit
    - Thời điểm review
    - Reviewer (School Admin)
    - Kết quả review
    - Feedback tóm tắt
  - Cho phép xem chi tiết từng feedback
  - Highlight feedback hiện tại (mới nhất)

<!-- ### AC-5: Alternative Path - Xem feedback theo từng phần nội dung
- **Tại** trang chi tiết feedback khi School Admin comment theo từng chương/bài học
- **Khi** Giảng viên chủ trì muốn xem feedback chi tiết theo cấu trúc khóa học
- **Thì** hệ thống:
  - Hiển thị cây cấu trúc khóa học (chương > bài học)
  - Hiển thị icon feedback bên cạnh chương/bài học có comment
  - Cho phép nhấn vào từng phần để xem feedback cụ thể
  - Hiển thị checklist các mục cần chỉnh sửa theo từng phần -->

### AC-6: Edge Case - Chưa có feedback (đang được School Admin review)
- **Tại** trang chi tiết khóa học đã submit 
- **Khi** Giảng viên chủ trì truy cập trang, và School bắt đầu review
- **Thì** hệ thống:
  - Hiển thị trạng thái submission là "Đang được review - Under review"
  - Không hiển thị nút "Rút lại submit" 
  - Không hiển thị feedback (vì chưa có)

### AC-7: Edge Case - Feedback từ chối (Rejected) từ School Admin
- **Tại** trang chi tiết khóa học bị School admin từ chối
- **Khi** Giảng viên chủ trì xem feedback từ chối
- **Thì** hệ thống:
  - Hiển thị lý do từ chối chi tiết từ School Admin
  - Cập nhật trạng thái submission thành **Đã từ chối-REJECTED**
  - Cho phép chỉnh sửa và submit lại
  - Hiển thị gợi ý "Vui lòng đọc kỹ feedback và chỉnh sửa lại toàn bộ nội dung"

<!-- ### AC-8: Edge Case - Feedback cho khóa học bị thu hồi liên kết
- **Tại** trang chi tiết khóa học đã có feedback nhưng Trường thu hồi lời mời
- **Khi** Giảng viên chủ trì xem feedback
- **Thì** hệ thống:
  - Vẫn hiển thị feedback đã nhận (để tham khảo)
  - Hiển thị thông báo "Liên kết với [Tên trường] đã bị thu hồi"
  - Khóa nút "Submit lại" (không thể submit cho Trường này nữa)
  - Giữ nguyên nội dung khóa học trong hệ thống Individual -->

### AC-9: Error Condition - Lỗi load feedback
- **Tại** trang chi tiết khóa học khi load feedback
- **Khi** hệ thống không thể load feedback từ cơ sở dữ liệu
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi "Không thể tải feedback. Vui lòng thử lại"
  - Hiển thị nút "Thử lại"
  - Giữ nguyên thông tin cơ bản của khóa học

### AC-10: Validation - Đánh dấu feedback đã đọc
- **Tại** trang chi tiết feedback
- **Khi** Giảng viên chủ trì xem feedback
- **Thì** hệ thống:
  - Tự động đánh dấu feedback đã đọc
  - Xóa badge thông báo chưa đọc
  - Ghi nhận thời điểm đọc feedback
  - Xóa indicator "Có feedback mới" trên khóa học

---

## Inline business rule

| Trường thông tin           | Mã BR     | Business rule                                                          | Ghi chú                              |
|----------------------------|-----------|------------------------------------------------------------------------|--------------------------------------|
| Kết quả review             | BR-PS-140 | Các kết quả hợp lệ: Đã phê duyệt-APPROVED, Cần chỉnh sửa-NEED REVISION, Đã từ chối-REJECTED | Review result options |
| Feedback nội dung          | BR-PS-141 | Bắt buộc nhập feedback khi review (School Admin phải comment)          | Required field                       |
| Đánh dấu đã đọc            | BR-PS-144 | Tự động đánh dấu khi xem feedback                                      | Read tracking                        |
| Thông báo feedback mới     | BR-PS-145 | Gửi email và thông báo LMS khi có feedback mới từ School Admin         | Notification requirement             |
| Lịch sử feedback           | BR-PS-146 | Lưu tất cả feedback qua các lần submit                                 | History tracking                     |

---

## System rule
- Feedback phải được gửi thông báo ngay lập tức đến Giảng viên chủ trì qua email và LMS
- Hệ thống phải track thời điểm đọc feedback để biết Giảng viên đã xem chưa
- Feedback phải được lưu vĩnh viễn để audit và tham khảo
- Feedback từ Social School thuộc về mối quan hệ cộng tác, không ảnh hưởng đến quyền sở hữu khóa học Individual
- Khi liên kết bị thu hồi, feedback vẫn được giữ lại trong lịch sử

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho Giảng viên chủ trì nhận và hiểu feedback từ School Admin của Social School, biết nội dung được phê duyệt hay cần chỉnh sửa, và thực hiện hành động tiếp theo phù hợp**

Trọng số của story này là **8**

Story được coi là thành công khi nó đảm bảo được:
- 100% feedback được gửi thông báo đến Giảng viên chủ trì
- 95% Giảng viên chủ trì xem feedback trong vòng 24 giờ sau khi nhận thông báo
- 100% feedback được lưu và hiển thị chính xác
- 90% Giảng viên hiểu rõ yêu cầu chỉnh sửa (đo qua số lần submit lại giảm)

---

## Dependencies
- **lf-course service**: Load và hiển thị feedback, quản lý trạng thái khóa học
- **lf-school service**: Lấy thông tin Social School và School Admin
- **notification-service**: Gửi thông báo feedback mới
- **email-service**: Gửi email thông báo
- **US-PS-012**: Phải submit khóa học trước khi có feedback

---

## Impact Analysis
- **Giảng viên chủ trì**:
  - Nhận feedback rõ ràng từ phía Trường
  - Hiểu yêu cầu chỉnh sửa
  - Biết tiến độ phê duyệt
- **School Admin (Social School)**:
  - Feedback được truyền đạt hiệu quả
  - Có thể tracking Giảng viên đã xem feedback chưa
- **Quy trình cộng tác**:
  - Đảm bảo feedback loop hoạt động tốt
  - Cải thiện chất lượng nội dung qua các lần review

---

## UI/UX Design

### Trang feedback - Đã phê duyệt
```
┌─────────────────────────────────────────────────────────────────┐
│  Khóa học: Toán nâng cao - Lớp 12                               │
│  Mã: IND-GV001-20251207-001                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Đã phê duyệt                                                   │
│  ════════════════════════════════════════════════════════════   │
│                                                                 │
│  Trường: THPT Nguyễn Huệ                                        │
│  Reviewer: Nguyễn Văn A (School Admin)                          │
│  Thời điểm review: 10/12/2025 15:00                             │
│  Rating: ***** (5/5)                                            │
│                                                                 │
│  Feedback:                                                      │
│  ────────────────────────────────────────────────────────────   │
│  "Nội dung khóa học rất tốt, phù hợp với chương trình giảng     │
│   dạy của Trường. Video bài giảng chất lượng, rõ ràng.          │
│   Tài liệu đầy đủ và bài tập phong phú. Chúc mừng!"             │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Chúc mừng! Nội dung khóa học của bạn đã được                   │
│  Trường THPT Nguyễn Huệ phê duyệt.                              │
│                                                                 │
│  Bước tiếp theo: Khóa học sẽ được đưa vào hệ thống của Trường.  │
│                                                                 │
│  [Xem nội dung]  [Xem lịch sử]  [Quay lại]                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Trang feedback - Yêu cầu chỉnh sửa
```
┌─────────────────────────────────────────────────────────────────┐
│  Khóa học: Toán nâng cao - Lớp 12                               │
│  Mã: IND-GV001-20251207-001                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Yêu cầu chỉnh sửa                                              │
│  ════════════════════════════════════════════════════════════   │
│                                                                 │
│  Trường: THPT Nguyễn Huệ                                        │
│  Reviewer: Nguyễn Văn A (School Admin)                          │
│  Thời điểm review: 10/12/2025 15:00                             │
│  Hạn chót chỉnh sửa: 17/12/2025                                 │
│                                                                 │
│  Feedback tổng quan:                                            │
│  ────────────────────────────────────────────────────────────   │
│  "Nội dung cơ bản tốt nhưng cần chỉnh sửa một số điểm để        │
│   phù hợp với chuẩn đầu ra của Trường."                         │
│                                                                 │
│  Các điểm cần chỉnh sửa:                                        │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  [!] BẮT BUỘC:                                                  │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ 1. Chương 2 - Bài 2.3: Video cần bổ sung ví dụ thực tế    │ │
│  │    về ứng dụng đạo hàm trong đời sống (15-20 phút)        │ │
│  │                                                            │ │
│  │ 2. Chương 3 - Bài 3.1: Slide bài giảng thiếu công thức    │ │
│  │    tích phân từng phần. Cần bổ sung.                      │ │
│  │                                                            │ │
│  │ 3. Bài kiểm tra cuối khóa: Thời gian làm bài 60 phút      │ │
│  │    là quá ngắn. Đề nghị tăng lên 90 phút.                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [*] GỢI Ý:                                                     │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ 4. Chương 1: Nên thêm bài trắc nghiệm ôn tập cuối chương  │ │
│  │    để học sinh tự đánh giá.                               │ │
│  │                                                            │ │
│  │ 5. Tài liệu bổ sung: Nên thêm link đến các bài giảng      │ │
│  │    tham khảo trên YouTube/Khan Academy.                   │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  [Xem lịch sử]  [Bắt đầu chỉnh sửa]  [Quay lại]                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Trang feedback - Từ chối
```
┌─────────────────────────────────────────────────────────────────┐
│  Khóa học: Toán nâng cao - Lớp 12                               │
│  Mã: IND-GV001-20251207-001                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Đã từ chối                                                     │
│  ════════════════════════════════════════════════════════════   │
│                                                                 │
│  Trường: THPT Nguyễn Huệ                                        │
│  Reviewer: Nguyễn Văn A (School Admin)                          │
│  Thời điểm review: 10/12/2025 15:00                             │
│                                                                 │
│  Lý do từ chối:                                                 │
│  ────────────────────────────────────────────────────────────   │
│  "Nội dung khóa học chưa đáp ứng được yêu cầu chất lượng        │
│   của Trường. Cần xây dựng lại toàn bộ phần video bài giảng     │
│   với chất lượng cao hơn (âm thanh rõ, hình ảnh sắc nét).       │
│   Tài liệu cần được biên soạn lại theo chuẩn của Trường."       │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Vui lòng đọc kỹ feedback và chỉnh sửa lại nội dung.            │
│  Bạn có thể submit lại sau khi hoàn thành chỉnh sửa.            │
│  Số lần submit còn lại: 2                                       │
│                                                                 │
│  [Xem lịch sử]  [Bắt đầu chỉnh sửa]  [Quay lại]                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Trang lịch sử feedback
```
┌─────────────────────────────────────────────────────────────────┐
│  Lịch sử feedback - Khóa học: Toán nâng cao - Lớp 12            │
│  Trường liên kết: THPT Nguyễn Huệ                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ [*] Lần 3 (Hiện tại)                                       │ │
│  │     Submit: 09/12/2025 10:00                              │ │
│  │     Review: 10/12/2025 15:00                              │ │
│  │     Kết quả: Đã phê duyệt                                 │ │
│  │     Reviewer: Nguyễn Văn A                                │ │
│  │                                      [Xem chi tiết]       │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Lần 2                                                      │ │
│  │     Submit: 05/12/2025 14:00                              │ │
│  │     Review: 06/12/2025 09:30                              │ │
│  │     Kết quả: Yêu cầu chỉnh sửa                            │ │
│  │     Reviewer: Nguyễn Văn A                                │ │
│  │     Feedback: "Cần bổ sung ví dụ thực tế..."              │ │
│  │                                      [Xem chi tiết]       │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Lần 1                                                      │ │
│  │     Submit: 01/12/2025 16:00                              │ │
│  │     Review: 02/12/2025 11:00                              │ │
│  │     Kết quả: Yêu cầu chỉnh sửa                            │ │
│  │     Reviewer: Nguyễn Văn A                                │ │
│  │     Feedback: "Video chất lượng chưa đạt..."              │ │
│  │                                      [Xem chi tiết]       │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│                              [Đóng]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Email Template

### Email thông báo feedback - Đã phê duyệt
```
┌─────────────────────────────────────────────────────────────────┐
│  Subject: [THPT Nguyễn Huệ] Khóa học của bạn đã được phê duyệt  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Logo LMS]                                                     │
│                                                                 │
│  Kính chào Thầy/Cô Trần Văn B,                                  │
│                                                                 │
│  Chúc mừng! Khóa học của bạn đã được phê duyệt.                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  Khóa học: Toán nâng cao - Lớp 12                         │ │
│  │  Mã khóa học: IND-GV001-20251207-001                      │ │
│  │  Trường: THPT Nguyễn Huệ                                  │ │
│  │                                                            │ │
│  │  ════════════════════════════════════════════════════     │ │
│  │                                                            │ │
│  │  [V] Kết quả: ĐÃ PHÊ DUYỆT                                │ │
│  │                                                            │ │
│  │  ════════════════════════════════════════════════════     │ │
│  │                                                            │ │
│  │  Reviewer: Nguyễn Văn A (School Admin)                    │ │
│  │  Thời điểm: 10/12/2025 15:00                              │ │
│  │  Rating: ***** (5/5)                                      │ │
│  │                                                            │ │
│  │  Feedback:                                                 │ │
│  │  "Nội dung khóa học rất tốt, phù hợp với chương trình     │ │
│  │   giảng dạy của Trường. Chúc mừng!"                       │ │
│  │                                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Bước tiếp theo:                                                │
│  Khóa học của bạn sẽ được đưa vào hệ thống đào tạo của         │
│  Trường THPT Nguyễn Huệ trong thời gian sớm nhất.              │
│                                                                 │
│           ┌─────────────────────────┐                           │
│           │    Xem chi tiết         │                           │
│           └─────────────────────────┘                           │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống LMS                                                   │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│  Email này được gửi tự động. Vui lòng không trả lời.            │
│  Nếu cần hỗ trợ, liên hệ: support@lms.edu.vn                   │
└─────────────────────────────────────────────────────────────────┘
```

### Email thông báo feedback - Yêu cầu chỉnh sửa
```
┌─────────────────────────────────────────────────────────────────┐
│  Subject: [THPT Nguyễn Huệ] Khóa học cần chỉnh sửa -            │
│           Toán nâng cao - Lớp 12                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Logo LMS]                                                     │
│                                                                 │
│  Kính chào Thầy/Cô Trần Văn B,                                  │
│                                                                 │
│  School Admin của Trường THPT Nguyễn Huệ đã review khóa học     │
│  của bạn và có một số góp ý cần chỉnh sửa.                      │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  Khóa học: Toán nâng cao - Lớp 12                         │ │
│  │  Mã khóa học: IND-GV001-20251207-001                      │ │
│  │  Trường: THPT Nguyễn Huệ                                  │ │
│  │                                                            │ │
│  │  ════════════════════════════════════════════════════     │ │
│  │                                                            │ │
│  │  [!] Kết quả: YÊU CẦU CHỈNH SỬA                           │ │
│  │                                                            │ │
│  │  ════════════════════════════════════════════════════     │ │
│  │                                                            │ │
│  │  Reviewer: Nguyễn Văn A (School Admin)                    │ │
│  │  Thời điểm: 10/12/2025 15:00                              │ │
│  │  Hạn chót chỉnh sửa: 17/12/2025                           │ │
│  │                                                            │ │
│  │  Feedback:                                                 │ │
│  │  "Nội dung cơ bản tốt nhưng cần chỉnh sửa một số điểm..." │ │
│  │                                                            │ │
│  │  ──────────────────────────────────────────────────────   │ │
│  │                                                            │ │
│  │  Các điểm cần chỉnh sửa:                                   │ │
│  │                                                            │ │
│  │  [!] BẮT BUỘC:                                             │ │
│  │  1. Chương 2 - Bài 2.3: Bổ sung ví dụ thực tế             │ │
│  │  2. Chương 3 - Bài 3.1: Bổ sung công thức tích phân       │ │
│  │  3. Bài kiểm tra: Tăng thời gian lên 90 phút              │ │
│  │                                                            │ │
│  │  [*] GỢI Ý:                                                │ │
│  │  4. Thêm bài trắc nghiệm ôn tập cuối chương               │ │
│  │  5. Thêm link tài liệu tham khảo                          │ │
│  │                                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Vui lòng chỉnh sửa và submit lại trước ngày 17/12/2025.        │
│                                                                 │
│           ┌─────────────────────────┐                           │
│           │    Xem chi tiết         │                           │
│           └─────────────────────────┘                           │
│                                                                 │
│           ┌─────────────────────────┐                           │
│           │  Bắt đầu chỉnh sửa      │                           │
│           └─────────────────────────┘                           │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống LMS                                                   │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│  Email này được gửi tự động. Vui lòng không trả lời.            │
│  Nếu cần hỗ trợ, liên hệ: support@lms.edu.vn                   │
└─────────────────────────────────────────────────────────────────┘
```

### Email thông báo feedback - Từ chối
```
┌─────────────────────────────────────────────────────────────────┐
│  Subject: [THPT Nguyễn Huệ] Khóa học chưa được phê duyệt -      │
│           Toán nâng cao - Lớp 12                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Logo LMS]                                                     │
│                                                                 │
│  Kính chào Thầy/Cô Trần Văn B,                                  │
│                                                                 │
│  School Admin của Trường THPT Nguyễn Huệ đã review khóa học     │
│  của bạn. Rất tiếc, khóa học chưa đáp ứng được yêu cầu.         │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  Khóa học: Toán nâng cao - Lớp 12                         │ │
│  │  Mã khóa học: IND-GV001-20251207-001                      │ │
│  │  Trường: THPT Nguyễn Huệ                                  │ │
│  │                                                            │ │
│  │  ════════════════════════════════════════════════════     │ │
│  │                                                            │ │
│  │  [X] Kết quả: CHƯA ĐƯỢC PHÊ DUYỆT                         │ │
│  │                                                            │ │
│  │  ════════════════════════════════════════════════════     │ │
│  │                                                            │ │
│  │  Reviewer: Nguyễn Văn A (School Admin)                    │ │
│  │  Thời điểm: 10/12/2025 15:00                              │ │
│  │                                                            │ │
│  │  Lý do:                                                    │ │
│  │  "Nội dung khóa học chưa đáp ứng được yêu cầu chất lượng  │ │
│  │   của Trường. Cần xây dựng lại toàn bộ phần video bài     │ │
│  │   giảng với chất lượng cao hơn. Tài liệu cần được biên    │ │
│  │   soạn lại theo chuẩn của Trường."                        │ │
│  │                                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Bạn có thể chỉnh sửa và submit lại khóa học.                   │
│  Số lần submit còn lại: 2                                       │
│                                                                 │
│           ┌─────────────────────────┐                           │
│           │    Xem chi tiết         │                           │
│           └─────────────────────────┘                           │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Nếu cần trao đổi thêm, vui lòng liên hệ trực tiếp với          │
│  Trường THPT Nguyễn Huệ qua hệ thống LMS.                       │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống LMS                                                   │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│  Email này được gửi tự động. Vui lòng không trả lời.            │
│  Nếu cần hỗ trợ, liên hệ: support@lms.edu.vn                   │
└─────────────────────────────────────────────────────────────────┘
```

### Email nhắc nhở deadline chỉnh sửa
```
┌─────────────────────────────────────────────────────────────────┐
│  Subject: [Nhắc nhở] Còn 2 ngày để chỉnh sửa khóa học -         │
│           Toán nâng cao - Lớp 12                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Logo LMS]                                                     │
│                                                                 │
│  Kính chào Thầy/Cô Trần Văn B,                                  │
│                                                                 │
│  Đây là email nhắc nhở về deadline chỉnh sửa khóa học.          │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  Khóa học: Toán nâng cao - Lớp 12                         │ │
│  │  Trường: THPT Nguyễn Huệ                                  │ │
│  │                                                            │ │
│  │  [!] Hạn chót chỉnh sửa: 17/12/2025 (còn 2 ngày)          │ │
│  │                                                            │ │
│  │  Trạng thái: Yêu cầu chỉnh sửa                            │ │
│  │                                                            │ │
│  │  Các điểm cần hoàn thành:                                  │ │
│  │  [ ] Chương 2 - Bài 2.3: Bổ sung ví dụ thực tế            │ │
│  │  [ ] Chương 3 - Bài 3.1: Bổ sung công thức                │ │
│  │  [ ] Bài kiểm tra: Điều chỉnh thời gian                   │ │
│  │                                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Vui lòng hoàn thành chỉnh sửa và submit lại trước deadline.    │
│                                                                 │
│           ┌─────────────────────────┐                           │
│           │  Tiếp tục chỉnh sửa     │                           │
│           └─────────────────────────┘                           │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống LMS                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Out of Scope Item
- **Video/Audio feedback**: Feedback bằng video hoặc audio thay vì văn bản (out of scope)
- **Inline comments**: Comment trực tiếp lên video hoặc tài liệu tại vị trí cụ thể (có thể làm sau)
- **Feedback template**: Template feedback có sẵn cho School Admin (out of scope)
- **Feedback analytics**: Thống kê feedback để cải thiện chất lượng (có thể làm sau)
- **Trả lời feedback (Comment back)**: Giảng viên comment lại để trao đổi với School Admin (có thể làm sau)
- **Real-time notification**: Thông báo real-time qua WebSocket (chỉ hỗ trợ email và notification LMS)
