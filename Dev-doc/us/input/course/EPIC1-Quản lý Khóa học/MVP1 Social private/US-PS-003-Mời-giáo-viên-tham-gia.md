# US-PS-003 - Mời giáo viên tham gia

## User story Title
US-PS-003 - Mời giáo viên tham gia (Invite Instructors)

Là một **School Admin của trường tư**

Tôi muốn thực hiện mời các giáo viên tự do tham gia đóng góp nội dung cho khóa học** tại **trang Invite Instructors của sản phẩm LMS**

Để xây dựng đội ngũ giảng dạy, phân công vai trò và phạm vi đóng góp cho mỗi giáo viên, và bắt đầu quá trình cộng tác tạo nội dung

---

## Acceptance criteria

### AC-1: Happy Path - Gửi lời mời thành công cho giáo viên với vai trò Giảng viên chủ trì
- **Tại** trang "Mời giảng viên" với khóa học ở trạng thái **Đã lưu  ** 
- **Khi** Quản trị viên nhà trường chọn 1 giáo viên tự do, phân công vai trò **Giảng viên chủ trì**, nhập nội dung lời mời (không bắt buộc), sau đó nhấn "Gửi lời mời"
- **Thì** hệ thống:
  - Tạo bản ghi **lời mời** với vai trò **Giảng viên chủ trì**, trạng thái **Đang chờ phản hồi**, mã lời mời duy nhất
  - KHÔNG yêu cầu chỉ định phạm vi đóng góp (vì Giảng viên chủ trì có quyền truy cập và đóng góp toàn bộ khóa học)
  - Gửi lời mời theo 2 kênh:
    + Email đến giảng viên
    + Thông báo trong tài khoản của giảng viên được mời
  - Đặt thời hạn phản hồi = 7 ngày
  - Cập nhật **trạng thái khóa học** thành **Đang mời giảng viên**
  - Gửi sự kiện "Đã mời giảng viên" vào hệ thống
  - Hiển thị thông báo "Đã gửi lời mời đến giảng viên thành công"
  - Chuyển hướng đến trang "Xem danh sách lời mời"

<!-- ### AC-2: Happy Path - Gửi lời mời thành công cho giáo viên với vai trò Giảng viên đóng góp
- **Tại** trang "Mời giảng viên" 
- **Khi** Quản trị viên chọn giáo viên tự do, phân công vai trò **Giảng viên đóng góp**, chỉ định phạm vi đóng góp (chọn các chương/bài học cụ thể và các quyền), nhập nội dung lời mời (không bắt buộc), sau đó nhấn "Gửi lời mời"
- **Thì** hệ thống:
  - Tạo bản ghi lời mời với vai trò **Giảng viên đóng góp**, trạng thái **Đang chờ phản hồi**, mã lời mời duy nhất
  - Lưu thông tin phạm vi đóng góp đã chỉ định
  - Kích hoạt quy trình tự động gửi email với đường dẫn lời mời và đếm ngược 7 ngày
  - Gửi sự kiện "Đã mời giảng viên" vào hệ thống
  - Hiển thị thông báo "Đã gửi lời mời đến giảng viên thành công"
  - Cho phép tiếp tục mời thêm Giảng viên đóng góp khác  -->

### AC-3: Validation - Chỉ được chọn 1 vai trò cho mỗi lần mời
- **Tại** trang "Mời giảng viên"
- **Khi** Quản trị viên chọn giáo viên
- **Thì** hệ thống chỉ cho phép chọn 1 vai trò: hoặc **Giảng viên chủ trì** HOẶC **Giảng viên đóng góp** HOẶC **Giảng viên phản biện**

### AC-4: Validation - Không được mời vai trò Giảng viên phản biện
- **Tại** trang "Mời giảng viên"
- **Khi** Quản trị viên cố gắng chọn vai trò "Giảng viên phản biện"
- **Thì** hệ thống:
  - Vô hiệu hóa hoặc ẩn tùy chọn "Giảng viên phản biện" trong danh sách vai trò
  - Hoặc hiển thị thông báo "Vai trò Giảng viên phản biện hiện chưa được hỗ trợ" 

