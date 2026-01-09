# [US] Bỏ người dùng khỏi nhóm

**Page ID:** 996999184  
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/996999184

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

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| **Ngày thay đổi** | **Vị trí thay đổi** | **A\*, M, D** | **Mô tả thay đổi** | **Phiên bản confluence** |
|  |  | A |  |  |
|  |  |  |  |  |

Use story content
=================

Là Ops/Policy designer trong AEH

Tôi muốn có thể bỏ người dùng ra khỏi nhóm

Để tôi có thể quản lý và kiểm soát quyền truy cập của từng thành viên, đảm bảo nhóm luôn đúng thành phần và phù hợp với vai trò / nhiệm vụ

Acceptance criteria
-------------------

### AC-1: Truy cập tính năng bỏ người dùng ra khỏi nhóm

Tại màn hình Quản lý người dùng & nhóm, tab Danh sách người dùng

Và người dùng ở trạng thái "Đang hoạt động"

Khi tôi chọn "Bỏ khỏi nhóm" trong dot icon

Thì hệ thống điều hướng hiển thị popup cho phép bỏ người dùng ra khỏi nhóm

### AC-2: Mở popup thêm vào nhóm

Tại thời điểm tôi đã chọn "Bỏ khỏi nhóm" trong dot icon

Khi hệ thống tải trang thành công

Thì hệ thống hiển thị thành công popup "Bỏ người dùng khỏi nhóm"

### AC-3: Hiển thị popup Bỏ người dùng khỏi nhóm

Tại popup "Bỏ người dùng khỏi nhóm"

Khi nhìn vào popup

Thì hệ thống hiển thị danh sách **những nhóm mà người dùng đã tham gia ở trạng thái "Đang hoạt động"** theo dạng bảng

Thông tin hiển thị bao gồm:

|  | **Thông tin** | **Mô tả** |
| --- | --- | --- |
| 1 | Thanh tìm kiếm | * Nhập freetext * Placeholder "Tìm kiếm" * Quy định độ dài: 50 ký tự * Cho phép nhập ký tự là chữ cái, số, ký tự đặc biệt và khoảng trắng * Cho phép tìm kiếm theo: mã nhóm, tên nhóm |
| 2 | Lọc theo ngày tạo | * Date range picker * Placeholder "Chọn khoảng ngày tạo" * Chọn khoảng thời gian để lọc theo {Ngày tạo} * Người dùng có thể chọn ngày bắt đầu và ngày kết thúc * Ngày kết thúc >= Ngày bắt đầu * Format ngày: `dd/mm/yyyy`. * Cho phép clear để bỏ lọc. |
| 3 | Checkbox | * Cho phép chọn nhiều người dùng cùng 1 lúc * Default: uncheck |
| 4 | Mã nhóm | * Hiển thị mã nhóm |
| 5 | Tên nhóm | * Hiển thị tên nhóm |
| 6 | Số lượng thành viên | * Hiển thị số lượng người dùng trong nhóm * Không có => hiển thị "--" |
| 7 | Trạng thái | * Hiển thị trạng thái của nhóm    + Đang hoạt động   + ~~Không hoạt động~~ |
| 8 | Ngày tạo | * Hiển thị thời điểm nhóm được tạo trên hệ thống * Format: dd/mm/yyyy hh:mm:ss |

### AC-4: Bỏ người dùng khỏi nhóm thành công

Tại popup "Bỏ người dùng khỏi nhóm"

Khi tích chọn ít nhất một người dùng

Và bấm nút "Lưu"

Thì hệ thống:

* Bỏ người dùng ra khỏi các nhóm đã chọn
* Hiển thị thông báo USER 008 UI Message - Common Business Rules

### AC-5: Chưa chọn nhóm nào

Tại popup "Bỏ người dùng khỏi nhóm"

Khi chưa chọn người dùng nào

Thì hệ thống disable button "Lưu"

### AC-6: Tìm kiếm người dùng

Tại popup "Bỏ người dùng khỏi nhóm"

Khi người dùng nhập điều kiện tìm kiếm

Thì hệ thống:

* Tìm kiếm theo: mã nhóm, tên nhóm
* Kết quả hiển thị đúng theo điều kiện lọc đã chọn.
* Số lượng kết quả phù hợp được hiển thị rõ ràng (ví dụ: "Tìm thấy 12 kết quả phù hợp")
* Có thể xóa điều kiện tìm kiếm và lọc để trở về danh sách mặc định

### AC-7: Tìm kiếm không có kết quả

Tại popup "Bỏ người dùng khỏi nhóm"

