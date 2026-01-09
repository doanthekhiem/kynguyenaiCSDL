Nội dung
Là Quản trị viên hệ thống (Admin) hoặc Nhân viên quản lý đào tạo

Tôi muốn xem danh sách tất cả cấp học và khối lớp trong hệ thống

Tại Module Quản lý danh mục > Cấp học, Khối lớp trên ứng dụng School Management System

Để nắm bắt tổng quan cấu trúc giáo dục, quản lý và theo dõi các cấp học, khối lớp đang hoạt động trong hệ thống

Acceptance Criteria
AC-1 - Hiển thị danh sách cấp học dạng cây phân cấp (Happy Path)
Tại: Màn hình "Cấu trúc Hệ thống Giáo dục"

Khi: Người dùng truy cập menu Quản lý danh mục > Cấp học, Khối lớp

Thì: Hệ thống hiển thị danh sách cấp học dạng cây (tree view) với các cột: Tên & Mô tả, Mã định danh, Độ tuổi/Chuẩn, Thứ tự, Trạng thái, Thao tác

Business Rule: Danh sách sắp xếp theo trường level_order (thứ tự) tăng dần.

AC-2 - Mở rộng/Thu gọn để xem khối lớp trong cấp học
Tại: Danh sách cấp học

Khi: Người dùng click vào icon mũi tên (>) bên trái tên cấp học

Thì: Hệ thống mở rộng hiển thị danh sách các khối lớp thuộc cấp học đó, bao gồm: Tên khối, Mã định danh (grade_code), Tuổi chuẩn, Thứ tự trong cấp, Trạng thái

Business Rule: Khối lớp hiển thị thụt lề so với cấp học cha. Icon mũi tên chuyển từ (>) sang (v) khi mở rộng. Khối lớp sắp xếp theo grade_order trong cùng cấp học.

AC-3 - Lọc theo trạng thái
Tại: Thanh công cụ phía trên danh sách

Khi: Người dùng chọn bộ lọc "Trạng thái" với các giá trị: Tất cả / Hoạt động / Ngừng dùng

Thì: Danh sách cập nhật chỉ hiển thị các cấp học/khối lớp theo trạng thái đã chọn

Business Rule: Mặc định filter = "Tất cả".

AC-4 - Tìm kiếm cấp học/khối lớp
Tại: Ô tìm kiếm "Tìm kiếm danh mục..."

Khi: Người dùng nhập từ khóa (tên hoặc mã)

Thì: Hệ thống tìm kiếm và highlight kết quả phù hợp trong cả cấp học và khối lớp

Business Rule: Tìm kiếm không phân biệt hoa/thường, hỗ trợ tìm theo: level_name, level_code, grade_name, grade_code. Kết quả hiển thị realtime sau 300ms debounce.

AC-5 - Thêm nhanh khối lớp từ danh sách (Alternative Path)
Tại: Dòng cấp học đã mở rộng

Khi: Người dùng click vào link "+ Thêm khối lớp mới vào [Tên cấp học]..."

Thì: Hệ thống mở form thêm khối lớp với trường education_level_id đã được điền sẵn cấp học tương ứng

Business Rule: Chỉ hiển thị link thêm nhanh khi cấp học đang ở trạng thái "HOẠT ĐỘNG".

AC-6 - Danh sách rỗng (Edge Case)
Tại: Màn hình danh sách

Khi: Không có dữ liệu cấp học nào trong hệ thống HOẶC không có kết quả tìm kiếm phù hợp

Thì: Hiển thị thông báo "Chưa có dữ liệu. Vui lòng thêm cấp học mới." kèm nút "+ Thêm Cấp học"

AC-7 - Lỗi tải dữ liệu (Error Condition)
Tại: Màn hình danh sách

Khi: Xảy ra lỗi kết nối server hoặc timeout

Thì: Hiển thị thông báo lỗi "Không thể tải dữ liệu. Vui lòng thử lại." với nút "Tải lại"

AC-8 - Kiểm tra quyền truy cập (Error Condition)
Tại: Khi truy cập module

Khi: Người dùng không có quyền VIEW_EDUCATION_LEVEL hoặc VIEW_GRADE

Thì: Chuyển hướng về trang 403 Forbidden với thông báo "Bạn không có quyền truy cập chức năng này"

AC-9 - Không có quyền chỉnh sửa (Error Condition)
Tại: Danh sách cấp học/khối lớp

Khi: Người dùng không có quyền EDIT_EDUCATION_LEVEL hoặc EDIT_GRADE, DELETE_EDUCATION_LEVEL hoặc DELETE_GRADE

Thì: Ẩn menu "Chỉnh sửa", “Xóa” tương ứng trong dropdown actions

AC-10 - Xóa cấp học/khối lớp (Alternative Path)
Tại: Menu actions "..."

Khi: Người dùng chọn "Xóa"

Thì: Hiển thị dialog xác nhận với các điều kiện:

Business Rules:

Cấp học có khối lớp: "Không thể xóa cấp học đang có khối lớp. Vui lòng xóa hết khối lớp trước."

Khối lớp có học sinh: "Không thể xóa khối lớp đang có học sinh theo học."

Không có dữ liệu phụ thuộc: Soft delete (set is_active = false) hoặc hard delete tùy cấu hình hệ thống

Business Value
Cung cấp cái nhìn tổng quan về cấu trúc giáo dục của tổ chức

Hỗ trợ ra quyết định trong việc mở rộng/điều chỉnh các cấp học, khối lớp

Là nền tảng cho các nghiệp vụ khác: phân lớp học sinh, phân công giáo viên, xây dựng chương trình

Success Metrics
Thời gian tải danh sách < 2 giây với 100 cấp học và 1000 khối lớp

Tỷ lệ người dùng tìm được thông tin cần thiết trong 30 giây: > 90%

Tỷ lệ lỗi hiển thị < 0.1%

Dependencies
API: GET /api/v1/education-levels (lấy danh sách cấp học)

API: GET /api/v1/grades?education_level_id={id} (lấy khối lớp theo cấp)

Module Authentication & Authorization

Master Data: education_level, grade tables

Impact Analysis
Ảnh hưởng đến module Quản lý Học sinh (phân lớp theo khối)

Ảnh hưởng đến module Quản lý Giáo viên (phân công theo cấp/khối)

Ảnh hưởng đến module Chương trình đào tạo (gắn với cấp học)

Cần đồng bộ khi có thay đổi cấu trúc cấp học/khối lớp

Wireframe
Menu: https://gemini.google.com/share/1b9782394050 

Màn danh sách: https://gemini.google.com/share/8a585772ea09 

 