# US-PS-001 - Tạo course khung

## User story

Là một **School Admin của trường tư nhân**

Tôi muốn thực hiện **tạo khóa học khung với thông tin cơ bản** tại **School Management Portal**

Để **thiết lập nền tảng cho việc mời giáo viên cộng tác xây dựng nội dung**

---

## Acceptance Criteria

### AC-1: Tạo course khung thành công với đầy đủ thông tin bắt buộc

- **Tại** màn hình danh sách khóa học của trường
- **Khi** School Admin click nút "Tạo khóa học mới" và nhập đầy đủ thông tin:
  - Mã khóa học (Tạo tự động, không hiển thị trên giao diện tạo mới)
  - Môn học (Bắt buộc, chọn 1 giá trị, Danh mục môn học lấy trong MDM)
    + Ngữ văn
    + Toán
    + Lịch sử
    + Địa lý
    + Khoa học tự nhiên
    + Vật lý
    + Hóa học
    + Sinh học
    + Tin học
    + Công nghệ
    + Giáo dục công dân
    + Âm nhạc
    + Mỹ thuật
    + Giáo dục thể chất
    + Tiếng Anh
    + Tiếng Trung
    + Tiếng Hàn
    + Tiếng Nhật
  - Chủ đề (bắt buộc, dropdown chọn 1, Danh mục chủ đề lấy trong MDM. Các giá trị của Chủ đề đi theo {Môn học} đã chọn)
  - Đối tượng phù hợp (bắt buộc, dropdown chọn 1)
    + Mẫu giáo
    + Tiểu học
    + Trung học cơ sở
    + Trung học phổ thông
    + Giáo dục bậc cao
    + Không cụ thể
    + Chứng chỉ (enable khi chọn {Môn học} = Tiếng Anh, Tiếng Hàn, Tiếng Trung, Tiếng Nhật)
  - Lớp (bắt buộc, dropdown chọn 1, hiển thị khi chọn giá trị hiển thị theo {Đối tượng} đã chọn = Tiểu học/ Trung học cơ sở/ Trung học phổ thông), các giá trị của từng cấp hiển thị theo rule:
    + Tiểu học:
      - Lớp 1
      - Lớp 2
      - Lớp 3
      - Lớp 4
      - Lớp 5
    + Trung học cơ sở 
      - Lớp 6
      - Lớp 7
      - Lớp 8
      - Lớp 9
    + Trung học phổ thông 
      - Lớp 10
      - Lớp 11
      - Lớp 12
  - Trình độ (bắt buộc, dropdown chọn 1, hiển thị giá trị theo {Đối tượng} đã chọn = Giáo dục bậc cao/ Không cụ thể)
    + Cơ bản
    + Trung cấp
    + Nâng cao
    + Tất cả
  - Chứng chỉ (Bắt buộc, dropdown chọn 1, giá trị theo {Đối tượng} đã chọn = Chứng chỉ. Chửng chỉ chỉ trả ra theo {môn} đã chọn tương ứng)
    + Tiếng Anh
      - IELTS
      - TOEIC
      - TOEFL
    + Tiếng Trung
      - HSK1
      - HSK2
      - HSK3
      - HSK4 
      - HSK5
      - HSK6
      - YCT1
      - YCT2
      - YCT3
      - YCT4
    + Tiếng Hàn
      - TOPIK I
      - TOPIK II
    + Tiếng Nhật
      - JLPT
  - Ngôn ngữ giảng dạy: (bắt buộc, chọn 1 ngôn ngữ sẽ dùng khi dạy):
    + Tiếng Việt (mặc định)
    + Tiếng Anh
  - Tiêu đề khóa học (bắt buộc, nhập text, giới hạn 255 ký tự)
  - Mô tả khóa học (bắt buộc, nhập text, giới hạn 1000 ký tự)
  - Tóm tắt ngắn (bắt buộc, nhập text, giới hạn 500 ký tự)
  - Hình thức học (bắt buộc, chọn 1 giá trị)
    + Lớp live
    + Video bài giảng
    + Kết hợp
  - Số buổi học (bắt buộc, nhập tổng số buổi học dự tính cho khóa. Đơn vị: buổi, cho phép nhập số nguyên dương)
  - Thời lượng / buổi: (bắt buộc nếu nhập số buổi học, đơn vị: Phút, nhập số nguyên dương)
  - Bài tập về nhà (bắt buộc)
    + Có
    + Không
  - Đầu ra học tập: Những điều học viên sẽ đạt được 
    + Mỗi item max 300 ký tự 
    + Có nút "+ Thêm đầu ra" 
    + Có nút xóa và sắp xếp (↑↓) 
  - Ảnh/video thumbnail/cover:
    + Tải file ảnh
    + Hỗ trợ: Ảnh (JPG, PNG, JPEG) hoặc Video (MP4) 
    + Kích thước đề xuất: 1280x720 
    + Max size: 10MB (ảnh), 100MB (video)
    + Có link tới canva để tự thiết kế cover/ thumbnail

