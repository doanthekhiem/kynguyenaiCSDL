# NHÓM B: ĐĂNG KÝ GIẢNG DẠY

> **Nhóm chức năng:** Đăng ký giảng dạy cho sản phẩm giáo dục
> **Số lượng User Stories:** 5
> **Vai trò chính:** Giáo viên tự do

---

## US-PIM-007: Xem danh sách cơ hội giảng dạy

### Nội dung
Là **Giáo viên tự do**
Tôi muốn **xem danh sách các sản phẩm giáo dục mà các trường hợp tác đã công bố**
Tại **Cổng giáo viên (tf-web) hoặc sf-web**
Để **tìm hiểu các cơ hội giảng dạy và đánh giá xem có phù hợp với năng lực của mình không**

---

### Tiêu chí chấp nhận

#### TC-1 – Hiển thị danh sách sản phẩm đã được phân phối
- **Tại:** Màn hình Bảng tin hoặc Cơ hội giảng dạy
- **Khi:** Giáo viên tự do truy cập trang sản phẩm giáo dục
- **Thì:**
  - Hiển thị danh sách sản phẩm với trạng thái "Đang công bố" hoặc "Tạm dừng"
  - Thông tin hiển thị: Tên trường, Tên sản phẩm, Loại, Ngày bắt đầu, Ngày kết thúc, Trạng thái, Hoa hồng
  - Sắp xếp mặc định: Ngày công bố giảm dần
  - Sản phẩm tạm dừng hiển thị nhãn "Tạm dừng" và không cho phép đăng ký
  - Phân trang: 20 sản phẩm/trang

**Quy tắc nghiệp vụ:**
- Chỉ hiển thị sản phẩm từ các trường có quan hệ hợp tác đang hoạt động với giáo viên
- Sản phẩm đã lưu trữ không hiển thị

---

#### TC-2 – Lọc sản phẩm theo trạng thái
- **Tại:** Màn hình danh sách sản phẩm
- **Khi:** Giáo viên chọn bộ lọc
- **Thì:**
  - Danh sách chọn: Tất cả, Có thể đăng ký, Tạm dừng, Đã đăng ký
  - "Có thể đăng ký": trạng thái = "Đang công bố" và giáo viên chưa đăng ký
  - "Đã đăng ký": Giáo viên đã có đơn đăng ký cho sản phẩm này

---

#### TC-3 – Tìm kiếm sản phẩm
- **Tại:** Màn hình danh sách sản phẩm
- **Khi:** Giáo viên nhập từ khóa
- **Thì:**
  - Tìm kiếm trên: tên sản phẩm, mô tả, tên trường
  - Không phân biệt chữ hoa chữ thường
  - Đánh dấu từ khóa trong kết quả

---

#### TC-4 – Xem chi tiết sản phẩm
- **Tại:** Màn hình danh sách sản phẩm
- **Khi:** Giáo viên nhấn vào một sản phẩm
- **Thì:**
  - Chuyển đến màn hình chi tiết sản phẩm
  - Hiển thị:
    - Thông tin cơ bản (tên, loại, mô tả, thời gian)
    - Phí và hoa hồng
    - Yêu cầu giáo viên (trình độ, chứng chỉ, kinh nghiệm)
    - Cấu hình lịch (số buổi, thời lượng, khung giờ)
    - Ưu đãi
  - Nút "Đăng ký" nếu chưa đăng ký và sản phẩm chưa tạm dừng

---

#### TC-5 – Hiển thị trạng thái đã đăng ký
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Giáo viên đã có đơn đăng ký cho sản phẩm này
- **Thì:**
  - Hiển thị nhãn "Đã đăng ký" với trạng thái của đơn
  - Nút "Xem đơn đăng ký" thay vì "Đăng ký"
  - Liên kết đến màn hình chi tiết đơn đăng ký

---

