# US-PS-006B - Lọc khóa học PRIVATE theo trạng thái

## User story Title
US-PS-006B - Lọc khóa học PRIVATE theo trạng thái (Filter PRIVATE Courses by Status)

Là một **School Admin của trường tư**

Tôi muốn thực hiện **lọc danh sách khóa học theo trạng thái workflow** tại **trang Course Dashboard của sản phẩm LMS**

Để **tập trung vào các khóa học cần xử lý, quản lý hiệu quả từng giai đoạn workflow, và ưu tiên công việc**

---

## Acceptance criteria

### AC-1: Happy Path - Lọc theo một trạng thái workflow
- **Tại** trang "Dashboard Khóa học" với bộ lọc "Trạng thái workflow"
- **Khi** Quản trị viên chọn một trạng thái từ dropdown (DRAFT/INVITING_INSTRUCTORS/CONTENT_BUILDING/READY_FOR_REVIEW/CONTENT_APPROVED/PIM_READY/PUBLISHED/UNPUBLISHED/ARCHIVED)
- **Thì** hệ thống lọc danh sách khóa học theo trạng thái được chọn, <!--cập nhật URL với tham số ?status=DRAFT, --> hiển thị số lượng kết quả "Hiển thị X khóa học với trạng thái [Tên trạng thái]", giữ nguyên thứ tự sắp xếp và phân trang hiện tại, highlight trạng thái được chọn trong dropdown

### AC-2: Happy Path - Lọc theo nhiều trạng thái cùng lúc
- **Tại** bộ lọc "Trạng thái workflow" với chế độ multi-select
- **Khi** Quản trị viên chọn nhiều trạng thái (VD: DRAFT, INVITING_INSTRUCTORS, CONTENT_BUILDING)
- **Thì** hệ thống lọc danh sách khóa học có trạng thái nằm trong danh sách được chọn (điều kiện OR), <!--cập nhật URL với tham số ?status=DRAFT,INVITING_INSTRUCTORS,CONTENT_BUILDING, -->hiển thị badge số lượng trạng thái được chọn "(3 trạng thái)", hiển thị số lượng kết quả tổng hợp

### AC-3: Lọc nhanh bằng cách nhấn vào card thống kê
- **Tại** phần thống kê tổng quan ở đầu trang
- **Khi** Quản trị viên nhấn vào một card thống kê (VD: "Đang xây dựng: 12")
- **Thì** hệ thống tự động áp dụng bộ lọc tương ứng với card (VD: nhấn "Đang xây dựng" sẽ lọc DRAFT + INVITING_INSTRUCTORS + CONTENT_BUILDING), highlight card được chọn với viền màu xanh lá, cập nhật danh sách khóa học, hiển thị nút "Xóa bộ lọc" để quay về danh sách đầy đủ

### AC-4: Kết hợp lọc trạng thái với tìm kiếm
- **Tại** trang Dashboard khi đã áp dụng bộ lọc trạng thái
- **Khi** Quản trị viên nhập từ khóa tìm kiếm
- **Thì** hệ thống áp dụng cả hai điều kiện: lọc theo trạng thái VÀ tìm kiếm theo từ khóa, hiển thị kết quả thỏa mãn cả hai điều kiện,<!-- cập nhật URL với cả hai tham số ?status=DRAFT&search=toán, -->hiển thị "X khóa học với trạng thái [Trạng thái] khớp với '[từ khóa]'"

### AC-5: Xóa bộ lọc để quay về danh sách đầy đủ
- **Tại** trang Dashboard khi đã áp dụng bộ lọc trạng thái
- **Khi** Quản trị viên nhấn nút "Xóa bộ lọc" hoặc chọn "Tất cả" trong dropdown
- **Thì** hệ thống xóa bộ lọc trạng thái, hiển thị lại toàn bộ khóa học,<!-- xóa tham số ?status khỏi URL, --> bỏ highlight card thống kê, reset dropdown về "Tất cả trạng thái", hiển thị "Hiển thị tất cả X khóa học"

### AC-6: Lưu trạng thái lọc khi tải lại trang
- **Tại** trang Dashboard sau khi đã áp dụng bộ lọc
- **Khi** Quản trị viên tải lại trang (F5) hoặc quay lại trang từ navigation
- **Thì** hệ thống đọc tham số ?status từ URL, tự động áp dụng bộ lọc tương ứng, highlight trạng thái đã chọn trong dropdown, hiển thị kết quả lọc như trước khi tải lại

