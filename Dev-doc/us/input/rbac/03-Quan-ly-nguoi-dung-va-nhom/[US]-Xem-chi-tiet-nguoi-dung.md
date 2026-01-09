# [US] Xem chi tiết người dùng

**Page ID:** 949977087
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977087

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
|  |  | A |  | 8 |
|  |  | M | * Bổ sung hiển thị trường "Ứng dụng" trên màn hình chi tiết | 9 |

Use story content
=================

Là Ops/Policy designer trong AEH

Tôi muốn truy cập và xem chi tiết thông tin của từng người dùng trong nội bộ EOP

Để tôi có thể kiểm tra và nắm rõ thông tin cá nhân, trạng thái hoạt động, người dùng và nhóm người dùng mà họ đang thuộc, nhằm quản lý và ra quyết định điều chỉnh quyền, nhóm hoặc trạng thái người dùng một cách chính xác và nhanh chóng.

Acceptance criteria
-------------------

### AC-1: Truy cập màn hình xem chi tiết người dùng

Tại màn hình danh sách người dùng

Khi bấm vào 1 người dùng bất kỳ hoặc bấm vào "Xem chi tiết" trong dot icon

Thì hệ thống điều hướng đến trang Chi tiết người dùng

### AC-2: Hiển thị thành công Chi tiết người dùng

Tại màn hình danh sách người dùng

Khi người dùng có quyền truy cập vào chi tiết người dùng

Thì hệ thống hiển thị màn hình chi tiết người dùng

### AC-3: Màn hình xem chi tiết người dùng

Tại màn hình Chi tiết người dùng

Khi nhìn vào chi tiết

Thì thông tin chi tiết của người dùng bao gồm:

|  | **Trường thông tin** | **Mô tả** |
| --- | --- | --- |
| 1 | Họ tên người dùng | * Hiển thị họ tên người dùng |
| 2 | Email | * Hiển thị email của người dùng |
| 3 | Số điện thoại | * Hiển thị số điện thoại của người dùng * Không có số điện thoại, hiển thị "--" |
| 4 | Nhóm | * Hiển thị các nhóm ở trạng thái "Đang hoạt động" mà người dùng này đang thuộc về * Không có nhóm, hiển thị "--" |
| 5 | Vai trò | * Hiển thị các vai trò ở trạng thái "Đang hoạt động" được gán với người dùng này |
| 6 | Ứng dụng | * Hiển thị các ứng dụng mà người này có thể truy cập |
| 7 | Trạng thái | * Hiển thị trạng thái của người dùng |
| 8 | Ngày tạo | * Hiển thị thời gian tạo người dùng trên hệ thống * Format: dd/mm/yyyy |
| 9 | Người tạo | * Hiển thị username của người tạo |

### AC-4: Hiển thị trạng thái của người dùng có thể chỉnh sửa

Tại màn hình Chi tiết người dùng

Khi tôi có quyền thay đổi trạng thái của người dùng

Thì hệ thống hiển thị dropdown hoặc toggle cho phép chỉnh sửa trạng thái của người dùng

### AC-5: Thay đổi trạng thái thành công

**Tại** màn hình Chi tiết người dùng

**Khi** tôi đã chọn một trạng thái mới cho người dùng

**Thì** hệ thống:

* Cập nhật trạng thái người dùng
* Hiển thị thông báo thành công: TNT 050 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-050>
* Cập nhật trạng thái trên màn hình chi tiết
* Inline business rule: rule 029System Rules - Business rules

### AC-6: Kiểm soát quyền hạn khi thay đổi trạng thái

Tại màn hình Chi tiết người dùng

Khi tôi không có quyền thay đổi trạng thái người dùng

Thì hệ thống chỉ hiển thị trạng thái nhưng không cho phép chỉnh sửa

### AC-7: Hiển thị button "Chỉnh sửa"

Tại màn hình Chi tiết người dùng

Khi người dùng có quyền chỉnh sửa người dùng

Thì hệ thống hiển thị button "Chỉnh sửa" trên màn hình chi tiết

### AC-8: Hiển thị button "Thêm nhóm"

Tại màn hình Chi tiết người dùng

Và người dùng ở trạng thái "Đang hoạt động"

Khi người dùng có thêm mới nhóm cho người dùng

Thì hệ thống:

* Hiển thị button "Thêm nhóm" trên màn hình chi tiết, cho phép bấm để thực hiện luồng gán người dùng cho nhóm
* Disable button "Thêm nhóm" khi người dùng ở trạng thái "Không hoạt động"

