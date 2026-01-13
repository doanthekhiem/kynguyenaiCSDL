# US-SIS-001-NEW: Quản lý danh sách học sinh

## Nội dung

Là **School Admin hoặc Giáo viên tự do**
Tôi muốn **xem, lọc, tìm kiếm danh sách học sinh và thực hiện các thao tác quản lý trạng thái**
Tại **màn hình "Quản lý học sinh" trên SMS**
Để **quản lý toàn diện danh sách học sinh và thực hiện các thao tác cần thiết ngay trên giao diện chính**

---

## Màn hình/Dialog liên quan

- **Màn hình chính:** Quản lý học sinh (List view với table)
- **Dialog 1:** Kích hoạt học sinh (Single/Bulk)
- **Dialog 2:** Gửi lại email mời (Single/Bulk)
- **Dialog 3:** Tạm ngưng học sinh (Single/Bulk)
- **Dialog 4:** Đình chỉ học sinh (Single/Bulk)
- **Dialog 5:** Kích hoạt lại học sinh (Single/Bulk)
- **Dialog 6:** Xóa học sinh (Single/Bulk)

---

## Acceptance Criteria

### NHÓM 1: Hiển thị và tìm kiếm danh sách

#### AC-1.1 – Hiển thị danh sách học sinh với phụ huynh (Happy Path)
**Nguồn:** US-SIS-004 AC-1

- **Tại:** Màn hình "Quản lý học sinh" trên SMS
- **Khi:** Admin truy cập màn hình danh sách học sinh
- **Thì:**
  - Hiển thị table với các cột:
    - STT
    - Mã học sinh
    - Họ tên học sinh
    - Email học sinh
    - **Họ tên phụ huynh** (nếu có)
    - **Email phụ huynh** (nếu có)
    - Loại học sinh (Nhỏ tuổi / Trưởng thành)
    - Trạng thái
    - Ngày tạo
    - Thao tác (Dropdown menu với các action)
  - Phân trang: 10, 20, 50, 100 dòng/trang
  - Hiển thị tổng số học sinh
  - Các row actions button trong cột "Thao tác"

**Inline Business Rule:**
- Hiển thị trực tiếp tên và email phụ huynh vì mỗi học sinh chỉ có tối đa 1 phụ huynh.
- Nếu học sinh chưa có phụ huynh: hiển thị "-" hoặc "Chưa có".

---

#### AC-1.2 – Lọc và tìm kiếm học sinh (Happy Path)
**Nguồn:** US-SIS-004 AC-2

- **Tại:** Màn hình "Quản lý học sinh" trên SMS
- **Khi:** Admin sử dụng các bộ lọc và ô tìm kiếm
- **Thì:**
  - Bộ lọc bao gồm:
    - **Tìm kiếm theo keyword:** Tên hoặc Email học sinh, Tên hoặc Email phụ huynh
    - **Lọc theo trạng thái:** Chờ kích hoạt, Đang hoạt động, Tạm ngưng, Đình chỉ
    - **Lọc theo loại học sinh:** Nhỏ tuổi, Trưởng thành, Tất cả
    - **Lọc theo phụ huynh:** Có phụ huynh, Chưa có phụ huynh, Tất cả
  - Kết quả cập nhật real-time khi thay đổi bộ lọc
  - Hiển thị số lượng kết quả tìm thấy

**Inline Business Rule:**
- Tìm kiếm không phân biệt hoa thường.
- Có thể kết hợp nhiều bộ lọc cùng lúc.

---

#### AC-1.3 – Empty state khi không có dữ liệu (Edge Case)
**Nguồn:** US-SIS-004 AC-3

- **Tại:** Màn hình "Quản lý học sinh" trên SMS
- **Khi:** Không có dữ liệu hoặc không có kết quả tìm kiếm
- **Thì:**
  - **Trường hợp chưa có học sinh nào:**
    - Hiển thị: "Chưa có học sinh nào trong hệ thống"
    - Nút "Thêm học sinh" và "Import học sinh"
  - **Trường hợp có dữ liệu nhưng không có kết quả lọc:**
    - Hiển thị: "Không tìm thấy học sinh phù hợp với bộ lọc"
    - Nút "Xóa bộ lọc"

**Inline Business Rule:**
- Phân biệt rõ giữa "không có dữ liệu" và "không có kết quả tìm kiếm".

---

#### AC-1.4 – Hiển thị badge Multi-role (Edge Case)
**Nguồn:** US-SIS-004 AC-4

- **Tại:** Màn hình "Quản lý học sinh" trên SMS
- **Khi:** Học sinh có nhiều vai trò trong tenant
- **Thì:**
  - Hiển thị badge "Multi-role" bên cạnh tên học sinh
  - Hover vào badge hiển thị tooltip: "Người dùng này cũng có vai trò: [Giáo viên/Admin/Phụ huynh]"

**Inline Business Rule:**
- Badge giúp Admin nhận biết nhanh học sinh có nhiều vai trò.

