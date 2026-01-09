# US-PIM-003: Xem chi tiết sản phẩm thương mại

## User Story Content

**Là một** Giáo viên Tự do (INDIVIDUAL) và quản trị viên của trường SPS (Social Private School)

**Tôi muốn** xem chi tiết thông tin sản phẩm kinh doanh (PIM) của mình

**Để** kiểm tra thông tin khóa học đang bán, theo dõi doanh thu và quản lý các hành động liên quan

## Phạm vi áp dụng

| **Đối tượng** | **Tenant Type** | **Mô tả** |
| --- | --- | --- |
| Giáo viên Tự do | INDIVIDUAL | Xem chi tiết Sản phẩm kinh doanh để bán khóa học |
| quản trị viên của trường | Social Private School |     |

## Acceptance Criteria

### AC-1: Điểm vào màn hình Chi tiết Sản phẩm

**Tại** Trang Danh sách Sản phẩm

**Khi** Tôi click vào một Sản phẩm trong danh sách

**Thì** hệ thống hiển thị màn hình "Chi tiết Sản phẩm" với layout 2 cột:

- **Cột trái (Sidebar):** Thông tin định danh & hệ thống
- **Cột phải (Main Content):** Các card thông tin chi tiết

### AC-2: Sidebar - Ảnh đại diện & Trạng thái

**Tại** Màn hình Chi tiết Sản phẩm - Sidebar (cột trái, sticky)

**Khi** Tôi xem phần đầu sidebar

**Thì** hiển thị:

| **#** | **Thành phần** | **Kiểu dữ liệu** | **Ghi chú** |
| --- | --- | --- | --- |
| 1   | Ảnh đại diện | Image | Hiển thị tỷ lệ 16:9 hoặc cover |
| 2   | Badge Trạng thái | Tag | **Xuất bản** / **Nháp** / **Tạm dừng**/ **Lưu trữ** |
| 3   | Tên sản phẩm | Text (H1) | VD: "Chương trình IELTS Chuyên Sâu" - Hiển thị nổi bật |

### AC-3: Sidebar - Thông tin cơ bản

**Tại** Màn hình Chi tiết Sản phẩm - Sidebar

**Khi** Tôi xem thông tin cơ bản

**Thì** hiển thị:

| **#** | **Trường** | **Kiểu dữ liệu** | **Ví dụ** | **Ghi chú** |
| --- | --- | --- | --- | --- |
| 1   | Mã sản phẩm | String (Monospace) | PIM-2025-001 | Font Monospace để dễ đọc |
| 2   | Ngày mở bán | Date | 15/12/2025 | Format: dd/mm/yyyy |
| 3   | Ngày kết thúc | Date | 30/03/2026 | Format: dd/mm/yyyy |

### AC-4: Sidebar - Thông tin Giá bán

**Tại** Màn hình Chi tiết Sản phẩm - Sidebar

**Khi** Tôi xem thông tin giá

**Thì** hiển thị:

| **#** | **Trường** | **Kiểu dữ liệu** | **Ví dụ** | **Ghi chú** |
| --- | --- | --- | --- | --- |
| 1   | Giá bán | Currency (Large) | **5,000,000 VND** | Hiển thị nổi bật, font lớn |
| 2   | Loại sản phẩm | Tag | "Có phí" / "Miễn phí" | Badge màu |

### AC-5: Sidebar - Action Buttons

**Tại** Màn hình Chi tiết Sản phẩm - Sidebar

**Khi** Tôi xem các nút hành động

**Thì** hiển thị:

| **#** | **Nút** | **Hành động** |
| --- | --- | --- |
| 1   | **\[✎ Chỉnh sửa\]** | Redirect đến màn hình Edit Sản phẩm |
| 2   | **\[📋 Sao chép\]** | Clone Sản phẩm với dữ liệu hiện tại |
| 3   | **\[🗑 Dừng bán\]** | Chuyển trạng thái Sản phẩm sang Lưu trữ |

