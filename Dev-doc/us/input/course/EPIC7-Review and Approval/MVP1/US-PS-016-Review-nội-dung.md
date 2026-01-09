# US-PS-016 - Review nội dung khóa học

## User story Title
US-PS-016 - Review nội dung khóa học-COURSE_CONTENT_REVIEW (Review Course Content)

Là một **Quản trị viên nhà trường-SCHOOL_ADMIN của trường tư-SOCIAL_SCHOOL**

Tôi muốn thực hiện **preview và đánh giá chất lượng nội dung toàn bộ khóa học do Giảng viên chủ trì-LEAD_INSTRUCTOR submit** tại **trang Review Khóa học của sản phẩm LMS**

Để **kiểm tra kỹ lưỡng nội dung trước khi phê duyệt, đảm bảo chất lượng khóa học đạt chuẩn**

---

## Acceptance criteria

### AC-1: Happy Path - Xem tổng quan khóa học cần review
- **Tại** trang "Review nội dung Khóa học" với khóa học có trạng thái submission = **Đã submit-SUBMITTED** 
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN truy cập trang review từ danh sách (US-PS-015)
- **Thì** hệ thống hiển thị giao diện review với: thông tin khóa học (mã, tên, Giảng viên chủ trì), cấu trúc khóa học (danh sách Chương-section và Bài học-Lecture), sidebar thông tin submission (ngày submit, trạng thái), nút hành động (Approve, Yêu cầu chỉnh sửa, Từ chối), cập nhật trạng thái submission = **Đang được review-UNDER_REVIEW**

### AC-2: Xem danh sách chương và bài học
- **Tại** trang "Review nội dung Khóa học"
- **Khi** trang được tải
- **Thì** hệ thống hiển thị danh sách các Chương-section của khóa học, mỗi chương expand để xem danh sách Bài học-Lecture với thông tin: tên bài, loại bài (Video/Bài giảng/Bài kiểm tra/Bài trắc nghiệm), cho phép click vào từng bài để xem chi tiết

### AC-3: Preview bài học loại Video
- **Tại** trang "Review nội dung Khóa học"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN click vào bài học loại video
- **Thì** hệ thống hiển thị: video player với file video đã upload, mô tả bài học, tài liệu đính kèm (nếu có)

### AC-4: Preview bài học loại Bài giảng (Article)
- **Tại** trang "Review nội dung Khóa học"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN click vào bài học loại bài giảng
- **Thì** hệ thống hiển thị: file bài giảng đã upload, mô tả bài học, tài liệu đính kèm bổ sung (nếu có)

### AC-5: Preview bài học loại Bài kiểm tra (Assignment)
- **Tại** trang "Review nội dung Khóa học"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN click vào bài học loại Bài kiểm tra
- **Thì** hệ thống hiển thị: file bài kiểm tra đã upload, mô tả và hướng dẫn làm bài, thời gian làm bài nếu có.

### AC-6: Preview bài học loại Bài trắc nghiệm (Quiz)
- **Tại** trang "Review nội dung Khóa học"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN click vào bài học loại bài trắc nghiệm
- **Thì** hệ thống hiển thị: file bài trắc nghiệm đã upload, mô tả và hướng dẫn, thời gian làm bài (nếu có), rubric chấm điểm (nếu có)

### AC-7: Play video với full controls
- **Tại** trang preview bài học Video
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn play video
- **Thì** hệ thống phát video với player controls: play/pause, seek bar, volume control, playback speed (0.5x, 1x, 1.5x, 2x), fullscreen mode, cho phép xem toàn bộ video không giới hạn

### AC-8: Download tài liệu/file bài học
- **Tại** trang preview bài học
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn nút "Download" trên file
- **Thì** hệ thống tải file về máy với tên file gốc, hỗ trợ các định dạng: PDF, PPT, PPTX, DOC, DOCX, MP4, MP3, XLSX ghi nhận lại hành động download