---

#### AC-1.5 – Sắp xếp danh sách (Alternative Path)
**Nguồn:** US-SIS-004 AC-6

- **Tại:** Màn hình "Quản lý học sinh" trên SMS
- **Khi:** Admin click vào header cột để sắp xếp
- **Thì:**
  - Cho phép sắp xếp theo:
    - Họ tên (A-Z, Z-A)
    - Email (A-Z, Z-A)
    - Trạng thái
    - Ngày tạo (mới nhất, cũ nhất)
  - Icon mũi tên hiển thị chiều sắp xếp hiện tại

**Inline Business Rule:**
- Mặc định sắp xếp theo ngày tạo (mới nhất trước).

---

#### AC-1.6 – Export danh sách ra Excel (Alternative Path)
**Nguồn:** US-SIS-004 AC-7

- **Tại:** Màn hình "Quản lý học sinh" trên SMS
- **Khi:** Admin nhấn nút "Xuất danh sách"
- **Thì:**
  - Tải file Excel chứa danh sách học sinh đã được lọc
  - Tên file: `DanhSachHocSinh_{TenantName}_{YYYYMMDD}.xlsx`
  - Bao gồm tất cả các cột hiển thị trên table
  - Giữ nguyên thứ tự sắp xếp và bộ lọc hiện tại

**Inline Business Rule:**
- Export danh sách đã được lọc, không export toàn bộ.

---

### NHÓM 2: Kích hoạt học sinh

#### AC-2.1 – Kích hoạt học sinh trưởng thành - Email chưa có SSO (Happy Path)
**Nguồn:** US-SIS-008 AC-1

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Kích hoạt"
- **Khi:** Admin chọn học sinh trưởng thành (`is_minor = false`) đang "Chờ kích hoạt", email chưa có tài khoản SSO, và nhấn "Kích hoạt"
- **Thì:**
  - Hiển thị dialog xác nhận với thông tin học sinh
  - Khi xác nhận:
    - Gọi Keycloak để tạo tài khoản SSO mới
    - Cấp quyền truy cập tenant
    - Cập nhật trạng thái học sinh thành "Đang hoạt động"
    - Gửi email chứa link setup password đến email học sinh
    - Hiển thị thông báo: "Đã kích hoạt học sinh [tên]. Email hướng dẫn đã được gửi đến [email]."

**Inline Business Rule:**
- Học sinh nhận email để tự đặt mật khẩu lần đầu.

---

#### AC-2.2 – Kích hoạt học sinh - Email đã có SSO ACTIVE (Happy Path)
**Nguồn:** US-SIS-008 AC-2

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Kích hoạt"
- **Khi:** Admin kích hoạt học sinh có email đã tồn tại tài khoản SSO ACTIVE trên Keycloak
- **Thì:**
  - KHÔNG tạo tài khoản SSO mới
  - Chỉ cấp thêm quyền truy cập tenant với vai trò Học sinh
  - Cập nhật trạng thái học sinh thành "Đang hoạt động"
  - Gửi email thông báo (không phải setup password): "Bạn đã được cấp quyền Học sinh tại [Tên trường]"
  - Hiển thị thông báo: "Đã kích hoạt học sinh [tên]. Học sinh sử dụng tài khoản hiện có để đăng nhập."

**Inline Business Rule:**
- Nguyên tắc Single Account: 1 email = 1 tài khoản SSO.
- Học sinh sử dụng mật khẩu đã có, không cần đặt lại.

---

#### AC-2.3 – Kích hoạt học sinh nhỏ tuổi có phụ huynh (Happy Path)
**Nguồn:** US-SIS-008 AC-3

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Kích hoạt"
- **Khi:** Admin kích hoạt học sinh nhỏ tuổi (`is_minor = true`) đã có phụ huynh
- **Thì:**
  - Kích hoạt CẢ học sinh VÀ phụ huynh (nếu phụ huynh chưa kích hoạt):
    - Tạo hoặc sử dụng SSO của học sinh
    - Tạo hoặc sử dụng SSO của phụ huynh
    - Cấp quyền tenant cho cả hai
  - Gửi email đến **EMAIL PHỤ HUYNH** (không phải email học sinh)
  - Email bao gồm:
    - Thông tin đăng nhập LMS
    - Link setup password (nếu SSO mới)
    - Hướng dẫn theo dõi con em
  - Hiển thị thông báo: "Đã kích hoạt học sinh [tên] và phụ huynh. Email đã được gửi đến phụ huynh."

**Inline Business Rule:**
- Kích hoạt học sinh nhỏ tuổi Tự ĐỘNG kích hoạt cả phụ huynh.
- Email gửi đến phụ huynh, không gửi đến học sinh.

---

