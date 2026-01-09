# Prompt Templates: HLD → US → DD Workflow

> **Mục đích**: Các prompt mẫu để tái sử dụng khi làm việc với HLD và US mới, tạo ra DD (Detailed Design) và API Task List.
>
> **Workflow tổng quan**:
> 1. Đọc và hiểu HLD + US
> 2. Phát hiện điểm lệch HLD vs US
> 3. Tạo file ghi nhận điểm lệch
> 4. Tạo API Task List
> 5. Phân chia luồng độc lập cho dev

---

## Phase 1: Đọc và Nạp Context

### Prompt 1.1: Đọc HLD và US files

```
Đọc HLD @{path-to-hld-file} và các US trong @{path-to-us-folder} sau đó tôi sẽ đưa ra yêu cầu.
```

**Ví dụ:**
```
Đọc HLD @hld/output/HLD-SMS-ONLINE-STORE.md và US trong @us/input/onlinestore sau đó tôi sẽ đưa ra yêu cầu.
```

---

## Phase 2: So sánh HLD vs US

### Prompt 2.1: Phát hiện điểm lệch

```
Giờ đọc từng phần đi:
- HLD là thiết kế rộng, bao quát cho tương lai
- US là MVP1, scope hẹp hơn, chi tiết hơn

Bạn cần phát hiện những điểm lệch nhau giữa HLD và US:
1. Những gì US có mà HLD chưa có/chưa chi tiết
2. Những gì HLD có nhưng US không cover (out of scope MVP1)
3. Những thông số nghiệp vụ cụ thể trong US mà HLD chưa định nghĩa

Nếu có thắc mắc thì hỏi.
```

### Prompt 2.2: So sánh HLD con với US tương ứng

```
Phần {section-number}. {section-name} đọc thêm HLD @{path-to-sub-hld} và xem có cần bổ sung hoặc có sai lệch gì so với US không.
```

**Ví dụ:**
```
Phần 6. Cases Management Cross-Reference đọc thêm HLD @hld/output/onlinestore/HLD-SF-BPM-CASES.md và xem có cần bổ sung hoặc có sai lệch gì so với US không.
```

---

## Phase 3: Tạo File Discrepancies

### Prompt 3.1: Tạo file ghi nhận điểm lệch

```
Bạn hãy note các điểm lệch ra một file trong {output-folder} để phục vụ gen DD sau này.

File cần bao gồm:
1. Bảng so sánh HLD vs US cho từng điểm lệch
2. Quyết định giữ theo HLD hay US
3. Action Required cho từng điểm
4. Các thông số nghiệp vụ đã confirm
5. Summary: Items cần implement trong MVP1
```

**Ví dụ:**
```
Bạn hãy note các điểm lệch ra một file trong dd/onlinestore để phục vụ gen DD sau này.
```

### Prompt 3.2: Bổ sung chi tiết so sánh

```
Bổ sung vào file, thêm section chi tiết so sánh {hld-name} vs {us-name}:
- Các điểm KHỚP (Confirmed Match)
- Các điểm LỆCH cần xử lý (với Impact level)
- PENDING items cần clarify
```

---

## Phase 4: Tạo API Task List

### Prompt 4.1: Break danh sách API theo US

```
Giờ thì, dựa vào danh sách US, hãy break danh sách task BE (đầu API, không cần request, response) theo từng US.

Yêu cầu:
1. Liệt kê từng API endpoint
2. Ghi chú Method (GET/POST/PUT/DELETE)
3. Operation ID (tên function)
4. Mô tả ngắn
5. Notes về business rules
6. Cross-service dependencies
```

### Prompt 4.2: Áp dụng API URL Convention

```
Các API tuân theo convention:
- Create và Get by ID: không cần action suffix
- Các API còn lại đều phải có action ở cuối

Sửa xong thì bổ sung vào rule file luôn.
```

### Prompt 4.3: Phân biệt Simple vs Advance Search

```
Advance Search thì sẽ phải là POST vì request được truyền trong body.
Simple Search (ít filter) có thể dùng GET với query params.
```

---

## Phase 5: Phân chia luồng độc lập

