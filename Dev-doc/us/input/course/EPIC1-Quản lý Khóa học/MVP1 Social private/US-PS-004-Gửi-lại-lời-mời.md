# US-PS-004 - Gửi lại lời mời

## User story Title
US-PS-004 - Gửi lại lời mời (Resend Invitation)

Là một **School Admin của trường tư**

Tôi muốn thực hiện **gửi lại lời mời cho các giáo viên có invitation đã hết hạn (EXPIRED)** tại **trang View Invitations của sản phẩm LMS**

Để **cho giáo viên thêm cơ hội tham gia khóa học khi họ bỏ lỡ invitation ban đầu, và tiếp tục xây dựng đội ngũ giảng dạy cho course**

---

## Acceptance criteria

### AC-1: Happy Path - Gửi lại lời mời thành công cho lời mời đã hết hạn
- **Tại** trang "Xem danh sách lời mời" với lời mời có trạng thái = **Đã hết hạn**
- **Khi** Quản trị viên nhà trường nhấn nút "Gửi lại" trên lời mời đã hết hạn, xác nhận hộp thoại "Gửi lại lời mời cho [Tên giảng viên]?", sau đó nhấn "Xác nhận gửi lại"
- **Thì** hệ thống:
  - Tạo mã lời mời duy nhất mới
  - Cập nhật bản ghi: trạng thái = **Đang chờ phản hồi**, thời điểm gửi mới, thời điểm hết hạn mới (+7 ngày), xóa thời điểm phản hồi cũ
  - Kích hoạt quy trình tự động với đếm ngược 7 ngày mới
  - Gửi lời mời mới theo 2 kênh:
    + Email đến giảng viên
    + Thông báo trong tài khoản của giảng viên được mời
  - Gửi sự kiện "Đã mời giảng viên" vào hệ thống
  - Hiển thị thông báo "Đã gửi lại lời mời thành công cho [Tên giảng viên]"
  - Cập nhật danh sách lời mời với trạng thái **Đang chờ phản hồi** và đếm ngược 7 ngày
  - Chuyển khóa học trong giao diện giảng viên:
    + Từ tab “Lời mời hết hạn” → sang “Đã chấp nhận”

### AC-2: Validation - Chỉ gửi lại được lời mời đã hết hạn
- **Tại** trang "Xem danh sách lời mời"
- **Khi** Quản trị viên cố gắng gửi lại lời mời có trạng thái khác **Đã hết hạn** (Đang chờ phản hồi/Đã chấp nhận/Đã từ chối/Đã thu hồi)
- **Thì** hệ thống vô hiệu hóa nút "Gửi lại" cho những lời mời này, nếu Quản trị viên vẫn kích hoạt gửi lại (qua API hack) thì trả về lỗi 400 "Không thể gửi lại lời mời có trạng thái [trạng thái]. Chỉ lời mời đã hết hạn mới có thể gửi lại", không thay đổi dữ liệu

### AC-3: Validation - Không gửi lại được nếu khóa học đã xuất bản
- **Tại** trang "Xem danh sách lời mời" với trạng thái khóa học = **Đã xuất bản**
- **Khi** Quản trị viên nhấn "Gửi lại" cho lời mời đã hết hạn
- **Thì** hệ thống hiển thị thông báo lỗi "Không thể gửi lại lời mời sau khi khóa học đã được xuất bản", không cho phép gửi lại, nút "Gửi lại" bị vô hiệu hóa cho tất cả lời mời

### AC-4: Tạo mã lời mời mới khi gửi lại
- **Tại** hệ thống backend khi xử lý yêu cầu gửi lại
- **Khi** hệ thống gửi lại lời mời
- **Thì** hệ thống tạo mã lời mời duy nhất mới theo định dạng "INV-[Năm]-[Mã ngẫu nhiên 8 ký tự]" (khác với mã cũ), cập nhật mã lời mời với mã mới, vô hiệu hóa mã lời mời cũ (đường dẫn cũ sẽ không hoạt động), đảm bảo tính duy nhất

### AC-5: Thiết lập lại thời điểm gửi và hết hạn với lịch trình mới
- **Tại** hệ thống backend khi gửi lại lời mời
- **Khi** Quản trị viên xác nhận gửi lại
- **Thì** hệ thống cập nhật: thời điểm gửi mời = hiện tại (thiết lập lại), thời điểm hết hạn = hiện tại + 7 ngày (7 ngày mới từ thời điểm gửi lại), thời điểm phản hồi = NULL (xóa phản hồi cũ nếu có), phiên bản = phiên bản + 1, thời điểm cập nhật = hiện tại