### AC-5: Validation - Không được mời vai trò Giảng viên đóng góp
- **Tại** trang "Mời giảng viên"
- **Khi** Quản trị viên cố gắng chọn vai trò "Giảng viên đóng góp"
- **Thì** hệ thống:
  - Vô hiệu hóa hoặc ẩn tùy chọn "Giảng viên đóng gópn" trong danh sách vai trò
  - Hoặc hiển thị thông báo "Vai trò Giảng viên đóng góp hiện chưa được hỗ trợ" 

### AC-6: Validation - Giảng viên chủ trì không được chỉ định phạm vi đóng góp
- **Tại** trang "Mời giảng viên"
- **Khi** Quản trị viên chọn vai trò **Giảng viên chủ trì**
- **Thì** hệ thống:
  - Ẩn hoặc vô hiệu hóa phần "Chỉ định phạm vi đóng góp"
  - Tự động gán quyền truy cập toàn bộ khóa học cho giảng viên này

<!-- ### AC-7: Validation - Giảng viên đóng góp phải chỉ định phạm vi đóng góp (out of scope)
- **Tại** trang "Mời giảng viên"
- **Khi** Quản trị viên chọn vai trò **Giảng viên đóng góp** nhưng không chỉ định phạm vi đóng góp (không chọn chương/bài học hoặc quyền)
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi "Giảng viên đóng góp phải được chỉ định phạm vi đóng góp cụ thể"
  - Không cho phép gửi lời mời cho đến khi phạm vi đóng góp được chỉ định đầy đủ -->

### AC-8: Validation - Chỉ được mời 1 giảng viên chủ trì
- **Tại** trang "Mời giảng viên"
- **Khi** Quản trị viên chọn một giáo viên cho khóa học này với vai trò "Giảng viên chủ trì"
- **Thì** hệ thống vô hiệu hóa các giáo viên khác có trong danh sách, không cho phép chọn giáo viên khác.

<!--
### AC-9: Validation - Không được mời trùng lặp giáo viên cho cùng khóa học
- **Tại** trang "Mời giảng viên"
- **Khi** Quản trị viên chọn một giáo viên đã được mời trước đó cho khóa học này
- **Thì** hệ thống hiển thị thông báo cảnh báo "Giảng viên [Tên] đã được mời cho khóa học này rồi" khi chọn giáo viên, vô hiệu hóa lựa chọn đó trong danh sách, không cho phép gửi nếu vẫn chọn -->

### AC-10: Tạo mã lời mời duy nhất và thiết lập thời hạn 7 ngày
- **Tại** hệ thống backend khi tạo bản ghi lời mời
- **Khi** hệ thống lưu lời mời vào cơ sở dữ liệu
- **Thì** hệ thống:
+ Tạo mã lời mời duy nhất theo định dạng "INV-[Năm]-[Mã ngẫu nhiên 8 ký tự]" (VD: INV-2025-ABCD1234)
+ Ghi nhận thời điểm gửi mời, tính thời điểm hết hạn = thời điểm gửi + 7 ngày, lưu vào bảng dữ liệu, 
+ Đảm bảo mã lời mời là duy nhất

### AC-11: Gửi email lời mời và gửi lời mời cho tài khoản giáo viên với quy trình tự động và đếm ngược 7 ngày
- **Tại** dịch vụ thông báo khi nhận sự kiện "Đã mời giảng viên"
- **Khi** sự kiện được xử lý từ hệ thống
- **Thì** hệ thống:
+ Gửi email đến địa chỉ email giảng viên với tiêu đề "Mời bạn tham gia giảng dạy [Tên khóa học]"
+ Gửi lời mời tới tài khoản giảng viên được mời
+ Hệ thống bắt đầu bộ đếm 7 ngày
+ Quy trình tự động kích hoạt đếm ngược sau 7 ngày để tự động cập nhật trạng thái = **Đã hết hạn** nếu giảng viên chưa phản hồi

