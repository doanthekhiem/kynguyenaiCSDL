none

Lịch sử thay đổi
================

A – Tạo mới, M – Sửa đổi, O – Ngưng sử dụng

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Ngày thay đổi** | **Vị trí thay đổi** | **A\*, M, D** | **Mô tả thay đổi** | **Phiên bản confluence** |
|  |  | A |  |  |
|  |  | M | AC-3:   * Bổ sung giá trị khi chọn "Đối tượng" và "Phạm vi" khi thêm mới vai trò | 3 |
|  |  | M | AC-3:   * Chỉnh sửa các giá trị trong "Phạm vi" khi thêm mới vai trò |  |

Use story content
=================

Là Ops/Policy designer trong AEH

Tôi muốn thêm mới một vai trò cho nội bộ hệ thống EOP

Và gán vai trò với các quyền hạn phù hợp trong phạm vi và đối tượng cụ thể

Để tôi có thể phân quyền truy cập phù hợp cho từng đôi tượng, đảm bảo họ có thể thấy và thao tác được trong phạm vi cho phép

Acceptance criteria
-------------------

### **AC-1: Truy cập màn hình Tạo mới vai trò**

**Tại** màn hình "Danh sách vai trò",

**Khi** Ops có quyền tạo mới và nhấn **"Tạo mới"**,

**Thì** hệ thống chuyển sang màn hình **"Tạo vai trò"**

### **AC-2: Không có quyền tạo vai trò**

**Tại** màn hình "Danh sách vai trò",

**Khi** người dùng không có quyền tạo mới,

**Thì** hệ thống:

* Disable nút **"Tạo mới"**,
* Hover → hiển thị tooltip TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761>

### **AC-3: Hiển thị thông tin chung theo bảng**

**Tại** màn hình "Tạo vai trò",

**Khi** trang được tải,

**Thì** hệ thống hiển thị bảng thông tin:

|  | **Trường** | **Bắt buộc** | **Mô tả** |
| --- | --- | --- | --- |
| 1 | Tên vai trò | Có | * Nhập Freetext * Tối đa 255 ký tự * Cho phép nhập ký tự là chữ cái, chữ số, ký tự đặc biệt và khoảng trắng. |
| 2 | Mô tả | Không | * Nhập Freetext * Tối đa 255 ký tự * Cho phép nhập ký tự là chữ cái, chữ số, ký tự đặc biệt và khoảng trắng. |
| 3 | Khu vực "Thiết lập" | Có | * Gồm 3 tab thiết lập về:    + Quyền   + Đối tượng   + Phạm vi |

### **AC-4: Thông báo lỗi khi xóa giá trị bắt buộc**

**Tại** form "Tạo vai trò",

**Khi** Ops xóa nội dung ở trường bắt buộc và rời khỏi ô nhập liệu,

**Thì** hệ thống hiển thị lỗi TNT 008 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-008>

Và nút **Lưu** bị **disable**.

### **AC-5: Không kiểm tra trùng tên**

**Tại** form "Tạo vai trò",

**Khi** Ops nhập tên mới,

**Thì** hệ thống không kiểm tra trùng tên vì mã vai trò được sinh unique khi lưu.

### **AC-6: Giới hạn ký tự trường Tên vai trò**

**Tại** form "Tạo vai trò",

**Khi** Ops nhập vượt quá giới hạn ký tự cho phép

**Thì** hệ thống ngăn nhập thêm và hiển thị lỗi: TNT 014 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-014>

Và disable nút Lưu cho đến khi hợp lệ.

### **AC-7: Giới hạn ký tự trường Mô tả**

**Tại** form "Tạo vai trò",

**Thì** hệ thống ngăn nhập thêm và hiển thị lỗi: TNT 014 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-014>

Và disable nút Lưu cho đến khi hợp lệ.

### **AC-8: Hiển thị cấu hình quyền theo đúng cấu trúc**

**Tại** tab "Cấu hình quyền",

**Khi** Ops mở tab này,

**Thì** hệ thống hiển thị cấu trúc:

