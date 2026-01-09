# US-PS-010 - Xây dựng nội dung khóa học (Giảng viên chủ trì)

## User Story Title
US-PS-010 - Xây dựng nội dung khóa học (Build Course Content - Lead Instructor)

**Là một** Giảng viên chủ trì-OWNER

**Tôi muốn** tự xây dựng và hoàn thiện toàn bộ nội dung khóa học bao gồm tạo chương, tạo bài học, upload nội dung (video, bài giảng, bài kiểm tra, bài trắc nghiệm) **tại** trang quản lý khóa học của sản phẩm LMS

**Để** hoàn thiện khóa học và sẵn sàng cho học viên đăng ký học

---

## Acceptance Criteria

### AC-1: Happy Path - Truy cập trang xây dựng nội dung khóa học

- **Tại** trang danh sách khóa học cộng, Giảng viên chủ trì-OWNER đã chấp nhận lời mời và khóa học đang ở trạng thái Đang xây dựng nội dung-CONTENT_BUILDING
- **Khi** Giảng viên chủ trì nhấn vào khóa học để bắt đầu xây dựng nội dung
- **Thì** hệ thống:
  - Kiểm tra quyền: Giảng viên có vai trò Giảng viên chủ trì-OWNER cho khóa học này
  - Hiển thị trang "Xây dựng nội dung khóa học" với các tab:
    - Tab "Xây dựng nội dung": Quản lý chương và bài học: Upload video, bài giảng, bài kiểm tra, bài trắc nghiệm, tài liệu cho bài học
    - Tab "Xem trước": Xem trước khóa học như học viên
  - Hiển thị thông tin khóa học: Tên khóa học, mô tả, trạng thái

---

### AC-2: Happy Path - Tạo chương mới

- **Tại** tab "Cấu trúc khóa học" của trang xây dựng nội dung
- **Khi** Giảng viên chủ trì nhấn nút "Thêm chương mới", nhập thông tin:
  - Tên chương (bắt buộc, tối đa 200 ký tự)
  - Mô tả chương (không bắt buộc, tối đa 1000 ký tự)

  Sau đó nhấn "Lưu chương"
- **Thì** hệ thống:
  - Kiểm tra tên chương không được để trống
  - Tạo chương mới với thứ tự hiển thị tự động (cuối danh sách)
  - Hiển thị thông báo "Đã tạo chương mới thành công"
  - Cập nhật danh sách chương, hiển thị chương vừa tạo
  - Chương mới ở trạng thái "Chưa có bài học"

---

### AC-3: Happy Path - Chỉnh sửa thông tin chương

- **Tại** danh sách chương trong tab "Cấu trúc khóa học"
- **Khi** Giảng viên chủ trì nhấn nút "Chỉnh sửa" bên cạnh chương cần sửa, cập nhật thông tin và nhấn "Lưu"
- **Thì** hệ thống:
  - Kiểm tra tên chương không được để trống
  - Cập nhật thông tin chương
  - Hiển thị thông báo "Đã cập nhật chương thành công"
  - Cập nhật giao diện với thông tin mới

---

### AC-4: Happy Path - Xóa chương

- **Tại** danh sách chương trong tab "Cấu trúc khóa học"
- **Khi** Giảng viên chủ trì nhấn nút "Xóa" bên cạnh chương cần xóa
- **Thì** hệ thống:
  - Hiển thị hộp thoại xác nhận: "Bạn có chắc chắn muốn xóa chương này? Tất cả bài học và nội dung trong chương sẽ bị xóa vĩnh viễn."
  - Nếu xác nhận:
    - Xóa chương và tất cả bài học, nội dung liên quan
    - Cập nhật lại thứ tự các chương còn lại
    - Hiển thị thông báo "Đã xóa chương thành công"
  - Nếu hủy: Đóng hộp thoại, không thực hiện xóa

---

### AC-5: Happy Path - Sắp xếp lại thứ tự chương

- **Tại** danh sách chương trong tab "Cấu trúc khóa học"
- **Khi** Giảng viên chủ trì kéo thả chương để thay đổi thứ tự
- **Thì** hệ thống:
  - Cập nhật thứ tự hiển thị của các chương
  - Lưu thứ tự mới vào cơ sở dữ liệu
  - Hiển thị thông báo "Đã cập nhật thứ tự chương"

---

### AC-6: Happy Path - Tạo bài học mới trong chương

- **Tại** một chương trong tab "Cấu trúc khóa học"
- **Khi** Giảng viên chủ trì nhấn nút "Thêm bài học" trong chương, nhập thông tin:
  - Tên bài học (bắt buộc, tối đa 200 ký tự)
  - Mô tả bài học (không bắt buộc, tối đa 2000 ký tự)
  - Loại bài học (bắt buộc): Video / Bài giảng / Bài kiểm tra / Bài trắc nghiệm
  - Thời lượng ước tính (phút, không bắt buộc)
  - Cho phép xem trước miễn phí (checkbox, mặc định: không)
  - Bắt buộc hoàn thành (checkbox, mặc định: có)

  Sau đó nhấn "Lưu bài học"
- **Thì** hệ thống:
  - Kiểm tra tên bài học không được để trống
  - Kiểm tra loại bài học đã được chọn
  - Tạo bài học mới với thứ tự hiển thị tự động (cuối chương)
  - Hiển thị thông báo "Đã tạo bài học mới thành công"
  - Cập nhật danh sách bài học trong chương
  - Bài học mới ở trạng thái "Chưa có nội dung"

---

### AC-7: Happy Path - Chỉnh sửa thông tin bài học

