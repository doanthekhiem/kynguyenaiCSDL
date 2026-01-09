# NHÓM A: QUẢN LÝ SẢN PHẨM GIÁO DỤC

> **Nhóm chức năng:** Quản lý sản phẩm giáo dục (PIM)
> **Số lượng User Stories:** 6
> **Vai trò chính:** Quản trị viên trường

---

## US-PIM-001: Tạo sản phẩm giáo dục mới

### Nội dung
Là **Quản trị viên trường**
Tôi muốn **tạo mới một sản phẩm giáo dục (chương trình/khóa học)**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **khai báo thông tin sản phẩm giáo dục mà trường muốn hợp tác với giáo viên tự do**

---

### Tiêu chí chấp nhận

#### TC-1 – Nhập thông tin cơ bản sản phẩm
- **Tại:** Màn hình tạo sản phẩm giáo dục
- **Khi:** Quản trị viên nhập đầy đủ thông tin: Mã sản phẩm, Tên, Loại (Chương trình/Khóa học), Mô tả, Ngày bắt đầu, Ngày kết thúc
- **Thì:**
  - Hệ thống kiểm tra các trường bắt buộc
  - Mã sản phẩm phải duy nhất trong trường
  - Ngày bắt đầu phải nhỏ hơn Ngày kết thúc
  - Sản phẩm được tạo với trạng thái "Bản nháp"
  - Hiển thị thông báo "Tạo sản phẩm giáo dục thành công"

**Quy tắc nghiệp vụ:**
- Mã sản phẩm: Chỉ gồm chữ cái in hoa, số và dấu gạch ngang, tối đa 50 ký tự
- Tên sản phẩm: Tối đa 255 ký tự
- Loại: Chỉ nhận giá trị "Chương trình" hoặc "Khóa học"

---

#### TC-2 – Cấu hình thông tin chi phí
- **Tại:** Màn hình tạo sản phẩm, tab "Thông tin chi phí"
- **Khi:** Quản trị viên thêm các loại phí (Học phí, Học liệu, Hoa hồng)
- **Thì:**
  - Mỗi loại phí phải có: Loại phí, Số tiền (>= 0), Đơn vị tiền tệ (mặc định VNĐ), Chu kỳ thanh toán
  - Có thể thêm nhiều loại phí
  - Hiển thị danh sách phí đã cấu hình dạng bảng

**Quy tắc nghiệp vụ:**
- Số tiền phải >= 0
- Chu kỳ thanh toán: Một lần, Hàng tháng, Theo buổi học

---

#### TC-3 – Cấu hình yêu cầu giáo viên
- **Tại:** Màn hình tạo sản phẩm, tab "Yêu cầu giáo viên"
- **Khi:** Quản trị viên nhập yêu cầu về trình độ giáo viên
- **Thì:**
  - Chọn trình độ tối thiểu: Cử nhân/Thạc sĩ/Tiến sĩ
  - Nhập số năm kinh nghiệm tối thiểu (>= 0)
  - Thêm danh sách chứng chỉ bắt buộc
  - Thêm danh sách kỹ năng ưu tiên
  - Dữ liệu được lưu vào hệ thống

**Quy tắc nghiệp vụ:**
- Trình độ: Cử nhân, Thạc sĩ, Tiến sĩ
- Số năm kinh nghiệm >= 0

---

#### TC-4 – Cấu hình lịch trình giảng dạy
- **Tại:** Màn hình tạo sản phẩm, tab "Cấu hình lịch"
- **Khi:** Quản trị viên cấu hình thông tin lịch dạy
- **Thì:**
  - Chọn loại lịch: Cố định/Linh hoạt
  - Nhập thời lượng mỗi buổi (giờ, > 0)
  - Nhập số buổi mỗi tuần (> 0)
  - Nhập tổng số buổi (> 0)
  - Chọn khung giờ có thể dạy
  - Nhập thời hạn xác nhận (ngày, mặc định 7)
  - Dữ liệu được lưu vào hệ thống