### AC-9: Hiển thị Danh sách nhóm khi bấm "Thêm nhóm"

Tại màn hình Chi tiết người dùng

Khi người dùng bấm "Thêm nhóm"

Thì hệ thống:

* Hiển thị danh sách các nhóm mà người dùng chưa thuộc về
* Cho phép chọn nhóm và "Lưu" để thêm người dùng vào nhóm mới được chọn

### AC-10: Thêm nhóm mới cho người dùng thành công

Tại màn hình Chi tiết người dùng

Khi thêm nhóm mới cho người dùng thành công

Thì hệ thống:

* Hiển thị thông báo: USER 010 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#USER-010>
* Tải lại trang chi tiết, hiển thị nhóm mới vừa được thêm cho người dùng lên đầu tại phần danh sách nhóm

### AC-11: Hiển thị button "Xóa nhóm" tại mỗi dòng

Tại màn hình Chi tiết người dùng, phần danh sách người dùng trong nhóm

Khi người dùng có quyền xóa nhóm cho người dùng

Thì hệ thống enable button "Xóa người dùng", cho phép bấm để xóa từng nhóm ra khỏi danh sách nhóm của người dùng

**Inline business rule**: Rule 23 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-023>

Hiển thị thông báo: USER 010 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#USER-011>

### AC-12 – Disable nút Xóa với nhóm "Không hoạt động"

Tại màn hình Chi tiết người dùng, phần danh sách nhóm

Khi nhóm có trạng thái Không hoạt động

Thì:

* Nút Xóa bị disable
* Tooltip USER 013 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#USER-013>

### AC-13: Điều hướng trở lại danh sách người dùng

Tại màn hình chi tiết người dùng

Khi người dùng bấm nút "Quay lại" hoặc nút "<-"

Thì hệ thống điều hướng về lại Danh sách người dùng, giữ nguyên trạng thái bộ lọc, tìm kiếm trước đó nếu có

### AC-14: Không có quyền xem chi tiết

Tại màn hình chi tiết người dùng

Khi người dùng không có quyền xem chi tiết

Thì hệ thống hiển thị thông báo TNT 018 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-018>

### AC-15: Không có quyền thêm nhóm

Tại màn hình chi tiết người dùng

Khi người dùng không có quyền thêm nhóm

Thì hệ thống:

* Disable button thêm nhóm
* Hover → hiển thị tooltip TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-019>

### AC-16: Không có quyền xóa nhóm

Tại màn hình Chi tiết người dùng

Khi người dùng không có quyền xóa nhóm

Thì hệ thống:

* Disable button xóa
* Hover → hiển thị tooltip TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-019>

### AC-17: Thao tác với người dùng

|  | **Trạng thái** | **Số lượng nhóm người dùng thuộc về** | **Thao tác có thể thực hiện** |
| --- | --- | --- | --- |
| 1 | ~~Lưu nháp~~ | ~~Bất kì~~ | * ~~Xem chi tiết~~ * ~~Chỉnh sửa~~ * ~~Thay đổi trạng thái:~~    + ~~Đang hoạt động~~   + ~~Không hoạt động~~ |
| 2 | Đang hoạt động | >=1 | * Xem chi tiết * ~~Chỉnh sửa~~ * Thêm vào nhóm * Bỏ khỏi nhóm * Thay đổi trạng thái:    + ~~Lưu nháp~~   + Không hoạt động |
| 3 | <1 | * Xem chi tiết * ~~Chỉnh sửa~~ * Thêm vào nhóm * Bỏ khỏi nhóm → disable * Thay đổi trạng thái:    + ~~Lưu nháp~~   + Không hoạt động |
| 4 | Không hoạt động | >=1 | * Xem chi tiết * ~~Chỉnh sửa~~ * Thêm vào nhóm * Bỏ khỏi nhóm * Thay đổi trạng thái:    + ~~Lưu nháp~~   + Đang hoạt động |
| 5 | <1 | * Xem chi tiết * ~~Chỉnh sửa~~ * Thêm vào nhóm * Bỏ khỏi nhóm → disable * Thay đổi trạng thái:    + ~~Lưu nháp~~   + Đang hoạt động |

Business Value & Success Metrics
--------------------------------

