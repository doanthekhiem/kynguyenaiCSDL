# USER STORIES - PIM (Product Information Management)

> **Hệ thống:** SMS (School Management System)
> **Phiên bản:** 1.0
> **Ngày tạo:** 2025-11-25

---

# A. QUẢN LÝ PIM (PRIVATE_SCHOOL)

## US-PIM-001: Tạo PIM mới

### Nội dung
Là **School Admin**
Tôi muốn **tạo mới một PIM (Program/Course)**
Tại **sf-web (School Management Portal)**
Để **khai báo thông tin sản phẩm giáo dục mà trường muốn hợp tác với giáo viên tự do**

---

### Acceptance Criterias

#### AC-1 – Nhập thông tin cơ bản PIM
- **Tại:** Màn hình tạo PIM
- **Khi:** School Admin nhập đầy đủ các thông tin bắt buộc: Code, Name, Type (PROGRAM/COURSE), Description, Start Date, End Date
- **Thì:**
  - Hệ thống validate các trường bắt buộc
  - Code phải unique trong tenant
  - Start Date phải nhỏ hơn End Date
  - PIM được tạo với status = DRAFT
  - Hiển thị thông báo "Tạo PIM thành công"

**Inline Business Rule:**
- Code format: [A-Z0-9-] tối đa 50 ký tự
- Name tối đa 255 ký tự
- Type chỉ nhận PROGRAM hoặc COURSE

---

#### AC-2 – Cấu hình thông tin phí
- **Tại:** Màn hình tạo PIM, tab "Thông tin phí"
- **Khi:** School Admin thêm các loại phí (TUITION, MATERIAL, COMMISSION)
- **Thì:**
  - Mỗi loại phí phải có: Fee Type, Amount (>= 0), Currency (default VND), Billing Cycle
  - Có thể thêm nhiều loại phí
  - Hiển thị danh sách phí đã cấu hình

**Inline Business Rule:**
- Amount phải >= 0
- Billing Cycle: ONE_TIME, MONTHLY, SESSION

---

#### AC-3 – Cấu hình yêu cầu giáo viên
- **Tại:** Màn hình tạo PIM, tab "Yêu cầu giáo viên"
- **Khi:** School Admin nhập yêu cầu về trình độ giáo viên
- **Thì:**
  - Có thể chọn: Min Qualification (BACHELOR/MASTER/PHD)
  - Nhập Min Experience Years (số năm >= 0)
  - Thêm Required Certifications (danh sách)
  - Thêm Preferred Skills (danh sách)
  - Dữ liệu được lưu vào bảng pim_teacher_requirement

**Inline Business Rule:**
- Qualification: BACHELOR, MASTER, PHD
- Experience Years >= 0

---

#### AC-4 – Cấu hình lịch trình
- **Tại:** Màn hình tạo PIM, tab "Cấu hình lịch"
- **Khi:** School Admin cấu hình thông tin lịch dạy
- **Thì:**
  - Nhập: Schedule Type (FIXED/FLEXIBLE)
  - Duration Hours (> 0)
  - Sessions Per Week (> 0)
  - Total Sessions (> 0)
  - Available Time Slots (JSON)
  - Confirmation Deadline Days (default 7)
  - Dữ liệu được lưu vào bảng pim_schedule_config

**Inline Business Rule:**
- Duration Hours, Sessions Per Week, Total Sessions phải > 0
- Confirmation Deadline Days >= 1

---

#### AC-5 – Thêm ưu đãi cho giáo viên
- **Tại:** Màn hình tạo PIM, tab "Ưu đãi"
- **Khi:** School Admin thêm các benefit cho giáo viên
- **Thì:**
  - Chọn Benefit Type (BONUS, DISCOUNT, TRAINING)
  - Nhập Description
  - Cấu hình Conditions (JSON) nếu có
  - Hiển thị danh sách benefits đã thêm

---

#### AC-6 – Lỗi validation
- **Tại:** Màn hình tạo PIM
- **Khi:** School Admin nhập dữ liệu không hợp lệ
- **Thì:**
  - Hiển thị thông báo lỗi rõ ràng tại từng trường
  - Code trùng: "Mã PIM đã tồn tại"
  - Start Date >= End Date: "Ngày bắt đầu phải nhỏ hơn ngày kết thúc"
  - Không cho phép lưu PIM

---

### Business Value
- Cho phép trường tư nhân khai báo sản phẩm giáo dục một cách có cấu trúc
- Cung cấp đầy đủ thông tin để giáo viên tự do đánh giá và đăng ký
- Tạo nền tảng cho workflow hợp tác giữa trường và giáo viên

---

### Success Metrics
- Số lượng PIM được tạo thành công / tổng số lượt tạo >= 95%
- Thời gian trung bình để tạo một PIM < 10 phút
- Tỷ lệ PIM có đầy đủ thông tin (fees, requirements, schedule) >= 90%

---

### Dependencies
- sf-product service
- sf-web (School Management Portal)
- Database: pim, pim_fee, pim_benefit, pim_teacher_requirement, pim_schedule_config tables

---

### Impact Analysis
- **Tác động kỹ thuật:** Cao - Cần tạo mới database schema, APIs, UI components
- **Tác động nghiệp vụ:** Cao - Core feature của PIM workflow
- **Tác động UX:** Trung bình - UI form phức tạp với nhiều tabs

---

## US-PIM-002: Publish PIM

### Nội dung
Là **School Admin**
Tôi muốn **publish một PIM đã tạo (status = DRAFT)**
Tại **sf-web (School Management Portal)**
Để **phân phối thông tin PIM đến các giáo viên tự do đã hợp tác, cho phép họ xem và đăng ký**

---

### Acceptance Criterias

#### AC-1 – Publish PIM thành công (Happy Path)
- **Tại:** Màn hình chi tiết PIM hoặc danh sách PIM
- **Khi:** School Admin click nút "Publish" trên PIM có status = DRAFT và đã điền đủ thông tin bắt buộc
- **Thì:**
  - Hệ thống validate tất cả thông tin bắt buộc đã được điền
  - Cập nhật PIM status = PUBLISHED
  - Cập nhật publish_date = current timestamp
  - Publish PIMPublishedEvent lên Kafka topic "pim.lifecycle"
  - Event được route đến các INDIVIDUAL tenants có partnership active
  - Hiển thị thông báo "PIM đã được phân phối thành công"

**Inline Business Rule:**
- PIM phải có status = DRAFT
- Các thông tin bắt buộc: code, name, type, start_date, end_date, schedule_config phải được điền
- Partnership giữa trường và giáo viên phải có status = ACTIVE

---

#### AC-2 – Không cho phép publish khi thiếu thông tin
- **Tại:** Màn hình chi tiết PIM
- **Khen:** School Admin click "Publish" nhưng PIM thiếu thông tin bắt buộc
- **Thì:**
  - Hiển thị popup cảnh báo: "Vui lòng điền đầy đủ thông tin bắt buộc"
  - Liệt kê các trường còn thiếu
  - Không cho phép publish
  - PIM vẫn giữ status = DRAFT

**Inline Business Rule:**
- Thông tin bắt buộc: name, code, type, start_date, end_date, schedule_config

---

#### AC-3 – Không cho phép publish khi không có giáo viên hợp tác
- **Tại:** Màn hình chi tiết PIM
- **Khi:** School Admin click "Publish" nhưng không có partnership active nào
- **Thì:**
  - Hiển thị popup cảnh báo: "Không tìm thấy giáo viên hợp tác. Vui lòng thiết lập hợp tác trước khi publish PIM"
  - Không cho phép publish
  - PIM vẫn giữ status = DRAFT

---

#### AC-4 – Hiển thị danh sách giáo viên sẽ nhận PIM
- **Tại:** Màn hình xác nhận publish
- **Khi:** School Admin click "Publish" và mọi điều kiện hợp lệ
- **Thì:**
  - Hiển thị popup xác nhận với danh sách giáo viên (tenants) sẽ nhận PIM
  - Số lượng giáo viên
  - Nút "Xác nhận Publish" và "Hủy"

---

#### AC-5 – Lỗi khi publish event thất bại
- **Tại:** Backend sf-product
- **Khi:** Publish PIMPublishedEvent lên Kafka thất bại sau max retries
- **Thì:**
  - Rollback transaction (PIM vẫn giữ status = DRAFT)
  - Log error với chi tiết exception
  - Hiển thị thông báo lỗi: "Có lỗi xảy ra khi phân phối PIM. Vui lòng thử lại"
  - Alert operations team

**Inline Business Rule:**
- Sử dụng transactional outbox pattern để đảm bảo consistency
- Max retry: 3 lần với exponential backoff

---

### Business Value
- Tự động phân phối thông tin PIM đến đúng đối tượng giáo viên
- Giảm thời gian và công sức manual coordination
- Đảm bảo tính kịp thời và chính xác của thông tin

---

### Success Metrics
- Tỷ lệ publish PIM thành công >= 99%
- Thời gian trung bình để event đến INDIVIDUAL tenants < 5 giây
- Số lượng failed events trên DLQ < 1% tổng events

---

### Dependencies
- sf-product service (PRIVATE_SCHOOL)
- Kafka broker (topic: pim.lifecycle)
- sf-product service (INDIVIDUAL) - consumer
- partnership table
- sf-notification-client (optional - để notify giáo viên)

---

### Impact Analysis
- **Tác động kỹ thuật:** Cao - Event-driven architecture, Kafka integration
- **Tác động nghiệp vụ:** Cao - Trigger workflow phân phối PIM
- **Tác động UX:** Thấp - Chỉ là action button

---

## US-PIM-003: Xem và quản lý danh sách PIM

### Nội dung
Là **School Admin**
Tôi muốn **xem danh sách tất cả PIM của trường**
Tại **sf-web (School Management Portal)**
Để **quản lý và theo dõi trạng thái các sản phẩm giáo dục đã khai báo**

---

### Acceptance Criterias

