# US-PS-006C - Tìm kiếm khóa học PRIVATE

## User story Title
US-PS-006C - Tìm kiếm khóa học PRIVATE (Search PRIVATE Courses)

Là một **School Admin của trường tư**

Tôi muốn thực hiện **tìm kiếm khóa học theo tiêu đề, mã khóa học hoặc tên giảng viên** tại **trang Course Dashboard của sản phẩm LMS**

Để **nhanh chóng định vị khóa học cần quản lý, tiết kiệm thời gian duyệt danh sách dài, và truy cập thông tin khóa học hiệu quả**

---

## Acceptance criteria

### AC-1: Happy Path - Tìm kiếm theo tiêu đề khóa học/ mã khóa học
- **Tại** ô tìm kiếm "Tìm khóa học" trên trang Dashboard
- **Khi** Quản trị viên nhập từ khóa vào ô tìm kiếm (VD: "Toán") và nhấn Enter hoặc nút Tìm kiếm
- **Thì** hệ thống tìm kiếm trong trường title/ course_code của khóa học không phân biệt chữ hoa/thường, sử dụng điều kiện LIKE '%từ khóa%', hiển thị danh sách khóa học có tiêu đề chứa từ khóa, đánh dấu từ khóa trong kết quả bằng highlight màu vàng, hiển thị "Tìm thấy X khóa học cho '[từ khóa]'",<!-- cập nhật URL với tham số ?search=toán, --> giữ nguyên bộ lọc và sắp xếp hiện tại

### AC-2: Happy Path - Tìm kiếm theo mã khóa học
- **Tại** ô tìm kiếm "Tìm khóa học"
- **Khi** Quản trị viên nhập mã khóa học 
- **Thì** hệ thống tìm kiếm chính xác trong trường course_code không phân biệt chữ hoa/thường, ưu tiên hiển thị kết quả khớp chính xác lên đầu, sau đó hiển thị kết quả khớp một phần, đánh dấu mã khóa học trong kết quả, hiển thị "Tìm thấy X khóa học với mã '[mã khóa học]'"

<!--### AC-3: Happy Path - Tìm kiếm theo tên giảng viên
- **Tại** ô tìm kiếm "Tìm khóa học"
- **Khi** Quản trị viên nhập tên giảng viên (VD: "Nguyễn Văn A")
- **Thì** hệ thống JOIN với bảng course_instructor và teacher_profile, tìm kiếm trong trường instructor name không phân biệt chữ hoa/thường, hiển thị danh sách khóa học có giảng viên khớp tên, hiển thị "Tìm thấy X khóa học của giảng viên '[tên giảng viên]'", highlight tên giảng viên trong kết quả

### AC-4: Tìm kiếm real-time với gợi ý (autocomplete)
- **Tại** ô tìm kiếm khi đang nhập
- **Khi** Quản trị viên nhập ít nhất 2 ký tự
- **Thì** hệ thống hiển thị dropdown gợi ý với tối đa 5 kết quả phù hợp nhất, phân loại gợi ý: "Khóa học", "Mã khóa học", "Giảng viên", highlight từ khóa trong gợi ý, cho phép chọn gợi ý bằng chuột hoặc phím mũi tên + Enter, tự động điền từ khóa khi chọn gợi ý

### AC-5: Tìm kiếm nâng cao với nhiều từ khóa
- **Tại** ô tìm kiếm
- **Khi** Quản trị viên nhập nhiều từ khóa cách nhau bởi dấu cách (VD: "Toán Lớp 12")
- **Thì** hệ thống tách từ khóa thành các từ riêng biệt, tìm kiếm khóa học chứa TẤT CẢ các từ (điều kiện AND), sắp xếp kết quả theo độ liên quan (relevance score), khóa học có từ khóa xuất hiện nhiều lần hoặc gần nhau hơn sẽ được ưu tiên, hiển thị "Tìm thấy X khóa học cho 'Toán Lớp 12'" -->