**Quy tắc nghiệp vụ:**
- Thời lượng, Số buổi/tuần, Tổng số buổi phải > 0
- Thời hạn xác nhận >= 1 ngày

---

#### TC-5 – Thêm ưu đãi cho giáo viên
- **Tại:** Màn hình tạo sản phẩm, tab "Ưu đãi"
- **Khi:** Quản trị viên thêm các ưu đãi cho giáo viên
- **Thì:**
  - Chọn loại ưu đãi: Thưởng, Giảm giá, Đào tạo
  - Nhập mô tả ưu đãi
  - Cấu hình điều kiện áp dụng (nếu có)
  - Hiển thị danh sách ưu đãi đã thêm

---

#### TC-6 – Kiểm tra lỗi nhập liệu
- **Tại:** Màn hình tạo sản phẩm
- **Khi:** Quản trị viên nhập dữ liệu không hợp lệ
- **Thì:**
  - Hiển thị thông báo lỗi rõ ràng tại từng trường
  - Mã sản phẩm trùng: "Mã sản phẩm đã tồn tại trong hệ thống"
  - Ngày bắt đầu >= Ngày kết thúc: "Ngày bắt đầu phải nhỏ hơn ngày kết thúc"
  - Không cho phép lưu sản phẩm

---

### Giá trị kinh doanh
- Cho phép trường tư nhân khai báo sản phẩm giáo dục một cách có cấu trúc và đầy đủ
- Cung cấp thông tin chi tiết để giáo viên tự do có thể đánh giá và đăng ký
- Tạo nền tảng cho quy trình hợp tác giữa trường và giáo viên

---

### Chỉ số đo lường
- Số lượng sản phẩm được tạo thành công / tổng số lượt tạo >= 95%
- Thời gian trung bình để tạo một sản phẩm < 10 phút
- Tỷ lệ sản phẩm có đầy đủ thông tin (chi phí, yêu cầu, lịch) >= 90%

---

### Phụ thuộc
- Dịch vụ sf-product
- Ứng dụng sf-web (Cổng quản lý nhà trường)
- Cơ sở dữ liệu: pim, pim_fee, pim_benefit, pim_teacher_requirement, pim_schedule_config

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Cao - Cần tạo mới cấu trúc dữ liệu, API, các thành phần giao diện
- **Tác động nghiệp vụ:** Cao - Tính năng cốt lõi của quy trình PIM
- **Tác động trải nghiệm:** Trung bình - Form nhập liệu phức tạp với nhiều tab

---

## US-PIM-002: Công bố sản phẩm giáo dục

### Nội dung
Là **Quản trị viên trường**
Tôi muốn **công bố sản phẩm giáo dục đã tạo (trạng thái Bản nháp)**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **phân phối thông tin đến giáo viên tự do đã hợp tác, cho phép họ xem và đăng ký**

---

### Tiêu chí chấp nhận

#### TC-1 – Công bố sản phẩm thành công (Luồng chính)
- **Tại:** Màn hình chi tiết sản phẩm hoặc danh sách sản phẩm
- **Khi:** Quản trị viên nhấn nút "Công bố" trên sản phẩm có trạng thái "Bản nháp" và đã điền đủ thông tin
- **Thì:**
  - Hệ thống kiểm tra tất cả thông tin bắt buộc đã được điền
  - Cập nhật trạng thái sản phẩm = "Đang công bố"
  - Cập nhật thời điểm công bố
  - Gửi sự kiện công bố sản phẩm đến hệ thống phân phối
  - Sự kiện được chuyển đến các giáo viên có quan hệ hợp tác đang hoạt động
  - Hiển thị thông báo "Sản phẩm đã được phân phối thành công"

**Quy tắc nghiệp vụ:**
- Sản phẩm phải có trạng thái "Bản nháp"
- Thông tin bắt buộc: mã, tên, loại, ngày bắt đầu, ngày kết thúc, cấu hình lịch
- Quan hệ hợp tác giữa trường và giáo viên phải có trạng thái "Đang hoạt động"

---