### AC-12: Hiển thị danh sách giáo viên tự do khả dụng
- **Tại** trang "Mời giảng viên"
- **Khi** Quản trị viên mở danh sách "Chọn giảng viên"
- **Thì** hệ thống:
+ Lấy danh sách giáo viên tự do đã hợp tác trong Partnership Management (trạng thái hợp đồng = Đang hoạt động), 
+ Loại trừ các giáo viên đã được mời cho khóa học này
+ Hiển thị danh sách với ảnh đại diện, tên, email, môn chuyên môn
+ Hỗ trợ tìm kiếm theo tên/email 
+ Hỗ trợ tìm kiếm theo bộ lọc:  
  - Môn học 
  - Chủ đề  
  - Đối tượng 
    + Mầm non
    + Cấp 1/ Cấp 2/ Cấp 3
    + Giáo dục bậc cao 
    + Không cụ thể
    + Chứng chỉ 
  - Lớp (Enable Nếu đối tượng = Cấp 1/ Cấp 2/ Cấp 3)
    + Lớp 1 -> Lớp 12 
  - Trình độ (Enable Nếu đối tượng = Giáo dục bậc cao, Không cụ thể)
    + Chọn: Cơ bản / Trung cấp / Nâng cao / Tất cả 
  - Ngôn ngữ giảng dạy: Tiếng Việt/ Tiếng Anh 

### AC-12: Xử lý lỗi kết nối cơ sở dữ liệu khi lưu lời mời
- **Tại** hệ thống backend khi nhấn "Gửi lời mời"
- **Khi** kết nối cơ sở dữ liệu bị lỗi
- **Thì** hệ thống hoàn tác toàn bộ giao dịch (không tạo bản ghi lời mời nào), hiển thị thông báo lỗi "Không thể gửi lời mời. Vui lòng kiểm tra kết nối và thử lại", ghi nhận lỗi với mã DB-CONN-002, trạng thái khóa học không thay đổi, cho phép Quản trị viên thử lại

<!--### AC-13: Xử lý lỗi gửi email
- **Tại** dịch vụ thông báo khi gửi email
- **Khi** máy chủ email lỗi hoặc địa chỉ email giảng viên không hợp lệ
- **Thì** hệ thống thử gửi lại email 3 lần với khoảng cách tăng dần (1 giây, 3 giây, 9 giây), nếu vẫn thất bại thì ghi nhận lỗi EMAIL-FAIL-001 với mã giảng viên và chi tiết lỗi, lưu bản ghi lời mời với trạng thái = **Đang chờ phản hồi** (vì có thể gửi lại sau), hiển thị cảnh báo cho Quản trị viên "Đã tạo lời mời nhưng email có thể chưa được gửi đến [địa chỉ email]" -->

---

## Inline business rule

