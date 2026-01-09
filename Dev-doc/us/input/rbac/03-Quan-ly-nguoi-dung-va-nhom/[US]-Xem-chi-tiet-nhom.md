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
|  |  |  |  |  |

Use story content
=================

Là Ops/Policy designer trong AEH

Tôi muốn xem chi tiết thông tin của **nhóm** đã được tạo trong hệ thống EOP

Để tôi có thể hiểu rõ thành phần, vai trò và thông tin của các thành viên trong nhóm đó, giúp tôi đánh giá, kiểm soát và quản lý hiệu quả việc phân chia người dùng theo nhóm trong tổ chức.

Acceptance criteria
-------------------

### AC-1: Truy cập màn hình xem chi tiết nhóm

Tại tab danh sách nhóm

Khi bấm vào 1 nhóm bất kỳ hoặc bấm vào "Xem chi tiết" trong dot icon

Thì hệ thống điều hướng đến trang Chi tiết nhóm

### AC-2: Hiển thị thành công Chi tiết nhóm

Tại màn hình Chi tiết nhóm

Khi người dùng có quyền truy cập vào chi tiết nhóm

Thì hệ thống hiển thị màn hình chi tiết nhóm nội bộ

### AC-3: Màn hình xem chi tiết nhóm

Tại màn hình Chi tiết nhóm

Khi nhìn vào chi tiết

Thì thông tin chi tiết của nhóm nội bộ bao gồm:

|  | **Trường thông tin** | **Mô tả** |
| --- | --- | --- |
| 1 | **Thông tin chung** | |
| 2 | Mã nhóm | * Hiển thị Mã nhóm |
| 3 | Tên nhóm | * Hiển thị tên nhóm |
| 4 | Mô tả | * Hiển thị mô tả của nhóm |
| 5 | Số lượng người dùng trong nhóm | * Hiển thị số lượng người dùng có trong nhóm |
| 6 | Vai trò | * Hiển thị danh sách các vai trò ở trạng thái "Đang hoạt động" được gán với nhóm |
| 7 | Trạng thái | * Hiển thị trạng thái hiện tại của nhóm |
| 8 | Ngày tạo | * Hiển thị thời gian nhóm được tạo * Format: dd/mm/yyyy hh:mm:ss |
| 9 | Người tạo | * Hiển thị username của người tạo nhóm |
| 10 | **Danh sách người dùng trong nhóm** | * Hiển thị danh sách người dùng trong nhóm |

### AC-4: Hiển thị danh sách người dùng trong nhóm

Tại màn hình chi tiết nhóm

Khi nhìn vào chi tiết

Thì hệ thống hiển thị danh sách người dùng trong nhóm dưới phần thông tin chung:

|  | **Thông tin** | **Mô tả** |
| --- | --- | --- |
| 1 | **Thông tin tìm kiếm** | |
| 2 | Tìm kiếm | * Nhập freetext * Placeholder "Tìm kiếm" * Quy định độ dài: 255 ký tự * Cho phép nhập ký tự là chữ cái, số, ký tự đặc biệt và khoảng trắng * Cho phép tìm kiếm theo: Email, Tên người dùng |
| 3 | Lộc theo trạng thái | * Chọn 1 giá trị * Default: Tất cả giá trị * Danh sách giá trị:    + Đang hoạt động   + Không hoạt động |
| 4 | **Danh sách người dùng trong nhóm** | |
| 5 | Tên người dùng | * Hiển thị Tên người dùng |
| 6 | Email | * Hiển thị Email của người dùng |
| 7 | Số điện thoại | * Hiển thị số điện thoại của người dùng * Nếu không có, hiển thị "--" |
| 8 | Trạng thái | * Hiển thị trạng thái hiện tại của người dùng |
| 9 | Ngày thêm vào nhóm | * Hiển thị thời gian người dùng được thêm vào nhóm * Format: dd/mm/yyyy |

### AC-5: Cách sắp xếp bản ghi danh sách người dùng mặc định trong nhóm

Tại màn hình chi tiết nhóm

Khi người dùng nhìn xuống Danh sách người dùng trong nhóm

Và chưa chọn cách sắp xếp nào

Thì hệ thống hiển thị danh sách người dùng theo ngày thêm vào nhóm, từ mới nhất đến cũ nhất

### AC-6: Hiển thị trạng thái của nhóm có thể chỉnh sửa

