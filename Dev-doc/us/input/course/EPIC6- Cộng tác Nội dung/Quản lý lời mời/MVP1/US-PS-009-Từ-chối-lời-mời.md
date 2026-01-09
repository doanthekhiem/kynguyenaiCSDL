# US-PS-009 - Từ chối lời mời

## User story Title
US-PS-009 - Từ chối lời mời (Reject Invitation)

Là một **Giảng viên tự do**
Tôi muốn thực hiện **từ chối lời mời tham gia đóng góp nội dung cho khóa học** tại **trang chi tiết lời mời của sản phẩm LMS**
Để **thông báo rằng tôi không thể hoặc không muốn tham gia khóa học, giúp School Admin biết để mời người khác thay thế**

---

## Acceptance criteria

### AC-1: Happy Path - Từ chối lời mời với lý do
- **Tại** trang chi tiết lời mời với trạng thái **Đang chờ phản hồi**
- **Khi** giảng viên nhấn nút "Từ chối lời mời", chọn lý do từ chối (dropdown) hoặc nhập lý do khác (tùy chọn), sau đó nhấn "Xác nhận từ chối"
- **Thì** hệ thống:
  - Hiển thị hộp thoại xác nhận "Bạn có chắc chắn muốn từ chối lời mời này?"
  - Sau khi xác nhận: cập nhật trạng thái lời mời thành **Đã từ chối**
  - Ghi nhận thời điểm từ chối lời mời
  - Lưu lý do từ chối (nếu giảng viên cung cấp)
  - Gửi sự kiện "Giảng viên đã từ chối lời mời" vào hệ thống
  - Gửi email xác nhận đến giảng viên "Bạn đã từ chối lời mời tham gia khóa học [Tên khóa học]"
  - Gửi thông báo đến School Admin "Giảng viên [Tên] đã từ chối lời mời với lý do: [Lý do]"
  - Hiển thị thông báo "Bạn đã từ chối lời mời thành công. Cảm ơn bạn đã phản hồi."
  - Chuyển hướng về trang chủ hoặc trang danh sách thông báo

<!--### AC-2: Happy Path - Từ chối lời mời không cần lý do
- **Tại** trang chi tiết lời mời với trạng thái **Đang chờ phản hồi**
- **Khi** giảng viên nhấn nút "Từ chối lời mời" và không chọn/nhập lý do, sau đó nhấn "Xác nhận từ chối"
- **Thì** hệ thống:
  - Xử lý từ chối như AC-1
  - Lý do từ chối = NULL
  - Email và thông báo đến School Admin không chứa lý do từ chối-->

### AC-3: Alternative Path - Hiển thị danh sách lý do từ chối 
- **Tại** hộp thoại từ chối lời mời
- **Khi** giảng viên nhấn nút "Từ chối lời mời"
- **Thì** hệ thống:
  - Hiển thị dropdown danh sách lý do phổ biến:
    - "Chưa sắp xếp được thời gian"
    - "Chưa phù hợp với chuyên môn"
    - "Đã cam kết với dự án khác"
    - "Lý do cá nhân"
    - "Khác (vui lòng ghi rõ)"
  - Nếu chọn "Khác": hiển thị ô nhập văn bản để giảng viên nhập lý do cụ thể (tối đa 500 ký tự)

### AC-4: Edge Case - Từ chối lời mời Giảng viên chủ trì
- **Tại** trang chi tiết lời mời với vai trò **Giảng viên chủ trì**
- **Khi** giảng viên với vai trò Giảng viên chủ trì nhấn "Từ chối lời mời"
- **Thì** hệ thống:
  - Xử lý từ chối như AC-1
  - Gửi thông báo đến School Admin "Giảng viên chủ trì [Tên] đã từ chối lời mời. Bạn cần mời người khác với vai trò Giảng viên chủ trì để tiếp tục."
  - Cập nhật trạng thái khóa học: giữ nguyên **Đang mời giảng viên** (School Admin cần mời người khác)

### AC-5: Edge Case - Từ chối lời mời Giảng viên đóng góp
- **Tại** trang chi tiết lời mời với vai trò **Giảng viên đóng góp**
- **Khi** giảng viên với vai trò Giảng viên đóng góp nhấn "Từ chối lời mời"
- **Thì** hệ thống:
  - Xử lý từ chối như AC-1
  - Gửi thông báo đến School Admin và Giảng viên chủ trì "Giảng viên đóng góp [Tên] đã từ chối lời mời cho phạm vi [Danh sách chương/bài học]"
  - School Admin có thể mời người khác thay thế cho phạm vi đó