### AC-9: Xem thông tin khóa học và submission
- **Tại** trang "Review nội dung Khóa học"
- **Khi** trang được tải
- **Thì** hệ thống hiển thị sidebar với thông tin: mã khóa học-COURSE_CODE, tên khóa học, Giảng viên chủ trì-OWNER (tên), thời gian submit, submission_type (NEW/REVISION), version number (nếu là resubmit), previous review notes (nếu có)

### AC-10: Mark khóa học as "Under Review"
- **Tại** trang "Review nội dung Khóa học" với submission_status = **Đã submit-SUBMITTED**
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN mở trang review lần đầu
- **Thì** hệ thống tự động cập nhật submission_status = **Đang được review-UNDER_REVIEW**, ghi nhận reviewer_id = admin_id, review_started_at = hiện tại

### AC-11: Xem submission history của khóa học
- **Tại** trang "Review nội dung Khóa học"
- **Khi** Quản trị viên nhà trường-SCHOOL_ADMIN nhấn tab "Lịch sử"
- **Thì** hệ thống hiển thị lịch sử submission với: version timeline, mỗi version có thời gian, trạng thái, review notes từ lần trước (nếu có)

### AC-12: Xử lý lỗi khi tải khóa học
- **Tại** trang "Review Khóa học-COURSE_REVIEW"
- **Khi** không tìm thấy khóa học hoặc kết nối database lỗi
- **Thì** hệ thống hiển thị thông báo lỗi "Không thể tải nội dung khóa học. Vui lòng quay lại danh sách", nút "Quay lại danh sách", ghi nhận lỗi COURSE-LOAD-001

### AC-13: Kiểm tra phân quyền - Chỉ School Admin
- **Tại** URL /courses/{courseId}/review
- **Khi** người dùng không phải Quản trị viên nhà trường-SCHOOL_ADMIN cố gắng truy cập
- **Thì** hệ thống chuyển hướng về trang 403 Không có quyền truy cập với thông báo "Bạn không có quyền review nội dung của khóa học này", ghi nhận lại nỗ lực truy cập trái phép

---

## Inline business rule

| Trường thông tin        | Mã BR     | Business rule                                                    | Ghi chú                                |
|-------------------------|-----------|------------------------------------------------------------------|----------------------------------------|
| Trạng thái submission   | BR-PS-102 | Chỉ review được khóa học có submission_status thuộc (SUBMITTED, UNDER_REVIEW, NEED_REVISION) | Validation                     |
| Loại bài học            | BR-PS-103 | Hỗ trợ 4 loại: Video, Bài giảng, Bài kiểm tra, Bài trắc nghiệm (tất cả upload file) | Theo BR-PS-028                         |
| Video player            | BR-PS-104 | Hỗ trợ định dạng: MP4, WebM, OGG. Playback speed: 0.5x, 1x, 1.5x, 2x | Chuẩn video                       |
| File bài học            | BR-PS-105 | Hỗ trợ định dạng: PDF, PPT, PPTX, DOC, DOCX, MP4, max 500MB      | File types                        |
| Auto status update      | BR-PS-106 | Khi review lần đầu: SUBMITTED → UNDER_REVIEW                     | Tự động chuyển trạng thái              |
| Reviewer tracking       | BR-PS-107 | Lưu reviewer_id, review_started_at khi bắt đầu review           | Audit trail                            |
| Submission history      | BR-PS-108 | Hiển thị tất cả versions của course submission (NEW, REVISION)   | Version control                    |

---

## System rule
- Video player sử dụng HTML5 video element với fallback
- File bài học được serve từ CDN với signed URLs (expire sau 1 giờ)
- Status SUBMITTED → UNDER_REVIEW chỉ trigger 1 lần (idempotent)
- Reviewer_id lưu admin đầu tiên mở trang review
- Video streaming sử dụng adaptive bitrate (nếu available)
- Download file ghi log với admin_id, course_id, file_name, timestamp
- 1 khóa học = 1 Giảng viên chủ trì-LEAD_INSTRUCTOR xây dựng toàn bộ nội dung

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho School Admin preview và đánh giá chất lượng nội dung toàn bộ khóa học với giao diện trực quan, hỗ trợ đầy đủ các loại bài học (Video, Bài giảng, Bài kiểm tra, Bài trắc nghiệm), đảm bảo quy trình review hiệu quả**

