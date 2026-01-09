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
|  |  |  |  |  |

Use story content
=================

**Là một** nhân sự vận hành (Ops) trong hệ thống EOP

**Tôi muốn** chỉnh sửa thông tin của một vai trò đã tồn tại bao gồm: tên, mô tả, quyền, đối tượng áp dụng và phạm vi dữ liệu

**Để** đảm bảo vai trò luôn phản ánh đúng quyền hạn và phạm vi dữ liệu phù hợp với vận hành thực tế.

Acceptance criteria
-------------------

### **AC-1: Truy cập màn hình Chỉnh sửa vai trò**

**Tại** màn hình "Danh sách vai trò" hoặc Chi tiết vai trò

**Khi** Ops có quyền chỉnh sửa và nhấn vào nút "Chỉnh sửa" của một vai trò,

**Thì** hệ thống điều hướng sang màn "Chỉnh sửa vai trò" và tải toàn bộ dữ liệu hiện có của vai trò đó.

### **AC-2: Không có quyền chỉnh sửa vai trò**

**Tại** màn hình "Danh sách vai trò",

**Khi** người dùng không có quyền chỉnh sửa vai trò

**Thì** hệ thống ẩn hoặc disable nút "Chỉnh sửa"
* Hover → hiển thị tooltip TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761>

### **AC-3: Hiển thị đầy đủ dữ liệu vai trò đã lưu**

**Tại** màn hình "Chỉnh sửa vai trò",

**Khi** trang được tải,

**Thì** hệ thống hiển thị chính xác:

* Tên vai trò
* Mô tả
* Các Action đã được gán
* Danh sách người dùng/ nhóm đã được gán
* Trạng thái toggle "Áp dụng tất cả người dùng"
* Phạm vi dữ liệu

### **AC-4: Kiểm tra giá trị bắt buộc (Tên vai trò)**

**Tại** form chỉnh sửa,

**Khi** Ops xóa giá trị trường "Tên vai trò" và rời khỏi ô nhập liệu,

**Thì** hệ thống hiển thị lỗi: TNT 008 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-008>

Và disable nút Lưu.

### **AC-5: Giới hạn ký tự trường Tên vai trò**

**Tại** form chỉnh sửa,

**Khi** Ops nhập vượt quá giới hạn ký tự cho phép

**Thì** hệ thống ngăn nhập thêm và hiển thị lỗi: TNT 014 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-014>

Và disable nút Lưu cho đến khi hợp lệ.

### **AC-6: Giới hạn ký tự trường Mô tả**

**Tại** form chỉnh sửa,

**Thì** hệ thống ngăn nhập thêm và hiển thị lỗi: TNT 014 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-014>

Và disable nút Lưu cho đến khi hợp lệ.

### **AC-7: Hiển thị cấu trúc quyền khi chỉnh sửa**

**Tại** tab "Cấu hình quyền",

**Khi** dữ liệu quyền được tải,

**Thì** hệ thống hiển thị cấu trúc:

| **Tầng** | **Checkbox** |
| --- | --- |
| Công cụ quản lý | Không |
| Phân hệ | Không |
| Tính năng | Có checkbox |
| Action | Có checkbox |

Và các Action/Tính năng đã được gán phải được tick đúng.

### **AC-8: Quy tắc tick/untick trong chỉnh sửa quyền**

**Tại** tab "Cấu hình quyền", 

**Khi** Ops tick checkbox ở tầng Tính năng, 

**Thì** toàn bộ Actions con được tick và checkbox ở Tính năng chuyển sang *indeterminate*.

**Khi** Ops untick bất kỳ Action con trong Tính năng đã được tick toàn bộ, 

**Thì** tầng tính năng chuyển sang *indeterminate*.

**Khi** Ops tick/untick Action đơn lẻ, 

**Thì** tầng tính năng luôn ở trạng thái *indeterminate*.

### **AC-9: Hiển thị danh sách người dùng/ nhóm đang hoạt động và đã gán**

**Tại** tab "Người dùng" hoặc "Nhóm người dùng",

**Khi** danh sách tải, 

**Thì** hệ thống:

* Chỉ hiển thị Người dùng/ nhóm đang hoạt động
* Tự tick các Người dùng/ nhóm đã được gán vai trò trước đó
### **AC-10: Tick chọn người dùng/ nhóm**

**Tại** tab "Cấu hình đối tượng",

**Khi** Ops tick người dùng hoặc nhóm,

**Thì** hệ thống thêm đối tượng đó vào danh sách đối tượng của vai trò.

### **AC-11: Giữ trạng thái tick khi chuyển trang hoặc chuyển tab**

**Tại** tab Người dùng hoặc Nhóm người dùng,

**Khi** Ops tick Người dùng/ Nhóm rồi chuyển trang hoặc chuyển tab,

**Thì** khi quay lại trang cũ hoặc tab cũ, trạng thái tick vẫn được giữ nguyên.

### **AC-12: Giữ trạng thái tick khi rời tab "Cấu hình đối tượng"**

