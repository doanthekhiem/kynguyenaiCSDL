|  |  |
| --- | --- |
| Trạng thái | Ready for reviewYellow |
| Người tạo | @Dung Bùi |
| Reviewer | @Khắc Việt Lê |
| Approve by |  |

none

Lịch sử thay đổi
================

A – Tạo mới, M – Sửa đổi, O –

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Ngày thay đổi** | **Vị trí thay đổi** | **A\*, M, D** | **Mô tả thay đổi** | **Phiên bản confluence** |
|  |  | A |  |  |
|  | <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/942538758/US+Th+m+m+i+vai+tr+ph+n+quy+n+tr+n+SMS#AC-3%3A-Th%C3%AAm-m%E1%BB%9Bi-vai-tr%C3%B2-th%C3%A0nh-c%C3%B4ng> | M | Thay đổi giá trị khi chọn trong Tab Cấu hình quyền:   * Từ chọn nhiều → chọn 1 ở các trường Giải pháp, phân hệ, module | 23 |
|  | <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/942538758/US+Th+m+m+i+vai+tr+ph+n+quy+n+tr+n+SMS#AC-3%3A-Th%C3%AAm-m%E1%BB%9Bi-vai-tr%C3%B2-th%C3%A0nh-c%C3%B4ng> | M | * Bổ sung điều kiện hiển thị cho Nhóm người dùng và Vai trò khi chọn Đối tượng áp dụng | 24 |
|  |  | M |  | 30 |

none

Lịch sử thay đổi
================

A – Tạo mới, M – Sửa đổi, O –

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Ngày thay đổi** | **Vị trí thay đổi** | **A\*, M, D** | **Mô tả thay đổi** | **Phiên bản confluence** |
|  |  | A |  |  |
|  |  | M | AC-3:   * Bổ sung giá trị khi chọn "Đối tượng" và "Phạm vi" khi thêm mới vai trò | 3 |
|  |  | M | * Update lại toàn bộ US mới |  |
|  |  | M | AC-3:   * Chỉnh sửa các giá trị trong "Phạm vi" khi thêm mới vai trò | 37 |

Use story content
=================

Là Admin user trong nhà trường/ trung tâm, khi đã được BD onboard thành công

Tôi muốn thêm mới một vai trò cho nội bộ hệ thống EOP

Và gán vai trò với các quyền hạn phù hợp trong phạm vi và đối tượng cụ thể

Để tôi có thể phân quyền truy cập phù hợp cho từng đôi tượng, đảm bảo họ có thể thấy và thao tác được trong phạm vi cho phép

Acceptance criteria
-------------------

### **AC-1:Truy cập màn hình Tạo mới vai trò**

**Tại** màn hình "Danh sách vai trò",

**Khi** có quyền tạo mới và nhấn **"Tạo mới"**,

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

**Khi** xóa nội dung ở trường bắt buộc và rời khỏi ô nhập liệu,

**Thì** hệ thống hiển thị lỗi TNT 008 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-008>

Và nút **Lưu** bị **disable**.

### **AC-5: Không kiểm tra trùng tên**

**Tại** form "Tạo vai trò",

**Khi** nhập tên mới,

**Thì** hệ thống không kiểm tra trùng tên vì mã vai trò được sinh unique khi lưu.

### **AC-6: Giới hạn ký tự trường Tên vai trò**

**Tại** form "Tạo vai trò"

**Khi** Ops nhập vượt quá giới hạn ký tự cho phép

**Thì** hệ thống ngăn nhập thêm và hiển thị lỗi: TNT 014 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-014>

Và disable nút Lưu cho đến khi hợp lệ.

### **AC-7: Giới hạn ký tự trường Mô tả**

**Tại** form "Tạo vai trò"

**Thì** hệ thống ngăn nhập thêm và hiển thị lỗi: TNT 014 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-014>

Và disable nút Lưu cho đến khi hợp lệ.

### **AC-8: Hiển thị cấu hình quyền theo đúng cấu trúc**

**Tại** tab "Cấu hình quyền",

**Khi** mở tab này,

**Thì** hệ thống hiển thị cấu trúc:

| **Tầng** | **Mô tả** | **Checkbox** | **Ghi chú** |
| --- | --- | --- | --- |
| Công cụ quản lý | Ví dụ: SMS, LMS | Không | Link predefined: <https://aeh.atlassian.net/wiki/x/IAD3M> |
| Phân hệ | Nhóm phân hệ | Không |
| Tính năng | Nhóm tính năng | **Có checkbox** |
| Action | Thao tác nhỏ nhất/ hành động | **Có checkbox** |

### **AC-9: Quy tắc tick/untick Feature & Actions**

**Tại** tab "Cấu hình quyền",  
**Khi** chưa tick  
**Thì** tất cả checkbox của actions và checkbox tính năng có mặc định là untick

**Tại** tab "Cấu hình quyền",  
**Khi** tick checkbox tại **tầng Tính năng**,  
**Thì** tất cả Action con được tick và checkbox Feature chuyển sang **indeterminate**.

**Tại** tab này,  
**Khi** untick bất kỳ Action con trong Tính năng đã được tick toàn bộ,  
**Thì** checkbox tại tầng Tính năng chuyển sang trạng thái **indeterminate**.

**Tại** tab này,  
**Khi** tick/untick Action đơn lẻ,  
**Thì** checkbox Feature tự chuyển sang **indeterminate**.

### **AC-10: Điều kiện để nút Lưu được enable**