#### AC-2.4 – Lỗi khi kích hoạt học sinh nhỏ tuổi không có phụ huynh (Error Case)
**Nguồn:** US-SIS-008 AC-4

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Kích hoạt"
- **Khi:** Admin cố kích hoạt học sinh nhỏ tuổi chưa có phụ huynh
- **Thì:**
  - Hệ thống KHÔNG cho phép kích hoạt
  - Hiển thị lỗi: "Không thể kích hoạt học sinh nhỏ tuổi chưa có phụ huynh. Vui lòng thêm phụ huynh trước khi kích hoạt."
  - Gợi ý: Link đến "Thêm phụ huynh" hoặc "Liên kết phụ huynh"

**Inline Business Rule:**
- Học sinh nhỏ tuổi BẮT BUỘC có phụ huynh trước khi kích hoạt.

---

#### AC-2.5 – Lỗi khi SSO INACTIVE (Error Case)
**Nguồn:** US-SIS-008 AC-5

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Kích hoạt"
- **Khi:** Email học sinh đã có SSO nhưng trạng thái INACTIVE trên Keycloak
- **Thì:**
  - Hệ thống KHÔNG cho phép kích hoạt
  - Hiển thị lỗi: "Tài khoản SSO của học sinh đang bị vô hiệu hóa. Vui lòng liên hệ EOP (Ecosystem Operators) để hỗ trợ."

**Inline Business Rule:**
- EOP là đơn vị duy nhất có quyền xử lý SSO INACTIVE.

---

#### AC-2.6 – Cảnh báo khi SSO LOCKED (Warning Case)
**Nguồn:** US-SIS-008 AC-6

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Kích hoạt"
- **Khi:** Email học sinh đã có SSO nhưng trạng thái LOCKED (bị khóa do nhập sai password nhiều lần)
- **Thì:**
  - Hệ thống CHO PHÉP kích hoạt
  - Hiển thị cảnh báo: "Tài khoản SSO của học sinh đang bị khóa tạm thời. Học sinh có thể mở khóa qua chức năng 'Quên mật khẩu'. Bạn có muốn tiếp tục kích hoạt?"
  - Khi xác nhận: Thực hiện kích hoạt bình thường

**Inline Business Rule:**
- LOCKED là trạng thái tạm thời, học sinh tự xử lý được.

---

#### AC-2.7 – Kích hoạt học sinh Multi-role (Edge Case)
**Nguồn:** US-SIS-008 AC-7

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Kích hoạt"
- **Khi:** Admin kích hoạt học sinh có Multi-role (đã có vai trò Giáo viên/Admin)
- **Thì:**
  - Chỉ thêm vai trò Học sinh vào tenant user
  - KHÔNG tạo SSO mới (dùng SSO hiện có)
  - Gửi email thông báo (không phải setup password)
  - Hiển thị thông báo: "Đã kích hoạt vai trò Học sinh. Người dùng giờ có [n] vai trò trong hệ thống."

**Inline Business Rule:**
- Multi-role sử dụng chung 1 SSO account.

---

#### AC-2.8 – Lỗi khi kích hoạt học sinh đã ở trạng thái khác (Error Case)
**Nguồn:** US-SIS-008 AC-8

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Kích hoạt"
- **Khi:** Admin cố kích hoạt học sinh không ở trạng thái "Chờ kích hoạt"
- **Thì:**
  - Nút "Kích hoạt" bị ẩn hoặc disable
  - Nếu gọi API: Trả về lỗi "Chỉ có thể kích hoạt học sinh đang ở trạng thái 'Chờ kích hoạt'"

---

#### AC-2.9 – Kích hoạt hàng loạt - Tất cả thành công (Happy Path)
**Nguồn:** US-SIS-009 AC-1

- **Tại:** Màn hình "Quản lý học sinh" → Bulk action "Kích hoạt"
- **Khi:** Admin chọn nhiều học sinh (tối đa 50) đang "Chờ kích hoạt" và nhấn "Kích hoạt hàng loạt"
- **Thì:**
  - Hiển thị dialog xác nhận với:
    - Số lượng học sinh được chọn
    - Cảnh báo: "Tất cả học sinh được chọn sẽ được kích hoạt và nhận email hướng dẫn đăng nhập"
  - Khi xác nhận:
    - Hiển thị progress bar
    - Kích hoạt từng học sinh tuần tự
    - Hiển thị kết quả: "Đã kích hoạt thành công [n] học sinh"

**Inline Business Rule:**
- Giới hạn tối đa 50 học sinh/lần.

---

#### AC-2.10 – Kích hoạt hàng loạt - Một số thành công (Alternative Path)
**Nguồn:** US-SIS-009 AC-2

- **Tại:** Màn hình "Quản lý học sinh" → Bulk action "Kích hoạt"
- **Khi:** Trong danh sách chọn có học sinh không thể kích hoạt (VD: học sinh nhỏ tuổi chưa có phụ huynh)
- **Thì:**
  - Hệ thống xử lý theo "Best Effort":
    - Kích hoạt những học sinh hợp lệ
    - Bỏ qua những học sinh không hợp lệ
  - Hiển thị báo cáo chi tiết:
    - "Đã kích hoạt: [n] học sinh"
    - "Không thể kích hoạt: [m] học sinh"
    - Table hiển thị danh sách học sinh lỗi với lý do cụ thể

