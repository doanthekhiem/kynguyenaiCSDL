# US-PS-014A - Xem danh sách khóa học được mời

## User story Title
Là một **Giáo viên tự do**
Tôi muốn **xem danh sách tất cả các khóa học mà tôi đã được mời tham gia** tại **trang "Lời mời cộng tác"**
Để **biết được những cơ hội cộng tác nào đang chờ phản hồi, đã chấp nhận, hoặc đã từ chối, từ đó quyết định có tham gia hay không**

---

## Acceptance criteria

### AC-1: Happy Path - Xem danh sách lời mời với trạng thái "Đang chờ phản hồi"
- **Tại** trang "Lời mời cộng tác" trong dashboard của Giáo viên tự do
- **Khi** Giáo viên tự do truy cập vào tab "Lời mời đang chờ" và có ít nhất 1 lời mời với trạng thái **PENDING**
- **Thì** hệ thống hiển thị danh sách các lời mời với các thông tin:
  - Tên khóa học
  - Tên trường mời (school_name)
  - Vai trò được mời: **Giảng viên chủ trì** / **Giảng viên đóng góp** / **Giảng viên phản biện**
  - Phạm vi đóng góp (nếu vai trò = Giảng viên đóng góp): danh sách các section_id
  - Ngày nhận lời mời (invitation_sent_at)
  - Trạng thái: **Đang chờ phản hồi** (màu cam)
  - Nút hành động: "Xem chi tiết", "Chấp nhận", "Từ chối"
  - Sắp xếp theo thứ tự ngày nhận lời mời mới nhất lên đầu

### AC-2: Happy Path - Xem danh sách lời mời đã chấp nhận
- **Tại** trang "Lời mời cộng tác" trong dashboard của Giáo viên tự do
- **Khi** Giáo viên tự do truy cập vào tab "Đã chấp nhận" và có ít nhất 1 lời mời với trạng thái **ACCEPTED**
- **Thì** hệ thống hiển thị danh sách các lời mời đã chấp nhận với các thông tin:
  - Tên khóa học
  - Tên trường
  - Vai trò đã chấp nhận
  - Phạm vi đóng góp (nếu có)
  - Ngày chấp nhận (invitation_responded_at)
  - Trạng thái khóa học hiện tại: CONTENT_BUILDING / READY_FOR_REVIEW / CONTENT_APPROVED / PIM_READY / PUBLISHED
  - Trạng thái: **Đã chấp nhận** (màu xanh lá)
  - Nút hành động: "Xem chi tiết khóa học", "Vào workspace"
  - Sắp xếp theo thứ tự ngày chấp nhận mới nhất lên đầu

### AC-3: Happy Path - Xem danh sách lời mời đã từ chối
- **Tại** trang "Lời mời cộng tác" trong dashboard của Giáo viên tự do
- **Khi** Giáo viên tự do truy cập vào tab "Đã từ chối" và có ít nhất 1 lời mời với trạng thái **REJECTED**
- **Thì** hệ thống hiển thị danh sách các lời mời đã từ chối với các thông tin:
  - Tên khóa học
  - Tên trường mời
  - Vai trò đã từ chối
  - Ngày từ chối (invitation_responded_at)
  - Lý do từ chối (rejection_reason) - nếu có
  - Trạng thái: **Đã từ chối** (màu xám)
  - Nút hành động: "Xem chi tiết lời mời"
  - Sắp xếp theo thứ tự ngày từ chối mới nhất lên đầu

### AC-4: Alternative Path - Lọc danh sách theo vai trò được mời
- **Tại** trang "Lời mời cộng tác" với danh sách lời mời đang hiển thị
- **Khi** Giáo viên tự do chọn bộ lọc "Vai trò" và chọn 1 trong 3 vai trò: **Giảng viên chủ trì** / **Giảng viên đóng góp** / **Giảng viên phản biện**
- **Thì** hệ thống chỉ hiển thị các lời mời có vai trò khớp với lựa chọn, giữ nguyên thứ tự sắp xếp theo thời gian

