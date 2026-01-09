Nội dung
Là Quản trị viên hệ thống (Admin)

Tôi muốn thêm mới một loại bằng cấp hoặc chứng chỉ vào danh mục chuẩn

Tại Module Quản lý danh mục > Bằng cấp > Form "Thêm Bằng cấp / Chứng chỉ"

Để mở rộng danh mục bằng cấp được công nhận, đáp ứng yêu cầu đa dạng về trình độ chuyên môn

Acceptance Criteria
AC-1 - Mở form thêm bằng cấp (Happy Path)
Tại: Màn hình danh sách Bằng cấp & Chứng chỉ

Khi: Người dùng click nút "+ Thêm Bằng cấp" (góc trên bên phải)

Thì: Hệ thống mở form "Thêm Bằng cấp / Chứng chỉ" dạng slide-in từ bên phải

Business Rule: Form chia thành 4 sections: THÔNG TIN ĐỊNH DANH, PHÂN LOẠI & CHUYÊN MÔN, THỜI HẠN & CẤU HÌNH, MÔ TẢ CHI TIẾT.

AC-2 - Nhập thông tin định danh
Tại: Section "THÔNG TIN ĐỊNH DANH" trên form

Khi: Người dùng nhập các trường thông tin

Thì: Hệ thống validate realtime theo quy tắc nghiệp vụ

Business Rules:

Tên Bằng cấp: Bắt buộc, tối đa 200 ký tự. Placeholder: "VD: Cử nhân CNTT"

Tên tiếng Anh: Không bắt buộc, tối đa 200 ký tự. VD: "Bachelor of Science in IT"

Mã bằng cấp: Bắt buộc, tối đa 50 ký tự, không được trùng, chữ HOA. VD: BSC_IT, MBA, IELTS, PMP

AC-3 - Nhập phân loại và chuyên môn
Tại: Section "PHÂN LOẠI & CHUYÊN MÔN" trên form

Khi: Người dùng chọn/nhập các thuộc tính phân loại

Thì: Hệ thống validate và hiển thị các trường phù hợp

Business Rules:

Loại bằng cấp: Bắt buộc, dropdown chọn 1 trong: Bằng cử nhân, Bằng thạc sĩ, Bằng tiến sĩ, Chứng chỉ nghề nghiệp, Giấy phép hành nghề, Chứng chỉ ngoại ngữ, Khác. Mặc định: "Bằng cử nhân"

Cấp độ (Level): Không bắt buộc, text input. Placeholder: "VD: Level 6". Dùng để phân loại theo khung trình độ quốc gia

Chuyên ngành: Không bắt buộc, tối đa 200 ký tự. Placeholder: "VD: Công nghệ phần mềm"

Cơ quan cấp: Không bắt buộc, tối đa 200 ký tự. VD: "Đại học Quốc gia", "RMIT University", "PMI Institute"

Quốc gia: Không bắt buộc, dropdown danh sách quốc gia. Mặc định: "Việt Nam"

AC-4 - Nhập thời hạn và cấu hình
Tại: Section "THỜI HẠN & CẤU HÌNH" trên form

Khi: Người dùng nhập cấu hình thời hạn

Thì: Hệ thống validate và ghi nhận

Business Rules:

Thời hạn hiệu lực: Không bắt buộc, text input. Placeholder: "VD: 2 năm, Vô thời hạn". Để trống = Vô thời hạn

Yêu cầu gia hạn: Checkbox, mặc định = không chọn. Nếu chọn = cần theo dõi gia hạn định kỳ

Thứ tự hiển thị: Bắt buộc, số nguyên dương, không trùng trong cùng loại bằng. Mặc định = max + 1

Trạng thái: Toggle switch, mặc định = "Đang hoạt động"

AC-5 - Nhập mô tả chi tiết
Tại: Section "MÔ TẢ CHI TIẾT" trên form

Khi: Người dùng nhập mô tả

Thì: Hệ thống validate độ dài

Business Rule: Mô tả chi tiết: Không bắt buộc, tối đa 1000 ký tự, textarea. Placeholder: "Mô tả về bằng cấp này..."

AC-6 - Lưu bằng cấp thành công (Happy Path)
Tại: Form thêm mới đã điền đầy đủ thông tin hợp lệ

Khi: Người dùng click nút "Lưu dữ liệu"

Thì: Hệ thống lưu dữ liệu, đóng form, hiển thị thông báo "Thêm bằng cấp thành công", cập nhật danh sách với record mới trong nhóm loại tương ứng

AC-7 - Validation lỗi mã trùng (Error Condition)
Tại: Trường "Mã bằng cấp"

Khi: Người dùng nhập mã đã tồn tại (VD: IELTS đã có)

Thì: Hiển thị lỗi inline: "Mã bằng cấp đã tồn tại trong hệ thống"

AC-8 - Hủy thao tác thêm mới (Alternative Path)
Tại: Form thêm bằng cấp đang mở

Khi: Người dùng click "Hủy bỏ" hoặc mũi tên quay lại

Thì: Nếu có dữ liệu đã nhập: hiện hộp thoại xác nhận. Nếu form trống: đóng ngay.

Business Value
Mở rộng danh mục bằng cấp được công nhận trong tổ chức

Chuẩn hóa thông tin bằng cấp theo tiêu chuẩn quốc gia/quốc tế

Hỗ trợ đánh giá năng lực giáo viên chính xác hơn

Quản lý yêu cầu gia hạn chứng chỉ nghề nghiệp

Success Metrics
Thời gian hoàn thành thêm mới < 90 giây

Tỷ lệ thêm mới thành công sau lần nhập đầu tiên: > 80%

Tỷ lệ điền đầy đủ thông tin không bắt buộc: > 60%

Tỷ lệ bằng cấp được phân loại đúng: 100%

Dependencies
API: POST /api/v1/qualifications

API: GET /api/v1/qualifications/check-code?code={code}

Danh sách Quốc gia định nghĩa sẵn trong hệ thống

Permission: CREATE_QUALIFICATION

User Story 1: Xem danh sách bằng cấp

Impact Analysis
Bằng cấp mới xuất hiện trong dropdown chọn khi tạo hồ sơ giáo viên

Ảnh hưởng đến module Tuyển dụng (thêm yêu cầu bằng cấp)

Cần cập nhật cache danh sách bằng cấp

Có thể liên kết với Kỹ năng giảng dạy nếu là chứng chỉ chuyên môn

Wireframe
https://gemini.google.com/share/29e15d88740e 

 