#### TC-6 – Không có sản phẩm khả dụng
- **Tại:** Màn hình danh sách sản phẩm
- **Khi:** Giáo viên không có sản phẩm nào (chưa có hợp tác hoặc trường chưa công bố sản phẩm)
- **Thì:**
  - Hiển thị trạng thái trống: "Chưa có cơ hội giảng dạy nào"
  - Thông báo: "Hãy thiết lập hợp tác với các trường để nhận thông tin về sản phẩm giáo dục mới"

---

### Giá trị kinh doanh
- Cung cấp kênh thông tin minh bạch cho giáo viên tìm cơ hội giảng dạy
- Hiển thị đầy đủ thông tin để giáo viên đánh giá
- Tăng tỷ lệ khớp giữa sản phẩm và giáo viên phù hợp

---

### Chỉ số đo lường
- Thời gian tải trang < 2 giây
- Tỷ lệ giáo viên xem chi tiết sản phẩm / xem danh sách >= 30%
- Tỷ lệ đăng ký sau khi xem chi tiết >= 15%

---

### Phụ thuộc
- Dịch vụ sf-product (INDIVIDUAL)
- Ứng dụng tf-web hoặc sf-web
- Dữ liệu sản phẩm được đồng bộ qua Kafka

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao - Quy trình khám phá cốt lõi
- **Tác động trải nghiệm:** Cao

---

## US-PIM-008: Đăng ký giảng dạy

### Nội dung
Là **Giáo viên tự do**
Tôi muốn **đăng ký cung ứng giảng dạy cho một sản phẩm giáo dục**
Tại **Cổng giáo viên (tf-web) hoặc sf-web**
Để **bắt đầu quy trình hợp tác giảng dạy với trường**

---

### Tiêu chí chấp nhận

#### TC-1 – Kiểm tra điều kiện trước khi đăng ký
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Giáo viên nhấn nút "Đăng ký"
- **Thì:**
  - Hệ thống kiểm tra:
    - Giáo viên phải có khóa học đã công bố phù hợp với sản phẩm
    - Quan hệ hợp tác với trường phải có trạng thái "Đang hoạt động"
    - Sản phẩm phải có trạng thái "Đang công bố"
    - Giáo viên chưa có đơn đăng ký cho sản phẩm này ở các trạng thái: Chờ xét duyệt, Yêu cầu cập nhật, Đã phê duyệt, Đã gán lịch, Đã xác nhận, Đã hoàn tất, Đang hoạt động
  - Nếu đạt yêu cầu: chuyển sang bước chọn khóa học

**Quy tắc nghiệp vụ:**
- Mỗi giáo viên chỉ có thể có 1 đơn đăng ký đang hoạt động cho 1 sản phẩm tại một thời điểm

---

#### TC-2 – Chọn khóa học để đăng ký
- **Tại:** Cửa sổ chọn khóa học
- **Khi:** Giáo viên đã qua kiểm tra điều kiện
- **Thì:**
  - Hiển thị danh sách khóa học của giáo viên với trạng thái "Đã công bố"
  - Mỗi khóa học hiển thị: Tên, Mô tả, Số lượng buổi học, Đánh giá
  - Giáo viên chọn 1 khóa học
  - Nút "Tiếp tục"

---

#### TC-3 – Gửi đơn đăng ký thành công (Luồng chính)
- **Tại:** Cửa sổ xác nhận
- **Khi:** Giáo viên nhấn "Xác nhận đăng ký"
- **Thì:**
  - Hệ thống thu thập thông tin:
    - Hồ sơ giáo viên từ dịch vụ quản lý hồ sơ
    - Lịch có thể dạy từ dịch vụ quản lý lịch
    - Chi tiết khóa học từ dịch vụ quản lý khóa học
  - Tạo bản chụp dữ liệu tại thời điểm đăng ký
  - Tạo đơn đăng ký với trạng thái "Chờ xét duyệt"
  - Khởi động quy trình tự động trên Temporal
  - Gửi sự kiện tạo đơn đăng ký
  - Sự kiện được gửi đến trường
  - Hiển thị cửa sổ thành công: "Đăng ký thành công! Trường sẽ xem xét và phản hồi trong vòng 7 ngày"
  - Chuyển đến màn hình chi tiết đơn đăng ký

