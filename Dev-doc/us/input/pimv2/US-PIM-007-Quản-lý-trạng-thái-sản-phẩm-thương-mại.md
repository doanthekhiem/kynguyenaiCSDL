# US-PIM-007: Quản lý trạng thái sản phẩm thương mại

## Nội dung
Là **Quản trị viên của nhà trường/Giáo viên tự do**
Tôi muốn **thay đổi trạng thái của sản phẩm thương mại (hoàn thành, tạm dừng, tiếp tục, chuyển về nháp, lưu trữ)**
Tại **Màn hình chi tiết sản phẩm hoặc danh sách sản phẩm thương mại trên ứng dụng web quản lý trường học**
Để **quản lý vòng đời của sản phẩm kinh doanh phù hợp với nhu cầu thực tế**

---

## Acceptance Criterias

### AC-1 – Hoàn thành sản phẩm (DRAFT → ACTIVE) (Happy Path)
- **Tại:** Màn hình chi tiết sản phẩm hoặc form tạo/chỉnh sửa sản phẩm
- **Khi:** Người dùng chọn "Hoàn thành" khi sản phẩm đang ở trạng thái "Bản nháp"
- **Thì:**
  - Hệ thống kiểm tra điều kiện:
    - Tất cả thông tin bắt buộc đã được nhập đầy đủ

  - Nếu đủ điều kiện:
    - Chuyển trạng thái từ "Bản nháp" (DRAFT) sang "Hoàn thành" (ACTIVE)
    - Ghi nhận thời gian và người thực hiện
    - Hiển thị thông báo: "Sản phẩm đã hoàn thành và sẵn sàng xuất bản"

  - Nếu thiếu thông tin:
    - Hiển thị danh sách các trường còn thiếu
    - Gợi ý: "Vui lòng bổ sung các thông tin còn thiếu"

  - Cập nhật giao diện:
    - Trạng thái hiển thị: "Hoàn thành"
    - Hiển thị các nút: "Xuất bản", "Chuyển về nháp", "Lưu trữ"

**Inline Business Rule:**
- Sản phẩm ở trạng thái "Hoàn thành" (ACTIVE) vẫn chưa hiển thị trên Online Store
- Đây là bước kiểm duyệt trước khi xuất bản chính thức
- Không thể chỉnh sửa trực tiếp khi đang ở trạng thái ACTIVE, phải chuyển về DRAFT trước

---

### AC-2 – Chuyển về nháp từ trạng thái Hoàn thành (ACTIVE → DRAFT) (Happy Path)
- **Tại:** Màn hình chi tiết sản phẩm đang ở trạng thái "Hoàn thành"
- **Khi:** Người dùng chọn "Chuyển về nháp"
- **Thì:**
  - Hệ thống hiển thị xác nhận:
    - Thông báo: "Bạn có chắc chắn muốn chuyển sản phẩm về trạng thái Bản nháp?"
    - Giải thích: "Sau khi chuyển về nháp, bạn có thể chỉnh sửa sản phẩm."

  - Khi xác nhận:
    - Chuyển trạng thái từ "Hoàn thành" (ACTIVE) sang "Bản nháp" (DRAFT)
    - Ghi nhận thời gian và người thực hiện
    - Hiển thị thông báo: "Đã chuyển về bản nháp thành công"
    - Mở form chỉnh sửa sản phẩm

  - Cập nhật giao diện:
    - Trạng thái hiển thị: "Bản nháp"
    - Hiển thị các nút: "Hoàn thành", "Lưu trữ"

**Inline Business Rule:**
- Không cần điều kiện để chuyển từ ACTIVE về DRAFT
- Sau khi chuyển về DRAFT, người dùng có thể chỉnh sửa tất cả thông tin

---

### AC-3 – Tạm dừng kinh doanh (PUBLISHED → SUSPENDED) (Happy Path)
- **Tại:** Màn hình chi tiết sản phẩm đang ở trạng thái "Đang kinh doanh"
- **Khi:** Người dùng chọn "Tạm dừng kinh doanh"
- **Thì:**
  - Hệ thống hiển thị xác nhận:
    - Thông báo: "Bạn có chắc chắn muốn tạm dừng kinh doanh sản phẩm này?"
    - Giải thích: "Sau khi tạm dừng, học viên sẽ không thể đăng ký mua sản phẩm mới. Các học viên đang học và đơn đăng ký đang xử lý vẫn được tiếp tục."
    - Trường nhập lý do (không bắt buộc)

  - Khi xác nhận:
    - Chuyển trạng thái từ "Đang kinh doanh" (PUBLISHED) sang "Tạm dừng" (SUSPENDED)
    - Ghi nhận thời gian và người thực hiện
    - Ghi nhận lý do tạm dừng (nếu có)
    - Hiển thị thông báo: "Đã tạm dừng kinh doanh thành công"

  - Cập nhật giao diện:
    - Trạng thái hiển thị: "Tạm dừng"
    - Ẩn nút "Tạm dừng"
    - Hiển thị các nút: "Tiếp tục kinh doanh", "Chuyển về nháp", "Lưu trữ"

