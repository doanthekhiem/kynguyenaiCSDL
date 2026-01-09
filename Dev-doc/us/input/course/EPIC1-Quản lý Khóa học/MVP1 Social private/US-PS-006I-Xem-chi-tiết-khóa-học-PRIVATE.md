# US-PS-006I - Xem chi tiết khóa học PRIVATE

## User story Title
Là một **School Admin của trường tư**

Tôi muốn thực hiện **xem chi tiết đầy đủ thông tin của 1 khóa học PRIVATE cụ thể** tại **trang "Chi tiết khóa học"**

Để **quản lý toàn diện khóa học, theo dõi chi tiết trạng thái workflow, danh sách giảng viên cộng tác, tiến độ đóng góp nội dung từng section, lịch sử thay đổi, và đưa ra quyết định quản lý phù hợp**

---

## Acceptance criteria

### AC-1: Happy Path - Hiển thị thông tin tổng quan khóa học
- **Tại** trang "Chi tiết khóa học" khi School Admin truy cập từ danh sách khóa học hoặc URL trực tiếp
- **Khi** School Admin chọn "Xem chi tiết" 1 khóa học PRIVATE với owner_type = SCHOOL và tenant_id khớp với trường
- **Thì** hệ thống hiển thị phần **Thông tin chung** với các thông tin:
  - Hình ảnh/ video thumbnail khóa học 
  - Mã khóa học (course_code)
  - Tiêu đề khóa học 
  - Tóm tắt ngắn 
  - Trạng thái hiện tại
  - Ngày tạo (created_at)
  - Ngày cập nhật cuối (updated_at)
  - Người tạo (creator_name)
  - Trường sở hữu (school_name, tenant_id)
  - Nút hành động: "Chỉnh sửa", "Xem trước", "Publish", "Unpublish", "Archive" (tùy theo trạng thái)

### AC-2: Happy Path - Hiển thị cấu trúc chương trình học (Curriculum) nếu đã có
- **Tại** trang "Chi tiết khóa học", phần "Cấu trúc chương trình"
- **Khi** khóa học đã có curriculum được tạo
- **Thì** hệ thống hiển thị cấu trúc phân cấp:
  - Danh sách các Section (Chương) với Tên chương, Số thứ tự hiển thị của chương
  - Trong mỗi Section, hiển thị danh sách Lecture (Bài học) với Tên bài học, Thứ tự hiển thị của bài học, Loại bài học (VIDEO/TEXT/QUIZ/ASSIGNMENT)
  - Biểu tượng trạng thái nội dung cho mỗi Lecture: Đã hoàn thành - có submission approved, Đang làm - có submission draft/revision, Chưa bắt đầu - không có submission
  - Tổng số Lecture: X bài học
  - Cho phép thu gọn/mở rộng từng Section

### AC-3: Happy Path - Hiển thị danh sách giảng viên cộng tác
- **Tại** trang "Chi tiết khóa học", phần "Giảng viên cộng tác"
- **Khi** khóa học có ít nhất 1 lời mời giảng viên (bất kể trạng thái)
- **Thì** hệ thống hiển thị danh sách giảng viên với các thông tin:
  - Avatar giảng viên
  - Tên giảng viên (teacher_name)
  - Vai trò: **Giảng viên chủ trì** (OWNER) <!-- / **Giảng viên đóng góp** (CONTRIBUTOR) / **Giảng viên phản biện** (REVIEWER)
  - Phạm vi đóng góp - nếu vai trò = OWNER: Toàn bộ phạm vi
  - Trạng thái lời mời: **Đang chờ phản hồi** (PENDING) / **Đã chấp nhận** (ACCEPTED) / **Đã từ chối** (REJECTED)
  - Ngày mời (invitation_sent_at)
  - Ngày phản hồi (invitation_responded_at) - nếu đã phản hồi
   <!-- - Tiến độ đóng góp: X% (nếu đã chấp nhận và vai trò = OWNER hoặc CONTRIBUTOR) 
  - Số submission đã review (nếu vai trò = REVIEWER) -->
  - Nút hành động: "Gửi lại lời mời", "Hủy lời mời" (tùy trạng thái)
  <!-- - Trạng thái tham gia: Đã tham gia (ACCEPTED) / Đang chờ (PENDING) / Đã từ chối (REJECTED)
  - Sắp xếp theo vai trò: OWNER lên đầu, sau đó CONTRIBUTOR, cuối cùng REVIEWER

