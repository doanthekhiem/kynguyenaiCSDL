# US-PS-014B - Xem danh sách khóa học đang tham gia

## User story Title
Là một **Giáo viên tự do**

Tôi muốn **xem danh sách tất cả các khóa học mà tôi đang tham gia cộng tác** tại **trang "Khóa học của tôi"**

Để **theo dõi các khóa học tôi đang đóng góp nội dung, biết vai trò và phạm vi công việc của mình trong từng khóa học, từ đó quản lý thời gian và ưu tiên công việc hiệu quả**

---

## Acceptance criteria

### AC-1: Happy Path - Xem danh sách khóa học đang tham gia với vai trò "Giảng viên chủ trì"
- **Tại** trang "Khóa học của tôi" trong dashboard của Giáo viên tự do
- **Khi** Giáo viên tự do truy cập vào tab "Đang cộng tác" và có ít nhất 1 khóa học mà giáo viên có vai trò **OWNER** (Giảng viên chủ trì) với trạng thái lời mời = **ACCEPTED**
- **Thì** hệ thống hiển thị danh sách các khóa học với các thông tin:
  - Tên khóa học (course_name)
  - Tên trường sở hữu (school_name)
  - Vai trò: **Giảng viên chủ trì** 
  - Trạng thái khóa học hiện tại: CONTENT_BUILDING / READY_FOR_REVIEW / CONTENT_APPROVED/ PUBLISHED / PIM_READY 
  - Phạm vi công việc: "Toàn khóa học"
  - Ngày bắt đầu tham gia (invitation_responded_at)
  - Tiến độ dạy học: số buổi đã dạy/ Tổng số buổi
  <!--- Tiến độ đóng góp: X% hoàn thành (dựa trên số section đã submit / tổng số section)
  <!--- Số lượng giảng viên cộng tác khác: X giảng viên-->
  - Nút hành động: "Tải nội dung", <!-- "Xem tiến độ",--> "Xem chi tiết khóa học"
  - Sắp xếp theo thứ tự ngày tham gia mới nhất lên đầu

<!--### AC-2: Happy Path - Xem danh sách khóa học đang tham gia với vai trò "Giảng viên đóng góp" (out of scope)
- **Tại** trang "Khóa học của tôi" trong dashboard của Giáo viên tự do
- **Khi** Giáo viên tự do truy cập vào tab "Đang cộng tác" và có ít nhất 1 khóa học mà giáo viên có vai trò **CONTRIBUTOR** (Giảng viên đóng góp) với trạng thái lời mời = **ACCEPTED**
- **Thì** hệ thống hiển thị danh sách các khóa học với các thông tin:
  - Tên khóa học
  - Tên trường sở hữu
  - Vai trò: **Giảng viên đóng góp** (badge màu xanh lá)
  - Trạng thái khóa học hiện tại
  - Phạm vi công việc: Danh sách các section được phân công (ví dụ: "Chương 3: Điện học, Chương 5: Quang học")
  - Ngày bắt đầu tham gia
  - Tiến độ đóng góp: X% hoàn thành (dựa trên số section trong phạm vi đã submit / tổng số section trong phạm vi)
  - Số lượng section được phân công: X section
  - Nút hành động: "Vào workspace", "Xem tiến độ", "Xem chi tiết khóa học"
  - Sắp xếp theo thứ tự ngày tham gia mới nhất lên đầu 

### AC-3: Happy Path - Xem danh sách khóa học đang tham gia với vai trò "Giảng viên phản biện"(out of scope)
- **Tại** trang "Khóa học của tôi" trong dashboard của Giáo viên tự do
- **Khi** Giáo viên tự do truy cập vào tab "Đang cộng tác" và có ít nhất 1 khóa học mà giáo viên có vai trò **REVIEWER** (Giảng viên phản biện) với trạng thái lời mời = **ACCEPTED**
- **Thì** hệ thống hiển thị danh sách các khóa học với các thông tin:
  - Tên khóa học
  - Tên trường sở hữu
  - Vai trò: **Giảng viên phản biện** (badge màu tím)
  - Trạng thái khóa học hiện tại
  - Phạm vi công việc: "Toàn khóa học"
  - Ngày bắt đầu tham gia
  - Số lượng submission cần review: X submission đang chờ
  - Số lượng submission đã review: X submission
  - Nút hành động: "Vào workspace", "Xem submission cần review", "Xem chi tiết khóa học"
  - Sắp xếp theo thứ tự ngày tham gia mới nhất lên đầu -->

