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

**Tôi muốn** có thể chỉnh sửa thông tin của một nhóm người dùng trong tổ chức nhà trường/ trung tâm của mình

**Để** cập nhật thông tin nhóm khi có thay đổi, đảm bảo dữ liệu luôn chính xác và phù hợp với nhu cầu quản lý.

Acceptance criteria
-------------------

### **AC-1: Truy cập màn hình Chỉnh sửa nhóm người dùng từ màn hình Chi tiết nhóm người dùng**

**Tại** màn hình Chi tiết nhóm người dùng

**Khi** người dùng bấm nút "Chỉnh sửa"

**Thì** hệ thống điều hướng sang màn hình Chỉnh sửa nhóm người dùng

### **AC-2: Truy cập màn hình Chỉnh sửa nhóm người dùng từ màn hình Danh sách nhóm người dùng**

**Tại** màn hình Danh sách nhóm người dùng

**Khi** người dùng bấm nút "Chỉnh sửa" trong dot icon

**Thì** hệ thống điều hướng sang màn hình Chỉnh sửa nhóm người dùng

### **AC-3: Không có quyền chỉnh sửa nhóm người dùng**

**Tại** màn hình xem chi tiết nhóm người dùng hoặc màn hình Danh sách nhóm người dùng

**Khi** người dùng không có quyền chỉnh sửa nhóm người dùng

**Thì** hệ thống:

* Disable button chỉnh sửa
* Hover → hiển thị tooltip TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-019>

### **AC-4: Chỉnh sửa thành công**

**Tại** màn hình Chỉnh sửa nhóm người dùng

**Khi** người dùng đã chỉnh sửa thông tin hợp lệ và bấm "Lưu"

**Thì** hệ thống:

* Hiển thị thông báo: TNT 027<https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-027>
* Lưu lại nhóm người dùng đã được chỉnh sửa vào hệ thống
* Quay lại màn hình chi tiết nhóm người dùng và cập nhật lại dữ liệu tại màn hình chi tiết nhóm người dùng
* Inline business rule: Rule 020 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-020>

Các thông tin có thể chỉnh sửa, bao gồm:

|  | **Thông tin** | **Có cho phép sửa?** | **Mô tả** |
| --- | --- | --- | --- |
| 1 | Tên nhóm | Có | Tương tự validate của US Thêm mới nhóm người dùng |
| 2 | Mô tả | Có | Tương tự validate của US Thêm mới nhóm người dùng |
| 3 | Trạng thái | Có | Tương tự validate của US Thêm mới nhóm người dùng |
| 4 | Danh sách thành viên | Có | Tương tự validate của US Thêm mới nhóm người dùng |

### **AC-5: Không nhập đầy đủ các trường bắt buộc**

**Tại** màn hình Chỉnh sửa nhóm người dùng

**Khi** người dùng không nhập đầy đủ các trường thông tin bắt buộc

**Thì** hệ thống disable nút "Lưu"

### **AC-6: Nhập quá giới hạn ký tự cho các trường thông tin**

**Tại** màn hình Chỉnh sửa nhóm người dùng

**Khi** người dùng nhập các thông tin của nhóm người dùng dài hơn độ dài quy định

**Thì** hệ thống báo lỗi TNT 014 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-014>

### **AC-7: Hiển thị thông báo lỗi khi trường bắt buộc bị xóa và người dùng rời khỏi ô nhập liệu**

**Tại** màn hình Chỉnh sửa nhóm người dùng

**Khi** người dùng xóa toàn bộ nội dung tại trường bắt buộc và click ra ngoài ô nhập liệu

**Thì** hệ thống hiển thị thông báo lỗi TNT 008<https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-008> , phụ thuộc <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-005>

### **AC-8: Hiển thị danh sách thành viên trong màn hình Chỉnh sửa nhóm người dùng**

**Tại** màn hình chỉnh sửa nhóm người dùng

**Khi** nhìn vào màn hình chỉnh sửa

**Thì** hệ thống:

