# US-PIM-002: Tạo sản phẩm thương mại mới

## Nội dung
Là **Quản trị viên của nhà trường/Giáo viên tự do**
Tôi muốn **tạo mới một sản phẩm thương mại để đăng bán trên cửa hàng trực tuyến**
Tại **Màn hình "Quản lý sản phẩm thương mại" trên ứng dụng web quản lý trường học**
Để **giới thiệu và bán các khóa học, chương trình đào tạo đến học sinh, phụ huynh**

---

## Acceptance Criterias

### AC-1 – Truy cập màn hình tạo sản phẩm (Happy Path)
- **Tại:** Màn hình danh sách sản phẩm thương mại
- **Khi:** Người dùng chọn "Tạo sản phẩm mới"
- **Thì:**
  - Hệ thống hiển thị màn hình tạo sản phẩm thương mại mới
  - Form được chia thành **3 phần thông tin chính**:
    1. **Thông tin tổng quan chung**
    2. **Cấu trúc khóa học**
    3. **Cấu hình giá và thuế**

**Inline Business Rule:**
- Sản phẩm mới được tạo với trạng thái "Bản nháp" (DRAFT)
- Người dùng có thể lưu nháp và quay lại chỉnh sửa sau
- Chỉ cho phép chỉnh sửa khi sản phẩm ở trạng thái DRAFT

---

## Phần 1: Thông tin tổng quan chung

### AC-2 – Nhập thông tin tổng quan chung (Happy Path)
- **Tại:** Phần "Thông tin tổng quan chung" trong form tạo sản phẩm
- **Khi:** Người dùng nhập thông tin tổng quan
- **Thì:**
  - Hệ thống hiển thị các trường nhập liệu theo thứ tự:

    **1. Loại sản phẩm (bắt buộc):**
    - Cho phép chọn một trong hai:
      - ☑ Khóa học (Course)
      - ☐ Chương trình học (Program) - **DISABLED (không cho chọn)**
    - Ghi chú hiển thị: "Tính năng Chương trình học đang được phát triển"

    **2. Tên sản phẩm (bắt buộc):**
    - Cho phép nhập tối đa 200 ký tự
    - Placeholder: "Ví dụ: Khóa học Tiếng Anh giao tiếp cơ bản"

    **3. Mã sản phẩm (chỉ đọc):**
    - Hệ thống tự động sinh mã theo định dạng: `PIM-{MÃ_TRƯỜNG}-{YYMMDD}-{SỐ_THỨ_TỰ}`
    - Ví dụ: `PIM-SCH001-251217-001`
    - Số thứ tự tăng dần trong ngày, reset về 001 mỗi ngày mới

    **4. Mô tả sản phẩm (bắt buộc):**
    - Trình soạn thảo văn bản Rich Text Editor
    - Cho phép định dạng: Bold, Italic, Underline, Bullet list, Numbered list
    - Tối đa 5000 ký tự
    - Placeholder: "Mô tả chi tiết về nội dung, lợi ích, đối tượng phù hợp của khóa học..."

    **5. Trạng thái (chỉ đọc):**
    - Dropdown hiển thị trạng thái hiện tại
    - Khi tạo mới: Mặc định hiển thị "Bản nháp (DRAFT)"
    - Không thể thay đổi trạng thái từ form này (phải dùng nút "Hoàn thành" hoặc các chức năng chuyển trạng thái khác)

    **6. Ngày bắt đầu mở bán:**
    - Date picker
    - Cho phép chọn ngày hiện tại hoặc ngày trong tương lai
    - Không bắt buộc

    **7. Ngày kết thúc mở bán:**
    - Date picker
    - Phải sau Ngày bắt đầu mở bán
    - Không bắt buộc

    **8. Ảnh đại diện:**
    - Nút "Upload ảnh"
    - Hiển thị preview ảnh đã upload
    - Định dạng: JPG, PNG
    - Kích thước tối đa: 5MB
    - Kích thước khuyến nghị: 800x600 pixels
    - Không bắt buộc

