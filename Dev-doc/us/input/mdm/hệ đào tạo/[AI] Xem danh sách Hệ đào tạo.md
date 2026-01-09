Nội dung
Là Quản trị viên hệ thống (Admin) hoặc Nhân viên quản lý đào tạo

Tôi muốn xem danh sách tất cả các hệ đào tạo/chương trình học trong hệ thống

Tại Module Quản lý danh mục > Hệ đào tạo trên ứng dụng School Management System

Để nắm bắt tổng quan các chương trình giáo dục đang áp dụng, theo dõi hiệu lực và quản lý đa dạng hệ đào tạo (quốc gia, quốc tế, tự biên soạn)

Acceptance Criteria
AC-1 - Hiển thị danh sách hệ đào tạo dạng bảng (Happy Path)
Tại: Màn hình "Danh sách Hệ đào tạo"

Khi: Người dùng truy cập menu Quản lý danh mục > Hệ đào tạo

Thì: Hệ thống hiển thị danh sách hệ đào tạo dạng bảng với các cột: TT (số thứ tự), Tên & Mô tả, Mã hệ, Loại & Quốc gia, Hiệu lực, Trạng thái, Thao tác

Business Rule: Danh sách sắp xếp mặc định theo Thứ tự hiển thị tăng dần. Mỗi dòng hiển thị cả Tên hệ đào tạo (tiếng Việt) và Tên tiếng Anh (nếu có).

AC-2 - Hiển thị thông tin Loại & Quốc gia
Tại: Cột "Loại & Quốc gia" trong bảng

Khi: Dữ liệu được load

Thì: Hiển thị Loại hệ đào tạo và Quốc gia tương ứng

Business Rule: Loại hệ đào tạo hiển thị theo giá trị: "Tiêu chuẩn" (chương trình quốc gia), "Quốc tế", "Song ngữ / Quốc tế" (kết hợp). Quốc gia hiển thị tên đầy đủ (VD: Vietnam, United Kingdom, International).

AC-3 - Hiển thị thông tin Hiệu lực
Tại: Cột "Hiệu lực" trong bảng

Khi: Dữ liệu được load

Thì: Hiển thị khoảng thời gian hiệu lực với format: "Từ: YYYY-MM-DD" và "Đến: YYYY-MM-DD" hoặc "Đến: Vô thời hạn"

Business Rule: Nếu Hiệu lực đến không có giá trị (để trống) thì hiển thị "Vô thời hạn".

AC-4 - Mở panel bộ lọc nâng cao
Tại: Thanh công cụ phía trên danh sách

Khi: Người dùng click nút "Bộ lọc"

Thì: Mở rộng panel bộ lọc với các tiêu chí: Trạng thái (dropdown: Tất cả / Hoạt động / Ngừng dùng), Quốc gia (dropdown danh sách quốc gia)

Business Rule: Panel bộ lọc có nút "Xóa bộ lọc" để reset về mặc định và nút "Áp dụng" để thực hiện lọc. Mặc định tất cả bộ lọc = "Tất cả".

AC-5 - Lọc theo trạng thái (Alternative Path)
Tại: Panel bộ lọc đã mở

Khi: Người dùng chọn Trạng thái = "Hoạt động" và click "Áp dụng"

Thì: Danh sách chỉ hiển thị các hệ đào tạo đang hoạt động

AC-6 - Lọc theo quốc gia (Alternative Path)
Tại: Panel bộ lọc

Khi: Người dùng chọn Quốc gia = "Việt Nam" và click "Áp dụng"

Thì: Danh sách chỉ hiển thị các hệ đào tạo có Quốc gia = "Việt Nam"

Business Rule: Dropdown Quốc gia lấy danh sách distinct từ các giá trị Quốc gia đã có trong dữ liệu Hệ đào tạo hiện tại.

AC-7 - Tìm kiếm hệ đào tạo
Tại: Ô tìm kiếm "Tìm tên, mã hệ..."

Khi: Người dùng nhập từ khóa (ví dụ: "Cambridge", "MOET")

Thì: Hệ thống tìm kiếm và hiển thị kết quả phù hợp với từ khóa

