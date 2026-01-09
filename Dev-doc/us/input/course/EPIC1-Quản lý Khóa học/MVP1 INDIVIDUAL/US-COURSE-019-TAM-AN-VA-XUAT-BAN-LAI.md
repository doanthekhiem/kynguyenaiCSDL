# US-COURSE-019: Tạm ẩn và Xuất bản lại khóa học

## User Story Content

**Là một** Giáo viên tự do-INDIVIDUAL

**Tôi muốn** tạm ẩn khóa học đã xuất bản khỏi Online Store và có thể xuất bản lại khi cần tại trang quản lý khóa học

**Để** kiểm soát việc hiển thị khóa học trên thị trường mà không mất dữ liệu học viên đã đăng ký


---

## Acceptance Criteria

### AC-1: Truy cập chức năng tạm ẩn khóa học

**Tại** trang chi tiết hoặc danh sách khóa học có trạng thái Đã xuất bản - PUBLISHED

**Khi** Giáo viên click nút "Tạm ẩn" hoặc icon tạm ẩn

**Thì** hệ thống hiển thị dialog xác nhận với nội dung thông tin về ảnh hưởng của việc tạm ẩn

---

### AC-2: Xác nhận tạm ẩn khóa học

**Tại** dialog xác nhận tạm ẩn

**Khi** dialog hiển thị

**Thì** hệ thống hiển thị:
- Tiêu đề: "Tạm ẩn khóa học"
- Thông tin: Tên khóa học, Số học viên đã đăng ký
- Cảnh báo: "Khóa học sẽ không hiển thị trên Online Store. Học viên đã đăng ký vẫn có thể tiếp tục học."
- Trường nhập lý do (tùy chọn)
- Nút "Hủy" và "Xác nhận tạm ẩn"

---

### AC-3: Thực hiện tạm ẩn thành công

**Tại** dialog xác nhận tạm ẩn

**Khi** Giáo viên click "Xác nhận tạm ẩn"

**Thì** hệ thống thực hiện:
1. Cập nhật trạng thái khóa học = Đã ẩn - UNPUBLISHED
2. Cập nhật PIM status = UNPUBLISHED trên dịch vụ quản lý sản phẩm
4. Ghi log với lý do tạm ẩn (nếu có)
5. Hiển thị thông báo "Khóa học đã được tạm ẩn thành công"
6. Cập nhật UI hiển thị trạng thái mới Đã ẩn - UNPUBLISHED

---

### AC-4: Khóa học không hiển thị trên Online Store

**Tại** Online Store sau khi tạm ẩn

**Khi** học viên mới truy cập hoặc tìm kiếm

**Thì** khóa học không xuất hiện trong: kết quả tìm kiếm, danh sách khóa học, trang category. Nếu truy cập trực tiếp bằng URL cũ, hiển thị "Khóa học hiện không khả dụng"

---

### AC-5: Học viên đã đăng ký vẫn có thể học

**Tại** trang học tập của học viên đã đăng ký

**Khi** khóa học bị tạm ẩn

**Thì** học viên vẫn: thấy khóa học trong "Khóa học của tôi", truy cập được nội dung bài học, tiếp tục tiến độ học tập, nhận chứng chỉ khi hoàn thành

---

### AC-6: Truy cập chức năng xuất bản lại

**Tại** trang chi tiết hoặc danh sách khóa học có trạng thái Đã ẩn - UNPUBLISHED

**Khi** Giáo viên click nút "Xuất bản lại"

**Thì** hệ thống hiển thị dialog xác nhận xuất bản lại

---

### AC-7: Xác nhận xuất bản lại

**Tại** dialog xác nhận xuất bản lại

**Khi** dialog hiển thị

**Thì** hệ thống hiển thị:
- Tiêu đề: "Xuất bản lại khóa học"
- Thông tin: Tên khóa học, Thời gian tạm ẩn, Số học viên hiện tại
- Thông báo: "Khóa học sẽ hiển thị lại trên Online Store. Không cần validate lại điều kiện."
- Nút "Hủy" và "Xác nhận xuất bản"

---

### AC-8: Thực hiện xuất bản lại thành công

**Tại** dialog xác nhận xuất bản lại

**Khi** Giáo viên click "Xác nhận xuất bản"

**Thì** hệ thống thực hiện:
1. Cập nhật course.status = Đã xuất bản - PUBLISHED
2. Cập nhật PIM status = Đã xuất bản - PUBLISHED trên dịch vụ quản lý sản phẩm
3. Hiển thị thông báo "Khóa học đã được xuất bản lại thành công"
4. Hiển thị link đến khóa học trên Online Store

---

### AC-9: Gửi email thông báo cho học viên khi xuất bản lại

**Tại** sau khi xuất bản lại thành công

**Khi** khóa học có học viên đã đăng ký trước đó

**Thì** hệ thống gửi email thông báo đến các học viên với nội dung: Khóa học đã hoạt động trở lại, Link truy cập khóa học, Khuyến khích tiếp tục học tập

---

## Alternative Paths

### ALT-1: Tạm ẩn khóa học không có học viên

