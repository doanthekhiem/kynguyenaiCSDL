# US-AUTH-001: Đăng nhập bằng email và mật khẩu (SaaS)

## User Story

Là một **người dùng của trường học/trung tâm (học sinh, giáo viên, quản trị viên)**
Tôi muốn thực hiện **đăng nhập vào hệ thống bằng email và mật khẩu** tại **trang đăng nhập của ứng dụng học tập/quản lý**
Để **truy cập vào các chức năng học tập, giảng dạy hoặc quản lý của trường/trung tâm**

---

## Acceptance Criteria

### AC-1: Đăng nhập thành công với thông tin đúng (Luồng chính)

- **Tại** trang đăng nhập của trường/trung tâm (ví dụ: truongtieuhocabc.learning.theschools.vn)
- **Khi** người dùng nhập đúng email và mật khẩu, sau đó nhấn nút "Đăng nhập"
- **Thì** hệ thống xác nhận thông tin đăng nhập và chuyển người dùng vào trang chính của hệ thống

### AC-2: Báo lỗi khi email không đúng định dạng

- **Tại** form đăng nhập
- **Khi** người dùng nhập email sai định dạng (thiếu @, hoặc có khoảng trắng, ví dụ: "hocsinh@", "hocsinh.com")
- **Thì** hệ thống hiển thị thông báo "Email không đúng định dạng" ngay bên dưới ô nhập email

### AC-3: Báo lỗi khi bỏ trống thông tin bắt buộc

- **Tại** form đăng nhập
- **Khi** người dùng bỏ trống ô email hoặc ô mật khẩu rồi nhấn "Đăng nhập"
- **Thì** hệ thống hiển thị thông báo "Vui lòng nhập email" hoặc "Vui lòng nhập mật khẩu" tại ô tương ứng

### AC-4: Báo lỗi khi thông tin đăng nhập không chính xác

- **Tại** form đăng nhập sau khi người dùng đã nhập email và mật khẩu
- **Khi** người dùng nhập email không tồn tại trong hệ thống hoặc nhập sai mật khẩu
- **Thì** hệ thống hiển thị thông báo "Email hoặc mật khẩu không đúng" và ghi nhận lần đăng nhập thất bại

### AC-5: Khóa tài khoản tạm thời khi nhập sai nhiều lần

- **Tại** form đăng nhập sau khi người dùng đã nhập sai mật khẩu 4 lần
- **Khi** người dùng nhập sai mật khẩu lần thứ 5
- **Thì** hệ thống khóa tài khoản trong 30 phút, hiển thị thông báo "Tài khoản đã bị khóa do đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 30 phút", đồng thời gửi email/SMS thông báo cho người dùng

### AC-6: Báo lỗi khi tài khoản đang bị khóa

- **Tại** form đăng nhập
- **Khi** người dùng có tài khoản đang bị khóa cố gắng đăng nhập
- **Thì** hệ thống hiển thị thông báo "Tài khoản đã bị khóa. Vui lòng thử lại sau {thời gian còn lại}" và không cho phép đăng nhập

### AC-7: Báo lỗi khi trường/trung tâm không tồn tại

- **Tại** đường dẫn trang đăng nhập với tên trường/trung tâm không tồn tại trong hệ thống
- **Khi** người dùng cố gắng truy cập trang đăng nhập
- **Thì** hệ thống hiển thị thông báo "Trường/Trung tâm không tồn tại hoặc không khả dụng"

### AC-8: Xóa số lần nhập sai khi đăng nhập thành công

- **Tại** trạng thái tài khoản đã từng nhập sai mật khẩu
- **Khi** người dùng đăng nhập thành công
- **Thì** hệ thống xóa bộ đếm số lần nhập sai về 0 và ghi nhận thời gian đăng nhập thành công

### AC-9: Lưu phiên đăng nhập khi thành công

- **Tại** quá trình xác thực đăng nhập thành công
- **Khi** hệ thống nhận được mã truy cập và mã làm mới từ dịch vụ xác thực
- **Thì** hệ thống lưu thông tin phiên đăng nhập bao gồm: mã người dùng, mã trường/trung tâm, mã truy cập đã mã hóa, địa chỉ IP, thông tin trình duyệt

### AC-10: Ghi nhật ký đăng nhập thành công

- **Tại** quá trình đăng nhập thành công
- **Khi** người dùng đã được xác thực thành công
- **Thì** hệ thống ghi lại thông tin đăng nhập vào nhật ký bao gồm: mã người dùng, địa chỉ IP, thông tin trình duyệt, kết quả đăng nhập thành công, thời gian đăng nhập

### AC-11: Lưu mã truy cập an toàn trên trình duyệt

