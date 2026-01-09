# US-COURSE-021: Lưu trữ khóa học

## User Story Content

**Là một** Giáo viên tự do (INDIVIDUAL)

**Tôi muốn** lưu trữ (archive) khóa học không còn sử dụng tại trang quản lý khóa học

**Để** dọn dẹp danh sách khóa học và giải phóng tài nguyên hệ thống

---

## Acceptance Criteria

### AC-1: Truy cập chức năng lưu trữ

**Tại** trang chi tiết, trang chỉnh sửa, hoặc danh sách khóa học

**Khi** Giáo viên click nút "Lưu trữ" hoặc icon thùng rác

**Thì** hệ thống hiển thị dialog xác nhận lưu trữ với thông tin chi tiết về ảnh hưởng

---

### AC-2: Dialog xác nhận lưu trữ khóa học DRAFT

**Tại** dialog xác nhận lưu trữ khóa học trạng thái DRAFT

**Khi** dialog hiển thị

**Thì** hệ thống hiển thị:
- Tiêu đề: "Xóa khóa học"
- Thông tin: Tên khóa học, Ngày tạo
- Cảnh báo: "Khóa học này chưa được xuất bản. Xóa sẽ xóa vĩnh viễn tất cả nội dung và không thể khôi phục."
- Checkbox: "Tôi hiểu rằng thao tác này không thể hoàn tác"
- Nút "Hủy" và "Xóa vĩnh viễn" (disabled cho đến khi tick checkbox)

---

### AC-3: Dialog xác nhận lưu trữ khóa học Đã xuất bản - PUBLISHED/ Đã ẩn - UNPUBLISHED

**Tại** dialog xác nhận lưu trữ khóa học đã từng xuất bản

**Khi** dialog hiển thị

**Thì** hệ thống hiển thị:
- Tiêu đề: "Lưu trữ khóa học"
- Thông tin: Tên khóa học, Số học viên đã đăng ký, Tổng doanh thu (nếu có)
- Cảnh báo nghiêm trọng: "LƯU Ý QUAN TRỌNG: Lưu trữ khóa học sẽ khiến [N] học viên mất quyền truy cập. Thao tác này không thể hoàn tác."
- Trường nhập lý do lưu trữ (bắt buộc)
- Checkbox: "Tôi đã thông báo cho học viên về việc ngừng cung cấp khóa học"
- Checkbox: "Tôi hiểu rằng thao tác này không thể hoàn tác"
- Nút "Hủy" và "Xác nhận lưu trữ" (disabled cho đến khi tick cả 2 checkbox và nhập lý do)

---

### AC-4: Thực hiện lưu trữ thành công

**Tại** dialog xác nhận lưu trữ

**Khi** Giáo viên hoàn tất các bước xác nhận và click nút lưu trữ

**Thì** hệ thống thực hiện:
1. Cập nhật trạng thái course = Đã lưu trữ - ARCHIVED
2. Cập nhật course.archived_at = current_timestamp
3. Cập nhật PIM status = Đã lưu trữ - ARCHIVED trên dịch vụ quản lý sản phẩm (nếu có)
6. Ghi audit log với lý do lưu trữ
7. Hiển thị thông báo "Khóa học đã được lưu trữ"
8. Redirect về trang danh sách khóa học

---

### AC-5: Khóa học biến mất khỏi Online Store

**Tại** Online Store sau khi lưu trữ

**Khi** học viên truy cập

**Thì** khóa học: không xuất hiện trong kết quả tìm kiếm, không xuất hiện trong danh sách, truy cập URL trực tiếp hiển thị "Khóa học đã ngừng cung cấp"

---

### AC-6: Học viên mất quyền truy cập

**Tại** trang học tập của học viên đã đăng ký

**Khi** khóa học bị lưu trữ

**Thì** khóa học: vẫn hiển thị trong "Khóa học của tôi" với badge "Đã ngừng cung cấp", click vào hiển thị thông báo "Khóa học này đã ngừng cung cấp. Bạn không thể tiếp tục học.", không thể truy cập nội dung bài học

