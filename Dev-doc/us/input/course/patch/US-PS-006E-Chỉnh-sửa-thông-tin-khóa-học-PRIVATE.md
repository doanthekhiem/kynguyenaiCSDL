US-PS-006E - Chỉnh sửa thông tin khóa học PRIVATE
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

Chỉnh sửa User story content
Gạch bỏ AC1 -> AC8
Bổ sung các phần "PHẦN 0", "PHẦN 1", "PHẦN 2", "PHẦN 3", "PHẦN 4", "PHẦN 5", "PHẦN 6" và các AC đi kèm
AC-9: Sửa lại toàn bộ AC9
AC-10: Sửa lại toàn bộ AC10
AC-11: Sửa lại toàn bộ AC11
Bổ sung AC-12
CHỉnh sửa lại Inline business rule, Impact Analysis

2.0

User story Title
US-PS-006E - Chỉnh sửa thông tin khóa học PRIVATE (Edit PRIVATE Course Information)

Là một School Admin của trường tư

Tôi muốn thực hiện chỉnh sửa thông tin cơ bản và cấu hình của khóa học PRIVATE với các quyền khác nhau tùy theo trạng thái tại trang Course Detail của sản phẩm LMS

Để cập nhật thông tin khóa học kịp thời, điều chỉnh cấu hình phù hợp với yêu cầu thực tế, và duy trì tính chính xác của dữ liệu khóa học mà không ảnh hưởng đến học viên đã đăng ký

Acceptance criteria
PHẦN 0: ĐIỀU KIỆN CHO PHÉP CHỈNH SỬA THEO TRẠNG THÁI
AC-0A: Quy tắc hành động chỉnh sửa theo trạng thái khóa học PRIVATE_SCHOOL
Tại hệ thống quản lý khóa học PRIVATE_SCHOOL

Khi School Admin muốn chỉnh sửa khóa học

Thì hệ thống áp dụng quy tắc sau theo trạng thái:

Trạng thái

Cho phép chỉnh sửa

Ghi chú

Bản nháp-DRAFT

✅ Có - Không giới hạn

Chỉnh sửa tự do tất cả nội dung

Đang mời giảng viên-INVITING_INSTRUCTORS

✅ Có - Không giới hạn

Có thể thay đổi curriculum, thêm/bớt scope

Đang xây dựng nội dung-CONTENT_BUILDING

⚠️ Hạn chế

Không xóa section đã có content submission

Sẵn sàng review-READY_FOR_REVIEW

⚠️ Hạn chế

Chỉ metadata, không thay đổi cấu trúc

Nội dung đã duyệt-CONTENT_APPROVED

⚠️ Hạn chế

Chỉ pricing, marketing info

Sẵn sàng PIM-PIM_READY

⚠️ Hạn chế

Chỉ final review settings

Đã xuất bản-PUBLISHED

❌ Không

Chỉ đọc, không thể chỉnh sửa

Đã ẩn-UNPUBLISHED

⚠️ Hạn chế

Minor edits, có option chuyển về CONTENT_BUILDING

Đã lưu trữ-ARCHIVED

❌ Không

Chỉ đọc, không thể chỉnh sửa

AC-0B: Validation - Không cho phép chỉnh sửa khóa học PUBLISHED
Tại danh sách khóa học hoặc trang chi tiết khóa học có trạng thái Đã xuất bản-PUBLISHED

Khi School Admin cố gắng truy cập chức năng chỉnh sửa

Thì hệ thống:

Ẩn hoặc vô hiệu hóa (disabled) nút "Chỉnh sửa"

Nếu truy cập trực tiếp qua URL: Hiển thị thông báo "Không thể chỉnh sửa khóa học đã xuất bản. Vui lòng Unpublish trước."

Chuyển hướng về trang chi tiết khóa học ở chế độ chỉ đọc (read-only)

AC-0C: Validation - Không cho phép chỉnh sửa khóa học ARCHIVED
Tại danh sách khóa học hoặc trang chi tiết khóa học có trạng thái Đã lưu trữ-ARCHIVED

Khi School Admin cố gắng truy cập chức năng chỉnh sửa