### AC-4: Happy Path - Hiển thị tiến độ đóng góp nội dung chi tiết
- **Tại** trang "Chi tiết khóa học", phần "Tiến độ nội dung"
- **Khi** khóa học ở trạng thái CONTENT_BUILDING, READY_FOR_REVIEW, CONTENT_APPROVED, hoặc PIM_READY
- **Thì** hệ thống hiển thị:
  - **Tổng quan tiến độ**:
    - Tổng section (Chương): tính theo thời điểm submit gần nhất
    - Số lần submit: Đếm tổng số lần Giảng viên chủ trì đã submit khóa học
    - Số lần reject: Đếm tổng số lần bị submission bị reject
  <!-- - **Bảng chi tiết tiến độ theo giảng viên**:
    - Tên giảng viên
    - Vai trò
    - Số section được phân công
    - Số section đã submit
    - Số section đã approved
    - Tiến độ (%): (số section approved / số section được phân công) * 100%
    - Nút "Xem chi tiết tiến độ" 
  - **Biểu đồ Timeline**: Hiển thị số submission theo thời gian (tuần/tháng)
  - Sắp xếp theo tiến độ thấp nhất để ưu tiên những giảng viên cần hỗ trợ -->

### AC-5: Happy Path - Hiển thị lịch sử thay đổi workflow
- **Tại** trang "Chi tiết khóa học", phần "Lịch sử thay đổi"
- **Khi** khóa học đã có ít nhất 1 lần thay đổi trạng thái workflow
- **Thì** hệ thống hiển thị timeline lịch sử với các thông tin:
  - Ngày giờ thay đổi (transition_timestamp)
  - Trạng thái cũ → Trạng thái mới (từ DRAFT → INVITING_INSTRUCTORS → CONTENT_BUILDING → ...)
  - Người thực hiện thay đổi (changed_by_name)
  - Ghi chú (transition_notes) - nếu có
  - Lý do thay đổi (transition_reason) - nếu có (ví dụ: "Giảng viên đã chấp nhận lời mời", "Khóa học đã được duyệt", "Khóa học bị từ chối"...)
  - Biểu tượng timeline với đường nối giữa các sự kiện
  - Sắp xếp theo thời gian mới nhất lên đầu
  - Cho phép lọc theo khoảng thời gian (7 ngày qua, 30 ngày qua, 3 tháng qua, Tùy chỉnh)

### AC-6: Alternative Path - Hiển thị thông tin cơ bản khóa học
- **Tại** trang "Chi tiết khóa học", phần "Thông tin bổ sung"
- **Khi** School Admin chọn tab "Metadata"
- **Thì** hệ thống hiển thị các thông tin metadata:
  - Mô tả khóa học
  - Môn học 
  - Chủ đề 
  - Đối tượng phù hợp 
  - Lớp
  - Trình độ 
  - Chứng chỉ
  - Ngôn ngữ giảng dạy
  - Hình thức học 
  - Số buổi học
  - Thời lượng / buổi
  - Bài tập về nhà 
  - Đầu ra học tập 

<!--### AC-7: Alternative Path - Hiển thị thống kê submission chi tiết
- **Tại** trang "Chi tiết khóa học", phần "Thống kê submission"
- **Khi** School Admin chọn tab "Submissions"
- **Thì** hệ thống hiển thị bảng danh sách tất cả submissions với các thông tin:
  - Section name
  - Giảng viên submit (teacher_name)
  - Phiên bản (version_number)
  - Ngày submit (submission_submitted_at)
  - Trạng thái: DRAFT / SUBMITTED / APPROVED / REVISION_REQUIRED
  - Giảng viên phản biện (reviewer_name) - nếu có
  - Ngày phản biện (reviewed_at) - nếu có
  - Kết quả phản biện: APPROVED / REVISION_REQUIRED
  - Rating (nếu có): 1-5 sao
  - Nút hành động: "Xem chi tiết", "So sánh phiên bản"
  - Bộ lọc: Theo giảng viên, Theo section, Theo trạng thái, Theo kết quả phản biện
  - Sắp xếp: Theo ngày submit, Theo giảng viên, Theo section
  - Phân trang: 50 submission/trang-->

