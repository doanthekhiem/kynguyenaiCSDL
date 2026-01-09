Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn thêm mới một kỹ năng giảng dạy vào nhóm kỹ năng cụ thể

Tại Module Quản lý danh mục > Kỹ năng giảng dạy > Form "Thêm kỹ năng vào nhóm..."

Để bổ sung danh mục kỹ năng, xác định môn học liên quan và yêu cầu chứng chỉ kèm theo

Acceptance Criteria
AC-1 - Mở form thêm kỹ năng từ danh sách (Happy Path)
Tại: Dòng nhóm kỹ năng trong danh sách

Khi: Người dùng click "+ Thêm kỹ năng mới vào [Tên nhóm]..."

Thì: Mở form "Thêm kỹ năng vào nhóm K..." với header hiển thị tên nhóm kỹ năng

Business Rule: Form hiển thị tên nhóm kỹ năng cha ở header. Nhóm kỹ năng được điền sẵn và không cho phép thay đổi.

AC-2 - Nhập thông tin định danh kỹ năng
Tại: Section "THÔNG TIN ĐỊNH DANH" trên form

Khi: Người dùng nhập các trường thông tin

Thì: Hệ thống validate realtime theo quy tắc nghiệp vụ

Business Rules:

Tên Kỹ năng: Bắt buộc, tối đa 200 ký tự. Placeholder: "VD: Quản lý lớp học"

Tên tiếng Anh: Không bắt buộc, tối đa 200 ký tự. VD: "Classroom Management"

Mã định danh: Bắt buộc, tối đa 50 ký tự, không trùng toàn hệ thống, chữ HOA. VD: CLS_MGMT, LESSON_PLAN

AC-3 - Nhập thuộc tính chuyên môn
Tại: Section "THUỘC TÍNH CHUYÊN MÔN" trên form

Khi: Người dùng chọn/nhập thuộc tính

Thì: Hệ thống validate và ghi nhận

Business Rules:

Nhóm kỹ năng:

Default hiển thị nhóm kỹ năng ngoài cây cha con mà người dùng chọn nhập, cho phép sửa lại

Khi sửa lại, load lên danh sách các nhóm kỹ năng có trạng thái Hoạt động để người dùng chọn lại, chỉ cho phép chọn 1

Môn học liên quan: Dropdown chọn, mặc định "Tất cả môn học". 

Có thể chọn môn học cụ thể từ danh sách Master Data Môn học.

Chi load lên những môn học có trạng thái hoạt động

Cho phép chọn nhiều môn học

Yêu cầu/Có chứng chỉ kèm theo: 

Checkbox, mặc định = không chọn. 

Nếu chọn: 

Hiển thị dropdown "Chọn chứng chỉ" từ danh sách Bằng cấp & Chứng chỉ

Chỉ load những bằng cấp, chứng chỉ có trạng thái hoạt động

Cho phép người dùng chọn nhiều

Tên chứng chỉ liên quan: Dropdown, chỉ hiển thị khi checkbox "Yêu cầu chứng chỉ" được chọn. Placeholder: "-- Chọn chứng chỉ --"

Thứ tự hiển thị: Bắt buộc, số nguyên dương, không trùng trong cùng nhóm. Mặc định = max + 1

Trạng thái: Toggle switch, mặc định = "Đang hoạt động"

AC-4 - Nhập mô tả chi tiết
Tại: Section "MÔ TẢ CHI TIẾT" trên form

Khi: Người dùng nhập mô tả

Thì: Hệ thống validate độ dài

Business Rule: Mô tả chi tiết: Không bắt buộc, tối đa 1000 ký tự. Placeholder: "Nhập ghi chú chi tiết về kỹ năng này..."

AC-5 - Lưu kỹ năng thành công (Happy Path)
Tại: Form thêm mới đã điền đầy đủ thông tin hợp lệ

Khi: Người dùng click nút "Lưu dữ liệu"

Thì: Hệ thống lưu dữ liệu, đóng form, hiển thị thông báo "Thêm kỹ năng thành công", cập nhật danh sách với kỹ năng mới trong nhóm tương ứng

AC-6 - Validation lỗi mã trùng (Error Condition)
Tại: Trường "Mã định danh"

Khi: Người dùng nhập mã đã tồn tại

Thì: Hiển thị lỗi inline: "Mã kỹ năng đã tồn tại trong hệ thống"

Business Rule: Mã kỹ năng là duy nhất toàn hệ thống, không chỉ trong nhóm.

AC-7 - Bật yêu cầu chứng chỉ nhưng chưa chọn chứng chỉ (Edge Case)
Tại: Checkbox "Yêu cầu chứng chỉ kèm theo" đã chọn

Khi: Người dùng click "Lưu dữ liệu" mà chưa chọn chứng chỉ cụ thể

Thì: Hiển thị lỗi: "Vui lòng chọn chứng chỉ kèm theo"

Business Rule: Nếu đánh dấu "Yêu cầu chứng chỉ" thì bắt buộc phải chọn ít nhất 1 chứng chỉ từ dropdown.

AC-8 - Thêm kỹ năng vào nhóm đang ngừng hoạt động (Edge Case)
Tại: Nhóm kỹ năng có trạng thái "Ngừng dùng"

Khi: Người dùng cố gắng thêm kỹ năng

Thì: Không hiển thị link/icon thêm kỹ năng cho nhóm ngừng hoạt động

Business Rule: Chỉ cho phép thêm kỹ năng vào nhóm kỹ năng đang hoạt động.

Business Value
Bổ sung danh mục kỹ năng giảng dạy cho tổ chức

Xác định môn học liên quan để phân công giảng dạy phù hợp

Quản lý yêu cầu chứng chỉ kèm theo cho từng kỹ năng

Tạo cơ sở cho việc đánh giá và phát triển năng lực giáo viên

Success Metrics
Thời gian hoàn thành thêm mới < 60 giây

Tỷ lệ thêm mới thành công sau lần nhập đầu tiên: > 85%

Tỷ lệ kỹ năng được gán đúng nhóm: 100%

Tỷ lệ kỹ năng có liên kết chứng chỉ (nếu yêu cầu): 100%

Dependencies
API: POST /api/v1/teaching-skills

API: GET /api/v1/teaching-skills/check-code?code={code}

API: GET /api/v1/subjects (lấy danh sách môn học)

API: GET /api/v1/qualifications (lấy danh sách chứng chỉ)

Permission: CREATE_TEACHING_SKILL

User Story 2: Phải có nhóm kỹ năng tồn tại

Module Bằng cấp & Chứng chỉ: Cung cấp danh sách chứng chỉ

Impact Analysis
Kỹ năng mới xuất hiện trong dropdown đánh giá năng lực giáo viên

Ảnh hưởng module Hồ sơ Giáo viên (gắn kỹ năng vào profile)

Ảnh hưởng module Phân công giảng dạy (yêu cầu kỹ năng tối thiểu)

Liên kết với module Bằng cấp nếu có yêu cầu chứng chỉ

Wireframe
https://gemini.google.com/share/988206dd6738 

 