Thì hệ thống:

Ẩn hoặc vô hiệu hóa (disabled) nút "Chỉnh sửa"

Nếu truy cập trực tiếp qua URL: Hiển thị thông báo "Không thể chỉnh sửa khóa học đã lưu trữ"

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

Đang mời giảng viên-INVITING_INSTRUCTORS

Có

Enabled - "Chỉnh sửa"

Đang xây dựng nội dung-CONTENT_BUILDING

Có

Enabled - "Chỉnh sửa" (với cảnh báo)

Sẵn sàng review-READY_FOR_REVIEW

Có

Enabled - "Chỉnh sửa" (với cảnh báo)

Nội dung đã duyệt-CONTENT_APPROVED

Có

Enabled - "Chỉnh sửa" (với cảnh báo)

Sẵn sàng PIM-PIM_READY

Có

Enabled - "Chỉnh sửa" (với cảnh báo)

Đã xuất bản-PUBLISHED

Disabled

Ẩn hoặc Disabled với tooltip

Đã ẩn-UNPUBLISHED

Có

Enabled - "Chỉnh sửa" (với cảnh báo)

Đã lưu trữ-ARCHIVED

Disabled

Ẩn hoặc Disabled với tooltip

PHẦN 1: CHỈNH SỬA KHÓA HỌC GIAI ĐOẠN SETUP (DRAFT, INVITING_INSTRUCTORS)
AC-1: Chỉnh sửa không giới hạn ở trạng thái DRAFT
Tại trang chi tiết khóa học có trạng thái Bản nháp-DRAFT

Khi School Admin click nút "Chỉnh sửa"

Thì hệ thống hiển thị form chỉnh sửa đầy đủ với tất cả các trường có thể chỉnh sửa:

Môn học, Chủ đề, Đối tượng phù hợp, Lớp

Trình độ, Chứng chỉ, Ngôn ngữ giảng dạy

Tiêu đề khóa học, Mô tả khóa học, Tóm tắt ngắn

Hình thức học,

Bài tập về nhà, Đầu ra học tập

Ảnh/video đại diện

AC-2: Chỉnh sửa ở trạng thái INVITING_INSTRUCTORS
Tại trang chi tiết khóa học có trạng thái Đang mời giảng viên-INVITING_INSTRUCTORS

Khi School Admin click nút "Chỉnh sửa"

Thì hệ thống:

Hiển thị form chỉnh sửa đầy đủ (giống DRAFT)

CHO PHÉP thay đổi contribution_scope của giảng viên đã mời

Khi thay đổi scope: Gửi notification cho giảng viên liên quan

PHẦN 2: CHỈNH SỬA KHÓA HỌC GIAI ĐOẠN XÂY DỰNG (CONTENT_BUILDING)
AC-3: Chỉnh sửa hạn chế ở trạng thái CONTENT_BUILDING
Tại trang chi tiết khóa học có trạng thái Đang xây dựng nội dung-CONTENT_BUILDING

Khi School Admin click nút "Chỉnh sửa"

Thì hệ thống hiển thị form chỉnh sửa với cảnh báo "Khóa học đang được xây dựng bởi giảng viên. Một số thay đổi có thể ảnh hưởng đến công việc của họ"

AC-3A: Thay đổi được phép ở CONTENT_BUILDING
Tại form chỉnh sửa khóa học CONTENT_BUILDING

Khi School Admin muốn chỉnh sửa

Thì hệ thống CHO PHÉP thay đổi:

Tiêu đề khóa học, Mô tả khóa học, Tóm tắt ngắn

Ảnh/video đại diện

Bài tập về nhà, Đầu ra học tập

AC-3B: Thay đổi bị hạn chế ở CONTENT_BUILDING
Tại form chỉnh sửa khóa học CONTENT_BUILDING

Khi School Admin cố gắng thay đổi

Thì hệ thống KHÔNG CHO PHÉP (disabled hoặc ẩn):

Thay đổi contribution_scope đã được giảng viên bắt đầu làm

Đổi giảng viên chủ trì-OWNER

Hiển thị tooltip "Không thể xóa/thay đổi vì đã có nội dung được submit"

