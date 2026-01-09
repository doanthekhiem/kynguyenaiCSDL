# US-PS-006E - Chỉnh sửa thông tin khóa học PRIVATE

## User story Title
US-PS-006E - Chỉnh sửa thông tin khóa học PRIVATE (Edit PRIVATE Course Information)

Là một **School Admin của trường tư**

Tôi muốn thực hiện **chỉnh sửa thông tin cơ bản và cấu hình của khóa học PRIVATE** tại **trang Course Detail của sản phẩm LMS**

Để **cập nhật thông tin khóa học kịp thời, điều chỉnh cấu hình phù hợp với yêu cầu thực tế, và duy trì tính chính xác của dữ liệu khóa học**

---

## Acceptance criteria

### AC-1: Happy Path - Chỉnh sửa thông tin cơ bản khóa học
- **Tại** trang "Chi tiết Khóa học" khi nhấn nút "Chỉnh sửa"
- **Khi** Quản trị viên chỉnh sửa các trường: 
    + Môn học 
    + Chủ đề 
    + Đối tượng phù hợp 
    + Lớp
    + Trình độ 
    + Chứng chỉ
    + Ngôn ngữ giảng dạy
    + Tiêu đề khóa học 
    + Mô tả khóa học 
    + Tóm tắt ngắn 
    + Hình thức học 
    + Số buổi học
    + Thời lượng / buổi: 
    + Bài tập về nhà 
    + Đầu ra học tập: 
    + Ảnh/ video đại diện
- **Thì** hệ thống hiển thị form chỉnh sửa với dữ liệu hiện tại được điền sẵn, validate dữ liệu nhập vào theo business rules, giống validate khi tạo mới, cho phép chọn hình ảnh mới từ máy hoặc thư viện, hiển thị preview hình ảnh trước khi lưu, khi nhấn "Lưu" thực hiện cập nhật database với transaction, ghi log lịch sử thay đổi vào audit_log, hiển thị thông báo "Đã cập nhật thành công", tự động refresh dữ liệu trên trang

<!-- ### AC-2: Happy Path - Chỉnh sửa cấu trúc chương trình
- **Tại** tab "Cấu trúc chương trình" trong trang Chi tiết Khóa học
- **Khi** Quản trị viên thêm/xóa/sắp xếp các sections (chương) và lectures (bài học)
- **Thì** hệ thống cho phép thêm section mới với tên và mô tả, thêm lecture vào section với tiêu đề và thứ tự, kéo thả để sắp xếp lại thứ tự sections và lectures, xóa section/lecture với xác nhận "Bạn có chắc muốn xóa?", tự động cập nhật số thứ tự (order) khi sắp xếp lại, kiểm tra ràng buộc: không cho xóa section có lecture đã có nội dung approved, lưu thay đổi với transaction để đảm bảo tính toàn vẹn

### AC-3: Chỉnh sửa cấu hình giảng viên và phân quyền
- **Tại** tab "Quản lý Giảng viên" trong trang Chi tiết Khóa học
- **Khi** Quản trị viên thay đổi vai trò hoặc quyền hạn của giảng viên
- **Thì** hệ thống hiển thị danh sách giảng viên hiện tại với vai trò (OWNER/CONTRIBUTOR/REVIEWER), cho phép thay đổi vai trò từ dropdown, cho phép bật/tắt các quyền: "Tải video", "Tải audio", "Thêm tài liệu", "Chỉnh sửa mô tả". Cập nhật bảng course_instructor với role và permissions mới, gửi email thông báo cho giảng viên về thay đổi quyền hạn, ghi log audit trail

