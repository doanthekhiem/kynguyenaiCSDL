Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn chỉnh sửa thông tin môn học hoặc nhóm môn đã tồn tại

Tại Module Quản lý danh mục > Môn học > Form chỉnh sửa

Để cập nhật thông tin khi có thay đổi về tên, số tiết, trạng thái hoặc sửa lỗi nhập liệu

Acceptance Criteria
AC-1 - Mở form chỉnh sửa môn học (Happy Path)
Tại: Dòng môn học trong danh sách

Khi: Người dùng click vào dòng môn học hoặc click icon chỉnh sửa

Thì: Mở form chỉnh sửa với tất cả dữ liệu hiện tại được điền sẵn

Business Rule: Trường Mã định danh hiển thị nhưng không cho phép sửa. Trường "Thuộc nhóm môn" hiển thị nhưng không cho phép thay đổi (muốn chuyển nhóm phải xóa và tạo mới).

AC-2 - Mở form chỉnh sửa nhóm môn (Happy Path)
Tại: Dòng nhóm môn trong danh sách

Khi: Người dùng click vào tên nhóm môn hoặc click icon chỉnh sửa

Thì: Mở form chỉnh sửa nhóm môn với dữ liệu hiện tại

Business Rule: Trường Mã định danh và Nhóm cấp trên không cho phép sửa.

AC-3 - Lưu chỉnh sửa thành công
Tại: Form chỉnh sửa đã thay đổi dữ liệu hợp lệ

Khi: Người dùng click "Lưu dữ liệu"

Thì: Cập nhật dữ liệu, đóng form, hiển thị thông báo "Cập nhật thành công", danh sách refresh

Business Rule: Tự động cập nhật Ngày cập nhật.

AC-4 - Thay đổi trạng thái nhóm môn (Alternative Path)
Tại: Toggle Trạng thái trong form chỉnh sửa nhóm môn

Khi: Người dùng chuyển từ "Đang hoạt động" sang "Ngừng dùng"

Thì: Hiển thị cảnh báo nếu có dữ liệu con

Business Rule: Nếu nhóm môn có môn học/nhóm con đang hoạt động: "Nhóm môn này có X mục con đang hoạt động. Vô hiệu hóa sẽ ẩn nhóm môn khỏi các dropdown. Bạn có chắc chắn?"

AC-5 - Thay đổi trạng thái môn học (Alternative Path)
Tại: Toggle Trạng thái trong form chỉnh sửa môn học

Khi: Người dùng chuyển từ "Đang hoạt động" sang "Ngừng dùng"

Thì: Hiển thị cảnh báo nếu môn học đang được sử dụng

Business Rule: Nếu môn học đang có trong thời khóa biểu hoặc có điểm số: "Môn học này đang được sử dụng trong X thời khóa biểu và Y bản ghi điểm. Vô hiệu hóa sẽ ẩn môn học khỏi các dropdown nhưng không ảnh hưởng dữ liệu đã có. Bạn có chắc chắn?"

AC-6 - Xóa môn học (Alternative Path)
Tại: Menu thao tác của môn học

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

AC-8 - Xung đột khi chỉnh sửa đồng thời (Edge Case)
Tại: Form chỉnh sửa

Khi: Bản ghi đã bị người dùng khác cập nhật trong lúc đang chỉnh sửa

Thì: Hiển thị lỗi: "Dữ liệu đã được cập nhật bởi người dùng khác. Vui lòng tải lại." với nút "Tải lại"

Business Value
Đảm bảo thông tin môn học/nhóm môn luôn chính xác

Cho phép điều chỉnh số tiết khi có thay đổi chương trình

Quản lý vòng đời môn học (từ hoạt động đến ngừng giảng dạy)

Kiểm soát dữ liệu phụ thuộc trước khi xóa/vô hiệu hóa

Success Metrics
Thời gian cập nhật < 30 giây

Tỷ lệ xung đột chỉnh sửa đồng thời < 0.5%

100% thay đổi trạng thái được ghi log

Tỷ lệ xóa nhầm được ngăn chặn: 100%

Dependencies
API: PUT /api/v1/subjects/{id}

API: PUT /api/v1/subject-groups/{id}

API: DELETE /api/v1/subjects/{id}

API: DELETE /api/v1/subject-groups/{id}

API: GET /api/v1/subjects/{id}/dependencies

Permissions: EDIT_SUBJECT, EDIT_SUBJECT_GROUP, DELETE_SUBJECT, DELETE_SUBJECT_GROUP

Module Lịch sử thay đổi

Impact Analysis
Thay đổi tên môn học ảnh hưởng hiển thị trong Thời khóa biểu, Bảng điểm

Thay đổi Số tiết chuẩn ảnh hưởng đến tính toán thời khóa biểu

Vô hiệu hóa ảnh hưởng đến dropdown chọn môn trong các module khác

Dữ liệu lịch sử (điểm cũ) cần giữ nguyên giá trị

Cần làm mới cache sau khi cập nhật

Wireframe
https://gemini.google.com/share/5f4e7fe68c45 

 