### AC-6: Gửi email mới với quy trình tự động đếm ngược mới
- **Tại** dịch vụ thông báo khi nhận sự kiện "Đã mời giảng viên" từ gửi lại
- **Khi** sự kiện được xử lý
- **Thì** hệ thống gửi email đến giảng viên với tiêu đề "Nhắc nhở: Mời bạn tham gia giảng dạy [Tên khóa học]", nội dung đề cập "Đây là lời mời được gửi lại", đường dẫn lời mời mới với mã lời mời mới, ngày hết hạn mới (7 ngày từ thời điểm gửi lại), quy trình tự động kích hoạt đếm ngược mới sau 7 ngày để tự động cập nhật **Đã hết hạn** nếu chưa phản hồi

### AC-7: Kiểm tra giảng viên vẫn còn hợp lệ
- **Tại** hệ thống backend khi gửi lại lời mời
- **Khi** hệ thống kiểm tra giảng viên từ dịch vụ hồ sơ giáo viên (Partnership Management)
- **Thì** nếu giảng viên đã bị xóa hoặc trạng thái khác "Đang hoạt động" thì trả về lỗi "Giảng viên không còn khả dụng. Không thể gửi lại lời mời", không cho phép gửi lại, Quản trị viên phải mời giảng viên khác

### AC-8: Hủy bỏ thao tác gửi lại với hộp thoại xác nhận
- **Tại** trang "Xem danh sách lời mời"
- **Khi** Quản trị viên nhấn nút "Gửi lại" nhưng nhấn "Hủy" trong hộp thoại xác nhận
- **Thì** hệ thống đóng hộp thoại, không thay đổi trạng thái lời mời, không gửi email, không tạo mã mới

### AC-9: Xử lý lỗi kết nối cơ sở dữ liệu khi gửi lại
- **Tại** hệ thống backend khi cập nhật bản ghi lời mời
- **Khi** kết nối cơ sở dữ liệu bị lỗi
- **Thì** hệ thống hoàn tác giao dịch, hiển thị thông báo lỗi "Không thể gửi lại lời mời. Vui lòng kiểm tra kết nối và thử lại", ghi nhận lỗi DB-CONN-003, trạng thái lời mời vẫn ở **Đã hết hạn**, cho phép Quản trị viên thử lại

<!-- ### AC-10: Xử lý lỗi gửi email khi gửi lại
- **Tại** dịch vụ thông báo khi gửi email gửi lại
- **Khi** máy chủ email lỗi hoặc địa chỉ email giảng viên không hợp lệ
- **Thì** hệ thống thử gửi lại email 3 lần với khoảng cách tăng dần (1 giây, 3 giây, 9 giây), nếu vẫn thất bại thì ghi nhận lỗi EMAIL-FAIL-002, trạng thái lời mời đã cập nhật thành **Đang chờ phản hồi** (vì có thể gửi lại thủ công sau), hiển thị cảnh báo "Đã gửi lại lời mời nhưng email có thể chưa được gửi đến [địa chỉ email]. Vui lòng xác minh địa chỉ email của giảng viên" -->

---

## Inline business rule

| Trường thông tin        | Mã BR     | Business rule                                                          | Ghi chú                                    |
|-------------------------|-----------|------------------------------------------------------------------------|--------------------------------------------|
| Trạng thái lời mời      | BR-INV-003 | Chỉ lời mời đã hết hạn có thể gửi lại                                  | Kiểm tra quan trọng                        |
| Trạng thái khóa học     | BR-INV-004 | Không thể gửi lại sau khi khóa học đã xuất bản                         | Ràng buộc nghiệp vụ                        |
| Mã lời mời              | BR-PS-061 | Tạo mã duy nhất mới khi gửi lại (khác mã cũ)                           | Yêu cầu bảo mật                            |
| Mã lời mời cũ           | BR-PS-062 | Mã lời mời cũ bị vô hiệu hóa sau khi gửi lại (đường dẫn cũ không hoạt động) | Yêu cầu bảo mật                     |
| Thời điểm gửi mời       | BR-PS-063 | Thiết lập lại = hiện tại khi gửi lại                                   | Thiết lập lại lịch trình                   |
| Thời điểm hết hạn       | BR-PS-064 | Thiết lập lại = hiện tại + 7 ngày khi gửi lại (7 ngày mới)             | Thiết lập lại lịch trình                   |
| Thời điểm phản hồi      | BR-PS-065 | Xóa = NULL khi gửi lại (thiết lập lại trạng thái phản hồi)             | Dọn dẹp dữ liệu                            |
| Trạng thái lời mời      | BR-PS-066 | Cập nhật từ Đã hết hạn → Đang chờ phản hồi khi gửi lại                 | Chuyển trạng thái                          |
| Giảng viên              | BR-PS-067 | Giảng viên phải vẫn tồn tại và Hoạt động trong dịch vụ hồ sơ giáo viên | Kiểm tra dịch vụ ngoài                     |
| Trạng thái khóa học     | BR-PS-068 | Trạng thái khóa học không phải 'Đã xuất bản'                           | Kiểm tra nghiệp vụ                         |
| Quy trình tự động       | BR-PS-069 | Hủy quy trình cũ (nếu tồn tại) và kích hoạt quy trình mới với đếm ngược mới | Quản lý quy trình                    |
| Tiêu đề email           | BR-PS-070 | Tiêu đề email đề cập "Nhắc nhở" hoặc "Lời mời được gửi lại"           | Giao tiếp người dùng                       |
| Nội dung email          | BR-PS-071 | Nội dung email giải thích "Đây là lời mời được gửi lại"                | Giao tiếp người dùng                       |
| Link lời mời            | BR-PS-072 | Đường dẫn lời mời mới với mã lời mời mới                               | Bảo mật                                    |

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