### AC-5: Alternative Path - Lọc danh sách theo tên trường
- **Tại** trang "Lời mời cộng tác" với danh sách lời mời đang hiển thị
- **Khi** Giáo viên tự do nhập từ khóa vào ô "Tìm kiếm theo tên trường" và nhấn Enter hoặc nút tìm kiếm
- **Thì** hệ thống:
  - Thực hiện tìm kiếm không phân biệt hoa thường, có dấu
  - Hiển thị các lời mời từ các trường có tên chứa từ khóa tìm kiếm
  - Hiển thị số lượng kết quả tìm thấy
  - Giữ nguyên thứ tự sắp xếp theo thời gian trong kết quả tìm kiếm

### AC-6: Alternative Path - Sắp xếp theo tên khóa học
- **Tại** trang "Lời mời cộng tác" với danh sách lời mời đang hiển thị
- **Khi** Giáo viên tự do chọn tùy chọn sắp xếp "Tên khóa học A-Z" hoặc "Tên khóa học Z-A"
- **Thì** hệ thống sắp xếp danh sách theo thứ tự alphabet của tên khóa học (tăng dần hoặc giảm dần), áp dụng cho tất cả các tab

### AC-7: Alternative Path - Phân trang danh sách lời mời
- **Tại** trang "Lời mời cộng tác" với số lượng lời mời > 20 bản ghi
- **Khi** Giáo viên tự do xem danh sách lời mời trong 1 tab bất kỳ
- **Thì** hệ thống:
  - Hiển thị tối đa 20 lời mời trên 1 trang
  - Hiển thị thanh phân trang ở cuối danh sách
  - Hiển thị tổng số trang và trang hiện tại
  - Cho phép chuyển trang bằng nút "Trang trước" / "Trang sau" hoặc nhập số trang trực tiếp

### AC-8: Edge Case - Không có lời mời nào trong tab "Đang chờ phản hồi"
- **Tại** trang "Lời mời cộng tác" trong dashboard của Giáo viên tự do
- **Khi** Giáo viên tự do truy cập vào tab "Lời mời đang chờ" và không có bản ghi nào với trạng thái **PENDING**
- **Thì** hệ thống hiển thị thông báo: "Bạn chưa có lời mời cộng tác nào đang chờ phản hồi" và gợi ý "Hãy kiểm tra lại các tab khác hoặc quay lại sau"

### AC-9: Edge Case - Không có lời mời nào trong tab "Đã chấp nhận"
- **Tại** trang "Lời mời cộng tác" trong dashboard của Giáo viên tự do
- **Khi** Giáo viên tự do truy cập vào tab "Đã chấp nhận" và không có bản ghi nào với trạng thái **ACCEPTED**
- **Thì** hệ thống hiển thị thông báo: "Bạn chưa chấp nhận lời mời cộng tác nào" và gợi ý "Kiểm tra tab 'Lời mời đang chờ' để xem các cơ hội cộng tác mới"

### AC-10: Edge Case - Không có lời mời nào trong tab "Đã từ chối"
- **Tại** trang "Lời mời cộng tác" trong dashboard của Giáo viên tự do
- **Khi** Giáo viên tự do truy cập vào tab "Đã từ chối" và không có bản ghi nào với trạng thái **REJECTED**
- **Thì** hệ thống hiển thị thông báo: "Bạn chưa từ chối lời mời cộng tác nào"

### AC-11: Edge Case - Lời mời hết hạn phản hồi
- **Tại** trang "Lời mời cộng tác", tab "Lời mời đang chờ"
- **Khi** có lời mời với trạng thái **PENDING** và thời gian hiện tại > invitation_expires_at (ví dụ: hết hạn sau 7 ngày kể từ ngày mời)
- **Thì** hệ thống:
  - Hiển thị nhãn **"Đã hết hạn"** (màu đỏ) bên cạnh trạng thái "Đang chờ phản hồi"
  - Vô hiệu hóa nút "Chấp nhận" và "Từ chối"
  - Chỉ cho phép nút "Xem chi tiết"
  - Hiển thị thông báo: "Lời mời này đã hết hạn phản hồi. Vui lòng liên hệ nhà trường nếu bạn vẫn muốn tham gia."