**Quy tắc nghiệp vụ:**
- Mã đơn đăng ký có định dạng: REG-{NĂM}-{SỐ THỨ TỰ}
- Chụp dữ liệu để đảm bảo tính nhất quán

---

#### TC-4 – Lỗi khi giáo viên chưa có khóa học đã công bố
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Giáo viên nhấn "Đăng ký" nhưng chưa có khóa học nào với trạng thái "Đã công bố"
- **Thì:**
  - Hiển thị cửa sổ: "Bạn cần tạo và công bố khóa học trước khi đăng ký sản phẩm giáo dục"
  - Nút "Tạo khóa học mới"
  - Liên kết đến trang quản lý khóa học

---

#### TC-5 – Lỗi khi đã có đơn đăng ký đang hoạt động
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Giáo viên nhấn "Đăng ký" nhưng đã có đơn đăng ký đang hoạt động cho sản phẩm này
- **Thì:**
  - Hiển thị cửa sổ: "Bạn đã có đơn đăng ký đang xử lý cho sản phẩm này"
  - Hiển thị trạng thái của đơn đăng ký hiện tại
  - Nút "Xem chi tiết đơn đăng ký"

---

#### TC-6 – Lỗi khi thu thập dữ liệu thất bại
- **Tại:** Hệ thống backend
- **Khi:** Không thể lấy dữ liệu từ các dịch vụ quản lý hồ sơ, lịch, hoặc khóa học sau số lần thử lại tối đa
- **Thì:**
  - Không tạo đơn đăng ký
  - Ghi nhật ký lỗi với thông tin dịch vụ và lỗi
  - Hiển thị thông báo: "Không thể thu thập thông tin hồ sơ. Vui lòng kiểm tra hồ sơ giáo viên và thử lại"
  - Nút thử lại

**Quy tắc nghiệp vụ:**
- Số lần thử lại tối đa cho mỗi lời gọi dịch vụ: 3 lần
- Thời gian chờ: 30 giây

---

#### TC-7 – Lỗi khi khởi động quy trình tự động thất bại
- **Tại:** Hệ thống backend
- **Khi:** Khởi động quy trình trên Temporal thất bại
- **Thì:**
  - Hoàn tác việc tạo đơn đăng ký
  - Ghi nhật ký lỗi
  - Hiển thị: "Có lỗi xảy ra khi xử lý đăng ký. Vui lòng thử lại sau"

---

### Giá trị kinh doanh
- Tự động hóa quy trình đăng ký
- Thu thập đầy đủ thông tin để trường đánh giá
- Khởi động quy trình điều phối với Temporal

---

### Chỉ số đo lường
- Tỷ lệ đăng ký thành công >= 95%
- Thời gian trung bình để hoàn tất đăng ký < 2 phút
- Tỷ lệ giáo viên có khóa học đã công bố >= 80%

---

### Phụ thuộc
- Dịch vụ sf-product (INDIVIDUAL)
- Dịch vụ lf-course (quản lý khóa học)
- Dịch vụ tf-teacher-profile (quản lý hồ sơ giáo viên)
- Dịch vụ tf-teacher-calendar (quản lý lịch giáo viên)
- Temporal workflow
- Kafka

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Rất cao - Điều phối đa dịch vụ
- **Tác động nghiệp vụ:** Rất cao - Quy trình đăng ký cốt lõi
- **Tác động trải nghiệm:** Cao - Hành trình quan trọng của người dùng

---

## US-PIM-009: Xem chi tiết đơn đăng ký

