# NHÓM C: PHÊ DUYỆT ĐƠN ĐĂNG KÝ

> **Nhóm chức năng:** Phê duyệt đơn đăng ký từ giáo viên
> **Số lượng User Stories:** 5
> **Vai trò chính:** Quản trị viên trường, Quản lý học vụ

---

## US-PIM-012: Xem danh sách đơn đăng ký

### Nội dung
Là **Quản trị viên trường hoặc Quản lý học vụ**
Tôi muốn **xem danh sách các đơn đăng ký sản phẩm giáo dục từ giáo viên**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **theo dõi và quản lý các đơn đăng ký đang chờ xử lý**

---

### Tiêu chí chấp nhận

#### TC-1 – Hiển thị danh sách đơn đăng ký
- **Tại:** Màn hình danh sách đơn đăng ký
- **Khi:** Quản trị viên/Quản lý học vụ truy cập
- **Thì:**
  - Hiển thị bảng đơn đăng ký với các cột:
    - Mã đơn
    - Tên sản phẩm
    - Tên giáo viên
    - Ngày gửi đơn
    - Trạng thái
    - Thao tác
  - Sắp xếp mặc định: Ngày gửi đơn giảm dần
  - Phân trang: 20 đơn/trang

---

#### TC-2 – Lọc đơn đăng ký theo trạng thái
- **Tại:** Màn hình danh sách
- **Khi:** Người dùng chọn bộ lọc
- **Thì:**
  - Danh sách chọn: Tất cả, Chờ xét duyệt, Đã chấp thuận, Đã từ chối, Chờ lịch, Đã xác nhận, Đã hoàn tất, Đang hoạt động
  - Ánh xạ:
    - Chờ xét duyệt: PENDING_REVIEW
    - Đã chấp thuận: APPROVED
    - Đã từ chối: REJECTED
    - Chờ lịch: SCHEDULE_ASSIGNED
    - Đã xác nhận: CONFIRMED
    - Đã hoàn tất: FINALIZED
    - Đang hoạt động: ACTIVE

---

#### TC-3 – Lọc theo sản phẩm giáo dục
- **Tại:** Màn hình danh sách
- **Khi:** Người dùng chọn lọc theo sản phẩm
- **Thì:**
  - Danh sách chọn hiển thị các sản phẩm của trường
  - Lọc đơn đăng ký theo sản phẩm được chọn

---

#### TC-4 – Tìm kiếm đơn đăng ký
- **Tại:** Màn hình danh sách
- **Khi:** Người dùng nhập từ khóa
- **Thì:**
  - Tìm kiếm trên: mã đơn, tên giáo viên, tên sản phẩm

---

#### TC-5 – Nhãn và mức độ ưu tiên
- **Tại:** Màn hình danh sách
- **Khi:** Hiển thị đơn đăng ký
- **Thì:**
  - Đơn đăng ký với trạng thái "Chờ xét duyệt" có nhãn "Mới"
  - Đơn đăng ký gần hết hạn xác nhận có nhãn "Gấp"
  - Mã màu theo trạng thái

---

#### TC-6 – Xem chi tiết đơn đăng ký
- **Tại:** Màn hình danh sách
- **Khi:** Người dùng nhấn vào một đơn
- **Thì:**
  - Chuyển đến màn hình chi tiết đơn đăng ký
  - Hiển thị đầy đủ thông tin để xét duyệt

---

### Giá trị kinh doanh
- Cung cấp cái nhìn tập trung cho tất cả đơn đăng ký
- Hỗ trợ sắp xếp mức độ ưu tiên
- Tăng tốc độ xử lý

---

### Chỉ số đo lường
- Thời gian tải trang < 2 giây
- Tỷ lệ sử dụng bộ lọc >= 50%

---

### Phụ thuộc
- Dịch vụ sf-product (PRIVATE_SCHOOL)
- Ứng dụng sf-web

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động trải nghiệm:** Cao

---

## US-PIM-013: Xét duyệt và chấp thuận đơn

### Nội dung
Là **Quản trị viên trường**
Tôi muốn **xem xét và chấp thuận đơn đăng ký sản phẩm giáo dục từ giáo viên**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **chọn giáo viên phù hợp cho sản phẩm và tiến hành bước tiếp theo trong quy trình**

---

### Tiêu chí chấp nhận

