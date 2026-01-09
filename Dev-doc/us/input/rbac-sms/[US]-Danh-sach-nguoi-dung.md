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
|  | AC-3 | M | * Thay đổi giá trị trong dot icon | 16 |
|  |  | M | * AC-3: Thay đổi giới hạn ký tự khi tìm kiếm bản ghi * AC-8: Thay đổi cách sắp xếp bản ghi mặc định * Gạch bỏ trạng thái "Lưu nháp" | 17 |
|  |  | M | * AC-3:    + Bổ sung bộ lọc theo nhóm, vai trò   + Bổ sung hiển thị thêm: Danh sách nhóm, danh sách vai trò | 20 |
|  |  | M | * AC-3: Bổ sung thêm trạng thái cho Người dùng |  |

Use story content
=================

Là Admin user trong 1 nhà trường/ trung tâm cụ thể, khi được BD onboard thành công

Tôi muốn truy cập và xem danh sách tất cả người dùng đã được tạo trong nhà trường/ trung tâm của tôi và thêm họ vào một nhóm người dùng

Để tôi có thể theo dõi, tra cứu, và quản lý thông tin người dùng nội bộ, đồng thời kiểm soát được trạng thái hoạt động của từng người dùng trong hệ thống

Acceptance criteria
-------------------

### AC-1: Truy cập màn hình danh sách người dùng

Tại phân hệ **Quản lý người dùng & nhóm người dùng**

Khi người dùng chọn tab "Danh sách người dùng"

Thì hệ thống điều hướng sang màn hình Danh sách người dùng

### AC-2: Hiển thị thành công danh sách người dùng

Tại màn hình danh sách người dùng

Khi người dùng có quyền truy cập vào danh sách người dùng

Thì hệ thống hiển thị màn hình danh sách người dùng theo dạng bảng

### AC-3: Hiển thị thông tin người dùng

Tại màn hình danh sách người dùng

Khi nhìn vào bảng danh sách

Thì thông tin mỗi người dùng hiển thị theo dòng bao gồm các trường như sau:

|  | **Trường thông tin** | **Mô tả** | **Ghi chú** |
| --- | --- | --- | --- |
| 1 | **Thông tin tìm kiếm** | | |
| 2 | Tìm kiếm người dùng | * Nhập freetext * Placeholder "Tìm kiếm" * Quy định độ dài: ~~255~~ 50 ký tự * Cho phép nhập ký tự là chữ cái, số, ký tự đặc biệt và khoảng trắng * Cho phép tìm kiếm theo: Email, Tên người dùng |  |
| 3 | ~~Lọc theo ngày tạo~~ | * ~~Date range picker~~ * ~~Placeholder "Chọn khoảng ngày tạo"~~ * ~~Chọn khoảng thời gian để lọc theo {Ngày tạo}~~ * ~~Người dùng có thể chọn ngày bắt đầu và ngày kết thúc~~ * ~~Ngày kết thúc >= Ngày bắt đầu~~ * ~~Format ngày: dd/mm/yyyy.~~ * ~~Cho phép clear để bỏ lọc.~~ |  |
| 4 | Lọc theo trạng thái | * Chọn 1 giá trị * Default: Tất cả giá trị * Danh sách giá trị:    + Tạm ngưng   + Đang hoạt động   + Không hoạt động   + Bị khóa |  |
| 5 | Lọc theo nhóm | * Chọn nhiều giá trị * Default: Tất cả nhóm * Danh sách giá trị: Hiển thị danh sách tất cả các nhóm có trên hệ thống được gán cho người dùng, ở trạng thái "Đang hoạt động" |  |
| 6 | Lọc theo vai trò | * Chọn nhiều giá trị * Default: Tất cả vai trò * Danh sách giá trị: Hiển thị danh sách tất cả vai trò có trên hệ thống được gán cho người dùng, ở trạng thái "Đang hoạt động" |  |
| 7 | **Danh sách người dùng** | | |
| 8 | ~~Checkbox~~ | * ~~Cho phép chọn nhiều người dùng cùng 1 lúc~~ * ~~Default: uncheck~~ * ~~Thực hiện nghiệp vụ:~~<https://mfacilities.atlassian.net/wiki/x/K4DEO> |  |
| 9 | Tên người dùng | * Hiển thị tên người dùng |  |
| 10 | Email | * Hiển thị email của người dùng |  |
| 11 | Số điện thoại | * Hiển thị số điện thoại của người dùng * Nếu không có, hiển thị "--" |  |
| 12 | Danh sách nhóm | * Hiển thị danh sách các nhóm mà người dùng đang được gán, ở trạng thái "Đang hoạt động" |  |
| 13 | Danh sách vai trò | * Hiển thị danh sách các vai trò được gán cho người dùng, ở trạng thái "Đang hoạt động" |  |
| 14 | Trạng thái | * Hiển thị trạng thái của người dùng    + Tạm ngưng   + Đang hoạt động   + Không hoạt động   + Bị khóa |  |
| 15 | Ngày tạo | * Hiển thị thời điểm người dùng được tạo trên hệ thống * Format: dd/mm/yyyy * Cho phép sort theo:    + ASC   + DESC |  |
| 16 | ~~Người tạo~~ | * ~~Hiển thị username của người tạo người dùng~~ |  |
| 17 | Dot icon | * Hiển thị các actions:    + Xem chi tiết   + ~~Chỉnh sửa~~   + Thêm vào nhóm   + Bỏ khỏi nhóm |  |

