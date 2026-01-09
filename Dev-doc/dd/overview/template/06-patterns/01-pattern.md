# Pattern: Traditional Layered Architecture (MVC)

> **Hướng dẫn**: Kiến trúc phân lớp truyền thống với cấu trúc thư mục theo layer (group by layer)

## Solution

**Traditional Layered Architecture** tổ chức code theo các **technical layers**:

```
┌─────────────────────────────┐
│   Controller Layer          │  ← HTTP/REST endpoints
├─────────────────────────────┤
│   Service Layer             │  ← Business logic
├─────────────────────────────┤
│   Repository Layer          │  ← Data access
├─────────────────────────────┤
│   Model/Entity Layer        │  ← Domain objects
└─────────────────────────────┘
```

**Key principle:** Group by technical role, NOT by business feature

---

## Package Structure (Group by Layer)

### Traditional MVC Structure

```
src/main/java/com/company/project/
│
├── controller/                          # Presentation Layer
│   ├── OrderController.java
│
├── service/                             # Business Logic Layer
│   ├── impl/
│   │    ├── OrderServiceImpl.java
│   ├── OrderService.java
│
├── repository/                          # Data Access Layer
│   ├── OrderRepository.java
│
├── model/                               # Domain Model Layer
│   ├── entity/
│   │   ├── Order.java
│   ├── dto/
│   │   ├── OrderDto.java
│   └── enums/
│       ├── OrderStatus.java
│
├── config/                              # Configuration
│   ├── WebConfig.java
│
├── exception/                           # Exception Handling
│   ├── GlobalExceptionHandler.java
│
└── util/                                # Utilities
    ├── DateUtil.java
```

---

## Layer Breakdown

### Layer 1: Controller (Presentation)

**Location:** `src/main/java/com/company/project/controller/`

**Responsibilities:**
- Handle HTTP requests/responses
- Input validation (format, required fields)
- Map DTOs ↔ Service layer
- Return HTTP status codes
- Exception handling (via `@ExceptionHandler`)

**Structure:**
```
controller/
├── OrderController.java
├── ProductController.java
├── CustomerController.java
└── PaymentController.java
```

---

### Layer 2: Service (Business Logic)

**Location:** `src/main/java/com/company/project/service/`

**Responsibilities:**
- Implement business logic
- Orchestrate multiple repositories
- Transaction management (`@Transactional`)
- Business validation
- Convert Entity ↔ DTO

---

### Layer 3: Repository (Data Access)

**Location:** `src/main/java/com/company/project/repository/`

**Responsibilities:**
- Database CRUD operations
- Custom queries
- Data access abstraction

**Structure:**
```
repository/
├── OrderRepository.java
├── ProductRepository.java
├── CustomerRepository.java
└── PaymentRepository.java
```
---

### Layer 4: Model (Domain Objects)

**Location:** `src/main/java/com/company/project/model/`

**Structure:**
```
model/
├── entity/                    # JPA Entities (database tables)
│   ├── Order.java
│   ├── OrderItem.java
│   ├── Product.java
│   └── Customer.java
├── dto/                       # Data Transfer Objects (API layer)
│   ├── OrderDto.java
│   ├── CreateOrderRequest.java
│   └── ProductDto.java
└── enums/                     # Enumerations
    ├── OrderStatus.java
    └── PaymentStatus.java
```


---

## Configuration & Utilities

### Configuration

```
config/
├── WebConfig.java
├── SecurityConfig.java
└── JpaConfig.java
```

### Utilities

```
util/
├── DateUtil.java
├── StringUtil.java
└── ValidationUtil.java
```

---

## Dependency Flow

```
Controller Layer
    ↓ (depends on)
Service Layer
    ↓ (depends on)
Repository Layer
    ↓ (depends on)
Model/Entity Layer
```

**Rules:**
- Controller chỉ gọi Service
- Service gọi Repository và sử dụng Entity/DTO
- Repository chỉ làm việc với Entity
- Model/Entity KHÔNG depend on bất kỳ layer nào

---


## Complete Project Structure

```
my-spring-boot-app/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── company/
│   │   │           └── project/
│   │   │               ├── controller/
│   │   │               │   ├── OrderController.java
│   │   │               │   ├── ProductController.java
│   │   │               │   └── CustomerController.java
│   │   │               ├── service/
│   │   │               │   ├── impl/
│   │   │               │   ├── OrderService.java
│   │   │               │   ├── ProductService.java
│   │   │               ├── repository/
│   │   │               │   ├── OrderRepository.java
│   │   │               │   ├── ProductRepository.java
│   │   │               │   └── CustomerRepository.java
│   │   │               ├── model/
│   │   │               │   ├── entity/
│   │   │               │   │   ├── Order.java
│   │   │               │   │   ├── OrderItem.java
│   │   │               │   │   ├── Product.java
│   │   │               │   │   └── Customer.java
│   │   │               │   ├── dto/
│   │   │               │   │   ├── OrderDto.java
│   │   │               │   │   ├── CreateOrderRequest.java
│   │   │               │   │   └── ProductDto.java
│   │   │               │   └── enums/
│   │   │               │       ├── OrderStatus.java
│   │   │               │       └── PaymentStatus.java
│   │   │               ├── config/
│   │   │               │   ├── WebConfig.java
│   │   │               │   └── SecurityConfig.java
│   │   │               ├── exception/
│   │   │               │   ├── GlobalExceptionHandler.java
│   │   │               │   ├── OrderNotFoundException.java
│   │   │               │   └── InvalidOrderException.java
│   │   │               ├── util/
│   │   │               │   ├── DateUtil.java
│   │   │               │   └── StringUtil.java
│   │   │               └── Application.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       └── db/
│   │           └── migration/
│   │               └── V1__create_tables.sql
│   └── test/
│       └── java/
│           └── com/
│               └── company/
│                   └── project/
│                       ├── controller/
│                       ├── service/
│                       └── repository/
│
├── build.gradle (hoặc pom.xml)
└── README.md
```

---

## Khi nào nên dùng?

### ✅ Phù hợp khi:
- Small to medium projects
- CRUD-heavy applications
- Team quen với MVC pattern
- Rapid prototyping
- Simple domain logic
- Monolithic architecture

### ❌ Không phù hợp khi:
- Large projects (>100 classes)
- Complex domain logic
- Microservices architecture
- Domain-Driven Design approach
- Need modular architecture

---

## Anti-patterns to Avoid

