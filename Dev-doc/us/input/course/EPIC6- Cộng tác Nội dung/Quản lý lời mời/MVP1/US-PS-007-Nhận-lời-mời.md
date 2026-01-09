# US-PS-007 - Nhận lời mời

## User story Title
US-PS-007 - Nhận lời mời (Receive Invitation)

Là một **Giảng viên tự do**
Tôi muốn thực hiện **nhận và xem lời mời tham gia đóng góp nội dung cho khóa học** tại **email cá nhân và trang Thông báo của sản phẩm SMS**
Để **được thông báo về cơ hội cộng tác, hiểu rõ vai trò và phạm vi công việc được phân công, và quyết định có tham gia hay không**

---

## Acceptance criteria

### AC-1: Happy Path - Nhận email lời mời với vai trò Giảng viên chủ trì
- **Tại** hộp thư email cá nhân của giảng viên tự do
- **Khi** School Admin gửi lời mời với vai trò **Giảng viên chủ trì** cho khóa học
- **Thì** hệ thống:
  - Gửi email đến địa chỉ email của giảng viên với tiêu đề "Mời bạn tham gia đóng góp nội dung cho khóa học [Tên khóa học]"
  - Email chứa thông tin: tên khóa học, tên trường, lời nhắn từ School Admin (nếu có), vai trò được phân công (Giảng viên chủ trì), quyền truy cập (toàn bộ khóa học), ngày hết hạn lời mời (7 ngày kể từ ngày gửi), nút "Chấp nhận lời mời" và nút "Từ chối lời mời"
  - Đường dẫn trong email có chứa mã lời mời duy nhất (định dạng: INV-[Năm]-[Mã ngẫu nhiên 8 ký tự])
  - Hiển thị đếm ngược thời gian còn lại (VD: "Còn 7 ngày")

### AC-2: Happy Path - Nhận email lời mời với vai trò Giảng viên đóng góp (OUT OF SCOPE)
- **Tại** hộp thư email cá nhân của giảng viên tự do
- **Khi** School Admin gửi lời mời với vai trò **Giảng viên đóng góp** cho khóa học
- **Thì** hệ thống:
  - Gửi email đến địa chỉ email của giảng viên với tiêu đề "Mời bạn tham gia đóng góp nội dung cho khóa học [Tên khóa học]"
  - Email chứa thông tin: tên khóa học, tên trường, lời nhắn từ School Admin (nếu có), vai trò được phân công (Giảng viên đóng góp), phạm vi đóng góp cụ thể (danh sách chương/bài học được phân công, danh sách quyền được cấp), ngày hết hạn lời mời (7 ngày), nút "Chấp nhận lời mời" và nút "Từ chối lời mời"
  - Đường dẫn trong email có chứa mã lời mời duy nhất
  - Hiển thị rõ ràng phạm vi được phép đóng góp (VD: "Bạn được phân công đóng góp cho Chương 3: Giải tích - Bài 3.1, 3.2, 3.3 với quyền Tải video, Tải audio và Thêm tài liệu")

### AC-3: Happy Path - Xem thông báo lời mời trong hệ thống SMS
- **Tại** trang Thông báo trong sản phẩm SMS
- **Khi** giảng viên đăng nhập vào hệ thống SMS sau khi được gửi lời mời
- **Thì** hệ thống:
  - Hiển thị thông báo mới "Bạn có lời mời tham gia giảng dạy khóa học [Tên khóa học]"
  - Thông báo chứa thông tin: tên khóa học, tên trường, vai trò, phạm vi đóng góp (nếu là Giảng viên đóng góp), thời gian còn lại để phản hồi, nút "Xem chi tiết"
  - Khi nhấn "Xem chi tiết": chuyển đến trang chi tiết lời mời với đầy đủ thông tin và các nút "Chấp nhận" hoặc "Từ chối"

