# US-PS-006A - Xem danh sách khóa học PRIVATE

## User story Title
US-PS-006A - Xem danh sách khóa học PRIVATE (View PRIVATE Course List)

Là một **School Admin của trường tư**

Tôi muốn thực hiện **xem danh sách tất cả khóa học PRIVATE của trường** tại **trang Course Dashboard của sản phẩm LMS**

Để **theo dõi tiến độ xây dựng khóa học, quản lý trạng thái workflow, và điều phối công việc giữa các giảng viên**

---

## Acceptance criteria

### AC-1: Happy Path - Hiển thị danh sách khóa học PRIVATE với đầy đủ thông tin
- **Tại** trang "Dashboard Khóa học" của School Admin
- **Khi** Quản trị viên nhà trường mở trang
- **Thì** hệ thống truy vấn bảng khóa học với điều kiện owner_type=SCHOOL và tenant_id của trường, kết hợp với bảng giảng viên và bảng submission để tính toán thống kê, hiển thị danh sách khóa học với thông tin: 
+ Thumbnail khóa học, 
+ Tiêu đề, 
+ mã khóa học, 
+ trạng thái workflow (DRAFT/INVITING_INSTRUCTORS/CONTENT_BUILDING/READY_FOR_REVIEW/CONTENT_APPROVED/PIM_READY/PUBLISHED/UNPUBLISHED/ARCHIVED), 
+ số giảng viên (Tổng/Đã chấp nhận/Đang chờ), 
+ tiến độ giảng dạy (Số buổi đã dạy/ tổng số buổi), 
+ ngày tạo, 
+ ngày cập nhật cuối, 
+ các nút hành động (Xem chi tiết/Chỉnh sửa/Preview/Publish/Unpublish/Archive tùy trạng thái), 
+ sắp xếp theo ngày cập nhật giảm dần (mới nhất trên cùng)

<!-- ### AC-2: Hiển thị biểu tượng trạng thái workflow với màu sắc phân biệt
- **Tại** cột "Trạng thái" trong danh sách khóa học
- **Khi** hệ thống hiển thị trạng thái workflow
- **Thì** hệ thống hiển thị nhãn màu cho từng trạng thái: DRAFT (xám), INVITING_INSTRUCTORS (cam), CONTENT_BUILDING (vàng), READY_FOR_REVIEW (xanh dương), CONTENT_APPROVED (tím), PIM_READY (xanh lá nhạt), PUBLISHED (xanh lá đậm), UNPUBLISHED (cam đậm), ARCHIVED (xám đậm), kèm biểu tượng tương ứng (📝 cho DRAFT, 📧 cho INVITING, ✏️ cho BUILDING, 👀 cho REVIEW, ✅ cho APPROVED, 🎁 cho PIM_READY, 🚀 cho PUBLISHED, ⏸️ cho UNPUBLISHED, 📦 cho ARCHIVED) -->

<!-- ### AC-3: Hiển thị tiến độ nội dung bằng thanh progress bar
- **Tại** cột "Tiến độ" trong danh sách khóa học
- **Khi** khóa học ở trạng thái CONTENT_BUILDING, READY_FOR_REVIEW, CONTENT_APPROVED hoặc PIM_READY
- **Thì** hệ thống tính phần trăm hoàn thành = (số lecture đã có nội dung approved / tổng số lectures) * 100, hiển thị thanh tiến trình với màu xanh lá và phần trăm (VD: 65%), hiển thị tooltip khi hover "X/Y bài học đã hoàn thành", màu đỏ nếu < 30%, vàng nếu 30-70%, xanh lá nếu > 70% -->

### AC-4: Hiển thị thống kê giảng viên với badge số lượng
- **Tại** cột "Giảng viên" trong danh sách khóa học
- **Khi** hệ thống hiển thị thông tin giảng viên
- **Thì** hệ thống: 
+ Đếm số giảng viên theo trạng thái invitation, 
+ Hiển thị badge "Tổng: X | Đã tham gia: Y | Đang mời: Z" 
+ Hiển thị avatar các giảng viên đã chấp nhận (tối đa 3 avatar, nếu > 3 hiển thị "+N"), 
+ tooltip khi hover avatar hiển thị tên và vai trò giảng viên

