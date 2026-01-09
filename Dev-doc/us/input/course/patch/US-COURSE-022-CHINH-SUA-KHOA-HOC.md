US-COURSE-022: Chỉnh sửa khóa học theo trạng thái
Lịch sử thay đổi
Ngày thay đổi

Vị trí thay đổi

A*, M, D

Mô tả thay đổi

Phiên bản

08/12/2025

-

A

Tạo mới US Tạo bài học

1.0

16/12/2025

-

M

Bổ sung "PHẦN 0: ĐIỀU KIỆN CHO PHÉP CHỈNH SỬA THEO TRẠNG THÁI" và các AC đi kèm
AC-1: Điều chỉnh các thông tin được phép chỉnh sửa
Điều chỉnh "PHẦN 2: CHỈNH SỬA KHÓA HỌC PUBLISHED (US-COURSE-023)" thành "PHẦN 2: CHỈNH SỬA KHÓA HỌC UNPUBLISHED (US-COURSE-023)" và AC-5
Bổ sung AC-5A, AC-5B, AC-5C, AC-5D, AC-5E

2.0

Người tạo: @BA Team | Reviewer: - | Approve by: - | Trạng thái: DRAFT

User Story Content
Là một Giáo viên tự do (INDIVIDUAL)

Tôi muốn chỉnh sửa thông tin và nội dung khóa học với các quyền khác nhau tùy theo trạng thái tại trang quản lý khóa học

Để cập nhật và hoàn thiện khóa học một cách linh hoạt mà không ảnh hưởng đến học viên đã đăng ký

Acceptance Criteria
PHẦN 0: ĐIỀU KIỆN CHO PHÉP CHỈNH SỬA THEO TRẠNG THÁI
AC-0A: Quy tắc hành động chỉnh sửa theo trạng thái khóa học
Tại hệ thống quản lý khóa học INDIVIDUAL

Khi Giáo viên muốn chỉnh sửa khóa học

Thì hệ thống áp dụng quy tắc sau theo trạng thái:

Trạng thái

Cho phép chỉnh sửa

Ghi chú

Bản nháp-DRAFT

✅ Có - Không giới hạn

Chỉnh sửa tự do tất cả nội dung

Đã xuất bản-PUBLISHED

❌ Không

Chỉ đọc, không thể chỉnh sửa

Đã ẩn-UNPUBLISHED

⚠️ Hạn chế

Giống PUBLISHED, có option chuyển về DRAFT

Đã lưu trữ-ARCHIVED

❌ Không

Chỉ đọc, không thể chỉnh sửa

AC-0B: Validation - Không cho phép chỉnh sửa khóa học ARCHIVED
Tại danh sách khóa học hoặc trang chi tiết khóa học có trạng thái Đã lưu trữ-ARCHIVED

Khi Giáo viên cố gắng truy cập chức năng chỉnh sửa

Thì hệ thống:

Ẩn hoặc vô hiệu hóa (disabled) nút "Chỉnh sửa"

Nếu truy cập trực tiếp qua URL: Hiển thị thông báo "Không thể chỉnh sửa khóa học đã lưu trữ"

Chuyển hướng về trang chi tiết khóa học ở chế độ chỉ đọc (read-only)

AC-0C: Validation - Không cho phép chỉnh sửa khóa học PUBLISH
Tại danh sách khóa học hoặc trang chi tiết khóa học có trạng thái Đã xuất bản - PUBLISH

Khi Giáo viên cố gắng truy cập chức năng chỉnh sửa

Thì hệ thống:

Ẩn hoặc vô hiệu hóa (disabled) nút "Chỉnh sửa"

Nếu truy cập trực tiếp qua URL: Hiển thị thông báo "Không thể chỉnh sửa khóa học đã xuất bản"

Chuyển hướng về trang chi tiết khóa học ở chế độ chỉ đọc (read-only)

AC-0D: Hiển thị nút chỉnh sửa theo trạng thái
Tại danh sách khóa học hoặc trang chi tiết khóa học

Khi trang được tải

Thì hệ thống hiển thị nút "Chỉnh sửa" với các trạng thái:

Trạng thái khóa học

Hiển thị nút

Trạng thái nút

Bản nháp-DRAFT

Có

Enabled - "Chỉnh sửa"

Đã xuất bản-PUBLISHED

Không hoặc Disabled

Disabled - "Chỉnh sửa" (với cảnh báo)

Đã ẩn-UNPUBLISHED

Có

Enabled - "Chỉnh sửa" (với cảnh báo)

Đã lưu trữ-ARCHIVED

Không hoặc Disabled

Ẩn hoặc Disabled với tooltip "Khóa học đã lưu trữ không thể chỉnh sửa"

