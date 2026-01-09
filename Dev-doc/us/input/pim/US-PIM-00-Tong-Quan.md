# TỔNG QUAN - USER STORIES CHO QUẢN LÝ SẢN PHẨM GIÁO DỤC (PIM)

> **Hệ thống:** SMS (School Management System)
> **Phiên bản:** 1.0
> **Ngày tạo:** 2025-11-26

---

## 1. Giới thiệu

### 1.1. Bối cảnh

Tài liệu này mô tả các User Stories cho tính năng **Quản lý Sản phẩm Giáo dục (PIM - Product Information Management)** trong hệ sinh thái SMS. Tính năng này cho phép:

- **Trường tư nhân** tạo và quản lý các sản phẩm giáo dục (chương trình, khóa học)
- **Giáo viên tự do** xem, đăng ký và cung ứng giảng dạy cho các sản phẩm này
- **Quy trình tự động** từ đăng ký đến tạo lớp học chính thức

### 1.2. Mô hình hợp tác

```
TRƯỜNG TƯ NHÂN                 GIÁO VIÊN TỰ DO
(PRIVATE_SCHOOL)               (INDIVIDUAL)
       │                              │
       ├─ 1. Tạo sản phẩm giáo dục    │
       ├─ 2. Công bố sản phẩm ────────┤
       │                              ├─ 3. Xem sản phẩm
       │                              ├─ 4. Đăng ký giảng dạy
       ├─ 5. Xét duyệt đơn ◄──────────┤
       ├─ 6. Sắp xếp lịch dạy ────────┤
       │                              ├─ 7. Xác nhận lịch
       ├─ 8. Hoàn tất & tạo lớp ◄─────┤
       │                              │
       └─ 9. Lớp học chính thức       └─ Lịch được đồng bộ
```

---

## 2. Quy trình nghiệp vụ tổng quan

### 2.1. Sơ đồ trạng thái sản phẩm giáo dục

```
BẢN NHÁP ──[Công bố]──> ĐANG CÔNG BỐ ──[Tạm dừng]──> TẠM DỪNG
   │                           │                         │
   └──[Lưu trữ]──> LƯU TRỮ    └──[Lưu trữ]───────> LƯU TRỮ
                                                         │
                             [Tiếp tục]◄──────────────────┘
```

### 2.2. Sơ đồ trạng thái đơn đăng ký

```
                    [Gửi đơn]
                       ↓
              CHỜ XÉT DUYỆT ←─────[Gửi lại]─── YÊU CẦU CẬP NHẬT
                 │   │   │                            ↑
    [Phê duyệt] ─┘   │   └─[Từ chối]─> TỪ CHỐI      │
         ↓           │                                │
    ĐÃ PHÊ DUYỆT    └─[Yêu cầu cập nhật]─────────────┘
         ↓
    [Gán lịch]
         ↓
    ĐÃ GÁN LỊCH ←──[Cập nhật lịch]─── ĐANG THƯƠNG LƯỢNG
         │   │                                ↑
         │   └─[Thương lượng]────────────────┘
         │
    [Xác nhận]
         ↓
    ĐÃ XÁC NHẬN
         ↓
    [Hoàn tất]
         ↓
    ĐÃ HOÀN TẤT
         ↓
    [Kích hoạt]
         ↓
    ĐANG HOẠT ĐỘNG
```

---

## 3. Danh mục User Stories

### Nhóm A: Quản lý sản phẩm giáo dục (6 US)
📄 File: [US-PIM-01-Quan-Ly-PIM.md](US-PIM-01-Quan-Ly-PIM.md)

| Mã số | Tên User Story | Vai trò | Độ ưu tiên |
|-------|----------------|---------|------------|
| US-PIM-001 | Tạo sản phẩm giáo dục mới | Quản trị viên trường | Cao |
| US-PIM-002 | Công bố sản phẩm giáo dục | Quản trị viên trường | Cao |
| US-PIM-003 | Xem và quản lý danh sách sản phẩm | Quản trị viên trường | Trung bình |
| US-PIM-004 | Chỉnh sửa sản phẩm giáo dục | Quản trị viên trường | Trung bình |
| US-PIM-005 | Tạm dừng/Tiếp tục sản phẩm | Quản trị viên trường | Thấp |
| US-PIM-006 | Lưu trữ sản phẩm | Quản trị viên trường | Thấp |