- **Tại** danh sách bài học trong một chương
- **Khi** Giảng viên chủ trì nhấn nút "Chỉnh sửa" bên cạnh bài học cần sửa, cập nhật thông tin và nhấn "Lưu"
- **Thì** hệ thống:
  - Kiểm tra tên bài học không được để trống
  - Cập nhật thông tin bài học
  - Hiển thị thông báo "Đã cập nhật bài học thành công"
  - Cập nhật giao diện với thông tin mới

---

### AC-8: Happy Path - Xóa bài học

- **Tại** danh sách bài học trong một chương
- **Khi** Giảng viên chủ trì nhấn nút "Xóa" bên cạnh bài học cần xóa
- **Thì** hệ thống:
  - Hiển thị hộp thoại xác nhận: "Bạn có chắc chắn muốn xóa bài học này? Tất cả nội dung (video, bài giảng, bài kiểm tra, tài liệu) sẽ bị xóa vĩnh viễn."
  - Nếu xác nhận:
    - Xóa bài học và tất cả nội dung liên quan
    - Cập nhật lại thứ tự các bài học còn lại trong chương
    - Hiển thị thông báo "Đã xóa bài học thành công"
  - Nếu hủy: Đóng hộp thoại, không thực hiện xóa

---

### AC-9: Happy Path - Sắp xếp lại thứ tự bài học

- **Tại** danh sách bài học trong một chương
- **Khi** Giảng viên chủ trì kéo thả bài học để thay đổi thứ tự (trong cùng chương hoặc sang chương khác)
- **Thì** hệ thống:
  - Cập nhật thứ tự hiển thị của các bài học
  - Nếu di chuyển sang chương khác: Cập nhật chương chứa bài học
  - Lưu thứ tự mới vào cơ sở dữ liệu
  - Hiển thị thông báo "Đã cập nhật thứ tự bài học"

---

### AC-10: Happy Path - Upload video cho bài học loại Video

- **Tại** trang chỉnh sửa bài học loại "Video"
- **Khi** Giảng viên chủ trì nhấn "Upload video", chọn file video (.mp4, tối đa 1GB), sau đó nhấn "Xác nhận upload"
- **Thì** hệ thống:
  - Kiểm tra định dạng file hợp lệ (.mp4)
  - Kiểm tra kích thước file <= 1GB
  - Hiển thị thanh tiến trình upload với phần trăm hoàn thành
  - Upload file lên hệ thống lưu trữ (cloud storage)
  - Tạo bản ghi video với trạng thái Đang xử lý-PROCESSING
  - Kích hoạt quy trình tự động chuyển đổi định dạng video (transcoding) sang các độ phân giải: 360p, 480p, 720p, 1080p
  - Hiển thị thông báo "Video đã được upload thành công và đang được xử lý"
  - Tự động làm mới trang để hiển thị video đang xử lý

---

<!-- ### AC-11: Happy Path - Upload audio cho bài học được phân công
- **Tại** trang chỉnh sửa bài học loại "Video"
- **Khi** Giảng viên đóng góp nhấn "Upload audio", chọn file audio (.mp3, tối đa 1GB), sau đó nhấn "Xác nhận upload"
- **Thì** hệ thống:
  - Kiểm tra quyền: Giảng viên đóng góp có quyền "Tải audio" cho bài học này
  - Kiểm tra định dạng file hợp lệ (.mp3)
  - Kiểm tra kích thước file <= 1GB
  - Hiển thị thanh tiến trình upload
  - Upload file lên hệ thống lưu trữ (cloud storage)
  - Tạo bản ghi audio với trạng thái **Đang xử lý** (processing)
  - Kích hoạt quy trình tự động chuyển đổi định dạng audio (nếu cần)
  - Hiển thị thông báo "Audio đã được upload thành công và đang được xử lý"
  - Gửi thông báo đến Giảng viên chủ trì "Audio đã được upload thành công và đang được xử lý"
  - Tự động làm mới trang để hiển thị audio đang xử lý -->

---

### AC-12: Happy Path - Upload file bài giảng cho bài học loại Bài giảng

- **Tại** trang chỉnh sửa bài học loại "Bài giảng"
- **Khi** Giảng viên chủ trì nhấn "Upload bài giảng", chọn file bài giảng (.pdf, .pptx, .docx, tối đa 100MB), sau đó nhấn "Xác nhận upload"
- **Thì** hệ thống:
  - Kiểm tra định dạng file hợp lệ (.pdf, .pptx, .docx)
  - Kiểm tra kích thước file <= 100MB
  - Hiển thị thanh tiến trình upload với phần trăm hoàn thành
  - Upload file lên hệ thống lưu trữ (cloud storage)
  - Tạo bản ghi bài giảng với trạng thái Đã upload-UPLOADED
  - Hiển thị thông báo "Bài giảng đã được upload thành công"
  - Cập nhật trạng thái bài học thành "Đã có nội dung"
  - Hiển thị file bài giảng với khả năng xem trước (preview)

---

### AC-13: Happy Path - Upload file bài kiểm tra cho bài học loại Bài kiểm tra

- **Tại** trang chỉnh sửa bài học loại "Bài kiểm tra"
- **Khi** Giảng viên chủ trì nhấn "Upload bài kiểm tra", chọn file bài kiểm tra (.pdf, .docx, .pptx tối đa 100MB), <!-- nhập thông tin bổ sung:
  <!-- - Thời gian làm bài (phút, bắt buộc)
  - Điểm đạt tối thiểu (%, mặc định 60%)
  - Số lần làm lại tối đa (mặc định: 3 lần)
  - Hướng dẫn làm bài (không bắt buộc) -->

  Sau đó nhấn "Xác nhận upload"
