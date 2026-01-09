# 3.1 API Endpoints

> **Hướng dẫn cho AI**:
> 1. Document các **Request/Response Patterns** chuẩn (copy từ template này)
> 2. Liệt kê **danh sách API theo US** - chỉ cần: Endpoint, Method, Mô tả, **Pattern sử dụng**
> 3. **Entity PHẢI tuân thủ tuyệt đối theo HLD** - không thêm/bớt fields

---

## API URL Pattern Rules

| Operation | Pattern | Example |
|-----------|---------|---------|
| **Create** | `POST /api/v1/{resource}` | `POST /api/v1/cart` |
| **Get by ID** | `GET /api/v1/{resource}/{id}` | `GET /api/v1/cases/{caseId}` |
| **Simple Search** | `GET /api/v1/{resource}/search` | `GET /api/v1/categories/search` |
| **Advance Search** | `POST /api/v1/{resource}/search` | `POST /api/v1/cases/search` |
| **Action với ID** | `POST /api/v1/{resource}/{id}/{action}` | `POST /api/v1/cases/{caseId}/claim` |
| **List subresource** | `GET /api/v1/{resource}/{subresource}/list` | `GET /api/v1/products/featured/list` |

**Rules**:
- Create và Get by ID: **không cần action** ở cuối URL
- Các operations khác: **phải có action** ở cuối URL
- Advance Search (nhiều filter): dùng **POST** với request body
- Simple Search (ít filter): có thể dùng **GET** với query params

---

## Standard Request/Response Patterns

> **QUAN TRỌNG**: Các patterns dưới đây phải được copy vào DD document.
> Mỗi API trong danh sách sẽ reference đến 1 pattern cụ thể.

---

### Pattern 1: CREATE

**Use for**: Tạo resource mới (POST without ID)

**Request Headers**:
```
Authorization: Bearer {jwt_token}
X-Tenant-Id: {tenant_id}
Content-Type: application/json
```

**Request Body**:
```json
{
  "[required_field_1]": "string",
  "[required_field_2]": 123,
  "[optional_field]": "value",
  "[nested_object]": {
    "[nested_field]": "value"
  }
}
```

**Response 201 Created**:
```json
{
  "code": "SUCCESS",
  "messageKey": "Success",
  "messageCode": "Success",
  "messageValue": "Success",
  "timestamp": "2025-12-15T06:47:57.719Z",
  "data": {
    "id": "generated_id",
    "[fields_from_entity]": "...",
    "status": "[INITIAL_STATUS]",
    "createdAt": "2025-12-15T06:47:57.719Z"
  }
}
```

---

### Pattern 2: GET_BY_ID

**Use for**: Lấy chi tiết resource theo ID

**Request Headers**:
```
Authorization: Bearer {jwt_token}
X-Tenant-Id: {tenant_id}
```

**Response 200 OK**:
```json
{
  "code": "SUCCESS",
  "messageKey": "Success",
  "messageCode": "Success",
  "messageValue": "Success",
  "timestamp": "2025-12-15T06:47:57.719Z",
  "data": {
    "id": "resource_id",
    "[all_fields_from_entity]": "...",
    "status": "[STATUS]",
    "createdAt": "2025-12-15T06:47:57.719Z",
    "updatedAt": "2025-12-15T06:47:57.719Z"
  }
}
```

**Response 404 Not Found**:
```json
{
  "code": "NOT_FOUND",
  "messageKey": "[RESOURCE]_NOT_FOUND",
  "messageCode": "[MODULE]-ERR-XXX",
  "messageValue": "Resource not found",
  "timestamp": "2025-12-15T06:47:57.719Z",
  "data": null
}
```

---

### Pattern 3: ADVANCE_SEARCH

**Use for**: Tìm kiếm với nhiều filter phức tạp (POST /search)

**Request Headers**:
```
Authorization: Bearer {jwt_token}
X-Tenant-Id: {tenant_id}
Content-Type: application/json
```

