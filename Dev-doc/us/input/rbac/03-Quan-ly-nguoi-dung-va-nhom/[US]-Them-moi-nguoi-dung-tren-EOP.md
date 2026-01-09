# [US] Thêm mới người dùng trên EOP

**Page ID:** 949977085
**Confluence Link:** https://aeh.atlassian.net/spaces/EES/pages/949977085

|  |  |
| --- | --- |
| Trạng thái | In progressBlue |
| Người tạo | @Dung Bùi |
| Reviewer |  |
| Approve by |  |

none

Lịch sử thay đổi
================

A – Tạo mới, M – Sửa đổi, O –

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Ngày thay đổi** | **Vị trí thay đổi** | **A\*, M, D** | **Mô tả thay đổi** | **Phiên bản confluence** |
|  |  | A |  |  |
|  |  | M | * AC-3:    + Danh sách nhóm khi thêm mới người dùng → chỉ hiển thị những nhóm có trạng thái "Đang hoạt động" | 3 |
|  |  | M | * AC-3:    + Bổ sung trường "Ứng dụng" khi tạo mới   + Bổ sung trường "Phương thức đăng nhập" khi tạo mới | 5 |

Use story content
=================

Là Ops/Policy designer trong AEH

Tôi muốn thêm mới người dùng vào trong hệ thống nội bộ EOP của mình

Để tôi có thể mở rộng đội ngũ và quản lý người dùng nội bộ theo vai trò cụ thể trong nội bộ EOP

Acceptance criteria
-------------------

### AC-1: Truy cập màn hình thêm mới người dùng

Tại màn hình danh sách người dùng

Khi người dùng bấm nút "Thêm mới người dùng"

Thì hệ thống điều hướng sang màn hình Thêm mới người dùng và cho phép người dùng nhập liệu

### AC-2: Không có quyền thêm mới người dùng

Tại màn hình danh sách người dùng

Khi không có quyền thêm mới người dùng

Thì hệ thống:

* Disable nút "Thêm mới người dùng"
* Hover → hiển thị tooltip TNT 019 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761>

### AC-3: Thêm mới người dùng thành công

Tại màn hình thêm mới người dùng

Khi nhập/ chọn đầy đủ các thông tin bắt buộc hợp lệ và bấm "Lưu"

Thì hệ thống:

* Hiển thị thông báo: TNT 038 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-038>
* Lưu thông tin thêm mới người dùng
* Đặt trạng thái người dùng là: Đang hoạt động (Active)
* Gửi Email đăng nhập/ thông báo cho người dùng vừa thêm mới thành công
* Tự động sinh ra Mã định danh tương ứng cho người dùng
* Quay lại màn hình danh sách người dùng và cập nhật lại dữ liệu màn hình danh sách người dùng

**Inline business rule**

Thông tin người dùng

