# [US-COURSE-011] Tạo bài học (INDIVIDUAL)

## Lịch sử thay đổi

| Ngày thay đổi | Vị trí thay đổi | A*, M, D | Mô tả thay đổi | Phiên bản |
|---------------|-----------------|----------|----------------|-----------|
| 08/12/2025 | - | A | Tạo mới US Tạo bài học | 1.0 |

**Người tạo:** @BA Team | **Reviewer:** - | **Approve by:** - | **Trạng thái:** DRAFT

---

## User Story Content

**Là:** Giáo viên tự do (Freelance Teacher) sử dụng hệ thống INDIVIDUAL EMS

**Tôi muốn:** Tạo bài học (Lecture) trong một chương với thông tin: tên, mô tả, loại bài học (Video/Bài giảng/Bài trắc nghiệm/Bài kiểm tra), thời lượng và các cấu hình tại Curriculum Builder trên School Management Portal

**Để:** Tôi có thể xây dựng nội dung chi tiết cho từng phần của khóa học, giúp học viên học tập theo cấu trúc rõ ràng

---

## Acceptance Criteria

### AC1 — Truy cập thêm Bài học

**Tại:** Curriculum Builder, trong một Chương đã tạo

**Khi:** Chương đang ở trạng thái Expand (mở)

**Thì:** Hiển thị danh sách bài học hiện có và nút "+ Thêm Bài học" ở cuối danh sách

---

### AC2 — Mở Modal Thêm Bài học mới

**Tại:** Curriculum Builder, trong một Chương

**Khi:** Giáo viên click nút "+ Thêm Bài học"

**Thì:** Hệ thống hiển thị Modal "Thêm Bài học mới vào Chương {Tên chương}" với:

#### 2.1. Header Modal
- Tiêu đề: "Thêm Bài học mới vào Chương {Tên chương}"
- Ví dụ: "Thêm Bài học mới vào Chương sec-ex-1"

#### 2.2. Section 1: Thông tin Bài học

| STT | Trường | Kiểu | Bắt buộc | Max ký tự | Validation |
|-----|--------|------|----------|-----------|------------|
| 1 | Tên bài học | Input Text | ✓ | 200 | Placeholder: "Vd: Bài 1: Cấu trúc cơ bản của React Component" |
| 2 | Mô tả bài học | Textarea | ✗ | 1000 | Placeholder: "Tóm tắt ngắn gọn nội dung bài học" |
| 3 | Dạng bài học | Dropdown | ✓ | - | Options: Video, Bài giảng, Bài trắc nghiệm, Bài kiểm tra <br> Default: Video |
| 4 | Thời lượng của bài học (giây) | Number Input | ✓ | - | Placeholder: "600" <br> Min: 1, Max: 36000 (10 giờ) |

#### 2.3. Section 2: Tài nguyên bổ sung (Tùy chọn)

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| Label | Text | "Chọn Loại tài nguyên đính kèm" |
| Options | Multi-checkbox | ☐ Tài liệu, ☐ Video, ☐ Audio, ☐ Image |
| Help text | Text nhỏ | "Đánh dấu vào ô vuông để chọn loại tài liệu bạn muốn thêm." |
| Tải video lên | Tải file | Tải hoặc kéo thả một hoặc nhiều video <br> Filetype: MP4 <br>  Max size: 500MB (video) 
| Tải tài liệu | Tải file | Tải hoặc kéo thả một hoặc nhiều file <br> Filtype: PDF, DOCX, XLSX, PPTX   <br>  Max size: 30MB 
| Tải audio | Tải file | Tải hoặc kéo thả một hoặc nhiều file <br> Filtype: MP3   <br>  Max size: 300MB 
| Tải hình ảnh | Tải file | Tải hoặc kéo thả một hoặc nhiều file. <br> Filtype: PNG, JPG, JPEG   <br>  Max size: 20 MB 

#### 2.4. Section 3: Cấu hình Khác

| Trường | Kiểu | Default | Mô tả |
|--------|------|---------|-------|
| Cho phép xem trước (Miễn phí) | Checkbox | ☐ Unchecked | is_preview = true → Học viên có thể xem trước khi mua |
| Bắt buộc hoàn thành | Checkbox | ☑ Checked | is_mandatory = true → Bắt buộc hoàn thành để tiến bộ |

