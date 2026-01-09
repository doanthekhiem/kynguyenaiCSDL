# US-PS-006F - Xem trước khóa học PRIVATE

## User story Title
US-PS-006F - Xem trước khóa học PRIVATE (Preview PRIVATE Course)

Là một **School Admin của trường tư**
Tôi muốn thực hiện **xem trước khóa học PRIVATE như người học sẽ thấy** tại **trang Course Detail của sản phẩm LMS**
Để **kiểm tra giao diện và trải nghiệm học viên, phát hiện lỗi hiển thị, đảm bảo chất lượng trước khi publish, và đưa ra quyết định có nên xuất bản hay cần điều chỉnh**

---

## Acceptance criteria

### AC-1: Happy Path - Xem trước giao diện trang khóa học
- **Tại** trang "Chi tiết Khóa học" khi nhấn nút "Xem trước"
- **Khi** Quản trị viên muốn xem khóa học như người học
- **Thì** hệ thống mở tab/modal mới hiển thị trang khóa học với giao diện dành cho learner, hiển thị đầy đủ thông tin: thumbnail, tiêu đề, mô tả, giảng viên, rating (nếu đã publish), cấu trúc chương trình (curriculum), prerequisites, learning outcomes, hiển thị watermark "PREVIEW MODE" ở góc màn hình, không cho phép enrollment thực sự trong preview mode, cho phép đóng preview để quay về trang admin

### AC-2: Happy Path - Xem trước nội dung bài học (lecture)
- **Tại** preview mode khi nhấn vào một bài học
- **Khi** Admin muốn xem nội dung chi tiết bài học
- **Thì** hệ thống hiển thị nội dung lecture như learner sẽ thấy: video player với video đã upload, audio player nếu có audio, tài liệu đính kèm (PDF, DOCX), text content với formatting, quiz/assignment nếu có, navigation giữa các lectures, hiển thị "PREVIEW - Nội dung có thể chưa được duyệt cuối cùng", không tính progress hoặc ghi nhận hoạt động trong preview mode

### AC-3: Preview video và audio với player đầy đủ tính năng
- **Tại** preview lecture có video/audio
- **Khi** Admin play video/audio
- **Thì** hệ thống hiển thị video/audio player với controls: Play/Pause, Volume, Speed (0.5x, 1x, 1.5x, 2x), Seek bar để tua, Fullscreen mode cho video, Subtitle/CC nếu có, Quality selector (360p, 720p, 1080p), Picture-in-Picture cho video, cho phép test tất cả tính năng để đảm bảo hoạt động tốt

### AC-4: Preview tài liệu và resources
- **Tại** preview lecture có tài liệu đính kèm
- **Khi** Admin nhấn vào tài liệu
- **Thì** hệ thống hiển thị preview tài liệu: PDF hiển thị inline với viewer, Office docs (DOCX, XLSX, PPTX) preview hoặc download, Images hiển thị với zoom, Links mở trong tab mới, cho phép download để kiểm tra file đầy đủ, hiển thị file size và format

### AC-5: Preview quiz và assignments
- **Tại** preview lecture có quiz/assignment
- **Khi** Admin muốn kiểm tra quiz
- **Thì** hệ thống hiển thị quiz như learner sẽ làm: Câu hỏi với đầy đủ options, Timer nếu có giới hạn thời gian, cho phép submit để xem kết quả (không lưu vào database), hiển thị đáp án đúng sau khi submit (chỉ trong preview), feedback cho từng câu trả lời, điểm số tính toán chính xác, không ảnh hưởng đến dữ liệu thực tế

### AC-6: Preview trên các thiết bị khác nhau (Responsive)
- **Tại** preview mode
- **Khi** Admin muốn kiểm tra hiển thị trên mobile/tablet
- **Thì** hệ thống cung cấp toolbar chuyển đổi view: Desktop (mặc định), Tablet (768px), Mobile (375px), cho phép xoay ngang/dọc, hiển thị viewport size, test responsive design và UX trên các thiết bị, highlight các vấn đề responsive nếu phát hiện

### AC-7: Preview với vai trò learner khác nhau
- **Tại** preview mode toolbar
- **Khi** Admin chọn "Preview as [role]"
- **Thì** hệ thống cho phép preview với các vai trò: Guest (chưa đăng nhập), Enrolled student, Completed student, hiển thị khóa học theo permission và visibility của từng role, test enrollment flow cho guest, test restricted content cho enrolled vs completed, không thực sự tạo enrollment record