### AC-4: Alternative Path - Nhận lời mời khi đã trở thành INDIVIDUAL
- **Tại** hệ thống SMS khi gửi email lời mời
- **Khi** giảng viên được mời đã có tài khoản trong hệ thống SMS
- **Thì** hệ thống:
  - Gửi email lời mời như bình thường
  - Tạo thông báo trong hệ thống SMS (in-app notification)
  - Hiển thị badge thông báo chưa đọc trên icon thông báo
  - Khi giảng viên nhấn vào đường dẫn trong email hoặc thông báo: tự động đăng nhập (nếu chưa đăng nhập) và chuyển đến trang chi tiết lời mời

<!--### AC-5: Alternative Path - Nhận lời mời khi chưa có tài khoản SMS
- **Tại** hệ thống SMS khi gửi email lời mời
- **Khi** giảng viên được mời chưa có tài khoản trong hệ thống SMS
- **Thì** hệ thống:
  - Gửi email lời mời với nội dung bổ sung hướng dẫn tạo tài khoản
  - Khi giảng viên nhấn vào đường dẫn trong email: chuyển đến trang đăng ký tài khoản với email đã được điền sẵn
  - Sau khi đăng ký thành công: tự động chuyển đến trang chi tiết lời mời-->

### AC-6: Edge Case - Nhận nhiều lời mời từ nhiều trường khác nhau
- **Tại** hộp thư email cá nhân của giảng viên
- **Khi** giảng viên nhận được nhiều lời mời từ nhiều trường khác nhau cùng lúc
- **Thì** hệ thống:
  - Gửi từng email riêng biệt cho mỗi lời mời với tiêu đề rõ ràng tên khóa học và tên trường
  - Mỗi email có mã lời mời duy nhất
  - Trong trang Thông báo SMS: hiển thị từng thông báo riêng biệt cho mỗi lời mời, sắp xếp theo thời gian gửi (mới nhất trước)

### AC-7: Edge Case - Lời mời sắp hết hạn
- **Tại** trang chi tiết lời mời
- **Khi** lời mời còn dưới 24 giờ trước khi hết hạn
- **Thì** hệ thống:
  - Hiển thị cảnh báo màu đỏ "Lời mời sẽ hết hạn trong [X] giờ nữa"
  - Nhấn mạnh thông báo với icon cảnh báo
  - Thông báo trong LMS chuyển sang trạng thái ưu tiên cao (priority notification)

### AC-8: Edge Case - Lời mời đã hết hạn
- **Tại** trang chi tiết lời mời
- **Khi** giảng viên truy cập vào đường dẫn lời mời sau khi đã hết hạn 7 ngày
- **Thì** hệ thống:
  - Hiển thị thông báo "Lời mời này đã hết hạn vào [Ngày hết hạn]"
  - Vô hiệu hóa các nút "Chấp nhận lời mời" và "Từ chối lời mời"
  - Hiển thị thông tin liên hệ School Admin nếu giảng viên vẫn muốn tham gia
  - Cập nhật trạng thái lời mời thành **Đã hết hạn** trong cơ sở dữ liệu

### AC-9: Error Condition - Email gửi thất bại
- **Tại** hệ thống gửi email
- **Khi** gửi email lời mời thất bại sau 3 lần thử lại
- **Thì** hệ thống:
  - Ghi nhận lỗi EMAIL-FAIL-001 với chi tiết lỗi
  - Giữ nguyên trạng thái lời mời = **Đang chờ phản hồi**
  - Tạo thông báo trong hệ thống LMS (nếu giảng viên đã có tài khoản)
  - Gửi cảnh báo đến School Admin "Email lời mời chưa được gửi thành công đến [tên giảng viên]. Vui lòng kiểm tra email hoặc liên hệ trực tiếp"