<!--### AC-4: Chỉnh sửa cấu hình publish và visibility
- **Tại** tab "Cấu hình Xuất bản"
- **Khi** Quản trị viên thay đổi cấu hình publish settings
- **Thì** hệ thống cho phép chỉnh sửa: Visibility (PUBLIC/PRIVATE/UNLISTED), Enrollment mode (OPEN/INVITE_ONLY/APPROVAL_REQUIRED), Ngày bắt đầu và kết thúc enrollment, Pricing (Free/Paid với giá), Certificate settings (Có cấp chứng chỉ hay không), validate: không thể chuyển từ PAID sang FREE nếu đã có learner đăng ký trả phí, lưu cấu hình vào bảng course_settings, áp dụng ngay lập tức hoặc schedule cho thời gian sau

### AC-5: Chỉnh sửa metadata và tags
- **Tại** tab "Metadata"
- **Khi** Quản trị viên cập nhật metadata và tags
- **Thì** hệ thống cho phép nhập/chỉnh sửa: Tags (tối đa 10 tags - Keywords cho SEO), Target audience, Prerequisites, Learning outcomes, Estimated duration (số giờ), validate: tags không chứa ký tự đặc biệt, keywords tối đa 200 ký tự, lưu vào bảng course_metadata, tự động index lại cho search engine -->

### AC-6: Preview thay đổi trước khi lưu
- **Tại** form chỉnh sửa bất kỳ
- **Khi** Quản trị viên nhấn nút "Xem trước"
- **Thì** hệ thống hiển thị modal preview với giao diện như learner sẽ thấy, áp dụng tất cả thay đổi trong preview (không lưu vào database), cho phép đóng preview và tiếp tục chỉnh sửa, nút "Lưu và Xuất bản" từ preview để lưu và publish ngay

<!-- ### AC-7: Lưu nháp tự động (Auto-save)
- **Tại** form chỉnh sửa đang được nhập liệu
- **Khi** Quản trị viên dừng nhập trong 3 giây
- **Thì** hệ thống tự động lưu nháp vào localStorage hoặc session, hiển thị indicator "Đã lưu nháp lúc [thời gian]", khi tải lại trang, hiển thị thông báo "Phát hiện nháp chưa lưu. Khôi phục?", cho phép khôi phục hoặc hủy nháp, xóa nháp sau khi lưu thành công -->

### AC-8: Lịch sử thay đổi và khôi phục phiên bản
- **Tại** tab "Lịch sử" trong trang Chi tiết Khóa học
- **Khi** Quản trị viên xem lịch sử thay đổi
- **Thì** hệ thống hiển thị timeline các thay đổi: Ngày giờ, Người thực hiện, Loại thay đổi (Edit info/Edit settings), Chi tiết thay đổi (before/after), cho phép so sánh giữa 2 phiên bản, nút "Khôi phục phiên bản này" với xác nhận, khi khôi phục tạo snapshot mới với note "Restored from version [date]"

### AC-9: Validation - Kiểm tra quyền chỉnh sửa
- **Tại** điểm cuối API PUT /api/courses/{courseId}
- **Khi** người dùng cố gắng chỉnh sửa khóa học
- **Thì** hệ thống kiểm tra quyền: School Admin của trường (tenant_id match) HOẶC giảng viên có role=OWNER, kiểm tra trạng thái khóa học: không cho chỉnh sửa thông tin cơ bản nếu status=PUBLISHED (chỉ cho phép chỉnh sửa metadata), trả về 403 nếu không có quyền với thông báo "Bạn không có quyền chỉnh sửa khóa học này", ghi log nỗ lực chỉnh sửa trái phép

### AC-10: Validation - Kiểm tra dữ liệu nhập
- **Tại** form chỉnh sửa khi nhấn "Lưu"
- **Khi** dữ liệu không hợp lệ
- **Thì** hệ thống validate: Tiêu đề 10-200 ký tự, Mô tả ngắn tối đa 500 ký tự, Thumbnail không vượt quá 2MB và định dạng JPG/PNG, Tags không chứa ký tự đặc biệt, Category phải thuộc danh sách hợp lệ, hiển thị error message bên cạnh trường lỗi, không cho submit form cho đến khi fix hết lỗi, highlight trường lỗi bằng viền đỏ