### AC-6: Kết hợp tìm kiếm với bộ lọc trạng thái
- **Tại** trang Dashboard khi đã áp dụng bộ lọc trạng thái
- **Khi** Quản trị viên nhập từ khóa tìm kiếm
- **Thì** hệ thống áp dụng cả hai điều kiện: tìm kiếm từ khóa AND lọc theo trạng thái, hiển thị kết quả thỏa mãn cả hai điều kiện, cập nhật URL với cả hai tham số ?search=toán&status=PUBLISHED, hiển thị "Tìm thấy X khóa học PUBLISHED cho 'toán'"

### AC-7: Xóa từ khóa tìm kiếm để quay về danh sách đầy đủ
- **Tại** ô tìm kiếm khi đã có từ khóa
- **Khi** Quản trị viên nhấn nút "X" hoặc xóa toàn bộ từ khóa và nhấn Enter
- **Thì** hệ thống xóa từ khóa tìm kiếm, hiển thị lại toàn bộ khóa học (hoặc theo bộ lọc nếu có), xóa tham số ?search khỏi URL, xóa highlight từ khóa, hiển thị "Hiển thị tất cả X khóa học"


### AC-9: Edge Case - Không tìm thấy kết quả nào
- **Tại** trang Dashboard sau khi tìm kiếm
- **Khi** không có khóa học nào khớp với từ khóa
- **Thì** hệ thống hiển thị trạng thái rỗng với biểu tượng 🔍, thông báo "Không tìm thấy khóa học nào cho '[từ khóa]'", gợi ý "Thử từ khóa khác hoặc kiểm tra lại chính tả", nút "Xóa tìm kiếm" để quay về danh sách đầy đủ, hiển thị "Bạn có thể thử: Tìm theo mã khóa học, tên giảng viên"

### AC-10: Edge Case - Từ khóa tìm kiếm quá ngắn hoặc chứa ký tự đặc biệt
- **Tại** ô tìm kiếm
- **Khi** Quản trị viên nhập từ khóa < 2 ký tự hoặc chỉ chứa ký tự đặc biệt (!@#$%)
- **Thì** hệ thống hiển thị tooltip "Vui lòng nhập ít nhất 2 ký tự", không thực hiện tìm kiếm, không gửi request đến backend, vô hiệu hóa nút Tìm kiếm cho đến khi có ít nhất 2 ký tự hợp lệ

### AC-11: Validation - Chống SQL injection và XSS
- **Tại** hệ thống backend khi nhận từ khóa tìm kiếm
- **Khi** từ khóa chứa ký tự nguy hiểm (', ", <, >, --) hoặc chuỗi SQL
- **Thì** hệ thống sanitize từ khóa bằng escape special characters, sử dụng parameterized query để tránh SQL injection, encode HTML để tránh XSS khi hiển thị kết quả, ghi log cảnh báo nếu phát hiện chuỗi nguy hiểm, không từ chối request nhưng xử lý an toàn

---

## Inline business rule

| Trường thông tin              | Mã BR      | Business rule                                                                                      | Ghi chú                              |
|-------------------------------|------------|---------------------------------------------------------------------------------------------------|--------------------------------------|
| Độ dài từ khóa tối thiểu      | BR-PS-230  | Tối thiểu 2 ký tự để thực hiện tìm kiếm                                                          | Input validation                     |
| Độ dài từ khóa tối đa         | BR-PS-231  | Tối đa 100 ký tự                                                                                  | Input validation                     |
| Tìm kiếm không phân biệt      | BR-PS-232  | Không phân biệt chữ hoa/thường (case-insensitive)                                                | Search behavior                      |
| Highlight từ khóa             | BR-PS-233  | Highlight từ khóa trong kết quả bằng màu vàng (background: #FFFF00)                             | UI formatting                        |
| Số gợi ý tối đa               | BR-PS-234  | Hiển thị tối đa 5 gợi ý trong autocomplete dropdown                                              | UI constraint                        |
| Thứ tự ưu tiên kết quả        | BR-PS-235  | Ưu tiên: 1) Khớp chính xác, 2) Khớp từ đầu, 3) Khớp một phần, 4) Relevance score               | Ranking logic                        |
| Tìm kiếm đa trường            | BR-PS-236  | Tìm kiếm trong: title, course_code, instructor name                                              | Multi-field search                   |
| Tìm kiếm nhiều từ             | BR-PS-237  | Nhiều từ khóa áp dụng điều kiện AND (tất cả từ phải xuất hiện)                                   | Multi-keyword logic                  |
| Sanitize input                | BR-PS-239  | Escape các ký tự đặc biệt: ', ", <, >, --, ; để tránh injection                                 | Security rule   