* Hiển thị danh sách tất cả người dùng trong tổ chức, ở tất cả trạng thái
* Với mỗi người dùng:
  * Nếu người đó đang thuộc nhóm, ô checkbox tương ứng được đánh dấu (checked).
  * Nếu người đó chưa thuộc nhóm, ô checkbox ở trạng thái bỏ chọn (unchecked).
* Cho phép chọn hoặc bỏ chọn các checkbox để thêm hoặc xóa người dùng khỏi nhóm.

### **AC-9: Hủy bỏ chỉnh sửa nhóm người dùng khi chưa có sự thay đổi thông tin**

**Tại** màn hình Chỉnh sửa nhóm người dùng

**Khi** bấm nút "Hủy" khi chưa thay đổi thông tin nào của nhóm người dùng

**Thì** hệ thống:

* Hủy bỏ thao tác chỉnh sửa
* Không lưu bất kỳ thông tin gì trong form chỉnh sửa nhóm người dùng
* Quay trở lại màn hình Chi tiết nhóm người dùng

### **AC-10: Hủy bỏ chỉnh sửa nhóm người dùng khi đã có sự thay đổi thông tin**

**Tại** màn hình Chỉnh sửa nhóm người dùng

**Khi** bấm nút "Hủy" khi đã có sự chỉnh sửa thay đổi ít nhất 1 thông tin của nhóm

**Thì** hệ thống:

* Hiển thị popup <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583>
* Khi người dùng bấm "Đồng ý" để xác nhận

  + Hệ thống sẽ:
    - Đóng popup
    - Hủy bỏ thao tác chỉnh sửa
    - Không lưu bất kỳ thông tin gì trong form chỉnh sửa nhóm người dùng
    - Quay trở lại màn hình Chi tiết nhóm người dùng
* Khi người dùng bấm "Tiếp tục chỉnh sửa"

  + Hệ thống sẽ:
    - Đóng popup
    - Giữ nguyên tại màn hình Chỉnh sửa nhóm người dùng
    - Giữ lại các thông tin chỉnh sửa nhóm người dùng đã nhập trước đó.

### **AC-11: Chỉnh sửa không thành công**

**Tại** màn hình Chỉnh sửa nhóm người dùng

**Khi** người dùng đã chỉnh sửa thông tin hợp lệ, bấm "Lưu" và xảy ra lỗi trong quá trình xử lý

**Thì** hệ thống:

* Hiển thị thông báo <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-021>
* Và giữ nguyên dữ liệu nhóm người dùng đã chỉnh sửa

Business Value & Success Metrics
--------------------------------

* Cải thiện khả năng quản lý nhóm: Cho phép chỉnh sửa thông tin nhóm giúp admin dễ dàng cập nhật các thay đổi trong cấu trúc nhóm.
* Tăng hiệu quả phân quyền: Việc cập nhật nhóm và thành viên giúp admin phân quyền chính xác và kịp thời.
* Giảm sai sót trong quản lý người dùng: Cho phép chỉnh sửa nhóm giúp giảm các lỗi trong quá trình quản lý nhóm và người dùng.

**Story được coi là thành công khi nó đảm bảo được:**
-------------------------------------------------

* **≥ 80% admin** thực hiện ít nhất một lần chỉnh sửa nhóm người dùng trong 3 tháng đầu sau khi tính năng phát hành.
* **Giảm ≥ 40% thời gian** trung bình để cập nhật thông tin nhóm người dùng so với trước khi có tính năng.
* **100% thao tác chỉnh sửa nhóm** được ghi nhận trong audit log.
* **Tỷ lệ lỗi trong quản lý nhóm giảm ≥ 50%** sau khi triển khai tính năng.
* **≥ 85% người dùng** đánh giá tính năng này là hữu ích trong khảo sát满意度.

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

Thêm mới nhóm người dùng: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/942538758/US+Them+moi+nhom+nguoi+dung+tren+SMS?atlOrigin=eyJpIjoiNzJlZGVhMmRiM2RiNDEzNGEwYTI2MjA2Zjk2MWNmMTgiLCJwIjoiYyJ9>

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Out of Scope Item
=================