# US-PS-011 - Lưu draft nội dung khóa học (Giảng viên chủ trì)

## User story Title
US-PS-011 - Lưu draft nội dung khóa học - Giảng viên chủ trì (Save Course Content Draft - Lead Instructor)

Là một **Giảng viên chủ trì-OWNER**

Tôi muốn thực hiện **lưu nội dung khóa học dưới dạng bản nháp** tại **trang xây dựng nội dung khóa học của sản phẩm LMS**

Để **lưu lại tiến độ công việc xây dựng khóa học, có thể tiếp tục chỉnh sửa sau, tránh mất dữ liệu khi bắt đầu xây dựng**

---

## Acceptance criteria

### AC-1: Happy Path - Lưu draft lần đầu và sinh Mã khóa học Individual
- **Tại** trang xây dựng nội dung khóa học mà Giảng viên chủ trì được mời từ một Trường (PRIVATE_SCHOOL)
- **Khi** Giảng viên chủ trì thực hiện xây dựng nội dung (tạo chương, tạo bài học, upload nội dung, chỉnh sửa mô tả) và nhấn nút "Lưu bản nháp" lần đầu tiên
- **Thì** hệ thống:
  - Sinh ra một **Mã khóa học-COURSE_CODE** mới thuộc hệ thống **Individual** của Giảng viên chủ trì, Tên khóa học = Tên khóa học cộng tác
  - Định dạng mã: `IND-{YYYYMMDD}-{SEQUENCE}` (VD: IND-20251207-01)
  - Ghi nhận **Trường liên kết-Social_SCHOOL** từ lời mời xây dựng nội dung 
  - Ghi nhận **Mã khóa học gốc-ORIGINAL_COURSE_CODE** của Trường (để tracking nguồn gốc)
  - Lưu tất cả thay đổi vào cơ sở dữ liệu
  - Tạo bản ghi khóa học Individual với trạng thái **Bản nháp - Draft**
  - Ghi nhận thời điểm lưu
  - Hiển thị thông báo "Đã lưu bản nháp thành công. Mã khóa học: [Mã mới]"
  - Hiển thị thông tin: "Lưu lần cuối: [Thời điểm] | Trường liên kết: [Tên trường]"
  - Cho phép tiếp tục chỉnh sửa
  - Giữ nguyên trạng thái khóa học cộng tác = Xây dựng nội dung - Content Building

### AC-2: Happy Path - Cập nhật draft đã tồn tại
- **Tại** trang xây dựng nội dung khóa học có draft đã tồn tại với Mã khóa học Individual
- **Khi** Giảng viên chủ trì chỉnh sửa thêm nội dung (thêm chương, thêm bài học, upload file, sửa mô tả) sau đó nhấn "Lưu bản nháp"
- **Thì** hệ thống:
  - Cập nhật bản ghi draft hiện tại
  - **Không** sinh mã khóa học mới (giữ nguyên mã đã sinh lần đầu)
  - Ghi nhận thời điểm lưu mới
  - Hiển thị thông báo "Đã cập nhật bản nháp thành công"
  - Hiển thị thông tin: "Lưu lần cuối: [Thời điểm cập nhật] | Mã khóa học: [Mã Individual]"
  - Cho phép tiếp tục chỉnh sửa

<!-- ### AC-3: Happy Path - Lưu draft với cấu trúc chương/bài học
- **Tại** trang xây dựng nội dung khóa học khi đã tạo cấu trúc chương và bài học
- **Khi** Giảng viên chủ trì nhấn "Lưu bản nháp"
- **Thì** hệ thống:
  - Lưu toàn bộ cấu trúc khóa học:
    - Danh sách chương (tên, thứ tự, mô tả)
    - Danh sách bài học trong mỗi chương (tên, thứ tự, loại bài học)
    - Nội dung đã upload cho mỗi bài học (video, bài giảng, bài kiểm tra, bài trắc nghiệm, audio)
    - Các cấu hình thời gian làm bài (nếu có)
  - Hiển thị thông báo "Đã cập nhật bản nháp" -->

### AC-4: Alternative Path - Lưu draft khi thoát trang
- **Tại** trang xây dựng nội dung khóa học có thay đổi chưa lưu
- **Khi** Giảng viên chủ trì cố gắng thoát trang (nhấn nút "Quay lại", điều hướng đi nơi khác, hoặc đóng tab)
- **Thì** hệ thống:
  - Hiển thị hộp thoại cảnh báo "Bạn có thay đổi chưa lưu. Bạn có muốn lưu bản nháp trước khi thoát?"
  - Hiển thị 3 nút: "Lưu và thoát", "Thoát không lưu", "Hủy"
  - Nếu chọn "Lưu và thoát":
    - Lưu draft (sinh mã khóa học nếu là lần đầu)
    - Chuyển trang
  - Nếu chọn "Thoát không lưu": thoát mà không lưu (mất thay đổi)
  - Nếu chọn "Hủy": ở lại trang hiện tại

