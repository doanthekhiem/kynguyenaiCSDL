# 1.1 Bối cảnh kinh doanh (Business Context)

> **Hướng dẫn**: Mô tả business context, hệ sinh thái, subscription plans/customer segments, và mô hình hợp tác/vận hành chính

## Tổng quan hệ thống

- **[SYSTEM_NAME]** được triển khai dưới dạng [SaaS/On-premise/Hybrid]
- [Mô tả ngắn gọn về hệ sinh thái và vị trí của system trong ecosystem]
- [Mô tả mục đích chính và value proposition]

## Các Plans / Customer Segments

> Liệt kê các gói dịch vụ hoặc phân khúc khách hàng

| Plan / Segment | Đối tượng | Mô tả |
|----------------|-----------|-------|
| **[PLAN_1]** | [Target customer] | [Mô tả ngắn gọn về plan/segment này] |
| **[PLAN_2]** | [Target customer] | [Mô tả ngắn gọn về plan/segment này] |

## Business Contexts

> **Quan trọng**: Mô tả cách các tenant types khác nhau sử dụng cùng một domain trong các ngữ cảnh nghiệp vụ khác nhau.
> KHÔNG mô tả folder structure (`domain/ind/`, `domain/ps/`) - đó là implementation detail.

| Business Context | Tenant Type | Domain Access Pattern | Key Actions |
|-----------------|-------------|----------------------|-------------|
| **[CONTEXT_1]** | [TENANT_TYPE] | [READ/WRITE/BOTH] | - [ACTION_1]<br>- [ACTION_2]<br>- [ACTION_3] |
| **[CONTEXT_2]** | [TENANT_TYPE] | [READ/WRITE/BOTH] | - [ACTION_1]<br>- [ACTION_2] |

**Cross-Context Communication**:
- Communication giữa contexts xảy ra qua Kafka events (see Section 5: Events)
- Mỗi context có thể publish và consume events khác nhau
- Example: Context 1 publishes `[Event]Event` → Context 2 consumes và processes

## Mô hình hợp tác / Vận hành

> Mô tả quy trình vận hành chính (high-level workflow)

**Các bước chính:**

1. **[Bước 1]**: [Mô tả chi tiết - WHO does WHAT in WHICH context]
   - Actor: [ACTOR_NAME] (Context: [CONTEXT])
   - Action: [ACTION_DESCRIPTION]
   - Result: [OUTCOME]

2. **[Bước 2]**: [Mô tả chi tiết]
   - Actor: [ACTOR_NAME] (Context: [CONTEXT])
   - Action: [ACTION_DESCRIPTION]
   - Result: [OUTCOME]

---

## Lưu ý quan trọng

- Tập trung vào **tại sao** (why) cần tính năng này, không chỉ **cái gì** (what)
- Làm rõ value proposition cho từng customer segment
- Nêu rõ pain points mà system giải quyết
- Mô tả business workflow level cao (chi tiết hơn sẽ có ở Section 4: Workflows)

# 1.2 Các thành phần hệ thống

> **Hướng dẫn**: Document tất cả components bao gồm Web/Mobile apps, GraphQL BFF layers, và Backend Microservices

## 1.2.1 Web/Mobile Applications

> Frontend applications và các technology stack

| Layer | Component | Technology | Mô tả |
|-------|-----------|------------|-------|
| WEB | [web-app-1] | [ReactJS/VueJS/Angular] | [Mô tả web app cho actor nào] |
| MOBILE | [mobile-app] | [React Native/Flutter] | [Mô tả mobile app] |

## 1.2.2 GraphQL BFF Layer (Backend-for-Frontend)

> GraphQL services làm BFF cho frontend apps

| Layer | Component | Technology | Mô tả |
|-------|-----------|------------|-------|
| GRAPHQL | [bff-graph-1] | [Apollo GraphQL/GraphQL Yoga] | BFF cho [web-app-1] và [Backend Services] |
| GRAPHQL | [bff-graph-2] | [Apollo GraphQL/GraphQL Yoga] | BFF cho [web-app-2] và [Backend Services] |