#### TC-1 – Xem chi tiết đơn đăng ký để xét duyệt
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Quản trị viên truy cập đơn đăng ký với trạng thái "Chờ xét duyệt"
- **Thì:**
  - Hiển thị đầy đủ thông tin:
    - Thông tin sản phẩm giáo dục
    - Hồ sơ giáo viên (bản chụp): trình độ, chứng chỉ, kinh nghiệm, đánh giá
    - Lịch có thể dạy của giáo viên
    - Chi tiết khóa học (bản chụp): giáo trình, tài liệu
    - Ngày gửi đơn
  - So sánh yêu cầu giáo viên với hồ sơ giáo viên (đánh dấu khớp/không khớp)
  - Các hành động: "Chấp thuận", "Yêu cầu cập nhật", "Từ chối"

---

#### TC-2 – Chấp thuận đơn đăng ký thành công
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Quản trị viên nhấn "Chấp thuận"
- **Thì:**
  - Hiển thị cửa sổ xác nhận
  - Sau khi xác nhận:
    - Cập nhật trạng thái đơn đăng ký = "Đã phê duyệt"
    - Lưu thời điểm phê duyệt
    - Lưu người phê duyệt
    - Gửi tín hiệu đến quy trình Temporal: Đã phê duyệt đơn
    - Bắt đầu đếm thời gian sắp xếp lịch (X ngày theo cấu hình sản phẩm)
    - Gửi sự kiện phê duyệt đơn
    - Sự kiện được gửi đến giáo viên
    - Thông báo gửi đến giáo viên: "Đơn đăng ký của bạn đã được chấp thuận"
    - Hiển thị: "Đã chấp thuận đơn đăng ký. Vui lòng sắp xếp lịch dạy"
    - Chuyển đến màn hình sắp xếp lịch

**Quy tắc nghiệp vụ:**
- Chỉ Quản trị viên mới có quyền phê duyệt
- Phê duyệt kích hoạt quy trình sắp xếp lịch

---

#### TC-3 – Không cho phép phê duyệt khi trạng thái không phải "Chờ xét duyệt"
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái khác "Chờ xét duyệt"
- **Thì:**
  - Nút "Chấp thuận" bị vô hiệu hóa hoặc không hiển thị

---

#### TC-4 – Lỗi khi gửi tín hiệu quy trình thất bại
- **Tại:** Hệ thống backend
- **Khi:** Gửi tín hiệu "Đã phê duyệt đơn" đến Temporal thất bại
- **Thì:**
  - Hoàn tác thay đổi trạng thái
  - Ghi nhật ký lỗi
  - Hiển thị: "Có lỗi xảy ra khi xử lý phê duyệt. Vui lòng thử lại"

---

#### TC-5 – Hiển thị so sánh yêu cầu và hồ sơ
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Xét duyệt đơn
- **Thì:**
  - Bảng so sánh:
    | Yêu cầu | Hồ sơ giáo viên | Kết quả |
    |---------|----------------|---------|
    | Trình độ tối thiểu | Trình độ hiện tại | ✓/✗ |
    | Kinh nghiệm tối thiểu | Kinh nghiệm thực tế | ✓/✗ |
    | Chứng chỉ yêu cầu | Chứng chỉ có | ✓/✗ |
  - Đánh dấu xanh (✓) nếu đáp ứng, đỏ (✗) nếu không đáp ứng

---

### Giá trị kinh doanh
- Cho phép trường kiểm soát chất lượng giáo viên
- Đảm bảo giáo viên phù hợp với yêu cầu
- Khởi động quy trình sắp xếp lịch

---

### Chỉ số đo lường
- Thời gian trung bình để phê duyệt một đơn < 30 phút
- Tỷ lệ phê duyệt / tổng số đơn xét duyệt >= 60%

---

### Phụ thuộc
- Dịch vụ sf-product (PRIVATE_SCHOOL)
- Temporal workflow
- Kafka
- Dịch vụ sf-notification-client

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Cao
- **Tác động nghiệp vụ:** Rất cao - Cổng kiểm soát phê duyệt quan trọng
- **Tác động trải nghiệm:** Cao

---

## US-PIM-014: Yêu cầu cập nhật đơn

### Nội dung
Là **Quản trị viên trường**
Tôi muốn **yêu cầu giáo viên cập nhật thông tin đơn đăng ký**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **yêu cầu giáo viên bổ sung hoặc chỉnh sửa thông tin trước khi quyết định chấp thuận hay từ chối**

---

### Tiêu chí chấp nhận