### AC-5: Alternative Path - Truy cập lại khóa học đang xây dựng
- **Tại** trang Quản lý nội dung khóa học Individual của Giảng viên chủ trì
- **Khi** Giảng viên chủ trì chọn một khóa học có trạng thái **Bản nháp - Draft**
- **Thì** hệ thống:
  - Tự động load draft gần nhất
  - Hiển thị toàn bộ cấu trúc và nội dung đã lưu
  - Hiển thị thông tin: "Mã khóa học: [Mã Individual] | Trường liên kết: [Tên trường]"
  - Cho phép tiếp tục chỉnh sửa

### AC-6: Edge Case - Lưu draft khi không có thay đổi
- **Tại** trang xây dựng nội dung khóa học không có thay đổi nào so với lần lưu trước
- **Khi** Giảng viên chủ trì nhấn "Lưu bản nháp" mà không có thay đổi nội dung
- **Thì** hệ thống:
  - Không cập nhật thời điểm lưu
  - Giữ nguyên trạng thái draft

### AC-7: Edge Case - Mất kết nối internet khi đang chỉnh sửa
- **Tại** trang xây dựng nội dung khóa học khi mất kết nối internet
- **Khi** Giảng viên chủ trì tiếp tục chỉnh sửa và nhấn "Lưu bản nháp"
- **Thì** hệ thống:
  - Phát hiện mất kết nối
  - Lưu draft vào local storage (trình duyệt)
  - Hiển thị cảnh báo "Mất kết nối internet. Bản nháp đã được lưu tạm thời trên thiết bị của bạn. Sẽ tự động đồng bộ khi có kết nối."
  - Hiển thị icon cảnh báo ⚠️ bên cạnh thời điểm lưu
  - **Lưu ý**: Nếu là lần lưu đầu tiên (chưa có mã khóa học), hệ thống sẽ sinh mã tạm và đồng bộ lên server khi có kết nối
  - Khi có kết nối trở lại: tự động đồng bộ draft lên server
  - Hiển thị thông báo "Đã đồng bộ bản nháp thành công"

### AC-8: Error Condition - Lỗi kết nối cơ sở dữ liệu khi lưu draft
- **Tại** hệ thống backend khi nhấn "Lưu bản nháp"
- **Khi** kết nối cơ sở dữ liệu bị lỗi
- **Thì** hệ thống:
  - Thử lại lưu 3 lần (với exponential backoff)
  - Nếu vẫn thất bại: lưu draft vào local storage
  - Hiển thị thông báo lỗi "Có lỗi trong quá trình xử lý. Vui lòng thử lại"

### AC-9: Validation - Kiểm tra quyền trước khi lưu draft
- **Tại** hệ thống backend khi lưu draft
- **Khi** hệ thống xử lý yêu cầu lưu
- **Thì** hệ thống:
  - Kiểm tra người dùng có vai trò **Giảng viên chủ trì-OWNER** cho khóa học này
  - Kiểm tra khóa học có trạng thái cho phép chỉnh sửa (Draft)
  - Kiểm tra lời mời xây dựng nội dung còn hiệu lực (chưa bị thu hồi)
  - Nếu không hợp lệ: hiển thị lỗi phù hợp:
    - "Bạn không có quyền chỉnh sửa khóa học này"
    - "Khóa học không ở trạng thái cho phép chỉnh sửa" 

### AC-10: Hiển thị trạng thái draft trên trang Quản lý nội dung khóa học Individual
- **Tại** trang Quản lý nội dung khóa học Individual của Giảng viên chủ trì
- **Khi** Giảng viên chủ trì xem danh sách khóa học đang cộng tác
- **Thì** hệ thống:
  - Hiển thị các khóa học đang xây dựng với ở trạng thái "Bản nháp"
  - Hiển thị thông tin:
    - Mã khóa học Individual
    - Tên khóa học
    - Trường liên kết (nguồn lời mời)
    - Lưu lần cuối: [Thời điểm]
    - Trạng thái: bản nháp
  - Cho phép nhấn vào để tiếp tục xây dựng