| Trường thông tin                  | Mã BR     | Business rule                                                          | Ghi chú                                    |
|-----------------------------------|-----------|------------------------------------------------------------------------|--------------------------------------------|
| Lời mời                           | BR-PI-001 | Phải có ít nhất 1 lời mời giảng viên                                   | Kiểm tra quan trọng                        |                           |
| Vai trò - Giảng viên chủ trì      | BR-PS-055 | Khi vai trò = Giảng viên chủ trì thì phạm vi đóng góp mặc định là tất cả Course | Chủ trì có quyền toàn bộ khóa học    |
| Vai trò - Giảng viên đóng góp     | BR-PS-056 | Khi vai trò = Giảng viên đóng góp thì phạm vi đóng góp bắt buộc phải có (out of scope) | Đóng góp cần chỉ định phạm vi (out of scope)         |
| Vai trò - Giảng viên phản biện    | BR-PS-057 | Vai trò Giảng viên phản biện không được hỗ trợ (out of scope)          | Tắt tính năng này                          |
| Lời mời giảng viên                | BR-PI-004 | Một giảng viên chỉ được mời 1 lần cho cùng 1 khóa học                  | Ràng buộc duy nhất                         |
| Mã lời mời                        | BR-PS-041 | Định dạng: INV-[Năm]-[Mã ngẫu nhiên 8 ký tự]                           | VD: INV-2025-ABCD1234                      |
| Mã lời mời                        | BR-PS-042 | Phải duy nhất trong toàn hệ thống                                      | Ràng buộc duy nhất                         |
| Thời điểm gửi mời                 | BR-PS-043 | Tự động ghi nhận khi tạo lời mời                                       | Hệ thống tự tạo                            |
| Thời điểm hết hạn                 | BR-PI-003 | Lời mời hết hạn sau 7 ngày (thời điểm gửi + 7 ngày)                    | Đếm ngược tự động                          |
| Trạng thái lời mời                | BR-PS-044 | Trạng thái ban đầu = Đang chờ phản hồi khi tạo lời mời                 | Kiểm tra hợp lệ                            |
| Trạng thái lời mời                | BR-PS-045 | Các trạng thái hợp lệ: Đang chờ, Đã chấp nhận, Đã từ chối, Đã thu hồi, Đã hết hạn | Ràng buộc danh sách                |
| Vai trò                           | BR-PS-046 | Các vai trò hiển thị: Giảng viên chủ trì, (Giảng viên đóng góp, Giảng viên phản biện bị tắt) | Ràng buộc danh sách            |
| Phạm vi đóng góp                  | BR-PS-047 | Định dạng dữ liệu hợp lệ: danh sách chương, bài học, quyền             | Kiểm tra cấu trúc                          |
| Danh sách ID chương               | BR-PS-048 | Tất cả mã chương phải tồn tại trong khóa học                           | Kiểm tra tham chiếu                        |
| Danh sách ID bài học              | BR-PS-049 | Tất cả mã bài học phải tồn tại trong các chương của khóa học           | Kiểm tra tham chiếu                        |
| Danh sách quyền                   | BR-PS-050 | Các quyền hợp lệ: Tải video, Chỉnh sửa mô tả, Tải audio, Thêm tài liệu            | Kiểm tra hợp lệ                            |
| Nội dung lời mời                  | BR-PS-051 | Không bắt buộc, tối đa 2000 ký tự                                      | Trường văn bản                             |
| Nội dung lời mời                  | BR-PS-052 | Hỗ trợ tiếng Việt có dấu                                               |                                            |
| Giảng viên                        | BR-PS-053 | Giảng viên phải tồn tại trong dịch vụ hồ sơ giáo viên                  | Kiểm tra dịch vụ ngoài                     |
| Giảng viên                        | BR-PS-054 | Giảng viên phải có trạng thái = Đang hoạt động                              | Kiểm tra nghiệp vụ                         |

---
## Format Email ##

### Email mời giáo viên biên soạn khóa học 

**Subject:** Mời bạn tham gia biên soạn và giảng dạy khóa học “[Tên khóa học]”

**Body:**
```
Chào [Tên giảng viên],

[Trường/Tổ chức] trân trọng mời bạn tham gia vào đội ngũ giảng dạy của khóa học “[Tên khóa học]” với vai trò: [Vai trò].

Lời nhắn từ Quản trị viên:
"[Nội dung lời mời nếu có]"

Thông tin khóa học:
- Tên khóa học: [Tên khóa học]
- Vai trò: [Tên vai trò]
- Thời hạn phản hồi: đến ngày [DD/MM/YYYY]

Bạn vui lòng nhấn vào liên kết dưới đây để chấp nhận lời mời:
[Link chấp nhận lời mời]

Hoặc đăng nhập vào tài khoản LMS của bạn để xem và phản hồi lời mời tại mục “Lời mời cộng tác”.

Nếu bạn không phản hồi trong vòng 7 ngày, lời mời sẽ tự động hết hạn.

Trân trọng,
[Trường/Tổ chức]
```
**Trong đó:**
- [Tên khóa học]: Tên khóa học dùng để mời giảng viên
- [Tên giảng viên]: Tên giảng viên được mời
- [Trường/Tổ chức]: Tên nhà trường/ tổ chức Social School
- [Nội dung lời mời nếu có]: Nội dung lời mời nếu có
- [Tên vai trò]: Vai trò được mời: Giảng viên chủ trì
- [DD/MM/YYYY]: Ngày hiện tại + 7
- [Link chấp nhận lời mời]: Là link liên kết tới khóa học được mời, link tới trang trang Lời mời cộng tác -> Lời mời đang chờ trong tài khoản giáo viên được mời

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho School Admin xây dựng đội ngũ giảng dạy từ các giáo viên tự do, khởi động quá trình cộng tác tạo nội dung, và quản lý phân công vai trò rõ ràng cho mỗi instructor**
Trọng số của story này là **13**