#### TC-2 – Không cho phép công bố khi thiếu thông tin
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Quản trị viên nhấn "Công bố" nhưng sản phẩm thiếu thông tin bắt buộc
- **Thì:**
  - Hiển thị cửa sổ cảnh báo: "Vui lòng điền đầy đủ thông tin bắt buộc"
  - Liệt kê các trường còn thiếu
  - Không cho phép công bố
  - Sản phẩm vẫn giữ trạng thái "Bản nháp"

---

#### TC-3 – Không cho phép công bố khi không có giáo viên hợp tác
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Quản trị viên nhấn "Công bố" nhưng không có quan hệ hợp tác đang hoạt động
- **Thì:**
  - Hiển thị cửa sổ cảnh báo: "Không tìm thấy giáo viên hợp tác. Vui lòng thiết lập hợp tác trước khi công bố sản phẩm"
  - Không cho phép công bố
  - Sản phẩm vẫn giữ trạng thái "Bản nháp"

---

#### TC-4 – Hiển thị danh sách giáo viên sẽ nhận sản phẩm
- **Tại:** Cửa sổ xác nhận công bố
- **Khi:** Quản trị viên nhấn "Công bố" và mọi điều kiện hợp lệ
- **Thì:**
  - Hiển thị cửa sổ xác nhận với danh sách giáo viên sẽ nhận sản phẩm
  - Hiển thị số lượng giáo viên
  - Nút "Xác nhận công bố" và "Hủy"

---

#### TC-5 – Xử lý lỗi khi gửi sự kiện thất bại
- **Tại:** Hệ thống backend
- **Khi:** Gửi sự kiện công bố sản phẩm thất bại sau số lần thử lại tối đa
- **Thì:**
  - Hoàn tác thay đổi (sản phẩm vẫn giữ trạng thái "Bản nháp")
  - Ghi nhật ký lỗi với chi tiết lỗi
  - Hiển thị thông báo: "Có lỗi xảy ra khi phân phối sản phẩm. Vui lòng thử lại"
  - Cảnh báo đội vận hành

**Quy tắc nghiệp vụ:**
- Sử dụng cơ chế outbox để đảm bảo tính nhất quán
- Số lần thử lại tối đa: 3 lần với thời gian chờ tăng dần

---

### Giá trị kinh doanh
- Tự động phân phối thông tin sản phẩm đến đúng đối tượng giáo viên
- Giảm thời gian và công sức phối hợp thủ công
- Đảm bảo tính kịp thời và chính xác của thông tin

---

### Chỉ số đo lường
- Tỷ lệ công bố sản phẩm thành công >= 99%
- Thời gian trung bình để sự kiện đến giáo viên < 5 giây
- Số lượng sự kiện thất bại < 1% tổng sự kiện

---

### Phụ thuộc
- Dịch vụ sf-product (PRIVATE_SCHOOL)
- Hệ thống Kafka (chủ đề: pim.lifecycle)
- Dịch vụ sf-product (INDIVIDUAL) - người nhận sự kiện
- Bảng quan hệ hợp tác (partnership)
- Dịch vụ sf-notification-client (tùy chọn - để thông báo giáo viên)

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Cao - Kiến trúc hướng sự kiện, tích hợp Kafka
- **Tác động nghiệp vụ:** Cao - Kích hoạt quy trình phân phối sản phẩm
- **Tác động trải nghiệm:** Thấp - Chỉ là nút hành động

---

## US-PIM-003: Xem và quản lý danh sách sản phẩm

### Nội dung
Là **Quản trị viên trường**
Tôi muốn **xem danh sách tất cả sản phẩm giáo dục của trường**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **quản lý và theo dõi trạng thái các sản phẩm đã khai báo**

---

### Tiêu chí chấp nhận

#### TC-1 – Hiển thị danh sách sản phẩm với phân trang
- **Tại:** Màn hình danh sách sản phẩm giáo dục
- **Khi:** Quản trị viên truy cập trang quản lý sản phẩm
- **Thì:**
  - Hiển thị danh sách sản phẩm dạng bảng
  - Các cột: Mã, Tên, Loại, Trạng thái, Ngày công bố, Ngày bắt đầu, Ngày kết thúc, Thao tác
  - Sắp xếp mặc định: Ngày công bố giảm dần
  - Phân trang: 20 sản phẩm/trang
  - Hiển thị nhãn trạng thái với màu sắc phân biệt

