# US-COURSE-017: Xuất bản khóa học

## User Story Content

**Là một** Giáo viên tự do (INDIVIDUAL)

**Tôi muốn** xuất bản khóa học đã hoàn thiện lên Online Store tại trang quản lý khóa học

**Để** học viên có thể tìm kiếm, xem và đăng ký khóa học của tôi

---

## Acceptance Criteria

### AC-1: Truy cập chức năng xuất bản

**Tại** trang chi tiết hoặc chỉnh sửa khóa học có trạng thái DRAFT

**Khi** Giáo viên click nút "Xuất bản khóa học"

**Thì** hệ thống thực hiện kiểm tra điều kiện xuất bản và hiển thị kết quả validation

---

### AC-2: Kiểm tra điều kiện xuất bản

**Tại** dialog xác nhận xuất bản

**Khi** khóa học đáp ứng TẤT CẢ các điều kiện bắt buộc: 
- Tiêu đề không rỗng, 
- Ngôn ngữ đã chọn, 
- Độ khó đã chọn, 
- Mô tả không rỗng (>= 100 ký tự), 
- Ảnh đại diện đã upload, 
- Ít nhất 1 mục tiêu học tập, 
- Ít nhất 1 Chương, 
- Ít nhất 1 Bài học, 
- Tất cả video đã xử lý xong (status = READY)

**Thì** hệ thống hiển thị dialog xác nhận "Khóa học đã sẵn sàng để xuất bản" với tóm tắt thông tin: Tiêu đề khóa học, Số Chương, Số Bài học, Giá (hoặc Miễn phí), và hai nút "Hủy" và "Xác nhận xuất bản"

---

### AC-3: Hiển thị lỗi validation khi thiếu điều kiện

**Tại** dialog kiểm tra điều kiện xuất bản

**Khi** khóa học KHÔNG đáp ứng một hoặc nhiều điều kiện bắt buộc

**Thì** hệ thống hiển thị danh sách lỗi chi tiết với format: Icon lỗi + Mô tả lỗi + Link "Khắc phục" dẫn đến vị trí cần sửa. Ví dụ:
- "Thiếu mô tả khóa học (tối thiểu 100 ký tự)" → Link đến Tab 1
- "Chưa upload ảnh đại diện" → Link đến Tab 1, phần upload
- "Chưa có mục tiêu học tập" → Link đến Tab 2
- "Cần ít nhất 1 Chương và 1 Bài học" → Link đến Tab 3
- "Video [Tên video] đang xử lý, vui lòng chờ" → Hiển thị progress

Nút "Xuất bản" bị disabled cho đến khi khắc phục hết lỗi

---

### AC-4: Thực hiện xuất bản 

**Tại** dialog xác nhận xuất bản

**Khi** Giáo viên click "Xác nhận xuất bản"

**Thì** hệ thống thực hiện:
- Gọi luồng tạo PIM (Product) pim_category = INDIVIDUAL để tạo PIM
- LINK tới US Tạo PIM Kinh doanh để thiết lập cấu hình giá và thuế

<!-- ### AC-4: Thực hiện xuất bản thành công

**Tại** dialog xác nhận xuất bản

**Khi** Giáo viên click "Xác nhận xuất bản"

**Thì** hệ thống thực hiện Gọi luồng Tạo PIM:
1. Hiển thị loading overlay "Đang xuất bản khóa học..."
2. Validate lần cuối các điều kiện
3. Cập nhật course.status = PUBLISHED
4. Gọi luồng tạo PIM (Product) trên dịch vụ quản lý sản phẩm với pim_category = INDIVIDUAL để tạo PIM
5. Liên kết course.pim_id với PIM vừa tạo
6. Publish event CoursePublishedEvent lên Kafka
7. Hiển thị thông báo thành công "Khóa học đã được xuất bản thành công!"
8. Hiển thị link trực tiếp đến khóa học trên Online Store -->

---

### AC-5: Xem khóa học trên Online Store sau xuất bản

**Tại** thông báo xuất bản thành công

**Khi** Giáo viên click link "Xem trên Online Store"

**Thì** hệ thống mở tab mới hiển thị trang khóa học trên Online Store với đầy đủ thông tin: Tiêu đề, Mô tả, Thumbnail, Curriculum, Pricing, Nút Đăng ký/Mua

---

### AC-6: Xử lý lỗi trong quá trình xuất bản

**Tại** đang thực hiện xuất bản

**Khi** workflow gặp lỗi (timeout, service down, validation fail)

**Thì** hệ thống thực hiện compensation: rollback các thay đổi đã thực hiện, giữ nguyên course.status = DRAFT, hiển thị thông báo lỗi cụ thể: "Xuất bản thất bại: [Lý do]. Vui lòng thử lại sau", ghi log lỗi để troubleshoot

---

### AC-7: Thông báo qua email sau xuất bản thành công

**Tại** sau khi xuất bản khóa học thành công

**Khi** workflow hoàn tất