Story được coi là thành công khi nó đảm bảo được:
- Quản trị viên có thể mời giảng viên trong vòng 2 phút
- 100% lời mời được tạo thành công với mã lời mời duy nhất
- Tỷ lệ gửi email thành công >= 98%
- Hệ thống tự động cập nhật trạng thái Đã hết hạn chính xác 100% sau 7 ngày
- Tỷ lệ lỗi validation < 5% (Quản trị viên hiểu rõ yêu cầu về vai trò Giảng viên chủ trì)
- Trung bình 70% giảng viên chấp nhận lời mời trong vòng 3 ngày đầu

---

## Dependencies
- **lf-course service**: Tạo bản ghi lời mời giảng viên, kiểm tra business rules
- **tf-teacher-profile service**: Lấy danh sách giảng viên tự do khả dụng
- **notification-service**: Gửi email lời mời với cơ chế thử lại
- **US-PS-002**: Cấu trúc chương trình phải được tạo trước khi mời giảng viên

---

## Impact Analysis
- **Frontend (ReactJS/NextJS)**:
  - UI "Mời giảng viên" với khả năng chọn 1 giảng viên từ danh sách giảng viên tự do
  - Form phân công vai trò: hiển thị 3 lựa chọn (Giảng viên chủ trì, Giảng viên đóng góp, Giảng viên phản biện), disbale 2 lựa chọn Giảng viên đóng góp và Giảng viên phản biện
  - Khi chọn vai trò Giảng viên chủ trì: ẩn/tắt phần chỉ định phạm vi đóng góp
  <!-- - Khi chọn vai trò Giảng viên đóng góp: hiển thị bắt buộc phần chỉ định phạm vi đóng góp (checkboxes cho chương/bài học, multi-select quyền) -->
  - Ô nhập nội dung lời mời (không bắt buộc, tối đa 2000 ký tự)
  <!-- - Validation UI: kiểm tra đã có Giảng viên chủ trì chấp nhận lời mời trước khi cho phép mời Giảng viên đóng góp -->
  - Tìm kiếm/lọc giảng viên theo tên, email, chuyên môn
  - Kiểm tra real-time khi chọn giảng viên (kiểm tra trùng lặp)

- **Backend (Java/Spring Boot)**:
  - API endpoint lấy danh sách giảng viên tự do khả dụng (loại trừ giảng viên đã được mời)
  - API endpoint tạo lời mời giảng viên cho khóa học
  - Validation logic:
    - Kiểm tra giảng viên chưa được mời cho khóa học này
    - Nếu vai trò = Giảng viên chủ trì: phạm vi đóng góp = NULL
    <!-- - Nếu vai trò = Giảng viên đóng góp: phạm vi đóng góp bắt buộc phải có
    - Nếu vai trò = Giảng viên đóng góp: phải có Giảng viên chủ trì đã chấp nhận lời mời -->
  - Tạo mã lời mời duy nhất
  - Quản lý transaction để đảm bảo tính toàn vẹn dữ liệu
  - Gửi thông báo email đến giảng viên

