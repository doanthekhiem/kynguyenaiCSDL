# US-PS-005 - Thu hồi lời mời

## User story Title
US-PS-005 - Thu hồi lời mời (Revoke Invitation)

Là một **School Admin của trường tư**

Tôi muốn thực hiện **thu hồi (revoke) lời mời đã gửi cho giáo viên** tại **trang View Invitations của sản phẩm LMS**

Để **hủy bỏ invitation khi cần thay đổi kế hoạch, hoặc khi giáo viên không phù hợp, hoặc khi cần điều chỉnh đội ngũ giảng dạy trước khi course được publish**

---

## Acceptance criteria

### AC-1: Happy Path - Thu hồi lời mời đang chờ phản hồi thành công
- **Tại** trang "Xem danh sách lời mời" với lời mời có trạng thái = **Đang chờ phản hồi**
- **Khi** Quản trị viên nhà trường nhấn nút "Thu hồi" trên lời mời đang chờ, nhập lý do thu hồi (không bắt buộc) trong hộp thoại xác nhận, sau đó nhấn "Xác nhận thu hồi"
- **Thì** hệ thống:
  - Cập nhật trạng thái = **Đã thu hồi**
  - Lưu lý do thu hồi (nếu có)
  - Hủy quy trình tự động nếu còn chạy
  - Vô hiệu hóa đường dẫn lời mời (đường dẫn không hoạt động nữa)
  - Gửi email thông báo cho giảng viên về việc thu hồi
  - Gửi sự kiện "Đã thu hồi lời mời giảng viên" vào hệ thống
  - Hiển thị thông báo "Đã thu hồi lời mời thành công cho [Tên giảng viên]"
  - Cập nhật danh sách lời mời với trạng thái **Đã thu hồi**
  - Khóa học được mời không còn hiển thị trong tab "Lời mời đang chờ" của giáo viên được mời

<!--### AC-2: Happy Path - Thu hồi lời mời đã chấp nhận thành công (giảng viên đã chấp nhận nhưng chưa tải nội dung)
- **Tại** trang "Xem danh sách lời mời" với lời mời có trạng thái = **Đã chấp nhận** và khóa học chưa **Đã xuất bản**
- **Khi** Quản trị viên nhấn nút "Thu hồi", xác nhận với cảnh báo "Giảng viên này đã chấp nhận lời mời. Bạn có chắc chắn?", nhập lý do thu hồi, nhấn "Xác nhận thu hồi"
- **Thì** hệ thống cập nhật trạng thái = **Đã thu hồi**, lưu lý do thu hồi, gỡ bỏ quyền truy cập của giảng viên vào nội dung khóa học, gửi email thông báo, gửi sự kiện "Đã thu hồi lời mời giảng viên", hiển thị "Đã thu hồi lời mời. Đã gỡ bỏ quyền truy cập của giảng viên.", Quản trị viên cần mời giảng viên thay thế nếu là vai trò Giảng viên chủ trì -->

### AC-2: Validation - Không thể thu hồi sau khi đã chấp nhận lời mời thành công
- **Tại** trang "Xem danh sách lời mời" với lời mời có trạng thái = **Đã chấp nhận** và khóa học chưa **Đã xuất bản**
- **Khi** Quản trị viên cố gắng nhấn "Thu hồi" cho bất kỳ lời mời nào
- **Thì** hệ thống vô hiệu hóa nút "Thu hồi" cho tất cả lời mời, nếu Quản trị viên vẫn kích hoạt thu hồi (qua API) thì trả về lỗi 400 "Không thể thu hồi lời mời sau khi giảng viên chấp nhận lời mời", không thay đổi dữ liệu

### AC-3: Validation - Không thể thu hồi sau khi khóa học đã xuất bản
- **Tại** trang "Xem danh sách lời mời" với trạng thái khóa học = **Đã xuất bản**
- **Khi** Quản trị viên cố gắng nhấn "Thu hồi" cho bất kỳ lời mời nào
- **Thì** hệ thống vô hiệu hóa nút "Thu hồi" cho tất cả lời mời, nếu Quản trị viên vẫn kích hoạt thu hồi (qua API) thì trả về lỗi 400 "Không thể thu hồi lời mời sau khi khóa học đã được xuất bản", không thay đổi dữ liệu

