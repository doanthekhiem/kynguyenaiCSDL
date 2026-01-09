Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn chỉnh sửa thông tin cấp học hoặc khối lớp đã tồn tại

Tại Module Quản lý danh mục > Cấp học, Khối lớp > Form chỉnh sửa

Để cập nhật thông tin khi có thay đổi về tên gọi, độ tuổi, trạng thái hoạt động, hoặc sửa lỗi nhập liệu

Acceptance Criteria
AC-1 - Mở form chỉnh sửa cấp học (Happy Path)
Tại: Dòng cấp học trong danh sách

Khi: Người dùng click icon "..." (more actions) > chọn "Chỉnh sửa"

Thì: Mở form chỉnh sửa với tất cả dữ liệu hiện tại được điền sẵn

Business Rule: Trường level_id và level_code hiển thị nhưng DISABLED (không cho sửa mã định danh sau khi tạo).

AC-2 - Chỉnh sửa và lưu thành công
Tại: Form chỉnh sửa

Khi: Người dùng thay đổi thông tin (trừ mã định danh) và click "Lưu dữ liệu"

Thì: Cập nhật dữ liệu, đóng form, toast "Cập nhật thành công", danh sách refresh với dữ liệu mới

Business Rule: Tự động cập nhật updated_at = timestamp hiện tại.

AC-3 - Thay đổi trạng thái hoạt động (Alternative Path)
Tại: Toggle "Trạng thái" trong form hoặc cột Trạng thái trong danh sách

Khi: Người dùng chuyển trạng thái từ "Hoạt động" sang "Ngừng dùng"

Thì: Hiển thị dialog cảnh báo nếu có dữ liệu liên quan

Business Rule: Nếu cấp học có khối lớp đang hoạt động: "Cấp học này có X khối lớp đang hoạt động. Vô hiệu hóa sẽ ẩn cấp học khỏi các dropdown chọn. Bạn có chắc chắn?". Nếu khối lớp có học sinh đang học: "Khối lớp này có X học sinh đang theo học. Không thể vô hiệu hóa."

AC-4 - Conflict khi chỉnh sửa đồng thời (Edge Case)
Tại: Form chỉnh sửa

Khi: Record đã bị user khác cập nhật trong lúc user hiện tại đang chỉnh sửa

Thì: Hiển thị lỗi "Dữ liệu đã được cập nhật bởi người dùng khác. Vui lòng tải lại trang." với nút "Tải lại"

Business Rule: Sử dụng optimistic locking dựa trên updated_at timestamp.

AC-5 - Không có quyền chỉnh sửa (Error Condition)
Tại: Danh sách cấp học/khối lớp

Khi: Người dùng không có quyền EDIT_EDUCATION_LEVEL hoặc EDIT_GRADE

Thì: Ẩn menu "Chỉnh sửa" trong dropdown actions

AC-6 - Xóa cấp học/khối lớp (Alternative Path)
Tại: Menu actions "..."

Khi: Người dùng chọn "Xóa"

Thì: Hiển thị dialog xác nhận với các điều kiện:

Business Rules:

Cấp học có khối lớp: "Không thể xóa cấp học đang có khối lớp. Vui lòng xóa hết khối lớp trước."

Khối lớp có học sinh: "Không thể xóa khối lớp đang có học sinh theo học."

Không có dữ liệu phụ thuộc: Soft delete (set is_active = false) hoặc hard delete tùy cấu hình hệ thống

Business Value
Đảm bảo dữ liệu master data luôn chính xác và cập nhật

Cho phép điều chỉnh linh hoạt khi có thay đổi về chính sách giáo dục

Kiểm soát vòng đời của dữ liệu master data

Success Metrics
Thời gian cập nhật < 30 giây

Tỷ lệ conflict do concurrent edit < 0.5%

100% thay đổi trạng thái được log trong audit trail

Dependencies
API: PUT /api/v1/education-levels/{id}

API: PUT /api/v1/grades/{id}

API: DELETE /api/v1/education-levels/{id}

API: DELETE /api/v1/grades/{id}

Permissions: EDIT_EDUCATION_LEVEL, EDIT_GRADE, DELETE_EDUCATION_LEVEL, DELETE_GRADE

Module Audit Log (ghi lại lịch sử thay đổi)

Impact Analysis
Thay đổi tên cấp học/khối lớp ảnh hưởng hiển thị trên toàn hệ thống

Vô hiệu hóa ảnh hưởng đến dropdown selection ở các module khác

Cần invalidate cache sau khi cập nhật

Báo cáo historical data cần giữ nguyên giá trị tại thời điểm ghi nhận

Wireframe
Form chỉnh sửa hiển thị tương tự form thêm mới, disable các trường mã định danh không cho sửa

https://gemini.google.com/share/8a585772ea09 