### AC-5: Hiển thị cảnh báo cho khóa học cần chú ý
- **Tại** danh sách khóa học
- **Khi** khóa học có vấn đề: invitation sắp hết hạn (< 24h), submission bị từ chối, không có giảng viên chấp nhận sau 7 ngày, hoặc stuck ở một trạng thái quá lâu (> 30 ngày)
- **Thì** hệ thống:
+ Hiển thị biểu tượng cảnh báo bên cạnh tiêu đề khóa học, 
+ Hiển thị tooltip với thông báo cụ thể "Lời mời sắp hết hạn" hoặc "Nội dung cần xem lại" hoặc "Chưa có giảng viên tham gia" hoặc "Khóa học chưa cập nhật từ [ngày]", 
+ Đặt khóa học có cảnh báo lên đầu danh sách

### AC-6: Hiển thị thống kê tổng quan ở đầu trang
- **Tại** phần đầu trang "Dashboard Khóa học"
- **Khi** trang được tải
- **Thì** hệ thống tính và hiển thị: Tổng số khóa học: X, Đang xây dựng (DRAFT + INVITING + BUILDING): Y, Đang review (READY_FOR_REVIEW): Z, Đã xuất bản (PUBLISHED): A, Đã ẩn (UNPUBLISHED): B, Đã lưu trữ (ARCHIVED): C, sử dụng card hiển thị với biểu tượng và màu sắc phù hợp, cho phép nhấn vào card để lọc nhanh theo trạng thái

### AC-7: Hỗ trợ phân trang cho danh sách dài
- **Tại** cuối danh sách khóa học
- **Khi** số khóa học > 20 (kích thước trang mặc định)
- **Thì** hệ thống hiển thị điều khiển phân trang với số trang, nút Trước/Sau, "Hiển thị 1-20 trong tổng X khóa học", cho phép Quản trị viên chọn kích thước trang (20/50/100), điều hướng giữa các trang, lưu trang hiện tại và kích thước trang khi tải lại (qua tham số URL ?page=2&size=20)

### AC-8: Sắp xếp danh sách theo cột
- **Tại** tiêu đề các cột bảng (Tiêu đề, Trạng thái, Giảng viên, Tiến độ, Ngày tạo, Ngày cập nhật)
- **Khi** Quản trị viên nhấn vào tiêu đề cột
- **Thì** hệ thống sắp xếp danh sách theo cột đó (tăng dần khi nhấn lần 1, giảm dần khi nhấn lần 2, quay về mặc định khi nhấn lần 3), hiển thị biểu tượng sắp xếp ▲ hoặc ▼ trên tiêu đề cột, lưu trạng thái sắp xếp trong URL (?sortBy=updated_at&sortOrder=DESC)

### AC-9: Hiển thị danh sách rỗng với hướng dẫn
- **Tại** trang "Dashboard Khóa học"
- **Khi** trường chưa tạo khóa học PRIVATE nào hoặc đã lọc nhưng không có kết quả
- **Thì** hệ thống hiển thị minh họa trạng thái rỗng với biểu tượng 📚, thông báo "Chưa có khóa học. Bắt đầu tạo khóa học đầu tiên của bạn!" nếu chưa có khóa học nào, hoặc "Không tìm thấy khóa học phù hợp với bộ lọc" nếu danh sách rỗng do lọc, nút "Tạo khóa học mới" màu xanh lá nổi bật, hướng dẫn nhanh 3 bước tạo khóa học

<!--### AC-10: Tối ưu hóa truy vấn cơ sở dữ liệu
- **Tại** hệ thống backend khi truy vấn bảng khóa học
- **Khi** tải danh sách khóa học với bộ lọc, sắp xếp và thống kê
- **Thì** hệ thống sử dụng chỉ mục để tối ưu hóa hiệu năng truy vấn (idx_course_tenant_ownertype, idx_course_status, idx_course_updated_at), thời gian thực thi < 300ms cho danh sách với hơn 200 khóa học, sử dụng kỹ thuật JOIN FETCH để tránh vấn đề N+1 query khi lấy thông tin giảng viên và submissions, cache thống kê tổng quan trong 5 phút-->

### AC-11: Edge Case - Kiểm tra phân quyền
- **Tại** điểm cuối API GET /api/courses/private
- **Khi** người dùng không phải School Admin của trường cố gắng truy cập
- **Thì** hệ thống kiểm tra tenant_id và vai trò người dùng, trả về 403 Không có quyền truy cập với thông báo "Bạn không có quyền xem danh sách khóa học của trường này", ghi nhận lại nỗ lực truy cập trái phép với thông tin user_id, IP address, thời gian, không trả về dữ liệu khóa học