### AC-4: Validation - Không thể thu hồi lời mời đã từ chối hoặc đã hết hạn
- **Tại** trang "Xem danh sách lời mời"
- **Khi** Quản trị viên cố gắng thu hồi lời mời có trạng thái = **Đã từ chối** hoặc **Đã hết hạn**
- **Thì** hệ thống vô hiệu hóa nút "Thu hồi" cho những lời mời này, nếu Quản trị viên vẫn kích hoạt thu hồi thì trả về lỗi "Không thể thu hồi lời mời có trạng thái [trạng thái]. Chỉ lời mời đang chờ phản hồi hoặc đã chấp nhận mới có thể thu hồi"


### AC-6: Hủy quy trình tự động khi thu hồi lời mời đang chờ
- **Tại** hệ thống backend khi thu hồi lời mời đang chờ
- **Khi** hệ thống xử lý yêu cầu thu hồi
- **Thì** hệ thống xác định phiên bản quy trình tự động đang chạy cho lời mời này, hủy quy trình để dừng đồng hồ đếm ngược 7 ngày, ghi nhận việc hủy quy trình, đảm bảo quy trình không tự động kích hoạt **Đã hết hạn** sau đó

### AC-7: Vô hiệu hóa đường dẫn lời mời khi thu hồi
- **Tại** hệ thống backend khi thu hồi lời mời
- **Khi** hệ thống cập nhật trạng thái = **Đã thu hồi**
- **Thì** mã lời mời vẫn lưu trong cơ sở dữ liệu (để kiểm toán), nhưng khi giảng viên nhấn vào đường dẫn lời mời thì trả về 410 Gone với thông báo "Lời mời này đã bị thu hồi bởi quản trị viên khóa học", không cho phép chấp nhận/từ chối

### AC-8: Gửi email thông báo cho giảng viên khi thu hồi
- **Tại** dịch vụ thông báo khi nhận sự kiện "Đã thu hồi lời mời giảng viên"
- **Khi** sự kiện được xử lý từ hệ thống
- **Thì** hệ thống gửi email đến giảng viên với tiêu đề "Lời mời khóa học đã bị thu hồi", nội dung giải thích lời mời đã bị thu hồi, bao gồm lý do thu hồi nếu Quản trị viên có nhập, thông tin liên hệ Quản trị viên nếu giảng viên có thắc mắc

### AC-9: Hoàn tác giao dịch cơ sở dữ liệu nếu có lỗi
- **Tại** hệ thống backend khi xử lý yêu cầu thu hồi
- **Khi** có lỗi xảy ra trong quá trình cập nhật cơ sở dữ liệu hoặc hủy quy trình
- **Thì** hệ thống hoàn tác toàn bộ giao dịch, trạng thái lời mời không thay đổi, hiển thị thông báo lỗi "Không thể thu hồi lời mời. Vui lòng thử lại", ghi nhận lỗi REVOKE-FAIL-001, cho phép Quản trị viên thử lại

### AC-10: Kiểm tra phân quyền - Chỉ Quản trị viên nhà trường của khóa học mới được thu hồi
- **Tại** API backend /api/invitations/{invitationId}/revoke
- **Khi** người dùng không phải Quản trị viên nhà trường của khóa học cố gắng thu hồi lời mời
- **Thì** hệ thống trả về 403 Không có quyền truy cập với thông báo "Bạn không có quyền thu hồi lời mời cho khóa học này", ghi nhận lại nỗ lực truy cập trái phép với mã người dùng và mã khóa học

---

## Inline business rule

| Trường thông tin        | Mã BR     | Business rule                                                          | Ghi chú                                    |
|-------------------------|-----------|------------------------------------------------------------------------|--------------------------------------------|
| Trạng thái lời mời      | BR-PS-081 | Chỉ lời mời đang chờ phản hồi hoặc đã chấp nhận có thể thu hồi        | Kiểm tra quan trọng                        |
| Trạng thái khóa học     | BR-INV-004 | Không thể thu hồi sau khi khóa học đã xuất bản                         | Ràng buộc nghiệp vụ                        |
| Trạng thái lời mời      | BR-PS-082 | Cập nhật từ Đang chờ/Đã chấp nhận → Đã thu hồi                         | Chuyển trạng thái                          |
| Vai trò Giảng viên chủ trì | BR-PS-083 | Không thể thu hồi Giảng viên chủ trì duy nhất đã chấp nhận (phải có thay thế) | Kiểm tra quan trọng               |
| Mã lời mời              | BR-PS-084 | Mã lời mời vẫn lưu trong cơ sở dữ liệu (để kiểm toán) nhưng đường dẫn bị vô hiệu hóa | Dấu vết kiểm toán          |
| Lý do thu hồi           | BR-PS-085 | Không bắt buộc, tối đa 2000 ký tự, hỗ trợ tiếng Việt có dấu            | Trường văn bản                             |
| Thời điểm thu hồi       | BR-PS-086 | Tự động ghi nhận khi thu hồi                                           | Dấu thời gian kiểm toán                    |
| Người thu hồi           | BR-PS-087 | Lưu mã của Quản trị viên thực hiện thu hồi                             | Dấu vết kiểm toán                          |
| Quy trình tự động       | BR-PS-088 | Hủy quy trình nếu lời mời đang chờ (dừng đồng hồ đếm ngược)           | Quản lý quy trình                          |
| Quyền truy cập          | BR-PS-089 | Gỡ bỏ quyền truy cập của giảng viên vào nội dung khóa học nếu thu hồi đã chấp nhận | Bảo mật                     |
| Thông báo email         | BR-PS-090 | Gửi email thông báo cho giảng viên khi thu hồi                         | Giao tiếp người dùng                       |
| Trạng thái khóa học     | BR-PS-091 | Trạng thái khóa học không phải 'Đã xuất bản', 'Đã lưu trữ'             | Kiểm tra nghiệp vụ                         |
| Sự kiện hệ thống        | BR-PS-092 | Gửi sự kiện "Đã thu hồi lời mời giảng viên" khi thu hồi thành công    | Kiến trúc hướng sự kiện                    |

