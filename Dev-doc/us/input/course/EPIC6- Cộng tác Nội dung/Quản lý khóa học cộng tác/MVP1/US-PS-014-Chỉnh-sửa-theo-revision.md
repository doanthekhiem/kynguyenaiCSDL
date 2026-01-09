# US-PS-014 - Chỉnh sửa nội dung theo revision từ School Admin

## User story Title
US-PS-014 - Chỉnh sửa nội dung theo revision từ School Admin (Edit Course Content Based on School Admin Revision)

Là một **Giảng viên chủ trì-OWNER**

Tôi muốn thực hiện **chỉnh sửa nội dung khóa học theo feedback yêu cầu chỉnh sửa từ School Admin của Social School** tại **trang xây dựng nội dung khóa học Individual của sản phẩm LMS**

Để **khắc phục các vấn đề được chỉ ra, hoàn thiện nội dung khóa học, và submit lại để School Admin review lần nữa**

---

## Acceptance criteria

### AC-1: Happy Path - Bắt đầu chỉnh sửa theo revision
- **Tại** trang feedback có trạng thái **Cần chỉnh sửa-NEED_REVISION**
- **Khi** Giảng viên chủ trì nhấn nút "Bắt đầu chỉnh sửa"
- **Thì** hệ thống:
  - Chuyển đến trang xây dựng nội dung khóa học
  - Bật chế độ chỉnh sửa (edit mode)
  - Hiển thị panel feedback ở bên phải với danh sách các điểm cần chỉnh sửa từ School Admin
  - Cho phép lưu draft trong quá trình chỉnh sửa

<!--### AC-2: Happy Path - Đánh dấu revision item đã hoàn thành
- **Tại** trang xây dựng nội dung khóa học có panel feedback
- **Khi** Giảng viên chủ trì hoàn thành 1 revision item và nhấn checkbox
- **Thì** hệ thống:
  - Đánh dấu item đã hoàn thành (checked)
  - Gạch ngang item đã hoàn thành
  - Cập nhật tiến độ (VD: "Đã hoàn thành: 2/3 items bắt buộc")
  - Lưu trạng thái checkbox vào draft
  - Cho phép bỏ đánh dấu nếu muốn -->

### AC-3: Happy Path - Submit lại sau khi chỉnh sửa
- **Tại** trang xây dựng nội dung khóa học sau khi hoàn thành yêu cầu chỉnh sửa
- **Khi** Giảng viên chủ trì nhấn "Submit lại cho Trường", nhập ghi chú về những gì đã chỉnh sửa (tùy chọn), sau đó nhấn "Xác nhận submit"
- **Thì** hệ thống:
  - Cập nhật trạng thái submission **"Đã submit"**
  - Ghi nhận thời điểm submit lại
  - Lưu ghi chú về những gì đã chỉnh sửa
  - Tăng số lần submit (revision number)
 - Gửi email đến School Admin "[Tên Giảng viên] đã submit lại khóa học [Tên khóa học]"
  - Gửi thông báo trong LMS cho School Admin
  - Hiển thị thông báo "Đã submit lại thành công. Đang chờ [Tên trường] review."
  - Chuyển sang chế độ read-only
  - Validate về submit Tương tự US Submit nội dung để review

### AC-4: Alternative Path - Lưu draft trong quá trình chỉnh sửa
- **Tại** trang xây dựng nội dung khóa học đang trong quá trình chỉnh sửa theo revision
- **Khi** Giảng viên chủ trì nhấn "Lưu bản nháp"
- **Thì** hệ thống:
  - Lưu tất cả thay đổi vào draft
  - Hiển thị thông báo "Đã lưu bản nháp"
  - Cho phép tiếp tục chỉnh sửa sau
  - Trạng thái submission vẫn là **Cần chỉnh sửa-NEED_REVISION**

