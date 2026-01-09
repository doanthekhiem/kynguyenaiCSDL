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
|  |  | A |  |  |
|  |  | M | * Bổ sung thêm AC-8 * Bổ sung thêm AC-9 | 4 |

Use story content
=================

Là Admin user trong 1 nhà trường/ trung tâm cụ thể, khi được BD onboard thành công

Tôi muốn có thể chọn một hoặc nhiều người dùng trong danh sách người dùng và thêm họ vào 1 nhóm người dùng

Để tôi có thể quản lý quyền truy cập, phân vai trò và tổ chức người dùng trong tổ chức của tôi của mình một cách nhanh chóng, hiệu quả.

Acceptance criteria
-------------------

### AC-1: Truy cập tính năng thêm người dùng vào nhóm từ màn hình Danh sách

Tại màn hình Quản lý người dùng & nhóm, tab Danh sách nhóm người dùng

Khi tôi chọn "Thêm người dùng" trong dot icon

Thì hệ thống hiển thị popup cho phép gán user vào nhóm

### AC-2: Truy cập tính năng thêm người dùng vào nhóm từ màn hình chi tiết

Tại màn hình Chi tiết nhóm

Khi tôi bấm "Thêm người dùng"

Thì hệ thống hiển thị popup cho phép gán user vào nhóm

### AC-2: Hiển thị popup Thêm người dùng

Tại Popup thêm người dùng

Khi nhìn vào popup

Thì hệ thống:

* Hiển thị danh sách **những người dùng chưa có trong nhóm** theo dạng bảng
* Người dùng có trạng thái "Đang hoạt động"

* Thông tin hiển thị bao gồm:

|  | **Thông tin** | **Mô tả** |
| --- | --- | --- |
| 1 | Thanh tìm kiếm | * Nhập freetext * Placeholder "Tìm kiếm" * Quy định độ dài: 255 ký tự * Cho phép nhập ký tự là chữ cái, số, ký tự đặc biệt và khoảng trắng * Cho phép tìm kiếm theo: Email, Tên người dùng |
| 2 | Lọc theo ngày tạo | * Date range picker * Placeholder "Chọn khoảng ngày tạo" * Chọn khoảng thời gian để lọc theo {Ngày tạo} * Người dùng có thể chọn ngày bắt đầu và ngày kết thúc * Ngày kết thúc >= Ngày bắt đầu * Format ngày: `dd/mm/yyyy`. * Cho phép clear để bỏ lọc. |
| 3 | Checkbox | * Cho phép chọn nhiều người dùng cùng 1 lúc * Default: uncheck |
| 4 | Tên người dùng | * Hiển thị tên người dùng |
| 5 | Email | * Hiển thị email của người dùng |
| 6 | Số điện thoại | * Hiển thị số điện thoại của người dùng * Không có => hiển thị "--" |
| 7 | Trạng thái | * Hiển thị trạng thái của người dùng    + Đang hoạt động   + ~~Không hoạt động~~ |
| 8 | Ngày tạo | * Hiển thị thời điểm người dùng được tạo trên hệ thống * Format: dd/mm/yyyy hh:mm:ss |

### AC-3: Thêm người dùng vào nhóm thành công

Tại popup "Thêm người dùng"

Khi tích chọn ít nhất một người dùng

Và bấm nút "Thêm"

Thì hệ thống:

* Thêm tất cả người dùng đã chọn vào nhóm
* Hiển thị thông báo USER 001 UI Message - Common Business Rules

### AC-4: Chưa chọn người dùng nào

Tại popup "Thêm người dùng"

Khi chưa chọn người dùng nào

Thì hệ thống disable button "Thêm"

### AC-5: Tìm kiếm người dùng

Tại popup "Thêm người dùng"

Khi người dùng nhập điều kiện tìm kiếm

Thì hệ thống:

* Tìm kiếm theo: Tên người dùng, Email
* Kết quả hiển thị đúng theo điều kiện lọc đã chọn.
* Số lượng kết quả phù hợp được hiển thị rõ ràng (ví dụ: "Tìm thấy 12 kết quả phù hợp")
* Người dùng có thể xóa điều kiện tìm kiếm và lọc để trở về danh sách mặc định

