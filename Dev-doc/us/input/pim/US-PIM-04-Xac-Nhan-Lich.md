# NHÓM D: XÁC NHẬN LỊCH DẠY

> **Nhóm chức năng:** Xác nhận lịch dạy từ giáo viên
> **Số lượng User Stories:** 3
> **Vai trò chính:** Giáo viên tự do

---

## US-PIM-017: Xác nhận lịch dạy

### Nội dung
Là **Giáo viên tự do**
Tôi muốn **xác nhận lịch dạy dự kiến mà trường đã gửi**
Tại **Cổng giáo viên (tf-web) hoặc sf-web**
Để **chấp thuận lịch và tiến hành bước hoàn tất**

---

### Tiêu chí chấp nhận

#### TC-1 – Xem lịch dạy chi tiết
- **Tại:** Màn hình chi tiết đơn đăng ký với trạng thái "Đã gán lịch"
- **Khi:** Giáo viên truy cập
- **Thì:**
  - Hiển thị lịch dạy dự kiến:
    - Ngày bắt đầu, Ngày kết thúc
    - Khung giờ (dạng lịch)
    - Số học sinh dự kiến
    - Tổng số buổi học
  - Thời hạn xác nhận với đồng hồ đếm ngược
  - 3 nút: "Xác nhận", "Đề xuất thay đổi", "Từ chối"

---

#### TC-2 – Xác nhận lịch dạy thành công
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Giáo viên nhấn "Xác nhận"
- **Thì:**
  - Hiển thị cửa sổ xác nhận: "Bạn có chắc muốn xác nhận lịch dạy này?"
  - Cảnh báo: "Sau khi xác nhận, lịch sẽ được đưa vào lịch làm việc của bạn"
  - Sau khi xác nhận:
    - Cập nhật trạng thái đơn đăng ký = "Đã xác nhận"
    - Cập nhật trạng thái lịch = "Đã chấp nhận"
    - Gửi tín hiệu đến quy trình Temporal: Giáo viên đã xác nhận
    - Gửi sự kiện xác nhận từ giáo viên
    - Sự kiện được gửi đến trường
    - Thông báo gửi đến trường: "Giáo viên [Tên] đã xác nhận lịch dạy"
    - Hiển thị: "Đã xác nhận lịch thành công. Chờ trường hoàn tất thủ tục"

**Quy tắc nghiệp vụ:**
- Chỉ có thể xác nhận trước thời hạn xác nhận
- Xác nhận kích hoạt quy trình hoàn tất

---

#### TC-3 – Không cho phép xác nhận sau thời hạn
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Thời hạn xác nhận đã qua
- **Thì:**
  - Nút "Xác nhận" bị vô hiệu hóa
  - Hiển thị thông báo: "Đã hết hạn xác nhận. Vui lòng liên hệ trường"
  - Trạng thái đơn đăng ký tự động chuyển sang "Đã từ chối lịch" (bởi đồng hồ đếm Temporal)

**Quy tắc nghiệp vụ:**
- Đồng hồ đếm Temporal tự động từ chối nếu không xác nhận trước thời hạn

---

#### TC-4 – Kiểm tra chồng lấn lịch
- **Tại:** Màn hình chi tiết lịch
- **Khi:** Giáo viên xem lịch
- **Thì:**
  - Hệ thống kiểm tra lịch có xung đột với lịch làm việc hiện tại không (dịch vụ quản lý lịch giáo viên)
  - Nếu có xung đột: cảnh báo "Lịch này trùng với các lịch khác của bạn: [danh sách]"
  - Cho phép tiếp tục xác nhận

---

#### TC-5 – Xem lịch dạng lịch
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Giáo viên xem lịch
- **Thì:**
  - Hiển thị lịch dạng lịch tháng
  - Đánh dấu các ngày có lịch dạy
  - Hiển thị khung giờ khi rê chuột vào ngày
  - Có thể chuyển đổi giữa dạng lịch và dạng danh sách

---

#### TC-6 – Đếm ngược thời hạn
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái "Đã gán lịch"
- **Thì:**
  - Hiển thị đồng hồ đếm ngược: "Còn X ngày Y giờ để xác nhận"
  - Thay đổi màu:
    - Xanh: > 3 ngày
    - Vàng: 1-3 ngày
    - Đỏ: < 1 ngày
  - Gửi thông báo nhắc nhở khi còn 1 ngày

---

### Giá trị kinh doanh
- Giáo viên cam kết với lịch dạy cụ thể
- Kích hoạt hoàn tất và tạo lớp học
- Đảm bảo khả năng sẵn sàng

---

### Chỉ số đo lường
- Tỷ lệ xác nhận / lịch được gán >= 70%
- Thời gian trung bình để xác nhận sau khi nhận lịch < 24 giờ

---