**Request Body**:
```json
{
  "search": "keyword for full-text search",
  "[filter_field_1]": "value",
  "[filter_field_2]": ["ENUM_1", "ENUM_2"],
  "[date_from]": "2025-01-01T00:00:00Z",
  "[date_to]": "2025-12-31T23:59:59Z",
  "page": {
    "page": 0,
    "size": 20,
    "sort": "createdAt",
    "order": "desc"
  }
}
```

**Response 200 OK (Page Response)**:
```json
{
  "code": "SUCCESS",
  "messageKey": "Success",
  "messageCode": "Success",
  "messageValue": "Success",
  "timestamp": "2025-12-15T06:47:57.719Z",
  "data": {
    "hasContent": true,
    "number": 0,
    "size": 20,
    "numberOfElements": 20,
    "first": true,
    "last": false,
    "hasNext": true,
    "hasPrevious": false,
    "totalPages": 8,
    "totalElements": 150,
    "content": [
      {
        "id": "123",
        "[summary_field_1]": "value",
        "[summary_field_2]": "value",
        "status": "ACTIVE"
      }
    ]
  }
}
```

**Note**: `data.content[]` chỉ chứa **summary fields (5-8 fields)**.

---

### Pattern 4: SIMPLE_SEARCH

**Use for**: Tìm kiếm đơn giản với ít filter (GET /search)

**Request**:
```
GET /api/v1/{resource}/search?keyword=abc&status=ACTIVE&page=0&size=20
```

**Response**: Tương tự Pattern 3 (Page Response)

---

### Pattern 5: ACTION

**Use for**: Thực hiện action lên resource (POST /{id}/{action})

**Request Headers**:
```
Authorization: Bearer {jwt_token}
X-Tenant-Id: {tenant_id}
Content-Type: application/json
```

**Request Body** (nếu cần):
```json
{
  "[action_param_1]": "value",
  "[action_param_2]": "value"
}
```

**Response 200 OK**:
```json
{
  "code": "SUCCESS",
  "messageKey": "Success",
  "messageCode": "Success",
  "messageValue": "Success",
  "timestamp": "2025-12-15T06:47:57.719Z",
  "data": {
    "id": "resource_id",
    "status": "[NEW_STATUS]",
    "updatedAt": "2025-12-15T06:47:57.719Z"
  }
}
```

**Response 400 Invalid State**:
```json
{
  "code": "INVALID_STATE",
  "messageKey": "CANNOT_[ACTION]_IN_CURRENT_STATE",
  "messageCode": "[MODULE]-ERR-XXX",
  "messageValue": "Cannot perform [action] when status is [current_status]",
  "timestamp": "2025-12-15T06:47:57.719Z",
  "data": null
}
```

---

### Pattern 6: UPDATE

**Use for**: Cập nhật resource (PUT hoặc POST /{id}/update)

**Request Body** (chỉ fields cần update):
```json
{
  "[field_to_update_1]": "new_value",
  "[field_to_update_2]": 456
}
```

**Response 200 OK**:
```json
{
  "code": "SUCCESS",
  "messageKey": "Success",
  "messageCode": "Success",
  "messageValue": "Success",
  "timestamp": "2025-12-15T06:47:57.719Z",
  "data": {
    "id": "resource_id",
    "[updated_fields]": "...",
    "updatedAt": "2025-12-15T06:47:57.719Z"
  }
}
```

---

### Pattern 7: DELETE

**Use for**: Xóa resource (POST /{id}/remove hoặc DELETE)

**Response 200 OK**:
```json
{
  "code": "SUCCESS",
  "messageKey": "Success",
  "messageCode": "Success",
  "messageValue": "Success",
  "timestamp": "2025-12-15T06:47:57.719Z",
  "data": {
    "id": "resource_id",
    "deleted": true
  }
}
```

---

### Pattern 8: LIST_SUBRESOURCE