### Nhóm B: Đăng ký giảng dạy (5 US)
📄 File: [US-PIM-02-Dang-Ky-Giang-Day.md](US-PIM-02-Dang-Ky-Giang-Day.md)

| Mã số | Tên User Story | Vai trò | Độ ưu tiên |
|-------|----------------|---------|------------|
| US-PIM-007 | Xem danh sách cơ hội giảng dạy | Giáo viên tự do | Cao |
| US-PIM-008 | Đăng ký giảng dạy | Giáo viên tự do | Cao |
| US-PIM-009 | Xem chi tiết đơn đăng ký | Giáo viên tự do | Cao |
| US-PIM-010 | Gửi lại đơn sau yêu cầu cập nhật | Giáo viên tự do | Cao |
| US-PIM-011 | Rút đơn đăng ký | Giáo viên tự do | Trung bình |

### Nhóm C: Phê duyệt đơn đăng ký (5 US)
📄 File: [US-PIM-03-Phe-Duyet-Don.md](US-PIM-03-Phe-Duyet-Don.md)

| Mã số | Tên User Story | Vai trò | Độ ưu tiên |
|-------|----------------|---------|------------|
| US-PIM-012 | Xem danh sách đơn đăng ký | Quản trị viên trường | Cao |
| US-PIM-013 | Xét duyệt và chấp thuận đơn | Quản trị viên trường | Cao |
| US-PIM-014 | Yêu cầu cập nhật đơn | Quản trị viên trường | Cao |
| US-PIM-015 | Từ chối đơn đăng ký | Quản trị viên trường | Cao |
| US-PIM-016 | Sắp xếp lịch dạy | Quản lý học vụ | Cao |

### Nhóm D: Xác nhận lịch dạy (3 US)
📄 File: [US-PIM-04-Xac-Nhan-Lich.md](US-PIM-04-Xac-Nhan-Lich.md)

| Mã số | Tên User Story | Vai trò | Độ ưu tiên |
|-------|----------------|---------|------------|
| US-PIM-017 | Xác nhận lịch dạy | Giáo viên tự do | Cao |
| US-PIM-018 | Thương lượng lịch dạy | Giáo viên tự do | Cao |
| US-PIM-019 | Từ chối lịch dạy | Giáo viên tự do | Trung bình |

### Nhóm E: Hoàn tất và kích hoạt (2 US)
📄 File: [US-PIM-05-Hoan-Tat-Kich-Hoat.md](US-PIM-05-Hoan-Tat-Kich-Hoat.md)

| Mã số | Tên User Story | Vai trò | Độ ưu tiên |
|-------|----------------|---------|------------|
| US-PIM-020 | Hoàn tất đơn và tạo lớp học | Quản trị viên trường | Cao |
| US-PIM-021 | Kết thúc đơn trước hạn | Quản trị viên trường | Thấp |

### Nhóm F: Tự động hóa (2 US)
📄 File: [US-PIM-06-Tu-Dong-Hoa.md](US-PIM-06-Tu-Dong-Hoa.md)

| Mã số | Tên User Story | Vai trò | Độ ưu tiên |
|-------|----------------|---------|------------|
| US-PIM-022 | Tự động từ chối khi hết hạn | Hệ thống | Trung bình |
| US-PIM-023 | Tự động nhắc nhở xét duyệt | Hệ thống | Thấp |

### Nhóm G: Xử lý lỗi (1 US)
📄 File: [US-PIM-07-Xu-Ly-Loi.md](US-PIM-07-Xu-Ly-Loi.md)

| Mã số | Tên User Story | Vai trò | Độ ưu tiên |
|-------|----------------|---------|------------|
| US-PIM-024 | Xử lý sự kiện thất bại | Hệ thống | Cao |

---

## 4. Bảng thuật ngữ

### 4.1. Thuật ngữ nghiệp vụ