**Inline Business Rule:**
- Không rollback nếu có lỗi, cứ kích hoạt được bao nhiêu thì kích hoạt.

---

#### AC-2.11 – Kích hoạt hàng loạt - Tất cả thất bại (Error Case)
**Nguồn:** US-SIS-009 AC-3

- **Tại:** Màn hình "Quản lý học sinh" → Bulk action "Kích hoạt"
- **Khi:** Tất cả học sinh trong danh sách đều không thể kích hoạt
- **Thì:**
  - Hiển thị lỗi: "Không thể kích hoạt bất kỳ học sinh nào"
  - Hiển thị table chi tiết lỗi từng học sinh

---

### NHÓM 3: Gửi lại email

#### AC-3.1 – Gửi lại email cho học sinh trưởng thành (Happy Path)
**Nguồn:** US-SIS-010 AC-1

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Gửi lại email"
- **Khi:** Admin chọn học sinh trưởng thành đã kích hoạt và nhấn "Gửi lại email"
- **Thì:**
  - Hiển thị dialog xác nhận
  - Khi xác nhận:
    - Gửi email chứa thông tin đăng nhập LMS đến email học sinh
    - Hiển thị thông báo: "Đã gửi email đến [email học sinh]"

**Inline Business Rule:**
- Email gửi đến địa chỉ email của học sinh.

---

#### AC-3.2 – Gửi lại email cho học sinh nhỏ tuổi (Happy Path)
**Nguồn:** US-SIS-010 AC-2

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Gửi lại email"
- **Khi:** Admin chọn học sinh nhỏ tuổi đã kích hoạt và nhấn "Gửi lại email"
- **Thì:**
  - Gửi email đến **EMAIL PHỤ HUYNH** (không phải email học sinh)
  - Hiển thị thông báo: "Đã gửi email đến phụ huynh [email phụ huynh]"

**Inline Business Rule:**
- Học sinh nhỏ tuổi: email gửi đến phụ huynh.

---

#### AC-3.3 – Gửi lại email hàng loạt (Alternative Path)
**Nguồn:** US-SIS-010 AC-4

- **Tại:** Màn hình "Quản lý học sinh" → Bulk action "Gửi lại email"
- **Khi:** Admin chọn nhiều học sinh (tối đa 50) và nhấn "Gửi lại email hàng loạt"
- **Thì:**
  - Hiển thị dialog xác nhận
  - Khi xác nhận: Gửi email cho từng học sinh
  - Hiển thị kết quả: "Đã gửi email cho [n] học sinh"

**Inline Business Rule:**
- Giới hạn tối đa 50 người/lần.

---

#### AC-3.4 – Lỗi khi gửi email cho học sinh chưa kích hoạt (Error Case)
**Nguồn:** US-SIS-010 AC-5

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Gửi lại email"
- **Khi:** Admin cố gửi email cho học sinh "Chờ kích hoạt"
- **Thì:**
  - Nút "Gửi lại email" bị ẩn hoặc disable
  - Nếu gọi API: Trả về lỗi "Không thể gửi email cho học sinh chưa kích hoạt. Vui lòng kích hoạt học sinh trước."

**Inline Business Rule:**
- Chỉ gửi được email cho học sinh đã kích hoạt.

---

#### AC-3.5 – Lỗi khi gửi email cho học sinh bị tạm ngưng/đình chỉ (Error Case)
**Nguồn:** US-SIS-010 AC-6

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Gửi lại email"
- **Khi:** Admin cố gửi email cho học sinh đang bị "Tạm ngưng" hoặc "Đình chỉ"
- **Thì:**
  - Nút "Gửi lại email" bị ẩn hoặc disable
  - Hiển thị thông tin: "Học sinh đang bị [Tạm ngưng/Đình chỉ]. Không thể gửi email."

**Inline Business Rule:**
- Không gửi email cho học sinh bị tạm ngưng/đình chỉ.

---

### NHÓM 4: Tạm ngưng học sinh

#### AC-4.1 – Tạm ngưng học sinh đang hoạt động (Happy Path)
**Nguồn:** US-SIS-011 AC-1

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Tạm ngưng"
- **Khi:** Admin chọn học sinh "Đang hoạt động" và nhấn "Tạm ngưng"
- **Thì:**
  - Hiển thị dialog xác nhận với:
    - Thông tin học sinh
    - Trường nhập lý do tạm ngưng (tùy chọn, max 500 ký tự)
  - Khi xác nhận:
    - Cập nhật trạng thái thành "Tạm ngưng"
    - Lưu lý do và thời gian tạm ngưng
    - Hiển thị thông báo: "Đã tạm ngưng học sinh [tên]"
  - Học sinh không thể đăng nhập LMS của tenant này