<!-- ### AC-5: Alternative Path - Xem so sánh nội dung trước và sau chỉnh sửa
- **Tại** trang xây dựng nội dung khóa học đang chỉnh sửa
- **Khi** Giảng viên chủ trì nhấn "So sánh thay đổi" trên một phần nội dung
- **Thì** hệ thống:
  - Hiển thị nội dung phiên bản trước (lần submit gần nhất)
  - Hiển thị nội dung phiên bản hiện tại
  - Highlight các phần đã thay đổi
  - Cho phép đóng để tiếp tục chỉnh sửa 

### AC-6: Edge Case - Submit lại khi chưa hoàn thành hết revision items bắt buộc
- **Tại** trang xây dựng nội dung khóa học
- **Khi** Giảng viên chủ trì nhấn "Submit lại cho Trường" nhưng chưa đánh dấu hoàn thành hết các revision items bắt buộc
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi "Bạn chưa hoàn thành hết các điểm bắt buộc cần chỉnh sửa"
  - Highlight các items bắt buộc chưa hoàn thành
  - Không cho phép submit 

### AC-7: Edge Case - Submit lại nhiều lần (multiple revisions)
- **Tại** hệ thống khi submit lại
- **Khi** Giảng viên chủ trì submit lại lần thứ N
- **Thì** hệ thống:
  - Tăng revision number (VD: Revision 1, Revision 2, ...)
  - Lưu lịch sử tất cả các lần submit và feedback
  - Hiển thị trong email đến School Admin "Lần submit: Revision [N]"
  - School Admin có thể xem lịch sử các lần submit trước
  - Hiển thị số lần submit còn lại (nếu Trường có giới hạn) -->

### AC-8: Error Condition - Lỗi kết nối khi submit lại
- **Tại** hệ thống backend khi nhấn "Xác nhận submit"
- **Khi** kết nối cơ sở dữ liệu bị lỗi
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi "Có lỗi trong quá trình xử lý. Vui lòng thử lại"
  - Không thay đổi trạng thái submission
  - Giảng viên có thể thử lại

### AC-9: Validation - Kiểm tra nội dung đã được chỉnh sửa
- **Tại** hệ thống backend khi submit lại
- **Khi** hệ thống xử lý yêu cầu submit lại
- **Thì** hệ thống:
  - So sánh nội dung hiện tại với nội dung lần submit trước
  - Nếu không có thay đổi nào: hiển thị cảnh báo "Bạn chưa thực hiện thay đổi nào. Vẫn muốn submit lại?"
  - Nếu xác nhận: cho phép submit
  - Nếu hủy: quay lại trang chỉnh sửa

<!--### AC-10: Hiển thị tiến độ chỉnh sửa
- **Tại** trang xây dựng nội dung khóa học với panel feedback
- **Khi** Giảng viên chủ trì đang chỉnh sửa
- **Thì** hệ thống:
  - Hiển thị thanh tiến trình "Đã hoàn thành: [X]/[Y] items bắt buộc"
  - Hiển thị phần trăm hoàn thành
  - Cập nhật real-time khi đánh dấu checkbox
  - Highlight nút "Submit lại cho Trường" khi hoàn thành 100% items bắt buộc

### AC-11: Edge Case - Trường thu hồi lời mời trong quá trình chỉnh sửa
- **Tại** trang xây dựng nội dung khóa học đang chỉnh sửa
- **Khi** Social School thu hồi lời mời trong lúc Giảng viên đang chỉnh sửa
- **Thì** hệ thống:
  - Hiển thị thông báo "Trường [Tên trường] đã thu hồi lời mời. Bạn không thể submit lại cho Trường này."
  - Tự động lưu draft hiện tại
  - Khóa nút "Submit lại cho Trường"
  - Cho phép Giảng viên giữ lại nội dung đã chỉnh sửa trong hệ thống Individual
  - Chuyển khóa học về trạng thái **Bản nháp-DRAFT** và đưa về "Khóa học của tôi"-->

---

## Inline business rule

