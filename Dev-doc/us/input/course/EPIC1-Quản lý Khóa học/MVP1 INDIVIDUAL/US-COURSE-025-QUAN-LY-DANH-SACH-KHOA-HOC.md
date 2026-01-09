# US-COURSE-025: Quản lý danh sách khóa học

## User Story Content

**Là một** Giáo viên tự do (INDIVIDUAL)

**Tôi muốn** xem, lọc và tìm kiếm danh sách các khóa học của mình tại trang Quản lý khóa học

**Để** dễ dàng theo dõi, quản lý và thao tác với các khóa học đã tạo

---

## Acceptance Criteria

### AC-1: Truy cập trang Danh sách khóa học

**Tại** menu chính của hệ thống LMS

**Khi** Giáo viên click vào mục "Khóa học" hoặc "Quản lý khóa học"

**Thì** hệ thống hiển thị trang Danh sách khóa học với: header "Danh sách Khóa học", nút "Tạo Khóa học mới", thanh tìm kiếm, bộ lọc trạng thái, bảng danh sách khóa học với các cột: Mã, Tiêu đề, Trạng thái, Ngày tạo, Hành động

---

### AC-2: Xem danh sách khóa học

**Tại** trang Danh sách khóa học

**Khi** trang được load

**Thì** hệ thống hiển thị bảng danh sách với các thông tin: 
- Mã khóa học (course_code), 
- Tiêu đề khóa học (title), 
- Trạng thái (status) với màu badge tương ứng (DRAFT, PUBLISHED, UNPUBLISHED, ARCHIVED), 
- Ngày tạo (created_at) format dd/mm/yyyy, 
- Cột Hành động với các icon: Xem chi tiết, Chỉnh sửa, Lưu trữ, Xuất bản 
- Danh sách được sắp xếp theo ngày tạo mới nhất lên đầu

---

### AC-3: Lọc khóa học theo trạng thái

**Tại** trang Danh sách khóa học, phần bộ lọc

**Khi** Giáo viên chọn một trạng thái từ dropdown lọc: Tất cả (ALL), Bản nháp (DRAFT), Đã xuất bản (PUBLISHED), Tạm ẩn (UNPUBLISHED), Đã lưu trữ (ARCHIVED)

**Thì** hệ thống cập nhật danh sách chỉ hiển thị các khóa học có trạng thái tương ứng, hiển thị số lượng kết quả "Hiển thị X khóa học", giữ nguyên điều kiện tìm kiếm nếu có

---

### AC-4: Tìm kiếm khóa học

**Tại** trang Danh sách khóa học, thanh tìm kiếm

**Khi** Giáo viên nhập từ khóa vào ô tìm kiếm và nhấn Enter hoặc click icon tìm kiếm

**Thì** hệ thống tìm kiếm full-text trong các trường: 
- Mã khóa học (course_code), 
- Tiêu đề (title) 
- Kết quả được highlight từ khóa tìm kiếm
- Hiển thị thông báo "Tìm thấy X kết quả cho '[từ khóa]'", giữ nguyên bộ lọc trạng thái nếu có

---

### AC-5: Tìm kiếm real-time (Search as you type)

**Tại** trang Danh sách khóa học, thanh tìm kiếm

**Khi** Giáo viên nhập từ khóa (sau khi nhập >= 2 ký tự)

**Thì** hệ thống tự động tìm kiếm sau 300ms debounce, hiển thị loading indicator nhỏ trong ô search, cập nhật kết quả mà không cần nhấn Enter

---

### AC-6: Phân trang danh sách

**Tại** trang Danh sách khóa học

**Khi** số lượng khóa học vượt quá số lượng hiển thị trên 1 trang (mặc định 20)

**Thì** hệ thống hiển thị thanh phân trang ở cuối bảng với: thông tin "Hiển thị X-Y của Z khóa học", dropdown chọn số lượng/trang: 20, 50, 100, các nút điều hướng: Đầu, Trước, số trang, Sau, Cuối

---

### AC-7: Sắp xếp danh sách

**Tại** trang Danh sách khóa học

**Khi** Giáo viên click vào header cột (Mã, Tiêu đề, Trạng thái, Ngày tạo)

**Thì** hệ thống sắp xếp danh sách theo cột đó

---

### AC-8: Thao tác nhanh từ danh sách - Xem chi tiết

**Tại** trang Danh sách khóa học, cột Hành động của một khóa học

**Khi** Giáo viên click icon "Xem chi tiết" (mắt)

**Thì** hệ thống chuyển đến trang Chi tiết khóa học (US-COURSE-029) ở chế độ xem