**Tại** màn hình chỉnh sửa vai trò,

**Khi** Ops rời tab "Cấu hình đối tượng" sang tab khác,

**Thì** khi quay lại, tất cả tick và dữ liệu đã chọn vẫn được giữ nguyên.

### **AC-13: Toggle "Áp dụng tất cả người dùng"**

**Tại** tab "Cấu hình đối tượng",

**Khi** toggle đã được bật trong dữ liệu cũ,

**Thì** bảng Người dùng/ Nhóm bị disable.

**Khi** Ops bật toggle từ off → on  

**Thì** hệ thống hiển thị popup xác nhận.

**Inline business rule**: rule 026 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-026>

**Khi** Ops xác nhận, 

**Thì** vai trò áp dụng cho toàn bộ người dùng và bảng user/group bị disable.

**Khi** Ops tắt toggle từ on → off 

**Thì** hệ thống hiển thị popup xác nhận.

**Inline business rule**: rule 027 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-027>

**Khi** Ops xác nhận, 

**Thì** vai trò dừng áp dụng cho toàn bộ người dùng và bảng user/group được enable.

### **AC-14: Hiển thị và thay đổi phạm vi dữ liệu**

**Tại** tab "Cấu hình phạm vi",

**Khi** dữ liệu tải xong,

**Thì** radio tương ứng với phạm vi hiện tại của vai trò phải được tick.

**Khi** Ops chọn phạm vi khác,

**Thì** radio trước đó tự bỏ chọn.

### **AC-15: Không thể lưu nếu chưa có phạm vi dữ liệu**

**Tại** tab "Cấu hình phạm vi",

**Khi** chưa chọn radio nào,

**Thì** nút Lưu luôn disable.

### **AC-16: Điều kiện enable nút Lưu**

**Tại** màn hình chỉnh sửa vai trò,

**Khi** Ops nhập tên hợp lệ, có ít nhất 1 quyền, có đối tượng, và có phạm vi dữ liệu,

**Thì** nút Lưu được enable.

### **AC-17: Lưu vai trò sau chỉnh sửa**

**Tại** màn hình chỉnh sửa vai trò,

**Khi** Ops nhấn "Lưu" trong điều kiện hợp lệ,

**Thì** hệ thống:

* Cập nhật các thay đổi (tên, mô tả, quyền, đối tượng, phạm vi)
* Ghi log audit
* Điều hướng về màn Chi tiết vai trò
* Hiển thị thông báo: TNT 027 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-027>

### **AC-18: Lỗi khi lưu thất bại**

**Tại** màn hình chỉnh sửa vai trò,

**Khi** lỗi xảy ra,

**Thì** hệ thống hiển thị thông báo lỗi và giữ nguyên dữ liệu đã chỉnh sửa.

TNT 021 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-021>

### **AC-19: Hủy khi không có thay đổi**

**Tại** màn hình chỉnh sửa vai trò,

**Khi** Ops nhấn "Hủy" mà form chưa có thay đổi,

**Thì** hệ thống quay lại danh sách vai trò mà không hiển thị cảnh báo.

### **AC-20: Hủy khi đã có thay đổi**

**Tại** màn hình chỉnh sửa vai trò,

**Khi** Ops nhấn "Hủy" và form đã có chỉnh sửa,

**Thì** hệ thống hiển thị popup xác nhận:

* Chọn "Hủy bỏ thay đổi" → quay lại danh sách
* Chọn "Tiếp tục chỉnh sửa" → giữ nguyên form

**Inline business rule:** <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-004>

Business Value & Success Metrics
--------------------------------

* Giúp Ops cập nhật vai trò đúng theo thay đổi vận hành
* Giảm rủi ro phân quyền sai
* Đảm bảo quyền hạn người dùng luôn cập nhật kịp thời

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

* Tỷ lệ chỉnh sửa role thành công ≥ 98%

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

Predefined permission: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/945881170>

Tạo mới vai trò: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/980418594/US+Th+m+m+i+vai+tr?atlOrigin=eyJpIjoiNTk1ZmI5NzgzMTNmNGE4YWFhMGZiMDMyZjIwNTMxZmMiLCJwIjoiYyJ9>

Danh sách vai trò: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/971964440/US+Danh+s+ch+vai+tr?atlOrigin=eyJpIjoiOGVlZGMyMjhjNTcyNDhkNTgzMjBiZDIxYWM1MGRlOTgiLCJwIjoiYyJ9>

Impact Analysis
===============

* Quyền của user thay đổi ngay lập tức sau khi chỉnh sửa
* Có thể ảnh hưởng đến các phiên đang đăng nhập
  + Sau khi chỉnh sửa vai trò → Các đối tượng cần đăng nhập lại để update quyền
  + Sau khi chỉnh sửa vai trò → Các đối tượng cần đăng nhập lại để update quyền

UI/UX Design
============

### Link figma:

Out of Scope Item
=================
# [US] Chỉnh sửa vai trò

**Page ID:** 949977096  
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977096
