
| Acronym | Full Form | Definition |
|---------|-----------|------------|
| EMS | Education Management System | Hệ thống quản lý giáo dục |
| PIM | Product Information Management | Quản lý thông tin sản phẩm |
| SMS | School Management System | Module quản lý trường học trong EMS |
| TeMS | Teacher Management System | Module quản lý giáo viên trong EMS |
| LMS | Learning Management System | Module quản lý học tập trong EMS |
| BFF | Backend For Frontend | GraphQL layer giữa frontend và backend services |
| SaaS | Software as a Service | Mô hình phần mềm dịch vụ |

---


| Thuật ngữ | Định nghĩa |
|-----------|------------|
| **PIM** | Product Information Management - Thông tin sản phẩm giáo dục (Program/Course) được tạo bởi trường tư nhân |
| **PRIVATE_SCHOOL** | Subscription plan dành cho trường tư nhân trong hệ sinh thái EMS |
| **INDIVIDUAL** | Subscription plan dành cho giáo viên tự do trong hệ sinh thái EMS |
| **EMS** | Education Management System - Hệ thống quản lý giáo dục |
| **Tenant** | Một đơn vị thuê dịch vụ SaaS độc lập, có data và configuration riêng |
| **Registration** | Đăng ký của giáo viên tự do vào PIM của trường tư nhân |
| **Partnership** | Quan hệ hợp tác giữa PRIVATE_SCHOOL tenant và INDIVIDUAL tenant |
| **Snapshot** | Bản sao dữ liệu tại một thời điểm cụ thể, immutable |
| **Workflow** | Quy trình nghiệp vụ được orchestrate bởi Temporal |
| **Activity** | Unit of work được thực thi trong workflow |
| **Signal** | Message được gửi vào running workflow từ bên ngoài |