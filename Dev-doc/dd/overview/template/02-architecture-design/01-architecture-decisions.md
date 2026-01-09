# 2.1 ARCHITECTURE DECISIONS

> **Hướng dẫn**: Document architecture decisions với rationale rõ ràng. Explain WHY chọn architecture này, KHÔNG chỉ mô tả WHAT.

## Kiến trúc chính

**Architecture Style được chọn**: [Domain Driven Design (DDD) / Microservices / Event-Driven Architecture / CQRS / Hexagonal / Clean Architecture / Combination]

## Lý do lựa chọn

| Kiến trúc | Lý do áp dụng |
|-----------|---------------|
| **[Architecture Style 1]** | (1) [Lý do 1 - business requirement nào đòi hỏi]. (2) [Lý do 2 - technical constraint nào]. (3) [Lý do 3 - scale/performance requirement]. (4) [Lý do 4 - team capability or other factors]. |
| **[Architecture Style 2]** | (1) [Lý do 1]. (2) [Lý do 2]. (3) [Lý do 3]. |

---

## Alternatives Considered (Những lựa chọn khác đã xem xét)

> Document các architecture alternatives và lý do KHÔNG chọn

### Alternative 1: [Architecture Name]

**Pros:**
- [Ưu điểm 1]
- [Ưu điểm 2]

**Cons:**
- [Nhược điểm 1 - tại sao không phù hợp với requirements]
- [Nhược điểm 2]

**Verdict**: ❌ KHÔNG chọn vì [lý do chính]

---

## Key Architecture Principles

> Các nguyên tắc kiến trúc quan trọng được follow

1. **[Principle 1]**: [Mô tả và lý do]
   - Implementation: [Cách implement principle này]
---

## Architecture Characteristics

> Non-functional requirements mà architecture phải satisfy

| Characteristic | Requirement | How Architecture Addresses It |
|---------------|-------------|------------------------------|
| **Scalability** | [Requirement] | [Solution] |
| **Performance** | [Requirement] | [Solution] |
| **Reliability** | [Requirement] | [Solution] |
| **Maintainability** | [Requirement] | [Solution] |
| **Security** | [Requirement] | [Solution] |
| **Testability** | [Requirement] | [Solution] |

---

## Architecture Constraints

> Các constraints ảnh hưởng đến architecture decision

### Technical Constraints
- [Constraint 1]: [Mô tả impact]

### Business Constraints
- [Constraint 1]: [Mô tả impact]

### Team Constraints
- [Constraint 1]: [Mô tả impact]

---

## Trade-offs Accepted

> Các trade-offs đã accept khi chọn architecture này

| Trade-off | Why Acceptable |
|-----------|---------------|
| [Trade-off 1] | [Lý do tại sao acceptable trong context này] |

---

## Lưu ý

- Focus vào WHY, không chỉ WHAT
- Justify decisions với business requirements và technical constraints
- Document alternatives để future maintainers hiểu decision context
- Trade-offs phải được acknowledge và accept consciously

# 2.2 DESIGN MODEL DECISIONS

> **Hướng dẫn**: Liệt kê tất cả design patterns sử dụng trong system với mục đích và vị trí áp dụng cụ thể

## Design Patterns Summary

| Design Pattern | Mục đích sử dụng | Vị trí áp dụng |
|----------------|------------------|----------------|
| **[Pattern 1]** | [Mục đích - giải quyết vấn đề gì] | [Service/Layer/Module cụ thể] |
| **[Pattern 2]** | [Mục đích - giải quyết vấn đề gì] | [Service/Layer/Module cụ thể] |

**Tham khảo pattern templates:** Xem folder `06-patterns/` để biết chi tiết implementation của từng pattern

---

## Common Patterns trong DDD/Microservices

> Những patterns thường gặp - xem xét áp dụng

### Domain Layer Patterns
- **Aggregate Pattern**: Đảm bảo consistency boundary
- **Repository Pattern**: Trừu tượng hóa data access
- **Factory Pattern**: Tạo complex domain objects
- **Domain Events**: Event notification pattern
- **Value Objects**: Immutable objects không có identity

### Application Layer Patterns
- **CQRS (Command Query Responsibility Segregation)**: Tách biệt read/write
- **Command Pattern**: Encapsulate requests as objects
- **Saga Pattern**: Điều phối distributed transactions

### Infrastructure Patterns
- **Transactional Outbox Pattern**: Exactly-once event publishing
- **Anti-Corruption Layer**: Bảo vệ domain khỏi external systems
- **Circuit Breaker**: Fault tolerance
- **Retry Pattern**: Transient failure handling

### Cross-cutting Patterns
- **Observer Pattern**: Event-driven notifications
- **Strategy Pattern**: Pluggable algorithms
- **Builder Pattern**: Complex object construction
- **Adapter Pattern**: Interface compatibility