**Quy tắc nghiệp vụ:**
- Màu nhãn trạng thái: Bản nháp (xám), Đang công bố (xanh lá), Tạm dừng (vàng), Lưu trữ (đỏ)

---

#### TC-2 – Lọc sản phẩm theo trạng thái
- **Tại:** Màn hình danh sách sản phẩm
- **Khi:** Quản trị viên chọn bộ lọc theo trạng thái
- **Thì:**
  - Danh sách chọn: Tất cả, Bản nháp, Đang công bố, Tạm dừng, Lưu trữ
  - Danh sách được làm mới theo bộ lọc
  - Giữ nguyên phân trang và sắp xếp

---

#### TC-3 – Tìm kiếm sản phẩm
- **Tại:** Màn hình danh sách sản phẩm
- **Khi:** Quản trị viên nhập từ khóa vào ô tìm kiếm
- **Thì:**
  - Tìm kiếm trên các trường: mã, tên, mô tả
  - Không phân biệt chữ hoa chữ thường
  - Kết quả được đánh dấu từ khóa
  - Hiển thị "Không tìm thấy kết quả" nếu không có sản phẩm nào khớp

---

#### TC-4 – Xem chi tiết sản phẩm
- **Tại:** Màn hình danh sách sản phẩm
- **Khi:** Quản trị viên nhấn vào một sản phẩm
- **Thì:**
  - Chuyển đến màn hình chi tiết sản phẩm
  - Hiển thị đầy đủ: Thông tin cơ bản, Chi phí, Yêu cầu giáo viên, Lịch trình, Ưu đãi
  - Hiển thị các thao tác: Chỉnh sửa, Công bố, Tạm dừng, Lưu trữ (tùy theo trạng thái)

---

#### TC-5 – Xử lý lỗi khi tải danh sách
- **Tại:** Màn hình danh sách sản phẩm
- **Khen:** Gọi API thất bại do lỗi máy chủ hoặc mạng
- **Thì:**
  - Hiển thị trạng thái lỗi với thông báo: "Không thể tải danh sách sản phẩm. Vui lòng thử lại"
  - Nút "Thử lại"
  - Ghi nhật ký lỗi

---

### Giá trị kinh doanh
- Cung cấp cái nhìn tổng quan về tất cả sản phẩm giáo dục của trường
- Hỗ trợ tìm kiếm và lọc nhanh chóng
- Tăng hiệu quả quản lý

---

### Chỉ số đo lường
- Thời gian tải trang danh sách sản phẩm < 2 giây (với 100 sản phẩm)
- Thời gian phản hồi API < 500ms
- Tỷ lệ người dùng sử dụng tìm kiếm/lọc >= 40%

---

### Phụ thuộc
- Dịch vụ sf-product
- Ứng dụng sf-web
- API GraphQL (sf-graph)

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Trung bình - Giao diện CRUD chuẩn
- **Tác động nghiệp vụ:** Trung bình - Hỗ trợ quản lý
- **Tác động trải nghiệm:** Cao - Giao diện cốt lõi cho Quản trị viên

---

## US-PIM-004: Chỉnh sửa sản phẩm giáo dục

### Nội dung
Là **Quản trị viên trường**
Tôi muốn **chỉnh sửa thông tin sản phẩm giáo dục đã tạo**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **cập nhật hoặc sửa lỗi thông tin sản phẩm**

---

### Tiêu chí chấp nhận

#### TC-1 – Chỉnh sửa sản phẩm với trạng thái "Bản nháp"
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Quản trị viên nhấn "Chỉnh sửa" trên sản phẩm có trạng thái "Bản nháp" và thay đổi thông tin
- **Thì:**
  - Cho phép chỉnh sửa tất cả các trường
  - Kiểm tra dữ liệu giống US-PIM-001
  - Cập nhật thời điểm sửa đổi và người sửa đổi
  - Tăng phiên bản lên 1 (cơ chế khóa lạc quan)
  - Hiển thị thông báo "Cập nhật sản phẩm thành công"