### ❌ God Service Class
```java
// BAD: One service handles everything
@Service
public class OrderService {
    // 50+ methods for every possible order operation
    public Order createOrder() { }
    public void cancelOrder() { }
    public void shipOrder() { }
    public void processPayment() { }
    public void generateInvoice() { }
    // ... 45 more methods
}
```

**✅ Solution:** Chia nhỏ thành multiple services
```java
@Service
public class OrderCreationService { }

@Service
public class OrderFulfillmentService { }

@Service
public class OrderPaymentService { }
```

---

### ❌ Anemic Domain Model
```java
// BAD: Entity chỉ có getters/setters
@Entity
public class Order {
    private Long id;
    private OrderStatus status;
    // Only getters/setters, no business logic
}

// Business logic in Service (should be in entity)
@Service
public class OrderService {
    public boolean canBeCancelled(Order order) {
        return order.getStatus() == OrderStatus.PENDING;
    }
}
```

**✅ Solution:** Business logic trong entity
```java
@Entity
public class Order {
    private Long id;
    private OrderStatus status;

    // Business logic HERE
    public boolean canBeCancelled() {
        return status == OrderStatus.PENDING || status == OrderStatus.CONFIRMED;
    }

    public void cancel() {
        if (!canBeCancelled()) {
            throw new InvalidOrderException("Cannot cancel order");
        }
        this.status = OrderStatus.CANCELLED;
    }
}
```

---

## Checklist

- [ ] Code organized by technical layer (controller/service/repository/model)
- [ ] Controllers chỉ handle HTTP concerns
- [ ] Services contain business logic và transaction management
- [ ] Repositories chỉ handle data access
- [ ] Entities có business methods (không anemic)
- [ ] DTOs dùng cho API layer
- [ ] Global exception handler configured
- [ ] Dependencies flow đúng: Controller → Service → Repository → Entity
- [ ] No cross-layer violations

---

## Migration Path

### From Layered to Hexagonal

Nếu project lớn và cần migrate sang Hexagonal Architecture:

1. **Step 1**: Tách domain logic ra khỏi entities
2. **Step 2**: Tạo Port interfaces trong domain
3. **Step 3**: Move repositories thành Adapters
4. **Step 4**: Refactor services thành Use Case handlers
5. **Step 5**: Restructure packages theo features

---

## References

- Spring MVC Documentation
- Spring Boot Best Practices
- Martin Fowler - Patterns of Enterprise Application Architecture
- Traditional 3-tier Architecture

# Pattern: DDD Aggregate

> **Hướng dẫn**: Sử dụng pattern này cho core business entities để đảm bảo consistency boundaries

## Mục đích

Đảm bảo consistency boundary cho domain objects và encapsulation business rules trong một transaction boundary rõ ràng.

## Problem

- Business rules cần được enforce consistently
- Multiple entities liên quan cần update trong một transaction
- Cần prevent concurrent modifications causing inconsistent state
- Domain logic bị rò rỉ ra ngoài business layer

## Solution

**Aggregate Pattern** group related entities thành một cluster với:
- **Aggregate Root**: Entity chính có global identity, là entry point duy nhất
- **Child Entities**: Entities chỉ có local identity trong aggregate
- **Value Objects**: Immutable objects không có identity
- **Consistency Boundary**: Changes trong aggregate = one transaction

---

## Architectural Decisions

### Khi nào áp dụng?

✅ **Nên dùng khi:**
- Có nhóm entities cần consistency trong cùng transaction
- Business rules phức tạp cần được encapsulate
- Cần control concurrent modifications
- Domain logic rõ ràng và có invariants

❌ **Không nên dùng khi:**
- Chỉ có đơn entity đơn giản (CRUD)
- Không có business rules phức tạp
- Read-only operations

### Components Structure (trong Domain Layer)

```
domain/[context]/
├── aggregate/[AggregateRoot].java            # Entry point, enforces invariants
├── entities/[ChildEntity].java               # Child entities (local identity, thuần domain, KHÔNG annotation JPA)
├── value_object/[ValueObject].java           # Immutable, no identity (Value Object)
├── event/[Action]Event.java                  # Domain events (thuần domain)
└── ports/out/repository/[AggregateRoot]Port.java  # Repository Port interface cho Aggregate Root
```

> **Note**:
> - Cấu trúc trên mô tả **domain layer** trong kiến trúc DDD/Hexagonal chuẩn của dự án.
> - JPA entity & JpaRepository thuộc về adapter layer: `adapters/infrastructure/out/persistence/{entity,jpa,mapper,implement}`.
> - Các layer khác (adapters in, application/usecase, resources) sẽ tuân theo cùng một nguyên tắc: domain thuần, kỹ thuật nằm ở adapter.

### Integration với DDD / Hexagonal Skeleton

Khi áp dụng trong kiến trúc DDD/Hexagonal:

- **Domain layer (`domain/[context]`)**:
  - `aggregate/[AggregateRoot].java`: Aggregate Root quản lý invariant.
  - `entities/[ChildEntity].java`: Child entities thuần domain, không phụ thuộc framework.
  - `value_object/*`: Các Value Object immutable.
  - `event/*`: Domain events do Aggregate raise khi state thay đổi.
  - `ports/out/repository/*Port.java`: Repository Port cho Aggregate Root.

- **Application layer (`application/usecase/[context]`)**:
  - Usecase/Handler mở transaction, gọi Aggregate/Domain Service qua Port, thu thập domain events (nếu có), sau đó chuyển cho adapter outbound để persist/publish (ví dụ Outbox, Kafka).

- **Adapter outbound (`adapters/infrastructure/out/persistence`)**:
  - JPA entity (`entity/*`) là PDM, KHÔNG dùng quan hệ JPA (@ManyToOne, @OneToMany), chỉ lưu FK ở dạng ID primitive.
  - `jpa/*JpaRepository.java` thao tác với JPA entity.
  - `mapper/*PersistenceMapper.java` dùng MapStruct để map Domain Model ↔ JPA Entity.
  - `implement/*RepoAdapter.java` implement Repository Port, chịu trách nhiệm **persist toàn bộ state của aggregate** (root + child) theo hợp đồng Port. Adapter có thể sử dụng **nhiều JpaRepository/DAO khác nhau** phía dưới để ghi/đọc từng bảng, miễn là hợp đồng với domain vẫn là “một Repository Port duy nhất cho cả Aggregate”.

- **Adapter outbound sự kiện (`adapters/infrastructure/out/...`)**:
  - Nhận domain events từ Application layer, persist vào Outbox (Transactional Outbox Pattern) hoặc publish trực tiếp (tùy thiết kế), bảo đảm không làm rò rỉ chi tiết messaging vào domain.