#### AC-1 – Hiển thị danh sách PIM với pagination
- **Tại:** Màn hình danh sách PIM
- **Khi:** School Admin truy cập trang PIM Management
- **Thì:**
  - Hiển thị danh sách PIM theo dạng bảng
  - Các cột: Code, Name, Type, Status, Publish Date, Start Date, End Date, Actions
  - Sắp xếp mặc định: Publish Date DESC
  - Pagination: 20 items/page
  - Hiển thị status badge với màu sắc phân biệt

**Inline Business Rule:**
- Status colors: DRAFT (gray), PUBLISHED (green), SUSPENDED (yellow), ARCHIVED (red)

---

#### AC-2 – Lọc PIM theo status
- **Tại:** Màn hình danh sách PIM
- **Khi:** School Admin chọn filter theo status
- **Thì:**
  - Dropdown filter: All, DRAFT, PUBLISHED, SUSPENDED, ARCHIVED
  - Danh sách được refresh theo filter
  - Giữ nguyên pagination và sorting

---

#### AC-3 – Tìm kiếm PIM
- **Tại:** Màn hình danh sách PIM
- **Khi:** School Admin nhập keyword vào search box
- **Thì:**
  - Tìm kiếm trên các trường: code, name, description
  - Case-insensitive search
  - Kết quả được highlight keyword
  - Hiển thị "Không tìm thấy kết quả" nếu không có PIM nào match

---

#### AC-4 – Xem chi tiết PIM
- **Tại:** Màn hình danh sách PIM
- **Khi:** School Admin click vào một PIM
- **Thì:**
  - Navigate đến màn hình chi tiết PIM
  - Hiển thị đầy đủ thông tin: Thông tin cơ bản, Phí, Yêu cầu giáo viên, Lịch trình, Ưu đãi
  - Hiển thị các actions: Edit, Publish, Suspend, Archive (tùy theo status)

---

#### AC-5 – Lỗi khi tải danh sách PIM
- **Tại:** Màn hình danh sách PIM
- **Khi:** API call thất bại do lỗi server hoặc network
- **Thì:**
  - Hiển thị error state với message: "Không thể tải danh sách PIM. Vui lòng thử lại"
  - Nút "Thử lại"
  - Log error

---

### Business Value
- Cung cấp tổng quan về tất cả sản phẩm giáo dục của trường
- Hỗ trợ tìm kiếm và lọc nhanh chóng
- Tăng hiệu quả quản lý

---

### Success Metrics
- Thời gian load trang danh sách PIM < 2 giây (với 100 items)
- API response time < 500ms
- Tỷ lệ người dùng sử dụng search/filter >= 40%

---

### Dependencies
- sf-product service
- sf-web
- sf-graph (GraphQL API)

---

### Impact Analysis
- **Tác động kỹ thuật:** Trung bình - Standard CRUD UI
- **Tác động nghiệp vụ:** Trung bình - Hỗ trợ quản lý
- **Tác động UX:** Cao - Core UI cho School Admin

---

## US-PIM-004: Chỉnh sửa PIM

### Nội dung
Là **School Admin**
Tôi muốn **chỉnh sửa thông tin PIM đã tạo**
Tại **sf-web (School Management Portal)**
Để **cập nhật hoặc sửa lỗi thông tin sản phẩm giáo dục**

---

### Acceptance Criterias

#### AC-1 – Chỉnh sửa PIM với status = DRAFT
- **Tại:** Màn hình chi tiết PIM
- **Khi:** School Admin click "Edit" trên PIM có status = DRAFT và thay đổi thông tin
- **Thì:**
  - Cho phép chỉnh sửa tất cả các trường
  - Validate dữ liệu giống như US-PIM-001
  - Cập nhật updated_at, updated_by
  - Tăng version += 1 (optimistic locking)
  - Hiển thị thông báo "Cập nhật PIM thành công"

---

#### AC-2 – Chỉnh sửa PIM với status = PUBLISHED
- **Tại:** Màn hình chi tiết PIM
- **Khi:** School Admin click "Edit" trên PIM có status = PUBLISHED và thay đổi thông tin
- **Thì:**
  - Cho phép chỉnh sửa một số trường: description, fees, benefits, end_date
  - KHÔNG cho phép chỉnh sửa: code, name, type, start_date, teacher_requirements, schedule_config
  - Sau khi Save: publish PIMUpdatedEvent lên Kafka
  - Event được gửi đến các INDIVIDUAL tenants đã nhận PIM
  - Cập nhật version += 1

**Inline Business Rule:**
- Các trường không thể sửa khi PUBLISHED: code, name, type, start_date, core requirements

---

#### AC-3 – Không cho phép chỉnh sửa khi có Registration active
- **Tại:** Màn hình chi tiết PIM
- **Khi:** School Admin cố gắng chỉnh sửa PIM có ít nhất 1 registration với status IN (APPROVED, SCHEDULE_ASSIGNED, CONFIRMED, FINALIZED, ACTIVE)
- **Thì:**
  - Hiển thị popup cảnh báo: "PIM đang có đăng ký đang xử lý. Không thể chỉnh sửa thông tin quan trọng"
  - Chỉ cho phép sửa: description, benefits
  - Không cho phép sửa: fees, requirements, schedule_config

---

#### AC-4 – Optimistic locking conflict
- **Tại:** Màn hình chi tiết PIM
- **Khi:** School Admin save PIM nhưng version đã bị thay đổi bởi user khác
- **Thì:**
  - Backend trả về error 409 Conflict
  - Hiển thị popup: "PIM đã được cập nhật bởi người khác. Vui lòng refresh và thử lại"
  - Nút "Refresh"
  - Không save thay đổi

**Inline Business Rule:**
- Sử dụng optimistic locking với version field
- WHERE clause: UPDATE ... WHERE id = ? AND version = ?

---

#### AC-5 – Không cho phép edit PIM với status = ARCHIVED
- **Tại:** Màn hình chi tiết PIM
- **Khi:** PIM có status = ARCHIVED
- **Thì:**
  - Không hiển thị nút "Edit"
  - Chỉ cho phép view thông tin (read-only)

---

### Business Value
- Cho phép điều chỉnh thông tin PIM khi cần thiết
- Bảo vệ tính toàn vẹn dữ liệu khi có registrations đang xử lý
- Đảm bảo đồng bộ thông tin với giáo viên khi có thay đổi

---

### Success Metrics
- Tỷ lệ update PIM thành công >= 98%
- Số lượng conflict errors < 2% tổng số update
- Thời gian trung bình để update PIM < 3 phút

---

### Dependencies
- sf-product service
- sf-web
- Kafka (PIMUpdatedEvent)
- pim_registration table (để check active registrations)

---

### Impact Analysis
- **Tác động kỹ thuật:** Trung bình - Update logic với business rules
- **Tác động nghiệp vụ:** Cao - Cần đảm bảo không làm ảnh hưởng registrations
- **Tác động UX:** Trung bình - Form edit với disabled fields

---

## US-PIM-005: Suspend/Resume PIM

### Nội dung
Là **School Admin**
Tôi muốn **tạm dừng (suspend) hoặc tiếp tục (resume) một PIM đã publish**
Tại **sf-web (School Management Portal)**
Để **tạm thời ngừng nhận đăng ký mới hoặc tiếp tục nhận đăng ký khi đã giải quyết vấn đề**

---

### Acceptance Criterias

#### AC-1 – Suspend PIM thành công
- **Tại:** Màn hình chi tiết PIM
- **Khi:** School Admin click "Suspend" trên PIM có status = PUBLISHED
- **Thì:**
  - Hiển thị popup xác nhận với lý do suspend (optional)
  - Cập nhật PIM status = SUSPENDED
  - Publish PIMSuspendedEvent lên Kafka
  - Event được gửi đến các INDIVIDUAL tenants
  - Giáo viên không thể đăng ký PIM này nữa
  - Hiển thị thông báo "PIM đã được tạm dừng"

**Inline Business Rule:**
- Chỉ PIM với status = PUBLISHED mới có thể suspend
- Không ảnh hưởng đến registrations đã tồn tại

---

#### AC-2 – Resume PIM thành công
- **Tại:** Màn hình chi tiết PIM
- **Khi:** School Admin click "Resume" trên PIM có status = SUSPENDED
- **Thì:**
  - Cập nhật PIM status = PUBLISHED
  - Publish PIMResumedEvent lên Kafka
  - Event được gửi đến các INDIVIDUAL tenants
  - Giáo viên có thể đăng ký PIM này trở lại
  - Hiển thị thông báo "PIM đã được tiếp tục"

---

#### AC-3 – Không ảnh hưởng registrations đang xử lý
- **Tại:** Backend sf-product
- **Khi:** PIM bị suspend
- **Thì:**
  - Các registrations với status khác PENDING_REVIEW vẫn tiếp tục workflow bình thường
  - Chỉ block đăng ký mới
  - Registrations đang PENDING_REVIEW vẫn có thể approve/reject

---

#### AC-4 – Hiển thị trạng thái suspended cho giáo viên
- **Tại:** INDIVIDUAL tenant, màn hình danh sách PIM
- **Khi:** Giáo viên xem danh sách PIM
- **Thì:**
  - PIM suspended hiển thị badge "Tạm dừng"
  - Nút "Đăng ký" bị disabled
  - Tooltip: "PIM này tạm thời không nhận đăng ký mới"

---

### Business Value
- Linh hoạt trong việc kiểm soát việc nhận đăng ký
- Xử lý các tình huống đặc biệt (hết chỗ, cần review, vấn đề kỹ thuật)
- Không làm gián đoạn các registrations đang xử lý

---

### Success Metrics
- Thời gian trung bình để suspend/resume PIM < 5 giây
- Tỷ lệ sync status thành công đến INDIVIDUAL tenants >= 99%

---

### Dependencies
- sf-product service
- Kafka (PIMSuspendedEvent, PIMResumedEvent)

---

### Impact Analysis
- **Tác động kỹ thuật:** Thấp - State transition đơn giản
- **Tác động nghiệp vụ:** Trung bình - Ảnh hưởng khả năng đăng ký
- **Tác động UX:** Thấp - Action buttons

---

## US-PIM-006: Archive PIM

### Nội dung
Là **School Admin**
Tôi muốn **archive một PIM không còn sử dụng**
Tại **sf-web (School Management Portal)**
Để **dọn dẹp danh sách PIM và ẩn các PIM cũ không còn hiệu lực**

