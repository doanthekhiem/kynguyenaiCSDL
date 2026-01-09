# US-PIM-006: Xuất bản sản phẩm thương mại

## Nội dung
Là **Quản trị viên của nhà trường/Giáo viên tự do**
Tôi muốn **xuất bản sản phẩm thương mại đã hoàn thành để bắt đầu nhận đơn đăng ký từ học viên**
Tại **Màn hình chi tiết sản phẩm hoặc danh sách sản phẩm thương mại trên ứng dụng web quản lý trường học**
Để **sản phẩm được hiển thị trên Online Store và học viên có thể đăng ký mua**

---

## Acceptance Criterias

### AC-1 – Hiển thị nút xuất bản (Happy Path)
- **Tại:** Màn hình chi tiết sản phẩm hoặc danh sách sản phẩm thương mại
- **Khi:** Sản phẩm đang ở trạng thái "Hoàn thành" (ACTIVE)
- **Thì:**
  - Hệ thống hiển thị nút "Xuất bản"
  - Nút xuất bản hiển thị ở vị trí dễ nhìn thấy

**Inline Business Rule:**
- Nút "Xuất bản" chỉ hiển thị với sản phẩm có trạng thái "Hoàn thành" (ACTIVE)
- Sản phẩm ở trạng thái "Bản nháp" (DRAFT) cần "Hoàn thành" trước mới có thể xuất bản

---

### AC-2 – Kiểm tra điều kiện xuất bản (Happy Path)
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Người dùng chọn "Xuất bản"
- **Thì:**
  - Hệ thống xác nhận sản phẩm đã ở trạng thái "Hoàn thành" (ACTIVE)
  - Kiểm tra các thông tin cơ bản đã đầy đủ:

    **Thông tin cơ bản:**
    - Tên sản phẩm: Đã nhập
    - Mô tả: Đã nhập

    **Liên kết chương trình:**
    - Đã liên kết với Khóa học (Course) hoặc Chương trình (Program)

    **Phân loại sản phẩm:**
    - Cấp học: Đã chọn ít nhất 1 giá trị
    - Khối lớp: Đã chọn ít nhất 1 giá trị
    - Môn học: Đã chọn ít nhất 1 giá trị

  - Nếu tất cả điều kiện thỏa mãn:
    - Hiển thị màn hình xác nhận xuất bản (AC-3)

  - Nếu sản phẩm chưa ở trạng thái ACTIVE:
    - Hiển thị thông báo lỗi (AC-7)

**Inline Business Rule:**
- Chỉ sản phẩm ở trạng thái ACTIVE mới có thể xuất bản
- Các thông tin khác (học phí, giáo viên phụ trách, lịch học) không bắt buộc để xuất bản nhưng khuyến khích có

---

### AC-3 – Xác nhận xuất bản (Happy Path)
- **Tại:** Màn hình xác nhận xuất bản
- **Khi:** Hệ thống đã kiểm tra và sản phẩm đủ điều kiện
- **Thì:**
  - Hệ thống hiển thị tóm tắt thông tin sản phẩm:
    - Tên sản phẩm
    - Mã sản phẩm
    - Loại hình: Khóa học hoặc Chương trình
    - Phân loại: Cấp học, Khối lớp, Môn học
    - Học phí (nếu có)

  - Thông báo: "Sau khi xuất bản, sản phẩm sẽ hiển thị trên Online Store và học viên có thể đăng ký mua."

  - Các nút:
    - "Xác nhận xuất bản": Tiến hành xuất bản
    - "Quay lại": Hủy và quay lại màn hình trước

**Inline Business Rule:**
- Người dùng cần xác nhận trước khi xuất bản để tránh xuất bản nhầm

---

### AC-4 – Thực hiện xuất bản (ACTIVE → PUBLISHED) (Happy Path)
- **Tại:** Màn hình xác nhận xuất bản
- **Khi:** Người dùng chọn "Xác nhận xuất bản"
- **Thì:**
  - Hệ thống thực hiện:
    - Chuyển trạng thái sản phẩm từ "Hoàn thành" (ACTIVE) sang "Đang kinh doanh" (PUBLISHED)
    - Ghi nhận thời gian xuất bản
    - Ghi nhận người thực hiện xuất bản

  - Thông báo: "Xuất bản sản phẩm thành công! Sản phẩm đã được hiển thị trên Online Store."

  - Cập nhật giao diện:
    - Trạng thái hiển thị: "Đang kinh doanh"
    - Ẩn nút "Xuất bản"
    - Hiển thị các nút mới: "Tạm dừng", "Chuyển về nháp", "Xem đơn đăng ký"

**Inline Business Rule:**
- Sau khi xuất bản, sản phẩm được hiển thị trên Online Store của trường
- Học viên có thể tìm thấy và đăng ký mua sản phẩm
- Trạng thái "Đang kinh doanh" tương ứng với PUBLISHED trong hệ thống
- Không thể chỉnh sửa sản phẩm sau khi xuất bản. Muốn sửa phải "Chuyển về nháp" trước

---

### AC-5 – Xuất bản từ danh sách sản phẩm (Alternative Path)
- **Tại:** Màn hình danh sách sản phẩm thương mại
- **Khi:** Người dùng chọn thao tác "Xuất bản" từ menu của sản phẩm có trạng thái "Hoàn thành" (ACTIVE)
- **Thì:**
  - Hệ thống thực hiện kiểm tra điều kiện như AC-2
  - Nếu đủ điều kiện: Hiển thị xác nhận xuất bản (AC-3)
  - Nếu không đủ điều kiện: Hiển thị thông báo lỗi tương ứng