### Prompt 5.1: Tạo parallel development streams

```
Thêm một phần nữa: danh sách màn hình theo luồng độc lập.

Nghĩa là 1 dev BE sẽ code full 1 luồng độc lập mà không ảnh hưởng đến dev khác, hoặc 2 dev trên 1 luồng có thể chạy song song và khi hoàn thành thì ghép với nhau.

Yêu cầu:
1. Diagram tổng quan các streams
2. Bảng phân công chi tiết (Stream, Service, APIs, Dependencies)
3. Điểm nối (Integration Points)
4. Gợi ý phân công nhân sự (3, 4, 6 devs options)
5. Timeline đề xuất
```

---

## Phase 6: Clarify Questions

### Prompt 6.1: Hỏi về scope MVP1

```
{Feature-name} có cần implement trong MVP1 không?
- Nếu có: cần define chi tiết (format, rules, etc.)
- Nếu không: đánh dấu out of scope, move to backlog
```

### Prompt 6.2: Hỏi về business rules

```
{Aspect} trong US là {value-in-us}, trong HLD là {value-in-hld}.
Giữ theo bên nào? Hay cần confirm lại với business?
```

### Prompt 6.3: Hỏi về RBAC/Permissions

```
US có đề cập {role-name} với permissions: {list-permissions}.
HLD chưa có định nghĩa role này. Cần:
1. Bổ sung RBAC vào HLD?
2. Define permissions matrix?
3. Có cần trong MVP1 không?
```

---

## Quick Reference: Câu trả lời mẫu

### Khi được hỏi về điểm lệch:

```
Giữ nguyên theo US. Note điểm lệch vào file discrepancies.
```

```
Giữ theo HLD. US cần được update để align.
```

```
Cái này là UI only, chưa có tính năng BE trong MVP1.
```

```
Out of scope cho MVP1. Move to backlog.
```

### Khi được hỏi về API convention:

```
Các API trừ Create và Get by ID sẽ chỉ cần /{id}.
Các API còn lại đều phải có action ở cuối.
```

```
Advance Search dùng POST với request body.
Simple Search dùng GET với query params.
```

---

## Output Files Structure

```
dd/{module}/
├── HLD-US-DISCREPANCIES.md      # Điểm lệch HLD vs US
├── API-TASK-LIST.md              # Danh sách API theo US
└── templates/
    └── PROMPT-TEMPLATES-HLD-US-DD.md  # File này
```

---

## Checklist: Workflow hoàn chỉnh

- [ ] **Phase 1**: Đọc HLD và tất cả US files
- [ ] **Phase 2**: So sánh, phát hiện điểm lệch
- [ ] **Phase 3**: Tạo file HLD-US-DISCREPANCIES.md
- [ ] **Phase 4**: Tạo API-TASK-LIST.md với convention chuẩn
- [ ] **Phase 5**: Phân chia luồng độc lập cho dev team
- [ ] **Phase 6**: Clarify các PENDING items với business

---

## API URL Pattern Quick Reference

| Operation | Pattern | Example |
|-----------|---------|---------|
| **Create** | `POST /api/v1/{resource}` | `POST /api/v1/cart` |
| **Get by ID** | `GET /api/v1/{resource}/{id}` | `GET /api/v1/cases/{caseId}` |
| **Simple Search** | `GET /api/v1/{resource}/search` | `GET /api/v1/categories/search` |
| **Advance Search** | `POST /api/v1/{resource}/search` | `POST /api/v1/cases/search` |
| **Action với ID** | `POST /api/v1/{resource}/{id}/{action}` | `POST /api/v1/cases/{caseId}/claim` |
| **Action + subresource** | `POST /api/v1/{resource}/{id}/{sub}/{action}` | `POST /api/v1/cart/{id}/quantity/update` |
| **Action không ID** | `POST /api/v1/{resource}/{sub}/{action}` | `POST /api/v1/wishlist/items/to-cart` |
| **List subresource** | `GET /api/v1/{resource}/{sub}/list` | `GET /api/v1/products/featured/list` |

---

*Template created: 2025-12-29*
*Based on: Online Store MVP1 HLD/US analysis workflow*