### AC-12: Edge Case - Xử lý lỗi khi service không phản hồi
- **Tại** trang "Dashboard Khóa học"
- **Khi** dịch vụ backend bị lỗi hoặc không phản hồi sau 10 giây
- **Thì** hệ thống hiển thị thông báo lỗi "Không thể tải danh sách khóa học. Vui lòng thử lại sau", nút "Thử lại" để tải lại danh sách, ghi nhận lỗi với mã ERROR-COURSE-LIST-001, gửi cảnh báo đến team kỹ thuật, hiển thị dữ liệu cache nếu có (với nhãn "Dữ liệu có thể không cập nhật")

---

## Inline business rule
| Trường thông tin          | Mã BR     | Business rule                                                                                                                                                 | Nội dung cảnh báo                                                | Ghi chú                  |
| ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------ |
| Trạng thái workflow       | BR-PS-201 | Các trạng thái hợp lệ: DRAFT, INVITING_INSTRUCTORS, CONTENT_BUILDING, READY_FOR_REVIEW, CONTENT_APPROVED, PIM_READY, PUBLISHED, UNPUBLISHED, ARCHIVED         |                                                                  | Enum constraint          |
| Màu nhãn trạng thái       | BR-PS-202 | DRAFT=xám, INVITING=cam, BUILDING=vàng, REVIEW=xanh dương, APPROVED=tím, PIM_READY=xanh lá nhạt, PUBLISHED=xanh lá đậm, UNPUBLISHED=cam đậm, ARCHIVED=xám đậm |                                                                  | UI formatting            |
| Tiến độ nội dung          | BR-PS-203 | Tính = (số lecture đã approved / tổng số lectures) * 100%                                                                                                     |                                                                  | Trường tính toán         |
| Màu thanh tiến trình      | BR-PS-204 | Đỏ nếu < 30%, vàng nếu 30-70%, xanh lá nếu > 70%                                                                                                              |                                                                  | Conditional formatting   |
| Cảnh báo invitation       | BR-PS-205 | Hiển thị nếu có invitation với status=PENDING và expires_at - now < 24h                                                                                       | Lời mời cộng tác sắp hết hạn. Vui lòng xử lý trong 24 giờ.   | Warning condition        |
| Cảnh báo submission       | BR-PS-206 | Hiển thị nếu có submission với status=REJECTED                                                                                                                | Có submission bị từ chối; yêu cầu chỉnh sửa và nộp lại nội dung. | Warning condition        |
| Cảnh báo không giảng viên | BR-PS-207 | Hiển thị nếu created_at < now - 7 days và không có instructor với status=ACCEPTED                                                                             | Khóa học chưa có giảng viên nhận dạy. Vui lòng vào kiểm tra.       | Warning condition        |
| Cảnh báo stuck workflow   | BR-PS-208 | Hiển thị nếu updated_at < now - 30 days và status không phải PUBLISHED hoặc ARCHIVED                                                                          | Khóa học đã ngưng xử lý quá 30 ngày. Vui lòng kiểm tra và tiếp tục quy trình.    | Warning condition        |
| Sắp xếp mặc định          | BR-PS-209 | Sắp xếp theo updated_at giảm dần (mới nhất trên cùng)                                                                                                         |                                                                  | Default sorting          |
| Kích thước trang mặc định | BR-PS-210 | 20 khóa học mỗi trang                                                                                                                                         |                                                                  | Pagination config        |
| Số avatar hiển thị        | BR-PS-211 | Tối đa 3 avatar, nếu > 3 hiển thị "+N"                                                                                                                        |                                                                  | UI constraint            |
| Cache thống kê            | BR-PS-212 | Cache thống kê tổng quan trong 5 phút (TTL=300s)                                                                                                              |                                                                  | Performance optimization |
| Timeout API               | BR-PS-213 | Timeout sau 10 giây nếu API không phản hồi                                                                                                                    |                                                                  | Error handling           |
| Access control            | BR-PS-214 | Chỉ School Admin có tenant_id trùng với course.tenant_id mới được xem                                                                                         |                                                                  | Authorization rule       |

---