**Inline Business Rule:**
- Phạm vi: Chỉ trong tenant hiện tại.
- Lý do tạm ngưng là TÙY CHỌN.

---

#### AC-4.2 – Tạm ngưng với lý do (Alternative Path)
**Nguồn:** US-SIS-011 AC-2

- **Tại:** Dialog "Tạm ngưng học sinh"
- **Khi:** Admin nhập lý do tạm ngưng
- **Thì:**
  - Lý do được lưu vào hệ thống
  - Hiển thị trong lịch sử trạng thái
  - Admin khác có thể xem lý do

**Inline Business Rule:**
- Lý do tối đa 500 ký tự.

---

#### AC-4.3 – Tạm ngưng hàng loạt (Alternative Path)
**Nguồn:** US-SIS-011 AC-3

- **Tại:** Màn hình "Quản lý học sinh" → Bulk action "Tạm ngưng"
- **Khi:** Admin chọn nhiều học sinh (tối đa 50) "Đang hoạt động" và nhấn "Tạm ngưng"
- **Thì:**
  - Hiển thị dialog với:
    - Số lượng học sinh
    - Trường lý do chung (tùy chọn)
  - Khi xác nhận: Cập nhật trạng thái cho tất cả
  - Hiển thị kết quả: "Đã tạm ngưng [n] học sinh"

**Inline Business Rule:**
- Giới hạn tối đa 50 học sinh/lần.

---

#### AC-4.4 – Lỗi khi tạm ngưng học sinh chưa kích hoạt (Error Case)
**Nguồn:** US-SIS-011 AC-4

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Tạm ngưng"
- **Khi:** Admin cố tạm ngưng học sinh "Chờ kích hoạt"
- **Thì:**
  - Nút "Tạm ngưng" bị ẩn hoặc disable
  - Nếu gọi API: Trả về lỗi "Không thể tạm ngưng học sinh chưa kích hoạt"

---

#### AC-4.5 – Lỗi khi tạm ngưng học sinh đã bị đình chỉ (Error Case)
**Nguồn:** US-SIS-011 AC-5

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Tạm ngưng"
- **Khi:** Admin cố tạm ngưng học sinh "Đình chỉ"
- **Thì:**
  - Nút "Tạm ngưng" bị ẩn hoặc disable
  - Hiển thị thông tin: "Học sinh đang bị đình chỉ. Không thể chuyển sang trạng thái tạm ngưng."

**Inline Business Rule:**
- Trạng thái "Đình chỉ" nghiêm trọng hơn "Tạm ngưng".

---

#### AC-4.6 – Tạm ngưng học sinh Multi-role (Edge Case)
**Nguồn:** US-SIS-011 AC-7

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Tạm ngưng"
- **Khi:** Admin tạm ngưng học sinh có Multi-role
- **Thì:**
  - Chỉ tạm ngưng vai trò Học sinh
  - Các vai trò khác không bị ảnh hưởng
  - Hiển thị cảnh báo: "Lưu ý: Người dùng này có nhiều vai trò. Chỉ vai trò Học sinh bị tạm ngưng."

---

### NHÓM 5: Đình chỉ học sinh

#### AC-5.1 – Đình chỉ học sinh đang hoạt động (Happy Path)
**Nguồn:** US-SIS-012 AC-1

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Đình chỉ"
- **Khi:** Admin chọn học sinh "Đang hoạt động" và nhấn "Đình chỉ"
- **Thì:**
  - Hiển thị dialog xác nhận với:
    - Thông tin học sinh
    - Trường nhập lý do đình chỉ (**BẮT BUỘC**, min 10, max 500 ký tự)
    - Cảnh báo: "Đình chỉ là hành động kỷ luật. Học sinh sẽ không thể truy cập LMS của trường này cho đến khi được kích hoạt lại."
  - Khi xác nhận:
    - Cập nhật trạng thái thành "Đình chỉ"
    - Lưu lý do và thời gian đình chỉ
    - Hiển thị thông báo: "Đã đình chỉ học sinh [tên]"

**Inline Business Rule:**
- Lý do đình chỉ là BẮT BUỘC (khác với tạm ngưng).

---

#### AC-5.2 – Đình chỉ học sinh đang bị tạm ngưng (Alternative Path)
**Nguồn:** US-SIS-012 AC-2

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Đình chỉ"
- **Khi:** Admin chọn học sinh "Tạm ngưng" và nhấn "Đình chỉ"
- **Thì:**
  - Hệ thống cho phép (nâng mức từ tạm ngưng lên đình chỉ)
  - Hiển thị dialog xác nhận như AC-5.1
  - Khi xác nhận: Cập nhật trạng thái từ "Tạm ngưng" → "Đình chỉ"

**Inline Business Rule:**
- Có thể nâng mức xử lý từ tạm ngưng lên đình chỉ.

---