#### 2.5. Buttons
- **Hủy bỏ**: Đóng modal, không lưu
- **+ Thêm Bài học**: Primary button màu tím, tạo bài học mới

#### 2.6. Trạng thái ban đầu
- Tên bài học: trống
- Mô tả: trống
- Dạng bài học: "Video" (default)
- Thời lượng: trống
- Tài nguyên: tất cả unchecked
- Cho phép xem trước: unchecked
- Bắt buộc hoàn thành: checked
- Nút "Thêm Bài học" **Disable** cho đến khi nhập đủ trường bắt buộc

---

### AC3 — Các loại bài học (Lecture Types)

**Tại:** Dropdown "Dạng bài học"

**Khi:** Click dropdown

**Thì:** Hiển thị các options:

| Value | Label | Icon | Mô tả |
|-------|-------|------|-------|
| VIDEO | Video | 🎬 | Bài giảng video |
| ARTICLE | Bài giảng | 📝 | Bài viết text/rich text |
| QUIZ | Quiz | ❓ | Bài trắc nghiệm |
| ASSIGNMENT | Bài kiểm tra | 📋 | Bài kiểm tra |

---

### AC4 — Validation khi tạo Bài học

**Tại:** Modal Thêm Bài học

**Khi:** Nhập các thông tin thêm bài học

**Thì:** Hệ thống validate:

#### 4.1. Validation On Blur

| Trường | Điều kiện | Thông báo lỗi |
|--------|-----------|---------------|
| Tên bài học | Trống | "Vui lòng nhập tên bài học" |
| Thời lượng | Trống | "Vui lòng nhập thời lượng" |
| Thời lượng | <= 0 | "Thời lượng phải lớn hơn 0" |
| Thời lượng | > 36000 | "Thời lượng không được vượt quá 36000 giây (10 giờ)" |

#### 4.2. Validation On Submit

| Tình huống | Thông báo lỗi |
|------------|---------------|
| Tên bài học trống | "Vui lòng nhập tên bài học" |
| Tên bài học > 200 ký tự | "Tên bài học không được vượt quá 200 ký tự" |
| Mô tả > 1000 ký tự | "Mô tả không được vượt quá 1000 ký tự" |
| Dạng bài học chưa chọn | "Vui lòng chọn dạng bài học" |
| Thời lượng trống | "Vui lòng nhập thời lượng" |
| Thời lượng không hợp lệ | "Thời lượng phải là số nguyên dương" |

---

### AC5 — Tạo Bài học thành công

**Tại:** Modal Thêm Bài học

**Khi:** Giáo viên click "Thêm Bài học" và dữ liệu hợp lệ

**Thì:** Hệ thống:
1. Tạo Lecture record với:
   - `section_id` = ID chương hiện tại
   - `title` = Tên bài học
   - `description` = Mô tả (nếu có)
   - `lecture_type` = Dạng bài học đã chọn
   - `duration_seconds` = Thời lượng (giây)
   - `display_order` = Số thứ tự tiếp theo trong chương
   - `is_preview` = giá trị checkbox "Cho phép xem trước"
   - `is_mandatory` = giá trị checkbox "Bắt buộc hoàn thành"
   - `resource_types` = Danh sách tài nguyên đã chọn
2. Đóng modal
3. Hiển thị toast thành công: "Tạo bài học '{Tên bài học}' thành công"
4. Cập nhật danh sách bài học trong chương
5. Bài học mới hiển thị ở cuối danh sách bài học của chương


---

### AC6 — Hiển thị Bài học trong Chương

**Tại:** Curriculum Builder, trong một Chương đã expand

**Khi:** Có bài học được tạo

**Thì:** Mỗi bài học hiển thị:

| Thành phần | Mô tả | Vị trí |
|------------|-------|--------|
| Tên bài học | Bold, VD: "Bài 1: Cấu trúc HTML5" |  |
| Loại bài học | Text nhỏ, VD: "Loại: Video" |  |
| Thời lượng | Text nhỏ, VD: "Thời lượng: 07:00" |  |
| Bắt buộc | Text nhỏ, VD: "Bắt buộc: Có" |  |
| Mô tả | Text nhỏ, italic, màu xám |  |
| Badge Preview | "Xem trước" (nếu is_preview=true) |  |
| Nút Sửa | Icon bút chì |  |
| Nút Xóa | Icon thùng rác màu đỏ |  |