**Tại** dialog xác nhận tạm ẩn khóa học chưa có học viên đăng ký

**Khi** Giáo viên xác nhận tạm ẩn

**Thì** hệ thống thực hiện tạm ẩn bình thường, không hiển thị cảnh báo về học viên, không gửi email thông báo

---

### ALT-2: Chuyển về DRAFT thay vì xuất bản lại

**Tại** trang chi tiết khóa học Đã ẩn - UNPUBLISHED

**Khi** Giáo viên muốn chỉnh sửa lớn (major edits) trước khi xuất bản lại

**Thì** hệ thống cung cấp option "Chuyển về Bản nháp" để chuyển course.status = DRAFT, cho phép chỉnh sửa không giới hạn, khi xuất bản lại sẽ phải validate lại

---

### ALT-3: Tạm ẩn với thông báo cho học viên

**Tại** dialog xác nhận tạm ẩn

**Khi** Giáo viên tick checkbox "Thông báo cho học viên đã đăng ký"

**Thì** hệ thống gửi email đến học viên với nội dung: Khóa học tạm thời không nhận đăng ký mới, Học viên vẫn có thể tiếp tục học, Lý do tạm ẩn (nếu Giáo viên nhập)

---

### ALT-4: Xuất bản lại với cập nhật nội dung

**Tại** trước khi xuất bản lại

**Khi** Giáo viên đã thực hiện một số chỉnh sửa nhỏ (minor updates) trong thời gian Đã ẩn - UNPUBLISHED

**Thì** hệ thống cho phép xuất bản lại với nội dung đã cập nhật mà không cần validate lại (vì cấu trúc không thay đổi)

---

## Edge Cases & Error Conditions

### ERR-1: Có giao dịch đang pending

**Tại** dialog xác nhận tạm ẩn

**Khi** khóa học có giao dịch thanh toán đang pending (chưa hoàn tất)

**Thì** hệ thống hiển thị cảnh báo "Có [N] giao dịch đang chờ xử lý. Tạm ẩn có thể ảnh hưởng đến các giao dịch này. Bạn có chắc chắn?", cho phép tiếp tục hoặc hủy

---

### ERR-2: Lỗi khi cập nhật PIM

**Tại** đang thực hiện tạm ẩn/xuất bản lại

**Khi** không thể cập nhật status trên dịch vụ quản lý sản phẩm

**Thì** hệ thống retry 3 lần, nếu thất bại thì rollback course.status, hiển thị lỗi "Không thể cập nhật trạng thái. Vui lòng thử lại sau"

---

### ERR-3: Concurrent requests

**Tại** đang thực hiện tạm ẩn

**Khi** có request khác (từ tab/device khác) cùng thao tác

**Thì** hệ thống sử dụng optimistic locking, request sau nhận lỗi "Khóa học đang được cập nhật. Vui lòng tải lại trang"

---

### ERR-4: Khóa học đã bị archive

**Tại** đang cố tạm ẩn

**Khi** khóa học đã chuyển sang ARCHIVED bởi process khác

**Thì** hệ thống hiển thị thông báo "Khóa học đã được lưu trữ. Không thể thực hiện thao tác này" và refresh trang

---

### ERR-5: Session hết hạn

**Tại** đang thực hiện tạm ẩn/xuất bản lại

**Khi** session của Giáo viên hết hạn

**Thì** hệ thống hiển thị thông báo "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại để tiếp tục", redirect đến trang login

---

## Inline Business Rules

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|-----------------|-------|---------------|---------|
| Trạng thái | BR_001 | Chỉ khóa học Đã xuất bản - PUBLISHED mới có thể tạm ẩn | Valid source: Đã xuất bản - PUBLISHED |
| Trạng thái | BR_002 | Chỉ khóa học Đã ẩn - UNPUBLISHED mới có thể xuất bản lại | Valid source: UNPUBLISHED |
| Enrollment | BR_003 | Enrollment không bị ảnh hưởng khi tạm ẩn | Giữ nguyên access |
| PIM | BR_004 | PIM status phải đồng bộ với course status | Đã xuất bản - PUBLISHED ↔ Đã ẩn - PUBLISHED |
| Lý do | BR_005 | Lý do tạm ẩn là tùy chọn, tối đa 500 ký tự | Ghi vào audit log |
| Validation | BR_006 | Xuất bản lại không cần validate lại điều kiện | Skip validation |

---

## System Rules

1. Tạm ẩn/Xuất bản lại là atomic operation, không cho phép partial update
2. Event phải được publish sau khi database transaction commit thành công
3. Audit log phải ghi nhận: user_id, action, timestamp, reason (nếu có)
4. PIM và Course status phải luôn consistent
5. Email thông báo được gửi qua message queue, không block main flow

---

## Business Value & Success Metrics

Story này cung cấp khả năng linh hoạt cho Giáo viên trong việc quản lý lifecycle khóa học, hỗ trợ các tình huống như cập nhật nội dung, tạm ngừng bán trong mùa thấp điểm.

**Trọng số của story này là:** Trung bình (Flexibility)