**Inline Business Rule:**
- Học viên không thể đăng ký mua mới khi sản phẩm đang tạm dừng
- Các học viên đã đăng ký trước đó vẫn được học bình thường
- Các đơn đăng ký đang xử lý vẫn được tiếp tục xử lý
- Sản phẩm vẫn hiển thị trên Online Store nhưng nút "Đăng ký" bị vô hiệu hóa và hiển thị "Tạm ngưng nhận đăng ký"

---

### AC-4 – Tiếp tục kinh doanh (SUSPENDED → PUBLISHED) (Happy Path)
- **Tại:** Màn hình chi tiết sản phẩm đang ở trạng thái "Tạm dừng"
- **Khi:** Người dùng chọn "Tiếp tục kinh doanh"
- **Thì:**
  - Hệ thống hiển thị xác nhận:
    - Thông báo: "Bạn có chắc chắn muốn tiếp tục kinh doanh sản phẩm này?"
    - Giải thích: "Học viên sẽ có thể đăng ký mua sản phẩm trở lại."

  - Khi xác nhận:
    - Chuyển trạng thái từ "Tạm dừng" (SUSPENDED) sang "Đang kinh doanh" (PUBLISHED)
    - Ghi nhận thời gian và người thực hiện
    - Hiển thị thông báo: "Đã tiếp tục kinh doanh thành công"

  - Cập nhật giao diện:
    - Trạng thái hiển thị: "Đang kinh doanh"
    - Hiển thị các nút: "Tạm dừng", "Chuyển về nháp", "Lưu trữ"

**Inline Business Rule:**
- Học viên có thể đăng ký mua mới sau khi sản phẩm được tiếp tục kinh doanh
- Không giới hạn số lần tạm dừng và tiếp tục

---

### AC-5 – Chuyển về nháp từ trạng thái Tạm dừng (SUSPENDED → DRAFT) (Happy Path)
- **Tại:** Màn hình chi tiết sản phẩm đang ở trạng thái "Tạm dừng"
- **Khi:** Người dùng chọn "Chuyển về nháp"
- **Thì:**
  - Hệ thống kiểm tra điều kiện:
    - Không còn học viên đang học sản phẩm này
    - Không còn đơn đăng ký đang trong quá trình xử lý (trạng thái: Chờ duyệt, Chờ thanh toán, Đang xử lý)

  - Nếu đủ điều kiện:
    - Hiển thị xác nhận:
      - Thông báo: "Bạn có chắc chắn muốn chuyển sản phẩm về trạng thái Bản nháp?"
      - Giải thích: "Sản phẩm sẽ không còn hiển thị trên Online Store. Bạn có thể chỉnh sửa và xuất bản lại sau."
    - Khi xác nhận:
      - Chuyển trạng thái từ "Tạm dừng" (SUSPENDED) sang "Bản nháp" (DRAFT)
      - Ghi nhận thời gian và người thực hiện
      - Hiển thị thông báo: "Đã chuyển về bản nháp thành công"
      - Mở form chỉnh sửa sản phẩm

  - Nếu không đủ điều kiện:
    - Hiển thị thông báo lỗi (AC-11)

**Inline Business Rule:**
- Chỉ được chuyển về DRAFT nếu không có học viên đang học và đơn đang xử lý
- Sau khi chuyển về DRAFT, sản phẩm không còn hiển thị trên Online Store
- Muốn chỉnh sửa sản phẩm PUBLISHED, phải tạm dừng (SUSPENDED) trước, sau đó mới chuyển về DRAFT

---

