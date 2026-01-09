# [US] Chỉnh sửa người dùng trên EOP

**Page ID:** 949977089
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977089

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

Tôi muốn chỉnh sửa thông tin cơ bản của người dùng trong hệ thống nội bộ EOP

Để cập nhật đúng thông tin liên hệ và vai trò đang hoạt động của người dùng

Acceptance criteria
-------------------

### AC-1: Truy cập màn hình Chỉnh sửa người dùng

Tại màn hình Chi tiết người dùng

Khi người dùng bấm nút "Chỉnh sửa"

Thì hệ thống điều hướng sang Chỉnh sửa người dùng

### AC-2: Không có quyền chỉnh sửa

Tại màn hình Chi tiết người dùng

Khi người thao tác không có quyền chỉnh sửa user

Thì hệ thống disable nút Chỉnh sửa.

### AC-3: Chặn truy cập trực tiếp vào URL chỉnh sửa user

Tại màn hình Chỉnh sửa người dùng

Khi người dùng truy cập trực tiếp vào URL mà không có permission

Thì hệ thống:

* Không hiển thị form Chỉnh sửa người dùng
* Hiển thị thông báo: TNT 018 UI Message - Common Business Rules

### AC-4: Hiển thị form chỉnh sửa

Tại màn hình Chi tiết người dùng

Khi nhấn nút Chỉnh sửa

Thì hệ thống mở form với các trường được chỉnh sửa: Tên, Email (read-only), SĐT, Vai trò.

### AC-5: Preload dữ liệu chính xác

Tại form Chi tiết người dùng

Khi form được tải

Thì hệ thống hiển thị đúng toàn bộ dữ liệu người dùng hiện tại.

### AC-6: Không hiển thị danh sách nhóm

Tại form Chỉnh sửa người dùng

Khi form được tải

Thì hệ thống không hiển thị thông tin nhóm khi chỉnh sửa

### AC-7: Validate trường bắt buộc

Tại form Chỉnh sửa người dùng

Khi trường bắt buộc bị để trống

Thì disable nút Lưu và hiển thị thông báo TNT 008 UI Message - Common Business Rules

### AC-8: Validate số điện thoại

Tại trường Số điện thoại

Khi nhập số điện thoại không đúng định dạng

Thì hiển thị lỗi TNT 010 UI Message - Common Business Rules

Inline business rule 005: System Rules - Business rules

### AC-9: Hiển thị thông báo lỗi khi trường bắt buộc bị xóa và người dùng rời khỏi ô nhập liệu

Tại màn hình Chỉnh sửa người dùng

Khi người dùng xóa toàn bộ nội dung tại trường bắt buộc và click ra ngoài ô nhập liệu

Thì hệ thống hiển thị thông báo lỗi TNT 008UI Message - Common Business Rules , phụ thuộc System Rules - Business rules

### AC-10: Giới hạn ký tự

Tại các trường nhập liệu

Khi nhập vượt quá ký tự cho phép

Thì hệ thống hiển thị thông báo TNT 014 UI Message - Common Business Rules

### AC-11: Email read-only

Tại trường Email

Khi mở form

Thì trường này hiển thị read-only, không thể chỉnh sửa.

### AC-12: Chỉnh sửa vai trò khi người dùng Đang hoạt động

Tại trường Vai trò

Khi người dùng đang ở trạng thái Đang hoạt động

Thì được phép chỉnh sửa thêm/ bớt vai trò

### AC-13: Không chỉnh sửa vai trò khi người dùng Không hoạt động

Tại trường Vai trò

Khi người dùng đang ở trạng thái Không hoạt động

Thì hệ thống disable trường Vai trò

### AC-14: Lưu thay đổi

Tại form chỉnh sửa

Khi nhấn nút Lưu và dữ liệu hợp lệ

Thì hệ thống cập nhật thông tin và quay về màn hình Chi tiết người dùng với thông báo: TNT 027 UI Message - Common Business Rules

Inline business rule 020: System Rules - Business rules

### AC-15: Hủy khi chưa thay đổi

Tại form chỉnh sửa

Khi nhấn nút Hủy và chưa có thay đổi nào

Thì hệ thống:

* Hủy bỏ thao tác chỉnh sửa
* Không lưu bất kỳ thông tin gì trong form chỉnh sửa người dùng
* Quay trở lại màn hình Chi tiết người dùng

### AC-16: Hủy khi đã thay đổi

Tại form chỉnh sửa

Khi nhấn Hủy và form đã có thay đổi

Thì hệ thống:

* Hiển thị popup System Rules - Business rules
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

Business Value & Success Metrics
--------------------------------

* Bảo vệ an toàn dữ liệu người dùng bằng permission-based access.
* Tạo quy trình chỉnh sửa nhất quán, tránh chỉnh sửa sai quyền.
* Giảm lỗi vận hành.

Story được coi là thành công khi nó đảm bảo được:
-------------------------------------------------

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: PDM.AEH.SSO.PM - Mô hình dữ liệu vật lý cho Policy Management

US danh sách người dùng: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/984481794/US+Th+m+m+i+ng+i+d+ng+tr+n+EOP?atlOrigin=eyJpIjoiMjM5ZDhkY2U0NzQ3NDczOGE3ODc3MGVlNGQwMTQ4OTYiLCJwIjoiYyJ9>

US Gán người dùng vào nhóm:

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Out of Scope Item
=================