## 1.2.3 Backend Microservices

> Core microservices theo domain/subdomain

### [DOMAIN_1] Microservices

| Service | Technology | Vai trò trong system |
|---------|------------|---------------------|
| **[service-1]** | [Java/Spring Boot, NodeJS, Go, Python] | [Core service - mô tả vai trò chính] |
| **[service-2]** | [Java/Spring Boot, NodeJS, Go, Python] | [Mô tả vai trò] |

### [DOMAIN_2] Microservices

| Service | Technology | Vai trò trong system |
|---------|------------|---------------------|
| **[service-4]** | [Java/Spring Boot, NodeJS, Go, Python] | [Mô tả vai trò] |

### Shared Services

| Service | Technology | Vai trò trong system |
|---------|------------|---------------------|
| **[notification-service]** | [Technology] | Quản lý notifications cross-domain |
| **[worker-service]** | [Technology] | Temporal workflow orchestration |

---

## Component Architecture Diagram (Optional)

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                           │
│  [web-app-1]    [web-app-2]    [mobile-app]                │
└──────────┬──────────┬──────────┬───────────────────────────┘
           │          │          │
           ▼          ▼          ▼
┌─────────────────────────────────────────────────────────────┐
│                   GRAPHQL BFF LAYER                          │
│  [bff-graph-1]         [bff-graph-2]                        │
└──────────┬──────────────────┬───────────────────────────────┘
           │                  │
           ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND MICROSERVICES                       │
│                                                              │
│  [DOMAIN_1]          [DOMAIN_2]         [SHARED]           │
│  - service-1         - service-4        - notification      │
│  - service-2         - service-5        - worker            │
│  - service-3                                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Lưu ý

- List đầy đủ tất cả services liên quan đến feature này
- Specify technology stack cho mỗi service
- Mô tả vai trò rõ ràng - service này làm gì trong system
- Group services theo domain/subdomain để dễ quản lý

# 1.3 Workflow tổng quan

> **Hướng dẫn**: Mô tả workflow tổng quan dạng high-level steps (numbered list). Chi tiết workflows sẽ có ở Section 4 với ASCII diagrams.

## Main Workflow Steps

1. **[Actor/System 1]** [Hành động chính]
   - [Chi tiết con nếu cần]

2. **[Actor/System 2]** [Hành động chính]
   - [Chi tiết con nếu cần]

---

## Workflow Characteristics

> Optional: Mô tả đặc điểm của workflow

- **Synchronous/Asynchronous**: [Mô tả phần nào sync, phần nào async]
- **Long-running**: [Có phải long-running workflow không? Duration?]
- **Cross-tenant**: [Có cross tenant boundaries không?]
- **Event-driven**: [Sử dụng events ở đâu?]
- **State machine**: [Có state transitions không? Liệt kê states chính]

---

## Key Decision Points

> Optional: Các điểm quyết định quan trọng trong workflow

| Step | Decision Point | Possible Outcomes |
|------|---------------|-------------------|
| [N] | [Quyết định gì?] | [Outcome 1], [Outcome 2], [Outcome 3] |

---

## Lưu ý

- Đây là overview level cao - chi tiết sẽ có trong Section 4: Workflows
- Focus vào main flow, ignore error handling ở đây
- Numbered steps để dễ reference
- Mỗi step nên ngắn gọn (1-2 câu)

# 1.4 Các Actor chính

> **Hướng dẫn**: Document tất cả actors (users, systems, external services) tham gia vào workflows

## User Actors

| Actor | Tenant Type / Role | Mô tả | Hành động chính |
|-------|-------------------|-------|-----------------|
| **[Actor 1]** | [Tenant type hoặc role] | [Mô tả vai trò của actor này] | [Action 1], [Action 2], [Action 3] |
| **[Actor 2]** | [Tenant type hoặc role] | [Mô tả vai trò của actor này] | [Action 1], [Action 2], [Action 3] |

## System Actors

> Các systems hoặc services tự động trigger actions

| Actor | Type | Mô tả | Hành động chính |
|-------|------|-------|-----------------|
| **[System 1]** | [Internal Service] | [Mô tả] | [Automated action 1], [Automated action 2] |