### AC-12: Edge Case - Lọc không tìm thấy kết quả
- **Tại** trang "Lời mời cộng tác" với danh sách lời mời đang hiển thị
- **Khi** Giáo viên tự do áp dụng bộ lọc (vai trò hoặc tìm kiếm theo tên trường) và không có bản ghi nào khớp với tiêu chí
- **Thì** hệ thống hiển thị thông báo: "Không tìm thấy lời mời phù hợp với bộ lọc. Hãy thử điều chỉnh tiêu chí tìm kiếm." và cho phép xóa bộ lọc để quay lại danh sách đầy đủ

### AC-13: Edge Case - Khóa học đã bị xóa hoặc archived sau khi gửi lời mời
- **Tại** trang "Lời mời cộng tác" với danh sách lời mời đang hiển thị
- **Khi** có lời mời liên quan đến khóa học đã bị xóa hoặc chuyển sang trạng thái **ARCHIVED**
- **Thì** hệ thống:
  - Vẫn hiển thị lời mời trong danh sách với thông tin cơ bản (tên khóa học, tên trường, vai trò)
  - Hiển thị nhãn **"Khóa học đã bị xóa"** hoặc **"Khóa học đã lưu trữ"** (màu xám)
  - Vô hiệu hóa tất cả các nút hành động
  - Hiển thị thông báo: "Khóa học này không còn khả dụng"

---

## Business rules

| Thuộc tính                     | Mã quy tắc | Mô tả                                                                                                                                                                         |
|--------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Trạng thái lời mời             | BR-PS-343  | Các trạng thái hợp lệ của lời mời: PENDING (Đang chờ phản hồi), ACCEPTED (Đã chấp nhận), REJECTED (Đã từ chối)                                                               |
| Màu nhãn trạng thái lời mời    | BR-PS-344  | PENDING = cam, ACCEPTED = xanh lá, REJECTED = xám                                                                                                                             |
| Thời hạn phản hồi lời mời      | BR-PS-345  | Lời mời có thời hạn phản hồi là 7 ngày kể từ ngày gửi (invitation_sent_at). Sau thời hạn này, lời mời vẫn hiển thị nhưng không thể chấp nhận/từ chối                         |
| Vai trò được mời               | BR-PS-346  | Các vai trò hợp lệ: OWNER (Giảng viên chủ trì), CONTRIBUTOR (Giảng viên đóng góp), REVIEWER (Giảng viên phản biện)                                                           |
| Phạm vi đóng góp               | BR-PS-347  | Chỉ vai trò CONTRIBUTOR mới có phạm vi đóng góp (contribution_scope). Vai trò OWNER và REVIEWER không có phạm vi đóng góp (toàn khóa học)                                     |
| Hiển thị tên vai trò           | BR-PS-348  | OWNER = "Giảng viên chủ trì", CONTRIBUTOR = "Giảng viên đóng góp", REVIEWER = "Giảng viên phản biện"                                                                         |
| Sắp xếp mặc định               | BR-PS-349  | Danh sách lời mời mặc định sắp xếp theo thời gian (invitation_sent_at cho PENDING, invitation_responded_at cho ACCEPTED/REJECTED), mới nhất lên đầu                          |
| Phân trang                     | BR-PS-350  | Mỗi trang hiển thị tối đa 20 lời mời. Nếu tổng số lời mời ≤ 20 thì không hiển thị thanh phân trang                                                                           |
| Quyền truy cập                 | BR-PS-351  | Chỉ Giáo viên tự do được mời mới có quyền xem lời mời của chính mình. Không thể xem lời mời của giáo viên khác                                                               |
| Lọc theo vai trò               | BR-PS-352  | Bộ lọc vai trò cho phép chọn 1 vai trò tại 1 thời điểm. Có thể kết hợp với tìm kiếm theo tên trường                                                                          |
| Tìm kiếm theo tên trường       | BR-PS-353  | Tìm kiếm không phân biệt hoa thường, có dấu, tìm kiếm theo chuỗi con (substring match) trong school_name                                                                     |
| Hiển thị thông tin trường      | BR-PS-354  | Lấy school_name từ bảng school thông qua school_id trong bảng course                                                                                                         |
| Lời mời từ khóa học đã xóa     | BR-PS-355  | Nếu khóa học bị xóa hoặc archived sau khi gửi lời mời, lời mời vẫn hiển thị nhưng không thể thực hiện hành động nào. Hiển thị nhãn cảnh báo "Khóa học không còn khả dụng"   |