### AC-8: Alternative Path - Xem preview khóa học
- **Tại** trang "Chi tiết khóa học"
- **Khi** School Admin chọn nút "Xem trước"
- **Thì** hệ thống mở tab mới hiển thị giao diện khóa học như học sinh sẽ thấy:
  - Landing page với hình ảnh, tiêu đề, mô tả
  - Cấu trúc chương trình học (curriculum outline)
  - Nội dung demo của các section (nếu đã có nội dung approved)
  - Thông tin giảng viên (OWNER)
  - Nhãn **"Preview Mode - Chế độ xem trước"** ở góc trên
  - Nút "Thoát preview" để quay lại trang chi tiết

<!-- ### AC-9: Alternative Path - Export báo cáo khóa học
- **Tại** trang "Chi tiết khóa học"
- **Khi** School Admin chọn nút "Export báo cáo"
- **Thì** hệ thống:
  - Hiển thị popup chọn định dạng: PDF / Excel / Word
  - Hiển thị checkbox chọn nội dung cần export:
    - ✅ Thông tin tổng quan
    - ✅ Cấu trúc chương trình học
    - ✅ Danh sách giảng viên cộng tác
    - ✅ Tiến độ đóng góp nội dung
    - ✅ Lịch sử thay đổi workflow
    - ✅ Metadata
    - ✅ Thống kê submission
  - Cho phép chọn khoảng thời gian (nếu export lịch sử hoặc submission)
  - Nút "Tải xuống" để bắt đầu export
  - Hiển thị progress bar trong quá trình export
  - Tự động tải file xuống máy khi hoàn thành -->

### AC-10: Edge Case - Khóa học chưa có giảng viên nào
- **Tại** trang "Chi tiết khóa học", phần "Giảng viên cộng tác"
- **Khi** khóa học ở trạng thái DRAFT hoặc INVITING_INSTRUCTORS và chưa mời giảng viên nào
- **Thì** hệ thống hiển thị:
  - Thông báo: "Khóa học chưa có giảng viên cộng tác. Hãy mời giảng viên để bắt đầu xây dựng nội dung!"
  - Biểu tượng minh họa trạng thái rỗng 👥
  - Nút "Mời giảng viên ngay" màu xanh lá nổi bật

### AC-11: Edge Case - Khóa học chưa có curriculum
- **Tại** trang "Chi tiết khóa học", phần "Cấu trúc chương trình"
- **Khi** khóa học chưa có curriculum (total_chapters = 0, total_sections = 0)
- **Thì** hệ thống hiển thị:
  - Thông báo: "Chưa có chương trình học."
  - Biểu tượng minh họa trạng thái rỗng

### AC-12: Edge Case - Khóa học đã PUBLISHED hoặc ARCHIVED
- **Tại** trang "Chi tiết khóa học"
- **Khi** khóa học có trạng thái = PUBLISHED hoặc ARCHIVED
- **Thì** hệ thống:
  - Hiển thị banner thông báo ở đầu trang:
    - Nếu PUBLISHED: "Khóa học này đã được xuất bản và đang public cho học sinh. Không thể chỉnh sửa nội dung."
    - Nếu ARCHIVED: "Khóa học này đã được lưu trữ. Không thể chỉnh sửa hoặc xuất bản."
  - Vô hiệu hóa các nút: "Chỉnh sửa", "Mời giảng viên", "Publish"
  - Chỉ cho phép: "Xem trước", "Unpublish" (nếu PUBLISHED), 
  - Hiển thị thông tin read-only cho tất cả các phần

