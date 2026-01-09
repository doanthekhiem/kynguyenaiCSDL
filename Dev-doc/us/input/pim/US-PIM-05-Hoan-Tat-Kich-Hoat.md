# NHÓM E: HOÀN TẤT VÀ KÍCH HOẠT

> **Nhóm chức năng:** Hoàn tất đơn đăng ký và kích hoạt lớp học
> **Số lượng User Stories:** 2
> **Vai trò chính:** Quản trị viên trường

---

## US-PIM-020: Hoàn tất đơn và tạo lớp học

### Nội dung
Là **Quản trị viên trường**
Tôi muốn **hoàn tất đơn đăng ký sau khi giáo viên đã xác nhận lịch**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **tạo lớp học chính thức, đồng bộ lịch, và kích hoạt đơn đăng ký**

---

### Tiêu chí chấp nhận

#### TC-1 – Hoàn tất đơn đăng ký thành công
- **Tại:** Màn hình chi tiết đơn đăng ký với trạng thái "Đã xác nhận"
- **Khi:** Quản trị viên nhấn "Hoàn tất"
- **Thì:**
  - Hiển thị cửa sổ xác nhận với danh sách kiểm tra:
    - ✓ Giáo viên đã xác nhận lịch
    - ✓ Thông tin học sinh đã đủ
    - Nhập số học sinh thực tế
  - Sau khi xác nhận:
    - Cập nhật trạng thái đơn đăng ký = "Đã hoàn tất"
    - Lưu thời điểm hoàn tất
    - Cập nhật lịch: loại lịch = "Chính thức", số học sinh thực tế
    - Tạo lớp học chính thức qua dịch vụ quản lý lớp (các lớp học)
    - Gửi tín hiệu đến quy trình Temporal: Đã hoàn tất đơn
    - Gửi sự kiện hoàn tất đơn
    - Sự kiện được gửi đến giáo viên
    - Đồng bộ lịch chính thức vào lịch làm việc giáo viên - khóa các khung giờ
    - Cập nhật trạng thái đơn đăng ký = "Đang hoạt động"
    - Gửi sự kiện kích hoạt đơn
    - Thông báo gửi đến giáo viên: "Lịch dạy đã được hoàn tất. Lớp học: [Tên các lớp]"
    - Hiển thị: "Đã hoàn tất đơn đăng ký và tạo lớp học thành công"

**Quy tắc nghiệp vụ:**
- Chỉ hoàn tất được khi trạng thái = "Đã xác nhận"
- Số học sinh thực tế có thể khác số học sinh dự kiến
- Tạo N lớp học tùy theo số lượng nhóm/ca

---

#### TC-2 – Kiểm tra trước khi hoàn tất
- **Tại:** Hệ thống backend
- **Khi:** Quản trị viên hoàn tất
- **Thì:**
  - Kiểm tra:
    - Trạng thái đơn đăng ký = "Đã xác nhận"
    - Số học sinh thực tế > 0
    - Sản phẩm vẫn đang hoạt động
    - Lịch giáo viên vẫn khả dụng (kiểm tra xung đột)
  - Nếu có lỗi: không cho phép hoàn tất, hiển thị thông báo cụ thể

---

#### TC-3 – Tạo lớp học
- **Tại:** Hệ thống backend, gọi dịch vụ quản lý lớp
- **Khi:** Hoàn tất đơn đăng ký
- **Thì:**
  - Tạo lớp học với thông tin:
    - Tên lớp (tự động tạo hoặc nhập thủ công)
    - Mã sản phẩm
    - Mã đơn đăng ký
    - Mã giáo viên (tham chiếu xuyên tenant)
    - Lịch (chính thức)
    - Học sinh (số lượng thực tế)
  - Trả về mã lớp học
  - Lưu mã lớp học vào metadata đơn đăng ký

---

#### TC-4 – Đồng bộ lịch làm việc
- **Tại:** Hệ thống backend phía trường, gửi sự kiện đến giáo viên
- **Khi:** Lớp học đã được tạo
- **Thì:**
  - Dịch vụ lịch giáo viên (INDIVIDUAL) nhận sự kiện hoàn tất đơn
  - Khóa các khung giờ trong lịch chính thức
  - Đánh dấu là "Lớp học PIM - [Tên sản phẩm]"
  - Giáo viên không thể đặt các khung giờ này cho việc khác