- **Tại** màn hình đăng nhập sau khi API trả về kết quả thành công
- **Khi** hệ thống trả về mã truy cập và mã làm mới
- **Thì** ứng dụng web lưu các mã này vào vùng nhớ an toàn của trình duyệt (httpOnly cookies với Secure=true, SameSite=Strict)

### AC-12: Tự động nhận diện loại thông tin đăng nhập

- **Tại** form đăng nhập
- **Khi** người dùng nhập một chuỗi có chứa ký tự "@" vào ô thông tin đăng nhập
- **Thì** hệ thống tự động nhận diện đây là email và kiểm tra định dạng email chuẩn

---

## Inline Business Rule

| Trường thông tin | Mã BR | Quy tắc nghiệp vụ | Ghi chú |
|------------------|-------|-------------------|---------|
| Email | BR_AUTH_001 | Bắt buộc nhập | |
| Email | BR_AUTH_002 | Phải đúng định dạng email chuẩn | Kiểm tra ở giao diện và hệ thống |
| Email | BR_AUTH_003 | Không phân biệt chữ hoa chữ thường | Chuyển về chữ thường trước khi kiểm tra |
| Mật khẩu | BR_AUTH_004 | Bắt buộc nhập | |
| Mật khẩu | BR_AUTH_005 | Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt | Kiểm tra tại dịch vụ xác thực |
| Trường/Trung tâm | BR_AUTH_006 | Trường/Trung tâm phải tồn tại và đang hoạt động | Xác định từ tên miền con |
| Người dùng | BR_AUTH_007 | Người dùng phải tồn tại trong trường/trung tâm | Tìm kiếm bằng email + mã trường/trung tâm |
| Người dùng | BR_AUTH_008 | Người dùng phải ở trạng thái hoạt động | Không cho phép tài khoản đang bị khóa, tạm dừng, chưa kích hoạt đăng nhập |
| Số lần nhập sai | BR_AUTH_009 | Tối đa 5 lần nhập sai | Sau 5 lần sẽ khóa tài khoản |
| Khóa tài khoản | BR_AUTH_010 | Thời gian khóa là 30 phút | Tự động mở khóa sau 30 phút hoặc quản trị viên mở khóa thủ công |

---

## System Rule

- Mỗi trường/trung tâm được gán một vùng quản lý riêng trong hệ thống xác thực (Keycloak realm theo pattern: tenant-{mã_trường})
- Email phải là duy nhất trong phạm vi một trường/trung tâm (có thể trùng ở trường khác)
- Phiên đăng nhập được lưu trong bộ nhớ đệm với thời gian tự động hết hạn
- Mã truy cập có thời hạn 15 phút
- Mã làm mới có thời hạn 7 ngày
- Tất cả sự kiện đăng nhập phải được ghi nhận vào hệ thống theo dõi sự kiện (Kafka topic auth.events)
- Mã truy cập phải được mã hóa bằng thuật toán SHA-256 trước khi lưu
- Địa chỉ IP và thông tin trình duyệt phải được ghi lại cho mọi lần đăng nhập (thành công và thất bại)

---

## Business Value & Success Metrics

Story này sẽ cung cấp **khả năng xác thực người dùng an toàn và đáng tin cậy, đảm bảo chỉ người dùng hợp lệ mới được truy cập vào hệ thống học tập và quản lý của trường/trung tâm**

Trọng số của story này là **Cao (High)**

Story được coi là thành công khi đảm bảo được:
- Tỷ lệ đăng nhập thành công đạt ≥ 99% với thông tin đúng
- Thời gian phản hồi đăng nhập ≤ 2 giây (95% trường hợp)
- Không có lỗ hổng bảo mật liên quan đến đăng nhập trong 3 tháng đầu
- Số tài khoản bị khóa do tấn công < 0.1% tổng số tài khoản
- 100% các lần đăng nhập được ghi nhật ký đầy đủ
- 100% sự kiện đăng nhập được ghi nhận thành công vào hệ thống theo dõi

---

## Dependencies

- Hệ thống xác thực Keycloak đã được cấu hình sẵn các vùng quản lý cho trường/trung tâm
- Hệ thống bộ nhớ đệm Redis đã sẵn sàng
- Hệ thống theo dõi sự kiện Kafka đã sẵn sàng với topic auth.events
- Dịch vụ thông báo đã sẵn sàng để gửi email/SMS thông báo khóa tài khoản
- Dịch vụ gửi email AWS SES đã được cấu hình
- Cơ sở dữ liệu PostgreSQL đã có bảng: trường_trung_tâm (tenant), người_dùng (tenant_user), nhật_ký_đăng_nhập (login_history), lịch_sử_trạng_thái (user_status_history)
- Hệ thống điều phối luồng công việc Temporal đã sẵn sàng để chạy quy trình tự động mở khóa