**Use for**: Lấy danh sách subresource (GET /{subresource}/list)

**Request**:
```
GET /api/v1/{resource}/{subresource}/list?page=0&size=20
```

**Response**: Tương tự Pattern 3 (Page Response)

---

## Standard Error Response

```json
{
  "code": "[ERROR_CODE]",
  "messageKey": "[ERROR_KEY]",
  "messageCode": "[MODULE]-ERR-[NUMBER]",
  "messageValue": "[Human readable message]",
  "timestamp": "2025-12-15T06:47:57.719Z",
  "data": null,
  "errors": [
    {
      "field": "[field_name]",
      "message": "[Validation message]"
    }
  ]
}
```

**HTTP Status Codes**:

| Code | Usage |
|------|-------|
| 200 | Success (GET, PUT, Action) |
| 201 | Created (POST create) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (no permission) |
| 404 | Not Found |
| 409 | Conflict (duplicate resource) |
| 500 | Internal Server Error |

---

## API List by US

> **Hướng dẫn cho AI**:
> - Liệt kê tất cả API theo từng US
> - Mỗi API chỉ cần: Method, Endpoint, Mô tả ngắn, **Pattern** (1-8)
> - KHÔNG cần chi tiết request/response cho từng API (đã có ở trên)

### [US-XXX-001]: [Tên US]

**Service**: `[service-name]`

| # | Method | Endpoint | Mô tả | Pattern |
|---|--------|----------|-------|---------|
| 1.1 | POST | `/api/v1/[resource]` | [Mô tả] | CREATE |
| 1.2 | GET | `/api/v1/[resource]/{id}` | [Mô tả] | GET_BY_ID |
| 1.3 | POST | `/api/v1/[resource]/search` | [Mô tả] | ADVANCE_SEARCH |
| 1.4 | POST | `/api/v1/[resource]/{id}/[action]` | [Mô tả] | ACTION |

**Business Rules**:
- [Rule 1 từ US]
- [Rule 2 từ US]

---

### [US-XXX-002]: [Tên US]

**Service**: `[service-name]`

| # | Method | Endpoint | Mô tả | Pattern |
|---|--------|----------|-------|---------|
| 2.1 | GET | `/api/v1/[resource]/[subresource]/list` | [Mô tả] | LIST_SUBRESOURCE |
| 2.2 | POST | `/api/v1/[resource]/{id}/update` | [Mô tả] | UPDATE |
| 2.3 | POST | `/api/v1/[resource]/{id}/remove` | [Mô tả] | DELETE |

**Business Rules**:
- [Rule từ US]

---

## Entity Guidelines

> **QUAN TRỌNG**: Entity PHẢI tuân thủ tuyệt đối theo HLD

### Rules:
1. **KHÔNG thêm fields** không có trong HLD
2. **KHÔNG bớt fields** đã định nghĩa trong HLD
3. **KHÔNG đổi tên** fields so với HLD
4. **KHÔNG đổi data type** so với HLD
5. Nếu cần thay đổi → **CẬP NHẬT HLD TRƯỚC**

### Entity Reference:
- Xem định nghĩa entity tại: `hld/output/[module]/HLD-[MODULE].md` → Section "Mô hình dữ liệu"

---

## Security

### Standard Headers

| Header | Required | Mô tả |
|--------|----------|-------|
| `Authorization` | Yes | Bearer {jwt_token} |
| `X-Tenant-Id` | Yes (except auth APIs) | Tenant isolation |
| `Content-Type` | Yes (for POST/PUT) | application/json |

### Tenant Isolation

**CRITICAL**: Mọi query PHẢI filter theo `tenant_id`

---

## Checklist cho AI

- [ ] Copy 8 patterns vào DD document
- [ ] Liệt kê API theo từng US với cột Pattern
- [ ] Ghi Business Rules từ US
- [ ] Kiểm tra Entity đúng với HLD
- [ ] Không chi tiết request/response cho từng API