- **Thì** hệ thống:
  - Tạo khóa học mới thuộc sở hữu của trường (loại: Trường tư - Social school)
  - Tự động sinh mã khóa học duy nhất (định dạng: PS-XXXX-YYYY-NNN)
  - Đặt trạng thái khóa học là **Đã lưu**
  <!--- Chưa gán giảng viên cụ thể (vì sẽ mời nhiều giảng viên cộng tác sau) 
  - Tạo quy trình phê duyệt với bước đầu tiên là **Thiết kế cấu trúc chương trình** -->
  - Hiển thị thông báo "Tạo khóa học thành công"
  - Chuyển hướng đến màn hình "Mời giáo viên biên soạn"

### AC-2: Validate thông tin bắt buộc khi tạo course

- **Tại** form tạo khóa học mới
- **Khi** School Admin bỏ trống một trong các trường bắt buộc
- **Thì** hệ thống:
  - Không cho phép submit form
  - Hiển thị thông báo lỗi màu đỏ ngay dưới trường bị thiếu
  - Focus vào trường lỗi đầu tiên
  - Không tạo khóa học mới
  - Hiển thị Inline error message "Trường này không được để trống"

### AC-3: Validate độ dài tiêu đề khóa học

- **Tại** form tạo khóa học, trường "Tiêu đề khóa học"
- **Khi** School Admin nhập tiêu đề có độ dài:
  - Nhỏ hơn 10 ký tự HOẶC
  - Lớn hơn 255 ký tự
- **Thì** hệ thống:
  - Hiển thị thông báo "Tiêu đề phải từ 10 đến 255 ký tự"
  - Không cho phép submit form
  - Hiển thị số ký tự hiện tại /255

### AC-4: Validate độ dài mô tả khóa học

- **Tại** form tạo khóa học, trường "Mô tả khóa học"
- **Khi** School Admin nhập Mô tả khóa học có độ dài:
  - Nhỏ hơn 10 ký tự HOẶC
  - Lớn hơn 1000 ký tự
- **Thì** hệ thống:
  - Hiển thị thông báo "Mô tả khóa học phải từ 10 đến 1000 ký tự"
  - Không cho phép submit form
  - Hiển thị số ký tự hiện tại /1000

### AC-4: Validate độ dài tóm tắt ngắn

- **Tại** form tạo khóa học, trường "Tóm tắt ngắn"
- **Khi** School Admin nhập tóm tắt ngắn có độ dài:
  - Nhỏ hơn 10 ký tự HOẶC
  - Lớn hơn 500 ký tự
- **Thì** hệ thống:
  - Hiển thị thông báo "Tóm tắt ngắn phải từ 10 đến 500 ký tự"
  - Không cho phép submit form
  - Hiển thị số ký tự hiện tại /500

### AC-5: Validate trường số buổi học

- **Tại** form tạo khóa học
- **Khi** School Admin nhập quá giới hạn ký tự tại các trường có giới hạn
- **Thì** hệ thống:
  - Hiển thị thông báo "Tối đa {Số lượng ký tự giới hạn} ký tự"
  - Không cho phép submit form
  - Hiển thị số ký tự hiện tại /255

### AC-6: Validate danh sách đầu ra học tập