---

### Acceptance Criterias

#### AC-1 – Archive PIM thành công (không có active registrations)
- **Tại:** Màn hình chi tiết PIM
- **Khi:** School Admin click "Archive" trên PIM không có registration với status IN (APPROVED, SCHEDULE_ASSIGNED, CONFIRMED, FINALIZED, ACTIVE)
- **Thì:**
  - Hiển thị popup xác nhận: "Bạn có chắc muốn archive PIM này?"
  - Cập nhật PIM status = ARCHIVED
  - Publish PIMArchivedEvent lên Kafka
  - Event được gửi đến các INDIVIDUAL tenants
  - PIM không còn hiển thị trong danh sách mặc định
  - Hiển thị thông báo "PIM đã được archive"

**Inline Business Rule:**
- Chỉ archive được khi không có active registrations
- Archive là soft delete (không xóa khỏi DB)

---

#### AC-2 – Không cho phép archive khi có active registrations
- **Tại:** Màn hình chi tiết PIM
- **Khi:** School Admin click "Archive" trên PIM có ít nhất 1 registration active
- **Thì:**
  - Hiển thị popup cảnh báo: "PIM đang có [N] đăng ký đang xử lý. Vui lòng hoàn tất hoặc hủy các đăng ký trước khi archive"
  - Liệt kê danh sách registrations active (code, teacher name, status)
  - Nút "Xem chi tiết"
  - Không cho phép archive

**Inline Business Rule:**
- Active registration statuses: APPROVED, SCHEDULE_ASSIGNED, CONFIRMED, FINALIZED, ACTIVE

---

#### AC-3 – Xem lại PIM đã archive
- **Tại:** Màn hình danh sách PIM
- **Khi:** School Admin chọn filter "ARCHIVED"
- **Thì:**
  - Hiển thị danh sách PIM đã archive
  - PIM archived là read-only
  - Không có actions (không thể edit, publish, suspend)

---

#### AC-4 – Lỗi khi archive event thất bại
- **Tại:** Backend sf-product
- **Khi:** Publish PIMArchivedEvent lên Kafka thất bại sau max retries
- **Thì:**
  - Rollback transaction (PIM vẫn giữ status cũ)
  - Log error
  - Hiển thị thông báo lỗi: "Có lỗi xảy ra khi archive PIM. Vui lòng thử lại"

---

### Business Value
- Giữ cho danh sách PIM gọn gàng và dễ quản lý
- Không làm mất dữ liệu lịch sử
- Tránh confusion cho giáo viên khi xem các PIM đã hết hạn

---

### Success Metrics
- Tỷ lệ archive thành công >= 99%
- Số lượng PIM archived tự động khi hết hạn (end_date passed)

---

### Dependencies
- sf-product service
- Kafka (PIMArchivedEvent)
- pim_registration table

---

### Impact Analysis
- **Tác động kỹ thuật:** Thấp - State transition với validation
- **Tác động nghiệp vụ:** Trung bình - Cleanup workflow
- **Tác động UX:** Thấp

---

# B. ĐĂNG KÝ PIM (INDIVIDUAL)

## US-PIM-007: Xem danh sách PIM khả dụng

### Nội dung
Là **Freelance Teacher**
Tôi muốn **xem danh sách các PIM mà các trường hợp tác đã publish**
Tại **tf-web (Teacher Portal) hoặc sf-web**
Để **tìm hiểu các cơ hội giảng dạy và đánh giá xem có phù hợp với năng lực của mình không**

---

### Acceptance Criterias

#### AC-1 – Hiển thị danh sách PIM đã được phân phối
- **Tại:** Màn hình Dashboard hoặc PIM Marketplace
- **Khi:** Freelance Teacher truy cập trang PIM
- **Thì:**
  - Hiển thị danh sách PIM với status = PUBLISHED hoặc SUSPENDED
  - Các thông tin hiển thị: Tên trường, PIM Name, Type, Start Date, End Date, Status, Commission
  - Sắp xếp mặc định: Publish Date DESC
  - PIM suspended hiển thị badge "Tạm dừng" và không cho phép đăng ký
  - Pagination: 20 items/page

**Inline Business Rule:**
- Chỉ hiển thị PIM từ các schools có partnership active với teacher
- PIM đã archive không hiển thị

---

#### AC-2 – Lọc PIM theo trạng thái
- **Tại:** Màn hình danh sách PIM
- **Khi:** Teacher chọn filter
- **Thì:**
  - Dropdown filter: Tất cả, Có thể đăng ký, Tạm dừng, Đã đăng ký
  - "Có thể đăng ký": status = PUBLISHED và teacher chưa đăng ký
  - "Đã đăng ký": Teacher đã có registration cho PIM này

---

#### AC-3 – Tìm kiếm PIM
- **Tại:** Màn hình danh sách PIM
- **Khi:** Teacher nhập keyword
- **Thì:**
  - Search trên: PIM name, description, school name
  - Case-insensitive
  - Highlight keyword

---

#### AC-4 – Xem chi tiết PIM
- **Tại:** Màn hình danh sách PIM
- **Khi:** Teacher click vào một PIM
- **Thì:**
  - Navigate đến màn hình chi tiết PIM
  - Hiển thị:
    - Thông tin cơ bản (name, type, description, dates)
    - Phí và hoa hồng
    - Yêu cầu giáo viên (qualifications, certifications, experience)
    - Cấu hình lịch (sessions, duration, time slots)
    - Ưu đãi
  - Nút "Đăng ký" nếu chưa đăng ký và PIM chưa suspend

---

#### AC-5 – Hiển thị trạng thái đã đăng ký
- **Tại:** Màn hình chi tiết PIM
- **Khi:** Teacher đã có registration cho PIM này
- **Thì:**
  - Hiển thị badge "Đã đăng ký" với status của registration
  - Nút "Xem đăng ký" thay vì "Đăng ký"
  - Link đến màn hình chi tiết registration

---

#### AC-6 – Không có PIM khả dụng
- **Tại:** Màn hình danh sách PIM
- **Khi:** Teacher không có PIM nào (chưa có partnership hoặc schools chưa publish PIM)
- **Thì:**
  - Hiển thị empty state: "Chưa có cơ hội giảng dạy nào"
  - Message: "Hãy thiết lập hợp tác với các trường để nhận thông tin về các PIM mới"

---

### Business Value
- Cung cấp marketplace minh bạch cho giáo viên tìm cơ hội giảng dạy
- Hiển thị đầy đủ thông tin để teacher đánh giá
- Tăng tỷ lệ matching giữa PIM và teacher phù hợp

---

### Success Metrics
- Thời gian load trang < 2 giây
- Tỷ lệ teacher xem chi tiết PIM / xem danh sách >= 30%
- Tỷ lệ đăng ký sau khi xem chi tiết >= 15%

---

### Dependencies
- sf-product service (INDIVIDUAL)
- tf-web hoặc sf-web
- PIM data được sync qua Kafka

---

### Impact Analysis
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao - Core discovery workflow
- **Tác động UX:** Cao

---

## US-PIM-008: Đăng ký PIM

### Nội dung
Là **Freelance Teacher**
Tôi muốn **đăng ký cung ứng giảng dạy cho một PIM**
Tại **tf-web hoặc sf-web**
Để **bắt đầu quy trình hợp tác giảng dạy với trường**

---

### Acceptance Criterias

#### AC-1 – Kiểm tra điều kiện trước khi đăng ký
- **Tại:** Màn hình chi tiết PIM
- **Khi:** Teacher click nút "Đăng ký"
- **Thì:**
  - Hệ thống validate:
    - Teacher phải có published course phù hợp với PIM
    - Partnership với school phải có status = ACTIVE
    - PIM phải có status = PUBLISHED
    - Teacher chưa có registration nào cho PIM này ở các status: PENDING_REVIEW, UPDATE_REQUESTED, APPROVED, SCHEDULE_ASSIGNED, CONFIRMED, FINALIZED, ACTIVE
  - Nếu pass validation: chuyển sang bước chọn course

**Inline Business Rule:**
- Mỗi teacher chỉ có thể có 1 registration active cho 1 PIM tại một thời điểm

---

#### AC-2 – Chọn khóa học để đăng ký
- **Tại:** Popup/Modal chọn course
- **Khi:** Teacher đã pass validation
- **Thì:**
  - Hiển thị danh sách courses của teacher với status = PUBLISHED
  - Mỗi course hiển thị: Name, Description, số lượng sessions, rating
  - Teacher chọn 1 course
  - Nút "Tiếp tục"

---

#### AC-3 – Submit đăng ký thành công (Happy Path)
- **Tại:** Popup xác nhận
- **Khi:** Teacher click "Xác nhận đăng ký"
- **Thì:**
  - Hệ thống thu thập thông tin:
    - Teacher Profile từ tf-teacher-profile
    - Teacher Availability từ tf-teacher-calendar
    - Course Details từ lf-course
  - Tạo snapshot dữ liệu tại thời điểm đăng ký
  - Tạo PIM Registration với status = PENDING_REVIEW
  - Start PIMRegistrationWorkflow trên Temporal
  - Publish PIMRegistrationCreatedEvent lên Kafka
  - Event được gửi đến PRIVATE_SCHOOL tenant
  - Hiển thị popup success: "Đăng ký thành công! Trường sẽ xem xét và phản hồi trong vòng 7 ngày"
  - Redirect đến màn hình chi tiết registration

**Inline Business Rule:**
- Registration code format: REG-{YEAR}-{SEQUENCE}
- Snapshot dữ liệu để đảm bảo consistency

---

#### AC-4 – Lỗi khi teacher chưa có published course
- **Tại:** Màn hình chi tiết PIM
- **Khi:** Teacher click "Đăng ký" nhưng chưa có course nào với status = PUBLISHED
- **Thì:**
  - Hiển thị popup: "Bạn cần tạo và publish khóa học trước khi đăng ký PIM"
  - Nút "Tạo khóa học mới"
  - Link đến course management

---

