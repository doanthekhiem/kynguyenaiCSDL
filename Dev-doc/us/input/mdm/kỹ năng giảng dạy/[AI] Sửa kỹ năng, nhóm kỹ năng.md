Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn chỉnh sửa thông tin kỹ năng hoặc nhóm kỹ năng đã tồn tại

Tại Module Quản lý danh mục > Kỹ năng giảng dạy > Form chỉnh sửa

Để cập nhật thông tin khi có thay đổi về tên, môn học liên quan, yêu cầu chứng chỉ, trạng thái hoặc sửa lỗi

Acceptance Criteria
AC-1 - Mở form chỉnh sửa kỹ năng (Happy Path)
Tại: Dòng kỹ năng trong danh sách

Khi: Người dùng click vào dòng kỹ năng hoặc click icon chỉnh sửa

Thì: Mở form chỉnh sửa với tất cả dữ liệu hiện tại được điền sẵn

Business Rule: 

Trường Mã định danh hiển thị nhưng không cho sửa. 

Trường "Thuộc nhóm kỹ năng" hiển thị và cho thay đổi.

Khi người dùng chọn lại: Load lên danh sách các nhóm kỹ năng có trạng thái Hoạt động để người dùng chọn, chỉ cho chọn 1

AC-2 - Mở form chỉnh sửa nhóm kỹ năng (Happy Path)
Tại: Dòng nhóm kỹ năng trong danh sách

Khi: Người dùng click vào tên nhóm hoặc click icon chỉnh sửa

Thì: Mở form chỉnh sửa nhóm kỹ năng với dữ liệu hiện tại

Business Rule: Trường Mã định danh không cho sửa.

AC-3 - Lưu chỉnh sửa thành công
Tại: Form chỉnh sửa đã thay đổi dữ liệu hợp lệ

Khi: Người dùng click "Lưu dữ liệu"

Thì: Cập nhật dữ liệu, đóng form, hiển thị thông báo "Cập nhật thành công", danh sách refresh

Business Rule: Tự động cập nhật Ngày cập nhật.

AC-4 - Thay đổi yêu cầu chứng chỉ (Alternative Path)
Tại: Checkbox "Yêu cầu chứng chỉ" trong form chỉnh sửa kỹ năng

Khi: Người dùng bật/tắt checkbox hoặc thay đổi chứng chỉ được chọn

Thì: Hệ thống cập nhật yêu cầu chứng chỉ cho kỹ năng này

Business Rule: Nếu bỏ chọn "Yêu cầu chứng chỉ": Xóa liên kết với chứng chỉ cũ. Nếu thay đổi chứng chỉ: Cập nhật liên kết mới.

AC-5 - Thay đổi trạng thái nhóm kỹ năng (Alternative Path)
Tại: Toggle Trạng thái trong form chỉnh sửa nhóm kỹ năng

Khi: Người dùng chuyển từ "Đang hoạt động" sang "Ngừng dùng"

Thì: Hiển thị cảnh báo nếu có kỹ năng con đang hoạt động

Business Rule: Nếu nhóm kỹ năng có kỹ năng con đang hoạt động: "Nhóm kỹ năng này có X kỹ năng đang hoạt động. Vô hiệu hóa sẽ ẩn nhóm kỹ năng nhưng không ảnh hưởng các kỹ năng bên trong. Bạn có chắc chắn?"

AC-6 - Thay đổi trạng thái kỹ năng (Alternative Path)
Tại: Toggle Trạng thái trong form chỉnh sửa kỹ năng

Khi: Người dùng chuyển từ "Đang hoạt động" sang "Ngừng dùng"

Thì: Hiển thị cảnh báo nếu kỹ năng đang được sử dụng

Business Rule: Nếu kỹ năng đang được gắn cho giáo viên: "Kỹ năng này đang được X giáo viên sử dụng. Vô hiệu hóa sẽ ẩn kỹ năng khỏi dropdown nhưng không ảnh hưởng hồ sơ đã có. Bạn có chắc chắn?"

AC-7 - Xóa kỹ năng (Alternative Path)
Tại: Menu thao tác của kỹ năng

Khi: Người dùng chọn "Xóa"

Thì: Kiểm tra dữ liệu phụ thuộc và hiển thị thông báo phù hợp

Business Rules:

Có giáo viên đang sử dụng: "Không thể xóa kỹ năng đang được sử dụng. Vui lòng vô hiệu hóa thay vì xóa."

Không có dữ liệu phụ thuộc: Hiển thị popup xác nhận "Bạn có chắc muốn xóa kỹ năng [Tên]?" 

Nguời dùng xác nhận thực hiện xóa mềm

Người dùng nhấn hủy → đóng popup

AC-8 - Xóa nhóm kỹ năng (Alternative Path)
Tại: Menu thao tác của nhóm kỹ năng

Khi: Người dùng chọn "Xóa"

Thì: Kiểm tra kỹ năng con và hiển thị thông báo

Business Rule: 

Nếu nhóm còn kỹ năng: "Không thể xóa nhóm kỹ năng đang có kỹ năng. Vui lòng xóa/di chuyển hết kỹ năng trước."

Nếu không có dữ liệu phụ thuộc: Hiển thị popup xác nhận "Bạn có chắc muốn xóa nhóm kỹ năng [Tên]?"

Nguời dùng xác nhận thực hiện xóa mềm

Người dùng nhấn hủy → đóng popup

AC-9 - Xung đột khi chỉnh sửa đồng thời (Edge Case)
Tại: Form chỉnh sửa

Khi: Bản ghi đã bị người dùng khác cập nhật

Thì: Hiển thị lỗi: "Dữ liệu đã được cập nhật bởi người dùng khác. Vui lòng tải lại." với nút "Tải lại"

Business Value
Đảm bảo thông tin kỹ năng luôn chính xác và cập nhật

Cho phép điều chỉnh yêu cầu chứng chỉ khi có thay đổi

Quản lý vòng đời kỹ năng (từ hoạt động đến ngừng sử dụng)

Kiểm soát dữ liệu phụ thuộc trước khi xóa/vô hiệu hóa

Success Metrics
Thời gian cập nhật < 30 giây

Tỷ lệ xung đột chỉnh sửa đồng thời < 0.5%

100% thay đổi trạng thái được ghi log

Tỷ lệ xóa nhầm được ngăn chặn: 100%

Dependencies
API: PUT /api/v1/teaching-skills/{id}

API: PUT /api/v1/skill-categories/{id}

API: DELETE /api/v1/teaching-skills/{id}

API: DELETE /api/v1/skill-categories/{id}

API: GET /api/v1/teaching-skills/{id}/dependencies

Permissions: EDIT_TEACHING_SKILL, EDIT_SKILL_CATEGORY, DELETE_TEACHING_SKILL, DELETE_SKILL_CATEGORY

Module Lịch sử thay đổi

User Story 1, 2, 3: Xem, Thêm nhóm và Thêm kỹ năng

Impact Analysis
Thay đổi tên kỹ năng ảnh hưởng hiển thị trong Hồ sơ giáo viên, Đánh giá năng lực

Thay đổi yêu cầu chứng chỉ ảnh hưởng đến điều kiện gán kỹ năng

Vô hiệu hóa ảnh hưởng đến dropdown chọn kỹ năng

Hồ sơ giáo viên đã có kỹ năng này vẫn giữ nguyên

Cần làm mới cache sau khi cập nhật

Wireframe
Tham chiếu: (form chỉnh sửa tương tự form thêm mới, với dữ liệu đã điền sẵn và trường Mã định danh bị vô hiệu hóa)

https://gemini.google.com/share/988206dd6738 

 

 