### AC-11: Edge Case - Xử lý conflict khi nhiều người chỉnh sửa
- **Tại** form chỉnh sửa
- **Khi** người khác đã lưu thay đổi trong khi Admin đang chỉnh sửa
- **Thì** hệ thống kiểm tra updated_at trước khi lưu, nếu phát hiện conflict (updated_at đã thay đổi), hiển thị modal cảnh báo "Khóa học đã được [Tên người] cập nhật lúc [thời gian]", cho phép: "Xem thay đổi của họ", "Ghi đè thay đổi của họ", "Merge thủ công", ghi log conflict resolution

### AC-12: Performance - Tối ưu hóa cập nhật
- **Tại** hệ thống backend khi xử lý cập nhật
- **Khi** lưu thay đổi khóa học
- **Thì** hệ thống chỉ cập nhật các trường thay đổi (partial update), sử dụng optimistic locking với version field, thời gian xử lý < 500ms, invalidate cache liên quan (course detail cache, search index), trigger reindex cho search engine nếu metadata thay đổi, gửi event "course.updated" cho các service liên quan

---

## Inline business rule

| Trường thông tin              | Mã BR      | Business rule                                                                                      | Ghi chú                              |
|-------------------------------|------------|---------------------------------------------------------------------------------------------------|--------------------------------------|
| Version conflict              | BR-PS-280  | Kiểm tra updated_at trước khi lưu để phát hiện conflict                                           | Optimistic locking                   |
| Audit log                     | BR-PS-281  | Ghi log tất cả thay đổi vào audit_log với before/after values                                     | Compliance requirement               |
| Pricing change restriction    | BR-PS-282  | Không thể chuyển từ PAID sang FREE nếu đã có learner đăng ký trả phí                             | Business rule                        |
| Cache invalidation            | BR-PS-283  | Invalidate cache course detail, search index khi cập nhật                                         | Cache consistency                    |

---

## System rule
- UPDATE query sử dụng WHERE clause với course_id AND tenant_id để đảm bảo isolation
- Optimistic locking sử dụng version field: UPDATE ... WHERE id=? AND version=?
- Transaction được sử dụng cho tất cả operations cập nhật nhiều bảng
- Audit log ghi vào bảng course_audit_log với fields: course_id, changed_by, changed_at, field_name, old_value, new_value
- Auto-save sử dụng localStorage với key pattern "course:{courseId}:draft"
- Version history lưu vào bảng course_versions với snapshot của toàn bộ course data
- Cache invalidation pattern: DELETE "course:{courseId}:*", REINDEX "search:courses"
- File upload sử dụng presigned URL S3 và virus scan trước khi lưu
- Conflict resolution sử dụng three-way merge hoặc manual resolution
- Event "course.updated" được publish lên message queue (Kafka/RabbitMQ)
- Index: idx_course_tenant, idx_audit_log_course, idx_course_versions_course
- Access control: (user.role=SCHOOL_ADMIN AND user.tenant_id=course.tenant_id) OR (user in course_instructors AND role=OWNER)

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng chỉnh sửa và duy trì thông tin khóa học chính xác, linh hoạt điều chỉnh cấu hình theo nhu cầu, và theo dõi lịch sử thay đổi để đảm bảo tính minh bạch và kiểm soát**

Trọng số của story này là **8**

Story được coi là thành công khi nó đảm bảo được:
- 100% School Admin có thể chỉnh sửa thông tin khóa học của trường mình
- Thời gian lưu cập nhật < 500ms
- Auto-save hoạt động chính xác 100% trường hợp
- 0% mất dữ liệu khi có conflict (với conflict resolution mechanism)
- 100% thay đổi được ghi log vào audit trail
- 95% Admin hài lòng với trải nghiệm chỉnh sửa (theo khảo sát)

---

