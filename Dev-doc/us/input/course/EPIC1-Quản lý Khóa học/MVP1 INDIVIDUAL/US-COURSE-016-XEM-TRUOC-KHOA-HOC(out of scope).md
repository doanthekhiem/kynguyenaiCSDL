# US-COURSE-016: Xem trước khóa học

## User Story Content

**Là một** Giáo viên tự do (INDIVIDUAL)

**Tôi muốn** xem trước toàn bộ khóa học ở chế độ xem của học viên tại trang quản lý khóa học

**Để** kiểm tra nội dung, giao diện và trải nghiệm học tập trước khi xuất bản lên Online Store

---

## Acceptance Criteria

### AC-1: Truy cập chế độ xem trước

**Tại** trang chỉnh sửa khóa học hoặc trang chi tiết khóa học

**Khi** Giáo viên click nút "Xem trước" hoặc icon preview

**Thì** hệ thống mở tab/cửa sổ mới hiển thị trang giới thiệu khóa học (Landing Page) ở chế độ preview với banner "Đây là chế độ xem trước - Học viên sẽ thấy giao diện tương tự" ở đầu trang

---

### AC-2: Xem trang giới thiệu khóa học (Landing Page)

**Tại** chế độ xem trước - Trang giới thiệu

**Khi** trang được load

**Thì** hệ thống hiển thị đầy đủ thông tin như học viên sẽ thấy: Ảnh/Video đại diện, Tiêu đề và Tiêu đề phụ, Tên Giáo viên, Độ khó, Ngôn ngữ, Thời lượng ước tính, Mục tiêu học tập (Learning Outcomes), Yêu cầu đầu vào (Requirements), Đối tượng phù hợp (Target Audience), Mô tả khóa học, Cấu trúc chương trình (Curriculum Overview), Giá (nếu đã thiết lập)

---

### AC-3: Xem cấu trúc chương trình trong preview

**Tại** chế độ xem trước - Phần Curriculum Overview

**Khi** Giáo viên scroll đến phần cấu trúc chương trình

**Thì** hệ thống hiển thị danh sách Chương ở dạng accordion, mỗi Chương hiển thị: Tên chương, Số lượng bài học, Tổng thời lượng. Khi expand Chương, hiển thị danh sách Bài học với: Icon theo type (Video, Article, Quiz, Assignment), Tên bài học, Thời lượng, Badge "Preview" nếu là bài học xem miễn phí

---

### AC-4: Xem nội dung bài học Preview miễn phí

**Tại** chế độ xem trước - Cấu trúc chương trình

**Khi** Giáo viên click vào Bài học có đánh dấu "Preview" (is_preview = true)

**Thì** hệ thống mở player hiển thị nội dung bài học: Video player (nếu type = VIDEO), Nội dung article (nếu type = ARTICLE). Giáo viên có thể xem như học viên chưa mua khóa học

---

### AC-5: Xem nội dung bài học không phải Preview

**Tại** chế độ xem trước - Cấu trúc chương trình

**Khi** Giáo viên click vào Bài học không đánh dấu "Preview" (is_preview = false)

**Thì** hệ thống vẫn mở player và cho phép Giáo viên xem nội dung (vì đây là chế độ preview của owner), hiển thị thông báo nhỏ "Bài học này không miễn phí - Học viên cần mua khóa học để xem"

---

### AC-6: Preview Video Bài giảng

**Tại** chế độ xem trước - Player video

**Khi** Giáo viên mở một bài học có video

**Thì** hệ thống hiển thị video player với đầy đủ controls: Play/Pause, Thanh tiến độ, Điều chỉnh tốc độ (0.5x, 1x, 1.25x, 1.5x, 2x), Điều chỉnh chất lượng (360p, 480p, 720p, 1080p), Fullscreen, Điều chỉnh âm lượng. Video được stream qua CDN như học viên thực tế

---

### AC-7: Preview tài nguyên đính kèm

**Tại** chế độ xem trước - Chi tiết bài học

**Khi** Giáo viên xem một bài học có tài nguyên đính kèm