PHẦN 3: CHỈNH SỬA KHÓA HỌC GIAI ĐOẠN REVIEW (READY_FOR_REVIEW, CONTENT_APPROVED, PIM_READY)
AC-4: Chỉnh sửa hạn chế ở trạng thái READY_FOR_REVIEW
Tại trang chi tiết khóa học có trạng thái Sẵn sàng review-READY_FOR_REVIEW

Khi School Admin click nút "Chỉnh sửa"

Thì hệ thống CHỈ CHO PHÉP thay đổi:

Tiêu đề khóa học, Mô tả khóa học, Tóm tắt ngắn

Ảnh/video đại diện

AC-5: Chỉnh sửa hạn chế ở trạng thái CONTENT_APPROVED
Tại trang chi tiết khóa học có trạng thái Nội dung đã duyệt-CONTENT_APPROVED

Khi School Admin click nút "Chỉnh sửa"

Thì hệ thống CHỈ CHO PHÉP thay đổi:

Tiêu đề khóa học, Mô tả khóa học, Tóm tắt ngắn

Ảnh/video đại diện

KHÔNG CHO PHÉP thay đổi nội dung đã được duyệt

AC-6: Chỉnh sửa hạn chế ở trạng thái PIM_READY
Tại trang chi tiết khóa học có trạng thái Sẵn sàng PIM-PIM_READY

Khi School Admin click nút "Chỉnh sửa"

Thì hệ thống CHỈ CHO PHÉP thay đổi:

Tiêu đề khóa học, Mô tả khóa học, Tóm tắt ngắn

Ảnh/video đại diện

PHẦN 4: CHỈNH SỬA KHÓA HỌC UNPUBLISHED
AC-7: Chỉnh sửa hạn chế ở trạng thái UNPUBLISHED
Tại trang chi tiết khóa học có trạng thái Đã ẩn-UNPUBLISHED

Khi School Admin click nút "Chỉnh sửa"

Thì hệ thống hiển thị form chỉnh sửa với cảnh báo "Khóa học đã được ẩn. Một số thay đổi có thể ảnh hưởng đến học viên đã đăng ký"

AC-7A: Thay đổi được phép trên khóa học UNPUBLISHED
Tại form chỉnh sửa khóa học UNPUBLISHED

Khi School Admin muốn chỉnh sửa

Thì hệ thống CHO PHÉP thay đổi:

Mô tả khóa học, Tóm tắt ngắn

Ảnh/video đại diện

AC-7C: Option quay về CONTENT_BUILDING từ UNPUBLISHED
Tại form chỉnh sửa khóa học UNPUBLISHED

Khi School Admin cần thực hiện thay đổi lớn

Thì hệ thống hiển thị:

Nút "Quay về giai đoạn xây dựng" ở header form

Dialog xác nhận: "Quay về giai đoạn xây dựng nội dung sẽ cho phép chỉnh sửa không giới hạn. Khóa học cần phải đi qua quy trình review lại trước khi xuất bản."

Khi xác nhận: Cập nhật status = CONTENT_BUILDING

PHẦN 5: VALIDATION VÀ XỬ LÝ CHUNG
AC-8: Lưu thay đổi thành công
Tại form chỉnh sửa khóa học (các trạng thái cho phép)

Khi School Admin click nút "Lưu"

Thì hệ thống:

Validate dữ liệu nhập vào theo business rules

Lưu thay đổi với transaction

Ghi log lịch sử thay đổi vào audit_log

Hiển thị thông báo "Đã cập nhật thành công"

Tự động refresh dữ liệu trên trang

AC-9: Validation - Kiểm tra quyền chỉnh sửa
Tại API PUT /api/courses/{courseId}

Khi người dùng cố gắng chỉnh sửa khóa học

Thì hệ thống kiểm tra:

Quyền: School Admin của trường (tenant_id match)

Trạng thái: Không phải PUBLISHED hoặc ARCHIVED

Trả về 403 nếu không có quyền với thông báo phù hợp

Ghi log nỗ lực chỉnh sửa trái phép

AC-10: Validation - Kiểm tra dữ liệu nhập
Tại form chỉnh sửa khi nhấn "Lưu"

