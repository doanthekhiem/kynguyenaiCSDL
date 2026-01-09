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
|  |  | M |  |  |
|  |  | O |  |  |

Use story content
=================

**Là** Admin user trong 1 nhà trường/ trung tâm cụ thể, khi được BD onboard thành công

**Tôi muốn** có thể xem chi tiết thông tin của một nhóm người dùng trong tổ chức nhà trường/ trung tâm của mình

**Để** hiểu rõ cấu trúc và thành viên của nhóm, giúp quản lý và phân quyền hiệu quả hơn.

Acceptance criteria
-------------------

### **AC-1: Truy cập màn hình Chi tiết nhóm người dùng từ màn hình Danh sách nhóm người dùng**

**Tại** màn hình Danh sách nhóm người dùng

**Khi** người dùng bấm vào tên nhóm

**Thì** hệ thống điều hướng sang màn hình Chi tiết nhóm người dùng

### **AC-2: Hiển thị thông tin chi tiết của nhóm người dùng**

**Tại** màn hình Chi tiết nhóm người dùng

**Khi** người dùng xem thông tin nhóm

**Thì** hệ thống hiển thị các thông tin sau:

|  | **Thông tin** | **Mô tả** |
| --- | --- | --- |
| 1 | Tên nhóm | Tên của nhóm người dùng |
| 2 | Mô tả | Mô tả chi tiết về nhóm |
| 3 | Trạng thái | Trạng thái của nhóm (Đang hoạt động/Không hoạt động) |
| 4 | Số lượng thành viên | Tổng số người dùng đang thuộc nhóm |
| 5 | Ngày tạo | Ngày nhóm được tạo |
| 6 | Người tạo | Người dùng đã tạo nhóm |
| 7 | Ngày cập nhật | Ngày cuối cùng nhóm được cập nhật |
| 8 | Người cập nhật | Người dùng cuối cùng cập nhật nhóm |

### **AC-3: Hiển thị danh sách thành viên của nhóm**

**Tại** màn hình Chi tiết nhóm người dùng

**Khi** người dùng xem danh sách thành viên

**Thì** hệ thống:

* Hiển thị danh sách tất cả người dùng thuộc nhóm
* Với mỗi người dùng, hiển thị các thông tin:
  * Tên người dùng
  * Email
  * Vai trò
  * Trạng thái
  * Ngày tham gia nhóm
* Cho phép phân trang nếu danh sách thành viên quá dài

### **AC-4: Không có quyền xem chi tiết nhóm người dùng**

**Tại** màn hình Danh sách nhóm người dùng

**Khi** người dùng không có quyền xem chi tiết nhóm người dùng

**Thì** hệ thống:

* Disable link đến tên nhóm
* Hover → hiển thị tooltip TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-019>

### **AC-5: Điều hướng đến các chức năng khác từ màn hình Chi tiết nhóm người dùng**

**Tại** màn hình Chi tiết nhóm người dùng

**Khi** người dùng muốn thực hiện các thao tác khác với nhóm

**Thì** hệ thống hiển thị các nút hành động:

* **Chỉnh sửa**: Điều hướng đến màn hình Chỉnh sửa nhóm người dùng
* **Xóa nhóm**: Hiển thị popup xác nhận xóa nhóm
* **Thêm thành viên**: Mở modal để thêm người dùng vào nhóm
* **Xóa thành viên**: Cho phép xóa người dùng khỏi nhóm (có thể thực hiện tại danh sách thành viên)

Business Value & Success Metrics
--------------------------------

* Cải thiện khả năng quản lý nhóm: Hiển thị chi tiết thông tin nhóm giúp admin dễ dàng theo dõi và quản lý các nhóm người dùng trong hệ thống.
* Tăng hiệu quả phân quyền: Việc biết rõ thành viên trong mỗi nhóm giúp admin phân quyền chính xác và nhanh chóng.
* Giảm sai sót trong quản lý người dùng: Hiển thị đầy đủ thông tin giúp giảm các lỗi trong quá trình quản lý nhóm và người dùng.

**Story được coi là thành công khi nó đảm bảo được:**
-------------------------------------------------

* **≥ 90% admin** truy cập màn hình chi tiết nhóm người dùng ít nhất 1 lần trong tuần đầu tiên sau khi tính năng phát hành.
* **Giảm ≥ 30% thời gian** trung bình để quản lý nhóm người dùng so với trước khi có tính năng.
* **100% thao tác xem chi tiết nhóm** được ghi nhận trong audit log.
* **Tỷ lệ lỗi trong quản lý nhóm giảm ≥ 40%** sau khi triển khai tính năng.
* **≥ 85% người dùng** đánh giá tính năng này là hữu ích trong khảo sát满意度.

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

Danh sách nhóm người dùng: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/942538758/US+Danh+sach+nhom+nguoi+dung?atlOrigin=eyJpIjoiNzJlZGVhMmRiM2RiNDEzNGEwYTI2MjA2Zjk2MWNmMTgiLCJwIjoiYyJ9>

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Out of Scope Item
=================