# US-PS-008 - Chấp nhận lời mời

## User story Title
US-PS-008 - Chấp nhận lời mời (Accept Invitation)

Là một **Giảng viên tự do**
Tôi muốn thực hiện **chấp nhận lời mời tham gia đóng góp nội dung cho khóa học** tại **trang chi tiết lời mời của sản phẩm LMS**
Để **xác nhận tham gia cộng tác, được cấp quyền truy cập vào khóa học theo vai trò được phân công, và bắt đầu đóng góp nội dung**

---

## Acceptance criteria

### AC-1: Happy Path - Chấp nhận lời mời với vai trò Giảng viên chủ trì
- **Tại** trang chi tiết lời mời với trạng thái **Đang chờ phản hồi** và vai trò **Giảng viên chủ trì**
- **Khi** giảng viên nhấn nút "Chấp nhận lời mời" và xác nhận
- **Thì** hệ thống:
  - Cập nhật trạng thái lời mời thành **Đã chấp nhận**
  - Ghi nhận thời điểm chấp nhận lời mời
  - Tạo bản ghi quan hệ giữa giảng viên và khóa học với vai trò **Giảng viên chủ trì**
  - Cấp quyền truy cập toàn bộ khóa học cho giảng viên
  - Gửi sự kiện "Giảng viên đã chấp nhận lời mời" vào hệ thống
  - Gửi email xác nhận đến giảng viên "Bạn đã chấp nhận tham gia khóa học [Tên khóa học]"
  - Gửi thông báo đến School Admin "Giảng viên [Tên] đã chấp nhận lời mời với vai trò Giảng viên chủ trì"
  - Hiển thị thông báo thành công "Bạn đã chấp nhận lời mời thành công. Chào mừng bạn tham gia khóa học!"
  - Chuyển hướng đến trang tổng quan khóa học (Course Dashboard)

### AC-2: Happy Path - Chấp nhận lời mời với vai trò Giảng viên đóng góp (OUT OF SCOPE)
- **Tại** trang chi tiết lời mời với trạng thái **Đang chờ phản hồi** và vai trò **Giảng viên đóng góp**
- **Khi** giảng viên nhấn nút "Chấp nhận lời mời" và xác nhận
- **Thì** hệ thống:
  - Cập nhật trạng thái lời mời thành **Đã chấp nhận**
  - Ghi nhận thời điểm chấp nhận lời mời
  - Tạo bản ghi quan hệ giữa giảng viên và khóa học với vai trò **Giảng viên đóng góp**
  - Lưu thông tin phạm vi đóng góp (danh sách chương/bài học và quyền)
  - Cấp quyền truy cập theo phạm vi đã được chỉ định (chỉ các chương/bài học và quyền được phân công)
  - Gửi sự kiện "Giảng viên đã chấp nhận lời mời" vào hệ thống
  - Gửi email xác nhận đến giảng viên với thông tin phạm vi đóng góp cụ thể
  - Gửi thông báo đến School Admin và Giảng viên chủ trì "Giảng viên [Tên] đã chấp nhận lời mời với vai trò Giảng viên đóng góp"
  - Hiển thị thông báo thành công "Bạn đã chấp nhận lời mời thành công. Bạn có quyền đóng góp cho [Danh sách chương/bài học]"
  - Chuyển hướng đến trang tổng quan khóa học với chỉ hiển thị phạm vi được phân công

### AC-3: Happy Path - Hiển thị hộp thoại xác nhận trước khi chấp nhận
- **Tại** trang chi tiết lời mời
- **Khi** giảng viên nhấn nút "Chấp nhận lời mời"
- **Thì** hệ thống:
  - Hiển thị hộp thoại xác nhận với thông tin: "Bạn có chắc chắn muốn chấp nhận lời mời tham gia khóa học [Tên khóa học] với vai trò [Vai trò]?"
  - Nếu là Giảng viên chủ trì: hiển thị thêm "Bạn sẽ có quyền truy cập toàn bộ khóa học và chịu trách nhiệm điều phối nội dung"
  - Nếu là Giảng viên đóng góp: hiển thị thêm "Bạn sẽ có quyền đóng góp cho [Danh sách chương/bài học] với quyền [Danh sách quyền]"
  - Hiển thị 2 nút: "Xác nhận" và "Hủy"

