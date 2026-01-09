# US-PS-012 - Submit nội dung để review

## User story Title
US-PS-012 - Submit nội dung để review (Submit Content for Review)

Là một **Giảng viên chủ trì**

Tôi muốn thực hiện **submit nội dung khóa học để School Admin review và phê duyệt** tại **trang xây dựng nội dung khóa học của sản phẩm LMS**

Để **hoàn thành công việc đóng góp nội dung khóa học, chuyển giao cho School Admin review, và chờ phản hồi**

---

## Acceptance criteria

### AC-1: Happy Path - Submit nội dung lần đầu
- **Tại** trang xây dựng nội dung khóa học ở trạng thái "Bản nháp-Draft"
- **Khi** Giảng viên chủ trì nhấn "Submit review", kiểm tra nội dung đã đầy đủ (video, tài liệu, mô tả), nhập ghi chú cho reviewer (tùy chọn), sau đó nhấn "Xác nhận submit"
- **Thì** hệ thống:
  - Kiểm tra nội dung bắt buộc: video hoặc ít nhất 1 tài liệu
  - Cập nhật trạng thái submission từ **Bản nháp-Draft** sang **Đã submit**
  - Ghi nhận thời điểm submit
  - Lưu ghi chú cho reviewer (nếu có)
  - Gửi sự kiện "Giảng viên chủ trì đã submit nội dung" vào hệ thống
  - Gửi email đến School Admin của Social school thông báo "Giảng viên chủ trì [Tên] đã submit nội dung cho [Tên khóa học]" -->
  - Tạo thông báo trong LMS cho Giảng viên chủ trì
  - Hiển thị thông báo "Đã submit nội dung thành công."
  - Vô hiệu hóa chỉnh sửa (read-only) cho đến khi nhận feedback
  - Cập nhật trạng thái khóa học cộng tác = Sẵn sàng Review - Ready for review

### AC-2: Happy Path - Xem trạng thái sau khi submit
- **Tại** trang chi tiết xây dựng nội dung khóa học sau khi submit
- **Khi** Giảng viên chủ trì truy cập trang
- **Thì** hệ thống:
  - Hiển thị trạng thái submission "Đã submit"
  - Hiển thị thời điểm submit
  - Hiển thị nội dung ở chế độ xem (không thể chỉnh sửa)
  - Hiển thị nút "Rút lại submit" (nếu chưa có feedback)

### AC-3: Alternative Path - Rút lại submit trước khi được review
- **Tại** trang tiết xây dựng nội dung khóa học **Đã submit** và chưa có feedback từ Giảng viên chủ trì
- **Khi** Giảng viên chủ trì nhấn "Rút lại submit" và xác nhận
- **Thì** hệ thống:
  - Hiển thị hộp thoại xác nhận "Bạn có chắc chắn muốn rút lại submission? Bạn sẽ có thể chỉnh sửa lại."
  - Sau khi xác nhận: cập nhật trạng thái từ **Đã submit** về **Bản nháp-Draft**
  - Ghi nhận thời điểm rút lại
  - Gửi thông báo đến Social school "Giảng viên chủ trì [Tên] đã rút lại submission cho [Tên bài học]"
  - Cho phép chỉnh sửa lại nội dung
  - Hiển thị thông báo "Đã rút lại submission thành công. Bạn có thể tiếp tục chỉnh sửa."

### AC-4: Edge Case - Submit nội dung chưa đầy đủ
- **Tại** trang xây dựng nội dung khóa học
- **Khi** Giảng viên chủ trì nhấn "Submit review" nhưng nội dung chưa đầy đủ (không có chương/ không có bài học/ Không có nội dung trong bài học)
- **Thì** hệ thống:
  - Disable nút "Submit"
  - Không cho phép submit

### AC-5: Edge Case - Submit khi có tài liệu đang xử lý
- **Tại** trang xây dựng nội dung khóa học có video/audio/tài liệu/bài giảng/bài kiểm tra/bài trắc nghiệm đang xử lý (transcoding)
- **Khi** Giảng viên chủ trì nhấn "Submit review"
- **Thì** hệ thống:
  - Hiển thị cảnh báo "Có [Tên loại bài học] đang được xử lý. Bạn không thể submit nội dung. Vui lòng submit sau khi video xử lý hoàn tất."
  - Không cho phép submit với cảnh báo

### AC-6: Edge Case - Không thể rút lại submit khi đã có feedback
- **Tại** trang chi tiết xây dựng nội dung khóa học đã được Giảng viên chủ trì review, trạng thái "Đang được review - Under review"
- **Khi** Giảng viên chủ trì cố gắng rút lại submit
- **Thì** hệ thống:
  - Disable nút "Rút lại submit"
  - Hiển thị thông báo "Không thể rút lại submission vì đã nhận feedback từ Giảng viên chủ trì"