Khi nhập từ khóa không khớp với bất kỳ nhóm nào

Thì hệ thống hiển thị textview: "Không tìm thấy nhóm phù hợp."

### ~~AC-7: Kiểm tra khi trạng thái người dùng bị thay đổi sang "Lưu nháp" ở tab khác~~
~~Tại thời điểm người dùng đang mở tab A tại màn hình Danh sách người dùng~~
~~Và Người dùng này đồng thời được cập nhật trạng thái thành "Lưu nháp" ở tab B hoặc bởi người dùng khác~~
~~Khi Người dùng ở tab A vẫn thực hiện thao tác "Thêm vào nhóm"~~
~~Thì hệ thống:~~
~~* ~~Hệ thống kiểm tra trạng thái thực tế trước khi xử lý.~~
* ~~Nếu phát hiện người dùng đã ở trạng thái "Lưu nháp", thao tác thêm bị từ chối.~~
* ~~Hệ thống hiển thị thông báo lỗi: USER 004~~ UI Message - Common Business Rules

### AC-8: Xử lý trường hợp dữ liệu hiển thị cũ khi bỏ người dùng ra khỏi nhóm

Tại màn hình danh sách người dùng

Và:

* Có nhiều người dùng quản trị đang mở popup "Bỏ người dùng khỏi nhóm" cùng lúc.
* Một trong các quản trị viên (Người A) đã bỏ người dùng X ra khỏi nhóm "Nhóm 1" và lưu thành công.
* Trong khi đó, Người B vẫn đang mở popup cũ (chưa reload dữ liệu), nơi "Nhóm 1" vẫn còn hiển thị trong danh sách nhóm khả dụng.

Khi người B chọn **"Nhóm 1"** để bỏ người dùng X khỏi nhóm.

Thì hệ thống:

* Hệ thống kiểm tra lại trạng thái thực tế trước khi xử lý.
* Nếu phát hiện **người dùng X đã bị bỏ khỏi nhóm đó**, thì:

  + Hiển thị thông báo lỗi: USER 009 UI Message - Common Business Rules

### AC-9: Hủy thao tác

Tại popup "Bỏ người dùng khỏi nhóm"

Khi tôi nhấn "Hủy"

Thì hệ thống đóng popup, không lưu thay đổi.

Business Value & Success Metrics
--------------------------------

* Đảm bảo tính chính xác trong phân quyền: Việc loại bỏ kịp thời người dùng khỏi nhóm giúp tránh tình trạng người dùng vẫn giữ quyền truy cập hoặc vai trò không còn phù hợp, đảm bảo tuân thủ nguyên tắc "đúng người – đúng quyền".
* Tăng hiệu quả quản trị hệ thống: Giúp Admin dễ dàng kiểm soát và duy trì cấu trúc nhóm gọn gàng, chính xác, giảm rủi ro phát sinh do sai sót trong gán quyền.
* Nâng cao tính bảo mật & minh bạch: Mọi thay đổi thành viên nhóm đều được ghi nhận rõ ràng, đảm bảo an toàn dữ liệu và tuân thủ quy trình quản trị nội bộ.
* Giảm xung đột dữ liệu & thao tác song song: Hệ thống xử lý được các tình huống thao tác đồng thời (multi-tab, multi-admin), giảm lỗi và tăng độ tin cậy trong quản lý.

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* 100% người dùng bị loại khỏi nhóm không còn được kế thừa quyền hạn của nhóm đó
* < 1% lỗi thao tác do xung đột dữ liệu khi nhiều quản trị viên cùng thao tác
* ≥ 90% Admin đánh giá thao tác "Bỏ người dùng khỏi nhóm" là dễ hiểu, nhanh, và phản hồi rõ ràng.

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: PDM.AEH.SSO.PM - Mô hình dữ liệu vật lý cho Policy Management

US Danh sách người dùng: https://mfacilities.atlassian.net/wiki/spaces/EES/pages/954433566/US+Danh+s+ch+ng+i+d+ng?atlOrigin=eyJpIjoiMTA1MmVkYjcwNDJjNDY1N2IyYTY4YTAyNjk2MWNmMTgiLCJwIjoiYyJ9>

Impact Analysis
===============

Khi gán user thành công vào nhóm → Trong danh sách người dùng của nhóm → hiển thị danh sách các user được gán mới thành công

UI/UX Design
============

### Link figma:

Popup thêm người dùng vào nhóm:

Popup chọn nhóm có sẵn

Popup tạo mới nhóm

Out of Scope Item
================