---

## Format Email ##

### Email mời giáo viên biên soạn khóa học 

**Subject:** Mời bạn tham gia biên soạn và giảng dạy khóa học “[Tên khóa học]”

**Body:**
```
Chào [Tên giảng viên],

Chúng tôi xin thông báo rằng lời mời bạn tham gia giảng dạy khóa học “[Tên khóa học]” đã được thu hồi bởi Quản trị viên của trường.

Lý do thu hồi (nếu có):
"[Lý do thu hồi]"

Việc thu hồi có thể xuất phát từ:
- Điều chỉnh lại kế hoạch xây dựng đội ngũ giảng dạy
- Thay đổi nội dung, phạm vi hoặc cấu trúc khóa học
- Khóa học cần được sắp xếp lại trước khi xuất bản

Đường dẫn lời mời cũ hiện không còn hiệu lực.

Nếu bạn có thắc mắc hoặc cần trao đổi thêm, vui lòng liên hệ:
[Email]  
[Số điện thoại]

Cảm ơn bạn đã quan tâm và đồng hành cùng [Tên trường / tổ chức].

Trân trọng,  
[Tên trường / tổ chức]

```
**Trong đó:**
- [Tên khóa học]: Tên khóa học dùng để mời giảng viên
- [Tên giảng viên]: Tên giảng viên được mời
- [Tên trường/Tổ chức]: Tên nhà trường/ tổ chức Social School
- [Lý do thu hồi]: Lý do thu hồi lời mời nếu có
- [Email]: cấu hình: email của nhà trường/ tổ chức Social school
- [Số điện thoại]: số điện thoại của nhà trường/ tổ chức Social school
---

## System rule
- Mã lời mời giảng viên không thay đổi (cùng bản ghi, chỉ cập nhật trạng thái)
- Kiểm tra đường dẫn lời mời: kiểm tra trạng thái thuộc (Đang chờ phản hồi, Đã chấp nhận) trước khi cho phép chấp nhận/từ chối
- Trạng thái khóa học không thay đổi khi thu hồi (trừ khi tất cả giảng viên đều bị thu hồi thì có thể quay lại Bản nháp)
- Bước quy trình có thể quay lại Mời giảng viên nếu tất cả giảng viên đã chấp nhận đều bị thu hồi
- Nếu thu hồi Giảng viên chủ trì đã chấp nhận: Quản trị viên phải mời người thay thế trước khi khóa học có thể tiếp tục quy trình

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho School Admin linh hoạt quản lý đội ngũ giảng dạy, điều chỉnh invitation khi cần, maintain control over course instructor team trước khi publish**
Trọng số của story này là **5**

Story được coi là thành công khi nó đảm bảo được:
- Quản trị viên có thể thu hồi lời mời trong vòng 30 giây
- Tỷ lệ thu hồi thành công >= 98%
- Tỷ lệ gửi email thông báo >= 95%
- Đường dẫn lời mời bị vô hiệu hóa trả về thông báo lỗi chính xác 100% (bảo mật)
- Trung bình < 5% lời mời bị thu hồi (tỷ lệ thấp là tốt, chứng tỏ lập kế hoạch tốt)

---