<!--### AC-7: Hiển thị số lượng khóa học cho mỗi trạng thái trong dropdown
- **Tại** dropdown "Trạng thái khóa học"
- **Khi** Quản trị viên mở dropdown
- **Thì** hệ thống hiển thị danh sách trạng thái với số lượng khóa học tương ứng: "DRAFT (5)", "INVITING_INSTRUCTORS (3)", "CONTENT_BUILDING (8)", ..., "Tất cả (25)", sắp xếp theo thứ tự workflow, tô sáng trạng thái hiện tại, hiển thị biểu tượng tương ứng với mỗi trạng thái-->

### AC-8: Edge Case - Không có khóa học nào khớp với bộ lọc
- **Tại** trang Dashboard sau khi áp dụng bộ lọc
- **Khi** không có khóa học nào có trạng thái được chọn
- **Thì** hệ thống hiển thị trạng thái rỗng với biểu tượng 🔍, thông báo "Không có khóa học nào với trạng thái [Tên trạng thái]", nút "Xóa bộ lọc" để quay về danh sách đầy đủ, gợi ý "Thử chọn trạng thái khác hoặc tạo khóa học mới"

<!--### AC-9: Validation - Kiểm tra tham số URL hợp lệ
- **Tại** hệ thống backend khi nhận request với tham số ?status
- **Khi** tham số status không nằm trong danh sách trạng thái hợp lệ (VD: ?status=INVALID)
- **Thì** hệ thống bỏ qua tham số không hợp lệ, hiển thị toàn bộ khóa học, ghi log cảnh báo "Invalid status parameter: INVALID", không trả về lỗi cho người dùng, hiển thị dropdown ở trạng thái "Tất cả"-->

### AC-10: Performance - Tối ưu hóa query với index
- **Tại** hệ thống backend khi lọc theo trạng thái
- **Khi** thực hiện query lọc khóa học
- **Thì** hệ thống sử dụng index idx_course_status để tối ưu hóa query, thời gian thực thi < 200ms cho danh sách 500 khóa học, sử dụng COUNT(*) FILTER để đếm số lượng mỗi trạng thái trong một query

---

## Inline business rule

| Trường thông tin              | Mã BR      | Business rule                                                                                      | Ghi chú                              |
|-------------------------------|------------|---------------------------------------------------------------------------------------------------|--------------------------------------|
| Trạng thái hợp lệ             | BR-PS-220  | Các giá trị hợp lệ: DRAFT, INVITING_INSTRUCTORS, CONTENT_BUILDING, READY_FOR_REVIEW, CONTENT_APPROVED, PIM_READY, PUBLISHED, UNPUBLISHED, ARCHIVED | Enum constraint              |
| Lọc multi-select              | BR-PS-221  | Cho phép chọn tối đa 5 trạng thái cùng lúc                                                        | UI constraint                        |
| URL parameter format          | BR-PS-222  | Format: ?status=DRAFT hoặc ?status=DRAFT,INVITING_INSTRUCTORS,CONTENT_BUILDING                  | URL encoding                         |
| Số lượng hiển thị dropdown    | BR-PS-223  | Hiển thị "(X)" sau mỗi trạng thái trong dropdown                                                  | UI formatting                        |
| Lọc nhanh từ card             | BR-PS-224  | Card "Đang xây dựng" ánh xạ tới DRAFT + INVITING + BUILDING, "Đang review" ánh xạ tới READY_FOR_REVIEW | Quick filter mapping                 |
| Kết hợp điều kiện             | BR-PS-225  | Khi có nhiều bộ lọc, áp dụng AND giữa các loại bộ lọc (status AND search)                       | Filter combination logic             |
| Default value                 | BR-PS-226  | Mặc định hiển thị "Tất cả trạng thái" khi chưa chọn                                               | Default state                        |
| Cache count                   | BR-PS-227  | Cache số lượng khóa học theo trạng thái trong 5 phút                                              | Performance optimization             |

---

## System rule
- Query lọc sử dụng WHERE status IN (list_of_statuses)
- Index idx_course_status được sử dụng để tối ưu hóa query
- URL parameter status được validate trước khi query
- Multi-select sử dụng delimiter "," để phân tách: DRAFT,INVITING,BUILDING
- Số lượng khóa học theo trạng thái được count bằng query riêng hoặc cache
- Filter state persist trong URL để hỗ trợ bookmark và share link
- Khi kết hợp nhiều bộ lọc, áp dụng AND logic: (status IN ...) AND (title LIKE ...)
- Quick filter từ card thống kê map tới nhiều statuses: "Đang xây dựng" = DRAFT OR INVITING OR BUILDING

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho School Admin tập trung vào các khóa học cần xử lý, quản lý hiệu quả từng giai đoạn workflow, và nhanh chóng định vị khóa học cần quan tâm**