---

### AC-7: Gửi email thông báo cho học viên

**Tại** sau khi lưu trữ khóa học có học viên đăng ký

**Khi** workflow hoàn tất

**Thì** hệ thống gửi email đến TẤT CẢ học viên đã đăng ký với nội dung: Thông báo khóa học ngừng cung cấp, Lý do (từ Giáo viên), Thông tin liên hệ hỗ trợ, Chính sách hoàn tiền (nếu áp dụng)

---

### AC-8: Hiển thị khóa học Đã lưu trữ - ARCHIVED trong danh sách

**Tại** trang Danh sách khóa học, bộ lọc "Đã lưu trữ"

**Khi** Giáo viên lọc theo trạng thái Đã lưu trữ - ARCHIVED

**Thì** hệ thống hiển thị các khóa học đã lưu trữ với: thông tin cơ bản (Mã, Tiêu đề, Ngày lưu trữ), badge "Đã lưu trữ" màu đỏ, các actions bị disabled (không thể chỉnh sửa, xuất bản lại)

---

## Alternative Paths

### ALT-1: Hủy lưu trữ trước khi xác nhận

**Tại** dialog xác nhận lưu trữ

**Khi** Giáo viên click "Hủy" hoặc đóng dialog

**Thì** hệ thống đóng dialog, không thực hiện thay đổi, quay về trang trước đó

---

### ALT-2: Lưu trữ khóa học không có học viên

**Tại** dialog xác nhận lưu trữ khóa học PUBLISHED/UNPUBLISHED không có học viên

**Khi** số học viên đăng ký = 0

**Thì** hệ thống hiển thị dialog đơn giản hơn: không yêu cầu checkbox "đã thông báo cho học viên", không gửi email thông báo, chỉ yêu cầu lý do và checkbox "không thể hoàn tác"

---

### ALT-3: Xem lịch sử khóa học đã lưu trữ

**Tại** trang chi tiết khóa học ARCHIVED

**Khi** Giáo viên click vào khóa học đã lưu trữ từ danh sách

**Thì** hệ thống hiển thị thông tin khóa học ở chế độ chỉ đọc: thông tin cơ bản, cấu trúc chương/bài (nếu còn), lý do lưu trữ, ngày lưu trữ, không có nút chỉnh sửa hoặc xuất bản

---

### ALT-4: Liên hệ hỗ trợ để khôi phục

**Tại** trang chi tiết khóa học ARCHIVED

**Khi** Giáo viên muốn khôi phục khóa học

**Thì** hệ thống hiển thị thông báo "Khóa học đã lưu trữ không thể khôi phục tự động. Vui lòng liên hệ hỗ trợ nếu cần thiết" 

---

## Edge Cases & Error Conditions

### ERR-1: Khóa học đang có giao dịch pending

**Tại** dialog xác nhận lưu trữ

**Khi** khóa học có giao dịch thanh toán chưa hoàn tất

**Thì** hệ thống KHÔNG cho phép lưu trữ, hiển thị lỗi "Có [N] giao dịch đang chờ xử lý. Vui lòng đợi hoặc hủy các giao dịch này trước khi lưu trữ"

---

### ERR-2: Khóa học đang trong campaign khuyến mãi

**Tại** dialog xác nhận lưu trữ

**Khi** khóa học đang thuộc campaign ACTIVE

**Thì** hệ thống hiển thị cảnh báo "Khóa học đang trong chiến dịch khuyến mãi [Tên campaign]. Lưu trữ sẽ tự động xóa khóa học khỏi campaign. Bạn có muốn tiếp tục?"

---

### ERR-3: Lỗi khi cập nhật PIM

**Tại** đang thực hiện lưu trữ

**Khi** không thể cập nhật PIM trên dịch vụ quản lý sản phẩm

**Thì** hệ thống ghi log lỗi, vẫn tiếp tục archive course (PIM sẽ được sync sau bởi reconciliation job), hiển thị thông báo thành công với note "Đang đồng bộ với hệ thống sản phẩm"

