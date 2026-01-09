# US-COURSE-001: Tạo khóa học mới

## User Story Content

**Là một** Giáo viên tự do-INDIVIDUAL

**Tôi muốn** tạo khóa học mới với đầy đủ thông tin cơ bản và học thuật tại trang Quản lý khóa học của hệ thống LMS

**Để** có thể xây dựng nội dung và xuất bản khóa học lên Online Store phục vụ học viên

---

## Assumptions

1. Giáo viên đã đăng nhập vào hệ thống với vai trò Giáo viên tự do
2. Giáo viên đã được cấp quyền tạo khóa học
3. Dữ liệu danh mục (Danh mục, Thẻ kỹ thuật, Ngôn ngữ, Cấp học, Hệ đào tạo, Môn học) đã được cấu hình sẵn
4. Chức năng tải file lên đang hoạt động bình thường
5. Biểu mẫu tạo khóa học được chia thành 3 phần:
   - Phần 1: Thông tin chung
   - Phần 2: Thông tin học thuật & đối tượng
   - Phần 3: Nội dung khóa học (Chương/Bài)

---

## Acceptance Criteria

### AC-1: Truy cập biểu mẫu tạo khóa học mới

**Tại** trang Danh sách khóa học của Giáo viên

**Khi** Giáo viên nhấn vào nút "Tạo Khóa học mới"

**Thì** hệ thống hiển thị biểu mẫu tạo khóa học mới với Phần 1 (Thông tin chung) được hiển thị mặc định, cho phép nhập các trường thông tin.

---

### AC-2: Nhập thông tin Phần 1 - Thông tin chung

**Tại** biểu mẫu tạo khóa học mới, Phần 1 - Thông tin chung

**Khi** Giáo viên nhập đầy đủ các trường bắt buộc

**Thì** hệ thống cho phép Giáo viên chuyển sang Phần 2 bằng nút "Tiếp theo" hoặc nhấn trực tiếp vào Phần 2
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
  <!--- Ảnh/video thumbnail/cover:
    + Tải file ảnh/video
    + Hỗ trợ: Ảnh (JPG, PNG, JPEG) hoặc Video (MP4) 
    + Kích thước đề xuất: 1280x720 
    + Max size: 10MB (ảnh), 100MB (video)
    + Có link tới canva để tự thiết kế cover/ thumbnail -->

---

### AC-3: Upload ảnh/video đại diện

**Tại** form tạo khóa học mới, phần Ảnh/Video đại diện

**Khi** Giáo viên click vào vùng upload và chọn file ảnh (JPG, PNG, max 10MB, khuyến nghị 1280x720) hoặc video (MP4, max 100MB)

**Thì** hệ thống upload file qua đường dẫn tải lên tạm thời, hiển thị thanh tiến trình trong quá trình upload, sau khi hoàn tất hiển thị preview ảnh/video và cho phép xóa để thay thế

| Trường | Kiểu | Bắt buộc | Mô tả | Validation |
|--------|------|----------|-------|------------|
| Ảnh/Video đại diện | File Upload | ✓ | Thumbnail cho khóa học | Filetype: PNG, JPG, JPEG, MP4 <br>  Max size: 10MB (ảnh), 100MB (video) <br> Kích thước đề xuất: 1280x720 <br> Có link tới canva để tự thiết kế cover/ thumbnail        |

---

<!--### AC-4: Nhập thông tin Tab 2 - Thông tin khác

**Tại** form tạo khóa học mới, Tab 2 - Thông tin khác

**Khi** Giáo viên nhập các trường: Cấp học (dropdown), Hệ đào tạo (dropdown), Môn học (dropdown, có thể chọn nhiều), Kỹ năng (multi-select), Mục tiêu học tập (có thể thêm nhiều mục), Yêu cầu đầu vào (danh sách), Đối tượng phù hợp (danh sách), Tags (multi-select hoặc tự nhập)

**Thì** hệ thống lưu tạm thời các thông tin đã nhập và cho phép chuyển sang Tab 3 hoặc quay lại Tab 1

**Inline Business rule**
#### 4.1. Section "Phân loại"