- **Tại** form tạo khóa học, mục "Đầu ra học tập"
- **Khi** School Admin:
  - Không thêm đầu ra nào (danh sách rỗng) HOẶC
  - Thêm đầu ra nhưng để trống nội dung HOẶC
  - Thêm đầu ra có nội dung dưới 20 ký tự
- **Thì** hệ thống:
  - Hiển thị thông báo "Phải có ít nhất 1 mục tiêu học tập, mỗi mục tiêu ít nhất 20 ký tự"
  - Không cho phép submit form
  - Highlight mục tiêu bị lỗi

### AC-7: Validate danh sách đầu ra học tập

- **Tại** form tạo khóa học, mục "Bằng cấp, chứng chỉ"
- **Khi** School Admin:
  - Không thêm bằng cấp, chứng chỉ nào (danh sách rỗng) HOẶC
  - Thêm bằng cấp, chứng chỉ nhưng để trống nội dung HOẶC
  - Thêm bằng cấp, chứng chỉ có nội dung dưới 10 ký tự
- **Thì** hệ thống:
  - Hiển thị thông báo "Phải có ít nhất 1 mục tiêu học tập, mỗi mục tiêu ít nhất 20 ký tự"
  - Không cho phép submit form
  - Highlight mục tiêu bị lỗi

### AC-8: Tự động sinh mã khóa học duy nhất

- **Tại** quá trình tạo khóa học mới
- **Khi** School Admin submit form tạo khóa học hợp lệ
- **Thì** hệ thống:
  - Tự động sinh mã khóa học theo định dạng: PS-[Năm hiện tại]-[Số thứ tự tự tăng]
  - Ví dụ: PS-2025-01, PS-2025-02
  - Đảm bảo mã khóa học là duy nhất trong hệ thống
  - Hiển thị mã khóa học trên màn hình xác nhận
  - Lưu mã khóa học vào hệ thống

### AC-9: Xử lý trường hợp nhập tiếng Việt có dấu

- **Tại** form tạo khóa học, tất cả các trường text
- **Khi** School Admin nhập tiếng Việt có dấu vào các trường thông tin
- **Thì** hệ thống:
  - Lưu trữ chính xác ký tự tiếng Việt có dấu (UTF-8)
  - Hiển thị đúng khi preview
  - Không bị lỗi font hoặc mã hóa

### AC-10: Hủy tạo khóa học và quay lại danh sách

- **Tại** form tạo khóa học mới
- **Khi** School Admin click nút "Hủy" hoặc nút "X" đóng form
- **Thì** hệ thống:
  - Hiển thị hộp thoại xác nhận "Bạn có chắc muốn hủy? Dữ liệu đã nhập sẽ không được lưu"
  - Nếu Admin chọn "Đồng ý":
    - Không lưu dữ liệu đã nhập
    - Quay về màn hình danh sách khóa học
  - Nếu Admin chọn "Tiếp tục chỉnh sửa":
    - Giữ nguyên form với dữ liệu đã nhập

### AC-11: Xử lý lỗi khi không kết nối được database

- **Tại** quá trình submit form tạo khóa học
- **Khi** hệ thống không kết nối được database hoặc xảy ra lỗi server
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi "Không thể tạo khóa học. Vui lòng thử lại sau"
  - Giữ nguyên dữ liệu Admin đã nhập trên form
  - Ghi log lỗi vào hệ thống
  - Gửi notification đến technical team

### AC-12: Xử lý trường hợp mạng bị gián đoạn khi submit

- **Tại** quá trình submit form tạo khóa học
- **Khi** mạng bị gián đoạn giữa chừng
- **Thì** hệ thống:
  - Hiển thị loading spinner trong tối đa 30 giây
  - Nếu sau 30 giây vẫn không có response:
    - Hiển thị thông báo "Mất kết nối. Vui lòng kiểm tra mạng và thử lại"
    - Giữ nguyên dữ liệu đã nhập
    - Cho phép Admin retry bằng cách click lại nút "Tạo khóa học"

### AC-13: Kiểm tra quyền truy cập trước khi cho phép tạo khóa học

