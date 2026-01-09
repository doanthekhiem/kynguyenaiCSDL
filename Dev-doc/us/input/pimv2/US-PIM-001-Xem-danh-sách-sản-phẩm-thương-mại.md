# US-PIM-001: Xem danh sách sản phẩm thương mại

## Nội dung
Là **Quản trị viên hoặc quản lý học vụ của nhà trường/Giáo viên tự do**
Tôi muốn **xem danh sách tất cả các sản phẩm thương mại mà trường đang kinh doanh**
Tại **Màn hình "Quản lý sản phẩm thương mại" trên ứng dụng web quản lý trường học**
Để **theo dõi tổng quan tình hình kinh doanh, quản lý trạng thái các sản phẩm, và truy cập vào chi tiết từng sản phẩm**

---

## Acceptance Criterias

### AC-1 – Hiển thị tổng quan thống kê (Happy Path)
- **Tại:** Màn hình Quản lý sản phẩm thương mại
- **Khi:** Người dùng truy cập vào màn hình danh sách sản phẩm
- **Thì:**
  - Hệ thống hiển thị các thẻ thống kê tổng quan:

    **Thẻ 1: Tổng số**
    - Đến tất cả các sản phẩm có purpose = SELLING của tenant

    **Thẻ 2: Đang kinh doanh**
    - Số lượng sản phẩm có trạng thái Đang kinh doanh (purpose = SELLING và state = PUBLISHED)

    **Thẻ 3: Hoàn thành**
    - Số lượng sản phẩm có trạng thái Hoàn thành (purpose = SELLING và state = ACTIVE)

    **Thẻ 4: Bản nháp**
    - Số lượng sản phẩm đang ở trạng thái bản nháp (purpose = SELLING và state = DRAFT)

    **Thẻ 5: Lưu trữ**
    - Số lượng sản phẩm đang ở trạng thái lưu trữ (purpose = SELLING và state = ARCHIVED)

  - Mỗi thẻ hiển thị: nhãn mô tả và số liệu

**Inline Business Rule:**
- Thống kê chỉ tính các sản phẩm thuộc tenant của người dùng đang đăng nhập
- Chỉ thống kê sản phẩm thương mại (purpose = SELLING)
- Số liệu được cập nhật khi tải trang

---

### AC-2 – Hiển thị danh sách sản phẩm thương mại (Happy Path)
- **Tại:** Phần nội dung chính của màn hình
- **Khi:** Màn hình được tải hoặc sau khi áp dụng bộ lọc
- **Thì:**
  - Hệ thống hiển thị danh sách các sản phẩm thương mại
  - Mỗi sản phẩm hiển thị thông tin:
    - Tên sản phẩm
    - Loại hình: Khóa học (Course) hoặc Chương trình (Program)
    - Môn học
    - Cấp học
    - Khối lớp
    - Trình độ
    - Ngôn ngữ
    - Giá bán (học phí)
    - (SL) Học viên
    - Trạng thái sản phẩm:
      - Bản nháp (DRAFT)
      - Hoàn thành (ACTIVE)
      - Đang kinh doanh (PUBLISHED)
      - Tạm dừng (SUSPENDED)
      - Lưu trữ (ARCHIVED)
    - Ngày tạo

  - Danh sách được sắp xếp theo sản phẩm mới nhất lên đầu

**Inline Business Rule:**
- Chỉ hiển thị sản phẩm thương mại (purpose = SELLING)
- Mặc định ẩn các sản phẩm đã lưu trữ
- Giá bán hiển thị theo định dạng tiền tệ VNĐ

---

### AC-3 – Bộ lọc theo trạng thái sản phẩm (Happy Path)
- **Tại:** Thanh công cụ phía trên danh sách
- **Khi:** Người dùng chọn bộ lọc trạng thái
- **Thì:**
  - Hệ thống hiển thị các tùy chọn:
    - Tất cả (mặc định - không bao gồm Lưu trữ)
    - Bản nháp (DRAFT)
    - Hoàn thành (ACTIVE)
    - Đang kinh doanh (PUBLISHED)
    - Tạm dừng (SUSPENDED)
    - Lưu trữ (ARCHIVED)
  - Khi chọn trạng thái, hệ thống chỉ hiển thị các sản phẩm có trạng thái tương ứng
  - Hiển thị số lượng sản phẩm phù hợp với bộ lọc