## System rule
- Mã lời mời không thay đổi (cùng bản ghi, chỉ cập nhật các trường)
- Mã khóa học, mã giảng viên, vai trò, phạm vi đóng góp không thay đổi khi gửi lại
- Trạng thái khóa học không thay đổi khi gửi lại (vẫn giữ Đang mời giảng viên hoặc Đang xây dựng nội dung)
- Bước quy trình không thay đổi khi gửi lại
- Đường dẫn lời mời cũ (mã cũ) phải trả về lỗi "Lời mời này đã được gửi lại. Vui lòng kiểm tra email để lấy lời mời mới nhất"

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho School Admin phục hồi invitations bị hết hạn, tăng cơ hội instructor tham gia, giảm friction trong quá trình xây dựng đội ngũ giảng dạy**
Trọng số của story này là **5**

Story được coi là thành công khi nó đảm bảo được:
- Quản trị viên có thể gửi lại lời mời trong vòng 30 giây (từ nhấn Gửi lại đến nhận email)
- 100% lời mời gửi lại tạo mã lời mời duy nhất mới
- Tỷ lệ gửi lại thành công >= 95%
- Hệ thống tự động hết hạn hoạt động chính xác 100% (tự động hết hạn sau 7 ngày nếu không phản hồi)
- Trung bình 40% lời mời được gửi lại được chấp nhận (cao hơn 20% so với lời mời mới vì giảng viên đã biết về khóa học)
- Tỷ lệ gửi email thành công cho gửi lại >= 98%

---

## Dependencies
- **lf-course service**: Cập nhật bản ghi lời mời giảng viên, kiểm tra business rules
- **tf-teacher-profile service**: Kiểm tra giảng viên vẫn còn Hoạt động và khả dụng
- **notification-service**: Gửi email gửi lại với mẫu khác (đề cập "Nhắc nhở" hoặc "Gửi lại")
- **US-PS-003**: Lời mời phải đã được tạo trước và có trạng thái = Đã hết hạn

---

## Impact Analysis
- **Frontend (ReactJS/NextJS)**:
  - Nút "Gửi lại" chỉ hiển thị cho lời mời có trạng thái = Đã hết hạn
  - Vô hiệu hóa nút "Gửi lại" nếu trạng thái khóa học = Đã xuất bản
  - Hộp thoại xác nhận: "Gửi lại lời mời cho [Tên giảng viên]? Họ sẽ nhận email mới với thời hạn 7 ngày."
  - Thông báo thành công: "Đã gửi lại lời mời thành công cho [Tên]"
  - Cập nhật danh sách lời mời theo thời gian thực: trạng thái Đã hết hạn → Đang chờ phản hồi, cập nhật đồng hồ đếm ngược
  - Thông báo cảnh báo nếu gửi email thất bại

- **Backend**:
  - API endpoint gửi lại lời mời
  - Validation logic:
    - Kiểm tra trạng thái hiện tại = Đã hết hạn
    - Kiểm tra trạng thái khóa học không phải Đã xuất bản
    - Kiểm tra giảng viên vẫn còn Hoạt động trong dịch vụ hồ sơ giáo viên
  - Business logic:
    - Tạo mã lời mời duy nhất mới
    - Cập nhật bản ghi lời mời giảng viên (trạng thái, mã lời mời, thời điểm gửi, thời điểm hết hạn, thời điểm phản hồi)
    - Gửi thông báo email đến giảng viên

- **Business Process**:
  - Trạng thái lời mời: Đã hết hạn → Đang chờ phản hồi
  - Thiết lập lại lịch trình: thời điểm gửi mời, thời điểm hết hạn được thiết lập lại với 7 ngày mới
  - Giảng viên nhận email mới với đường dẫn mới
  - Đường dẫn lời mời cũ không còn hiệu lực (bảo mật)

---

## UI/UX Design