* Giúp Admin nhanh chóng nắm bắt toàn cảnh thông tin từng người dùng mà không cần truy vấn nhiều nơi.
* Hạn chế sai sót trong việc phân quyền hoặc cập nhật dữ liệu nhờ hiển thị đầy đủ thông tin liên quan đến định danh, nhóm, người dùng.
* Nâng cao hiệu quả quản trị nhân sự nội bộ và đảm bảo tính minh bạch, đồng nhất dữ liệu người dùng trong toàn hệ thống.

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* 100% Admin có thể xem chi tiết người dùng trong tổ chức của mình.
* Thời gian truy cập và hiển thị chi tiết người dùng < 2 giây.
* Giảm 30% số lượng yêu cầu hỗ trợ liên quan đến tra cứu thông tin người dùng.
* Dữ liệu giữa "Thông tin người dùng" và "Identity" luôn đồng bộ chính xác

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

US danh sách người dùng: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/954433566/US+Danh+s+ch+ng+i+d+ng?atlOrigin=eyJpIjoiN2IyMzQ3ZWM0Zjk0NGYwOGJlZjdhYTRmNzc3YzgzMGEiLCJwIjoiYyJ9>

US Gán người dùng vào nhóm: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/952401963/Sub-US+G+n+ng+i+d+ng+v+o+nh+m+t+i+tab+Danh+s+ch+ng+i+d+ng?atlOrigin=eyJpIjoiMjc5ZGVhM2RmYjdmNDJlNjhiZWM0ZWMxYzA1NWRkMmIiLCJwIjoiYyJ9>

Impact Analysis
===============

|  | **Impact** | **Mô tả** |
| --- | --- | --- |
| 1 | ~~Với người dùng có trạng thái Lưu nháp~~ | * ~~Không thể gán người dùng có trạng thái Lưu nháp vào nhóm~~ * ~~Truy cập hệ thống: Không thể đăng nhập được vào hệ thống EMS~~ * ~~Admin vẫn có thể xem, kích hoạt lại hoặc chỉnh sửa thông tin cơ bản.~~ * ~~Trường hợp:~~    + ~~Người dùng hiện tại:~~      - ~~Đang ở trạng thái Đang hoạt động/ Không hoạt động~~     - ~~Được gán vào 1 hoặc nhiều nhóm người dùng (mà nhóm đó có vai trò, quyền cụ thể). \\~~     - ~~Sau đó, Admin thay đổi trạng thái người dùng → Lưu nháp~~   + ~~Thì:~~      - ~~Thu hồi toàn bộ quyền hạn của người dùng, không cho phép đăng nhập hoặc thao tác trong EMS.~~     - ~~Tự động loại bỏ người dùng khỏi danh sách người dùng của các nhóm mà họ đang thuộc.~~     - ~~Khi người dùng được đổi trạng thái từ~~ **~~Lưu nháp~~** ~~->~~ **~~Đang hoạt động/ Không hoạt động~~**~~, người dùng không được tự động thêm lại vào các nhóm trước đó.~~        * ~~Việc gán lại nhóm (nếu cần) sẽ được thực hiện thủ công bởi Admin.~~ |
| 2 | Với người dùng có trạng thái Không hoạt động: | * Truy cập hệ thống: Không thể đăng nhập được vào hệ thống EMS * ~~Phân quyền: Toàn bộ quyền của người dùng bị~~ **~~vô hiệu hóa ngay lập tức~~**~~, kể cả các quyền đến từ nhóm hoặc vai trò~~ * Không ảnh hưởng tới gán nhóm hoặc gán vai trò * Admin vẫn có thể xem, kích hoạt lại hoặc chỉnh sửa thông tin cơ bản. * Trường hợp:    + Người dùng hiện tại:      - Đang ở trạng thái Đang hoạt động     - Được gán vào 1 hoặc nhiều nhóm người dùng (mà nhóm đó có vai trò, quyền cụ thể). \\     - Sau đó, Admin thay đổi trạng thái người dùng → Không hoạt động   + Thì:      - Quyền hạn không bị thu hồi, nhưng người dùng không thể đăng nhập vào hệ thống     - Vẫn tồn tại trong danh sách người dùng của các nhóm mà họ đang thuộc     - Khi người dùng được đổi trạng thái từ **Không hoạt động** -> **Đang hoạt động**, người dùng được kích hoạt lại toàn bộ quyền hạn và có thể đăng nhập vào hệ thống |
| 3 |  | * Trường hợp: Người dùng đang thao tác mà bị thay đổi trạng thái sang "Lưu nháp" hoặc "Không hoạt động" => Reload hoặc thực hiện 1 hành động bất kì => hiển thị thông báo: TNT 051 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-051> |

UI/UX Design
============

### Link figma:

Out of Scope Item
=================