### AC-11: Validation - Kiểm tra tính duy nhất của Mã khóa học Individual
- **Tại** hệ thống backend khi sinh Mã khóa học lần đầu
- **Khi** hệ thống tạo mã khóa học mới
- **Thì** hệ thống:
  - Kiểm tra mã không trùng với bất kỳ mã nào đã tồn tại trong hệ thống Individual của giảng viên
  - Nếu trùng: tự động tăng SEQUENCE lên 1 và kiểm tra lại
  - Đảm bảo mã duy nhất trước khi lưu
  - Ghi nhận audit log cho việc sinh mã mới

<!--### AC-12: Edge Case - Xử lý khi Trường thu hồi lời mời
- **Tại** trang xây dựng nội dung khóa học đang làm việc
- **Khi** Trường (PRIVATE_SCHOOL) thu hồi lời mời xây dựng nội dung
- **Thì** hệ thống:
  - Hiển thị thông báo "Trường đã thu hồi lời mời xây dựng nội dung. Bạn không thể tiếp tục chỉnh sửa."
  - Tự động lưu draft hiện tại (nếu có thay đổi)
  - Chuyển trạng thái khóa học Individual về **Bản nháp-Draft**
  - Khóa học vẫn thuộc về Giảng viên nhưng không còn liên kết với Trường
  - Chuyển khóa học về trang Quản lý nội dung khóa học > Khóa học của tôi
  - Cho phép Giảng viên giữ lại nội dung đã xây dựng để sử dụng cho mục đích khác -->

---

## Inline business rule

| Trường thông tin              | Mã BR     | Business rule                                                                                         | Ghi chú                              |
|-------------------------------|-----------|-------------------------------------------------------------------------------------------------------|--------------------------------------|
| Mã khóa học Individual        | BR-PS-120 | Sinh mã khóa học mới thuộc hệ thống Individual khi lưu draft lần đầu                                  | Auto generate on first save          |
| Định dạng mã khóa học         | BR-PS-121 | Định dạng: IND-{INSTRUCTOR_ID}-{YYYYMMDD}-{SEQUENCE}                                                  | Unique per instructor                |
| Trường liên kết               | BR-PS-122 | Bắt buộc ghi nhận school_id và school_name từ lời mời                                                 | Track affiliation                    |
| Mã khóa học gốc               | BR-PS-123 | Lưu lại original_course_code của Trường để tracking nguồn gốc                                         | Traceability                         |
| Trạng thái draft              | BR-PS-124 | Trạng thái ban đầu = Đang xây dựng nội dung-CONTENT_BUILDING khi tạo draft                            | Initial state                        |
| Thời điểm lưu draft           | BR-PS-125 | Tự động ghi nhận khi lưu draft                                                                        | System generated                     |
| Quyền sở hữu                  | BR-PS-126 | Khóa học Individual thuộc quyền sở hữu của Giảng viên chủ trì, không phải của Trường                  | Ownership model                      |
| Đồng bộ từ local storage      | BR-PS-127 | Tự động đồng bộ lên server khi có kết nối trở lại                                                     | Auto sync                            |
| Cảnh báo thoát trang          | BR-PS-128 | Hiển thị cảnh báo nếu thoát trang khi có thay đổi chưa lưu                                            | Prevent data loss                    |
| Thu hồi liên kết              | BR-PS-129 | Khi Trường thu hồi lời mời, khóa học Individual vẫn thuộc về Giảng viên nhưng mất liên kết            | Affiliation revocation               |
| Sequence number               | BR-PS-130 | SEQUENCE bắt đầu từ 001, tăng dần trong cùng ngày cho cùng instructor                                 | Daily sequence reset                 |

---

## System rule
- Draft phải được lưu trong transaction để đảm bảo tính toàn vẹn dữ liệu
- Mã khóa học Individual phải đảm bảo tính duy nhất trong toàn hệ thống
- Hệ thống phải hỗ trợ lưu draft offline (local storage) khi mất kết nối
- Liên kết với Trường (Affiliated School) phải được ghi nhận và không thể thay đổi sau khi tạo
- Khi Trường thu hồi lời mời, Giảng viên vẫn giữ quyền sở hữu nội dung đã xây dựng
- Local storage phải được mã hóa để bảo mật nội dung draft
- Audit log phải ghi nhận mọi thao tác sinh mã khóa học mới

---

## Business Value & Success Metrics
Story này sẽ cung cấp **khả năng cho Giảng viên chủ trì lưu tiến độ xây dựng khóa học, tự động sinh mã khóa học riêng thuộc hệ thống Individual, tracking nguồn gốc từ Trường mời, và bảo vệ quyền sở hữu nội dung của Giảng viên**

