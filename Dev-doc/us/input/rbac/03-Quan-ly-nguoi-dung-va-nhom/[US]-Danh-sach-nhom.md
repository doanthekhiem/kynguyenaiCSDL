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
|  |  | M | AC-5:   * Bổ sung thêm bộ lọc theo vai trò * Bổ sung thêm trường "Vai trò" hiển thị trên danh sách | 5 |

Use story content
=================

Là Ops/Policy designer trong AEH

Tôi muốn xem danh sách tất cả các **nhóm** đã được tạo trong hệ thống nội bộ EOP

Để tôi có thể nhanh chóng quản lý nhóm, biết được số lượng thành viên, kiểm tra nhóm nào đang được sử dụng cho phân quyền, và thực hiện các hành động quản trị (xem chi tiết, chỉnh sửa, thêm/xóa thành viên) tại cấp nội bộ

Acceptance criteria
-------------------

### AC-1: Truy cập tính năng Quản lý nhóm

Tại thanh menu thuộc chức năng nghiệp vụ Quản lý người dùng & nhóm

Khi bấm vào tab danh sách nhóm

Thì hệ thống điều hướng tới Danh sách nhóm

### AC-2: Hiển thị thành công tab danh sách nhóm

Tại tab danh sách nhóm

Khi người dùng có quyền truy cập vào danh sách nhóm

Thì hệ thống hiển thị màn hình danh sách nhóm theo dạng bảng

### AC-3: Không có dữ liệu hiển thị

Tại tab danh sách nhóm

Khi chưa có bất kỳ nhóm nào trong hệ thống

Thì hệ thống:

* Hiển thị danh sách trống
* Hiển thị textview: "Chưa có dữ liệu nhóm nào được tạo" ở giữa bảng danh sách

### AC-4: Không được phân quyền xem danh sách nhóm

Tại thanh menu phân hệ Quản lý nhóm của hệ thống

Khi người dùng không có quyền xem danh sách nhóm bấm vào mục Quản lý nhóm

Thì hệ thống hiển thị thông báo: TNT 018 UI Message - Common Business Rules

### AC-5: Thông tin tab danh sách nhóm

Tại tab danh sách nhóm

Khi nhìn vào bảng danh sách

Thì thông tin mỗi nhóm hiển thị theo dòng bao gồm các trường như sau:

|  | **Trường thông tin** | **Mô tả** | **Ghi chú** |
| --- | --- | --- | --- |
| 1 | **Thông tin tìm kiếm** | | |
| 2 | Tìm kiếm nhóm | * Nhập freetext * Placeholder "Tìm kiếm" * Quy định độ dài: 255 ký tự * Cho phép nhập ký tự là chữ cái, số, ký tự đặc biệt và khoảng trắng * Cho phép tìm kiếm theo: Mã nhóm, tên nhóm |  |
| 3 | Lọc theo ngày tạo | * Date range picker * Placeholder "Chọn khoảng ngày tạo" * Chọn khoảng thời gian để lọc theo {Ngày tạo} * Người dùng có thể chọn ngày bắt đầu và ngày kết thúc * Ngày kết thúc >= Ngày bắt đầu * Format ngày: `dd/mm/yyyy`. * Cho phép clear để bỏ lọc. |  |
| 4 | Lọc theo trạng thái | * Chọn 1 giá trị * Mặc định: Tất cả trạng thái * Danh sách giá trị:    + Đang hoạt động   + Không hoạt động |  |
| 5 | Lọc theo vai trò | * Chọn nhiều giá trị * Default: Tất cả vai trò * Danh sách giá trị: Hiển thị danh sách tất cả vai trò có trên hệ thống được gán cho nhóm, ở trạng thái "Đang hoạt động" |  |
| 6 | **Overview** | | |
| 7 | Tổng số nhóm | * Hiển thị tổng tất cả nhóm có trên hệ thống |  |
| 8 | Nhóm đang hoạt động | * Hiển thị số lượng nhóm có trạng thái "Đang hoạt động" |  |
| 9 | Nhóm không hoạt động | * Hiển thị số lượng nhóm có trạng thái "Không hoạt động" |  |
| 10 | **Danh sách nhóm người dùng** | | |
| 11 | Mã nhóm | * Hiển thị mã nhóm người dùng |  |
| 12 | Tên nhóm | * Hiển thị tên nhóm người dùng |  |
| 13 | Số lượng thành viên | * Hiển thị số lượng người dùng có trong nhóm |  |
| 14 | Vai trò | * Hiển thị danh sách các vai trò được gán cho nhóm, ở trạng thái "Đang hoạt động" * Nếu không có, hiển thị "--" |  |
| 15 | Trạng thái | * Hiển thị trạng thái của nhóm người dùng:    + Đang hoạt động   + Không hoạt động |  |
| 16 | Ngày tạo | * Hiển thị thời điểm nhóm người dùng được tạo trên hệ thống * Format: dd/mm/yyyy hh:mm:ss * Cho phép sort theo:    + ASC   + DESC |  |
| 17 | Dot icon | * Các action:    + Xem chi tiết   + Thêm người dùng |  |