**Thì** hệ thống hiển thị danh sách tài nguyên: Tài liệu PDF/PowerPoint với preview inline hoặc download, Liên kết ngoài với icon mở tab mới, File tải xuống với nút Download

---

### AC-8: Chuyển đổi giữa các bài học trong preview

**Tại** chế độ xem trước - Player bài học

**Khi** Giáo viên đang xem một bài học

**Thì** hệ thống hiển thị sidebar danh sách Chương/Bài học cho phép: Navigate trực tiếp đến bài khác, Hiển thị trạng thái đang xem, Collapse/Expand các Chương

---

### AC-9: Thoát chế độ xem trước

**Tại** chế độ xem trước

**Khi** Giáo viên click nút "Thoát xem trước" hoặc đóng tab

**Thì** hệ thống đóng cửa sổ preview và quay về trang chỉnh sửa khóa học

---

## Alternative Paths

### ALT-1: Preview khóa học chưa hoàn thiện

**Tại** trang chỉnh sửa khóa học đang ở trạng thái DRAFT chưa đầy đủ thông tin

**Khi** Giáo viên click "Xem trước"

**Thì** hệ thống vẫn cho phép preview với thông báo "Khóa học chưa hoàn thiện. Một số thông tin có thể hiển thị trống hoặc mặc định", các trường thiếu hiển thị placeholder hoặc thông báo "[Chưa có thông tin]"

---

### ALT-2: Preview với video đang xử lý

**Tại** chế độ xem trước, Bài học có video đang xử lý

**Khi** Giáo viên click vào Bài học đó

**Thì** hệ thống hiển thị thông báo "Video đang được xử lý. Vui lòng quay lại sau" với icon loading, không cho phép play video

---

### ALT-3: Preview trên thiết bị khác nhau

**Tại** chế độ xem trước

**Khi** Giáo viên muốn kiểm tra giao diện trên các thiết bị khác nhau

**Thì** hệ thống cung cấp toolbar với các nút: Desktop, Tablet, Mobile cho phép toggle khung preview với kích thước tương ứng

---

### ALT-4: Chia sẻ link preview

**Tại** chế độ xem trước

**Khi** Giáo viên click nút "Chia sẻ link preview"

**Thì** hệ thống tạo link preview có thời hạn (7 ngày) và copy vào clipboard, cho phép chia sẻ với người khác để review mà không cần đăng nhập

---

## Edge Cases & Error Conditions

### ERR-1: Video không load được

**Tại** chế độ xem trước - Player video

**Khi** video không thể load do lỗi CDN hoặc file bị hỏng

**Thì** hệ thống hiển thị thông báo lỗi "Không thể tải video. Vui lòng kiểm tra file video đã upload" với nút "Thử lại" và link đến trang quản lý video

---

### ERR-2: Khóa học không có Chương/Bài học

**Tại** chế độ xem trước

**Khi** khóa học chưa có Chương và Bài học nào

**Thì** hệ thống hiển thị phần Curriculum Overview với thông báo "Chưa có nội dung khóa học. Vui lòng thêm Chương và Bài học" và nút "Thêm nội dung" dẫn về Tab 3

---

### ERR-3: Hình ảnh/Video đại diện chưa upload

**Tại** chế độ xem trước - Trang giới thiệu

**Khi** khóa học chưa có ảnh/video đại diện

**Thì** hệ thống hiển thị placeholder image mặc định với text "Chưa có hình đại diện"

---

### ERR-4: Mất kết nối trong khi preview

**Tại** chế độ xem trước

**Khi** mất kết nối internet trong khi đang xem video hoặc nội dung

**Thì** hệ thống hiển thị thông báo "Mất kết nối mạng. Đang thử kết nối lại..." và tự động retry khi có kết nối

---

### ERR-5: Session hết hạn trong preview

**Tại** chế độ xem trước (tab riêng)

**Khi** session của Giáo viên hết hạn

**Thì** hệ thống hiển thị thông báo "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại để tiếp tục xem trước" với nút đăng nhập mở trong tab mới

---

