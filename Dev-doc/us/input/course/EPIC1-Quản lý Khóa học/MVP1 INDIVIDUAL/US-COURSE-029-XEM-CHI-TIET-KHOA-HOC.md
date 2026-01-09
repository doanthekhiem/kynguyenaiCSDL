# US-COURSE-029: Xem chi tiết khóa học

## User Story Content

**Là một** Giáo viên tự do (INDIVIDUAL)

**Tôi muốn** xem chi tiết đầy đủ thông tin khóa học của mình tại trang quản lý khóa học

**Để** nắm bắt toàn diện trạng thái, nội dung, thống kê và có thể đưa ra quyết định quản lý phù hợp

---

## Acceptance Criteria

### AC-1: Truy cập trang chi tiết khóa học

**Tại** trang Danh sách khóa học

**Khi** Giáo viên click icon "Xem chi tiết" (mắt) hoặc click vào tiêu đề khóa học

**Thì** hệ thống hiển thị trang Chi tiết khóa học với đầy đủ thông tin được tổ chức theo các section

---

### AC-2: Hiển thị thông tin Header

**Tại** trang Chi tiết khóa học, phần Header

**Khi** trang được load

**Thì** hệ thống hiển thị:
- Ảnh đại diện khóa học (thumbnail)
- Tiêu đề và Tiêu đề phụ
- Mã khóa học (course_code)
- Badge trạng thái với màu tương ứng (DRAFT, PUBLISHED, UNPUBLISHED, ARCHIVED)
- Ngày tạo và Ngày cập nhật gần nhất
- Các Action buttons phù hợp với trạng thái

---

### AC-3: Hiển thị thông tin cơ bản

**Tại** trang Chi tiết khóa học, section Thông tin cơ bản

**Khi** section được hiển thị

**Thì** hệ thống hiển thị:
- Ngôn ngữ
- Độ khó (BEGINNER/INTERMEDIATE/ADVANCED)
- Thời lượng ước tính
- Mô hình định giá (FREE/ONE_TIME)
- Giá (nếu có)
- Danh mục và Tags
- Mô tả khóa học (có thể expand/collapse nếu dài)

---

### AC-4: Hiển thị thông tin học thuật

**Tại** trang Chi tiết khóa học, section Thông tin học thuật

**Khi** section được hiển thị

**Thì** hệ thống hiển thị:
- Mục tiêu học tập (Learning Outcomes) - danh sách bullets
- Yêu cầu đầu vào (Requirements) - danh sách bullets
- Đối tượng phù hợp (Target Audience) - danh sách bullets
- Cấp học, Hệ đào tạo, Môn học (nếu có)
- Kỹ năng đạt được

---

### AC-5: Hiển thị cấu trúc khóa học

**Tại** trang Chi tiết khóa học, section Nội dung khóa học

**Khi** section được hiển thị

**Thì** hệ thống hiển thị cấu trúc Curriculum dạng accordion:
- Tổng số Chương và Tổng số Bài học
- Tổng thời lượng
- Danh sách Chương có thể expand/collapse
- Mỗi Chương hiển thị: Tên chương, Số bài học, Thời lượng
- Mỗi Bài học hiển thị: Icon type, Tên bài, Thời lượng, Badge Preview/Mandatory nếu có

---

### AC-6: Hiển thị thống kê khóa học (cho PUBLISHED/UNPUBLISHED)

**Tại** trang Chi tiết khóa học PUBLISHED hoặc UNPUBLISHED, section Thống kê

**Khi** section được hiển thị

**Thì** hệ thống hiển thị:
- Tổng số học viên đăng ký
- Số học viên đang học (in progress)
- Số học viên hoàn thành
- Tỷ lệ hoàn thành trung bình
- Đánh giá trung bình (rating) và số lượt đánh giá
- Tổng doanh thu (nếu có)
- Biểu đồ đăng ký theo thời gian (mini chart)

---

### AC-7: Hiển thị danh sách đánh giá gần đây

**Tại** trang Chi tiết khóa học PUBLISHED, section Đánh giá

**Khi** khóa học có đánh giá từ học viên

**Thì** hệ thống hiển thị:
- Đánh giá trung bình với star rating
- Phân bố đánh giá (5 sao: X%, 4 sao: Y%, ...)
- 5 đánh giá gần nhất với: Tên học viên, Rating, Comment, Ngày
- Link "Xem tất cả đánh giá" nếu có nhiều hơn 5

---

### AC-8: Hiển thị Action buttons theo trạng thái