## Dependencies
- **lf-course service**: Cập nhật thông tin khóa học, cấu trúc, settings
- **lf-course service (course_audit_log table)**: Ghi log lịch sử thay đổi
- **lf-course service (course_versions table)**: Lưu version history
- **identity service**: Xác thực và kiểm tra quyền chỉnh sửa
- **file-storage service**: Upload và lưu trữ hình ảnh thumbnail
- **US-PS-006A**: Khóa học phải tồn tại trước khi chỉnh sửa

---

## Impact Analysis
- **School Admin**: Linh hoạt điều chỉnh thông tin khóa học, duy trì tính chính xác
- **Giảng viên**: Có thể tự chỉnh sửa nếu có quyền OWNER, giảm phụ thuộc vào Admin
- **Hệ thống**: Tăng số lượng UPDATE queries, cần optimistic locking và transaction management
- **User Experience**: Auto-save và preview giúp tránh mất dữ liệu, trải nghiệm mượt mà
- **Compliance**: Audit log đảm bảo truy vết thay đổi, đáp ứng yêu cầu kiểm soát

---

## UI/UX Design

### Form chỉnh sửa thông tin cơ bản
```
┌─────────────────────────────────────────────────────────────────┐
│  ✏️ Chỉnh sửa Khóa học: Toán nâng cao Lớp 12                    │
│                                        [Xem trước] [Lưu] [Hủy]  │
├─────────────────────────────────────────────────────────────────┤
│  📝 Thông tin cơ bản                                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Tiêu đề khóa học *                                       │   │
│  │ [Toán nâng cao Lớp 12                                ]   │   │
│  │ 22/200 ký tự                                              │   │
│  │                                                           │   │
│  │ Mã khóa học (Không thể sửa)                               │   │
│  │ MATH-12-ADV-2025                                          │   │
│  │                                                           │   │
│  │ Mô tả ngắn                                                │   │
│  │ [Khóa học toán nâng cao dành cho học sinh lớp 12...]    │   │
│  │ 58/500 ký tự                                              │   │
│  │                                                           │   │
│  │ Mô tả chi tiết                                            │   │
│  │ [Rich Text Editor với formatting tools]                  │   │
│  │                                                           │   │
│  │ Hình thumbnail                                            │   │
│  │ ┌────────┐                                                │   │
│  │ │ 🖼️     │ [Chọn file] [Chọn từ thư viện]               │   │
│  │ │Preview │ Kích thước: 1200x630px, tối đa 2MB            │   │
│  │ └────────┘                                                │   │
│  │                                                           │   │
│  │ Category *        │ Độ khó *        │ Ngôn ngữ *         │   │
│  │ [Toán học    ▼]   │ [Advanced  ▼]   │ [Tiếng Việt ▼]    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  🏷️ Tags & Metadata                                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Tags (Tối đa 10)                                          │   │
│  │ [toán] [lớp 12] [nâng cao] [+Thêm tag]                   │   │
│  │                                                           │   │
│  │ Keywords (SEO)                                            │   │
│  │ [toán nâng cao, toán lớp 12, đại số, giải tích...]      │   │
│  │ 52/200 ký tự                                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  💾 Đã lưu nháp lúc 14:35:20                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Chỉnh sửa cấu trúc chương trình
```
┌─────────────────────────────────────────────────────────────────┐
│  📚 Cấu trúc Chương trình                     [+ Thêm chương]   │
├─────────────────────────────────────────────────────────────────┤
│  ≡ Chương 1: Giới thiệu                            [⋮ Menu]     │
│  │                                                               │
│  │  ▶ Bài 1.1: Giới thiệu khóa học              [⋮] [✏️] [🗑️]  │
│  │  ▶ Bài 1.2: Kiến thức cần thiết              [⋮] [✏️] [🗑️]  │
│  │  [+ Thêm bài học]                                            │
│  └───────────────────────────────────────────────────────────   │
│                                                                 │
│  ≡ Chương 2: Đại số                                [⋮ Menu]     │
│  │                                                               │
│  │  ▶ Bài 2.1: Phương trình bậc 2                [⋮] [✏️] [🗑️] │
│  │     ✅ Đã có nội dung (Không thể xóa)                        │
│  │  ▶ Bài 2.2: Hệ phương trình                   [⋮] [✏️] [🗑️] │
│  │  [+ Thêm bài học]                                            │
│  └───────────────────────────────────────────────────────────   │
│                                                                 │
│  [+ Thêm chương]                                                │
│                                                                 │
│  💡 Kéo thả icon ≡ để sắp xếp lại thứ tự                        │
└─────────────────────────────────────────────────────────────────┘
```

### Lịch sử thay đổi
```
┌─────────────────────────────────────────────────────────────────┐
│  🕐 Lịch sử Thay đổi                                            │
├─────────────────────────────────────────────────────────────────┤
│  📅 26/12/2025, 14:30                                           │
│  👤 Admin Nguyễn                                                │
│  📝 Chỉnh sửa thông tin cơ bản                                  │
│  ├─ Tiêu đề: "Toán Lớp 12" → "Toán nâng cao Lớp 12"            │
│  ├─ Mô tả: [Xem chi tiết]                                       │
│  └─ Tags: Thêm "nâng cao"                                       │
│  [Xem chi tiết] [Khôi phục phiên bản này]                       │
│                                                                 │
│  📅 25/12/2025, 10:15                                           │
│  👤 Nguyễn Văn A (Giảng viên)                                   │
│  📚 Chỉnh sửa cấu trúc                                          │
│  └─ Thêm "Bài 2.3: Bất phương trình"                            │
│  [Xem chi tiết] [Khôi phục phiên bản này]                       │
│                                                                 │
│  📅 24/12/2025, 16:45                                           │
│  👤 Admin Nguyễn                                                │
│  ⚙️ Thay đổi cấu hình                                            │
│  └─ Visibility: PRIVATE → PUBLIC                                │
│  [Xem chi tiết] [Khôi phục phiên bản này]                       │
│                                                                 │
│  [Tải thêm lịch sử cũ...]                                       │
└─────────────────────────────────────────────────────────────────┘
```

### Modal xử lý conflict
```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠️ Phát hiện Conflict                                          │
├─────────────────────────────────────────────────────────────────┤
│  Khóa học đã được Trần Thị B cập nhật lúc 14:32:15             │
│                                                                 │
│  Thay đổi của bạn:                                              │
│  • Tiêu đề: "Toán nâng cao Lớp 12"                              │
│  • Tags: Thêm "đại số"                                          │
│                                                                 │
│  Thay đổi của Trần Thị B:                                       │
│  • Tiêu đề: "Toán nâng cao THPT"                                │
│  • Mô tả: [Đã cập nhật]                                         │
│                                                                 │
│  Bạn muốn:                                                      │
│  [Xem thay đổi của họ]  [Ghi đè thay đổi của họ]  [Hủy]       │
└─────────────────────────────────────────────────────────────────┘
```

**Hành vi của quy trình**:
- Form hiển thị dữ liệu hiện tại được điền sẵn
- Auto-save mỗi 3 giây, hiển thị timestamp "Đã lưu nháp"
- Validation real-time khi nhập liệu, hiển thị error ngay lập tức
- Kéo thả để sắp xếp sections và lectures
- Preview thay đổi trước khi lưu chính thức
- Conflict detection khi lưu, với options resolution rõ ràng
- Lịch sử thay đổi chi tiết với khả năng khôi phục phiên bản cũ

---

## Out of Scope Item
- **Bulk edit**: Chỉnh sửa nhiều khóa học cùng lúc (out of scope)
- **Template system**: Tạo template từ khóa học có sẵn (có thể làm sau)
- **Collaborative editing**: Nhiều người chỉnh sửa real-time như Google Docs (out of scope)
- **AI-powered suggestions**: Gợi ý cải thiện tiêu đề, mô tả bằng AI (out of scope)
- **Advanced versioning**: Branch/merge như Git (out of scope)
- **Custom fields**: Cho phép Admin tự định nghĩa trường mới (out of scope)