### AC-13: Edge Case - Kiểm tra phân quyền truy cập
- **Tại** trang "Chi tiết khóa học"
- **Khi** người dùng không phải School Admin của trường sở hữu khóa học cố gắng truy cập
- **Thì** hệ thống:
  - Kiểm tra tenant_id trong JWT token có khớp với course.tenant_id không
  - Kiểm tra role = SCHOOL_ADMIN
  - Nếu không khớp, trả về lỗi 403 Forbidden với thông báo: "Bạn không có quyền thực hiện hành động này"
  - Không trả về bất kỳ dữ liệu nào

### AC-14: Edge Case - Xử lý lỗi khi tải chi tiết khóa học
- **Tại** trang "Chi tiết khóa học"
- **Khi** dịch vụ backend bị lỗi hoặc không phản hồi sau 10 giây
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi: "Không thể tải chi tiết khóa học. Vui lòng thử lại sau"
  - Nút "Thử lại" để reload trang
  - Ghi nhận lỗi với mã ERROR-COURSE-DETAIL-001
  - Gửi cảnh báo đến team kỹ thuật
  - Hiển thị dữ liệu cache nếu có (với nhãn "Dữ liệu có thể không cập nhật")

### AC-15: Edge Case - Khóa học có cảnh báo cần chú ý
- **Tại** trang "Chi tiết khóa học"
- **Khi** khóa học có các vấn đề: lời mời sắp hết hạn (< 24h), submission bị rejected, không có giảng viên chấp nhận sau 7 ngày, hoặc stuck ở một trạng thái quá lâu (> 30 ngày)
- **Thì** hệ thống:
  - Hiển thị banner cảnh báo ở đầu trang với biểu tượng ⚠️ màu vàng hoặc đỏ
  - Thông báo cụ thể:
    - "Có X lời mời sắp hết hạn trong 24h. Hãy nhắc nhở giảng viên!"
    - "Khóa học chưa có giảng viên nào chấp nhận lời mời sau 7 ngày. Hãy liên hệ trực tiếp!"
    - "Khóa học chưa cập nhật từ [ngày]. Hãy kiểm tra tiến độ!"
  - Nút "Xem chi tiết" để đi đến phần liên quan (Giảng viên cộng tác, Lịch sử thay đổi)
  - Cho phép "Tắt cảnh báo" nếu School Admin đã xử lý

---

## Business rules

| Thuộc tính                     | Mã quy tắc | Mô tả                                                                                                                                                                         |
|--------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Trạng thái workflow            | BR-PS-404  | Các trạng thái hợp lệ: DRAFT, INVITING_INSTRUCTORS, CONTENT_BUILDING, READY_FOR_REVIEW, CONTENT_APPROVED, PIM_READY, PUBLISHED, UNPUBLISHED, ARCHIVED                       |
| Vai trò giảng viên             | BR-PS-406  | Các vai trò hợp lệ: OWNER (Giảng viên chủ trì), CONTRIBUTOR (Giảng viên đóng góp), REVIEWER (Giảng viên phản biện)                                                           |
| Trạng thái lời mời             | BR-PS-407  | Các trạng thái hợp lệ: PENDING (Đang chờ phản hồi), ACCEPTED (Đã chấp nhận), REJECTED (Đã từ chối)                                                                          |
| Cảnh báo lời mời hết hạn       | BR-PS-413  | Hiển thị cảnh báo nếu có invitation với status = PENDING và invitation_expires_at - now < 24h                                                                                |
| Cảnh báo không giảng viên      | BR-PS-415  | Hiển thị cảnh báo nếu created_at < now - 7 days và không có instructor với invitation_status = ACCEPTED                                                                      |
| Cảnh báo stuck workflow        | BR-PS-416  | Hiển thị cảnh báo nếu updated_at < now - 30 days và status ≠ PUBLISHED và status ≠ ARCHIVED                                                                                  |
| Quyền chỉnh sửa                | BR-PS-417  | Chỉ cho phép chỉnh sửa khi status ∈ {DRAFT, INVITING_INSTRUCTORS, CONTENT_BUILDING, READY_FOR_REVIEW, CONTENT_APPROVED, PIM_READY}. KHÔNG cho phép khi PUBLISHED hoặc ARCHIVED |
| Section type                   | BR-PS-418  | Các loại section hợp lệ: VIDEO (video lecture), TEXT (text article), QUIZ (quiz/test), ASSIGNMENT (assignment/homework)                                                      |
| Cache chi tiết khóa học        | BR-PS-420  | Cache chi tiết khóa học với TTL = 5 phút. Invalidate cache khi có sự kiện: thay đổi workflow, mời giảng viên, submit nội dung, phản biện                                    |