- **Thì** hệ thống:
  - Kiểm tra định dạng file hợp lệ (.pdf, .docx, .pptx)
  - Kiểm tra kích thước file <= 100MB
  - Kiểm tra thời gian làm bài đã được nhập
  - Hiển thị thanh tiến trình upload
  - Upload file lên hệ thống lưu trữ
  - Tạo bản ghi bài kiểm tra với trạng thái Đã upload-UPLOADED
  <!-- - Lưu các thông tin cấu hình (thời gian, điểm đạt, số lần làm lại) -->
  - Hiển thị thông báo "Bài kiểm tra đã được upload thành công"
  - Cập nhật trạng thái bài học thành "Đã có nội dung"

---

### AC-14: Happy Path - Upload file bài trắc nghiệm cho bài học loại Bài trắc nghiệm

- **Tại** trang chỉnh sửa bài học loại "Bài trắc nghiệm"
- **Khi** Giảng viên chủ trì nhấn "Upload bài trắc nghiệm", chọn file bài trắc nghiệm (.pdf, .docx, tối đa 50MB), <!-- nhập thông tin bổ sung:
  <!-- - Thời gian làm bài (phút, không bắt buộc - mặc định không giới hạn)
  - Hiển thị đáp án sau khi nộp (checkbox, mặc định: có)
  - Hướng dẫn làm bài (không bắt buộc) -->

  Sau đó nhấn "Xác nhận upload"
- **Thì** hệ thống:
  - Kiểm tra định dạng file hợp lệ (.pdf, .docx)
  - Kiểm tra kích thước file <= 50MB
  - Hiển thị thanh tiến trình upload
  - Upload file lên hệ thống lưu trữ
  - Tạo bản ghi bài trắc nghiệm với trạng thái Đã upload-UPLOADED
  - Lưu các thông tin cấu hình
  - Hiển thị thông báo "Bài trắc nghiệm đã được upload thành công"
  - Cập nhật trạng thái bài học thành "Đã có nội dung"

---

### AC-15: Happy Path - Upload tài liệu bổ sung cho bài học

- **Tại** trang chỉnh sửa bài học (bất kỳ loại nào)
- **Khi** Giảng viên chủ trì nhấn "Thêm tài liệu bổ sung", chọn file tài liệu, sau đó nhấn "Xác nhận upload"

**Inline business rulez**
| Trường | Kiểu | Mô tả |
|--------|------|-------|
| Label | Text | "Chọn Loại tài nguyên đính kèm" |
| Options | Multi-checkbox | ☐ Tài liệu, ☐ Video, ☐ Audio, ☐ Image |
| Help text | Text nhỏ | "Đánh dấu vào ô vuông để chọn loại tài liệu bạn muốn thêm." |
| Tải video lên | Tải file | Tải hoặc kéo thả một hoặc nhiều video <br> Filetype: MP4 <br>  Max size: 500MB (video) 
| Tải tài liệu | Tải file | Tải hoặc kéo thả một hoặc nhiều file <br> Filtype: PDF, DOCX, XLSX, PPTX   <br>  Max size: 30MB 
| Tải audio | Tải file | Tải hoặc kéo thả một hoặc nhiều file <br> Filtype: MP3   <br>  Max size: 300MB 
| Tải hình ảnh | Tải file | Tải hoặc kéo thả một hoặc nhiều file. <br> Filtype: PNG, JPG, JPEG   <br>  Max size: 20 MB 
---

- **Thì** hệ thống:
  - Kiểm tra định dạng file hợp lệ
  - Kiểm tra kích thước file 
  - Hiển thị thanh tiến trình upload
  - Upload file lên hệ thống lưu trữ
  - Tạo bản ghi tài liệu với trạng thái Đã upload-UPLOADED
  - Lưu tên tài liệu và mô tả
  - Hiển thị thông báo "Tài liệu đã được thêm thành công"
  - Hiển thị tài liệu mới trong danh sách tài liệu bổ sung của bài học

### AC-16: Happy Path - Upload nhiều tài liệu bổ sung cùng lúc

- **Tại** trang chỉnh sửa bài học
- **Khi** Giảng viên chủ trì nhấn "Thêm tài liệu bổ sung", chọn nhiều file cùng lúc (tối đa 5 files), sau đó nhấn "Xác nhận upload"
- **Thì** hệ thống:
  - Kiểm tra từng file: định dạng hợp lệ, kích thước <= 100MB
  - Hiển thị danh sách file được chọn với trạng thái từng file
  - Upload tuần tự từng file với thanh tiến trình
  - Hiển thị thông báo tổng hợp "Đã upload [X]/[Y] tài liệu thành công"
  - Nếu có file lỗi: Hiển thị danh sách file lỗi và lý do

---

### AC-17: Happy Path - Xóa nội dung đã upload

- **Tại** trang chỉnh sửa bài học có nội dung (video, bài giảng, bài kiểm tra, bài trắc nghiệm, tài liệu)
- **Khi** Giảng viên chủ trì nhấn nút "Xóa" bên cạnh nội dung cần xóa
- **Thì** hệ thống:
  - Hiển thị hộp thoại xác nhận: "Bạn có chắc chắn muốn xóa [loại nội dung] này?"
  - Nếu xác nhận:
    - Xóa nội dung khỏi cơ sở dữ liệu
    - Xóa file khỏi hệ thống lưu trữ (hoặc đánh dấu để xóa sau)
    - Hiển thị thông báo "Đã xóa [loại nội dung] thành công"
    - Cập nhật trạng thái bài học thành "Chưa có nội dung" nếu không còn nội dung chính

---

### AC-18: Happy Path - Thay thế file đã upload