### AC-6: Edge Case - Từ chối lời mời đã hết hạn
- **Tại** trang chi tiết lời mời
- **Khi** giảng viên cố gắng từ chối lời mời đã hết hạn (thời điểm hiện tại > thời điểm hết hạn)
- **Thì** hệ thống:
  - Hiển thị thông báo "Lời mời này đã hết hạn. Không cần từ chối."
  - Vô hiệu hóa nút "Từ chối lời mời"
  - Trạng thái lời mời = **Đã hết hạn** (tự động cập nhật trước đó)

### AC-7: Edge Case - Lời mời đã bị thu hồi
- **Tại** trang chi tiết lời mời
- **Khi** giảng viên cố gắng từ chối lời mời đã bị School Admin thu hồi (trạng thái = **Đã thu hồi**)
- **Thì** hệ thống:
  - Hiển thị thông báo "Lời mời này đã bị thu hồi bởi School Admin. Bạn không thể từ chối."
  - Vô hiệu hóa nút "Từ chối lời mời"
  - Hiển thị thông tin liên hệ School Admin nếu giảng viên muốn hỏi thêm

### AC-8: Edge Case - Lời mời đã được từ chối trước đó (duplicate click)
- **Tại** trang chi tiết lời mời
- **Khi** giảng viên nhấn "Từ chối lời mời" nhiều lần hoặc lời mời đã có trạng thái **Đã từ chối**
- **Thì** hệ thống:
  - Kiểm tra trạng thái lời mời
  - Nếu đã là **Đã từ chối**: hiển thị thông báo "Bạn đã từ chối lời mời này rồi."
  - Vô hiệu hóa nút "Từ chối lời mời"
  - Không tạo bản ghi trùng lặp

### AC-9: Error Condition - Lỗi kết nối cơ sở dữ liệu khi cập nhật trạng thái
- **Tại** hệ thống backend khi nhấn "Xác nhận từ chối"
- **Khi** kết nối cơ sở dữ liệu bị lỗi
- **Thì** hệ thống:
  - Hoàn tác toàn bộ giao dịch (không cập nhật trạng thái)
  - Hiển thị thông báo lỗi "Không thể từ chối lời mời. Vui lòng kiểm tra kết nối và thử lại"
  - Ghi nhận lỗi DB-CONN-004
  - Trạng thái lời mời không thay đổi
  - Giảng viên có thể thử lại

### AC-10: Error Condition - Lỗi gửi email xác nhận
- **Tại** dịch vụ thông báo khi gửi email xác nhận
- **Khi** gửi email xác nhận thất bại sau 3 lần thử lại
- **Thì** hệ thống:
  - Vẫn cập nhật trạng thái lời mời thành **Đã từ chối** (vì hành động từ chối đã thành công)
  - Ghi nhận lỗi EMAIL-FAIL-003
  - Hiển thị cảnh báo "Bạn đã từ chối lời mời thành công, nhưng email xác nhận có thể chưa được gửi."
  - Vẫn gửi thông báo đến School Admin (ưu tiên cao hơn email đến giảng viên)

### AC-11: Validation - Kiểm tra trạng thái lời mời hợp lệ
- **Tại** hệ thống backend khi nhấn "Từ chối lời mời"
- **Khi** hệ thống xử lý yêu cầu từ chối
- **Thì** hệ thống:
  - Kiểm tra trạng thái lời mời = **Đang chờ phản hồi**
  - Kiểm tra lời mời chưa hết hạn
  - Kiểm tra lời mời chưa bị thu hồi
  - Nếu không hợp lệ: hiển thị thông báo lỗi tương ứng và không cho phép từ chối

### AC-12: Gửi thông báo đến School Admin với mức độ ưu tiên
- **Tại** dịch vụ thông báo khi nhận sự kiện "Giảng viên đã từ chối lời mời"
- **Khi** sự kiện được xử lý
- **Thì** hệ thống:
  - Gửi email đến School Admin với tiêu đề "Giảng viên [Tên] đã từ chối lời mời"
  - Email chứa: tên giảng viên, vai trò, phạm vi đóng góp (nếu có), lý do từ chối (nếu có), thời điểm từ chối, nút "Mời giảng viên khác"
  - Nếu là Giảng viên chủ trì: đánh dấu thông báo là ưu tiên cao (priority high)
  - Nếu là Giảng viên đóng góp: gửi thông báo đến cả Giảng viên chủ trì
  - Tạo thông báo trong hệ thống SMS cho School Admin

---

## Inline business rule