<!--### AC-4: Alternative Path - Chấp nhận lời mời khi chưa phải là INDIVIDUAL
- **Tại** trang chi tiết lời mời khi giảng viên truy cập từ email
- **Khi** giảng viên chưa có tài khoản LMS và nhấn "Chấp nhận lời mời"
- **Thì** hệ thống:
  - Hiển thị form đăng ký tài khoản với email đã được điền sẵn
  - Yêu cầu giảng viên nhập: họ tên, mật khẩu, số điện thoại, chuyên môn
  - Sau khi đăng ký thành công: tự động xử lý chấp nhận lời mời như AC-1 hoặc AC-2
  - Chuyển hướng đến trang tổng quan khóa học-->

### AC-5: Alternative Path - Chấp nhận lời mời khi đã là INDIVIDUAL nhưng chưa đăng nhập
- **Tại** trang chi tiết lời mời khi giảng viên truy cập từ email
- **Khi** giảng viên đã có tài khoản  nhưng chưa đăng nhập và nhấn "Chấp nhận lời mời"
- **Thì** hệ thống:
  - Hiển thị form đăng nhập với email đã được điền sẵn
  - Sau khi đăng nhập thành công: quay lại trang chi tiết lời mời
  - Giảng viên nhấn "Chấp nhận lời mời" lần nữa: xử lý như AC-1 hoặc AC-2

### AC-6: Edge Case - Chấp nhận lời mời sắp hết hạn
- **Tại** trang chi tiết lời mời với thời gian còn lại dưới 1 giờ
- **Khi** giảng viên nhấn "Chấp nhận lời mời"
- **Thì** hệ thống:
  - Kiểm tra lại thời gian hết hạn trước khi xử lý
  - Nếu vẫn còn hạn: xử lý chấp nhận như bình thường (AC-1 hoặc AC-2)
  - Nếu đã hết hạn trong lúc giảng viên đang xem: hiển thị thông báo lỗi "Lời mời đã hết hạn. Vui lòng liên hệ School Admin để được mời lại"

### AC-7: Edge Case - Lời mời đã được chấp nhận trước đó (duplicate click)
- **Tại** trang chi tiết lời mời
- **Khi** giảng viên nhấn "Chấp nhận lời mời" nhiều lần hoặc lời mời đã có trạng thái **Đã chấp nhận**
- **Thì** hệ thống:
  - Kiểm tra trạng thái lời mời
  - Nếu đã là **Đã chấp nhận**: hiển thị thông báo "Bạn đã chấp nhận lời mời này rồi. Bạn có thể truy cập khóa học ngay."
  - Hiển thị nút "Đi đến khóa học" thay vì "Chấp nhận lời mời"
  - Không tạo bản ghi trùng lặp

<!--### AC-8: Edge Case - Giảng viên đã tham gia khóa học với vai trò khác
- **Tại** hệ thống backend khi xử lý chấp nhận lời mời
- **Khi** hệ thống phát hiện giảng viên đã tham gia khóa học này với vai trò khác
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi "Bạn đã tham gia khóa học này với vai trò [Vai trò hiện tại]. Không thể chấp nhận lời mời mới."
  - Không cho phép chấp nhận lời mời
  - Ghi nhận lỗi INV-CONFLICT-001 -->

### AC-8: Edge Case - Lời mời đã bị thu hồi
- **Tại** trang chi tiết lời mời
- **Khi** giảng viên chấp nhật lời mời đã bị School Admin thu hồi (trạng thái = **Đã thu hồi**)
- **Thì** hệ thống:
  - Hiển thị thông báo "Lời mời này đã bị thu hồi bởi School Admin. Bạn không thể chấp nhận."
  - Vô hiệu hóa nút "Chấp nhận lời mời"
  - Hiển thị thông tin liên hệ School Admin nếu giảng viên muốn hỏi thêm

