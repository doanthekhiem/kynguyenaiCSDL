# NHÓM G: XỬ LÝ LỖI VÀ ĐỘ TIN CẬY

> **Nhóm chức năng:** Xử lý lỗi và đảm bảo độ tin cậy hệ thống
> **Số lượng User Stories:** 1
> **Vai trò chính:** Hệ thống

---

## US-PIM-024: Xử lý sự kiện thất bại

### Nội dung
Là **Hệ thống**
Tôi muốn **xử lý các sự kiện Kafka bị thất bại và cơ chế thử lại**
Tại **Hệ thống backend các dịch vụ**
Để **đảm bảo tính nhất quán cuối cùng và không mất dữ liệu**

---

### Tiêu chí chấp nhận

#### TC-1 – Thử lại sự kiện thất bại
- **Tại:** Kafka consumer
- **Khi:** Xử lý sự kiện thất bại
- **Thì:**
  - Thử lại với thời gian chờ tăng dần (1s, 2s, 4s)
  - Số lần thử lại tối đa: 3 lần
  - Nếu vẫn thất bại: gửi sự kiện đến DLQ (Dead Letter Queue)
  - Ghi nhật ký lỗi với thông tin đầy đủ
  - Cảnh báo đội vận hành

**Quy tắc nghiệp vụ:**
- Chính sách thử lại: tối đa 3 lần, thời gian chờ tăng dần
- Thời gian lưu trữ DLQ: 14 ngày

---

#### TC-2 – Giám sát và cảnh báo DLQ
- **Tại:** Bảng điều khiển vận hành
- **Khi:** Sự kiện đến DLQ
- **Thì:**
  - Cảnh báo được gửi khi DLQ > ngưỡng
  - Đội vận hành có thể:
    - Xem chi tiết sự kiện
    - Xử lý lại thủ công
    - Loại bỏ
  - Theo dõi chỉ số: tổng số thông báo DLQ, tỷ lệ xử lý lại thành công

---

#### TC-3 – Xử lý trùng lặp (Idempotency)
- **Tại:** Bộ xử lý sự kiện
- **Khi:** Nhận sự kiện trùng lặp (do thử lại)
- **Thì:**
  - Kiểm tra mã sự kiện đã được xử lý chưa (Redis/Database)
  - Nếu đã xử lý: ghi nhật ký và bỏ qua
  - Nếu chưa xử lý: xử lý và đánh dấu là đã xử lý
  - TTL (Time To Live): 24 giờ

**Quy tắc nghiệp vụ:**
- Sử dụng mã sự kiện làm khóa idempotency
- Lưu trữ trong Redis với TTL 24 giờ

---

#### TC-4 – Xử lý lỗi khi gọi dịch vụ khác
- **Tại:** Các dịch vụ gọi API của dịch vụ khác
- **Khi:** Gọi API thất bại
- **Thì:**
  - Thử lại với chính sách thử lại:
    - Lỗi mạng: thử lại 3 lần
    - Lỗi 5xx: thử lại 3 lần
    - Lỗi 4xx: không thử lại (trừ 429 Too Many Requests)
  - Timeout: 30 giây
  - Circuit breaker: sau 5 lần thất bại liên tiếp, mở mạch trong 60 giây
  - Fallback: trả về dữ liệu cache hoặc dữ liệu mặc định nếu có

**Quy tắc nghiệp vụ:**
- Thời gian timeout: 30 giây
- Circuit breaker: 5 lần thất bại, nghỉ 60 giây

---

#### TC-5 – Ghi nhật ký chi tiết
- **Tại:** Tất cả các điểm xử lý lỗi
- **Khi:** Xảy ra lỗi
- **Thì:**
  - Ghi nhật ký với cấu trúc:
    - Timestamp
    - Mức độ (ERROR, WARN)
    - Dịch vụ
    - Loại lỗi
    - Thông báo lỗi
    - Stack trace
    - Ngữ cảnh (mã đơn đăng ký, mã sản phẩm, v.v.)
  - Tập trung nhật ký vào hệ thống quản lý nhật ký (ELK, CloudWatch)
  - Cho phép truy vấn và phân tích