---

## Pattern Implementation Details

### [Pattern Name 1]

**Purpose**: [Tại sao cần pattern này]

**Problem**: [Problem mà pattern giải quyết]

**Solution**: [High-level solution approach]

**When to Use**:
- [Scenario 1]
- [Scenario 2]

**Implementation Location**:
- [Service name]: [Specific classes/modules]

**Reference**: See `06-patterns/[pattern-file].md` for detailed implementation

---

### [Pattern Name 2]

**Purpose**: [Tại sao cần pattern này]

**Problem**: [Problem mà pattern giải quyết]

**Solution**: [High-level solution approach]

**When to Use**:
- [Scenario 1]
- [Scenario 2]

**Implementation Location**:
- [Service name]: [Specific classes/modules]

**Reference**: See `06-patterns/[pattern-file].md` for detailed implementation

---

## Pattern Consistency Guidelines

> Hướng dẫn áp dụng patterns consistently across services

1. **Naming Conventions**:
   - Repository: `[Entity]Repository` interface + `[Entity]RepositoryImpl` implementation
   - Factory: `[Entity]Factory`
   - Domain Service: `[Context]DomainService`
   - Application Service: `[Context]ApplicationService`

2. **Package Structure**:
   - Domain patterns: `domain/[context]/[pattern-type]/`
   - Application patterns: `application/[context]/[pattern-type]/`
   - Infrastructure patterns: `infrastructure/[pattern-type]/`

3. **Pattern Interactions**:
   - [Pattern A] works with [Pattern B] in [scenario]
   - [Pattern C] depends on [Pattern D]

---

## Anti-patterns to Avoid

> Patterns KHÔNG nên sử dụng và lý do

| Anti-pattern | Why Avoid | Alternative |
|-------------|-----------|-------------|
| [Anti-pattern 1] | [Lý do tại sao bad practice] | [Pattern nào nên dùng thay thế] |
| [Anti-pattern 2] | [Lý do tại sao bad practice] | [Pattern nào nên dùng thay thế] |

---

## Lưu ý

- Mỗi pattern phải có mục đích rõ ràng - đừng over-engineer
- Document WHERE pattern được áp dụng cụ thể (service, class, module)
- Link đến pattern implementation templates trong `06-patterns/`
- Consistency across services - cùng pattern thì implement giống nhau
- Anti-patterns phải được avoid - document để team aware

# 2.3 PERMISSION MAPPING

> **Hướng dẫn**: Define đầy đủ permissions theo format của DD-RBAC. Permissions này sẽ được tạo ở EOP và sync sang SaaS.

## Permission Structure

**Permission Format** (2 dạng):

```
{BOUNDED_CONTEXT}:{MODULE}:{ACTION}
{BOUNDED_CONTEXT}:{MODULE}:{SUB_MODULE}:{ACTION}
```

**Components:**
| Component | Description | Examples |
|-----------|-------------|----------|
| BOUNDED_CONTEXT | Hệ thống/domain chính | `LMS`, `SMS`, `TeMS`, `EOP`, `CMS` |
| MODULE | Module chính trong domain | `COURSE`, `CURRICULUM`, `CONTENT`, `TENANT` |
| SUB_MODULE | Sub-module (optional) | `INSTRUCTOR`, `SECTION`, `LECTURE`, `ASSET` |
| ACTION | Hành động thực hiện | `CREATE`, `READ`, `UPDATE`, `DELETE`, `PUBLISH`, `APPROVE` |

**Examples:**
- `LMS:COURSE:CREATE` - Module level: Tạo khóa học
- `LMS:COURSE:INSTRUCTOR:INVITE` - Sub-module level: Mời giảng viên vào khóa học
- `LMS:CURRICULUM:SECTION:CREATE` - Sub-module level: Tạo section trong curriculum
- `LMS:CONTENT:ASSET:UPLOAD` - Sub-module level: Upload tài liệu

---

## Permission Definitions

Liệt kê đầy đủ permissions cho từng module/sub-module:

```yaml
# [MODULE] Permissions - Module level
- permission_code: [CONTEXT]:[MODULE]:CREATE
  permission_name: Tạo [Module]
  description: Cho phép tạo mới [module]
  resource: [module]
  action: CREATE

- permission_code: [CONTEXT]:[MODULE]:READ
  permission_name: Xem [Module]
  description: Cho phép xem danh sách và chi tiết [module]
  resource: [module]
  action: READ

# [MODULE]:[SUB_MODULE] Permissions - Sub-module level
- permission_code: [CONTEXT]:[MODULE]:[SUB_MODULE]:CREATE
  permission_name: Tạo [Sub-module] trong [Module]
  description: Cho phép tạo mới [sub-module] thuộc [module]
  resource: [module]/[sub_module]
  action: CREATE

- permission_code: [CONTEXT]:[MODULE]:[SUB_MODULE]:READ
  permission_name: Xem [Sub-module]
  description: Cho phép xem danh sách và chi tiết [sub-module]
  resource: [module]/[sub_module]
  action: READ
```

