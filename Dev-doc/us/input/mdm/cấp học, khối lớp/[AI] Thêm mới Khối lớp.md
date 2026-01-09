Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn thêm mới khối lớp vào một cấp học cụ thể

Tại Module Quản lý danh mục > Cấp học, Khối lớp > Form "Thêm Khối lớp"

Để chi tiết hóa cấu trúc giáo dục, tạo cơ sở phân lớp học sinh và phân công giảng dạy

Acceptance Criteria
AC-1 - Mở form thêm khối lớp từ danh sách (Happy Path)
Tại: Danh sách cấp học đã mở rộng hiển thị các khối lớp

Khi: Người dùng click "+ Thêm khối lớp mới vào [Tên cấp học]..."

Thì: Mở form "Thêm Khối lớp vào [Tên cấp học]" với trường education_level_id đã được điền sẵn và disabled

Business Rule: Form title hiển thị tên cấp học được chọn. 

AC-2 - Nhập thông tin định danh khối lớp
Tại: Section "THÔNG TIN ĐỊNH DANH"

Khi: Người dùng nhập thông tin khối lớp

Thì: Hệ thống validate realtime theo quy tắc Master Data

Business Rules:

Tên khối (grade_name): Bắt buộc, tối đa 100 ký tự. Placeholder: "VD: Khối 1"

Tên tiếng Anh (grade_name_en): Không bắt buộc, tối đa 100 ký tự. VD: Grade 1

Mã định danh (grade_code): Bắt buộc, VARCHAR(20), UNIQUE toàn hệ thống, chữ HOA. VD: G1, G12, GRADE_1

AC-3 - Nhập thuộc tính khối lớp
Tại: Section "THUỘC TÍNH"

Khi: Người dùng nhập thuộc tính

Thì: Hệ thống validate và gợi ý giá trị phù hợp

Business Rules:

Cấp học trực thuộc: 

Default là cấp học mà người dùng chọn từ cây cha con ngoài danh sách, cho phép người dùng chọn lại

Load lên danh sách các cấp học có trạng thái active cho người dùng chọn, không bắt buộc chọn

Tuổi chuẩn (standard_age): Không bắt buộc, số nguyên > 0. Placeholder: "Độ tuổi thông thường học sinh bắt đầu học khối này"

Thứ tự hiển thị (display_order): Bắt buộc, UNIQUE trong cùng cấp học, default = max(display_order trong cấp) + 1

Trạng thái (is_active): Toggle switch, default = true

AC-4 - Lưu khối lớp thành công
Tại: Form đã điền đầy đủ và hợp lệ

Khi: Click "Lưu dữ liệu"

Thì: Lưu thành công, đóng form, toast "Thêm khối lớp thành công", danh sách cập nhật với khối mới trong cấp học tương ứng

AC-5 - Hủy thao tác thêm mới (Alternative Path)
Tại: Form thêm khối lớp đang mở

Khi: Người dùng click "Hủy bỏ" hoặc click ra ngoài form

Thì: Nếu có dữ liệu đã nhập: hiện dialog xác nhận "Bạn có chắc muốn hủy? Dữ liệu đã nhập sẽ không được lưu.". Nếu chưa nhập: đóng form ngay

AC-6 - Validation lỗi trùng mã trong cấp học (Error Condition)
Tại: Trường Mã định danh

Khi: Người dùng nhập mã đã tồn tại trong hệ thống (dù ở cấp học khác)

Thì: Hiển thị lỗi inline: "Mã khối lớp đã tồn tại trong hệ thống"

Business Rule: grade_code là UNIQUE toàn cục, không chỉ trong cấp học.

AC-7 - Thêm khối lớp vào cấp học ngừng hoạt động (Edge Case)
Tại: Cấp học có trạng thái is_active = false

Khi: Người dùng cố gắng thêm khối lớp

Thì: Không cho phép thêm. Hiển thị warning: "Không thể thêm khối lớp vào cấp học đang ngừng hoạt động"

Business Value
Chi tiết hóa cấu trúc giáo dục để phân lớp học sinh chính xác

Tạo cơ sở cho việc xây dựng thời khóa biểu, phân công giáo viên theo khối

Hỗ trợ báo cáo thống kê chi tiết theo khối lớp

Success Metrics
Thời gian hoàn thành thêm khối lớp < 45 giây

Tỷ lệ khối lớp được tạo đúng cấp học: 100%

Số lỗi duplicate code < 1%

Dependencies
API: POST /api/v1/grades

API: GET /api/v1/education-levels/{id} (lấy thông tin cấp học cha)

Permission: CREATE_GRADE

User Story 1: Xem danh sách

User Story 2: Phải có cấp học tồn tại

Impact Analysis
Khối lớp mới xuất hiện trong dropdown phân lớp học sinh

Ảnh hưởng module Thời khóa biểu (thêm khối mới cần xếp lịch)

Ảnh hưởng báo cáo số lượng học sinh theo khối

Wireframe
https://gemini.google.com/share/8a585772ea09 

 