## System rule
- Query phải filter theo owner_type=SCHOOL và tenant_id của School Admin
- Query phải JOIN với course_instructor để đếm số giảng viên
- Query phải JOIN với course_content_submission để tính tiến độ nội dung
- Indexes được sử dụng: idx_course_tenant_ownertype, idx_course_status, idx_course_updated_at
- Pagination sử dụng LIMIT và OFFSET
- Sort state persist trong URL: ?sortBy=updated_at&sortOrder=DESC
- Page và size persist trong URL: ?page=2&size=20
- Thống kê tổng quan sử dụng COUNT query với GROUP BY status
- Cache thống kê tổng quan sử dụng Redis với TTL=300s (5 phút)
- Real-time updates có thể implement bằng WebSocket hoặc polling mỗi 60 giây
- Access control check: user.role=SCHOOL_ADMIN và user.tenant_id=course.tenant_id

---

## Business Value & Success Metrics
Story này sẽ cung cấp **dashboard tổng quan cho School Admin quản lý toàn bộ khóa học PRIVATE, theo dõi tiến độ xây dựng, phát hiện vấn đề kịp thời, và điều phối hiệu quả giữa các giảng viên**

Trọng số của story này là **8**

Story được coi là thành công khi nó đảm bảo được:
- 100% School Admin có thể xem danh sách khóa học của trường mình
- Thời gian tải danh sách < 300ms cho 200 khóa học
- 95% các cảnh báo được hiển thị chính xác và kịp thời
- 90% School Admin cho biết dashboard giúp họ quản lý khóa học hiệu quả hơn (qua khảo sát)
- Thống kê tổng quan chính xác 100% so với dữ liệu thực tế
- 0% trường hợp truy cập trái phép vào danh sách khóa học của trường khác

---

## Dependencies
- **lf-course service**: Truy vấn danh sách khóa học, thông tin chi tiết
- **lf-course service (course_instructor table)**: Đếm số giảng viên và trạng thái
- **lf-course service (course_content_submission table)**: Tính tiến độ nội dung
- **identity service**: Xác thực và phân quyền School Admin
- **US-PS-001**: Khóa học phải được tạo trước khi hiển thị trong danh sách
- **US-PS-003**: Thông tin giảng viên được lấy từ invitation data

---

## Impact Analysis
- **School Admin**: Có cái nhìn tổng quan về tất cả khóa học, dễ dàng quản lý và điều phối, phát hiện vấn đề kịp thời
- **Giảng viên**: Gián tiếp được hưởng lợi khi Admin quản lý tốt hơn, giảm chậm trễ trong workflow
- **Hệ thống Course Management**: Tăng số lượng query đọc đến database, cần tối ưu hóa với indexing và caching
- **User Experience**: Dashboard trực quan giúp Admin làm việc hiệu quả hơn, giảm thời gian tìm kiếm thông tin
- **Performance**: Cần đảm bảo query optimization và caching để hỗ trợ nhiều School Admin truy cập đồng thời

---

## UI/UX Design/ mockup
Link mockup: https://gemini.google.com/share/1ed1f2deb150
<!--https://gemini.google.com/share/7debfd3f8098-->