**Visual:**
```
┌─────────────────────────────────────────────────────────┐
│ Bài 1: Cấu trúc HTML5                           [✏️][🗑️] │
│ Loại: Video    Thời lượng: 07:00    Bắt buộc: Có        │
│ Mô tả: Cấu trúc cơ bản của một trang web.              │
└─────────────────────────────────────────────────────────┘
```

---

### AC7 — Format hiển thị Thời lượng

**Tại:** Danh sách bài học

**Khi:** Hiển thị thời lượng

**Thì:** Format theo quy tắc:

| Giá trị (giây) | Hiển thị |
|----------------|----------|
| < 60 | "00:30" (phút:giây) |
| 60 - 3599 | "07:00" (phút:giây) |
| >= 3600 | "1:30:00" (giờ:phút:giây) |

---

### AC8 — Sửa thông tin Bài học

**Tại:** Dòng bài học, icon Sửa

**Khi:** Giáo viên click icon Sửa (bút chì)

**Thì:** Hệ thống hiển thị Modal "Sửa Bài học" với:
- Tiêu đề: "Sửa Bài học"
- Pre-fill tất cả dữ liệu hiện tại
- Các trường giống như form tạo mới
- Buttons: "Hủy bỏ", "Lưu thay đổi"

**Khi:** Click "Lưu thay đổi" và hợp lệ

**Thì:**
- Cập nhật Lecture record
- Đóng modal
- Toast: "Cập nhật bài học thành công"
- Refresh hiển thị

---

### AC9 — Xóa Bài học

**Tại:** Dòng bài học, icon Xóa

**Khi:** Giáo viên click icon Xóa (thùng rác)

**Thì:** Hệ thống hiển thị popup xác nhận:
- **Tiêu đề:** "Xác nhận xóa Bài học"
- **Nội dung:** "Bạn có chắc chắn muốn xóa Bài học '{Tên bài học}'?"
- **Button "Hủy":** Đóng popup
- **Button "Xóa":** Xóa bài học (soft delete)

**Sau khi xóa:**
- Toast: "Xóa bài học '{Tên bài học}' thành công"
- Cập nhật danh sách
- Tự động re-order các bài học còn lại

---

### AC10 — Sắp xếp Bài học (Drag & Drop)

**Tại:** Danh sách bài học trong chương

**Khi:** Giáo viên drag (kéo) một bài học

**Thì:**
- Bài học được kéo có hiệu ứng "đang kéo"
- Chỉ cho phép drop trong cùng chương
- Khi drop: Cập nhật thứ tự hiển thị cho tất cả bài học bị ảnh hưởng

**Alternative:** Click nút ↑ ↓ để di chuyển

---

### AC11 — Hủy bỏ thêm Bài học

**Tại:** Modal Thêm Bài học

#### 11.1. Hủy khi chưa nhập

**Khi:** Form trống và click "Hủy bỏ"

**Thì:** Đóng modal ngay lập tức

#### 11.2. Hủy khi đã nhập

**Khi:** Form có dữ liệu và click "Hủy bỏ"

**Thì:** Hiển thị popup xác nhận:
- "Bạn có chắc muốn hủy? Các thông tin đã nhập sẽ không được lưu."
- Button "Tiếp tục nhập" / "Xác nhận hủy"

---

### AC12 — Badge xem trước (Preview)

**Tại:** Modal Thêm Bài học

**Tại:** Dòng bài học

**Khi:** Bài học có cho phép xem trước

**Thì:**
- Hiển thị badge "Xem trước" màu xanh dương sau tên bài học
- Tooltip: "Học viên có thể xem bài học này miễn phí trước khi mua khóa học"

---

## Alternative Paths (Luồng thay thế)

### ALT1 — Tạo bài học đầu tiên trong chương mới

**Tại:** Màn hình Danh sách bài học

**Khi:** Chương vừa tạo chưa có bài học nào