Business Rule: Tìm kiếm không phân biệt hoa/thường, tìm theo: Tên hệ đào tạo, Tên tiếng Anh, Mã hệ đào tạo. Kết quả hiển thị realtime sau 300ms debounce.

AC-8 - Hệ đào tạo hết hiệu lực (Edge Case)
Tại: Danh sách hệ đào tạo

Khi: Hệ đào tạo có Hiệu lực đến < ngày hiện tại (đã hết hiệu lực)

Thì: Hiển thị cảnh báo trực quan tại dòng đó để người dùng nhận biết, tooltip "Hệ đào tạo đã hết hiệu lực"

Business Rule: Hệ thống tự động check Hiệu lực đến và cảnh báo. Không tự động chuyển trạng thái, cần admin xác nhận.

AC-9 - Danh sách rỗng (Edge Case)
Tại: Màn hình danh sách

Khi: Không có dữ liệu hệ đào tạo nào hoặc không có kết quả tìm kiếm/lọc

Thì: Hiển thị thông báo "Chưa có dữ liệu hệ đào tạo. Vui lòng thêm mới." với nút "+ Thêm Hệ đào tạo"

AC-10 - Lỗi tải dữ liệu (Error Condition)
Tại: Màn hình danh sách

Khi: Xảy ra lỗi kết nối server hoặc timeout (> 30s)

Thì: Hiển thị thông báo lỗi "Không thể tải dữ liệu. Vui lòng kiểm tra kết nối và thử lại." với nút "Tải lại"

AC-11 - Kiểm tra quyền truy cập (Error Condition)
Tại: Khi truy cập module

Khi: Người dùng không có quyền xem danh sách hệ đào tạo (VIEW_CURRICULUM)

Thì: Chuyển hướng về trang 403 Forbidden với thông báo "Bạn không có quyền truy cập chức năng này"

AC-12 - Không có quyền chỉnh sửa, xóa (Error Condition)
Tại: Danh sách hệ đào tạo

Khi: Người dùng không có quyền EDIT_CURRICULUM, DELETE_CURRICULUM

Thì: Ẩn menu "Chỉnh sửa", “Xóa” tương ứng trong dropdown actions

AC-13 - Cảnh báo khi xóa
Tại: Danh sách hệ đào tạo

Khi: Người dùng chọn đến 1 hệ đào tạo và chọn xóa

Thì: Kiểm tra dữ liệu phụ thuộc và hiển thị thông báo phù hợp

Business Rules:

Có khóa học/chương trình học/sản phẩm đào tạo (PIM) đang active và gắn với hệ đào tạo: "Không thể xóa hệ đào tạo với các khóa học/chương trình học còn đang hoạt động. Vui lòng vô hiệu hóa thay vì xóa."

Không có dữ liệu phụ thuộc: Hiển thị xác nhận "Bạn có chắc muốn xóa môn hệ đào tạo[Tên]?" Xác nhận → thực hiện xóa mềm, Hủy → đóng form

Business Value
Cung cấp cái nhìn tổng quan về các chương trình giáo dục đang áp dụng

Hỗ trợ quản lý đa dạng hệ đào tạo: chương trình quốc gia (Bộ GD&ĐT), quốc tế (Cambridge, IB), tự biên soạn

Theo dõi hiệu lực của từng chương trình để đảm bảo tuân thủ quy định

Là nền tảng cho việc gắn kết môn học, khung chương trình với hệ đào tạo

Success Metrics
Thời gian tải danh sách < 2 giây với 50 hệ đào tạo

Tỷ lệ người dùng tìm được hệ đào tạo cần thiết trong 20 giây: > 95%

Tỷ lệ sử dụng bộ lọc: > 60% trong các phiên làm việc

Tỷ lệ lỗi hiển thị < 0.1%

Dependencies
API: GET /api/v1/curriculums (lấy danh sách hệ đào tạo)

API: GET /api/v1/curriculums?status={status}&country={country} (lọc)

Module Authentication & Authorization

Master Data: Bảng Hệ đào tạo

Impact Analysis
Ảnh hưởng đến tính năng tạo khóa học, tạo sản phẩm đào tạo (PIM) có gán với hệ đào tạo

Liên kết với thông tin tuyển sinh (học sinh đăng ký theo chương trình)

Wireframe
https://gemini.google.com/share/254f07bdb14f 

 

 