---

#### TC-6 – Cơ chế outbox giao dịch
- **Tại:** Dịch vụ sf-product
- **Khi:** Cập nhật dữ liệu và gửi sự kiện
- **Thì:**
  - Sử dụng mẫu outbox:
    - Bắt đầu giao dịch database
    - Cập nhật dữ liệu nghiệp vụ
    - Chèn bản ghi sự kiện vào bảng outbox
    - Cam kết giao dịch
  - Bộ thu thập outbox:
    - Định kỳ (mỗi 100ms) lấy sự kiện chưa công bố
    - Gửi sự kiện lên Kafka
    - Đánh dấu là đã công bố

**Quy tắc nghiệp vụ:**
- Đảm bảo tính nhất quán giữa dữ liệu và sự kiện
- Gửi sự kiện ít nhất một lần (at-least-once)

---

#### TC-7 – Giám sát độ trễ sự kiện
- **Tại:** Hệ thống giám sát
- **Khi:** Xử lý sự kiện
- **Thì:**
  - Theo dõi thời gian từ khi tạo sự kiện đến khi xử lý xong
  - Cảnh báo khi độ trễ > 30 giây
  - Chỉ số:
    - Độ trễ trung bình
    - Độ trễ p95, p99
    - Số lượng sự kiện đang chờ xử lý

---

#### TC-8 – Cơ chế circuit breaker cho Kafka
- **Tại:** Kafka producer
- **Khi:** Gửi sự kiện thất bại nhiều lần
- **Thì:**
  - Sau 5 lần thất bại liên tiếp: mở mạch
  - Trong thời gian mở mạch (60 giây):
    - Lưu sự kiện vào bảng outbox
    - Không cố gửi lên Kafka
  - Sau 60 giây: thử lại (half-open)
  - Nếu thành công: đóng mạch
  - Nếu thất bại: mở mạch lại

---

#### TC-9 – Xử lý lỗi Temporal workflow
- **Tại:** Temporal workflow
- **Khi:** Activity thất bại
- **Thì:**
  - Thử lại theo chính sách thử lại của activity
  - Nếu thất bại sau tất cả lần thử:
    - Workflow chuyển sang trạng thái thất bại
    - Gửi cảnh báo
    - Lưu trạng thái để phân tích
  - Cho phép xử lý lại thủ công

**Quy tắc nghiệp vụ:**
- Mỗi activity có chính sách thử lại riêng
- Workflow có thể chờ can thiệp thủ công

---

#### TC-10 – Kiểm tra tính toàn vẹn dữ liệu
- **Tại:** Công việc định kỳ backend
- **Khi:** Chạy hàng ngày vào 2:00 sáng
- **Thì:**
  - Kiểm tra:
    - Đơn đăng ký có trạng thái không hợp lệ
    - Sự kiện trong outbox quá cũ (> 1 giờ)
    - Dữ liệu không nhất quán giữa các dịch vụ
  - Gửi báo cáo cho đội vận hành
  - Đề xuất hành động khắc phục

---

#### TC-11 – Khôi phục sau sự cố
- **Tại:** Quy trình khôi phục
- **Khi:** Hệ thống gặp sự cố
- **Thì:**
  - Tài liệu hướng dẫn khôi phục:
    - Khôi phục dữ liệu từ sao lưu
    - Xử lý lại sự kiện từ DLQ
    - Đồng bộ lại dữ liệu giữa các dịch vụ
  - Công cụ hỗ trợ:
    - Script xử lý lại sự kiện
    - Script kiểm tra tính nhất quán
    - Script sửa dữ liệu

---

