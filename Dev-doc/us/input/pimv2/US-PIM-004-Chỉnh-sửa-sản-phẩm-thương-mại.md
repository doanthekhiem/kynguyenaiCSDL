# US-PIM-004: Chỉnh sửa sản phẩm thương mại

## User Story Content

**Là một** Giáo viên Tự do (INDIVIDUAL) hoặc Quản trị viên Trường Tư nhân (PRIVATE_SCHOOL)

**Tôi muốn** chỉnh sửa thông tin sản phẩm thương mại đã tạo tại màn hình Chi tiết Sản phẩm

**Để** cập nhật thông tin sản phẩm, điều chỉnh giá bán, thay đổi lịch học hoặc cấu hình khóa học

## Quy tắc chỉnh sửa theo Trạng thái

- Chỉ ở trạng thái **Nháp** mới được phép chỉnh sửa nội dung sản phẩm
- Ở các trạng thái khác: Toàn bộ form bị disable, chỉ hiển thị dropdown Trạng thái để chuyển đổi => Logic theo US: [US-PIM-007: Quản lý trạng thái sản phẩm thương mại](https://aeh.atlassian.net/wiki/spaces/EES/pages/1089601552/US-PIM-007+Qu+n+l+tr+ng+th+i+s+n+ph+m+th+ng+m+i)

## Acceptance Criteria

### AC-1: Điểm vào màn hình Chỉnh sửa sản phẩm

**Tại** Màn hình Chi tiết sản phẩm Thương mại hoặc màn danh sách sản phẩm

**Khi** Tôi click nút **\[✎ Chỉnh sửa\]**

**Thì** hệ thống redirect đến màn hình "Chỉnh sửa Sản phẩm" với:

- Load dữ liệu hiện tại vào form
- Hiển thị Stepper 3 bước (tất cả đánh dấu ✓)
- Áp dụng quy tắc chỉnh sửa theo trạng thái hiện tại

| **Bước** | **Tên** | **Icon** |
| --- | --- | --- |
| 1   | Thông tin Tổng quan | ✓   |
| 2   | Cấu trúc Khóa học | ✓   |
| 3   | Cấu hình Giá & Thuế | ✓   |

### AC-2: Màn hình khi trạng thái là Nháp (DRAFT)

**Tại** Màn hình Chỉnh sửa sản phẩm với trạng thái = DRAFT

**Khi** Tôi truy cập màn hình

**Thì** hệ thống cho phép chỉnh sửa:

- ✅ Tất cả các trường thông tin
- ❌ Trừ Mã sản phẩm (disabled)
- Dropdown Trạng thái hiển thị: Nháp, Xuất bản
- Khi lưu với trạng thái = Xuất bản: Validate đầy đủ thông tin bắt buộc => Theo US [US-PIM-006: Xuất bản sản phẩm thương mại](https://aeh.atlassian.net/wiki/spaces/EES/pages/1092190223/US-PIM-006+Xu+t+b+n+s+n+ph+m+th+ng+m+i)

### AC-3: Hủy bỏ chỉnh sửa

**Tại** Màn hình Chỉnh sửa sản phẩm

**Khi** Tôi click nút \[Hủy bỏ\]

**Thì** hệ thống hiển thị popup: "Bạn có chắc muốn hủy? Các thay đổi chưa lưu sẽ bị mất."

- \[Tiếp tục chỉnh sửa\]: Đóng popup
- \[Hủy thay đổi\]: Redirect về Chi tiết sản phẩm

### AC-4: Auto-save Draft (DRAFT only)

**Tại** Màn hình Chỉnh sửa sản phẩm ở trạng thái DRAFT

**Khi** Tôi đang chỉnh sửa và có thay đổi dữ liệu

**Thì** hệ thống:

- Lưu tự động vào LocalStorage mỗi 30 giây
- Hiển thị indicator "Đã lưu tạm" góc trên phải
- Khi quay lại, hỏi "Phát hiện bản nháp chưa lưu. Bạn có muốn khôi phục?"

## Inline Business Rule

| **Trường thông tin** | **Mã BR** | **Business Rule** | **Ghi chú** |
| --- | --- | --- | --- |
| Tenant type | BR_01 | INDIVIDUAL và PRIVATE_SCHOOL sử dụng cùng flow |     |
| Purpose | BR_02 | Chỉ sửa được sản phẩm có purpose = SELLING |     |
| Quyền sửa (DRAFT) | BR_03 | Sửa tất cả trường trừ Mã sản phẩm |     |
| Quyền sửa (PENDING) | BR_04 | Chỉ cho phép chuyển trạng thái → Nháp hoặc Xuất bản | Disable toàn bộ form |
| Quyền sửa (PUBLISHED) | BR_05 | Chỉ cho phép chuyển trạng thái → Lưu trữ | Disable toàn bộ form |
| Quyền sửa (ARCHIVED) | BR_06 | Chỉ cho phép chuyển trạng thái → Xuất bản | Disable toàn bộ form |
| Mã sản phẩm | BR_07 | Không cho phép sửa ở mọi trạng thái | Disabled |
| Tên sản phẩm | BR_08 | Bắt buộc, 5-255 ký tự, không ký tự đặc biệt |     |
| Mô tả sản phẩm | BR_09 | Bắt buộc, 20-5000 ký tự |     |
| Ngày mở bán | BR_10 | Kết thúc > Bắt đầu, <= 1 năm |     |
| Giá bán tham chiếu | BR_11 | \>= 0 VND nếu Có phí |     |
| Khung giờ | BR_13 | Chỉ hiển thị khi Loại lịch = Cố định |     |
| Ảnh đại diện | BR_14 | JPG/PNG/JPEG/WEBP, ≤5MB, 400x300 - 4000x4000 px |     |

## Business Value & Success Metrics

Story này sẽ cung cấp **khả năng chỉnh sửa sản phẩm thương mại** cho INDIVIDUAL và PRIVATE_SCHOOL - giúp cập nhật thông tin sản phẩm, điều chỉnh giá và cấu hình khi cần thiết.

Trọng số của story này là **High** - đây là tính năng quan trọng để quản lý vòng đời sản phẩm.

Story được coi là thành công khi đảm bảo được:

- Thời gian load form <= 2 giây
- Tỷ lệ lưu thành công >= 95%
- Thời gian trung bình để hoàn thành chỉnh sửa <= 5 phút

## UI/UX Design

- Sử dụng cùng layout với màn hình Tạo sản phẩm (US-PIM-003)
- Desktop: 2 cột (Main form + Sidebar)
- Form được pre-fill với dữ liệu hiện tại
- **DRAFT:** Cho phép chỉnh sửa tất cả trừ Mã sản phẩm
- **PENDING:** Toàn bộ form disabled, chỉ hiển thị dropdown chuyển trạng thái + banner xanh dương
- **PUBLISHED:** Toàn bộ form disabled, chỉ hiển thị dropdown chuyển sang Lưu trữ + banner vàng
- **ARCHIVED:** Toàn bộ form disabled, chỉ hiển thị dropdown chuyển sang Xuất bản + banner xám
- Tất cả các bước đều có icon ✓ trên Stepper