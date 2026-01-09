# [US] Xem danh sách định danh trên EOP

**Page ID:** 949977083
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977083

|  |  |
| --- | --- |
| Trạng thái | In progressBlue |
| Người tạo | @Dung Bùi |
| Reviewer |  |
| Approve by |  |

none

Lịch sử thay đổi
================

A – Tạo mới, M – Sửa đổi, O – Ngưng sử dụng

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Ngày thay đổi** | **Vị trí thay đổi** | **A\*, M, D** | **Mô tả thay đổi** | **Phiên bản confluence** |
|  |  | A |  |  |
|  |  | M | * bổ sung AC-10 → masked số điện thoại/email | 5 |

Use story content
=================

Là Ops/Policy designer trong AEH

Tôi muốn truy cập và xem danh sách toàn bộ định danh đã được tạo trên hệ thống

Để tôi có thể theo dõi, tra cứu và quản lý thông tin định danh người dùng của tất cả nhà trường/ trung tâm trên toàn hệ thống và đảm bảo việc đồng bộ dữ liệu người dùng giữa các hệ thống SaaS và EOP diễn ra chính xác, nhất quán và minh bạch.

Acceptance criteria
-------------------

### AC-1: Truy cập màn hình danh sách định danh

Tại phân hệ **Quản lý định danh người dùng** trên EOP

Khi người dùng chọn menu "Danh sách định danh"

Thì hệ thống điều hướng sang màn hình Danh sách định danh

### AC-2: Hiển thị thành công danh sách định danh

Tại màn hình danh sách định danh

Khi người dùng có quyền truy cập vào danh sách định danh

Thì hệ thống hiển thị màn hình danh sách định danh theo dạng bảng

### AC-3: Không có dữ liệu hiển thị

Tại màn hình danh sách định danh

Khi chưa có bất kỳ định danh nào trong hệ thống

Thì hệ thống:

* Hiển thị danh sách trống
* Hiển thị textview: "Không có dữ liệu định danh" ở giữa bảng danh sách định danh

### AC-4: Hiển thị thông tin định danh

Tại màn hình danh sách định danh

Khi nhìn vào bảng danh sách

Thì thông tin mỗi định danh hiển thị theo dòng bao gồm các trường như sau:

|  | **Trường thông tin** | **Mô tả** | **Ghi chú** |
| --- | --- | --- | --- |
| 1 | **Thông tin tìm kiếm** | |  |
| 2 | Tìm kiếm định danh | * Nhập freetext * Placeholder "Tìm kiếm" * Quy định độ dài: 255 ký tự * Cho phép nhập ký tự là chữ cái, số, ký tự đặc biệt và khoảng trắng * Cho phép tìm kiếm theo: Mã định danh, Email, Họ tên người dùng |  |
| 3 | Lọc theo ngày tạo | * Date range picker * Placeholder "Chọn khoảng ngày tạo" * Chọn khoảng thời gian để lọc theo {Ngày tạo} * Người dùng có thể chọn ngày bắt đầu và ngày kết thúc * Ngày kết thúc >= Ngày bắt đầu * Format ngày: `dd/mm/yyyy`. * Cho phép clear để bỏ lọc. |  |
| 4 | Lọc theo trạng thái xác thực MFA | * Chọn 1 giá trị * Default: Tất cả trạng thái * Danh sách giá trị:    + Tất cả trạng thái   + Đã xác thực   + Chưa xác thực |  |
| 5 | **Danh sách định danh** | |  |
| 6 | Mã định danh | * Mã unique của người dùng trên EOP |  |
| 7 | Họ và tên người dùng | * Họ tên của người dùng tương ứng với Mã định danh * Thông tin được đồng bộ từ hệ thống SaaS |  |
| 8 | Loại định danh | * Hiển thị loại định danh của mã định danh    + User   + Service account * Những user trong SaaS/ Internal có Loại định danh = USER |  |
| 9 | Email | * Hiển thị Email đăng nhập tương ứng với Mã định danh |  |
| 10 | Số điện thoại | * Hiển thị số điện thoại tương ứng với Mã định danh * Không có → hiển thị "--" |  |
| 11 | Đối tác | * Hiển thị {Mã đối tác}-{Tên đối tác} người dùng thuộc về * Không có → hiển thị "--" |  |
| 12 | Trạng thái xác thực MFA | Hiển thị trạng thái xác thực MFA   * Đã xác thực * Chưa xác thực |  |
| 13 | Ngày tạo | * Hiển thị thời điểm định danh được tạo * Format: dd/mm/yyyy * Cho phép sort theo:    + ASC   + DESC |  |

### AC-5: Số lượng bản ghi trên trang

Tại màn hình danh sách định danh

Khi hệ thống hiển thị danh sách định danh

Thì hệ thống chỉ hiển thị tối đa 20 bản ghi trên một trang

**Inline BR Detail:** phụ thuộc System Rules - Business rules

### AC-6: Điều chỉnh số lượng bản ghi trên trang

Tại màn hình danh sách định danh

Khi người dùng chọn điều chỉnh số lượng bản ghi trên trang

Thì hệ thống hiển thị tối đa số bản ghi tương tự như người dùng chọn

**Inline BR Detail:** phụ thuộc System Rules - Business rules

### AC-7: Chuyển trang

Tại màn hình danh sách định danh

Khi người dùng bấm vào trang muốn xem

Thì hệ thống sẽ chuyển đến đúng trang với thứ tự tương ứng