---

## System rules

| Thuộc tính                     | Mã quy tắc | Mô tả                                                                                                                                                                         |
|--------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Bảng dữ liệu chính             | SR-PS-396  | Sử dụng bảng `course` để lấy thông tin khóa học với điều kiện course_id = {course_id} AND owner_type = 'SCHOOL' AND tenant_id = {tenant_id}                                 |
| API endpoint                   | SR-PS-397  | GET /api/v1/lf-course/courses/{course_id}/details                                                                                                                            |
| Xác thực quyền truy cập        | SR-PS-398  | Verify tenant_id trong JWT token khớp với course.tenant_id AND role = 'SCHOOL_ADMIN'. Nếu không khớp, trả về 403 Forbidden                                                  |
| Join với bảng school           | SR-PS-399  | JOIN bảng `school` thông qua tenant_id để lấy school_name                                                                                                                     |
| Join với bảng teacher          | SR-PS-400  | JOIN bảng `teacher` thông qua creator_id để lấy creator_name                                                                                                                  |
| Join với bảng curriculum       | SR-PS-401  | JOIN bảng `curriculum_chapter` và `curriculum_section` để lấy cấu trúc chương trình học: chapter_name, chapter_order, section_name, section_order, section_type             |
| Join với bảng instructor       | SR-PS-402  | JOIN bảng `course_instructor` để lấy danh sách giảng viên cộng tác: teacher_id, role, contribution_scope, invitation_status, invitation_sent_at, invitation_responded_at     |
| Join với bảng submission       | SR-PS-403  | JOIN bảng `course_content_submission` để tính tiến độ nội dung và lấy thống kê submission: submission_id, section_id, teacher_id, submission_status, review_result, submitted_at, reviewed_at, reviewer_id, version_number, rating |
| Join với bảng workflow history | SR-PS-404  | JOIN bảng `course_workflow_history` để lấy lịch sử thay đổi workflow: transition_id, from_status, to_status, transition_timestamp, changed_by_id, transition_notes, transition_reason |
| Tính tiến độ nội dung          | SR-PS-405  | progress_percentage = (COUNT(DISTINCT section_id WHERE submission_status = 'APPROVED') / COUNT(DISTINCT section_id)) * 100                                                   |
| Đếm submission theo trạng thái | SR-PS-406  | COUNT(*) FROM course_content_submission WHERE course_id = {course_id} GROUP BY submission_status                                                                             |
| Cache chi tiết khóa học        | SR-PS-407  | Cache kết quả API với key = "course_detail:{course_id}", TTL = 300s (5 phút). Invalidate khi có event: course_updated, instructor_invited, submission_created, review_completed |
| Response format                | SR-PS-408  | Trả về JSON với cấu trúc: {course_info: {course_id, course_code, course_name, ...}, curriculum: {chapters: [{chapter_id, chapter_name, sections: [{section_id, section_name, ...}]}]}, instructors: [{teacher_id, teacher_name, role, ...}], progress: {total_sections, completed_sections, progress_percentage, ...}, submissions: [{submission_id, ...}], workflow_history: [{transition_id, ...}], metadata: {...}} |
| Logging                        | SR-PS-409  | Log mỗi lần School Admin xem chi tiết khóa học, ghi nhận: user_id, course_id, timestamp, IP address                                                                          |
| Performance                    | SR-PS-410  | Tạo composite index trên (course_id, owner_type, tenant_id), (course_id, section_id), (course_id, teacher_id) để tối ưu query. Thời gian thực thi < 500ms                   |
| Export file API                | SR-PS-411  | POST /api/v1/lf-course/courses/{course_id}/export với body: {format: 'pdf'\|'excel'\|'word', sections: ['overview', 'curriculum', 'instructors', ...], date_from, date_to}  |
| Timeout API                    | SR-PS-412  | Timeout sau 10 giây nếu API không phản hồi. Trả về lỗi 504 Gateway Timeout                                                                                                   |