PHẦN 1: CHỈNH SỬA KHÓA HỌC DRAFT (US-COURSE-022)
AC-1: Truy cập chỉnh sửa khóa học DRAFT
Tại danh sách khóa học hoặc trang chi tiết khóa học DRAFT

Khi Giáo viên click nút "Chỉnh sửa"

Thì hệ thống hiển thị form chỉnh sửa đầy đủ với tất cả các Tab có thể chỉnh sửa: Tab 1 (Thông tin chung), Tab 2 (Nội dung khóa học)

AC-2: Chỉnh sửa không giới hạn ở trạng thái DRAFT
Tại form chỉnh sửa khóa học DRAFT

Khi Giáo viên thực hiện bất kỳ thay đổi nào

Thì hệ thống cho phép: thay đổi tất cả thông tin cơ bản (Tiêu đề, Mô tả, Ngôn ngữ, Độ khó...), thay đổi thông tin học thuật (Mục tiêu, Yêu cầu, Đối tượng...), thêm/sửa/xóa Chương và Bài học không giới hạn, thay đổi ảnh/video đại diện, upload lại video bài giảng

AC-4: Lưu thủ công
Tại form chỉnh sửa khóa học DRAFT

Khi Giáo viên click nút "Lưu"

Thì hệ thống lưu tất cả thay đổi, hiển thị thông báo "Đã lưu thành công", cập nhật course.updated_at

PHẦN 2: CHỈNH SỬA KHÓA HỌC UNPUBLISHED
AC-5: Truy cập chỉnh sửa khóa học UNPUBLISHED
Tại danh sách khóa học hoặc trang chi tiết khóa học UNPUBLISHED

Khi Giáo viên click nút "Chỉnh sửa"

Thì hệ thống hiển thị form chỉnh sửa với cảnh báo "Khóa học đã được ẩn. Một số thay đổi có thể ảnh hưởng đến học viên đã đăng ký" và hiển thị các trường với quyền hạn chế (giống PUBLISHED)

AC-5A: Thay đổi được phép trên khóa học UNPUBLISHED
Tại form chỉnh sửa khóa học UNPUBLISHED

Khi Giáo viên muốn chỉnh sửa

Thì hệ thống CHO PHÉP thay đổi (giống PUBLISHED):

Tiêu đề phụ (subtitle), Mô tả khóa học

Mục tiêu học tập (thêm mới, KHÔNG xóa), Ảnh/video đại diện

Thêm Chương và Bài học MỚI

Thêm tài nguyên vào bài học

Cập nhật video với version mới (replace)

AC-5B: Thay đổi bị hạn chế trên khóa học UNPUBLISHED
Tại form chỉnh sửa khóa học UNPUBLISHED

Khi Giáo viên cố gắng thay đổi các thông tin không được phép chỉnh sửa

Thì hệ thống KHÔNG CHO PHÉP (disabled hoặc ẩn) - giống PUBLISHED:

AC-5C: Option chuyển về DRAFT từ UNPUBLISHED
Tại form chỉnh sửa khóa học UNPUBLISHED

Khi Giáo viên cần thực hiện thay đổi lớn (xóa bài học, đổi cấu trúc...)

Thì hệ thống hiển thị:

Nút "Chuyển về Bản nháp" ở header form

Tooltip: "Chuyển về Bản nháp để chỉnh sửa không giới hạn"

Click vào sẽ trigger flow AC-11 đến AC-14 (PHẦN 3)

AC-5D: Xóa Chương/Bài học trên khóa học UNPUBLISHED
Tại form chỉnh sửa khóa học UNPUBLISHED

Khi Giáo viên click xóa Chương hoặc Bài học

Thì hệ thống kiểm tra:

Nếu Chương/Bài học chưa có học viên tương tác: Cho phép xóa với xác nhận

Nếu Chương/Bài học có học viên đã bắt đầu/hoàn thành: Hiển thị lỗi "Không thể xóa. Có [N] học viên đã học bài này. Vui lòng chuyển về DRAFT nếu cần xóa"

AC-5E: Cảnh báo khi thay đổi ảnh hưởng học viên (UNPUBLISHED)
Tại form chỉnh sửa khóa học UNPUBLISHED

Khi Giáo viên thay đổi nội dung có thể ảnh hưởng học viên (thay video, thêm bài học bắt buộc)

Thì hệ thống hiển thị cảnh báo "Thay đổi này sẽ ảnh hưởng đến [N] học viên đã đăng ký. Bạn có muốn tiếp tục?" với lựa chọn Hủy/Tiếp tục

