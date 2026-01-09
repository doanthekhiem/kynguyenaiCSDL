Nội dung
Là Quản trị viên hệ thống (Admin) hoặc Nhân viên quản lý nhân sự

Tôi muốn xem danh sách tất cả các kỹ năng giảng dạy và nhóm kỹ năng trong hệ thống

Tại Module Quản lý danh mục > Kỹ năng giảng dạy trên ứng dụng School Management System

Để nắm bắt tổng quan danh mục kỹ năng giảng dạy, phân loại theo nhóm, và quản lý yêu cầu chứng chỉ kèm theo

Acceptance Criteria
AC-1 - Hiển thị danh sách kỹ năng dạng cây phân cấp (Happy Path)
Tại: Màn hình "Danh sách kỹ năng và nhóm kỹ năng"

Khi: Người dùng truy cập menu Quản lý danh mục > Kỹ năng giảng dạy

Thì: Hệ thống hiển thị danh sách dạng cây với các cột: Tên kỹ năng & Mô tả, Mã định danh, Môn học & Chứng chỉ, Thứ tự, Trạng thái, Thao tác

Business Rule: Cấu trúc phân cấp 2 level: Nhóm kỹ năng (level 1) > Kỹ năng (level 2). Danh sách sắp xếp theo Thứ tự hiển thị tăng dần trong từng cấp.

AC-2 - Hiển thị thông tin Nhóm kỹ năng
Tại: Dòng Nhóm kỹ năng trong danh sách

Khi: Dữ liệu được load

Thì: Hiển thị: Tên nhóm kỹ năng, Mô tả ngắn (dòng 2), Mã định danh, số lượng kỹ năng trực thuộc (VD: "2 kỹ năng trực thuộc"), Thứ tự, Trạng thái

Business Rule: Nhóm kỹ năng được đánh dấu là "NHÓM KỸ NĂNG". VD: "Kỹ năng Sư phạm" - "Các kỹ năng nền tảng về giảng dạy và quản lý lớp học".

AC-3 - Hiển thị thông tin Kỹ năng
Tại: Dòng Kỹ năng trong danh sách (level 2)

Khi: Dữ liệu được load

Thì: Hiển thị: Tên kỹ năng, Tên tiếng Anh (dòng 2), Mã định danh, Môn học liên quan, Chứng chỉ yêu cầu (nếu có), Thứ tự, Trạng thái

Business Rule: Cột "Môn học & Chứng chỉ" hiển thị: Dòng 1 - Môn học liên quan ("Tất cả môn học" hoặc danh sách môn cụ thể), Dòng 2 - Chứng chỉ yêu cầu nếu có.

AC-4 - Mở rộng/Thu gọn nhóm kỹ năng
Tại: Dòng Nhóm kỹ năng

Khi: Người dùng click vào icon mũi tên hoặc click vào dòng

Thì: Mở rộng/thu gọn danh sách kỹ năng bên trong, icon chuyển từ (>) sang (v) khi mở rộng

Business Rule: Mặc định nhóm kỹ năng đầu tiên được mở rộng, các nhóm còn lại thu gọn.

AC-5 - Mở panel bộ lọc nâng cao
Tại: Thanh công cụ phía trên danh sách

Khi: Người dùng click nút "Bộ lọc"

Thì: Mở rộng panel bộ lọc với các tiêu chí: Trạng thái, Yêu cầu chứng chỉ

Business Rule: Panel có nút "Xóa bộ lọc" và "Áp dụng". Mặc định tất cả = "Tất cả".

AC-6 - Lọc theo trạng thái (Alternative Path)
Tại: Panel bộ lọc

Khi: Người dùng chọn Trạng thái = "Hoạt động" và click "Áp dụng"

Thì: Danh sách chỉ hiển thị các kỹ năng/nhóm kỹ năng đang hoạt động

AC-7 - Lọc theo yêu cầu chứng chỉ (Alternative Path)
Tại: Panel bộ lọc

Khi: Người dùng chọn Yêu cầu chứng chỉ = "Có yêu cầu" và click "Áp dụng"

Thì: Danh sách chỉ hiển thị các kỹ năng có yêu cầu chứng chỉ kèm theo

Business Rule: Dropdown Yêu cầu chứng chỉ gồm: Tất cả, Có yêu cầu, Không yêu cầu. Khi lọc, nhóm kỹ năng vẫn hiển thị nếu có ít nhất 1 kỹ năng con thỏa mãn.

AC-8 - Tìm kiếm kỹ năng
Tại: Ô tìm kiếm "Tìm tên, mã..."

Khi: Người dùng nhập từ khóa (VD: "Quản lý", "LESSON", "Sư phạm")

Thì: Hệ thống tìm kiếm và hiển thị kết quả phù hợp trong cả kỹ năng và nhóm kỹ năng