Trọng số của story này là **8**

Story được coi là thành công khi nó đảm bảo được:
- Admin có thể xem trang review khóa học trong vòng 3 giây (page load)
- 100% video bài học phát được (với định dạng hợp lệ)
- Video player hoạt động mượt mà không lag với các video < 500MB
- File bài học download thành công >= 98%
- Auto status update (SUBMITTED → UNDER_REVIEW) hoạt động chính xác 100%
- Trung bình Admin review 1 khóa học trong vòng 1-2 ngày

---

## Dependencies
- **lf-course service**: Lấy course data, chapter/lesson info, update submission status
- **sf-storage service**: Serve video, file bài học từ CDN
- **US-PS-015**: Danh sách khóa học chờ duyệt để navigate đến trang review
- **US-PS-011 (Giảng viên submit khóa học)**: Phải có khóa học đã submit để review

---

## Impact Analysis

- **Business Process**:
  - Admin có thể đánh giá chất lượng nội dung toàn khóa học đầy đủ
  - Preview từng bài học giúp phát hiện vấn đề trước khi approve
  - Auto-update status giảm friction trong quy trình
  - Version history giúp track changes giữa các lần submit

- **User Experience**:
  - Video player mượt mà với full controls
  - Hỗ trợ đầy đủ 4 loại bài học (Video, Bài giảng, Bài kiểm tra, Bài trắc nghiệm)
  - Cấu trúc chương/bài học rõ ràng, dễ navigate
  - Clear visibility về thông tin khóa học và submission

- **Performance**:
  - Video streaming với adaptive bitrate
  - CDN serving giảm latency
  - Signed URLs tăng security

---

## UI/UX Design