### AC-4: Alternative Path - Lọc danh sách theo vai trò
- **Tại** trang "Khóa học của tôi", tab "Đang cộng tác" với danh sách khóa học đang hiển thị
- **Khi** Giáo viên tự do chọn bộ lọc "Vai trò" và chọn 1 trong 3 vai trò: **Giảng viên chủ trì** / **Giảng viên đóng góp** / **Giảng viên phản biện**
- **Thì** hệ thống chỉ hiển thị các khóa học mà giáo viên có vai trò khớp với lựa chọn, giữ nguyên thứ tự sắp xếp theo thời gian

**Lưu ý**: **Giảng viên đóng góp** / **Giảng viên phản biện**: out of scope

### AC-5: Alternative Path - Lọc danh sách theo trạng thái khóa học
- **Tại** trang "Khóa học của tôi", tab "Đang cộng tác" với danh sách khóa học đang hiển thị
- **Khi** Giáo viên tự do chọn bộ lọc "Trạng thái" và chọn 1 trạng thái: CONTENT_BUILDING / READY_FOR_REVIEW / CONTENT_APPROVED/ PUBLISHED / PIM_READY 
- **Thì** hệ thống chỉ hiển thị các khóa học có trạng thái khớp với lựa chọn, giữ nguyên thứ tự sắp xếp theo thời gian

### AC-6: Alternative Path - Tìm kiếm theo tên khóa học hoặc tên trường
- **Tại** trang "Khóa học của tôi", tab "Đang cộng tác" với danh sách khóa học đang hiển thị
- **Khi** Giáo viên tự do nhập Tên khóa học hoặc Tên trường vào ô "Tìm kiếm"
- **Thì** hệ thống:
  - Thực hiện tìm kiếm không phân biệt hoa thường, có dấu
  - Tìm kiếm trong cả course_name và school_name
  - Hiển thị các khóa học có tên hoặc tên trường chứa từ khóa tìm kiếm
  - Hiển thị số lượng kết quả tìm thấy
  - Giữ nguyên thứ tự sắp xếp theo thời gian trong kết quả tìm kiếm

<!-- ### AC-7: Alternative Path - Sắp xếp theo tiến độ đóng góp
- **Tại** trang "Khóa học của tôi", tab "Đang cộng tác" với danh sách khóa học đang hiển thị
- **Khi** Giáo viên tự do chọn tùy chọn sắp xếp "Tiến độ thấp nhất" hoặc "Tiến độ cao nhất"
- **Thì** hệ thống sắp xếp danh sách theo % tiến độ đóng góp (tăng dần hoặc giảm dần), giúp giáo viên ưu tiên các khóa học cần hoàn thành gấp -->

### AC-8: Alternative Path - Sắp xếp theo tên khóa học
- **Tại** trang "Khóa học của tôi", tab "Đang cộng tác" với danh sách khóa học đang hiển thị
- **Khi** Giáo viên tự do chọn tùy chọn sắp xếp "Tên khóa học A-Z" hoặc "Tên khóa học Z-A"
- **Thì** hệ thống sắp xếp danh sách theo thứ tự alphabet của tên khóa học (tăng dần hoặc giảm dần)

### AC-9: Alternative Path - Phân trang danh sách khóa học
- **Tại** trang "Khóa học của tôi", tab "Đang cộng tác" với số lượng khóa học > 20 bản ghi
- **Khi** Giáo viên tự do xem danh sách khóa học
- **Thì** hệ thống:
  - Hiển thị tối đa 20 khóa học trên 1 trang
  - Hiển thị thanh phân trang ở cuối danh sách
  - Hiển thị tổng số trang và trang hiện tại
  - Cho phép chuyển trang bằng nút "Trang trước" / "Trang sau" hoặc nhập số trang trực tiếp

