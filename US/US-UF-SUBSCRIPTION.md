# US-UF-SUBSCRIPTION-001: Đăng ký Nhận tin Newsletter (MVP)

## Nội dung

Là **Người dùng KynguyenAI.vn**
Tôi muốn **đăng ký email để nhận tin tức AI hàng tuần**
Tại **Form đăng ký trên trang chủ KynguyenAI.vn**
Để **cập nhật những tin tức AI mới nhất qua email mà không cần truy cập website thường xuyên**

---

## Màn hình/Dialog liên quan

- **Component:** Form đăng ký Newsletter trên trang chủ
- **Backend:** Google Sheets - Sheet Subscribers

---

## Acceptance Criteria

### NHÓM 1: Đăng ký Email

#### AC-1.1 – Đăng ký email thành công (Happy Path)

- **Tại:** Form đăng ký Newsletter trên trang chủ
- **Khi:** Người dùng nhập email hợp lệ và nhấn "Đăng ký"
- **Thì:**
  - Validate email format
  - Kiểm tra email chưa tồn tại trong hệ thống
  - Lưu vào Google Sheets với:
    - email: địa chỉ email (lowercase)
    - status: "pending"
    - subscribed_at: thời gian hiện tại
  - Hiển thị thông báo: MSG_SUB_001 "Đăng ký thành công! Cảm ơn bạn đã quan tâm."
  - Clear form

**Bảng mô tả trường nhập liệu:**

| Tên trường | Field Name | Loại | Bắt buộc | Mặc định | Format/Giá trị | Rule nhập liệu |
|------------|------------|------|----------|----------|----------------|----------------|
| Email | email | Email | Có | - | Email hợp lệ (regex) | Chưa tồn tại trong hệ thống |

---

#### AC-1.2 – Email không hợp lệ (Error Case)

- **Tại:** Form đăng ký Newsletter
- **Khi:** Người dùng nhập email không đúng format
- **Thì:**
  - Hiển thị lỗi: ERR_SUB_001 "Email không hợp lệ"
  - Không submit form
  - Highlight trường email với border màu đỏ

---

#### AC-1.3 – Email đã được đăng ký (Error Case)

- **Tại:** Form đăng ký Newsletter
- **Khi:** Người dùng nhập email đã tồn tại trong Google Sheets
- **Thì:**
  - Hiển thị lỗi: ERR_SUB_002 "Email đã được đăng ký"
  - Không tạo bản ghi trùng

---

#### AC-1.4 – Lỗi server (Error Case)

- **Tại:** Form đăng ký Newsletter
- **Khi:** Có lỗi kết nối Google Sheets hoặc lỗi server
- **Thì:**
  - Hiển thị lỗi: ERR_SUB_003 "Có lỗi xảy ra, vui lòng thử lại"
  - Cho phép người dùng thử lại

---

### NHÓM 2: UI/UX Form đăng ký

#### AC-2.1 – Hiển thị Form đăng ký (Happy Path)

- **Tại:** Trang chủ - Section đăng ký Newsletter
- **Khi:** Người dùng xem trang chủ
- **Thì:**
  - Hiển thị form với:
    - Tiêu đề: "Đăng ký nhận tin tức AI"
    - Mô tả ngắn: "Nhận bản tin AI mới nhất mỗi tuần"
    - Input field: placeholder "email@example.com"
    - Button: "Đăng ký"
  - Form chiếm 1 tile trong Bento Grid hoặc section riêng

---

#### AC-2.2 – Trạng thái loading (Happy Path)

- **Tại:** Form đăng ký Newsletter
- **Khi:** Người dùng nhấn "Đăng ký" và đang chờ response
- **Thì:**
  - Disable button
  - Hiển thị loading indicator (text "..." hoặc spinner)
  - Không cho phép submit lại

---

#### AC-2.3 – Hiển thị sau khi đăng ký thành công (Happy Path)

- **Tại:** Form đăng ký Newsletter
- **Khi:** Đăng ký thành công
- **Thì:**
  - Ẩn form
  - Hiển thị thông báo thành công với icon check
  - Thông báo: "Đăng ký thành công! Cảm ơn bạn đã quan tâm."

---

### NHÓM 3: API Backend