### Phụ thuộc
- Dịch vụ sf-product (INDIVIDUAL)
- Dịch vụ tf-teacher-calendar
- Temporal workflow
- Kafka

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Rất cao - Điểm cam kết quan trọng
- **Tác động trải nghiệm:** Cao

---

## US-PIM-018: Thương lượng lịch dạy

### Nội dung
Là **Giáo viên tự do**
Tôi muốn **đề xuất thay đổi lịch dạy**
Tại **Cổng giáo viên (tf-web) hoặc sf-web**
Để **thương lượng lịch phù hợp hơn với mình trước khi xác nhận**

---

### Tiêu chí chấp nhận

#### TC-1 – Mở màn hình thương lượng
- **Tại:** Màn hình chi tiết đơn đăng ký với trạng thái "Đã gán lịch"
- **Khi:** Giáo viên nhấn "Đề xuất thay đổi"
- **Thì:**
  - Hiển thị cửa sổ thương lượng lịch
  - Hiển thị lịch hiện tại (chế độ chỉ đọc)
  - Form đề xuất thay đổi:
    - Ô nhập mô tả đề xuất
    - Khung giờ đề xuất (tùy chọn - chọn từ lịch)
    - Ngày bắt đầu/kết thúc đề xuất (tùy chọn)

---

#### TC-2 – Gửi đề xuất thương lượng thành công
- **Tại:** Màn hình thương lượng
- **Khi:** Giáo viên nhập đề xuất và nhấn "Gửi đề xuất"
- **Thì:**
  - Kiểm tra: mô tả tối thiểu 10 ký tự
  - Cập nhật trạng thái đơn đăng ký = "Đang thương lượng"
  - Tạo bản ghi thương lượng:
    - Vòng thương lượng (tăng dần)
    - Người khởi tạo = "Giáo viên"
    - Thay đổi đề xuất (dữ liệu JSON)
    - Trạng thái phản hồi = "Chờ phản hồi"
  - Gửi tín hiệu đến quy trình Temporal: Giáo viên đã thương lượng
  - Gửi sự kiện thương lượng lịch
  - Sự kiện được gửi đến trường
  - Thông báo gửi đến trường: "Giáo viên đề xuất thay đổi lịch"
  - Hiển thị: "Đã gửi đề xuất thành công. Chờ trường phản hồi"

**Quy tắc nghiệp vụ:**
- Tối đa 3 vòng thương lượng
- Thời hạn thương lượng: 3 ngày

---

#### TC-3 – Không cho phép thương lượng quá số lần quy định
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký đã có >= 3 vòng thương lượng
- **Thì:**
  - Nút "Đề xuất thay đổi" bị vô hiệu hóa
  - Thông báo: "Đã đạt giới hạn số lần thương lượng. Vui lòng xác nhận hoặc từ chối"

---

#### TC-4 – Gợi ý nhanh cho đề xuất
- **Tại:** Form thương lượng
- **Khi:** Giáo viên nhập đề xuất
- **Thì:**
  - Chọn nhanh:
    - "Muốn dời ngày bắt đầu đến [chọn ngày]"
    - "Muốn thay đổi khung giờ [chọn giờ]"
    - "Muốn giảm số buổi mỗi tuần"
    - "Muốn điều chỉnh ngày kết thúc"

---

#### TC-5 – Lịch sử thương lượng
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Có nhiều vòng thương lượng
- **Thì:**
  - Hiển thị dòng thời gian thương lượng:
    - Vòng 1: Đề xuất từ giáo viên → Phản hồi từ trường
    - Vòng 2: Đề xuất từ giáo viên → Phản hồi từ trường
    - ...
  - Mỗi vòng hiển thị:
    - Thời điểm
    - Đề xuất
    - Phản hồi
    - Trạng thái

---

#### TC-6 – Xem phản hồi từ trường
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Trường đã phản hồi đề xuất
- **Thì:**
  - Hiển thị phản hồi rõ ràng
  - Nếu trường chấp nhận: lịch được cập nhật, trạng thái = "Đã gán lịch"
  - Nếu trường từ chối: hiển thị lý do, cho phép đề xuất lại hoặc xác nhận lịch cũ

---

#### TC-7 – Hết hạn thương lượng
- **Tại:** Hệ thống backend
- **Khi:** Quá 3 ngày không có phản hồi từ trường
- **Thì:**
  - Trạng thái đơn đăng ký = "Đã từ chối lịch"
  - Gửi sự kiện thương lượng thất bại
  - Thông báo cho cả giáo viên và trường

---

### Giá trị kinh doanh
- Tăng tính linh hoạt trong sắp xếp lịch
- Giảm tỷ lệ từ chối lịch
- Tối ưu hóa sự phù hợp giữa trường và giáo viên

---

### Chỉ số đo lường
- Tỷ lệ thương lượng / lịch được gán <= 30%
- Tỷ lệ thành công sau thương lượng >= 60%

---