## Dependencies
- **lf-course service**: Cập nhật trạng thái lời mời giảng viên, kiểm tra business rules
- **notification-service**: Gửi email thông báo thu hồi
- **US-PS-003**: Lời mời phải đã được tạo trước
- **Access control service**: Gỡ bỏ quyền truy cập của giảng viên vào khóa học nếu thu hồi lời mời đã chấp nhận

---

## Impact Analysis
- **Frontend (ReactJS/NextJS)**:
  - Nút "Thu hồi" chỉ hiển thị cho lời mời Đang chờ phản hồi và Đã chấp nhận
  - Vô hiệu hóa nút "Thu hồi" nếu trạng thái khóa học = Đã xuất bản
  - Hộp thoại cảnh báo khác nhau cho Đang chờ phản hồi và Đã chấp nhận:
    - Đang chờ phản hồi: "Thu hồi lời mời cho [Tên]?"
    - Đã chấp nhận: "Giảng viên này đã chấp nhận. Thu hồi sẽ gỡ bỏ quyền truy cập của họ. Tiếp tục?"
  - Ô văn bản tùy chọn để nhập lý do thu hồi
  - Cảnh báo đặc biệt nếu thu hồi Giảng viên chủ trì duy nhất: "Không thể thu hồi Giảng viên chủ trì duy nhất"
  - Thông báo thành công: "Đã thu hồi lời mời thành công"
  - Cập nhật danh sách theo thời gian thực: trạng thái → Đã thu hồi

- **Backend**:
  - API endpoint thu hồi lời mời
  - Validation logic:
    - Kiểm tra trạng thái hiện tại thuộc (Đang chờ phản hồi, Đã chấp nhận)
    - Kiểm tra trạng thái khóa học không thuộc (Đã xuất bản, Đã lưu trữ)
    - Nếu vai trò = Giảng viên chủ trì và trạng thái = Đã chấp nhận: kiểm tra có Giảng viên chủ trì khác đã chấp nhận không
  - Business logic:
    - Cập nhật bản ghi lời mời giảng viên (trạng thái, lý do thu hồi)
    - Gỡ bỏ quyền truy cập của giảng viên (gọi access-control-service)
    - Gửi thông báo email

- **Access Control**:
  - Nếu thu hồi lời mời đã chấp nhận:
    - Gỡ bỏ giảng viên khỏi bảng quyền truy cập
    - Thu hồi quyền xem/chỉnh sửa nội dung khóa học
    - Ghi nhận sự kiện thu hồi quyền truy cập

- **Business Process**:
  - Trạng thái lời mời: Đang chờ phản hồi/Đã chấp nhận → Đã thu hồi
  - Quyền truy cập của giảng viên bị gỡ bỏ (đối với Đã chấp nhận)
  - Email thông báo được gửi
  - Đường dẫn lời mời bị vô hiệu hóa
  - Quản trị viên có thể mời giảng viên thay thế sau khi thu hồi
  - Nếu thu hồi Giảng viên chủ trì: quy trình có thể quay lại bước Mời giảng viên

---

## UI/UX Design