Tại màn hình chi tiết nhóm

Khi tôi có quyền thay đổi trạng thái của nhóm

Thì hệ thống hiển thị dropdown hoặc toggle cho phép chỉnh sửa trạng thái của nhóm

### AC-7: Thay đổi trạng thái thành công

Tại màn hình chi tiết nhóm

Khi tôi đã chọn một trạng thái mới cho nhóm

Thì hệ thống:

* Cập nhật trạng thái nhóm
* Hiển thị thông báo thành công: TNT 050 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-050>
* Cập nhật trạng thái trên màn hình chi tiết
* Inline business rule: rule 029System Rules - Business rules

### AC-8: Kiểm soát quyền hạn khi thay đổi trạng thái

Tại màn hình chi tiết nhóm

Khi tôi không có quyền thay đổi trạng thái nhóm

Thì hệ thống chỉ hiển thị trạng thái nhưng không cho phép chỉnh sửa

### AC-9: Hiển thị button "Chỉnh sửa"

Tại màn hình chi tiết nhóm, phần thông tin chung

Khi người dùng có quyền chỉnh sửa nhóm

Thì hệ thống hiển thị enable button "Chỉnh sửa" tại phần thông tin chung màn hình chi tiết

### AC-10: Hiển thị button "Thêm người dùng"

Tại màn hình chi tiết nhóm, phần danh sách người dùng trong nhóm

Khi người dùng có quyền thêm mới người dùng cho nhóm

Thì hệ thống hiển thị button "Thêm người dùng" trên màn hình chi tiết nhóm:

* Khi bấm nút "Thêm người dùng"
* Thì:

  + Hiển thị màn hình danh sách người dùng chưa có trong nhóm
  + Có thể chọn một hoặc nhiều người dùng để thêm vào nhóm
  + Hiển thị thông báo USER 001 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#USER-001> nếu thêm thành công

### AC-11: Hiển thị button "Xóa người dùng" tại mỗi dòng

Tại màn hình chi tiết nhóm, phần danh sách người dùng trong nhóm

Khi người dùng có quyền bỏ người dùng khỏi nhóm

Thì hệ thống enable button "Xóa người dùng", cho phép bấm để bỏ từng người dùng ra khỏi nhóm

**Inline business rule**:<https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-022>

Hiển thị thông báo: USER 012 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#USER-012>

### AC-12: Disable nút Xóa với người dùng "Không hoạt động"

Tại màn hình Chi tiết nhóm người dùng, phần danh sách người dùng

Khi nhóm có trạng thái Không hoạt động

Thì:

* Nút Xóa bị disable
* Tooltip USER 014 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#USER-014>

### AC-13: Điều hướng trở lại danh sách định danh

Tại màn hình chi tiết nhóm

Khi người dùng bấm nút "Quay lại" hoặc nút "<-"

Thì hệ thống điều hướng về lại tab Danh sách nhóm, giữ nguyên trạng thái bộ lọc, tìm kiếm trước đó nếu có

### AC-14: Không có quyền chỉnh sửa

Tại màn hình chi tiết nhóm

Khi người dùng không có quyền chỉnh sửa

Thì hệ thống hiển thị thông báo TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-019>

### AC-15: Thao tác với người dùng

|  | **Trạng thái** | **Thao tác có thể thực hiện** |
| --- | --- | --- |
| 1 | ~~Lưu nháp~~ | * ~~Xem chi tiết~~ * ~~Chỉnh sửa~~ * ~~Thay đổi trạng thái:~~    + ~~Đang hoạt động~~   + ~~Không hoạt động~~ |
| 2 | Đang hoạt động | * Xem chi tiết * ~~Chỉnh sửa~~ * Thêm người dùng * Thay đổi trạng thái:    + ~~Lưu nháp~~   + Không hoạt động |
| 3 | Không hoạt động | * Xem chi tiết * ~~Chỉnh sửa~~ * Thêm người dùng → disable * Thay đổi trạng thái:    + ~~Lưu nháp~~   + Đang hoạt động |

Business Value & Success Metrics
--------------------------------

