Lịch sử thay đổi
================

A – Tạo mới, M – Sửa đổi, O – Ngưng sử dụng

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Ngày thay đổi** | **Vị trí thay đổi** | **A\*, M, D** | **Mô tả thay đổi** | **Phiên bản confluence** |
|  |  | A |  |  |
|  |  |  |  |  |

Use story content
=================

Là Ops/Policy designer trong AEH

Tôi muốn thêm mới nhóm người dùng và thêm các thành viên vào nhóm đó ngay lập tức hoặc sau này

Để tôi có thể tổ chức người dùng theo đúng cơ cấu thực tế của tổ chức, từ đó dễ dàng quản lý tập trung, gán quyền đồng loạt, và đảm bảo tính nhất quán, minh bạch trong việc vận hành hệ thống và phân quyền người dùng

Acceptance criteria
-------------------

### AC-1: Truy cập màn hình thêm mới nhóm

Tại màn hình danh sách nhóm người

Khi người dùng bấm nút "Thêm mới nhóm"

Thì hệ thống điều hướng sang màn hình Thêm mới nhóm và cho phép người dùng nhập liệu

### AC-2: Không có quyền thêm mới nhóm

Tại màn hình danh sách nhóm

Khi không có quyền thêm mới nhóm

Thì hệ thống:

* Disable nút "Thêm mới nhóm"
* Hover → hiển thị tooltip TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-019>

### AC-3: Thêm mới nhóm thành công

Tại màn hình thêm mới nhóm

Khi nhập/ chọn đầy đủ các thông tin bắt buộc hợp lệ và bấm "Lưu"

Thì hệ thống:

* Hiển thị thông báo: TNT 009 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-009>
* Lưu thông tin thêm mới nhóm
* Đặt trạng thái nhóm người dùng = Đang hoạt động (Active)
* Quay lại màn hình danh sách nhóm và cập nhật lại dữ liệu màn hình danh sách nhóm

**Inline business rule**

Thông tin nhóm người dùng

|  | **Thông tin** | **Bắt buộc** | **Mô tả** | **Ghi chú** |
| --- | --- | --- | --- | --- |
| 1 | **~~Tab Thông tin nhóm người dùng~~** | | | |
| 2 | Mã nhóm | Có | * Mã code của nhóm người dùng mới * Không hiển thị trên màn hình thêm mới * Sinh khi lưu thành công * Rule 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-019> |  |
| 3 | Tên nhóm | Có | * Nhập tên nhóm người dùng * Nhập freetext * Cho phép nhập ký tự là chữ cái, chữ số, ký tự đặc biệt và khoảng trắng. * Quy định độ dài: 255 ký tự |  |
| 4 | Mô tả | Không | * Nhập mô tả * Nhập freetext * Cho phép nhập ký tự là chữ cái, chữ số, ký tự đặc biệt và khoảng trắng. * Quy định độ dài: 255 ký tự |  |
| 5 | **Danh sách người dùng**   * Không bắt buộc * Hiển thị danh sách người dùng ở trạng thái "Đang hoạt động", "~~Không hoạt động"~~ | | |  |
| 6 | Thanh tìm kiếm | N/A | * Nhập freetext * Placeholder "Tìm kiếm" * Quy định độ dài: 50 ký tự * Cho phép nhập ký tự là chữ cái, số, ký tự đặc biệt và khoảng trắng * Cho phép tìm kiếm theo: Email, Tên người dùng |  |
| 7 | Lọc theo ngày tạo | N/A | * Date range picker * Placeholder "Chọn khoảng ngày tạo" * Chọn khoảng thời gian để lọc theo {Ngày tạo} * Người dùng có thể chọn ngày bắt đầu và ngày kết thúc * Ngày kết thúc >= Ngày bắt đầu * Format ngày: `dd/mm/yyyy`. * Cho phép clear để bỏ lọc. |  |
| 8 | ~~Lọc theo trạng thái~~ | ~~N/A~~ | * ~~Chọn 1 giá trị~~ * ~~Mặc định: Tất cả trạng thái~~ * ~~Danh sách giá trị:~~    + ~~Đang hoạt động~~   + ~~Không hoạt động~~ |  |
| 9 | Checkbox | Có | * Cho phép chọn nhiều người dùng cùng 1 lúc * Default: uncheck |  |
| 10 | Tên người dùng | N/A | * Hiển thị tên người dùng |  |
| 11 | Email | N/A | * Hiển thị email của người dùng |  |
| 12 | Số điện thoại | N/A | * Hiển thị số điện thoại của người dùng * Không có => hiển thị "--" |  |
| 13 | Trạng thái | N/A | * Hiển thị trạng thái của người dùng    + Đang hoạt động   + ~~Không hoạt động~~ |  |
| 14 | Ngày tạo | N/A | * Hiển thị thời điểm người dùng được tạo trên hệ thống * Format: dd/mm/yyyy hh:mm:ss |  |

