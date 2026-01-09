Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn thêm mới một cấp học vào hệ thống

Tại Module Quản lý danh mục > Cấp học, Khối lớp > Form "Thêm mới Cấp học"

Để mở rộng cấu trúc giáo dục, đáp ứng nhu cầu đào tạo đa dạng các cấp độ học tập

Acceptance Criteria
AC-1 - Mở form thêm cấp học (Happy Path)
Tại: Màn hình danh sách Cấu trúc Hệ thống Giáo dục

Khi: Người dùng click nút "+ Thêm Cấp học" (góc trên bên phải)

Thì: Hệ thống mở form "Thêm mới Cấp học" dạng slide-in từ bên phải với các trường nhập liệu theo cấu trúc Master Data

AC-2 - Nhập thông tin định danh
Tại: Section "THÔNG TIN ĐỊNH DANH" trên form

Khi: Người dùng nhập các trường thông tin

Thì: Hệ thống validate theo quy tắc Master Data

Business Rules:

Tên Cấp học (level_name): Bắt buộc, tối đa 100 ký tự. Placeholder: "VD: Tiểu học"

Tên tiếng Anh (level_name_en): Không bắt buộc, tối đa 100 ký tự

Mã định danh (level_code): Bắt buộc, VARCHAR(20), UNIQUE, chỉ chấp nhận chữ HOA, không dấu, không khoảng trắng. VD: PRIMARY, SECONDARY

AC-3 - Nhập thuộc tính cấp học
Tại: Section "THUỘC TÍNH" trên form

Khi: Người dùng nhập các thuộc tính

Thì: Hệ thống validate và hiển thị lỗi inline nếu có

Business Rules:

Tuổi tối thiểu (age_range_min): Không bắt buộc, số nguyên 0-25, phải < Tuổi tối đa

Tuổi tối đa (age_range_max): Không bắt buộc, số nguyên 0-25, phải > Tuổi tối thiểu

Thứ tự hiển thị (display_order): Bắt buộc, số nguyên dương, UNIQUE, default = max(display_order) + 1

Trạng thái (is_active): Toggle switch, default = "Đang hoạt động" (true)

AC-4 - Lưu cấp học thành công (Happy Path)
Tại: Form thêm mới đã điền đầy đủ thông tin hợp lệ

Khi: Người dùng click nút "Lưu dữ liệu"

Thì: Hệ thống lưu dữ liệu, đóng form, hiển thị toast "Thêm cấp học thành công", cập nhật danh sách với record mới được highlight

Business Rule: Tự động ghi nhận created_at = timestamp hiện tại. level_id được auto-generate.

AC-5 - Validation lỗi nhập liệu (Error Condition)
Tại: Form thêm mới

Khi: Người dùng nhập dữ liệu không hợp lệ

Thì: Hiển thị thông báo lỗi inline bên dưới trường tương ứng

Các lỗi validation:

Mã định danh trùng: "Mã cấp học đã tồn tại trong hệ thống"

Mã không đúng format: "Mã chỉ chấp nhận chữ HOA, không dấu, không khoảng trắng"

Tuổi không hợp lệ: "Tuổi tối thiểu phải nhỏ hơn Tuổi tối đa"

Thứ tự trùng: "Thứ tự hiển thị đã được sử dụng"

Business Value
Cho phép mở rộng cấu trúc giáo dục linh hoạt theo nhu cầu tổ chức

Chuẩn hóa dữ liệu cấp học theo quy định Bộ GD&ĐT hoặc tiêu chuẩn quốc tế

Tạo nền tảng cho việc quản lý khối lớp, học sinh, giáo viên

Success Metrics
Thời gian hoàn thành thêm mới < 60 giây

Tỷ lệ lỗi validation được phát hiện trước khi submit: 100%

Tỷ lệ thêm mới thành công sau lần nhập đầu tiên: > 85%

Dependencies
API: POST /api/v1/education-levels

API: GET /api/v1/education-levels/check-code?code={code} (kiểm tra trùng mã)

Permission: CREATE_EDUCATION_LEVEL

User Story 1: Xem danh sách cấp học

Impact Analysis
Cấp học mới sẽ xuất hiện trong dropdown chọn cấp học ở các module khác

Ảnh hưởng đến báo cáo thống kê theo cấp học

Cần cập nhật cache danh sách cấp học sau khi thêm mới

Wireframe
Menu: https://gemini.google.com/share/1b9782394050

Màn danh sách: https://gemini.google.com/share/8a585772ea09 

 