| STT | Trường | Kiểu | Bắt buộc | Mô tả | Ghi chú |
|-----|--------|------|----------|-------|---------|
| 1 | Cấp học, khối lớp | Dropdown | ✗ | VD: Cấp 1 (Lớp 1-5), Cấp 2 (Lớp 6-9)... | Lấy từ Dữ liệu danh mục <br> Ghi chú: Chưa có trong HLD |
| 2 | Độ tuổi | Number input | ✗ | Từ [X] Tuổi - Đến [Y] Tuổi | Độ tuổi phụ thuộc vào cấp học đã chọn <br> Nhập số nguyên dương >0 <br> Tới >= từ <br> Ghi chú: Chưa có trong HLD |
| 3 | Hệ đào tạo | Dropdown | ✗ | VD: Chính quy, Từ xa, Online... | Lấy từ Dữ liệu danh mục <br> Ghi chú: Chưa có trong HLD |
| 4 | Kỹ năng giảng dạy | Dropdown | ✗ | VD: Kỹ năng quản lý lớp, Thuyết trình... | Lấy từ Dữ liệu danh mục <br> Ghi chú: Chưa có trong HLD |
| 5 | Tổng số buổi | Number Input | ✗ | Nhập số buổi <br> Đơn vị: Buổi | Nhập số nguyên dương >0 <br> Ghi chú: Chưa có trong HLD |
| 6 | Thời lượng/ buổi | Number Input | ✗ | Nhập thời lượng cho 1 buổi <br> Đơn vị: giờ | Nhập số nguyên dương >0 <br> Ghi chú: Chưa có trong HLD |

#### 4.2. Section "Yêu cầu & Đối tượng"

| STT | Trường | Kiểu | Bắt buộc | Mô tả | Validation |
|-----|--------|------|----------|-------|------------|
| 1 | Mục tiêu học tập | Dynamic List | ✗ | Những điều học viên sẽ đạt được | - Mỗi item max 300 ký tự <br> - Có nút "+ Thêm Mục tiêu" <br> - Có nút xóa và sắp xếp (↑↓) <br> - Placeholder: "Mục tiêu (VD: Xây dựng được ứng dụng CRUD) số 1" |
| 2 | Yêu cầu đầu vào | Dynamic List | ✗ | Kiến thức học viên cần biết trước | - Mỗi item max 300 ký tự <br> - Có nút "+ Thêm Yêu cầu" <br> - Placeholder: "Yêu cầu số 1" |
| 3 | Đối tượng phù hợp | Dynamic List | ✗ | Ai nên tham gia khóa học | - Mỗi item max 300 ký tự <br> - Có nút "+ Thêm Đối tượng" <br> - Placeholder: "Đối tượng số 1" |

#### 4.3. Section "Thẻ (Tags)"

| Trường | Kiểu | Bắt buộc | Mô tả |
|--------|------|----------|-------|
| Thẻ (Tags) | Tags Input | ✗ | Phân loại chi tiết (VD: SEO, Figma, Backend) |

**UI Notes:**
- Tags input cho phép nhập tự do hoặc chọn từ gợi ý
- Mỗi tag hiển thị với icon X để xóa
- Placeholder: "Thêm thẻ..."-->

---

### AC-5: Lưu khóa học với trạng thái Đã lưu-DRAFT

**Tại** form tạo khóa học mới, sau khi nhập thông tin ở Tab 1 và/hoặc Tab 2

**Khi** Giáo viên click nút "Tạo khóa học"

**Thì** hệ thống thực hiện:
- Tự động tạo mã khóa học theo format: IND-{YYYYMMDD}-{SEQUENCE},
- Lưu khóa học với trạng thái Đã lưu-DRAFT và loại khóa học Giáo viên tự do-INDIVIDUAL, mã giáo viên được gán tự động là ID của Giáo viên đang tạo,
- Hiển thị thông báo "Tạo khóa học thành công" và chuyển đến trang chỉnh sửa khóa học

---

### AC-6: Hủy tạo khóa học

**Tại** form tạo khóa học mới

**Khi** Giáo viên click nút "Hủy bỏ"

**Thì** hệ thống: 
- Hiển thị popup xác nhận "Bạn có chắc chắn muốn hủy? Các thông tin đã nhập sẽ không được lưu" 
- Với 2 tùy chọn: "Tiếp tục chỉnh sửa" và "Xác nhận hủy". 
- Nếu chọn "Xác nhận hủy", quay về trang Danh sách khóa học

---

## Alternative Paths

### ALT-1: Lưu khóa học chỉ với thông tin Tab 1

**Tại** form tạo khóa học mới, Tab 1 - Thông tin chung