### View Invitations Page với Resend Button
```
┌─────────────────────────────────────────────────────────────────┐
│ Course: Advanced Mathematics | Status: INVITING_INSTRUCTORS     │
│ Invited Instructors (4)                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Filter: [All ▼] | Search: [____________] 🔍                    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ [👤] Nguyễn Văn A | OWNER                                  │ │
│  │ Status: ACCEPTED ✓                                         │ │
│  │ Invited: Dec 6, 2025 | Responded: Dec 7, 2025 (1 day)     │ │
│  │ [View Details]                                             │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ [👤] Trần Thị B | CONTRIBUTOR                              │ │
│  │ Status: PENDING ⏳ | Expires in: 5 days 3 hours            │ │
│  │ Invited: Dec 8, 2025 | Not yet responded                  │ │
│  │ [View Details]                                             │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ [👤] Lê Văn C | CONTRIBUTOR                                │ │
│  │ Status: EXPIRED ⚠️                                          │ │
│  │ Invited: Nov 29, 2025 | Expired: Dec 6, 2025              │ │
│  │ [View Details] [Resend Invitation]                         │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ [👤] Phạm Thị D | REVIEWER                                 │ │
│  │ Status: REJECTED ✗                                         │ │
│  │ Invited: Dec 5, 2025 | Rejected: Dec 6, 2025              │ │
│  │ Reason: "Tôi không có thời gian trong tháng này"          │ │
│  │ [View Details] [Invite Replacement]                        │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Summary: 1 Accepted | 1 Pending | 1 Expired | 1 Rejected      │
│                                                                 │
│                                        [+ Invite More]          │
└─────────────────────────────────────────────────────────────────┘
```

### Resend Confirmation Dialog
```
┌──────────────────────────────────────────┐
│  Resend Invitation                       │
├──────────────────────────────────────────┤
│                                          │
│  Resend invitation to:                   │
│  Lê Văn C (levanc@example.com)           │
│                                          │
│  Details:                                │
│  • Role: CONTRIBUTOR                     │
│  • Original invitation: Nov 29, 2025     │
│  • Expired: Dec 6, 2025                  │
│                                          │
│  A new invitation will be sent with:     │
│  • New invitation link                   │
│  • 7-day expiry from now                 │
│                                          │
│  The old invitation link will no         │
│  longer be valid.                        │
│                                          │
│  Continue?                               │
│                                          │
│           [Cancel] [Confirm Resend]      │
└──────────────────────────────────────────┘
```

### Success Message
```
┌────────────────────────────────────────────────┐
│  ✓ Invitation Resent Successfully              │
├────────────────────────────────────────────────┤
│                                                │
│  Invitation has been resent to:                │
│  Lê Văn C (levanc@example.com)                 │
│                                                │
│  New invitation details:                       │
│  • Status: PENDING                             │
│  • Sent: Dec 13, 2025 at 3:30 PM               │
│  • Expires: Dec 20, 2025 at 3:30 PM            │
│  • New invitation code: INV-2025-XYZ98765      │
│                                                │
│  Email notification sent.                      │
│                                                │
│                              [OK]               │
└────────────────────────────────────────────────┘
```

### Error Message - Course Published
```
┌────────────────────────────────────────────────┐
│  ✗ Cannot Resend Invitation                    │
├────────────────────────────────────────────────┤
│                                                │
│  Cannot resend invitation after course has     │
│  been published.                               │
│                                                │
│  Course status: PUBLISHED                      │
│                                                │
│  If you need to add instructors to a           │
│  published course, please contact support.     │
│                                                │
│                              [OK]               │
└────────────────────────────────────────────────┘
```

**UI States**:
- "Resend" button only visible for EXPIRED invitations
- "Resend" button disabled if course.status = PUBLISHED
- Real-time update after resend: status badge changes from EXPIRED → PENDING
- Countdown timer starts immediately after resend
- Toast notification for success/error

---

## Out of Scope Item
- **Instructor Role**: CONTRIBUTOR, REVIEWER
- **Automatic resend before expiry**: Tự động gửi lại invitation trước khi hết hạn (reminder automation - có thể làm sau)
- **Bulk resend**: Resend nhiều expired invitations cùng lúc (có thể làm sau khi có individual resend)
- **Custom message khi resend**: Admin viết custom message mới khi resend (sử dụng lại message cũ cho MVP)
- **Resend history tracking**: Track bao nhiêu lần invitation đã được resend (audit trail - có thể làm sau)
- **Change role/contribution_scope khi resend**: Modify invitation details khi resend (phức tạp, out of scope - Admin phải revoke và invite mới)
- **Resend to different email**: Thay đổi email instructor khi resend (phức tạp - phải update instructor profile trước)
- **Resend analytics**: Track resend rate, acceptance rate sau resend (analytics feature - out of scope cho MVP)
- **Scheduled resend**: Schedule resend vào thời gian cụ thể (scheduling feature - out of scope)