<!--### AC-8: Ghi chú và feedback trong preview
- **Tại** preview mode bất kỳ
- **Khi** Admin phát hiện vấn đề cần ghi nhớ
- **Thì** hệ thống cung cấp sticky note tool ở sidebar, cho phép thêm ghi chú tại vị trí hiện tại: Screenshot vị trí, Mô tả vấn đề, Độ ưu tiên (High/Medium/Low), Assign cho giảng viên cụ thể, lưu danh sách ghi chú vào bảng course_preview_notes, hiển thị tổng số ghi chú đang mở, cho phép export danh sách ghi chú-->

<!--### AC-9: So sánh giữa preview và published version
- **Tại** preview mode của khóa học đã published
- **Khen** Admin bật "So sánh với bản published"
- **Thì** hệ thống hiển thị split view: Bên trái: Preview (draft changes), Bên phải: Published version (bản đang live), highlight các thay đổi bằng màu (xanh = thêm mới, vàng = sửa đổi, đỏ = xóa), cho phép toggle on/off từng thay đổi, nút "Publish changes" để apply thay đổi-->

### AC-10: Edge Case - Preview khóa học chưa có nội dung
- **Tại** preview mode của khóa học mới tạo
- **Khi** khóa học chưa có lectures hoặc nội dung
- **Thì** hệ thống hiển thị layout đầy đủ với placeholder: "Chưa có bài học nào", "Nội dung đang được xây dựng", cấu trúc chương trình rỗng với hướng dẫn, cho Admin hình dung được giao diện khi có nội dung, không trả về lỗi hoặc blank page

### AC-11: Validation - Kiểm tra quyền preview
- **Tại** điểm cuối API GET /api/courses/{courseId}/preview
- **Khi** người dùng cố gắng preview khóa học
- **Thì** hệ thống kiểm tra quyền: School Admin của trường (tenant_id match), HOẶC giảng viên trong course_instructor, HOẶC reviewer được assign, trả về 403 nếu không có quyền với thông báo "Bạn không có quyền preview khóa học này", ghi log nỗ lực truy cập preview

### AC-12: Performance - Tối ưu hóa load preview
- **Tại** hệ thống backend khi load preview
- **Khi** Admin mở preview mode
- **Thì** hệ thống lazy load nội dung: Chỉ load lecture đầu tiên khi mở preview, Load lectures khác khi được truy cập, Cache video/audio URLs để tránh regenerate, Preload thumbnail và metadata, thời gian load preview < 1 giây, sử dụng CDN cho media files

---

## Inline business rule

| Trường thông tin              | Mã BR      | Business rule                                                                                      | Ghi chú                              |
|-------------------------------|------------|---------------------------------------------------------------------------------------------------|--------------------------------------|
| Preview watermark             | BR-PS-290  | Hiển thị "PREVIEW MODE" ở góc trên bên phải màn hình                                              | UI indicator                         |
| Preview note priority         | BR-PS-291  | 3 mức độ: High (đỏ), Medium (vàng), Low (xanh dương)                                             | Color coding                         |
| Responsive breakpoints        | BR-PS-292  | Desktop: >1024px, Tablet: 768px-1024px, Mobile: <768px                                            | Device simulation                    |
| Video quality options         | BR-PS-293  | 360p, 720p, 1080p (nếu source hỗ trợ)                                                             | Quality selector                     |
| Playback speed options        | BR-PS-294  | 0.5x, 0.75x, 1x (normal), 1.25x, 1.5x, 2x                                                        | Speed control                        |
| Preview roles                 | BR-PS-295  | Guest, Enrolled student, Completed student                                                         | Role simulation                      |
| Preview không lưu progress    | BR-PS-296  | Không ghi nhận tiến độ học, quiz attempts, hoạt động vào database                                | Data isolation                       |
| Split view layout             | BR-PS-297  | 50/50 split cho so sánh preview vs published                                                      | Comparison mode                      |
| File preview size limit       | BR-PS-298  | PDF preview tối đa 10MB, lớn hơn chỉ cho download                                                 | Performance constraint               |
| Preview session timeout       | BR-PS-299  | Session timeout sau 2 giờ không hoạt động                                                         | Security                             |
| Ghi chú tối đa                | BR-PS-300  | Tối đa 50 ghi chú mỗi khóa học                                                                    | Data limit                           |
| Cache preview data            | BR-PS-301  | Cache preview HTML trong 10 phút                                                                  | Performance optimization             |

---