**Inline BR Detail:** phụ thuộc System Rules - Business rules

### AC-8: Không được phân quyền xem danh sách định danh

Tại thanh menu phân hệ Quản lý định danh người dùng của hệ thống EOP

Khi người dùng không có quyền xem danh sách định danh bấm vào mục Quản lý định danh người dùng

Thì hệ thống hiển thị thông báo: TNT 018 UI Message - Common Business Rules

### AC-9: Cách sắp xếp bản ghi mặc định trên danh sách

Tại màn hình danh sách định danh

Khi người dùng chưa chọn cách sắp xếp

Hoặc người dùng tìm kiếm đối định danh

Thì hệ thống hiển thị danh sách định danh theo cách sắp xếp: được tạo mới nhất đến tạo cũ nhất

### AC-10: Mask số điện thoại/ email

Tại màn hình danh sách định danh

Khi người dùng không có quyền xem thông tin định danh về email/ số điện thoại

Thì hệ thống ẩn số điện thoại/ email theo quy tắc:

* Quy tắc mask số điện thoại:

  + Giữ lại 3 ký tự đầu.
  + Giữ lại 2 số cuối.
  + Phần còn lại thay bằng `*`.
  + Đảm bảo độ dài chuỗi vẫn tương tự số điện thoại thật.
  + VD:

| **Số gốc** | **Masked** |
| --- | --- |
| 0912345678 | 09\*\*\*\*\*\*78 |
| 0987654321 | 098\*\*\*\*\*21 |
| +84 912 345 678 | +84 \*\* \*\*\* \*\*8 |

* Quy tắc mask email:

  + Giữ lại 1 ký tự đầu của local-part (phần trước @).
  + Giữ lại domain đầy đủ.
  + Phần còn lại thay bằng `*`.
  + VD:

| **Số gốc** | **Masked** |
| --- | --- |
| Email gốc | Masked |
| hanguyen@gmail.com | h\*\*\*\*\*@gmail.com |
| thanh.le@company.com | t\*\*\*\*\*@company.com |

### AC-11: Tìm kiếm và lọc định danh

Tại màn hình danh sách định danh

Khi người dùng nhập điều kiện tìm kiếm hoặc chọn bộ lọc

Thì hệ thống cho phép:

* Tìm kiếm theo: Email, Mã định danh
* Lọc theo: Ngày tạo, SaaS nguồn, Tên đối tác và Trạng thái xác thực MFA
* Kết hợp nhiều điều kiện tìm kiếm
* Kết quả hiển thị đúng theo điều kiện lọc đã chọn.
* Số lượng kết quả phù hợp được hiển thị rõ ràng (ví dụ: "Tìm thấy 12 kết quả phù hợp")
* Người dùng có thể xóa từng điều kiện tìm kiếm và lọc để trở về danh sách mặc định

### AC-12: Tìm kiếm không có kết quả

Tại người dùng đang ở màn hình danh sách định danh

Khi nhập từ khóa hoặc chọn bộ lọc không khớp với bất kỳ định danh nào

Thì hệ thống hiển thị textview: "Không tìm thấy định danh phù hợp."

Business Value & Success Metrics
--------------------------------

* Tăng khả năng kiểm soát tập trung toàn bộ người dùng trong hệ sinh thái SaaS. Giúp nhà cung cấp SaaS có cái nhìn toàn cảnh về số lượng, tình trạng và phân bổ người dùng ở từng đối tác.
* Nâng cao độ minh bạch trong quản lý người dùng giữa các hệ thống con (TeMS, LMS, v.v.). Mọi người dùng từ các nền tảng khác đều quy về một "định danh gốc" duy nhất trên EOP, giúp tránh trùng lặp, thất thoát hoặc sai lệch dữ liệu.
* Hỗ trợ đối soát và báo cáo người dùng cho từng tenant dễ dàng. EOP có thể tổng hợp dữ liệu định danh để lập báo cáo người dùng, phân tích xu hướng sử dụng hệ thống hoặc đối chiếu với từng hợp đồng SaaS.
* Khi có sự cố hoặc yêu cầu hỗ trợ từ đối tác, đội vận hành có thể nhanh chóng truy xuất Identity của người dùng liên quan, giúp xử lý nhanh và chính xác hơn, nâng cao hiệu quả vận hành và chăm sóc khách hàng.
* Khi tất cả thông tin người dùng được tập trung, việc kiểm tra, audit, hoặc đảm bảo tuân thủ quy định trở nên dễ dàng và ít tốn nguồn lực hơn.

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* Tỷ lệ đồng bộ định danh thành công ≥ 99%.
* Thời gian hiển thị dữ liệu định danh trung bình ≤ 1 giây.
* 100% định danh người dùng đều được ánh xạ đúng với tenant và hệ thống nguồn.
* Giảm ≥ 80% thời gian đối soát người dùng giữa các hệ thống SaaS. Nhờ giao diện danh sách định danh tập trung, giúp bộ phận vận hành, CS hoặc Account Manager dễ dàng xác minh người dùng.

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: PDM.AEH.SSO.PM - Mô hình dữ liệu vật lý cho Policy Management

Danh sách user:

Thêm mới người dùng trên TeMS: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/939065356/US+Th+m+m+i+ng+i+d+ng?atlOrigin=eyJpIjoiYTUwZWZiZTVkNTgwNDE2OTgyYThiY2UxOWMyYmI5ZjgiLCJwIjoiYyJ9>

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Danh sách định danh

Out of Scope Item
=================