|  | **Thông tin** | **Bắt buộc** | **Mô tả** | **Ghi chú** |
| --- | --- | --- | --- | --- |
| 1 | Tên người dùng | Có | * Nhập họ tên người dùng * Nhập freetext * Cho phép nhập ký tự là chữ cái, chữ số, ký tự đặc biệt và khoảng trắng. * Quy định độ dài: 255 ký tự |  |
| 2 | Email | Có | * Nhập Email của người dùng * Rule 007<https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583> |  |
| 3 | Số điện thoại | Có | * Nhập số điện thoại của người dùng * Rule 008<https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583> |  |
| 4 | Vai trò | Có | * Dropdown chọn nhiều giá trị * Danh sách giá trị: Hiển thị danh sách các vai trò có trạng thái "Đang hoạt động" cho người dùng chọn |  |
| 5 | Ứng dụng | Có | * Dropdown chọn nhiều giá trị * Danh sách giá trị:    + EOP | * Hiện tại mới chỉ có ứng dụng cho EOP |
| 6 | Phương thức đăng nhập | Có | * Dropdown chọn 1 giá trị * Danh sách giá trị:    + Email   + Số điện thoại |  |
| 7 | **Danh sách nhóm**   * Không bắt buộc * Danh sách tất cả {Nhóm} đã có trong hệ thống EOP, ở trạng thái "Đang hoạt động", ~~"Không hoạt động"~~ * Danh sách giá trị được sắp xếp theo ngày tạo từ mới nhất tới cũ nhất | | |  |
| 8 | Thanh tìm kiếm | N/A | * Nhập freetext * Placeholder "Tìm kiếm" * Quy định độ dài: 50 ký tự * Cho phép nhập ký tự là chữ cái, số, ký tự đặc biệt và khoảng trắng * Cho phép tìm kiếm theo: Tên nhóm, mã nhóm |  |
| 9 | Lọc theo ngày tạo | N/A | * Date range picker * Placeholder "Chọn khoảng ngày tạo" * Chọn khoảng thời gian để lọc theo {Ngày tạo} * Người dùng có thể chọn ngày bắt đầu và ngày kết thúc * Ngày kết thúc >= Ngày bắt đầu * Format ngày: `dd/mm/yyyy`. * Cho phép clear để bỏ lọc. |  |
| 10 | ~~Lọc theo trạng thái~~ | ~~N/A~~ | * ~~Chọn 1 giá trị~~ * ~~Mặc định: Tất cả trạng thái~~ * ~~Danh sách giá trị:~~    + ~~Đang hoạt động~~   + ~~Không hoạt động~~ |  |
| 11 | Checkbox | Có | * Cho phép chọn nhiều nhóm cùng 1 lúc * Default: uncheck |  |
| 12 | Mã nhóm | N/A | * Hiển thị mã nhóm |  |
| 13 | Tên nhóm | N/A | * Hiển thị tên nhóm |  |
| 14 | Số lượng thành viên | N/A | * iHiển thị số lượng người dùng trong nhóm * Không có => hiển thị "--" |  |
| 15 | Trạng thái | N/A | * Hiển thị trạng thái của nhóm    + Đang hoạt động   + ~~Không hoạt động~~ |  |
| 16 | Ngày tạo | N/A | * Hiển thị thời điểm nhóm được tạo trên hệ thống * Format: dd/mm/yyyy |  |

### AC-3: Không nhập đầy đủ các trường bắt buộc

Tại màn hình thêm mới người dùng

Khi người dùng không nhập đầy đủ các trường thông tin bắt buộc

Thì hệ thống disable nút "Lưu"

### AC-4: Nhập số điện thoại sai định dạng

Tại màn hình thêm mới người dùng

Khi người dùng nhập số điện thoại sai định dạng

Thì hệ thống hiển thị thông báo lỗi TNT 010 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761>

### AC-5: Nhập email sai định dạng

Tại màn hình thêm mới người dùng

Khi người dùng nhập email sai định dạng

Thì hệ thống hiển thị thông báo lỗi TNT 012 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761>

### AC-6: Hiển thị thông báo lỗi khi trường bắt buộc bị xóa và người dùng rời khỏi ô nhập liệu

Tại màn hình thêm mới người dùng

Khi người dùng xóa toàn bộ nội dung tại trường bắt buộc và click ra ngoài ô nhập liệu

Thì hệ thống hiển thị thông báo lỗi TNT 008 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761> , phụ thuộc rule 005 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583>

### AC-7: Nhập quá giới hạn ký tự cho các trường thông tin

Tại màn hình thêm mới người dùng

Khi người dùng nhập các thông tin của đối tác dài hơn độ dài quy định

Thì hệ thống báo lỗi TNT 014 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761>

### AC-8: Tìm kiếm người dùng

Tại màn hình thêm mới người dùng, trên danh sách nhóm

Khi người dùng nhập điều kiện tìm kiếm

Thì hệ thống:

* Tìm kiếm nhóm theo: Mã nhóm, tên nhóm
* Kết quả hiển thị đúng theo điều kiện lọc đã chọn.
* Số lượng kết quả phù hợp được hiển thị rõ ràng (ví dụ: "Tìm thấy 12 kết quả phù hợp")
* Có thể xóa điều kiện tìm kiếm và lọc để trở về danh sách mặc định

### AC-9: Tìm kiếm không có kết quả

Tại màn hình thêm mới người dùng, trên danh sách nhóm

Khi nhập từ khóa không khớp với bất kỳ nhóm nào

Thì hệ thống hiển thị textview: "Không tìm thấy nhóm phù hợp."

### AC-10: Giữ trạng thái khi tìm kiếm hoặc lọc

Tại màn hình thêm mới người dùng, trên danh sách nhóm

Khi người dùng đang tick chọn nhóm rồi thực hiện tìm kiếm hoặc lọc theo ngày

Thì hệ thống giữ nguyên trạng thái tick của các nhóm đã được chọn

Và hiển thị số nhóm đã được tích

### AC-11: Kiểm tra trùng Email của người dùng trong đối tác

Tại màn hình thêm mới người dùng

Khi người dùng nhập email giống nhau cho nhiều người dùng

Thì hệ thống:

* Báo lỗi TNT 013 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761>
* Highlight đỏ trường thông email

### AC-12: Gửi email thông báo đăng nhập lần đầu đến người dùng khi tạo mới tài khoản thành công

Tại thời điểm tạo mới người dùng

Khi hệ thống tạo mới người dùng thành công

Và người dùng ở trạng thái "Đang hoạt động"

Và người dùng chưa tồn tại trên hệ thống đăng nhập tập trung

Thì hệ thống:

* Gửi mail đến cho người dùng vừa được tạo thành công
* Thông tin email:

  + Cấu trúc Email:

    - Tiêu đề mail: {Tiêu đề email}
    - From: {Email của nhà trường/ trung tâm}
    - To: {Email của user}
    - Nội dung:

      * Kính gửi {Tên người dùng},

        Tài khoản của bạn đã được tạo và kích hoạt thành công trên hệ thống nhà trường/ trung tâm {**Tên đối tác**}

        Thông tin đăng nhập như sau:

        · Tên đăng nhập: {username}

        · Mật khẩu tạm thời: {password}

        Vui lòng đăng nhập tại: {link đăng nhập}

        (Để đảm bảo an toàn, vui lòng đổi mật khẩu ngay sau lần đăng nhập đầu tiên).

        Lưu ý: Không chuyển tiếp hoặc cung cấp thông tin đăng nhập cho bất kỳ ai dưới bất kỳ hình thức nào.

        Nếu cần hỗ trợ, vui lòng liên hệ:

        · Email: {email CSKH}

        · Hotline: {số điện thoại}

        Email này được gửi tự động để xác nhận thông tin tài khoản đăng nhập. Xin vui lòng không trả lời.

        Trân trọng,

        {Tên đối tác}
  + Trong đó:

    - **{Tiêu đề email}**: Cấu hình tiêu đề gửi mail: Thông báo mở tài khoản – {**Tên đối tác**}
    - **{Email của nhà trường/ trung tâm}**: Cấu hình mail của trường/ trung tâm
    - **{Email của user}**: lấy email của chính người dùng được tạo mới.
    - **{Tên người dùng}**: lấy tên người dùng theo email của người dùng được tạo mới
    - {**Tên đối tác**}: Tên đối tác
    - **{username}**: Lấy email của user trong đối tác
    - **{password}**: Rule 003 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/886636583>
    - **{link đăng nhập}**: là link truy cập vào đối tác theo subdomain
    - **{email CSKH}**: cấu hình email CSKH
    - **{số điện thoại}**: cấu hình số điện thoại: 0965856789

### AC-13: Gửi email thông báo user có quyền truy cập vào EOP khi tạo mới thành công

Tại thời điểm tạo mới người dùng

Khi hệ thống tạo mới người dùng thành công

Và người dùng ở trạng thái "Đang hoạt động"