Lưu ý: Không có PHẦN riêng cho PUBLISHED
Theo quy tắc hành động trong Glossary: Khóa học PUBLISHED không cho phép chỉnh sửa. Giáo viên cần Unpublish khóa học trước, sau đó mới có thể chỉnh sửa ở trạng thái UNPUBLISHED. Các AC-6 đến AC-10 bên dưới được giữ lại để tham khảo nhưng đã được comment out.

PHẦN 3: CHUYỂN VỀ DRAFT (US-COURSE-024)
AC-11: Truy cập chức năng chuyển về Draft
Tại trang chi tiết khóa học UNPUBLISHED

Khi Giáo viên click nút "Chuyển về Bản nháp" hoặc option trong menu

Thì hệ thống hiển thị dialog xác nhận với thông tin về ảnh hưởng

AC-12: Xác nhận chuyển về Draft
Tại dialog xác nhận chuyển về Draft

Khi dialog hiển thị

Thì hệ thống hiển thị:

Tiêu đề: "Chuyển khóa học về Bản nháp"

Thông tin: Tên khóa học, Số học viên đã đăng ký

Nội dung: "Chuyển về Draft sẽ cho phép bạn chỉnh sửa không giới hạn. Khi xuất bản lại, khóa học sẽ cần được validate lại."

Cảnh báo (nếu có học viên): "Học viên đã đăng ký vẫn có thể tiếp tục học trong thời gian này"

Nút "Hủy" và "Xác nhận"

AC-13: Thực hiện chuyển về Draft
Tại dialog xác nhận

Khi Giáo viên click "Xác nhận"

Thì hệ thống thực hiện:

Cập nhật course.status = DRAFT

Giữ nguyên enrollment và tiến độ học viên

Publish event CourseBackToDraftEvent

Hiển thị thông báo "Khóa học đã chuyển về Bản nháp. Bạn có thể chỉnh sửa tự do"

Refresh trang với form edit DRAFT mode

AC-14: Quyền chỉnh sửa sau khi chuyển về Draft
Tại form chỉnh sửa sau khi chuyển từ UNPUBLISHED về DRAFT

Khi Giáo viên muốn chỉnh sửa

Thì hệ thống cho phép chỉnh sửa như DRAFT mới: thay đổi Tiêu đề, thay đổi cấu trúc Chương/Bài, xóa nội dung. Hiển thị cảnh báo nếu thay đổi ảnh hưởng học viên đang học

Alternative Paths
ALT-1: Thoát form chỉnh sửa với thay đổi chưa lưu
Tại form chỉnh sửa có thay đổi chưa lưu

Khi Giáo viên cố gắng navigate away hoặc đóng tab

Thì hệ thống hiển thị dialog "Bạn có thay đổi chưa lưu. Bạn muốn?" với 3 lựa chọn: "Lưu và thoát", "Thoát không lưu", "Tiếp tục chỉnh sửa"

ALT-2: Conflict khi nhiều người chỉnh sửa
Tại form chỉnh sửa

Khi có người khác đã cập nhật khóa học trong lúc đang chỉnh sửa

Thì hệ thống hiển thị dialog conflict: "Khóa học đã được cập nhật bởi [Người khác] lúc [Thời gian]. Bạn muốn?" với lựa chọn: "Tải lại (mất thay đổi của bạn)", "Ghi đè (giữ thay đổi của bạn)", "So sánh khác biệt"

ALT-3: Chỉnh sửa khóa học UNPUBLISHED
Tại form chỉnh sửa khóa học UNPUBLISHED

Khi Giáo viên muốn chỉnh sửa

Thì hệ thống áp dụng quy tắc giống PUBLISHED: hạn chế một số thay đổi, cho phép thay đổi nhỏ, cung cấp option "Chuyển về Draft" để chỉnh sửa lớn

ALT-4: Preview thay đổi trước khi lưu
Tại form chỉnh sửa

Khi Giáo viên click "Xem trước thay đổi"

Thì hệ thống mở tab preview với nội dung đã chỉnh sửa (chưa lưu), cho phép review trước khi lưu chính thức

Edge Cases & Error Conditions
ERR-1: Session hết hạn khi đang chỉnh sửa
Tại form chỉnh sửa

Khi session hết hạn trong quá trình chỉnh sửa

Thì hệ thống lưu thay đổi vào localStorage, redirect đến trang đăng nhập, sau khi đăng nhập lại khôi phục thay đổi và hiển thị thông báo

ERR-2: Server error khi lưu
Tại form chỉnh sửa, đang lưu

Khi server trả về lỗi

Thì hệ thống hiển thị thông báo lỗi cụ thể, giữ nguyên dữ liệu trên form, cho phép retry

ERR-3: Validation error
Tại form chỉnh sửa

Khi dữ liệu không hợp lệ