### Design Guidelines

**Aggregate Root:**
- Có global unique ID (e.g., [AggregateRoot]Id)
- Entry point duy nhất cho mọi operations
- Enforces business rules và invariants
- Raises domain events khi state changes
- NO public setters, chỉ có business methods

**Child Entities:**
- Có local ID (chỉ có nghĩa trong aggregate)
- References aggregate root ID
- Không được access trực tiếp từ bên ngoài aggregate (mọi thao tác đi qua Aggregate Root)
- Là **domain model thuần**, không dùng annotation JPA; persistence mapping được xử lý ở adapter `persistence` (JPA entity + mapper)

**Value Objects:**
- Immutable (final fields, no setters)
- Equality by value (không có ID)
- Examples: Money, Address, DateRange, Status enum

**Repository (Domain Port):**
- Chỉ tạo **một** Repository Port cho mỗi Aggregate Root (một aggregate = một port). Điều này đảm bảo domain luôn thao tác aggregate như một khối thống nhất, tránh việc bypass invariant qua các repo nhỏ.
- Port nằm trong domain: `domain/[context]/ports/out/repository/[AggregateRoot]Port.java`
- Adapter implementation nằm ở infrastructure: `adapters/infrastructure/out/persistence/implement/[AggregateRoot]RepoAdapter.java`
- Hợp đồng Port chịu trách nhiệm **save/load entire aggregate** (root + children). Adapter có thể orchestration nhiều JpaRepository/DAO/persistence component khác nhau (mỗi component phụ trách một bảng) nhưng chi tiết này phải được ẩn hoàn toàn khỏi domain.

---

## Checklist

- [ ] Aggregate Root có unique identity ([Entity]Id)
- [ ] Business rules được enforce trong Aggregate Root, không ở service
- [ ] Child entities chỉ accessible qua Aggregate Root
- [ ] Child entities là domain model thuần, không annotation JPA (persistence mapping ở adapter)
- [ ] Domain events được raise khi state changes (và được Application layer chuyển cho outbound adapter / Outbox)
- [ ] Repository Port chỉ có cho Aggregate Root (không có repo cho child entities)
- [ ] Repository Adapter save/load entire aggregate (root + children) theo hợp đồng Port
- [ ] Consistency maintained trong một transaction (Usecase/Handler là transaction boundary)
- [ ] NO setters - chỉ có business methods với tên rõ nghĩa
- [ ] Validation logic trong aggregate methods
- [ ] Value objects là immutable

---

## Anti-patterns to Avoid

❌ **Large Aggregates**: Aggregate quá lớn với nhiều entities → slow performance
✅ **Solution**: Chia nhỏ thành multiple smaller aggregates

❌ **Anemic Domain Model**: Aggregate chỉ có getters/setters, business logic ở service
✅ **Solution**: Move business logic vào aggregate methods

❌ **Aggregate References**: Aggregate A giữ reference object đến Aggregate B
✅ **Solution**: Reference by ID only, use Domain Events for communication

❌ **Child Entity Repositories**: Tạo repository cho child entities
✅ **Solution**: Chỉ repository cho Aggregate Root

---

## References

- Coding rules: `java-springboot-gradle-rules.mdc` Section 4 (DDD)
- Dev Agent sẽ implement theo checklist này khi generate code


# Pattern: Transactional Outbox

> **Hướng dẫn**: Đảm bảo at-least-once event delivery khi publish events qua Kafka

## Mục đích

Đảm bảo events được publish thành công cùng với database transaction, tránh dual-write problem.

## Problem

- **Dual-write problem**: Write to DB + publish to Kafka không atomic
- **Event loss**: DB commit success nhưng Kafka publish fails
- **Duplicate events**: Kafka publish success nhưng DB rollback
- Không có transaction boundary giữa DB và message broker

## Solution

**Transactional Outbox Pattern**: Write events vào outbox table trong cùng DB transaction, sau đó có separate process polling và publish lên Kafka.

---

## Architectural Decisions

### Khi nào áp dụng?

✅ **Nên dùng khi:**
- Service publish events qua Kafka sau DB operations
- Cần đảm bảo events không bị mất khi publish fail
- Event ordering quan trọng
- Cần audit trail của events

❌ **Không nên dùng khi:**
- Service không publish events
- Fire-and-forget messaging (không quan tâm delivery guarantee)
- Latency requirements < 1 second (outbox polling có delay)

### Components Structure

```
infrastructure/messaging/
├── kafka/
│   ├── producer/EventProducer.java
│   └── consumer/[Event]Consumer.java
└── outbox/
    ├── OutboxEntity.java              # JPA entity
    ├── OutboxRepository.java          # JPA repository
    ├── OutboxPublisher.java           # @Scheduled polling
    └── OutboxCleanupService.java      # Cleanup old records
```

### Design Flow

1. **Write Phase** (trong @Transactional):
   - Save aggregate changes to DB
   - Save domain events to outbox table (same transaction)
   - Commit transaction (both aggregate + outbox atomically)

2. **Publish Phase** (separate scheduled job):
   - Poll pending events from outbox table
   - Publish to Kafka
   - Mark as PROCESSED hoặc FAILED

3. **Cleanup Phase**:
   - Delete old processed records (retention: 7-30 days)

### Database Schema Requirements

**Outbox table cần có:**
- `id`: Primary key
- `aggregate_type`, `aggregate_id`: Để track event source
- `event_type`: Event class name
- `payload`: JSON serialized event
- `topic`, `partition_key`: Kafka routing info
- `status`: PENDING, PROCESSED, FAILED
- `created_at`, `processed_at`: Timestamps
- `retry_count`, `last_error`: Error handling

**Indexes:**
- `idx_outbox_status` on (status, created_at) - cho polling query
- `idx_outbox_aggregate` on (aggregate_type, aggregate_id) - cho audit

---

## Checklist

- [ ] Outbox table được tạo trong cùng database với aggregates
- [ ] Application service save aggregate VÀ outbox trong CÙNG @Transactional
- [ ] OutboxPublisher có @Scheduled polling (every 1-5 seconds)
- [ ] Retry logic với max retries configured
- [ ] Failed events được mark để investigate (alert/monitoring)
- [ ] Cleanup service delete processed events sau retention period
- [ ] Monitoring cho pending count và failed events
- [ ] Event ordering maintained by created_at timestamp

---

## Anti-patterns to Avoid