Trọng số của story này là **13**

Story được coi là thành công khi nó đảm bảo được:
- 100% draft được lưu thành công (bao gồm cả offline)
- 100% lần lưu đầu tiên sinh mã khóa học Individual đúng định dạng và duy nhất
- 100% khóa học Individual có thông tin Trường liên kết chính xác
- 100% draft được khôi phục thành công khi truy cập lại
- 0% mất dữ liệu draft (hỗ trợ local storage khi offline)
- 100% giảng viên giữ quyền sở hữu nội dung khi Trường thu hồi lời mời

---

## Dependencies
- **lf-course service**: Lưu và quản lý draft, sinh mã khóa học
- **lf-identity service**: Xác thực Giảng viên chủ trì và lấy INSTRUCTOR_ID
- **lf-school service**: Lấy thông tin Trường liên kết từ lời mời
- **Browser local storage**: Lưu draft offline khi mất kết nối
- **US-PS-009**: Chấp nhận lời mời xây dựng nội dung (prerequisite)
- **US-PS-010**: Xây dựng nội dung khóa học

---

## Impact Analysis
- **Giảng viên chủ trì**:
  - Có mã khóa học riêng thuộc hệ thống Individual
  - Lưu tiến độ công việc an toàn
  - Giữ quyền sở hữu nội dung đã xây dựng
  - Tracking được nguồn gốc khóa học từ Trường nào
- **Trường (PRIVATE_SCHOOL)**:
  - Có thể tracking khóa học nào được xây dựng từ lời mời của mình
  - Biết được tiến độ xây dựng thông qua mã khóa học gốc
- **Data Storage**:
  - Tăng dung lượng lưu trữ cho các phiên bản draft
  - Cần lưu thêm thông tin liên kết (affiliation)
- **User Experience**:
  - Trải nghiệm làm việc linh hoạt
  - Hỗ trợ offline
  - Rõ ràng về quyền sở hữu

---

## UI/UX Design

### Trang xây dựng nội dung khóa học - Header với Mã khóa học Individual
```
┌─────────────────────────────────────────────────────────────────┐
│  Xây dựng khóa học: Toán nâng cao - Lớp 12                      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐
│  │ Mã khóa học: IND-GV001-20251207-001                         │
│  │ Trường liên kết: Trường THPT Nguyễn Huệ                     │
│  │ Vai trò: Giảng viên chủ trì                                 │
│  │ Đang xây dựng | Lưu lần cuối: 07/12/2025 10:30              │
│  └─────────────────────────────────────────────────────────────┘
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Cấu trúc khóa học                                              │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  > Chương 1: Đại số tuyến tính                                  │
│     |-- Bài 1.1: Ma trận (100%)                                 │
│     |-- Bài 1.2: Định thức (80%)                                │
│     +-- Bài 1.3: Hệ phương trình (0%)                           │
│                                                                 │
│  > Chương 2: Giải tích                                          │
│     |-- Bài 2.1: Giới hạn (0%)                                  │
│     +-- Bài 2.2: Đạo hàm (0%)                                   │
│                                                                 │
│  [+ Thêm chương mới]                                            │
│                                                                 │
│  Tiến độ tổng thể: ========------------ 40%                     │
│                                                                 │
│              [Lưu bản nháp]     [Hoàn thành xây dựng]           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Thông báo lưu bản nháp lần đầu (Sinh mã khóa học)
```
┌──────────────────────────────────────────────────────────────┐
│  Đã lưu bản nháp thành công                                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Mã khóa học của bạn: IND-GV001-20251207-001                 │
│                                                              │
│  Khóa học này thuộc hệ thống Individual của bạn.             │
│  Trường liên kết: Trường THPT Nguyễn Huệ                     │
│                                                              │
│  Lưu lần cuối: 07/12/2025 10:30                              │
│                                                              │
│                       [Đóng]                                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Thông báo lưu bản nháp (Cập nhật)
```
┌──────────────────────────────────────────────────────────────┐
│  Đã cập nhật bản nháp thành công                             │
│  Lưu lần cuối: 07/12/2025 14:25                              │
│  Mã khóa học: IND-GV001-20251207-001                         │
└──────────────────────────────────────────────────────────────┘
(Thông báo xuất hiện 3 giây rồi biến mất)
```