### AC-6 – Lưu trữ sản phẩm từ trạng thái Bản nháp (DRAFT → ARCHIVED) (Happy Path)
- **Tại:** Màn hình chi tiết sản phẩm đang ở trạng thái "Bản nháp"
- **Khi:** Người dùng chọn "Lưu trữ" hoặc "Xóa"
- **Thì:**
  - Hệ thống hiển thị xác nhận:
    - Thông báo: "Bạn có chắc chắn muốn lưu trữ sản phẩm này?"
    - Giải thích: "Sản phẩm sẽ được chuyển vào danh sách lưu trữ và không thể khôi phục."

  - Khi xác nhận:
    - Chuyển trạng thái từ "Bản nháp" (DRAFT) sang "Lưu trữ" (ARCHIVED)
    - Ghi nhận thời gian và người thực hiện
    - Hiển thị thông báo: "Đã lưu trữ sản phẩm thành công"
    - Quay lại màn hình danh sách sản phẩm

**Inline Business Rule:**
- Bản nháp có thể lưu trữ ngay mà không cần điều kiện
- Lưu trữ là soft delete, dữ liệu vẫn được giữ trong hệ thống
- Sản phẩm đã lưu trữ không thể khôi phục

---

### AC-7 – Lưu trữ sản phẩm từ trạng thái Hoàn thành (ACTIVE → ARCHIVED) (Happy Path)
- **Tại:** Màn hình chi tiết sản phẩm đang ở trạng thái "Hoàn thành"
- **Khi:** Người dùng chọn "Lưu trữ"
- **Thì:**
  - Hệ thống hiển thị xác nhận:
    - Thông báo: "Bạn có chắc chắn muốn lưu trữ sản phẩm này?"
    - Giải thích: "Sản phẩm sẽ được chuyển vào danh sách lưu trữ và không thể khôi phục."

  - Khi xác nhận:
    - Chuyển trạng thái từ "Hoàn thành" (ACTIVE) sang "Lưu trữ" (ARCHIVED)
    - Ghi nhận thời gian và người thực hiện
    - Hiển thị thông báo: "Đã lưu trữ sản phẩm thành công"
    - Quay lại màn hình danh sách sản phẩm

**Inline Business Rule:**
- Sản phẩm ACTIVE có thể lưu trữ ngay vì chưa có học viên
- Sản phẩm đã lưu trữ không thể khôi phục

---

### AC-8 – Lưu trữ sản phẩm từ trạng thái Đang kinh doanh (PUBLISHED → ARCHIVED) (Happy Path)
- **Tại:** Màn hình chi tiết sản phẩm đang ở trạng thái "Đang kinh doanh"
- **Khi:** Người dùng chọn "Lưu trữ"
- **Thì:**
  - Hệ thống kiểm tra điều kiện:
    - Không còn học viên đang học sản phẩm này
    - Không còn đơn đăng ký đang trong quá trình xử lý (trạng thái: Chờ duyệt, Chờ thanh toán, Đang xử lý)

  - Nếu không có học viên đang học và đơn đang xử lý:
    - Hiển thị xác nhận:
      - Thông báo: "Bạn có chắc chắn muốn lưu trữ sản phẩm này?"
      - Giải thích: "Sản phẩm sẽ ngừng kinh doanh, không hiển thị trên Online Store và không thể khôi phục."
    - Khi xác nhận:
      - Chuyển trạng thái từ "Đang kinh doanh" (PUBLISHED) sang "Lưu trữ" (ARCHIVED)
      - Ghi nhận thời gian và người thực hiện
      - Hiển thị thông báo: "Đã lưu trữ sản phẩm thành công"
      - Quay lại màn hình danh sách sản phẩm

  - Nếu còn học viên đang học hoặc đơn đang xử lý:
    - Hiển thị thông báo lỗi (AC-11)

**Inline Business Rule:**
- Không thể lưu trữ nếu còn học viên đang học hoặc đơn đang xử lý
- Cần đợi học viên hoàn thành khóa học hoặc xử lý hết đơn đăng ký trước khi lưu trữ
- Sản phẩm đã lưu trữ không thể khôi phục

---

### AC-9 – Lưu trữ sản phẩm từ trạng thái Tạm dừng (SUSPENDED → ARCHIVED) (Happy Path)
- **Tại:** Màn hình chi tiết sản phẩm đang ở trạng thái "Tạm dừng"
- **Khi:** Người dùng chọn "Lưu trữ"
- **Thì:**
  - Hệ thống kiểm tra điều kiện:
    - Không còn học viên đang học sản phẩm này
    - Không còn đơn đăng ký đang trong quá trình xử lý

  - Nếu không có học viên đang học và đơn đang xử lý:
    - Hiển thị xác nhận tương tự AC-9
    - Thực hiện lưu trữ

  - Nếu còn học viên đang học hoặc đơn đang xử lý:
    - Hiển thị thông báo lỗi (AC-11)