#### TC-1 – Yêu cầu cập nhật thành công
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Quản trị viên nhấn "Yêu cầu cập nhật" trên đơn đăng ký với trạng thái "Chờ xét duyệt"
- **Thì:**
  - Hiển thị cửa sổ với ô nhập phản hồi
  - Phản hồi bắt buộc (tối thiểu 10 ký tự)
  - Nút "Gửi yêu cầu" và "Hủy"
  - Sau khi gửi:
    - Cập nhật trạng thái đơn đăng ký = "Yêu cầu cập nhật"
    - Lưu phản hồi vào trường phản hồi từ trường
    - Gửi tín hiệu đến quy trình Temporal: Yêu cầu cập nhật
    - Gửi sự kiện yêu cầu cập nhật
    - Thông báo gửi đến giáo viên kèm phản hồi
    - Hiển thị: "Đã gửi yêu cầu cập nhật đến giáo viên"

**Quy tắc nghiệp vụ:**
- Phản hồi tối thiểu 10 ký tự
- Phải rõ ràng những gì cần cập nhật

---

#### TC-2 – Gợi ý và mẫu phản hồi
- **Tại:** Cửa sổ yêu cầu cập nhật
- **Khi:** Quản trị viên nhập phản hồi
- **Thì:**
  - Văn bản gợi ý: "Vui lòng mô tả rõ những thông tin cần cập nhật..."
  - Gợi ý nhanh:
    - "Bổ sung chứng chỉ [...]"
    - "Cập nhật lịch có thể dạy"
    - "Cập nhật giáo trình chi tiết hơn"
    - "Bổ sung thông tin kinh nghiệm"

---

#### TC-3 – Kiểm tra phản hồi
- **Tại:** Cửa sổ yêu cầu cập nhật
- **Khi:** Quản trị viên nhấn "Gửi yêu cầu" với phản hồi < 10 ký tự
- **Thì:**
  - Hiển thị lỗi: "Vui lòng nhập ít nhất 10 ký tự mô tả yêu cầu cập nhật"
  - Không cho phép gửi

---

#### TC-4 – Lịch sử yêu cầu cập nhật
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Có nhiều lần yêu cầu cập nhật
- **Thì:**
  - Hiển thị tất cả lần yêu cầu với:
    - Thời điểm
    - Phản hồi từ trường
    - Trạng thái (đã gửi lại / chưa gửi lại)

---

#### TC-5 – Giới hạn số lần yêu cầu
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đã yêu cầu cập nhật >= 3 lần
- **Thì:**
  - Hiển thị cảnh báo: "Đã yêu cầu cập nhật 3 lần. Nên xem xét từ chối đơn nếu giáo viên vẫn không đáp ứng yêu cầu"
  - Vẫn cho phép tiếp tục yêu cầu nhưng khuyến nghị từ chối

---

### Giá trị kinh doanh
- Cho phép giáo viên khắc phục vấn đề thay vì từ chối ngay
- Tăng tỷ lệ đơn đăng ký thành công
- Cải thiện chất lượng dữ liệu

---

### Chỉ số đo lường
- Tỷ lệ yêu cầu cập nhật / tổng số đơn xét duyệt <= 20%
- Tỷ lệ gửi lại sau yêu cầu cập nhật >= 80%

---

### Phụ thuộc
- Dịch vụ sf-product (PRIVATE_SCHOOL)
- Temporal workflow
- Kafka
- Dịch vụ sf-notification-client

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động trải nghiệm:** Trung bình

---

## US-PIM-015: Từ chối đơn đăng ký

### Nội dung
Là **Quản trị viên trường**
Tôi muốn **từ chối đơn đăng ký sản phẩm giáo dục từ giáo viên**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **loại bỏ các đơn đăng ký không phù hợp và kết thúc quy trình**

---

### Tiêu chí chấp nhận

#### TC-1 – Từ chối đơn đăng ký thành công
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Quản trị viên nhấn "Từ chối" trên đơn đăng ký với trạng thái "Chờ xét duyệt"
- **Thì:**
  - Hiển thị cửa sổ xác nhận
  - Ô nhập lý do từ chối (bắt buộc, tối thiểu 10 ký tự)
  - Nút "Xác nhận từ chối" và "Hủy"
  - Sau khi xác nhận:
    - Cập nhật trạng thái đơn đăng ký = "Đã từ chối"
    - Lưu lý do vào phản hồi từ trường
    - Gửi tín hiệu đến quy trình Temporal: Đã từ chối đơn (kết thúc quy trình)
    - Gửi sự kiện từ chối đơn
    - Thông báo gửi đến giáo viên kèm lý do
    - Hiển thị: "Đã từ chối đơn đăng ký"