- **Business Process**:
  - Trạng thái khóa học: Đã lưu → Đang mời giảng viên
  - Quy trình: Thiết kế cấu trúc → Mời giảng viên
  - Theo dõi phản hồi trong vòng 7 ngày
  - Sau khi tất cả giảng viên chấp nhận: chuyển sang bước tạo PIM (sẽ xử lý ở story khác)
  - Nếu có giảng viên từ chối hoặc hết hạn: Quản trị viên phải mời người thay thế (xử lý ở US-PS-004, US-PS-005)

---

## UI/UX Design
Link mockup: https://gemini.google.com/share/b8c2b805bfb7
### Trang Mời Giảng viên - Trường hợp mời Giảng viên chủ trì
```
┌─────────────────────────────────────────────────────────────────┐
│ Khóa học: Toán nâng cao | Trạng thái: Bản nháp                  │
│ Bước: Mời giảng viên (2/5)                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Mời giảng viên tham gia                                        │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Tìm kiếm giảng viên                                            │
│  ┌─────────────────────────────────────────┐ [🔍 Tìm kiếm]      │
│  │ Tìm theo tên hoặc email...              │                   │
│  └─────────────────────────────────────────┘                   │
│                                                                 │
│  Giảng viên khả dụng (15 tìm thấy)           [Môn học: Toán ▼] │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ ○ [👤] Nguyễn Văn A - nguyenvana@example.com              │ │
│  │      Giáo viên Toán | 5 năm kinh nghiệm | ⭐ 4.8/5         │ │
│  │                                                             │ │
│  │ ○ [👤] Trần Thị B - tranthib@example.com                   │ │
│  │      Giáo viên Toán | 3 năm kinh nghiệm | ⭐ 4.6/5         │ │
│  │                                                             │ │
│  │ ◉ [👤] Lê Văn C - levanc@example.com [ĐÃ MỜI]             │ │
│  │      (Đã mời cho khóa học này)                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Thông tin lời mời                                              │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Giảng viên được chọn: Nguyễn Văn A (nguyenvana@example.com)    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Vai trò *     : ● Giảng viên chủ trì                    │   │
│  │                 ○ Giảng viên đóng góp                   │   │
│  │                                                         │   │
│  │                                                          │   │
│  │ (Giảng viên chủ trì có quyền truy cập toàn bộ khóa học)  │   │
│  │                                                           │   │
│  │ Nội dung lời mời (không bắt buộc):                        │   │
│  │ ┌───────────────────────────────────────────────────────┐ │   │
│  │ │ Chào thầy, chúng tôi rất mong muốn thầy/cô tham gia     │ │   │
│  │ │ với vai trò Giảng viên chủ trì cho khóa học này...   │ │   │
│  │ └───────────────────────────────────────────────────────┘ │   │
│  │ (0/2000 ký tự)                                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│                   [Quay lại] [Gửi lời mời]                      │
└─────────────────────────────────────────────────────────────────┘
```

### Trang Mời Giảng viên - Trường hợp mời Giảng viên đóng góp
```
┌─────────────────────────────────────────────────────────────────┐
│ Khóa học: Toán nâng cao | Trạng thái: Đang mời giảng viên       │
│ Bước: Mời giảng viên (2/5)                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Mời giảng viên đóng góp                                        │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│                                                                 │
│  Giảng viên được chọn: Trần Thị B (tranthib@example.com)        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Vai trò *     : ○ Giảng viên chủ trì                    │   │
│  │                 ● Giảng viên đóng góp                    │   │
│  │                                                           │   │
│  │ Phạm vi đóng góp * (bắt buộc):                            │   │
│  │                                                           │   │
│  │ Chương:                                                   │   │
│  │ ☐ Chương 1: Đại số                                        │   │
│  │ ☐ Chương 2: Hình học                                      │   │
│  │ ☑ Chương 3: Giải tích                                     │   │
│  │                                                           │   │
│  │ Bài học (trong chương đã chọn):                           │   │
│  │ ☑ Bài 3.1: Giới hạn                                       │   │
│  │ ☑ Bài 3.2: Đạo hàm                                        │   │
│  │ ☑ Bài 3.3: Tích phân                                      │   │
│  │                                                          │   │
│  │ Quyền hạn:                                               │   │
│  │ ☑ Tải video                                              │   │
│  │ ☐ Tải audio                                              │   │
│  │ ☑ Thêm tài liệu (image, tài liệu)                        │   │
│  │                                                           │   │
│  │ Nội dung lời mời (không bắt buộc):                        │   │
│  │ ┌───────────────────────────────────────────────────────┐ │   │
│  │ │ Chào cô, chúng tôi mong muốn cô đóng góp nội dung    │ │   │
│  │ │ cho phần Giải tích...                                │ │   │
│  │ └───────────────────────────────────────────────────────┘ │   │
│  │ (0/2000 ký tự)                                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│                   [Quay lại] [Gửi lời mời]                      │
└─────────────────────────────────────────────────────────────────┘
```