---

## System rules

| Thuộc tính                     | Mã quy tắc | Mô tả                                                                                                                                                                         |
|--------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Bảng dữ liệu                   | SR-PS-343  | Sử dụng bảng `course_instructor` để lấy danh sách lời mời, với các cột: teacher_id, course_id, role, contribution_scope, invitation_status, invitation_sent_at, invitation_responded_at, invitation_expires_at, rejection_reason |
| API endpoint                   | SR-PS-344  | GET /api/v1/lf-course/teachers/{teacher_id}/invitations?status={PENDING\|ACCEPTED\|REJECTED}&role={OWNER\|CONTRIBUTOR\|REVIEWER}&school_name={keyword}&page={number}&limit=20&sort_by={field}&sort_order={asc\|desc} |
| Xác thực quyền truy cập        | SR-PS-345  | Verify teacher_id trong token JWT khớp với teacher_id trong URL path. Nếu không khớp, trả về lỗi 403 Forbidden                                                               |
| Join với bảng course           | SR-PS-346  | JOIN bảng `course` để lấy course_name, school_id, course_status (CONTENT_BUILDING, READY_FOR_REVIEW, etc.)                                                                   |
| Join với bảng school           | SR-PS-347  | JOIN bảng `school` thông qua school_id để lấy school_name                                                                                                                     |
| Kiểm tra lời mời hết hạn       | SR-PS-348  | So sánh CURRENT_TIMESTAMP với invitation_expires_at. Nếu CURRENT_TIMESTAMP > invitation_expires_at, đánh dấu is_expired = true trong response                                |
| Cache danh sách lời mời        | SR-PS-349  | Cache kết quả danh sách lời mời với TTL = 5 phút. Invalidate cache khi có sự kiện chấp nhận/từ chối lời mời từ teacher này                                                   |
| Response format                | SR-PS-350  | Trả về JSON với cấu trúc: {data: [{invitation_id, course_id, course_name, school_name, role, contribution_scope, invitation_status, invitation_sent_at, invitation_responded_at, is_expired, course_status, rejection_reason}], pagination: {total, page, limit, total_pages}} |
| Logging                        | SR-PS-351  | Log mỗi lần Giáo viên tự do truy cập danh sách lời mời, ghi nhận teacher_id, timestamp, số lượng lời mời PENDING                                                             |
| Performance                    | SR-PS-352  | Tạo composite index trên (teacher_id, invitation_status, invitation_sent_at) và (teacher_id, invitation_status, invitation_responded_at) để tối ưu query                     |
| Notification badge             | SR-PS-353  | Đồng thời trả về số lượng lời mời PENDING chưa đọc (unread_count) để hiển thị badge thông báo trong header/menu                                                              |

---

## Dependencies and Impact analysis

### Dependencies
- **Upstream US**:
  - US-PS-003 (Mời giáo viên tham gia): Tạo lời mời cộng tác → US này hiển thị các lời mời đó
  - US-PS-014B (Xem danh sách khóa học đang tham gia): Lời mời ACCEPTED → chuyển sang khóa học đang tham gia

- **Downstream US**:
  - US-PS-014E (Chấp nhận lời mời cộng tác): Từ danh sách này, giáo viên chọn "Chấp nhận"
  - US-PS-014F (Từ chối lời mời cộng tác): Từ danh sách này, giáo viên chọn "Từ chối"
  - US-PS-014G (Xem chi tiết lời mời): Từ danh sách này, giáo viên chọn "Xem chi tiết"

### Impact Analysis
- **Database**:
  - Bảng `course_instructor`: READ operations với filter teacher_id, invitation_status
  - Bảng `course`: JOIN để lấy course_name, school_id, course_status
  - Bảng `school`: JOIN để lấy school_name
  - Tạo composite index để tối ưu query performance

