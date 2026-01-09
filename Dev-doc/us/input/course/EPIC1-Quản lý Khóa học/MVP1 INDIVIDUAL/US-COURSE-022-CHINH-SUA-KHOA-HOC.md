# US-COURSE-022: Chỉnh sửa khóa học theo trạng thái

## User Story Content

**Là một** Giáo viên tự do (INDIVIDUAL)

**Tôi muốn** chỉnh sửa thông tin và nội dung khóa học với các quyền khác nhau tùy theo trạng thái tại trang quản lý khóa học

**Để** cập nhật và hoàn thiện khóa học một cách linh hoạt mà không ảnh hưởng đến học viên đã đăng ký

---

## Acceptance Criteria

### PHẦN 1: CHỈNH SỬA KHÓA HỌC DRAFT (US-COURSE-022)

### AC-1: Truy cập chỉnh sửa khóa học DRAFT

**Tại** danh sách khóa học hoặc trang chi tiết khóa học DRAFT

**Khi** Giáo viên click nút "Chỉnh sửa"

**Thì** hệ thống hiển thị form chỉnh sửa đầy đủ với tất cả các Tab có thể chỉnh sửa: Tab 1 (Thông tin chung), Tab 2 (Thông tin học thuật), Tab 3 (Nội dung khóa học)

---

### AC-2: Chỉnh sửa không giới hạn ở trạng thái DRAFT

**Tại** form chỉnh sửa khóa học DRAFT

**Khi** Giáo viên thực hiện bất kỳ thay đổi nào

**Thì** hệ thống cho phép: thay đổi tất cả thông tin cơ bản (Tiêu đề, Mô tả, Ngôn ngữ, Độ khó...), thay đổi thông tin học thuật (Mục tiêu, Yêu cầu, Đối tượng...), thêm/sửa/xóa Chương và Bài học không giới hạn, thay đổi ảnh/video đại diện, upload lại video bài giảng

---

<!-- ### AC-3: Tự động lưu nháp (Auto-save)

**Tại** form chỉnh sửa khóa học DRAFT

**Khi** Giáo viên dừng nhập liệu trong 3 giây

**Thì** hệ thống tự động lưu thay đổi, hiển thị indicator "Đã lưu tự động lúc [HH:mm]", không yêu cầu Giáo viên click nút Lưu -->

---

### AC-4: Lưu thủ công

**Tại** form chỉnh sửa khóa học DRAFT

**Khi** Giáo viên click nút "Lưu"

**Thì** hệ thống lưu tất cả thay đổi, hiển thị thông báo "Đã lưu thành công", cập nhật course.updated_at

---

---

### PHẦN 2: CHỈNH SỬA KHÓA HỌC PUBLISHED (US-COURSE-023)

### AC-5: Truy cập chỉnh sửa khóa học PUBLISHED

**Tại** danh sách khóa học hoặc trang chi tiết khóa học PUBLISHED

**Khi** Giáo viên click nút "Chỉnh sửa"

**Thì** hệ thống hiển thị form chỉnh sửa với cảnh báo "Khóa học đã xuất bản. Một số thay đổi có thể ảnh hưởng đến học viên đang học" và hiển thị các trường với quyền hạn chế

---

### AC-6: Thay đổi được phép trên khóa học PUBLISHED

**Tại** form chỉnh sửa khóa học PUBLISHED

**Khi** Giáo viên muốn chỉnh sửa

**Thì** hệ thống CHO PHÉP thay đổi: Tiêu đề phụ (subtitle), Mô tả khóa học, Mục tiêu học tập (thêm mới, KHÔNG xóa), Yêu cầu đầu vào, Đối tượng phù hợp, Tags và Danh mục, Ảnh đại diện, Thêm Chương và Bài học MỚI, Thêm tài nguyên vào bài học, Cập nhật video với version mới (replace)

---

### AC-7: Thay đổi bị hạn chế trên khóa học PUBLISHED

**Tại** form chỉnh sửa khóa học PUBLISHED

**Khi** Giáo viên cố gắng thay đổi