**Khi** Giáo viên đã nhập đầy đủ các trường bắt buộc ở Tab 1 và click "Tạo khóa học" mà chưa điền Tab 2

**Thì** hệ thống vẫn cho phép lưu khóa học với trạng thái Đã lưu-DRAFT, các trường ở Tab 2 sẽ có giá trị mặc định hoặc rỗng

---

### ALT-2: Chuyển đổi giữa các Tab tự do

**Tại** form tạo khóa học mới

**Khi** Giáo viên click vào bất kỳ Tab nào trong quá trình nhập liệu

**Thì** hệ thống cho phép chuyển đổi tự do giữa các Tab mà không mất dữ liệu đã nhập, dữ liệu được lưu tạm trên trình duyệt cho đến khi gửi biểu mẫu

---

### ALT-3: Upload file thất bại do kích thước

**Tại** form tạo khóa học mới, phần upload ảnh/video đại diện

**Khi** Giáo viên chọn file có kích thước vượt quá giới hạn cho phép (ảnh > 5MB hoặc video > 100MB)

**Thì** hệ thống hiển thị thông báo lỗi "File vượt quá kích thước cho phép. Ảnh tối đa 5MB, Video tối đa 100MB" và không thực hiện upload

---

## Edge Cases & Error Conditions

### ERR-2: Mất kết nối trong quá trình upload

**Tại** form tạo khóa học mới, đang upload ảnh/video đại diện

**Khi** kết nối mạng bị gián đoạn trong quá trình upload

**Thì** hệ thống hiển thị thông báo lỗi "Upload thất bại do mất kết nối. Vui lòng thử lại" và cho phép Giáo viên thử upload lại

---

### ERR-3: Định dạng file không hợp lệ

**Tại** form tạo khóa học mới, phần upload ảnh/video đại diện

**Khi** Giáo viên chọn file có định dạng không được hỗ trợ (ví dụ: .gif, .bmp, .avi)

**Thì** hệ thống hiển thị thông báo lỗi "Định dạng file không được hỗ trợ. Ảnh chấp nhận: JPG, PNG, JPEG. Video chấp nhận: MP4" và không thực hiện upload

---

### ERR-5: Lỗi hệ thống khi lưu khóa học

**Tại** form tạo khóa học mới

**Khi** Giáo viên click "Tạo khóa học" nhưng máy chủ gặp lỗi hệ thống

**Thì** hệ thống hiển thị thông báo lỗi "Có lỗi xảy ra khi tạo khóa học. Vui lòng thử lại sau" và giữ nguyên dữ liệu đã nhập trên form

---

### ERR-6: Thiếu trường bắt buộc

**Tại** form tạo khóa học mới

**Khi** Giáo viên click "Tạo khóa học" mà chưa điền đầy đủ các trường bắt buộc (Tiêu đề, Ngôn ngữ, Độ khó)

**Thì** hệ thống highlight các trường bị thiếu với viền đỏ, hiển thị thông báo lỗi "Trường này không được để trống" cho từng trường bên dưới và không cho phép gửi biểu mẫu

---

## Inline Business Rules

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|-----------------|-------|---------------|---------|
| Tiêu đề | BR_001 | Bắt buộc nhập | Tối đa 200 ký tự |
| Tiêu đề | BR_002 | Không được chứa ký tự đặc biệt nguy hiểm | Chống mã độc |
| Tiêu đề phụ | BR_003 | Không bắt buộc | Tối đa 300 ký tự |
| Ngôn ngữ | BR_004 | Bắt buộc chọn từ danh sách | Dữ liệu danh mục từ dịch vụ dữ liệu danh mục |
| Độ khó | BR_005 | Bắt buộc chọn một trong: Cơ bản-BEGINNER, Trung bình-INTERMEDIATE, Nâng cao-ADVANCED | Giá trị cố định |
| Mô tả | BR_006 | Không bắt buộc khi tạo, bắt buộc trước khi xuất bản | văn bản định dạng |
| Ảnh đại diện | BR_007 | Không bắt buộc khi tạo, bắt buộc trước khi xuất bản | JPG/PNG, max 5MB, 1280x720 |
| Video đại diện | BR_008 | Tùy chọn | MP4, max 100MB |
| Mã khóa học | BR_009 | Tự động tạo bởi hệ thống | Format: IND-{YYYYMMDD}-{SEQUENCE} |
| Trạng thái | BR_010 | Mặc định Đã lưu-DRAFT khi tạo mới | Không cho phép chỉnh sửa |
| Mục tiêu học tập | BR_011 | Không bắt buộc khi tạo, bắt buộc ít nhất 1 mục trước khi xuất bản | Danh sách |
| Chủ đề (Tags) | BR_012 | Không bắt buộc, có thể chọn nhiều | Dữ liệu danh mục từ dịch vụ dữ liệu danh mục |