### AC-10: Error Condition - Đường dẫn lời mời không hợp lệ
- **Tại** trang chi tiết lời mời
- **Khi** giảng viên truy cập vào đường dẫn với mã lời mời không tồn tại trong hệ thống
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi "Đường dẫn lời mời không hợp lệ hoặc đã bị thu hồi"
  - Hiển thị nút "Quay về trang chủ"
  - Ghi nhận lỗi INV-INVALID-001

### AC-11: Validation - Kiểm tra định dạng mã lời mời
- **Tại** hệ thống backend khi tạo đường dẫn lời mời
- **Khi** hệ thống tạo mã lời mời
- **Thì** hệ thống:
  - Tạo mã theo định dạng "INV-[Năm]-[Mã ngẫu nhiên 8 ký tự chữ hoa và số]"
  - Đảm bảo mã duy nhất trong toàn hệ thống
  - Lưu mã vào cơ sở dữ liệu cùng với thông tin lời mời

### AC-12: Validation - Đếm ngược thời gian hết hạn tự động
- **Tại** hệ thống backend
- **Khi** lời mời được tạo
- **Thì** hệ thống:
  - Tự động tính thời điểm hết hạn = thời điểm gửi + 7 ngày
  - Kích hoạt quy trình tự động để cập nhật trạng thái = **Đã hết hạn** sau 7 ngày nếu chưa có phản hồi
  - Hiển thị đếm ngược thời gian còn lại trong email và thông báo LMS

---

## Inline business rule

| Trường thông tin          | Mã BR     | Business rule                                                          | Ghi chú                              |
|---------------------------|-----------|------------------------------------------------------------------------|--------------------------------------|
| Mã lời mời                | BR-PS-041 | Định dạng: INV-[Năm]-[Mã ngẫu nhiên 8 ký tự]                           | VD: INV-2025-ABCD1234                |
| Mã lời mời                | BR-PS-042 | Phải duy nhất trong toàn hệ thống                                      | Ràng buộc duy nhất                   |
| Thời điểm hết hạn         | BR-PI-003 | Lời mời hết hạn sau 7 ngày (thời điểm gửi + 7 ngày)                    | Đếm ngược tự động                    |
| Trạng thái lời mời        | BR-PS-045 | Các trạng thái hợp lệ: Đang chờ phản hồi, Đã chấp nhận, Đã từ chối, Đã thu hồi, Đã hết hạn | Ràng buộc danh sách    |
| Email giảng viên          | BR-PS-059 | Email phải hợp lệ theo định dạng chuẩn RFC 5322                        | Validation email                     |
| Tiêu đề email             | BR-PS-060 | Định dạng: "Mời bạn tham gia giảng dạy [Tên khóa học]"                 | Template cố định                     |
| Nội dung email            | BR-PS-061 | Phải chứa: tên khóa học, tên trường, vai trò, phạm vi đóng góp (nếu có), ngày hết hạn, 2 nút hành động | Cấu trúc bắt buộc    |
| Đường dẫn lời mời         | BR-PS-062 | Định dạng: https://{subdomain}.portal.theschools/{Tên chức năng}/[Mã lời mời]             | {**subdomain**} của giáo viên. {**Tên chức năng**}: Tên chức năng của lời mời                            |
| Thông báo trong hệ thống  | BR-PS-063 | Chỉ tạo thông báo SMS nếu giảng viên đã có tài khoản                   | Điều kiện tạo notification           |
| Thời gian cảnh báo        | BR-PS-064 | Hiển thị cảnh báo khi còn dưới 24 giờ trước khi hết hạn                | Ngưỡng cảnh báo                      |
| Quy trình thử lại email   | BR-PS-065 | Thử gửi lại tối đa 3 lần với khoảng cách 1s, 3s, 9s                    | Retry mechanism                      |

---