Khi dữ liệu không hợp lệ

Thì hệ thống validate:

Tiêu đề 10-200 ký tự

Mô tả ngắn tối đa 500 ký tự

Thumbnail không vượt quá 2MB và định dạng JPG/PNG

Tags không chứa ký tự đặc biệt

Category phải thuộc danh sách hợp lệ

Hiển thị error message bên cạnh trường lỗi, highlight trường lỗi bằng viền đỏ

AC-11: Preview thay đổi trước khi lưu
Tại form chỉnh sửa bất kỳ

Khi School Admin nhấn nút "Xem trước"

Thì hệ thống hiển thị modal preview với giao diện như learner sẽ thấy, áp dụng tất cả thay đổi trong preview (không lưu vào database), cho phép đóng preview và tiếp tục chỉnh sửa

AC-12: Lịch sử thay đổi
Tại tab "Lịch sử" trong trang Chi tiết Khóa học

Khi School Admin xem lịch sử thay đổi

Thì hệ thống hiển thị timeline các thay đổi:

Ngày giờ, Người thực hiện

Loại thay đổi (Edit info/Edit settings)

Chi tiết thay đổi (before/after)

Cho phép so sánh giữa 2 phiên bản

PHẦN 6: EDGE CASES & ERROR CONDITIONS
AC-13: Xử lý conflict khi nhiều người chỉnh sửa
Tại form chỉnh sửa

Khi người khác đã lưu thay đổi trong khi Admin đang chỉnh sửa

Thì hệ thống:

Kiểm tra updated_at trước khi lưu

Nếu phát hiện conflict: Hiển thị modal cảnh báo "Khóa học đã được [Tên người] cập nhật lúc [thời gian]"

Cho phép: "Xem thay đổi của họ", "Ghi đè thay đổi của họ", "Hủy"

Ghi log conflict resolution

AC-14: Session hết hạn khi đang chỉnh sửa
Tại form chỉnh sửa

Khi session hết hạn trong quá trình chỉnh sửa

Thì hệ thống:

Lưu thay đổi vào localStorage

Redirect đến trang đăng nhập

Sau khi đăng nhập lại: khôi phục thay đổi và hiển thị thông báo

AC-15: Thoát form chỉnh sửa với thay đổi chưa lưu
Tại form chỉnh sửa có thay đổi chưa lưu

Khi School Admin cố gắng navigate away hoặc đóng tab

Thì hệ thống hiển thị dialog "Bạn có thay đổi chưa lưu. Bạn muốn?" với 3 lựa chọn: "Lưu và thoát", "Thoát không lưu", "Tiếp tục chỉnh sửa"

Inline business rule
Trường thông tin

Mã BR

Business rule

Ghi chú

Trạng thái chỉnh sửa

BR-PS-280

Không cho phép chỉnh sửa ở PUBLISHED và ARCHIVED

Theo Glossary 1.1

CONTENT_BUILDING edit

BR-PS-281

Không xóa section/lecture đã có content submission

Bảo vệ công việc giảng viên

UNPUBLISHED edit

BR-PS-282

Không xóa section/lecture có enrollment

Bảo vệ tiến độ học viên

Version conflict

BR-PS-283

Kiểm tra updated_at trước khi lưu để phát hiện conflict

Optimistic locking

Audit log

BR-PS-284

Ghi log tất cả thay đổi vào audit_log với before/after values

Compliance requirement

System rule
UPDATE query sử dụng WHERE clause với course_id AND tenant_id để đảm bảo isolation

Optimistic locking sử dụng version field: UPDATE ... WHERE id=? AND version=?

Transaction được sử dụng cho tất cả operations cập nhật nhiều bảng

Audit log ghi vào bảng course_audit_log với fields: course_id, changed_by, changed_at, field_name, old_value, new_value

LocalStorage backup cho unsaved changes với key pattern "course:{courseId}:draft"

Cache invalidation pattern: DELETE "course:{courseId}:*"

Access control: user.role=SCHOOL_ADMIN AND user.tenant_id=course.tenant_id