| Trường thông tin           | Mã BR     | Business rule                                                          | Ghi chú                              |
|----------------------------|-----------|------------------------------------------------------------------------|--------------------------------------|
| Trạng thái lời mời         | BR-PS-079 | Chỉ từ chối lời mời khi trạng thái = Đang chờ phản hồi                 | Validation trạng thái                |
| Thời điểm từ chối          | BR-PS-080 | Tự động ghi nhận khi giảng viên từ chối lời mời                        | Hệ thống tự tạo                      |
| Lý do từ chối              | BR-PS-081 | Không bắt buộc, tối đa 500 ký tự                                       | Optional field                       |
| Lý do từ chối              | BR-PS-082 | Danh sách lý do phổ biến: Không có thời gian, Không phù hợp chuyên môn, Đã cam kết dự án khác, Lý do cá nhân, Khác | Predefined options |
| Email xác nhận             | BR-PS-083 | Gửi email xác nhận đến giảng viên sau khi từ chối thành công          | Confirmation email                   |
| Thông báo School Admin     | BR-PS-084 | Gửi thông báo đến School Admin khi có giảng viên từ chối               | Notification requirement             |
| Thông báo ưu tiên cao      | BR-PS-085 | Nếu Giảng viên chủ trì từ chối: đánh dấu thông báo ưu tiên cao         | Priority notification                |
| Thông báo Giảng viên chủ trì | BR-PS-086 | Nếu Giảng viên đóng góp từ chối: gửi thông báo đến Giảng viên chủ trì | Notification requirement           |
| Duplicate rejection        | BR-PS-087 | Không cho phép từ chối lời mời đã có trạng thái Đã từ chối             | Prevent duplicate                    |
| Lời mời hết hạn            | BR-PS-088 | Không cho phép từ chối lời mời đã hết hạn                              | Validation                           |
| Lời mời đã thu hồi         | BR-PS-089 | Không cho phép từ chối lời mời đã bị thu hồi                           | Validation                           |
| Trạng thái sau từ chối     | BR-PS-090 | Sau khi từ chối: trạng thái = Đã từ chối, không thể thay đổi           | Immutable state                      |

---

## System rule
- Việc từ chối lời mời phải được xử lý trong một transaction để đảm bảo tính toàn vẹn dữ liệu
- Hệ thống phải kiểm tra trạng thái lời mời real-time trước khi xử lý từ chối
- Email xác nhận không được ảnh hưởng đến kết quả từ chối lời mời (fail gracefully)
- Thông báo đến School Admin phải được ưu tiên cao hơn email đến giảng viên
- Hệ thống phải hỗ trợ idempotent để tránh duplicate rejection khi giảng viên nhấn nhiều lần
- Lý do từ chối phải được lưu an toàn và chỉ School Admin có quyền xem

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho giảng viên tự do từ chối lời mời một cách lịch sự và chuyên nghiệp, giúp School Admin biết để mời người khác thay thế kịp thời, và cải thiện quy trình quản lý lời mời**

Trọng số của story này là **5**

Story được coi là thành công khi nó đảm bảo được:
- 100% lời mời được từ chối thành công sẽ cập nhật trạng thái chính xác
- 98% email xác nhận được gửi thành công đến giảng viên
- 100% School Admin nhận được thông báo khi có giảng viên từ chối
- 0% duplicate rejection (không có bản ghi trùng lặp)
- 60% giảng viên cung cấp lý do khi từ chối (giúp School Admin hiểu nguyên nhân)
- Trung bình School Admin mời người thay thế trong vòng 2 ngày sau khi nhận thông báo từ chối

---

## Dependencies
- **lf-course service**: Cập nhật trạng thái lời mời, lưu lý do từ chối
- **notification-service**: Gửi email xác nhận và thông báo đến School Admin
- **US-PS-007**: Giảng viên phải nhận được lời mời trước khi từ chối
- **US-PS-003**: Lời mời phải được tạo bởi School Admin

---

## Impact Analysis
- **Giảng viên tự do**: Từ chối lời mời một cách lịch sự, có thể cung cấp lý do để giải thích, không bị ảnh hưởng đến uy tín
- **School Admin**: Nhận thông báo kịp thời khi có giảng viên từ chối, hiểu lý do (nếu có), có thể mời người khác thay thế nhanh chóng
- **Giảng viên chủ trì**: Được thông báo khi Giảng viên đóng góp từ chối, biết cần tìm người khác cho phạm vi đó
- **Quy trình cộng tác**: Đảm bảo School Admin không chờ đợi vô ích, có thể hành động kịp thời để tìm người thay thế
- **Notification System**: Gửi email và thông báo đến các bên liên quan với mức độ ưu tiên phù hợp
- **User Experience**: Trải nghiệm từ chối lời mời lịch sự, chuyên nghiệp, không gây awkward