### Hộp thoại cảnh báo khi thoát trang
```
┌──────────────────────────────────────────────────────────────┐
│  Bạn có thay đổi chưa lưu                                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Bạn có muốn lưu bản nháp trước khi thoát?                   │
│                                                              │
│  Nếu không lưu, tất cả thay đổi sẽ bị mất.                   │
│                                                              │
│  [Thoát không lưu]   [Hủy]   [Lưu và thoát]                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Trang Quản lý nội dung khóa học Individual - Hiển thị các khóa học đang xây dựng
```
┌─────────────────────────────────────────────────────────────────┐
│  Khóa học Individual của tôi                                    │
│  Xin chào, Giảng viên Nguyễn Văn A                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Đang xây dựng (2 khóa học)                                     │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Toán nâng cao - Lớp 12                                     │ │
│  │    Mã: IND-GV001-20251207-001                             │ │
│  │    Trường liên kết: THPT Nguyễn Huệ                       │ │
│  │    Lưu cuối: 07/12/2025 14:25 | Tiến độ: 40%              │ │
│  │                                    [Tiếp tục xây dựng]    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Vật lý đại cương                                           │ │
│  │    Mã: IND-GV001-20251205-002                             │ │
│  │    Trường liên kết: Đại học Bách khoa                     │ │
│  │    Lưu cuối: 05/12/2025 09:15 | Tiến độ: 15%              │ │
│  │                                    [Tiếp tục xây dựng]    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Đã hoàn thành (1 khóa học)                                     │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Hóa học cơ bản                                             │ │
│  │    Mã: IND-GV001-20251130-001                             │ │
│  │    Trường liên kết: THCS Lê Lợi                           │ │
│  │    Hoàn thành: 30/11/2025                                 │ │
│  │                                              [Xem chi tiết] │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Cảnh báo mất kết nối internet
```
┌──────────────────────────────────────────────────────────────┐
│  Mất kết nối internet                                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Bản nháp đã được lưu tạm thời trên thiết bị của bạn.        │
│  Sẽ tự động đồng bộ khi có kết nối.                          │
│                                                              │
│  Lưu lần cuối (offline): 07/12/2025 15:00                    │
│  Mã khóa học: IND-GV001-20251207-001                         │
│                                                              │
│                     [Đóng]                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Thông báo Trường thu hồi lời mời
```
┌──────────────────────────────────────────────────────────────┐
│  Trường đã thu hồi lời mời                                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Trường THPT Nguyễn Huệ đã thu hồi lời mời xây dựng          │
│  nội dung cho khóa học này.                                  │
│                                                              │
│  Bạn không thể tiếp tục chỉnh sửa liên kết với Trường.       │
│                                                              │
│  Tuy nhiên, khóa học này vẫn thuộc về bạn:                   │
│  - Mã khóa học: IND-GV001-20251207-001                       │
│  - Nội dung đã xây dựng được giữ lại                         │
│  - Bạn có thể sử dụng cho mục đích cá nhân khác              │
│                                                              │
│                  [Đã hiểu]                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Hành vi của quy trình**:
- Lần lưu đầu tiên: sinh Mã khóa học Individual và ghi nhận Trường liên kết
- Các lần lưu sau: cập nhật draft, giữ nguyên mã khóa học
- Khi thoát trang có thay đổi chưa lưu: hiển thị cảnh báo
- Khi mất kết nối: lưu vào local storage, tự động đồng bộ khi có kết nối
- Khi truy cập lại: tự động khôi phục draft gần nhất
- Khi Trường thu hồi lời mời: Giảng viên vẫn giữ quyền sở hữu nội dung
- Hiển thị rõ Mã khóa học Individual và Trường liên kết trên giao diện

---

## Out of Scope Item
- **Chuyển đổi quyền sở hữu khóa học**: Chuyển khóa học Individual sang cho Trường hoặc ngược lại (out of scope)
- **Multi-school affiliation**: Một khóa học liên kết với nhiều Trường (chỉ hỗ trợ 1 Trường liên kết)
- **Real-time collaborative editing**: Nhiều người chỉnh sửa cùng lúc và thấy thay đổi real-time (out of scope)
- **Version history với diff view**: Xem chi tiết sự khác biệt giữa các phiên bản (có thể làm sau)
- **Draft sharing**: Chia sẻ draft cho người khác xem trước khi hoàn thành (chưa cần thiết)
- **Export draft to file**: Xuất draft ra file (out of scope)
- **Tự động lưu định kỳ**: Auto-save sau mỗi X phút (có thể làm sau)
- **Conflict detection**: Phát hiện xung đột khi nhiều người chỉnh sửa đồng thời (out of scope cho Giảng viên chủ trì vì chỉ có 1 người chỉnh sửa)
