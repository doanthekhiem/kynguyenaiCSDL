Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn chỉnh sửa thông tin bằng cấp/chứng chỉ đã tồn tại

Tại Module Quản lý danh mục > Bằng cấp > Form chỉnh sửa

Để cập nhật thông tin khi có thay đổi về tên gọi, cơ quan cấp, thời hạn, trạng thái hoặc sửa lỗi nhập liệu

Acceptance Criteria
AC-1 - Mở form chỉnh sửa bằng cấp (Happy Path)
Tại: Dòng bằng cấp trong danh sách

Khi: Người dùng click vào dòng bằng cấp hoặc click icon chỉnh sửa trong cột Thao tác

Thì: Mở form chỉnh sửa với tất cả dữ liệu hiện tại được điền sẵn

Business Rule: Trường Mã bằng cấp hiển thị nhưng không cho phép sửa (disabled).

AC-2 - Chỉnh sửa thông tin cơ bản
Tại: Form chỉnh sửa

Khi: Người dùng thay đổi các trường: Tên bằng cấp, Tên tiếng Anh, Loại, Cấp độ, Chuyên ngành, Cơ quan cấp, Quốc gia, Thời hạn, Mô tả

Thì: Hệ thống validate realtime và cho phép lưu nếu hợp lệ

Business Rule: Các trường cho phép sửa: tất cả trừ Mã bằng cấp. Cho phép thay đổi Loại bằng cấp (sẽ di chuyển sang nhóm loại mới trong danh sách).

AC-3 - Lưu chỉnh sửa thành công
Tại: Form chỉnh sửa đã thay đổi dữ liệu hợp lệ

Khi: Người dùng click "Lưu dữ liệu"

Thì: Cập nhật dữ liệu, đóng form, hiển thị thông báo "Cập nhật bằng cấp thành công", danh sách refresh

Business Rule: Tự động cập nhật Ngày cập nhật.

AC-4 - Thay đổi cấu hình gia hạn (Alternative Path)
Tại: Checkbox "Yêu cầu gia hạn" trong form

Khi: Người dùng bật/tắt checkbox

Thì: Hệ thống ghi nhận thay đổi, ảnh hưởng đến cách hiển thị và theo dõi bằng cấp này

Business Rule: Nếu bật "Yêu cầu gia hạn": Trường "Thời hạn hiệu lực" trở thành bắt buộc. Hệ thống sẽ nhắc nhở khi giáo viên có bằng cấp này sắp hết hạn.

AC-5 - Thay đổi trạng thái hoạt động (Alternative Path)
Tại: Toggle Trạng thái trong form

Khi: Người dùng chuyển từ "Đang hoạt động" sang "Ngừng dùng"

Thì: Hiển thị cảnh báo nếu có giáo viên đang sử dụng bằng cấp này

Business Rule: Nếu có giáo viên đang có bằng cấp này trong hồ sơ: "Bằng cấp này đang được X giáo viên sử dụng trong hồ sơ. Vô hiệu hóa sẽ ẩn bằng cấp khỏi dropdown chọn nhưng không ảnh hưởng hồ sơ đã có. Bạn có chắc chắn?"

AC-6 - Xóa bằng cấp (Alternative Path)
Tại: Menu thao tác của bằng cấp

Khi: Người dùng chọn "Xóa"

Thì: Kiểm tra dữ liệu phụ thuộc và hiển thị thông báo phù hợp

Business Rules:

Có giáo viên đang sử dụng: "Không thể xóa bằng cấp đang được sử dụng trong hồ sơ giáo viên. Vui lòng vô hiệu hóa thay vì xóa."

Không có dữ liệu phụ thuộc: Hiển thị xác nhận "Bạn có chắc muốn xóa bằng cấp [Tên]?" và thực hiện xóa mềm.

AC-7 - Xung đột khi chỉnh sửa đồng thời (Edge Case)
Tại: Form chỉnh sửa

Khi: Bản ghi đã bị người dùng khác cập nhật trong lúc đang chỉnh sửa

Thì: Hiển thị lỗi: "Dữ liệu đã được cập nhật bởi người dùng khác. Vui lòng tải lại." với nút "Tải lại"

AC-8 - Không có quyền chỉnh sửa (Error Condition)
Tại: Danh sách bằng cấp

Khi: Người dùng không có quyền EDIT_QUALIFICATION

Thì: Ẩn icon chỉnh sửa, click vào dòng chỉ mở form ở chế độ Chỉ xem (tất cả trường bị vô hiệu hóa)

Business Value
Đảm bảo thông tin bằng cấp luôn chính xác và cập nhật

Cho phép điều chỉnh khi có thay đổi về cơ quan cấp, thời hạn

Quản lý vòng đời bằng cấp (từ hoạt động đến ngừng công nhận)

Kiểm soát dữ liệu phụ thuộc trước khi xóa/vô hiệu hóa

Success Metrics
Thời gian cập nhật < 45 giây

Tỷ lệ xung đột chỉnh sửa đồng thời < 0.5%

100% thay đổi trạng thái được ghi log

Tỷ lệ xóa nhầm được ngăn chặn: 100%

Dependencies
API: PUT /api/v1/qualifications/{id}

API: DELETE /api/v1/qualifications/{id}

API: GET /api/v1/qualifications/{id}/dependencies

Permissions: EDIT_QUALIFICATION, DELETE_QUALIFICATION

Module Lịch sử thay đổi

User Story 1, 2: Xem và Thêm bằng cấp

Impact Analysis
Thay đổi tên bằng cấp ảnh hưởng hiển thị trong Hồ sơ giáo viên

Thay đổi Loại bằng cấp ảnh hưởng đến nhóm hiển thị trong danh sách

Vô hiệu hóa ảnh hưởng đến dropdown chọn bằng cấp

Hồ sơ giáo viên đã có bằng cấp này vẫn giữ nguyên

Cần làm mới cache sau khi cập nhật

Wireframe
Tham chiếu: https://gemini.google.com/share/29e15d88740e 

(form chỉnh sửa tương tự form thêm mới, với dữ liệu đã điền sẵn và trường Mã bằng cấp bị vô hiệu hóa)

 