| **Tầng** | **Mô tả** | **Checkbox** |
| --- | --- | --- |
| Công cụ quản lý | Ví dụ: SMS, LMS | Không |
| Phân hệ | Nhóm phân hệ | Không |
| Tính năng | Nhóm tính năng | **Có checkbox** |
| Action | Thao tác nhỏ nhất/ hành động | **Có checkbox** |

### **AC-9: Quy tắc tick/untick Feature & Actions**

**Tại** tab "Cấu hình quyền", 

**Khi** Ops chưa tick 

**Thì** tất cả checkbox của actions và checkbox tính năng có mặc định là untick

**Tại** tab "Cấu hình quyền", 

**Khi** Ops tick checkbox tại **tầng Tính năng**, 

**Thì** tất cả Action con được tick và checkbox Feature chuyển sang **indeterminate**.

**Tại** tab này, 

**Khi** Ops untick bất kỳ Action con trong Tính năng đã được tick toàn bộ, 

**Thì** checkbox tại tầng Tính năng chuyển sang trạng thái **indeterminate**.

**Tại** tab này, 

**Khi** Ops tick/untick Action đơn lẻ, 

**Thì** checkbox Feature tự chuyển sang **indeterminate**.

### **AC-10: Điều kiện để nút Lưu được enable**

**Tại** màn hình "Tạo vai trò", 

**Khi** Ops:

* Nhập **Tên vai trò**,
* Chọn **ít nhất 1** trong quyền
* Chọn ít nhất **1 đối tượng**
* Chọn **1 phạm vi dữ liệu**,

**Thì** nút **"Lưu"** chuyển sang **enable**.

### **AC-11: Chỉ hiển thị người dùng đang hoạt động**

**Tại** tab "Người dùng" trong "Cấu hình đối tượng",

**Khi** danh sách được tải,

**Thì** hệ thống chỉ hiển thị danh sách user có trạng thái **Đang hoạt động**, gồm:

* Tên người dùng
* Email
* Số điện thoại
* Checkbox

Và có:

* Tìm kiếm theo tên người dùng, email
* Phân trang

### **AC-12: Chỉ hiển thị nhóm đang hoạt động**

**Tại** tab "Nhóm người dùng",

**Khi** danh sách được tải,

**Thì** hệ thống chỉ hiển thị nhóm **Đang hoạt động**, gồm:

* Mã nhóm
* Tên nhóm
* Số lượng thành viên trong nhóm
* Trạng thái
* Checkbox

Và có:

* Tìm kiếm theo tên nhóm, mã nhóm
* Phân trang

### **AC-13: Chọn người dùng hoặc nhóm làm đối tượng áp dụng**

**Tại** tab "Cấu hình đối tượng",

**Khi** Ops tick checkbox tại tab người dùng hoặc nhóm và lưu

**Thì** hệ thống thêm đối tượng đó vào danh sách đối tượng của vai trò.

### **AC-14: Giữ trạng thái tick khi chuyển trang hoặc chuyển tab**

**Tại** tab Người dùng hoặc Nhóm người dùng,

**Khi** Ops tick user/group rồi chuyển trang hoặc chuyển tab,

**Thì** khi quay lại trang cũ hoặc tab cũ, trạng thái tick vẫn được giữ nguyên.

### **AC-15: Toggle "Áp dụng tất cả người dùng"**

**Tại** tab "Cấu hình đối tượng",

**Khi** Ops bật toggle "Áp dụng tất cả người dùng",

**Thì** hệ thống hiển thị popup xác nhận

**Khi** Ops xác nhận,

**Thì** hệ thống:

* Bật toggle
* Disable bảng người dùng & nhóm
* Ghi nhận rằng vai trò áp dụng cho toàn bộ user

**Khi** Ops chọn Hủy,

**Thì** toggle không bật.

**Inline business rule**: Rule 26 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-026>

### **AC-16: Hiển thị đúng 2 lựa chọn phạm vi dữ liệu**

**Tại** tab "Cấu hình phạm vi",

**Khi** tab được mở,

**Thì** hệ thống hiển thị các radio:

| **Lựa chọn** | **Mô tả** |
| --- | --- |
| Toàn bộ hệ thống EOP | User được xem toàn bộ dữ liệu của hệ thống EOP |
| Toàn bộ {Vùng cụ thể} | Toàn bộ {Vùng cụ thể} |
| Toàn bộ {Phòng ban cụ thể} | Toàn bộ {Phòng ban cụ thể} |
| Dữ liệu cho người dùng tạo | User được xem toàn bộ dữ liệu cho người dùng tạo |

### **AC-17: Ràng buộc lựa chọn phạm vi**

**Tại** tab "Cấu hình phạm vi",

**Khi** Ops chọn một radio,

**Thì** radio còn lại tự bỏ chọn.

### **AC-18: Không thể lưu khi chưa chọn phạm vi**

**Tại** tab "Cấu hình phạm vi",

**Khi** chưa chọn radio nào,

**Thì** nút "Lưu" luôn **disabled**.

### **AC-19: Lưu vai trò thành công**

**Tại** màn hình "Tạo vai trò",

**Khi** Ops nhấn "Lưu" trong điều kiện hợp lệ,

**Thì** hệ thống:

* Sinh **mã vai trò unique**
* Lưu:

  + Tên vai trò
  + Mô tả
  + Danh sách Actions
  + Danh sách đối tượng
  + Phạm vi dữ liệu
* Ghi log audit
* Điều hướng về màn hình "Danh sách vai trò"
* Hiển thị thông báo: TNT 009 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-009>

### **AC-20: Lỗi hệ thống khi lưu**

**Tại** màn hình "Tạo vai trò",

**Khi** quá trình lưu phát sinh lỗi,

**Thì** hệ thống hiển thị thông báo lỗi và giữ nguyên dữ liệu đã nhập.

TNT 049 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-049>

TNT 021 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-021>

### **AC-21: Hủy khi chưa nhập gì**

**Tại** màn hình "Tạo vai trò",

**Khi** Ops nhấn "Hủy" và chưa nhập hoặc thay đổi bất kỳ thông tin nào,

**Thì** hệ thống quay lại "Danh sách vai trò" mà không hỏi xác nhận.

### **AC-22: Hủy khi đã nhập thông tin**

**Tại** màn hình "Tạo vai trò",

**Khi** Ops nhấn "Hủy" và form đã có thay đổi,

**Thì** hệ thống hiển thị popup xác nhận.

**Khi** Ops chọn "Hủy bỏ thay đổi",

**Thì** hệ thống quay về danh sách và không lưu dữ liệu.

**Khi** Ops chọn "Tiếp tục chỉnh sửa",

**Thì** hệ thống giữ nguyên form

Inline business rule: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-004>

Business Value & Success Metrics
--------------------------------

* Giúp Ops tự chủ định nghĩa vai trò theo vận hành thực tế.
* Giảm rủi ro phân quyền sai nhờ cấu trúc permission rõ ràng.
* Cho phép gán user theo nhóm hoặc toàn bộ hệ thống, tiết kiệm thời gian.

**Story được coi là thành công khi nó đảm bảo được:**
-----------------------------------------------------

* Tỷ lệ tạo vai trò mới thành công ≥ 98%
* Tỷ lệ lỗi phân quyền sau khi tạo role ≤ 1%
* 100% user được áp role đúng phạm vi dữ liệu

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

Predefined permission: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/945881170>

Danh sách user: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/983302153/US+Danh+s+ch+ng+i+d+ng+tr+n+EOP?atlOrigin=eyJpIjoiYTlmNzBhOGJkMDEzNGJkODgxM2FhMzdkNTcyMWVkYjIiLCJwIjoiYyJ9>

Danh sách group: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/971636760/US+Danh+s+ch+nh+m?atlOrigin=eyJpIjoiOTIyODIyNDZmMWNhNDIxZGJmMjI1OWQwNThhMDBmN2MiLCJwIjoiYyJ9>

Impact Analysis
===============

UI/UX Design
============

### Link figma: <https://www.figma.com/design/2yGjjCTWWatN1iUGU1Wqfl/S.1---CFM-MVP1---Handoff?node-id=8565-131165&t=MEnhtU3rT74kzcB2-4>

Out of Scope Item
=================
# [US] Thêm mới vai trò

**Page ID:** 949977095  
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977095
