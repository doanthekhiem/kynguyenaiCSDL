# Predefine permission/ resource_type/ scope/principal

|  |  |
| --- | --- |
| Trạng thái | IN progress |
| Người tạo | HaNT |
| Reviewer |  |
| Approve by |  |

Lịch sử thay đổi
================

A – Tạo mới, M – Sửa đổi, O – Ngưng sử dụng

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Ngày thay đổi** | **Vị trí thay đổi** | **A\*, M, O** | **Mô tả thay đổi** | **Phiên bản confluence** |
|  |  | A |  |  |
|  |  |  |  |  |

Technical story content
=======================

Tại hệ thống lưu trữ dữ liệu phân quyền tập trung

Tôi muốn khởi tạo sẵn danh sách permission

Để dễ dàng quản lý, truy xuất, và đảm bảo tính nhất quán dữ liệu cho việc phân quyền

**Acceptance criteria**
-----------------------

### AC-1: Predefine enum

Tại thời điểm đã định nghĩa ra được một hoặc nhiều emum

Khi Khi dev nhận được thông báo bổ sung enum

Thì sẽ đẩy dữ liệu vào enum những thông tin sau:

### Principal SaaS/ Non - Saas

|  |  |
| --- | --- |
| PrincipalType | Ghi chú |
| USER | Theo cá nhân từng user |
| GROUP | Theo nhóm user |
| SERVICE\_ACCOUNT |  |
| ROLE | Theo từng role được định nghĩa |
| ANY | bất kỳ ai |

### Scope SaaS

|  |  |
| --- | --- |
| Scopetype | Ghi chú |
| GLOBAL | Xem được toàn bộ tenant (out of scope) |
| TENANT | tenant   * Toàn bộ đối tác |
| BRANCH | đối với SaaS: Chi nhánh (out of scope)   * Toàn bộ dữ liệu của chi nhánh {**chi nhánh cụ thể**} |
| SAAS\_SOLUTION | Giải pháp EMS |
|  | * Toàn bộ dữ liệu do user tạo ra |

### Scope Non - SaaS

|  |  |
| --- | --- |
| Scopetype | Ghi chú |
| GLOBAL | * toàn bộ hệ thống EOP |
| AREA | Vùng   * Toàn bộ vùng {**Vùng cụ thể**} |
| DEPARTMENT | Phòng ban   * Toàn bộ phòng ban {**Phòng ban cụ thể**} |
|  | * Toàn bộ dữ liệu do user tạo ra |

### AC-2: Predefine role permision và resource type

Tại thời điểm đã định nghĩa ra được một hoặc nhiều permission theo chức năng nghiệp vụ

Khi Khi dev đã xây dựng xong chức năng có permission

Thì dev thực hiện insert dữ liệu vào bảng `role_permissions` và `resource_type`

* Lưu ý: Trường `action` trong bảng `role_permissions`được insert vào theo cấu trúc: {bouder\_context}:*{Phân hệ}:*{action}, trong đó:

  + bouder\_context là các giải pháp SaaS hoặc Non-SaaS

    - Non-Saas: EOP
    - SaaS: {Công cụ quản lý}
  + *{Phân hệ}* là các phân hệ nằm trong SaaS/ non-SaaS
  + Action là các thao tác có thể thực hiện trên các nghiệp vụ trong domain
* Theo danh sách permission sau:

1. EOP - Edu omi portal
-----------------------

|  | **Phân hệ** | **Chức năng nghiệp vụ** | **Resource type** | **Action catalog** | **mô tả** |
| --- | --- | --- | --- | --- | --- |
| 1 | Onboard tenant | Tenant Management | TENANT | Thêm/ sửa/ xem/ cấp phát tài nguyên/ kích hoạt/ bỏ kích hoạt/chấm dứt hợp đồng | đối tác được BDs khởi tạo/ đối tác được onboard thành công |
| 2 | Marketplace Operation | Quotation Case | CASE | Cập nhật trạng thái/Xem/Theo dõi/Thêm người xử lý/Thêm ghi chú/Tạo Quotation Ask |  |
| 3 | Quotation Ask | ASK | Thêm mới/Xem/Thêm YCBG/Gửi YCBG/Gửi BG/Hủy/Mở lại |  |
| 4 | PIM | PIM | tobe define….. | tobe define….. |
| 5 | System | Indentity | INDENTITY | Xem | Danh sách user được định danh trên hệ thống edu ecosystem |
| 6 | User & Group | USER  GROUP | * USER: thêm/ sửa/ xem/ change status/ Thêm group cho user/ Bỏ group khỏi user * GROUP: thêm/ sửa/ xem/ change status/ Thêm user vào group/ Bỏ user khỏi group | Danh sách group của external |
| 7 | Role & role assignment | ROLE | thêm/ sửa/ xem/ change status | Danh sách Role & role assignmentcủa external |

2 EMS - Education Management System
-----------------------------------

| **Công cụ quản lý** | **Phân hệ** | **Chức năng nghiệp vụ** | **Resource type** | **Action catalog** | **Ghi chú** |
| --- | --- | --- | --- | --- | --- |
| SMS | System | Quản lý người dùng và nhóm người dùng | USER  GROUP | * USER: thêm/ sửa/ xóa/ xem/ change status/ Thêm group cho user/ Bỏ group khỏi user * GROUP: thêm/ sửa/ xóa/ xem/ change status/ Thêm user vào group/ Bỏ user khỏi group |  |
| Quản lý vai trò và phân quyền | ROLE | thêm/ sửa/ xem/ change status |  |
| LMS | Admin portal | Quotation Case | CASE | Cập nhật trạng thái/Xem/Theo dõi/Thêm người xử lý/Thêm ghi chú/Tạo Quotation Ask |  |
| Quotation Ask | ASK | Thêm mới/Xem/Thêm YCBG/Gửi YCBG/Gửi BG/Hủy/Mở lại |  |
| Online store | Quotation Request | REQUEST | Thêm mới/Xem/Sửa/Xóa/Gửi YCBG/ Hủy |  |
| Quotation Bid | BID | Thêm mới/Xem/Sửa/Xóa/Gửi BG/Hủy/Đóng/Xác nhận |  |
|  |  |  |  |  |  | |
# Predefine permission/resource_type/scope/principal

**Page ID:** 949977082  
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977082