### AC-4: Số lượng bản ghi trên trang

Tại màn hình danh sách người dùng

Khi hệ thống hiển thị danh sách người dùng

Thì hệ thống chỉ hiển thị tối đa 20 bản ghi trên một trang

**Inline BR Detail:** phụ thuộc <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-013>

### AC-5: Điều chỉnh số lượng bản ghi trên trang

Tại màn hình danh sách người dùng

Khi người dùng chọn điều chỉnh số lượng bản ghi trên trang

Thì hệ thống hiển thị tối đa số bản ghi tương tự như người dùng chọn

**Inline BR Detail:** phụ thuộc <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-012>

### AC-6: Chuyển trang

Tại màn hình danh sách người dùng

Khi người dùng bấm vào trang muốn xem

Thì hệ thống sẽ chuyển đến đúng trang với thứ tự tương ứng

**Inline BR Detail:** phụ thuộc <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-014>

### AC-7: Không được phân quyền xem danh sách người dùng

Tại thanh menu phân hệ Quản lý định danh người dùng của hệ thống

Khi người dùng không có quyền xem danh sách người dùng bấm vào mục Quản lý người dùng

Thì hệ thống hiển thị thông báo: TNT 018 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-018>

### AC-8: Cách sắp xếp bản ghi mặc định trên danh sách

Tại màn hình danh sách người dùng

Khi người dùng chưa chọn cách sắp xếp

Hoặc người dùng tìm kiếm người dùng

Thì hệ thống hiển thị danh sách người dùng theo cách sắp xếp: ngày cập nhật mới nhất đến ngày cập nhật cũ nhất

### AC-9: Tìm kiếm và lọc người dùng

Tại màn hình danh sách người dùng

Khi người dùng nhập điều kiện tìm kiếm hoặc chọn bộ lọc

Thì hệ thống cho phép:

* Tìm kiếm theo: Tên người dùng, Email
* Lọc theo: Ngày tạo
* Kết hợp nhiều điều kiện tìm kiếm
* Kết quả hiển thị đúng theo điều kiện lọc đã chọn.
* Số lượng kết quả phù hợp được hiển thị rõ ràng (ví dụ: "Tìm thấy 12 kết quả phù hợp")
* Người dùng có thể xóa từng điều kiện tìm kiếm và lọc để trở về danh sách mặc định

### AC-10: Tìm kiếm không có kết quả

Tại màn hình danh sách người dùng

Khi nhập từ khóa hoặc chọn bộ lọc không khớp với bất kỳ người dùng nào

Thì hệ thống hiển thị textview: "Không tìm thấy người dùng phù hợp."

### AC-11: Hiển thị button "Thêm mới người dùng"

Tại màn hình danh sách người dùng

Khi người dùng có quyền thêm mới người dùng

Thì hệ thống hiển thị button "Thêm mới người dùng", cho phép người dùng bấm để thêm mới người dùng trong nhà trường/ trung tâm

Business Value & Success Metrics
--------------------------------

* Giúp Admin user có cái nhìn toàn cảnh về đội ngũ người dùng đang hoạt động trong tổ chức nhà trường/ trung tâm
* Hỗ trợ quản trị vận hành dễ dàng hơn: biết ai đang hoạt động, ai tạo ra user nào, nguồn tạo từ đâu.
* Nâng cao tính minh bạch và kiểm soát về mặt bảo mật và phân quyền trong toàn hệ sinh thái SaaS

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* 100% người dùng hợp lệ hiển thị trong danh sách.
* Thời gian tải danh sách ≤ 2 giây với ≤ 1.000 bản ghi.
* 90% thao tác tìm kiếm/lọc trả kết quả đúng trong vòng 1 giây.
* Giảm ít nhất **30% thời gian quản trị người dùng** so với trước

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

Thêm mới người dùng trên TeMS: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/939065356/US+Th+m+m+i+ng+i+d+ng?atlOrigin=eyJpIjoiYTUwZWZiZTVkNTgwNDE2OTgyYThiY2UxOWMyYmI5ZjgiLCJwIjoiYyJ9>

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Danh sách người dùng

Out of Scope Item
=================