**Quy tắc nghiệp vụ:**
- Lý do bắt buộc, tối thiểu 10 ký tự
- Từ chối là trạng thái kết thúc - không thể hoàn tác

---

#### TC-2 – Xác nhận với hậu quả
- **Tại:** Cửa sổ xác nhận từ chối
- **Khi:** Quản trị viên nhấn "Từ chối"
- **Thì:**
  - Thông báo cảnh báo: "Việc từ chối sẽ kết thúc quy trình đăng ký. Giáo viên có thể đăng ký lại nếu khắc phục được vấn đề"
  - Hộp chọn: "Tôi xác nhận muốn từ chối đơn đăng ký này"

---

#### TC-3 – Lý do từ chối phổ biến
- **Tại:** Cửa sổ từ chối
- **Khi:** Quản trị viên nhập lý do
- **Thì:**
  - Danh sách chọn nhanh với các lý do phổ biến:
    - "Không đủ trình độ yêu cầu"
    - "Thiếu chứng chỉ bắt buộc"
    - "Lịch không phù hợp"
    - "Giáo trình không đáp ứng"
    - "Kinh nghiệm chưa đủ"
    - "Khác (nhập thủ công)"

---

#### TC-4 – Phân loại lý do từ chối
- **Tại:** Cửa sổ từ chối
- **Khi:** Chọn lý do từ chối
- **Thì:**
  - Danh sách chọn loại lý do:
    - Không đủ năng lực
    - Không phù hợp lịch
    - Chất lượng giáo trình
    - Khác
  - Giúp phân tích và thống kê sau này

---

#### TC-5 – Thống kê lý do từ chối
- **Tại:** Báo cáo quản lý
- **Khi:** Xem báo cáo đơn đăng ký
- **Thì:**
  - Hiển thị biểu đồ phân bố lý do từ chối
  - Giúp cải thiện tiêu chí tuyển chọn

---

### Giá trị kinh doanh
- Cho phép trường kiểm soát chất lượng
- Cung cấp phản hồi rõ ràng cho giáo viên
- Giải phóng nguồn lực cho các đơn đăng ký khác

---

### Chỉ số đo lường
- Tỷ lệ từ chối / tổng số đơn xét duyệt <= 20%
- Tỷ lệ đăng ký lại sau khi bị từ chối >= 30%

---

### Phụ thuộc
- Dịch vụ sf-product (PRIVATE_SCHOOL)
- Temporal workflow
- Kafka
- Dịch vụ sf-notification-client

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động trải nghiệm:** Trung bình

---

## US-PIM-016: Sắp xếp lịch dạy

### Nội dung
Là **Quản lý học vụ**
Tôi muốn **lập lịch dạy dự kiến và gán cho đơn đăng ký đã được chấp thuận**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **đề xuất lịch cụ thể cho giáo viên xác nhận**

---

### Tiêu chí chấp nhận

#### TC-1 – Tạo lịch dạy dự kiến
- **Tại:** Màn hình quản lý lịch cho đơn đăng ký
- **Khi:** Quản lý học vụ truy cập đơn đăng ký với trạng thái "Đã phê duyệt"
- **Thì:**
  - Hiển thị form tạo lịch:
    - Ngày bắt đầu (chọn ngày, >= ngày bắt đầu sản phẩm)
    - Ngày kết thúc (chọn ngày, <= ngày kết thúc sản phẩm)
    - Khung giờ (chọn từ lịch có thể dạy của giáo viên và cấu hình sản phẩm)
    - Số học sinh dự kiến (nhập số)
  - Kiểm tra:
    - Ngày bắt đầu < Ngày kết thúc
    - Khung giờ phù hợp với lịch có thể dạy của giáo viên
    - Tổng số buổi đủ theo cấu hình sản phẩm
  - Hiển thị xem trước lịch (dạng lịch)

---