### AC-4: Không nhập đầy đủ các trường bắt buộc

Tại màn hình thêm mới nhóm

Khi nhóm người dùng không nhập đầy đủ các trường thông tin bắt buộc

Thì hệ thống disable nút "Lưu"

### AC-5: Hiển thị thông báo lỗi khi trường bắt buộc bị xóa và người dùng rời khỏi ô nhập liệu

Tại màn hình thêm mới nhóm

Khi nhóm người dùng xóa toàn bộ nội dung tại trường bắt buộc và click ra ngoài ô nhập liệu

Thì hệ thống hiển thị thông báo lỗi <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-008> , phụ thuộc <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583>

### AC-6: Nhập quá giới hạn ký tự cho các trường thông tin

Tại màn hình thêm mới nhóm

Khi nhóm người dùng nhập các thông tin của đối tác dài hơn độ dài quy định

Thì hệ thống báo lỗi <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-014>

### AC-7: Tìm kiếm người dùng

Tại màn hình thêm mới nhóm, trên danh sách người dùng

Khi người dùng nhập điều kiện tìm kiếm

Thì hệ thống:

* Tìm kiếm người dùng theo: Tên người dùng, Email
* Kết quả hiển thị đúng theo điều kiện lọc đã chọn.
* Số lượng kết quả phù hợp được hiển thị rõ ràng (ví dụ: "Tìm thấy 12 kết quả phù hợp")
* Người dùng có thể xóa điều kiện tìm kiếm và lọc để trở về danh sách mặc định

### AC-8: Tìm kiếm không có kết quả

Tại màn hình thêm mới nhóm, trên danh sách người dùng

Khi nhập từ khóa không khớp với bất kỳ người dùng nào

Thì hệ thống hiển thị textview: "Không tìm thấy người dùng phù hợp."

### ~~AC-9: Không cho phép thêm người dùng ở trạng thái~~ **~~"Lưu nháp"~~** ~~vào nhóm~~

~~Tại màn hình thêm mới nhóm người dùng, trên danh sách người dùng~~

~~Khi người dùng ở trạng thái "Lưu nháp"~~

~~Thì hệ thống disable ô checkbox, không cho phép thêm người dùng ở trạng thái "Lưu nháp" vào nhóm~~

### AC-10: Hiển thị số lượng người dùng được chọn

Tại màn hình thêm mới nhóm người dùng, trên danh sách người dùng

Khi người dùng chọn người dùng để thêm vào nhóm

Thì hệ thống hiển thị số lượng người dùng đã chọn.

Ví dụ: Đã chọn [X] người dùng

### AC-11: Giữ trạng thái khi tìm kiếm hoặc lọc

Tại màn hình thêm mới nhóm, trên danh sách người dùng

Khi người dùng đang tick chọn người dùng rồi thực hiện tìm kiếm hoặc lọc theo ngày

Thì hệ thống giữ nguyên trạng thái tick của các người dùng đã được chọn

### ~~AC-12: Lưu nháp nhóm người dùng thành công~~