**Inline Business Rule:**
- Cho phép xuất bản nhanh từ danh sách để tiết kiệm thời gian

---

### AC-6 – Sản phẩm không ở trạng thái Hoàn thành (Error Condition)
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Người dùng cố gắng xuất bản sản phẩm không ở trạng thái "Hoàn thành" (ACTIVE)
- **Thì:**
  - Hệ thống hiển thị thông báo phù hợp:
    - Nếu đang ở "Bản nháp": "Sản phẩm đang ở trạng thái Bản nháp. Vui lòng hoàn thành sản phẩm trước khi xuất bản."
    - Nếu đang ở "Đang kinh doanh": "Sản phẩm này đã được xuất bản và đang kinh doanh"
    - Nếu đang ở "Tạm dừng": "Sản phẩm này đang tạm dừng. Vui lòng chọn 'Tiếp tục kinh doanh' để mở lại"
    - Nếu đang ở "Lưu trữ": "Không thể xuất bản sản phẩm đã lưu trữ. Vui lòng tạo sản phẩm mới"

**Inline Business Rule:**
- Mỗi trạng thái có hướng dẫn xử lý phù hợp
- Chỉ sản phẩm ACTIVE mới có thể xuất bản

---

### AC-7 – Lỗi khi xuất bản (Error Condition)
- **Tại:** Màn hình xác nhận xuất bản
- **Khi:** Xảy ra lỗi khi thực hiện xuất bản
- **Thì:**
  - Hệ thống hiển thị thông báo: "Không thể xuất bản sản phẩm. Vui lòng thử lại"
  - Hiển thị nút "Thử lại"
  - Giữ nguyên màn hình xác nhận

**Inline Business Rule:**
- Hệ thống tự động thử lại trước khi hiển thị lỗi
- Dữ liệu không bị mất khi có lỗi

---

## State Transition (Chuyển đổi trạng thái)

Luồng chuyển đổi trạng thái của PIM SELLING:

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

**Bảng chuyển đổi trạng thái:**

| Trạng thái hiện tại | Hành động | Trạng thái mới | Điều kiện |
|---------------------|-----------|----------------|-----------|
| DRAFT | Hoàn thành | ACTIVE | Đủ thông tin bắt buộc |
| DRAFT | Lưu trữ | ARCHIVED | Không có |
| ACTIVE | Xuất bản | PUBLISHED | Không có |
| ACTIVE | Chuyển về nháp | DRAFT | Không có |
| ACTIVE | Lưu trữ | ARCHIVED | Không có |
| PUBLISHED | Tạm dừng | SUSPENDED | Không có |
| PUBLISHED | Lưu trữ | ARCHIVED | Không có học viên/đơn đang xử lý |
| SUSPENDED | Tiếp tục | PUBLISHED | Không có |
| SUSPENDED | Chuyển về nháp | DRAFT | Không có học viên/đơn đang xử lý |
| SUSPENDED | Lưu trữ | ARCHIVED | Không có học viên/đơn đang xử lý |

**Lưu ý:**
- US này chỉ cover luồng **ACTIVE → PUBLISHED**
- Luồng DRAFT → ACTIVE được mô tả trong US-PIM-002
- Các luồng chuyển đổi khác được mô tả trong US-PIM-007

---

## Business Value
- **Tăng tốc độ kinh doanh**: Sản phẩm được đưa lên Online Store ngay sau khi xuất bản
- **Đảm bảo chất lượng thông tin**: Sản phẩm phải hoàn thành trước khi xuất bản
- **Kiểm soát vòng đời**: Tách biệt giai đoạn hoàn thiện và giai đoạn kinh doanh
- **Giảm thiểu sai sót**: Xác nhận trước khi xuất bản tránh công khai nhầm

---

## Success Metrics
- Thời gian từ hoàn thành đến xuất bản trung bình <= 4 giờ
- Tỷ lệ xuất bản thành công lần đầu >= 95%
- Tỷ lệ sản phẩm hoàn thành được xuất bản >= 90%

---

## Tenant Types

US này áp dụng cho cả hai loại tenant:

| Tenant Type | Mô tả |
|-------------|-------|
| **Private School** | Trường tư thục |
| **Individual** | Giáo viên tự do |

**Lưu ý:**
- Giao diện và luồng thao tác giống nhau cho cả hai loại tenant
- Sản phẩm sau khi xuất bản sẽ hiển thị trên Online Store tương ứng

---

## Dependencies
- **US liên quan**:
  - US-PIM-002 (Tạo sản phẩm thương mại) - Sản phẩm phải được tạo và hoàn thành trước
  - US-PIM-001 (Danh sách sản phẩm) - Hiển thị sản phẩm đã xuất bản
  - US-PIM-007 (Quản lý trạng thái) - Các chuyển đổi trạng thái khác
- **Online Store**: Sản phẩm xuất bản sẽ hiển thị trên Online Store

---

## Impact Analysis

### Trải nghiệm người dùng
- Quy trình xuất bản rõ ràng: Tạo → Hoàn thành → Xuất bản
- Sản phẩm phải ở trạng thái ACTIVE mới có thể xuất bản
- Thông báo cụ thể khi không đủ điều kiện

### Tính toàn vẹn dữ liệu
- Đảm bảo sản phẩm đã hoàn thiện trước khi công khai
- Ghi nhận lịch sử xuất bản (thời gian, người thực hiện)
- Không cho chỉnh sửa sau khi xuất bản, phải chuyển về nháp để sửa

### Tác động đến học viên
- Học viên có thể tìm thấy sản phẩm trên Online Store
- Học viên có thể xem thông tin chi tiết và đăng ký mua
- Sản phẩm mới có thể được hiển thị trong danh mục đề xuất