### AC-9: Error Condition - Lỗi kết nối cơ sở dữ liệu khi cập nhật trạng thái
- **Tại** hệ thống backend khi nhấn "Xác nhận" chấp nhận lời mời
- **Khi** kết nối cơ sở dữ liệu bị lỗi
- **Thì** hệ thống:
  - Hoàn tác toàn bộ giao dịch (không cập nhật trạng thái, không tạo bản ghi quan hệ)
  - Hiển thị thông báo lỗi "Không thể chấp nhận lời mời. Vui lòng kiểm tra kết nối và thử lại"
  - Ghi nhận lỗi DB-CONN-003
  - Trạng thái lời mời không thay đổi
  - Giảng viên có thể thử lại

### AC-10: Error Condition - Lỗi gửi email xác nhận
- **Tại** dịch vụ thông báo khi gửi email xác nhận
- **Khi** gửi email xác nhận thất bại sau 3 lần thử lại
- **Thì** hệ thống:
  - Vẫn cập nhật trạng thái lời mời thành **Đã chấp nhận** (vì hành động chấp nhận đã thành công)
  - Vẫn cấp quyền truy cập khóa học cho giảng viên
  - Ghi nhận lỗi EMAIL-FAIL-002
  - Hiển thị cảnh báo "Bạn đã chấp nhận lời mời thành công, nhưng email xác nhận có thể chưa được gửi. Bạn vẫn có thể truy cập khóa học."
  - Gửi thông báo trong hệ thống thay thế

### AC-11: Validation - Kiểm tra trạng thái lời mời hợp lệ
- **Tại** hệ thống backend khi nhấn "Chấp nhận lời mời"
- **Khi** hệ thống xử lý yêu cầu chấp nhận
- **Thì** hệ thống:
  - Kiểm tra trạng thái lời mời = **Đang chờ phản hồi**
  - Kiểm tra lời mời chưa hết hạn (thời điểm hiện tại < thời điểm hết hạn)
  - Nếu không hợp lệ: hiển thị thông báo lỗi tương ứng và không cho phép chấp nhận

### AC-12: Gửi thông báo đến School Admin
- **Tại** dịch vụ thông báo khi nhận sự kiện "Giảng viên đã chấp nhận lời mời"
- **Khi** sự kiện được xử lý
- **Thì** hệ thống:
  - Gửi email đến School Admin với tiêu đề "Giảng viên [Tên] đã chấp nhận lời mời"
   - Email chứa: tên giảng viên, vai trò, phạm vi đóng góp (nếu có), thời điểm chấp nhận, nút "Xem danh sách giảng viên"

---

## Inline business rule

| Trường thông tin           | Mã BR     | Business rule                                                          | Ghi chú                              |
|----------------------------|-----------|------------------------------------------------------------------------|--------------------------------------|
| Trạng thái lời mời         | BR-PS-066 | Chỉ chấp nhận lời mời khi trạng thái = Đang chờ phản hồi               | Validation trạng thái                |
| Thời điểm chấp nhận        | BR-PS-067 | Tự động ghi nhận khi giảng viên chấp nhận lời mời                      | Hệ thống tự tạo                      |
| Thời điểm hết hạn          | BR-PS-068 | Phải kiểm tra thời điểm hiện tại < thời điểm hết hạn trước khi chấp nhận | Validation thời gian               |
| Vai trò giảng viên         | BR-PS-069 | Sau khi chấp nhận, vai trò không thể thay đổi                          | Immutable sau khi chấp nhận          |
| Phạm vi đóng góp           | BR-PS-070 | Giảng viên chủ trì: quyền toàn bộ khóa học                             | Full access                          |
| Phạm vi đóng góp           | BR-PS-071 | Giảng viên đóng góp: chỉ quyền theo phạm vi đã chỉ định                | Scoped access                        |
| Quyền truy cập             | BR-PS-072 | Tự động cấp quyền ngay sau khi chấp nhận lời mời                       | Auto permission grant                |
| Email xác nhận             | BR-PS-073 | Gửi email xác nhận đến giảng viên sau khi chấp nhận thành công         | Confirmation email                   |
| Thông báo School Admin     | BR-PS-074 | Gửi thông báo đến School Admin khi có giảng viên chấp nhận             | Notification requirement             |
| Duplicate acceptance       | BR-PS-076 | Không cho phép chấp nhận lời mời đã có trạng thái Đã chấp nhận         | Prevent duplicate                    |
| Conflict role              | BR-PS-077 | Một giảng viên chỉ có 1 vai trò duy nhất cho 1 khóa học                | Unique role per course               |

