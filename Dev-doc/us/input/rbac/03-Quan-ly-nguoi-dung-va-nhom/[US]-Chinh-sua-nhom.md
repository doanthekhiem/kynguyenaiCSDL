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
| Ngày thay đổi | Vị trí thay đổi | A\*, M, D | Mô tả thay đổi | Phiên bản confluence |
|  |  | A |  |  |

Use story content
=================

Là một người dùng thuộc nhóm *Ops* hoặc *Policy designer*

Tôi muốn chỉnh sửa thông tin của một nhóm người dùng đã tồn tại trên hệ thống EOP

Để cập nhật tên nhóm, mô tả, vai trò và danh sách người dùng thuộc nhóm nhằm đảm bảo phân quyền chính xác.

Acceptance criteria
-------------------

### AC-1: Truy cập màn hình Chỉnh sửa nhóm

Tại màn hình Chi tiết nhóm

Khi người dùng bấm nút "Chỉnh sửa"

Thì hệ thống điều hướng sang Chỉnh sửa nhóm

### AC-2: Không có quyền chỉnh sửa

Tại màn hình Chi tiết nhóm

Khi người thao tác không có quyền chỉnh sửa nhóm

Thì hệ thống disable nút Chỉnh sửa.

### AC-3: Chặn truy cập trực tiếp vào URL chỉnh sửa nhóm

Tại màn hình Chỉnh sửa nhóm

Khi người dùng truy cập trực tiếp vào URL mà không có permission

Thì hệ thống:

* Không hiển thị form Chỉnh sửa nhóm
* Hiển thị thông báo: TNT 018 UI Message - Common Business Rules

### AC-4: Hiển thị form chỉnh sửa

Tại màn hình Chi tiết nhóm

Khi nhấn nút Chỉnh sửa

Thì hệ thống mở form với các trường được chỉnh sửa: Tên nhóm, Mô tả, Vai trò.

### AC-5: Preload dữ liệu chính xác

Tại form Chi tiết nhóm

Khi form được tải

Thì hệ thống hiển thị đúng toàn bộ dữ liệu nhóm hiện tại.

### AC-6: Không hiển thị danh sách nhóm

Tại form Chỉnh sửa nhóm

Khi form được tải

Thì hệ thống không hiển thị thông tin nhóm khi chỉnh sửa

### AC-7: Validate trường bắt buộc

Tại form Chỉnh sửa nhóm

Khi trường bắt buộc bị để trống

Thì disable nút Lưu và hiển thị thông báo TNT 008 UI Message - Common Business Rules

### AC-9: Hiển thị thông báo lỗi khi trường bắt buộc bị xóa và nhóm rời khỏi ô nhập liệu

Tại màn hình Chỉnh sửa nhóm

Khi người dùng xóa toàn bộ nội dung tại trường bắt buộc và click ra ngoài ô nhập liệu

Thì hệ thống hiển thị thông báo lỗi TNT 008UI Message - Common Business Rules , phụ thuộc System Rules - Business rules

### AC-10: Giới hạn ký tự

Tại các trường nhập liệu

Khi nhập vượt quá ký tự cho phép

Thì hệ thống hiển thị thông báo TNT 014 UI Message - Common Business Rules

### AC-12: Chỉnh sửa vai trò khi nhóm Đang hoạt động

Tại trường Vai trò

Khi nhóm đang ở trạng thái Đang hoạt động

Thì được phép chỉnh sửa thêm/ bớt vai trò

### AC-13: Không chỉnh sửa vai trò khi nhóm Không hoạt động

Tại trường Vai trò

Khi nhóm đang ở trạng thái Không hoạt động

Thì hệ thống disable trường Vai trò

### AC-14: Lưu thay đổi

Tại form chỉnh sửa

Khi nhấn nút Lưu và dữ liệu hợp lệ

Thì hệ thống cập nhật thông tin và quay về màn hình Chi tiết nhóm với thông báo: TNT 027 UI Message - Common Business Rules

Inline business rule 020: System Rules - Business rules

### AC-15: Hủy khi chưa thay đổi

Tại form chỉnh sửa

Khi nhấn nút Hủy và chưa có thay đổi nào

Thì hệ thống:

* Hủy bỏ thao tác chỉnh sửa
* Không lưu bất kỳ thông tin gì trong form chỉnh sửa nhóm
* Quay trở lại màn hình Chi tiết nhóm

### AC-16: Hủy khi đã thay đổi

Tại form chỉnh sửa

Khi nhấn Hủy và form đã có thay đổi

Thì hệ thống:

* Hiển thị popup System Rules - Business rules
* Khi người dùng bấm "Đồng ý" để xác nhận

  + Hệ thống sẽ:

    - Đóng popup
    - Hủy bỏ thao tác chỉnh sửa
    - Không lưu bất kỳ thông tin gì trong form chỉnh sửa nhóm
    - Quay trở lại màn hình Chi tiết nhóm
* Khi người dùng bấm "Tiếp tục chỉnh sửa"

  + Hệ thống sẽ:

    - Đóng popup
    - Giữ nguyên tại màn hình Chỉnh sửa nhóm
    - Giữ lại các thông tin chỉnh sửa nhóm đã nhập trước đó.

Business Value & Success Metrics
--------------------------------

* Giúp quản lý nhóm người dùng linh hoạt và an toàn.
* Giảm công sức cập nhật role người dùng trực tiếp.
* Tăng tính đồng nhất trong phân quyền.

---

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: PDM.AEH.SSO.PM - Mô hình dữ liệu vật lý cho Policy Management

US danh sách nhóm: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/984481794/US+Th+m+m+i+ng+i+d+ng+tr+n+EOP?atlOrigin=eyJpIjoiMjM5ZDhkY2U0NzQ3NDczOGE3ODc3MGVlNGQwMTQ4OTYiLCJwIjoiYyJ9>

US Gán nhóm vào nhóm:

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Out of Scope Item
=================
# [US] Chỉnh sửa nhóm

**Page ID:** 949977092  
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977092