### Phụ thuộc
- Dịch vụ sf-product (INDIVIDUAL)
- Temporal workflow
- Kafka
- Bảng lịch sử thương lượng

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động trải nghiệm:** Cao

---

## US-PIM-019: Từ chối lịch dạy

### Nội dung
Là **Giáo viên tự do**
Tôi muốn **từ chối lịch dạy mà trường đã gửi**
Tại **Cổng giáo viên (tf-web) hoặc sf-web**
Để **kết thúc đơn đăng ký khi lịch không phù hợp và không thể thương lượng**

---

### Tiêu chí chấp nhận

#### TC-1 – Từ chối lịch dạy thành công
- **Tại:** Màn hình chi tiết đơn đăng ký với trạng thái "Đã gán lịch" hoặc "Đang thương lượng"
- **Khi:** Giáo viên nhấn "Từ chối"
- **Thì:**
  - Hiển thị cửa sổ xác nhận
  - Ô nhập lý do (bắt buộc, tối thiểu 10 ký tự)
  - Cảnh báo: "Việc từ chối sẽ kết thúc quy trình đăng ký này"
  - Sau khi xác nhận:
    - Cập nhật trạng thái đơn đăng ký = "Đã từ chối lịch"
    - Lưu lý do vào phản hồi giáo viên
    - Gửi tín hiệu đến quy trình Temporal: Giáo viên đã từ chối (kết thúc quy trình)
    - Gửi sự kiện từ chối từ giáo viên
    - Sự kiện được gửi đến trường
    - Thông báo gửi đến trường kèm lý do
    - Hiển thị: "Đã từ chối lịch dạy"

**Quy tắc nghiệp vụ:**
- "Đã từ chối lịch" là trạng thái kết thúc
- Lý do bắt buộc

---

#### TC-2 – Lý do từ chối phổ biến
- **Tại:** Cửa sổ từ chối
- **Khi:** Giáo viên nhập lý do
- **Thì:**
  - Chọn nhanh:
    - "Lịch trùng với cam kết khác"
    - "Khung giờ không phù hợp"
    - "Số buổi quá nhiều"
    - "Thời gian quá gấp"
    - "Không thể sắp xếp được"
    - "Khác (nhập thủ công)"

---

#### TC-3 – Xác nhận hậu quả
- **Tại:** Cửa sổ xác nhận từ chối
- **Khi:** Giáo viên nhấn "Từ chối"
- **Thì:**
  - Hiển thị cảnh báo rõ ràng:
    - "Việc từ chối lịch sẽ kết thúc quy trình đăng ký này"
    - "Bạn sẽ cần đăng ký lại từ đầu nếu muốn tham gia sản phẩm này"
  - Hộp chọn: "Tôi hiểu và xác nhận muốn từ chối lịch dạy"

---

#### TC-4 – Phân tích lý do từ chối
- **Tại:** Báo cáo quản lý (phía trường)
- **Khi:** Xem thống kê đơn đăng ký
- **Thì:**
  - Biểu đồ phân bố lý do từ chối lịch
  - Giúp cải thiện cách sắp xếp lịch

---

#### TC-5 – Thông báo cho trường
- **Tại:** Phía trường, màn hình quản lý đơn
- **Khi:** Giáo viên từ chối lịch
- **Thì:**
  - Thông báo ngay lập tức
  - Hiển thị lý do từ chối
  - Gợi ý: "Có thể sắp xếp lại lịch hoặc tìm giáo viên khác"

---

#### TC-6 – Giải phóng slot
- **Tại:** Hệ thống backend
- **Khi:** Giáo viên từ chối lịch
- **Thì:**
  - Đơn đăng ký kết thúc
  - Trường có thể phê duyệt đơn đăng ký khác cho cùng sản phẩm
  - Không khóa slot

---

### Giá trị kinh doanh
- Cho phép giáo viên từ chối khi không phù hợp
- Giải phóng cơ hội cho giáo viên khác
- Cung cấp phản hồi cho trường

---

### Chỉ số đo lường
- Tỷ lệ từ chối lịch / lịch được gán <= 15%

---

### Phụ thuộc
- Dịch vụ sf-product (INDIVIDUAL)
- Temporal workflow
- Kafka

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Thấp
- **Tác động nghiệp vụ:** Trung bình
- **Tác động trải nghiệm:** Thấp

---

**Tổng kết nhóm D:**
- ✅ 3 User Stories đã hoàn thành
- ✅ Bao phủ toàn bộ quy trình xác nhận lịch từ phía giáo viên
- ✅ Hỗ trợ 3 hành động: Xác nhận, Thương lượng, Từ chối
- ✅ Sử dụng thuật ngữ tiếng Việt nhất quán
- ✅ Tuân thủ template quy định
- ✅ Bao phủm luồng chính, luồng thay thế và trường hợp ngoại lệ
- ✅ Đặc biệt chú trọng đến quản lý thời hạn và đồng hồ đếm ngược