---

## System rule
- Query tìm kiếm sử dụng WHERE (title LIKE '%keyword%' OR course_code LIKE '%keyword%')
- JOIN với course_instructor và teacher_profile khi tìm theo tên giảng viên
- Full-text index được sử dụng: idx_course_fulltext_search trên (title, course_code)
- Parameterized query để tránh SQL injection
- HTML encode khi hiển thị kết quả để tránh XSS
- Autocomplete sử dụng debounce 300ms để giảm số request
- Kết quả tìm kiếm được sắp xếp theo relevance score
- Cache phổ biến: Redis với key pattern "search:courses:{keyword}", TTL=600s
- Khi kết hợp với filter, áp dụng AND: (search conditions) AND (filter conditions)
- Search query limit tối đa 20 kết quả, sau đó dùng pagination

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng tìm kiếm nhanh chóng và chính xác khóa học PRIVATE, giúp School Admin tiết kiệm thời gian quản lý và nhanh chóng truy cập thông tin khóa học cần thiết**

Trọng số của story này là **5**

Story được coi là thành công khi nó đảm bảo được:
- 100% School Admin có thể tìm kiếm khóa học theo tiêu đề, mã khóa học, tên giảng viên
- Thời gian thực hiện tìm kiếm < 300ms
- 95% kết quả tìm kiếm chính xác và liên quan đến từ khóa
- 90% School Admin sử dụng tính năng tìm kiếm thường xuyên (theo analytics)
- Autocomplete gợi ý chính xác trong top 5 kết quả ít nhất 80% trường hợp
- 0% lỗ hổng SQL injection hoặc XSS

---

## Dependencies
- **lf-course service**: Truy vấn khóa học theo search criteria
- **lf-course service (course_instructor table)**: Tìm kiếm theo giảng viên
- **tf-teacher-profile service**: Lấy thông tin tên giảng viên
- **US-PS-006A**: Danh sách khóa học cơ bản phải hoạt động trước
- **identity service**: Xác thực School Admin

---

## Impact Analysis
- **School Admin**: Tìm kiếm khóa học nhanh chóng, tiết kiệm thời gian, truy cập thông tin hiệu quả
- **Hệ thống**: Tăng số lượng query phức tạp với JOIN và LIKE, cần đảm bảo full-text index và cache
- **User Experience**: Trải nghiệm tìm kiếm mượt mà với autocomplete và highlight kết quả

---