**Thì** hệ thống KHÔNG CHO PHÉP (disabled hoặc ẩn): Thay đổi Tiêu đề chính (ảnh hưởng SEO, PIM), Thay đổi Ngôn ngữ, Xóa Chương có học viên đã bắt đầu, Xóa Bài học có học viên đã hoàn thành, Thay đổi thứ tự Chương/Bài học đã có tiến độ. Hiển thị tooltip giải thích lý do khi hover

---

### AC-8: Xóa Chương/Bài học trên khóa học PUBLISHED

**Tại** form chỉnh sửa khóa học PUBLISHED, Tab 3

**Khi** Giáo viên click xóa Chương hoặc Bài học

**Thì** hệ thống kiểm tra:
- Nếu Chương/Bài học chưa có học viên tương tác: Cho phép xóa với xác nhận
- Nếu Chương/Bài học có học viên đã bắt đầu/hoàn thành: Hiển thị lỗi "Không thể xóa. Có [N] học viên đã học bài này. Vui lòng chuyển về DRAFT nếu cần xóa"

---

### AC-9: Cảnh báo khi thay đổi ảnh hưởng học viên

**Tại** form chỉnh sửa khóa học PUBLISHED

**Khi** Giáo viên thay đổi nội dung có thể ảnh hưởng học viên (ví dụ: thay video, thêm bài học bắt buộc)

**Thì** hệ thống hiển thị cảnh báo "Thay đổi này sẽ ảnh hưởng đến [N] học viên đang học. Bạn có muốn tiếp tục?" với lựa chọn Hủy/Tiếp tục

---

### AC-10: Đồng bộ thay đổi với PIM

**Tại** form chỉnh sửa khóa học PUBLISHED, sau khi lưu

**Khi** có thay đổi thông tin hiển thị trên Online Store (Mô tả, Ảnh, Curriculum...)

**Thì** hệ thống tự động đồng bộ thay đổi sang PIM, cập nhật Online Store trong < 1 phút, hiển thị thông báo "Thay đổi đã được cập nhật trên Online Store"

---

---

### PHẦN 3: CHUYỂN VỀ DRAFT (US-COURSE-024)

### AC-11: Truy cập chức năng chuyển về Draft

**Tại** trang chi tiết khóa học UNPUBLISHED

**Khi** Giáo viên click nút "Chuyển về Bản nháp" hoặc option trong menu

**Thì** hệ thống hiển thị dialog xác nhận với thông tin về ảnh hưởng

---

### AC-12: Xác nhận chuyển về Draft

**Tại** dialog xác nhận chuyển về Draft

**Khi** dialog hiển thị

**Thì** hệ thống hiển thị:
- Tiêu đề: "Chuyển khóa học về Bản nháp"
- Thông tin: Tên khóa học, Số học viên đã đăng ký
- Nội dung: "Chuyển về Draft sẽ cho phép bạn chỉnh sửa không giới hạn. Khi xuất bản lại, khóa học sẽ cần được validate lại."
- Cảnh báo (nếu có học viên): "Học viên đã đăng ký vẫn có thể tiếp tục học trong thời gian này"
- Nút "Hủy" và "Xác nhận"

---

### AC-13: Thực hiện chuyển về Draft

**Tại** dialog xác nhận

**Khi** Giáo viên click "Xác nhận"

**Thì** hệ thống thực hiện:
1. Cập nhật course.status = DRAFT
2. Giữ nguyên enrollment và tiến độ học viên
3. Publish event CourseBackToDraftEvent
4. Hiển thị thông báo "Khóa học đã chuyển về Bản nháp. Bạn có thể chỉnh sửa tự do"
5. Refresh trang với form edit DRAFT mode

---

### AC-14: Quyền chỉnh sửa sau khi chuyển về Draft

**Tại** form chỉnh sửa sau khi chuyển từ UNPUBLISHED về DRAFT

**Khi** Giáo viên muốn chỉnh sửa