---

## System rule
- Việc chấp nhận lời mời phải được xử lý trong một transaction để đảm bảo tính toàn vẹn dữ liệu
- Quyền truy cập phải được cấp ngay lập tức sau khi chấp nhận lời mời thành công
- Hệ thống phải kiểm tra thời gian hết hạn real-time trước khi xử lý chấp nhận
- Email xác nhận không được ảnh hưởng đến kết quả chấp nhận lời mời (fail gracefully)
- Thông báo phải được gửi đến tất cả các bên liên quan (giảng viên, School Admin, Giảng viên chủ trì)
- Hệ thống phải hỗ trợ idempotent để tránh duplicate acceptance khi giảng viên nhấn nhiều lần

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho giảng viên tự do xác nhận tham gia cộng tác, được cấp quyền truy cập khóa học ngay lập tức, và bắt đầu đóng góp nội dung một cách nhanh chóng và thuận tiện**

Trọng số của story này là **8**

Story được coi là thành công khi nó đảm bảo được:
- 100% lời mời được chấp nhận thành công sẽ cấp quyền truy cập ngay lập tức
- 98% email xác nhận được gửi thành công đến giảng viên
- 95% giảng viên có thể truy cập khóa học ngay sau khi chấp nhận lời mời (< 5 giây)
- 100% School Admin nhận được thông báo khi có giảng viên chấp nhận
- 0% duplicate acceptance (không có bản ghi trùng lặp)
- Trung bình 70% giảng viên chấp nhận lời mời trong vòng 3 ngày đầu

---

## Dependencies
- **lf-course service**: Cập nhật trạng thái lời mời, tạo bản ghi quan hệ giảng viên-khóa học
- **permission service**: Cấp quyền truy cập khóa học cho giảng viên theo vai trò và phạm vi
- **notification-service**: Gửi email xác nhận và thông báo đến các bên liên quan
- **identity service**: Xác thực giảng viên, tạo tài khoản nếu chưa có
- **US-PS-007**: Giảng viên phải nhận được lời mời trước khi chấp nhận
- **US-PS-003**: Lời mời phải được tạo bởi School Admin

---

## Impact Analysis
- **Giảng viên tự do**: Xác nhận tham gia cộng tác, được cấp quyền truy cập ngay lập tức, có thể bắt đầu đóng góp nội dung
- **School Admin**: Nhận thông báo khi có giảng viên chấp nhận, theo dõi tiến độ mời giảng viên, biết khi nào có đủ đội ngũ để bắt đầu tạo nội dung
- **Giảng viên chủ trì**: Nhận thông báo khi có Giảng viên đóng góp mới tham gia, biết ai sẽ cộng tác cùng
- **Quy trình cộng tác**: Chuyển từ giai đoạn mời giảng viên sang giai đoạn tạo nội dung
- **Permission System**: Cấp quyền truy cập tự động theo vai trò và phạm vi đã định nghĩa
- **Notification System**: Gửi email và thông báo đến nhiều bên liên quan
- **User Experience**: Trải nghiệm chấp nhận lời mời nhanh chóng, rõ ràng, có xác nhận ngay lập tức

---

## UI/UX Design

