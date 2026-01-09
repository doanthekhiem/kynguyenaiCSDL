Nội dung
Là Quản trị viên hệ thống (Admin) hoặc Nhân viên quản lý đào tạo

Tôi muốn xem danh sách tất cả các môn học và nhóm môn trong hệ thống

Tại Module Quản lý danh mục > Môn học trên ứng dụng School Management System

Để nắm bắt tổng quan danh mục môn học, phân loại theo nhóm môn, và quản lý thông tin chi tiết từng môn học

Acceptance Criteria
AC-1 - Hiển thị danh sách môn học dạng cây phân cấp (Happy Path)
Tại: Màn hình "Danh sách môn học"

Khi: Người dùng truy cập menu Quản lý danh mục > Môn học

Thì: Hệ thống hiển thị danh sách môn học dạng cây (tree view) với các cột: Tên & Phân cấp, Mã định danh, Thuộc tính, Thứ tự, Trạng thái, Thao tác

Business Rule: Cấu trúc phân cấp 3 level: Nhóm môn (level 1) > Nhóm môn con/Tổ bộ môn (level 2) > Môn học (level 3). Danh sách sắp xếp theo Thứ tự hiển thị tăng dần trong từng cấp.

AC-2 - Hiển thị thông tin Nhóm môn
Tại: Dòng Nhóm môn trong danh sách

Khi: Dữ liệu được load

Thì: Hiển thị: Tên nhóm môn, Mô tả ngắn, Mã định danh, số lượng mục con (VD: "2 mục con"), Thứ tự, Trạng thái

Business Rule: Nhóm môn cấp cao nhất được đánh dấu là "NHÓM MÔN". Nhóm môn con/Tổ bộ môn được đánh dấu là "Nhóm môn" với font nhỏ hơn. Mô tả hiển thị dưới tên, VD: "Các môn học thuộc khối A, A1, B..."

AC-3 - Hiển thị thông tin Môn học
Tại: Dòng Môn học trong danh sách (level thấp nhất)

Khi: Dữ liệu được load

Thì: Hiển thị: Tên môn học, Tên tiếng Anh (nếu có), Mã định danh, Loại môn (Bắt buộc/Tự chọn), Số tiết chuẩn, Thứ tự, Trạng thái

Business Rule: Môn học hiển thị với icon riêng biệt theo loại (VD: icon máy tính cho Tin học, icon công thức cho Toán). Tên tiếng Anh hiển thị bên dưới tên tiếng Việt.

AC-4 - Mở rộng/Thu gọn cây phân cấp
Tại: Dòng Nhóm môn hoặc Nhóm môn con

Khi: Người dùng click vào icon mũi tên (>) hoặc click vào dòng

Thì: Mở rộng/thu gọn danh sách con bên trong, icon mũi tên chuyển từ (>) sang (v) khi mở rộng

Business Rule: Mặc định: Nhóm môn cấp 1 được mở rộng, các cấp con thu gọn. Trạng thái mở/đóng được lưu trong session.

AC-5 - Mở panel bộ lọc nâng cao
Tại: Thanh công cụ phía trên danh sách

Khi: Người dùng click nút "Bộ lọc"

Thì: Mở rộng panel bộ lọc với các tiêu chí: Trạng thái, Loại môn, Số tiết chuẩn (từ - đến)

Business Rule: Panel bộ lọc có nút "Xóa bộ lọc" để reset và nút "Áp dụng" để thực hiện lọc. Mặc định tất cả = "Tất cả".

AC-6 - Lọc theo trạng thái (Alternative Path)
Tại: Panel bộ lọc

Khi: Người dùng chọn Trạng thái = "Hoạt động" và click "Áp dụng"

Thì: Danh sách chỉ hiển thị các môn học/nhóm môn đang hoạt động

AC-7 - Lọc theo loại môn (Alternative Path)
Tại: Panel bộ lọc

Khi: Người dùng chọn Loại môn = "Bắt buộc" và click "Áp dụng"

Thì: Danh sách chỉ hiển thị các môn học có Loại môn = Bắt buộc (vẫn giữ cấu trúc cây)

Business Rule: Loại môn bao gồm: Tất cả, Bắt buộc, Tự chọn. Khi lọc, nhóm môn vẫn hiển thị nếu có ít nhất 1 môn học con thỏa mãn điều kiện.

AC-8 - Lọc theo số tiết chuẩn (Alternative Path)
Tại: Panel bộ lọc, phần "Số tiết chuẩn"

Khi: Người dùng nhập khoảng giá trị Từ: 50 - Đến: 100 và click "Áp dụng"

Thì: Danh sách chỉ hiển thị các môn học có Số tiết chuẩn từ 50 đến 100 tiết

AC-9 - Tìm kiếm môn học
Tại: Ô tìm kiếm "Tìm theo tên, mã..."

Khi: Người dùng nhập từ khóa (VD: "Toán", "MATH", "Physics")