---

### Special Permissions (Nếu có)

Nếu có permissions đặc biệt ngoài CRUD:

```yaml
# Special permissions - Module level
- permission_code: [CONTEXT]:[MODULE]:PUBLISH
  permission_name: Xuất bản [Module]
  description: Cho phép xuất bản [module]
  resource: [module]
  action: PUBLISH

# Special permissions - Sub-module level
- permission_code: [CONTEXT]:[MODULE]:[SUB_MODULE]:APPROVE
  permission_name: Phê duyệt [Sub-module]
  description: Cho phép phê duyệt [sub-module] của [module]
  resource: [module]/[sub_module]
  action: APPROVE

- permission_code: [CONTEXT]:[MODULE]:[SUB_MODULE]:INVITE
  permission_name: Mời [Sub-module]
  description: Cho phép mời [sub-module] tham gia [module]
  resource: [module]/[sub_module]
  action: INVITE
```

---

## Permission Hierarchy Example

```
LMS:COURSE                          # Module chính
├── LMS:COURSE:CREATE               # Tạo course
├── LMS:COURSE:READ                 # Xem course
├── LMS:COURSE:UPDATE               # Cập nhật course
├── LMS:COURSE:DELETE               # Xóa course
├── LMS:COURSE:PUBLISH              # Xuất bản course
├── LMS:COURSE:INSTRUCTOR           # Sub-module: Instructor
│   ├── LMS:COURSE:INSTRUCTOR:INVITE    # Mời giảng viên
│   ├── LMS:COURSE:INSTRUCTOR:ACCEPT    # Chấp nhận lời mời
│   └── LMS:COURSE:INSTRUCTOR:REJECT    # Từ chối lời mời
└── LMS:COURSE:CONTENT              # Sub-module: Content
    ├── LMS:COURSE:CONTENT:SUBMIT       # Submit nội dung
    ├── LMS:COURSE:CONTENT:REVIEW       # Review nội dung
    └── LMS:COURSE:CONTENT:APPROVE      # Duyệt nội dung
```

---

## Permission Summary Table

| Module/Sub-module | Permissions | Total |
|-------------------|-------------|-------|
| **[MODULE]** | [CONTEXT]:[MODULE]:CREATE/READ/UPDATE/DELETE | 4 |
| **[MODULE]:[SUB_MODULE_1]** | [CONTEXT]:[MODULE]:[SUB_MODULE_1]:CREATE/READ/UPDATE/DELETE | 4 |
| **[MODULE]:[SUB_MODULE_2]** | [CONTEXT]:[MODULE]:[SUB_MODULE_2]:CREATE/READ | 2 |
| **Total** | | **10** |

---

## Permission Check Points

| Endpoint/Action | Permission Required | Check Location |
|----------------|---------------------|----------------|
| GET /api/v1/[module] | [CONTEXT]:[MODULE]:READ | Controller → Policy Agent |
| POST /api/v1/[module] | [CONTEXT]:[MODULE]:CREATE | Controller → Policy Agent |
| PUT /api/v1/[module]/{id} | [CONTEXT]:[MODULE]:UPDATE | Controller → Policy Agent |
| DELETE /api/v1/[module]/{id} | [CONTEXT]:[MODULE]:DELETE | Controller → Policy Agent |
| POST /api/v1/[module]/{id}/[sub-module] | [CONTEXT]:[MODULE]:[SUB_MODULE]:CREATE | Controller → Policy Agent |
| GET /api/v1/[module]/{id}/[sub-module] | [CONTEXT]:[MODULE]:[SUB_MODULE]:READ | Controller → Policy Agent |

---

## Lưu ý

- **2 Format levels**: Module level `{CONTEXT}:{MODULE}:{ACTION}` và Sub-module level `{CONTEXT}:{MODULE}:{SUB_MODULE}:{ACTION}`
- **Bounded Context**: LMS, SMS, TeMS, EOP, CMS, etc.
- **Module**: COURSE, CURRICULUM, CONTENT, TENANT, etc.
- **Sub-module**: INSTRUCTOR, SECTION, LECTURE, ASSET, etc.
- **Actions**: CREATE, READ, UPDATE, DELETE, PUBLISH, APPROVE, INVITE, SUBMIT, REVIEW, etc.
- Tất cả permissions được define ở **EOP** → sync sang SaaS
- Permission check qua **Policy Agent** trong service
- Sub-module permissions cho phép kiểm soát chi tiết hơn trong phạm vi module