---

## Dependencies and Impact analysis

### Dependencies
- **Upstream US**:
  - US-PS-006A (Xem danh sách khóa học PRIVATE): Từ danh sách, School Admin chọn "Xem chi tiết" → truy cập US này
  - US-PS-001 (Tạo khóa học PRIVATE): Tạo khóa học → có dữ liệu để xem chi tiết
  - US-PS-003 (Mời giảng viên tham gia): Mời giảng viên → hiển thị danh sách giảng viên trong chi tiết
  - US-PS-015A (Đóng góp nội dung): Submit nội dung → cập nhật tiến độ trong chi tiết
  - US-PS-016B (Phản biện submission): Phản biện → cập nhật thống kê submission trong chi tiết

- **Downstream US**:
  - US-PS-006E (Chỉnh sửa thông tin khóa học): Từ trang chi tiết, School Admin chọn "Chỉnh sửa"
  - US-PS-003 (Mời giảng viên): Từ trang chi tiết, School Admin chọn "Mời giảng viên"
  - US-PS-006F (Xem trước khóa học): Từ trang chi tiết, School Admin chọn "Xem trước"
  - US-PS-006G (Publish khóa học): Từ trang chi tiết, School Admin chọn "Publish"
  - US-PS-006H (Archive khóa học): Từ trang chi tiết, School Admin chọn "Archive"

### Impact Analysis
- **Database**:
  - Bảng `course`: READ operations với filter course_id, owner_type, tenant_id
  - Bảng `school`: JOIN để lấy school_name
  - Bảng `teacher`: JOIN để lấy creator_name, teacher_name
  - Bảng `curriculum_chapter`, `curriculum_section`: JOIN để lấy cấu trúc curriculum
  - Bảng `course_instructor`: JOIN để lấy danh sách giảng viên
  - Bảng `course_content_submission`: JOIN để tính tiến độ và lấy thống kê submission
  - Bảng `course_workflow_history`: JOIN để lấy lịch sử thay đổi workflow
  - Tạo composite index: (course_id, owner_type, tenant_id), (course_id, section_id), (course_id, teacher_id)

- **Services**:
  - **lf-course service**: Cung cấp API endpoint GET /courses/{course_id}/details và POST /courses/{course_id}/export
  - **lf-curriculum service**: Lấy cấu trúc curriculum: chapters, sections
  - **identity-service**: Xác thực JWT token, verify tenant_id và role
  - **tf-teacher-profile service**: Lấy thông tin giảng viên: teacher_name, avatar

- **UI/UX**:
  - Trang "Chi tiết khóa học" với 7 phần chính:
    - Thông tin tổng quan
    - Cấu trúc chương trình học
    - Giảng viên cộng tác
    - Tiến độ đóng góp nội dung
    - Lịch sử thay đổi workflow
    - Metadata (tab)
    - Thống kê submission (tab)
  - Banner cảnh báo nếu có vấn đề cần chú ý
  - Preview mode popup
  - Export báo cáo popup

- **Performance**:
  - Cache chi tiết khóa học với TTL = 5 phút
  - Composite index để tối ưu query
  - Lazy loading cho các tab (Metadata, Submissions)
  - Pagination cho danh sách submission (50/trang)
  - Thời gian thực thi < 500ms

- **Realtime Updates**:
  - WebSocket hoặc SSE để cập nhật realtime khi có:
    - Giảng viên chấp nhận/từ chối lời mời
    - Submission mới được submit
    - Submission được phản biện
    - Thay đổi workflow status
  - Invalidate cache khi có event

---

## UI/UX Design
Link mockup: https://gemini.google.com/share/e5d931ff4db4