**Inline Business Rule:**
- Mã sản phẩm được sinh tự động và không thể chỉnh sửa
- MÃ_TRƯỜNG: Mã định danh của trường/giáo viên trong hệ thống
- Ngày kết thúc mở bán phải sau ngày bắt đầu mở bán
- Chương trình học sẽ được enable trong phiên bản tương lai

---

## Phần 2: Cấu trúc khóa học

### AC-3 – Chọn khóa học (Happy Path)
- **Tại:** Phần "Cấu trúc khóa học" trong form tạo sản phẩm
- **Khi:** Người dùng chọn khóa học
- **Thì:**
  - Hệ thống hiển thị:

    **1. Chọn khóa học (bắt buộc):**
    - Dropdown/Search box tìm kiếm khóa học
    - Hiển thị danh sách các Khóa học (Course) của trường đủ điều kiện
    - Mỗi khóa học hiển thị:
      - Tên khóa học
      - Mã khóa học
      - Trạng thái
    - Cho phép tìm kiếm theo tên hoặc mã
    - Bắt buộc chọn một Khóa học

**Inline Business Rule:**
- Bắt buộc phải liên kết với Khóa học
- **Điều kiện trạng thái khóa học được phép chọn:**
  - **Individual (Giáo viên cá nhân):** Chỉ hiển thị Khóa học có trạng thái **PUBLISHED**
  - **Private School (Trường tư thục):** Hiển thị Khóa học có trạng thái **CONTENT_APPROVED**, **PIM_READY**, hoặc **PUBLISHED**

---

### AC-4 – Nhập thông tin phân loại (Happy Path)
- **Tại:** Phần "Cấu trúc khóa học" - Mục "Thông tin phân loại"
- **Khi:** Người dùng nhập thông tin phân loại
- **Thì:**
  - Hệ thống hiển thị các trường lựa chọn:

    **2. Ngôn ngữ giảng dạy:**
    - Dropdown single select
    - Danh sách ngôn ngữ:
      - Tiếng Anh
      - Tiếng Trung
      - Tiếng Hàn
      - Tiếng Nhật
      - Tiếng Pháp
      - Tiếng Đức
      - Tiếng Nga
      - Tiếng Tây Ban Nha
      - Tiếng Việt cho người nước ngoài
    - Không bắt buộc

    **3. Trình độ:**
    - Dropdown single select
    - Danh sách trình độ:
      - Cơ bản
      - Trung cấp
      - Nâng cao
    - Không bắt buộc

    **4. Nhóm môn học:**
    - Dropdown multi-select
    - Danh sách được tải từ danh mục Nhóm môn học đang hoạt động
    - Không bắt buộc

    **5. Môn học (bắt buộc):**
    - Dropdown multi-select
    - Danh sách được tải từ danh mục Môn học đang hoạt động
    - Nếu đã chọn Nhóm môn học, danh sách được lọc theo Nhóm
    - Cho phép chọn nhiều giá trị
    - Bắt buộc chọn ít nhất 1 giá trị

    **6. Chứng chỉ:**
    - Dropdown multi-select
    - Danh sách chứng chỉ:
      - TOEIC
      - IELTS
      - TOEFL
      - HSK (Tiếng Trung)
      - JLPT (Tiếng Nhật)
      - TOPIK (Tiếng Hàn)
      - DELF/DALF (Tiếng Pháp)
      - TestDaF (Tiếng Đức)
      - Khác
    - Không bắt buộc

    **7. Cấp học (bắt buộc):**
    - Dropdown multi-select
    - Danh sách được tải từ danh mục Cấp học đang hoạt động
    - Cho phép chọn nhiều giá trị
    - Bắt buộc chọn ít nhất 1 giá trị

    **8. Khối lớp (bắt buộc):**
    - Dropdown multi-select
    - Danh sách được lọc theo Cấp học đã chọn
    - Cho phép chọn nhiều giá trị
    - Bắt buộc chọn ít nhất 1 giá trị

    **9. Hình thức học:**
    - Radio buttons
    - Các lựa chọn:
      - ○ Online (Trực tuyến)
      - ○ Offline (Trực tiếp tại trung tâm)
      - ○ Hybrid (Kết hợp)
    - Không bắt buộc