Business Rule: Tìm kiếm không phân biệt hoa/thường, tìm theo: Tên kỹ năng, Tên tiếng Anh, Mã định danh, Tên nhóm kỹ năng. Kết quả realtime sau 300ms debounce.

AC-9 - Thêm nhanh kỹ năng từ danh sách (Alternative Path)
Tại: Dòng Nhóm kỹ năng đã mở rộng

Khi: Người dùng click "+ Thêm kỹ năng mới vào [Tên nhóm]..." hoặc click icon "+" ở cột Thao tác

Thì: Mở form thêm kỹ năng mới với Nhóm kỹ năng đã được điền sẵn

Business Rule: Chỉ hiển thị link/icon thêm kỹ năng cho nhóm kỹ năng đang hoạt động.

AC-10 - Danh sách rỗng (Edge Case)
Tại: Màn hình danh sách

Khi: Không có dữ liệu hoặc không có kết quả tìm kiếm/lọc

Thì: Hiển thị thông báo "Chưa có dữ liệu kỹ năng. Vui lòng thêm nhóm kỹ năng trước." với nút "+ Thêm Nhóm kỹ năng"

AC-11 - Lỗi tải dữ liệu (Error Condition)
Tại: Màn hình danh sách

Khi: Xảy ra lỗi kết nối server hoặc timeout

Thì: Hiển thị thông báo lỗi "Không thể tải dữ liệu. Vui lòng kiểm tra kết nối và thử lại." với nút "Tải lại"

AC-12 - Kiểm tra phân quyền
Tại: Menu thao tác của kỹ năng, nhóm kỹ năng

Khi: Người xem các chức năng có thể thực hiện ở cột Chức năng

Thì: Kiểm tra phân quyền xem/thêm/sửa/xóa kỹ năng, nhóm kỹ năng của người dùng

Nếu không có thì ẩn button chức năng/báo lỗi theo US phân quyền

AC-13 - Xóa kỹ năng (Alternative Path)
Tại: Menu thao tác của kỹ năng

Khi: Người dùng chọn "Xóa"

Thì: Kiểm tra dữ liệu phụ thuộc và hiển thị thông báo phù hợp

Business Rules:

Có giáo viên đang sử dụng: "Không thể xóa kỹ năng đang được sử dụng. Vui lòng vô hiệu hóa thay vì xóa."

Không có dữ liệu phụ thuộc: Hiển thị popup xác nhận "Bạn có chắc muốn xóa kỹ năng [Tên]?" 

Nguời dùng xác nhận thực hiện xóa mềm

Người dùng nhấn hủy → đóng popup

AC-14 - Xóa nhóm kỹ năng (Alternative Path)
Tại: Menu thao tác của nhóm kỹ năng

Khi: Người dùng chọn "Xóa"

Thì: Kiểm tra kỹ năng con và hiển thị thông báo

Business Rule: 

Nếu nhóm còn kỹ năng: "Không thể xóa nhóm kỹ năng đang có kỹ năng. Vui lòng xóa/di chuyển hết kỹ năng trước."

Nếu không có dữ liệu phụ thuộc: Hiển thị popup xác nhận "Bạn có chắc muốn xóa nhóm kỹ năng [Tên]?"

Nguời dùng xác nhận thực hiện xóa mềm

Người dùng nhấn hủy → đóng popup

Business Value
Chuẩn hóa danh mục kỹ năng giảng dạy trong tổ chức

Hỗ trợ đánh giá năng lực giáo viên theo các tiêu chí cụ thể

Quản lý yêu cầu chứng chỉ kèm theo cho từng kỹ năng

Là nền tảng cho việc phân công giảng dạy và phát triển năng lực

Success Metrics
Thời gian tải danh sách < 2 giây với 100 kỹ năng

Tỷ lệ người dùng tìm được kỹ năng cần thiết trong 15 giây: > 95%

Tỷ lệ sử dụng bộ lọc: > 50%

Tỷ lệ lỗi hiển thị < 0.1%

Dependencies
API: GET /api/v1/teaching-skills (lấy danh sách kỹ năng)

API: GET /api/v1/skill-categories (lấy danh sách nhóm kỹ năng)

Module Authentication & Authorization

Master Data: Bảng Kỹ năng giảng dạy, Bảng Nhóm kỹ năng

Impact Analysis
Ảnh hưởng đến module Hồ sơ Giáo viên - gắn kỹ năng vào profile

Ảnh hưởng đến module Đánh giá năng lực - đánh giá theo kỹ năng

Ảnh hưởng đến module Phân công giảng dạy - yêu cầu kỹ năng tối thiểu

Liên kết với module Bằng cấp & Chứng chỉ (yêu cầu chứng chỉ kèm theo)

Wireframe
https://gemini.google.com/share/988206dd6738 

 

 