Thì hệ thống highlight trường lỗi, hiển thị message cụ thể, không cho phép lưu cho đến khi sửa

ERR-4: File upload thất bại
Tại form chỉnh sửa, đang upload ảnh/video

Khi upload thất bại

Thì hệ thống hiển thị lỗi "Upload thất bại: [Lý do]", cho phép retry, không mất các thay đổi khác

ERR-5: Optimistic locking conflict
Tại form chỉnh sửa

Khi version mismatch khi lưu

Thì hệ thống thông báo "Dữ liệu đã được cập nhật bởi người khác", cung cấp option reload hoặc force save

Inline Business Rules
Trường thông tin

Mã BR

Business Rule

Ghi chú

Trạng thái DRAFT

BR_001

Cho phép chỉnh sửa không giới hạn tất cả trường

Full edit access

Trạng thái PUBLISHED

BR_002

Hạn chế thay đổi Tiêu đề, Ngôn ngữ, xóa content có enrollment

Protected fields

Trạng thái UNPUBLISHED

BR_003

Quy tắc giống PUBLISHED, có option chuyển về DRAFT

Same as PUBLISHED

Trạng thái ARCHIVED

BR_004

Không cho phép chỉnh sửa

Read-only

Xóa bài học

BR_006

Không cho phép xóa bài học có enrollment > 0 khi PUBLISHED

Protect learner progress

Chuyển về DRAFT

BR_007

Chỉ khóa học UNPUBLISHED mới được chuyển về DRAFT

Valid transition

PIM sync

BR_008

Tự động sync thay đổi metadata sang PIM khi PUBLISHED

Real-time sync

System Rules
Optimistic locking với version field để tránh conflict

Thay đổi trên PUBLISHED course phải sync với PIM trong < 1 phút

Audit log ghi nhận mọi thay đổi với before/after value

LocalStorage backup cho unsaved changes

Enrollment data không bị ảnh hưởng khi chuyển status

Business Value & Success Metrics
Story này cung cấp khả năng cập nhật và hoàn thiện khóa học linh hoạt, đảm bảo chất lượng nội dung mà không làm gián đoạn học viên.

Trọng số của story này là: Cao (Core functionality)

Story được coi là thành công khi đảm bảo được:

Auto-save hoạt động 100% reliable

0% data loss do session timeout hoặc browser crash

100% thay đổi PUBLISHED course sync với PIM thành công

0% enrollment bị mất khi chuyển status

Dependencies
Loại

Mô tả

Ghi chú

Service

dịch vụ quản lý khóa học

CRUD operations

Service

dịch vụ quản lý sản phẩm

Sync PIM changes

Service

dịch vụ quản lý chương trình

Update curriculum

Service

dịch vụ quản lý nội dung

Upload assets

US

US-COURSE-001

Course phải tồn tại

US

US-COURSE-017

Course có thể đã được publish

Impact Analysis
Đối tượng ảnh hưởng

Mô tả ảnh hưởng

Giáo viên INDIVIDUAL

Có khả năng cập nhật khóa học với quyền phù hợp theo trạng thái

Học viên đã đăng ký

Được bảo vệ khỏi thay đổi phá hoại tiến độ học

Online Store

Hiển thị thông tin cập nhật real-time

PIM

Luôn đồng bộ với course data

UI/UX Design
Mô tả UI chính
Form chỉnh sửa DRAFT:

Full edit mode

Auto-save indicator ở header: "Đã lưu lúc HH:mm" hoặc "Đang lưu..."

Tất cả fields có thể edit

Nút "Lưu" và "Xem trước"

Form chỉnh sửa PUBLISHED:

Banner cảnh báo ở đầu form

Fields protected hiển thị disabled với lock icon

Tooltip giải thích khi hover trên disabled field

Nút "Lưu thay đổi" thay vì "Lưu"

Badge "Đã xuất bản" ở header

Form chỉnh sửa UNPUBLISHED:

Tương tự PUBLISHED

Thêm nút "Chuyển về Bản nháp" trong header

Dialog Conflict:

Title: "Xung đột dữ liệu"

Thông tin: Ai đã thay đổi, lúc nào

3 buttons: "Tải lại", "Ghi đè", "So sánh"

Dialog Chuyển về Draft:

Title với icon warning

Summary: Tên khóa học, số học viên

Note về ảnh hưởng

Buttons: "Hủy" | "Xác nhận"

Out of Scope Items
Item

Lý do

Version history và rollback

Phạm vi phase sau

Collaborative editing (real-time)

Chỉ áp dụng cho PRIVATE_SCHOOL

Scheduled changes

Phạm vi phase sau

Bulk edit nhiều khóa học

Phạm vi phase sau

