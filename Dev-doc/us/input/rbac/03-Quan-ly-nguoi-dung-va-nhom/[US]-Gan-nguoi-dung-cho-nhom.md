# [US] Gán người dùng cho nhóm

**Page ID:** 997228546  
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/997228546

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
|  | [Sub-US] Gán người dùng vào nhóm tại tab Danh sách người dùng | M | * Thay đổi logic gán người dùng vào nhóm    + Cũ: Gán nhiều người vào nhiều nhóm   + Mới: Gán 1 người vào nhiều nhóm | 10 |
|  |  |  |  |  |
|  |  |  |  |  |

Use story content
=================

Là Ops/Policy designer trong AEH

Tôi muốn có thể thêm người dùng vào 1 hoặc nhiều nhóm

Để tôi có thể quản lý quyền truy cập, phân vai trò và tổ chức người dùng trong nội bộ một cách nhanh chóng, hiệu quả.

Acceptance criteria
-------------------

### AC-1: Truy cập tính năng thêm người dùng vào nhóm

Tại màn hình Quản lý người dùng & nhóm, tab Danh sách người dùng

Và người dùng ở trạng thái "Đang hoạt động"

Khi tôi chọn "Thêm vào nhóm" trong dot icon

Thì hệ thống điều hướng hiển thị popup cho phép gán user vào nhóm

### AC-2: Mở popup thêm vào nhóm

Tại thời điểm tôi đã chọn "Thêm vào nhóm" trong dot icon

Khi hệ thống tải trang thành công

Thì hệ thống:

* Hiển thị popup "Thêm người dùng vào nhóm"
  + Gồm 2 lựa chọn:

    - Chọn nhóm người dùng có sẵn
    - Hoặc tạo nhóm người dùng mới

### AC-3: Thêm vào nhóm có sẵn

Tại popup "Thêm người dùng vào nhóm"

Khi tôi chọn "Chọn nhóm người dùng có sẵn"

Thì hệ thống:

* Hiển thị danh sách **các nhóm người dùng** thỏa mãn các điều kiện sau:

  + Người dùng được chọn **hiện chưa thuộc** các nhóm này.
  + Nhóm ở trạng thái **"Đang hoạt động"**.
* Khi người dùng chọn một hoặc nhiều nhóm để gán người dùng. Thì hệ thống:

  + Thêm người dùng vào các nhóm đã chọn
  + Hiển thị thông báo (USER 007) UI Message - Common Business Rules

### AC-4: Hiển thị popup tạo mới nhóm khi chọn "Hoặc tạo nhóm người dùng mới"

Tại popup "Thêm người dùng vào nhóm"

Khi tôi chọn "Hoặc tạo nhóm người dùng mới"

Thì hệ thống hiển thị popup tạo mới nhóm, cho phép người dùng nhập thông tin tạo mới nhóm

Thông tin tạo mới nhóm gồm:

|  | **Thông tin** | **Bắt buộc** | **Mô tả** |
| --- | --- | --- | --- |
| 1 | Mã nhóm người dùng | Có | * Mã code của nhóm người dùng mới * Không hiển thị trên màn hình thêm mới * Sinh khi lưu thành công * Rule 019 System Rules - Business rules |
| 2 | Tên nhóm | Có | * Nhập tên nhóm người dùng * Nhập freetext * Cho phép nhập ký tự là chữ cái, chữ số, ký tự đặc biệt và khoảng trắng. * Quy định độ dài: 255 ký tự |
| 3 | Mô tả | Không | * Nhập mô tả * Nhập freetext * Cho phép nhập ký tự là chữ cái, chữ số, ký tự đặc biệt và khoảng trắng. * Quy định độ dài: 255 ký tự |
| 4 | Vai trò | Có | * Dropdown chọn nhiều giá trị * Danh sách giá trị: Hiển thị danh sách các vai trò có trạng thái "Đang hoạt động" cho người dùng chọn vai trò gán cho nhóm |

### AC-5: Tạo nhóm mới và thêm người dùng

Tại popup tạo mới nhóm

Khi người dùng nhập thông tin tạo mới nhóm hợp lệ và bấm "Thêm"

Thì hệ thống:

* Tạo mới nhóm thành công, nhóm ở trạng thái "Đang hoạt động"
* Thêm toàn bộ người dùng đã chọn vào nhóm vừa tạo
* Hiển thị thông báo (USER 002) UI Message - Common Business Rules

### AC-6: Xử lý trường hợp dữ liệu hiển thị cũ khi thêm người dùng vào nhóm

Tại màn hình danh sách người dùng

Và:

* Có nhiều người dùng quản trị đang mở popup "Thêm người dùng vào nhóm" cùng lúc.
* Một trong các quản trị viên (Người A) đã thêm người dùng X vào nhóm "Nhóm 1" và lưu thành công.
* Trong khi đó, Người B vẫn đang mở popup cũ (chưa reload dữ liệu), nơi "Nhóm 1" vẫn còn hiển thị trong danh sách nhóm khả dụng.

Khi người B chọn **"Nhóm 1"** để thêm cùng người dùng X vào nhóm.

Và bấm "Lưu"

Thì hệ thống:

* Hệ thống kiểm tra lại trạng thái thực tế trước khi xử lý.
* Nếu phát hiện **người dùng X đã thuộc nhóm đó**, thì:

  + Hiển thị thông báo lỗi: USER 005 UI Message - Common Business Rules

### AC-7: Không chọn nhóm

Tại thời điểm tôi mở popup nhưng không chọn nhóm hoặc không nhập tên nhóm mới

Khi tôi không nhập đầy đủ thông tin bắt buộc

Thì hệ thống disable nút "Thêm"

### AC-8: Hủy thao tác

Tại popup "Thêm người dùng vào nhóm"

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

HLD: https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: PDM.AEH.SSO.PM - Mô hình dữ liệu vật lý cho Policy Management

US Danh sách người dùng: https://mfacilities.atlassian.net/wiki/spaces/EES/pages/983302153/US+Danh+s+ch+ng+i+d+ng+tr+n+EOP?atlOrigin=eyJpIjoiM2EyMWMxNTBhOTFkNGI0M2JmN2Y5NWZkMWExYTBmYzAiLCJwIjoiYyJ9>

Impact Analysis
===============

Khi gán user thành công vào nhóm → Trong danh sách người dùng của nhóm → hiển thị danh sách các user được gán mới thành công

UI/UX Design
============

### Link figma:

Out of Scope Item
================