**Tại** trang Chi tiết khóa học, phần Header hoặc Floating action bar

**Khi** trang được load

**Thì** hệ thống hiển thị buttons phù hợp với từng trạng thái:

**DRAFT:**
- "Chỉnh sửa" (primary)
- "Xem trước"
- "Xuất bản" (nếu đủ điều kiện)
- "Xóa"

**PUBLISHED:**
- "Chỉnh sửa"
- "Xem trên Online Store"
- "Tạm ẩn"
- "Lưu trữ"

**UNPUBLISHED:**
- "Chỉnh sửa"
- "Xuất bản lại"
- "Chuyển về Draft"
- "Lưu trữ"

**ARCHIVED:**
- "Liên hệ hỗ trợ để khôi phục" (disabled, tooltip)
- Không có action khác

---

### AC-9: Hiển thị tiến độ chuẩn bị xuất bản (DRAFT)

**Tại** trang Chi tiết khóa học DRAFT, section Tiến độ

**Khi** khóa học đang ở trạng thái DRAFT

**Thì** hệ thống hiển thị checklist chuẩn bị xuất bản:
- ✅/❌ Tiêu đề đã nhập
- ✅/❌ Mô tả đã nhập (>= 100 ký tự)
- ✅/❌ Ảnh đại diện đã upload
- ✅/❌ Có ít nhất 1 Mục tiêu học tập
- ✅/❌ Có ít nhất 1 Chương
- ✅/❌ Có ít nhất 1 Bài học
- ✅/❌ Đã thiết lập định giá
- ✅/❌ Tất cả video đã sẵn sàng
- Progress bar tổng thể: "X/8 điều kiện hoàn thành"

---

### AC-10: Hiển thị lịch sử hoạt động

**Tại** trang Chi tiết khóa học, section Lịch sử

**Khi** Giáo viên expand section Lịch sử

**Thì** hệ thống hiển thị timeline các sự kiện:
- Ngày tạo khóa học
- Các lần cập nhật quan trọng
- Ngày xuất bản (nếu có)
- Ngày tạm ẩn (nếu có)
- Ngày lưu trữ (nếu có)
- Mỗi entry: Thời gian + Mô tả hành động

---

## Alternative Paths

### ALT-1: Khóa học chưa có nội dung

**Tại** trang Chi tiết khóa học DRAFT mới tạo

**Khi** khóa học chưa có Chương/Bài học

**Thì** section Nội dung hiển thị empty state: "Chưa có nội dung khóa học" với nút "Thêm nội dung đầu tiên" dẫn đến Tab 3 của form edit

---

### ALT-2: Khóa học chưa có thống kê

**Tại** trang Chi tiết khóa học PUBLISHED chưa có học viên

**Khi** chưa có enrollment nào

**Thì** section Thống kê hiển thị: "Chưa có học viên đăng ký" với gợi ý: "Chia sẻ khóa học của bạn để thu hút học viên đầu tiên" và nút "Chia sẻ"

---

### ALT-3: Refresh thống kê

**Tại** trang Chi tiết khóa học, section Thống kê

**Khi** Giáo viên click icon "Refresh" hoặc nút "Cập nhật số liệu"

**Thì** hệ thống reload thống kê mới nhất từ server, hiển thị loading indicator, cập nhật UI với data mới

---

<!-- ### ALT-4: Export thông tin khóa học

**Tại** trang Chi tiết khóa học

**Khi** Giáo viên click nút "Xuất PDF" hoặc "Xuất báo cáo"

**Thì** hệ thống generate PDF với thông tin: Thông tin khóa học, Cấu trúc curriculum, Thống kê (nếu có), download file PDF -->

---

## Edge Cases & Error Conditions

### ERR-1: Khóa học không tồn tại

**Tại** URL trực tiếp đến chi tiết khóa học

**Khi** course_id không tồn tại hoặc đã bị xóa vĩnh viễn

**Thì** hệ thống hiển thị trang 404 "Khóa học không tồn tại" với nút "Về danh sách khóa học"

---

### ERR-2: Không có quyền xem

**Tại** URL trực tiếp đến chi tiết khóa học

**Khi** khóa học không thuộc sở hữu của Giáo viên đang đăng nhập

**Thì** hệ thống hiển thị trang 403 "Bạn không có quyền xem khóa học này"

---

### ERR-3: Lỗi load thống kê

**Tại** trang Chi tiết khóa học, section Thống kê

**Khi** API thống kê timeout hoặc lỗi