❌ **Save outbox in separate transaction**: Breaks atomicity guarantee
✅ **Solution**: Same @Transactional method cho cả aggregate và outbox

❌ **No retry limit**: Failed events retry forever
✅ **Solution**: Max retries + mark as FAILED + alert

❌ **No cleanup**: Outbox table grows indefinitely
✅ **Solution**: Scheduled cleanup sau retention period

❌ **Synchronous publish**: Block transaction waiting for Kafka
✅ **Solution**: Outbox pattern với async polling

---

## Monitoring Queries

```sql
-- Pending count (should be low)
SELECT COUNT(*) FROM outbox WHERE status = 'PENDING';

-- Oldest pending (check lag)
SELECT MIN(created_at) FROM outbox WHERE status = 'PENDING';

-- Failed events (need investigation)
SELECT * FROM outbox WHERE status = 'FAILED';
```

---

## References

- Coding rules: `java-springboot-gradle-rules.mdc` (Kafka utilities in Internal SDKs)
- Related: [03-kafka-consumer-idempotency.md](03-kafka-consumer-idempotency.md) để handle consumer side

# Pattern: Kafka Consumer với Idempotency

> **Hướng dẫn**: Đảm bảo exactly-once processing cho Kafka consumers

## Mục đích

Tránh duplicate processing khi Kafka consumer retry hoặc rebalance, đảm bảo idempotency.

## Problem

- Kafka guarantees **at-least-once delivery** (không phải exactly-once)
- Consumer có thể process cùng message nhiều lần do:
  - Consumer restart trước khi commit offset
  - Rebalance events
  - Network issues causing retry
- Duplicate processing → inconsistent state, duplicate operations

## Solution

**Idempotency Pattern**: Sử dụng Redis để track processed events với atomic `setIfAbsent` operation.

---

## Architectural Decisions

### Khi nào áp dụng?

✅ **Nên dùng khi:**
- Consumer process Kafka events
- Duplicate processing gây ra side effects không mong muốn
- Operations KHÔNG naturally idempotent (e.g., tạo record mới, gửi email, charge payment)
- Cần exactly-once processing guarantee

❌ **Không nên dùng khi:**
- Operations đã naturally idempotent (e.g., update with full state, upsert operations)
- Read-only operations
- Acceptable to process duplicate (fire-and-forget)

### Components Structure

```
infrastructure/messaging/kafka/consumer/
├── [Event]Consumer.java           # @KafkaListener
├── IdempotencyService.java        # Redis check logic
└── config/KafkaConsumerConfig.java
```

### Design Flow

1. **Check idempotency key** trong Redis (`setIfAbsent`)
   - Key format: `idempotency:{eventId}` hoặc `idempotency:{aggregateType}:{aggregateId}:{eventType}`
   - TTL: 24-72 hours
2. **If key exists** → skip processing (already processed)
3. **If key NOT exists** → proceed với processing
4. **On success** → key remains in Redis
5. **On failure** → delete key (allow retry)

### Cache Strategy

**Idempotency key format:**
- Simple: `idempotency:{eventId}`
- Detailed: `idempotency:{aggregateType}:{aggregateId}:{eventType}`

**TTL considerations:**
- 24 hours: Cho events không quan trọng
- 72 hours: Cho financial/critical events
- Longer: Nếu có concern về late-arriving duplicates

**Value:** Simple flag "1" hoặc processing timestamp

---

## Checklist

- [ ] Redis cache configured và available
- [ ] Event có unique eventId field
- [ ] Consumer dùng `setIfAbsent` (atomic operation)
- [ ] TTL được set để avoid memory leak
- [ ] Idempotency key được delete khi processing FAILS (để allow retry)
- [ ] Key format rõ ràng, có namespace prefix
- [ ] Monitor Redis memory usage
- [ ] Handle Redis unavailable scenario (fail-safe vs fail-closed)

---

## Anti-patterns to Avoid

❌ **Check-then-set (non-atomic)**: Get key → check → set key
✅ **Solution**: Dùng `setIfAbsent` atomic operation

❌ **No TTL**: Keys tồn tại forever
✅ **Solution**: Set TTL phù hợp (24-72 hours)

❌ **Keep key on failure**: Prevent retry khi processing fails
✅ **Solution**: Delete key on exception để allow legitimate retry

❌ **Database-based dedup**: Slow, not atomic
✅ **Solution**: Redis với atomic operations

---

## Configuration Example

```yaml
# Redis config
spring:
  redis:
    host: [REDIS_HOST]
    port: 6379
    timeout: 2000ms

# Kafka consumer config
kafka:
  consumer:
    enable-auto-commit: false  # Manual commit after successful processing
    max-poll-records: 10
```

---

## Monitoring

**Metrics to track:**
- Duplicate messages detected count
- Redis operation latency
- Redis connection errors
- Processing success/failure rate

**Alerts:**
- High duplicate rate (may indicate upstream issue)
- Redis unavailable (fallback behavior triggered)

---

## References

- Coding rules: `java-springboot-gradle-rules.mdc` (Redis utilities in Internal SDKs: `cp-ec-redis`)
- Related: [02-transactional-outbox-pattern.md](02-transactional-outbox-pattern.md) để handle producer side
- Redis SDK: Internal SDK `cp-ec-redis` có sẵn utilities


# Pattern: Temporal Workflow

> **Hướng dẫn**: Long-running, reliable workflows với Temporal orchestration

## Mục đích

Orchestrate long-running business processes với reliability, automatic retry, timeout guarantees, và state persistence.

## Problem

- Long-running processes span multiple services và có thể mất vài giờ/ngày
- Need retry logic for transient failures
- Need timeout handling cho stuck processes
- Need state persistence khi service restart
- Need ability to signal/query running workflows
- Compensating transactions cho failed steps

## Solution

**Temporal Workflow Pattern**: Sử dụng Temporal.io để orchestrate workflow với Activities cho external calls, Signals cho external events, và Queries cho status check.

---

## Architectural Decisions

### Khi nào áp dụng?

✅ **Nên dùng khi:**
- Process chạy lâu (> 1 phút) và span multiple services
- Cần retry/timeout logic phức tạp
- Cần track workflow state và history
- Có human-in-the-loop approvals (cần wait for signal)
- Cần compensating transactions (saga pattern)
- Cần query workflow status từ external systems

❌ **Không nên dùng khi:**
- Simple synchronous operations (< 1 second)
- Single-service operations
- Fire-and-forget tasks
- Real-time requirements (< 100ms latency)

### Components Structure