### Trang Dashboard Khóa học - Thống kê tổng quan
```
┌─────────────────────────────────────────────────────────────────┐
│  Quản lý Khóa học PRIVATE                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📊 Thống kê tổng quan                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │📚 Tổng:  │ │✏️ Đang   │ │👀 Đang   │ │🚀 Đã     │           │
│  │   25     │ │  xây:12  │ │  review:3│ │  publish:│           │
│  │          │ │          │ │          │ │    8     │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Tìm kiếm: [                              ] 🔍          │   │
│  │  [+ Tạo khóa học mới]                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Danh sách khóa học
```
┌─────────────────────────────────────────────────────────────────┐
│  Tiêu đề ▼        │ Trạng thái │ Giảng viên │ Tiến độ │ Cập nhật│
├─────────────────────────────────────────────────────────────────┤
│ 🖼️ Toán nâng cao  │ 📝 DRAFT   │ 👤👤👤 +2  │ ---%    │ 06/12   │
│    Lớp 12 ⚠️      │            │ 5/3/2      │         │         │
│ [Chi tiết] [Sửa] [Mời GV]                                      │
├─────────────────────────────────────────────────────────────────┤
│ 🖼️ Vật lý đại cương│ ✏️ BUILDING│ 👤👤      │ ▓▓▓░ 65%│ 05/12   │
│                   │            │ 3/3/0      │         │         │
│ [Chi tiết] [Sửa] [Preview]                                     │
├─────────────────────────────────────────────────────────────────┤
│ 🖼️ Hóa học hữu cơ │ 👀 REVIEW  │ 👤👤👤     │ ▓▓▓▓ 95%│ 04/12   │
│                   │            │ 4/4/0      │         │         │
│ [Chi tiết] [Review] [Preview]                                  │
├─────────────────────────────────────────────────────────────────┤
│ 🖼️ Tiếng Anh giao │ 🚀 PUBLISHED│ 👤👤      │ ▓▓▓▓ 100%│ 01/12  │
│    tiếp           │            │ 2/2/0      │         │         │
│ [Chi tiết] [Unpublish] [Preview]                               │
└─────────────────────────────────────────────────────────────────┘
Hiển thị 1-4 trong tổng 25 khóa học  [◀ 1 2 3 ... 7 ▶]  [20 ▼]
```

### Chi tiết một khóa học trong danh sách (hover/expand)
```
┌─────────────────────────────────────────────────────────────────┐
│ 🖼️ Toán nâng cao Lớp 12 ⚠️                                      │
│ Mã: MATH-12-ADV-2025                                            │
│ Trạng thái: 📝 DRAFT                                            │
│                                                                 │
│ 👥 Giảng viên (5 người):                                         │
│   ✅ Nguyễn Văn A (Chủ trì) - Đã chấp nhận                      │
│   ✅ Trần Thị B (Đóng góp) - Đã chấp nhận                       │
│   ✅ Lê Văn C (Đóng góp) - Đã chấp nhận                         │
│   ⏳ Phạm Thị D (Phản biện) - Đang chờ (hết hạn sau 2 ngày)     │
│   ⏳ Hoàng Văn E (Đóng góp) - Đang chờ (hết hạn sau 5 ngày)     │
│                                                                 │
│ ⚠️ Cảnh báo: 2 lời mời sắp hết hạn                              │
│                                                                 │
│ 📅 Ngày tạo: 25/11/2025                                         │
│ 📅 Cập nhật: 06/12/2025                                         │
│                                                                 │
│ [Xem chi tiết] [Chỉnh sửa] [Quản lý giảng viên]                │
└─────────────────────────────────────────────────────────────────┘
```

### Trạng thái rỗng (chưa có khóa học)
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                       📚                                        │
│                                                                 │
│         Chưa có khóa học PRIVATE nào.                           │
│    Bắt đầu tạo khóa học đầu tiên của bạn!                      │
│                                                                 │
│              [+ Tạo khóa học mới]                               │
│                                                                 │
│  Hướng dẫn nhanh:                                               │
│  1️⃣ Tạo khóa học với thông tin cơ bản                           │
│  2️⃣ Thiết kế cấu trúc chương trình                              │
│  3️⃣ Mời giảng viên tham gia đóng góp                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Hành vi của quy trình**:
- Danh sách tự động tải khi mở trang, hiển thị loading spinner trong 300ms
- Khi nhấn vào card thống kê, tự động lọc danh sách theo trạng thái tương ứng
- Khi hover vào khóa học, hiển thị thông tin chi tiết trong tooltip hoặc expand row
- Màu sắc và biểu tượng phân biệt rõ ràng giữa các trạng thái workflow
- Cảnh báo ⚠️ màu đỏ/vàng thu hút sự chú ý vào các khóa học cần xử lý
- Nút hành động thay đổi theo trạng thái khóa học (conditional rendering)
- Pagination cho phép điều hướng nhanh giữa các trang
- Real-time update mỗi 60 giây hoặc khi có event từ WebSocket

---

## Out of Scope Item
- **Instructor Role**: CONTRIBUTOR, REVIEWER
- **Tạo khóa học từ template**: Sao chép cấu trúc từ khóa học có sẵn (có thể làm sau)
- **Export danh sách khóa học**: Xuất ra Excel/CSV (có thể làm sau)
- **Bulk operations**: Xóa, archive nhiều khóa học cùng lúc (out of scope cho MVP)
- **Advanced filtering**: Lọc theo nhiều tiêu chí phức tạp (category, tags, instructor name) (có thể làm sau)
- **Custom view/columns**: Cho phép Admin tùy chỉnh cột hiển thị (out of scope)
- **Dashboard analytics**: Biểu đồ thống kê phức tạp (có thể làm sau)
- **Notification center**: Tập trung các thông báo về khóa học (có thể làm sau)
- **Collaboration notes**: Ghi chú, comment trực tiếp trên khóa học (out of scope)
