# NHÓM F: TỰ ĐỘNG HÓA

> **Nhóm chức năng:** Tự động hóa quy trình với Temporal Workflow
> **Số lượng User Stories:** 2
> **Vai trò chính:** Hệ thống

---

## US-PIM-022: Tự động từ chối khi hết hạn

### Nội dung
Là **Hệ thống (Temporal Workflow)**
Tôi muốn **tự động từ chối đơn đăng ký khi giáo viên không xác nhận lịch trước thời hạn**
Tại **Hệ thống backend (Temporal)**
Để **tự động dọn dẹp các đơn đăng ký không có phản hồi và thông báo cho trường**

---

### Tiêu chí chấp nhận

#### TC-1 – Đồng hồ đếm kích hoạt tự động từ chối
- **Tại:** Quy trình Temporal
- **Khi:** Đồng hồ đếm xác nhận lịch hết hạn (X ngày theo cấu hình sản phẩm)
- **Thì:**
  - Kiểm tra trạng thái đơn đăng ký vẫn là "Đã gán lịch"
  - Thực thi hoạt động tự động từ chối
  - Cập nhật trạng thái đơn đăng ký = "Đã từ chối lịch"
  - Lưu lý do: "Tự động từ chối do không xác nhận trước thời hạn"
  - Gửi sự kiện từ chối từ giáo viên (tự động tạo)
  - Thông báo gửi đến giáo viên: "Đơn đăng ký đã bị tự động từ chối do quá hạn xác nhận"
  - Thông báo gửi đến trường: "Giáo viên [Tên] không xác nhận lịch. Đơn đăng ký đã bị hủy"
  - Kết thúc quy trình

**Quy tắc nghiệp vụ:**
- Thời lượng đồng hồ đếm = số ngày thời hạn xác nhận từ cấu hình sản phẩm
- Chỉ tự động từ chối khi trạng thái vẫn là "Đã gán lịch"

---

#### TC-2 – Nhắc nhở trước khi tự động từ chối
- **Tại:** Quy trình Temporal xác nhận lịch
- **Khi:** Còn 1 ngày trước thời hạn
- **Thì:**
  - Gửi thông báo nhắc nhở đến giáo viên: "Vui lòng xác nhận lịch dạy trước [thời hạn]. Nếu không, đơn đăng ký sẽ tự động bị hủy"
  - Gửi qua nhiều kênh: email, thông báo trong ứng dụng, SMS (nếu có)

---

#### TC-3 – Không tự động từ chối nếu giáo viên đã có hành động
- **Tại:** Quy trình Temporal
- **Khi:** Đồng hồ đếm hết hạn nhưng giáo viên đã xác nhận hoặc thương lượng
- **Thì:**
  - Không thực hiện tự động từ chối
  - Quy trình tiếp tục theo luồng bình thường

---

#### TC-4 – Ghi nhật ký tự động từ chối
- **Tại:** Hệ thống backend
- **Khi:** Tự động từ chối đơn đăng ký
- **Thì:**
  - Ghi nhật ký chi tiết:
    - Thời điểm tự động từ chối
    - Mã đơn đăng ký
    - Lý do: timeout
    - Thời lượng chờ
  - Dữ liệu dùng cho phân tích và cải thiện quy trình

---

#### TC-5 – Thống kê tự động từ chối
- **Tại:** Báo cáo quản lý
- **Khi:** Xem báo cáo đơn đăng ký
- **Thì:**
  - Hiển thị số lượng đơn bị tự động từ chối
  - Tỷ lệ tự động từ chối / tổng số lịch được gán
  - Thời gian phản hồi trung bình của giáo viên
  - Giúp điều chỉnh thời hạn xác nhận hợp lý

---

#### TC-6 – Cấu hình thời hạn linh hoạt
- **Tại:** Cấu hình sản phẩm giáo dục
- **Khi:** Tạo hoặc chỉnh sửa sản phẩm
- **Thì:**
  - Cho phép cấu hình số ngày thời hạn xác nhận
  - Mặc định: 7 ngày
  - Có thể điều chỉnh: 3-14 ngày
  - Thời hạn này được sử dụng bởi đồng hồ đếm Temporal

---

#### TC-7 – Giải phóng slot cho đơn khác
- **Tại:** Hệ thống backend
- **Khi:** Đơn đăng ký bị tự động từ chối
- **Thì:**
  - Trạng thái đơn đăng ký = kết thúc
  - Trường có thể phê duyệt đơn đăng ký khác cho cùng sản phẩm
  - Không khóa slot

---

### Giá trị kinh doanh
- Tự động hóa việc dọn dẹp
- Giải phóng các đơn đăng ký không có phản hồi
- Thông báo kịp thời cho các bên
- Giảm công việc thủ công

---

### Chỉ số đo lường
- Tỷ lệ tự động từ chối <= 10% tổng số lịch được gán
- Thời gian phản hồi trung bình của giáo viên < 3 ngày

---

### Phụ thuộc
- Temporal workflow
- Dịch vụ sf-product
- Kafka
- Dịch vụ sf-notification-client

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Trung bình - Đồng hồ đếm Temporal
- **Tác động nghiệp vụ:** Cao - Tự động hóa
- **Tác động trải nghiệm:** Thấp - Tự động hóa backend

---

## US-PIM-023: Tự động nhắc nhở xét duyệt