### AC-6: Sidebar - Thông tin Hệ thống

**Tại** Màn hình Chi tiết Sản phẩm - Sidebar, Card "THÔNG TIN HỆ THỐNG"

**Khi** Tôi xem thông tin hệ thống

**Thì** hiển thị (Read-only):

| **#** | **Trường** | **Kiểu dữ liệu** | **Ví dụ** |
| --- | --- | --- | --- |
| 1   | Người tạo | User (String) | Nguyễn Văn A |
| 2   | Ngày tạo | Date | 01/12/2025 |
| 3   | Cập nhật cuối | User (String) | Nguyễn Văn A |
| 4   | Thời gian | Datetime | 15/12/2025 - 10:30 |

### AC-7: Main Content - Card Thông tin Tổng quan

**Tại** Màn hình Chi tiết Sản phẩm - Main Content, Card "Thông tin tổng quan"

**Khi** Tôi xem thông tin tổng quan

**Thì** hiển thị:

| **#** | **Thành phần** | **Kiểu dữ liệu** | **Ví dụ** | **Ghi chú** |
| --- | --- | --- | --- | --- |
| 1   | Mô tả sản phẩm | Rich Text | "Chương trình đào tạo toàn diện 4 kỹ năng..." | Text nhiều dòng |

**Tags thông tin (từ Khóa học liên kết):**

| **#** | **Tag** | **Ví dụ** |
| --- | --- | --- |
| 1   | Ngôn ngữ | Tiếng Việt |
| 2   | Môn học | Tiếng Anh |
| 3   | Trình độ | Trung cấp (Intermediate) |
| 4   | Cấp học | Cấp 1 |
| 5   | Lớp học | Lớp 3 |
| 6   | Chứng chỉ | IELTS 6.5, Chứng chỉ hoàn thành |
| 7   | hình thức học | online |
| 8   | Chủ đề | Bổ sung kiến thức |

**Section "Đối tượng & Đầu vào" từ khóa học** **Section "Mục tiêu đầu ra"từ khóa học**

### AC-8: Main Content - Card Cấu trúc Khóa học

**Tại** Màn hình Chi tiết Sản phẩm - Main Content, Card "Cấu trúc Khóa học"

**Khi** Tôi xem cấu trúc khóa học

**Thì** hiển thị:

**Section "Khóa học Liên kết":**

| **#** | **Thành phần** | **Kiểu dữ liệu** | **Ghi chú** |
| --- | --- | --- | --- |
| 1   | Label | Text | "KHÓA HỌC LIÊN KẾT" |
| 2   | Tên khóa học | Link/String | VD: "📋 Khóa Ngữ pháp Cơ bản (C001)" - Click để xem chi tiết khóa học |

**Section "Lịch học chi tiết":**

| **#** | **Trường** | **Kiểu dữ liệu** | **Ví dụ** | **Ghi chú** |
| --- | --- | --- | --- | --- |
| 2   | Tổng số buổi | Number + Unit | 20 buổi |     |
| 3   | Thời lượng | Number + Unit | 40 giờ |     |
| 4   | Số buổi/tuần | Number + Unit | 2 buổi |     |

**Section "Khung giờ khả dụng" (nếu Loại lịch = Cố định): ví dụ**

| **Ngày** | **Giờ** |
| --- | --- |
| Thứ Ba | 18:00 - 20:00 |
| Thứ Năm | 18:00 - 20:00 |

### AC-9: Main Content - Card Thông tin Tài chính

**Tại** Màn hình Chi tiết Sản phẩm - Main Content, Card "Thông tin tài chính"

**Khi** Tôi xem thông tin tài chính

**Thì** hiển thị:

**Header Card:** Icon 💲 + Title "Thông tin tài chính"

**Section tóm tắt (3 ô ngang):**