~~Tại màn hình thêm mới nhóm người dùng~~

~~Khi người dùng nhập liệu đầy đủ thông tin bắt buộc hợp lệ và bấm "Lưu nháp"~~

~~Thì hệ thống:~~

* ~~Thì hệ thống:~~

  + ~~Lưu lại thông tin nhóm người dùng~~
  + ~~Đặt trạng thái của nhóm người dùng = Lưu nháp (Draft)~~
  + ~~Hiển thị thông báo TNT 038~~ <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-039>

### AC-13: Hủy bỏ thêm mới nhóm khi chưa nhập thông tin tạo mới

Tại màn hình thêm mới nhóm

Khi bấm nút "Hủy" khi chưa nhập thông tin tạo mới nào

Thì hệ thống sẽ:

* Hủy bỏ thao tác thêm mới nhóm
* Không lưu bất kỳ thông tin gì trong form thêm mới nhóm
* Quay trở lại màn hình danh sách nhóm

### AC-14: Hủy bỏ thêm mới nhóm khi đã nhập thông tin tạo mới

Tại màn hình khai thêm mới nhóm

Khi bấm nút "Hủy" khi đã nhập ít nhất 1 thông tin thêm mới nhóm

Thì hệ thống sẽ:

* Hiển thị popup confirm "Thông tin bạn vừa nhập sẽ không được lưu."
* Khi nhóm người dùng bấm "Hủy tạo mới để xác nhận"

  + Hệ thống sẽ:

    - Đóng popup
    - Hủy bỏ thao tác thêm mới
    - Không lưu bất kỳ thông tin gì trong form thêm mới nhóm
    - Quay trở lại màn hình danh sách nhóm
* Khi nhóm người dùng bấm "Tiếp tục tạo mới"

  + Hệ thống sẽ:

    - Đóng popup
    - Giữ nguyên tại màn hình thêm mới nhóm
    - Giữ lại các thông tin thêm mới nhóm đã được nhập trước đó.

### AC-15: Thêm mới nhóm không thành công

Tại màn hình thêm mới nhóm

Khi nhóm người dùng bấm Lưu để thêm mới nhóm

Và quá trình lưu dữ liệu **không thành công** do một trong các nguyên nhân sau:

* Lỗi mạng hoặc mất kết nối đến máy chủ
* Lỗi hệ thống nội bộ (500 Internal Server Error)
* Dữ liệu không hợp lệ mà hệ thống không thể xử lý (ví dụ: trùng mã đối tác, định dạng sai)

Thì hệ thống:

* Dữ liệu không hợp lệ mà hệ thống không thể xử lý, Lỗi hệ thống nội bộ: Hiển thị thông báo lỗi: TNT 049 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-049>
* Lỗi mạng hoặc mất kết nối đến máy chủ: Hiển thị thông báo lỗi: TNT 021 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-021>

Business Value & Success Metrics
--------------------------------

* Giúp gom nhóm người dùng (giáo viên, nhân viên, cộng tác viên,…) theo chức năng, chuyên môn, chi nhánh hoặc dự án. Giảm công sức quản lý từng người riêng lẻ → chỉ cần thao tác và phân quyền theo group. Giúp tiết kiệm thời gian vận hành, giảm sai sót trong việc cấp quyền hoặc giao việc
* Giảm thiểu rủi ro khi thao tác thủ công từng người, tối ưu hóa việc triển khai với những người khi ở cùng phòng ban và có tính chất công việc giống nhau
* Tăng khả năng kiểm soát, báo cáo, và mở rộng khi tổ chức phát triển.

**Story được coi là thành công khi nó đảm bảo được:**
-----------------------------------------------------

* Giảm ít nhất 50% so với thao tác cấp quyền thủ công từng user
* Tỷ lệ hài lòng của người sử dụng: ≥ 4.5/5 điểm

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

Danh sách user:

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Thêm mới nhóm người dùng

Out of Scope Item
=================
# [US] Thêm mới nhóm

**Page ID:** 949977090  
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977090
