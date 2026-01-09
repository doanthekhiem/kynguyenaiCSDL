 

Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn thêm mới một nhóm môn học vào hệ thống

Tại Module Quản lý danh mục > Môn học > Form "Thêm Nhóm môn"

Để tổ chức và phân loại các môn học theo nhóm/tổ bộ môn, tạo cấu trúc quản lý rõ ràng

Acceptance Criteria
AC-1 - Mở form thêm nhóm môn (Happy Path)
Tại: Màn hình danh sách Môn học

Khi: Người dùng click nút "+ Thêm Nhóm môn" (góc trên bên phải)

Thì: Hệ thống mở form "Thêm Nhóm môn" dạng slide-in từ bên phải

Business Rule: Form bao gồm section "THÔNG TIN CƠ BẢN" với các trường nhập liệu.

AC-2 - Nhập thông tin cơ bản nhóm môn
Tại: Section "THÔNG TIN CƠ BẢN" trên form

Khi: Người dùng nhập các trường thông tin

Thì: Hệ thống validate realtime theo quy tắc nghiệp vụ

Business Rules:

Tên Nhóm môn: Bắt buộc, tối đa 200 ký tự. Placeholder hiển thị trong trường nhập.

Nhóm cấp trên: Không bắt buộc, dropdown chọn từ danh sách nhóm môn đang hoạt động. Mặc định: "-- Không có (Nhóm cấp cao nhất) --". Chỉ hiển thị các nhóm đang hoạt động.

Tên tiếng Anh: Không bắt buộc, tối đa 200 ký tự.

Mã định danh: Bắt buộc, tối đa 50 ký tự, không được trùng, chỉ chấp nhận chữ HOA, số và dấu gạch dưới. VD: STEM, LANG, DEPT_MATH

Thứ tự hiển thị: Bắt buộc, số nguyên dương, không được trùng trong cùng nhóm cha. Mặc định = giá trị lớn nhất + 1

Trạng thái: Toggle switch, mặc định = "Đang hoạt động"

AC-3 - Lưu nhóm môn thành công (Happy Path)
Tại: Form thêm mới đã điền đầy đủ thông tin hợp lệ

Khi: Người dùng click nút "Lưu dữ liệu"

Thì: Hệ thống lưu dữ liệu, đóng form, hiển thị thông báo "Thêm nhóm môn thành công", cập nhật danh sách với record mới

Business Rule: Tự động ghi nhận Ngày tạo. Nếu chọn Nhóm cấp trên, nhóm mới sẽ hiển thị bên trong nhóm cha đó.

AC-4 - Thêm nhóm môn con từ danh sách (Alternative Path)
Tại: Dòng nhóm môn trong danh sách

Khi: Người dùng click icon "+" ở cột Thao tác của một nhóm môn

Thì: Mở form thêm mới với trường "Nhóm cấp trên" đã được điền sẵn nhóm môn được chọn và không cho phép sửa

AC-5 - Validation lỗi mã trùng (Error Condition)
Tại: Trường "Mã định danh"

Khi: Người dùng nhập mã đã tồn tại trong hệ thống

Thì: Hiển thị lỗi inline: "Mã định danh đã tồn tại trong hệ thống"

AC-6 - Hủy thao tác thêm mới (Alternative Path)
Tại: Form thêm nhóm môn đang mở

Khi: Người dùng click "Hủy bỏ" hoặc click mũi tên quay lại

Thì: Nếu có dữ liệu đã nhập: hiện hộp thoại xác nhận "Bạn có chắc muốn hủy? Dữ liệu đã nhập sẽ không được lưu.". Nếu form trống: đóng ngay.

Business Value
Tạo cấu trúc phân loại môn học theo tổ bộ môn/nhóm chuyên môn

Hỗ trợ quản lý và phân công giảng dạy theo nhóm

Tạo nền tảng cho việc thêm môn học vào đúng nhóm

Success Metrics
Thời gian hoàn thành thêm mới < 45 giây

Tỷ lệ thêm mới thành công sau lần nhập đầu tiên: > 85%

Tỷ lệ nhóm môn được phân cấp đúng: 100%

Dependencies
API: POST /api/v1/subject-groups

API: GET /api/v1/subject-groups?status=active (lấy danh sách nhóm cha)

Permission: CREATE_SUBJECT_GROUP

User Story 1: Xem danh sách môn học

Impact Analysis
Nhóm môn mới xuất hiện trong dropdown chọn Nhóm cấp trên khi thêm nhóm môn khác

Nhóm môn mới xuất hiện trong dropdown chọn Nhóm môn khi thêm môn học

Ảnh hưởng đến cấu trúc cây hiển thị trong danh sách

Wireframe
https://gemini.google.com/share/5f4e7fe68c45 

 