---

#### TC-5 – Không cho phép hoàn tất khi trạng thái không phải "Đã xác nhận"
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái khác "Đã xác nhận"
- **Thì:**
  - Nút "Hoàn tất" bị vô hiệu hóa
  - Chú giải: "Chỉ có thể hoàn tất sau khi giáo viên xác nhận lịch"

---

#### TC-6 – Hoàn tác khi tạo lớp học thất bại
- **Tại:** Hệ thống backend
- **Khi:** Gọi dịch vụ quản lý lớp thất bại
- **Thì:**
  - Hoàn tác thay đổi trạng thái
  - Không gửi sự kiện
  - Ghi nhật ký lỗi
  - Hiển thị: "Có lỗi khi tạo lớp học. Vui lòng thử lại"
  - Cơ chế thử lại

**Quy tắc nghiệp vụ:**
- Sử dụng giao dịch phân tán hoặc mẫu saga
- Hoàn tác nếu bất kỳ bước nào thất bại

---

#### TC-7 – Nhập số học sinh thực tế
- **Tại:** Cửa sổ hoàn tất
- **Khi:** Quản trị viên nhập số học sinh
- **Thì:**
  - Hiển thị số học sinh dự kiến để tham khảo
  - Cho phép nhập số học sinh thực tế
  - Kiểm tra: số học sinh > 0
  - Cảnh báo nếu chênh lệch quá lớn (> 30%) so với dự kiến

---

#### TC-8 – Xem danh sách lớp học đã tạo
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái "Đang hoạt động"
- **Thì:**
  - Hiển thị danh sách lớp học đã tạo
  - Mỗi lớp: Mã lớp, Tên lớp, Số học sinh, Trạng thái
  - Liên kết đến chi tiết lớp học

---

### Giá trị kinh doanh
- Chuyển từ lập kế hoạch sang thực thi
- Tạo lớp học chính thức
- Đảm bảo đồng bộ lịch
- Kích hoạt toàn bộ quy trình học tập

---

### Chỉ số đo lường
- Tỷ lệ hoàn tất thành công >= 95%
- Thời gian trung bình để hoàn tất sau xác nhận < 48 giờ
- Tỷ lệ đồng bộ lịch thành công >= 99%

---

### Phụ thuộc
- Dịch vụ sf-product (PRIVATE_SCHOOL)
- Dịch vụ tf-class-management
- Dịch vụ tf-teacher-calendar (INDIVIDUAL)
- Temporal workflow
- Kafka

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Rất cao - Điều phối đa dịch vụ, giao dịch phân tán
- **Tác động nghiệp vụ:** Rất cao - Bước kích hoạt quan trọng
- **Tác động trải nghiệm:** Cao

---

## US-PIM-021: Kết thúc đơn trước hạn

### Nội dung
Là **Quản trị viên trường**
Tôi muốn **kết thúc đơn đăng ký đang hoạt động trước thời hạn**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **xử lý các trường hợp đặc biệt như giáo viên không thể tiếp tục, vi phạm hợp đồng, hoặc vấn đề khác**

---

### Tiêu chí chấp nhận

#### TC-1 – Kết thúc đơn đăng ký thành công
- **Tại:** Màn hình chi tiết đơn đăng ký với trạng thái "Đang hoạt động"
- **Khi:** Quản trị viên nhấn "Kết thúc sớm"
- **Thì:**
  - Hiển thị cửa sổ xác nhận nghiêm trọng (chủ đề màu đỏ)
  - Cảnh báo: "Hành động này sẽ kết thúc lớp học và giải phóng lịch giáo viên. Không thể hoàn tác"
  - Ô nhập lý do (bắt buộc, tối thiểu 20 ký tự)
  - Hộp chọn: "Tôi hiểu hậu quả và xác nhận muốn kết thúc"
  - Sau khi xác nhận:
    - Cập nhật trạng thái đơn đăng ký = "Đã kết thúc"
    - Lưu lý do và thời điểm kết thúc
    - Cập nhật trạng thái lớp học = "Đã kết thúc"
    - Gửi sự kiện kết thúc đơn
    - Sự kiện được gửi đến giáo viên
    - Dịch vụ lịch giáo viên mở khóa các khung giờ còn lại
    - Thông báo gửi đến giáo viên kèm lý do
    - Hiển thị: "Đã kết thúc đơn đăng ký"