- **Tại** màn hình danh sách khóa học
- **Khi** người dùng KHÔNG có vai trò "Quản trị viên nhà trường"
- **Thì** hệ thống:
  - Không hiển thị nút "Tạo khóa học mới"
  - Nếu người dùng cố gắng truy cập URL trực tiếp:
    - Chuyển hướng về trang chủ
    - Hiển thị thông báo "Bạn không có quyền tạo khóa học"

---

## Inline Business Rule

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Tiêu đề khóa học | BR-PS-001 | Bắt buộc nhập | Required field |
| Tiêu đề khóa học | BR-PS-002 | Độ dài từ 10-255 ký tự | Min 10, Max 255 chars |
| Tiêu đề khóa học | BR-PS-003 | Hỗ trợ tiếng Việt có dấu | UTF-8 encoding |
| Mô tả khóa học | BR-PS-004 | Có bắt buộc | Required field |
| Mô tả khóa học | BR-PS-005 | Tối đa 1000 ký tự nếu nhập | Min 10, Max 1000 chars |
| Tóm tắt ngắn | BR-PS-006 | Có bắt buộc | Required field |
| Tóm tắt ngắn | BR-PS-007 | Tối đa 500 ký tự nếu nhập | Min 10, Max 500 chars |
| Ngôn ngữ | BR-PS-008 | Bắt buộc chọn | Default: Tiếng Việt |
| Ngôn ngữ | BR-PS-009 | Chỉ cho phép: Tiếng Việt, English | Enum values |
| Đối tượng phù hợp | BR-PS-016 | Bắt buộc nhập | Required field |
| Đầu ra | BR-PS-008 | Bắt buộc có ít nhất 1 đầu ra | Min 1 item |
| Đầu ra | BR-PS-009 | Mỗi đầu ra ít nhất 20 ký tự | Min 20 chars per item |
| Đầu ra | BR-PS-010 | Tối đa 10 mục tiêu | Max 10 items |
| Mã khóa học | BR-PS-012 | Tự động sinh, không cho phép sửa | Hệ thống tự tạo |
| Mã khóa học | BR-PS-013 | Định dạng: PS-[Năm hiện tại]-[STT tự tăng] | Mã duy nhất |
| Loại sở hữu | BR-PS-014 | Tự động gán = "Social school" | Trường thông tin hệ thống |

---

## System Rule

- Course của SOCIAL PRIVATE_SCHOOL phải có owner_type = "SCHOOL" và instructor_id = NULL
- Mã khóa học phải duy nhất trong toàn hệ thống (unique constraint trên course_code)
- Course mới tạo luôn ở trạng thái DRAFT
- Workflow approval tự động được tạo với current_step = "STRUCTURE_CREATION"
- Hệ thống lưu trữ created_by = user_id của School Admin tạo course
- Timestamp created_at tự động được ghi nhận
- tenant_id tự động được fill bằng school_id của Admin đang login

---

## Business Value & Success Metrics

Story này sẽ cung cấp **khả năng cho trường tư nhân tạo khóa học khung để sau đó mời nhiều giáo viên cộng tác xây dựng nội dung, tăng chất lượng và hiệu quả giảng dạy**

Trọng số của story này là **5** (vì đây là bước đầu tiên, nền tảng cho toàn bộ quy trình collaborative content building)

Story được coi là thành công khi nó đảm bảo được:
- 100% Quản trị viên nhà trường có quyền tạo được khung khóa học
- Thời gian tạo khóa học < 3 phút (từ nhấn "Tạo mới" đến hoàn tất thành công)
- Tỷ lệ lỗi khi tạo khóa học < 1%
- 100% khóa học được tạo có mã khóa học duy nhất
- 100% khóa học được tạo có bản ghi quy trình phê duyệt tương ứng

---

## Dependencies

- **Service**: lf-course (backend service quản lý khóa học)
- **Service**: sf-graph (GraphQL BFF)
- **Service**: sf-mdm (lấy danh sách ngôn ngữ, môn học)
- **US-PS-002**: Story này phải hoàn thành trước khi chuyển sang thiết kế cấu trúc chương trình
- **Authentication**: SSO service phải xác thực Quản trị viên đã đăng nhập
- **Authorization**: RBAC service phải kiểm tra Quản trị viên có vai trò "Quản trị viên nhà trường"