#### AC-5 – Lỗi khi đã có registration active
- **Tại:** Màn hình chi tiết PIM
- **Khi:** Teacher click "Đăng ký" nhưng đã có registration active cho PIM này
- **Thì:**
  - Hiển thị popup: "Bạn đã có đăng ký đang xử lý cho PIM này"
  - Hiển thị status của registration hiện tại
  - Nút "Xem chi tiết đăng ký"

---

#### AC-6 – Lỗi khi collect data thất bại
- **Tại:** Backend sf-product (INDIVIDUAL)
- **Khi:** Không thể lấy dữ liệu từ tf-teacher-profile, tf-teacher-calendar, hoặc lf-course sau max retries
- **Thì:**
  - Không tạo registration
  - Log error với service và exception
  - Hiển thị thông báo: "Không thể thu thập thông tin hồ sơ. Vui lòng kiểm tra hồ sơ giáo viên và thử lại"
  - Retry button

**Inline Business Rule:**
- Max retries cho mỗi service call: 3 lần
- Timeout: 30 giây

---

#### AC-7 – Lỗi khi start workflow thất bại
- **Tại:** Backend sf-product (INDIVIDUAL)
- **Khi:** Start PIMRegistrationWorkflow trên Temporal thất bại
- **Thì:**
  - Rollback registration creation
  - Log error
  - Hiển thị: "Có lỗi xảy ra khi xử lý đăng ký. Vui lòng thử lại sau"

---

### Business Value
- Tự động hóa quy trình đăng ký
- Thu thập đầy đủ thông tin để school đánh giá
- Khởi động workflow orchestration với Temporal

---

### Success Metrics
- Tỷ lệ đăng ký thành công >= 95%
- Thời gian trung bình để hoàn tất đăng ký < 2 phút
- Tỷ lệ teacher có published course >= 80%

---

### Dependencies
- sf-product service (INDIVIDUAL)
- lf-course service
- tf-teacher-profile service
- tf-teacher-calendar service
- Temporal workflow
- Kafka

---

### Impact Analysis
- **Tác động kỹ thuật:** Rất cao - Multi-service orchestration
- **Tác động nghiệp vụ:** Rất cao - Core registration workflow
- **Tác động UX:** Cao - Critical user journey

---

## US-PIM-009: Xem chi tiết Registration

### Nội dung
Là **Freelance Teacher**
Tôi muốn **xem chi tiết đăng ký PIM của mình**
Tại **tf-web hoặc sf-web**
Để **theo dõi trạng thái, xem feedback từ trường, và thực hiện các actions cần thiết**

---

### Acceptance Criterias

#### AC-1 – Hiển thị thông tin registration
- **Tại:** Màn hình chi tiết registration
- **Khi:** Teacher truy cập registration detail page
- **Thì:**
  - Hiển thị:
    - Registration code
    - PIM information (name, school name, dates)
    - Current status với timeline
    - Course information (snapshot)
    - Teacher profile snapshot
    - Submitted date
    - School feedback (nếu có)
  - Actions tùy theo status

**Inline Business Rule:**
- Timeline hiển thị lịch sử status transitions với timestamps

---

#### AC-2 – Actions theo status PENDING_REVIEW
- **Tại:** Màn hình chi tiết registration
- **Khi:** Registration có status = PENDING_REVIEW
- **Thì:**
  - Hiển thị: "Đang chờ trường xem xét"
  - Nút "Rút đơn" (Withdraw)

---

#### AC-3 – Actions theo status UPDATE_REQUESTED
- **Tại:** Màn hình chi tiết registration
- **Khi:** Registration có status = UPDATE_REQUESTED
- **Thì:**
  - Hiển thị school feedback
  - Nút "Cập nhật hồ sơ"
  - Nút "Rút đơn"

---

#### AC-4 – Actions theo status APPROVED
- **Tại:** Màn hình chi tiết registration
- **Khi:** Registration có status = APPROVED
- **Thì:**
  - Hiển thị: "Đã được chấp thuận. Đang chờ trường sắp xếp lịch"
  - Không có actions

---

#### AC-5 – Actions theo status SCHEDULE_ASSIGNED
- **Tại:** Màn hình chi tiết registration
- **Khi:** Registration có status = SCHEDULE_ASSIGNED
- **Thì:**
  - Hiển thị lịch dạy dự kiến (tentative schedule)
  - Thông tin: start date, end date, time slots, estimated students
  - Confirmation deadline
  - Countdown timer đến deadline
  - 3 buttons: "Xác nhận", "Đề xuất thay đổi", "Từ chối"

---

#### AC-6 – Hiển thị status REJECTED
- **Tại:** Màn hình chi tiết registration
- **Khi:** Registration có status = REJECTED
- **Thì:**
  - Hiển thị: "Đã bị từ chối"
  - Hiển thị lý do từ trường
  - Không có actions
  - Badge màu đỏ

---

### Business Value
- Transparency trong quá trình xử lý
- Teacher có thể theo dõi và hành động kịp thời
- Giảm số lượng inquiry manual

---

### Success Metrics
- Tỷ lệ teacher check registration status >= 3 lần/registration
- Thời gian phản hồi schedule < 24 giờ sau khi assigned

---

### Dependencies
- sf-product service (INDIVIDUAL)
- tf-web hoặc sf-web
- registration_status_history table

---

### Impact Analysis
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động UX:** Rất cao

---

## US-PIM-010: Resubmit Registration

### Nội dung
Là **Freelance Teacher**
Tôi muốn **cập nhật và gửi lại đăng ký sau khi nhận yêu cầu cập nhật từ trường**
Tại **tf-web hoặc sf-web**
Để **khắc phục các vấn đề mà trường yêu cầu và tiếp tục quy trình đăng ký**

---

### Acceptance Criterias

#### AC-1 – Xem feedback từ trường
- **Tại:** Màn hình chi tiết registration với status = UPDATE_REQUESTED
- **Khi:** Teacher truy cập registration
- **Thì:**
  - Hiển thị school feedback rõ ràng
  - Highlight các điểm cần cập nhật
  - Nút "Cập nhật hồ sơ"

---

#### AC-2 – Cập nhật thông tin và resubmit thành công
- **Tại:** Popup/Modal update
- **Khi:** Teacher click "Cập nhật hồ sơ", chỉnh sửa thông tin cần thiết và click "Gửi lại"
- **Thì:**
  - Thu thập lại dữ liệu mới:
    - Teacher Profile (nếu có update)
    - Teacher Availability (nếu có update)
    - Course Details (nếu có update)
  - Tạo snapshot mới
  - Cập nhật registration status = PENDING_REVIEW
  - Update submission_data với dữ liệu mới
  - Signal Temporal workflow: RegistrationResubmitted
  - Publish PIMRegistrationResubmittedEvent lên Kafka
  - Hiển thị: "Đã gửi lại đăng ký thành công. Trường sẽ xem xét lại"
  - Refresh màn hình chi tiết registration

**Inline Business Rule:**
- Tạo mới snapshot thay vì update snapshot cũ (audit trail)
- Increment version

---

#### AC-3 – Không cho phép resubmit nếu status không phải UPDATE_REQUESTED
- **Tại:** Màn hình chi tiết registration
- **Khi:** Registration có status khác UPDATE_REQUESTED
- **Thì:**
  - Không hiển thị nút "Cập nhật hồ sơ"

---

#### AC-4 – Lỗi khi collect data thất bại
- **Tại:** Backend
- **Khi:** Không thể thu thập dữ liệu mới sau max retries
- **Thì:**
  - Không update registration
  - Log error
  - Hiển thị: "Không thể thu thập thông tin mới. Vui lòng kiểm tra hồ sơ và thử lại"

---

### Business Value
- Cho phép teacher khắc phục vấn đề và tiếp tục workflow
- Giảm tỷ lệ registration bị reject
- Tăng chất lượng registrations

---

### Success Metrics
- Tỷ lệ resubmit thành công sau UPDATE_REQUESTED >= 80%
- Thời gian trung bình để resubmit < 48 giờ
- Tỷ lệ approval sau resubmit >= 70%

---

### Dependencies
- sf-product service (INDIVIDUAL)
- Temporal workflow (signal)
- Kafka
- tf-teacher-profile, tf-teacher-calendar, lf-course

---

### Impact Analysis
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động UX:** Cao

---

## US-PIM-011: Withdraw Registration

### Nội dung
Là **Freelance Teacher**
Tôi muốn **rút đơn đăng ký PIM**
Tại **tf-web hoặc sf-web**
Để **hủy đăng ký khi tôi không còn muốn hoặc không thể tham gia giảng dạy**

---

### Acceptance Criterias

#### AC-1 – Withdraw thành công từ status PENDING_REVIEW hoặc UPDATE_REQUESTED
- **Tại:** Màn hình chi tiết registration
- **Khi:** Teacher click "Rút đơn" trên registration với status IN (PENDING_REVIEW, UPDATE_REQUESTED)
- **Thì:**
  - Hiển thị popup xác nhận: "Bạn có chắc muốn rút đơn đăng ký?"
  - Textarea nhập lý do (optional)
  - Nút "Xác nhận" và "Hủy"
  - Sau khi xác nhận:
    - Cập nhật registration status = WITHDRAWN
    - Lưu reason vào teacher_feedback
    - Signal Temporal workflow: RegistrationWithdrawn
    - Publish RegistrationWithdrawnEvent
    - Hiển thị: "Đã rút đơn đăng ký thành công"

**Inline Business Rule:**
- Chỉ có thể withdraw từ status: PENDING_REVIEW, UPDATE_REQUESTED

---

#### AC-2 – Không cho phép withdraw từ các status khác
- **Tại:** Màn hình chi tiết registration
- **Khi:** Registration có status IN (APPROVED, SCHEDULE_ASSIGNED, CONFIRMED, FINALIZED, ACTIVE)
- **Thì:**
  - Không hiển thị nút "Rút đơn"
  - Nếu teacher muốn hủy: hiển thị message "Vui lòng liên hệ trường để thương lượng việc hủy"

---