## Inline Business Rules

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|-----------------|-------|---------------|---------|
| Chế độ preview | BR_001 | Chỉ owner của khóa học mới có quyền preview đầy đủ | permission: VIEW_COURSE |
| Video preview | BR_002 | Video phải có status = READY mới có thể play | Check video_asset.status |
| Bài học miễn phí | BR_003 | Bài học có is_preview = true hiển thị cho tất cả | Không yêu cầu mua khóa học |
| Link preview share | BR_004 | Link preview có thời hạn 7 ngày | Tạo token có expiry |
| Chất lượng video | BR_005 | Mặc định auto quality, cho phép manual chọn | Dựa vào bandwidth |
| Tiến độ học | BR_006 | KHÔNG ghi nhận tiến độ học trong chế độ preview | is_preview_mode = true |

---

## System Rules

1. Chế độ preview phải sử dụng cùng CDN và infrastructure như production
2. Preview không được tạo session học tập hoặc ghi nhận analytics
3. Link preview share phải được mã hóa và có thời hạn
4. Video preview vẫn sử dụng DRM protection như bình thường
5. Cache preview page với TTL ngắn (5 phút) để đảm bảo nội dung mới nhất

---

## Business Value & Success Metrics

Story này cho phép Giáo viên kiểm tra chất lượng khóa học trước khi xuất bản, giảm lỗi và cải thiện trải nghiệm học viên.

**Trọng số của story này là:** Trung bình (Quality Assurance)

Story được coi là thành công khi đảm bảo được:

- 100% Giáo viên preview ít nhất 1 lần trước khi xuất bản
- Thời gian load trang preview < 3 giây
- Video preview load thành công > 99%
- Tỷ lệ khóa học bị ẩn - unpublish do lỗi nội dung giảm 50%

---

## Dependencies

| Loại | Mô tả | Ghi chú |
|------|-------|---------|
| Service | dịch vụ quản lý khóa học | Cung cấp thông tin khóa học |
| Service | dịch vụ quản lý chương trình | Cung cấp cấu trúc Chương/Bài |
| Service | dịch vụ quản lý nội dung | Stream video qua CDN |
| US | US-COURSE-001 | Khóa học phải được tạo |
| US | US-COURSE-010 | Cấu trúc Chương/Bài để preview |
| US | US-CONTENT-001 | Video đã upload để preview |

---

## Impact Analysis

| Đối tượng ảnh hưởng | Mô tả ảnh hưởng |
|---------------------|-----------------|
| Giáo viên INDIVIDUAL | Có khả năng kiểm tra chất lượng khóa học trước xuất bản |
| Chất lượng khóa học | Giảm số lượng khóa học có lỗi nội dung sau xuất bản |
| Quy trình xuất bản | Preview là bước khuyến nghị trước khi xuất bản (publish) |

---

## UI/UX Design

### Wireframe References
- Giao diện preview tương tự Online Store course page

### Mô tả UI chính

**Trang Preview Landing Page:**
- Banner thông báo "Chế độ xem trước" ở đầu trang
- Layout giống trang khóa học trên Online Store:
  - Hero section: Ảnh/Video đại diện, Tiêu đề, Thông tin Giáo viên
  - Info section: Độ khó, Ngôn ngữ, Thời lượng, Số bài học
  - Tab/Section: Giới thiệu, Nội dung khóa học, Giáo viên, Đánh giá (mock)
  - Sidebar: Giá, nút Mua ngay (disabled trong preview)
- Nút "Thoát xem trước" ở góc trên phải

**Trang Preview Bài học:**
- Video player hoặc Article viewer chiếm phần lớn màn hình
- Sidebar: Danh sách Chương/Bài học có thể navigate
- Controls: Play, Tốc độ, Chất lượng, Fullscreen
- Footer: Tài nguyên đính kèm

**Responsive Preview Toolbar:**
- Icons: Desktop | Tablet | Mobile
- Kích thước khung preview thay đổi tương ứng

---

## Out of Scope Items

| Item | Lý do |
|------|-------|
| Preview Quiz/Assignment tương tác | Được xử lý trong Epic riêng |
| Preview với dữ liệu học tập thực | Preview không tạo dữ liệu thực |
| Preview cho người ngoài (không có link share) | Chỉ owner hoặc có link share mới preview được |
| A/B testing preview | Phạm vi phase sau |