**Thì** hệ thống gửi email thông báo đến Giáo viên với nội dung: Tiêu đề khóa học, Link trực tiếp đến khóa học trên Online Store, Hướng dẫn các bước tiếp theo (marketing, chia sẻ)

---

## Alternative Paths

<!-- ### ALT-1: Xuất bản khóa học miễn phí

**Tại** dialog xác nhận xuất bản khóa học có pricing_model = FREE

**Khi** Giáo viên xác nhận xuất bản

**Thì** hệ thống tạo PIM với is_free = true, không yêu cầu thiết lập giá, học viên có thể đăng ký miễn phí ngay sau khi xuất bản 

---

### ALT-2: Xuất bản khóa học có giá

**Tại** dialog xác nhận xuất bản khóa học có pricing_model = ONE_TIME

**Khi** Giáo viên xác nhận xuất bản

**Thì** hệ thống kiểm tra giá đã được thiết lập (base_price > 0), tạo PIM với thông tin giá, học viên cần thanh toán để truy cập khóa học -->

---

### ALT-3: Video đang xử lý khi muốn xuất bản

**Tại** dialog kiểm tra điều kiện xuất bản

**Khi** có video trong khóa học đang ở trạng thái PROCESSING

**Thì** hệ thống hiển thị cảnh báo "Có [N] video đang xử lý. Bạn có thể đợi hoặc xuất bản sau khi video sẵn sàng" với progress bar của từng video và nút "Thông báo khi video sẵn sàng"

---

### ALT-4: Hủy quá trình xuất bản

**Tại** loading overlay đang xuất bản

**Khi** Giáo viên click nút "Hủy" (nếu workflow cho phép)

**Thì** hệ thống gửi signal cancel đến workflow, thực hiện compensation rollback, quay về trạng thái DRAFT, hiển thị thông báo "Đã hủy xuất bản"

---

## Edge Cases & Error Conditions

### ERR-1: Timeout khi tạo PIM

**Tại** đang thực hiện xuất bản

**Khi** request tạo PIM trên dịch vụ quản lý sản phẩm timeout (> 30 giây)

**Thì** hệ thống retry tối đa 3 lần với exponential backoff, nếu vẫn thất bại thì rollback course.status về DRAFT, hiển thị lỗi "Không thể kết nối đến hệ thống sản phẩm. Vui lòng thử lại sau" 

---

<!-- ### ERR-2: PIM đã tồn tại

**Tại** đang thực hiện xuất bản

**Khi** phát hiện course đã có pim_id (từ lần xuất bản trước)

**Thì** hệ thống cập nhật PIM hiện có thay vì tạo mới, đồng bộ thông tin từ course sang PIM 

---

### ERR-3: Kafka không khả dụng

**Tại** đang thực hiện xuất bản

**Khi** không thể publish event CoursePublishedEvent lên Kafka

**Thì** hệ thống ghi event vào dead letter queue, hoàn tất việc xuất bản (course.status = PUBLISHED), retry publish event trong background, không block quá trình xuất bản -->

---

### ERR-4: Concurrent publish requests

**Tại** đang thực hiện xuất bản

**Khi** có request xuất bản khác cho cùng khóa học (double click, nhiều tab)

**Thì** hệ thống sử dụng optimistic locking, request thứ 2 nhận lỗi "Khóa học đang được xử lý. Vui lòng thử lại sau", chỉ 1 request được thực thi

---

### ERR-5: Mất điện/browser crash giữa chừng

**Tại** đang thực hiện xuất bản

**Khi** browser bị đóng hoặc mất kết nối trong quá trình

**Thì** Temporal workflow tiếp tục chạy independent, khi Giáo viên quay lại sẽ thấy trạng thái mới nhất (Đã xuất bản hoặc Đã lưu)
---

### ERR-6: Giáo viên không có quyền xuất bản

**Tại** trang chi tiết khóa học

**Khi** Giáo viên không có quyền xuất bản khóa học (ví dụ: account bị hạn chế)

**Thì** nút "Xuất bản" bị ẩn hoặc disabled với tooltip "Bạn không có quyền xuất bản khóa học. Vui lòng liên hệ hỗ trợ"

---

## Inline Business Rules

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|-----------------|-------|---------------|---------|
| Tiêu đề | BR_001 | Bắt buộc, không rỗng | Đã validate khi tạo |
| Mô tả | BR_002 | Bắt buộc, tối thiểu 100 ký tự | Rich text |
| Ảnh đại diện | BR_003 | Bắt buộc trước xuất bản | JPG/PNG, 1280x720 |
| Mục tiêu học tập | BR_004 | Bắt buộc ít nhất 1 mục | JSON array |
| Chương | BR_005 | Bắt buộc ít nhất 1 Chương | Section count >= 1 |
| Bài học | BR_006 | Bắt buộc ít nhất 1 Bài học | Lecture count >= 1 |
| Video | BR_007 | Tất cả video phải status = READY | Không cho phép PROCESSING |
| Giá | BR_008 | Bắt buộc nếu pricing_model = ONE_TIME | base_price > 0 |
| Trạng thái | BR_009 | Chỉ course DRAFT mới được xuất bản lần đầu | UNPUBLISHED dùng republish |
| PIM | BR_010 | PIM được tạo ngay lập tức khi publish | pim_category = INDIVIDUAL |