Story được coi là thành công khi đảm bảo được:

- 100% enrollment được giữ nguyên khi tạm ẩn
- Thời gian tạm ẩn/xuất bản lại < 5 giây
- 0% data inconsistency giữa Course và PIM
- Học viên đã đăng ký không bị gián đoạn học tập

---

## Dependencies

| Loại | Mô tả | Ghi chú |
|------|-------|---------|
| Service | dịch vụ quản lý khóa học | Cập nhật course status |
| Service | dịch vụ quản lý sản phẩm | Cập nhật PIM status |
| Service | Kafka | Publish events |
| Service | Email service | Gửi thông báo |
| US | US-COURSE-017 | Khóa học phải được publish trước |

---

## Impact Analysis

| Đối tượng ảnh hưởng | Mô tả ảnh hưởng |
|---------------------|-----------------|
| Giáo viên INDIVIDUAL | Có khả năng kiểm soát visibility của khóa học |
| Học viên đã đăng ký | Vẫn có thể tiếp tục học, nhận thông báo khi xuất bản lại |
| Học viên mới | Không thể tìm thấy và đăng ký khóa học bị tạm ẩn |
| Online Store | Catalog được cập nhật real-time |

---

## Email Templates

### Email thông báo tạm ẩn (Tùy chọn - khi Giáo viên chọn gửi)

**Subject:** Thông báo về khóa học "[Tiêu đề khóa học]"

**Body:**
```
Xin chào [Tên học viên],

Khóa học "[Tiêu đề khóa học]" mà bạn đã đăng ký hiện đang tạm thời không nhận đăng ký mới.

📌 Lưu ý quan trọng:
- Bạn VẪN CÓ THỂ tiếp tục học khóa học này bình thường
- Tiến độ học tập của bạn được giữ nguyên
- Tất cả nội dung vẫn có thể truy cập

[Lý do từ Giáo viên - nếu có]

Nếu bạn có thắc mắc, vui lòng liên hệ Giáo viên hoặc hỗ trợ.

Trân trọng,
Đội ngũ EduEcosystem
```

**Trong đó**
- [Tên học viên]: Tên người mua khóa học trên Online store
- [Tiêu đề khóa học]: Tiêu đề khóa học bị tạm ẩn
- [Lý do từ Giáo viên - nếu có]: Lý do được nhập khi Tạm ẩn khóa học

### Email thông báo xuất bản lại

**Subject:** Khóa học "[Tiêu đề khóa học]" đã hoạt động trở lại!

**Body:**
```
Xin chào [Tên học viên],

Tin vui! Khóa học "[Tiêu đề khóa học]" đã hoạt động trở lại trên EduEcosystem.

🔗 Truy cập ngay: [Link khóa học]

📊 Tiến độ của bạn: [X]% hoàn thành

Hãy tiếp tục học tập và hoàn thành khóa học nhé!

Trân trọng,
Đội ngũ EduEcosystem
```

**Trong đó**
- [Tên học viên]: Tên người mua khóa học trên Online store
- [Tiêu đề khóa học]: Tiêu đề khóa học được xuất bản lại
- [Link khóa học]: Link truy cập vào khóa học trên Online store
- Tiến độ học tập [X]: % tiến độ học tập khóa học

---

## UI/UX Design

### Mô tả UI chính

**Nút Tạm ẩn (trên trang PUBLISHED):**
- Vị trí: Header hoặc dropdown actions
- Style: Secondary button hoặc icon (mắt gạch chéo)
- Text: "Tạm ẩn" hoặc "Unpublish"

**Dialog Xác nhận Tạm ẩn:**
- Title: "Tạm ẩn khóa học"
- Icon: Warning
- Info card: Tên khóa học, Số học viên đã đăng ký
- Warning text với highlight vàng
- Textarea: "Lý do tạm ẩn (tùy chọn)"
- Checkbox: "Thông báo cho học viên đã đăng ký"
- Footer: Nút "Hủy" (outline) | "Xác nhận tạm ẩn" (danger)

**Nút Xuất bản lại (trên trang UNPUBLISHED):**
- Vị trí: Header, prominent
- Style: Primary button màu xanh lá
- Text: "Xuất bản lại"

**Dialog Xác nhận Xuất bản lại:**
- Title: "Xuất bản lại khóa học"
- Icon: Info
- Info card: Tên khóa học, Thời gian tạm ẩn
- Note: "Khóa học sẽ hiển thị lại trên Online Store"
- Footer: Nút "Hủy" | "Xác nhận xuất bản"

**Badge trạng thái:**
- PUBLISHED: Badge xanh lá "Đã xuất bản"
- UNPUBLISHED: Badge vàng "Tạm ẩn"

---

## Out of Scope Items

| Item | Lý do |
|------|-------|
| Lên lịch tạm ẩn/xuất bản lại tự động | Phạm vi phase sau |
| Tạm ẩn theo vùng địa lý | Không hỗ trợ trong MVP |
| Tạm ẩn một phần nội dung | Phải tạm ẩn toàn bộ khóa học |
| Thông báo push notification | Chỉ hỗ trợ email |
