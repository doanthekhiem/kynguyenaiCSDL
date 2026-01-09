Nội dung
Là Quản trị viên hệ thống (Admin) hoặc Nhân viên quản lý nhân sự

Tôi muốn xem danh sách tất cả các loại bằng cấp và chứng chỉ được chuẩn hóa trong hệ thống

Tại Module Quản lý danh mục > Bằng cấp trên ứng dụng School Management System

Để nắm bắt tổng quan danh mục bằng cấp/chứng chỉ được công nhận, hỗ trợ đánh giá trình độ giáo viên và quản lý hồ sơ nhân sự

Acceptance Criteria
AC-1 - Hiển thị danh sách bằng cấp theo nhóm loại (Happy Path)
Tại: Màn hình "Danh sách Bằng cấp & Chứng chỉ"

Khi: Người dùng truy cập menu Quản lý danh mục > Bằng cấp

Thì: Hệ thống hiển thị danh sách bằng cấp/chứng chỉ được nhóm theo Loại bằng cấp, với các cột: Tên bằng cấp & Chuyên ngành, Mã (Code), Cấp độ & Loại, Cơ quan & Quốc gia, Hiệu lực, Trạng thái, Thao tác

Business Rule: Danh sách được nhóm theo Loại bằng cấp: Bằng cấp học thuật (Academic Degrees), Chứng chỉ nghề nghiệp (Professional Certificates), Chứng chỉ ngoại ngữ (Language Certificates), Giấy phép hành nghề (Licenses). Mỗi nhóm hiển thị số lượng bằng cấp trong ngoặc.

AC-2 - Hiển thị thông tin chi tiết bằng cấp
Tại: Mỗi dòng bằng cấp trong danh sách

Khi: Dữ liệu được load

Thì: Hiển thị đầy đủ thông tin:

Cột Tên & Chuyên ngành: Tên bằng cấp (tiếng Việt), Tên tiếng Anh (dòng 2), Chuyên ngành (dòng 3 với icon)

Cột Cấp độ & Loại: Cấp độ (VD: Đại học Level 6, Sau đại học Level 7, Chuyên gia), Loại bằng (VD: Bằng cử nhân, Thạc sĩ, Chứng chỉ quốc tế)

Cột Cơ quan & Quốc gia: Tên cơ quan cấp (dòng 1), Quốc gia (dòng 2)

Cột Hiệu lực: Thời hạn hiệu lực (VD: "Vô thời hạn", "2 năm", "3 năm"), ghi chú "Cần gia hạn" nếu có yêu cầu gia hạn

AC-3 - Mở rộng/Thu gọn nhóm loại bằng cấp
Tại: Dòng header nhóm loại bằng cấp

Khi: Người dùng click vào dòng header nhóm hoặc icon mũi tên

Thì: Mở rộng/thu gọn danh sách bằng cấp thuộc nhóm đó

Business Rule: Mặc định tất cả nhóm được mở rộng. Icon mũi tên chuyển từ (v) sang (>) khi thu gọn.

AC-4 - Mở panel bộ lọc nâng cao
Tại: Thanh công cụ phía trên danh sách

Khi: Người dùng click nút "Bộ lọc"

Thì: Mở rộng panel bộ lọc với các tiêu chí: Trạng thái, Loại bằng, Quốc gia

Business Rule: Panel có nút "Xóa bộ lọc" và "Áp dụng". Mặc định tất cả = "Tất cả".

AC-5 - Lọc theo trạng thái (Alternative Path)
Tại: Panel bộ lọc

Khi: Người dùng chọn Trạng thái = "Hoạt động" và click "Áp dụng"

Thì: Danh sách chỉ hiển thị các bằng cấp đang hoạt động

AC-6 - Lọc theo loại bằng (Alternative Path)
Tại: Panel bộ lọc

Khi: Người dùng chọn Loại bằng (VD: "Bằng cấp học thuật") và click "Áp dụng"

