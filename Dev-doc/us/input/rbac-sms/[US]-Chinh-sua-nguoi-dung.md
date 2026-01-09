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
|  |  | M | * Gạch bỏ AC-1, AC-9, AC-10 * AC-3:    + Bổ sung thêm trường để chỉnh sửa "Vai trò" | 9 |

Use story content
=================

**Là** Admin user trong 1 nhà trường/ trung tâm cụ thể, khi được BD onboard thành công

**Tôi muốn** có thể chỉnh sửa thông tin người dùng trong tổ chức nhà trường/ trung tâm của mình

**Để** đảm bảo dữ liệu người dùng luôn chính xác, cập nhật kịp thời theo thay đổi trong tổ chức (ví dụ: thay đổi email, số điện thoại, trạng thái hoạt động hoặc người dùng của người dùng).

Acceptance criteria
-------------------

### **~~AC-1: Truy cập màn hình Chỉnh sửa người dùng từ màn hình Danh sách người dùng~~**

~~Tại** màn hình Danh sách người dùng

~~Khi** người dùng bấm nút "Chỉnh sửa" trong dot icon

~~Thì** hệ thống điều hướng sang màn hình Chỉnh sửa người dùng

### **AC-2: Truy cập màn hình Chỉnh sửa người dùng từ màn hình chi tiết người dùng**

**Tại** màn hình Chi tiết người dùng

**Khi** người dùng bấm nút "Chỉnh sửa"

**Thì** hệ thống điều hướng sang Chỉnh sửa người dùng

### **AC-3: Không có quyền chỉnh sửa**

**Tại** màn hình xem chi tiết người dùng hoặc màn hình Danh sách người dùng

**Khi** người dùng không có quyền chỉnh sửa người dùng

**Thì** hệ thống:

* Disable button chỉnh sửa
* Hover → hiển thị tooltip TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-019>

### **AC-4: Chỉnh sửa thành công**

**Tại** màn hình Chỉnh sửa người dùng

**Khi** người dùng đã chỉnh sửa thông tin hợp lệ và bấm "Lưu"

**Thì** hệ thống:

* Hiển thị thông báo: TNT 027<https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-027>
* Lưu lại người dùng đã được chỉnh sửa vào hệ thống
* Quay lại màn hình chi tiết người dùng và cập nhật lại dữ liệu tại màn hình chi tiết người dùng
* Inline business rule: Rule 020 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-020>

Các thông tin có thể chỉnh sửa, bao gồm:

|  | **Thông tin** | **Có cho phép sửa?** | **Mô tả** |
| --- | --- | --- | --- |
| 1 | Tên người dùng | Có | Tương tự validate của US Thêm mới người dùng |
| 2 | Email | Không | N/A |
| 3 | Số điện thoại | Có | Tương tự validate của US Thêm mới người dùng |
| 4 | Vai trò | Có | Tương tự validate của US Thêm mới người dùng |
| 5 | ~~Nhóm~~ | ~~Có~~ | ~~Tương tự validate của US Thêm mới người dùng~~ |

### **AC-5: Không nhập đầy đủ các trường bắt buộc**

**Tại** màn hình Chỉnh sửa người dùng

**Khi** người dùng không nhập đầy đủ các trường thông tin bắt buộc

**Thì** hệ thống disable nút "Lưu"

### **AC-6: Nhập số điện thoại sai định dạng**

**Tại** màn hình Chỉnh sửa người dùng

**Khi** người dùng nhập số điện thoại sai định dạng

**Thì** hệ thống hiển thị thông báo lỗi TNT 010 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-010>

### **AC-7: Nhập quá giới hạn ký tự cho các trường thông tin**

**Tại** màn hình Chỉnh sửa người dùng

**Khi** người dùng nhập các thông tin của người dùng dài hơn độ dài quy định

**Thì** hệ thống báo lỗi TNT 014 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-014>

### **AC-8: Hiển thị thông báo lỗi khi trường bắt buộc bị xóa và người dùng rời khỏi ô nhập liệu**

**Tại** màn hình Chỉnh sửa người dùng

**Khi** người dùng xóa toàn bộ nội dung tại trường bắt buộc và click ra ngoài ô nhập liệu

**Thì** hệ thống hiển thị thông báo lỗi TNT 008<https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-008> , phụ thuộc <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-005>

### ~~AC-9: Hiển thị danh sách nhóm trong màn hình Chỉnh sửa người dùng~~

~~Tại** màn hình chỉnh sửa người dùng

~~Khi** nhìn vào màn hình chỉnh sửa

~~Thì** hệ thống:

* ~~Hiển thị danh sách tất cả nhóm trong tổ chức, ở tất cả trạng thái~~
* ~~Với mỗi nhóm:~~

  + ~~Nếu người đó đang thuộc nhóm, ô checkbox tương ứng được đánh dấu (checked).~~
  + ~~Nếu người đó chưa thuộc nhóm, ô checkbox ở trạng thái bỏ chọn (unchecked).~~