#### TC-12 – Thống kê và báo cáo lỗi
- **Tại:** Bảng điều khiển giám sát
- **Khi:** Xem báo cáo
- **Thì:**
  - Hiển thị:
    - Số lượng lỗi theo loại
    - Tỷ lệ lỗi / tổng số yêu cầu
    - Dịch vụ có tỷ lệ lỗi cao nhất
    - Xu hướng lỗi theo thời gian
  - Cảnh báo khi tỷ lệ lỗi > 1%

---

### Giá trị kinh doanh
- Đảm bảo độ tin cậy của hệ thống
- Tính nhất quán cuối cùng (eventual consistency)
- Không mất dữ liệu
- Giảm thời gian ngừng hoạt động
- Phát hiện và xử lý lỗi nhanh chóng

---

### Chỉ số đo lường
- Số thông báo DLQ < 1% tổng số sự kiện
- Tỷ lệ xử lý sự kiện thành công >= 99%
- Thời gian khôi phục trung bình (MTTR) < 30 phút
- Độ trễ xử lý sự kiện p99 < 5 giây

---

### Phụ thuộc
- Kafka
- Redis (lưu trữ idempotency)
- Hệ thống giám sát (Prometheus, Grafana, CloudWatch)
- Hệ thống quản lý nhật ký (ELK, CloudWatch Logs)

---

### Đánh giá tác động
- **Tác động kỹ thuật:** Rất cao - Độ tin cậy cốt lõi
- **Tác động nghiệp vụ:** Rất cao - Đảm bảo tính nhất quán dữ liệu
- **Tác động trải nghiệm:** Thấp - Người dùng không thấy trực tiếp

---

### Chi tiết kỹ thuật

#### Cấu hình thử lại Kafka Consumer

```yaml
kafka:
  consumer:
    retry:
      max-attempts: 3
      backoff:
        initial: 1000ms
        multiplier: 2.0
        max: 30000ms
    dlq:
      enabled: true
      topic-suffix: .dlq
      retention: 14d
```

#### Cấu hình Circuit Breaker

```yaml
resilience4j:
  circuitbreaker:
    instances:
      kafkaProducer:
        failure-rate-threshold: 50
        wait-duration-in-open-state: 60s
        sliding-window-size: 10
        minimum-number-of-calls: 5
```

#### Bảng Outbox

```sql
CREATE TABLE outbox_events (
    id BIGSERIAL PRIMARY KEY,
    event_id UUID UNIQUE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    published_at TIMESTAMP,
    INDEX idx_unpublished (published, created_at)
    WHERE published = FALSE
);
```

#### Bộ thu thập Outbox

```
Mỗi 100ms:
  1. Lấy tối đa 100 sự kiện chưa công bố (published = FALSE)
     ORDER BY created_at ASC
  2. Với mỗi sự kiện:
     - Gửi lên Kafka
     - Nếu thành công:
       - Cập nhật published = TRUE, published_at = NOW()
     - Nếu thất bại:
       - Giữ nguyên, sẽ thử lại lần sau
  3. Cảnh báo nếu có sự kiện cũ hơn 1 giờ
```

#### Lưu trữ Idempotency (Redis)

```
Key: event:{event_id}
Value: {
  "processed_at": "2025-11-26T10:30:00Z",
  "status": "SUCCESS"
}
TTL: 24 giờ
```

---

**Tổng kết nhóm G:**
- ✅ 1 User Story đã hoàn thành
- ✅ Bao phủ toàn bộ xử lý lỗi và đảm bảo độ tin cậy
- ✅ Chi tiết cơ chế thử lại, DLQ, idempotency, circuit breaker
- ✅ Outbox pattern để đảm bảo tính nhất quán
- ✅ Giám sát và cảnh báo
- ✅ Quy trình khôi phục sau sự cố
- ✅ Sử dụng thuật ngữ tiếng Việt cho phần mô tả nghiệp vụ
- ✅ Giữ thuật ngữ kỹ thuật bằng tiếng Anh ở phần chi tiết kỹ thuật