#### AC-3 – Hiển thị confirmation consequence
- **Tại:** Popup xác nhận withdraw
- **Khi:** Teacher click "Rút đơn"
- **Thì:**
  - Hiển thị warning: "Việc rút đơn sẽ kết thúc quy trình đăng ký. Bạn có thể đăng ký lại sau nếu PIM vẫn còn khả dụng"

---

### Business Value
- Cho phép teacher linh hoạt trong quyết định
- Giải phóng slot cho teachers khác
- Giảm thời gian xử lý cho các registrations không có ý nghĩa

---

### Success Metrics
- Tỷ lệ withdraw < 10% tổng số registrations
- Thời gian trung bình để withdraw < 1 phút

---

### Dependencies
- sf-product service (INDIVIDUAL)
- Temporal workflow
- Kafka

---

### Impact Analysis
- **Tác động kỹ thuật:** Thấp
- **Tác động nghiệp vụ:** Trung bình
- **Tác động UX:** Thấp

---

# C. PHÊ DUYỆT REGISTRATION (PRIVATE_SCHOOL)

## US-PIM-012: Xem danh sách Registrations

### Nội dung
Là **School Admin hoặc Academic Manager**
Tôi muốn **xem danh sách các đăng ký PIM từ giáo viên**
Tại **sf-web (School Management Portal)**
Để **theo dõi và quản lý các đăng ký đang chờ xử lý**

---

### Acceptance Criterias

#### AC-1 – Hiển thị danh sách registrations
- **Tại:** Màn hình danh sách registrations
- **Khi:** School Admin/Academic Manager truy cập
- **Thì:**
  - Hiển thị bảng registrations với các cột:
    - Registration Code
    - PIM Name
    - Teacher Name
    - Submitted Date
    - Status
    - Actions
  - Sắp xếp mặc định: Submitted Date DESC
  - Pagination: 20 items/page

---

#### AC-2 – Filter registrations theo status
- **Tại:** Màn hình danh sách
- **Khi:** User chọn filter
- **Thì:**
  - Dropdown: Tất cả, Chờ xem xét, Đã chấp thuận, Đã từ chối, Chờ lịch, Đã xác nhận, Đã hoàn tất, Đang hoạt động
  - Mapping:
    - Chờ xem xét: PENDING_REVIEW
    - Đã chấp thuận: APPROVED
    - Đã từ chối: REJECTED
    - Chờ lịch: SCHEDULE_ASSIGNED
    - Đã xác nhận: CONFIRMED
    - Đã hoàn tất: FINALIZED
    - Đang hoạt động: ACTIVE

---

#### AC-3 – Filter theo PIM
- **Tại:** Màn hình danh sách
- **Khi:** User chọn filter theo PIM
- **Thì:**
  - Dropdown danh sách PIMs của trường
  - Lọc registrations theo PIM được chọn

---

#### AC-4 – Tìm kiếm registration
- **Tại:** Màn hình danh sách
- **Khi:** User nhập keyword
- **Thì:**
  - Search trên: registration code, teacher name, PIM name

---

#### AC-5 – Badge và priority
- **Tại:** Màn hình danh sách
- **Khi:** Hiển thị registrations
- **Thì:**
  - Registrations với status = PENDING_REVIEW có badge "Mới"
  - Registrations gần deadline confirmation có badge "Gấp"
  - Color coding theo status

---

### Business Value
- Centralized view cho tất cả registrations
- Hỗ trợ prioritization
- Tăng tốc độ xử lý

---

### Success Metrics
- Thời gian load page < 2 giây
- Tỷ lệ sử dụng filter >= 50%

---

### Dependencies
- sf-product service (PRIVATE_SCHOOL)
- sf-web

---

### Impact Analysis
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động UX:** Cao

---

## US-PIM-013: Review và Approve Registration

### Nội dung
Là **School Admin**
Tôi muốn **xem xét và chấp thuận đăng ký PIM từ giáo viên**
Tại **sf-web (School Management Portal)**
Để **chọn giáo viên phù hợp cho PIM và tiến hành bước tiếp theo trong workflow**

---

### Acceptance Criterias

#### AC-1 – Xem chi tiết registration để review
- **Tại:** Màn hình chi tiết registration
- **Khi:** School Admin truy cập registration với status = PENDING_REVIEW
- **Thì:**
  - Hiển thị đầy đủ thông tin:
    - PIM information
    - Teacher profile snapshot (qualifications, certifications, experience, rating)
    - Teacher availability
    - Course details snapshot (curriculum, materials)
    - Submitted date
  - So sánh teacher requirements vs teacher profile (highlight match/mismatch)
  - Actions: "Chấp thuận", "Yêu cầu cập nhật", "Từ chối"

---

#### AC-2 – Approve registration thành công
- **Tại:** Màn hình chi tiết registration
- **Khi:** School Admin click "Chấp thuận"
- **Thì:**
  - Hiển thị popup xác nhận
  - Sau khi xác nhận:
    - Cập nhật registration status = APPROVED
    - Lưu approved_at timestamp
    - Lưu approved_by user ID
    - Signal Temporal workflow: RegistrationApproved
    - Start SchedulingTimer (X days theo PIM config)
    - Publish RegistrationApprovedEvent lên Kafka
    - Event được gửi đến INDIVIDUAL tenant
    - Notification gửi đến teacher: "Đăng ký của bạn đã được chấp thuận"
    - Hiển thị: "Đã chấp thuận đăng ký. Vui lòng sắp xếp lịch dạy"
    - Navigate đến màn hình schedule assignment

**Inline Business Rule:**
- Chỉ School Admin mới có quyền approve
- Approval triggers scheduling workflow

---

#### AC-3 – Không cho phép approve khi status không phải PENDING_REVIEW
- **Tại:** Màn hình chi tiết registration
- **Khi:** Registration có status khác PENDING_REVIEW
- **Thì:**
  - Nút "Chấp thuận" bị disabled hoặc không hiển thị

---

#### AC-4 – Lỗi khi signal workflow thất bại
- **Tại:** Backend
- **Khen:** Signal RegistrationApproved đến Temporal thất bại
- **Thì:**
  - Rollback status change
  - Log error
  - Hiển thị: "Có lỗi xảy ra khi xử lý chấp thuận. Vui lòng thử lại"

---

### Business Value
- Cho phép trường kiểm soát chất lượng giáo viên
- Đảm bảo teacher match với requirements
- Khởi động scheduling workflow

---

### Success Metrics
- Thời gian trung bình để approve một registration < 30 phút
- Tỷ lệ approval / total reviews >= 60%

---

### Dependencies
- sf-product service (PRIVATE_SCHOOL)
- Temporal workflow
- Kafka
- sf-notification-client

---

### Impact Analysis
- **Tác động kỹ thuật:** Cao
- **Tác động nghiệp vụ:** Rất cao - Critical approval gate
- **Tác động UX:** Cao

---

## US-PIM-014: Request Update Registration

### Nội dung
Là **School Admin**
Tôi muốn **yêu cầu giáo viên cập nhật thông tin đăng ký**
Tại **sf-web (School Management Portal)**
Để **yêu cầu giáo viên bổ sung hoặc chỉnh sửa thông tin trước khi quyết định chấp thuận hay từ chối**

---

### Acceptance Criterias

#### AC-1 – Request update thành công
- **Tại:** Màn hình chi tiết registration
- **Khi:** School Admin click "Yêu cầu cập nhật" trên registration với status = PENDING_REVIEW
- **Thì:**
  - Hiển thị popup với textarea nhập feedback
  - Feedback bắt buộc (min 10 ký tự)
  - Nút "Gửi yêu cầu" và "Hủy"
  - Sau khi gửi:
    - Cập nhật registration status = UPDATE_REQUESTED
    - Lưu feedback vào school_feedback
    - Signal Temporal workflow: UpdateRequested
    - Publish UpdateRequestedEvent
    - Notification gửi đến teacher với feedback
    - Hiển thị: "Đã gửi yêu cầu cập nhật đến giáo viên"

**Inline Business Rule:**
- Feedback tối thiểu 10 ký tự
- Phải rõ ràng những gì cần update

---

#### AC-2 – Placeholder và suggestion cho feedback
- **Tại:** Popup request update
- **Khi:** School Admin nhập feedback
- **Thì:**
  - Placeholder: "Vui lòng mô tả rõ những thông tin cần cập nhật..."
  - Suggestions:
    - "Bổ sung chứng chỉ [...]"
    - "Cập nhật lịch khả dụng"
    - "Cập nhật giáo trình chi tiết hơn"

---

#### AC-3 – Validation feedback
- **Tại:** Popup request update
- **Khi:** School Admin click "Gửi yêu cầu" với feedback < 10 ký tự
- **Thì:**
  - Hiển thị error: "Vui lòng nhập ít nhất 10 ký tự mô tả yêu cầu cập nhật"
  - Không cho phép submit

---

### Business Value
- Cho phép teacher khắc phục vấn đề thay vì reject ngay
- Tăng tỷ lệ registration thành công
- Cải thiện chất lượng dữ liệu

---

### Success Metrics
- Tỷ lệ request update / total reviews <= 20%
- Tỷ lệ resubmit sau request update >= 80%

---

### Dependencies
- sf-product service (PRIVATE_SCHOOL)
- Temporal workflow
- Kafka
- sf-notification-client

---

### Impact Analysis
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động UX:** Trung bình

---

## US-PIM-015: Reject Registration

### Nội dung
Là **School Admin**
Tôi muốn **từ chối đăng ký PIM từ giáo viên**
Tại **sf-web (School Management Portal)**
Để **loại bỏ các đăng ký không phù hợp và kết thúc workflow**

---

### Acceptance Criterias

#### AC-1 – Reject registration thành công
- **Tại:** Màn hình chi tiết registration
- **Khi:** School Admin click "Từ chối" trên registration với status = PENDING_REVIEW
- **Thì:**
  - Hiển thị popup xác nhận
  - Textarea nhập lý do từ chối (bắt buộc, min 10 ký tự)
  - Nút "Xác nhận từ chối" và "Hủy"
  - Sau khi xác nhận:
    - Cập nhật registration status = REJECTED
    - Lưu reason vào school_feedback
    - Signal Temporal workflow: RegistrationRejected (terminate workflow)
    - Publish RegistrationRejectedEvent
    - Notification gửi đến teacher với reason
    - Hiển thị: "Đã từ chối đăng ký"