---

## System Rules

1. Mỗi khóa học phải có mã khóa học duy nhất trong toàn hệ thống
2. Một Giáo viên tự do-INDIVIDUAL chỉ có thể là giáo viên duy nhất của khóa học do mình tạo
3. Khóa học mới tạo phải có loại khóa học Giáo viên tự do-INDIVIDUAL và trạng thái Đã lưu-DRAFT
4. Đường dẫn tải lên tạm thời cho upload file có thời hạn 15 phút
5. File upload phải được quét virus trước khi lưu trữ
6. Dữ liệu biểu mẫu phải được kiểm tra cả phía trình duyệt và máy chủ

---

## Business Value & Success Metrics

Story này sẽ cung cấp khả năng cho Giáo viên tự do bắt đầu xây dựng khóa học trên nền tảng, là bước đầu tiên trong quy trình tạo và bán khóa học online.

**Trọng số của story này là:** Cao (Critical path)

Story được coi là thành công khi đảm bảo được:

- 100% khóa học được tạo mới có mã khóa học duy nhất
- Thời gian tạo khóa học mới < 3 giây (không tính thời gian upload file)
- Tỷ lệ lỗi khi tạo khóa học < 0.1%
- 95% Giáo viên hoàn thành form tạo khóa học trong lần đầu tiên

---

## Dependencies

| Loại | Mô tả | Ghi chú |
|------|-------|---------|
| Service | dịch vụ quản lý khóa học | Xử lý logic tạo và lưu khóa học |
| Service | dịch vụ quản lý nội dung | Xử lý upload ảnh/video đại diện |
| Service | dịch vụ dữ liệu danh mục | Cung cấp Dữ liệu danh mục (Ngôn ngữ, Danh mục, Tags) |
| Epic | US-COURSE-025 | Xem danh sách khóa học (điểm khởi đầu) |

---

## Impact Analysis

| Đối tượng ảnh hưởng | Mô tả ảnh hưởng |
|---------------------|-----------------|
| Giáo viên tự do-INDIVIDUAL | Có khả năng tạo khóa học mới và bắt đầu xây dựng nội dung |
| Danh sách khóa học | Thêm khóa học mới với trạng thái Đã lưu-DRAFT vào danh sách |
| Hệ thống lưu trữ | Tăng dung lượng lưu trữ do upload ảnh/video đại diện |
| Quy trình xuất bản | Khóa học Đã lưu-DRAFT là điều kiện tiên quyết để tiếp tục xây dựng nội dung và xuất bản |

---

## UI/UX Design

### Wireframe References
- Tab 1 - Thông tin chung: image (13).png
- Tab 2 - Thông tin học thuật & đối tượng: image (15).png
- Tab 3 - Nội dung khóa học: image (16).png

### Mô tả UI chính

**Form tạo khóa học:**
- Header: "Tạo Khóa học mới"
- Tab navigation: Tab 1 | Tab 2 | Tab 3
- Tab 1 gồm:
  - Mã khóa học (readonly, tự tạo)
  - Trạng thái (readonly, hiển thị badge Đã lưu-DRAFT)
  - Tiêu đề (text input, required)
  - Tiêu đề phụ (text input)
  - Ngôn ngữ (dropdown, required)
  - Độ khó (dropdown, required)
  - Mô tả (văn bản định dạng editor)
  - Chủ đề (multi-select tags)
  - Ảnh/Video đại diện (upload zone với drag & drop)
- Footer: Nút "Hủy bỏ" | "Lưu nháp" | "Tiếp theo"

---

## Out of Scope Items

| Item | Lý do |
|------|-------|
| Tạo nội dung bài học (Lecture) | Được xử lý trong US-COURSE-010, US-COURSE-011 |
| Thiết lập giá khóa học | Được xử lý trong EPIC 3: Định giá & Khuyến mãi |
| Xuất bản khóa học | Được xử lý trong US-COURSE-017 |
| Quản lý phiên bản khóa học | Phạm vi phase sau |
| Import khóa học từ file | Phạm vi phase sau |