Business Value & Success Metrics
Story này sẽ cung cấp khả năng chỉnh sửa và duy trì thông tin khóa học chính xác theo từng giai đoạn workflow, đảm bảo tính toàn vẹn của quy trình phê duyệt và bảo vệ công việc của giảng viên

Trọng số của story này là 8

Story được coi là thành công khi nó đảm bảo được:

100% School Admin có thể chỉnh sửa thông tin khóa học theo đúng quyền hạn của từng trạng thái

0% trường hợp chỉnh sửa được khóa học PUBLISHED hoặc ARCHIVED

100% thay đổi được ghi log vào audit trail

0% mất dữ liệu do conflict (với conflict resolution mechanism)

Dependencies
lf-course service: Cập nhật thông tin khóa học, cấu trúc, settings

lf-course service (course_audit_log table): Ghi log lịch sử thay đổi

identity service: Xác thực và kiểm tra quyền chỉnh sửa

file-storage service: Upload và lưu trữ hình ảnh thumbnail

US-PS-006A: Khóa học phải tồn tại trước khi chỉnh sửa

GLOSSARY-COURSE-MANAGEMENT.md: Quy tắc hành động theo trạng thái

Impact Analysis
School Admin: Có khả năng chỉnh sửa phù hợp với từng giai đoạn workflow

Giảng viên: Công việc được bảo vệ - không bị xóa content đã submit

Học viên đã đăng ký: Tiến độ được bảo vệ - không bị xóa section đã học

Quy trình phê duyệt: Không bị bypass - phải đi lại quy trình nếu thay đổi lớn

UI/UX Design
Form chỉnh sửa với cảnh báo theo trạng thái


┌─────────────────────────────────────────────────────────────────┐
│  ✏️ Chỉnh sửa Khóa học: Toán nâng cao Lớp 12                    │
│  Trạng thái: 🟡 Đang xây dựng nội dung                          │
│                                        [Xem trước] [Lưu] [Hủy]  │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️ Khóa học đang được xây dựng bởi giảng viên.                  │
│     Một số thay đổi có thể ảnh hưởng đến công việc của họ.      │
├─────────────────────────────────────────────────────────────────┤
│  📝 Thông tin cơ bản (Chỉnh sửa được)                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Tiêu đề khóa học *                                       │   │
│  │ [Toán nâng cao Lớp 12                                ]   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  📚 Cấu trúc chương trình (Hạn chế)                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ≡ Chương 1: Giới thiệu              [+ Thêm bài học]     │   │
│  │   ▶ Bài 1.1: Giới thiệu     🔒 Đã có submission          │   │
│  │   ▶ Bài 1.2: Kiến thức      ⏳ Đang soạn                  │   │
│  │                                                           │   │
│  │ [+ Thêm chương mới]                                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  💡 Bài học có 🔒 không thể xóa vì đã có nội dung submit       │
└─────────────────────────────────────────────────────────────────┘
Hiển thị nút chỉnh sửa theo trạng thái


DRAFT:              [Chỉnh sửa]           - Xanh, full enabled
INVITING:           [Chỉnh sửa]           - Xanh, full enabled
CONTENT_BUILDING:   [Chỉnh sửa] ⚠️        - Vàng, với warning icon
READY_FOR_REVIEW:   [Chỉnh sửa] ⚠️        - Vàng, hạn chế
CONTENT_APPROVED:   [Chỉnh sửa] ⚠️        - Vàng, rất hạn chế
PIM_READY:          [Chỉnh sửa] ⚠️        - Vàng, rất hạn chế
PUBLISHED:          [Chỉnh sửa] 🔒        - Xám, disabled
UNPUBLISHED:        [Chỉnh sửa] ⚠️        - Vàng, với warning
ARCHIVED:           [Chỉnh sửa] 🔒        - Xám, disabled
Out of Scope Item
Bulk edit: Chỉnh sửa nhiều khóa học cùng lúc

Collaborative editing: Nhiều người chỉnh sửa real-time như Google Docs

AI-powered suggestions: Gợi ý cải thiện tiêu đề, mô tả bằng AI

Advanced versioning: Branch/merge như Git

Custom fields: Cho phép Admin tự định nghĩa trường mới