**Quy tắc nghiệp vụ:**
- Chỉ Quản trị viên có quyền kết thúc
- "Đã kết thúc" là trạng thái kết thúc
- Lý do bắt buộc và chi tiết

---

#### TC-2 – Xác nhận với hậu quả
- **Tại:** Cửa sổ kết thúc
- **Khi:** Quản trị viên nhấn "Kết thúc sớm"
- **Thì:**
  - Hiển thị các hậu quả:
    - Lớp học sẽ bị đóng
    - Học sinh sẽ phải chuyển lớp
    - Lịch giáo viên sẽ được giải phóng
    - Có thể ảnh hưởng đến thanh toán/hóa đơn

---

#### TC-3 – Lý do kết thúc phổ biến
- **Tại:** Cửa sổ kết thúc
- **Khi:** Quản trị viên nhập lý do
- **Thì:**
  - Chọn nhanh:
    - "Giáo viên vi phạm hợp đồng"
    - "Giáo viên yêu cầu dừng"
    - "Chất lượng giảng dạy không đạt"
    - "Không đủ học sinh"
    - "Vấn đề khác (nhập chi tiết)"

---

#### TC-4 – Không cho phép kết thúc khi đơn đã hoàn thành
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái = "Đã hoàn thành"
- **Thì:**
  - Không hiển thị nút "Kết thúc sớm"
  - Đơn đăng ký đã hoàn thành không thể kết thúc

---

#### TC-5 – Ghi nhận thông tin kết thúc
- **Tại:** Hệ thống backend
- **Khi:** Kết thúc đơn đăng ký
- **Thì:**
  - Ghi nhận:
    - Thời điểm kết thúc
    - Người thực hiện
    - Lý do chi tiết
    - Số buổi đã dạy / tổng số buổi
    - Trạng thái học sinh
  - Dữ liệu này dùng cho báo cáo và phân tích

---

#### TC-6 – Giải phóng lịch giáo viên
- **Tại:** Hệ thống backend
- **Khi:** Gửi sự kiện kết thúc đơn
- **Thì:**
  - Dịch vụ lịch giáo viên nhận sự kiện
  - Mở khóa các khung giờ từ thời điểm kết thúc trở đi
  - Giữ nguyên lịch sử các buổi đã dạy
  - Giáo viên có thể đặt lịch mới cho các khung giờ đã giải phóng

---

#### TC-7 – Thống kê lý do kết thúc
- **Tại:** Báo cáo quản lý
- **Khi:** Xem báo cáo đơn đăng ký
- **Thì:**
  - Hiển thị biểu đồ phân bố lý do kết thúc sớm
  - Tỷ lệ kết thúc sớm
  - Giúp cải thiện quy trình hợp tác

---

#### TC-8 – Thông báo học sinh và phụ huynh
- **Tại:** Hệ thống backend
- **Khi:** Kết thúc lớp học
- **Thì:**
  - Gửi thông báo đến học sinh và phụ huynh
  - Thông tin về lớp thay thế (nếu có)
  - Hướng dẫn các bước tiếp theo

---

### Giá trị kinh doanh
- Xử lý các tình huống đặc biệt, bất ngờ
- Bảo vệ lợi ích của trường và học sinh
- Linh hoạt trong quản lý

---

### Chỉ số đo lường
- Tỷ lệ kết thúc sớm <= 5% tổng số đơn đang hoạt động

---

### Phụ thuộc
- Dịch vụ sf-product (PRIVATE_SCHOOL)
- Dịch vụ tf-class-management
- Dịch vụ tf-teacher-calendar (INDIVIDUAL)
- Kafka

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Cao - Dọn dẹp nguồn lực, mở khóa lịch
- **Tác động nghiệp vụ:** Cao - Xử lý trường hợp ngoại lệ
- **Tác động trải nghiệm:** Trung bình

---

**Tổng kết nhóm E:**
- ✅ 2 User Stories đã hoàn thành
- ✅ Bao phủ quy trình hoàn tất và kích hoạt lớp học
- ✅ Xử lý trường hợp kết thúc sớm
- ✅ Sử dụng thuật ngữ tiếng Việt nhất quán
- ✅ Tuân thủ template quy định
- ✅ Đặc biệt chú trọng đến giao dịch phân tán và đồng bộ dữ liệu