### Hộp thoại xác nhận - Giảng viên chủ trì
```
┌──────────────────────────────────────────────────────────────┐
│  Xác nhận chấp nhận lời mời                                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Bạn có chắc chắn muốn chấp nhận lời mời tham gia            │
│  khóa học "Toán nâng cao - Lớp 12" với vai trò               │
│  Giảng viên chủ trì?                                         │
│                                                              │
│  ℹ️  Sau khi chấp nhận:                                       │
│  • Bạn sẽ có quyền truy cập toàn bộ khóa học                 │
│  • Bạn chịu trách nhiệm điều phối nội dung                   │
│  • Bạn phê duyệt nội dung từ Giảng viên đóng góp             │
│  • Bạn có thể bắt đầu tạo và upload nội dung ngay            │
│                                                              │
│                                                              │
│           [Hủy]        [Xác nhận chấp nhận]                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Hộp thoại xác nhận - Giảng viên đóng góp
```
┌──────────────────────────────────────────────────────────────┐
│  Xác nhận chấp nhận lời mời                                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Bạn có chắc chắn muốn chấp nhận lời mời tham gia            │
│  khóa học "Toán nâng cao - Lớp 12" với vai trò               │
│  Giảng viên đóng góp?                                        │
│                                                              │
│  📝 Phạm vi đóng góp của bạn:                                 │
│  • Chương 3: Giải tích                                       │
│    - Bài 3.1: Giới hạn                                       │
│    - Bài 3.2: Đạo hàm                                        │
│    - Bài 3.3: Tích phân                                      │
│                                                              │
│  🔑 Quyền hạn của bạn:                                        │
│  • Tải video                                                 │
│  • Tải audio                                                 │
│  • Thêm tài liệu                                             │
│                                                              │
│  ℹ️  Bạn chỉ có quyền đóng góp cho các phần đã chỉ định.     │
│                                                              │
│           [Hủy]        [Xác nhận chấp nhận]                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Thông báo thành công - Giảng viên chủ trì
```
┌──────────────────────────────────────────────────────────────┐
│  ✓ Chấp nhận lời mời thành công                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Chào mừng bạn tham gia khóa học!                            │
│                                                              │
│  🎉 Bạn đã trở thành Giảng viên chủ trì của khóa học         │
│     "Toán nâng cao - Lớp 12"                                 │
│                                                              │
│  ✅ Quyền truy cập: Toàn bộ khóa học                          │
│  ✅ Bạn có thể bắt đầu tạo và upload nội dung ngay           │
│  ✅ Email xác nhận đã được gửi đến nguyenvana@example.com    │
│  ✅ School Admin đã được thông báo                            │
│                                                              │
│                                                              │
│              [Đi đến khóa học]                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Thông báo thành công - Giảng viên đóng góp
```
┌──────────────────────────────────────────────────────────────┐
│  ✓ Chấp nhận lời mời thành công                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Chào mừng bạn tham gia khóa học!                            │
│                                                              │
│  🎉 Bạn đã trở thành Giảng viên đóng góp của khóa học        │
│     "Toán nâng cao - Lớp 12"                                 │
│                                                              │
│  📝 Phạm vi đóng góp của bạn:                                 │
│  • Chương 3: Giải tích (Bài 3.1, 3.2, 3.3)                   │
│                                                              │
│  🔑 Quyền hạn: Tải video, Tải audio, Thêm tài liệu            │
│                                                              │
│  ✅ Email xác nhận đã được gửi đến tranthib@example.com      │
│  ✅ Giảng viên chủ trì và School Admin đã được thông báo     │
│                                                              │
│              [Đi đến khóa học]                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Email xác nhận - Giảng viên
```
┌─────────────────────────────────────────────────────────────────┐
│  📧 Bạn đã chấp nhận tham gia khóa học Toán nâng cao            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Kính chào Thầy Nguyễn Văn A,                                   │
│                                                                 │
│  Cảm ơn thầy đã chấp nhận lời mời tham gia giảng dạy            │
│  khóa học "Toán nâng cao - Lớp 12".                             │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  ✅ Xác nhận tham gia                                      │ │
│  │  ──────────────────────────────────────────────────────    │ │
│  │  Khóa học: Toán nâng cao - Lớp 12                         │ │
│  │  Trường: THPT ABC                                          │ │
│  │  Vai trò: Giảng viên chủ trì                               │ │
│  │  Quyền truy cập: Toàn bộ khóa học                          │ │
│  │  Thời điểm chấp nhận: 07/12/2025 14:30                    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  🚀 Bước tiếp theo:                                             │
│  1. Đăng nhập vào hệ thống LMS                                  │
│  2. Truy cập trang khóa học                                     │
│  3. Bắt đầu tạo và upload nội dung                              │
│                                                                 │
│  ┌─────────────────────┐                                        │
│  │  Đi đến khóa học     │                                        │
│  └─────────────────────┘                                        │
│                                                                 │
│  Nếu có thắc mắc, vui lòng liên hệ:                             │
│  📧 admin@thptabc.edu.vn                                        │
│  📞 0123456789                                                  │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống EMS- THPT ABC                                        │
└─────────────────────────────────────────────────────────────────┘
```