### AC-7: Error Condition - Lỗi kết nối khi submit
- **Tại** hệ thống backend khi nhấn "Xác nhận submit"
- **Khi** kết nối cơ sở dữ liệu bị lỗi
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi "Không thể submit nội dung. Vui lòng kiểm tra kết nối và thử lại"
  - Không thay đổi trạng thái draft
  - Giảng viên có thể thử lại

### AC-8: Validation - Kiểm tra quyền submit
- **Tại** hệ thống backend khi submit
- **Khen** hệ thống xử lý yêu cầu submit
- **Thì** hệ thống:
  - Kiểm tra Giảng viên chủ trì có quyền submit cho bài học này
  - Kiểm tra bài học thuộc phạm vi đóng góp
  - Nếu không hợp lệ: hiển thị lỗi "Bạn không có quyền thực hiện hành động này"

<!-- ### AC-9: Gửi thông báo đến Giảng viên chủ trì
- **Tại** dịch vụ thông báo khi nhận sự kiện "Giảng viên chủ trì đã submit nội dung"
- **Khi** sự kiện được xử lý
- **Thì** hệ thống:
  - Gửi email đến Giảng viên chủ trì với tiêu đề "Nội dung mới cần review: [Tên bài học]"
  - Email chứa: tên Giảng viên chủ trì, tên bài học, loại nội dung (video/tài liệu), ghi chú từ Giảng viên chủ trì (nếu có), nút "Review ngay"
  - Tạo thông báo ưu tiên cao trong LMS cho Giảng viên chủ trì
  - Tăng số lượng bài học cần review trong dashboard -->

---

## Inline business rule

| Trường thông tin           | Mã BR     | Business rule                                                          | Ghi chú                              |
|----------------------------|-----------|------------------------------------------------------------------------|--------------------------------------|
| Nội dung bắt buộc          | BR-PS-117 | Phải có video HOẶC ít nhất 1 tài liệu để submit                       | Validation requirement               |
| Trạng thái sau submit      | BR-PS-118 | Trạng thái chuyển từ Đang soạn thảo sang Đã submit                    | State transition                     |
| Thời điểm submit           | BR-PS-119 | Tự động ghi nhận khi submit                                            | System generated                     |
| Ghi chú cho reviewer       | BR-PS-120 | Không bắt buộc, tối đa 1000 ký tự                                      | Optional field                       |
| Read-only sau submit       | BR-PS-121 | Không cho phép chỉnh sửa sau khi submit (cho đến khi nhận feedback)   | Access control                       |
| Rút lại submit             | BR-PS-122 | Chỉ cho phép rút lại nếu chưa có feedback từ Giảng viên chủ trì       | Withdrawal rule                      |
| Tài liệu đang xử lý           | BR-PS-124 | Không cho phép submit khi tài liệu đang xử lý            | Validation with warning              |


---

## Format Email ##

### Email mời giáo viên biên soạn khóa học 

**Subject:** [Tên giảng viên] đã submit nội dung cho khóa học “[Tên khóa học]””

**Body:**
```
Chào [Social School],

Giảng viên chủ trì [Tên giảng viên] đã hoàn tất việc submit nội dung đầu tiên cho khóa học “[Tên khóa học]”.

Thông tin submit:
- Thời điểm submit: [DD/MM/YYYY HH:mm]
- Ghi chú gửi cho Reviewer (nếu có): "[Ghi chú]"

Nội dung đã được chuyển sang trạng thái **Đã submit** và đang chờ đánh giá từ bộ phận quản lý nội dung.

Bạn có thể truy cập trang quản lý khóa học để bắt đầu quá trình review.

Trân trọng,
[Social School]

```
**Trong đó:**
- [Tên khóa học]: Tên khóa học dùng để mời giảng viên
- [Tên giảng viên]: Tên giảng viên được mời
- [Tên Social School]: Tên nhà trường/ tổ chức Social School
- [DD/MM/YYYY HH:mm]: Thời gian submit nội dung
- [Tên vai trò]: Vai trò được mời: Giảng viên chủ trì
- [Ghi chú]: Ghi chú khi submit nếu có

---

## System rule
- Submit phải được xử lý trong transaction để đảm bảo tính toàn vẹn dữ liệu
- Sau khi submit, nội dung phải chuyển sang read-only
- Thông báo đến Giảng viên chủ trì phải được ưu tiên cao
- Chỉ cho phép rút lại submit nếu chưa có feedback
- Hệ thống phải track lịch sử submit/rút lại để audit

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho Giảng viên đóng góp submit nội dung để review, chuyển giao công việc cho Giảng viên chủ trì, và đảm bảo quy trình review diễn ra suôn sẻ**

Trọng số của story này là **8**

Story được coi là thành công khi nó đảm bảo được:
- 100% submission thành công sẽ gửi thông báo đến Giảng viên chủ trì
- 95% Giảng viên chủ trì bắt đầu review trong vòng 24 giờ sau khi nhận thông báo
- 0% submit nội dung không đầy đủ (validation chặt chẽ)
- 100% nội dung sau submit ở chế độ read-only
- Trung bình tỷ lệ rút lại submit < 10% (nội dung được chuẩn bị tốt trước khi submit)