| Thuật ngữ tiếng Việt | Thuật ngữ tiếng Anh | Định nghĩa |
|---------------------|---------------------|------------|
| Sản phẩm giáo dục | PIM (Product Information Management) | Thông tin về chương trình/khóa học mà trường tư nhân muốn hợp tác với giáo viên |
| Đơn đăng ký | Registration | Đơn của giáo viên tự do đăng ký cung ứng giảng dạy cho sản phẩm giáo dục |
| Bản nháp | Draft | Trạng thái sản phẩm chưa được công bố |
| Công bố | Publish | Hành động phân phối sản phẩm giáo dục đến giáo viên |
| Đang công bố | Published | Trạng thái sản phẩm đã được công bố và đang nhận đăng ký |
| Tạm dừng | Suspended | Trạng thái sản phẩm tạm ngừng nhận đăng ký mới |
| Lưu trữ | Archived | Trạng thái sản phẩm không còn sử dụng |
| Lịch dạy | Schedule | Thời gian biểu giảng dạy cụ thể |
| Lịch dạy dự kiến | Tentative Schedule | Lịch chưa chính thức, chờ giáo viên xác nhận |
| Lịch dạy chính thức | Official Schedule | Lịch đã được xác nhận và hoàn tất |
| Phê duyệt | Approve | Hành động chấp thuận đơn đăng ký |
| Xét duyệt | Review | Quá trình xem xét đơn đăng ký |
| Từ chối | Reject/Decline | Hành động không chấp thuận |
| Rút đơn | Withdraw | Giáo viên tự hủy đơn đăng ký |
| Thương lượng | Negotiate | Đề xuất thay đổi lịch dạy |
| Hoàn tất | Finalize | Kết thúc quy trình và tạo lớp học chính thức |
| Kích hoạt | Activate | Bắt đầu hoạt động giảng dạy |
| Kết thúc | Terminate | Dừng đơn đăng ký trước thời hạn |

### 4.2. Trạng thái sản phẩm giáo dục

| Trạng thái | Mã trạng thái | Mô tả |
|-----------|---------------|-------|
| Bản nháp | DRAFT | Sản phẩm đang được tạo, chưa công bố |
| Đang công bố | PUBLISHED | Sản phẩm đã công bố, giáo viên có thể xem và đăng ký |
| Tạm dừng | SUSPENDED | Sản phẩm tạm ngừng nhận đăng ký mới |
| Lưu trữ | ARCHIVED | Sản phẩm đã kết thúc, không còn sử dụng |

### 4.3. Trạng thái đơn đăng ký

| Trạng thái | Mã trạng thái | Mô tả |
|-----------|---------------|-------|
| Chờ xét duyệt | PENDING_REVIEW | Đơn đã gửi, chờ trường xem xét |
| Yêu cầu cập nhật | UPDATE_REQUESTED | Trường yêu cầu giáo viên cập nhật thông tin |
| Đã phê duyệt | APPROVED | Trường chấp thuận đơn, chờ sắp xếp lịch |
| Đã từ chối | REJECTED | Trường từ chối đơn |
| Đã rút | WITHDRAWN | Giáo viên tự rút đơn |
| Đã gán lịch | SCHEDULE_ASSIGNED | Trường đã gửi lịch dạy dự kiến |
| Đang thương lượng | NEGOTIATING | Giáo viên đề xuất thay đổi lịch |
| Đã xác nhận | CONFIRMED | Giáo viên xác nhận lịch dạy |
| Đã từ chối lịch | DECLINED | Giáo viên từ chối lịch dạy |
| Đã hoàn tất | FINALIZED | Trường hoàn tất thủ tục |
| Đang hoạt động | ACTIVE | Lớp học đang diễn ra |
| Đã hoàn thành | COMPLETED | Lớp học kết thúc đúng hạn |
| Đã kết thúc | TERMINATED | Lớp học kết thúc trước hạn |

### 4.4. Vai trò người dùng

| Vai trò tiếng Việt | Vai trò tiếng Anh | Loại tổ chức | Mô tả |
|-------------------|-------------------|--------------|-------|
| Quản trị viên trường | School Admin | PRIVATE_SCHOOL | Người quản lý trường tư nhân, có quyền tạo sản phẩm và phê duyệt đơn |
| Quản lý học vụ | Academic Manager | PRIVATE_SCHOOL | Người sắp xếp lịch dạy và quản lý giáo viên |
| Giáo viên tự do | Freelance Teacher | INDIVIDUAL | Giáo viên độc lập, đăng ký cung ứng giảng dạy |

### 4.5. Thuật ngữ giao diện