#### AC-3.1 – API đăng ký subscriber (Happy Path)

- **Tại:** API Route POST /api/subscribe
- **Khi:** Client gửi request với email
- **Thì:**
  - Validate email format
  - Check duplicate trong Google Sheets
  - Nếu mới → Thêm row vào sheet Subscribers
  - Response JSON:
    ```json
    {
      "success": true,
      "message": "Đăng ký thành công! Cảm ơn bạn đã quan tâm."
    }
    ```

---

#### AC-3.2 – API response khi email không hợp lệ (Error Case)

- **Tại:** API Route POST /api/subscribe
- **Khi:** Email không đúng format
- **Thì:**
  - HTTP Status: 400
  - Response:
    ```json
    {
      "error": "Email không hợp lệ"
    }
    ```

---

#### AC-3.3 – API response khi email đã tồn tại (Error Case)

- **Tại:** API Route POST /api/subscribe
- **Khi:** Email đã có trong Google Sheets
- **Thì:**
  - HTTP Status: 400
  - Response:
    ```json
    {
      "error": "Email đã được đăng ký"
    }
    ```

---

### NHÓM 4: Data Storage

#### AC-4.1 – Lưu trữ trong Google Sheets (Happy Path)

- **Tại:** Google Sheets - Sheet Subscribers
- **Khi:** Có đăng ký mới thành công
- **Thì:**
  - Thêm row mới với các cột:
    - email: địa chỉ email (lowercase)
    - status: "pending" (cho phase sau xác nhận)
    - subscribed_at: ISO datetime
  - Google Sheets tự động save

---

#### AC-4.2 – Xem danh sách Subscribers (Happy Path - Admin)

- **Tại:** Google Sheets
- **Khi:** Admin mở Google Sheets
- **Thì:**
  - Hiển thị danh sách tất cả subscribers
  - Cho phép filter, sort theo các cột
  - Cho phép export CSV khi cần

---

## Inline Business Rule Tổng hợp

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Email Format | BR_SUB_01 | Regex: ^[^\s@]+@[^\s@]+\.[^\s@]+$ | Standard email format |
| Email Lowercase | BR_SUB_02 | Chuyển về lowercase trước khi lưu | Tránh duplicate case |
| Duplicate Check | BR_SUB_03 | Không cho phép email trùng | Check trước khi lưu |
| Default Status | BR_SUB_04 | "pending" cho MVP | Phase sau: confirmed |

---

## Business Value & Success Metrics

Story này sẽ cung cấp **cơ chế thu thập email subscribers** để xây dựng danh sách người dùng quan tâm, chuẩn bị cho tính năng Newsletter đầy đủ ở phase sau.

Trọng số của story này là **P2 (Ưu tiên thấp - MVP chỉ thu thập email)**

Story được coi là thành công khi đảm bảo được:

- Form đăng ký hoạt động 100% thời gian
- Không có email bị mất (lưu thành công)
- Tỷ lệ conversion (view → subscribe) >= 2%

---

## ASSUMPTION

1. MVP chỉ thu thập email, KHÔNG gửi newsletter tự động.
2. Double opt-in (xác nhận email) sẽ được triển khai ở phase sau.
3. Google Sheets đủ để lưu trữ cho giai đoạn đầu (~1000 subscribers).
4. Admin sẽ export email thủ công khi cần gửi newsletter.

---

## Kế hoạch Phase 2 (Tham khảo)

**Khi có >= 100 subscribers, sẽ triển khai:**
- Double opt-in confirmation
- Tích hợp Resend/SendGrid để gửi email
- Newsletter tự động hàng tuần
- Email templates với React Email
- Unsubscribe handling
- Open/click tracking

---

## UI/UX Design

*{Capture màn hình của UI/UX đã được phê duyệt}*

---

## Danh sách Thông báo

| Mã | Loại | Nội dung |
|----|------|----------|
| MSG_SUB_001 | Success | Đăng ký thành công! Cảm ơn bạn đã quan tâm. |
| ERR_SUB_001 | Error | Email không hợp lệ |
| ERR_SUB_002 | Error | Email đã được đăng ký |
| ERR_SUB_003 | Error | Có lỗi xảy ra, vui lòng thử lại |