**Inline Business Rule:**
- Reason bắt buộc, min 10 ký tự
- Reject là terminal state - không thể revert

---

#### AC-2 – Confirmation với consequence
- **Tại:** Popup confirm reject
- **Khi:** School Admin click "Từ chối"
- **Thì:**
  - Warning message: "Việc từ chối sẽ kết thúc quy trình đăng ký. Giáo viên có thể đăng ký lại nếu khắc phục được vấn đề"
  - Checkbox: "Tôi xác nhận muốn từ chối đăng ký này"

---

#### AC-3 – Common rejection reasons
- **Tại:** Popup reject
- **Khi:** School Admin nhập reason
- **Thì:**
  - Dropdown quick select với các lý do phổ biến:
    - "Không đủ trình độ yêu cầu"
    - "Thiếu chứng chỉ bắt buộc"
    - "Lịch không phù hợp"
    - "Giáo trình không đáp ứng"
    - "Khác (nhập thủ công)"

---

### Business Value
- Cho phép trường kiểm soát chất lượng
- Cung cấp feedback rõ ràng cho teacher
- Giải phóng resources cho registrations khác

---

### Success Metrics
- Tỷ lệ rejection / total reviews <= 20%
- Tỷ lệ resubmit sau rejection >= 30%

---

### Dependencies
- sf-product service (PRIVATE_SCHOOL)
- Temporal workflow
- Kafka
- sf-notification-client

---

### Impact Analysis
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động UX:** Trung bình

---

## US-PIM-016: Assign Schedule cho Registration

### Nội dung
Là **Academic Manager**
Tôi muốn **lập lịch dạy dự kiến và gán cho registration đã được chấp thuận**
Tại **sf-web (School Management Portal)**
Để **đề xuất lịch cụ thể cho giáo viên xác nhận**

---

### Acceptance Criterias

#### AC-1 – Tạo tentative schedule
- **Tại:** Màn hình schedule management cho registration
- **Khi:** Academic Manager truy cập registration với status = APPROVED
- **Thì:**
  - Hiển thị form tạo schedule:
    - Start Date (datepicker, >= PIM start date)
    - End Date (datepicker, <= PIM end date)
    - Time slots (chọn từ teacher availability và PIM config)
    - Estimated students (number input)
  - Validate:
    - Start date < End date
    - Time slots match với teacher availability
    - Tổng sessions đủ theo PIM config
  - Hiển thị preview lịch (calendar view)

---

#### AC-2 – Assign schedule thành công
- **Tại:** Màn hình schedule management
- **Khi:** Academic Manager click "Gán lịch" sau khi điền đầy đủ thông tin hợp lệ
- **Thì:**
  - Tạo record trong registration_schedule với:
    - schedule_type = TENTATIVE
    - status = PROPOSED
    - time_slots (JSON)
  - Cập nhật registration status = SCHEDULE_ASSIGNED
  - Signal Temporal workflow: ScheduleAssigned
  - Publish ScheduleAssignedEvent
  - Event được gửi đến INDIVIDUAL tenant
  - Notification gửi đến teacher: "Lịch dạy dự kiến đã được gửi. Vui lòng xác nhận trước [deadline]"
  - Hiển thị: "Đã gán lịch thành công. Đang chờ giáo viên xác nhận"

**Inline Business Rule:**
- Schedule type = TENTATIVE (chưa chính thức)
- Teacher có X ngày để confirm (theo PIM config)
- Countdown timer bắt đầu

---

#### AC-3 – Conflict detection với teacher availability
- **Tại:** Form tạo schedule
- **Khi:** Academic Manager chọn time slots
- **Thì:**
  - Hệ thống check time slots có nằm trong teacher availability không
  - Nếu có conflict: highlight và warning "Khung giờ này không nằm trong lịch khả dụng của giáo viên"
  - Cho phép override với confirmation

---

#### AC-4 – Tính toán số sessions tự động
- **Tại:** Form tạo schedule
- **Khi:** Academic Manager nhập start date, end date, time slots
- **Thì:**
  - Tự động tính tổng số sessions dựa trên:
    - Sessions per week (từ PIM config)
    - Số tuần từ start đến end date
  - Hiển thị: "Tổng: [N] buổi / [M] buổi yêu cầu"
  - Validation: N phải >= M

---

#### AC-5 – Calendar view preview
- **Tại:** Form tạo schedule
- **Khi:** Academic Manager nhập thông tin
- **Thì:**
  - Hiển thị preview dạng calendar
  - Mark các ngày có lịch dạy
  - Hiển thị time slots trên từng ngày

---

#### AC-6 – Lỗi khi chưa có approval
- **Tại:** Màn hình schedule management
- **Khi:** Registration có status khác APPROVED
- **Thì:**
  - Không cho phép assign schedule
  - Hiển thị message: "Chỉ có thể gán lịch cho đăng ký đã được chấp thuận"

---

### Business Value
- Cụ thể hóa lịch dạy từ yêu cầu abstract
- Đảm bảo lịch phù hợp với availability
- Trigger confirmation workflow

---

### Success Metrics
- Thời gian trung bình để assign schedule sau approval < 48 giờ
- Tỷ lệ schedule được teacher confirm ngay lần đầu >= 70%

---

### Dependencies
- sf-product service (PRIVATE_SCHOOL)
- tf-class-management service
- tf-teacher-calendar service (INDIVIDUAL) - để lấy availability
- Temporal workflow
- Kafka

---

### Impact Analysis
- **Tác động kỹ thuật:** Cao - Calendar logic, conflict detection
- **Tác động nghiệp vụ:** Rất cao - Core scheduling workflow
- **Tác động UX:** Cao - Complex form với calendar UI

---

# D. XÁC NHẬN LỊCH DẠY (INDIVIDUAL)

## US-PIM-017: Confirm Schedule

### Nội dung
Là **Freelance Teacher**
Tôi muốn **xác nhận lịch dạy dự kiến mà trường đã gửi**
Tại **tf-web hoặc sf-web**
Để **chấp thuận lịch và tiến hành bước finalization**

---

### Acceptance Criterias

#### AC-1 – Xem schedule chi tiết
- **Tại:** Màn hình chi tiết registration với status = SCHEDULE_ASSIGNED
- **Khi:** Teacher truy cập
- **Thì:**
  - Hiển thị tentative schedule:
    - Start date, End date
    - Time slots (calendar view)
    - Estimated students
    - Total sessions
  - Confirmation deadline với countdown timer
  - 3 buttons: "Xác nhận", "Đề xuất thay đổi", "Từ chối"

---

#### AC-2 – Confirm schedule thành công
- **Tại:** Màn hình chi tiết registration
- **Khi:** Teacher click "Xác nhận"
- **Thì:**
  - Hiển thị popup xác nhận: "Bạn có chắc muốn xác nhận lịch dạy này?"
  - Warning: "Sau khi xác nhận, lịch sẽ được block trong calendar của bạn"
  - Sau khi confirm:
    - Cập nhật registration status = CONFIRMED
    - Cập nhật schedule status = ACCEPTED
    - Signal Temporal workflow: TeacherConfirmed
    - Publish TeacherConfirmedEvent
    - Event được gửi đến PRIVATE_SCHOOL tenant
    - Notification gửi đến school: "Giáo viên [Name] đã xác nhận lịch dạy"
    - Hiển thị: "Đã xác nhận lịch thành công. Chờ trường hoàn tất thủ tục"

**Inline Business Rule:**
- Chỉ có thể confirm trước confirmation deadline
- Confirm triggers finalization workflow

---

#### AC-3 – Không cho phép confirm sau deadline
- **Tại:** Màn hình chi tiết registration
- **Khi:** Confirmation deadline đã qua
- **Thì:**
  - Nút "Xác nhận" bị disabled
  - Hiển thị message: "Đã hết hạn xác nhận. Vui lòng liên hệ trường"
  - Registration status tự động chuyển sang DECLINED (bởi Temporal timer)

**Inline Business Rule:**
- Temporal timer tự động decline nếu không confirm trước deadline

---

#### AC-4 – Calendar overlay check
- **Tại:** Màn hình schedule detail
- **Khi:** Teacher xem schedule
- **Thì:**
  - Hệ thống check schedule có conflict với lịch hiện tại không (tf-teacher-calendar)
  - Nếu có conflict: warning "Lịch này trùng với các lịch khác của bạn: [list]"
  - Cho phép proceed với confirmation

---

### Business Value
- Teacher commit với lịch dạy cụ thể
- Trigger finalization và class creation
- Đảm bảo availability

---

### Success Metrics
- Tỷ lệ confirm / schedule assigned >= 70%
- Thời gian trung bình để confirm sau khi nhận lịch < 24 giờ

---

### Dependencies
- sf-product service (INDIVIDUAL)
- tf-teacher-calendar service
- Temporal workflow
- Kafka

---

### Impact Analysis
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Rất cao - Critical commitment point
- **Tác động UX:** Cao

---

## US-PIM-018: Negotiate Schedule

### Nội dung
Là **Freelance Teacher**
Tôi muốn **đề xuất thay đổi lịch dạy**
Tại **tf-web hoặc sf-web**
Để **thương lượng lịch phù hợp hơn với tôi trước khi xác nhận**

---

### Acceptance Criterias

#### AC-1 – Mở màn hình negotiate
- **Tại:** Màn hình chi tiết registration với status = SCHEDULE_ASSIGNED
- **Khi:** Teacher click "Đề xuất thay đổi"
- **Thì:**
  - Hiển thị modal/page negotiate schedule
  - Hiển thị lịch hiện tại (read-only)
  - Form đề xuất thay đổi:
    - Textarea mô tả đề xuất
    - Proposed time slots (optional - calendar picker)
    - Proposed start/end date (optional)

---