---

## Dependencies
- **lf-course service**: Cập nhật trạng thái draft, quản lý submission
- **notification-service**: Gửi email và thông báo đến Giảng viên chủ trì
- **US-PS-011**: Phải có draft trước khi submit

---

## Impact Analysis
- **Giảng viên đóng góp**: Submit nội dung để review, chuyển giao công việc, chờ feedback
- **Giảng viên chủ trì**: Nhận thông báo ưu tiên cao khi có submission mới, có thể review và phản hồi
- **Quy trình cộng tác**: Chuyển từ giai đoạn tạo nội dung sang giai đoạn review
- **Notification System**: Gửi email và thông báo ưu tiên cao

---

## UI/UX Design

### Hộp thoại submit review
```
┌──────────────────────────────────────────────────────────────┐
│  📤 Submit nội dung để review                                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Bạn chuẩn bị submit nội dung cho bài học                    │
│  "Bài 3.2: Đạo hàm" để Giảng viên chủ trì review.            │
│                                                              │
│  ✓ Video: dao_ham_bai_giang.mp4 (Đã xử lý xong)              │
│  ✓ Tài liệu: 2 files                                         │
│  ✓ Mô tả: Đã cập nhật                                        │
│                                                              │
│  Ghi chú cho reviewer (không bắt buộc):                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Video đã cover đầy đủ các khái niệm cơ bản.            │ │
│  │ Tài liệu bao gồm slides và bài tập thực hành.         │ │
│  └────────────────────────────────────────────────────────┘ │
│  (0/1000 ký tự)                                              │
│                                                              │
│  ℹ️  Sau khi submit, bạn không thể chỉnh sửa cho đến khi     │
│     nhận feedback từ Giảng viên chủ trì.                    │
│                                                              │
│           [Hủy]        [Xác nhận submit]                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Thông báo submit thành công
```
┌──────────────────────────────────────────────────────────────┐
│  ✓ Submit nội dung thành công                                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Nội dung đã được gửi đến Giảng viên chủ trì để review.      │
│                                                              │
│  ✅ Giảng viên chủ trì đã nhận thông báo                      │
│  ℹ️  Bạn sẽ nhận feedback sau khi review hoàn tất            │
│                                                              │
│                     [Đóng]                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Trang bài học sau khi submit (Read-only)
```
┌─────────────────────────────────────────────────────────────────┐
│  Bài 3.2: Đạo hàm                                               │
│  Chương 3: Giải tích                                            │
│                                                                 │
│  📤 Đã submit - Đang chờ review                                 │
│  Submit: 07/12/2025 11:00 | Reviewer: Nguyễn Văn A             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  💬 Ghi chú cho reviewer:                                       │
│  "Video đã cover đầy đủ các khái niệm cơ bản..."               │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  📹 Video bài học (Read-only)                                   │
│  [dao_ham_bai_giang.mp4]                                        │
│                                                                 │
│  📄 Tài liệu bài học (2 files) (Read-only)                      │
│  • Slide bài giảng Đạo hàm                                      │
│  • Bài tập Đạo hàm                                              │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ℹ️  Nội dung đã submit không thể chỉnh sửa cho đến khi         │
│     nhận feedback từ Giảng viên chủ trì.                       │
│                                                                 │
│                  [Rút lại submit]   [Quay lại]                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Email thông báo - Giảng viên chủ trì
```
┌─────────────────────────────────────────────────────────────────┐
│  📧 Nội dung mới cần review: Bài 3.2 Đạo hàm                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Kính chào Thầy Nguyễn Văn A,                                   │
│                                                                 │
│  Giảng viên đóng góp Trần Thị B đã submit nội dung              │
│  cho bài học "Bài 3.2: Đạo hàm" và cần bạn review.              │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  📹 Video: dao_ham_bai_giang.mp4 (45:30)                   │ │
│  │  📄 Tài liệu: 2 files                                      │ │
│  │  💬 Ghi chú: "Video đã cover đầy đủ các khái niệm..."      │ │
│  │  📅 Thời điểm submit: 07/12/2025 11:00                     │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Vui lòng review và phản hồi sớm.                               │
│                                                                 │
│  ┌─────────────────────┐                                        │
│  │  Review ngay         │                                        │
│  └─────────────────────┘                                        │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống LMS                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Out of Scope Item
- **Scheduled submission**: Lên lịch submit vào thời điểm cụ thể (out of scope)
- **Partial submission**: Submit từng phần (video trước, tài liệu sau) (chỉ submit toàn bộ cho MVP)
- **Peer review**: Review bởi giảng viên khác ngoài Giảng viên chủ trì (out of scope)
- **Submission deadline reminder**: Nhắc nhở khi sắp đến deadline submit (out of scope cho MVP)
- **Submission analytics**: Thống kê thời gian từ bắt đầu đến submit (có thể làm sau)