### Nội dung
Là **Giáo viên tự do**
Tôi muốn **xem chi tiết đơn đăng ký sản phẩm giáo dục của mình**
Tại **Cổng giáo viên (tf-web) hoặc sf-web**
Để **theo dõi trạng thái, xem phản hồi từ trường, và thực hiện các hành động cần thiết**

---

### Tiêu chí chấp nhận

#### TC-1 – Hiển thị thông tin đơn đăng ký
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Giáo viên truy cập trang chi tiết đơn
- **Thì:**
  - Hiển thị:
    - Mã đơn đăng ký
    - Thông tin sản phẩm (tên, tên trường, thời gian)
    - Trạng thái hiện tại với dòng thời gian
    - Thông tin khóa học (bản chụp)
    - Hồ sơ giáo viên (bản chụp)
    - Ngày gửi đơn
    - Phản hồi từ trường (nếu có)
  - Các hành động tùy theo trạng thái

**Quy tắc nghiệp vụ:**
- Dòng thời gian hiển thị lịch sử chuyển đổi trạng thái với thời điểm

---

#### TC-2 – Hành động theo trạng thái "Chờ xét duyệt"
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái "Chờ xét duyệt"
- **Thì:**
  - Hiển thị: "Đang chờ trường xem xét"
  - Nút "Rút đơn"

---

#### TC-3 – Hành động theo trạng thái "Yêu cầu cập nhật"
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái "Yêu cầu cập nhật"
- **Thì:**
  - Hiển thị phản hồi từ trường
  - Nút "Cập nhật hồ sơ"
  - Nút "Rút đơn"

---

#### TC-4 – Hành động theo trạng thái "Đã phê duyệt"
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái "Đã phê duyệt"
- **Thì:**
  - Hiển thị: "Đã được chấp thuận. Đang chờ trường sắp xếp lịch"
  - Không có hành động

---

#### TC-5 – Hành động theo trạng thái "Đã gán lịch"
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái "Đã gán lịch"
- **Thì:**
  - Hiển thị lịch dạy dự kiến
  - Thông tin: ngày bắt đầu, ngày kết thúc, khung giờ, số học sinh dự kiến
  - Thời hạn xác nhận
  - Đồng hồ đếm ngược đến thời hạn
  - 3 nút: "Xác nhận", "Đề xuất thay đổi", "Từ chối"

---

#### TC-6 – Hiển thị trạng thái "Đã từ chối"
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái "Đã từ chối"
- **Thì:**
  - Hiển thị: "Đã bị từ chối"
  - Hiển thị lý do từ trường
  - Không có hành động
  - Nhãn màu đỏ

---

#### TC-7 – Danh sách tất cả đơn đăng ký
- **Tại:** Màn hình danh sách đơn đăng ký
- **Khi:** Giáo viên truy cập trang quản lý đơn
- **Thì:**
  - Hiển thị tất cả đơn đăng ký dạng bảng
  - Các cột: Mã đơn, Sản phẩm, Trường, Ngày gửi, Trạng thái
  - Lọc theo trạng thái
  - Phân trang

---

### Giá trị kinh doanh
- Minh bạch trong quá trình xử lý
- Giáo viên có thể theo dõi và hành động kịp thời
- Giảm số lượng yêu cầu hỗ trợ thủ công

---

### Chỉ số đo lường
- Tỷ lệ giáo viên kiểm tra trạng thái đơn >= 3 lần/đơn
- Thời gian phản hồi lịch < 24 giờ sau khi được gán

---

### Phụ thuộc
- Dịch vụ sf-product (INDIVIDUAL)
- Ứng dụng tf-web hoặc sf-web
- Bảng lịch sử trạng thái đơn đăng ký

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động trải nghiệm:** Rất cao

---

## US-PIM-010: Gửi lại đơn sau yêu cầu cập nhật