Thì: Danh sách chỉ hiển thị các bằng cấp thuộc loại đã chọn

Business Rule: Loại bằng bao gồm: Tất cả, Bằng đại học/cao học (DEGREE), Chứng chỉ nghề nghiệp (CERTIFICATE), Giấy phép hành nghề (LICENSE), Chứng chỉ ngoại ngữ (LANGUAGE_CERT), Khác (OTHER).

AC-7 - Lọc theo quốc gia (Alternative Path)
Tại: Panel bộ lọc

Khi: Người dùng chọn Quốc gia = "Vietnam" và click "Áp dụng"

Thì: Danh sách chỉ hiển thị các bằng cấp có Quốc gia = Vietnam

Business Rule: Dropdown Quốc gia lấy danh sách distinct từ các giá trị Quốc gia đã có trong dữ liệu Bằng cấp hiện tại.

AC-8 - Tìm kiếm bằng cấp
Tại: Ô tìm kiếm "Tìm tên, mã bằng..."

Khi: Người dùng nhập từ khóa (VD: "Thạc sĩ", "MBA", "IELTS")

Thì: Hệ thống tìm kiếm và hiển thị kết quả phù hợp

Business Rule: Tìm kiếm không phân biệt hoa/thường, tìm theo: Tên bằng cấp, Tên tiếng Anh, Mã bằng cấp, Chuyên ngành, Cơ quan cấp. Kết quả realtime sau 300ms debounce.

AC-9 - Bằng cấp cần gia hạn (Edge Case)
Tại: Danh sách bằng cấp

Khi: Bằng cấp có thuộc tính "Yêu cầu gia hạn" = true

Thì: Hiển thị ghi chú "Cần gia hạn" bên dưới thời hạn hiệu lực

Business Rule: Ghi chú này giúp người dùng biết bằng cấp nào cần theo dõi thời hạn để gia hạn kịp thời.

AC-10 - Danh sách rỗng (Edge Case)
Tại: Màn hình danh sách

Khi: Không có dữ liệu bằng cấp hoặc không có kết quả tìm kiếm/lọc

Thì: Hiển thị thông báo "Chưa có dữ liệu bằng cấp. Vui lòng thêm mới." với nút "+ Thêm Bằng cấp"

AC-11 - Lỗi tải dữ liệu (Error Condition)
Tại: Màn hình danh sách

Khi: Xảy ra lỗi kết nối server hoặc timeout

Thì: Hiển thị thông báo lỗi "Không thể tải dữ liệu. Vui lòng kiểm tra kết nối và thử lại." với nút "Tải lại"

Business Value
Chuẩn hóa danh mục bằng cấp/chứng chỉ được công nhận trong tổ chức

Hỗ trợ đánh giá trình độ chuyên môn của giáo viên/nhân viên

Theo dõi thời hạn hiệu lực và yêu cầu gia hạn chứng chỉ

Là nền tảng cho việc quản lý hồ sơ năng lực giáo viên

Success Metrics
Thời gian tải danh sách < 2 giây với 100 bằng cấp

Tỷ lệ người dùng tìm được bằng cấp cần thiết trong 15 giây: > 95%

Tỷ lệ sử dụng bộ lọc: > 60%

Tỷ lệ lỗi hiển thị < 0.1%

Dependencies
API: GET /api/v1/qualifications (lấy danh sách bằng cấp)

API: GET /api/v1/qualifications?type={type}&country={country}&status={status} (lọc)

Module Authentication & Authorization

Master Data: Bảng Bằng cấp (Qualification)

Impact Analysis
Ảnh hưởng đến module Hồ sơ Giáo viên - gắn bằng cấp vào profile

Ảnh hưởng đến module Tuyển dụng - yêu cầu bằng cấp tối thiểu

Ảnh hưởng đến báo cáo thống kê trình độ nhân sự

Liên kết với module Kỹ năng giảng dạy (Teaching Skill)

Wireframe
https://gemini.google.com/share/47396052d0d2 

 