**Inline Business Rule:**
- Khi chọn Cấp học, danh sách Khối lớp tự động lọc theo cấp học tương ứng
- Khi chọn Nhóm môn học, danh sách Môn học tự động lọc theo nhóm
- Phân loại giúp học viên tìm kiếm sản phẩm phù hợp

---

### AC-5 – Cấu hình lịch học (Happy Path)
- **Tại:** Phần "Cấu trúc khóa học" - Mục "Cấu hình lịch học"
- **Khi:** Người dùng cấu hình lịch học
- **Thì:**
  - Hệ thống hiển thị các trường nhập liệu:

    **10. Số buổi/tuần:**
    - Input number
    - Cho phép nhập từ 1-7
    - Không bắt buộc
    - Placeholder: "Ví dụ: 3"

    **11. Tổng số buổi:**
    - Input number
    - Cho phép nhập số dương
    - Không bắt buộc
    - Placeholder: "Ví dụ: 48"

    **12. Thời lượng mỗi buổi:**
    - Dropdown single select
    - Các lựa chọn:
      - 45 phút
      - 60 phút
      - 90 phút
      - 120 phút
      - 150 phút
      - 180 phút
      - Khác (cho phép nhập số phút tùy chỉnh)
    - Không bắt buộc

    **13. Thời gian buổi học:**
    - **Thứ trong tuần:** Checkbox multi-select
      - ☐ Thứ 2
      - ☐ Thứ 3
      - ☐ Thứ 4
      - ☐ Thứ 5
      - ☐ Thứ 6
      - ☐ Thứ 7
      - ☐ Chủ nhật

    - **Khung giờ:** Cho phép chọn giờ bắt đầu và giờ kết thúc
      - Từ: Time picker (HH:mm)
      - Đến: Time picker (HH:mm)

    - Không bắt buộc

**Inline Business Rule:**
- Giờ kết thúc phải sau giờ bắt đầu
- Có thể chọn nhiều ngày trong tuần
- Thông tin lịch học là dự kiến, có thể điều chỉnh khi bắt đầu khóa học

---

## Phần 3: Cấu hình giá và thuế

### AC-6 – Cấu hình giá và thuế (Happy Path)
- **Tại:** Phần "Cấu hình giá và thuế" trong form tạo sản phẩm
- **Khi:** Người dùng nhập thông tin giá
- **Thì:**
  - Hệ thống hiển thị các trường nhập liệu:

    **1. Loại:**
    - Radio buttons
    - Các lựa chọn:
      - ○ Có phí
      - ○ Miễn phí
    - Mặc định: Có phí
    - Bắt buộc

    **2. Có hiển thị giá hay không:**
    - Toggle switch (ON/OFF)
    - Mặc định: ON
    - Khi OFF: Giá sẽ không hiển thị trên Online Store, chỉ hiển thị "Liên hệ"
    - Chỉ hiển thị khi chọn "Có phí"

    **3. Giá bán tham chiếu (VND):**
    - Input number
    - Đơn vị: VNĐ
    - Format: Tự động format với dấu phẩy ngăn cách hàng nghìn
    - Placeholder: "Ví dụ: 5,000,000"
    - Chỉ hiển thị khi chọn "Có phí"
    - Không bắt buộc (nhưng khuyến khích nhập nếu chọn "Có hiển thị giá")

    **4. Đơn vị tính:**
    - Dropdown single select
    - Các lựa chọn:
      - Theo khóa học
      - Theo tháng
      - Theo buổi
      - Theo giờ
    - Mặc định: Theo khóa học
    - Chỉ hiển thị khi chọn "Có phí"

    **5. Cấu hình thuế:**
    - Toggle switch "Áp dụng thuế" (ON/OFF)
    - Khi bật:
      - **Loại thuế:** Dropdown chọn từ danh sách thuế đã cấu hình (VAT 10%, VAT 8%, v.v.)
      - **Tỷ lệ thuế:** Hiển thị tự động khi chọn loại thuế (read-only)
      - **Thuế đã bao gồm trong giá:** Checkbox
        - ☐ Giá đã bao gồm thuế
        - ☐ Giá chưa bao gồm thuế (thuế tính thêm)
    - Chỉ hiển thị khi chọn "Có phí"

    **6. Giá khuyến mãi (VND):**
    - Input number
    - Đơn vị: VNĐ
    - Format: Tự động format với dấu phẩy ngăn cách hàng nghìn
    - Phải nhỏ hơn Giá bán tham chiếu
    - Không bắt buộc
    - Chỉ hiển thị khi chọn "Có phí"

    **7. Thời gian khuyến mãi:**
    - Hiển thị khi đã nhập Giá khuyến mãi
    - **Từ ngày:** Date picker
    - **Đến ngày:** Date picker
    - Ngày kết thúc phải sau ngày bắt đầu