### Email thông báo - School Admin
```
┌─────────────────────────────────────────────────────────────────┐
│  📧 Giảng viên Nguyễn Văn A đã chấp nhận lời mời                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Kính chào Quản trị viên,                                       │
│                                                                 │
│  Giảng viên Nguyễn Văn A đã chấp nhận lời mời tham gia          │
│  khóa học "Toán nâng cao - Lớp 12".                             │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  👤 Thông tin giảng viên                                   │ │
│  │  ──────────────────────────────────────────────────────    │ │
│  │  Họ tên: Nguyễn Văn A                                      │ │
│  │  Email: nguyenvana@example.com                             │ │
│  │  Vai trò: Giảng viên chủ trì                               │ │
│  │  Thời điểm chấp nhận: 07/12/2025 14:30                    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ✅ Giảng viên đã được cấp quyền truy cập khóa học              │
│  ✅ Bạn có thể tiếp tục mời Giảng viên đóng góp                 │
│                                                                 │
│  ┌─────────────────────────┐                                    │
│  │  Xem danh sách giảng viên │                                  │
│  └─────────────────────────┘                                    │
│                                                                 │
│  Trân trọng,                                                    │
│  Hệ thống EMS                                                   │
└─────────────────────────────────────────────────────────────────┘
```

<!-- ### Trang đăng ký (khi chưa có tài khoản)
```
┌─────────────────────────────────────────────────────────────────┐
│  Đăng ký tài khoản để chấp nhận lời mời                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📚 Bạn đã được mời tham gia khóa học:                          │
│     "Toán nâng cao - Lớp 12" - THPT ABC                         │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Vui lòng đăng ký tài khoản để tiếp tục:                        │
│                                                                 │
│  Email *                                                        │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ nguyenvana@example.com (đã điền sẵn)                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Họ và tên *                                                    │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Mật khẩu *                                                     │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Số điện thoại                                                  │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Chuyên môn                                                     │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│                                                                 │
│              [Quay lại]    [Đăng ký và chấp nhận]               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```-->

**Hành vi của quy trình**:
- Khi nhấn "Chấp nhận lời mời": hiển thị hộp thoại xác nhận với thông tin đầy đủ
- Khi nhấn "Xác nhận chấp nhận": xử lý chấp nhận, hiển thị loading spinner
- Sau khi chấp nhận thành công: hiển thị thông báo thành công trong 3 giây, tự động chuyển đến trang khóa học
- Email xác nhận gửi tự động đến giảng viên và School Admin
- Nếu chưa có tài khoản: hiển thị form đăng ký trước, sau đó tự động xử lý chấp nhận
- Nếu chưa đăng nhập: hiển thị form đăng nhập trước, sau đó quay lại trang chi tiết lời mời

---

## Out of Scope Item
- **Conditional acceptance**: Giảng viên chấp nhận với điều kiện (VD: yêu cầu thay đổi phạm vi đóng góp) (out of scope)
- **Negotiation feature**: Chat/trao đổi với School Admin trước khi chấp nhận (có thể làm sau)
- **Acceptance with availability calendar**: Giảng viên cung cấp lịch có thể làm việc khi chấp nhận (out of scope)
- **Bulk acceptance**: Chấp nhận nhiều lời mời cùng lúc (chỉ chấp nhận từng lời mời riêng cho MVP)
- **Social sharing**: Chia sẻ việc tham gia khóa học lên mạng xã hội (out of scope)
- **Welcome onboarding flow**: Hướng dẫn sử dụng hệ thống chi tiết cho giảng viên mới (có thể làm sau)
- **Contract/Agreement signing**: Ký hợp đồng điện tử khi chấp nhận (out of scope cho MVP)
- **Payment/Compensation discussion**: Thảo luận về phí giảng dạy khi chấp nhận (out of scope)