Và người dùng đã tồn tại trên hệ thống đăng nhập tập trung

Thì hệ thống:

* Gửi mail đến cho người dùng vừa được tạo thành công
* Thông tin email tự động:

  + Cấu trúc Email:

    - Tiêu đề mail: {Tiêu đề email}
    - From: {Email của nhà trường/ trung tâm}
    - To: {Email của user}
    - Nội dung:

      * Kính gửi: Quý Khách hàng,

        Chúng tôi xin thông báo tài khoản của Quý khách đã được kích hoạt thành công trên hệ thống nhà trường/ trung tâm {**Tên đối tác**}

        Thông tin đăng nhập như sau:

        · Tên đăng nhập: {username}

        · Mật khẩu: Mật khẩu hiện tại của quý khách

        Vui lòng đăng nhập tại: {link đăng nhập}

        Lưu ý: Không chuyển tiếp hoặc cung cấp thông tin đăng nhập cho bất kỳ ai dưới bất kỳ hình thức nào.

        Nếu cần hỗ trợ, vui lòng liên hệ:

        · Email: {email CSKH}

        · Hotline: {số điện thoại}

        Email này được gửi tự động để xác nhận thông tin tài khoản đăng nhập. Xin vui lòng không trả lời.

        Cám ơn Quý khách đã sử dụng dịch vụ của {Tên công ty}!

        Trân trọng,

        {Tên đối tác}
  + Trong đó:

    - **{Tiêu đề email}**: Cấu hình tiêu đề gửi mail: Thông báo mở tài khoản – {**Tên đối tác**}
    - **{Email của nhà trường/ trung tâm}**: Cấu hình mail của trường/ trung tâm
    - **{Email của user}**: lấy email của chính người dùng được tạo mới.
    - **{Tên người dùng}**: lấy tên người dùng theo email của người dùng được tạo mới
    - {**Tên đối tác**}: Tên đối tác
    - **{username}**: Lấy email của user trong đối tác
    - **{link đăng nhập}**: là link truy cập vào đối tác theo subdomain
    - **{email CSKH}**: cấu hình email CSKH
    - **{số điện thoại}**: cấu hình số điện thoại: 0965856789

### ~~AC-14: Lưu nháp người dùng thành công~~

~~Tại màn hình thêm mới người dùng~~

~~Khi người dùng nhập liệu đầy đủ thông tin bắt buộc hợp lệ và bấm "Lưu nháp"~~

~~Thì hệ thống:~~

* ~~Thì hệ thống:~~

  + ~~Lưu lại thông tin người dùng~~
  + ~~Đặt trạng thái của người dùng = Lưu nháp (Draft)~~
  + ~~Hiển thị thông báo TNT 038~~ <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-039>

### AC-15: Hủy bỏ thêm mới người dùng khi chưa nhập thông tin tạo mới

Tại màn hình thêm mới người dùng

Khi bấm nút "Hủy" khi chưa nhập thông tin tạo mới nào

Thì hệ thống sẽ:

* Hủy bỏ thao tác thêm mới người dùng
* Không lưu bất kỳ thông tin gì trong form thêm mới người dùng
* Quay trở lại màn hình danh sách người dùng

### AC-16: Hủy bỏ thêm mới người dùng khi đã nhập thông tin tạo mới

Tại màn hình khai thêm mới người dùng

Khi bấm nút "Hủy" khi đã nhập ít nhất 1 thông tin thêm mới người dùng

Thì hệ thống sẽ:

* Hiển thị popup confirm "Thông tin bạn vừa nhập sẽ không được lưu."
* Khi người dùng bấm "Hủy tạo mới để xác nhận"

  + Hệ thống sẽ:

    - Đóng popup
    - Hủy bỏ thao tác thêm mới
    - Không lưu bất kỳ thông tin gì trong form thêm mới người dùng
    - Quay trở lại màn hình danh sách người dùng
