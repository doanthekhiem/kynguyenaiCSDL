Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn thêm mới một môn học vào nhóm môn cụ thể

Tại Module Quản lý danh mục > Môn học > Form "Thêm Môn học"

Để bổ sung danh mục môn học, xác định số tiết chuẩn và phân loại bắt buộc/tự chọn cho việc xây dựng chương trình

Acceptance Criteria
AC-1 - Mở form thêm môn học từ danh sách (Happy Path)
Tại: Dòng nhóm môn trong danh sách (VD: "Tổ Lý - Công nghệ")

Khi: Người dùng click "+ Thêm mục mới vào [Tên nhóm môn]..."

Thì: Mở form "Thêm Môn học" với thông tin "Thuộc: [Tên nhóm môn]" hiển thị ở header

Business Rule: Form hiển thị tên nhóm môn cha ở subtitle. Nhóm môn được điền sẵn và cho phép thay đổi.

AC-2 - Nhập thông tin cơ bản môn học
Tại: Section "THÔNG TIN CƠ BẢN" trên form

Khi: Người dùng nhập các trường thông tin

Thì: Hệ thống validate realtime theo quy tắc nghiệp vụ

Business Rules:

Tên Môn học: Bắt buộc, tối đa 200 ký tự. Placeholder hiển thị trong trường nhập.

Tên tiếng Anh: Không bắt buộc, tối đa 200 ký tự. VD: "Mathematics", "Physics"

Mã định danh: Bắt buộc, tối đa 50 ký tự, không được trùng toàn hệ thống, chữ HOA. VD: MATH, PHYS, IT, TECH

AC-3 - Nhập thuộc tính môn học
Tại: Phần thuộc tính trên form

Khi: Người dùng nhập/chọn các thuộc tính

Thì: Hệ thống validate và ghi nhận

Business Rules:

Nhóm môn trực thuộc: 

Load sẵn dữ liệu theo cây danh sách cha con mà người dùng chọn thêm, cho phép chọn lại

Load lên danh sách các nhóm môn có trạng thái Hoạt động để người dùng chọn, chỉ được chọn 1

Số tiết chuẩn: Không bắt buộc, số dương, tối đa 999.99. VD: 35 tiết, 70 tiết, 105 tiết

Môn bắt buộc: Checkbox, mặc định = không chọn (tức là môn Tự chọn). Nếu chọn = môn Bắt buộc

Thứ tự hiển thị: Bắt buộc, số nguyên dương, không trùng trong cùng nhóm môn. Mặc định = max + 1

Trạng thái: Toggle switch, mặc định = "Đang hoạt động"

AC-4 - Lưu môn học thành công (Happy Path)
Tại: Form thêm mới đã điền đầy đủ thông tin hợp lệ

Khi: Người dùng click nút "Lưu dữ liệu"

Thì: Hệ thống lưu dữ liệu, đóng form, hiển thị thông báo "Thêm môn học thành công", cập nhật danh sách với môn học mới trong nhóm môn tương ứng

AC-5 - Validation lỗi mã trùng (Error Condition)
Tại: Trường "Mã định danh"

Khi: Người dùng nhập mã đã tồn tại (VD: MATH đã có)

Thì: Hiển thị lỗi inline: "Mã môn học đã tồn tại trong hệ thống"

Business Rule: Mã môn học là duy nhất toàn hệ thống, không chỉ trong nhóm môn.

AC-6 - Validation lỗi số tiết (Error Condition)
Tại: Trường "Số tiết chuẩn"

Khi: Người dùng nhập số âm hoặc vượt quá 999.99

Thì: Hiển thị lỗi: "Số tiết chuẩn phải là số dương và không vượt quá 999.99"

AC-7 - Thêm môn học vào nhóm môn đang ngừng hoạt động (Edge Case)
Tại: Nhóm môn có trạng thái "Ngừng dùng"

Khi: Người dùng cố gắng thêm môn học

Thì: Không hiển thị link/icon thêm môn học cho nhóm môn ngừng hoạt động

Business Rule: Chỉ cho phép thêm môn học vào nhóm môn đang hoạt động.

Business Value
Bổ sung danh mục môn học cho chương trình đào tạo

Xác định số tiết chuẩn để xây dựng thời khóa biểu

Phân loại môn bắt buộc/tự chọn cho học sinh đăng ký

Tạo cơ sở cho việc phân công giảng dạy và nhập điểm

Success Metrics
Thời gian hoàn thành thêm mới < 60 giây

Tỷ lệ thêm mới thành công sau lần nhập đầu tiên: > 85%

Tỷ lệ môn học được gán đúng nhóm: 100%

Tỷ lệ điền Số tiết chuẩn: > 90%

Dependencies
API: POST /api/v1/subjects

API: GET /api/v1/subjects/check-code?code={code}

Permission: CREATE_SUBJECT

User Story 1: Xem danh sách môn học

User Story 2: Phải có nhóm môn tồn tại

Impact Analysis
Môn học mới xuất hiện trong dropdown phân công giảng dạy

Ảnh hưởng module Thời khóa biểu (thêm môn mới cần xếp lịch)

Ảnh hưởng module Điểm số (thêm môn mới để nhập điểm)

Cần gắn với Hệ đào tạo và Khung chương trình tương ứng

Ảnh hưởng phân quyền 

Wireframe
https://gemini.google.com/share/5f4e7fe68c45 