| **#** | **Trường** | **Kiểu dữ liệu** | **Ví dụ** | **Ghi chú** |
| --- | --- | --- | --- | --- |
| 1   | Mô hình giá | Card | **Trọn gói (Package)** | Label: "MÔ HÌNH GIÁ" |
| 2   | Giá bán tham chiếu | Currency | **5,000,000 đ** | Label: "GIÁ BÁN" |

**Section "Thành phần chi phí":**

| **Thành phần chi phí** | **Giá trị (VND)** |
| --- | --- |
| Giá bán tham chiếu | 5,000,000 |

### AC-10: Main Content - Nút Xem trước

**Tại** Màn hình Chi tiết Sản phẩm - Main Content

**Khi** Tôi muốn xem trước sản phẩm

**Thì** hiển thị nút:

| **#** | **Nút** | **Vị trí** | **Hành động** |
| --- | --- | --- | --- |
| 1   | **\[👁 Xem trước khóa học\]** | Center, sau Card Giá | Mở preview sản phẩm như học viên thấy |

### AC-11: Hành động Chỉnh sửa

**Tại** Màn hình Chi tiết Sản phẩm

**Khi** Tôi click nút **\[✎ Chỉnh sửa\]**

**Thì** hệ thống:

- Redirect đến màn hình "Chỉnh sửa Sản phẩm"
- Load dữ liệu hiện tại vào form
- Hiển thị Stepper 3 bước tương tự khi tạo mới

### AC-12: Hành động Sao chép (Clone)

**Tại** Màn hình Chi tiết Sản phẩm

**Khi** Tôi click nút **\[📋 Sao chép\]**

**Thì** hệ thống:

| **#** | **Hành động** | **Chi tiết** |
| --- | --- | --- |
| 1   | Hiển thị popup xác nhận | "Bạn có muốn tạo bản sao của sản phẩm này?" |
| 2   | Clone dữ liệu | Copy: name, description, course_id, fees, tax_configs, schedule_config |
| 3   | Generate mã mới | Mã sản phẩm mới theo format PIM-YYYY-ID |
| 4   | Set status | DRAFT (Nháp) |
| 5   | Redirect | Đến màn hình Edit Sản phẩm mới |

### AC-13: Hành động Dừng bán

**Tại** Màn hình Chi tiết Sản phẩm

**Khi** Tôi click nút **\[🗑 Dừng bán\]** (hiển thị khi sản phẩm ở trạng thái Xuất bản)

**Thì** hệ thống:

| **#** | **Hành động** | **Chi tiết** |
| --- | --- | --- |
| 1   | Hiển thị popup xác nhận | "Bạn có chắc muốn dừng bán sản phẩm này? Học viên sẽ không thể đăng ký mới." |
| 2   | Cập nhật status | Set status = ARCHIVED |
| 3   | Gửi event | Publish PIMArchivedEvent qua Kafka |
| 4   | Hiển thị thông báo | "Đã dừng bán sản phẩm" |
| 5   | Cập nhật UI | Badge trạng thái chuyển sang "Lưu trữ" |

## Inline Business Rule

| **Trường thông tin** | **Mã BR** | **Loại** | **Business Rule** | **Ghi chú** |
| --- | --- | --- | --- | --- |
| Tenant type | BR_01 | Điều kiện | Chỉ INDIVIDUAL, quản trị viên tạo mới xem được Sản phẩm này |     |
| Purpose | BR_02 | Filter | Chỉ hiển thị Sản phẩm có purpose = SELLING |     |
| Trạng thái | BR_03 | Display | Hiển thị Badge màu tương ứng | Xuất bản=Xanh, Nháp=Vàng, Lưu trữ=Xám |
| Sidebar | BR_04 | UI  | Cột trái sticky khi scroll | Luôn hiển thị cố định |
| Clone PIM | BR_05 | Điều kiện | Chỉ clone được Sản phẩm đang Xuất bản hoặc Nháp |     |
| Dừng bán | BR_06 | Điều kiện | Chỉ dừng bán được Sản phẩm đang Xuất bản |     |
| Ảnh đại diện | BR_07 | Display | Hiển thị tỷ lệ 16:9 hoặc cover |     |
| Mã sản phẩm | BR_08 | Display | Font Monospace |     |
| Giá thực nhận | BR_09 | Auto-calculate | \= Giá bán - Thuế VAT (8%) - Thuế TNCN (5%) |     |
| Khung giờ | BR_10 | Conditional | Chỉ hiển thị khi Loại lịch = Cố định |     |