---

### ERR-4: Concurrent archive requests

**Tại** đang thực hiện lưu trữ

**Khi** có request khác cho cùng khóa học

**Thì** hệ thống sử dụng database lock, request sau nhận lỗi "Khóa học đang được xử lý"

---

### ERR-5: ContentCleanupWorkflow thất bại

**Tại** sau khi lưu trữ, đang dọn dẹp nội dung

**Khi** workflow dọn dẹp S3 thất bại

**Thì** hệ thống: ghi log lỗi, retry theo exponential backoff, không ảnh hưởng đến trạng thái archive của course, admin được thông báo để xử lý manual nếu cần

---

### ERR-6: Email gửi thất bại

**Tại** đang gửi email thông báo cho học viên

**Khi** một số email không gửi được (bounce, invalid)

**Thì** hệ thống: ghi log các email thất bại, không block quá trình archive, cho phép retry manual từ admin panel

---

## Inline Business Rules

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|-----------------|-------|---------------|---------|
| Trạng thái | BR_001 | Có thể archive từ DRAFT, PUBLISHED, UNPUBLISHED | Không archive ARCHIVED |
| Enrollment | BR_002 | Học viên mất quyền truy cập sau archive | Không giữ enrollment |
| Lý do | BR_003 | Bắt buộc nhập lý do khi archive khóa học có học viên | Tối thiểu 20 ký tự |
| Khôi phục | BR_004 | Không hỗ trợ khôi phục tự động | Chỉ manual qua support |
| Cleanup | BR_005 | Nội dung S3 được dọn sau 30 ngày archive | ContentCleanupWorkflow |
| Giao dịch | BR_006 | Không cho phép archive khi có giao dịch pending | Block action |

---

## System Rules

1. Archive là soft delete - dữ liệu vẫn tồn tại trong database với status = ARCHIVED
2. ContentCleanupWorkflow chạy scheduled sau 30 ngày để xóa S3 assets
3. PIM phải được sync với course status để tránh hiển thị sai trên Online Store
4. Email thông báo được gửi qua message queue với priority cao
5. Audit log phải bao gồm: user_id, course_id, reason, enrolled_count, timestamp
6. Thống kê doanh thu và học viên vẫn được giữ để báo cáo

---

## Business Value & Success Metrics

Story này cho phép Giáo viên quản lý lifecycle đầy đủ của khóa học, từ tạo đến kết thúc, giúp dọn dẹp và tối ưu tài nguyên.

**Trọng số của story này là:** Trung bình (Lifecycle Management)

Story được coi là thành công khi đảm bảo được:

- 100% học viên nhận được email thông báo khi khóa học bị archive
- Thời gian archive < 10 giây
- ContentCleanupWorkflow hoàn thành 100% sau 30 ngày
- 0% trường hợp khóa học ARCHIVED còn hiển thị trên Online Store

---

## Dependencies

| Loại | Mô tả | Ghi chú |
|------|-------|---------|
| Service | dịch vụ quản lý khóa học | Cập nhật course status |
| Service | dịch vụ quản lý sản phẩm | Cập nhật PIM status |
| Service | dịch vụ quản lý nội dung | ContentCleanupWorkflow |
| Service | Kafka | Publish CourseArchivedEvent |
| Service | Email service | Gửi thông báo cho học viên |
| US | US-COURSE-017 | Khóa học có thể đã được publish |

---

## Impact Analysis

| Đối tượng ảnh hưởng | Mô tả ảnh hưởng |
|---------------------|-----------------|
| Giáo viên INDIVIDUAL | Có khả năng dọn dẹp khóa học không còn sử dụng |
| Học viên đã đăng ký | Mất quyền truy cập khóa học, cần được thông báo rõ ràng |
| Hệ thống lưu trữ | Giải phóng dung lượng S3 sau khi cleanup |
| Báo cáo doanh thu | Dữ liệu lịch sử vẫn được giữ cho báo cáo |