| Thuật ngữ tiếng Việt | Thuật ngữ tiếng Anh | Mô tả |
|---------------------|---------------------|-------|
| Cửa sổ xác nhận | Popup/Modal | Hộp thoại yêu cầu xác nhận hành động |
| Danh sách chọn | Dropdown | Menu thả xuống để chọn giá trị |
| Lọc | Filter | Chức năng lọc dữ liệu theo tiêu chí |
| Tìm kiếm | Search | Chức năng tìm kiếm bằng từ khóa |
| Phân trang | Pagination | Chia dữ liệu thành nhiều trang |
| Nhãn trạng thái | Badge | Nhãn hiển thị trạng thái |
| Nút hành động | Button | Nút bấm để thực hiện hành động |
| Thông báo | Notification | Tin nhắn thông báo cho người dùng |
| Kiểm tra hợp lệ | Validation | Kiểm tra tính đúng đắn của dữ liệu |

---

## 5. Các chân dung người dùng

### 5.1. Quản trị viên trường (School Admin)

**Bối cảnh:**
- Làm việc tại trường tư nhân sử dụng EMS với gói PRIVATE_SCHOOL
- Cần tìm giáo viên tự do có chất lượng để hợp tác giảng dạy
- Quản lý nhiều sản phẩm giáo dục cùng lúc

**Mục tiêu:**
- Tạo và quản lý sản phẩm giáo dục hiệu quả
- Tìm được giáo viên phù hợp với yêu cầu
- Đảm bảo chất lượng giảng dạy

**Thách thức:**
- Đánh giá năng lực giáo viên từ xa
- Quản lý nhiều đơn đăng ký cùng lúc
- Sắp xếp lịch phù hợp với cả trường và giáo viên

### 5.2. Quản lý học vụ (Academic Manager)

**Bối cảnh:**
- Chuyên trách sắp xếp lịch dạy và quản lý giáo viên
- Cần tối ưu hóa thời gian biểu
- Phối hợp với nhiều giáo viên

**Mục tiêu:**
- Sắp xếp lịch dạy hợp lý
- Đảm bảo lịch phù hợp với cả hai bên
- Quản lý thay đổi lịch hiệu quả

**Thách thức:**
- Cân đối giữa nhu cầu trường và khả năng giáo viên
- Xử lý thương lượng lịch
- Đảm bảo lịch không xung đột

### 5.3. Giáo viên tự do (Freelance Teacher)

**Bối cảnh:**
- Làm việc độc lập, sử dụng EMS với gói INDIVIDUAL
- Muốn tìm thêm cơ hội giảng dạy
- Hợp tác với một hoặc nhiều trường

**Mục tiêu:**
- Tìm cơ hội giảng dạy phù hợp
- Đăng ký và quản lý đơn dễ dàng
- Sắp xếp lịch phù hợp với bản thân

**Thách thức:**
- Tìm cơ hội phù hợp với năng lực
- Cạnh tranh với giáo viên khác
- Cân đối lịch dạy với nhiều trường

---

## 6. Phụ thuộc hệ thống

### 6.1. Dịch vụ backend

| Dịch vụ | Công nghệ | Vai trò |
|---------|-----------|---------|
| sf-product | Java/SpringBoot | Quản lý sản phẩm giáo dục và đơn đăng ký |
| sf-purchase | Java/SpringBoot | Ghi nhận quan hệ hợp tác (phía trường) |
| sf-sales | Java/SpringBoot | Ghi nhận quan hệ hợp tác (phía giáo viên) |
| tf-teacher-profile | Java/SpringBoot | Quản lý hồ sơ giáo viên |
| tf-teacher-calendar | Java/SpringBoot | Quản lý lịch làm việc giáo viên |
| tf-class-management | Java/SpringBoot | Quản lý lớp học |
| lf-course | Java/SpringBoot | Quản lý khóa học của giáo viên |
| sf-notification-client | Java/SpringBoot | Gửi thông báo |
| sf-worker | Java/SpringBoot | Xử lý workflow với Temporal |

### 6.2. Ứng dụng frontend

| Ứng dụng | Công nghệ | Người dùng |
|----------|-----------|------------|
| sf-web | ReactJS | Quản trị viên trường, Quản lý học vụ |
| tf-web | ReactJS | Giáo viên tự do |
| lf-web | ReactJS | Học sinh (xem khóa học) |

### 6.3. Hạ tầng kỹ thuật

| Thành phần | Công nghệ | Mục đích |
|-----------|-----------|----------|
| Kafka (MSK) | Apache Kafka | Truyền sự kiện giữa các tenant |
| Temporal | Temporal.io | Điều phối workflow đăng ký |
| PostgreSQL | PostgreSQL | Lưu trữ dữ liệu |
| Redis | Redis | Cache và idempotency |

---