## System rule
- Preview mode sử dụng separate route: /courses/{courseId}/preview (không ảnh hưởng SEO)
- Query preview không JOIN với enrollment hoặc progress tables
- Video/audio streaming sử dụng presigned URLs với TTL=2 giờ
- Preview notes lưu vào bảng course_preview_notes với fields: course_id, noted_by, location, description, priority, assigned_to
- Responsive simulation sử dụng CSS media queries và viewport meta tag
- Role simulation sử dụng query parameter ?previewAs=guest|enrolled|completed
- Split view comparison sử dụng iframe hoặc side-by-side divs
- Cache: Redis với key "course:{courseId}:preview", TTL=600s
- Access control: user.tenant_id=course.tenant_id OR user IN course_instructors OR user IN course_reviewers
- Lazy loading sử dụng Intersection Observer API
- CDN URLs cho video/audio/images để tối ưu load time
- Audit log ghi preview access: who, when, duration

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng kiểm tra chất lượng khóa học trước khi publish, phát hiện lỗi hiển thị sớm, đảm bảo trải nghiệm learner tốt nhất, và tự tin khi xuất bản khóa học**

Trọng số của story này là **5**

Story được coi là thành công khi nó đảm bảo được:
- 100% School Admin có thể preview khóa học trước khi publish
- Thời gian load preview < 1 giây
- 95% lỗi hiển thị được phát hiện trong preview (không đến production)
- 90% Admin sử dụng preview trước khi publish (theo analytics)
- Video/audio player hoạt động mượt mà 100% trường hợp
- Preview notes được sử dụng thường xuyên để track issues

---

## Dependencies
- **lf-course service**: Truy vấn dữ liệu khóa học để preview
- **lf-course service (course_preview_notes table)**: Lưu ghi chú trong preview
- **file-storage service**: Lấy URLs cho video/audio/documents
- **identity service**: Xác thực và kiểm tra quyền preview
- **US-PS-006A**: Khóa học phải tồn tại trước khi preview
- **US-PS-006E**: Nội dung đã chỉnh sửa cần preview trước khi publish

---

## Impact Analysis
- **School Admin**: Tự tin khi publish, phát hiện lỗi sớm, đảm bảo chất lượng
- **Giảng viên**: Preview giúp kiểm tra nội dung của mình trước khi submit review
- **Learners**: Gián tiếp được hưởng lợi từ chất lượng khóa học tốt hơn
- **Hệ thống**: Tăng số lượng request preview, cần cache và CDN tối ưu
- **QA Process**: Preview giúp phát hiện bugs sớm, giảm issues ở production

---

## UI/UX Design
Link mockup: https://gemini.google.com/share/053ad031c96e
### Preview mode với watermark
```
┌─────────────────────────────────────────────────────────────────┐
│  🏠 Home > Khóa học > Preview          PREVIEW MODE 👁️         │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🖼️ [Thumbnail: Toán nâng cao Lớp 12]                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Toán nâng cao Lớp 12                                ⭐⭐⭐⭐⭐ │
│  Bởi: Nguyễn Văn A, Trần Thị B                       4.8 (125) │
│                                                                 │
│  📝 Mô tả khóa học                                              │
│  Khóa học toán nâng cao dành cho học sinh lớp 12, bao gồm...  │
│                                                                 │
│  📚 Nội dung khóa học                                           │
│  ▼ Chương 1: Giới thiệu (2 bài)                    ⏱️ 45 phút  │
│    ▶ Bài 1.1: Giới thiệu khóa học                 🎬 15 phút  │
│    ▶ Bài 1.2: Kiến thức cần thiết                 🎬 30 phút  │
│                                                                 │
│  ▼ Chương 2: Đại số (5 bài)                        ⏱️ 3 giờ    │
│    ▶ Bài 2.1: Phương trình bậc 2                  🎬 40 phút  │
│    ▶ Bài 2.2: Hệ phương trình                     🎬 35 phút  │
│    ...                                                          │
│                                                                 │
│  [Đóng Preview] [Thêm ghi chú] [💻 Desktop ▼]                  │
└─────────────────────────────────────────────────────────────────┘
```

### Preview lecture với video player
```
┌─────────────────────────────────────────────────────────────────┐
│  PREVIEW MODE 👁️                           [Đóng]  [Ghi chú]   │
├─────────────────────────────────────────────────────────────────┤
│  Bài 2.1: Phương trình bậc 2                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │              🎬 Video Player                             │   │
│  │           [Đang phát: 00:05:23 / 00:40:15]              │   │
│  │                                                          │   │
│  │  ⏮️ ⏸️ ⏭️    ━━━━━●──────────  🔊 1x 🎬 ⚙️             │   │
│  │              |                                           │   │
│  │         Seek bar (13%)                                   │   │
│  │                                                          │   │
│  │  Quality: [1080p ▼]  Speed: [1x ▼]  CC: [Off ▼]        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  📄 Nội dung bài học                                            │
│  Trong bài này chúng ta sẽ học về phương trình bậc 2...        │
│                                                                 │
│  📎 Tài liệu đính kèm                                           │
│  📄 Bài giảng - Phương trình bậc 2.pdf (2.5 MB)  [Xem] [Tải]  │
│  📊 Bài tập thực hành.docx (1.2 MB)              [Xem] [Tải]  │
│                                                                 │
│  ← Bài trước                                      Bài tiếp →   │
└─────────────────────────────────────────────────────────────────┘
```