**Thì** hệ thống hiển thị thông báo "Không thể tải thống kê" với nút "Thử lại", các section khác vẫn hiển thị bình thường

---

### ERR-4: Session hết hạn

**Tại** trang Chi tiết khóa học

**Khi** session hết hạn trong khi đang xem

**Thì** hệ thống redirect đến trang đăng nhập, sau khi đăng nhập lại quay về trang chi tiết đang xem

---

## Inline Business Rules

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|-----------------|-------|---------------|---------|
| Quyền truy cập | BR_001 | Chỉ owner mới xem được chi tiết khóa học | owner_id check |
| Thống kê | BR_002 | Chỉ hiển thị cho PUBLISHED/UNPUBLISHED | Không hiển thị cho DRAFT/ARCHIVED |
| Đánh giá | BR_003 | Chỉ hiển thị cho PUBLISHED | Phải có enrollment để đánh giá |
| Doanh thu | BR_004 | Chỉ hiển thị cho khóa học có giá | Không hiển thị cho FREE |
| Action buttons | BR_005 | Thay đổi theo trạng thái khóa học | State-based UI |
| Checklist xuất bản | BR_006 | Chỉ hiển thị cho DRAFT | Guidance for publishing |

---

## System Rules

1. Trang chi tiết phải load trong < 2 giây
2. Thống kê có thể cache với TTL 5 phút
3. Đánh giá hiển thị tối đa 5 items, pagination cho full list
4. Timeline lịch sử giới hạn 20 entries gần nhất
5. Thumbnail fallback nếu ảnh không load được
6. Responsive design cho mobile viewing

---

## Business Value & Success Metrics

Story này cung cấp dashboard toàn diện cho Giáo viên để theo dõi và quản lý khóa học một cách hiệu quả.

**Trọng số của story này là:** Trung bình (Information & Navigation)

Story được coi là thành công khi đảm bảo được:

- Thời gian load trang < 2 giây
- 100% thông tin khóa học được hiển thị chính xác
- Giáo viên có thể navigate đến action cần thiết trong < 3 clicks
- Thống kê realtime với độ trễ < 5 phút

---

## Dependencies

| Loại | Mô tả | Ghi chú |
|------|-------|---------|
| Service | dịch vụ quản lý khóa học | Lấy thông tin khóa học |
| Service | dịch vụ quản lý chương trình | Lấy cấu trúc Chương/Bài |
| Service | lf-enrollment | Lấy thống kê học viên |
| Service | sf-billing | Lấy thống kê doanh thu |
| US | US-COURSE-025 | Entry point từ danh sách |
| US | US-COURSE-022 | Navigate đến chỉnh sửa |

---

## Impact Analysis

| Đối tượng ảnh hưởng | Mô tả ảnh hưởng |
|---------------------|-----------------|
| Giáo viên INDIVIDUAL | Có dashboard tổng quan để quản lý khóa học |
| Quyết định quản lý | Dựa trên thống kê để đưa ra quyết định (unpublish, archive, update) |
| Navigation | Hub điều hướng đến các tính năng khác |

---

## UI/UX Design

### Mô tả UI chính

**Layout tổng thể:**
- Breadcrumb: Trang chủ > Khóa học > [Tên khóa học]
- Header với thumbnail, tiêu đề, badges, action buttons
- Body chia thành các sections có thể expand/collapse
- Sticky action bar ở bottom trên mobile

**Section Thông tin cơ bản:**
- Grid layout 2 columns
- Key-value pairs với labels
- Mô tả có "Xem thêm" nếu dài

**Section Nội dung khóa học:**
- Accordion style
- Tổng quan: X Chương, Y Bài học, Z giờ
- Chương expand hiển thị danh sách bài học

**Section Thống kê:**
- Card grid với số liệu lớn
- Mini chart cho trend
- Refresh button

**Section Đánh giá:**
- Star rating component
- Distribution bar chart
- List reviews với avatar

**Section Lịch sử:**
- Timeline vertical
- Collapsible

**Action buttons:**
- Floating action bar ở góc phải
- Primary action nổi bật
- Dropdown cho secondary actions

---

## Out of Scope Items

| Item | Lý do |
|------|-------|
| Edit inline trên trang chi tiết | Sử dụng trang Edit riêng |
| Thống kê chi tiết (advanced analytics) | Xử lý trong Epic riêng |
| So sánh với khóa học khác | Phạm vi phase sau |
| Notification settings cho khóa học | Phạm vi phase sau |