| Trường thông tin           | Mã BR     | Business rule                                                          | Ghi chú                              |
|----------------------------|-----------|------------------------------------------------------------------------|--------------------------------------|
| Trạng thái đang chỉnh sửa  | BR-PS-150 | Trạng thái = Đang chỉnh sửa-REVISING khi bắt đầu revision              | State transition                     |
| Revision items             | BR-PS-151 | Mỗi item có mức độ: Bắt buộc hoặc Gợi ý                                | Priority levels                      |
| Checkbox hoàn thành        | BR-PS-152 | Cho phép đánh dấu/bỏ đánh dấu item đã hoàn thành                       | Interactive tracking                 |
| Validation submit lại      | BR-PS-153 | Chỉ submit lại khi hoàn thành 100% items bắt buộc                      | Validation requirement               |
| Ghi chú chỉnh sửa          | BR-PS-154 | Không bắt buộc, tối đa 1000 ký tự                                      | Optional field                       |
| Revision number            | BR-PS-155 | Tăng lên 1 mỗi lần submit lại                                          | Version tracking                     |
| Lưu draft trong revision   | BR-PS-156 | Cho phép lưu draft trong quá trình chỉnh sửa                           | Draft support                        |
| So sánh thay đổi           | BR-PS-157 | Cảnh báo nếu submit lại mà không có thay đổi                           | Change detection                     |
| Tiến độ chỉnh sửa          | BR-PS-158 | Hiển thị phần trăm hoàn thành các revision items                       | Progress tracking                    |
| Giới hạn submit            | BR-PS-159 | Trường có thể cấu hình số lần submit tối đa (mặc định: không giới hạn) | Configurable limit                   |

---

## System rule
- Phải kiểm tra tất cả revision items bắt buộc hoàn thành trước khi submit lại
- Lưu lịch sử tất cả các lần submit và revision để audit
- Cho phép lưu draft trong quá trình chỉnh sửa
- Track tiến độ chỉnh sửa real-time
- Khi Trường thu hồi lời mời, Giảng viên vẫn giữ quyền sở hữu nội dung đã chỉnh sửa
- Thông báo email phải gửi ngay lập tức đến School Admin khi submit lại

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho Giảng viên chủ trì chỉnh sửa nội dung khóa học theo feedback từ School Admin một cách có hệ thống, track tiến độ chỉnh sửa, và submit lại để review, đảm bảo chất lượng nội dung cuối cùng đáp ứng yêu cầu của Trường**

Trọng số của story này là **8**

Story được coi là thành công khi nó đảm bảo được:
- 100% revision items bắt buộc được hoàn thành trước khi submit lại
- 95% Giảng viên chủ trì hoàn thành chỉnh sửa và submit lại đúng hạn (nếu có deadline)
- Trung bình số lần revision < 2 lần (nội dung được chỉnh sửa tốt ngay lần đầu)
- 90% nội dung được phê duyệt sau lần revision đầu tiên

---

## Dependencies
- **lf-course service**: Quản lý revision items, track tiến độ, lưu draft, quản lý trạng thái
- **lf-school service**: Lấy thông tin Social School và cấu hình giới hạn submit
- **notification-service**: Gửi thông báo submit lại đến School Admin
- **email-service**: Gửi email thông báo
- **US-PS-013**: Phải nhận feedback từ School Admin trước khi chỉnh sửa

---

## Impact Analysis
- **Giảng viên chủ trì**:
  - Chỉnh sửa có hệ thống theo feedback từ Trường
  - Track tiến độ hoàn thành các revision items
  - Submit lại dễ dàng
  - Giữ quyền sở hữu nội dung dù Trường thu hồi lời mời
- **School Admin (Social School)**:
  - Nhận nội dung đã chỉnh sửa theo feedback
  - Review lại nhanh hơn với thông tin rõ ràng về những gì đã thay đổi
  - Xem được lịch sử các lần submit
- **Quy trình cộng tác**:
  - Đảm bảo feedback loop hiệu quả
  - Chất lượng nội dung cuối cùng đáp ứng yêu cầu của Trường

---

## UI/UX Design

