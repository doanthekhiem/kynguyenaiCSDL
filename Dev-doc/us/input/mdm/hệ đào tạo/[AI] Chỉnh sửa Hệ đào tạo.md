Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn chỉnh sửa thông tin hệ đào tạo đã tồn tại trong hệ thống

Tại Module Quản lý danh mục > Hệ đào tạo > Form chỉnh sửa

Để cập nhật thông tin khi có thay đổi về tên gọi, hiệu lực, trạng thái hoạt động, hoặc sửa lỗi nhập liệu

Acceptance Criteria
AC-1 - Mở form chỉnh sửa hệ đào tạo (Happy Path)
Tại: Dòng hệ đào tạo trong danh sách, cột "Thao tác"

Khi: Người dùng click vào dòng HOẶC click icon chỉnh sửa trong cột Thao tác

Thì: Mở form chỉnh sửa với tất cả dữ liệu hiện tại được điền sẵn

Business Rule: Trường Mã hệ đào tạo hiển thị nhưng không cho phép sửa (disabled) - không cho sửa mã định danh sau khi tạo. Form title: "Chỉnh sửa Hệ đào tạo".

AC-2 - Chỉnh sửa thông tin cơ bản
Tại: Form chỉnh sửa

Khi: Người dùng thay đổi các trường: Tên hệ đào tạo, Tên tiếng Anh, Loại, Quốc gia, Mô tả & Mục tiêu

Thì: Hệ thống validate realtime và cho phép lưu nếu hợp lệ

Business Rule: Các trường cho phép sửa: Tên hệ đào tạo, Tên tiếng Anh, Loại hệ đào tạo, Quốc gia, Mô tả & Mục tiêu, Thứ tự hiển thị, Trạng thái, Hiệu lực từ, Hiệu lực đến.

AC-3 - Lưu chỉnh sửa thành công
Tại: Form chỉnh sửa đã thay đổi dữ liệu hợp lệ

Khi: Người dùng click "Lưu dữ liệu"

Thì: Cập nhật dữ liệu, đóng form, hiển thị thông báo "Cập nhật hệ đào tạo thành công", danh sách refresh với dữ liệu mới

Business Rule: Tự động cập nhật Ngày cập nhật = thời điểm hiện tại.

AC-4 - Gia hạn hiệu lực hệ đào tạo (Alternative Path)
Tại: Trường "Hiệu lực đến" trong form chỉnh sửa

Khi: Người dùng thay đổi Hiệu lực đến sang ngày xa hơn hoặc xóa để thành "Vô thời hạn"

Thì: Hệ thống cho phép lưu và cập nhật hiệu lực mới

Business Rule: Cho phép gia hạn hiệu lực bất kỳ lúc nào, kể cả khi đã hết hạn. Ghi log lịch sử khi gia hạn.

AC-5 - Thay đổi trạng thái hoạt động (Alternative Path)
Tại: Toggle "Trạng thái" trong form

Khi: Người dùng chuyển từ "Đang hoạt động" sang "Ngừng dùng"

Thì: Hiển thị hộp thoại cảnh báo nếu có dữ liệu liên quan

Business Rule: Nếu hệ đào tạo đang có môn học/khung chương trình gắn với: "Hệ đào tạo này có X môn học và Y khung chương trình đang liên kết. Vô hiệu hóa sẽ ẩn hệ đào tạo khỏi các dropdown. Các dữ liệu đã liên kết vẫn được giữ nguyên. Bạn có chắc chắn?"

AC-6 - Xung đột khi chỉnh sửa đồng thời (Edge Case)
Tại: Form chỉnh sửa

Khi: Bản ghi đã bị người dùng khác cập nhật trong lúc người dùng hiện tại đang chỉnh sửa

Thì: Hiển thị lỗi: "Dữ liệu đã được cập nhật bởi người dùng khác. Vui lòng tải lại để xem thay đổi mới nhất." với 2 nút: "Tải lại" và "Ghi đè" (nếu có quyền)

Business Rule: Sử dụng cơ chế optimistic locking dựa trên Ngày cập nhật. Chỉ Admin cấp cao mới có quyền "Ghi đè".

AC-7 - Không có quyền chỉnh sửa, Xóa (Error Condition)
Tại: Danh sách hệ đào tạo

Khi: Người dùng không có quyền EDIT_CURRICULUM, DELETE_CURRICULUM

Thì: Ẩn icon chỉnh sửa, xóa click vào dòng chỉ mở form ở chế độ Chỉ xem (tất cả các trường bị vô hiệu hóa)

AC-8 - Xóa hệ đào tạo
Tại: Danh sách hệ đào tạo

Khi: Người dùng click vào button xóa hệ đào tạo

Thì: Kiểm tra dữ liệu phụ thuộc và hiển thị thông báo phù hợp

Business Rules:

Có khóa học/chương trình học/sản phẩm đào tạo (PIM) đang active và gắn với hệ đào tạo: "Không thể xóa hệ đào tạo với các khóa học/chương trình học còn đang hoạt động. Vui lòng vô hiệu hóa thay vì xóa."

Không có dữ liệu phụ thuộc: Hiển thị xác nhận "Bạn có chắc muốn xóa môn hệ đào tạo[Tên]?" Xác nhận → thực hiện xóa mềm, Hủy → đóng form

Business Value
Đảm bảo thông tin hệ đào tạo luôn chính xác và cập nhật

Cho phép điều chỉnh linh hoạt khi có thay đổi về chính sách giáo dục

Quản lý vòng đời chương trình học (từ hoạt động đến ngừng áp dụng)

Hỗ trợ gia hạn hiệu lực khi chương trình được tiếp tục áp dụng

Success Metrics
Thời gian cập nhật < 45 giây

Tỷ lệ xung đột do chỉnh sửa đồng thời < 0.5%

100% thay đổi trạng thái được ghi log trong lịch sử

Tỷ lệ hoàn tác thay đổi < 5%

Dependencies
API: PUT /api/v1/curriculums/{id}

API: DELETE /api/v1/curriculums/{id}

API: GET /api/v1/curriculums/{id}/dependencies (kiểm tra dữ liệu phụ thuộc)

Permissions: EDIT_CURRICULUM, DELETE_CURRICULUM

Module Lịch sử thay đổi (ghi lại các thao tác chỉnh sửa)

User Story 1, 2: Xem và Thêm hệ đào tạo

Impact Analysis
Thay đổi tên hệ đào tạo ảnh hưởng hiển thị trên toàn hệ thống (báo cáo, dropdown, hồ sơ học sinh)

Vô hiệu hóa ảnh hưởng đến dropdown chọn ở module Môn học, Khung chương trình

Thay đổi hiệu lực cần thông báo cho các bộ phận liên quan (đào tạo, tuyển sinh)

Cần làm mới cache sau khi cập nhật

Dữ liệu lịch sử (báo cáo cũ) cần giữ nguyên giá trị tại thời điểm ghi nhận

Wireframe
https://gemini.google.com/share/254f07bdb14f 

 