* Cung cấp cái nhìn tổng thể về tất cả các nhóm trong toàn hệ sinh thái, giúp Ops/Policy designer nắm rõ cơ cấu và phân bố người dùng.
* Hỗ trợ việc ra quyết định liên quan đến phân quyền, quản lý rủi ro và tuân thủ chính sách.
* Giảm thiểu sai sót trong việc quản lý nhóm và đảm bảo dữ liệu nhóm luôn chính xác và đầy đủ.

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* Tỷ lệ nhóm được hiển thị đầy đủ trong hệ thống ≥ 95% so với tổng số nhóm đã tạo.
* Thời gian trung bình để truy cập và xem chi tiết một nhóm ≤ 2 giây.
* Không có lỗi dữ liệu sai lệch giữa thông tin nhóm hiển thị và dữ liệu thực tế.
* Số lượng truy vấn hỗ trợ từ Ops/Policy designer liên quan đến thông tin nhóm giảm ≥ 50% so với trước khi có chức năng này.

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

US Danh sách nhóm: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/971636760/US+Danh+s+ch+nh+m?atlOrigin=eyJpIjoiNjc1NjAwNTM2OGY2NGI5MWI1MDUwZTU0ODFhZDk3ZDIiLCJwIjoiYyJ9>

US Danh sách nhóm người dùng đối tác: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/954826788/US+Danh+s+ch+nh+m+ng+i+d+ng?atlOrigin=eyJpIjoiNTA3OWJlZDBlMzEzNDI3Yjg1NDYyZjhkYzg2YzUyODUiLCJwIjoiYyJ9>

US Gán người dùng vào trong nhóm đối tác: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/958758921/Sub-US+G+n+ng+i+d+ng+v+o+nh+m+t+i+tab+nh+m+ng+i+d+ng?atlOrigin=eyJpIjoiN2RiZWJjMmQ4MzNjNGMzNWI2OWQ1MDJhNWQ5Zjc5NjkiLCJwIjoiYyJ9>

Impact Analysis
===============

|  | **Impact** | **Mô tả** |
| --- | --- | --- |
| 1 | ~~Với nhóm người dùng có trạng thái Lưu nháp~~ | * ~~Không thể gán vai trò cho nhóm người dùng có trạng thái Lưu nháp~~ * ~~Admin vẫn có thể xem, kích hoạt hoặc chỉnh sửa thông tin cơ bản.~~ * ~~Trường hợp:~~    + ~~Nhóm người dùng hiện tại:~~      - ~~Đang ở trạng thái Đang hoạt động/ Không hoạt động~~     - ~~Được gán vào 1 hoặc nhiều vai trò~~     - ~~Sau đó, Admin thay đổi trạng thái nhóm người dùng → Lưu nháp~~   + ~~Thì:~~      - ~~Thu hồi toàn bộ quyền hạn của nhóm người dùng và người dùng thuộc nhóm~~     - ~~Tự động loại bỏ nhóm người dùng khỏi danh sách Loại phạm vi của vai trò đó. Đồng thời loại bỏ danh sách người dùng thuộc nhóm đó ra khỏi danh sách người dùng đã được gán với vai trò~~     - ~~Khi nhóm người dùng được đổi trạng thái từ~~ **~~Lưu nháp~~** ~~->~~ **~~Đang hoạt động/ Không hoạt động~~**~~, nhóm người dùng không được tự động thêm lại vào các vai trò trước đó.~~        * ~~Việc gán lại vai trò (nếu cần) sẽ được thực hiện thủ công bởi Admin.~~ |
| 2 | Với nhóm người dùng có trạng thái Không hoạt động: | * Không ảnh hưởng tới gán vai trò * Admin vẫn có thể xem, kích hoạt lại hoặc chỉnh sửa thông tin cơ bản. * Trường hợp:    + Người dùng hiện tại:      - Đang ở trạng thái Đang hoạt động     - Được gán vào 1 hoặc nhiều vai trò     - Sau đó, Admin thay đổi trạng thái người dùng → Không hoạt động   + Thì:      - Thu hồi toàn bộ quyền hạn của nhóm người dùng và người dùng thuộc nhóm     - Vẫn tồn tại trong danh sách Loại phạm vi của vai trò đó.     - Khi nhóm người dùng được đổi trạng thái từ **Không hoạt động** -> **Đang hoạt động**, nhóm người dùng được kích hoạt lại toàn bộ quyền hạn |

UI/UX Design
============

### Link figma:

Out of Scope Item
=================
# [US] Xem chi tiết nhóm

**Page ID:** 949977091  
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977091