### Trang xây dựng nội dung với panel feedback
```
┌─────────────────────────────────────────────────────────────────┐
│  Khóa học: Toán nâng cao - Lớp 12                               │
│  Mã: IND-GV001-20251207-001 | Trường: THPT Nguyễn Huệ           │
│  Đang chỉnh sửa | Tiến độ: 2/3 items bắt buộc (67%)             │
├──────────────────────────────────┬──────────────────────────────┤
│                                  │  Revision Items              │
│  Cấu trúc khóa học               │  ──────────────────────────  │
│  ──────────────────────────────  │                              │
│                                  │  Trường: THPT Nguyễn Huệ     │
│  > Chương 1: Đại số (100%)       │  Reviewer: Nguyễn Văn A      │
│  > Chương 2: Giải tích           │  Review: 10/12/2025          │
│    |-- Bài 2.1 (100%)            │                              │
│    |-- Bài 2.2 (Cần sửa)         │  [!] BẮT BUỘC:               │
│    +-- Bài 2.3 (Cần sửa)         │  [x] 1. Chương 2 - Bài 2.3:  │
│  > Chương 3: Tích phân           │     Bổ sung ví dụ thực tế    │
│                                  │                              │
│  [+ Thêm chương]                 │  [x] 2. Chương 3 - Bài 3.1:  │
│                                  │     Bổ sung công thức        │
│                                  │                              │
│                                  │  [ ] 3. Bài kiểm tra cuối:   │
│                                  │     Tăng thời gian lên 90p   │
│                                  │                              │
│                                  │  [*] GỢI Ý:                  │
│                                  │  [ ] 4. Thêm bài trắc nghiệm │
│                                  │     ôn tập cuối chương       │
│                                  │                              │
│  Tiến độ: ============----       │                              │
│                                  │                              │
│  [Lưu bản nháp] [Submit lại]     │  [Thu gọn panel]             │
│                                  │                              │
└──────────────────────────────────┴──────────────────────────────┘
```