#### AC-5.3 – Đình chỉ hàng loạt (Alternative Path)
**Nguồn:** US-SIS-012 AC-3

- **Tại:** Màn hình "Quản lý học sinh" → Bulk action "Đình chỉ"
- **Khi:** Admin chọn nhiều học sinh (tối đa 50) và nhấn "Đình chỉ"
- **Thì:**
  - Hiển thị dialog với:
    - Số lượng học sinh
    - Danh sách tên
    - Trường lý do chung (**BẮT BUỘC**)
  - Khi xác nhận: Cập nhật trạng thái cho tất cả hợp lệ
  - Hiển thị kết quả chi tiết

**Inline Business Rule:**
- Giới hạn tối đa 50 học sinh/lần.
- Chỉ áp dụng cho học sinh "Đang hoạt động" hoặc "Tạm ngưng".

---

#### AC-5.4 – Thiếu lý do đình chỉ (Error Case)
**Nguồn:** US-SIS-012 AC-4

- **Tại:** Dialog "Đình chỉ học sinh"
- **Khi:** Admin nhấn "Xác nhận" mà không nhập lý do
- **Thì:**
  - Hiển thị lỗi validation: "Vui lòng nhập lý do đình chỉ"
  - Không submit form
  - Focus vào trường lý do

**Inline Business Rule:**
- Lý do đình chỉ: min 10 ký tự, max 500 ký tự.

---

#### AC-5.5 – Lỗi khi đình chỉ học sinh chưa kích hoạt (Error Case)
**Nguồn:** US-SIS-012 AC-5

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Đình chỉ"
- **Khi:** Admin cố đình chỉ học sinh "Chờ kích hoạt"
- **Thì:**
  - Nút "Đình chỉ" bị ẩn hoặc disable
  - Nếu gọi API: Trả về lỗi "Không thể đình chỉ học sinh chưa kích hoạt. Vui lòng xóa học sinh nếu không cần thiết."

---

#### AC-5.6 – Thông báo phụ huynh khi đình chỉ học sinh nhỏ tuổi (Alternative Path)
**Nguồn:** US-SIS-012 AC-8

- **Tại:** Sau khi đình chỉ học sinh nhỏ tuổi
- **Khi:** Admin đình chỉ học sinh nhỏ tuổi
- **Thì:**
  - Hệ thống tự động gửi email thông báo cho phụ huynh
  - Email bao gồm: thông tin học sinh, lý do đình chỉ, hướng dẫn liên hệ
  - Admin có thể tắt tùy chọn này (checkbox trong dialog)

**Inline Business Rule:**
- Mặc định gửi email cho phụ huynh.

---

### NHÓM 6: Kích hoạt lại học sinh

#### AC-6.1 – Kích hoạt lại học sinh đang bị tạm ngưng (Happy Path)
**Nguồn:** US-SIS-013 AC-1

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Kích hoạt lại"
- **Khi:** Admin chọn học sinh "Tạm ngưng" và nhấn "Kích hoạt lại"
- **Thì:**
  - Hiển thị dialog xác nhận với:
    - Thông tin học sinh
    - Lý do tạm ngưng trước đó (nếu có)
    - Trường nhập ghi chú kích hoạt lại (tùy chọn)
  - Khi xác nhận:
    - Cập nhật trạng thái thành "Đang hoạt động"
    - Lưu thời gian kích hoạt lại và ghi chú
    - Hiển thị thông báo: "Đã kích hoạt lại học sinh [tên]"
  - Học sinh có thể đăng nhập LMS

---

#### AC-6.2 – Kích hoạt lại học sinh đang bị đình chỉ (Happy Path)
**Nguồn:** US-SIS-013 AC-2

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Kích hoạt lại"
- **Khi:** Admin chọn học sinh "Đình chỉ" và nhấn "Kích hoạt lại"
- **Thì:**
  - Hiển thị dialog xác nhận với:
    - Thông tin học sinh
    - Lý do đình chỉ trước đó
    - Trường ghi chú (**khuyến nghị nhập**)
    - Cảnh báo: "Học sinh này đang bị đình chỉ. Vui lòng xác nhận đã xem xét và quyết định cho phép học sinh tiếp tục học tập."
  - Khi xác nhận: Thực hiện như AC-6.1

**Inline Business Rule:**
- Kích hoạt lại từ đình chỉ cần ghi chú rõ ràng.

---

#### AC-6.3 – Kích hoạt lại hàng loạt (Alternative Path)
**Nguồn:** US-SIS-013 AC-3

- **Tại:** Màn hình "Quản lý học sinh" → Bulk action "Kích hoạt lại"
- **Khi:** Admin chọn nhiều học sinh (tối đa 50) "Tạm ngưng" hoặc "Đình chỉ" và nhấn "Kích hoạt lại"
- **Thì:**
  - Hiển thị dialog với:
    - Số lượng học sinh
    - Phân loại: bao nhiêu "Tạm ngưng", bao nhiêu "Đình chỉ"
    - Trường ghi chú chung (tùy chọn)
  - Khi xác nhận: Cập nhật trạng thái cho tất cả
  - Hiển thị kết quả: "Đã kích hoạt lại [n] học sinh"