**Inline Business Rule:**
- Tương tự AC-9, không thể lưu trữ nếu còn học viên đang học hoặc đơn đang xử lý

---

### AC-10 – Không thể chuyển trạng thái do còn học viên hoặc đơn đang xử lý (Edge Case)
- **Tại:** Màn hình chi tiết sản phẩm
- **Khi:** Người dùng chọn "Chuyển về nháp" hoặc "Lưu trữ" nhưng còn học viên đang học hoặc đơn đang xử lý
- **Thì:**
  - Hệ thống hiển thị thông báo: "Không thể thực hiện thao tác này"
  - Giải thích chi tiết:
    - Nếu còn học viên: "Còn {số_lượng} học viên đang học sản phẩm này."
    - Nếu còn đơn đang xử lý: "Còn {số_lượng} đơn đăng ký đang trong quá trình xử lý."
  - Gợi ý: "Vui lòng đợi học viên hoàn thành khóa học hoặc xử lý hết các đơn đăng ký trước."
  - Nút "Xem danh sách học viên" (nếu còn học viên)
  - Nút "Xem danh sách đơn đăng ký" (nếu còn đơn đang xử lý)

**Inline Business Rule:**
- Đơn đang xử lý bao gồm các trạng thái: Chờ duyệt, Chờ thanh toán, Đang xử lý
- Đơn đã hoàn tất (Đã thanh toán, Hoàn thành, Đã hủy, Đã hoàn tiền, v.v.) không ảnh hưởng đến việc thay đổi trạng thái
- Học viên đang học: Trạng thái đăng ký đang Hoạt động (ACTIVE) và khóa học chưa kết thúc

---

### AC-11 – Thay đổi trạng thái từ danh sách sản phẩm (Alternative Path)
- **Tại:** Màn hình danh sách sản phẩm thương mại
- **Khi:** Người dùng chọn thao tác thay đổi trạng thái từ menu của sản phẩm
- **Thì:**
  - Hệ thống hiển thị các tùy chọn phù hợp với trạng thái hiện tại:

    **Từ "Bản nháp" (DRAFT):**
    - Hoàn thành
    - Lưu trữ

    **Từ "Hoàn thành" (ACTIVE):**
    - Xuất bản (xem US-PIM-006)
    - Chuyển về nháp
    - Lưu trữ

    **Từ "Đang kinh doanh" (PUBLISHED):**
    - Tạm dừng
    - Lưu trữ (nếu không có học viên đang học và đơn đang xử lý)

    **Từ "Tạm dừng" (SUSPENDED):**
    - Tiếp tục kinh doanh
    - Chuyển về nháp (nếu không có học viên đang học và đơn đang xử lý)
    - Lưu trữ (nếu không có học viên đang học và đơn đang xử lý)

    **Từ "Lưu trữ" (ARCHIVED):**
    - Không có thao tác thay đổi trạng thái (không thể khôi phục)

  - Khi chọn thao tác: Hiển thị xác nhận tương ứng

**Inline Business Rule:**
- Cho phép thay đổi trạng thái nhanh từ danh sách
- Menu thao tác chỉ hiển thị các tùy chọn hợp lệ theo trạng thái
- Sản phẩm đã lưu trữ không thể khôi phục về bất kỳ trạng thái nào

---

### AC-12 – Lỗi khi thay đổi trạng thái (Error Condition)
- **Tại:** Màn hình xác nhận thay đổi trạng thái
- **Khi:** Xảy ra lỗi khi thực hiện thay đổi trạng thái
- **Thì:**
  - Hệ thống hiển thị thông báo: "Không thể thay đổi trạng thái. Vui lòng thử lại"
  - Hiển thị nút "Thử lại"
  - Giữ nguyên trạng thái hiện tại của sản phẩm

**Inline Business Rule:**
- Hệ thống tự động thử lại trước khi hiển thị lỗi
- Trạng thái chỉ được cập nhật khi thao tác thành công

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

| Trạng thái | Mã hệ thống | Mô tả | Hiển thị Online Store | Cho phép chỉnh sửa |
|------------|-------------|-------|----------------------|-------------------|
| Bản nháp | DRAFT | Sản phẩm đang được tạo/chỉnh sửa | Không | Có |
| Hoàn thành | ACTIVE | Sản phẩm đã hoàn thiện, sẵn sàng xuất bản | Không | Không (cần chuyển về DRAFT) |
| Đang kinh doanh | PUBLISHED | Sản phẩm đang bán, nhận đăng ký | Có | Không (cần chuyển về DRAFT) |
| Tạm dừng | SUSPENDED | Tạm dừng nhận đăng ký mới | Có (vô hiệu hóa đăng ký) | Không (cần chuyển về DRAFT) |
| Lưu trữ | ARCHIVED | Sản phẩm đã kết thúc, không thể khôi phục | Không | Không |