## System rule
- Mỗi lời mời phải có một mã lời mời duy nhất trong toàn hệ thống
- Đường dẫn lời mời phải được mã hóa an toàn và không thể đoán trước
- Hệ thống phải tự động cập nhật trạng thái lời mời thành "Đã hết hạn" sau đúng 7 ngày
- Email phải tuân thủ chuẩn CAN-SPAM Act để tránh bị đánh dấu spam
- Thông báo trong hệ thống phải được đồng bộ real-time khi có lời mời mới
- Hệ thống phải hỗ trợ responsive design để email hiển thị tốt trên mọi thiết bị

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho giảng viên tự do nhận thông báo kịp thời về lời mời cộng tác, hiểu rõ vai trò và phạm vi công việc, tạo trải nghiệm chuyên nghiệp và minh bạch trong quá trình mời giảng viên**

Trọng số của story này là **5**

Story được coi là thành công khi nó đảm bảo được:
- 98% email lời mời được gửi thành công đến giảng viên
- 100% lời mời có mã lời mời duy nhất và hợp lệ
- 95% giảng viên đọc email lời mời trong vòng 24 giờ đầu tiên
- 100% lời mời tự động cập nhật trạng thái "Đã hết hạn" sau đúng 7 ngày
- 90% giảng viên hiểu rõ vai trò và phạm vi công việc được phân công (đo qua khảo sát)
- Thời gian trung bình từ khi nhận lời mời đến khi phản hồi < 48 giờ

---

## Dependencies
- **lf-course service**: Lấy thông tin lời mời, vai trò, phạm vi đóng góp
- **notification-service**: Gửi email lời mời với template và retry mechanism
- **tf-teacher-profile service**: Lấy thông tin giảng viên (email, tên, tài khoản)
- **identity service**: Kiểm tra giảng viên đã có tài khoản LMS hay chưa
- **US-PS-003**: Lời mời phải được tạo trước khi giảng viên nhận được

---

## Impact Analysis
- **Giảng viên tự do**: Nhận thông báo rõ ràng về cơ hội cộng tác, hiểu rõ vai trò và phạm vi công việc, có đủ thông tin để quyết định tham gia hay không
- **School Admin**: Đảm bảo lời mời được gửi thành công đến giảng viên, giảm thiểu trường hợp giảng viên không nhận được thông báo
- **Quy trình cộng tác**: Bắt đầu quá trình cộng tác một cách chuyên nghiệp và minh bạch
- **Email System**: Tăng khối lượng email gửi đi, cần đảm bảo không bị đánh dấu spam
- **LMS Notification System**: Tạo thông báo real-time cho giảng viên đã có tài khoản
- **User Experience**: Trải nghiệm nhận lời mời chuyên nghiệp, rõ ràng, dễ hiểu

---

## UI/UX Design

### Email lời mời - Giảng viên chủ trì
```
┌─────────────────────────────────────────────────────────────────┐
│  📧 Mời bạn tham gia đóng góp nội dung cho khóa học Toán nâng cao                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Kính chào Thầy/ Cô Nguyễn Văn A,                                   │
│                                                                 │
│  Trường THPT ABC trân trọng mời Thầy/ Cô tham gia giảng dạy         │
│  khóa học "Toán nâng cao - Lớp 12" với vai trò Giảng viên       │
│  chủ trì.                                                       │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  📚 Thông tin khóa học                                     │ │
│  │  ──────────────────────────────────────────────────────    │ │
│  │  Tên khóa học: Toán nâng cao - Lớp 12                     │ │
│  │  Trường: THPT ABC                                          │ │
│  │  Vai trò: Giảng viên chủ trì                               │ │
│  │  Quyền truy cập: Toàn bộ khóa học                          │ │
│  │                                                             │ │
│  │  💬 Lời nhắn từ Quản trị viên:                              │ │
│  │  "Chào thầy, chúng tôi rất mong muốn thầy tham gia với     │ │
│  │   vai trò Giảng viên chủ trì cho khóa học này..."          │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ⏰ Lời mời hết hạn: 13/12/2025 (còn 7 ngày)                    │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐              │
│  │  ✓ Chấp nhận lời mời │  │  ✗ Từ chối lời mời  │              │
│  └─────────────────────┘  └─────────────────────┘              │
│                                                                 │
│  ────────────────────────────────────────────────────────────  │
│  Nếu không thể nhấn nút, vui lòng copy đường dẫn sau:           │
│  https://mshoa.portal.theschools/INVITATION/INV-2025-ABCD1234          │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống EMS - msHoa                                        │
└─────────────────────────────────────────────────────────────────┘
```