---

#### AC-6.4 – Lỗi khi kích hoạt lại học sinh đang hoạt động (Error Case)
**Nguồn:** US-SIS-013 AC-4

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Kích hoạt lại"
- **Khi:** Admin cố kích hoạt lại học sinh "Đang hoạt động"
- **Thì:**
  - Nút "Kích hoạt lại" bị ẩn hoặc disable
  - Nếu gọi API: Trả về lỗi "Học sinh đang hoạt động, không cần kích hoạt lại"

---

#### AC-6.5 – Lỗi khi kích hoạt lại học sinh chưa kích hoạt (Error Case)
**Nguồn:** US-SIS-013 AC-5

- **Tại:** Màn hình "Quản lý học sinh" → Row action
- **Khi:** Admin xem học sinh "Chờ kích hoạt"
- **Thì:**
  - Nút "Kích hoạt lại" bị ẩn
  - Hiển thị nút "Kích hoạt" thay thế

---

#### AC-6.6 – Thông báo phụ huynh khi kích hoạt lại học sinh nhỏ tuổi (Alternative Path)
**Nguồn:** US-SIS-013 AC-7

- **Tại:** Sau khi kích hoạt lại học sinh nhỏ tuổi từ "Đình chỉ"
- **Khi:** Admin kích hoạt lại học sinh nhỏ tuổi từ "Đình chỉ"
- **Thì:**
  - Tự động gửi email thông báo cho phụ huynh
  - Email bao gồm: thông tin học sinh, thông tin truy cập LMS
  - Hiển thị thông báo: "Đã gửi email thông báo cho phụ huynh"

**Inline Business Rule:**
- Chỉ gửi email khi kích hoạt lại từ "Đình chỉ", không gửi khi từ "Tạm ngưng".

---

### NHÓM 7: Xóa học sinh

#### AC-7.1 – Xóa học sinh chưa kích hoạt (Happy Path)
**Nguồn:** US-SIS-016 AC-1

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Xóa"
- **Khi:** Admin chọn học sinh "Chờ kích hoạt" và nhấn "Xóa"
- **Thì:**
  - Hiển thị dialog xác nhận với:
    - Thông tin học sinh
    - Cảnh báo: "Bạn có chắc chắn muốn xóa học sinh này? Hành động này không thể hoàn tác."
    - Checkbox: "Tôi hiểu và muốn xóa học sinh này"
  - Khi tick checkbox và nhấn "Xóa":
    - Xóa bản ghi học sinh
    - Xóa liên kết với phụ huynh (nếu có)
    - Hiển thị thông báo: "Đã xóa học sinh [tên]"
    - Quay về danh sách

**Inline Business Rule:**
- Không ảnh hưởng SSO (chưa được tạo).
- Không xóa bản ghi phụ huynh, chỉ xóa liên kết.

---

#### AC-7.2 – Xóa học sinh đã kích hoạt nhưng chưa có dữ liệu học tập (Alternative Path)
**Nguồn:** US-SIS-016 AC-2

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Xóa"
- **Khi:** Admin chọn học sinh đã kích hoạt nhưng chưa có dữ liệu học tập và nhấn "Xóa"
- **Thì:**
  - Hiển thị dialog với cảnh báo nghiêm trọng:
    - "Học sinh này đã được kích hoạt. Xóa sẽ hủy quyền truy cập LMS của học sinh tại tenant này."
    - "Tài khoản SSO của học sinh vẫn tồn tại và có thể được sử dụng ở các tenant khác."
    - Checkbox xác nhận
  - Khi xác nhận:
    - Xóa bản ghi học sinh trong tenant
    - Xóa quyền truy cập tenant
    - KHÔNG xóa SSO trên Keycloak

**Inline Business Rule:**
- Tài khoản SSO KHÔNG bị xóa.
- Cần kiểm tra không có dữ liệu học tập.

---

#### AC-7.3 – Lỗi khi xóa học sinh có dữ liệu học tập (Error Case)
**Nguồn:** US-SIS-016 AC-3

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Xóa"
- **Khi:** Admin cố xóa học sinh đã có dữ liệu học tập
- **Thì:**
  - Hệ thống KHÔNG cho phép xóa
  - Hiển thị lỗi: "Không thể xóa học sinh đã có dữ liệu học tập. Vui lòng sử dụng chức năng 'Đình chỉ' hoặc 'Tạm ngưng' thay thế."
  - Gợi ý: Tạm ngưng, Đình chỉ

**Inline Business Rule:**
- Không xóa học sinh có dữ liệu học tập để bảo toàn lịch sử.

---

#### AC-7.4 – Xóa hàng loạt học sinh chưa kích hoạt (Alternative Path)
**Nguồn:** US-SIS-016 AC-4