### AC-10: Edge Case - Không có khóa học nào đang tham gia
- **Tại** trang "Khóa học của tôi" trong dashboard của Giáo viên tự do
- **Khi** Giáo viên tự do truy cập vào tab "Đang cộng tác" và không có bản ghi nào với invitation_status = **ACCEPTED**
- **Thì** hệ thống hiển thị thông báo: "Bạn chưa tham gia cộng tác khóa học nào" và gợi ý "Kiểm tra tab 'Lời mời đang chờ' để xem các cơ hội cộng tác mới"

### AC-11: Edge Case - Lọc không tìm thấy kết quả
- **Tại** trang "Khóa học của tôi", tab "Đang cộng tác" với danh sách khóa học đang hiển thị
- **Khi** Giáo viên tự do áp dụng bộ lọc (vai trò, trạng thái, hoặc tìm kiếm) và không có bản ghi nào khớp với tiêu chí
- **Thì** hệ thống hiển thị thông báo: "Không tìm thấy khóa học phù hợp." và cho phép xóa bộ lọc để quay lại danh sách đầy đủ

<!--### AC-12: Edge Case - Khóa học chuyển sang trạng thái ARCHIVED sau khi tham gia
- **Tại** trang "Khóa học của tôi", tab "Đang cộng tác"
- **Khi** có khóa học mà giáo viên đang tham gia nhưng khóa học đã chuyển sang trạng thái **ARCHIVED**
- **Thì** hệ thống:
  - Vẫn hiển thị khóa học trong danh sách với thông tin cơ bản
  - Hiển thị nhãn **"Đã lưu trữ"** (màu xám) thay vì trạng thái workflow bình thường
  - Vô hiệu hóa nút "Vào workspace"
  - Chỉ cho phép nút "Xem chi tiết khóa học" và "Xem tiến độ" (read-only)
  - Hiển thị thông báo: "Khóa học này đã được lưu trữ. Bạn không thể chỉnh sửa nội dung."-->

### AC-13: Edge Case - Khóa học đã được publish nhưng giáo viên vẫn có quyền xem
- **Tại** trang "Khóa học của tôi", tab "Đang cộng tác"
- **Khi** có khóa học mà giáo viên đang tham gia và khóa học đã chuyển sang trạng thái **PUBLISHED**
- **Thì** hệ thống:
  - Hiển thị khóa học với nhãn **"Đã xuất bản"** 
  - Vô hiệu hóa nút "Tải nội dung" (không thể chỉnh sửa sau khi publish)
  - Cho phép nút "Xem chi tiết khóa học" để xem phiên bản đã publish
  - Hiển thị thông báo: "Khóa học này đã được xuất bản. Nội dung không thể chỉnh sửa."

<!--### AC-14: Edge Case - Giáo viên có nhiều vai trò trong cùng 1 khóa học
- **Tại** trang "Khóa học của tôi", tab "Đang cộng tác"
- **Khi** Giáo viên tự do có nhiều hơn 1 vai trò trong cùng 1 khóa học (ví dụ: vừa là CONTRIBUTOR vừa là REVIEWER - trường hợp đặc biệt)
- **Thì** hệ thống:
  - Hiển thị khóa học 1 lần duy nhất
  - Hiển thị tất cả các vai trò dưới dạng badges (ví dụ: "Giảng viên đóng góp" + "Giảng viên phản biện")
  - Tiến độ đóng góp tính theo vai trò CONTRIBUTOR (nếu có)
  - Nút hành động bao gồm cả "Xem submission cần review" nếu có vai trò REVIEWER-->

---

## Business rules