### Hộp thoại submit lại cho Trường
```
┌──────────────────────────────────────────────────────────────┐
│  Submit lại cho Trường THPT Nguyễn Huệ                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [V] Bạn đã hoàn thành tất cả điểm bắt buộc                  │
│                                                              │
│  Khóa học: Toán nâng cao - Lớp 12                            │
│  Mã: IND-GV001-20251207-001                                  │
│  Lần submit: Revision 1                                      │
│                                                              │
│  Danh sách đã chỉnh sửa:                                     │
│  [V] Chương 2 - Bài 2.3: Đã bổ sung ví dụ thực tế            │
│  [V] Chương 3 - Bài 3.1: Đã bổ sung công thức                │
│  [V] Bài kiểm tra: Đã tăng thời gian lên 90 phút             │
│                                                              │
│  Ghi chú về những gì đã chỉnh sửa (không bắt buộc):          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ - Bổ sung 3 ví dụ thực tế về ứng dụng đạo hàm          │ │
│  │ - Thêm công thức tích phân từng phần với giải thích    │ │
│  │ - Điều chỉnh thời gian bài kiểm tra từ 60 lên 90 phút  │ │
│  └────────────────────────────────────────────────────────┘ │
│  (156/1000 ký tự)                                            │
│                                                              │
│           [Hủy]        [Xác nhận submit]                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Thông báo submit thành công
```
┌──────────────────────────────────────────────────────────────┐
│  Đã submit lại thành công                                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Khóa học "Toán nâng cao - Lớp 12" đã được gửi đến           │
│  Trường THPT Nguyễn Huệ để review.                           │
│                                                              │
│  Lần submit: Revision 1                                      │
│  Thời điểm: 12/12/2025 10:30                                 │
│                                                              │
│  School Admin sẽ nhận được thông báo và review               │
│  nội dung của bạn trong thời gian sớm nhất.                  │
│                                                              │
│                       [Đóng]                                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Email thông báo đến School Admin
```
┌─────────────────────────────────────────────────────────────────┐
│  Subject: [Revision 1] Giảng viên đã chỉnh sửa và submit lại   │
│           khóa học - Toán nâng cao - Lớp 12                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Logo LMS]                                                     │
│                                                                 │
│  Kính chào Admin,                                               │
│                                                                 │
│  Giảng viên Trần Văn B đã chỉnh sửa nội dung khóa học           │
│  theo feedback của bạn và submit lại.                           │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  Khóa học: Toán nâng cao - Lớp 12                         │ │
│  │  Mã khóa học: IND-GV001-20251207-001                      │ │
│  │  Giảng viên: Trần Văn B                                   │ │
│  │                                                            │ │
│  │  ════════════════════════════════════════════════════     │ │
│  │                                                            │ │
│  │  Lần submit: Revision 1                                   │ │
│  │  Thời điểm: 12/12/2025 10:30                              │ │
│  │                                                            │ │
│  │  ════════════════════════════════════════════════════     │ │
│  │                                                            │ │
│  │  Các điểm đã chỉnh sửa:                                    │ │
│  │  [V] Chương 2 - Bài 2.3: Bổ sung ví dụ thực tế            │ │
│  │  [V] Chương 3 - Bài 3.1: Bổ sung công thức                │ │
│  │  [V] Bài kiểm tra: Tăng thời gian lên 90 phút             │ │
│  │                                                            │ │
│  │  Ghi chú từ Giảng viên:                                    │ │
│  │  "Bổ sung 3 ví dụ thực tế về ứng dụng đạo hàm.            │ │
│  │   Thêm công thức tích phân từng phần..."                  │ │
│  │                                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Vui lòng review lại nội dung đã chỉnh sửa.                     │
│                                                                 │
│           ┌─────────────────────────┐                           │
│           │    Review ngay          │                           │
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

### Thông báo khi Trường thu hồi lời mời trong quá trình chỉnh sửa
```
┌──────────────────────────────────────────────────────────────┐
│  Trường đã thu hồi lời mời                                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Trường THPT Nguyễn Huệ đã thu hồi lời mời hợp tác.          │
│  Bạn không thể submit lại cho Trường này.                    │
│                                                              │
│  Tuy nhiên, khóa học này vẫn thuộc về bạn:                   │
│  - Mã khóa học: IND-GV001-20251207-001                       │
│  - Nội dung đã chỉnh sửa được giữ lại                        │
│  - Khóa học sẽ được chuyển về "Khóa học của tôi"             │
│                                                              │
│  Bạn có thể sử dụng nội dung này để hợp tác với              │
│  Trường khác hoặc sử dụng cho mục đích cá nhân.              │
│                                                              │
│                  [Đã hiểu]                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Trang Quản lý khóa học - Hiển thị trạng thái đang chỉnh sửa
```
┌─────────────────────────────────────────────────────────────────┐
│  Khóa học đang cộng tác                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Toán nâng cao - Lớp 12                                     │ │
│  │    Mã: IND-GV001-20251207-001                             │ │
│  │    Trường: THPT Nguyễn Huệ                                │ │
│  │    Trạng thái: Đang chỉnh sửa                             │ │
│  │    Tiến độ revision: 2/3 items (67%)                      │ │
│  │    Hạn chót: 17/12/2025 (còn 5 ngày)                      │ │
│  │                                                            │ │
│  │                      [Tiếp tục chỉnh sửa]                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Out of Scope Item
- **AI-powered revision suggestions**: AI gợi ý cách chỉnh sửa (out of scope)
- **Side-by-side comparison view**: So sánh trực quan toàn bộ nội dung cũ và mới (có thể làm sau)
- **Revision approval per item**: Approval từng revision item riêng lẻ (chỉ approval toàn bộ cho MVP)
- **Automated quality check**: Kiểm tra tự động chất lượng nội dung trước khi submit lại (out of scope)
- **Conversation thread**: Trao đổi qua lại về từng revision item (có thể làm sau)
- **Revision templates**: Template cho các loại revision phổ biến (out of scope)
