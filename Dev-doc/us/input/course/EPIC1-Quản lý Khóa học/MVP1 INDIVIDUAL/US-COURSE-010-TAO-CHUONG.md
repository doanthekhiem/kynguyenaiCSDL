# [US-COURSE-010] Tạo chương (INDIVIDUAL)

## Lịch sử thay đổi

| Ngày thay đổi | Vị trí thay đổi | A*, M, D | Mô tả thay đổi | Phiên bản |
|---------------|-----------------|----------|----------------|-----------|
| 08/12/2025 | - | A | Tạo mới US Tạo chương | 1.0 |

**Người tạo:** @BA Team | **Reviewer:** - | **Approve by:** - | **Trạng thái:** DRAFT

---

## User Story Content

**Là:** Giáo viên tự do (Freelance Teacher) sử dụng hệ thống INDIVIDUAL EMS

**Tôi muốn:** Tạo chương (Section) với tiêu đề và mô tả trong khóa học của mình tại Curriculum Builder trên School Management Portal

**Để:** Tôi có thể tổ chức nội dung khóa học thành các phần logic, giúp học viên dễ dàng theo dõi và học tập theo trình tự

---

## Acceptance Criteria

### AC1 — Truy cập Curriculum Builder

**Tại:** Trang Chỉnh sửa Khóa học hoặc Form Tạo khóa học mới (

**Khi:** Giáo viên mở tab "Nội dung khóa học"

**Thì:** Hệ thống hiển thị Curriculum Builder với:

| Thành phần | Mô tả |
|------------|-------|
| Header | "Cấu trúc Khóa học (Sắp xếp Chương và Bài học)" |
| Nút "+ Thêm Chương" | Button primary màu cam, nằm góc phải |
| Danh sách Chương | Hiển thị các chương đã tạo (nếu có) |
| Empty state | Nếu chưa có chương: "Chưa có chương nào. Tạo chương đầu tiên!" |

---

### AC2 — Mở Modal Thêm Chương mới

**Tại:** Curriculum Builder

**Khi:** Giáo viên click nút "+ Thêm Chương"

**Thì:** Hệ thống hiển thị Modal "Thêm Chương mới" với:

#### 2.1. Header Modal
- Tiêu đề: "Thêm Chương mới"

#### 2.2. Form Fields

| STT | Trường | Kiểu | Bắt buộc | Max ký tự | Validation |
|-----|--------|------|----------|-----------|------------|
| 1 | Tên chương | Input Text | ✓ | 200 | Placeholder: "Vd: Chương 1: Giới thiệu về HTML" |
| 2 | Mô tả chương (Tóm tắt) | Textarea | ✗ | 500 | Placeholder: "Mô tả ngắn gọn về nội dung chính của chương này." |

#### 2.3. Buttons
- **Hủy bỏ**: Đóng modal, không lưu
- **+ Tạo Chương**: Primary button màu tím, tạo chương mới

#### 2.4. Trạng thái ban đầu
- Tất cả trường trống
- Nút "Tạo Chương" **Disable** cho đến khi nhập Tên chương

---

### AC3 — Validation khi tạo Chương

**Tại:** Modal Thêm Chương

#### 3.1. Validation On Blur

**Khi:** Giáo viên rời khỏi trường "Tên chương" mà để trống

**Thì:**
- Viền đỏ bao quanh trường
- Text lỗi: "Vui lòng nhập tên chương"
- Nút "Tạo Chương" **Disable**

#### 3.2. Validation On Submit

| Tình huống | Thông báo lỗi |
|------------|---------------|
| Tên chương trống | "Vui lòng nhập tên chương" |
| Tên chương > 200 ký tự | "Tên chương không được vượt quá 200 ký tự" |
| Mô tả > 500 ký tự | "Mô tả không được vượt quá 500 ký tự" |

---

### AC4 — Tạo Chương thành công

**Tại:** Modal Thêm Chương

**Khi:** Giáo viên click "Tạo Chương" và dữ liệu hợp lệ

**Thì:** Hệ thống:
1. Tạo chương mới với: Tên chương, Mô tả (nếu có), Số thứ tự chương, Có cho phép xem trước hay không?
2. Đóng modal
3. Hiển thị toast thành công: "Tạo chương '{Tên chương}' thành công"
4. Cập nhật danh sách chương
5. Chương mới hiển thị ở cuối danh sách

---

### AC5 — Hiển thị Chương trong danh sách

**Tại:** Curriculum Builder

**Khi:** Có chương được tạo

**Thì:** Mỗi chương hiển thị dạng Accordion với:

| Thành phần | Mô tả | Vị trí |
|------------|-------|--------|
| Icon Expand/Collapse | Chevron (▶/▼) | Bên trái |
| Số thứ tự | "MẪU 1:", "MẪU 2:"... hoặc "Chương 1:", "Chương 2:"... | Bên trái |
| Tên Chương | Tiêu đề chương (bold) | Giữa |
| Badge "(Chương Mẫu)" | Optional, màu xám | Sau tên (nếu có) |
| Mô tả | Text mô tả ngắn (màu xám, italic) | Dưới tên |
| Nút Sửa | Icon bút chì | Góc phải |
| Nút Xóa | Icon thùng rác màu đỏ | Góc phải |

**Visual:**
```
┌─────────────────────────────────────────────────────────┐
│ ▼ MẪU 1: Chương 1 (Ví dụ): HTML và CSS cơ bản  [✏️][🗑️] │
│   Mô tả: Giới thiệu về cấu trúc web và cách định dạng  │
│   ┌─────────────────────────────────────────────────┐  │
│   │ Bài 1: Cấu trúc HTML5                   [✏️][🗑️] │  │
│   │ Bài 2: Sử dụng Flexbox                  [✏️][🗑️] │  │
│   │ + Thêm Bài học                                   │  │
│   └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

### AC6 — Expand/Collapse Chương

**Tại:** Dòng chương trong danh sách

**Khi:** Giáo viên click vào icon chevron hoặc tên chương

**Thì:**
- Nếu đang collapse → Expand hiển thị danh sách bài học
- Nếu đang expand → Collapse ẩn danh sách bài học
- Icon chevron xoay tương ứng (▶ khi collapse, ▼ khi expand)
- Animation smooth (200ms)

---

### AC7 — Sửa thông tin Chương

**Tại:** Dòng chương, icon Sửa

**Khi:** Giáo viên click icon Sửa (bút chì)

**Thì:** Hệ thống hiển thị Modal "Sửa Chương" với:
- Tiêu đề: "Sửa Chương"
- Pre-fill dữ liệu hiện tại
- Buttons: "Hủy bỏ", "Lưu thay đổi"

**Khi:** Click "Lưu thay đổi" và hợp lệ

**Thì:**
- Cập nhật Section record
- Đóng modal
- Toast: "Cập nhật chương thành công"
- Refresh hiển thị

---

### AC8 — Xóa Chương

**Tại:** Dòng chương, icon Xóa

**Khi:** Giáo viên click icon Xóa (thùng rác)

**Thì:** Hệ thống hiển thị popup xác nhận:
- **Tiêu đề:** "Xác nhận xóa Chương"
- **Nội dung:** "Bạn có chắc chắn muốn xóa Chương '{Tên chương}'? Tất cả bài học trong chương này cũng sẽ bị xóa."
- **Button "Hủy":** Đóng popup
- **Button "Xóa":** Xóa chương và cascade delete bài học con

**Sau khi xóa:**
- Toast: "Xóa chương '{Tên chương}' thành công"
- Cập nhật danh sách
- Tự động re-order các chương còn lại

---

### AC9 — Sắp xếp Chương (Drag & Drop)

**Tại:** Danh sách chương

**Khi:** Giáo viên drag (kéo) một chương

**Thì:**
- Chương được kéo có hiệu ứng "đang kéo" (opacity, shadow)
- Các vị trí có thể drop hiển thị placeholder
- Khi drop: Cập nhật Thứ tự hiển thị cho tất cả chương bị ảnh hưởng
- Animation smooth khi sắp xếp lại

**Alternative:** Click nút ↑ ↓ để di chuyển lên/xuống

---

### AC10 — Hủy bỏ thêm Chương

**Tại:** Modal Thêm Chương

#### 10.1. Hủy khi chưa nhập

**Khi:** Giáo viên click "Hủy bỏ" và form trống

**Thì:** Đóng modal ngay lập tức

#### 10.2. Hủy khi đã nhập

**Khi:** Giáo viên click "Hủy bỏ" và form đã có dữ liệu

**Thì:** Hiển thị popup xác nhận:
- "Bạn có chắc muốn hủy? Các thông tin đã nhập sẽ không được lưu."
- Button "Tiếp tục nhập" / "Xác nhận hủy"

---

## Alternative Paths (Luồng thay thế)

### ALT1 — Tạo chương khi tạo khóa học mới

**Tại:** Màn hình thêm mới, Tab 3

**Khi:** Đang trong form tạo khóa học mới

**Thì:**
- Chương được tạo tạm thời (không lưu DB ngay)
- Khi click "Tạo Khóa học" → Lưu cả khóa học và các chương

### ALT2 — Tạo chương trong khóa học đã Đã xuất bản - publish

**Tại:** Màn hình thêm mới chương, Tab 3

**Khi:** Khóa học đã xuất bản - PUBLISHED

**Thì:**
- Vẫn cho phép thêm chương mới
- Chương mới không tự động xuất bản (publish)
- Cần xuất bản (publish) lại khóa học để chương mới hiển thị trên Online Store

---

## Edge Cases & Error Conditions

### ERR1 — Lỗi mạng khi tạo chương

**Tại:** Màn hình thêm mới chương, Tab 3

**Khi:** Mất kết nối khi click "Tạo Chương"

**Thì:**
- Hiển thị toast error
- Giữ modal mở với dữ liệu đã nhập
- Cho phép retry

### ERR2 — Concurrent edit

**Tại:** Màn hình thêm mới chương, Tab 3

**Khi:** Hai người cùng sửa khóa học

**Thì:**
- Sử dụng optimistic locking (version check)
- Nếu conflict → Hiển thị thông báo và refresh

### ERR3 — Giới hạn số chương

**Tại:** Màn hình thêm mới chương, Tab 3

**Khi:** Đã đạt giới hạn số chương (nếu có)

**Thì:**
- Disable nút "+ Thêm Chương"
- Hiển thị tooltip: "Đã đạt giới hạn số chương cho phép"

---

## Inline Business Rules

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Tên chương | BR_SEC_001 | Bắt buộc nhập, max 200 ký tự | Required |
| Mô tả chương | BR_SEC_002 | Optional, max 500 ký tự | - |
| display_order | BR_SEC_003 | Tự động tính, có thể sắp xếp lại | Auto-increment |
| Cascade delete | BR_SEC_004 | Xóa chương → Xóa tất cả bài học trong chương | Soft delete |
| Giới hạn chương | BR_SEC_005 | Tối đa 50 chương/khóa học | Có thể cấu hình |
| is_preview | BR_SEC_006 | Default = false, có thể toggle | Section level preview |

---

## Data Model (Reference)

```
Section {
  id: UUID (PK)
  course_id: UUID (FK -> Course)
  title: String (max 200)
  description: String (nullable, max 500)
  display_order: Integer
  is_preview: Boolean (default: false)
  created_at: DateTime
  created_by: UUID
  updated_at: DateTime
  updated_by: UUID
}
```

---

## UI/UX Design

**Wireframe Reference:**
- Link wf: https://gemini.google.com/share/91b3cd6d0e5b

- [image (16).png](../../../Input/Image/image%20(16).png) - Curriculum Builder với danh sách chương
- [image (17).png](../../../Input/Image/image%20(17).png) - Modal Thêm Chương mới

### UI Specifications

| Element | Specification |
|---------|--------------|
| Section card | Border radius 8px, padding 16px |
| Section background | #F0FDF4 (light green) |
| Section border | 2px solid #22C55E (green) |
| Expand animation | 200ms ease-in-out |
| Drag handle | 6 dots pattern, cursor: grab |

---

## Dependencies

- **US liên quan:**
  - [US-COURSE-001] Tạo khóa học mới
  - [US-COURSE-011] Tạo bài học
  - [US-COURSE-012] Sắp xếp thứ tự chương và bài học
  - [US-COURSE-015] Xóa chương hoặc bài học

- **Services:**
  - dịch vụ quản lý chương trình: API quản lý Section

- **API Endpoints:**
  - POST /courses/{courseId}/sections - Tạo section mới
  - PUT /sections/{id} - Cập nhật section
  - DELETE /sections/{id} - Xóa section
  - PUT /courses/{courseId}/sections/reorder - Sắp xếp lại

---

## Out of Scope Items

- Import chương từ khóa học khác - Phase 2
- Template chương - Phase 2
- Duplicate chương - Phase 2