**Inline Business Rule:**
- Khi chọn "Miễn phí": Ẩn tất cả các trường về giá, thuế
- Giá khuyến mãi phải nhỏ hơn Giá bán tham chiếu
- Ngày kết thúc khuyến mãi phải sau ngày bắt đầu
- Khi "Có hiển thị giá" = OFF: Giá vẫn được lưu trong hệ thống nhưng không hiển thị trên Online Store

---

## Các chức năng chung của form

### AC-7 – Lưu bản nháp (Happy Path)
- **Tại:** Form tạo sản phẩm
- **Khi:** Người dùng chọn "Lưu nháp"
- **Thì:**
  - Hệ thống thực hiện validate các trường bắt buộc:
    - Loại sản phẩm: Phải chọn (mặc định Khóa học)
    - Tên sản phẩm: Không được để trống, tối đa 200 ký tự
    - Mô tả sản phẩm: Không được để trống, tối đa 5000 ký tự
    - Chọn khóa học: Phải chọn một giá trị
    - Môn học: Phải chọn ít nhất 1 giá trị
    - Cấp học: Phải chọn ít nhất 1 giá trị
    - Khối lớp: Phải chọn ít nhất 1 giá trị
    - Loại (Có phí/Miễn phí): Phải chọn

  - Nếu hợp lệ:
    - Lưu sản phẩm với trạng thái "Bản nháp" (DRAFT)
    - Hiển thị thông báo: "Đã lưu bản nháp thành công"
    - Người dùng có thể tiếp tục chỉnh sửa hoặc quay lại danh sách

  - Nếu không hợp lệ:
    - Hiển thị thông báo lỗi tại các trường không hợp lệ
    - Không thực hiện lưu
    - Cuộn màn hình đến trường lỗi đầu tiên

**Inline Business Rule:**
- Validation chỉ thực hiện khi người dùng nhấn nút "Lưu nháp" hoặc "Hoàn thành"
- Bản nháp không hiển thị trên cửa hàng trực tuyến
- Có thể lưu nhiều lần, hệ thống ghi nhận thời gian cập nhật mới nhất

---

### AC-8 – Hoàn thành sản phẩm (DRAFT → ACTIVE) (Happy Path)
- **Tại:** Form tạo/chỉnh sửa sản phẩm
- **Khi:** Người dùng chọn "Hoàn thành"
- **Thì:**
  - Hệ thống thực hiện validate tất cả các trường bắt buộc như AC-7

  - Nếu hợp lệ:
    - Chuyển trạng thái sản phẩm từ "Bản nháp" (DRAFT) sang "Hoàn thành" (ACTIVE)
    - Ghi nhận thời gian và người thực hiện
    - Hiển thị thông báo: "Sản phẩm đã hoàn thành và sẵn sàng xuất bản"
    - Chuyển về màn hình chi tiết sản phẩm

  - Nếu không hợp lệ:
    - Hiển thị thông báo lỗi tại các trường không hợp lệ
    - Không thực hiện chuyển trạng thái
    - Cuộn màn hình đến trường lỗi đầu tiên

**Inline Business Rule:**
- Sản phẩm ở trạng thái "Hoàn thành" (ACTIVE) vẫn chưa hiển thị trên Online Store
- Muốn hiển thị trên Online Store, người dùng cần thực hiện "Xuất bản" (xem US-PIM-006)
- Khi ở trạng thái ACTIVE, người dùng không thể chỉnh sửa trực tiếp mà phải "Chuyển về nháp" trước