---

#### TC-2 – Chỉnh sửa sản phẩm với trạng thái "Đang công bố"
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Quản trị viên nhấn "Chỉnh sửa" trên sản phẩm có trạng thái "Đang công bố" và thay đổi thông tin
- **Thì:**
  - Cho phép chỉnh sửa: mô tả, chi phí, ưu đãi, ngày kết thúc
  - KHÔNG cho phép chỉnh sửa: mã, tên, loại, ngày bắt đầu, yêu cầu giáo viên, cấu hình lịch
  - Sau khi lưu: gửi sự kiện cập nhật sản phẩm
  - Sự kiện được gửi đến giáo viên đã nhận sản phẩm
  - Cập nhật phiên bản

**Quy tắc nghiệp vụ:**
- Các trường không thể sửa khi "Đang công bố": mã, tên, loại, ngày bắt đầu, yêu cầu cốt lõi

---

#### TC-3 – Không cho phép chỉnh sửa khi có đơn đăng ký đang xử lý
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Quản trị viên cố chỉnh sửa sản phẩm có ít nhất 1 đơn đăng ký với trạng thái: Đã phê duyệt, Đã gán lịch, Đã xác nhận, Đã hoàn tất, Đang hoạt động
- **Thì:**
  - Hiển thị cửa sổ cảnh báo: "Sản phẩm đang có đơn đăng ký đang xử lý. Không thể chỉnh sửa thông tin quan trọng"
  - Chỉ cho phép sửa: mô tả, ưu đãi
  - Không cho phép sửa: chi phí, yêu cầu, cấu hình lịch

---

#### TC-4 – Xung đột khi cập nhật đồng thời
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Quản trị viên lưu sản phẩm nhưng phiên bản đã bị thay đổi bởi người khác
- **Thì:**
  - Backend trả về lỗi 409 Xung đột
  - Hiển thị cửa sổ: "Sản phẩm đã được cập nhật bởi người khác. Vui lòng làm mới và thử lại"
  - Nút "Làm mới"
  - Không lưu thay đổi

**Quy tắc nghiệp vụ:**
- Sử dụng khóa lạc quan với trường phiên bản
- Điều kiện WHERE: UPDATE ... WHERE id = ? AND version = ?

---

#### TC-5 – Không cho phép chỉnh sửa sản phẩm "Lưu trữ"
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Sản phẩm có trạng thái "Lưu trữ"
- **Thì:**
  - Không hiển thị nút "Chỉnh sửa"
  - Chỉ cho phép xem thông tin (chế độ chỉ đọc)

---

### Giá trị kinh doanh
- Cho phép điều chỉnh thông tin sản phẩm khi cần thiết
- Bảo vệ tính toàn vẹn dữ liệu khi có đơn đăng ký đang xử lý
- Đảm bảo đồng bộ thông tin với giáo viên khi có thay đổi

---

### Chỉ số đo lường
- Tỷ lệ cập nhật sản phẩm thành công >= 98%
- Số lượng lỗi xung đột < 2% tổng số cập nhật
- Thời gian trung bình để cập nhật sản phẩm < 3 phút

---

### Phụ thuộc
- Dịch vụ sf-product
- Ứng dụng sf-web
- Kafka (sự kiện cập nhật sản phẩm)
- Bảng đơn đăng ký (để kiểm tra đơn đang xử lý)

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Trung bình - Logic cập nhật với quy tắc nghiệp vụ
- **Tác động nghiệp vụ:** Cao - Cần đảm bảo không ảnh hưởng đơn đăng ký
- **Tác động trải nghiệm:** Trung bình - Form chỉnh sửa với một số trường bị vô hiệu hóa

---

## US-PIM-005: Tạm dừng/Tiếp tục sản phẩm