---

## Actor Interaction Matrix

> Optional: Ma trận tương tác giữa actors

|  | [Actor 1] | [Actor 2] | [Actor 3] | [System 1] |
|---|-----------|-----------|-----------|------------|
| **[Actor 1]** | - | [Interaction type] | [Interaction type] | [Interaction type] |

**Interaction types:**
- Direct: Tương tác trực tiếp qua UI/API
- Event: Tương tác qua events
- Workflow: Tương tác qua workflow orchestration
- None: Không tương tác trực tiếp

---

## Actor Permissions (Optional)

> Nếu có RBAC (Role-Based Access Control)

| Actor | Permissions | Access Level |
|-------|------------|--------------|
| **[Actor 1]** | [Permission 1], [Permission 2], [Permission 3] | [READ/WRITE/ADMIN] |

---

## Lưu ý

- Distinguish rõ giữa human actors và system actors
- Liệt kê đầy đủ actions mà actor có thể thực hiện
- Nếu multi-tenant, specify tenant type cho mỗi actor
- Link actors với workflows (Section 4) và permissions nếu có

# 1.5 External Systems

> **Hướng dẫn**: Document tất cả external systems mà hệ thống integrate với

## Infrastructure / Platform Services

| System | Type | Purpose | Integration Method |
|--------|------|---------|-------------------|
| **[Temporal]** | Workflow Orchestration | [Mô tả mục đích sử dụng Temporal] | [SDK, API, gRPC] |
| **[Kafka/MSK]** | Event Messaging | [Mô tả mục đích - cross-service events, cross-tenant communication, etc.] | [Kafka Client, Schema Registry] |
| **[Redis/Elasticache]** | Caching & Session Store | [Mô tả caching strategy] | [Redis Client, Lettuce, Jedis] |
| **[PostgreSQL/MySQL]** | Primary Database | [Mô tả data storage] | [JDBC, JPA/Hibernate] |

## Third-party Services

| System | Type | Purpose | Integration Method |
|--------|------|---------|-------------------|
| **[Notification Hub]** | Notification Service | Gửi email, push notifications, SMS | [REST API, SDK] |
| **[Payment Gateway]** | Payment Processing | [Mô tả payment integration] | [REST API, Webhook] |
| **[Authentication Provider]** | Auth Service | [SSO, OAuth2, SAML] | [OAuth2, OIDC] |
| **[External API]** | [Purpose] | [Mô tả integration] | [REST, GraphQL, gRPC] |

## External APIs We Provide

> APIs mà system này expose cho external consumers

| API | Type | Purpose | Consumers |
|-----|------|---------|-----------|
| **[Public API]** | REST API | [Mô tả public API] | [External partners, mobile apps] |
| **[Webhook]** | Webhook | [Events gửi đến external systems] | [Partner systems] |

---

## Integration Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    OUR SYSTEM                                │
│                                                              │
│  [Services]                                                 │
└────┬──────────┬──────────┬──────────┬─────────────────────┘
     │          │          │          │
     │          │          │          └─────────► [External API]
     │          │          │
     │          │          └────────────────────► [Payment Gateway]
     │          │
     │          └───────────────────────────────► [Kafka]
     │                                             ▲
     └─────────────────────────────────────────────┘
                                                  │
                                           [Other Services]
```

---

## External System Characteristics

### [System Name 1]

**Purpose**: [Tại sao cần system này]

**Integration Pattern**: [Request-Response / Event-Driven / Polling]

**Failure Handling**:
- Retry strategy: [Exponential backoff, max retries]
- Circuit breaker: [Enabled/Disabled]
- Fallback: [Default behavior khi external system down]

**SLA**: [Response time, uptime requirements]

---

## Lưu ý

- List đầy đủ tất cả external dependencies
- Specify integration method rõ ràng
- Document failure handling strategy cho critical systems
- Mention SLA nếu có formal agreements
- Link đến anti-corruption layer pattern (06-patterns/05-anti-corruption-layer.md) nếu cần isolate external dependencies