### Nội dung
Là **Giáo viên tự do**
Tôi muốn **cập nhật và gửi lại đơn đăng ký sau khi nhận yêu cầu cập nhật từ trường**
Tại **Cổng giáo viên (tf-web) hoặc sf-web**
Để **khắc phục các vấn đề mà trường yêu cầu và tiếp tục quy trình đăng ký**

---

### Tiêu chí chấp nhận

#### TC-1 – Xem phản hồi từ trường
- **Tại:** Màn hình chi tiết đơn đăng ký với trạng thái "Yêu cầu cập nhật"
- **Khi:** Giáo viên truy cập đơn đăng ký
- **Thì:**
  - Hiển thị phản hồi từ trường rõ ràng
  - Đánh dấu các điểm cần cập nhật
  - Nút "Cập nhật hồ sơ"

---

#### TC-2 – Cập nhật thông tin và gửi lại thành công
- **Tại:** Cửa sổ cập nhật
- **Khi:** Giáo viên nhấn "Cập nhật hồ sơ", chỉnh sửa thông tin cần thiết và nhấn "Gửi lại"
- **Thì:**
  - Thu thập lại dữ liệu mới:
    - Hồ sơ giáo viên (nếu có cập nhật)
    - Lịch có thể dạy (nếu có cập nhật)
    - Chi tiết khóa học (nếu có cập nhật)
  - Tạo bản chụp mới
  - Cập nhật trạng thái đơn đăng ký = "Chờ xét duyệt"
  - Cập nhật dữ liệu gửi với dữ liệu mới
  - Gửi tín hiệu đến quy trình Temporal: Đã gửi lại đơn
  - Gửi sự kiện gửi lại đơn đăng ký
  - Hiển thị: "Đã gửi lại đơn đăng ký thành công. Trường sẽ xem xét lại"
  - Làm mới màn hình chi tiết đơn đăng ký

**Quy tắc nghiệp vụ:**
- Tạo mới bản chụp thay vì cập nhật bản chụp cũ (theo dõi thay đổi)
- Tăng phiên bản

---

#### TC-3 – Không cho phép gửi lại nếu trạng thái không phải "Yêu cầu cập nhật"
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái khác "Yêu cầu cập nhật"
- **Thì:**
  - Không hiển thị nút "Cập nhật hồ sơ"

---

#### TC-4 – Lỗi khi thu thập dữ liệu thất bại
- **Tại:** Hệ thống backend
- **Khi:** Không thể thu thập dữ liệu mới sau số lần thử lại tối đa
- **Thì:**
  - Không cập nhật đơn đăng ký
  - Ghi nhật ký lỗi
  - Hiển thị: "Không thể thu thập thông tin mới. Vui lòng kiểm tra hồ sơ và thử lại"

---

#### TC-5 – Lịch sử cập nhật
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Giáo viên xem lịch sử
- **Thì:**
  - Hiển thị tất cả lần gửi lại
  - Mỗi lần: thời điểm, phản hồi từ trường, thay đổi

---

### Giá trị kinh doanh
- Cho phép giáo viên khắc phục vấn đề và tiếp tục quy trình
- Giảm tỷ lệ đơn đăng ký bị từ chối
- Tăng chất lượng đơn đăng ký

---

### Chỉ số đo lường
- Tỷ lệ gửi lại thành công sau "Yêu cầu cập nhật" >= 80%
- Thời gian trung bình để gửi lại < 48 giờ
- Tỷ lệ phê duyệt sau khi gửi lại >= 70%

---

### Phụ thuộc
- Dịch vụ sf-product (INDIVIDUAL)
- Temporal workflow (tín hiệu)
- Kafka
- Dịch vụ tf-teacher-profile, tf-teacher-calendar, lf-course

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động trải nghiệm:** Cao

---

## US-PIM-011: Rút đơn đăng ký