**Inline Business Rule:**
- Bộ lọc có thể kết hợp với tìm kiếm và bộ lọc phân loại

---

### AC-4 – Bộ lọc theo phân loại (Happy Path)
- **Tại:** Thanh công cụ phía trên danh sách
- **Khi:** Người dùng muốn lọc theo phân loại
- **Thì:**
  - Hệ thống hiển thị các bộ lọc:

    **Bộ lọc Loại hình**
    - Khóa học (Course)
    - Chương trình (Program)

    **Bộ lọc Cấp học**
    - Tải danh sách từ danh mục Cấp học đang hoạt động
    - Cho phép chọn nhiều giá trị

    **Bộ lọc Khối lớp**
    - Tải danh sách từ danh mục Khối lớp đang hoạt động và thuộc Cấp học đã chọn
    - Cho phép chọn nhiều giá trị

    **Bộ lọc Môn học**
    - Tải danh sách từ danh mục Môn học đang hoạt động
    - Cho phép chọn nhiều giá trị

    **Bộ lọc Giáo viên**
    - Tải danh sách giáo viên đang hợp tác với trường
    - Cho phép chọn nhiều giá trị

  - Khi áp dụng bộ lọc, hệ thống chỉ hiển thị các sản phẩm có phân loại tương ứng
  - Hiển thị nút "Xóa bộ lọc" để reset về mặc định

**Inline Business Rule:**
- Các bộ lọc kết hợp theo logic: sản phẩm phải thỏa mãn tất cả điều kiện đã chọn

---

### AC-5 – Tìm kiếm sản phẩm (Happy Path)
- **Tại:** Thanh công cụ phía trên danh sách
- **Khi:** Người dùng nhập từ khóa vào ô tìm kiếm
- **Thì:**
  - Hệ thống tìm kiếm theo tên sản phẩm và mã sản phẩm
  - Tìm kiếm không phân biệt chữ hoa/thường
  - Từ khóa được làm nổi bật trong kết quả
  - Nếu không tìm thấy, hiển thị thông báo phù hợp
  - Khi xóa từ khóa, quay lại danh sách đầy đủ

**Inline Business Rule:**
- Độ dài tối thiểu của từ khóa: 2 ký tự
- Tìm kiếm kết hợp với các bộ lọc đang áp dụng

---

### AC-6 – Tạo sản phẩm mới (Happy Path)
- **Tại:** Màn hình danh sách
- **Khi:** Người dùng chọn "Tạo sản phẩm mới"
- **Thì:**
  - Hệ thống chuyển đến màn hình tạo sản phẩm mới (xem US-PIM-002)

**Inline Business Rule:**
- Sản phẩm mới được tạo với trạng thái "Bản nháp" (DRAFT)
- Khi người dùng "Hoàn thành", sản phẩm chuyển sang trạng thái "Hoàn thành" (ACTIVE)
- Khi người dùng "Xuất bản", sản phẩm chuyển sang "Đang kinh doanh" (PUBLISHED)
- Sản phẩm ở trạng thái "Bản nháp" hoặc "Hoàn thành" không hiển thị trên cửa hàng trực tuyến

---

### AC-7 – Tạo bản sao sản phẩm (Clone PIM) (Happy Path)
- **Tại:** Menu thao tác của mỗi sản phẩm trong danh sách hoặc màn hình chi tiết sản phẩm
- **Khi:** Người dùng chọn "Tạo bản sao"
- **Thì:**
  - Hệ thống kiểm tra điều kiện:
    - Sản phẩm nguồn phải có liên kết với Khóa học (Course) hoặc Chương trình (Program)

  - Nếu đủ điều kiện:
    - Tạo sản phẩm mới với các thông tin được sao chép:
      - Tên sản phẩm (thêm hậu tố "- Bản sao")
      - Mô tả
      - Phân loại (Cấp học, Khối lớp, Môn học, Trình độ, Ngôn ngữ)
      - Thông tin giá (học phí, thuế)
      - Yêu cầu giáo viên
      - Cấu hình lịch học
    - Các thông tin không sao chép:
      - Mã sản phẩm (sinh mới)
      - Giáo viên phụ trách
      - Số học viên
    - Liên kết với Khóa học/Chương trình nguồn được giữ nguyên
    - Mở màn hình chỉnh sửa để người dùng điều chỉnh

  - Nếu không đủ điều kiện:
    - Hiển thị thông báo: "Không thể tạo bản sao. Sản phẩm nguồn phải có liên kết với Khóa học hoặc Chương trình"

