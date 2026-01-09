Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn thêm mới một hệ đào tạo/chương trình học vào hệ thống

Tại Module Quản lý danh mục > Hệ đào tạo > Form "Thêm Hệ đào tạo mới"

Để mở rộng danh mục chương trình giáo dục, đáp ứng nhu cầu đào tạo đa dạng (chương trình quốc gia, quốc tế, tự biên soạn)

Acceptance Criteria
AC-1 - Mở form thêm hệ đào tạo (Happy Path)
Tại: Màn hình danh sách Hệ đào tạo

Khi: Người dùng click nút "+ Thêm Hệ đào tạo" (góc trên bên phải)

Thì: Hệ thống mở form "Thêm Hệ đào tạo mới" dạng slide-in từ bên phải

Business Rule: Form chia thành 3 sections: THÔNG TIN ĐỊNH DANH, PHÂN LOẠI & HIỆU LỰC, MÔ TẢ & MỤC TIÊU.

AC-2 - Nhập thông tin định danh
Tại: Section "THÔNG TIN ĐỊNH DANH" trên form

Khi: Người dùng nhập các trường thông tin

Thì: Hệ thống validate realtime theo quy tắc nghiệp vụ

Business Rules:

Tên Hệ đào tạo: Bắt buộc, tối đa 200 ký tự. Placeholder: "VD: Chương trình GDPT 2018"

Tên tiếng Anh: Không bắt buộc, tối đa 200 ký tự. VD: "Vietnam National Curriculum"

Mã hệ đào tạo: Bắt buộc, tối đa 50 ký tự, không được trùng, chỉ chấp nhận chữ HOA, số và dấu gạch dưới. VD: MOET_2018, CAMBRIDGE_INT, IB_PYP

AC-3 - Nhập phân loại và hiệu lực
Tại: Section "PHÂN LOẠI & HIỆU LỰC" trên form

Khi: Người dùng chọn/nhập các thuộc tính phân loại

Thì: Hệ thống validate và hiển thị các trường phù hợp

Business Rules:

Loại hệ đào tạo: Bắt buộc, dropdown chọn 1 trong: "Tiêu chuẩn" (chương trình quốc gia), "Quốc tế", "Tự biên soạn". Mặc định: "Tiêu chuẩn"

Quốc gia: Không bắt buộc, dropdown danh sách quốc gia được định nghĩa sẵn trong hệ thống. Mặc định: "Việt Nam"

Hiệu lực từ: Không bắt buộc, chọn ngày từ date picker, format mm/dd/yyyy

Hiệu lực đến: Không bắt buộc, chọn ngày từ date picker, phải sau Hiệu lực từ. Placeholder: "Để trống nếu vô thời hạn"

Thứ tự hiển thị: Bắt buộc, số nguyên dương, không được trùng trong cùng Loại hệ đào tạo. Mặc định = giá trị lớn nhất hiện có + 1

Trạng thái: Toggle switch, mặc định = "Đang hoạt động"

AC-4 - Nhập mô tả và mục tiêu
Tại: Section "MÔ TẢ & MỤC TIÊU" trên form

Khi: Người dùng nhập nội dung mô tả

Thì: Hệ thống validate độ dài và lưu nội dung

Business Rules:

Mô tả & Mục tiêu: Không bắt buộc, tối đa 2000 ký tự, textarea. Placeholder: "Mô tả tóm tắt..."

AC-5 - Lưu hệ đào tạo thành công (Happy Path)
Tại: Form thêm mới đã điền đầy đủ thông tin hợp lệ

Khi: Người dùng click nút "Lưu dữ liệu"

Thì: Hệ thống lưu dữ liệu, đóng form, hiển thị thông báo "Thêm hệ đào tạo thành công", cập nhật danh sách với record mới

Business Rule: Tự động ghi nhận Ngày tạo = thời điểm hiện tại. ID Hệ đào tạo được tự động sinh.

AC-6 - Validation lỗi mã trùng (Error Condition)
Tại: Trường "Mã hệ đào tạo"

Khi: Người dùng nhập mã đã tồn tại trong hệ thống (VD: MOET_2018)

Thì: Hiển thị lỗi inline: "Mã hệ đào tạo đã tồn tại trong hệ thống"

Business Rule: Kiểm tra trùng mã ngay khi người dùng rời khỏi trường nhập liệu. Nút "Lưu dữ liệu" bị vô hiệu hóa khi có lỗi validation.

AC-7 - Validation lỗi ngày hiệu lực (Error Condition)
Tại: Trường "Hiệu lực từ" và "Hiệu lực đến"

Khi: Người dùng nhập Hiệu lực đến trước Hiệu lực từ

Thì: Hiển thị lỗi: "Ngày kết thúc phải sau ngày bắt đầu"

AC-8 - Validation lỗi format mã (Error Condition)
Tại: Trường "Mã hệ đào tạo"

Khi: Người dùng nhập mã có chữ thường, dấu tiếng Việt, khoảng trắng hoặc ký tự đặc biệt

Thì: Hiển thị lỗi: "Mã chỉ chấp nhận chữ HOA (A-Z), số (0-9) và dấu gạch dưới (_)"

Business Rule: Hệ thống tự động chuyển chữ thường thành chữ HOA khi nhập.

AC-9 - Hủy thao tác thêm mới (Alternative Path)
Tại: Form thêm hệ đào tạo đang mở

Khi: Người dùng click "Hủy bỏ" hoặc click mũi tên quay lại

Thì: Nếu có dữ liệu đã nhập: hiện hộp thoại xác nhận "Bạn có chắc muốn hủy? Dữ liệu đã nhập sẽ không được lưu." với 2 nút "Tiếp tục chỉnh sửa" và "Hủy bỏ". Nếu form trống: đóng ngay.

Business Value
Cho phép mở rộng danh mục chương trình giáo dục linh hoạt

Hỗ trợ đa dạng hệ đào tạo: chương trình Bộ GD&ĐT, Cambridge, IB, Montessori...

Quản lý hiệu lực chương trình theo quy định pháp luật

Tạo nền tảng cho việc xây dựng khung chương trình chi tiết

Success Metrics
Thời gian hoàn thành thêm mới < 90 giây

Tỷ lệ lỗi validation được phát hiện trước khi submit: 100%

Tỷ lệ thêm mới thành công sau lần nhập đầu tiên: > 80%

Tỷ lệ điền đầy đủ thông tin không bắt buộc (mô tả, mục tiêu): > 70%

Dependencies
API: POST /api/v1/curriculums

API: GET /api/v1/curriculums/check-code?code={code} (kiểm tra trùng mã)

Danh sách Quốc gia được định nghĩa sẵn trong hệ thống (hardcode hoặc config)

Permission: CREATE_CURRICULUM

User Story 1: Xem danh sách hệ đào tạo

Impact Analysis
Hệ đào tạo mới sẽ xuất hiện trong dropdown chọn ở các module: Môn học, Khung chương trình

Ảnh hưởng đến báo cáo thống kê học sinh theo chương trình học

Cần cập nhật cache danh sách hệ đào tạo sau khi thêm mới

Liên kết với module Tuyển sinh (học sinh đăng ký theo chương trình)

Wireframe
https://gemini.google.com/share/254f07bdb14f 

 