---

## Impact Analysis

- **Frontend**: Tạo màn hình mới "Tạo khóa học (Trường tư)" với form đầy đủ validation
- **Backend**: API endpoint tạo khóa học (với logic riêng cho Trường tư)
- **Business**: Cho phép trường tạo khóa học collaborative, mở rộng mô hình kinh doanh
- **User Experience**: Quản trị viên có trải nghiệm tạo khóa học rõ ràng, validate realtime
- **Performance**: Mỗi trường có thể tạo không giới hạn số lượng khóa học

---

## UI/UX Design
Link mockup: https://gemini.google.com/share/230ba5579d7b
**Màn hình: Create Course (PRIVATE_SCHOOL)**

```
┌─────────────────────────────────────────────────────────────┐
│ School Management Portal          [User Menu] [Logout]      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ← Danh sách khóa học                                       │
│                                                              │
│  Tạo khóa học mới                                           │
│  ═══════════════════════════════════════════════            │
│                                                              │
│  Thông tin cơ bản                                           │
│  ─────────────────────────────────────────────────          │
│                                                              │
│  Tiêu đề khóa học *                                         │
│  ┌───────────────────────────────────────────────┐          │
│  │ Toán học THPT - Chương trình nâng cao         │ 45/255  │
│  └───────────────────────────────────────────────┘          │
│                                                              │
│  Tiêu đề phụ                                                │
│  ┌───────────────────────────────────────────────┐          │
│  │ Dành cho học sinh lớp 10, 11, 12              │ 35/500  │
│  └───────────────────────────────────────────────┘          │
│                                                              │
│  Ngôn ngữ giảng dạy *                                       │
│  ┌───────────────────┐                                      │
│  │ Tiếng Việt     ▼ │                                      │
│  └───────────────────┘                                      │
│                                                              │
│  Đối tượng phù hợp *                                        │
│  ┌───────────────────────────────────────────────┐          │
│  │ Học sinh THPT lớp 10, 11, 12                 │ 35/500  │
│  └───────────────────────────────────────────────┘          │
│                                                              │
│  Mục tiêu học tập *                                         │
│  ┌───────────────────────────────────────────────┐          │
│  │ 1. Nắm vững kiến thức đại số và giải tích   │ [Xóa]   │
│  │ 2. Phát triển tư duy logic và sáng tạo      │ [Xóa]   │
│  │ 3. Chuẩn bị tốt cho kỳ thi THPT Quốc gia    │ [Xóa]   │
│  └───────────────────────────────────────────────┘          │
│  [+ Thêm mục tiêu]                                          │
│                                                              │
│  Yêu cầu đầu vào                                            │
│  ┌───────────────────────────────────────────────┐          │
│  │ • Đã hoàn thành chương trình Toán THCS       │          │
│  │ • Có nền tảng cơ bản về đại số                │          │
│  └───────────────────────────────────────────────┘          │
│  [+ Thêm yêu cầu]                                           │
│                                                              │
│                                                              │
│  ┌────────┐  ┌──────────────────┐                          │
│  │  Hủy   │  │ Tạo khóa học ▶ │                          │
│  └────────┘  └──────────────────┘                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Form validation realtime:**
- Hiển thị số ký tự đếm ngược (X/255)
- Error message màu đỏ ngay dưới field lỗi
- Success checkmark màu xanh khi field hợp lệ
- Disable nút "Tạo khóa học" khi có lỗi
- Loading spinner khi đang submit

---

## Out of Scope Item

### Business Operations:
- Import khóa học từ file Excel hoặc CSV
- Tạo nhiều khóa học cùng lúc (bulk create)
- Clone/Copy từ khóa học có sẵn
- Template khóa học có sẵn

### Technical:
- Auto-save draft khi Admin nhập liệu
- Version control cho course metadata
- Audit log chi tiết từng field thay đổi
- Multi-language interface (chỉ support tiếng Việt)

### Features:
- Upload hình thu nhỏ course ngay khi tạo (sẽ làm ở bước sau)
- Thiết lập pricing ngay khi tạo (pricing là bước cuối)
- Preview course trước khi tạo
- AI suggest mục tiêu học tập