#### AC-2 – Submit negotiation thành công
- **Tại:** Màn hình negotiate
- **Khi:** Teacher nhập đề xuất và click "Gửi đề xuất"
- **Thì:**
  - Validate: mô tả tối thiểu 10 ký tự
  - Cập nhật registration status = NEGOTIATING
  - Tạo record trong registration_negotiation:
    - negotiation_round (tăng dần)
    - initiator_type = TEACHER
    - proposed_changes (JSON)
    - response_status = PENDING
  - Signal Temporal workflow: TeacherNegotiated
  - Publish ScheduleNegotiationEvent
  - Event được gửi đến PRIVATE_SCHOOL tenant
  - Notification gửi đến school: "Giáo viên đề xuất thay đổi lịch"
  - Hiển thị: "Đã gửi đề xuất thành công. Chờ trường phản hồi"

**Inline Business Rule:**
- Max 3 negotiation rounds
- Negotiation deadline: 3 ngày

---

#### AC-3 – Không cho phép negotiate quá số lần quy định
- **Tại:** Màn hình chi tiết registration
- **Khi:** Registration đã có >= 3 negotiation rounds
- **Thì:**
  - Nút "Đề xuất thay đổi" bị disabled
  - Message: "Đã đạt giới hạn số lần thương lượng. Vui lòng xác nhận hoặc từ chối"

---

#### AC-4 – Quick suggestions
- **Tại:** Form negotiate
- **Khi:** Teacher nhập đề xuất
- **Thì:**
  - Quick select:
    - "Muốn dời start date đến [datepicker]"
    - "Muốn thay đổi khung giờ [timepicker]"
    - "Muốn giảm số buổi/tuần"

---

### Business Value
- Tăng flexibility trong scheduling
- Giảm tỷ lệ decline
- Tối ưu hóa match giữa school và teacher

---

### Success Metrics
- Tỷ lệ negotiate / schedule assigned <= 30%
- Tỷ lệ thành công sau negotiate >= 60%

---

### Dependencies
- sf-product service (INDIVIDUAL)
- Temporal workflow
- Kafka
- registration_negotiation table

---

### Impact Analysis
- **Tác động kỹ thuật:** Trung bình
- **Tác động nghiệp vụ:** Cao
- **Tác động UX:** Cao

---

## US-PIM-019: Decline Schedule

### Nội dung
Là **Freelance Teacher**
Tôi muốn **từ chối lịch dạy mà trường đã gửi**
Tại **tf-web hoặc sf-web**
Để **kết thúc registration khi lịch không phù hợp và không thể thương lượng**

---

### Acceptance Criterias

#### AC-1 – Decline schedule thành công
- **Tại:** Màn hình chi tiết registration với status = SCHEDULE_ASSIGNED hoặc NEGOTIATING
- **Khi:** Teacher click "Từ chối"
- **Thì:**
  - Hiển thị popup xác nhận
  - Textarea nhập lý do (bắt buộc, min 10 ký tự)
  - Warning: "Việc từ chối sẽ kết thúc quy trình đăng ký này"
  - Sau khi confirm:
    - Cập nhật registration status = DECLINED
    - Lưu reason vào teacher_feedback
    - Signal Temporal workflow: TeacherDeclined (terminate)
    - Publish TeacherDeclinedEvent
    - Event được gửi đến PRIVATE_SCHOOL tenant
    - Notification gửi đến school với reason
    - Hiển thị: "Đã từ chối lịch dạy"

**Inline Business Rule:**
- DECLINED là terminal state
- Reason bắt buộc

---

#### AC-2 – Common decline reasons
- **Tại:** Popup decline
- **Khi:** Teacher nhập reason
- **Thì:**
  - Quick select:
    - "Lịch trùng với cam kết khác"
    - "Khung giờ không phù hợp"
    - "Số buổi quá nhiều"
    - "Thời gian quá gấp"
    - "Khác (nhập thủ công)"

---

### Business Value
- Cho phép teacher từ chối khi không phù hợp
- Giải phóng slot cho teachers khác
- Cung cấp feedback cho school

---

### Success Metrics
- Tỷ lệ decline / schedule assigned <= 15%

---

### Dependencies
- sf-product service (INDIVIDUAL)
- Temporal workflow
- Kafka

---

### Impact Analysis
- **Tác động kỹ thuật:** Thấp
- **Tác động nghiệp vụ:** Trung bình
- **Tác động UX:** Thấp

---

# E. FINALIZE VÀ ACTIVATE (PRIVATE_SCHOOL)

## US-PIM-020: Finalize Registration và tạo lớp học

### Nội dung
Là **School Admin**
Tôi muốn **hoàn tất (finalize) registration sau khi giáo viên đã xác nhận lịch**
Tại **sf-web (School Management Portal)**
Để **tạo lớp học chính thức, đồng bộ lịch, và kích hoạt registration**

---

### Acceptance Criterias

#### AC-1 – Finalize registration thành công
- **Tại:** Màn hình chi tiết registration với status = CONFIRMED
- **Khi:** School Admin click "Hoàn tất"
- **Thì:**
  - Hiển thị popup xác nhận với checklist:
    - ✓ Giáo viên đã xác nhận lịch
    - ✓ Thông tin học sinh đã đủ
    - Nhập số học sinh thực tế (actual_students)
  - Sau khi confirm:
    - Cập nhật registration status = FINALIZED
    - Lưu finalized_at timestamp
    - Cập nhật schedule: schedule_type = OFFICIAL, actual_students
    - Tạo lớp học chính thức qua tf-class-management (classes)
    - Signal Temporal workflow: RegistrationFinalized
    - Publish RegistrationFinalizedEvent
    - Event được gửi đến INDIVIDUAL tenant
    - Đồng bộ lịch chính thức vào tf-teacher-calendar (INDIVIDUAL) - block time slots
    - Cập nhật registration status = ACTIVE
    - Publish RegistrationActivatedEvent
    - Notification gửi đến teacher: "Lịch dạy đã được hoàn tất. Lớp học: [Class names]"
    - Hiển thị: "Đã hoàn tất đăng ký và tạo lớp học thành công"

**Inline Business Rule:**
- Chỉ finalize được khi status = CONFIRMED
- Actual students có thể khác estimated students
- Tạo N classes tùy theo số lượng groups/sections

---

#### AC-2 – Validation trước khi finalize
- **Tại:** Backend
- **Khi:** School Admin finalize
- **Thì:**
  - Validate:
    - Registration status = CONFIRMED
    - Actual students > 0
    - PIM vẫn active
    - Teacher calendar vẫn available (check conflicts)
  - Nếu có lỗi: không cho phép finalize, hiển thị message cụ thể

---

#### AC-3 – Tạo classes
- **Tại:** Backend sf-product, call tf-class-management
- **Khi:** Finalize registration
- **Thì:**
  - Tạo classes với thông tin:
    - Class name (auto-generated hoặc manual input)
    - PIM ID
    - Registration ID
    - Teacher ID (cross-tenant reference)
    - Schedule (official)
    - Students (actual count)
  - Return class IDs
  - Lưu class IDs vào registration metadata

---

#### AC-4 – Sync calendar
- **Tại:** Backend sf-product (PS), publish event đến INDIVIDUAL
- **Khi:** Classes đã được tạo
- **Thì:**
  - tf-teacher-calendar (INDIVIDUAL) nhận RegistrationFinalizedEvent
  - Block các time slots trong official schedule
  - Đánh dấu as "PIM Class - [PIM Name]"
  - Teacher không thể book time slots này cho việc khác

---

#### AC-5 – Không cho phép finalize khi status không phải CONFIRMED
- **Tại:** Màn hình chi tiết registration
- **Khi:** Registration có status khác CONFIRMED
- **Thì:**
  - Nút "Hoàn tất" bị disabled
  - Tooltip: "Chỉ có thể hoàn tất sau khi giáo viên xác nhận lịch"

---

#### AC-6 – Rollback khi tạo classes thất bại
- **Tại:** Backend
- **Khi:** Call tf-class-management thất bại
- **Thì:**
  - Rollback status changes
  - Không publish events
  - Log error
  - Hiển thị: "Có lỗi khi tạo lớp học. Vui lòng thử lại"
  - Retry mechanism

**Inline Business Rule:**
- Sử dụng distributed transaction hoặc saga pattern
- Rollback nếu bất kỳ step nào thất bại

---

### Business Value
- Chuyển từ planning sang execution
- Tạo lớp học chính thức
- Đảm bảo calendar sync
- Kích hoạt toàn bộ learning workflow

---

### Success Metrics
- Tỷ lệ finalize thành công >= 95%
- Thời gian trung bình để finalize sau confirm < 48 giờ
- Tỷ lệ calendar sync thành công >= 99%

---

### Dependencies
- sf-product service (PRIVATE_SCHOOL)
- tf-class-management service
- tf-teacher-calendar service (INDIVIDUAL)
- Temporal workflow
- Kafka

---

### Impact Analysis
- **Tác động kỹ thuật:** Rất cao - Multi-service orchestration, distributed transaction
- **Tác động nghiệp vụ:** Rất cao - Critical activation step
- **Tác động UX:** Cao

---

## US-PIM-021: Terminate Registration sớm

### Nội dung
Là **School Admin**
Tôi muốn **kết thúc (terminate) registration đang ACTIVE trước thời hạn**
Tại **sf-web (School Management Portal)**
Để **xử lý các trường hợp đặc biệt như giáo viên không thể tiếp tục, vi phạm hợp đồng, hoặc vấn đề khác**

---

### Acceptance Criterias

#### AC-1 – Terminate registration thành công
- **Tại:** Màn hình chi tiết registration với status = ACTIVE
- **Khi:** School Admin click "Kết thúc sớm"
- **Thì:**
  - Hiển thị popup xác nhận nghiêm trọng (red theme)
  - Warning: "Hành động này sẽ kết thúc lớp học và giải phóng lịch giáo viên. Không thể hoàn tác"
  - Textarea nhập lý do (bắt buộc, min 20 ký tự)
  - Checkbox: "Tôi hiểu hậu quả và xác nhận muốn kết thúc"
  - Sau khi confirm:
    - Cập nhật registration status = TERMINATED
    - Lưu reason và terminated_at
    - Update classes status = TERMINATED
    - Publish RegistrationTerminatedEvent
    - Event được gửi đến INDIVIDUAL tenant
    - tf-teacher-calendar unblock các time slots còn lại
    - Notification gửi đến teacher với reason
    - Hiển thị: "Đã kết thúc registration"