---

### AC-9: Thao tác nhanh từ danh sách - Chỉnh sửa

**Tại** trang Danh sách khóa học, cột Hành động của một khóa học

**Khi** Giáo viên click icon "Chỉnh sửa" (bút chì)

**Thì** hệ thống chuyển đến trang Chỉnh sửa khóa học (US-COURSE-022/023) với form edit được active

---

### AC-10: Thao tác nhanh từ danh sách - Xóa/Archive

**Tại** trang Danh sách khóa học, cột Hành động của một khóa học

**Khi** Giáo viên click icon "Xóa/ Archive" (thùng rác)

**Thì** hệ thống thực hiện theo trạng thái khóa học:
- DRAFT: Hiển thị popup "Bạn có chắc chắn muốn xóa khóa học này? Thao tác không thể hoàn tác" với lựa chọn Hủy/Xóa. Nếu xóa, xóa vĩnh viễn khóa học
- PUBLISHED/UNPUBLISHED: Hiển thị popup "Bạn có chắc chắn muốn lưu trữ khóa học này? Khóa học sẽ không còn hiển thị trên Online Store" với lựa chọn Hủy/Lưu trữ. Nếu lưu trữ, chuyển sang ARCHIVED

---

## Alternative Paths

### ALT-1: Danh sách rỗng khi chưa có khóa học

**Tại** trang Danh sách khóa học

**Khi** Giáo viên chưa tạo khóa học nào

**Thì** hệ thống hiển thị trạng thái empty state với: hình minh họa, thông báo "Bạn chưa có khóa học nào", nút CTA "Tạo khóa học đầu tiên" dẫn đến form tạo khóa học

---

### ALT-2: Không tìm thấy kết quả

**Tại** trang Danh sách khóa học

**Khi** tìm kiếm hoặc lọc không có kết quả phù hợp

**Thì** hệ thống hiển thị trạng thái empty với thông báo "Không tìm thấy khóa học phù hợp với '[từ khóa]'" hoặc "Không có khóa học nào ở trạng thái [trạng thái]", nút "Xóa bộ lọc" để reset về mặc định

---

### ALT-3: Xem nhanh thông tin khóa học (Hover)

**Tại** trang Danh sách khóa học

**Khi** Giáo viên hover chuột lên một dòng khóa học

**Thì** hệ thống hiển thị tooltip với thông tin bổ sung: Tiêu đề phụ (nếu có), Số chương, Số bài học, Ngày cập nhật gần nhất

---

### ALT-4: Kết hợp tìm kiếm và lọc

**Tại** trang Danh sách khóa học

**Khi** Giáo viên vừa nhập từ khóa tìm kiếm vừa chọn bộ lọc trạng thái

**Thì** hệ thống áp dụng cả hai điều kiện (AND logic), hiển thị kết quả thỏa mãn cả hai và thông báo "X kết quả cho '[từ khóa]' trong trạng thái [trạng thái]"

---

## Edge Cases & Error Conditions

### ERR-1: Lỗi khi load danh sách

**Tại** trang Danh sách khóa học

**Khi** server không phản hồi hoặc lỗi kết nối

**Thì** hệ thống hiển thị thông báo lỗi "Không thể tải danh sách khóa học. Vui lòng thử lại" với nút "Tải lại"

---

### ERR-2: Session hết hạn

**Tại** trang Danh sách khóa học

**Khi** session người dùng hết hạn trong khi đang xem

**Thì** hệ thống chuyển hướng đến trang đăng nhập, sau khi đăng nhập lại sẽ quay về trang Danh sách khóa học

---

### ERR-3: Xóa khóa học thất bại

**Tại** trang Danh sách khóa học, đang xóa khóa học

**Khi** server gặp lỗi trong quá trình xóa

**Thì** hệ thống đóng popup xác nhận, hiển thị thông báo lỗi "Không thể xóa khóa học. Vui lòng thử lại sau", giữ nguyên khóa học trong danh sách

---

### ERR-4: Tìm kiếm với ký tự đặc biệt

**Tại** trang Danh sách khóa học, thanh tìm kiếm

**Khi** Giáo viên nhập ký tự đặc biệt hoặc mã độc (SQL injection, XSS)

**Thì** hệ thống sanitize input, thực hiện tìm kiếm bình thường với chuỗi đã được làm sạch

---

### ERR-5: Quá nhiều kết quả

**Tại** trang Danh sách khóa học

**Khi** kết quả tìm kiếm/lọc vượt quá 1000 bản ghi