---

## Email Template

### Email thông báo khóa học ngừng cung cấp

**Subject:** Thông báo quan trọng: Khóa học "[Tiêu đề khóa học]" ngừng cung cấp

**Body:**
```
Xin chào [Tên học viên],

Chúng tôi xin thông báo rằng khóa học "[Tiêu đề khóa học]" mà bạn đã đăng ký sẽ ngừng cung cấp kể từ ngày [Ngày archive].

📌 Thông tin chi tiết:
- Khóa học: [Tiêu đề khóa học]
- Mã khóa học: [course_code]
- Ngày ngừng cung cấp: [Ngày archive]

📝 Lý do từ Giáo viên:
"[Lý do nhập bởi Giáo viên]"

⚠️ Ảnh hưởng đến bạn:
- Bạn sẽ không thể truy cập nội dung khóa học sau ngày trên
- Tiến độ học tập của bạn sẽ được lưu trữ nhưng không thể tiếp tục
- Chứng chỉ đã nhận (nếu có) vẫn có hiệu lực

Nếu bạn có thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ:
- Email: [email]
- Hotline: [Số điện thoại]

Chúng tôi xin lỗi vì sự bất tiện này và cảm ơn bạn đã tin tưởng sử dụng [Tên đối tác].

Trân trọng,
[Tên đối tác]
```
**Trong đó**
- [Tên học viên]: Tên học viên đăng ký khóa học
- [Tiêu đề khóa học]: Tiêu đề khóa học đã mua
- [Ngày archive]: Ngày bắt đầu archive
- [course_code]: Mã khóa học
- [Lý do nhập bởi Giáo viên]: Lý do archive
- [email]: cấu hình email: abc@gmail.com
- [Số điện thoại]: cấu hình: 09142343883
- [Tên đối tác]: Tên đối tác

---

## UI/UX Design

### Mô tả UI chính

**Nút Lưu trữ:**
- Vị trí: Dropdown actions hoặc footer của trang chi tiết
- Style: Danger button hoặc icon thùng rác màu đỏ
- Text: "Lưu trữ" hoặc "Xóa" (cho DRAFT)

**Dialog Xác nhận Lưu trữ (DRAFT):**
- Title: "Xóa khóa học" với icon trash
- Background: Light danger (hồng nhạt)
- Info: Tên khóa học, Ngày tạo
- Warning text với icon ⚠️
- Checkbox với text đỏ
- Footer: Nút "Hủy" | "Xóa vĩnh viễn" (danger)

**Dialog Xác nhận Lưu trữ (PUBLISHED/UNPUBLISHED):**
- Title: "Lưu trữ khóa học" với icon archive
- Background: Light danger
- Info card: Tên, Số học viên, Doanh thu
- Warning box màu đỏ với text in đậm
- Textarea: "Lý do lưu trữ" (required, min 20 chars)
- 2 Checkboxes với text nghiêm túc
- Footer: Nút "Hủy" | "Xác nhận lưu trữ" (danger, disabled until conditions met)

**Badge ARCHIVED trong danh sách:**
- Màu đỏ đậm
- Text: "Đã lưu trữ"
- Tooltip: "Ngày lưu trữ: [date]"

**Trang chi tiết ARCHIVED:**
- Header: Badge "Đã lưu trữ" nổi bật
- Info box: Lý do lưu trữ, Ngày lưu trữ
- Tất cả form fields ở trạng thái disabled
- Không có nút action nào ngoài "Quay lại"

---

## Out of Scope Items

| Item | Lý do |
|------|-------|
| Khôi phục khóa học ARCHIVED tự động | Chỉ hỗ trợ qua support |
| Partial archive (ẩn một số bài) | Phải archive toàn bộ |
| Batch archive nhiều khóa học | Phạm vi phase sau |
| Archive với thông báo đa ngôn ngữ | Chỉ hỗ trợ ngôn ngữ mặc định |
| Export dữ liệu trước khi archive | Phạm vi phase sau |
