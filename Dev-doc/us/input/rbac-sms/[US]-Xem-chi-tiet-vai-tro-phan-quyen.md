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
|  |  | M | Chỉnh sửa lại toàn bộ US |  |

Use story content
=================

Là Admin user trong 1 nhà trường/ trung tâm cụ thể, khi được BD onboard thành công

**Tôi muốn** xem chi tiết một vai trò bao gồm thông tin chung, quyền, đối tượng áp dụng, phạm vi dữ liệu và trạng thái

**Để** nắm bắt rõ chức năng và quyền hạn của vai trò, đồng thời có thể thay đổi trạng thái của vai trò khi cần thiết.

Acceptance criteria
-------------------

### **AC-1: Quyền truy cập màn xem chi tiết**

**Tại** màn hình "Danh sách vai trò",

**Khi** có quyền Xem chi tiết và nhấn "Xem chi tiết",

**Thì** hệ thống điều hướng đến màn "Chi tiết vai trò" và tải toàn bộ thông tin của vai trò.

### **AC-2: Không có quyền xem vai trò**

**Tại** màn hình "Danh sách vai trò",

**Khi** người dùng không có quyền Xem chi tiết

**Thì** hệ thống disable action xem chi tiết

* Hover → hiển thị tooltip TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761>

### **AC-3: Hiển thị đầy đủ dữ liệu vai trò**

**Tại** màn "Chi tiết vai trò",

**Khi** dữ liệu được tải thành công,

**Thì** hệ thống hiển thị đúng các nhóm thông tin:

|  | **Nhóm thông tin** | **Nội dung** |
| --- | --- | --- |
| 1 | Thông tin chung | Tên vai trò, mô tả, trạng thái (Đang hoạt động/Không hoạt động) |
| 2 | Quyền | Danh sách Tính năng & Action đã được gán theo phân hệ, công cụ quản lý |
| 3 | Đối tượng áp dụng | Danh sách Người dùng/ Nhóm đã gán hoặc toàn bộ user nếu toggle "Áp dụng tất cả người dùng" bật |
| 4 | Phạm vi dữ liệu | Giá trị phạm vi đã được chọn |

### **AC-4: Hiển thị trạng thái vai trò**

**Tại** màn xem chi tiết vai trò,

**Khi** vai trò được tải,

**Thì** hệ thống hiển thị trạng thái của role đúng như lưu trữ ("Đang hoạt động" hoặc "Không hoạt động").

### **AC-5: Hiển thị cấu trúc quyền**

**Tại** tab "Cấu hình quyền",

**Khi** tab được mở,

**Thì** hệ thống hiển thị cây phân cấp Công cụ quản lý → Phân hệ → Tính năng → Action

Và tick đúng các Action đã gán (chỉ ở chế độ xem, không cho chỉnh sửa).

### **AC-6: Hiển thị danh sách người dùng/ nhóm gán role**

**Tại** tab "Cấu hình đối tượng",

**Khi** danh sách tải,

**Thì** hệ thống:

* Chỉ hiển thị người dùng/ nhóm đang hoạt động
* Chỉ hiển thị các người dùng/ nhóm đã gán
* Nếu toggle "Áp dụng tất cả người dùng" đang bật, bảng bị disable và hiển thị thông tin tương ứng

### **AC-7: Hiển thị phạm vi dữ liệu**

**Tại** tab "Cấu hình phạm vi",

**Khi** tab được mở,

**Thì** hệ thống hiển thị đúng radio tương ứng với phạm vi dữ liệu đã được chọn khi tạo/chỉnh sửa.

### **AC-8: Hiển thị nút Chỉnh sửa vai trò**

**Tại** màn "Chi tiết vai trò",

**Khi** người dùng có quyền chỉnh sửa vai trò

**Thì** hệ thống hiển thị nút **"Chỉnh sửa vai trò"**.

### **AC-9: Disable nút Chỉnh sửa vai trò khi không có quyền**