---

### AC-9 – Thông báo lỗi validation (Edge Case)
- **Tại:** Form tạo sản phẩm
- **Khi:** Người dùng nhấn "Lưu nháp" hoặc "Hoàn thành" với dữ liệu không hợp lệ
- **Thì:**
  - Hệ thống hiển thị thông báo lỗi cụ thể tại từng trường:
    - Loại sản phẩm chưa chọn: "Vui lòng chọn loại sản phẩm"
    - Tên sản phẩm trống: "Vui lòng nhập tên sản phẩm"
    - Tên sản phẩm quá dài: "Tên sản phẩm không được vượt quá 200 ký tự"
    - Mô tả trống: "Vui lòng nhập mô tả sản phẩm"
    - Mô tả quá dài: "Mô tả không được vượt quá 5000 ký tự"
    - Ngày kết thúc mở bán trước ngày bắt đầu: "Ngày kết thúc phải sau ngày bắt đầu"
    - Chưa chọn khóa học: "Vui lòng chọn khóa học"
    - Chưa chọn Môn học: "Vui lòng chọn ít nhất một môn học"
    - Chưa chọn Cấp học: "Vui lòng chọn ít nhất một cấp học"
    - Chưa chọn Khối lớp: "Vui lòng chọn ít nhất một khối lớp"
    - Giờ kết thúc trước giờ bắt đầu: "Giờ kết thúc phải sau giờ bắt đầu"
    - Chưa chọn loại (Có phí/Miễn phí): "Vui lòng chọn loại sản phẩm"
    - Giá khuyến mãi lớn hơn giá gốc: "Giá khuyến mãi phải nhỏ hơn giá bán"
    - Ngày kết thúc khuyến mãi trước ngày bắt đầu: "Ngày kết thúc khuyến mãi phải sau ngày bắt đầu"

**Inline Business Rule:**
- Thông báo lỗi hiển thị ngay tại trường có lỗi sau khi nhấn Lưu/Hoàn thành
- Cuộn màn hình đến trường lỗi đầu tiên để người dùng dễ nhận biết
- Hiển thị tổng số lỗi ở đầu form: "Vui lòng kiểm tra {số_lỗi} trường thông tin bên dưới"

---

### AC-10 – Hủy tạo sản phẩm (Alternative Path)
- **Tại:** Form tạo sản phẩm
- **Khi:** Người dùng chọn "Hủy" hoặc đóng form
- **Thì:**
  - Nếu chưa nhập gì:
    - Quay lại màn hình danh sách
  - Nếu đã nhập thông tin:
    - Hiển thị xác nhận: "Thông tin chưa được lưu sẽ bị mất. Bạn có chắc chắn muốn hủy?"
    - Nếu xác nhận: Quay lại màn hình danh sách
    - Nếu không: Tiếp tục ở form tạo

**Inline Business Rule:**
- Xác nhận trước khi hủy giúp tránh mất dữ liệu đã nhập

---

### AC-11 – Lỗi kết nối khi lưu (Error Condition)
- **Tại:** Form tạo sản phẩm
- **Khi:** Không thể lưu do lỗi kết nối hoặc lỗi hệ thống
- **Thì:**
  - Hệ thống hiển thị thông báo: "Không thể lưu sản phẩm. Vui lòng thử lại"
  - Giữ nguyên dữ liệu đã nhập
  - Hiển thị nút "Thử lại"

**Inline Business Rule:**
- Dữ liệu đã nhập không bị mất khi có lỗi
- Hệ thống tự động thử lại trước khi hiển thị lỗi cho người dùng

---

### AC-12 – Chỉnh sửa sản phẩm (Alternative Path)
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Người dùng muốn chỉnh sửa sản phẩm
- **Thì:**
  - Hệ thống kiểm tra trạng thái sản phẩm:

    **Nếu trạng thái = DRAFT:**
    - Cho phép chỉnh sửa tất cả các trường
    - Hiển thị form chỉnh sửa

    **Nếu trạng thái ≠ DRAFT (ACTIVE, PUBLISHED, SUSPENDED):**
    - Không cho phép chỉnh sửa trực tiếp
    - Hiển thị thông báo: "Sản phẩm không ở trạng thái Bản nháp. Vui lòng chuyển về nháp để chỉnh sửa."
    - Hiển thị nút "Chuyển về nháp" (nếu đủ điều kiện)