```
infrastructure/temporal/
├── workflow/
│   ├── [Workflow]Workflow.java          # Workflow interface (@WorkflowInterface)
│   └── [Workflow]WorkflowImpl.java      # Workflow implementation
├── activity/
│   ├── [Activity]Activities.java        # Activity interface
│   └── [Activity]ActivitiesImpl.java    # Activity implementation
└── config/
    └── TemporalConfig.java              # Worker configuration
```

### Design Components

**Workflow:**
- Orchestration logic (decision tree, loops, wait conditions)
- Deterministic code (no random, no current time, no external calls)
- Durable execution (survive failures và restarts)
- Can wait for Signals (external events)
- Can be Queried for status

**Activity:**
- Actual work (external API calls, DB operations, file I/O)
- Non-deterministic, có side effects
- Có retry options, timeout options
- Idempotent (có thể retry safely)

**Signal:**
- External event để trigger workflow action (e.g., approval, cancellation)

**Query:**
- Read workflow state from outside (e.g., get current status, progress percentage)

### Design Flow

1. **Client starts workflow** với workflow ID
2. **Workflow executes** step-by-step:
   - Call activities cho external work
   - Wait for signals (e.g., approval)
   - Sleep for timeouts
   - Make decisions based on results
3. **Activities execute** với retry/timeout configured
4. **Workflow completes** hoặc fails
5. **External systems** có thể:
   - Send signals để trigger actions
   - Query status để check progress

---

## Checklist

- [ ] Workflow interface có @WorkflowInterface và @WorkflowMethod
- [ ] Workflow implementation là deterministic (no UUID.random(), no System.currentTimeMillis())
- [ ] Activities có retry options configured (exponential backoff)
- [ ] Activities có timeout configured (start-to-close)
- [ ] Signals defined cho external events (@SignalMethod)
- [ ] Queries defined cho status check (@QueryMethod)
- [ ] Workflow state được track (để query)
- [ ] Compensating activities cho saga rollback (nếu cần)
- [ ] Worker được configure và run

---

## Anti-patterns to Avoid

❌ **Non-deterministic workflow code**: Use UUID.randomUUID(), System.currentTimeMillis() in workflow
✅ **Solution**: Dùng Workflow.randomUUID(), Workflow.currentTimeMillis()

❌ **Direct external calls in workflow**: Call DB/API directly
✅ **Solution**: Wrap trong Activity

❌ **No retry options**: Activity fails → workflow fails immediately
✅ **Solution**: Configure RetryOptions với max attempts

❌ **No timeout**: Activity hangs forever
✅ **Solution**: Configure StartToCloseTimeout

❌ **Large workflow state**: Store huge objects in workflow
✅ **Solution**: Store IDs only, load data trong Activity

---

## Configuration Example

```yaml
# Temporal config
temporal:
  server:
    host: [TEMPORAL_SERVER_HOST]
    port: 7233
  namespace: [NAMESPACE]
  task-queue: [TASK_QUEUE_NAME]
```

**Activity Options:**
- `StartToCloseTimeout`: Max duration for activity execution (e.g., 5 minutes)
- `RetryOptions.MaximumAttempts`: Max retry count (e.g., 3)
- `RetryOptions.BackoffCoefficient`: Exponential backoff (e.g., 2.0)

**Workflow Options:**
- `WorkflowExecutionTimeout`: Max duration cho entire workflow (e.g., 7 days)
- `WorkflowRunTimeout`: Max duration cho single run (e.g., 24 hours)

---

## Use Cases

**Common scenarios:**
- **Order fulfillment**: Create order → Payment → Shipment → Notification
- **Approval workflows**: Submit request → Wait for approval (signal) → Process/Reject
- **Saga pattern**: Multi-service transaction với compensating actions
- **Scheduled tasks**: Wait N days → Send reminder → Wait M days → Close
- **Human-in-the-loop**: Automated steps + manual approval steps

---

## Monitoring

**Temporal UI** provides:
- Workflow execution history
- Activity retry attempts
- Current workflow state
- Failed workflows
- Stuck workflows (timeout soon)

**Metrics to track:**
- Workflow success/failure rate
- Activity retry rate
- Workflow duration (P50, P95, P99)
- Pending workflow count

---

## References

- Coding rules: `java-springboot-gradle-rules.mdc` (Temporal không có trong Internal SDKs list, tự config)
- Temporal docs: https://docs.temporal.io/
- Related: [07-state-machine-pattern.md](07-state-machine-pattern.md) cho state management trong aggregate

# Pattern: Anti-Corruption Layer (ACL)

> **Hướng dẫn**: Isolate external service dependencies và protect domain model

## Mục đích

Protect domain model khỏi external system models và changes, maintain clean boundaries.

## Problem

- External APIs có model khác với domain model (impedance mismatch)
- External API changes có thể break internal code
- Domain logic bị coupled với external systems
- Testing khó khăn khi phụ thuộc external services
- Multiple services có different models cho same concept

## Solution

**Anti-Corruption Layer Pattern**: Tạo Client interface ở domain/application layer, implementation ở infrastructure layer, với Mapper để translate external ↔ domain models.

---

## Architectural Decisions

### Khi nào áp dụng?

✅ **Nên dùng khi:**
- Integrate với external/3rd-party APIs
- External model khác biệt nhiều với domain model
- External service không stable (API có thể change)
- Cần isolate để testing (mock external calls)
- Multiple bounded contexts communicate

❌ **Không nên dùng khi:**
- Internal service trong cùng team/org
- External model match perfectly với domain
- Simple CRUD wrapper không có translation logic

### Components Structure

```
domain/[context]/client/
└── [External]Client.java                # Interface (in domain or application layer)

infrastructure/client/[externalservice]/
├── [External]ClientImpl.java           # Implementation
├── [External]Dto.java                   # External API DTOs
├── [External]Mapper.java                # Mapper external ↔ domain
└── config/[External]Config.java        # API config (URL, auth, timeout)
```

### Design Guidelines

**Client Interface (Domain/Application Layer):**
- Defines contract trong domain language
- Takes domain objects as parameters
- Returns domain objects
- NO external API details leak (no HTTP status, no external DTOs)

**Client Implementation (Infrastructure Layer):**
- Calls external API (RestTemplate, WebClient, gRPC client, etc.)
- Handles HTTP/network errors
- Retry logic, circuit breaker, timeout
- Maps external DTOs ↔ domain objects qua Mapper

**Mapper:**
- Translates external model → domain model
- Translates domain model → external model
- Handles field name differences, structure differences
- Default values cho missing fields