**Thì:**
- Hiển thị empty state trong chương: "Chưa có bài học nào"
- Nút "+ Thêm Bài học" nổi bật

### ALT2 — Tạo bài học cho khóa học đã publish

**Tại:** Màn hình Danh sách bài học

**Khi:** Khóa học đã PUBLISHED

**Thì:**
- Vẫn cho phép thêm bài học mới
- Bài học mới không tự động hiển thị trên Online Store
- Cần publish lại hoặc bài học sẽ hiển thị khi có update

### ALT3 — Tạo bài học loại Quiz

**Tại:** Modal Thêm Bài học

**Khi:** Chọn Dạng bài học = Quiz

**Thì:**
- Tạo lecture với lecture_type = QUIZ
- Sau khi tạo, có thể navigate đến Quiz Builder để tạo câu hỏi (US khác)

---

## Edge Cases & Error Conditions

### ERR1 — Lỗi mạng khi tạo bài học

**Tại:** Modal Thêm Bài học

**Khi:** Mất kết nối khi click "Thêm Bài học"

**Thì:**
- Hiển thị toast error
- Giữ modal mở với dữ liệu
- Cho phép retry

### ERR2 — Chương đã bị xóa

**Tại:** Modal Thêm Bài học

**Khi:** Chương bị xóa trong khi đang mở modal thêm bài học

**Thì:**
- Khi submit → API trả 404
- Hiển thị thông báo: "Chương đã không còn tồn tại"
- Đóng modal và refresh trang

### ERR3 — Giới hạn số bài học

**Tại:** Modal Thêm Bài học

**Khi:** Đã đạt giới hạn bài học/chương (nếu có)

**Thì:**
- Disable nút "+ Thêm Bài học"
- Tooltip: "Đã đạt giới hạn số bài học trong chương"

---

## Inline Business Rules

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Tên bài học | BR_LEC_001 | Bắt buộc nhập, max 200 ký tự | Required |
| Mô tả bài học | BR_LEC_002 | Optional, max 1000 ký tự | - |
| Dạng bài học | BR_LEC_003 | Bắt buộc chọn: VIDEO/ARTICLE/QUIZ/ASSIGNMENT | Default: VIDEO |
| Thời lượng | BR_LEC_004 | Bắt buộc, số nguyên dương (giây), max 36000 | 10 giờ max |
| display_order | BR_LEC_005 | Tự động tính trong phạm vi chương | Auto-increment |
| is_preview | BR_LEC_006 | Default = false | Miễn phí xem trước |
| is_mandatory | BR_LEC_007 | Default = true | Bắt buộc hoàn thành |
| Giới hạn bài học | BR_LEC_008 | Tối đa 100 bài học/chương | Có thể cấu hình |
| Resource types | BR_LEC_009 | Optional, multi-select | Chưa upload thực tế |

---

## UI/UX Design

**Wireframe Reference:**
- Link wf: https://gemini.google.com/share/91b3cd6d0e5b

- [image (16).png](../../../Input/Image/image%20(16).png) - Danh sách bài học trong chương
- [image (4).jpeg](../../../Input/Image/image%20(4).jpeg) - Modal Thêm Bài học mới

### UI Specifications

| Element | Specification |
|---------|--------------|
| Lecture row | Border radius 4px, padding 12px |
| Lecture background | White |
| Lecture border | 1px solid #E5E7EB |
| Badge Preview | Background #EFF6FF, text #2563EB |
| Checkbox size | 18px |
| Input height | 40px |

---

## Dependencies

- **US liên quan:**
  - [US-COURSE-010] Tạo chương
  - [US-COURSE-012] Sắp xếp thứ tự chương và bài học
  - [US-COURSE-014] Đánh dấu bài học bắt buộc
  - [US-COURSE-013] Đánh dấu xem trước miễn phí
  - [US-COURSE-015] Xóa chương hoặc bài học
  - [US-CONTENT-001] Upload video bài giảng


## Out of Scope Items

- Upload nội dung (video, tài liệu) trong modal này - Xem US-CONTENT-*
- Quiz Builder cho bài học loại Quiz - US riêng
- Assignment submission - US riêng
- Duplicate bài học - Phase 2
- Copy bài học giữa các chương - Phase 2
