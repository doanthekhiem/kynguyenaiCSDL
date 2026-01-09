# [US] Xem chi tiết thông tin định danh

**Page ID:** 949977084
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977084

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
|  |  | M | * Bổ sung AC-4 | 4 |

Use story content
=================

Là Ops/Policy designer trong AEH

Tôi muốn truy cập và chi tiết thông tin của từng định danh đã được tạo trên hệ thống và đồng bộ từ các hệ thống nguồn.

Để tôi có thể nguồn gốc, trạng thái, và các thông tin định danh liên quan đến người dùng, phục vụ việc quản trị, xác minh, và xử lý lỗi đồng bộ nếu có

Acceptance criteria
-------------------

### AC-1: Truy cập màn hình xem chi tiết định danh

Tại màn hình danh sách định danh

Khi người dùng vào 1 định danh bất kỳ

Thì hệ thống điều hướng đến trang Chi tiết định danh

### AC-2: Hiển thị thành công Chi tiết định danh

Tại màn hình danh sách định danh

Khi người dùng có quyền truy cập vào chi tiết định danh

Thì hệ thống hiển thị màn hình chi tiết định danh

### AC-3: Màn hình xem chi tiết định danh

Tại màn hình Chi tiết định danh

Khi nhìn vào chi tiết

Thì thông tin chi tiết của định bao gồm:

|  | **Trường thông tin** | **Mô tả** |  |
| --- | --- | --- | --- |
| 1 | **Thông tin định danh** | | |
| 2 | Mã định danh | * Mã unique của người dùng trên EOP |  |
| 3 | Loại định danh | * Hiển thị loại định danh của mã định danh    + User   + Service account * Những user trong SaaS/ Internal có Loại định danh = USER |  |
| 4 | Trạng thái xác thực MFA | Hiển thị trạng thái xác thực MFA   * Đã xác thực * Chưa xác thực |  |
| 5 | Ngày tạo | * Hiển thị thời điểm định danh được tạo * Format: dd/mm/yyyy hh:mm:ss |  |
| 6 | **Thông tin người dùng** | | |
| 7 | Họ và tên người dùng | * Họ tên của người dùng tương ứng với Mã định danh * Thông tin được đồng bộ từ hệ thống SaaS |  |
| 8 | Email | * Hiển thị Email đăng nhập tương ứng với Mã định danh |  |
| 9 | Số điện thoại | * Hiển thị số điện thoại tương ứng với Mã định danh |  |
| 10 | Đối tác | * Hiển thị tên {Mã đối tác}-{Tên đối tác} người dùng thuộc về |  |

### AC-4: Mask số điện thoại/ email

Tại màn hình chi tiết định danh

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

### AC-5: Điều hướng trở lại danh sách định danh

Tại màn hình chi tiết định danh

Khi người dùng bấm nút "Quay lại" hoặc nút "<-"

Thì hệ thống điều hướng về lại Danh sách định danh, giữ nguyên trạng thái bộ lọc, tìm kiếm trước đó nếu có

Business Value & Success Metrics
--------------------------------

* Giúp đội vận hành kiểm tra nhanh tình trạng và nguồn gốc của mỗi định danh, giảm thời gian điều tra lỗi và sai lệch đồng bộ giữa các hệ thống SaaS.
* Tăng tính minh bạch và khả năng kiểm soát dữ liệu định danh của người dùng trong toàn hệ sinh thái EOP.
* Cải thiện năng lực hỗ trợ và xử lý sự cố (support efficiency) khi có vấn đề liên quan đến tài khoản, đảm bảo vận hành liên thông giữa các nền tảng.

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* Tỷ lệ đồng bộ định danh thành công ≥ 99%.
* Thời gian hiển thị dữ liệu định danh trung bình ≤ 1 giây.
* 100% định danh người dùng đều được ánh xạ đúng với tenant và hệ thống nguồn.
* Giảm ≥ 80% thời gian đối soát người dùng giữa các hệ thống SaaS. Nhờ giao diện danh sách định danh tập trung, giúp bộ phận Ops/ Policy designer dễ dàng xác minh người dùng.
* Mức độ hài lòng của đội vận hành về tính minh bạch và khả năng tra cứu định danh tăng lên ≥ 90%.

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: PDM.AEH.SSO.PM - Mô hình dữ liệu vật lý cho Policy Management

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Thêm mới nhóm người dùng

Out of Scope Item
=================