* ~~Cho phép chọn hoặc bỏ chọn các checkbox để thêm hoặc xóa người dùng khỏi nhóm.~~

### ~~AC-10: Chỉ lưu nháp khi người dùng ở trạng thái "Lưu nháp" (Draft)~~

~~Tại** màn hình Chỉnh sửa người dùng

~~Khi** thực hiện thao tác **~~"Lưu nháp"~~** ~~cho người dùng,~~

~~Và** người dùng hiện đang ở trạng thái không phải **~~"Lưu nháp (Draft)"~~** ~~("Đang hoạt động", "Không hoạt động")~~

~~Thì** hệ thống:

* ~~Không hiển thị button Lưu nháp, không cho phép lưu nháp người dùng~~

### **AC-11: Không cho chỉnh sửa vai trò khi người dùng ở trạng thái "Không hoạt động"**

**Tại** màn hình Chỉnh sửa người dùng

**Khi** người dùng đang chỉnh sửa có trạng thái "Không hoạt động"

**Thì** hệ thống disable trường "Vai trò", không cho phép chỉnh sửa vai trò khi người dùng ở trạng thái "Không hoạt động"

### **AC-12: Hủy bỏ chỉnh sửa người dùng khi chưa có sự thay đổi thông tin**

**Tại** màn hình Chỉnh sửa người dùng

**Khi** bấm nút "Hủy" khi chưa thay đổi thông tin nào của người dùng

**Thì** hệ thống:

* Hủy bỏ thao tác chỉnh sửa
* Không lưu bất kỳ thông tin gì trong form chỉnh sửa người dùng
* Quay trở lại màn hình Chi tiết người dùng

### **AC-12: Hủy bỏ chỉnh sửa người dùng khi đã có sự thay đổi thông tin**

**Tại** màn hình Chỉnh sửa người dùng

**Khi** bấm nút "Hủy" khi đã có sự chỉnh sửa thay đổi ít nhất 1 người dùng

**Thì** hệ thống:

* Hiển thị popup <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583>
* Khi người dùng bấm "Đồng ý" để xác nhận

  + Hệ thống sẽ:

    - Đóng popup
    - Hủy bỏ thao tác chỉnh sửa
    - Không lưu bất kỳ thông tin gì trong form chỉnh sửa người dùng
    - Quay trở lại màn hình Chi tiết người dùng
* Khi người dùng bấm "Tiếp tục chỉnh sửa"

  + Hệ thống sẽ:

    - Đóng popup
    - Giữ nguyên tại màn hình Chỉnh sửa người dùng
    - Giữ lại các thông tin chỉnh sửa người dùng đã nhập trước đó.

### **AC-13: Chỉnh sửa không thành công**

**Tại** màn hình Chỉnh sửa người dùng

**Khi** người dùng đã chỉnh sửa thông tin hợp lệ, bấm "Lưu" và xảy ra lỗi trong quá trình xử lý

**Thì** hệ thống:

* Hiển thị thông báo <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-021>
* Và giữ nguyên dữ liệu người dùng đã chỉnh sửa

Business Value & Success Metrics
--------------------------------

* Tăng hiệu suất và độ chính xác trong phân quyền: thay đổi quyền tập trung ở cấp người dùng giúp áp dụng nhanh cho hàng chục hoặc hàng trăm user, giảm sai sót thủ công.
* Giảm chi phí hỗ trợ vận hành: khách hàng có thể tự điều chỉnh quyền mà không cần gửi yêu cầu support, giảm tải cho đội vận hành SaaS.
* Giảm rủi ro bảo mật bằng cách đảm bảo quyền được kiểm soát chặt chẽ, mọi thay đổi đều được ghi log và có thể truy xuất.

**Story được coi là thành công khi nó đảm bảo được:**
-------------------------------------------------

* **≥ 80% tenant** có ít nhất một người dùng được chỉnh sửa trong 3 tháng đầu sau khi tính năng phát hành.
* **Giảm ≥ 50% ticket hỗ trợ** liên quan đến việc phân quyền sai hoặc cần đổi quyền.
* **100% thay đổi người dùng được ghi nhận trong audit log**.
* **Thời gian cập nhật quyền cho người dùng ≤ 5 phút** sau khi chỉnh sửa role.
* **0 lỗi bảo mật hoặc truy cập sai phạm vi** phát sinh từ việc cập nhật role.

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

Thêm mới người dùng & phân quyền: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/942538758/US+Th%C3%AAm+m%C3%ABi+vai+tr+ph%C3%A1n+quy%C3%AAn+tr%C3%AAn+SMS?atlOrigin=eyJpIjoiNzJlZGVhMmRiM2RiNDEzNGEwYTI2MjA2Zjk2MWNmMTgiLCJwIjoiYyJ9>

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Out of Scope Item
=================