### AC-6: Tìm kiếm không có kết quả

Tại popup "Thêm người dùng"

Khi nhập từ khóa không khớp với bất kỳ người dùng nào

Thì hệ thống hiển thị textview: "Không tìm thấy người dùng phù hợp."

### ~~AC-7: Không cho phép thêm người dùng ở trạng thái~~ **~~"Lưu nháp"~~** ~~vào nhóm~~

~~Tại popup "Thêm người dùng"~~

~~Khi người dùng ở trạng thái "Lưu nháp"~~

~~Thì hệ thống không hiển thị người dùng ở trạng thái Lưu nháp trong danh sách người dùng~~

### ~~AC-8: Kiểm tra khi trạng thái người dùng bị thay đổi sang "Lưu nháp" ở tab khác~~

~~Tại thời điểm người dùng đang mở tab A tại popup "Thêm người dùng"~~

~~Và người dùng này đồng thời được cập nhật trạng thái thành "Lưu nháp" ở tab B hoặc bởi người dùng khác~~

~~Khi Người dùng ở tab A vẫn thực hiện thao tác "Thêm người dùng"~~

~~Thì hệ thống:~~

* ~~Hệ thống kiểm tra trạng thái thực tế trước khi xử lý.~~
* ~~Nếu phát hiện người dùng đã ở trạng thái "Lưu nháp", thao tác thêm bị từ chối.~~
* ~~Hệ thống hiển thị thông báo lỗi: USER 004~~ UI Message - Common Business Rules

### AC-9: Xử lý trường hợp dữ liệu hiển thị cũ khi thêm người dùng vào nhóm

Tại popup "Thêm người dùng"

Và:

* Có nhiều người dùng quản trị đang mở popup "Thêm người dùng" cùng lúc.
* Một Người A đã thêm hoặc gỡ người dùng X khỏi nhóm và lưu thành công.
* Trong khi đó, ở tab khác, người B vẫn đang mở popup cũ (chưa reload dữ liệu), nơi "Người dùng X" vẫn còn hiển thị trong danh sách người dùng khả dụng.

Khi người B chọn **"Người dùng X"** để thêm vào nhóm

Và bấm "Lưu"

Thì hệ thống:

* Hệ thống kiểm tra trạng thái thực tế của người dùng trước khi xử lý:
* Nếu người dùng đã thuộc nhóm

  + Hiển thị thông báo lỗi: USER 006 UI Message - Common Business Rules

### AC-10: Hủy thêm mới

Tại popup "Thêm người dùng"

Khi tôi nhấn "Hủy"

Thì hệ thống đóng popup, không lưu thay đổi.

Business Value & Success Metrics
--------------------------------

* Tối ưu thao tác quản trị người dùng: Giảm thời gian thao tác gán nhóm từng người riêng lẻ.
* Tăng tính linh hoạt trong quản lý phân quyền: Cho phép tạo nhóm mới tại chỗ khi phát sinh nhu cầu.
* Tăng năng suất vận hành: Quản trị viên có thể sắp xếp cấu trúc người dùng nhanh, phục vụ việc áp quyền và kiểm soát truy cập.

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* ≥ 90% thao tác thêm nhóm hoàn tất trong ≤ 3 giây.
* Giảm ≥ 40% thời gian trung bình để tổ chức nhóm người dùng.
* 0 trường hợp người dùng bị trùng nhóm do thêm lại.

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: PDM.AEH.SSO.PM - Mô hình dữ liệu vật lý cho Policy Management

US Danh sách người dùng: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/954433566/US+Danh+s%C4%91ch+ng%C6%B0%E1%BB%9Di+d%C6%B0ng?atlOrigin=eyJpIjoiMTA1MmVkYjcwNDJjNDY1N2IyYTY4YTAyNjk2MWNmMTgiLCJwIjoiYyJ9>

Impact Analysis
===============

* Khi gán user thành công vào nhóm → Trong danh sách người dùng của nhóm → hiển thị danh sách các user được gán mới thành công
* Khi gán người dùng vào nhóm thành công → người dùng sẽ được thừa hưởng các vai trò đã được gán với nhóm

UI/UX Design
============

### Link figma:

Popup Thêm người dùng

Out of Scope Item
=================