### Nội dung
Là **Quản trị viên trường**
Tôi muốn **tạm dừng hoặc tiếp tục sản phẩm giáo dục đã công bố**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **tạm thời ngừng nhận đăng ký mới hoặc tiếp tục nhận đăng ký khi đã giải quyết vấn đề**

---

### Tiêu chí chấp nhận

#### TC-1 – Tạm dừng sản phẩm thành công
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Quản trị viên nhấn "Tạm dừng" trên sản phẩm có trạng thái "Đang công bố"
- **Thì:**
  - Hiển thị cửa sổ xác nhận với ô nhập lý do tạm dừng (tùy chọn)
  - Cập nhật trạng thái sản phẩm = "Tạm dừng"
  - Gửi sự kiện tạm dừng sản phẩm
  - Sự kiện được gửi đến giáo viên
  - Giáo viên không thể đăng ký sản phẩm này nữa
  - Hiển thị thông báo "Sản phẩm đã được tạm dừng"

**Quy tắc nghiệp vụ:**
- Chỉ sản phẩm với trạng thái "Đang công bố" mới có thể tạm dừng
- Không ảnh hưởng đến đơn đăng ký đã tồn tại

---

#### TC-2 – Tiếp tục sản phẩm thành công
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Quản trị viên nhấn "Tiếp tục" trên sản phẩm có trạng thái "Tạm dừng"
- **Thì:**
  - Cập nhật trạng thái sản phẩm = "Đang công bố"
  - Gửi sự kiện tiếp tục sản phẩm
  - Sự kiện được gửi đến giáo viên
  - Giáo viên có thể đăng ký sản phẩm này trở lại
  - Hiển thị thông báo "Sản phẩm đã được tiếp tục"

---

#### TC-3 – Không ảnh hưởng đơn đăng ký đang xử lý
- **Tại:** Hệ thống backend
- **Khi:** Sản phẩm bị tạm dừng
- **Thì:**
  - Các đơn đăng ký với trạng thái khác "Chờ xét duyệt" vẫn tiếp tục quy trình bình thường
  - Chỉ chặn đăng ký mới
  - Đơn đang "Chờ xét duyệt" vẫn có thể phê duyệt/từ chối

---

#### TC-4 – Hiển thị trạng thái tạm dừng cho giáo viên
- **Tại:** Phía giáo viên, màn hình danh sách sản phẩm
- **Khi:** Giáo viên xem danh sách sản phẩm
- **Thì:**
  - Sản phẩm tạm dừng hiển thị nhãn "Tạm dừng"
  - Nút "Đăng ký" bị vô hiệu hóa
  - Chú giải: "Sản phẩm này tạm thời không nhận đăng ký mới"

---

### Giá trị kinh doanh
- Linh hoạt trong việc kiểm soát việc nhận đăng ký
- Xử lý các tình huống đặc biệt (hết chỗ, cần xem xét, vấn đề kỹ thuật)
- Không làm gián đoạn các đơn đăng ký đang xử lý

---

### Chỉ số đo lường
- Thời gian trung bình để tạm dừng/tiếp tục sản phẩm < 5 giây
- Tỷ lệ đồng bộ trạng thái thành công đến giáo viên >= 99%

---

### Phụ thuộc
- Dịch vụ sf-product
- Kafka (sự kiện tạm dừng/tiếp tục sản phẩm)

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Thấp - Chuyển đổi trạng thái đơn giản
- **Tác động nghiệp vụ:** Trung bình - Ảnh hưởng khả năng đăng ký
- **Tác động trải nghiệm:** Thấp - Nút hành động

---

## US-PIM-006: Lưu trữ sản phẩm

### Nội dung
Là **Quản trị viên trường**
Tôi muốn **lưu trữ sản phẩm giáo dục không còn sử dụng**
Tại **Cổng quản lý nhà trường (sf-web)**
Để **dọn dẹp danh sách sản phẩm và ẩn các sản phẩm cũ không còn hiệu lực**

---

### Tiêu chí chấp nhận