**Thì** hệ thống cho phép chỉnh sửa như DRAFT mới: thay đổi Tiêu đề, thay đổi cấu trúc Chương/Bài, xóa nội dung. Hiển thị cảnh báo nếu thay đổi ảnh hưởng học viên đang học

---

---

## Alternative Paths

### ALT-1: Thoát form chỉnh sửa với thay đổi chưa lưu

**Tại** form chỉnh sửa có thay đổi chưa lưu

**Khi** Giáo viên cố gắng navigate away hoặc đóng tab

**Thì** hệ thống hiển thị dialog "Bạn có thay đổi chưa lưu. Bạn muốn?" với 3 lựa chọn: "Lưu và thoát", "Thoát không lưu", "Tiếp tục chỉnh sửa"

---

### ALT-2: Conflict khi nhiều người chỉnh sửa

**Tại** form chỉnh sửa

**Khi** có người khác đã cập nhật khóa học trong lúc đang chỉnh sửa

**Thì** hệ thống hiển thị dialog conflict: "Khóa học đã được cập nhật bởi [Người khác] lúc [Thời gian]. Bạn muốn?" với lựa chọn: "Tải lại (mất thay đổi của bạn)", "Ghi đè (giữ thay đổi của bạn)", "So sánh khác biệt"

---

### ALT-3: Chỉnh sửa khóa học UNPUBLISHED

**Tại** form chỉnh sửa khóa học UNPUBLISHED

**Khi** Giáo viên muốn chỉnh sửa

**Thì** hệ thống áp dụng quy tắc giống PUBLISHED: hạn chế một số thay đổi, cho phép thay đổi nhỏ, cung cấp option "Chuyển về Draft" để chỉnh sửa lớn

---

### ALT-4: Preview thay đổi trước khi lưu

**Tại** form chỉnh sửa

**Khi** Giáo viên click "Xem trước thay đổi"

**Thì** hệ thống mở tab preview với nội dung đã chỉnh sửa (chưa lưu), cho phép review trước khi lưu chính thức

---

## Edge Cases & Error Conditions

### ERR-1: Session hết hạn khi đang chỉnh sửa

**Tại** form chỉnh sửa

**Khi** session hết hạn trong quá trình chỉnh sửa

**Thì** hệ thống lưu thay đổi vào localStorage, redirect đến trang đăng nhập, sau khi đăng nhập lại khôi phục thay đổi và hiển thị thông báo

---

### ERR-2: Server error khi lưu

**Tại** form chỉnh sửa, đang lưu

**Khi** server trả về lỗi

**Thì** hệ thống hiển thị thông báo lỗi cụ thể, giữ nguyên dữ liệu trên form, cho phép retry

---

### ERR-3: Validation error

**Tại** form chỉnh sửa

**Khi** dữ liệu không hợp lệ

**Thì** hệ thống highlight trường lỗi, hiển thị message cụ thể, không cho phép lưu cho đến khi sửa

---

### ERR-4: File upload thất bại

**Tại** form chỉnh sửa, đang upload ảnh/video

**Khi** upload thất bại

**Thì** hệ thống hiển thị lỗi "Upload thất bại: [Lý do]", cho phép retry, không mất các thay đổi khác

---

### ERR-5: Optimistic locking conflict

**Tại** form chỉnh sửa

**Khi** version mismatch khi lưu

**Thì** hệ thống thông báo "Dữ liệu đã được cập nhật bởi người khác", cung cấp option reload hoặc force save

---

## Inline Business Rules

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|-----------------|-------|---------------|---------|
| Trạng thái DRAFT | BR_001 | Cho phép chỉnh sửa không giới hạn tất cả trường | Full edit access |
| Trạng thái PUBLISHED | BR_002 | Hạn chế thay đổi Tiêu đề, Ngôn ngữ, xóa content có enrollment | Protected fields |
| Trạng thái UNPUBLISHED | BR_003 | Quy tắc giống PUBLISHED, có option chuyển về DRAFT | Same as PUBLISHED |
| Trạng thái ARCHIVED | BR_004 | Không cho phép chỉnh sửa | Read-only |
| Xóa bài học | BR_006 | Không cho phép xóa bài học có enrollment > 0 khi PUBLISHED | Protect learner progress |
| Chuyển về DRAFT | BR_007 | Chỉ khóa học UNPUBLISHED mới được chuyển về DRAFT | Valid transition |
| PIM sync | BR_008 | Tự động sync thay đổi metadata sang PIM khi PUBLISHED | Real-time sync |
<!--| Auto-save | BR_005 | Trigger sau 3 giây idle | Chỉ áp dụng cho DRAFT |-->