- **Tại** trang chỉnh sửa bài học có nội dung (video, bài giảng, bài kiểm tra, bài trắc nghiệm)
- **Khi** Giảng viên chủ trì nhấn nút "Thay thế" và upload file mới
- **Thì** hệ thống:
  - Xóa file cũ (hoặc đánh dấu để xóa sau)
  - Upload và xử lý file mới theo quy trình tương ứng với loại bài học
  - Hiển thị thông báo "Đã thay thế [loại nội dung] thành công"

---

### AC-19: Happy Path - Xem trước khóa học

- **Tại** tab "Xem trước" của trang xây dựng nội dung
- **Khi** Giảng viên chủ trì nhấn "Xem trước khóa học"
- **Thì** hệ thống:
  - Hiển thị khóa học như giao diện học viên sẽ thấy
  - Cho phép xem video, xem bài giảng, xem bài kiểm tra, xem bài trắc nghiệm
  - Hiển thị nút "Quay lại chỉnh sửa" để trở về chế độ chỉnh sửa

---

### AC-20: Happy Path - Xem trước file bài giảng

- **Tại** trang chỉnh sửa bài học loại "Bài giảng" đã có file upload
- **Khi** Giảng viên chủ trì nhấn nút "Xem trước"
- **Thì** hệ thống:
  - Mở file bài giảng trong chế độ xem trước (preview mode)
  - Đối với file PDF: Hiển thị trình đọc PDF nhúng
  - Đối với file PPTX/DOCX: Hiển thị bản xem trước hoặc cho phép tải xuống
  - Cung cấp nút "Đóng" để quay lại trang chỉnh sửa

---

### AC-21: Alternative Path - Tải xuống file đã upload

- **Tại** trang chỉnh sửa bài học có nội dung đã upload
- **Khi** Giảng viên chủ trì nhấn nút "Tải xuống" bên cạnh file
- **Thì** hệ thống:
  - Tạo link tải xuống tạm thời (presigned URL)
  - Bắt đầu tải file về máy của Giảng viên
  - Hiển thị tiến trình tải xuống

---

### AC-22: Edge Case - Upload file có định dạng không hợp lệ

- **Tại** trang chỉnh sửa bài học khi upload file
- **Khi** Giảng viên chủ trì chọn file có định dạng không hợp lệ (VD: .exe, .zip, .rar)
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi "Định dạng file không hợp lệ. Chỉ chấp nhận: [Danh sách định dạng hợp lệ theo loại bài học]"
  - Không cho phép upload
  - Không tạo bản ghi trong cơ sở dữ liệu

---

### AC-23: Edge Case - Upload file vượt quá kích thước cho phép

- **Tại** trang chỉnh sửa bài học khi upload file
- **Khi** Giảng viên chủ trì chọn file có kích thước vượt quá giới hạn:
  - Video > 1GB
  - Bài giảng > 100MB
  - Bài kiểm tra/Bài trắc nghiệm > 100MB
  - Tài liệu bổ sung > 100MB
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi "File quá lớn. Kích thước tối đa: [Kích thước theo loại]"
  - Gợi ý "Vui lòng nén hoặc chia nhỏ file"
  - Không cho phép upload

---

### AC-24: Edge Case - Lỗi upload giữa chừng do mạng

- **Tại** trang chỉnh sửa bài học khi đang upload file
- **Khi** quá trình upload bị gián đoạn do lỗi mạng
- **Thì** hệ thống:
  - Hiển thị thông báo "Upload bị gián đoạn. Đang thử lại..."
  - Tự động thử lại upload 3 lần
  - Nếu vẫn thất bại: Hiển thị thông báo "Upload thất bại. Vui lòng kiểm tra kết nối và thử lại"
  - Cung cấp nút "Thử lại" để upload lại
  - Không tạo bản ghi trong cơ sở dữ liệu nếu upload không hoàn tất

---

### AC-25: Edge Case - Tạo chương/bài học với tên trùng lặp

- **Tại** trang cấu trúc khóa học khi tạo chương/bài học mới
- **Khi** Giảng viên chủ trì nhập tên chương/bài học đã tồn tại trong khóa học
- **Thì** hệ thống:
  - Hiển thị cảnh báo "Tên này đã tồn tại trong khóa học. Bạn có muốn tiếp tục?"
  - Cho phép tiếp tục nếu Giảng viên xác nhận
  - Không chặn việc tạo (chỉ cảnh báo)

---

### AC-26: Edge Case - Xóa chương có bài học đã có nội dung

- **Tại** danh sách chương khi xóa chương
- **Khi** Giảng viên chủ trì cố gắng xóa chương có chứa bài học đã upload nội dung
- **Thì** hệ thống:
  - Hiển thị cảnh báo đặc biệt: "Chương này có [X] bài học với nội dung đã upload. Tất cả file (video, bài giảng, bài kiểm tra, tài liệu) sẽ bị xóa vĩnh viễn. Bạn có chắc chắn?"
  - Yêu cầu nhập tên chương để xác nhận xóa
  - Nếu nhập đúng: Tiến hành xóa
  - Nếu nhập sai hoặc hủy: Không thực hiện xóa

---

### AC-27: Edge Case - Upload bài kiểm tra không nhập thời gian làm bài

- **Tại** trang chỉnh sửa bài học loại "Bài kiểm tra" khi upload
- **Khi** Giảng viên chủ trì upload file bài kiểm tra nhưng không nhập thời gian làm bài
- **Thì** hệ thống:
  - Hiển thị thông báo lỗi "Vui lòng nhập thời gian làm bài cho bài kiểm tra"
  - Highlight trường "Thời gian làm bài"
  - Không cho phép upload cho đến khi nhập thời gian