| Thuộc tính                     | Mã quy tắc | Mô tả                                                                                                                                                                         |
|--------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Điều kiện hiển thị khóa học    | BR-PS-356  | Chỉ hiển thị khóa học có invitation_status = ACCEPTED và course_status ≠ DRAFT (khóa học đã vượt qua giai đoạn mời giảng viên)                                              |
| Vai trò giảng viên             | BR-PS-357  | Các vai trò hợp lệ: OWNER (Giảng viên chủ trì), CONTRIBUTOR (Giảng viên đóng góp), REVIEWER (Giảng viên phản biện).  CONTRIBUTOR và REVIEWER out of scope                                                           |
| Trạng thái khóa học hợp lệ     | BR-PS-359  | CONTENT_BUILDING, READY_FOR_REVIEW, CONTENT_APPROVED, PIM_READY, PUBLISHED, <!--ARCHIVED-->                                                                                         |
| Phạm vi công việc OWNER        | BR-PS-361  | Vai trò OWNER có phạm vi công việc = "Toàn khóa học", không giới hạn section                                                                                                 |
| Phạm vi công việc CONTRIBUTOR  | BR-PS-362  | Vai trò CONTRIBUTOR có phạm vi công việc = danh sách các section_id trong contribution_scope                                                                                  |
| Phạm vi công việc REVIEWER     | BR-PS-363  | Vai trò REVIEWER có phạm vi công việc = "Toàn khóa học", review tất cả submission từ các giảng viên khác                                                                     |
| Sắp xếp mặc định               | BR-PS-367  | Danh sách khóa học mặc định sắp xếp theo ngày bắt đầu tham gia (invitation_responded_at), mới nhất lên đầu                                                                  |
| Phân trang                     | BR-PS-368  | Mỗi trang hiển thị tối đa 20 khóa học. Nếu tổng số khóa học ≤ 20 thì không hiển thị thanh phân trang                                                                        |
| Quyền truy cập workspace       | BR-PS-369  | Chỉ khóa học với trạng thái CONTENT_BUILDING, READY_FOR_REVIEW, CONTENT_APPROVED, PIM_READY mới cho phép "Vào workspace". PUBLISHED và ARCHIVED không cho phép chỉnh sửa   |
| Lọc theo vai trò               | BR-PS-370  | Bộ lọc vai trò cho phép chọn 1 vai trò tại 1 thời điểm. Có thể kết hợp với lọc trạng thái và tìm kiếm                                                                       |
| Lọc theo trạng thái            | BR-PS-371  | Bộ lọc trạng thái cho phép chọn 1 trạng thái tại 1 thời điểm. Có thể kết hợp với lọc vai trò và tìm kiếm                                                                    |
| Tìm kiếm                       | BR-PS-372  | Tìm kiếm không phân biệt hoa thường, có dấu, tìm kiếm theo chuỗi con (substring match) trong course_name và school_name                                                      |
| Hiển thị số giảng viên cộng tác| BR-PS-373  | Đếm tất cả bản ghi trong course_instructor với invitation_status = ACCEPTED và teacher_id ≠ teacher_id của người đang xem                                                    |

---

<!--## System rules

| Thuộc tính                     | Mã quy tắc | Mô tả                                                                                                                                                                         |
|--------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Bảng dữ liệu                   | SR-PS-354  | Sử dụng bảng `course_instructor` để lấy danh sách khóa học, với điều kiện teacher_id = {current_teacher_id} AND invitation_status = 'ACCEPTED'                               |
| API endpoint                   | SR-PS-355  | GET /api/v1/lf-course/teachers/{teacher_id}/participating-courses?role={OWNER\|CONTRIBUTOR\|REVIEWER}&status={CONTENT_BUILDING\|...\|PUBLISHED}&search={keyword}&page={number}&limit=20&sort_by={field}&sort_order={asc\|desc} |
| Xác thực quyền truy cập        | SR-PS-356  | Verify teacher_id trong token JWT khớp với teacher_id trong URL path. Nếu không khớp, trả về lỗi 403 Forbidden                                                               |
| Join với bảng course           | SR-PS-357  | JOIN bảng `course` để lấy course_name, school_id, course_status                                                                                                              |
| Join với bảng school           | SR-PS-358  | JOIN bảng `school` thông qua school_id để lấy school_name                                                                                                                     |
| Tính tiến độ đóng góp          | SR-PS-359  | JOIN bảng `course_content_submission` để đếm số section đã submit (submission_status = SUBMITTED hoặc APPROVED), so với tổng section trong contribution_scope (hoặc toàn khóa học nếu OWNER) |
| Đếm submission cần review      | SR-PS-360  | Với vai trò REVIEWER, đếm số bản ghi trong `course_content_submission` có submission_status = SUBMITTED (chờ review) và reviewed_by IS NULL hoặc reviewed_by = {current_teacher_id} |
| Đếm số giảng viên cộng tác     | SR-PS-361  | COUNT(*) FROM course_instructor WHERE course_id = {course_id} AND invitation_status = 'ACCEPTED' AND teacher_id != {current_teacher_id}                                      |
| Cache danh sách khóa học       | SR-PS-362  | Cache kết quả danh sách khóa học với TTL = 10 phút. Invalidate cache khi có sự kiện chấp nhận lời mời, submit content, hoặc thay đổi course_status                          |
| Response format                | SR-PS-363  | Trả về JSON: {data: [{course_id, course_name, school_name, role, contribution_scope, course_status, joined_at, progress_percentage, total_sections, completed_sections, total_instructors, pending_reviews (REVIEWER only)}], pagination: {total, page, limit, total_pages}} |
| Logging                        | SR-PS-364  | Log mỗi lần Giáo viên tự do truy cập danh sách khóa học đang tham gia, ghi nhận teacher_id, timestamp, số lượng khóa học                                                     |
| Performance                    | SR-PS-365  | Tạo composite index trên (teacher_id, invitation_status, invitation_responded_at) để tối ưu query. Tạo index trên (course_id, submission_status) để tính tiến độ nhanh       |
| Xử lý khóa học ARCHIVED        | SR-PS-366  | Nếu course_status = ARCHIVED, vẫn trả về trong danh sách nhưng đánh dấu is_archived = true, disable workspace access                                                         |
| Xử lý khóa học PUBLISHED       | SR-PS-367  | Nếu course_status = PUBLISHED, vẫn trả về trong danh sách, progress_percentage = 100%, disable workspace access                                                              |
-->
---