## 7. Chỉ số đo lường thành công

### 7.1. Chỉ số nghiệp vụ

| Chỉ số | Mục tiêu | Đo lường |
|--------|----------|----------|
| Số sản phẩm giáo dục được tạo | Tăng 20%/tháng | Đếm số PIM mới |
| Tỷ lệ sản phẩm được công bố | >= 80% | Số PIM PUBLISHED / Tổng PIM |
| Số đơn đăng ký | Tăng 30%/tháng | Đếm số registration |
| Tỷ lệ phê duyệt đơn | >= 60% | Số APPROVED / Tổng đơn |
| Tỷ lệ xác nhận lịch | >= 70% | Số CONFIRMED / Số SCHEDULE_ASSIGNED |
| Tỷ lệ hoàn tất đơn | >= 90% | Số FINALIZED / Số CONFIRMED |
| Thời gian xử lý đơn trung bình | < 7 ngày | Từ submit đến approve |

### 7.2. Chỉ số kỹ thuật

| Chỉ số | Mục tiêu | Đo lường |
|--------|----------|----------|
| Thời gian tải trang | < 2 giây | Page load time |
| Thời gian API response | < 500ms | API latency |
| Tỷ lệ thành công API | >= 99% | Success rate |
| Tỷ lệ sự kiện thất bại | < 1% | Failed events / Total events |
| Tỷ lệ đồng bộ thành công | >= 99% | Sync success rate |

### 7.3. Chỉ số trải nghiệm người dùng

| Chỉ số | Mục tiêu | Đo lường |
|--------|----------|----------|
| Thời gian hoàn thành đăng ký | < 2 phút | Thời gian từ bắt đầu đến submit |
| Tỷ lệ người dùng hài lòng | >= 80% | Khảo sát định kỳ |
| Số lỗi giao diện | < 5 errors/100 sessions | Error tracking |
| Tỷ lệ sử dụng tính năng lọc/tìm kiếm | >= 40% | Usage analytics |

---

## 8. Rủi ro và giới hạn

### 8.1. Rủi ro

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Giáo viên không xác nhận lịch đúng hạn | Cao | Tự động nhắc nhở + tự động từ chối sau deadline |
| Sự kiện Kafka bị mất | Trung bình | DLQ + retry mechanism + idempotency |
| Xung đột lịch giáo viên | Trung bình | Kiểm tra availability trước khi gán |
| Workflow Temporal thất bại | Thấp | Retry policy + monitoring + alerting |
| Dữ liệu không đồng bộ giữa tenants | Thấp | Event sourcing + eventual consistency |

### 8.2. Giới hạn hiện tại

| Giới hạn | Mô tả | Kế hoạch khắc phục |
|----------|-------|-------------------|
| Không hỗ trợ thanh toán tự động | Thanh toán phải xử lý riêng | Tích hợp với sf-billing trong tương lai |
| Không hỗ trợ đánh giá giáo viên | Chưa có rating/review trong workflow | Bổ sung trong phiên bản sau |
| Giới hạn số lần thương lượng | Tối đa 3 lần | Có thể điều chỉnh theo nhu cầu |
| Không hỗ trợ multi-language | Chỉ tiếng Việt | i18n trong tương lai |

---

## 9. Tài liệu tham khảo

### 9.1. Tài liệu thiết kế

- [HLD-SPS-PIM.md](../input/HLD-SPS-PIM.md) - High Level Design cho PIM
- [Template US.md](../input/Template%20US.md) - Template User Story chuẩn

### 9.2. Tài liệu API (dự kiến)

- sf-product API Documentation
- sf-notification API Documentation
- Temporal Workflow Documentation

### 9.3. Sơ đồ kiến trúc

- Context Diagram (xem HLD section 2)
- Sequence Diagram (xem HLD section 3.1)
- State Machine Diagram (xem HLD section 4)
- ERD (xem HLD section 5)

---

## 10. Lịch sử thay đổi

| Ngày | Phiên bản | Người thực hiện | Thay đổi |
|------|-----------|-----------------|----------|
| 2025-11-26 | 1.0 | BA Team | Tạo tài liệu ban đầu |

---

**Ghi chú:**
- Tài liệu này là tổng quan cho toàn bộ 24 User Stories về tính năng PIM
- Chi tiết từng User Story xem tại các file tương ứng trong danh mục
- Thuật ngữ được chuẩn hóa và sử dụng nhất quán trong tất cả các file