---

### AC-28: Error Condition - Lỗi hệ thống lưu trữ

- **Tại** hệ thống backend khi upload file
- **Khi** dịch vụ lưu trữ (cloud storage) bị lỗi hoặc không phản hồi
- **Thì** hệ thống:
  - Thử lại upload 3 lần với khoảng cách tăng dần (1s, 3s, 9s)
  - Nếu vẫn thất bại: Hiển thị thông báo "Hệ thống lưu trữ đang gặp sự cố. Vui lòng thử lại sau ít phút"
  - Ghi nhận lỗi vào log hệ thống
  - Gửi cảnh báo đến team kỹ thuật
  - Không tạo bản ghi trong cơ sở dữ liệu

---

### AC-29: Error Condition - Video xử lý thất bại

- **Tại** hệ thống sau khi upload video
- **Khi** quy trình transcoding video thất bại
- **Thì** hệ thống:
  - Cập nhật trạng thái video thành "Xử lý thất bại"
  - Gửi thông báo đến Giảng viên chủ trì: "Video [tên file] xử lý thất bại. Vui lòng thử upload lại"
  - Hiển thị nút "Thử lại" và "Xóa" trên giao diện
  - Giữ file gốc để có thể thử lại

---

### AC-30: Validation - Kiểm tra trước khi upload

- **Tại** trang chỉnh sửa bài học khi chọn file
- **Khi** Giảng viên chủ trì chọn file để upload
- **Thì** hệ thống:
  - Kiểm tra định dạng file ngay khi chọn (client-side validation)
  - Kiểm tra kích thước file ngay khi chọn
  - Hiển thị thông báo lỗi ngay lập tức nếu không hợp lệ
  - Vô hiệu hóa nút "Xác nhận upload" nếu file không hợp lệ

---

## Inline Business Rule

| Trường thông tin | Mã BR | Business Rule | Ghi chú |
|------------------|-------|---------------|---------|
| Quyền xây dựng nội dung | BR-PS-201 | Chỉ Giảng viên chủ trì-OWNER được tạo chương, bài học và upload nội dung cho toàn bộ khóa học | Full access |
| Trạng thái khóa học | BR-PS-202 | Chỉ cho phép xây dựng nội dung khi khóa học ở trạng thái Đang xây dựng nội dung-CONTENT_BUILDING | State check |
| Tên chương | BR-PS-203 | Bắt buộc nhập, tối đa 200 ký tự | Required field |
| Mô tả chương | BR-PS-204 | Không bắt buộc, tối đa 1000 ký tự | Optional field |
| Tên bài học | BR-PS-205 | Bắt buộc nhập, tối đa 200 ký tự | Required field |
| Mô tả bài học | BR-PS-206 | Không bắt buộc, tối đa 2000 ký tự | Optional field |
| Loại bài học | BR-PS-207 | Bắt buộc chọn 1 trong 4 loại: Video / Bài giảng / Bài kiểm tra / Bài trắc nghiệm | Required field |
| Định dạng video hợp lệ | BR-PS-208 | Định dạng hợp lệ: .mp4 | File format validation |
| Kích thước video tối đa | BR-PS-209 | Kích thước video tối đa: 1GB | File size limit |
| Định dạng bài giảng hợp lệ | BR-PS-210 | Các định dạng hợp lệ: .pdf, .pptx, .docx | File format validation |
| Kích thước bài giảng tối đa | BR-PS-211 | Kích thước bài giảng tối đa: 100MB | File size limit |
| Định dạng bài kiểm tra hợp lệ | BR-PS-212 | Các định dạng hợp lệ: .pdf, .docx | File format validation |
| Kích thước bài kiểm tra tối đa | BR-PS-213 | Kích thước bài kiểm tra tối đa: 50MB | File size limit |
| Định dạng bài trắc nghiệm hợp lệ | BR-PS-214 | Các định dạng hợp lệ: .pdf, .docx | File format validation |
| Kích thước bài trắc nghiệm tối đa | BR-PS-215 | Kích thước bài trắc nghiệm tối đa: 50MB | File size limit |
| Định dạng tài liệu bổ sung hợp lệ | BR-PS-216 | Các định dạng hợp lệ: .pdf, .docx, .pptx, .xlsx, .jpg, .png | File format validation |
| Kích thước tài liệu bổ sung tối đa | BR-PS-217 | Kích thước tài liệu tối đa: 50MB | File size limit |
| Số lượng tài liệu upload cùng lúc | BR-PS-218 | Tối đa 5 files cùng lúc | Batch upload limit |
| Thời gian làm bài kiểm tra | BR-PS-219 | Bắt buộc nhập khi upload bài kiểm tra, đơn vị: phút | Required for exam |
| Điểm đạt tối thiểu bài kiểm tra | BR-PS-220 | Mặc định 60%, cho phép chỉnh sửa từ 0-100% | Default value |
| Số lần làm lại bài kiểm tra | BR-PS-221 | Mặc định 3 lần, cho phép chỉnh sửa | Default value |
| Retry upload | BR-PS-222 | Tự động thử lại tối đa 3 lần khi upload thất bại | Retry mechanism |
| Transcoding video | BR-PS-223 | Video sau upload phải được chuyển đổi sang 4 độ phân giải: 360p, 480p, 720p, 1080p | Video processing |
| Thứ tự hiển thị | BR-PS-224 | Chương và bài học mới tạo tự động được đặt cuối danh sách | Display order |

---

## System Rule