---

## UI/UX Design

### Hộp thoại từ chối lời mời
```
┌──────────────────────────────────────────────────────────────┐
│  Từ chối lời mời                                             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Bạn có chắc chắn muốn từ chối lời mời tham gia              │
│  khóa học "Toán nâng cao - Lớp 12"?                          │
│                                                              │
│  Lý do từ chối (không bắt buộc):                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ ▼ Chọn lý do                                            │ │
│  └────────────────────────────────────────────────────────┘ │
│    • Không có thời gian                                     │
│    • Không phù hợp với chuyên môn                           │
│    • Đã cam kết với dự án khác                              │
│    • Lý do cá nhân                                          │
│    • Khác (vui lòng ghi rõ)                                 │
│                                                              │
│  (Nếu chọn "Khác"):                                          │
│  Vui lòng ghi rõ lý do:                                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                          │ │
│  │                                                          │ │
│  └────────────────────────────────────────────────────────┘ │
│  (0/500 ký tự)                                               │
│                                                              │
│  ℹ️  Lý do của bạn sẽ được gửi đến School Admin để họ        │
│     hiểu và có thể cải thiện lời mời trong tương lai.       │
│                                                              │
│           [Hủy]        [Xác nhận từ chối]                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Hộp thoại xác nhận lần cuối
```
┌──────────────────────────────────────────────────────────────┐
│  ⚠️ Xác nhận từ chối                                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Bạn có chắc chắn muốn từ chối lời mời này?                  │
│                                                              │
│  Sau khi từ chối, bạn sẽ không thể chấp nhận lại             │
│  lời mời này. Nếu bạn muốn tham gia sau này, School          │
│  Admin sẽ phải gửi lời mời mới.                              │
│                                                              │
│  Lý do: Không có thời gian                                   │
│                                                              │
│                                                              │
│           [Quay lại]        [Chắc chắn từ chối]              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Thông báo thành công
```
┌──────────────────────────────────────────────────────────────┐
│  ✓ Từ chối lời mời thành công                                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Bạn đã từ chối lời mời tham gia khóa học                    │
│  "Toán nâng cao - Lớp 12".                                   │
│                                                              │
│  ✅ School Admin đã được thông báo                            │
│  ✅ Email xác nhận đã được gửi đến bạn                        │
│                                                              │
│  Cảm ơn bạn đã phản hồi.                                     │
│                                                              │
│              [Quay về trang chủ]                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Email xác nhận - Giảng viên
```
┌─────────────────────────────────────────────────────────────────┐
│  📧 Bạn đã từ chối lời mời tham gia khóa học                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Kính chào Thầy Nguyễn Văn A,                                   │
│                                                                 │
│  Chúng tôi xác nhận rằng thầy đã từ chối lời mời tham gia       │
│  khóa học "Toán nâng cao - Lớp 12" của Trường THPT ABC.         │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  ℹ️ Thông tin lời mời                                       │ │
│  │  ──────────────────────────────────────────────────────    │ │
│  │  Khóa học: Toán nâng cao - Lớp 12                         │ │
│  │  Trường: THPT ABC                                          │ │
│  │  Vai trò: Giảng viên chủ trì                               │ │
│  │  Thời điểm từ chối: 07/12/2025 16:00                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Cảm ơn thầy đã phản hồi lời mời của chúng tôi.                 │
│  Chúng tôi hy vọng sẽ có cơ hội hợp tác với thầy               │
│  trong tương lai.                                               │
│                                                                 │
│  Nếu thầy thay đổi quyết định hoặc có thắc mắc, vui lòng        │
│  liên hệ:                                                       │
│  📧 admin@thptabc.edu.vn                                        │
│  📞 0123456789                                                  │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống LMS - THPT ABC                                        │
└─────────────────────────────────────────────────────────────────┘
```

### Email thông báo - School Admin (Giảng viên chủ trì từ chối)
```
┌─────────────────────────────────────────────────────────────────┐
│  📧 ⚠️ Giảng viên chủ trì đã từ chối lời mời                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Kính chào Quản trị viên,                                       │
│                                                                 │
│  Giảng viên Nguyễn Văn A đã từ chối lời mời tham gia            │
│  khóa học "Toán nâng cao - Lớp 12" với vai trò Giảng viên       │
│  chủ trì.                                                       │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  👤 Thông tin giảng viên                                   │ │
│  │  ──────────────────────────────────────────────────────    │ │
│  │  Họ tên: Nguyễn Văn A                                      │ │
│  │  Email: nguyenvana@example.com                             │ │
│  │  Vai trò: Giảng viên chủ trì                               │ │
│  │  Thời điểm từ chối: 07/12/2025 16:00                      │ │
│  │                                                             │ │
│  │  💬 Lý do từ chối:                                          │ │
│  │  "Không có thời gian"                                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ⚠️ HÀNH ĐỘNG CẦN THIẾT:                                         │
│  Bạn cần mời một Giảng viên chủ trì khác để tiếp tục            │
│  quy trình tạo khóa học.                                        │
│                                                                 │
│  ┌─────────────────────────┐                                    │
│  │  Mời giảng viên khác     │                                    │
│  └─────────────────────────┘                                    │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống LMS                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Email thông báo - School Admin (Giảng viên đóng góp từ chối)
```
┌─────────────────────────────────────────────────────────────────┐
│  📧 Giảng viên đóng góp đã từ chối lời mời                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Kính chào Quản trị viên,                                       │
│                                                                 │
│  Giảng viên Trần Thị B đã từ chối lời mời tham gia              │
│  khóa học "Toán nâng cao - Lớp 12" với vai trò Giảng viên       │
│  đóng góp.                                                      │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  👤 Thông tin giảng viên                                   │ │
│  │  ──────────────────────────────────────────────────────    │ │
│  │  Họ tên: Trần Thị B                                        │ │
│  │  Email: tranthib@example.com                               │ │
│  │  Vai trò: Giảng viên đóng góp                              │ │
│  │                                                             │ │
│  │  📝 Phạm vi được mời:                                       │ │
│  │  • Chương 3: Giải tích (Bài 3.1, 3.2, 3.3)                 │ │
│  │                                                             │ │
│  │  💬 Lý do từ chối:                                          │ │
│  │  "Đã cam kết với dự án khác"                               │ │
│  │                                                             │ │
│  │  Thời điểm từ chối: 08/12/2025 10:30                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Bạn có thể mời giảng viên khác cho phạm vi này.                │
│                                                                 │
│  ┌─────────────────────────┐                                    │
│  │  Mời giảng viên khác     │                                    │
│  └─────────────────────────┘                                    │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống LMS                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Trang lời mời đã từ chối
```
┌─────────────────────────────────────────────────────────────────┐
│  Lời mời đã bị từ chối                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✗ Bạn đã từ chối lời mời này vào 07/12/2025                    │
│  ════════════════════════════════════════════════════════════   │
│                                                                 │
│  📚 Thông tin khóa học                                          │
│  ────────────────────────────────────────────────────────────   │
│  Tên khóa học:    Toán nâng cao - Lớp 12                        │
│  Trường:          THPT ABC                                      │
│  Vai trò:         Giảng viên chủ trì                            │
│  Lý do từ chối:   Không có thời gian                            │
│                                                                 │
│  ℹ️  Nếu bạn thay đổi quyết định, vui lòng liên hệ:             │
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
- Khi nhấn "Từ chối lời mời": hiển thị hộp thoại với dropdown lý do từ chối
- Nếu chọn "Khác": hiển thị ô nhập văn bản
- Khi nhấn "Xác nhận từ chối": hiển thị hộp thoại xác nhận lần cuối
- Khi nhấn "Chắc chắn từ chối": xử lý từ chối, hiển thị loading spinner
- Sau khi từ chối thành công: hiển thị thông báo thành công, tự động chuyển về trang chủ sau 3 giây
- Email xác nhận gửi tự động đến giảng viên
- Email thông báo gửi tự động đến School Admin (và Giảng viên chủ trì nếu là Giảng viên đóng góp từ chối)
- Nếu là Giảng viên chủ trì từ chối: email đến School Admin được đánh dấu ưu tiên cao

---

## Out of Scope Item
- **Reject with counter-offer**: Từ chối nhưng đề xuất điều kiện khác (VD: thay đổi phạm vi đóng góp) (out of scope)
- **Temporary decline**: Từ chối tạm thời và yêu cầu mời lại sau (out of scope)
- **Recommend someone else**: Giới thiệu người khác thay thế khi từ chối (có thể làm sau)
- **Decline with availability calendar**: Cung cấp lịch có thể làm việc trong tương lai (out of scope)
- **Anonymous rejection**: Từ chối mà không tiết lộ danh tính với School Admin (không cần thiết)
- **Rejection analytics**: Thống kê tỷ lệ và lý do từ chối để cải thiện lời mời (có thể làm sau)
- **Undo rejection**: Hoàn tác việc từ chối trong vòng X phút (out of scope cho MVP)
- **Feedback survey after rejection**: Khảo sát chi tiết về trải nghiệm nhận lời mời (có thể làm sau)