### Email lời mời - Giảng viên đóng góp
```
┌─────────────────────────────────────────────────────────────────┐
│  📧 Mời bạn tham gia giảng dạy Toán nâng cao                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Kính chào Cô Trần Thị B,                                       │
│                                                                 │
│  Trường THPT ABC trân trọng mời cô tham gia giảng dạy           │
│  khóa học "Toán nâng cao - Lớp 12" với vai trò Giảng viên       │
│  đóng góp.                                                      │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  📚 Thông tin khóa học                                     │ │
│  │  ──────────────────────────────────────────────────────    │ │
│  │  Tên khóa học: Toán nâng cao - Lớp 12                     │ │
│  │  Trường: THPT ABC                                          │ │
│  │  Vai trò: Giảng viên đóng góp                              │ │
│  │                                                             │ │
│  │  📝 Phạm vi đóng góp:                                       │ │
│  │  • Chương 3: Giải tích                                     │ │
│  │    - Bài 3.1: Giới hạn                                     │ │
│  │    - Bài 3.2: Đạo hàm                                      │ │
│  │    - Bài 3.3: Tích phân                                    │ │
│  │                                                             │ │
│  │  🔑 Quyền hạn:                                              │ │
│  │  • Tải video                                               │ │
│  │  • Tải audio                                               │ │
│  │  • Thêm tài liệu                                           │ │
│  │                                                             │ │
│  │  💬 Lời nhắn từ Quản trị viên:                              │ │
│  │  "Chào cô, chúng tôi mong muốn cô đóng góp nội dung        │ │
│  │   cho phần Giải tích..."                                   │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ⏰ Lời mời hết hạn: 13/12/2025 (còn 7 ngày)                    │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐              │
│  │  ✓ Chấp nhận lời mời │  │  ✗ Từ chối lời mời  │              │
│  └─────────────────────┘  └─────────────────────┘              │
│                                                                 │
│                                                                 │
│  ────────────────────────────────────────────────────────────  │
│  Nếu không thể nhấn nút, vui lòng copy đường dẫn sau:           │
│  https://mshoa.portal.theschools/INVITATION/INV-2025-ABCD1234          │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống EMS - msHoa                                        │
└─────────────────────────────────────────────────────────────────┘
```