## UI/UX Design
Link mockup: https://gemini.google.com/share/1ed1f2deb150
### Ô tìm kiếm với autocomplete
```
┌─────────────────────────────────────────────────────────────────┐
│  📊 Dashboard Khóa học                                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🔍 Tìm khóa học: [Toán nâng cao         ] [Tìm kiếm] [X]│   │
│  │                                                           │   │
│  │ Gợi ý (khi nhập):                                         │   │
│  │ ┌─────────────────────────────────────┐                  │   │
│  │ │ 📚 Khóa học:                        │                  │   │
│  │ │   Toán nâng cao Lớp 12              │ ← Highlight      │   │
│  │ │   Toán cao cấp                      │                  │   │
│  │ │                                     │                  │   │
│  │ │ 🔢 Mã khóa học:                     │                  │   │
│  │ │   MATH-12-ADV-2025                  │                  │   │
│  │ │                                     │                  │   │
│  │ │ 👤 Giảng viên:                      │                  │   │
│  │ │   Nguyễn Văn A (Toán Lớp 12)        │                  │   │
│  │ └─────────────────────────────────────┘                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Tìm thấy 3 khóa học cho 'Toán nâng cao'                        │
└─────────────────────────────────────────────────────────────────┘
```

### Kết quả tìm kiếm với highlight
```
┌─────────────────────────────────────────────────────────────────┐
│  Kết quả tìm kiếm cho: "Toán"                    [Xóa tìm kiếm] │
│  Tìm thấy 3 khóa học                                            │
├─────────────────────────────────────────────────────────────────┤
│ 🖼️ Toán nâng cao Lớp 12    │ 📝 DRAFT   │ 👤👤👤 5/3/2│ 06/12   │
│    ^^^^^^^^                 │            │         │         │
│    Mã: MATH-12-ADV-2025                                         │
│    Giảng viên: Nguyễn Văn A, Trần Thị B                         │
├─────────────────────────────────────────────────────────────────┤
│ 🖼️ Toán cao cấp A1         │ 🚀 PUBLISHED│ 👤👤   2/2/0│ 03/12   │
│    ^^^^                     │            │         │         │
├─────────────────────────────────────────────────────────────────┤
│ 🖼️ Đại số tuyến tính       │ ✏️ BUILDING │ 👤👤👤 4/4/0│ 01/12   │
│    (Giảng viên: Lê Văn Toán)                                   │
│                    ^^^^                                         │
└─────────────────────────────────────────────────────────────────┘
```

### Trạng thái không tìm thấy
```
┌─────────────────────────────────────────────────────────────────┐
│  Kết quả tìm kiếm cho: "abcxyz"                 [Xóa tìm kiếm]  │
│                                                                 │
│                       🔍                                        │
│                                                                 │
│         Không tìm thấy khóa học nào cho "abcxyz"                │
│                                                                 │
│  Gợi ý:                                                         │
│  • Kiểm tra lại chính tả                                        │
│  • Thử từ khóa khác hoặc ngắn gọn hơn                          │
│  • Tìm theo mã khóa học (VD: MATH-12-ADV-2025)                 │
│  • Tìm theo tên giảng viên                                      │
│                                                                 │
│              [Xóa tìm kiếm]                                     │
└─────────────────────────────────────────────────────────────────┘
```

**Hành vi của quy trình**:
- Autocomplete xuất hiện sau 300ms khi nhập ít nhất 2 ký tự
- Từ khóa được highlight màu vàng trong kết quả
- Kết quả được sắp xếp theo độ liên quan (exact match > partial match)
- Kết hợp được với filter trạng thái và sắp xếp
- URL tự động cập nhật với tham số search
- Nút "X" để xóa nhanh từ khóa tìm kiếm
- Gợi ý được phân loại: Khóa học / Mã khóa học / Giảng viên

---

## Out of Scope Item
- **Advanced search builder**: Tìm kiếm nâng cao với nhiều tiêu chí phức tạp (out of scope)
- **Fuzzy search**: Tìm kiếm mờ, gợi ý khi gõ sai chính tả (có thể làm sau)
- **Search filters**: Bộ lọc tìm kiếm theo category, tags, date range (có thể làm sau)
- **Search history**: Lưu lịch sử tìm kiếm của user (có thể làm sau)
- **Saved searches**: Lưu các tìm kiếm thường dùng (out of scope)
- **Search analytics**: Thống kê từ khóa tìm kiếm phổ biến (có thể làm sau)