**Inline Business Rule:**
- Chỉ admin có quyền terminate
- TERMINATED là terminal state
- Reason bắt buộc và chi tiết

---

#### AC-2 – Confirmation với consequences
- **Tại:** Popup terminate
- **Khi:** School Admin click "Kết thúc sớm"
- **Thì:**
  - Hiển thị các consequences:
    - Classes sẽ bị đóng
    - Students sẽ phải chuyển lớp
    - Teacher calendar sẽ được giải phóng
    - Có thể ảnh hưởng đến payment/billing

---

#### AC-3 – Common termination reasons
- **Tại:** Popup terminate
- **Khi:** Admin nhập reason
- **Thì:**
  - Quick select:
    - "Giáo viên vi phạm hợp đồng"
    - "Giáo viên yêu cầu dừng"
    - "Chất lượng giảng dạy không đạt"
    - "Không đủ học sinh"
    - "Vấn đề khác (nhập chi tiết)"

---

#### AC-4 – Không cho phép terminate khi registration đã COMPLETED
- **Tại:** Màn hình chi tiết registration
- **Khi:** Registration có status = COMPLETED
- **Thì:**
  - Không hiển thị nút "Kết thúc sớm"
  - Registration đã hoàn thành không thể terminate

---

### Business Value
- Xử lý các tình huống đặc biệt, bất ngờ
- Bảo vệ lợi ích của trường và học sinh
- Linh hoạt trong quản lý

---

### Success Metrics
- Tỷ lệ termination <= 5% total active registrations

---

### Dependencies
- sf-product service (PRIVATE_SCHOOL)
- tf-class-management service
- tf-teacher-calendar service (INDIVIDUAL)
- Kafka

---

### Impact Analysis
- **Tác động kỹ thuật:** Cao - Cleanup resources, unblock calendar
- **Tác động nghiệp vụ:** Cao - Edge case handling
- **Tác động UX:** Trung bình

---

# F. BỔ SUNG: WORKFLOW AUTOMATION

## US-PIM-022: Auto-decline registration khi timeout

### Nội dung
Là **System (Temporal Workflow)**
Tôi muốn **tự động decline registration khi giáo viên không xác nhận lịch trước deadline**
Tại **Backend (Temporal)**
Để **tự động dọn dẹp các registrations không có response và thông báo cho school**

---

### Acceptance Criterias

#### AC-1 – Timer trigger auto-decline
- **Tại:** Temporal PIMRegistrationWorkflow
- **Khi:** ScheduleConfirmationTimer expire (X days theo PIM config)
- **Thì:**
  - Check registration status vẫn là SCHEDULE_ASSIGNED
  - Execute AutoDeclineActivity
  - Cập nhật registration status = DECLINED
  - Lưu reason: "Tự động từ chối do không xác nhận trước deadline"
  - Publish TeacherDeclinedEvent (auto-generated)
  - Notification gửi đến teacher: "Đăng ký đã bị tự động từ chối do quá hạn xác nhận"
  - Notification gửi đến school: "Giáo viên [Name] không xác nhận lịch. Đăng ký đã bị hủy"
  - Terminate workflow

**Inline Business Rule:**
- Timer duration = confirmation_deadline_days từ PIM config
- Chỉ auto-decline khi status vẫn là SCHEDULE_ASSIGNED

---

#### AC-2 – Reminder trước khi auto-decline
- **Tại:** Temporal ScheduleConfirmationWorkflow
- **Khi:** Còn 1 ngày trước deadline
- **Thì:**
  - Send reminder notification đến teacher: "Vui lòng xác nhận lịch dạy trước [deadline]. Nếu không, đăng ký sẽ tự động bị hủy"

---

### Business Value
- Tự động hóa cleanup
- Giải phóng registrations không response
- Thông báo kịp thời cho các bên

---

### Success Metrics
- Tỷ lệ auto-decline <= 10% total schedule assigned

---

### Dependencies
- Temporal workflow
- sf-product service
- Kafka
- sf-notification-client

---

### Impact Analysis
- **Tác động kỹ thuật:** Trung bình - Temporal timer
- **Tác động nghiệp vụ:** Cao - Automation
- **Tác động UX:** Thấp - Backend automation

---

## US-PIM-023: Auto-remind School Admin review pending registrations

### Nội dung
Là **System**
Tôi muốn **tự động nhắc nhở School Admin review các registrations đang PENDING_REVIEW**
Tại **Backend**
Để **tăng tốc độ xử lý và tránh registrations bị quên**

---

### Acceptance Criterias

#### AC-1 – Daily reminder cho pending registrations
- **Tại:** Backend scheduled job (cron)
- **Khi:** Hàng ngày vào 9:00 AM
- **Thì:**
  - Query tất cả registrations với:
    - status = PENDING_REVIEW
    - submitted_at >= 3 ngày trước
  - Group theo school tenant
  - Send notification đến School Admin: "Bạn có [N] đăng ký đang chờ xem xét từ [X] ngày trước"
  - Link đến danh sách registrations

**Inline Business Rule:**
- Reminder sau 3 ngày chưa review
- Daily frequency

---

#### AC-2 – Urgent reminder
- **Tại:** Backend
- **Khi:** Registration pending > 7 ngày
- **Thì:**
  - Send urgent notification với higher priority
  - Subject: "[URGENT] Đăng ký đang chờ quá lâu"

---

### Business Value
- Tăng response rate
- Giảm waiting time cho teachers
- Improve SLA

---

### Success Metrics
- Thời gian trung bình PENDING_REVIEW giảm từ 5 ngày xuống 2 ngày

---

### Dependencies
- Backend scheduled job
- sf-notification-client
- sf-product service

---

### Impact Analysis
- **Tác động kỹ thuật:** Thấp - Simple cron job
- **Tác động nghiệp vụ:** Trung bình - Process improvement
- **Tác động UX:** Thấp

---

# G. EDGE CASES VÀ ERROR HANDLING

## US-PIM-024: Xử lý Kafka event failure

### Nội dung
Là **System**
Tôi muốn **xử lý các Kafka events bị failed và retry mechanism**
Tại **Backend các services**
Để **đảm bảo eventual consistency và không mất events**

---

### Acceptance Criterias

#### AC-1 – Retry failed events
- **Tại:** Kafka consumer
- **Khi:** Consume event thất bại
- **Thì:**
  - Retry với exponential backoff (1s, 2s, 4s)
  - Max 3 retries
  - Nếu vẫn fail: gửi event đến DLQ (Dead Letter Queue)
  - Log error với full stack trace
  - Alert operations team

**Inline Business Rule:**
- Retry policy: max 3, exponential backoff
- DLQ retention: 14 days

---

#### AC-2 – DLQ monitoring và reprocess
- **Tại:** Operations dashboard
- **Khi:** Events đến DLQ
- **Thì:**
  - Alert được gửi khi DLQ > threshold
  - Ops team có thể:
    - View event details
    - Manual reprocess
    - Discard
  - Track metrics: dlq_messages_total, dlq_reprocess_success_rate

---

#### AC-3 – Idempotency handling
- **Tại:** Event handlers
- **Khi:** Nhận duplicate event (do retry)
- **Thì:**
  - Check eventId đã được process chưa (Redis/DB)
  - Nếu đã process: log và skip
  - Nếu chưa: process và mark as processed
  - TTL: 24 hours

**Inline Business Rule:**
- Sử dụng eventId làm idempotency key
- Store trong Redis với TTL 24h

---

### Business Value
- Đảm bảo reliability
- Eventual consistency
- Không mất dữ liệu

---

### Success Metrics
- DLQ messages < 1% total events
- Event processing success rate >= 99%

---

### Dependencies
- Kafka
- Redis (idempotency store)
- Monitoring/Alerting system

---

### Impact Analysis
- **Tác động kỹ thuật:** Cao - Core reliability
- **Tác động nghiệp vụ:** Rất cao - Data consistency
- **Tác động UX:** Thấp - Backend

---

# SUMMARY

Tổng cộng **24 User Stories** đã được phân rã, bao phủ:

## Nhóm A: Quản lý PIM (6 US)
- US-PIM-001: Tạo PIM mới
- US-PIM-002: Publish PIM
- US-PIM-003: Xem và quản lý danh sách PIM
- US-PIM-004: Chỉnh sửa PIM
- US-PIM-005: Suspend/Resume PIM
- US-PIM-006: Archive PIM

## Nhóm B: Đăng ký PIM (5 US)
- US-PIM-007: Xem danh sách PIM khả dụng
- US-PIM-008: Đăng ký PIM
- US-PIM-009: Xem chi tiết Registration
- US-PIM-010: Resubmit Registration
- US-PIM-011: Withdraw Registration

## Nhóm C: Phê duyệt Registration (5 US)
- US-PIM-012: Xem danh sách Registrations
- US-PIM-013: Review và Approve Registration
- US-PIM-014: Request Update Registration
- US-PIM-015: Reject Registration
- US-PIM-016: Assign Schedule

## Nhóm D: Xác nhận lịch (3 US)
- US-PIM-017: Confirm Schedule
- US-PIM-018: Negotiate Schedule
- US-PIM-019: Decline Schedule

## Nhóm E: Finalize và Activate (2 US)
- US-PIM-020: Finalize Registration và tạo lớp học
- US-PIM-021: Terminate Registration sớm

## Nhóm F: Workflow Automation (2 US)
- US-PIM-022: Auto-decline khi timeout
- US-PIM-023: Auto-remind review pending

## Nhóm G: Edge Cases (1 US)
- US-PIM-024: Xử lý Kafka event failure

---

**Tất cả User Stories đã:**
- ✅ Cover Happy Paths (luồng chính)
- ✅ Cover Alternative Paths (luồng thay thế)
- ✅ Cover Edge Cases & Error Conditions (ngoại lệ)
- ✅ Tuân thủ Template quy định
- ✅ Sử dụng ngôn ngữ nghiệp vụ đồng nhất
- ✅ Có Business Value và Success Metrics rõ ràng