**Inline Business Rule:**
- Chỉ cho phép chỉnh sửa sản phẩm khi ở trạng thái DRAFT
- Muốn chỉnh sửa ở trạng thái khác, phải chuyển về DRAFT trước
- Từ PUBLISHED/SUSPENDED: Chỉ được chuyển về DRAFT nếu không có học viên đang học và đơn đang xử lý
- Từ ACTIVE: Được chuyển về DRAFT ngay (không cần điều kiện)

---

## Tổng hợp các trường thông tin

### Phần 1: Thông tin tổng quan chung

| STT | Trường | Bắt buộc | Loại | Quy tắc validation |
|-----|--------|----------|------|-------------------|
| 1 | Loại sản phẩm | Có | Radio | Chỉ chọn Khóa học (Chương trình học disabled) |
| 2 | Tên sản phẩm | Có | Text | Không trống, tối đa 200 ký tự |
| 3 | Mã sản phẩm | Tự động | Read-only | Tự động sinh theo format |
| 4 | Mô tả sản phẩm | Có | Rich Text | Không trống, tối đa 5000 ký tự |
| 5 | Trạng thái | Tự động | Dropdown read-only | Hiển thị trạng thái hiện tại |
| 6 | Ngày bắt đầu mở bán | Không | Date | >= Ngày hiện tại |
| 7 | Ngày kết thúc mở bán | Không | Date | > Ngày bắt đầu |
| 8 | Ảnh đại diện | Không | Image | JPG/PNG, max 5MB |

### Phần 2: Cấu trúc khóa học

| STT | Trường | Bắt buộc | Loại | Quy tắc validation |
|-----|--------|----------|------|-------------------|
| 1 | Chọn khóa học | Có | Dropdown | Phải chọn 1 khóa học |
| 2 | Ngôn ngữ giảng dạy | Không | Dropdown | 9 ngôn ngữ |
| 3 | Trình độ | Không | Dropdown | Cơ bản/Trung cấp/Nâng cao |
| 4 | Nhóm môn học | Không | Multi-select | - |
| 5 | Môn học | Có | Multi-select | Ít nhất 1 giá trị |
| 6 | Chứng chỉ | Không | Multi-select | - |
| 7 | Cấp học | Có | Multi-select | Ít nhất 1 giá trị |
| 8 | Khối lớp | Có | Multi-select | Ít nhất 1 giá trị, lọc theo Cấp học |
| 9 | Hình thức học | Không | Radio | Online/Offline/Hybrid |
| 10 | Số buổi/tuần | Không | Number | 1-7 |
| 11 | Tổng số buổi | Không | Number | > 0 |
| 12 | Thời lượng mỗi buổi | Không | Dropdown | 45/60/90/120/150/180 phút |
| 13 | Thứ trong tuần | Không | Checkbox | Thứ 2-CN |
| 14 | Khung giờ (Từ) | Không | Time | HH:mm |
| 15 | Khung giờ (Đến) | Không | Time | > Giờ bắt đầu |

### Phần 3: Cấu hình giá và thuế

| STT | Trường | Bắt buộc | Loại | Quy tắc validation |
|-----|--------|----------|------|-------------------|
| 1 | Loại | Có | Radio | Có phí/Miễn phí |
| 2 | Có hiển thị giá | Không | Toggle | ON/OFF |
| 3 | Giá bán tham chiếu (VND) | Không* | Number | >= 0, format số |
| 4 | Đơn vị tính | Không | Dropdown | Khóa học/Tháng/Buổi/Giờ |
| 5 | Áp dụng thuế | Không | Toggle | ON/OFF |
| 6 | Loại thuế | Không | Dropdown | Từ danh sách thuế đã config |
| 7 | Tỷ lệ thuế | Tự động | Read-only | Từ loại thuế |
| 8 | Thuế đã bao gồm | Không | Checkbox | Có/Không |
| 9 | Giá khuyến mãi (VND) | Không | Number | < Giá bán, >= 0 |
| 10 | Thời gian KM (Từ) | Không** | Date | - |
| 11 | Thời gian KM (Đến) | Không** | Date | > Ngày bắt đầu |