**Tại** màn "Chi tiết vai trò",

**Khi** người dùng không có quyền chỉnh sửa vai trò

**Thì** hệ thống disable nút "Chỉnh sửa".

### **AC-10: Điều hướng sang màn chỉnh sửa**

**Tại** màn xem chi tiết vai trò,

**Khi** nhấn "Chỉnh sửa",

**Thì** hệ thống điều hướng sang màn "Chỉnh sửa vai trò" và tải dữ liệu tương ứng.

### **AC-11: Chuyển trạng thái Đang hoạt động → Không hoạt động**

**Tại** màn "Chi tiết vai trò",

**Và** vai trò ở trạng thái "Đang hoạt động"

**Khi** nhấn chuyển trạng thái "Không hoạt động",

**Thì** hệ thống hiển thị popup xác nhận: rule 029 System Rules - Business rules

**Khi** xác nhận,

**Thì** hệ thống cập nhật trạng thái thành "Không hoạt động" và hiển thị thông báo TNT 050 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-050>

### **AC-12: Chuyển trạng thái Không hoạt động → Đang hoạt động**

**Tại** màn "Chi tiết vai trò",

**Và** vai trò ở trạng thái "Không hoạt động"

**Khi** nhấn chuyển trạng thái "Đang hoạt động",

**Thì** hệ thống hiển thị popup xác nhận.

**Khi** đồng ý,

**Thì** trạng thái được cập nhật về "Đang hoạt động" và hiển thị hiển thị thông báo TNT 050 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-050>

### **AC-13: Chi tiết vai trò ở chế độ read-only (ngoại trừ thay đổi trạng thái)**

**Tại** màn "Chi tiết vai trò",

**Khi** xem thông tin,

**Thì** các trường, danh sách quyền, đối tượng và phạm vi chỉ ở trạng thái read-only và không thể chỉnh sửa (trừ hành động chuyển trạng thái và nút "Chỉnh sửa").

### **AC-14: Lỗi khi không tải được dữ liệu**

**Tại** màn "Chi tiết vai trò",

**Khi** hệ thống không lấy được dữ liệu (timeout, server error),

**Thì** hệ thống hiển thị thông báo lỗi: TNT 021 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-021> và không load nội dung các tab.

Business Value & Success Metrics
--------------------------------

* Giúp hiểu rõ vai trò đang tồn tại và phạm vi ảnh hưởng của nó
* Hỗ trợ quản trị lifecycle của vai trò bằng tính năng bật/tắt trạng thái
* Giảm rủi ro duy trì các vai trò không còn phù hợp

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* Tỷ lệ load chi tiết vai trò thành công ≥ 99%
* Thời gian tải vai trò ≤ 1 giây
* Tỷ lệ thao tác đổi trạng thái thành công ≥ 98%
* Sai lệch quyền sau khi cập nhật trạng thái = 0%

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

Impact Analysis
===============

|  | **Impact** | **Mô tả** |
| --- | --- | --- |
| 1 | Vai trò có trạng thái không hoạt động | * Vai trò **không sinh quyền thực tế** trong hệ thống. Dù đã được gán cho người dùng, người đó **không được phép thực hiện bất kỳ hành động nào** dựa trên quyền của vai trò này * Không hiển thị trong danh sách vai trò của nhóm người dùng <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/972816407/US+Xem+chi+ti+t+nh+m?atlOrigin=eyJpIjoiZDBjN2FlZGRiM2RiNDEzNGEwYTI2MjA2Zjk1ODA4MGEiLCJwIjoiYyJ9> |
| 2 |  | * Trường hợp: Người dùng được gán vai trò đang thao tác mà bị thu hồi vai trò đột ngột => Reload hoặc thực hiện 1 hành động bất kì thuộc vai trò bị thu hồi => hiển thị thông báo: TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-019> |

UI/UX Design
============

### Link figma:

Out of Scope Item
=================