---

## System Rules

1. Optimistic locking với version field để tránh conflict
3. Thay đổi trên PUBLISHED course phải sync với PIM trong < 1 phút
4. Audit log ghi nhận mọi thay đổi với before/after value
5. LocalStorage backup cho unsaved changes
6. Enrollment data không bị ảnh hưởng khi chuyển status
<!--2. Auto-save sử dụng debounce 3 giây -->

---

## Business Value & Success Metrics

Story này cung cấp khả năng cập nhật và hoàn thiện khóa học linh hoạt, đảm bảo chất lượng nội dung mà không làm gián đoạn học viên.

**Trọng số của story này là:** Cao (Core functionality)

Story được coi là thành công khi đảm bảo được:

- Auto-save hoạt động 100% reliable
- 0% data loss do session timeout hoặc browser crash
- 100% thay đổi PUBLISHED course sync với PIM thành công
- 0% enrollment bị mất khi chuyển status

---

## Dependencies

| Loại | Mô tả | Ghi chú |
|------|-------|---------|
| Service | dịch vụ quản lý khóa học | CRUD operations |
| Service | dịch vụ quản lý sản phẩm | Sync PIM changes |
| Service | dịch vụ quản lý chương trình | Update curriculum |
| Service | dịch vụ quản lý nội dung | Upload assets |
| US | US-COURSE-001 | Course phải tồn tại |
| US | US-COURSE-017 | Course có thể đã được publish |

---

## Impact Analysis

| Đối tượng ảnh hưởng | Mô tả ảnh hưởng |
|---------------------|-----------------|
| Giáo viên INDIVIDUAL | Có khả năng cập nhật khóa học với quyền phù hợp theo trạng thái |
| Học viên đã đăng ký | Được bảo vệ khỏi thay đổi phá hoại tiến độ học |
| Online Store | Hiển thị thông tin cập nhật real-time |
| PIM | Luôn đồng bộ với course data |

---

## UI/UX Design

### Mô tả UI chính

**Form chỉnh sửa DRAFT:**
- Full edit mode
- Auto-save indicator ở header: "Đã lưu lúc HH:mm" hoặc "Đang lưu..."
- Tất cả fields có thể edit
- Nút "Lưu" và "Xem trước"

**Form chỉnh sửa PUBLISHED:**
- Banner cảnh báo ở đầu form
- Fields protected hiển thị disabled với lock icon
- Tooltip giải thích khi hover trên disabled field
- Nút "Lưu thay đổi" thay vì "Lưu"
- Badge "Đã xuất bản" ở header

**Form chỉnh sửa UNPUBLISHED:**
- Tương tự PUBLISHED
- Thêm nút "Chuyển về Bản nháp" trong header

**Dialog Conflict:**
- Title: "Xung đột dữ liệu"
- Thông tin: Ai đã thay đổi, lúc nào
- 3 buttons: "Tải lại", "Ghi đè", "So sánh"

**Dialog Chuyển về Draft:**
- Title với icon warning
- Summary: Tên khóa học, số học viên
- Note về ảnh hưởng
- Buttons: "Hủy" | "Xác nhận"

---

## Out of Scope Items

| Item | Lý do |
|------|-------|
| Version history và rollback | Phạm vi phase sau |
| Collaborative editing (real-time) | Chỉ áp dụng cho PRIVATE_SCHOOL |
| Scheduled changes | Phạm vi phase sau |
| Bulk edit nhiều khóa học | Phạm vi phase sau |