**Inline Business Rule:**
- Sản phẩm nguồn phải có resource được liên kết (course_id hoặc program_id)
- Khóa học/Chương trình được liên kết phải ở trạng thái hoạt động
- Sản phẩm mới được tạo với trạng thái "Bản nháp" (DRAFT)
- Tính năng này giúp tiết kiệm thời gian khi tạo các sản phẩm tương tự

---

### AC-8 – Truy cập chi tiết sản phẩm (Happy Path)
- **Tại:** Mỗi dòng trong danh sách
- **Khi:** Người dùng chọn vào một sản phẩm
- **Thì:**
  - Hệ thống chuyển sang màn hình chi tiết sản phẩm
  - Hiển thị đầy đủ thông tin sản phẩm và các thao tác quản lý

**Inline Business Rule:**
- Nếu sản phẩm không tồn tại, hiển thị thông báo lỗi phù hợp

---

### AC-9 – Thay đổi trạng thái sản phẩm từ danh sách (Alternative Path)
- **Tại:** Menu thao tác của mỗi sản phẩm trong danh sách
- **Khi:** Người dùng muốn thay đổi trạng thái sản phẩm
- **Thì:**
  - Hệ thống hiển thị các tùy chọn phù hợp với trạng thái hiện tại:

    **Từ Bản nháp (DRAFT):**
    - Hoàn thành → chuyển sang Hoàn thành (ACTIVE)
    - Lưu trữ → chuyển sang Lưu trữ (ARCHIVED)

    **Từ Hoàn thành (ACTIVE):**
    - Xuất bản → chuyển sang Đang kinh doanh (PUBLISHED)
    - Chuyển về nháp → chuyển sang Bản nháp (DRAFT)
    - Lưu trữ → chuyển sang Lưu trữ (ARCHIVED)

    **Từ Đang kinh doanh (PUBLISHED):**
    - Tạm dừng → chuyển sang Tạm dừng (SUSPENDED)
    - Lưu trữ → chuyển sang Lưu trữ (ARCHIVED) - nếu không có học viên đang học và đơn đang xử lý

    **Từ Tạm dừng (SUSPENDED):**
    - Tiếp tục kinh doanh → quay lại Đang kinh doanh (PUBLISHED)
    - Chuyển về nháp → chuyển sang Bản nháp (DRAFT) - nếu không có học viên đang học và đơn đang xử lý
    - Lưu trữ → chuyển sang Lưu trữ (ARCHIVED) - nếu không có học viên đang học và đơn đang xử lý

    **Từ Lưu trữ (ARCHIVED):**
    - Không có thao tác thay đổi trạng thái (không thể khôi phục)

  - Khi thay đổi trạng thái:
    - Hiển thị xác nhận trước khi thực hiện
    - Ghi nhận thời gian và người thực hiện

**Inline Business Rule:**
- Không thể lưu trữ hoặc chuyển về nháp (từ SUSPENDED) sản phẩm nếu còn học viên đang học hoặc đơn hàng đang xử lý
- Khi tạm dừng, sản phẩm không nhận đăng ký mới nhưng học viên hiện tại vẫn tiếp tục học
- Sản phẩm đã lưu trữ không thể khôi phục
- **Lưu ý:** PUBLISHED chỉ có thể chuyển sang SUSPENDED hoặc ARCHIVED, không thể chuyển trực tiếp về DRAFT. Muốn chỉnh sửa sản phẩm PUBLISHED, phải tạm dừng (SUSPENDED) trước, sau đó mới chuyển về DRAFT
- Chi tiết các luồng chuyển trạng thái xem US-PIM-007

---

### AC-10 – Danh sách rỗng (Edge Case)
- **Tại:** Phần nội dung chính
- **Khi:** Không có sản phẩm thương mại nào
- **Thì:**
  - Hệ thống hiển thị thông báo: "Chưa có sản phẩm thương mại nào"
  - Gợi ý: "Tạo sản phẩm mới để bắt đầu kinh doanh"
  - Hiển thị nút "Tạo sản phẩm đầu tiên"

**Inline Business Rule:**
- Nếu danh sách rỗng do bộ lọc, hiển thị: "Không tìm thấy sản phẩm phù hợp với bộ lọc" kèm nút "Xóa bộ lọc"


---