### Layout chính
```
┌─────────────────────────────────────────────────────────────────┐
│ Course Dashboard > Chi tiết khóa học: Toán học lớp 10           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ⚠️ CẢNH BÁO: Có 2 lời mời sắp hết hạn trong 24h!              │
│  [Xem chi tiết] [Tắt cảnh báo]                                  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ THÔNG TIN TỔNG QUAN                                       │   │
│  │                                                           │   │
│  │  [Hình ảnh thumbnail 1200x630px]                         │   │
│  │                                                           │   │
│  │  📚 Mã khóa học: MATH10-2025-001                         │   │
│  │  📖 Tiêu đề: Toán học lớp 10 - Chương trình nâng cao    │   │
│  │  📝 Mô tả: Khóa học toán học lớp 10 dành cho học sinh...│   │
│  │  🟡 Trạng thái: Đang xây dựng nội dung (CONTENT_BUILDING)│   │
│  │  📅 Ngày tạo: 01/11/2025                                 │   │
│  │  🔄 Cập nhật cuối: 05/12/2025 14:30                      │   │
│  │  👤 Người tạo: Nguyễn Văn A                              │   │
│  │  🏫 Trường: THPT Nguyễn Huệ                              │   │
│  │                                                           │   │
│  │  [Chỉnh sửa] [Mời giảng viên] [Xem trước] [Publish]     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ CẤU TRÚC CHƯƠNG TRÌNH HỌC                                │   │
│  │                                                           │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━ 65% (13/20 section)             │   │
│  │                                                           │   │
│  │  📖 Chương 1: Đại số (5 section)              [Thu gọn] │   │
│  │    ✅ 1.1: Tập hợp số thực (VIDEO)                      │   │
│  │    ✅ 1.2: Phương trình bậc nhất (TEXT)                 │   │
│  │    🟡 1.3: Hệ phương trình (VIDEO)                      │   │
│  │    ⚪ 1.4: Bất phương trình (TEXT)                      │   │
│  │    ⚪ 1.5: Quiz chương 1 (QUIZ)                         │   │
│  │                                                           │   │
│  │  📖 Chương 2: Hình học (4 section)            [Mở rộng] │   │
│  │                                                           │   │
│  │  [Chỉnh sửa cấu trúc]                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ GIẢNG VIÊN CỘNG TÁC                                      │   │
│  │                                                           │   │
│  │  ✅ Đã tham gia (3)                                      │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │ 👤 [Avatar] GV Nguyễn Văn A                       │  │   │
│  │  │ 🔵 Giảng viên chủ trì | ✅ Đã chấp nhận           │  │   │
│  │  │ 📂 Phạm vi: Toàn khóa học                         │  │   │
│  │  │ 📅 Mời: 01/11/2025 | Chấp nhận: 02/11/2025       │  │   │
│  │  │ ━━━━━━━━━━━━━━ 70% (14/20 section hoàn thành)   │  │   │
│  │  │ [Xem tiến độ] [Chỉnh sửa vai trò]                 │  │   │
│  │  └───────────────────────────────────────────────────┘  │   │
│  │                                                           │   │
│  │  🟡 Đang chờ phản hồi (2)                                │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │ 👤 [Avatar] GV Trần Thị B                         │  │   │
│  │  │ 🟢 Giảng viên đóng góp | 🟡 Đang chờ phản hồi     │  │   │
│  │  │ 📂 Phạm vi: Chương 3, Chương 5                    │  │   │
│  │  │ 📅 Mời: 04/12/2025 | ⏳ Hết hạn: 11/12/2025     │  │   │
│  │  │ [Gửi lại lời mời] [Hủy lời mời]                   │  │   │
│  │  └───────────────────────────────────────────────────┘  │   │
│  │                                                           │   │
│  │  [Mời thêm giảng viên]                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ TIẾN ĐỘ ĐÓNG GÓP NỘI DUNG                               │   │
│  │                                                           │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━ 65% hoàn thành                  │   │
│  │  📊 13/20 section đã hoàn thành                          │   │
│  │  🔍 2 submission đang chờ review                         │   │
│  │  ⚠️ 1 submission bị rejected                            │   │
│  │                                                           │   │
│  │  [Timeline] [Biểu đồ]                                    │   │
│  │                                                           │   │
│  │  Giảng viên          Vai trò       Phân công  Hoàn thành│   │
│  │  GV Nguyễn Văn A     Chủ trì       20/20      70%       │   │
│  │  GV Lê Văn C         Đóng góp      5/20       40%       │   │
│  │  GV Phạm Thị D       Phản biện     -          15 review │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ LỊCH SỬ THAY ĐỔI WORKFLOW                                │   │
│  │                                                           │   │
│  │  [7 ngày qua ▼]                                          │   │
│  │                                                           │   │
│  │  ● 05/12/2025 14:30                                      │   │
│  │  │ INVITING_INSTRUCTORS → CONTENT_BUILDING              │   │
│  │  │ Bởi: School Admin Nguyễn Văn A                       │   │
│  │  │ Lý do: "Tất cả giảng viên chủ trì đã chấp nhận"      │   │
│  │  │                                                       │   │
│  │  ● 02/11/2025 09:00                                      │   │
│  │  │ DRAFT → INVITING_INSTRUCTORS                         │   │
│  │  │ Bởi: School Admin Nguyễn Văn A                       │   │
│  │  │ Lý do: "Bắt đầu mời giảng viên tham gia"             │   │
│  │  │                                                       │   │
│  │  ● 01/11/2025 10:00                                      │   │
│  │    Tạo khóa học với trạng thái DRAFT                     │   │
│  │    Bởi: School Admin Nguyễn Văn A                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  [Metadata] [Submissions] [Export báo cáo]                      │
└─────────────────────────────────────────────────────────────────┘
```