### View Invitations Page với Revoke Button
```
┌─────────────────────────────────────────────────────────────────┐
│ Course: Advanced Mathematics | Status: INVITING_INSTRUCTORS     │
│ Invited Instructors (4)                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ [👤] Nguyễn Văn A | OWNER                                  │ │
│  │ Status: ACCEPTED ✓                                         │ │
│  │ Invited: Dec 6, 2025 | Accepted: Dec 7, 2025              │ │
│  │ [View Details] [Revoke]                                    │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ [👤] Trần Thị B | CONTRIBUTOR                              │ │
│  │ Status: PENDING ⏳ | Expires in: 5 days                    │ │
│  │ Invited: Dec 8, 2025                                       │ │
│  │ [View Details] [Revoke]                                    │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ [👤] Lê Văn C | CONTRIBUTOR                                │ │
│  │ Status: EXPIRED ⚠️                                          │ │
│  │ Invited: Nov 29, 2025 | Expired: Dec 6, 2025              │ │
│  │ [View Details] [Resend]                                    │ │
│  │ (Revoke button disabled - cannot revoke EXPIRED)          │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ [👤] Phạm Thị D | REVIEWER                                 │ │
│  │ Status: REJECTED ✗                                         │ │
│  │ [View Details]                                             │ │
│  │ (Revoke button disabled - cannot revoke REJECTED)         │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Revoke Confirmation Dialog - PENDING Invitation
```
┌──────────────────────────────────────────┐
│  Revoke Invitation                       │
├──────────────────────────────────────────┤
│                                          │
│  Revoke invitation to:                   │
│  Trần Thị B (tranthib@example.com)       │
│                                          │
│  Details:                                │
│  • Role: CONTRIBUTOR                     │
│  • Status: PENDING                       │
│  • Invited: Dec 8, 2025                  │
│                                          │
│  The invitation will be cancelled and    │
│  the instructor will be notified.        │
│                                          │
│  Reason for revocation (optional):       │
│  ┌────────────────────────────────────┐  │
│  │ Thầy không còn phù hợp với khóa học│  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│  (Max 2000 characters)                   │
│                                          │
│           [Cancel] [Confirm Revoke]      │
└──────────────────────────────────────────┘
```

### Revoke Confirmation Dialog - ACCEPTED Invitation
```
┌──────────────────────────────────────────┐
│  ⚠️  Revoke Accepted Invitation           │
├──────────────────────────────────────────┤
│                                          │
│  Revoke invitation to:                   │
│  Nguyễn Văn A (nguyenvana@example.com)   │
│                                          │
│  ⚠️  WARNING:                             │
│  This instructor has already ACCEPTED    │
│  the invitation.                         │
│                                          │
│  Details:                                │
│  • Role: OWNER                           │
│  • Status: ACCEPTED                      │
│  • Accepted: Dec 7, 2025                 │
│                                          │
│  Revoking will:                          │
│  • Remove instructor's access to course  │
│  • Cancel any work in progress           │
│  • Notify the instructor                 │
│                                          │
│  You will need to invite a replacement   │
│  OWNER instructor.                       │
│                                          │
│  Reason for revocation (optional):       │
│  ┌────────────────────────────────────┐  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Are you sure you want to continue?      │
│                                          │
│           [Cancel] [Yes, Revoke]         │
└──────────────────────────────────────────┘
```

### Error Dialog - Cannot Revoke Only OWNER
```
┌────────────────────────────────────────────────┐
│  ✗ Cannot Revoke Invitation                    │
├────────────────────────────────────────────────┤
│                                                │
│  Cannot revoke the only accepted OWNER         │
│  instructor.                                   │
│                                                │
│  Course: Advanced Mathematics                  │
│  Instructor: Nguyễn Văn A (OWNER, ACCEPTED)    │
│                                                │
│  To revoke this instructor:                    │
│  1. First invite a replacement OWNER           │
│  2. Wait for the replacement to ACCEPT         │
│  3. Then you can revoke this invitation        │
│                                                │
│  A course must always have at least one        │
│  accepted OWNER instructor.                    │
│                                                │
│                              [OK]               │
└────────────────────────────────────────────────┘
```

### Success Message
```
┌────────────────────────────────────────────────┐
│  ✓ Invitation Revoked Successfully             │
├────────────────────────────────────────────────┤
│                                                │
│  Invitation has been revoked for:              │
│  Trần Thị B (tranthib@example.com)             │
│                                                │
│  Details:                                      │
│  • Status: REVOKED                             │
│  • Revoked at: Dec 13, 2025 at 4:45 PM         │
│  • Instructor access removed                   │
│  • Email notification sent                     │
│                                                │
│  The instructor can no longer accept this      │
│  invitation.                                   │
│                                                │
│                              [OK]               │
└────────────────────────────────────────────────┘
```

**UI States**:
- "Revoke" button visible for PENDING and ACCEPTED invitations only
- "Revoke" button disabled for REJECTED, EXPIRED, REVOKED invitations
- "Revoke" button disabled if course.status = PUBLISHED
- Different confirmation dialogs for PENDING vs ACCEPTED
- Special error dialog if trying to revoke only OWNER
- Real-time update: status badge changes to REVOKED after success

---

## Out of Scope Item
- **Instructor Role**: CONTRIBUTOR, REVIEWER
- **Undo revoke**: Khôi phục invitation đã revoke (phức tạp - Admin phải invite lại)
- **Bulk revoke**: Revoke nhiều invitations cùng lúc (có thể làm sau)
- **Revoke with replacement suggestion**: Tự động suggest replacement instructors khi revoke (AI feature - out of scope)
- **Revoke approval workflow**: Require approval từ higher-level admin trước khi revoke ACCEPTED invitation (workflow phức tạp - out of scope)
- **Revoke analytics**: Track revoke rate, reasons, patterns (analytics - out of scope)
- **Compensation for revoked instructors**: Tính toán compensation nếu instructor đã bỏ công sức (business process - out of scope)
- **Revoke appeal process**: Instructor có thể appeal revoke decision (legal/HR process - out of scope)
- **Partial revoke**: Revoke một phần contribution_scope thay vì toàn bộ invitation (phức tạp - Admin phải revoke và invite lại với scope mới)