### Nội dung
Là **Giáo viên tự do**
Tôi muốn **rút đơn đăng ký sản phẩm giáo dục**
Tại **Cổng giáo viên (tf-web) hoặc sf-web**
Để **hủy đăng ký khi tôi không còn muốn hoặc không thể tham gia giảng dạy**

---

### Tiêu chí chấp nhận

#### TC-1 – Rút đơn thành công từ trạng thái "Chờ xét duyệt" hoặc "Yêu cầu cập nhật"
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Giáo viên nhấn "Rút đơn" trên đơn đăng ký với trạng thái "Chờ xét duyệt" hoặc "Yêu cầu cập nhật"
- **Thì:**
  - Hiển thị cửa sổ xác nhận: "Bạn có chắc muốn rút đơn đăng ký?"
  - Ô nhập lý do (tùy chọn)
  - Nút "Xác nhận" và "Hủy"
  - Sau khi xác nhận:
    - Cập nhật trạng thái đơn đăng ký = "Đã rút"
    - Lưu lý do vào phản hồi giáo viên
    - Gửi tín hiệu đến quy trình Temporal: Đã rút đơn
    - Gửi sự kiện rút đơn đăng ký
    - Hiển thị: "Đã rút đơn đăng ký thành công"

**Quy tắc nghiệp vụ:**
- Chỉ có thể rút đơn từ trạng thái: Chờ xét duyệt, Yêu cầu cập nhật

---

#### TC-2 – Không cho phép rút đơn từ các trạng thái khác
- **Tại:** Màn hình chi tiết đơn đăng ký
- **Khi:** Đơn đăng ký có trạng thái: Đã phê duyệt, Đã gán lịch, Đã xác nhận, Đã hoàn tất, Đang hoạt động
- **Thì:**
  - Không hiển thị nút "Rút đơn"
  - Nếu giáo viên muốn hủy: hiển thị thông báo "Vui lòng liên hệ trường để thương lượng việc hủy"

---

#### TC-3 – Hiển thị cảnh báo về hậu quả
- **Tại:** Cửa sổ xác nhận rút đơn
- **Khi:** Giáo viên nhấn "Rút đơn"
- **Thì:**
  - Hiển thị cảnh báo: "Việc rút đơn sẽ kết thúc quy trình đăng ký. Bạn có thể đăng ký lại sau nếu sản phẩm vẫn còn khả dụng"

---

#### TC-4 – Lý do rút đơn phổ biến
- **Tại:** Cửa sổ xác nhận rút đơn
- **Khi:** Giáo viên nhập lý do
- **Thì:**
  - Danh sách chọn nhanh:
    - "Không có thời gian"
    - "Tìm được cơ hội khác"
    - "Không phù hợp với năng lực"
    - "Vấn đề cá nhân"
    - "Khác (nhập thủ công)"

---

#### TC-5 – Lịch sử đơn đã rút
- **Tại:** Màn hình danh sách đơn đăng ký
- **Khi:** Giáo viên lọc theo trạng thái "Đã rút"
- **Thì:**
  - Hiển thị danh sách đơn đã rút
  - Hiển thị lý do rút
  - Cho phép xem chi tiết (chế độ chỉ đọc)

---

### Giá trị kinh doanh
- Cho phép giáo viên linh hoạt trong quyết định
- Giải phóng chỗ cho giáo viên khác
- Giảm thời gian xử lý cho các đơn đăng ký không có ý nghĩa

---

### Chỉ số đo lường
- Tỷ lệ rút đơn < 10% tổng số đơn đăng ký
- Thời gian trung bình để rút đơn < 1 phút

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

**Tổng kết nhóm B:**
- ✅ 5 User Stories đã hoàn thành
- ✅ Bao phủ toàn bộ quy trình đăng ký từ phía giáo viên
- ✅ Sử dụng thuật ngữ tiếng Việt nhất quán
- ✅ Tuân thủ template quy định
- ✅ Bao phủm luồng chính, luồng thay thế và trường hợp ngoại lệ
