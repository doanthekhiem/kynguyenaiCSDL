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
|  |  | M | * AC-3: Bổ sung thêm trạng thái cho Vai trò |  |

Use story content
=================

Là Admin user trong 1 nhà trường/ trung tâm cụ thể, khi được BD onboard thành công

**Tôi muốn** xem danh sách các vai trò đã được thiết lập trong hệ thống

**Để** thuận tiện quản lý, tra cứu, tìm kiếm và thực hiện các thao tác như xem chi tiết, chỉnh sửa, hoặc tạo mới vai trò.Acceptance criteria
-------------------

### **AC-1: Quyền truy cập màn Danh sách vai trò**

**Tại** menu phân quyền hoặc phân hệ quản trị,

**Khi** người dùng có quyền Xem danh sách

**Thì** hệ thống hiển thị menu "Danh sách vai trò" và cho phép truy cập trang danh sách.

### **AC-2: Không có quyền xem danh sách vai trò**

**Tại** menu hệ thống,

**Khi** người dùng không có quyền Xem danh sách

**Thì** hệ thống disable mục "Danh sách vai trò"

### **AC-3: Hiển thị danh sách vai trò theo cấu trúc bảng**

**Tại** màn hình "Danh sách vai trò",

**Khi** trang được tải,

**Thì** hệ thống hiển thị bảng danh sách vai trò gồm các cột:

|  | **Thông tin** | **Mô tả** |
| --- | --- | --- |
| 1 | Mã vai trò | Mã vai trò |
| 2 | Tên vai trò | Tên vai trò |
| 3 | Số người dùng | Số lượng user đang được gán role |
| 4 | ~~Phạm vi dữ liệu~~ | ~~Phạm vi mà vai trò này áp dụng~~ |
| 5 | ~~Loại đối tượng~~ | ~~Hiển thị Loại đối tượng áp dụng cho Vai trò~~ |
| 6 | Trạng thái | Đang hoạt động / Không hoạt động |
| 7 | Thời gian tạo | Thời gian tạo mới vai trò |
| 8 | Hành động | Xem chi tiết / Chỉnh sửa |

### **AC-4: Phân trang danh sách vai trò**

**Tại** màn danh sách vai trò,

**Khi** số lượng vai trò vượt quá số lượng hiển thị 1 trang,

**Thì** hệ thống hiển thị phân trang và cho phép chuyển trang mà **không làm mất dữ liệu filter, search**.

### **AC-5: Tìm kiếm theo Tên vai trò, mã vai trò**

**Tại** màn danh sách vai trò,

**Khi** Admin user nhập từ khóa vào ô "Tìm kiếm vai trò",

**Thì** hệ thống hiển thị danh sách role có tên hoặc mã **chứa từ khóa**.

### **AC-6: Bộ lọc theo trạng thái vai trò**

**Tại** màn danh sách vai trò,

**Khi** Admin user chọn trạng thái (Tất cả / Đang hoạt động / Không hoạt động),

**Thì** danh sách được lọc và chỉ hiển thị các role tương ứng.

### **AC-7: Hiển thị nút "Tạo mới vai trò"**

**Tại** màn danh sách vai trò,

**Khi** người dùng có quyền tạo mới vai trò,  
**Thì** hệ thống hiển thị nút **"Tạo mới vai trò"**.

**Khi** người dùng không có quyền này,  
**Thì** nút được disabled.

### **AC-8: Hành động xem chi tiết vai trò**

**Tại** màn danh sách vai trò,

**Khi** Admin user nhấn "Xem chi tiết" tại một hàng vai trò,

**Thì** hệ thống điều hướng sang US "Xem chi tiết vai trò".

### **AC-9: Hành động chỉnh sửa vai trò theo quyền**

**Tại** màn danh sách vai trò,

**Khi** Admin user có quyền Chỉnh sửa và nhấn "Chỉnh sửa",

**Thì** hệ thống điều hướng sang màn "Chỉnh sửa vai trò".

**Khi** không có quyền,

**Thì** nút "Chỉnh sửa" disabled.

### **AC-10: Hiển thị chính xác trạng thái vai trò**

**Tại** màn danh sách vai trò,

**Khi** tải dữ liệu,

**Thì** giá trị trạng thái mỗi vai trò phải hiển thị đúng ("Đang hoạt động" / "Không hoạt động").

### **AC-11: Đồng bộ số người dùng được gán vai trò**

**Tại** màn danh sách vai trò,

**Khi** dữ liệu tải,

**Thì** hệ thống hiển thị số lượng người dùng "Đang hoạt động" được gán vai trò theo dữ liệu thực tế.

### **AC-12: Sắp xếp danh sách theo thời gian cập nhật**

**Tại** màn danh sách vai trò,

**Khi** trang được hiển thị,

**Thì** hệ thống mặc định sắp xếp danh sách theo **Thời gian cập nhật giảm dần** (mới nhất lên đầu).

### **AC-13: Lọc + tìm kiếm + phân trang kết hợp**

**Tại** màn danh sách vai trò,

**Khi** Admin user vừa tìm kiếm, vừa lọc trạng thái, vừa phân trang,

**Thì** hệ thống giữ nguyên tất cả bộ lọc và từ khóa đã nhập.

### AC-14: Tìm kiếm không có kết quả

Tại màn hình danh sách vai trò và phân quyền

Khi nhập từ khóa hoặc chọn bộ lọc không khớp với bất kỳ vai trò và phân quyền nào

Thì hệ thống hiển thị textview: "Không tìm thấy vai trò phù hợp."

### **AC-15: Bộ lọc theo ngày tạo**

**Tại** màn danh sách vai trò,

**Khi** Ops chọn ngày bắt đầu, ngày kết thúc

Và Ngày kết thúc >= Ngày bắt đầu

**Thì** danh sách được lọc và chỉ hiển thị các role có ngày tạo nằm trong khoảng tương ứng.

Business Value & Success Metrics
--------------------------------

* Giúp Admin user quản lý toàn bộ vai trò dễ dàng
* Hỗ trợ điều hướng nhanh tới các thao tác khác (View, Edit, Create)
* Hỗ trợ đánh giá số lượng user đang sử dụng mỗi role

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* Thời gian tải danh sách ≤ 1 giây
* Tỷ lệ tìm kiếm chính xác ≥ 99%
* Tỷ lệ thao tác xem/chỉnh sửa từ danh sách thành công ≥ 98%

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

Thêm mới vai trò và phân quyền: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/942538758/US+Th+m+m+i+vai+tr+ph+n+quy+n+tr+n+TeMS?atlOrigin=eyJpIjoiODYxMWE1NTFjOWM1NDI2ZGFmOTNjNmY2NDlhODM4YzQiLCJwIjoiYyJ9>

Impact Analysis
===============

UI/UX Design
============

### Link figma: <https://www.figma.com/design/2yGjjCTWWatN1iUGU1Wqfl/S.1-2-3---CFM-MVP1---Handoff?node-id=8665-167653&t=xTEYyWBk6PfdBWlA-4>

Out of Scope Item
=================