---

## Impact Analysis

- **Giao diện người dùng** (lf-web, sf-web): Cần xây dựng form đăng nhập với kiểm tra dữ liệu, xử lý lỗi, lưu mã truy cập an toàn
- **Hệ thống phụ trợ** (edu-saas-control-identity): Xây dựng API đăng nhập, tích hợp với Keycloak, Redis, Kafka
- **Tầng trung gian** (agg-edu-saas-control-identity-graph): Xây dựng chức năng đăng nhập qua GraphQL
- **Hệ thống xác thực** Keycloak: Cần cấu hình vùng quản lý, ứng dụng khách, chính sách mật khẩu
- **Cơ sở dữ liệu**: Cần tạo cấu trúc bảng mới và các chỉ mục
- **Giám sát**: Cần thiết lập cảnh báo cho tỷ lệ đăng nhập thất bại cao, sự kiện khóa tài khoản
- **Bảo mật**: Cần rà soát mã nguồn để đảm bảo không có lỗ hổng bảo mật

---

## UI/UX Design

### Trang đăng nhập (Máy tính)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│         [Logo Trường/Trung tâm]                     │
│                                                     │
│      Đăng nhập vào {Tên Trường/Trung tâm}          │
│                                                     │
│   ┌───────────────────────────────────────────┐   │
│   │ Email                                      │   │
│   │ ┌───────────────────────────────────────┐ │   │
│   │ │ Nhập địa chỉ email của bạn            │ │   │
│   │ └───────────────────────────────────────┘ │   │
│   └───────────────────────────────────────────┘   │
│                                                     │
│   ┌───────────────────────────────────────────┐   │
│   │ Mật khẩu                                   │   │
│   │ ┌───────────────────────────────────────┐ │   │
│   │ │ ••••••••••                         👁 │ │   │
│   │ └───────────────────────────────────────┘ │   │
│   └───────────────────────────────────────────┘   │
│                                                     │
│   ┌ Quên mật khẩu?                                 │
│                                                     │
│   ┌───────────────────────────────────────────┐   │
│   │          Đăng nhập                         │   │
│   └───────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Thông báo lỗi

**Email không đúng định dạng:**
```
┌───────────────────────────────────────────┐
│ Email                                      │
│ ┌───────────────────────────────────────┐ │
│ │ hocsinh@                              │ │
│ └───────────────────────────────────────┘ │
│ ⚠ Email không đúng định dạng              │
└───────────────────────────────────────────┘
```

**Thông tin đăng nhập không đúng:**
```
┌─────────────────────────────────────────────┐
│ ⚠ Email hoặc mật khẩu không đúng            │
│   Vui lòng kiểm tra lại thông tin          │
└─────────────────────────────────────────────┘
```

**Tài khoản bị khóa:**
```
┌─────────────────────────────────────────────┐
│ 🔒 Tài khoản đã bị khóa                     │
│    Tài khoản của bạn đã bị khóa do đăng     │
│    nhập sai quá nhiều lần.                  │
│    Vui lòng thử lại sau 25 phút.            │
└─────────────────────────────────────────────┘
```

---

## Out of Scope Items

### Phạm vi nghiệp vụ ngoài
- Đăng ký tài khoản mới (thuộc chức năng Quản lý người dùng)
- Quản lý thông tin cá nhân của người dùng (thuộc chức năng Quản lý hồ sơ)
- Phân quyền và kiểm tra quyền truy cập (thuộc hệ thống Phân quyền)
- Xác thực hai yếu tố (MFA) - sẽ triển khai ở giai đoạn sau
- Đăng nhập bằng tài khoản mạng xã hội (Google, Facebook) - sẽ triển khai ở giai đoạn sau

### Phạm vi kỹ thuật ngoài
- Tích hợp với LDAP/Active Directory - không có yêu cầu
- Xác thực bằng sinh trắc học - không hỗ trợ trên web
- Chức năng ghi nhớ đăng nhập - sẽ xem xét ở giai đoạn sau
- Đăng nhập một lần cho nhiều trường/trung tâm - không có yêu cầu
- Thanh hiển thị độ mạnh mật khẩu thời gian thực - có thể bổ sung sau

### Phạm vi hạ tầng ngoài
- Triển khai cụm Keycloak - do đội Hạ tầng đảm nhận
- Triển khai cụm Redis - do đội Hạ tầng đảm nhận
- Triển khai cụm Kafka - do đội Hạ tầng đảm nhận
- Cấu hình cân bằng tải - do đội Hạ tầng đảm nhận
