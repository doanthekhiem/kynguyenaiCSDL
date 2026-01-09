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

|  |  |  |  |
| --- | --- | --- | --- | --- |
| **Ngày thay đổi** | **Vị trí thay đổi** | **A\*, M, D** | **Mô tả thay đổi** | **Phiên bản confluence** |
|  |  | A |  | 12 |
|  |  | M | AC-4:   * Bổ sung thêm bộ lọc theo vai trò * Bổ sung thêm trường "Vai trò" hiển thị trên danh sách | 19 |

Use story content
=================

Là Admin user trong 1 nhà trường/ trung tâm cụ thể, khi được BD onboard thành công

Tôi muốn xem danh sách tất cả các **nhóm người dùng** đã được tạo trong nhà trường/ trung tâm của tôi

Để tôi có thể nhanh chóng quản lý nhóm, biết được số lượng thành viên, kiểm tra nhóm nào đang được sử dụng cho phân quyền, và thực hiện các hành động quản trị (xem chi tiết, chỉnh sửa, thêm/xóa thành viên) tại cấp nhà trường/ trung tâm

Acceptance criteria
-------------------

### AC-1: Truy cập màn hình danh sách nhóm người dùng

Tại phân hệ **Quản lý nhóm & người dùng**

Khi người dùng chọn tab "Danh sách nhóm người dùng"

Thì hệ thống điều hướng sang màn hình Danh sách nhóm người dùng

### AC-2: Hiển thị thành công danh sách nhóm người dùng

Tại màn hình tab danh sách nhóm người dùng

Khi người dùng có quyền truy cập vào danh sách nhóm người dùng

Thì hệ thống hiển thị màn hình danh sách nhóm người dùng theo dạng bảng

### AC-3: Không có dữ liệu hiển thị

Tại màn hình danh sách nhóm người dùng

Khi chưa có bất kỳ nhóm người dùng nào trong hệ thống

Thì hệ thống:

* Hiển thị danh sách trống
* Hiển thị textview: "Chưa có dữ liệu nhóm người dùng nào được tạo" ở giữa bảng danh sách nhóm người dùng

### AC-4: Hiển thị thông tin nhóm người dùng

Tại màn hình danh sách nhóm người dùng

Khi nhìn vào bảng danh sách

Thì thông tin mỗi nhóm người dùng hiển thị theo dòng bao gồm các trường như sau:

|  | **Trường thông tin** | **Mô tả** | **Ghi chú** |
| --- | --- | --- | --- |
| 1 | **Thông tin tìm kiếm** | | |
| 2 | Tìm kiếm nhóm người dùng | * Nhập freetext * Placeholder "Tìm kiếm" * Quy định độ dài: ~~255~~ 50 ký tự * Cho phép nhập ký tự là chữ cái, số, ký tự đặc biệt và khoảng trắng * Cho phép tìm kiếm theo: Mã nhóm, tên nhóm |  |
| 3 | Lọc theo ngày tạo | * Date range picker * Placeholder "Chọn khoảng ngày tạo" * Chọn khoảng thời gian để lọc theo {Ngày tạo} * Người dùng có thể chọn ngày bắt đầu và ngày kết thúc * Ngày kết thúc >= Ngày bắt đầu * Format ngày: `dd/mm/yyyy`. * Cho phép clear để bỏ lọc. |  |
| 4 | Lọc theo trạng thái | * Chọn 1 giá trị * Default: Tất cả trạng thái * Danh sách giá trị:    + Đang hoạt động   + Không hoạt động |  |
| 5 | Lọc theo vai trò | * Chọn nhiều giá trị * Default: Tất cả vai trò * Danh sách giá trị: Hiển thị danh sách tất cả vai trò có trên hệ thống được gán cho nhóm, ở trạng thái "Đang hoạt động" |  |
| 6 | **Overview** | | |
| 7 | Tổng số nhóm | * Hiển thị tổng tất cả nhóm có trên hệ thống |  |
| 8 | Nhóm đang hoạt động | * Hiển thị số lượng nhóm có trạng thái "Đang hoạt động" |  |
| 9 | Nhóm không hoạt động | * Hiển thị số lượng nhóm có trạng thái "Không hoạt động" |  |
| 10 | ~~Nhóm Lưu nháp~~ | * ~~Hiển thị số lượng nhóm có trạng thái "Lưu nháp"~~ |  |
| 11 | **Danh sách nhóm người dùng** | | |
| 12 | Mã nhóm | * Hiển thị mã nhóm người dùng |  |
| 13 | Tên nhóm | * Hiển thị tên nhóm người dùng |  |
| 14 | ~~Mô tả~~ | * ~~Hiển thị mô tả nhóm người dùng~~ |  |
| 15 | Số lượng thành viên | * Hiển thị số lượng người dùng có trong nhóm |  |
| 16 | Vai trò | * Hiển thị danh sách các vai trò được gán cho nhóm, ở trạng thái "Đang hoạt động" * Nếu không có, hiển thị "--" |  |
| 17 | Trạng thái | * Hiển thị trạng thái của nhóm người dùng:    + ~~Lưu nháp~~   + Đang hoạt động   + Không hoạt động |  |
| 18 | Ngày tạo | * Hiển thị thời điểm nhóm người dùng được tạo trên hệ thống * Format: dd/mm/yyyy * Cho phép sort theo:    + ASC   + DESC |  |
| 19 | ~~Người tạo~~ | * ~~Hiển thị username của người tạo nhóm người dùng~~ |  |
| 20 | Dot icon | * Các action:    + Xem chi tiết   + ~~Chỉnh sửa~~   + Thêm người dùng |  |