#### TC-2 – Gán lịch dạy thành công
- **Tại:** Màn hình quản lý lịch
- **Khi:** Quản lý học vụ nhấn "Gán lịch" sau khi điền đầy đủ thông tin hợp lệ
- **Thì:**
  - Tạo bản ghi lịch dạy với:
    - Loại lịch = "Dự kiến"
    - Trạng thái = "Đã đề xuất"
    - Khung giờ (dữ liệu JSON)
  - Cập nhật trạng thái đơn đăng ký = "Đã gán lịch"
  - Gửi tín hiệu đến quy trình Temporal: Đã gán lịch
  - Gửi sự kiện gán lịch
  - Sự kiện được gửi đến giáo viên
  - Thông báo gửi đến giáo viên: "Lịch dạy dự kiến đã được gửi. Vui lòng xác nhận trước [thời hạn]"
  - Hiển thị: "Đã gán lịch thành công. Đang chờ giáo viên xác nhận"

**Quy tắc nghiệp vụ:**
- Loại lịch = "Dự kiến" (chưa chính thức)
- Giáo viên có X ngày để xác nhận (theo cấu hình sản phẩm)
- Đồng hồ đếm ngược bắt đầu

---

#### TC-3 – Phát hiện xung đột với lịch có thể dạy của giáo viên
- **Tại:** Form tạo lịch
- **Khi:** Quản lý học vụ chọn khung giờ
- **Thì:**
  - Hệ thống kiểm tra khung giờ có nằm trong lịch có thể dạy của giáo viên không
  - Nếu có xung đột: đánh dấu và cảnh báo "Khung giờ này không nằm trong lịch có thể dạy của giáo viên"
  - Cho phép ghi đè với xác nhận

---

#### TC-4 – Tính toán số buổi học tự động
- **Tại:** Form tạo lịch
- **Khi:** Quản lý học vụ nhập ngày bắt đầu, ngày kết thúc, khung giờ
- **Thì:**
  - Tự động tính tổng số buổi học dựa trên:
    - Số buổi mỗi tuần (từ cấu hình sản phẩm)
    - Số tuần từ ngày bắt đầu đến ngày kết thúc
  - Hiển thị: "Tổng: [N] buổi / [M] buổi yêu cầu"
  - Kiểm tra: N phải >= M

---

#### TC-5 – Xem trước lịch dạng lịch
- **Tại:** Form tạo lịch
- **Khi:** Quản lý học vụ nhập thông tin
- **Thì:**
  - Hiển thị xem trước dạng lịch
  - Đánh dấu các ngày có lịch dạy
  - Hiển thị khung giờ trên từng ngày
  - Hiển thị tổng số buổi

---

#### TC-6 – Lỗi khi chưa có phê duyệt
- **Tại:** Màn hình quản lý lịch
- **Khi:** Đơn đăng ký có trạng thái khác "Đã phê duyệt"
- **Thì:**
  - Không cho phép gán lịch
  - Hiển thị thông báo: "Chỉ có thể gán lịch cho đơn đăng ký đã được chấp thuận"

---

#### TC-7 – Chỉnh sửa lịch sau khi gán
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Cần điều chỉnh lịch đã gán (trước khi giáo viên xác nhận)
- **Thì:**
  - Cho phép chỉnh sửa lịch
  - Cập nhật và gửi lại thông báo cho giáo viên
  - Reset đồng hồ đếm ngược xác nhận

---

### Giá trị kinh doanh
- Cụ thể hóa lịch dạy từ yêu cầu trừu tượng
- Đảm bảo lịch phù hợp với khả năng của giáo viên
- Kích hoạt quy trình xác nhận

---

### Chỉ số đo lường
- Thời gian trung bình để gán lịch sau phê duyệt < 48 giờ
- Tỷ lệ lịch được giáo viên xác nhận ngay lần đầu >= 70%

---

### Phụ thuộc
- Dịch vụ sf-product (PRIVATE_SCHOOL)
- Dịch vụ tf-class-management
- Dịch vụ tf-teacher-calendar (INDIVIDUAL) - để lấy lịch có thể dạy
- Temporal workflow
- Kafka

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Cao - Logic lịch, phát hiện xung đột
- **Tác động nghiệp vụ:** Rất cao - Quy trình sắp xếp lịch cốt lõi
- **Tác động trải nghiệm:** Cao - Form phức tạp với giao diện lịch

---

**Tổng kết nhóm C:**
- ✅ 5 User Stories đã hoàn thành
- ✅ Bao phủ toàn bộ quy trình phê duyệt và sắp xếp lịch
- ✅ Sử dụng thuật ngữ tiếng Việt nhất quán
- ✅ Tuân thủ template quy định
- ✅ Bao phủm luồng chính, luồng thay thế và trường hợp ngoại lệ