## Business Value & Success Metrics

Story này cung cấp **khả năng xem chi tiết Sản phẩm kinh doanh** cho Giáo viên Tự do và nhà trường - giúp kiểm tra thông tin sản phẩm, theo dõi giá bán và thực nhận, quản lý các hành động.

Story được coi là thành công khi đảm bảo được:

| **Metric** | **Target** |
| --- | --- |
| Thời gian load trang | <= 2 giây |
| Tỷ lệ sử dụng nút Chỉnh sửa | \>= 25% |
| Tỷ lệ sử dụng nút Xem trước | \>= 40% |

## UI/UX Design

![](data:image/png;base64,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dDBq5qNf+fU/OBpWf/CHf3ntTTc+7i//en76zKJGqeVv/+wP/+G2+7a2T546vmmbF6qWkEg7TYTcVr/767991B27dMdTdlt/ameB4r7bnvTbf/y4jWPHdXTp75965/bOsY1Z+YPf/OW/u2358Addk6ZI/JsISglgNSIRoYv37P7On51b1PYrv3HrzpljdXnwM798W7fZHz/Wn3vGxaedH68/PT+4tHzyU85fONS1p2at2SaldrD82ydfuuHa+Z/+yR2znY2+RinihUqz6CTxLK0lEBH8BwCo/L9Xq/7yj//gJ375b1/8MQ+K+e6Ddtov/M4fxth3293uhUv1xM2v9ZI33HXPhWsfdEvtYL3/J39456rlU2+792/+6Pd/7S/++sbT1y3kg8P9o2n9l/9w66MefDqTF51NqR3T0fm95fqJf/sHT/29m2669uRifvbCgXL153/xl9cf37rj1if9/h/95cNuPDMcrZ56558+7W9/f/P6h7/fO7+psvHvVoM/+dM7Hv6KD7v3qXdeWnp7lr/1m8/4m3/YW63H31qO673lhVHxTi++96Rn/Pbf7UF5/IN2br3n8MzJvltsvt7LHX/S0y5uavXXjzv/x39698aZzTd/s0ffeLxraf57AAT/77lNqywPeciNM+Wp09d1ahfOn91fT7Vo58SZm649vtw7LBtbJ7a6C3c94wl37b3Eiz9sSt1wzclTp0/sbO7sX7zn7kuHtVYpai3mX0cRq0v3/cWT7rnpulM7x08c297qmZ58252l6yLK4e65cuLG136Vlz0+jyc//Wl33Xf20sHesVM3HusZmsV/gIQH3bTzxH+47+JR67rANuWaazcF1123sbWoL/6o421qN9584obrth/7yJ1pzJ3jG7NaEN28Gw7Wz7hndeLkRuc2Wl2Vbf7bAGiaGv8/rNbDxmImifutxwYAtRTb0zSqdOv987/xW3/60q/xWrecXCyHse+6zJQE2B7HsdbOzlprmyZLIZsgm0oV/zLbs65KTC2nZgnscZwUpRaGlrOujFNWqVklQAK3lrZLREKJ4N9B0HcFuHjkEEAEq2WrXdh0XbQp29Tuu7C6/vpt2dyvNZciidYsYVSCcUiFQjz5cfedfMipa7e7luYFm5ITGwrxLOthxNRa+A8AoGlq/P+wWg8bi5kk7rceGw8gybakWiNbtkTCNg8gybYk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)