#### TC-1 – Lưu trữ sản phẩm thành công (không có đơn đăng ký đang hoạt động)
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Quản trị viên nhấn "Lưu trữ" trên sản phẩm không có đơn đăng ký với trạng thái: Đã phê duyệt, Đã gán lịch, Đã xác nhận, Đã hoàn tất, Đang hoạt động
- **Thì:**
  - Hiển thị cửa sổ xác nhận: "Bạn có chắc muốn lưu trữ sản phẩm này?"
  - Cập nhật trạng thái sản phẩm = "Lưu trữ"
  - Gửi sự kiện lưu trữ sản phẩm
  - Sự kiện được gửi đến giáo viên
  - Sản phẩm không còn hiển thị trong danh sách mặc định
  - Hiển thị thông báo "Sản phẩm đã được lưu trữ"

**Quy tắc nghiệp vụ:**
- Chỉ lưu trữ được khi không có đơn đăng ký đang hoạt động
- Lưu trữ là xóa mềm (không xóa khỏi cơ sở dữ liệu)

---

#### TC-2 – Không cho phép lưu trữ khi có đơn đăng ký đang hoạt động
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Quản trị viên nhấn "Lưu trữ" trên sản phẩm có ít nhất 1 đơn đăng ký đang hoạt động
- **Thì:**
  - Hiển thị cửa sổ cảnh báo: "Sản phẩm đang có [N] đơn đăng ký đang xử lý. Vui lòng hoàn tất hoặc hủy các đơn trước khi lưu trữ"
  - Liệt kê danh sách đơn đăng ký đang hoạt động (mã đơn, tên giáo viên, trạng thái)
  - Nút "Xem chi tiết"
  - Không cho phép lưu trữ

**Quy tắc nghiệp vụ:**
- Trạng thái đơn đăng ký đang hoạt động: Đã phê duyệt, Đã gán lịch, Đã xác nhận, Đã hoàn tất, Đang hoạt động

---

#### TC-3 – Xem lại sản phẩm đã lưu trữ
- **Tại:** Màn hình danh sách sản phẩm
- **Khi:** Quản trị viên chọn bộ lọc "Lưu trữ"
- **Thì:**
  - Hiển thị danh sách sản phẩm đã lưu trữ
  - Sản phẩm lưu trữ là chế độ chỉ đọc
  - Không có thao tác (không thể chỉnh sửa, công bố, tạm dừng)

---

#### TC-4 – Xử lý lỗi khi lưu trữ thất bại
- **Tại:** Hệ thống backend
- **Khi:** Gửi sự kiện lưu trữ sản phẩm thất bại sau số lần thử lại tối đa
- **Thì:**
  - Hoàn tác thay đổi (sản phẩm vẫn giữ trạng thái cũ)
  - Ghi nhật ký lỗi
  - Hiển thị thông báo: "Có lỗi xảy ra khi lưu trữ sản phẩm. Vui lòng thử lại"

---

### Giá trị kinh doanh
- Giữ cho danh sách sản phẩm gọn gàng và dễ quản lý
- Không làm mất dữ liệu lịch sử
- Tránh nhầm lẫn cho giáo viên khi xem các sản phẩm đã hết hạn

---

### Chỉ số đo lường
- Tỷ lệ lưu trữ thành công >= 99%
- Số lượng sản phẩm được lưu trữ tự động khi hết hạn (ngày kết thúc đã qua)

---

### Phụ thuộc
- Dịch vụ sf-product
- Kafka (sự kiện lưu trữ sản phẩm)
- Bảng đơn đăng ký

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Thấp - Chuyển đổi trạng thái với kiểm tra
- **Tác động nghiệp vụ:** Trung bình - Quy trình dọn dẹp
- **Tác động trải nghiệm:** Thấp

---

**Tổng kết nhóm A:**
- ✅ 6 User Stories đã hoàn thành
- ✅ Bao phủ toàn bộ vòng đời quản lý sản phẩm giáo dục
- ✅ Sử dụng thuật ngữ tiếng Việt nhất quán
- ✅ Tuân thủ template quy định