- **Services**:
  - **lf-course service**: Cung cấp API endpoint GET /teachers/{teacher_id}/invitations
  - **identity-service**: Xác thực JWT token, verify teacher_id
  - **notification-service**: Lấy số lượng lời mời PENDING chưa đọc để hiển thị badge

- **UI/UX**:
  - Trang mới "Lời mời cộng tác" với 3 tabs: Đang chờ / Đã chấp nhận / Đã từ chối
  - Bộ lọc: Vai trò, Tìm kiếm theo tên trường
  - Sắp xếp: Thời gian, Tên khóa học
  - Badge thông báo số lời mời chưa đọc

- **Performance**:
  - Cache danh sách lời mời với TTL = 5 phút
  - Pagination với limit = 20
  - Composite index trên (teacher_id, invitation_status, invitation_sent_at/responded_at)

---

## UI/UX Design

### Layout chính
```
┌─────────────────────────────────────────────────────────────────┐
│ Dashboard > Lời mời cộng tác                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Lời mời đang chờ (3)] [Đã chấp nhận (5)] [Đã từ chối (1)]    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Bộ lọc:                                                   │   │
│  │ [Vai trò: Tất cả ▼] [Tìm kiếm trường: ____________]     │   │
│  │ Sắp xếp: [Thời gian mới nhất ▼]                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📚 Khóa học Toán học lớp 10                              │   │
│  │ 🏫 Trường THPT Nguyễn Huệ                                │   │
│  │ 👤 Vai trò: Giảng viên chủ trì                           │   │
│  │ 📅 Nhận lời mời: 05/12/2025                              │   │
│  │ 🟠 Đang chờ phản hồi                                      │   │
│  │ [Xem chi tiết] [Chấp nhận] [Từ chối]                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📚 Khóa học Vật lý nâng cao                              │   │
│  │ 🏫 Trường THPT Lê Quý Đôn                                │   │
│  │ 👤 Vai trò: Giảng viên đóng góp                          │   │
│  │ 📂 Phạm vi: Chương 3, Chương 5                           │   │
│  │ 📅 Nhận lời mời: 03/12/2025                              │   │
│  │ 🔴 Đã hết hạn                                             │   │
│  │ [Xem chi tiết]                                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  [Trang trước] [1] [2] [3] [Trang sau]                          │
│  Hiển thị 1-20 trong tổng số 45 lời mời                         │
└─────────────────────────────────────────────────────────────────┘
```

### Màu sắc nhãn trạng thái
- **PENDING (Đang chờ phản hồi)**: Cam (#FF9800)
- **ACCEPTED (Đã chấp nhận)**: Xanh lá (#4CAF50)
- **REJECTED (Đã từ chối)**: Xám (#9E9E9E)
- **Đã hết hạn**: Đỏ (#F44336)
- **Khóa học không khả dụng**: Xám đậm (#616161)

### Responsive Design
- **Desktop**: Hiển thị đầy đủ thông tin, 1 lời mời / hàng
- **Tablet**: Thu gọn phạm vi đóng góp, hiển thị icon thay vì text đầy đủ
- **Mobile**: Hiển thị dạng card, stack theo chiều dọc, chỉ hiển thị thông tin quan trọng nhất

---

## Out of scope
- **Instructor Role**: CONTRIBUTOR, REVIEWER
- ❌ Chức năng chấp nhận/từ chối lời mời trực tiếp (thuộc US-PS-014E, US-PS-014F)
- ❌ Xem chi tiết lời mời (thuộc US-PS-014G)
- ❌ Gửi thông báo khi có lời mời mới (thuộc US-PS-003)
- ❌ Quản lý thời hạn phản hồi lời mời (thuộc US-PS-003)
- ❌ Xem lịch sử thay đổi vai trò sau khi đã chấp nhận (thuộc US-PS-014D)
- ❌ Export danh sách lời mời ra file Excel/PDF
- ❌ Lọc theo khoảng thời gian nhận lời mời
- ❌ Lọc theo trạng thái khóa học (CONTENT_BUILDING, PUBLISHED, etc.)