### Review Khóa học - Tổng quan
```
┌─────────────────────────────────────────────────────────────────┐
│ ← Danh sách                   Review Khóa học            [X]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────┬─────────────────────┐ │
│  │ 📚 PRIV-20251210-001                │ 📋 Thông tin        │ │
│  │ Toán nâng cao                       │                     │ │
│  │                                     │ Mã: PRIV-20251210-001│ │
│  │ Cấu trúc khóa học:                  │                     │ │
│  │ ┌─────────────────────────────────┐ │ GV chủ trì:         │ │
│  │ │ ▼ Chương 1: Giới thiệu (4 bài) │ │ Nguyễn Văn A        │ │
│  │ │   📹 Bài 1.1: Tổng quan        │ │                     │ │
│  │ │   📄 Bài 1.2: Lý thuyết        │ │ Submitted:          │ │
│  │ │   📝 Bài 1.3: Bài kiểm tra     │ │ 10/12/2025 14:30    │ │
│  │ │   ✅ Bài 1.4: Trắc nghiệm      │ │                     │ │
│  │ │                                 │ │ Status:             │ │
│  │ │ ▶ Chương 2: Đại số (5 bài)     │ │ 🔵 UNDER_REVIEW     │ │
│  │ │                                 │ │                     │ │
│  │ │ ▶ Chương 3: Hình học (4 bài)   │ │ Type: NEW           │ │
│  │ │                                 │ │ Version: 1.0        │ │
│  │ │ ▶ Chương 4: Xác suất (3 bài)   │ │                     │ │
│  │ │                                 │ │ [Xem lịch sử]       │ │
│  │ │ ▶ Chương 5: Thống kê (4 bài)   │ │                     │ │
│  │ └─────────────────────────────────┘ │                     │ │
│  │                                     │                     │ │
│  │ Click vào bài học để xem chi tiết   │                     │ │
│  └─────────────────────────────────────┴─────────────────────┘ │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│        [✓ Approve khóa học]  [⚠ Yêu cầu chỉnh sửa]  [✗ Từ chối]│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Preview bài học Video
```
┌─────────────────────────────────────────────────────────────────┐
│ ← Quay lại                   Bài 1.1: Tổng quan          [X]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────┬─────────────────────┐ │
│  │  ┌─────────────────────────────┐   │ 📋 Thông tin bài học│ │
│  │  │                             │   │                     │ │
│  │  │      VIDEO PLAYER           │   │ Chương 1: Giới thiệu│ │
│  │  │                             │   │ Bài 1.1: Tổng quan  │ │
│  │  │      [▶ Play]               │   │                     │ │
│  │  │                             │   │ Loại: Video         │ │
│  │  │  [████████░░░░] 00:03:45    │   │                     │ │
│  │  │  [⏮] [⏯] [⏭] 🔊 [⚙ 1x] [⛶] │   │ File: gioi_thieu.mp4│ │
│  │  └─────────────────────────────┘   │ Size: 250 MB        │ │
│  │                                     │                     │ │
│  │  Mô tả:                             │                     │ │
│  │  Bài giới thiệu về toán nâng cao,  │ 📎 Đính kèm:        │ │
│  │  các khái niệm nền tảng và ứng dụng│ • Slide.pdf [DL]    │ │
│  │                                     │                     │ │
│  └─────────────────────────────────────┴─────────────────────┘ │
│                                                                 │
│  [⬅ Bài trước]                                   [Bài tiếp ➡]  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Preview bài học Bài giảng (Article)
```
┌─────────────────────────────────────────────────────────────────┐
│ ← Quay lại                   Bài 1.2: Lý thuyết          [X]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────┬─────────────────────┐ │
│  │  📄 File bài giảng                  │ 📋 Thông tin bài học│ │
│  │                                     │                     │ │
│  │  ┌─────────────────────────────┐   │ Chương 1: Giới thiệu│ │
│  │  │                             │   │ Bài 1.2: Lý thuyết  │ │
│  │  │    PDF/PPT VIEWER           │   │                     │ │
│  │  │                             │   │ Loại: Bài giảng     │ │
│  │  │    [◀] Page 1/20 [▶]        │   │                     │ │
│  │  │                             │   │ File: ly_thuyet.pdf │ │
│  │  └─────────────────────────────┘   │ Size: 15 MB         │ │
│  │                                     │                     │ │
│  │  [📥 Download file]                 │                     │ │
│  │                                     │                     │ │
│  │  Mô tả:                             │                     │ │
│  │  Nội dung lý thuyết cơ bản về...   │                     │ │
│  │                                     │                     │ │
│  └─────────────────────────────────────┴─────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Lịch sử submission
```
┌─────────────────────────────────────────────────────────────────┐
│  Lịch sử submission khóa học                                    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ ● Version 2.0 - SUBMITTED                                  │ │
│  │   10/12/2025 14:30 | Đã chỉnh sửa theo yêu cầu            │ │
│  │   [Đang xem]                                               │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ ○ Version 1.0 - NEED_REVISION                              │ │
│  │   05/12/2025 09:00 | Submit lần đầu                       │ │
│  │   Review notes: "Cần bổ sung thêm bài tập thực hành"      │ │
│  │   [Xem version này]                                        │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**UI Behaviors**:
- Video auto-pause khi chuyển tab browser
- Playback speed persistent across sessions
- File download với loading indicator
- Expand/collapse chương để xem danh sách bài học
- Click vào bài học để mở panel preview chi tiết
- Keyboard shortcuts: Space (play/pause), Left/Right arrows (seek)

---

## Out of Scope Item

### Business Operations:
- **Collaborative review**: Nhiều admins review cùng lúc với comments realtime (collaboration - out of scope)
- **Review checklist**: Admin tạo checklist criteria để đánh giá (template system - out of scope)
- **Score/rating system**: Admin cho điểm khóa học (0-10) (rating feature - out of scope)

### Technical:
- **Video annotation**: Admin comment trực tiếp trên timeline video (annotation tool - phức tạp)
- **AI quality check**: Tự động phát hiện vấn đề về video/audio quality (AI feature - out of scope)
- **Transcription**: Tự động tạo transcript cho video (speech-to-text - out of scope)

### Features:
- **Side-by-side compare**: So sánh 2 versions khóa học cạnh nhau (version compare - out of scope)
- **Time tracking**: Track thời gian Admin review từng khóa học (analytics - out of scope)
- **Review scheduler**: Schedule review sessions cho khóa học (scheduling - out of scope)