---

## System Rules

1. PublishCourseWorkflow là Temporal workflow với compensation cho mỗi bước
2. Workflow timeout tổng thể là 2 phút
3. PIM phải được tạo với status = PUBLISHED để hiển thị trên Online Store
4. Event CoursePublishedEvent phải bao gồm: course_id, pim_id, instructor_id, timestamp
5. Sau khi publish, course.published_at được cập nhật với timestamp hiện tại
6. Audit log phải ghi nhận action PUBLISH với user_id và timestamp

---

## Business Value & Success Metrics

Story này là bước cuối cùng trong quy trình tạo khóa học, đưa sản phẩm lên thị trường và bắt đầu tạo doanh thu.

**Trọng số của story này là:** Cao (Critical - Revenue generating)

Story được coi là thành công khi đảm bảo được:

- Tỷ lệ xuất bản thành công > 99%
- Thời gian xuất bản < 30 giây
- Khóa học hiển thị trên Online Store trong < 1 phút sau xuất bản
- 0% trường hợp data inconsistency giữa Course và PIM

---

## Dependencies

| Loại | Mô tả | Ghi chú |
|------|-------|---------|
| Service | dịch vụ quản lý khóa học | Cập nhật trạng thái course |
| Service | dịch vụ quản lý sản phẩm | Tạo và quản lý PIM |
| Service | Kafka | Publish events |
| Workflow | Temporal | Orchestrate PublishCourseWorkflow |
| US | US-COURSE-001 đến US-COURSE-015 | Course phải hoàn thiện |
| US | US-PRICING-001/002 | Giá phải được thiết lập |

---

## Impact Analysis

| Đối tượng ảnh hưởng | Mô tả ảnh hưởng |
|---------------------|-----------------|
| Giáo viên INDIVIDUAL | Có khóa học live trên Online Store, bắt đầu nhận đăng ký |
| Học viên | Có thể tìm kiếm và đăng ký khóa học mới |
| Online Store | Thêm sản phẩm mới vào catalog |
| Hệ thống báo cáo | Bắt đầu tracking metrics cho khóa học mới |

---

## Email Template

### Email thông báo xuất bản thành công

**Subject:** Chúc mừng! Khóa học "[Tiêu đề khóa học]" đã được xuất bản

**Body:**
```
Xin chào [Tên Giáo viên],

Chúc mừng bạn! Khóa học của bạn đã được xuất bản thành công trên EduEcosystem.

📚 Thông tin khóa học:
- Tiêu đề: [Tiêu đề khóa học]
- Mã khóa học: [course_code]
- Số Chương: [N] chương
- Số Bài học: [M] bài
- Giá: [Giá] hoặc Miễn phí

🔗 Link khóa học:
[URL khóa học trên Online Store]

📈 Các bước tiếp theo:
1. Chia sẻ link khóa học lên mạng xã hội
2. Tạo chiến dịch khuyến mãi để thu hút học viên
3. Theo dõi thống kê đăng ký trong Dashboard

Nếu bạn cần hỗ trợ, vui lòng liên hệ: support@eduecosystem.com

Chúc bạn thành công!
Đội ngũ EduEcosystem

---
Email này được gửi tự động. Vui lòng không trả lời.
```

---

## UI/UX Design

### Mô tả UI chính

**Nút Xuất bản:**
- Vị trí: Header của trang chi tiết/chỉnh sửa khóa học
- Style: Primary button màu xanh lá
- Text: "Xuất bản khóa học"
- Disabled khi course không phải DRAFT

**Dialog Validation Errors:**
- Title: "Khóa học chưa sẵn sàng để xuất bản"
- List lỗi với icon ❌ và link "Khắc phục" cho mỗi mục
- Footer: Nút "Đóng"

**Dialog Xác nhận xuất bản:**
- Title: "Xác nhận xuất bản khóa học"
- Summary: Tiêu đề, Số chương/bài, Giá
- Checkbox (optional): "Tôi đã xem trước và xác nhận nội dung khóa học"
- Footer: Nút "Hủy" | "Xác nhận xuất bản"

**Loading Overlay:**
- Overlay toàn màn hình với backdrop mờ
- Spinner + Text "Đang xuất bản khóa học..."
- Progress bar (nếu có thể estimate)

**Thông báo thành công:**
- Toast hoặc Modal với icon ✅
- Text: "Khóa học đã được xuất bản thành công!"
- Link: "Xem trên Online Store"
- Nút: "Đóng" | "Xem thống kê"

---

## Out of Scope Items

| Item | Lý do |
|------|-------|
| Scheduled publishing (xuất bản theo lịch) | Phạm vi phase sau |
| Approval workflow trước xuất bản | Chỉ áp dụng cho PRIVATE_SCHOOL |
| Xuất bản đa ngôn ngữ cùng lúc | Phạm vi phase sau |
| A/B testing landing page khi xuất bản | Phạm vi phase sau |
