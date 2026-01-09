# Predefine resource type và resource

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

Tôi muốn khởi tạo sẵn danh sách resource type và migrate resource

Để dễ dàng quản lý, truy xuất, và đảm bảo tính nhất quán dữ liệu cho việc phân quyền trên hệ sinh thái Edu Ecosystem

**Acceptance criteria**
-----------------------

### AC-1: Thực hiện đẩy dữ liệu vào bảng `resource_types`

Tại thời điểm đã định nghĩa ra được một hoặc nhiều Resource type

Khi dev nhận được thông báo bổ sung Resource type

Thì dev thực hiện insert dữ liệu vào bảng `resource_types` trong database theo danh sách Resource type như sau:

|  | **Phân hệ** | **Resource type** | **Mô tả** | **SaaS/ Non-saas** | | **Ghi chú** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Onboard tenant | TENANT | đối tác được khởi tạo/ đối tác được onboard thành công | EOP | non-saas |  |
| 2 | Quotation | QUOTATION\_CASE | case theo yêu cầu báo giá | EOP | non-saas |  |
| 3 | QUOTATION\_ASK | gom yêu cầu báo giá | EOP | non-saas |  |
| 4 | QUOTATION\_BID | bid giá | EOP | non-saas |  |
| 5 |  |  |  |  |  |  |
| 6 | Profile | USE\_PROFILE | Profile của học sinh/ parent | EMS\_LMS | SaaS |  |
| 7 | Chương trình học/ khóa học | SUBMISSION | bài nộp | EMS\_LMS | SaaS |  |
| 8 | GRADE\_RECORD | Bảng điểm | EMS\_LMS | SaaS |  |
| 9 | Hồ sơ | USE\_PROFILE | Profile của giáo viên | EMS\_LMS | SaaS |  |
| 10 | Chương trình học/ khóa học | GRADE\_RECORD | chấm điểm, bảng điểm học sinh | EMS\_TeMS | SaaS |  |
| 11 | Tài liệu học tập | LESSIONS | Bài học (Bài giảng/ bài kiểm tra/ bài trắc nghiệm) | EMS\_TeMS | SaaS |  |
| 12 | LEARNING\_MATERIAL | Bài giảng | EMS\_TeMS | SaaS |  |
| 13 | Bài kiểm tra | EMS\_TeMS | SaaS |  |
| 14 | Bài trắc nghiệm | EMS\_TeMS | SaaS |  |
| 15 | Bộ đề trắc nghiệm, ngân hàng câu hỏi | EMS\_TeMS | SaaS |  |
| 16 | System | USE\_PROFILE | Profile của giáo viên/ học sinh/ phụ huynh/ nhân viên/ … | SMS\_SMS | SaaS |  |
| 17 | ROLE\_PERMISSION | vai trò và phân quyền | SMS\_SMS | SaaS |  |
| 18 | TIER | gói dịch vụ đăng ký | SMS\_SMS | SaaS |  |
| 19 | Learning management control | PROGRAM/COURSE\_STRUCTURE | chương trình học/ khóa học | EMS\_SMS | SaaS |  |
| 20 |  | Quản lý kỳ thi | EMS\_SMS | SaaS |  |
| 21 | CERTIFICATE | Quản lý chứng chỉ | EMS\_SMS | SaaS |  |
| 22 | CLASS | Quản lý lớp học | EMS\_SMS | SaaS |  |
| 23 | GRADE\_RECORD | Bảng điểm học sinh và kết quả thi | EMS\_SMS | SaaS |  |
| 24 | LESSIONS | Bài học (Bài giảng/ bài kiểm tra/ bài trắc nghiệm) | EMS\_SMS | SaaS |  |
| 25 | LEARNING\_MATERIAL | Bài giảng | EMS\_SMS | SaaS |  |
| 26 | Bài kiểm tra | EMS\_SMS | SaaS |  |
| 27 | Bài trắc nghiệm | EMS\_SMS | SaaS |  |
| 28 | Bộ đề trắc nghiệm, ngân hàng câu hỏi | EMS\_SMS | SaaS |  |
| 29 |  | tobe define ……. | tobe define ……. | EMS\_SMS | SaaS |  |
| 30 | CRM | tobe define ……. | tobe define ……. | EMS\_SMS | SaaS |  |
| 31 | CMS | tobe define ……. | tobe define ……. | EMS\_SMS | SaaS |  |
| 32 | ERP | tobe define ……. | tobe define ……. | EMS\_SMS | SaaS |  |
| 33 | PIM | tobe define ……. | tobe define ……. | EMS\_Store | SaaS |  |
| 34 | Quotation | QUOTATION\_REQUEST | yêu cầu báo giá | EMS\_Store | SaaS |  |
| 35 | QUOTATION\_CASE | case theo yêu cầu báo giá | EMS\_Store | SaaS |  |
| 36 | QUOTATION\_ASK | gom yêu cầu báo giá | EMS\_Store | SaaS |  |
| 37 | QUOTATION\_BID | bid giá | EMS\_Store | SaaS |  |
| 38 | Card | tobe define ……. | tobe define ……. | EMS\_Store | SaaS |  |
| 39 | payment getway | tobe define ……. | tobe define ……. | EMS\_Store | SaaS |  |
| 40 | order fulfilment | tobe define ……. | tobe define ……. | EMS\_Store | SaaS |  |
| 41 | call&chat | tobe define ……. | tobe define ……. | EMS\_Store | SaaS |  |
| 42 |  |  |  |  |  |  |

### AC-2: Định nghĩa Resource

Tại thời điểm thêm mới ở mỗi nghiệp vụ có resouce type

Khi người dùng thêm mới 1 bản ghi

Thì hệ thống thực hiện insert vào bảng `Resource` theo thông tin sau:

* `TenantId`:

  + Nếu của Saas ==> Lưu tenant
  + Nếu của Non SaaS ==> Để NULL
* `ResourceType`: Tương ứng với resoucr Type được định nghĩa trong bảng `resource_types`
* `globalKey`: Tự sinh và là định danh duy nhất của resource trên toàn bộ hệ thống Eco Edusystem

  + Cấu trúc globalKey:

| **Khu vực**  aehtechx:{biz-code}:{plane}:{solution} | **Vùng**  {tenantId}/{branchId} | **Đối tượng hoặc phạm vi**  {resource-type-code}/{resourceId} | **Ghi chú** |
| --- | --- | --- | --- |
| aehtechx:cfm:app:tems | tenant/branch | resource type/ID của reource |  |
| aehtechx:cfm:app:lms | tenant/branch | resource type/ID của reource |  |
| aehtechx:cfm:internal:EOP | area/deparment | resource type/ID của reource |  |
| aehtechx:cfm:marketplace | theschools | resource type/ID của reource |  |
|  |  |  |  |

* `createdAt`: sysdate
* `createdBy`: DEV

Business Value & Success Metrics
--------------------------------

Dependencies
------------

Impact Analysis
---------------

UI/UX Design
============

Out of Scope Item
=================

---
**Thông tin trang:**
- **ID:** 949977089
- **URL:** https://aeh.atlassian.net/spaces/EES/pages/949977089
- **Space:** Edu Ecosystem (EES)
- **Version:** 17
- **Attachments:** 1 file (image-20251022-072344.png)