## Tenant Types

US này áp dụng cho cả hai loại tenant:

| Tenant Type | Mô tả | Đặc điểm |
|-------------|-------|----------|
| **Private School** | Trường tư thục | Có nhiều giáo viên, cơ sở vật chất, quản lý học vụ |
| **Individual** | Giáo viên tự do | Giáo viên tự quản lý sản phẩm và học viên của mình |

**Lưu ý:**
- Giao diện và luồng thao tác giống nhau cho cả hai loại tenant
- Khác biệt về dữ liệu (danh sách giáo viên, khóa học) tùy thuộc vào tenant

---

## State Diagram (Sơ đồ trạng thái)

```
                    ┌───────────────────────────────────────────────────┐
                    │                     ┌─────────────────────────────┤
                    │                     │                             │
                    ▼                     ▼                             │
[*] ──► DRAFT ──────► ACTIVE ──────► PUBLISHED ◄────► SUSPENDED ───────┘
          │            │                │                 │
          │            │                │                 │
          │            ▼                ▼                 ▼
          │         ARCHIVED ◄──────────┴─────────────────┘
          │            │
          └────────────┼─► [Không thể khôi phục]
                       ▼
                      [*]
```

**Giải thích các trạng thái:**

| Trạng thái | Mã hệ thống | Mô tả |
|------------|-------------|-------|
| Bản nháp | DRAFT | Sản phẩm đang được tạo/chỉnh sửa, chưa hoàn thiện |
| Hoàn thành | ACTIVE | Sản phẩm đã hoàn thiện, sẵn sàng xuất bản nhưng chưa lên Online Store |
| Đang kinh doanh | PUBLISHED | Sản phẩm đã xuất bản, hiển thị trên Online Store và nhận đăng ký |
| Tạm dừng | SUSPENDED | Tạm dừng nhận đăng ký mới (hết chỗ, cần điều chỉnh, v.v.) |
| Lưu trữ | ARCHIVED | Sản phẩm đã kết thúc kinh doanh hoặc bị xóa (soft delete), không thể khôi phục |

---

## Business Value
- **Tăng khả năng kiểm soát**: Người quản lý có cái nhìn tổng quan về tất cả sản phẩm đang kinh doanh
- **Tăng hiệu quả làm việc**: Bộ lọc theo loại hình, phân loại giúp tìm đúng sản phẩm cần quản lý
- **Tiết kiệm thời gian**: Tính năng Clone PIM giúp tạo nhanh các sản phẩm tương tự
- **Hỗ trợ ra quyết định**: Thống kê trực quan giúp đánh giá hiệu quả kinh doanh
- **Quản lý vòng đời sản phẩm**: 5 trạng thái rõ ràng giúp theo dõi tiến độ từ tạo đến kinh doanh

---

## Success Metrics
- Tốc độ tải trang đạt yêu cầu hiệu năng hệ thống
- Tỷ lệ sử dụng bộ lọc >= 40%
- Tỷ lệ sử dụng tìm kiếm >= 50% khi có nhiều sản phẩm
- Tỷ lệ truy cập chi tiết >= 80%
- Tỷ lệ sử dụng tính năng Clone >= 20%

---

## Dependencies
- **Dữ liệu liên quan**: Sản phẩm thương mại (PIM), Học viên, Phân loại (Cấp học, Môn học), Giáo viên, Khóa học (Course), Chương trình (Program)
- **US liên quan**: US-PIM-002 (Tạo sản phẩm), US-PIM-006 (Xuất bản), US-PIM-007 (Quản lý trạng thái)

---

## Impact Analysis

### Trải nghiệm người dùng
- Giao diện trực quan với 5 trạng thái rõ ràng
- Bộ lọc phân loại giúp thu hẹp kết quả nhanh chóng
- Thông báo rõ ràng khi không có dữ liệu hoặc gặp lỗi
- Clone PIM giúp tạo sản phẩm nhanh chóng

### Tính toàn vẹn dữ liệu
- Chỉ cho phép chuyển trạng thái hợp lệ theo quy định
- Không cho lưu trữ hoặc chuyển về nháp sản phẩm có học viên đang học
- Sản phẩm đã lưu trữ không thể khôi phục
- Clone chỉ được thực hiện khi sản phẩm nguồn có liên kết hợp lệ

### Bảo mật
- Chỉ hiển thị sản phẩm thuộc tenant của người dùng