Thì: Hệ thống tìm kiếm và highlight kết quả phù hợp trong cả môn học và nhóm môn

Business Rule: Tìm kiếm không phân biệt hoa/thường, tìm theo: Tên môn học, Tên tiếng Anh, Mã định danh, Tên nhóm môn. Kết quả realtime sau 300ms debounce.

AC-10 - Thêm nhanh mục mới từ danh sách (Alternative Path)
Tại: Dòng Nhóm môn đã mở rộng

Khi: Người dùng click "+ Thêm mục mới vào [Tên nhóm môn]..." hoặc click icon "+" ở cột Thao tác

Thì: Mở form thêm mới với Nhóm môn cha đã được điền sẵn

Business Rule: Nếu click từ Nhóm môn cấp 1: cho phép thêm Nhóm môn con hoặc Môn học. Nếu click từ Nhóm môn con: chỉ cho phép thêm Môn học.

AC-11 - Danh sách rỗng (Edge Case)
Tại: Màn hình danh sách

Khi: Không có dữ liệu môn học/nhóm môn hoặc không có kết quả tìm kiếm/lọc

Thì: Hiển thị thông báo "Chưa có dữ liệu. Vui lòng thêm nhóm môn hoặc môn học mới." với nút "+ Thêm Nhóm môn"

AC-12 - Lỗi tải dữ liệu (Error Condition)
Tại: Màn hình danh sách

Khi: Xảy ra lỗi kết nối server hoặc timeout

Thì: Hiển thị thông báo lỗi "Không thể tải dữ liệu. Vui lòng kiểm tra kết nối và thử lại." với nút "Tải lại"

AC-13 - Phân quyền
Tại: Màn hình danh sách

Khi: Người dùng thực hiện VIEW, CREATE, EDIT, DELETE môn học, nhóm môn

Thì: Hệ thống kiểm tra người dùng có quyền tương ứng, nếu không có → ẩn button tính năng và hiển thị cảnh báo không có quyền theo US về phân quyền

AC-14 - Xóa môn học (Alternative Path)
Tại: Menu danh sách môn học

Khi: Người dùng chọn "Xóa"

Thì: Kiểm tra dữ liệu phụ thuộc và hiển thị thông báo phù hợp

Business Rules:

Có dữ liệu điểm: "Không thể xóa môn học đang có dữ liệu điểm. Vui lòng vô hiệu hóa thay vì xóa."

Có trong thời khóa biểu: "Không thể xóa môn học đang có trong thời khóa biểu."

Không có dữ liệu phụ thuộc: Hiển thị popup xác nhận "Bạn có chắc muốn xóa môn học [Tên]?". Nếu người dùng Đồng ý -> thực hiện xóa mềm, nếu người dùng chọn Hủy → Đóng popup

AC-7 - Xóa nhóm môn (Alternative Path)
Tại: Menu thao tác của nhóm môn

Khi: Người dùng chọn "Xóa"

Thì: Kiểm tra dữ liệu con và hiển thị thông báo

Business Rule: 

Nếu nhóm môn có mục con (nhóm con hoặc môn học): "Không thể xóa nhóm môn đang có mục con. Vui lòng xóa/di chuyển hết mục con trước."

Không có dữ liệu phụ thuộc: Hiển thị popup xác nhận "Bạn có chắc muốn xóa nhóm môn học [Tên]?". Nếu người dùng Đồng ý -> thực hiện xóa mềm, nếu người dùng chọn Hủy → Đóng popup

Business Value
Cung cấp cái nhìn tổng quan về danh mục môn học theo cấu trúc phân cấp

Hỗ trợ phân loại môn học theo nhóm/tổ bộ môn để dễ quản lý

Theo dõi số tiết chuẩn và loại môn (bắt buộc/tự chọn) cho việc xây dựng thời khóa biểu

Là nền tảng cho việc phân công giảng dạy và đánh giá học sinh

Success Metrics
Thời gian tải danh sách < 2 giây với 200 môn học và 50 nhóm môn

Tỷ lệ người dùng tìm được môn học cần thiết trong 15 giây: > 95%

Tỷ lệ sử dụng bộ lọc: > 50%

Tỷ lệ lỗi hiển thị < 0.1%

Dependencies
API: GET /api/v1/subjects (lấy danh sách môn học)

API: GET /api/v1/subject-groups (lấy danh sách nhóm môn)

Module Authentication & Authorization

Master Data: Bảng Môn học, Bảng Nhóm môn

Impact Analysis
Ảnh hưởng đến module Thời khóa biểu - xếp lịch theo môn

Ảnh hưởng đến module Phân công giảng dạy - gán giáo viên theo môn

Ảnh hưởng đến module Điểm số - nhập điểm theo môn học

Liên kết với Hệ đào tạo và Khung chương trình

Wireframe
https://gemini.google.com/share/5f4e7fe68c45 

 