### Nội dung
Là **Hệ thống**
Tôi muốn **tự động nhắc nhở Quản trị viên trường xét duyệt các đơn đăng ký đang chờ**
Tại **Hệ thống backend**
Để **tăng tốc độ xử lý và tránh đơn đăng ký bị quên**

---

### Tiêu chí chấp nhận

#### TC-1 – Nhắc nhở hàng ngày cho đơn đang chờ xét duyệt
- **Tại:** Công việc định kỳ backend (cron)
- **Khi:** Hàng ngày vào 9:00 sáng
- **Thì:**
  - Truy vấn tất cả đơn đăng ký với:
    - Trạng thái = "Chờ xét duyệt"
    - Ngày gửi đơn >= 3 ngày trước
  - Nhóm theo trường
  - Gửi thông báo đến Quản trị viên trường: "Bạn có [N] đơn đăng ký đang chờ xét duyệt từ [X] ngày trước"
  - Liên kết đến danh sách đơn đăng ký

**Quy tắc nghiệp vụ:**
- Nhắc nhở sau 3 ngày chưa xét duyệt
- Tần suất hàng ngày

---

#### TC-2 – Nhắc nhở khẩn cấp
- **Tại:** Hệ thống backend
- **Khi:** Đơn đăng ký chờ xét duyệt > 7 ngày
- **Thì:**
  - Gửi thông báo khẩn cấp với mức ưu tiên cao hơn
  - Tiêu đề: "[KHẨN CẤP] Đơn đăng ký đang chờ quá lâu"
  - Gửi qua nhiều kênh: email, thông báo trong ứng dụng

---

#### TC-3 – Tổng hợp đơn đăng ký theo sản phẩm
- **Tại:** Thông báo nhắc nhở
- **Khi:** Gửi thông báo
- **Thì:**
  - Nhóm đơn đăng ký theo sản phẩm giáo dục
  - Hiển thị:
    - Tên sản phẩm
    - Số lượng đơn đang chờ
    - Đơn cũ nhất (ngày gửi)
  - Giúp Quản trị viên ưu tiên xử lý

---

#### TC-4 – Cấu hình tần suất nhắc nhở
- **Tại:** Cài đặt hệ thống
- **Khi:** Quản trị viên cấu hình
- **Thì:**
  - Cho phép bật/tắt nhắc nhở tự động
  - Cấu hình ngưỡng ngày (mặc định 3 ngày)
  - Cấu hình giờ gửi thông báo (mặc định 9:00)
  - Cấu hình kênh thông báo

---

#### TC-5 – Tránh spam thông báo
- **Tại:** Hệ thống backend
- **Khi:** Gửi thông báo nhắc nhở
- **Thì:**
  - Chỉ gửi 1 thông báo/ngày cho mỗi trường
  - Nhóm tất cả đơn đăng ký vào 1 thông báo
  - Không gửi nếu không có đơn đăng ký mới cần xét duyệt

---

#### TC-6 – Thống kê hiệu quả nhắc nhở
- **Tại:** Báo cáo quản lý
- **Khi:** Xem báo cáo
- **Thì:**
  - Thời gian xét duyệt trung bình trước/sau khi có nhắc nhở
  - Tỷ lệ đơn được xét duyệt trong 24 giờ sau nhắc nhở
  - Số lượng thông báo đã gửi
  - Đánh giá hiệu quả của tính năng

---

#### TC-7 – Nhắc nhở cá nhân hóa
- **Tại:** Thông báo nhắc nhở
- **Khi:** Gửi thông báo
- **Thì:**
  - Hiển thị tên Quản trị viên
  - Danh sách cụ thể các đơn cần xét duyệt
  - Nút "Xét duyệt ngay" liên kết trực tiếp đến đơn đăng ký cũ nhất

---

#### TC-8 – Báo cáo cho cấp quản lý cao hơn
- **Tại:** Hệ thống backend
- **Khi:** Đơn đăng ký chờ xét duyệt > 14 ngày
- **Thì:**
  - Gửi báo cáo đến cấp quản lý cao hơn (nếu có cấu hình)
  - Cảnh báo về hiệu suất xét duyệt thấp
  - Đề xuất hành động

---

### Giá trị kinh doanh
- Tăng tốc độ xét duyệt
- Giảm thời gian chờ cho giáo viên
- Cải thiện SLA (Service Level Agreement)
- Tăng trải nghiệm người dùng

---

### Chỉ số đo lường
- Thời gian chờ xét duyệt trung bình giảm từ 5 ngày xuống 2 ngày
- Tỷ lệ đơn được xét duyệt trong 3 ngày >= 80%
- Tỷ lệ mở thông báo nhắc nhở >= 70%

---

### Phụ thuộc
- Công việc định kỳ backend (cron job/scheduler)
- Dịch vụ sf-notification-client
- Dịch vụ sf-product

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Thấp - Công việc định kỳ đơn giản
- **Tác động nghiệp vụ:** Trung bình - Cải thiện quy trình
- **Tác động trải nghiệm:** Thấp

---

**Tổng kết nhóm F:**
- ✅ 2 User Stories đã hoàn thành
- ✅ Tự động hóa việc từ chối đơn hết hạn
- ✅ Tự động hóa việc nhắc nhở xét duyệt
- ✅ Sử dụng thuật ngữ tiếng Việt nhất quán
- ✅ Tuân thủ template quy định
- ✅ Giảm công việc thủ công, tăng hiệu quả xử lý