### Màu sắc
- **Trạng thái workflow**: Giống US-PS-006A
- **Vai trò giảng viên**: OWNER (xanh dương #2196F3), CONTRIBUTOR (xanh lá #4CAF50), REVIEWER (tím #9C27B0)
- **Trạng thái lời mời**: PENDING (vàng #FFC107), ACCEPTED (xanh lá #4CAF50), REJECTED (xám #9E9E9E)
- **Progress bar**: Đỏ (#F44336) < 30%, Vàng (#FFC107) 30-70%, Xanh lá (#4CAF50) > 70%
- **Cảnh báo**: Vàng (#FFC107) hoặc Đỏ (#F44336)

### Responsive Design
- **Desktop**: Hiển thị đầy đủ tất cả các phần, layout 2 cột (thông tin chính bên trái, thống kê bên phải)
- **Tablet**: Thu gọn một số phần, layout 1 cột, collapse các phần ít quan trọng
- **Mobile**: Hiển thị dạng card, stack theo chiều dọc, chỉ hiển thị thông tin quan trọng nhất, các phần khác collapse mặc định

---

## Out of scope

-  **Instructor Role**: CONTRIBUTOR, REVIEWER
- ❌ Chức năng "Chỉnh sửa thông tin khóa học" (thuộc US-PS-006E)
- ❌ Chức năng "Mời giảng viên" (thuộc US-PS-003)
- ❌ Chức năng "Publish khóa học" (thuộc US-PS-006G)
- ❌ Chức năng "Unpublish khóa học" (thuộc US-PS-006G)
- ❌ Chức năng "Archive khóa học" (thuộc US-PS-006H)
- ❌ Chức năng "Chỉnh sửa cấu trúc curriculum" (thuộc Curriculum Management Epic)
- ❌ Chức năng "Xem chi tiết submission" (thuộc US-PS-016A)
- ❌ Chức năng "Review submission" (thuộc US-PS-016B)
- ❌ Xem thống kê học sinh (enrollment, completion rate, etc.) - chỉ xem thống kê nội dung
- ❌ Gửi thông báo nhắc nhở giảng viên
- ❌ Tạo báo cáo tự động hàng tuần/tháng
- ❌ So sánh tiến độ với các khóa học khác
- ❌ Thiết lập deadline cho từng section
- ❌ Phân quyền chi tiết cho giảng viên (view-only, edit, etc.)