### Thông báo trong SMS
```
┌─────────────────────────────────────────────────────────────────┐
│  🔔 Thông báo (1 mới)                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🆕 Bạn có lời mời tham gia giảng dạy                            │
│      Khóa học: Toán nâng cao - Lớp 12                           │
│      Trường: THPT ABC                                           │
│      Vai trò: Giảng viên chủ trì                                │
│      Còn lại: 6 ngày 14 giờ                                     │
│                                                                 │
│      [Xem chi tiết]                                             │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ⚠️ Lời mời sắp hết hạn!                                         │
│      Khóa học: Vật lý cơ bản                                    │
│      Trường: THPT XYZ                                           │
│      Vai trò: Giảng viên đóng góp                               │
│      Còn lại: 8 giờ                                             │
│                                                                 │
│      [Xem chi tiết]                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Trang chi tiết lời mời
```
┌─────────────────────────────────────────────────────────────────┐
│  Lời mời tham gia tham gia đóng góp nội dung cho khóa học [Tên khóa học]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ⏰ Còn 6 ngày 14 giờ để phản hồi                                │
│  ════════════════════════════════════════════════════════════   │
│                                                                 │
│  📚 Thông tin khóa học                                          │
│  ────────────────────────────────────────────────────────────   │
│  Tên khóa học:    Toán nâng cao - Lớp 12                        │
│  Trường:          THPT ABC                                      │
│  Mã lời mời:      INV-2025-ABCD1234                             │
│  Ngày gửi:        06/12/2025                                    │
│  Ngày hết hạn:    13/12/2025                                    │
│                                                                 │
│  👤 Vai trò của bạn                                             │
│  ────────────────────────────────────────────────────────────   │
│  Giảng viên chủ trì                                             │
│  • Quyền truy cập toàn bộ khóa học                              │
│  • Quản lý và điều phối nội dung                                │
│                  │
│                                                                 │
│  💬 Lời nhắn từ Quản trị viên                                    │
│  ────────────────────────────────────────────────────────────   │
│  "Chào thầy, chúng tôi rất mong muốn thầy tham gia với vai trò  │
│   Giảng viên chủ trì cho khóa học này. Với kinh nghiệm và       │
│   chuyên môn của thầy, chúng tôi tin rằng khóa học sẽ rất       │
│   chất lượng..."                                                │
│                                                                 │
│                                                                 │
│        ┌─────────────────────┐  ┌─────────────────────┐         │
│        │  ✓ Chấp nhận lời mời │  │  ✗ Từ chối lời mời  │         │
│        └─────────────────────┘  └─────────────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Trang lời mời đã hết hạn
```
┌─────────────────────────────────────────────────────────────────┐
│  Lời mời đã hết hạn                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ⏰ Lời mời này đã hết hạn vào 13/12/2025                        │
│  ════════════════════════════════════════════════════════════   │
│                                                                 │
│  📚 Thông tin khóa học                                          │
│  ────────────────────────────────────────────────────────────   │
│  Tên khóa học:    Toán nâng cao - Lớp 12                        │
│  Trường:          THPT ABC                                      │
│  Vai trò:         Giảng viên chủ trì                            │
│                                                                 │
│  ℹ️  Nếu bạn vẫn muốn tham gia khóa học này, vui lòng liên hệ:  │
│                                                                 │
│  👤 Quản trị viên: Nguyễn Văn X                                 │
│  📧 Email: admin@thptabc.edu.vn                                 │
│  📞 Điện thoại: 0123456789                                      │
│                                                                 │
│                  [Quay về trang chủ]                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Hành vi của quy trình**:
- Email lời mời được gửi tự động ngay sau khi School Admin nhấn "Gửi lời mời"
- Thông báo trong LMS được tạo real-time nếu giảng viên đã có tài khoản
- Đếm ngược thời gian hết hạn cập nhật theo thời gian thực
- Badge thông báo chưa đọc hiển thị trên icon thông báo
- Nút "Chấp nhận" và "Từ chối" chỉ hoạt động khi lời mời còn hiệu lực
- Sau 7 ngày: hệ thống tự động cập nhật trạng thái "Đã hết hạn" và vô hiệu hóa các nút hành động

---

## Out of Scope Item
- **Email reminder before expiry**: Gửi email nhắc nhở trước 24 giờ hết hạn (có thể làm sau)
- **SMS notification**: Gửi SMS thông báo lời mời (chỉ email cho MVP)
- **Push notification mobile app**: Thông báo qua ứng dụng di động (chưa có app)
- **Calendar integration**: Tự động thêm ngày hết hạn vào lịch của giảng viên (có thể làm sau)
- **Preview course content**: Xem trước nội dung khóa học trước khi chấp nhận (out of scope)
- **Invitation forwarding**: Chuyển tiếp lời mời cho người khác (không cho phép)
- **Custom expiry extension**: Giảng viên yêu cầu gia hạn thời gian phản hồi (cố định 7 ngày)
- **In-app chat with Admin**: Chat trực tiếp với Admin để hỏi về lời mời (có thể làm sau)