*Không bắt buộc nhưng khuyến khích nếu chọn "Có hiển thị giá"
**Bắt buộc nếu có Giá khuyến mãi

---

## Điều kiện chọn Khóa học theo loại tenant

| Loại Tenant | Trạng thái Khóa học được phép |
|-------------|------------------------------|
| Individual (Giáo viên cá nhân) | PUBLISHED |
| Private School (Trường tư thục) | CONTENT_APPROVED, PIM_READY, PUBLISHED |

---

## Business Value
- **Tăng khả năng tiếp cận học viên**: Cho phép trường đăng bán các khóa học
- **Thông tin chi tiết và rõ ràng**: Form chia thành 3 phần logic giúp nhập liệu dễ dàng
- **Linh hoạt trong quản lý**: Lưu nháp cho phép xây dựng sản phẩm từng bước
- **Hỗ trợ đa dạng ngôn ngữ**: Đặc biệt hữu ích cho trung tâm ngoại ngữ
- **Cấu hình giá linh hoạt**: Hỗ trợ cả miễn phí, có phí, khuyến mãi, thuế
- **Kiểm soát chất lượng**: Trạng thái ACTIVE cho phép review trước khi xuất bản

---

## Success Metrics
- Thời gian tạo sản phẩm mới trung bình <= 10 phút
- Tỷ lệ sản phẩm có đầy đủ thông tin phân loại >= 85%
- Tỷ lệ bản nháp được hoàn thành >= 80%
- Tỷ lệ sản phẩm hoàn thành được xuất bản >= 90%
- Tỷ lệ lỗi validation <= 15%

---

## Tenant Types

US này áp dụng cho cả hai loại tenant:

| Tenant Type | Mô tả | Đặc điểm khác biệt |
|-------------|-------|-------------------|
| **Private School** | Trường tư thục | Chọn Khóa học có trạng thái CONTENT_APPROVED, PIM_READY, hoặc PUBLISHED |
| **Individual** | Giáo viên tự do | Chỉ chọn Khóa học có trạng thái PUBLISHED |

---

## Dependencies
- **Dữ liệu liên quan**:
  - Danh mục: Cấp học, Khối lớp, Môn học, Nhóm môn học, Hệ đào tạo
  - Khóa học (Course)
  - Cấu hình thuế
- **US liên quan**:
  - US-PIM-001 (Danh sách sản phẩm)
  - US-PIM-006 (Xuất bản sản phẩm)
  - US-PIM-007 (Quản lý trạng thái)

---

## Impact Analysis

### Trải nghiệm người dùng
- Form chia thành 3 phần rõ ràng, logic, dễ theo dõi
- Cho phép lưu nháp để hoàn thành dần
- Thông báo lỗi cụ thể giúp sửa nhanh (chỉ hiển thị sau khi nhấn Lưu)
- Auto-format giá tiền giúp dễ đọc
- Disable Chương trình học giúp tránh nhầm lẫn

### Tính toàn vẹn dữ liệu
- Xác thực dữ liệu khi người dùng nhấn Lưu
- Mã sản phẩm tự động sinh theo định dạng chuẩn, đảm bảo duy nhất
- Bắt buộc liên kết với Khóa học đủ điều kiện
- Ghi nhận người tạo và thời gian tạo
- Chỉ cho sửa ở trạng thái DRAFT đảm bảo không ảnh hưởng học viên đang học

### Bảo mật
- Sản phẩm chỉ thuộc về tenant của người tạo
- Bản nháp và sản phẩm hoàn thành không hiển thị ra bên ngoài
- Chỉ hiển thị khóa học thuộc tenant khi chọn

### Hỗ trợ đa ngôn ngữ
- Đặc biệt hữu ích cho trung tâm ngoại ngữ
- Hỗ trợ 9 ngôn ngữ phổ biến
- Phân loại theo trình độ và chứng chỉ