### Hộp thoại Xác nhận
```
┌──────────────────────────────────────────┐
│  Xác nhận gửi lời mời                    │
├──────────────────────────────────────────┤
│                                          │
│  Bạn chuẩn bị gửi lời mời đến:           │
│                                          │
│  • Nguyễn Văn A                          │
│    (Giảng viên chủ trì)                  │
│                                          │
│  Lời mời sẽ hết hạn sau 7 ngày.          │
│  Giảng viên sẽ nhận email thông báo.     │
│                                          │
│  Tiếp tục?                               │
│                                          │
│           [Hủy] [Xác nhận gửi]           │
└──────────────────────────────────────────┘
```

### Thông báo Thành công
```
┌────────────────────────────────────────────────┐
│  ✓ Đã gửi lời mời thành công                   │
├────────────────────────────────────────────────┤
│                                                │
│  Lời mời đã được gửi đến:                      │
│                                                │
│  ✓ Nguyễn Văn A (Giảng viên chủ trì)           │
│    Email đã gửi đến nguyenvana@example.com     │
│    Hết hạn: 13/12/2025                         │
│                                                │
│  Trạng thái khóa học: Đang mời giảng viên      │
│                                                │
│      [Xem danh sách lời mời] [Quay lại]        │
└────────────────────────────────────────────────┘
```

**Hành vi của quy trình**:
- Tự động tải danh sách giảng viên tự do khi mở trang
- Lọc bỏ các giảng viên đã được mời (hiển thị với nhãn "ĐÃ MỜI")
- Kiểm tra real-time khi chọn vai trò
- Khi chọn Giảng viên chủ trì: tắt lựa chọn Giảng viên đóng góp nếu chưa có Giảng viên chủ trì chấp nhận
- Khi chọn Giảng viên đóng góp: bắt buộc phải chỉ định phạm vi đóng góp
- Sau khi gửi: chuyển đến trang "Xem danh sách lời mời" (US-PS-006)

---

## Out of Scope Item
- **Instructor Role**: CONTRIBUTOR, REVIEWER
- **Bulk invite from CSV/Excel**: Import danh sách instructors từ file (có thể làm sau)
- **Instructor profile preview**: Xem chi tiết profile, portfolio, reviews của instructor trước khi mời (nice-to-have)
- **Custom invitation templates**: Admin tạo email templates riêng (sử dụng default template cho MVP)
- **Invitation reminder emails**: Gửi email nhắc nhở trước khi hết hạn (có thể làm sau)
- **Instructor recommendation AI**: Gợi ý instructors phù hợp dựa trên subject và content (out of scope cho MVP)
- **Multi-language invitation emails**: Email hỗ trợ nhiều ngôn ngữ (chỉ hỗ trợ tiếng Việt cho MVP)
- **Invitation analytics**: Track open rate, click rate của invitation emails (có thể làm sau)
- **Custom expiry time**: Admin tùy chỉnh thời gian hết hạn (fixed 7 days cho MVP)
- **Group invitations**: Mời cả nhóm instructors cùng lúc với settings giống nhau (có thể làm sau)

