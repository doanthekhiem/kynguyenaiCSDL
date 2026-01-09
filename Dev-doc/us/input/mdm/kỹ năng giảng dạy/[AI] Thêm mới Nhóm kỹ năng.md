Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn thêm mới một nhóm kỹ năng giảng dạy vào hệ thống

Tại Module Quản lý danh mục > Kỹ năng giảng dạy > Form "Thêm Nhóm kỹ năng"

Để tổ chức và phân loại các kỹ năng giảng dạy theo nhóm, tạo cấu trúc quản lý rõ ràng

Acceptance Criteria
AC-1 - Mở form thêm nhóm kỹ năng (Happy Path)
Tại: Màn hình danh sách Kỹ năng giảng dạy

Khi: Người dùng click nút "+ Thêm Nhóm kỹ năng" (góc trên bên phải)

Thì: Hệ thống mở form "Thêm Nhóm kỹ năng" dạng slide-in từ bên phải

Business Rule: Form chia thành 3 sections: THÔNG TIN ĐỊNH DANH, THUỘC TÍNH CHUYÊN MÔN, MÔ TẢ CHI TIẾT.

AC-2 - Nhập thông tin định danh
Tại: Section "THÔNG TIN ĐỊNH DANH" trên form

Khi: Người dùng nhập các trường thông tin

Thì: Hệ thống validate realtime theo quy tắc nghiệp vụ

Business Rules:

Tên Nhóm kỹ năng: Bắt buộc, tối đa 200 ký tự. Placeholder: "VD: Kỹ năng Sư phạm"

Tên tiếng Anh: Không bắt buộc, tối đa 200 ký tự.

Mã định danh: Bắt buộc, tối đa 50 ký tự, không được trùng, chữ HOA. VD: PEDAGOGY, EDTECH, LAB_SAFETY

AC-3 - Nhập thuộc tính chuyên môn
Tại: Section "THUỘC TÍNH CHUYÊN MÔN" trên form

Khi: Người dùng nhập thuộc tính

Thì: Hệ thống validate và ghi nhận

Business Rules:

Thứ tự hiển thị: Bắt buộc, số nguyên dương, không trùng. Mặc định = max + 1

Trạng thái: Toggle switch, mặc định = "Đang hoạt động"

AC-4 - Nhập mô tả chi tiết
Tại: Section "MÔ TẢ CHI TIẾT" trên form

Khi: Người dùng nhập mô tả

Thì: Hệ thống validate độ dài

Business Rule: Mô tả chi tiết: Không bắt buộc, tối đa 1000 ký tự, textarea. Placeholder: "Nhập ghi chú chi tiết về kỹ năng này..."

AC-5 - Lưu nhóm kỹ năng thành công (Happy Path)
Tại: Form thêm mới đã điền đầy đủ thông tin hợp lệ

Khi: Người dùng click nút "Lưu dữ liệu"

Thì: Hệ thống lưu dữ liệu, đóng form, hiển thị thông báo "Thêm nhóm kỹ năng thành công", cập nhật danh sách

AC-6 - Validation lỗi mã trùng (Error Condition)
Tại: Trường "Mã định danh"

Khi: Người dùng nhập mã đã tồn tại

Thì: Hiển thị lỗi inline: "Mã định danh đã tồn tại trong hệ thống"

AC-7 - Hủy thao tác (Alternative Path)
Tại: Form thêm nhóm kỹ năng đang mở

Khi: Người dùng click "Hủy bỏ" hoặc mũi tên quay lại

Thì: Nếu có dữ liệu đã nhập: hiện hộp thoại xác nhận. Nếu form trống: đóng ngay.

Business Value
Tạo cấu trúc phân loại kỹ năng theo nhóm chuyên môn

Hỗ trợ quản lý và đánh giá năng lực giáo viên theo nhóm

Tạo nền tảng cho việc thêm kỹ năng vào đúng nhóm

Success Metrics
Thời gian hoàn thành thêm mới < 45 giây

Tỷ lệ thêm mới thành công sau lần nhập đầu tiên: > 85%

Tỷ lệ nhóm kỹ năng có mô tả đầy đủ: > 80%

Dependencies
API: POST /api/v1/skill-categories

API: GET /api/v1/skill-categories/check-code?code={code}

Permission: CREATE_SKILL_CATEGORY

User Story 1: Xem danh sách kỹ năng

Impact Analysis
Nhóm kỹ năng mới xuất hiện trong dropdown khi thêm kỹ năng

Ảnh hưởng đến cấu trúc cây hiển thị trong danh sách

Cần cập nhật cache danh sách nhóm kỹ năng

Wireframe