### AC-6: Số lượng bản ghi trên trang

Tại tab danh sách nhóm

Khi hệ thống hiển thị danh sách nhóm

Thì hệ thống chỉ hiển thị tối đa 20 bản ghi trên một trang

**Inline BR Detail:** phụ thuộc System Rules - Business rules

### AC-7: Điều chỉnh số lượng bản ghi trên trang

Tại tab danh sách nhóm

Khi người dùng chọn điều chỉnh số lượng bản ghi trên trang

Thì hệ thống hiển thị tối đa số bản ghi tương tự như người dùng chọn

**Inline BR Detail:** phụ thuộc System Rules - Business rules

### AC-8: Chuyển trang

Tại tab danh sách nhóm

Khi người dùng bấm vào trang muốn xem

Thì hệ thống sẽ chuyển đến đúng trang với thứ tự tương ứng

**Inline BR Detail:** phụ thuộc System Rules - Business rules

### AC-9: Cách sắp xếp bản ghi mặc định trên danh sách

Tại tab danh sách nhóm

Khi người dùng chưa chọn cách sắp xếp

Hoặc người dùng tìm kiếm nhóm

Thì hệ thống hiển thị danh sách nhóm theo cách sắp xếp theo ngày cập nhật mới nhất đến ngày cập nhật cũ nhất

### AC-10: Tìm kiếm và lọc nhóm

Tại tab danh sách nhóm

Khi người dùng nhập điều kiện tìm kiếm hoặc chọn bộ lọc

Thì hệ thống cho phép:

* Tìm kiếm theo: Mã nhóm, Tên nhóm
* Lọc theo: Ngày tạo, Trạng thái
* Kết hợp nhiều điều kiện tìm kiếm
* Kết quả hiển thị đúng theo điều kiện lọc đã chọn.
* Số lượng kết quả phù hợp được hiển thị rõ ràng (ví dụ: "Tìm thấy 12 kết quả phù hợp")
* Có thể xóa từng điều kiện tìm kiếm và lọc để trở về danh sách mặc định

### AC-11: Tìm kiếm không có kết quả

Tại tab danh sách nhóm

Khi nhập từ khóa hoặc chọn bộ lọc không khớp với bất kỳ người dùng nào

Thì hệ thống hiển thị textview: "Không tìm thấy nhóm phù hợp."

### AC-12: Hiển thị button "Thêm mới nhóm"

Tại tab danh sách nhóm

Khi người dùng có quyền thêm mới nhóm

Thì hệ thống hiển thị button "Thêm mới nhóm", cho phép người dùng bấm để thêm mới nhóm trong nội bộ hệ thống EOP

Business Value & Success Metrics
--------------------------------

* Tăng khả năng quan sát và kiểm soát toàn diện. Giúp có cái nhìn tổng thể về toàn bộ cấu trúc nhóm người dùng đang tồn tại trên hệ thống, dễ dàng xác định mối liên kết giữa nhóm – tổ chức – vai trò để đánh giá ảnh hưởng khi thực hiện các nghiệp vụ liên quan
* Nâng cao hiệu quả quản trị dữ liệu người dùng. Giúp giảm thiểu thời gian tìm kiếm và đối chiếu nhóm từ nhiều nguồn khác nhau, cung cấp nguồn dữ liệu chuẩn phục vụ cho báo cáo, phân tích, hoặc kiểm toán hệ thống phân quyền.

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* 100% nhóm hiển thị đủ và chính xác thông tin.
* ≥ 95% thao tác tìm kiếm/mở chi tiết hoàn thành trong < 3 bước.

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: PDM.AEH.SSO.PM - Mô hình dữ liệu vật lý cho Policy Management

Quản lý nhóm và người dùng trong đối tác: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/952401956/US+Qu+n+l+nh+m+ng+i+d+ng?atlOrigin=eyJpIjoiMDZlNTVhM2YyZjc1NDM5MWJjYzU0NTI1ZWJhNTAyOTAiLCJwIjoiYyJ9>

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Out of Scope Item
=================
# [US] Danh sách nhóm

**Page ID:** 949977088  
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977088