* Khi người dùng bấm "Tiếp tục tạo mới"

  + Hệ thống sẽ:

    - Đóng popup
    - Giữ nguyên tại màn hình thêm mới người dùng
    - Giữ lại các thông tin thêm mới người dùng đã được nhập trước đó.

### AC-17: Thêm mới người dùng không thành công

Tại màn hình thêm mới người dùng

Khi Người dùng bấm Lưu để thêm mới người dùng

Và quá trình lưu dữ liệu **không thành công** do một trong các nguyên nhân sau:

* Lỗi mạng hoặc mất kết nối đến máy chủ
* Lỗi hệ thống nội bộ (500 Internal Server Error)
* Dữ liệu không hợp lệ mà hệ thống không thể xử lý (ví dụ: trùng mã đối tác, định dạng sai)

Thì hệ thống:

* Dữ liệu không hợp lệ mà hệ thống không thể xử lý, Lỗi hệ thống nội bộ: Hiển thị thông báo lỗi: TNT 049 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-049>
* Lỗi mạng hoặc mất kết nối đến máy chủ: Hiển thị thông báo lỗi: TNT 021 <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/887455761/UI+Message+-+Common+Business+Rules#TNT-021>

### AC-18: Hệ thống tự sinh Mã định danh khi thêm mới người dùng trên hệ thống EOP

Tại màn hình thêm mới người dùng

Khi thêm mới người dùng thành công

Thì hệ thống:

* Tự động sinh ra 1 bản ghi định danh tương ứng trong hệ thống EOP, đảm bảo 1-1 giữa người dùng và mã định danh
* Các thông tin cần đẩy về để tạo định danh bao gồm:

|  | **Thông tin** | **Mô tả** | **Ghi chú** |
| --- | --- | --- | --- |
| 1 | Mã định danh | * Tự động sinh theo bảng * Unique |  |
| 2 | Loại định danh | * Mặc định Loại định danh khi tạo người dùng thành công = USER |  |
| 3 | Đối tác | * null |  |
| 4 | ID của người dùng | * ID của người dùng |  |
| 5 | Tên người dùng | * Tên người dùng |  |
| 6 | Email | * Email người dùng |  |
| 7 | Số điện thoại | * Số điện thoại người dùng |  |
| 8 | Trạng thái xác thực MFA | * Mặc định: Chưa xác thực | Hiện tại Out of scope |

Business Value & Success Metrics
--------------------------------

* **Tăng tốc độ mở rộng tổ chức:** Ops/ Policy designer có thể nhanh chóng thêm giáo viên, trợ giảng, nhân viên quản trị vào hệ thống.
* **Cải thiện khả năng quản lý người dùng:** giúp xác định quyền và trách nhiệm cho từng cá nhân.
* **Tăng tính minh bạch:** mỗi người dùng có một định danh duy nhất, phục vụ cho việc kiểm soát truy cập và theo dõi hoạt động.
* **Giảm tải vận hành:** loại bỏ quy trình thủ công nhờ tự động sinh mã định danh.
* **Tăng độ tin cậy của hệ thống:** đảm bảo dữ liệu người dùng được tạo và quản lý đồng nhất giữa các tenant.

**Story được coi là thành công khi nó đảm bảo được:**
-----------------------------------------------------

* 98% tạo người dùng thành công
* Thời gian tạo thành công user <= 20s
* >= 90% người sử dụng đánh giá giao diện dễ hiểu, dễ sử dụng

Dependencies
============

Phụ thuộc vào các file thông tin

HLD: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/933888001/HLD.AC.SSO.PM+-+HLD+for+The+Policy+Management?atlOrigin=eyJpIjoiN2M4MmMzOWVmNmE1NDNhODk0ZTJlYjBlOTY2NjkyOWMiLCJwIjoiYyJ9>

PDM: <https://mfacilities.atlassian.net/wiki/spaces/EES/pages/934477843>

Impact Analysis
===============

UI/UX Design
============

### Link figma:

Thêm mới người dùng

Out of Scope Item
=================