**Thì** hệ thống chỉ hiển thị 1000 kết quả đầu tiên với thông báo "Hiển thị 1000 kết quả đầu tiên. Vui lòng thu hẹp tìm kiếm để xem thêm"

---

## Inline Business Rules

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|-----------------|-------|---------------|---------|
| Danh sách | BR_001 | Chỉ hiển thị khóa học của Giáo viên đang đăng nhập | owner_id = current_user_id |
| Phân trang | BR_002 | Mặc định 10 items/trang, tối đa 50 items/trang | Configurable |
| Tìm kiếm | BR_003 | Debounce 300ms cho search-as-you-type | Tối ưu performance |
| Tìm kiếm | BR_004 | Tối thiểu 2 ký tự để trigger search | Tránh query quá rộng |
| Sắp xếp | BR_005 | Mặc định sắp xếp theo created_at giảm dần | Mới nhất lên đầu |
| Trạng thái | BR_006 | ARCHIVED courses vẫn hiển thị trong danh sách | Có thể lọc riêng |
| Xóa | BR_007 | Chỉ cho phép xóa vĩnh viễn khóa học DRAFT | PUBLISHED/UNPUBLISHED chỉ được archive |

---

## System Rules

1. Query danh sách phải sử dụng pagination để tối ưu performance
2. Full-text search phải sử dụng index để đảm bảo tốc độ
3. API phải trả về metadata: total_count, page, page_size, has_more
4. Thao tác xóa/archive phải được log vào audit trail
5. Cache danh sách với TTL 30 giây để giảm load database

---

## Business Value & Success Metrics

Story này cung cấp dashboard quản lý khóa học cho Giáo viên, là điểm khởi đầu để truy cập và thao tác với tất cả khóa học.

**Trọng số của story này là:** Cao (Essential)

Story được coi là thành công khi đảm bảo được:

- Thời gian load trang danh sách < 2 giây
- Thời gian tìm kiếm/lọc < 1 giây
- 95% Giáo viên tìm được khóa học cần tìm trong 3 thao tác
- Tỷ lệ sử dụng tính năng lọc/tìm kiếm > 30%

---

## Dependencies

| Loại | Mô tả | Ghi chú |
|------|-------|---------|
| Service | dịch vụ quản lý khóa học | Cung cấp API danh sách, tìm kiếm, lọc |
| US | US-COURSE-001 | Tạo khóa học mới từ danh sách |
| US | US-COURSE-029 | Xem chi tiết khóa học |
| US | US-COURSE-022/023 | Chỉnh sửa khóa học |
| US | US-COURSE-021 | Archive khóa học |

---

## Impact Analysis

| Đối tượng ảnh hưởng | Mô tả ảnh hưởng |
|---------------------|-----------------|
| Giáo viên INDIVIDUAL | Có dashboard quản lý tập trung cho tất cả khóa học |
| Quy trình quản lý khóa học | Entry point cho mọi thao tác với khóa học |
| Performance hệ thống | Cần tối ưu query và caching cho danh sách lớn |

---

## UI/UX Design

### Wireframe References
- Trang Danh sách khóa học: image (14).png

### Mô tả UI chính

**Trang Danh sách khóa học:**
- Header: "Danh sách Khóa học" + Nút "Tạo Khóa học mới" (màu primary)
- Thanh công cụ:
  - Ô tìm kiếm với placeholder "Tìm kiếm theo mã, tiêu đề..."
  - Dropdown lọc trạng thái: Tất cả, Bản nháp, Đã xuất bản, Tạm ẩn, Đã lưu trữ
- Bảng danh sách:
  - Cột: Mã | Tiêu đề | Trạng thái | Ngày tạo | Hành động
  - Mỗi dòng hiển thị thông tin khóa học
  - Trạng thái hiển thị dạng badge với màu sắc phân biệt
  - Cột Hành động: 3 icon (mắt, bút chì, thùng rác)
- Footer: Thanh phân trang

**Trạng thái Empty:**
- Hình minh họa khóa học
- Text "Bạn chưa có khóa học nào"
- Nút "Tạo khóa học đầu tiên"

---

## Out of Scope Items

| Item | Lý do |
|------|-------|
| Xem thống kê chi tiết (doanh thu, học viên) | Được xử lý trong US-COURSE-028 |
| Export danh sách ra Excel/PDF | Phạm vi phase sau |
| Bulk actions (xóa nhiều, archive nhiều) | Phạm vi phase sau |
| Chia sẻ khóa học giữa các Giáo viên | Không áp dụng cho INDIVIDUAL |