## Dependencies and Impact analysis

### Dependencies
- **Upstream US**:
  - US-PS-003 (Mời giáo viên tham gia): Tạo lời mời cộng tác
  - US-PS-014A (Xem danh sách khóa học được mời): Giáo viên chấp nhận lời mời → chuyển sang khóa học đang tham gia
  - US-PS-014E (Chấp nhận lời mời cộng tác): Thay đổi invitation_status từ PENDING → ACCEPTED

- **Downstream US**:
  - US-PS-014C (Xem tiến độ đóng góp nội dung): Từ danh sách này, giáo viên chọn "Xem tiến độ"
  - US-PS-014D (Xem lịch sử submissions): Từ danh sách này, giáo viên chọn xem chi tiết submission
  - US-PS-009A (Vào workspace để đóng góp nội dung): Từ danh sách này, giáo viên chọn "Vào workspace"
  <!--- US-PS-015 (Review submission): Từ danh sách này, REVIEWER chọn "Xem submission cần review"-->

### Impact Analysis
- **Database**:
  - Bảng `course_instructor`: READ operations với filter teacher_id, invitation_status = ACCEPTED
  - Bảng `course`: JOIN để lấy course_name, school_id, course_status
  - Bảng `school`: JOIN để lấy school_name
  - Bảng `course_content_submission`: JOIN để tính tiến độ, đếm submission cần review
  - Tạo composite index: (teacher_id, invitation_status, invitation_responded_at), (course_id, submission_status)

- **Services**:
  - **lf-course service**: Cung cấp API endpoint GET /teachers/{teacher_id}/participating-courses
  - **identity-service**: Xác thực JWT token, verify teacher_id
  - **lf-curriculum service**: Lấy danh sách section trong contribution_scope để tính tiến độ

- **UI/UX**:
  - Trang "Khóa học của tôi" với tab "Đang cộng tác"
  - Hiển thị khác nhau theo vai trò: OWNER / CONTRIBUTOR / REVIEWER
  - Bộ lọc: Vai trò, Trạng thái khóa học, Tìm kiếm
  - Sắp xếp: Thời gian, Tiến độ, Tên khóa học
  - Progress bar cho OWNER và CONTRIBUTOR
  - Submission counter cho REVIEWER

- **Performance**:
  - Cache danh sách khóa học với TTL = 10 phút
  - Pagination với limit = 20
  - Composite index để tối ưu query
  - Lazy loading cho progress calculation

---

## UI/UX Design