### AC-5: Số lượng bản ghi trên trang

Tại màn hình danh sách nhóm người dùng

Khi hệ thống hiển thị danh sách nhóm người dùng

Thì hệ thống chỉ hiển thị tối đa 20 bản ghi trên một trang

**Inline BR Detail:** phụ thuộc System Rules - Business rules

### AC-6: Điều chỉnh số lượng bản ghi trên trang

Tại màn hình danh sách nhóm người dùng

Khi người dùng chọn điều chỉnh số lượng bản ghi trên trang

Thì hệ thống hiển thị tối đa số bản ghi tương tự như người dùng chọn

**Inline BR Detail:** phụ thuộc System Rules - Business rules

### AC-7: Chuyển trang

Tại màn hình danh sách nhóm người dùng

Khi người dùng bấm vào trang muốn xem

Thì hệ thống sẽ chuyển đến đúng trang với thứ tự tương ứng

**Inline BR Detail:** phụ thuộc System Rules - Business rules

### AC-8: Không được phân quyền xem danh sách nhóm người dùng

Tại thanh menu phân hệ Quản lý nhóm người dùng của hệ thống

Khi người dùng không có quyền xem danh sách nhóm người dùng bấm vào mục Quản lý nhóm người dùng

Thì hệ thống hiển thị thông báo: TNT 018 UI Message - Common Business Rules

### AC-9: Cách sắp xếp bản ghi mặc định trên danh sách

Tại màn hình danh sách nhóm người dùnn

Khi ù chưa chọn cáchgày cập n snắp xếp

Hoặc người dùng tìm kiếm nhóm người dùng

Thì hệ thống hiển thị danh sách nhóm người dùng theo ngày nập nhậh đến ngày cập ngày cập nhậnt cũ nhất

### AC-10: Tìm kiếm và lọc nhóm người dùng

Tại màn hình danh sách nhóm người dùng

Khi người dùng nhập điều kiện tìm kiếm hoặc chọn bộ lọc

Thì hệ thống cho phép:

* Tìm kiếm theo: Mã nhóm, Tên nhóm
* Lọc theo: Ngày tạo
* Kết hợp nhiều điều kiện tìm kiếm
* Kết quả hiển thị đúng theo điều kiện lọc đã chọn.
* Số lượng kết quả phù hợp được hiển thị rõ ràng (ví dụ: "Tìm thấy 12 kết quả phù hợp")
* Người dùng có thể xóa từng điều kiện tìm kiếm và lọc để trở về danh sách mặc định

### AC-11: Tìm kiếm không có kết quả

Tại người dùng đang ở màn hình danh sách nhóm người dùng

Khi nhập từ khóa hoặc chọn bộ lọc không khớp với bất kỳ người dùng nào

Thì hệ thống hiển thị textview: "Không tìm thấy nhóm người dùng phù hợp."

### AC-12: Hiển thị button "Thêm mới nhóm người dùng"

Tại màn hình danh sách nhóm người dùng

Khi người dùng có quyền thêm mới nhóm người dùng

Thì hệ thống hiển thị button "Thêm mới nhóm người dùng", cho phép người dùng bấm để thêm mới nhóm người dùng trong nhà trường/ trung tâm

Business Value & Success Metrics
--------------------------------

* Tối ưu hóa quản trị nhân sự và phân quyền: Admin có thể quản lý nhanh các nhóm để cấp quyền hoặc triển khai chiến dịch, giảm thao tác thủ công.
* Gia tăng hiệu suất vận hành: Quản trị theo nhóm giúp thực hiện cấu hình quyền/triển khai cho hàng loạt user nhanh hơn, tiết kiệm thời gian vận hành.

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* Tỷ lệ sử dụng tính năng nhóm ≥ 70% các tenant hoạt động trong 2 tháng đầu (tức ít nhất 70% tenant tạo ít nhất 1 group).
* Thời gian trung bình quản lý nhóm giảm ≥ 40% so với thao tác theo người lẻ tẻ
* Tốc độ phản hồi tìm kiếm ≤ 1s cho dataset ≤ 5.000 nhóm.

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: PDM.AEH.SSO.PM - Mô hình dữ liệu vật lý cho Policy Management

Thêm mới nhóm người dùng trên TeMS: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/946208773/US+Th%C3%AAm+m%C3%ABi+nh%C3%B4m+ng%C6%B0%E1%BB%9Di+d%C6%B0ng+tr%C3%AAn+TeMS?atlOrigin=eyJpIjoiOWJlMjdkNzllMTUzNGM5YjkxNDFjZTk2ZWFhNDM4ODUiLCJwIjoiYyJ9>

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Danh sách người dùng

Out of Scope Item
=================