- **Tại:** Màn hình "Quản lý học sinh" → Bulk action "Xóa"
- **Khi:** Admin chọn nhiều học sinh (tối đa 50) "Chờ kích hoạt" và nhấn "Xóa"
- **Thì:**
  - Hiển thị dialog với:
    - Số lượng học sinh
    - Danh sách tên
    - Cảnh báo về hành động không thể hoàn tác
    - Checkbox xác nhận
  - Khi xác nhận: Xóa tất cả học sinh được chọn
  - Hiển thị kết quả: "Đã xóa [n] học sinh"

**Inline Business Rule:**
- Chỉ xóa hàng loạt học sinh "Chờ kích hoạt".
- Giới hạn tối đa 50 học sinh/lần.

---

#### AC-7.5 – Xóa học sinh có phụ huynh (Edge Case)
**Nguồn:** US-SIS-016 AC-5

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Xóa"
- **Khi:** Admin xóa học sinh đang có phụ huynh liên kết
- **Thì:**
  - Xóa học sinh thành công
  - Tự động xóa liên kết trong bảng `student_parent`
  - KHÔNG xóa bản ghi phụ huynh
  - Hiển thị thông tin: "Đã xóa học sinh và hủy liên kết với phụ huynh [tên]"

---

#### AC-7.6 – Xóa học sinh có Multi-role (Edge Case)
**Nguồn:** US-SIS-016 AC-6

- **Tại:** Màn hình "Quản lý học sinh" → Row action "Xóa"
- **Khi:** Admin xóa học sinh có Multi-role
- **Thì:**
  - Chỉ xóa vai trò Học sinh
  - Các vai trò khác không bị ảnh hưởng
  - Hiển thị thông tin: "Đã xóa vai trò Học sinh. Người dùng vẫn có các vai trò khác: [danh sách]"

---

## Ma trận cho phép thao tác

| Trạng thái | Kích hoạt | Gửi lại email | Tạm ngưng | Đình chỉ | Kích hoạt lại | Xóa |
|------------|-----------|---------------|-----------|----------|---------------|-----|
| Chờ kích hoạt | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Đang hoạt động | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ (nếu không có dữ liệu) |
| Tạm ngưng | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ (nếu không có dữ liệu) |
| Đình chỉ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ (nếu không có dữ liệu) |

---

## Business Value

- Tập trung tất cả thao tác quản lý học sinh vào 1 màn hình.
- Giảm số lần click và chuyển màn hình.
- Hỗ trợ bulk actions để xử lý nhanh số lượng lớn.
- Phân quyền rõ ràng theo trạng thái học sinh.

---

## Success Metrics

| Chỉ số | Mô tả | Mục tiêu |
|--------|-------|----------|
| Thời gian thao tác | Thời gian trung bình để hoàn thành 1 thao tác | <= 5 giây |
| Tỷ lệ thao tác thành công | % thao tác thành công | >= 99% |
| Tỷ lệ sử dụng bulk action | % Admin sử dụng bulk action khi xử lý >= 3 học sinh | >= 70% |

---

## Dependencies

| Hệ thống/Module | Mô tả phụ thuộc |
|-----------------|-----------------|
| sf-sis | Cập nhật trạng thái học sinh, quản lý liên kết phụ huynh |
| edu-saas-control-identity | Kiểm tra và cấp/thu hồi quyền truy cập tenant |
| Keycloak | Quản lý tài khoản SSO |
| Email Service | Gửi email thông báo |
| LMS | Kiểm tra dữ liệu học tập, kiểm soát truy cập |

---

## ASSUMPTION

1. Admin đã đăng nhập vào SMS với quyền quản lý học sinh.
2. Tất cả thao tác thay đổi trạng thái được lưu vào lịch sử audit.
3. Trạng thái học sinh chỉ ảnh hưởng trong tenant hiện tại.
4. Email thông báo sử dụng template chuẩn của hệ thống.
5. Bulk actions giới hạn tối đa 50 bản ghi/lần để đảm bảo hiệu năng.

---

## Định nghĩa trạng thái học sinh

| Trạng thái | Mô tả | Phạm vi | Ảnh hưởng đến tenant khác |
|------------|-------|---------|---------------------------|
| Chờ kích hoạt (PENDING_INVITATION) | Đã tạo thông tin, chưa có tài khoản SSO hoặc chưa được cấp quyền tenant | Trong tenant | Không |
| Đang hoạt động (ACTIVE) | Đã kích hoạt, có thể truy cập LMS của tenant này | Trong tenant | Không |
| Tạm ngưng (INACTIVE) | Tạm ngừng quyền truy cập LMS của tenant này | Trong tenant | Không - vẫn truy cập được tenant khác |
| Đình chỉ (SUSPENDED) | Vi phạm quy định, không thể truy cập LMS của tenant này | Trong tenant | Không - vẫn truy cập được tenant khác |