### Layout chính
```
┌─────────────────────────────────────────────────────────────────┐
│ Dashboard > Khóa học của tôi                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Đang cộng tác (12)] [Lời mời đang chờ (3)]                    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Bộ lọc:                                                   │   │
│  │ [Vai trò: Tất cả ▼] [Trạng thái: Tất cả ▼]              │   │
│  │ [Tìm kiếm: ________________________]                     │   │
│  │ Sắp xếp: [Thời gian tham gia ▼]                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📚 Khóa học Toán học lớp 10                              │   │
│  │ 🏫 Trường THPT Nguyễn Huệ                                │   │
│  │ 👤 Giảng viên chủ trì | 🟡 Đang xây dựng nội dung        │   │
│  │ 📂 Phạm vi: Toàn khóa học                                │   │
│  │ 📅 Tham gia: 01/12/2025                                   │   │
│  │ ━━━━━━━━━━━━━━━━━━━━ 65% (13/20 section hoàn thành)    │   │
│  │ 👥 3 giảng viên cộng tác                                  │   │
│  │ [Vào workspace] [Xem tiến độ] [Xem chi tiết]             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📚 Khóa học Vật lý nâng cao                              │   │
│  │ 🏫 Trường THPT Lê Quý Đôn                                │   │
│  │ 👤 Giảng viên đóng góp | 🔵 Sẵn sàng phản biện           │   │
│  │ 📂 Phạm vi: Chương 3: Điện học, Chương 5: Quang học      │   │
│  │ 📅 Tham gia: 28/11/2025                                   │   │
│  │ ━━━━━━━━━━━━━━━━━━━━ 80% (8/10 section hoàn thành)     │   │
│  │ 👥 5 giảng viên cộng tác                                  │   │
│  │ [Vào workspace] [Xem tiến độ] [Xem chi tiết]             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 📚 Khóa học Hóa học hữu cơ                               │   │
│  │ 🏫 Trường THPT Trần Hưng Đạo                             │   │
│  │ 👤 Giảng viên phản biện | 🟣 Nội dung đã duyệt           │   │
│  │ 📂 Phạm vi: Toàn khóa học                                │   │
│  │ 📅 Tham gia: 25/11/2025                                   │   │
│  │ 📊 5 submission cần review | 12 đã review                │   │
│  │ 👥 4 giảng viên cộng tác                                  │   │
│  │ [Xem submission cần review] [Xem chi tiết]               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  [Trang trước] [1] [2] [Trang sau]                              │
│  Hiển thị 1-20 trong tổng số 12 khóa học                        │
└─────────────────────────────────────────────────────────────────┘
```

### Màu sắc nhãn
- **Vai trò**:
  - Giảng viên chủ trì: Xanh dương (#2196F3)
  - Giảng viên đóng góp: Xanh lá (#4CAF50)
  - Giảng viên phản biện: Tím (#9C27B0)

- **Trạng thái khóa học**:
  - CONTENT_BUILDING (Đang xây dựng nội dung): Vàng (#FFC107)
  - READY_FOR_REVIEW (Sẵn sàng phản biện): Xanh dương (#2196F3)
  - CONTENT_APPROVED (Nội dung đã duyệt): Tím (#9C27B0)
  - PIM_READY (Sẵn sàng PIM): Xanh lá nhạt (#8BC34A)
  - PUBLISHED (Đã xuất bản): Xanh lá đậm (#4CAF50)
  - ARCHIVED (Đã lưu trữ): Xám (#9E9E9E)

### Responsive Design
- **Desktop**: Hiển thị đầy đủ thông tin, progress bar dạng ngang
- **Tablet**: Thu gọn phạm vi đóng góp, hiển thị icon thay vì text đầy đủ
- **Mobile**: Hiển thị dạng card, stack theo chiều dọc, progress bar dạng circle

---

## Out of scope
- **Instructor Role**: CONTRIBUTOR, REVIEWER
- ❌ Chức năng "Vào workspace" để đóng góp nội dung (thuộc US-PS-015A)
- ❌ Chức năng "Xem tiến độ" chi tiết (thuộc US-PS-014C)
- ❌ Chức năng "Xem submission cần review" (thuộc US-PS-016A)
- ❌ Rời khỏi khóa học đang tham gia
- ❌ Yêu cầu thay đổi vai trò hoặc phạm vi đóng góp
- ❌ Thông báo khi có submission mới cần review
- ❌ Export danh sách khóa học ra file Excel/PDF
- ❌ Lọc theo khoảng thời gian tham gia
- ❌ Dashboard tổng quan về tất cả khóa học đang tham gia