- Giảng viên chủ trì-OWNER có toàn quyền tạo, sửa, xóa chương và bài học trong khóa học được giao
- Hệ thống phải kiểm tra quyền trước khi cho phép thao tác (cả client-side và server-side)
- File upload phải được quét virus trước khi lưu vào hệ thống lưu trữ
- Video sau khi upload phải được tự động chuyển đổi sang định dạng chuẩn (.mp4) và nhiều độ phân giải (360p, 480p, 720p, 1080p)
- Tất cả file (bài giảng, bài kiểm tra, bài trắc nghiệm, tài liệu) phải được lưu an toàn và chỉ người có quyền mới truy cập được
- Tất cả thao tác phải được ghi log để audit
- Khi xóa chương/bài học, hệ thống phải xóa cascade tất cả nội dung liên quan
- Thứ tự hiển thị của chương và bài học phải được duy trì nhất quán

---

## Business Value & Success Metrics

Story này sẽ cung cấp **khả năng cho Giảng viên chủ trì tự xây dựng hoàn chỉnh nội dung khóa học từ đầu đến cuối, bao gồm tạo cấu trúc (chương, bài học), upload đa dạng nội dung (video, bài giảng, bài kiểm tra, bài trắc nghiệm, tài liệu bổ sung), đảm bảo trải nghiệm mượt mà và hiệu quả trong việc xây dựng khóa học chất lượng cao**

Trọng số của story này là **21**

Story được coi là thành công khi đảm bảo được:
- 100% Giảng viên chủ trì có thể tạo và quản lý chương, bài học
- 95% upload thành công trong lần đầu tiên
- 98% video được chuyển đổi định dạng thành công sau khi upload
- 100% file upload được quét virus trước khi lưu trữ
- Thời gian upload trung bình: < 30 giây cho file 100MB
- Thời gian tải trang chỉnh sửa bài học: < 2 giây
- 90% Giảng viên chủ trì hoàn thành việc xây dựng nội dung trong 2 tuần

---

## Dependencies

- **lf-course service**: Quản lý khóa học, chương, bài học
- **lf-curriculum service**: Quản lý cấu trúc curriculum
- **lf-content-delivery service**: Lưu trữ và phân phối nội dung
- **storage service**: Lưu trữ file video, bài giảng, bài kiểm tra, bài trắc nghiệm và tài liệu
- **transcoding service**: Chuyển đổi định dạng video
- **virus-scan service**: Quét virus cho tất cả file upload
- **US-PS-008**: Giảng viên chủ trì phải chấp nhận lời mời trước khi xây dựng nội dung

---

## Impact Analysis

- **Giảng viên chủ trì**: Có toàn quyền xây dựng nội dung khóa học, trải nghiệm tạo khóa học hoàn chỉnh từ A-Z với việc upload các loại file khác nhau
- **School Admin**: Theo dõi tiến độ xây dựng nội dung, đảm bảo khóa học được hoàn thành đúng hạn
- **Học viên**: Được học từ khóa học có nội dung đa dạng (video, bài giảng, bài kiểm tra, bài trắc nghiệm)
- **Storage System**: Tăng khối lượng file lưu trữ, cần đảm bảo capacity và performance
- **Transcoding System**: Xử lý chuyển đổi video tự động
- **Security**: Quét virus cho tất cả file upload, bảo vệ hệ thống khỏi malware
- **User Experience**: Trải nghiệm xây dựng khóa học trực quan với drag-drop, upload đa định dạng

---

## UI/UX Design