Trọng số của story này là **3**

Story được coi là thành công khi nó đảm bảo được:
- 100% School Admin có thể lọc khóa học theo trạng thái
- Thời gian áp dụng bộ lọc < 200ms
- 90% School Admin sử dụng tính năng lọc để quản lý khóa học (theo analytics)
- Filter state được lưu chính xác 100% khi tải lại trang
- Số lượng khóa học hiển thị trong dropdown chính xác 100%

---

## Dependencies
- **lf-course service**: Truy vấn khóa học theo status filter
- **US-PS-006A**: Danh sách khóa học cơ bản phải hoạt động trước
- **identity service**: Xác thực School Admin

---

## Impact Analysis
- **School Admin**: Quản lý khóa học hiệu quả hơn bằng cách tập trung vào từng giai đoạn
- **Hệ thống**: Tăng số lượng query với điều kiện WHERE, cần đảm bảo index tốt
- **User Experience**: Trải nghiệm tìm kiếm và quản lý nhanh chóng, dễ dàng

---

## UI/UX Design
Link mockup: https://gemini.google.com/share/1ed1f2deb150
### Bộ lọc trạng thái
```
┌─────────────────────────────────────────────────────────────────┐
│  📊 Dashboard Khóa học                                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Trạng thái: [Tất cả (25)              ▼]  [Xóa bộ lọc]  │   │
│  │                                                           │   │
│  │ Dropdown mở ra:                                           │   │
│  │ ┌─────────────────────────────────────┐                  │   │
│  │ │ ✓ Tất cả (25)                       │                  │   │
│  │ │ ─────────────────────────────────── │                  │   │
│  │ │ 📝 DRAFT (5)                        │                  │   │
│  │ │ 📧 INVITING_INSTRUCTORS (3)         │                  │   │
│  │ │ ✏️ CONTENT_BUILDING (8)             │ ← Selected       │   │
│  │ │ 👀 READY_FOR_REVIEW (2)             │                  │   │
│  │ │ ✅ CONTENT_APPROVED (1)             │                  │   │
│  │ │ 🎁 PIM_READY (1)                    │                  │   │
│  │ │ 🚀 PUBLISHED (4)                    │                  │   │
│  │ │ ⏸️ UNPUBLISHED (1)                   │                  │   │
│  │ │ 📦 ARCHIVED (0)                     │                  │   │
│  │ └─────────────────────────────────────┘                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Hiển thị 8 khóa học với trạng thái CONTENT_BUILDING            │
└─────────────────────────────────────────────────────────────────┘
```

### Quick filter từ card thống kê
```
┌─────────────────────────────────────────────────────────────────┐
│  📊 Thống kê tổng quan                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │📚 Tổng:  │ │✏️ Đang   │ │👀 Đang   │ │🚀 Đã     │           │
│  │   25     │ │  xây:12  │ │  review:3│ │  publish:│           │
│  │          │ │  [Selected]│         │ │    8     │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                  ↓ Nhấn vào card                                │
│  Danh sách lọc: DRAFT + INVITING + BUILDING (12 khóa học)      │
└─────────────────────────────────────────────────────────────────┘
```

**Hành vi của quy trình**:
- Dropdown trạng thái hiển thị số lượng khóa học real-time
- Khi chọn trạng thái, danh sách cập nhật ngay lập tức không reload page
- URL tự động cập nhật với tham số filter để hỗ trợ bookmark
- Quick filter từ card thống kê áp dụng nhóm trạng thái liên quan
- Nút "Xóa bộ lọc" hiển thị khi có filter đang active
- Kết hợp được với tìm kiếm và sắp xếp

---

## Out of Scope Item
- **Instructor Role**: CONTRIBUTOR, REVIEWER
- **Save filter preset**: Lưu bộ lọc thường dùng (có thể làm sau)
- **Advanced filter builder**: Lọc theo nhiều tiêu chí phức tạp với AND/OR logic (out of scope)
- **Filter by date range**: Lọc theo ngày tạo, ngày cập nhật (có thể làm sau)
- **Filter by instructor**: Lọc theo giảng viên cụ thể (có thể làm sau)
