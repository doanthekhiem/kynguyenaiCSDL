# Templates Guide

> Chi tiết về cách sử dụng từng template trong project này.

---

## Mục lục

- [HLD Templates](#hld-templates)
- [DD Templates](#dd-templates)
- [US Templates](#us-templates)
- [Prompt Templates](#prompt-templates)
- [Coding Rules Templates](#coding-rules-templates)

---

## HLD Templates

### Location
[`hld/overview/template/`](hld/overview/template/)

### Master Template
[`00-master-hld-template.md`](hld/overview/template/00-master-hld-template.md)

### 8 Sections Overview

| Section | Bắt buộc | Template Folder | Mục đích |
|---------|---------|----------------|----------|
| 1. Context | ✅ Yes | `01-context/` | Business context, system context, actors, scope |
| 2. Diagrams | ✅ Yes | `02-diagrams/` | Context diagram (Mermaid) |
| 3. Workflows | ✅ Yes | `03-workflows/` | Sequence diagrams, activity diagrams |
| 4. State Machine | ✅ Yes | `04-state-machine/` | State diagrams, transition tables |
| 5. Data Model | ✅ Yes | `05-data-model/` | ERD, table definitions |
| 6. Events | ⚠️ Optional | `06-event-architecture/` | Event catalog, schemas (if event-driven) |
| 7. Orchestration | ⚠️ Optional | `07-workflow-orchestration/` | Temporal workflows (if using) |
| 8. Appendix | ✅ Recommended | `08-appendix/` | Glossary, assumptions, open questions |

### Khi nào dùng section nào?

**Section 1-5: Luôn luôn dùng**
- Cung cấp đầy đủ context, workflows, data model

**Section 6: Dùng khi**
- ✅ Event-driven architecture
- ✅ Microservices với messaging (Kafka, RabbitMQ)
- ✅ Async communication giữa services
- ❌ Monolithic apps với sync calls only

**Section 7: Dùng khi**
- ✅ Long-running workflows (days/weeks)
- ✅ Sử dụng Temporal/Cadence
- ✅ Complex saga patterns
- ❌ Simple CRUD operations

**Section 8: Luôn nên có**
- Glossary giúp onboard new members
- Assumptions document design decisions
- Open questions track TODOs

### Placeholders Chính

| Placeholder | Example | Mô tả |
|------------|---------|-------|
| `[TÊN_HỆ_THỐNG]` | User Management System | Tên module/system |
| `[ACTOR_NAME]` | User, Admin, System | Actors trong system |
| `[SERVICE_NAME]` | user-service, auth-service | Microservice names |
| `[TABLE_NAME]` | users, sessions, roles | Database tables |
| `[EVENT_NAME]` | UserCreatedEvent | Event names |
| `[WORKFLOW_NAME]` | UserRegistrationWorkflow | Workflow names |

### Example HLD

Xem [examples/hld/HLD-GRADING-EXAMPLE.md](examples/hld/HLD-GRADING-EXAMPLE.md) (6291 lines) để tham khảo HLD hoàn chỉnh.

**Highlights**:
- Full 8 sections
- Complex multi-role workflows
- State machine với 10+ states
- ERD với relationships
- Event catalog

---

## DD Templates

### Location
[`dd/overview/template/`](dd/overview/template/)

### Template Index
[`00-TEMPLATE-INDEX.md`](dd/overview/template/00-TEMPLATE-INDEX.md)

### 6 Sections Component-Based

| Section | Template File | Token Est. | Mục đích |
|---------|--------------|-----------|----------|
| 1. HLD Keypoints | `01-hld-keypoints/01-business-context.md` | ~1.5K | Business context, actors, multi-tenant |
| 2. Architecture | `02-architecture-design/01-architecture-decisions.md` | ~2K | Architecture decisions, design patterns |
| 3. Source Code | `03-source-code/01-api-endpoints.md` | ~3K | **API endpoints table**, code structure, aggregates |
| 4. Workflows | `04-workflows/01-workflow-diagrams.md` | ~1.5K | Sequence diagrams, activity diagrams |
| 5. Events | `05-events/01-event-catalog.md` | ~1.5K | Event catalog, Kafka topics, cache |
| 6. Patterns | `06-patterns/01-pattern.md` | ~500 | Design patterns reference |

**Total**: ~10K tokens (optimized từ 14K)

### Key Principles

#### 1. Component-Based Approach

✅ **DO**: Assemble components theo cần thiết

```markdown
# DD-MY-MODULE.md

## 1. HIGH-LEVEL DESIGN KEYPOINTS
[Include: 01-hld-keypoints/01-business-context.md]

## 2. ARCHITECTURE & DESIGN DECISIONS
[Include: 02-architecture-design/01-architecture-decisions.md]

## 3. SOURCE CODE
[Include: 03-source-code/01-api-endpoints.md]

...
```

❌ **DON'T**: Copy-paste toàn bộ vào 1 file monolithic

#### 2. Focus on Control Logic, Not Implementation

✅ **DO**: Describe what to do, not how to code

```markdown
### API: POST /api/v1/orders

**Business Logic**:
1. Validate user has sufficient balance
2. Check product availability
3. Calculate total with taxes
4. Create order record
5. Publish OrderCreatedEvent
6. Return order ID
```

❌ **DON'T**: Write full code trong DD

```java
// WRONG - Don't include full code in DD
public class OrderService {
    public Long createOrder(OrderRequest req) {
        // 50 lines of code...
    }
}
```

#### 3. Cross-Reference Instead of Duplicate

✅ **DO**: Link to coding rules cho implementation details

```markdown
For implementation details, see:
- Exception handling: coding-rules.mdc Section 6
- API patterns: coding-rules.mdc Section 3
- Testing: coding-rules.mdc Section 9
```

#### 4. Multi-tenant via Business Contexts

✅ **DO**: Describe business contexts và access patterns

```markdown
## Business Contexts

| Context | Tenant Type | Access | Actions |
|---------|------------|--------|---------|
| School manages PIM | PRIVATE_SCHOOL | Full write | Create, Publish, Approve |
| Teacher views PIM | INDIVIDUAL | Read-only | View, Register |

Cross-context: Via Kafka events
```

❌ **DON'T**: Describe folder structure

```markdown
// WRONG
domain/
├── ind/  # Individual context
└── ps/   # Private School context
```

### Section 3: API Endpoints (Most Important!)

**Format chuẩn**:

| API | Method | Operation | Business Logic | Request | Response | Notes |
|-----|--------|-----------|----------------|---------|----------|-------|
| `/api/v1/orders` | POST | `createOrder` | 1. Validate user<br>2. Check inventory<br>3. Create order<br>4. Publish event | `CreateOrderRequest` | `OrderResponse` | Returns order ID |
| `/api/v1/orders/{id}` | GET | `getOrderById` | 1. Find order<br>2. Check ownership<br>3. Return details | - | `OrderResponse` | 404 if not found |

**Tại sao quan trọng?**
- Developers biết exactly phải implement gì
- Clear task breakdown
- Easy để estimate effort
- Foundation cho code generation

### Example DD

Xem [examples/dd/DD-SIS-EXAMPLE.md](examples/dd/DD-SIS-EXAMPLE.md) (6435 lines) để tham khảo DD hoàn chỉnh.

**Highlights**:
- 50+ API endpoints với business logic
- Multi-tenant handling
- DDD aggregates
- Event catalog
- Cache strategy

---

## US Templates

### Location
[`us/overview.md`](us/overview.md)

### Format Chuẩn

```markdown
# US-[MODULE]-[NUMBER]-[Description]

## User Story
As a [ROLE], I want to [ACTION] so that [BENEFIT].

## Acceptance Criteria

### Scenario 1: [Happy path]
Given [PRECONDITION]
When [ACTION]
Then [EXPECTED RESULT]

### Scenario 2: [Edge case]
Given [PRECONDITION]
When [ACTION]
Then [EXPECTED RESULT]

### Scenario 3: [Error case]
Given [PRECONDITION]
When [ACTION]
Then [EXPECTED ERROR]

## Business Rules
1. [RULE_1]
2. [RULE_2]

## UI/UX Notes
- [NOTE_1]
- [NOTE_2]

## API References (optional)
- POST /api/v1/[resource]
- GET /api/v1/[resource]/{id}
```

### Naming Convention

**Format**: `US-[MODULE]-[NUMBER]-[Description].md`

**Examples**:
- `US-AUTH-001-Login-Email-SaaS.md`
- `US-USER-002-Register-Account.md`
- `US-ORDER-015-Cancel-Order.md`

**Numbering**:
- Start from 001
- Increment sequentially
- Don't reuse numbers

### Given-When-Then

**Given**: Preconditions (state trước action)
```
Given I am logged in as Admin
Given the cart contains 3 items
Given the product is in stock
```

**When**: Action (user action hoặc system event)
```
When I click "Checkout" button
When I enter valid credit card info
When payment is processed successfully
```

**Then**: Expected result (state sau action)
```
Then the order is created
And I receive confirmation email
And the cart is cleared
And I am redirected to order details page
```

### Business Rules

**Format**: Numbered list, clear statements

```markdown
## Business Rules
1. Email must be unique in the system
2. Password minimum 8 characters, must contain uppercase, lowercase, number
3. Account locked after 5 failed login attempts
4. Account auto-unlocked after 30 minutes
5. Session expires after 30 minutes of inactivity
```

### Common Business Rules

Location: [`us/common/`](us/common/)

**Files**:
- `System Rules-Business rules.md` - General rules
- `UI Message - Common Business Rules.md` - Message keys, i18n

**Usage**: Reference trong individual US

```markdown
## Business Rules
1. [Rule specific to this US]
2. [Rule specific to this US]
3. For common rules, see: us/common/System Rules-Business rules.md
```

### Example US

Xem [examples/us/US-EXAMPLE-AUTH-001.md](examples/us/US-EXAMPLE-AUTH-001.md) để tham khảo format chuẩn.

---

## Prompt Templates

### Location
[`dd/templates/PROMPT-TEMPLATES-HLD-US-DD.md`](dd/templates/PROMPT-TEMPLATES-HLD-US-DD.md)

### 6-Phase Workflow

**Purpose**: Systematic approach từ HLD + US → DD

| Phase | Input | Output | Duration |
|-------|-------|--------|----------|
| 1. Đọc Context | HLD + all US files | Context loaded | 5 min |
| 2. So sánh | HLD vs US | Discrepancies list | 10 min |
| 3. Document | Discrepancies list | HLD-US-DISCREPANCIES.md | 5 min |
| 4. Break Tasks | US + Discrepancies | API-TASK-LIST.md | 15 min |
| 5. Phân chia | API Task List | Development streams | 10 min |
| 6. Clarify | Open questions | Clarified requirements | 5 min |

**Total**: ~50 minutes cho 1 module

### Phase 1: Đọc và Nạp Context

**Prompt**:
```
Đọc HLD @hld/output/[project]/HLD-[MODULE].md
Đọc tất cả US trong @us/input/[module]/

Sau đó tôi sẽ đưa ra yêu cầu tiếp theo.
```

**AI response**: Confirms context loaded

### Phase 2: So sánh HLD vs US

**Prompt**:
```
Giờ phân tích:
- HLD là thiết kế rộng, bao quát cho tương lai
- US là MVP1, scope hẹp hơn, chi tiết hơn

Phát hiện những điểm lệch:
1. Những gì US có mà HLD chưa có/chưa chi tiết
2. Những gì HLD có nhưng US không cover (out of scope MVP1)
3. Những thông số nghiệp vụ cụ thể trong US mà HLD chưa định nghĩa

Nếu có thắc mắc thì hỏi.
```

### Phase 3: Tạo Discrepancies File

**Prompt**:
```
Hãy note các điểm lệch ra file dd/[module]/HLD-US-DISCREPANCIES.md với:

1. Bảng so sánh HLD vs US cho từng điểm lệch
2. Quyết định giữ theo HLD hay US
3. Action Required cho từng điểm
4. Các thông số nghiệp vụ đã confirm
5. Summary: Items cần implement trong MVP1
```

### Phase 4: Tạo API Task List

**Prompt**:
```
Dựa vào danh sách US, hãy break danh sách task BE (API endpoints) theo từng US.

Yêu cầu:
1. Liệt kê từng API endpoint
2. Method (GET/POST/PUT/DELETE)
3. Operation ID (tên function)
4. Mô tả ngắn business logic
5. Notes về business rules
6. Cross-service dependencies

Tuân thủ API URL convention trong coding rules.
```

### Phase 5: Phân chia Development Streams

**Prompt**:
```
Thêm phần: danh sách luồng độc lập.

1 dev BE sẽ code full 1 luồng độc lập, hoặc 2 dev trên 1 luồng có thể chạy song song.

Yêu cầu:
1. Diagram tổng quan các streams
2. Bảng phân công (Stream, Service, APIs, Dependencies)
3. Điểm nối (Integration Points)
4. Gợi ý phân công (3, 4, 6 devs options)
```

### Phase 6: Clarify Questions

**Prompt examples**:
```
{Feature} có cần implement trong MVP1 không?
```

```
{Aspect} trong US là {value-in-us}, trong HLD là {value-in-hld}.
Giữ theo bên nào?
```

```
US có đề cập {role} với permissions: {list}.
HLD chưa có định nghĩa role này. Cần bổ sung RBAC vào HLD?
```

---

## Coding Rules Templates

### Generic Template

[`CODING-RULES-TEMPLATE.mdc`](CODING-RULES-TEMPLATE.mdc)

**19 Sections**:
1. Project Overview
2. Semantic Naming Rules
3. API Design Rules
4. Code Structure & Architecture
5. Database & ORM Rules
6. Exception Handling & Validation
7. Service Layer Rules
8. Documentation & Comments
9. Testing Rules
10. Security Rules
11. Logging Rules
12. Performance & Optimization
13. Code Style & Formatting
14. Version Control Rules
15. Multi-tenant Support
16. Event-Driven Architecture
17. CI/CD & Deployment
18. Checklist for Code Review
19. AI Assistant Guidelines

**Placeholders**:
- `[PROJECT_NAME]`
- `[LANGUAGE]` - Java, TypeScript, Python, etc.
- `[FRAMEWORK]` - Spring Boot, NestJS, Django, etc.
- `[BUILD_TOOL]` - Gradle, npm, Maven, pip, etc.
- `[ORM_FRAMEWORK]` - JPA, TypeORM, SQLAlchemy, etc.
- `[DATABASE]` - PostgreSQL, MySQL, MongoDB, etc.

### Tech-Specific Examples

**Java/Spring Boot**: [`examples/coding-rules/CODING-RULES-JAVA-SPRING-BOOT.mdc`](examples/coding-rules/CODING-RULES-JAVA-SPRING-BOOT.mdc)

**NodeJS/NestJS**: [`examples/coding-rules/CODING-RULES-NODEJS-NESTJS.mdc`](examples/coding-rules/CODING-RULES-NODEJS-NESTJS.mdc)

**Frontend/NextJS**: [`examples/coding-rules/CODING-RULES-FRONTEND-NEXTJS.mdc`](examples/coding-rules/CODING-RULES-FRONTEND-NEXTJS.mdc)

### Customization Guide

**Step 1**: Copy template
```bash
cp CODING-RULES-TEMPLATE.mdc ./my-coding-rules.mdc
```

**Step 2**: Replace placeholders
```bash
# Use find-and-replace in editor
[PROJECT_NAME] → My Awesome Project
[LANGUAGE] → Python
[FRAMEWORK] → Django
[BUILD_TOOL] → pip
[ORM_FRAMEWORK] → Django ORM
[DATABASE] → PostgreSQL
```

**Step 3**: Add tech-specific sections
```markdown
## 20. Django-Specific Rules

### 20.1 Settings Management
...

### 20.2 Migrations
...
```

**Step 4**: Remove irrelevant sections
```markdown
# If not using multi-tenant, remove:
## 15. Multi-tenant Support ❌ DELETE

# If not using events, remove:
## 16. Event-Driven Architecture ❌ DELETE
```

---

## Best Practices

### Template Usage

✅ **DO**:
- Start with templates, không viết from scratch
- Copy-paste-modify approach
- Reference examples khi stuck
- Iterate: Fill section-by-section

❌ **DON'T**:
- Bỏ qua templates và tự viết
- Copy examples mà không customize
- Fill tất cả placeholders cùng lúc (overwhelm)

### AI Workflow

✅ **DO**:
- Provide template + example + context
- Break tasks into phases
- Validate AI output với examples
- Iterate and refine

❌ **DON'T**:
- Expect perfect output first try
- Skip validation
- Không provide enough context

### Version Control

✅ **DO**:
- Commit docs cùng với code
- Use meaningful commit messages
- Tag releases
- Link docs to code (via comments, links)

❌ **DON'T**:
- Commit docs sau khi code đã deploy
- Forget to update docs when code changes

---

## Troubleshooting

### Template không match use case

**Solution**: Customize! Templates là starting point, không phải rigid rules.

### AI không hiểu template

**Solution**:
1. Provide example: `@examples/dd/DD-SIS-EXAMPLE.md`
2. Reference template index: `@dd/overview/template/00-TEMPLATE-INDEX.md`
3. Break request thành smaller chunks

### Quá nhiều placeholders

**Solution**: Use find-and-replace:
```bash
# VS Code: Ctrl+Shift+H (Replace in Files)
# Regex: \[([A-Z_]+)\]
```

---

**Last Updated**: 2026-01-09
**Version**: 2.0