### Trang xây dựng nội dung khóa học - Tab Cấu trúc
```
┌─────────────────────────────────────────────────────────────────┐
│  📚 Xây dựng nội dung khóa học                                  │
│  Khóa học: Toán nâng cao - Lớp 12                               │
│  Vai trò: Giảng viên chủ trì                                    │
│  Tiến độ: 45% (9/20 bài học đã có nội dung)                     │
├─────────────────────────────────────────────────────────────────┤
│  [Cấu trúc khóa học] [Nội dung bài học] [Xem trước]             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Cấu trúc khóa học                    [+ Thêm chương mới]       │
│  ═══════════════════════════════════════════════════════════    │
│                                                                 │
│  📁 Chương 1: Đại số                          [Sửa] [Xóa] ⋮    │
│  ├── 🎬 Bài 1.1: Phương trình bậc 2    ✅    [Chỉnh sửa]       │
│  │       (Video)                                                │
│  ├── 📖 Bài 1.2: Lý thuyết bất PT      ✅    [Chỉnh sửa]       │
│  │       (Bài giảng)                                            │
│  ├── 📝 Bài 1.3: Kiểm tra chương 1     ○     [Chỉnh sửa]       │
│  │       (Bài kiểm tra)                                         │
│  └── [+ Thêm bài học]                                           │
│                                                                 │
│  📁 Chương 2: Hình học                        [Sửa] [Xóa] ⋮    │
│  ├── 🎬 Bài 2.1: Vector                ✅    [Chỉnh sửa]       │
│  │       (Video)                                                │
│  ├── ✓ Bài 2.2: Trắc nghiệm vector    ○     [Chỉnh sửa]       │
│  │       (Bài trắc nghiệm)                                      │
│  └── [+ Thêm bài học]                                           │
│                                                                 │
│  📁 Chương 3: Giải tích                       [Sửa] [Xóa] ⋮    │
│  ├── 🎬 Bài 3.1: Giới hạn              ✅    [Chỉnh sửa]       │
│  ├── 📖 Bài 3.2: Đạo hàm               ○     [Chỉnh sửa]       │
│  ├── 📝 Bài 3.3: Kiểm tra giải tích    ○     [Chỉnh sửa]       │
│  └── [+ Thêm bài học]                                           │
│                                                                 │
│  Chú thích: ✅ Đã có nội dung | ○ Chưa có nội dung              │
│  🎬 Video | 📖 Bài giảng | 📝 Bài kiểm tra | ✓ Bài trắc nghiệm  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Hộp thoại Thêm chương mới
```
┌──────────────────────────────────────────────────────────────┐
│  📁 Thêm chương mới                                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Tên chương *                                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ VD: Chương 4: Xác suất và thống kê                     │ │
│  └────────────────────────────────────────────────────────┘ │
│  (0/200 ký tự)                                               │
│                                                              │
│  Mô tả chương                                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Giới thiệu các khái niệm cơ bản về xác suất và         │ │
│  │ thống kê ứng dụng trong đời sống...                    │ │
│  │                                                          │ │
│  └────────────────────────────────────────────────────────┘ │
│  (0/1000 ký tự)                                              │
│                                                              │
│                    [Hủy]     [Lưu chương]                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Hộp thoại Thêm bài học mới
```
┌──────────────────────────────────────────────────────────────┐
│  📄 Thêm bài học mới                                         │
│  Chương: Chương 3 - Giải tích                                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Tên bài học *                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ VD: Bài 3.4: Ứng dụng đạo hàm                          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  Mô tả bài học                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Tìm hiểu các ứng dụng của đạo hàm trong tìm cực        │ │
│  │ trị và bài toán tối ưu...                              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  Loại bài học *                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ ○ 🎬 Video          - Upload file video (.mp4)         │ │
│  │ ○ 📖 Bài giảng      - Upload file bài giảng (.pdf,     │ │
│  │                       .pptx, .docx)                     │ │
│  │ ○ 📝 Bài kiểm tra   - Upload file đề kiểm tra (.pdf,   │ │
│  │                       .docx) + cấu hình điểm/thời gian  │ │
│  │ ○ ✓ Bài trắc nghiệm - Upload file trắc nghiệm (.pdf,   │ │
│  │                       .docx)                            │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  Thời lượng ước tính (phút)                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 45                                                      │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ☐ Cho phép xem trước miễn phí                               │
│  ☑ Bắt buộc hoàn thành                                       │
│                                                              │
│                    [Hủy]     [Lưu bài học]                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Trang chỉnh sửa bài học - Loại Video
```
┌─────────────────────────────────────────────────────────────────┐
│  🎬 Chỉnh sửa bài học                                           │
│  Bài 3.1: Giới hạn | Chương 3: Giải tích                        │
│  Loại: Video                                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📹 Video bài học *                                             │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  📤 Upload video                                           │ │
│  │                                                             │ │
│  │  Kéo thả file vào đây hoặc [Chọn file từ máy tính]        │ │
│  │                                                             │ │
│  │  Định dạng hỗ trợ: MP4                                     │ │
│  │  Kích thước tối đa: 1GB                                    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  📄 Tài liệu bổ sung (không bắt buộc)                           │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Chưa có tài liệu                                               │
│  [+ Thêm tài liệu bổ sung]                                      │
│                                                                 │
│                                         [Lưu và hoàn thành]     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Trang chỉnh sửa bài học - Loại Bài giảng
```
┌─────────────────────────────────────────────────────────────────┐
│  📖 Chỉnh sửa bài học                                           │
│  Bài 1.2: Lý thuyết bất phương trình | Chương 1: Đại số         │
│  Loại: Bài giảng                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📄 File bài giảng *                                            │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  📤 Upload bài giảng                                       │ │
│  │                                                             │ │
│  │  Kéo thả file vào đây hoặc [Chọn file từ máy tính]        │ │
│  │                                                             │ │
│  │  Định dạng hỗ trợ: PDF, PPTX, DOCX                         │ │
│  │  Kích thước tối đa: 100MB                                  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  📄 Tài liệu bổ sung (không bắt buộc)                           │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Chưa có tài liệu                                               │
│  [+ Thêm tài liệu bổ sung]                                      │
│                                                                 │
│                                         [Lưu và hoàn thành]     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Trang chỉnh sửa bài học - Loại Bài kiểm tra
```
┌─────────────────────────────────────────────────────────────────┐
│  📝 Chỉnh sửa bài học                                           │
│  Bài 1.3: Kiểm tra chương 1 | Chương 1: Đại số                  │
│  Loại: Bài kiểm tra                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📄 File đề kiểm tra *                                          │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  📤 Upload đề kiểm tra                                     │ │
│  │                                                             │ │
│  │  Kéo thả file vào đây hoặc [Chọn file từ máy tính]        │ │
│  │                                                             │ │
│  │  Định dạng hỗ trợ: PDF, DOCX                               │ │
│  │  Kích thước tối đa: 50MB                                   │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ⚙️ Cấu hình bài kiểm tra                                       │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Thời gian làm bài *    Điểm đạt tối thiểu    Số lần làm lại   │
│  ┌──────────┐           ┌──────────┐          ┌──────────┐     │
│  │ 45 phút  │           │ 60%      │          │ 3 lần    │     │
│  └──────────┘           └──────────┘          └──────────┘     │
│                                                                 │
│  Hướng dẫn làm bài                                              │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Học viên đọc kỹ đề trước khi làm bài. Không được sử       │ │
│  │ dụng tài liệu trong quá trình làm bài...                  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  📄 Tài liệu bổ sung (không bắt buộc)                           │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Chưa có tài liệu                                               │
│  [+ Thêm tài liệu bổ sung]                                      │
│                                                                 │
│                                         [Lưu và hoàn thành]     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Trang chỉnh sửa bài học - Loại Bài trắc nghiệm
```
┌─────────────────────────────────────────────────────────────────┐
│  ✓ Chỉnh sửa bài học                                            │
│  Bài 2.2: Trắc nghiệm vector | Chương 2: Hình học               │
│  Loại: Bài trắc nghiệm                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📄 File bài trắc nghiệm *                                      │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  📤 Upload bài trắc nghiệm                                 │ │
│  │                                                             │ │
│  │  Kéo thả file vào đây hoặc [Chọn file từ máy tính]        │ │
│  │                                                             │ │
│  │  Định dạng hỗ trợ: PDF, DOCX                               │ │
│  │  Kích thước tối đa: 50MB                                   │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ⚙️ Cấu hình bài trắc nghiệm                                    │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Thời gian làm bài (không bắt buộc)                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Không giới hạn                                    ▼       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ☑ Hiển thị đáp án sau khi nộp                                  │
│                                                                 │
│  Hướng dẫn làm bài                                              │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Bài trắc nghiệm giúp học viên ôn tập kiến thức về        │ │
│  │ vector. Có thể làm nhiều lần...                          │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  📄 Tài liệu bổ sung (không bắt buộc)                           │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Chưa có tài liệu                                               │
│  [+ Thêm tài liệu bổ sung]                                      │
│                                                                 │
│                                         [Lưu và hoàn thành]     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Hộp thoại upload - Đang upload
```
┌──────────────────────────────────────────────────────────────┐
│  📤 Đang upload file                                         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  File: bai_kiem_tra_chuong_1.pdf                             │
│  Kích thước: 15 MB                                           │
│                                                              │
│  Tiến trình:                                                 │
│  ████████████████████░░░░░░░░░░░░ 65%                        │
│                                                              │
│  Đã upload: 9.75 MB / 15 MB                                  │
│  Thời gian còn lại: ~10 giây                                 │
│                                                              │
│                     [Hủy upload]                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Trang bài học sau khi upload thành công - Loại Bài kiểm tra
```
┌─────────────────────────────────────────────────────────────────┐
│  📝 Chỉnh sửa bài học                                           │
│  Bài 1.3: Kiểm tra chương 1 | Chương 1: Đại số                  │
│  Loại: Bài kiểm tra               Trạng thái: ✅ Đã có nội dung │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📄 File đề kiểm tra                                            │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  📄 bai_kiem_tra_chuong_1.pdf                             │ │
│  │  Kích thước: 15 MB                                         │ │
│  │  Trạng thái: ✅ Đã upload                                  │ │
│  │  Upload: 13/12/2025 10:30                                 │ │
│  │                                                             │ │
│  │  [Xem trước] [Tải xuống] [Thay thế] [Xóa]                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ⚙️ Cấu hình bài kiểm tra                                       │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  Thời gian làm bài: 45 phút                                     │
│  Điểm đạt tối thiểu: 60%                                        │
│  Số lần làm lại: 3 lần                                          │
│                                          [Chỉnh sửa cấu hình]   │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  📄 Tài liệu bổ sung (2 files)                                  │
│  ────────────────────────────────────────────────────────────   │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ 📄 Đáp án bài kiểm tra                                    │ │
│  │    dap_an_chuong_1.pdf (2 MB)                             │ │
│  │    [Tải xuống] [Xóa]                                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ 📄 Công thức tham khảo                                    │ │
│  │    cong_thuc_dai_so.pdf (1 MB)                            │ │
│  │    [Tải xuống] [Xóa]                                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [+ Thêm tài liệu bổ sung]                                      │
│                                                                 │
│                                         [Lưu và hoàn thành]     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Hành vi của quy trình**:
- Giảng viên chủ trì có toàn quyền tạo, sửa, xóa chương và bài học
- Hỗ trợ drag-drop để sắp xếp lại thứ tự chương và bài học
- 4 loại bài học rõ ràng: Video, Bài giảng, Bài kiểm tra, Bài trắc nghiệm
- Mỗi loại bài học có định dạng file và cấu hình riêng:
  - **Video**: Upload file .mp4, tự động transcoding
  - **Bài giảng**: Upload file .pdf/.pptx/.docx, xem trước được
  - **Bài kiểm tra**: Upload file .pdf/.docx + cấu hình thời gian/điểm đạt/số lần làm
  - **Bài trắc nghiệm**: Upload file .pdf/.docx + cấu hình hiển thị đáp án
- Validation ngay lập tức khi chọn file (định dạng, kích thước)
- Hiển thị thanh tiến trình real-time khi upload
- Có thể thêm tài liệu bổ sung cho tất cả loại bài học
- Có thể xem trước khóa học như giao diện học viên

---

## Out of Scope Item

- **Video recording in-app**: Quay video trực tiếp trong ứng dụng (chỉ upload file có sẵn cho MVP)
- **Live streaming**: Phát trực tiếp video bài giảng
- **Video editing in-app**: Chỉnh sửa video trong ứng dụng
- **AI-powered video transcription**: Tự động tạo phụ đề cho video
- **Online quiz builder**: Tạo bài kiểm tra/trắc nghiệm trực tuyến với câu hỏi tương tác (chỉ upload file cho MVP)
- **Auto-grading**: Chấm điểm tự động cho bài kiểm tra/trắc nghiệm
- **Collaborative editing**: Nhiều người chỉnh sửa cùng lúc
- **Version control**: Quản lý phiên bản nội dung
- **Content scheduling**: Lên lịch xuất bản nội dung theo thời gian
- **Bulk import lessons**: Import hàng loạt bài học từ file
- **External content integration**: Tích hợp nội dung từ YouTube, Vimeo
- **Interactive video**: Video có câu hỏi tương tác giữa chừng