**Bảng chuyển đổi trạng thái đầy đủ:**

| Trạng thái hiện tại | Hành động | Trạng thái mới | Điều kiện |
|---------------------|-----------|----------------|-----------|
| DRAFT | Hoàn thành | ACTIVE | Đủ thông tin bắt buộc |
| DRAFT | Lưu trữ | ARCHIVED | Không có |
| ACTIVE | Xuất bản | PUBLISHED | Không có |
| ACTIVE | Chuyển về nháp | DRAFT | Không có |
| ACTIVE | Lưu trữ | ARCHIVED | Không có |
| PUBLISHED | Tạm dừng | SUSPENDED | Không có |
| PUBLISHED | Lưu trữ | ARCHIVED | Không có học viên đang học, không có đơn đang xử lý |
| SUSPENDED | Tiếp tục | PUBLISHED | Không có |
| SUSPENDED | Chuyển về nháp | DRAFT | Không có học viên đang học, không có đơn đang xử lý |
| SUSPENDED | Lưu trữ | ARCHIVED | Không có học viên đang học, không có đơn đang xử lý |
| ARCHIVED | - | - | **Không cho phép khôi phục** |

---

## Business Value
- **Linh hoạt trong quản lý**: Cho phép tạm dừng/tiếp tục kinh doanh theo nhu cầu thực tế
- **Kiểm soát chất lượng**: Trạng thái ACTIVE cho phép review trước khi xuất bản
- **Bảo vệ quyền lợi học viên**: Không cho thay đổi trạng thái khi còn học viên đang học
- **Đảm bảo quy trình**: Không cho lưu trữ hoặc chuyển về nháp khi còn đơn đang xử lý
- **Giảm thiểu sai sót**: Xác nhận trước mỗi thao tác quan trọng
- **Bảo vệ dữ liệu**: Sản phẩm đã lưu trữ không thể khôi phục, tránh phục hồi nhầm

---

## Success Metrics
- Tỷ lệ sản phẩm được quản lý trạng thái đúng quy trình = 100%
- Thời gian xử lý thay đổi trạng thái <= 2 giây
- Tỷ lệ lỗi khi thay đổi trạng thái <= 1%

---

## Tenant Types

US này áp dụng cho cả hai loại tenant:

| Tenant Type | Mô tả |
|-------------|-------|
| **Private School** | Trường tư thục |
| **Individual** | Giáo viên tự do |

**Lưu ý:**
- Giao diện và luồng thao tác giống nhau cho cả hai loại tenant
- Các quy tắc chuyển đổi trạng thái áp dụng như nhau

---

## Dependencies
- **US liên quan**:
  - US-PIM-002 (Tạo sản phẩm thương mại) - Sản phẩm ở trạng thái DRAFT
  - US-PIM-006 (Xuất bản sản phẩm) - Chuyển từ ACTIVE sang PUBLISHED
  - US-PIM-001 (Danh sách sản phẩm) - Hiển thị trạng thái sản phẩm
- **Module Đơn đăng ký**: Kiểm tra đơn đang xử lý
- **Module Học viên**: Kiểm tra học viên đang học

---

## Impact Analysis

### Trải nghiệm người dùng
- Các nút thao tác hiển thị phù hợp với trạng thái hiện tại
- Xác nhận rõ ràng trước mỗi thay đổi
- Thông báo lỗi chi tiết khi không thể thực hiện
- Phải chuyển về nháp để chỉnh sửa đảm bảo tính nhất quán

### Tính toàn vẹn dữ liệu
- Bảo vệ sản phẩm có học viên đang học khỏi bị thay đổi trạng thái sai
- Bảo vệ sản phẩm có đơn đang xử lý khỏi bị lưu trữ hoặc chuyển về nháp
- Ghi nhận đầy đủ lịch sử thay đổi
- Sản phẩm đã lưu trữ không thể khôi phục

### Tác động đến học viên
- Sản phẩm tạm dừng: Không thể đăng ký mua mới, hiển thị "Tạm ngưng nhận đăng ký" trên Online Store
- Sản phẩm chuyển về nháp hoặc lưu trữ: Không còn hiển thị trên Online Store
- Học viên đang học không bị ảnh hưởng khi tạm dừng