### Error Handling Strategy

- **Transient errors** (network timeout, 5xx): Retry với exponential backoff
- **Client errors** (4xx): Throw domain exception (don't retry)
- **Circuit breaker**: Fail fast khi external service down
- **Fallback**: Default values hoặc cached data

---

## Checklist

- [ ] Client interface defined ở domain/application layer (không ở infrastructure)
- [ ] Interface dùng domain objects (không expose external DTOs)
- [ ] Implementation ở infrastructure layer
- [ ] Mapper translates external ↔ domain models
- [ ] Retry logic với max attempts configured
- [ ] Timeout configured (connection timeout, read timeout)
- [ ] Circuit breaker để prevent cascading failures (optional, recommended)
- [ ] Error handling: transient errors retry, client errors throw domain exception
- [ ] Logging cho external calls (request/response for debugging)

---

## Anti-patterns to Avoid

❌ **Leaking external models**: Return external DTOs từ client interface
✅ **Solution**: Always map to domain objects

❌ **No error handling**: Let HTTP exceptions bubble up
✅ **Solution**: Catch và translate to domain exceptions

❌ **No retry**: Single attempt, fail immediately on transient error
✅ **Solution**: Retry với exponential backoff

❌ **Client interface in infrastructure**: Tight coupling
✅ **Solution**: Interface ở domain/application, implementation ở infrastructure

❌ **Sync blocking calls**: Block threads waiting for external API
✅ **Solution**: Consider async calls (WebClient) cho high-throughput scenarios

---

## Configuration Example

```yaml
# External service config
external:
  [service-name]:
    base-url: [EXTERNAL_API_BASE_URL]
    api-key: [API_KEY]
    timeout:
      connect: 2000ms
      read: 5000ms
    retry:
      max-attempts: 3
      backoff-multiplier: 2.0
    circuit-breaker:
      failure-threshold: 5
      wait-duration: 30s
```

---

## Common External Integrations

**Examples:**
- **Payment gateway** (Stripe, PayPal): Payment processing
- **Notification service** (Twilio, SendGrid): SMS, email
- **Identity provider** (Keycloak, Auth0): User authentication
- **Analytics** (Segment, Mixpanel): Event tracking
- **Storage** (S3, GCS): File storage

---

## Testing

**Unit tests:**
- Mock client interface trong service tests
- Test mapper logic independently

**Integration tests:**
- Use WireMock để stub external API responses
- Test retry logic, timeout handling, error scenarios

---

## References

- Coding rules: `java-springboot-gradle-rules.mdc` Section 5.2 (Keycloak SDK example)
- Internal SDKs: `cp-ec-common`, adapters (`fire-base-adapter`, etc.)
- Related: DDD bounded context integration pattern

# Pattern: Notification Fan-Out

> **Hướng dẫn**: Distribute notifications across multiple channels (email, push, SMS)

## Mục đích

Send notifications qua nhiều channels từ một event, với independent failure handling per channel.

## Problem

- Need to notify users via multiple channels (email, SMS, push notification)
- Each channel có different API và format requirements
- Need template management cho messages
- Failure ở một channel không nên block các channels khác
- Need tracking delivery status per channel

## Solution

**Fan-Out Pattern**: Một event trigger notifications đến multiple channels concurrently, mỗi channel có separate sender implementation và independent error handling.

---

## Architectural Decisions

### Khi nào áp dụng?

✅ **Nên dùng khi:**
- User cần receive notifications qua multiple channels
- Channels có different reliability/latency characteristics
- User có preferences cho notification channels
- Cần audit trail của notification delivery
- Different channels cho different event types

❌ **Không nên dùng khi:**
- Chỉ có single notification channel
- All-or-nothing delivery required (không acceptable nếu một channel fails)
- Real-time only (không cần persistent notification)

### Components Structure

```
infrastructure/notification/
├── NotificationService.java              # Fan-out orchestrator
├── sender/
│   ├── NotificationSender.java           # Interface
│   ├── EmailNotificationSender.java
│   ├── PushNotificationSender.java
│   └── SmsNotificationSender.java
├── template/
│   ├── TemplateService.java              # Template loading/rendering
│   └── templates/
│       ├── [event-type]-email.ftl
│       ├── [event-type]-push.ftl
│       └── [event-type]-sms.ftl
└── model/
    ├── Notification.java                 # Notification request
    ├── NotificationChannel.java          # Enum: EMAIL, PUSH, SMS
    └── NotificationResult.java           # Delivery status per channel
```

### Design Flow

1. **Event occurs** → Application service hoặc Event Consumer tạo Notification request
2. **NotificationService receives** notification với:
   - Recipient (user ID hoặc contact info)
   - Notification type
   - Data payload (for template rendering)
   - Target channels list
3. **For each channel**:
   - Load appropriate template
   - Render message với data
   - Send via channel-specific sender
   - Log result (success/failure) independently
4. **Return aggregated results** (optional)

### Template Management

**Template engines:**
- FreeMarker, Thymeleaf, hoặc simple string substitution

**Template organization:**
- One template per (event-type + channel) combination
- Templates stored in resources/templates/notifications/
- Support i18n (multiple languages)

**Template variables:**
- User info: name, email, phone
- Event data: order ID, amount, status
- Action links: confirmation URL, deep link

---

## Checklist

- [ ] Separate sender implementation per channel (Email, Push, SMS)
- [ ] Template service load và render templates
- [ ] NotificationService fan-out concurrently (không block channels)
- [ ] Independent error handling per channel (một channel fail không affect others)
- [ ] Retry logic per channel (transient failures)
- [ ] Async processing (không block main transaction)
- [ ] User preferences cho channels (opt-in/opt-out)
- [ ] Delivery status tracking (sent, failed, pending)
- [ ] Rate limiting per channel (avoid spam)

---

## Anti-patterns to Avoid

❌ **Sequential sending**: Send email → wait → send SMS → wait
✅ **Solution**: Fan-out concurrently (parallel sending)

❌ **Fail-all-on-one-failure**: Email fails → skip SMS/Push
✅ **Solution**: Independent error handling, continue với other channels

❌ **Hard-coded messages**: Messages embedded trong code
✅ **Solution**: Template-based messages

❌ **Sync blocking**: Wait for all channels to complete
✅ **Solution**: Async fire-and-forget hoặc background job

❌ **No retry**: Transient failure → notification lost
✅ **Solution**: Retry logic với exponential backoff

---

## Configuration Example

```yaml
# Notification config
notification:
  channels:
    email:
      enabled: true
      from: noreply@[domain].com
      smtp:
        host: [SMTP_HOST]
        port: 587
    push:
      enabled: true
      provider: firebase
      api-key: [FCM_API_KEY]
    sms:
      enabled: true
      provider: twilio
      account-sid: [TWILIO_ACCOUNT_SID]
      auth-token: [TWILIO_AUTH_TOKEN]
```

---

## Common Use Cases

**Examples:**
- **Order confirmation**: Email (receipt) + Push (status update) + SMS (OTP)
- **Password reset**: Email (link) + SMS (code)
- **Promotion**: Email (details) + Push (reminder)
- **Critical alert**: Push (immediate) + SMS (fallback) + Email (audit trail)

---

## Monitoring

**Metrics to track:**
- Notification sent count per channel
- Delivery success rate per channel
- Delivery latency (P50, P95, P99) per channel
- Failed notifications (by reason: rate limit, invalid recipient, service down)
- User opt-out rate per channel

**Alerts:**
- High failure rate on any channel
- Channel service unavailable
- Delivery latency spike

---

## References

- Coding rules: `java-springboot-gradle-rules.mdc` (notification clients không trong Internal SDKs, tự integrate)
- External integrations: Twilio (SMS), SendGrid (Email), Firebase (Push)
- Related: Event-driven architecture cho trigger notifications

# Pattern: State Machine

> **Hướng dẫn**: Manage aggregate state transitions với business rules và validation

## Mục đích

Enforce valid state transitions và prevent invalid state changes trong domain entities.

## Problem

- Need to control which states can transition to which states
- Business rules cho state transitions (e.g., can't cancel shipped order)
- Need to track state history cho audit
- Concurrent modifications có thể cause invalid transitions
- Complex state logic scattered across services

## Solution

**State Machine Pattern**: Define allowed transitions trong enum/class, enforce transitions trong Aggregate, track history, và raise events khi state changes.

---

## Architectural Decisions

### Khi nào áp dụng?

✅ **Nên dùng khi:**
- Entity có clear lifecycle với discrete states
- Business rules cho valid transitions (không phải mọi state có thể chuyển sang mọi state)
- Cần audit trail của state changes
- State transitions trigger business logic hoặc side effects
- Cần prevent invalid state changes

❌ **Không nên dùng khi:**
- Simple boolean flags (không có complex transitions)
- Any state có thể chuyển sang any state (không có rules)
- State không quan trọng cho business logic

### Components Structure

```
domain/[context]/
├── valueobject/
│   └── [Entity]Status.java              # Enum với ALLOWED_TRANSITIONS map
├── aggregate/
│   └── [Entity].java                    # Aggregate với transitionTo() method
└── event/
    └── [Entity]StatusChangedEvent.java  # Domain event
```

### Design Guidelines

**Status Enum:**
- Define tất cả possible states
- Define ALLOWED_TRANSITIONS map (state → Set<allowed next states>)
- Method `canTransitionTo(newStatus)` để validate
- Terminal states có empty allowed transitions

**Aggregate:**
- Current status field
- Status history list (optional, for audit)
- `transitionTo(newStatus, reason)` method:
  1. Validate allowed transition
  2. Apply business rules cho transition
  3. Record history
  4. Update status
  5. Raise domain event

**Status History:**
- From status, To status
- Timestamp, Reason
- User who triggered (optional)

### Common State Patterns

**Order lifecycle:**
```
DRAFT → SUBMITTED → CONFIRMED → SHIPPED → DELIVERED
                   ↓
                CANCELLED
```

**Approval workflow:**
```
DRAFT → PENDING_REVIEW → APPROVED → ACTIVE
                        ↓          ↓
                    REJECTED → ARCHIVED
```

**Payment:**
```
PENDING → AUTHORIZED → CAPTURED
        ↓            ↓
      FAILED      REFUNDED
```

---

## Checklist

- [ ] Status enum với tất cả states defined
- [ ] ALLOWED_TRANSITIONS map trong enum
- [ ] `canTransitionTo()` validation method
- [ ] Aggregate `transitionTo()` method enforces rules
- [ ] Status history được track (from, to, timestamp, reason)
- [ ] Domain event raised khi status changes
- [ ] Business rules applied per transition (e.g., can't ship if not paid)
- [ ] Concurrent modification handled (optimistic locking)
- [ ] Terminal states identified (no further transitions allowed)

---

## Anti-patterns to Avoid

❌ **Direct status setter**: `setStatus(newStatus)` without validation
✅ **Solution**: `transitionTo(newStatus)` với validation

❌ **Status logic in service**: Service validates transitions
✅ **Solution**: Validation logic trong Aggregate/Status enum

❌ **No history tracking**: Can't audit who changed status when
✅ **Solution**: StatusHistory collection trong aggregate

❌ **Missing domain events**: Status changes không trigger events
✅ **Solution**: Raise event trong `transitionTo()` method

❌ **Allow any transition**: Không có ALLOWED_TRANSITIONS validation
✅ **Solution**: Define valid transitions explicitly

---

## Example States

**E-commerce Order:**
```java
DRAFT           // User creating order
PENDING_PAYMENT // Order submitted, awaiting payment
PAID            // Payment confirmed
PROCESSING      // Being prepared
SHIPPED         // On delivery
DELIVERED       // Completed
CANCELLED       // User cancelled
REFUNDED        // Money returned
```

**Content Moderation:**
```java
SUBMITTED        // User submitted content
PENDING_REVIEW   // Waiting for moderator
APPROVED         // Passed moderation
REJECTED         // Failed moderation
PUBLISHED        // Live on platform
ARCHIVED         // Removed from platform
```

**Loan Application:**
```java
DRAFT            // Applicant filling form
SUBMITTED        // Application submitted
UNDER_REVIEW     // Being reviewed by officer
PENDING_APPROVAL // Waiting for manager approval
APPROVED         // Loan approved
REJECTED         // Loan rejected
DISBURSED        // Money transferred
CLOSED           // Loan fully repaid
```

---

## Validation Rules Examples

**Per-transition business rules:**
- SUBMITTED → CONFIRMED: Require payment method validated
- CONFIRMED → SHIPPED: Require inventory available
- SHIPPED → DELIVERED: Require delivery confirmation
- Any → CANCELLED: Check if cancellation window still valid

---

## Monitoring

**Metrics to track:**
- Count per status (current distribution)
- Average time in each status
- Transition frequency (state A → state B count)
- Stuck entities (in same status > threshold time)
- Invalid transition attempts (blocked by validation)

---

## References

- Coding rules: `java-springboot-gradle-rules.mdc` (Status là ValueObject trong DDD)
- Related: [01-ddd-aggregate-pattern.md](01-ddd-aggregate-pattern.md) cho aggregate structure
- Pattern: Finite State Machine (FSM)

# Pattern: GraphQL BFF (Backend-for-Frontend)

> **Hướng dẫn**: GraphQL layer làm BFF cho frontend apps với flexible queries

## Mục đích

Provide flexible, efficient API cho frontend applications với GraphQL, aggregate data từ multiple backend services.

## Problem

- REST APIs require multiple roundtrips để fetch related data
- Over-fetching (get nhiều fields không cần) hoặc under-fetching (phải call nhiều endpoints)
- Frontend needs different data shapes than backend provides
- Different clients (web, mobile) have different data requirements
- N+1 query problem khi load related entities

## Solution

**GraphQL BFF Pattern**: Tạo GraphQL layer aggregate data từ multiple backend services, cho phép clients query exactly data they need trong single request.

---

## Architectural Decisions

### Khi nào áp dụng?

✅ **Nên dùng khi:**
- Multiple frontend clients với different data requirements
- Need flexible queries (clients control what fields they want)
- Aggregate data từ multiple microservices
- Over-fetching/under-fetching là problem với REST
- Complex nested data structures
- Mobile apps cần minimize network requests

❌ **Không nên dùng khi:**
- Simple CRUD operations (REST đủ)
- Single client với fixed data requirements
- Real-time streaming data (consider WebSocket/SSE)
- Backend-to-backend communication (gRPC tốt hơn)

### Components Structure

```
[service]-graph/  (separate BFF service)
├── schema/
│   └── schema.graphqls                # GraphQL schema definition
├── resolver/
│   ├── query/
│   │   └── [Entity]QueryResolver.java
│   └── mutation/
│       └── [Entity]MutationResolver.java
├── dataloader/
│   └── [Entity]DataLoader.java        # Batch loading cho N+1 problem
├── client/
│   └── [Backend]ServiceClient.java    # Calls backend services
└── config/
    └── GraphQLConfig.java             # GraphQL setup
```

### Design Components

**GraphQL Schema:**
- Define types cho domain entities
- Define queries (read operations)
- Define mutations (write operations)
- Define input types cho mutations
- Relationships between types (nested queries)

**Resolvers:**
- Query resolvers: Fetch data from backend services
- Mutation resolvers: Call backend service APIs để create/update/delete
- Field resolvers: Resolve specific fields (especially for nested data)

**DataLoaders:**
- Batch loading để solve N+1 problem
- Cache results trong single request
- Automatic batching của multiple requests thành one

**Service Clients:**
- Anti-Corruption Layer cho backend services
- Translate backend responses → GraphQL types
- Error handling và retry logic

### GraphQL vs REST

**GraphQL advantages:**
- Single endpoint, flexible queries
- No over-fetching/under-fetching
- Strong typing với schema
- Nested queries trong one request

**REST advantages:**
- Simpler caching (HTTP caching)
- Simpler to understand và debug
- Better for file uploads
- Standard HTTP status codes

---

## Checklist

- [ ] GraphQL schema defined với types, queries, mutations
- [ ] Query resolvers implemented cho read operations
- [ ] Mutation resolvers implemented cho write operations
- [ ] DataLoaders configured cho N+1 prevention (batch loading)
- [ ] Service clients call backend services
- [ ] Error handling (translate backend errors → GraphQL errors)
- [ ] Authentication/authorization (check permissions trong resolvers)
- [ ] Pagination support cho list queries (cursor-based hoặc offset-based)
- [ ] Input validation trong mutations
- [ ] Monitoring (query complexity, execution time)

---

## Anti-patterns to Avoid

❌ **N+1 query problem**: Fetch related entities trong loop
✅ **Solution**: Use DataLoaders để batch load

❌ **Direct DB access**: GraphQL resolver query database directly
✅ **Solution**: Call backend service APIs (maintain service boundaries)

❌ **No query complexity limit**: Allow arbitrary deep/expensive queries
✅ **Solution**: Configure max query depth và complexity limits

❌ **Expose internal models**: GraphQL types match database schema exactly
✅ **Solution**: Design GraphQL schema cho client needs, translate từ backend models

❌ **No caching**: Fetch same data multiple times
✅ **Solution**: Use DataLoaders (per-request caching) và consider Redis (cross-request caching)

---

## DataLoader Pattern

**Problem:**
```graphql
query {
  orders {         # 1 query: fetch 10 orders
    product {      # 10 queries: fetch product for each order (N+1 problem!)
      name
    }
  }
}
```

**Solution with DataLoader:**
- Collect all product IDs từ orders
- Batch fetch products trong one query
- Return products mapped by ID

**Result:** 2 queries thay vì 11 (1 + N)

---

## Configuration Example

```yaml
# GraphQL config
graphql:
  servlet:
    mapping: /graphql
    enabled: true
  playground:
    enabled: true
    mapping: /playground
  schema:
    printer:
      enabled: true
```

**Query complexity limits:**
```java
maxQueryDepth: 10           // Prevent deeply nested queries
maxQueryComplexity: 200     // Prevent expensive queries
```

---

## Common Use Cases

**Examples:**
- **E-commerce**: Product catalog với reviews, ratings, inventory
- **Social media**: User profiles với posts, comments, likes
- **Dashboard**: Aggregate data từ multiple services
- **Mobile apps**: Flexible queries để minimize network requests

---

## Monitoring

**Metrics to track:**
- Query execution time (P50, P95, P99)
- Query complexity distribution
- DataLoader hit rate (batch efficiency)
- Error rate per query/mutation
- Most frequently executed queries

**Alerts:**
- Slow queries (> threshold)
- High error rate
- Query complexity limit violations

---

## Security Considerations

**Authentication:**
- Verify JWT token trong resolver context
- Inject user info vào resolver arguments

**Authorization:**
- Check permissions trong resolvers (field-level)
- Filter results based on user permissions

**Query limits:**
- Max query depth, max complexity
- Rate limiting per user/IP

---

## References

- Coding rules: `java-springboot-gradle-rules.mdc` (GraphQL không trong Internal SDKs, tự config)
- GraphQL Java: https://www.graphql-java.com/
- DataLoader: https://github.com/graphql-java/java-dataloader
- Related: [05-anti-corruption-layer.md](05-anti-corruption-layer.md) cho service client pattern