### Toolbar preview với responsive và role simulation
```
┌─────────────────────────────────────────────────────────────────┐
│  PREVIEW MODE 👁️                                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Thiết bị: [💻 Desktop ▼]  [📱 Tablet]  [📱 Mobile]       │   │
│  │ Xem với vai trò: [👤 Guest ▼] [🎓 Enrolled] [✅ Completed]│   │
│  │ [📝 Ghi chú (3)] [📊 So sánh] [🔄 Tải lại] [✖️ Đóng]     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Panel ghi chú trong preview
```
┌─────────────────────────────────────────────────────────────────┐
│  📝 Ghi chú Preview                                   [Đóng]    │
├─────────────────────────────────────────────────────────────────┤
│  [+ Thêm ghi chú mới]                                           │
│                                                                 │
│  🔴 HIGH - Video bị lỗi codec                                   │
│  📍 Bài 2.1, timestamp 05:23                                    │
│  👤 Assign: Nguyễn Văn A                                        │
│  "Video không play được trên Safari"                            │
│  [Sửa] [Xóa] [✓ Đã xử lý]                                      │
│                                                                 │
│  🟡 MEDIUM - Typo trong slide                                   │
│  📍 Bài 1.2, slide 3                                            │
│  👤 Assign: Trần Thị B                                          │
│  "Sai chính tả 'phươgn trình'"                                  │
│  [Sửa] [Xóa] [✓ Đã xử lý]                                      │
│                                                                 │
│  🔵 LOW - Cải thiện mô tả                                       │
│  📍 Trang khóa học                                              │
│  👤 Unassigned                                                  │
│  "Mô tả nên thêm ví dụ cụ thể"                                  │
│  [Sửa] [Xóa] [✓ Đã xử lý]                                      │
│                                                                 │
│  [Xuất danh sách (3 ghi chú)]                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Split view so sánh preview vs published
```
┌─────────────────────────────────────────────────────────────────┐
│  📊 So sánh: Preview vs Published                    [Đóng]    │
├─────────────────────────────────────────────────────────────────┤
│  PREVIEW (Draft)              │  PUBLISHED (Live)               │
├───────────────────────────────┼─────────────────────────────────┤
│  Toán nâng cao Lớp 12         │  Toán Lớp 12                    │
│  ^^^^^^^^^^^^^                 │                                 │
│  [Thay đổi: Tiêu đề]          │                                 │
│                               │                                 │
│  Mô tả: Khóa học toán nâng    │  Mô tả: Khóa học toán cho học  │
│  cao dành cho học sinh lớp    │  sinh lớp 12...                 │
│  12, bao gồm đại số...        │                                 │
│  ^^^^^^^^^^^^^^^^^^^^^         │                                 │
│  [Thay đổi: Mô tả]            │                                 │
│                               │                                 │
│  Chương 2: Đại số (6 bài)     │  Chương 2: Đại số (5 bài)       │
│                       ^^^      │                                 │
│  [Thêm: Bài 2.6]              │                                 │
│                               │                                 │
│  [Publish tất cả thay đổi]    │  [Publish từng thay đổi]        │
└─────────────────────────────────────────────────────────────────┘
```

**Hành vi của quy trình**:
- Preview mode mở trong tab mới hoặc modal fullscreen
- Watermark "PREVIEW MODE" luôn hiển thị ở góc màn hình
- Video/audio player với đầy đủ controls và quality selector
- Responsive toolbar cho phép test trên nhiều thiết bị
- Role simulation để xem khóa học với các permission khác nhau
- Ghi chú sticky notes để track issues ngay trong preview
- Split view so sánh thay đổi giữa draft và published
- Không lưu progress hoặc hoạt động vào database
- Lazy loading nội dung để tối ưu performance

---

## Out of Scope Item
- **Live preview**: Preview real-time khi đang chỉnh sửa (out of scope)
- **A/B testing**: So sánh nhiều versions để chọn tốt nhất (out of scope)
- **User testing**: Mời người dùng thật test trong preview mode (có thể làm sau)
- **Accessibility checker**: Tự động kiểm tra accessibility issues (có thể làm sau)
- **Performance insights**: Phân tích load time, performance trong preview (out of scope)
- **Social sharing preview**: Xem preview khi share lên social media (có thể làm sau)