**Tại** màn hình "Tạo vai trò",  
**Khi** :

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

**Khi** tick checkbox tại tab người dùng hoặc nhóm và lưu

**Thì** hệ thống thêm đối tượng đó vào danh sách đối tượng của vai trò.

### **AC-14: Giữ trạng thái tick khi chuyển trang hoặc chuyển tab**

**Tại** tab Người dùng hoặc Nhóm người dùng,

**Khi** tick user/group rồi chuyển trang hoặc chuyển tab,

**Thì** khi quay lại trang cũ hoặc tab cũ, trạng thái tick vẫn được giữ nguyên.

### **AC-15: Toggle "Áp dụng tất cả người dùng"**

**Tại** tab "Cấu hình đối tượng",

**Khi** bật toggle "Áp dụng tất cả người dùng",

**Thì** hệ thống hiển thị popup xác nhận

**Khi** xác nhận,

**Thì** hệ thống:

* Bật toggle
* Disable bảng người dùng & nhóm
* Ghi nhận rằng vai trò áp dụng cho toàn bộ user

**Khi** chọn Hủy,

**Thì** toggle không bật.

**Inline business rule**: Rule 26 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-026>

### **AC-16: Hiển thị đúng 2 lựa chọn phạm vi dữ liệu**

**Tại** tab "Cấu hình phạm vi",

**Khi** tab được mở,

**Thì** hệ thống hiển thị 2 radio:

| **Lựa chọn** | **Mô tả** |
| --- | --- |
| Toàn bộ dữ liệu của tổ chức | User được xem toàn bộ dữ liệu |
| Dữ liệu do người dùng tạo | User chỉ xem dữ liệu do họ tạo |
| Toàn bộ dữ liệu đối tác của tổ chức | User chỉ xem được các dữ liệu của đối tác của tổ chức |

### **AC-17: Ràng buộc lựa chọn phạm vi**

**Tại** tab "Cấu hình phạm vi",

**Khi** chọn một radio,

**Thì** radio còn lại tự bỏ chọn.

### **AC-18: Không thể lưu khi chưa chọn phạm vi**

**Tại** tab "Cấu hình phạm vi",

**Khi** chưa chọn radio nào,

**Thì** nút "Lưu" luôn **disabled**.

### **AC-19: Lưu vai trò thành công**

**Tại** màn hình "Tạo vai trò",

**Khi** nhấn "Lưu" trong điều kiện hợp lệ,

**Thì** hệ thống:

* Sinh **mã vai trò unique**
* Lưu:

  + Tên vai trò
  + Mô tả
  + Danh sách Actions
  + Danh sách đối tượng
  + Phạm vi dữ liệu
* Ghi log audit
* Điều hướng về màn "Danh sách vai trò"
* Hiển thị thông báo: TNT 009 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-009>

### **AC-20: Lỗi hệ thống khi lưu**

**Tại** màn hình "Tạo vai trò",

**Khi** quá trình lưu phát sinh lỗi,

**Thì** hệ thống hiển thị thông báo lỗi và giữ nguyên dữ liệu đã nhập.

TNT 049 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-049>

TNT 021 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-021>

### **AC-21: Hủy khi chưa nhập gì**

**Tại** màn hình "Tạo vai trò",

**Khi** nhấn "Hủy" và chưa nhập hoặc thay đổi bất kỳ thông tin nào,

**Thì** hệ thống quay lại "Danh sách vai trò" mà không hỏi xác nhận.

### **AC-22: Hủy khi đã nhập thông tin**

**Tại** màn hình "Tạo vai trò",

**Khi** nhấn "Hủy" và form đã có thay đổi,

**Thì** hệ thống hiển thị popup xác nhận.

**Khi** chọn "Hủy bỏ thay đổi",

**Thì** hệ thống quay về danh sách và không lưu dữ liệu.

**Khi** chọn "Tiếp tục chỉnh sửa",

**Thì** hệ thống giữ nguyên form

**Inline business rule**: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583/System+Rules+-+Business+rules#SYS-RULE-004>

Business Value & Success Metrics
--------------------------------

* Giúp Admin user của trung tâm/ nhà trường tự chủ định nghĩa vai trò theo vận hành thực tế.
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

Danh sách user: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/954433566/US+Danh+s+ch+ng+i+d+ng?atlOrigin=eyJpIjoiNDhjNjk4NGEyZDFkNGZlZDg3ZTQyOWVjZDJmYWZjNWEiLCJwIjoiYyJ9>

Danh sách group: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/954826788/US+Danh+s+ch+nh+m+ng+i+d+ng?atlOrigin=eyJpIjoiOTI3OTZjYmRiYTFlNGNlN2FiZWU5ODVlYWQwZTNhMzYiLCJwIjoiYyJ9>

Impact Analysis
===============

UI/UX Design
============

### Link figma: <https://www.figma.com/design/2yGjjCTWWatN1iUGU1Wqfl/S.1-2-3---CFM-MVP1---Handoff?node-id=10620-146584&t=xTEYyWBk6PfdBWlA-4>

Thiết lập thông tin chung:

Thiết lập quyền:

Thiết lập đối tượng:

Thiết lập phạm vi:

Out of Scope Item
=================

* ~~AC-3: Thêm mới vai trò thành công~~

  + ~~Tab Cấu hình đối tượng và phạm vi~~

    - ~~{Loại phạm vi}: Chi nhánh => chưa có nghiệp vụ~~