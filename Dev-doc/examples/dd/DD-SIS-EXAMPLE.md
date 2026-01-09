# DD-SIS - Detailed Design: Student Information System

> **Module**: SIS - Student Information System
> **Scope**: Student & Parent Management
> **Version**: 1.0
> **Last Updated**: 2025-12-22

---

## Mục lục

1. [HIGH-LEVEL DESIGN KEYPOINTS](#1-high-level-design-keypoints)
   - [1.1 Bối cảnh kinh doanh](#11-bối-cảnh-kinh-doanh-business-context)
   - [1.2 Các thành phần hệ thống](#12-các-thành-phần-hệ-thống-system-components)
   - [1.3 Workflow tổng quan](#13-workflow-tổng-quan)
   - [1.4 Các Actor chính](#14-các-actor-chính)
   - [1.5 External Systems](#15-external-systems)
   - [1.6 Operational Context](#16-operational-context)
2. [ARCHITECTURE & DESIGN DECISIONS](#2-architecture--design-decisions)
   - [2.1 Architecture Decisions](#21-architecture-decisions)
   - [2.2 Design Model Decisions](#22-design-model-decisions)
   - [2.3 Permission Mapping](#23-permission-mapping)
3. [SOURCE CODE](#3-source-code)
   - [3.1 Entity Definitions (Database Tables)](#31-entity-definitions-database-tables---critical)
   - [3.2 API Endpoints](#32-api-endpoints)
   - [3.3 Source Code Structure (DDD/Hexagonal)](#33-source-code-structure-dddhexagonal)
4. [WORKFLOWS](#4-workflows)
   - [4.1 Main Workflows](#41-main-workflows)
   - [4.2 State Machine](#42-state-machine)
   - [4.3 State Transition Table](#43-state-transition-table)
5. [EVENTS](#5-events)
   - [5.1 Event Catalog](#51-event-catalog)
   - [5.2 Kafka Topics](#52-kafka-topics)
   - [5.3 Message Structure](#53-message-structure)
   - [5.4 Consumer Groups](#54-consumer-groups)
   - [5.5 Cache Strategy](#55-cache-strategy)
   - [5.6 Event Processing Guarantees](#56-event-processing-guarantees)
6. [APPENDIX](#6-appendix)
   - [6.1 Business Rules](#61-business-rules)
   - [6.2 Constraints](#62-constraints)
   - [6.3 Performance Requirements](#63-performance-requirements)
   - [6.4 Glossary](#64-glossary)
   - [6.5 References](#65-references)

---

## 1. HIGH-LEVEL DESIGN KEYPOINTS

### 1.1 Bối cảnh kinh doanh (Business Context)

#### Tổng quan SIS

**SIS (Student Information System)** là module quản lý thông tin học sinh và phụ huynh trong hệ sinh thái giáo dục. SIS quản lý toàn bộ vòng đời của học sinh và phụ huynh từ khi tạo, kích hoạt, cho đến quản lý trạng thái.

| Thuộc tính | Giá trị | Mô tả                                                                 |
|------------|---------|-----------------------------------------------------------------------|
| **Vai trò chính** | Student, Parent | Hai vai trò được quản lý trong SIS                                    |
| **Loại học sinh** | Minor Student, Adult Learner | Học sinh nhỏ tuổi (cần phụ huynh) và người học trưởng thành (độc lập) |
| **Trạng thái** | PENDING_INVITATION, ACTIVE, INACTIVE, SUSPENDED | Vòng đời trạng thái của Student/Parent                                |
| **Multi-role** | Có | Một email có thể có nhiều vai trò (Student, Parent, Teacher, Admin)   |
| **Multi-tenant** | Có | Mỗi tenant có dữ liệu riêng biệt                                      |

**Scope hiện tại**: Quản lý Student và Parent với đầy đủ CRUD, bulk operations, import, và quản lý quan hệ Student-Parent.

#### Business Context Table

| Business Context | Tenant Type | Domain Access | Key Actions |
|-----------------|-------------|---------------|-------------|
| **School Management** | SOCIAL_PRIVATE_SCHOOL | READ WRITE | Tạo Student/Parent, Kích hoạt, Tạm ngưng, Import, Quản lý quan hệ Student-Parent |
| **Individual Teacher** | INDIVIDUAL | READ WRITE | Tạo Student/Parent (ít dùng cho giáo viên tự do) |

#### Minor Student vs Adult Learner

| Loại học sinh | is_minor | Parent Required | Activation Rule | Unlink Parent Rule |
|---------------|----------|-----------------|-----------------|-------------------|
| **Minor Student** | `true` | ✅ Bắt buộc | Không thể kích hoạt nếu chưa có phụ huynh | Không thể hủy liên kết sau khi kích hoạt |
| **Adult Learner** | `false` | ❌ Không bắt buộc | Có thể kích hoạt ngay | Có thể hủy liên kết bất kỳ lúc nào |

> **📌 Business Rule - Minor Student:**
> - Học sinh nhỏ tuổi (`is_minor = true`) **BẮT BUỘC** phải có phụ huynh trước khi kích hoạt.
> - Sau khi kích hoạt, không thể hủy liên kết phụ huynh.
> - Loại học sinh (`is_minor`) **không thể thay đổi** sau khi tạo.

#### Student-Parent Relationship Rules

| Rule | Description |
|------|-------------|
| **1 Student = MAX 1 Parent** | Mỗi học sinh chỉ có **tối đa 1 phụ huynh** |
| **1 Parent = NHIỀU Students** | Một phụ huynh có thể liên kết với **nhiều học sinh** (nhiều con) |
| **Relationship Types** | FATHER, MOTHER, GRANDFATHER, GRANDMOTHER, SIBLING, GUARDIAN, OTHER |
| **is_primary** | Luôn = `true` (chỉ có 1 phụ huynh chính) |

#### Multi-role Support

Hệ thống cho phép **một email có nhiều vai trò** trong cùng một tenant:

| Scenario                          | Behavior |
|-----------------------------------|----------|
| Email tồn tại vai trò **Student** | ❌ Không thể tạo Student khác với email này. Error: "Email already exists with role Student" |
| Email tồn tại vai trò **Parent**  | ❌ Không thể tạo Parent khác với email này. Error: "Email already exists with role Parent" |
| Email tồn tại vai trò **Teacher** | ✅ Có thể tạo Student/Parent với email này (multi-role). Hiển thị dialog xác nhận. |
| Email tồn tại vai trò **Admin**   | ✅ Có thể tạo Student/Parent với email này (multi-role). Hiển thị dialog xác nhận. |

**Key Rules:**
- Một email = **Một bản ghi** per role per tenant
- Một email ≠ **Nhiều bản ghi** trong **cùng role** trong **cùng tenant** ❌
- Một email = **Nhiều bản ghi** trong **khác role** trong **cùng tenant** ✅
- SSO account được **chia sẻ** giữa các role (cùng `sso_user_id`)

#### Isolation Model

- **Model**: POOLED (Multi-tenant shared database)
- **Tenant Isolation**: Filter by `tenant_id` in all queries
- **Data Separation**: Logical separation via `tenant_id` column
- **Unique Constraint**: `(email, tenant_id)` for Student and Parent tables

### 1.2 Các thành phần hệ thống (System Components)

#### Web Applications

| Layer | Component         | Technology | Mô tả |
|-------|-------------------|------------|-------|
| **WEB** | edu-sf-portal-web | ReactJS | Portal quản trị của SMS (SMP) - nơi quản lý học sinh/phụ huynh |
| **GRAPHQL** | edu-sf-graph      | Apollo GraphQL | BFF cho sf-portal-web và SMS Backend Services |

#### SMS Backend Microservices

| Service                        | Technology | Vai trò trong SIS |
|--------------------------------|------------|-------------------|
| **edu-sf-auth-client**         | NodeJS | Xác thực users truy cập SMP |
| **edu-sf-sis**                 | Java/SpringBoot | **Core SIS service** - quản lý thông tin học sinh/phụ huynh (CRUD, Status Management, Import) |
| **edu-sf-notification-client** | Java/SpringBoot | Gửi notification qua Kafka đến Notification Hub |

#### External Services

| Service | Technology | Vai trò trong SIS |
|---------|------------|-------------------|
| **edu-saas-control-identity** | Java/SpringBoot | Tạo tài khoản SSO cho học sinh/phụ huynh |
| **cp-notification-hub** | Java/SpringBoot | Gửi email welcome với link LMS |
| **Kafka (MSK)** | Apache Kafka | Event messaging giữa các services |

#### Consumer Services

| Service                           | Technology | Vai trò |
|-----------------------------------|------------|---------|
| **edu-saas-control-identity**     | Java/SpringBoot | Subscribe StudentActivatedEvent/ParentActivatedEvent để tạo SSO user, publish response event |
| **edu-sf-sis (response handler)** | Java/SpringBoot | Subscribe response events từ edu-saas-control-identity để cập nhật ssoUserId |
| **edu-sf-lms**                    | Java/SpringBoot | Subscribe StudentActivatedEvent để tạo LMS learner account |
| **edu-sf-notification**           | Java/SpringBoot | Subscribe Student/Parent events để gửi email notification |

### 1.3 Workflow tổng quan

#### Main Workflow Steps

**Create Student Workflow:**
1. **Tạo Student (DRAFT)**: Admin nhập thông tin học sinh (name, email, phone, is_minor, v.v.)
2. **Link Parent (Optional)**: Nếu `is_minor = true`, phải liên kết phụ huynh
3. **Activate**: Kích hoạt học sinh (tạo SSO account, gửi email)
4. **Manage Status**: Tạm ngưng, Kích hoạt lại, Xóa

**Import Students Workflow:**
1. **Upload File**: Admin upload file Excel/CSV (max 1000 rows)
2. **Validate All Rows**: Validate **TẤT CẢ** các dòng (all-or-nothing)
3. **Create in Transaction**: Nếu tất cả hợp lệ, tạo tất cả học sinh trong 1 transaction
4. **Return Result**: Trả về kết quả (success count, failure count, error details)

**Link Parent Workflow:**
1. **Search Parent**: Tìm phụ huynh có sẵn hoặc tạo mới
2. **Select Relationship**: Chọn mối quan hệ (FATHER, MOTHER, v.v.)
3. **Link**: Tạo bản ghi trong `student_parent` table

#### Workflow Characteristics

| Đặc điểm | Giá trị |
|----------|---------|
| **Synchronous** | Yes (REST APIs) |
| **Long-running** | Yes (Import workflow) |
| **Cross-tenant** | No (data isolated per tenant) |
| **Event-driven** | Yes (Kafka events) |
| **State Machine** | Yes (PENDING_INVITATION/ACTIVE/INACTIVE/SUSPENDED) |

### 1.4 Các Actor chính

#### User Actors

| Actor | Tenant Type | Role | Hành động chính |
|-------|-------------|------|----------------|
| **School Admin** | SOCIAL_PRIVATE_SCHOOL | TENANT_OWNER, ADMIN | Tạo, Tìm kiếm, Sửa, Kích hoạt, Tạm ngưng, Xóa Student/Parent. Import Student. Quản lý quan hệ Student-Parent |
| **Freelance Teacher** | INDIVIDUAL | TEACHER | Tạo, Tìm kiếm, Sửa, Kích hoạt, Tạm ngưng, Xóa Student/Parent. Import Student. Quản lý quan hệ Student-Parent |
| **Parent** | SOCIAL_PRIVATE_SCHOOL, INDIVIDUAL | PARENT | Xem thông tin học sinh của mình (read-only) |

### 1.5 External Systems

| System                         | Loại                 | Mục đích                                                                        | Integration Type      |
|--------------------------------|----------------------|---------------------------------------------------------------------------------|-----------------------|
| **Kafka (MSK)**                | Event Messaging      | Publish SIS lifecycle events (StudentActivatedEvent, StudentSuspendedEvent, etc.) | Async - Event Producer |
| **edu-saas-control-identity**  | SSO Service          | Get or Create Tenant User during activation                                     | Sync - REST API |
| **edu-sf-lms**                 | LMS Service          | Consume StudentActivatedEvent to create LMS learner account                     | Async - Event Consumer |
| **edu-sf-notification-client** | Notification Service | Consume Student/Parent events to send notification emails    | Async - Event Consumer |
| **ElaticSearch**               | Query                | Storage Student/Parent lists for performance, support Search                    | Sync - REST APIs      |

### 1.6 Operational Context

#### Deployment Model

- **Environment**: AWS ECS (Fargate)
- **Database**: AWS RDS PostgreSQL 15 (Multi-AZ)
- **Event Bus**: AWS MSK (Managed Streaming for Apache Kafka)
- **Cache**: AWS ElastiCache for Redis
- **Region**: ap-southeast-1 (Singapore)

#### Scalability Considerations

| Aspect | Strategy |
|--------|----------|
| **Horizontal Scaling** | Auto-scaling ECS tasks based on CPU/Memory |
| **Database Connection Pooling** | HikariCP with max pool size = 20 |
| **Caching** | Redis cache for Student/Parent list queries (TTL = 5 minutes) |
| **Event Processing** | Kafka consumer groups with multiple partitions |
| **Import Performance** | Max 1000 rows per file, batch insert with transaction |

---

## 2. ARCHITECTURE & DESIGN DECISIONS

### 2.1 Architecture Decisions

#### Why DDD (Domain-Driven Design)?

**Decision**: Sử dụng DDD với Hexagonal/Clean Architecture

**Rationale**:
- **Business Complexity**: Student/Parent management có nhiều business rules phức tạp (minor student rules, email uniqueness, multi-role, activation flow)
- **Domain Logic Isolation**: Tách biệt business logic khỏi infrastructure (database, REST, events)
- **Testability**: Domain layer có thể test độc lập mà không cần database hay frameworks
- **Long-term Maintainability**: Dễ dàng thay đổi infrastructure (VD: chuyển từ PostgreSQL sang MongoDB) mà không ảnh hưởng domain logic

**Key Benefits**:
| Benefit | Description |
|---------|-------------|
| **Ubiquitous Language** | Sử dụng ngôn ngữ chung giữa business và technical team (Student, Parent, Activation, Status) |
| **Bounded Context** | Student và Parent là 2 bounded contexts riêng biệt |
| **Rich Domain Model** | Business logic nằm trong Aggregate (StudentAggregate, ParentAggregate), không phải Anemic Model |
| **Dependency Inversion** | Domain layer không phụ thuộc vào infrastructure |

#### Why Hexagonal Architecture?

**Decision**: Sử dụng Ports & Adapters pattern

**Structure**:
```
Domain (Core Business Logic)
    ├── Ports (Interfaces)
    │   ├── Incoming Ports (Use Case Interfaces)
    │   └── Outgoing Ports (Repository Ports, External Service Ports)
    │
Application (Use Case Implementations)
    │
Adapters (Infrastructure)
    ├── In (REST Controllers)
    └── Out (Database, Kafka, SSO)
```

**Benefits**:
- **Flexibility**: Dễ dàng thay thế adapter (VD: REST → gRPC)
- **Testing**: Mock adapter để test domain logic
- **Clear Boundaries**: Rõ ràng về dependency direction (always point inward)

#### Why 2 Separate Sub-domains (Student & Parent)?

**Decision**: Tách Student và Parent thành **2 sub-domains riêng biệt**

**Alternatives Considered**:
1. ❌ **Single sub-domain "SIS"**: Student và Parent trong cùng 1 sub-domain
2. ✅ **2 separate sub-domains**: Student và Parent riêng biệt (CHOSEN)

**Rationale for 2 Sub-domains**:

| Reason | Explanation |
|--------|-------------|
| **Different Aggregates** | StudentAggregate ≠ ParentAggregate. Mỗi thằng có lifecycle và business rules riêng |
| **Different Bounded Contexts** | Student management context ≠ Parent management context |
| **Independent Evolution** | Student module có thể evolve độc lập với Parent module |
| **Clear Ownership** | Team Student quản lý student sub-domain, Team Parent quản lý parent sub-domain |
| **Easier Testing** | Test student logic riêng, test parent logic riêng |
| **Better Scalability** | Có thể scale student service và parent service riêng (nếu cần microservices sau này) |

**Relationship Modeling**:
- `student_parent` là **Entity** (không phải Aggregate)
- `student_parent` có **repository riêng** (StudentParentRepoPort)
- Được quản lý từ **cả 2 sub-domains** (Student có thể link parent, Parent có thể link student)

### 2.2 Design Model Decisions

#### BaseEntity with String Audit Fields

**Decision**: **Only JPA Entities** extend `BaseEntity` với `createdBy` và `updatedBy` là **String** (lưu username)

```java
// BaseEntity (in common library)
@MappedSuperclass
public abstract class BaseEntity {
    @Column(name = "created_by", length = 100, nullable = false)
    private String createdBy;   // String - lưu username của người tạo

    @Column(name = "updated_by", length = 100, nullable = false)
    private String updatedBy;   // String - lưu username của người cập nhật

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
```

**Rationale**:
- **HLD Original**: HLD định nghĩa `created_by BIGINT`, `updated_by BIGINT` (user ID)
- **Design Decision**: Chuyển sang **String** để lưu **username** thay vì user ID
- **Benefit**: Dễ dàng audit và debug (biết ai tạo/sửa mà không cần join với user table)
- **Trade-off**: Mất normalized form, nhưng gain audit clarity

**Application**:
- **StudentEntity (JPA) extends BaseEntity** ✅
- **ParentEntity (JPA) extends BaseEntity** ✅
- **StudentModel (Domain) does NOT extend BaseEntity** ❌
- **ParentModel (Domain) does NOT extend BaseEntity** ❌

**Why Domain Model doesn't extend BaseEntity:**
- Domain Model phải clean, không phụ thuộc vào JPA annotations
- Chỉ JPA Entity (PDM) extends BaseEntity để mapping với database

#### Search Pattern (POST /search)

**Decision**: Sử dụng **POST** cho search endpoint với **domain Query objects** mapping từ adapter Request DTOs

**Pattern**:
```java
// Adapter Request DTO (in adapters/infrastructure/in/rest/request/)
// Uses primitives (String, not Enum)
public class SearchStudentRequest {
    private String status;                    // String from JSON
    private String name;
    private String email;
    private List<String> statuses;            // String list from JSON
    private Boolean isMinor;
    private LocalDate createdAtFrom;
    private LocalDate createdAtTo;
    private PageRequestBase page;
}

// Domain Query Object (in domain/student/query/)
// Uses Enums for type safety
public class SearchStudentQuery {
    @Equal private StudentStatus status;      // Enum in domain
    @Like private String name;
    @Equal private String email;
    @In private Set<StudentStatus> statuses;  // Enum set in domain
    @Equal private Boolean isMinor;
    @Ge private LocalDate createdAtFrom;
    @Le private LocalDate createdAtTo;
    @Equal private Long tenantId;             // auto-injected from ThreadContext
    private PageRequestBase page;
}

// Mapping Flow
Handler maps SearchStudentRequest → SearchStudentQuery (String → Enum conversion)
```

**Rationale**:
- **Why POST not GET**: GET có limit URL length, không phù hợp với complex search criteria
- **Why separate Request vs Query**: Adapter uses primitives (String), Domain uses Enums for type safety
- **Why domain Query**: Search logic belongs to domain, not adapter
- **Annotations**: @Equal, @Like, @In, @Ge, @Le cho phép auto-generate SQL query

**Benefits**:
- **Type Safety**: Enum trong domain layer, String ở adapter boundary
- **Clean Boundaries**: Adapter không phụ thuộc vào domain objects
- **Reusability**: SearchStudentQuery có thể dùng ở nhiều nơi (API, batch job, report)
- **Clear Intent**: Annotation rõ ràng về search behavior

#### Aggregate Pattern (No Setters, Return This)

**Decision**: Aggregates không có setters, all state changes through business methods

**Pattern**:
```java
public class StudentAggregate {
    private StudentModel student;

    // ❌ NO SETTERS

    // ✅ Business methods that return this (fluent API)
    public StudentAggregate create(String name, String email, Boolean isMinor, ...) {
        this.student = new StudentModel();
        this.student.setStatus("PENDING_INVITATION");
        // ... set other fields
        return this;
    }

    public StudentAggregate activate(Long ssoUserId) {
        if (!this.student.getStatus().equals("PENDING_INVITATION")) {
            throw new InvalidStatusException();
        }
        if (this.student.getIsMinor() && !hasParent()) {
            throw new MinorRequiresParentException();
        }
        this.student.setStatus("ACTIVE");
        this.student.setSsoUserId(ssoUserId);
        return this;
    }

    public StudentAggregate suspend() {
        // business logic
        return this;
    }
}
```

**Rationale**:
- **Encapsulation**: State changes chỉ thông qua business methods (không ai set trực tiếp)
- **Validation**: Business rules được enforce trong methods
- **Fluent API**: Return `this` cho phép method chaining
- **Clear Intent**: Method name thể hiện business action (activate, suspend, not setStatus)

#### Repository Ports Pattern

**Decision**: Repository **ports** (interfaces) trong domain layer, **implementations** trong adapters

**Structure**:
```
domain/student/port/outgoing/
    └── StudentRepoPort.java (interface)

adapters/infrastructure/out/persistence/implement/
    └── StudentRepoAdapter.java (implements StudentRepoPort)
```

**Interface Example**:
```java
// Domain layer - Port
public interface StudentRepoPort {
    StudentModel save(StudentModel student);
    Optional<StudentModel> findById(Long id);
    Page<StudentModel> search(StudentQuery query, Pageable pageable);
    // ... other methods
}

// Adapter layer - Implementation
@Repository
public class StudentRepoAdapter implements StudentRepoPort {
    @Autowired
    private StudentJpaRepository jpaRepo;

    @Autowired
    private StudentMapper mapper;

    @Override
    public StudentModel save(StudentModel student) {
        StudentEntity entity = mapper.toEntity(student);
        entity = jpaRepo.save(entity);
        return mapper.toModel(entity);
    }
}
```

**Benefits**:
- **Dependency Inversion**: Domain không phụ thuộc vào JPA/Hibernate
- **Testability**: Dễ dàng mock repository trong unit test
- **Flexibility**: Có thể switch database (PostgreSQL → MongoDB) mà không ảnh hưởng domain

#### Domain Model (LDM) vs JPA Entity (PDM)

**Decision**: Tách biệt **Domain Model** (LDM) và **JPA Entity** (PDM)

**Structure**:
```
domain/student/model/
    └── StudentModel.java (LDM - domain logic)

adapters/infrastructure/out/persistence/entity/
    └── StudentEntity.java (PDM - JPA annotations)

adapters/infrastructure/out/persistence/mapper/
    └── StudentMapper.java (MapStruct mapper LDM ↔ PDM)
```

**Example**:
```java
// Domain Model (LDM) - does NOT extend BaseEntity
public class StudentModel {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    // ... no JPA annotations, no BaseEntity
}

// JPA Entity (PDM) - extends BaseEntity
@Entity
@Table(name = "student")
public class StudentEntity extends BaseEntity {  // Extends BaseEntity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", length = 100, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 100, nullable = false)
    private String lastName;

    @Column(name = "email", length = 255, nullable = false)
    private String email;

    // Audit fields (created_by, updated_by, created_at, updated_at) from BaseEntity
    // ... other JPA annotations
}

// Mapper (MapStruct)
@Mapper(componentModel = "spring")
public interface StudentPersistenceMapper {
    StudentModel toModel(StudentEntity entity);
    StudentEntity toEntity(StudentModel model);
}
```

**Benefits**:
- **Clean Domain**: Domain model không bị "nhiễm" JPA annotations
- **Flexibility**: Có thể thay đổi persistence strategy mà không ảnh hưởng domain
- **Clear Separation**: Rõ ràng về layer boundaries

### 2.3 Permission Mapping

#### Role-based Permissions for Student/Parent Management

**Roles**:
- **TENANT_OWNER**: Owner của trường (SOCIAL_PRIVATE_SCHOOL)
- **ADMIN**: Admin của trường
- **TEACHER**: Giáo viên (INDIVIDUAL hoặc SOCIAL_PRIVATE_SCHOOL)
- **PARENT**: Phụ huynh (read-only)
- **STUDENT**: Học sinh (read-only)

**Permission Matrix**:

| Action | TENANT_OWNER | ADMIN | TEACHER | PARENT | STUDENT |
|--------|--------------|-------|---------|--------|---------|
| **Search Students** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| **View Student Detail** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes (own children) | ✅ Yes (self) |
| **Create Student** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Update Student** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Activate Student** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Suspend Student** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Delete Student** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Import Students** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Link/Unlink Parent** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Search Parents** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| **View Parent Detail** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes (self) | ❌ No |
| **Create Parent** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Update Parent** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Activate Parent** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Suspend Parent** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Delete Parent** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ❌ No |

**Implementation**:
- **Spring Security**: `@PreAuthorize("hasAnyRole('TENANT_OWNER', 'ADMIN')")`
- **Custom Permission Checks**: Check ownership for Parent/Student viewing own data

---

## 3. SOURCE CODE

### 3.1 Entity Definitions (Database Tables) - CRITICAL

### 3.1.1 Bảng `student`

**Mục đích**: Lưu trữ thông tin học sinh trong hệ thống SIS.

**DDL:**

```sql
CREATE TABLE student (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL,
    student_code VARCHAR(50) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10),
    is_minor BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING_INVITATION',
    sso_user_id BIGINT,
    address TEXT,
    notes TEXT,

    -- Audit fields (String - lưu username)
    created_by VARCHAR(100) NOT NULL,
    updated_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    -- Email unique trong tenant (một email chỉ có 1 student per tenant)
    CONSTRAINT uq_student_email_tenant UNIQUE (email, tenant_id),

    -- Student code unique trong tenant
    CONSTRAINT uq_student_code_tenant UNIQUE (student_code, tenant_id),

    CONSTRAINT chk_student_status CHECK (status IN ('PENDING_INVITATION', 'ACTIVE', 'INACTIVE', 'SUSPENDED')),
    CONSTRAINT chk_student_gender CHECK (gender IN ('MALE', 'FEMALE', 'OTHER'))
);

-- Indexes
CREATE INDEX idx_student_tenant ON student(tenant_id);
CREATE INDEX idx_student_email ON student(email);
CREATE INDEX idx_student_phone ON student(tenant_id, phone);
CREATE INDEX idx_student_status ON student(status);
CREATE INDEX idx_student_sso_user ON student(sso_user_id);

-- Sequence helper table for student_code generation (per tenant)
CREATE TABLE student_code_seq (
    tenant_id BIGINT PRIMARY KEY,
    last_value BIGINT NOT NULL DEFAULT 0
);

-- Function to get next student_code sequence value for a tenant
CREATE OR REPLACE FUNCTION nextval_student_code(p_tenant_id BIGINT)
RETURNS BIGINT AS $$
DECLARE
    next_val BIGINT;
BEGIN
    INSERT INTO student_code_seq (tenant_id, last_value)
    VALUES (p_tenant_id, 1)
    ON CONFLICT (tenant_id) DO UPDATE
    SET last_value = student_code_seq.last_value + 1
    RETURNING last_value INTO next_val;

    RETURN next_val;
END;
$$ LANGUAGE plpgsql;

-- Comment
COMMENT ON TABLE student IS 'Bảng lưu trữ thông tin học sinh';
COMMENT ON COLUMN student.student_code IS 'Mã học sinh - auto-generated, format: STU-{tenant_id}-{sequence}, unique trong tenant';
COMMENT ON COLUMN student.first_name IS 'Tên học sinh';
COMMENT ON COLUMN student.last_name IS 'Họ học sinh';
COMMENT ON COLUMN student.email IS 'Email học sinh - unique trong tenant (UNIQUE constraint: email, tenant_id)';
COMMENT ON COLUMN student.phone IS 'Số điện thoại (E.164 format)';
COMMENT ON COLUMN student.is_minor IS 'true = Học sinh nhỏ tuổi (cần phụ huynh), false = Người học trưởng thành (default: false)';
COMMENT ON COLUMN student.status IS 'PENDING_INVITATION | ACTIVE | INACTIVE | SUSPENDED';
COMMENT ON COLUMN student.sso_user_id IS 'ID từ hệ thống SSO (edu-saas-control-identity), NULL cho đến khi activate';
COMMENT ON COLUMN student.address IS 'Địa chỉ học sinh';
COMMENT ON COLUMN student.notes IS 'Ghi chú';
COMMENT ON COLUMN student.created_by IS 'Username của người tạo (String)';
COMMENT ON COLUMN student.updated_by IS 'Username của người cập nhật cuối (String)';
```

**Business Rules:**
- `student_code`: Auto-generated với format `STU-{tenant_id}-{sequence}`, **unique trong tenant** (không unique toàn hệ thống)
- `email`: **Unique trong tenant** (một email chỉ có MỘT bản ghi Student trong tenant) - CONSTRAINT `UNIQUE (email, tenant_id)`
- `is_minor`: Không thể thay đổi sau khi tạo (immutable)
- `email`: Readonly sau khi status = ACTIVE (không cho phép đổi email sau activate)
- `sso_user_id`: NULL khi PENDING_INVITATION, được gán khi activate
- `created_by`, `updated_by`: Lưu username (String) thay vì user ID

---

### 3.1.2 Bảng `parent`

**Mục đích**: Lưu trữ thông tin phụ huynh trong hệ thống SIS.

**DDL:**

```sql
CREATE TABLE parent (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    relationship VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING_INVITATION',
    sso_user_id BIGINT,
    address TEXT,
    occupation VARCHAR(100),
    notes TEXT,

    -- Audit fields (String - lưu username)
    created_by VARCHAR(100) NOT NULL,
    updated_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    -- Email unique trong tenant (một email chỉ có 1 parent per tenant)
    CONSTRAINT uq_parent_email_tenant UNIQUE (email, tenant_id),

    CONSTRAINT chk_parent_status CHECK (status IN ('PENDING_INVITATION', 'ACTIVE', 'INACTIVE'))
);

-- Indexes
CREATE INDEX idx_parent_tenant ON parent(tenant_id);
CREATE INDEX idx_parent_email ON parent(email);
CREATE INDEX idx_parent_phone ON parent(tenant_id, phone);
CREATE INDEX idx_parent_status ON parent(status);
CREATE INDEX idx_parent_sso_user ON parent(sso_user_id);

-- Comment
COMMENT ON TABLE parent IS 'Bảng lưu trữ thông tin phụ huynh';
COMMENT ON COLUMN parent.first_name IS 'Tên phụ huynh';
COMMENT ON COLUMN parent.last_name IS 'Họ phụ huynh';
COMMENT ON COLUMN parent.email IS 'Email phụ huynh - unique trong tenant (UNIQUE constraint: email, tenant_id)';
COMMENT ON COLUMN parent.phone IS 'Số điện thoại (E.164 format)';
COMMENT ON COLUMN parent.relationship IS 'Quan hệ với học sinh (FATHER, MOTHER, GRANDFATHER, GRANDMOTHER, GUARDIAN, OTHER)';
COMMENT ON COLUMN parent.status IS 'PENDING_INVITATION | ACTIVE | INACTIVE';
COMMENT ON COLUMN parent.sso_user_id IS 'ID từ hệ thống SSO, NULL cho đến khi activate';
COMMENT ON COLUMN parent.address IS 'Địa chỉ phụ huynh';
COMMENT ON COLUMN parent.occupation IS 'Nghề nghiệp';
COMMENT ON COLUMN parent.notes IS 'Ghi chú';
COMMENT ON COLUMN parent.created_by IS 'Username của người tạo (String)';
COMMENT ON COLUMN parent.updated_by IS 'Username của người cập nhật cuối (String)';
```

**Business Rules:**
- `email`: **Unique trong tenant** (một email chỉ có MỘT bản ghi Parent trong tenant) - CONSTRAINT `UNIQUE (email, tenant_id)`
- `email`: Readonly sau khi status = ACTIVE
- `sso_user_id`: NULL khi PENDING_INVITATION, được gán khi activate
- Một phụ huynh có thể liên kết với NHIỀU học sinh (qua bảng `student_parent`)

---

### 3.1.3 Bảng `student_parent`

**Mục đích**: Bảng liên kết giữa Student và Parent (linking table).

**DDL:**

```sql
CREATE TABLE student_parent (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    parent_id BIGINT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES student(id),
    CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES parent(id),
    CONSTRAINT uq_student_parent UNIQUE (student_id, parent_id)
);

-- Indexes
CREATE INDEX idx_student_parent_student ON student_parent(student_id);
CREATE INDEX idx_student_parent_parent ON student_parent(parent_id);

-- Comment
COMMENT ON TABLE student_parent IS 'Bảng liên kết Student và Parent (mối quan hệ N-N, nhưng hiện tại giới hạn 1 parent cho mỗi student)';
COMMENT ON COLUMN student_parent.is_primary IS 'Đánh dấu phụ huynh chính (dự phòng cho tương lai nếu cần mở rộng multi-parent)';
```

**Business Rules:**
- Mỗi học sinh chỉ có TỐI ĐA 1 phụ huynh (enforced ở application layer, không phải database constraint)
- Một phụ huynh có thể có NHIỀU học sinh (nhiều con học cùng trường)
- `relationship`: Được lưu trong bảng `parent` (KHÔNG lưu trong bảng liên kết này)
- `is_primary`: Mặc định = false, dự phòng cho tương lai nếu cần mở rộng multi-parent
- KHÔNG có audit fields (created_by, updated_by, updated_at) - chỉ có `created_at` để tracking
- Xóa học sinh hoặc phụ huynh sẽ tự động xóa liên kết (do foreign key constraint)

**Validation Rules khi Unlink:**
| Loại học sinh | Status học sinh | Cho phép Unlink? |
|---------------|-----------------|------------------|
| Trưởng thành | Any | ✅ Yes |
| Nhỏ tuổi | PENDING_INVITATION | ✅ Yes |
| Nhỏ tuổi | ACTIVE | ❌ No - Học sinh nhỏ tuổi đã kích hoạt bắt buộc phải có phụ huynh |
| Nhỏ tuổi | INACTIVE | ✅ Yes |
| Nhỏ tuổi | SUSPENDED | ✅ Yes |

---

### 3.1.4 Bảng `student_import` (Import Batch Metadata)

**Mục đích**: Lưu thông tin batch import học sinh (metadata + statistics). Dữ liệu tạm thời, xóa sau khi import thành công.

**US Reference**: US-SIS-004-NEW - Import học sinh từ file Excel/CSV

**DDL:**

```sql
CREATE TABLE student_import (
    -- Primary Key
    id BIGSERIAL PRIMARY KEY,

    -- Batch Info
    batch_id VARCHAR(50) NOT NULL UNIQUE,              -- UUID string, unique identifier
    tenant_id BIGINT NOT NULL,                         -- Multi-tenant isolation (internal only)

    -- File Info
    file_name VARCHAR(255) NOT NULL,                   -- Tên file Excel/CSV
    file_type VARCHAR(10) NOT NULL,                    -- 'EXCEL' or 'CSV'

    -- Batch Status
    batch_status VARCHAR(30) NOT NULL,                 -- UPLOADED, VALIDATING, VALIDATED, PREVIEWING, IMPORTING, COMPLETED, FAILED
    batch_expires_at TIMESTAMP NOT NULL,               -- TTL 15 minutes từ khi validate

    -- Statistics (tự động tính từ student_import_detail)
    total_rows INTEGER DEFAULT 0,                      -- Tổng số dòng trong file
    valid_rows INTEGER DEFAULT 0,                      -- Số dòng hợp lệ (validation_status = VALID)
    invalid_rows INTEGER DEFAULT 0,                    -- Số dòng lỗi (validation_status = INVALID)
    duplicate_email_count INTEGER DEFAULT 0,           -- Số dòng có email trùng trong file

    -- Import Result Summary
    imported_students INTEGER DEFAULT 0,               -- Số học sinh đã import thành công
    imported_parents INTEGER DEFAULT 0,                -- Số phụ huynh đã import thành công

    -- Audit
    created_by VARCHAR(100) NOT NULL,                  -- Username người tạo
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT chk_import_batch_status CHECK (batch_status IN ('UPLOADED', 'VALIDATING', 'VALIDATED', 'PREVIEWING', 'IMPORTING', 'COMPLETED', 'FAILED')),
    CONSTRAINT chk_import_file_type CHECK (file_type IN ('EXCEL', 'CSV'))
);

-- Indexes
CREATE UNIQUE INDEX idx_import_batch_id ON student_import(batch_id);
CREATE INDEX idx_import_tenant ON student_import(tenant_id);
CREATE INDEX idx_import_status ON student_import(batch_status);
CREATE INDEX idx_import_expires ON student_import(batch_expires_at) WHERE batch_status IN ('VALIDATED', 'PREVIEWING');
CREATE INDEX idx_import_created ON student_import(created_at DESC);

-- Comments
COMMENT ON TABLE student_import IS 'Bảng lưu thông tin batch import học sinh (metadata + statistics). Xóa sau khi import thành công';
COMMENT ON COLUMN student_import.batch_id IS 'UUID string identifier cho batch, dùng cho toàn bộ lifecycle (validate → preview → confirm)';
COMMENT ON COLUMN student_import.tenant_id IS 'Tenant ID để isolate data (multi-tenant). Không trả ra API response, chỉ dùng internal';
COMMENT ON COLUMN student_import.batch_expires_at IS 'TTL 15 phút từ khi validate, để tự động cleanup dữ liệu cũ';
COMMENT ON COLUMN student_import.total_rows IS 'Tổng số dòng trong file (tính từ student_import_detail)';
COMMENT ON COLUMN student_import.valid_rows IS 'Số dòng hợp lệ (validation_status = VALID trong student_import_detail)';
COMMENT ON COLUMN student_import.invalid_rows IS 'Số dòng lỗi (validation_status = INVALID trong student_import_detail)';
COMMENT ON COLUMN student_import.duplicate_email_count IS 'Số dòng có email bị trùng trong cùng batch';
```

**Business Rules:**
- `batch_id`: UUID string, dùng cho toàn bộ workflow (validate → preview → confirm)
- `batch_expires_at`: TTL 15 phút, auto cleanup bởi cron job
- Statistics columns: Tự động tính từ `student_import_detail` sau validation
- Xóa batch → CASCADE delete tất cả rows trong `student_import_detail`
- Xóa toàn bộ batch sau khi import thành công (status = COMPLETED)

**Retention Policy:**
- VALIDATED/PREVIEWING: Xóa sau 1 giờ nếu không confirm
- FAILED: Xóa sau 24 giờ (keep for debugging)
- UPLOADED: Xóa sau 2 giờ nếu không validate
- COMPLETED: Xóa ngay sau khi import thành công

---

### 3.1.5 Bảng `student_import_detail` (Import Row Data)

**Mục đích**: Lưu chi tiết từng dòng Excel của batch import + validation result. CASCADE DELETE khi xóa batch.

**US Reference**: US-SIS-004-NEW - Import học sinh từ file Excel/CSV

**DDL:**

```sql
CREATE TABLE student_import_detail (
    -- Primary Key
    id BIGSERIAL PRIMARY KEY,

    -- Foreign Key to student_import
    batch_id VARCHAR(50) NOT NULL,                     -- FK to student_import.batch_id (CASCADE DELETE)

    -- Row Info
    row_number INTEGER NOT NULL,                       -- Số dòng trong file (bắt đầu từ 2, row 1 là header)

    -- ===== DATA FROM EXCEL (10 columns) =====
    student_name VARCHAR(200),
    student_email VARCHAR(255),
    student_phone VARCHAR(20),
    is_minor BOOLEAN,
    date_of_birth DATE,
    gender VARCHAR(10),
    parent_name VARCHAR(200),
    parent_email VARCHAR(255),
    parent_phone VARCHAR(20),
    parent_relationship VARCHAR(50),

    -- ===== VALIDATION RESULT (4 columns - SIMPLIFIED) =====
    validation_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',  -- PENDING, VALID, INVALID
    error_count INTEGER DEFAULT 0,                    -- Số lượng lỗi trong row này
    duplicate_email BOOLEAN DEFAULT false,            -- true nếu email bị trùng trong cùng batch
    error_summary TEXT,                               -- Danh sách error codes: "ERR_REQUIRED, ERR_EMAIL_FORMAT, ..."

    -- ===== IMPORT RESULT (4 columns) =====
    student_id BIGINT,                                -- ID của student sau khi import thành công (NULL nếu chưa import)
    parent_id BIGINT,                                 -- ID của parent sau khi import thành công
    is_new_parent BOOLEAN,                            -- true = tạo mới parent, false = link với parent hiện có
    is_multi_role BOOLEAN DEFAULT false,              -- true = email đã có vai trò khác (Teacher/Admin)

    -- Audit (không cần created_by vì đã có ở student_import)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT chk_detail_validation_status CHECK (validation_status IN ('PENDING', 'VALID', 'INVALID')),
    CONSTRAINT fk_detail_batch FOREIGN KEY (batch_id) REFERENCES student_import(batch_id) ON DELETE CASCADE,
    CONSTRAINT fk_detail_student FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE SET NULL,
    CONSTRAINT fk_detail_parent FOREIGN KEY (parent_id) REFERENCES parent(id) ON DELETE SET NULL,
    CONSTRAINT uk_detail_batch_row UNIQUE (batch_id, row_number)  -- Unique row number per batch
);

-- Indexes
CREATE INDEX idx_detail_batch_id ON student_import_detail(batch_id);
CREATE INDEX idx_detail_validation_status ON student_import_detail(batch_id, validation_status);
CREATE INDEX idx_detail_email ON student_import_detail(student_email) WHERE validation_status = 'VALID';
CREATE INDEX idx_detail_error_count ON student_import_detail(batch_id, error_count) WHERE error_count > 0;
CREATE INDEX idx_detail_duplicate_email ON student_import_detail(batch_id, duplicate_email) WHERE duplicate_email = true;

-- Comments
COMMENT ON TABLE student_import_detail IS 'Bảng lưu chi tiết từng dòng Excel của batch import. CASCADE DELETE khi xóa student_import';
COMMENT ON COLUMN student_import_detail.batch_id IS 'FK to student_import.batch_id, CASCADE DELETE khi xóa batch';
COMMENT ON COLUMN student_import_detail.row_number IS 'Số dòng trong file Excel/CSV (row 1 = header, data bắt đầu từ row 2)';
COMMENT ON COLUMN student_import_detail.duplicate_email IS 'true nếu student_email bị trùng với row khác trong cùng batch';
COMMENT ON COLUMN student_import_detail.error_summary IS 'Danh sách error codes cách nhau bởi dấu phẩy, VD: "ERR_REQUIRED, ERR_EMAIL_FORMAT, ERR_PARENT_INCOMPLETE"';
```

**Business Rules:**
- `batch_id`: FK to `student_import`, CASCADE DELETE khi xóa batch
- `row_number`: UNIQUE per batch (CONSTRAINT `UNIQUE (batch_id, row_number)`)
- `validation_status`: PENDING → VALID/INVALID sau validation
- `duplicate_email`: true nếu `student_email` trùng với row khác trong cùng batch
- `error_summary`: Danh sách error codes, format: "ERR_CODE1, ERR_CODE2, ..."
- `student_id`, `parent_id`: NULL cho đến khi import thành công (confirm step)

**Validation Error Codes (12 types):**

| Error Code | Description | Validation Rule |
|------------|-------------|-----------------|
| ERR_REQUIRED | Thiếu trường bắt buộc | student_name, student_email, is_minor |
| ERR_EMAIL_FORMAT | Email không đúng định dạng | RFC 5322 format |
| ERR_EMAIL_DUPLICATE_FILE | Email trùng trong file | Check duplicate in batch (set duplicate_email = true) |
| ERR_EMAIL_EXISTS | Email đã tồn tại trong DB | Check student table (tenant_id + email) |
| ERR_PHONE_FORMAT | SĐT không đúng format | Vietnam phone: 0xxxxxxxxx (10 digits) |
| ERR_DATE_FORMAT | Ngày sinh không đúng format | Valid date format |
| ERR_DATE_FUTURE | Ngày sinh là tương lai | date_of_birth <= today |
| ERR_GENDER_INVALID | Giới tính không hợp lệ | Must be: Nam, Nữ, Khác |
| ERR_IS_MINOR_INVALID | is_minor không hợp lệ | Must be: true/false |
| ERR_PARENT_INCOMPLETE | Info phụ huynh không đầy đủ | If any parent field → must have parent_name AND parent_email |
| ERR_RELATIONSHIP_REQUIRED | Thiếu mối quan hệ | If parent_email exists → must have parent_relationship |
| ERR_RELATIONSHIP_INVALID | Mối quan hệ không hợp lệ | Must be: Cha, Mẹ, Ông, Bà, Người giám hộ, Khác |

**Workflow:**

```
1. POST /api/v1/students/import/validate
   - Generate batch_id (UUID)
   - INSERT student_import (batch info)
   - BULK INSERT student_import_detail (all rows)
   - Validate each row → UPDATE error_summary
   - UPDATE student_import statistics
   - Return batch_id

2. POST /api/v1/students/import/preview
   - Validate batch_id, check expires_at
   - Load first 100 valid rows
   - Return preview data

3. POST /api/v1/students/import/confirm
   - BEGIN TRANSACTION
   - Insert students + parents
   - UPDATE student_import_detail (student_id, parent_id)
   - COMMIT
   - DELETE student_import (CASCADE delete details)
```

**Cleanup Strategy (Cron Job):**

```sql
-- Job 1: Cleanup expired batches (run every 30 minutes)
DELETE FROM student_import
WHERE batch_expires_at < NOW() - INTERVAL '1 hour'
  AND batch_status IN ('VALIDATED', 'PREVIEWING');

-- Job 2: Cleanup old failed imports (run daily)
DELETE FROM student_import
WHERE batch_status = 'FAILED'
  AND created_at < NOW() - INTERVAL '24 hours';

-- Job 3: Cleanup orphan rows (uploaded but never validated)
DELETE FROM student_import
WHERE batch_status = 'UPLOADED'
  AND created_at < NOW() - INTERVAL '2 hours';
```

---

### 3.1.6 Auto-Generated Code Logic

**Student Code Generation:

Format: `STU-{tenant_id}-{sequence}` (unique trong tenant)

Example: `STU-1-00001`, `STU-1-00002`, `STU-2-00001`

```java
// domain/student/service/StudentDomainService.java
public String generateStudentCode(Long tenantId) {
    // Get next sequence for tenant using PostgreSQL function
    Long nextSeq = studentRepo.getNextSequenceForTenant(tenantId);
    // Format: STU-{tenantId}-{seq padded to 5 digits}
    return String.format("STU-%d-%05d", tenantId, nextSeq);
}
```

**Repository Implementation:**

```java
// domain/student/port/outgoing/StudentRepoPort.java (Port interface)
public interface StudentRepoPort {
    Long getNextSequenceForTenant(Long tenantId);
    // ... other methods
}

// adapters/infrastructure/out/persistence/repository/StudentJpaRepository.java
@Repository
public interface StudentJpaRepository extends JpaRepository<StudentEntity, Long> {

    @Query(value = "SELECT nextval_student_code(:tenantId)", nativeQuery = true)
    Long getNextSequenceForTenant(@Param("tenantId") Long tenantId);
}

// adapters/infrastructure/out/persistence/implement/StudentRepoAdapter.java
@Repository
public class StudentRepoAdapter implements StudentRepoPort {

    private final StudentJpaRepository jpaRepo;

    @Override
    public Long getNextSequenceForTenant(Long tenantId) {
        return jpaRepo.getNextSequenceForTenant(tenantId);
    }
}
```

**How It Works:**

1. Function `nextval_student_code(tenant_id)` được định nghĩa trong Section 3.1.1
2. Function sử dụng bảng `student_code_seq` để track sequence per tenant
3. `ON CONFLICT ... DO UPDATE` đảm bảo thread-safe (atomic operation)
4. Return next sequence value cho tenant

**Advantages:**

| Advantage | Description |
|-----------|-------------|
| **Thread-safe** | PostgreSQL function với ON CONFLICT đảm bảo atomic operation |
| **Per-tenant sequence** | Mỗi tenant có sequence riêng, reset từ 1 |
| **No gaps** | Không bị gaps khi rollback transaction (vì sequence được generate trong transaction) |
| **Performance** | Fast lookup với PRIMARY KEY trên tenant_id |

---

### 3.1.7 Multi-role Email Support

**Thiết kế Multi-role:**

Một email có thể tồn tại đồng thời ở NHIỀU vai trò (Student, Parent, Teacher, Admin) trong cùng tenant, nhưng mỗi vai trò chỉ có MỘT bản ghi **trong tenant**.

**Unique Constraints theo Tenant:**

| Bảng | Unique Constraint | Mô tả |
|------|------------------|-------|
| `student` | `UNIQUE (email, tenant_id)` | Một email chỉ có **1 student** per tenant |
| `parent` | `UNIQUE (email, tenant_id)` | Một email chỉ có **1 parent** per tenant |
| `teacher` | `UNIQUE (email, tenant_id)` | Một email chỉ có **1 teacher** per tenant |
| `admin` | `UNIQUE (email, tenant_id)` | Một email chỉ có **1 admin** per tenant |

**Example trong cùng tenant_id = 1:**
- Email `john@example.com` có thể là:
  - 1 bản ghi trong bảng `student` (tenant_id = 1)
  - 1 bản ghi trong bảng `parent` (tenant_id = 1)
  - 1 bản ghi trong bảng `teacher` (tenant_id = 1)

**Example cross-tenant:**
- Email `john@example.com` có thể là:
  - 1 bản ghi Student trong tenant_id = 1
  - 1 bản ghi Student trong tenant_id = 2
  - 1 bản ghi Parent trong tenant_id = 1
  - v.v.

**Validation Rules:**
- ❌ **KHÔNG cho phép**: Email tạo **2 student** trong **cùng tenant** (vi phạm UNIQUE constraint)
- ❌ **KHÔNG cho phép**: Email tạo **2 parent** trong **cùng tenant** (vi phạm UNIQUE constraint)
- ✅ **Cho phép**: Email là **student** và **parent** trong **cùng tenant** (multi-role)
- ✅ **Cho phép**: Email là **student** trong **nhiều tenant** (cross-tenant)

**SSO Integration:**
- SSO sẽ tạo MỘT tài khoản với email
- SSO tài khoản có thể có NHIỀU vai trò (multi-role)
- Khi activate Student/Parent, gọi SSO API: `GetOrCreateTenantUser` để lấy/tạo `sso_user_id`

---

## 3.2 API Endpoints

### Base Configuration

**Student APIs:**

| Config | Value |
|--------|-------|
| **Base URL** | `/api/v1/students` |
| **Authentication** | Bearer JWT Token |
| **Tenant Isolation** | Header `x-tenant-id` |

**Parent APIs:**

| Config | Value |
|--------|-------|
| **Base URL** | `/api/v1/parents` |
| **Authentication** | Bearer JWT Token |
| **Tenant Isolation** | Header `x-tenant-id` |

#### Required Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Authorization` | String | Yes | Bearer {jwt_token} |
| `x-tenant-id` | Long | Yes | Tenant identifier |
| `x-request-url` | String | Yes | Frontend request URL |
| `Content-Type` | String | Yes | application/json |

#### Common Response Format

##### Base Response

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Thao tác thành công",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {}
}
```

| Field | Type | Description |
|-------|------|-------------|
| `code` | String | Response code: SUCCESS, ERROR |
| `messageKey` | String | Message key định nghĩa trong US |
| `messageCode` | String | Message code BE định nghĩa theo US |
| `messageValue` | String | Nội dung message |
| `timestamp` | String | ISO 8601 timestamp |
| `data` | Object | Response data |

##### Base Page Response

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Success",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "hasContent": true,
    "number": 0,
    "size": 20,
    "numberOfElements": 10,
    "first": true,
    "last": false,
    "hasNext": true,
    "hasPrevious": false,
    "totalPages": 5,
    "totalElements": 100,
    "content": []
  }
}
```

### Common Error Codes

| HTTP Code | Error Code | Message | US Reference |
|-----------|------------|---------|--------------|
| 401 | AUTH-401 | Authentication failed | Common |
| 403 | AUTH-403 | No permission | Common |
| 400 | SIS-400-001 | Validation error | Common |
| 404 | SIS-404-001 | Resource not found | Common |
| 422 | SIS-422-001 | Email already exists with role Student | US-SIS-003 AC-3 |
| 422 | SIS-422-002 | Email already exists with role Parent | US-SIS-005 AC-3 |
| 422 | SIS-422-003 | Cannot activate minor student without parent | US-SIS-001 AC-10 |
| 422 | SIS-422-004 | Cannot change email after activation | US-SIS-008 AC-3 |
| 422 | SIS-422-005 | Cannot change student type (is_minor) | US-SIS-008 AC-4 |
| 422 | SIS-422-006 | Student already has parent | US-SIS-006 AC-2.3 |
| 422 | SIS-422-007 | Cannot unlink parent from active minor student | US-SIS-006 AC-2.5 |
| 422 | SIS-422-008 | Import file exceeds max 1000 rows | US-SIS-004 AC-3 |

---

### Tổng hợp API Endpoints

| # | Type | Method | Endpoint | In Tasks? | In DD? | US Reference | Notes |
|---|------|--------|----------|-----------|--------|--------------|-------|
| 1 | Student | POST | `/api/v1/students/search` | ✅ | ✅ | US-SIS-001 | Match |
| 2 | Student | GET | `/api/v1/students/export` | ✅ | ✅ | US-SIS-001 | Match |
| 3 | Student | POST | `/api/v1/students/activate/bulk` | ✅ | ✅ | US-SIS-001 | Match |
| 4 | Student | POST | `/api/v1/students/resend-email/bulk` | ✅ | ✅ | US-SIS-001 | Match |
| 5 | Student | POST | `/api/v1/students/suspend/bulk` | ✅ | ✅ | US-SIS-001 | Match |
| 6 | Student | POST | `/api/v1/students/inactive/bulk` | ✅ | ✅ | US-SIS-001 | Match |
| 7 | Student | POST | `/api/v1/students/reactivate/bulk` | ✅ | ✅ | US-SIS-001 | Match |
| 8 | Student | DELETE | `/api/v1/students/bulk` | ✅ | ✅ | US-SIS-001 | Match |
| 9 | Student | POST | `/api/v1/students` | ✅ | ✅ | US-SIS-003 | Match |
| 10 | Student | GET | `/api/v1/students/import/template` | ✅ | ✅ | US-SIS-004 | Match |
| 11 | Student | POST | `/api/v1/students/import/validate` | ✅ | ✅ | US-SIS-004 | Match |
| 12 | Student | POST | `/api/v1/students/import/preview` | ✅ | ✅ | US-SIS-004 | Match |
| 13 | Student | POST | `/api/v1/students/import/confirm` | ✅ | ✅ | US-SIS-004 | Match |
| 14 | Student | GET | `/api/v1/students/{id}` | ✅ | ✅ | US-SIS-006 | Match |
| 15 | Student | POST | `/api/v1/students/{id}/history` | ✅ | ✅ | US-SIS-006 | Match |
| 16 | Student | POST | `/api/v1/students/{id}/courses` | ✅ | ✅ | US-SIS-006 | Match |
| 17 | Student | POST | `/api/v1/students/{id}/activities` | ✅ | ✅ | US-SIS-006 | Match |
| 18 | Student | PUT | `/api/v1/students/{id}` | ✅ | ✅ | US-SIS-008, US-SIS-010 | Match (update + link/unlink flows) |
| 19 | Parent | POST | `/api/v1/parents/search` | ✅ | ✅ | US-SIS-002 | Match |
| 20 | Parent | GET | `/api/v1/parents/export` | ✅ | ✅ | US-SIS-002 | Match |
| 21 | Parent | POST | `/api/v1/parents/activate/bulk` | ✅ | ✅ | US-SIS-002 | Match |
| 22 | Parent | POST | `/api/v1/parents/resend-email/bulk` | ✅ | ✅ | US-SIS-002 | Match |
| 23 | Parent | POST | `/api/v1/parents/suspend/bulk` | ✅ | ✅ | US-SIS-002 | Match |
| 24 | Parent | POST | `/api/v1/parents/inactive/bulk` | ✅ | ✅ | US-SIS-002 | Match |
| 25 | Parent | POST | `/api/v1/parents/reactivate/bulk` | ✅ | ✅ | US-SIS-002 | Match |
| 26 | Parent | DELETE | `/api/v1/parents/bulk` | ✅ | ✅ | US-SIS-002 | Match |
| 27 | Parent | POST | `/api/v1/parents` | ✅ | ✅ | US-SIS-005 | Match |
| 28 | Parent | GET | `/api/v1/parents/{id}` | ✅ | ✅ | US-SIS-007 | Match |
| 29 | Parent | POST | `/api/v1/parents/{id}/history` | ✅ | ✅ | US-SIS-007 | Match |
| 30 | Parent | POST | `/api/v1/parents/{id}/activities` | ✅ | ✅ | US-SIS-007 | Match |
| 31 | Parent | PUT | `/api/v1/parents/{id}` | ✅ | ✅ | US-SIS-009, US-SIS-010 | Match (update + link/unlink flows) |


**Notes:**
- All endpoints require headers: `x-tenant-id`, `x-request-url`, `Authorization`
- Search endpoints (POST /search) return `BasePageResponse<T>`
- Write operations (CREATE/UPDATE/DELETE) return `BaseResponse<T>` where T contains ID only
- Read operations (GET) return full entity details

---

### Enum Definitions

**Note:** Enums are used in the **Domain layer** (Models, Commands, Queries) for type safety. They are stored as **VARCHAR** in the database and converted to/from **String** at adapter boundaries (Request DTOs accept String from JSON).

#### StudentStatus

```java
// domain/student/model/StudentStatus.java
public enum StudentStatus {
    PENDING_INVITATION,  // Chờ kích hoạt
    ACTIVE,              // Đang hoạt động
    INACTIVE,            // Tạm ngưng
    SUSPENDED            // Đình chỉ
}
```

#### ParentStatus

```java
// domain/parent/model/ParentStatus.java
public enum ParentStatus {
    PENDING_INVITATION,  // Chờ kích hoạt
    ACTIVE,              // Đang hoạt động
    INACTIVE             // Tạm ngưng
}
```

#### Gender

```java
// domain/shared/model/Gender.java
public enum Gender {
    MALE,    // Nam
    FEMALE,  // Nữ
    OTHER    // Khác
}
```

#### Relationship

```java
// domain/student/model/Relationship.java
public enum Relationship {
    FATHER,        // Bố
    MOTHER,        // Mẹ
    GRANDFATHER,   // Ông
    GRANDMOTHER,   // Bà
    SIBLING,       // Anh/Chị/Em
    GUARDIAN,      // Người giám hộ
    OTHER          // Khác
}
```

**Conversion at Boundaries:**

- **Adapter Request DTOs:** Accept `String` from JSON (e.g., `"ACTIVE"`)
- **Handler → Domain Command/Query:** Convert `String → Enum` when mapping
- **Domain Layer:** Use `Enum` types in Models, Commands, Queries
- **Database:** Store as `VARCHAR` (e.g., `'ACTIVE'`)
- **Adapter Response DTOs:** Convert `Enum → String` for JSON serialization

---

### 3.2.1 Student API Endpoints

#### 3.2.1.1 POST /api/v1/students/search

**US Reference:** US-SIS-001 (AC-1) | **Permissions:** `STUDENT_VIEW`

**Description:** Tìm kiếm danh sách học sinh.

**Architecture Flow:**

```
Controller → Handler.execute(request, tenantId)
Handler: maps Request → SearchStudentQuery (domain query)
Handler: calls DomainService.search(query)
DomainService: calls RepoPort.search(query)
Handler: returns Page<StudentRes>
Controller: wraps in BasePageResponse
```

**Request (Adapter DTO):**

```java
// adapters/infrastructure/in/rest/request/SearchStudentRequest.java
public class SearchStudentRequest {
    private String status;
    private String name;  // Search in first_name OR last_name
    private String email;
    private List<String> statuses;
    private Boolean isMinor;
    private LocalDate createdAtFrom;
    private LocalDate createdAtTo;

    @NotNull
    private PageRequestBase page = new PageRequestBase();
}
```

**Domain Query:**

```java
// domain/student/query/SearchStudentQuery.java
public class SearchStudentQuery {
    @Equal private StudentStatus status;           // Enum in domain layer
    @Like private String name;
    @Equal private String email;
    @In private Set<StudentStatus> statuses;       // Enum set
    @Equal private Boolean isMinor;
    @Ge private LocalDate createdAtFrom;
    @Le private LocalDate createdAtTo;
    @Equal private Long tenantId;  // Auto-injected from header
}
```

**Response:**

```java
// adapters/infrastructure/out/dto/StudentRes.java
public class StudentRes {
    private Long id;
    private String studentCode;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;  // MALE, FEMALE, OTHER
    private Boolean isMinor;
    private String status;  // PENDING_INVITATION, ACTIVE, INACTIVE, SUSPENDED
    private Long ssoUserId;
    private String address;
    private String notes;
    private Long parentPrimary;        // ID of primary parent (nullable)
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

**JSON Request Example:**

```json
{
  "status": "ACTIVE",
  "name": "John",
  "email": "john.doe@example.com",
  "statuses": ["ACTIVE", "PENDING_INVITATION"],
  "isMinor": true,
  "createdAtFrom": "2024-01-01",
  "createdAtTo": "2024-12-31",
  "page": {
    "page": 0,
    "size": 20,
    "sort": "createdAt,desc"
  }
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Success",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "hasContent": true,
    "number": 0,
    "size": 20,
    "numberOfElements": 1,
    "first": true,
    "last": true,
    "hasNext": false,
    "hasPrevious": false,
    "totalPages": 1,
    "totalElements": 1,
    "content": [
      {
        "id": 1,
        "studentCode": "STU-123-00001",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "+84901234567",
        "dateOfBirth": "2010-05-15",
        "gender": "MALE",
        "isMinor": true,
        "status": "ACTIVE",
        "ssoUserId": 5001,
        "address": "123 Main Street, Hanoi",
        "notes": "Excellent student",
        "parentPrimary": 10,
        "createdBy": "admin@school.edu",
        "updatedBy": "admin@school.edu",
        "createdAt": "2024-01-15T10:30:00",
        "updatedAt": "2024-01-20T14:45:00"
      }
    ]
  }
}
```

**Business Logic:**

1. Validate headers
2. Map Request → Domain Query (inject tenantId)
3. Repository converts annotations → SQL (WHERE tenant_id = ?)
4. Return Page<StudentRes>

**Events:** None

---

#### 3.2.1.2 GET /api/v1/students/export

**US Reference:** US-SIS-001 (Export) | **Permissions:** `STUDENT_VIEW`

**Description:** Export danh sách học sinh ra file Excel/CSV.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| format | String | No | Export format: `excel` or `csv` (default: excel) |
| status | String | No | Filter by status |
| isMinor | Boolean | No | Filter by is_minor |
| All search filters | Various | No | Same as search endpoint |

**Response:** File download

**Content-Type:**
- Excel: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- CSV: `text/csv; charset=utf-8`

**File Name Pattern:**
- Excel: `students_export_{timestamp}.xlsx`
- CSV: `students_export_{timestamp}.csv`

**Business Logic:**

1. Extract tenantId from ThreadContext
2. Apply same filters as search endpoint
3. Load ALL matching students (no pagination)
4. Generate Excel/CSV with columns:
   - Student Code
   - First Name
   - Last Name
   - Email
   - Phone
   - Date of Birth
   - Gender
   - Is Minor
   - Status
   - Created At
   - Updated At
5. Stream file to response

**Error Cases:**

| Case | HTTP | Error Code |
|------|------|------------|
| Too many records (>10,000) | 422 | SIS-422-014 |
| Export format invalid | 400 | SIS-400-003 |

**Events:** None

**Implementation Notes:**
- Use Apache POI for Excel generation
- Use OpenCSV for CSV generation
- Stream response to avoid memory issues
- Set max export limit to 10,000 records

**Note:** Query parameters sử dụng tương tự như POST /students/search. Response là file download (Excel hoặc CSV), không phải JSON.

---

#### 3.2.1.9 POST /api/v1/students

**US Reference:** US-SIS-003 (AC-1, AC-2, AC-3) | **Permissions:** `STUDENT_MANAGE`

**Description:** Tạo học sinh mới (status = PENDING_INVITATION).

**Request (Adapter DTO):**

```java
public class CreateStudentRequest {
    @NotBlank @Size(max = 100) private String firstName;
    @NotBlank @Size(max = 100) private String lastName;
    @NotBlank @Email private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;                         // String in adapter (from JSON)
    @NotNull private Boolean isMinor;
    private String address;
    private String notes;

    // Parent linking (REQUIRED if isMinor = true)
    private Long parentId;                          // Option 1: Link to existing parent
    private CreateParentRequest parentInfo;         // Option 2: Create new parent
}

// Nested DTO for creating parent
public class CreateParentRequest {
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    @NotBlank @Email private String email;
    private String phone;
    @NotBlank private String relationship;          // FATHER, MOTHER, GUARDIAN, etc.
    private String occupation;
    private String address;
    private String notes;
}
```

**Domain Command:**

```java
// domain/student/command/CreateStudentCommand.java
public class CreateStudentCommand {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private Gender gender;                         // Enum in domain layer
    private Boolean isMinor;
    private String address;
    private String notes;
    // tenantId, createdBy auto-injected from ThreadContext (aeh-security-common)
}
```

**Architecture Flow:**

```
Controller → Handler.execute(request, tenantId, username)
Handler: maps Request → CreateStudentCommand
Handler: calls StudentDomainService.create(command)
DomainService:
  - Check email uniqueness (RepoPort.existsByEmailAndTenantId)
  - Check multi-role
  - Generate student_code (STU-{tenantId}-{seq})
  - Create Aggregate
  - Save
  - Publish StudentCreatedEvent
Handler: returns StudentRes
Controller: wraps in BaseResponse (201)
```

**Business Logic:**

1. **Validate parent requirement (NEW):**
   - If `isMinor = true` → MUST have `parentId` OR `parentInfo`
   - If neither provided → Error SIS-422-020
   - If both provided → Error SIS-400-004 (conflict)

2. **Handle parent linking:**
   - **Option A - Link existing parent (`parentId`):**
     - Validate parent exists in same tenant
     - Create student_parent link
   - **Option B - Create new parent (`parentInfo`):**
     - Check parent email uniqueness
     - Create parent with status = PENDING_INVITATION
     - Create student_parent link with new parent ID

3. Check email uniqueness within STUDENT role (US-SIS-003 AC-3)
4. If exists → Error SIS-422-001
5. If email exists with OTHER roles → Allow (multi-role)
6. Generate student_code
7. Set status = PENDING_INVITATION
8. Save student & create student_parent link (transaction)
9. Query parentPrimary ID from student_parent table (where is_primary = true)
10. Return response with studentId and parentPrimary

**Error Cases:**

| Case | HTTP | Error Code |
|------|------|------------|
| Minor without parent info | 422 | SIS-422-020 |
| Both parentId and parentInfo provided | 400 | SIS-400-004 |
| Parent not found (invalid parentId) | 404 | SIS-404-002 |
| Parent email exists (when creating) | 422 | SIS-422-001 |
| Student email exists (same role) | 422 | SIS-422-001 |
| Validation error | 400 | SIS-400-001 |

**Events:** None

**JSON Request Example (Case 1 - Link to existing parent):**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+84901234567",
  "dateOfBirth": "2010-05-15",
  "gender": "MALE",
  "isMinor": true,
  "address": "123 Main Street, Hanoi",
  "notes": "Excellent student with strong math skills",
  "parentId": 10
}
```

**JSON Request Example (Case 2 - Create new parent):**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+84901234567",
  "dateOfBirth": "2010-05-15",
  "gender": "MALE",
  "isMinor": true,
  "address": "123 Main Street, Hanoi",
  "notes": "Excellent student with strong math skills",
  "parentInfo": {
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "+84909876543",
    "relationship": "MOTHER",
    "occupation": "Teacher",
    "address": "123 Main Street, Hanoi",
    "notes": "Caring parent"
  }
}
```

**JSON Request Example (Case 3 - Adult learner, no parent needed):**

```json
{
  "firstName": "Nguyen Van",
  "lastName": "Hung",
  "email": "nguyenvanhung@example.com",
  "phone": "+84912345678",
  "dateOfBirth": "1995-03-20",
  "gender": "MALE",
  "isMinor": false,
  "address": "456 Street XYZ, HCMC",
  "notes": "Adult learner"
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Student created successfully",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "id": 1,
    "parentPrimary": 10
  }
}
```

**Note:**
- `parentPrimary` will be `null` if the student is not a minor or has no primary parent
- `parentPrimary` is computed from the `student_parent` table (where `is_primary = true`), not stored in the student table

**Note:** To get full student details, call `GET /api/v1/students/{id}` after creation.

---

#### 3.2.1.14 GET /api/v1/students/{id}

**US Reference:** US-SIS-006 (AC-1.1) | **Permissions:** `STUDENT_VIEW`

**Response:**

```java
public class StudentDetailRes {
    private Long id;
    private String studentCode;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;
    private Boolean isMinor;
    private String status;
    private Long ssoUserId;
    private String address;
    private String notes;
    private Long parentPrimary;        // ID of primary parent (nullable)
    private List<ParentInfo> parents;  // List of linked parents
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

public class ParentInfo {
    private Long id;
    private Boolean isPrimary;  // From student_parent table
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String relationship;
    private String status;
}
```

**Business Logic:**

1. Find student by ID and tenantId
2. Load ALL linked parents from student_parent table (JOIN with parent table)
3. For each parent, include isPrimary field from student_parent table
4. Set `parentPrimary` = ID of parent where `isPrimary = true` (null if no primary parent)
5. Return StudentDetailRes with list of parents and parentPrimary

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Success",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "id": 1,
    "studentCode": "STU-123-00001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+84901234567",
    "dateOfBirth": "2010-05-15",
    "gender": "MALE",
    "isMinor": true,
    "status": "ACTIVE",
    "ssoUserId": 5001,
    "address": "123 Main Street, Hanoi",
    "notes": "Excellent student",
    "parentPrimary": 10,
    "parents": [
      {
        "id": 10,
        "isPrimary": true,
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane.doe@example.com",
        "phone": "+84909876543",
        "relationship": "MOTHER",
        "status": "ACTIVE"
      },
      {
        "id": 11,
        "isPrimary": false,
        "firstName": "John",
        "lastName": "Doe Sr.",
        "email": "john.sr@example.com",
        "phone": "+84909876544",
        "relationship": "FATHER",
        "status": "ACTIVE"
      }
    ],
    "createdBy": "admin@school.edu",
    "updatedBy": "admin@school.edu",
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-20T14:45:00"
  }
}
```

---

#### 3.2.1.15 POST /api/v1/students/{id}/history

**US Reference:** US-SIS-006 (View History) | **Permissions:** `STUDENT_VIEW`

**Description:** Xem lịch sử thay đổi của học sinh.

**Request:**

```java
public class StudentHistoryRequest {
    private LocalDate fromDate;
    private LocalDate toDate;
    private List<String> eventTypes; // CREATED, ACTIVATED, UPDATED, SUSPENDED, etc.

    @NotNull
    private PageRequestBase page = new PageRequestBase();
}
```

**Response:**

```java
public class StudentHistoryRes {
    private Long studentId;
    private String studentName;
    private List<HistoryEvent> events;
    private PageInfo pageInfo;
}

public class HistoryEvent {
    private Long id;
    private String eventType;
    private String eventDescription;
    private String performedBy; // username
    private LocalDateTime performedAt;
    private Map<String, Object> changes; // before/after values
}
```

**Business Logic:**

1. Load student by ID and tenantId (verify access)
2. Filter by date range and event types
3. Return paginated history

**Event Types:**

| Event Type | Description |
|------------|-------------|
| STUDENT_CREATED | Student record created |
| STUDENT_ACTIVATED | Student activated (SSO created) |
| STUDENT_UPDATED | Profile updated |
| STUDENT_SUSPENDED | Account suspended |
| STUDENT_REACTIVATED | Account reactivated |
| STUDENT_INACTIVATED | Account Inactivated |
| STUDENT_DELETED | Record deleted |
| PARENT_LINKED | Parent linked to student |
| PARENT_UNLINKED | Parent unlinked from student |

**Error Cases:**

| Case | HTTP | Error Code |
|------|------|------------|
| Student not found | 404 | SIS-404-001 |

**Events:** None (read-only)

**Implementation Notes:**
- Cache recent history for 5 minutes (Redis)

**JSON Request Example:**

```json
{
  "fromDate": "2024-01-01",
  "toDate": "2024-12-31",
  "eventTypes": ["STUDENT_CREATED", "STUDENT_UPDATED", "STUDENT_ACTIVATED"],
  "page": {
    "page": 0,
    "size": 20,
    "sort": "performedAt,desc"
  }
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Success",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "hasContent": true,
    "number": 0,
    "size": 20,
    "numberOfElements": 2,
    "first": true,
    "last": true,
    "hasNext": false,
    "hasPrevious": false,
    "totalPages": 1,
    "totalElements": 2,
    "content": [
      {
        "id": 101,
        "eventType": "STUDENT_ACTIVATED",
        "eventDescription": "Student account activated and SSO account created",
        "performedBy": "admin@school.edu",
        "performedAt": "2024-06-15T10:30:00",
        "changes": {
          "status": {
            "before": "PENDING_INVITATION",
            "after": "ACTIVE"
          },
          "ssoUserId": {
            "before": null,
            "after": 5001
          }
        }
      },
      {
        "id": 100,
        "eventType": "STUDENT_CREATED",
        "eventDescription": "Student record created",
        "performedBy": "admin@school.edu",
        "performedAt": "2024-06-15T09:00:00",
        "changes": {
          "firstName": "Nguyễn Văn",
          "lastName": "A",
          "email": "nguyenvana@example.com",
          "status": "PENDING_INVITATION"
        }
      }
    ]
  }
}
```

---

#### 3.2.1.16 POST /api/v1/students/{id}/courses

**US Reference:** US-SIS-006 (View Courses) | **Permissions:** `STUDENT_VIEW`

**Description:** Xem danh sách khóa học của học sinh.

**Request:**

```java
public class StudentCoursesRequest {
    private String status; // ENROLLED, COMPLETED, DROPPED
    private LocalDate enrolledFrom;
    private LocalDate enrolledTo;

    @NotNull
    private PageRequestBase page = new PageRequestBase();
}
```

**Response:**

```java
public class StudentCoursesRes {
    private Long studentId;
    private String studentName;
    private List<CourseEnrollment> enrollments;
    private PageInfo pageInfo;
}

public class CourseEnrollment {
    private Long enrollmentId;
    private Long courseId;
    private String courseCode;
    private String courseName;
    private String status; // ENROLLED, COMPLETED, DROPPED
    private LocalDate enrolledAt;
    private LocalDate completedAt;
    private Integer progress; // 0-100%
    private String teacherName;
}
```

**Business Logic:**

1. Load student by ID and tenantId (verify access)
2. Query sf-lms service for student enrollments
3. Filter by status and date range
4. Return paginated courses

**Integration:**
- Call sf-lms REST API: GET /api/v1/lms/students/{ssoUserId}/enrollments
- Map ssoUserId from student record

**Error Cases:**

| Case | HTTP | Error Code |
|------|------|------------|
| Student not found | 404 | SIS-404-001 |
| Student not activated (no ssoUserId) | 422 | SIS-422-018 |
| LMS service unavailable | 503 | SIS-503-001 |

**Events:** None (read-only)

**Implementation Notes:**
- Use Feign client to call LMS service
- Cache course list for 2 minutes (Redis)
- Handle LMS service timeout (5s)

**JSON Request Example:**

```json
{
  "status": "ENROLLED",
  "enrolledFrom": "2024-01-01",
  "enrolledTo": "2024-12-31",
  "page": {
    "page": 0,
    "size": 20,
    "sort": "enrolledAt,desc"
  }
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Success",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "hasContent": true,
    "number": 0,
    "size": 20,
    "numberOfElements": 2,
    "first": true,
    "last": true,
    "hasNext": false,
    "hasPrevious": false,
    "totalPages": 1,
    "totalElements": 2,
    "content": [
      {
        "enrollmentId": 501,
        "courseId": 101,
        "courseCode": "MATH-101",
        "courseName": "Toán học nâng cao lớp 8",
        "status": "ENROLLED",
        "enrolledAt": "2024-09-01",
        "completedAt": null,
        "progress": 45,
        "teacherName": "Nguyễn Thị Lan"
      },
      {
        "enrollmentId": 502,
        "courseId": 102,
        "courseCode": "ENG-101",
        "courseName": "Tiếng Anh giao tiếp cơ bản",
        "status": "ENROLLED",
        "enrolledAt": "2024-09-01",
        "completedAt": null,
        "progress": 60,
        "teacherName": "Trần Văn Minh"
      }
    ]
  }
}
```

---

#### 3.2.1.17 POST /api/v1/students/{id}/activities

**US Reference:** US-SIS-006 (View Activities) | **Permissions:** `STUDENT_VIEW`

**Description:** Xem lịch sử hoạt động của học sinh trong hệ thống.

**Request:**

```java
public class StudentActivitiesRequest {
    private LocalDate fromDate;
    private LocalDate toDate;
    private List<String> activityTypes; // LOGIN, COURSE_ACCESS, ASSIGNMENT_SUBMIT, etc.

    @NotNull
    private PageRequestBase page = new PageRequestBase();
}
```

**Response:**

```java
public class StudentActivitiesRes {
    private Long studentId;
    private String studentName;
    private List<Activity> activities;
    private PageInfo pageInfo;
}

public class Activity {
    private Long id;
    private String activityType;
    private String activityDescription;
    private LocalDateTime activityTime;
    private String ipAddress;
    private String deviceType;
    private Map<String, Object> metadata;
}
```

**Business Logic:**

1. Load student by ID and tenantId (verify access)
2. Query activity log from:
   - sf-lms (learning activities)
   - sf-auth (login activities)
3. Merge and sort by timestamp
4. Filter by date range and activity types
5. Return paginated activities

**Activity Types:**

| Activity Type | Source | Description |
|--------------|--------|-------------|
| LOGIN | sf-auth | User logged in |
| LOGOUT | sf-auth | User logged out |
| COURSE_ACCESS | sf-lms | Accessed course |
| LESSON_COMPLETE | sf-lms | Completed lesson |
| ASSIGNMENT_SUBMIT | sf-lms | Submitted assignment |
| QUIZ_ATTEMPT | sf-lms | Attempted quiz |
| PROFILE_UPDATE | sf-sis | Updated profile |

**Error Cases:**

| Case | HTTP | Error Code |
|------|------|------------|
| Student not found | 404 | SIS-404-001 |
| Student not activated | 422 | SIS-422-018 |

**Events:** None (read-only)

**Implementation Notes:**
- Aggregate from multiple services
- Use async calls with CompletableFuture
- Cache for 1 minute (Redis)

**JSON Request Example:**

```json
{
  "fromDate": "2024-12-01",
  "toDate": "2024-12-31",
  "activityTypes": ["LOGIN", "COURSE_ACCESS", "ASSIGNMENT_SUBMIT"],
  "page": {
    "pageNumber": 0,
    "pageSize": 20,
    "sortBy": "activityTime",
    "sortDirection": "DESC"
  }
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Success",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "hasContent": true,
    "number": 0,
    "size": 20,
    "numberOfElements": 3,
    "first": true,
    "last": true,
    "hasNext": false,
    "hasPrevious": false,
    "totalPages": 1,
    "totalElements": 3,
    "content": [
      {
        "id": 301,
        "activityType": "ASSIGNMENT_SUBMIT",
        "activityDescription": "Submitted assignment: Bài tập Toán học tuần 5",
        "activityTime": "2024-12-15T14:30:00",
        "ipAddress": "42.118.123.45",
        "deviceType": "Desktop",
        "metadata": {
          "courseId": 101,
          "assignmentId": 201,
          "score": 95
        }
      },
      {
        "id": 300,
        "activityType": "COURSE_ACCESS",
        "activityDescription": "Accessed course: Toán học nâng cao lớp 8",
        "activityTime": "2024-12-15T10:00:00",
        "ipAddress": "42.118.123.45",
        "deviceType": "Desktop",
        "metadata": {
          "courseId": 101,
          "duration": 45
        }
      },
      {
        "id": 299,
        "activityType": "LOGIN",
        "activityDescription": "User logged in",
        "activityTime": "2024-12-15T09:55:00",
        "ipAddress": "42.118.123.45",
        "deviceType": "Desktop",
        "metadata": {}
      }
    ]
  }
}
```

---

#### 3.2.1.18 PUT /api/v1/students/{id}

**US Reference:** US-SIS-008 (all ACs) | **Permissions:** `STUDENT_MANAGE`

**Request:**

```java
public class UpdateStudentRequest {
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    // NO email (cannot change)
    // NO isMinor (cannot change)
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String notes;

    // Parent mapping/unmapping (optional)
    private ParentMappingRequest parents;
}

public class ParentMappingRequest {
    private List<Long> mappingIds;    // Parent IDs to link
    private List<Long> unMappingIds;  // Parent IDs to unlink
}
```

**Business Logic:**

1. email **READONLY** after activation (US-SIS-008 AC-2, AC-3)
2. isMinor **READONLY** always (US-SIS-008 AC-4)
3. Update basic fields (firstName, lastName, phone, etc.)
4. **Handle parent mapping/unmapping (if provided):**
   - **mappingIds**: Link student to these parents
     - Validate parent exists and belongs to same tenant
     - Create student_parent records
   - **unMappingIds**: Unlink student from these parents
     - Delete student_parent records
   - Both operations can be done in same request
5. Query parentPrimary ID from student_parent table (where is_primary = true)
6. Return response with studentId and parentPrimary

**Events:** None

**JSON Request Example (Basic update without parent changes):**

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+84901234568",
  "dateOfBirth": "2010-05-15",
  "gender": "MALE",
  "address": "456 New Address, Hanoi",
  "notes": "Updated student information"
}
```

**JSON Request Example (Update with parent mapping/unmapping):**

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+84901234568",
  "dateOfBirth": "2010-05-15",
  "gender": "MALE",
  "address": "456 New Address, Hanoi",
  "notes": "Updated student information",
  "parents": {
    "mappingIds": [15, 16],
    "unMappingIds": [10]
  }
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Student updated successfully",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "id": 1,
    "parentPrimary": 15
  }
}
```

**Note:**
- `parentPrimary` reflects the current primary parent after any mapping/unmapping operations
- `parentPrimary` will be `null` if the student has no primary parent after the update
- To get full student details, call `GET /api/v1/students/{id}` after update

---

#### 3.2.1.3 POST /api/v1/students/activate/bulk

**US Reference:** US-SIS-001 (AC-9, AC-10, AC-11) | **Permissions:** `STUDENT_MANAGE`

**Request:**

```java
public class BulkActivateStudentRequest {
    @NotEmpty private List<Long> studentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}
```

**Business Logic:**

1. For each student:
   - Check status = PENDING_INVITATION
   - If is_minor = true: check parent exists (US-SIS-001 AC-10)
   - Call SSO: GetOrCreateTenantUser
   - Update sso_user_id
   - Set status = ACTIVE
   - Publish StudentActivatedEvent

**Error Cases (per student):**

| Case | Error Code |
|------|------------|
| Minor without parent | SIS-422-003 |
| Already activated | SIS-422-012 |

**Events:** StudentActivatedEvent (per student)

**JSON Request Example:**

```json
{
  "studentIds": [1, 2, 3, 4, 5]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk activation completed with 3 successes and 2 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 3,
    "failureCount": 2,
    "errors": [
      {
        "studentId": 2,
        "errorCode": "SIS-422-003",
        "errorMessage": "Minor student must have a parent linked"
      },
      {
        "studentId": 4,
        "errorCode": "SIS-422-012",
        "errorMessage": "Student already activated"
      }
    ]
  }
}
```

---

#### 3.2.1.4 POST /api/v1/students/resend-email/bulk

**US Reference:** US-SIS-001 (Resend Email) | **Permissions:** `STUDENT_MANAGE`

**Description:** Gửi lại email kích hoạt cho học sinh.

**Request:**

```java
public class BulkResendEmailRequest {
    @NotEmpty private List<Long> studentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}

public class ErrorDetail {
    private Long studentId;
    private String errorCode;
    private String errorMessage;
}
```

**Business Logic:**

For each student:
1. Load student by ID and tenantId
2. Validate status = ACTIVE or PENDING_INVITATION
3. If status = PENDING_INVITATION:
   - Send invitation email with activation link
4. If status = ACTIVE:
   - Send welcome email with LMS link
5. Publish StudentEmailResentEvent

**Error Cases (per student):**

| Case | Error Code |
|------|------------|
| Student not found | SIS-404-001 |
| Invalid status (INACTIVE/SUSPENDED) | SIS-422-015 |
| Email send failed | SIS-500-002 |

**Events:** StudentEmailResentEvent (per student)

**Rate Limiting:** Max 100 students per request

**JSON Request Example:**

```json
{
  "studentIds": [1, 2, 3, 4, 5]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk operation completed with 3 successes and 2 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 3,
    "failureCount": 2,
    "errors": [
      {
        "studentId": 2,
        "errorCode": "SIS-404-001",
        "errorMessage": "Student not found"
      },
      {
        "studentId": 4,
        "errorCode": "SIS-422-015",
        "errorMessage": "Invalid status for resending email"
      }
    ]
  }
}
```

---

#### 3.2.1.5 POST /api/v1/students/inactive/bulk

**US Reference:** US-SIS-001 (AC-12) | **Permissions:** `STUDENT_MANAGE`

**Description:** Tạm ngưng tài khoản học sinh (có thể khôi phục).

**Request:**

```java
public class BulkInactivatedStudentRequest {
    @NotEmpty private List<Long> studentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}
```

**Business Logic:**

For each student:
1. Load student by ID and tenantId
2. Validate status = ACTIVE
3. Set status = INACTIVE
4. Disable SSO account temporarily
5. Publish StudentInactivatedEvent

**Error Cases (per student):**

| Case | Error Code |
|------|------------|
| Student not found | SIS-404-001 |
| Invalid status (not ACTIVE) | SIS-422-019 |

**Events:** StudentInactivatedEvent (per student)

**JSON Request Example:**

```json
{
  "studentIds": [1, 2, 3]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk operation completed with 2 successes and 1 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 2,
    "failureCount": 1,
    "errors": [
      {
        "studentId": 3,
        "errorCode": "SIS-422-019",
        "errorMessage": "Student is not in ACTIVE status"
      }
    ]
  }
}
```

---

#### 3.2.1.6 POST /api/v1/students/suspend/bulk

**US Reference:** US-SIS-001 (Suspend) | **Permissions:** `STUDENT_MANAGE`

**Description:** Chấm dứt vĩnh viễn tài khoản học sinh (không thể khôi phục).

**Request:**

```java
public class BulkSuspendStudentRequest {
    @NotEmpty private List<Long> studentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}
```

**Business Logic:**

For each student:
1. Load student by ID and tenantId
2. Validate status = ACTIVE or INACTIVE
3. Set status = SUSPENDED
4. Disable SSO account (call SSO API)
5. Remove from all active courses (publish event to LMS)
6. Publish StudentSuspendEvent

**Validation Rules:**

| Current Status | Can Inactive? |
|---------------|---------------|
| PENDING_INVITATION | ❌ No - Use DELETE instead |
| ACTIVE | ✅ Yes |
| INACTIVE | ✅ Yes |
| SUSPENDED | ❌ Already Inactivated |

**Error Cases (per student):**

| Case                           | Error Code |
|--------------------------------|------------|
| Cannot Suspend pending student | SIS-422-016 |
| Already Suspend                | SIS-422-017 |

**Events:** StudentInactivatedEvent

**Important Notes:**
- Inactivated students CANNOT be reactivated
- Different from DELETE (which removes record)
- Different from SUSPENDED (which is temporary)
- SSO account is permanently disabled

**JSON Request Example:**

```json
{
  "studentIds": [1, 2, 3]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk operation completed with 2 successes and 1 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 2,
    "failureCount": 1,
    "errors": [
      {
        "studentId": 3,
        "errorCode": "SIS-422-016",
        "errorMessage": "Cannot Suspend student with PENDING_INVITATION status"
      }
    ]
  }
}
```

---

#### 3.2.1.7 POST /api/v1/students/reactivate/bulk

**US Reference:** US-SIS-001 (AC-13) | **Permissions:** `STUDENT_MANAGE`

**Description:** Kích hoạt lại tài khoản học sinh đã bị tạm ngưng.

**Request:**

```java
public class BulkReactivateStudentRequest {
    @NotEmpty private List<Long> studentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}
```

**Business Logic:**

For each student:
1. Load student by ID and tenantId
2. Validate status = SUSPENDED or INACTIVE
3. Set status = ACTIVE
4. Re-enable SSO account
5. Publish StudentReactivatedEvent

**Error Cases (per student):**

| Case | Error Code |
|------|------------|
| Student not found | SIS-404-001 |
| Invalid status (not SUSPENDED/INACTIVE) | SIS-422-020 |
| Cannot reactivate INACTIVATED | SIS-422-021 |

**Events:** StudentReactivatedEvent (per student)

**JSON Request Example:**

```json
{
  "studentIds": [1, 2, 3]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk operation completed with 2 successes and 1 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 2,
    "failureCount": 1,
    "errors": [
      {
        "studentId": 3,
        "errorCode": "SIS-422-021",
        "errorMessage": "Cannot reactivate Inactivated student"
      }
    ]
  }
}
```

---

#### 3.2.1.8 DELETE /api/v1/students/bulk

**US Reference:** US-SIS-001 (AC-14, AC-15) | **Permissions:** `STUDENT_MANAGE`

**Description:** Xóa vĩnh viễn học sinh (chỉ cho phép xóa khi status = PENDING_INVITATION).

**Request:**

```java
public class BulkDeleteStudentRequest {
    @NotEmpty private List<Long> studentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}
```

**Business Logic:**

For each student:
1. Load student by ID and tenantId
2. Validate status = PENDING_INVITATION (US-SIS-001 AC-15)
3. Hard delete from database

**Error Cases (per student):**

| Case | Error Code |
|------|------------|
| Student not found | SIS-404-001 |
| Cannot delete (status != PENDING_INVITATION) | SIS-422-022 |

**Events:** None

**Important Note:** Only students with PENDING_INVITATION status can be deleted. For other statuses, use INACTIVE instead.

**JSON Request Example:**

```json
{
  "studentIds": [1, 2, 3]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk operation completed with 2 successes and 1 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 2,
    "failureCount": 1,
    "errors": [
      {
        "studentId": 3,
        "errorCode": "SIS-422-022",
        "errorMessage": "Cannot delete student with status other than PENDING_INVITATION"
      }
    ]
  }
}
```

---

#### 3.2.1.10 GET /api/v1/students/import/template

**US Reference:** US-SIS-004 AC-1 | **Permissions:** `STUDENT_MANAGE`

**Description:** Download Excel/CSV template for import.

**Response:** File download (application/vnd.ms-excel or text/csv)

**File Name Pattern:**
- Excel: `student_import_template.xlsx`
- CSV: `student_import_template.csv`

**Template Columns:**

| Column | Type | Required | Example |
|--------|------|----------|---------|
| first_name | String | Yes | Nguyen Van |
| last_name | String | Yes | A |
| email | String | Yes | student@example.com |
| phone | String | No | +84901234567 |
| date_of_birth | Date | No | 2010-05-15 |
| gender | String | No | MALE |
| is_minor | Boolean | Yes | true |
| address | String | No | 123 ABC Street |
| notes | String | No | New student |

**Business Logic:**

1. Generate template file with header row
2. Include 1 sample row with example data
3. Stream file to response

**Events:** None

**Note:** Response là file download (Excel hoặc CSV), không phải JSON. File chứa template với header row và 1 sample row để hướng dẫn user.

---

#### 3.2.1.11 POST /api/v1/students/import/validate

**US Reference:** US-SIS-004 AC-2, AC-3, AC-4 | **Permissions:** `STUDENT_MANAGE`

**Description:** Validate import file without creating records.

**Request:**

```java
public class ValidateImportRequest {
    @NotNull private MultipartFile file;
}
```

**Response:**

```java
public class ValidateImportResultRes {
    private Integer totalRows;
    private Integer validRows;
    private Integer invalidRows;
    private List<RowError> errors;
    private String validationToken; // for preview step
}

public class RowError {
    private Integer rowNumber;
    private String field;
    private String errorCode;
    private String errorMessage;
}
```

**Business Logic:**

1. Validate file format (Excel/CSV)
2. Validate max 1000 rows (US-SIS-004 AC-3)
3. Parse all rows
4. Validate all fields per row:
   - first_name: required, max 100 chars
   - last_name: required, max 100 chars
   - email: required, RFC 5322 format
   - phone: optional, Vietnam phone format
   - date_of_birth: optional, not future date
   - gender: optional, enum (MALE, FEMALE, OTHER)
   - is_minor: required, boolean
   - address: optional, max 255 chars
   - notes: optional, max 500 chars
5. Check email duplicates WITHIN file (US-SIS-004 AC-4)
6. Check email uniqueness in DB (within STUDENT role)
7. Generate validation token (JWT or UUID)
8. Cache validation result with token (TTL 15 minutes)
9. Return all errors if any

**Error Cases:**

| Case | HTTP | Error Code |
|------|------|------------|
| Invalid format | 422 | SIS-422-011 |
| Exceeds 1000 rows | 422 | SIS-422-008 |
| Duplicate in file | 422 | SIS-422-010 |
| Field validation failed | 422 | SIS-422-009 |

**Events:** None

**JSON Request Example:**

Request sử dụng `multipart/form-data` với file upload:

```
POST /api/v1/students/import/validate
Content-Type: multipart/form-data

file: students_import.xlsx
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Validation completed",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "totalRows": 150,
    "validRows": 147,
    "invalidRows": 3,
    "validationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "errors": [
      {
        "rowNumber": 5,
        "field": "email",
        "errorCode": "SIS-422-009",
        "errorMessage": "Email format invalid"
      },
      {
        "rowNumber": 12,
        "field": "email",
        "errorCode": "SIS-422-010",
        "errorMessage": "Duplicate email in file (row 5)"
      },
      {
        "rowNumber": 45,
        "field": "dateOfBirth",
        "errorCode": "SIS-422-009",
        "errorMessage": "Date of birth cannot be in the future"
      }
    ]
  }
}
```

---

#### 3.2.1.12 POST /api/v1/students/import/preview

**US Reference:** US-SIS-004 AC-5 | **Permissions:** `STUDENT_MANAGE`

**Description:** Preview import data before confirming.

**Request:**

```java
public class PreviewImportRequest {
    @NotBlank private String validationToken;
}
```

**Response:**

```java
public class PreviewImportRes {
    private Integer totalRows;
    private List<StudentPreviewRow> previewRows; // first 100 rows
    private ImportSummary summary;
}

public class StudentPreviewRow {
    private Integer rowNumber;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;
    private Boolean isMinor;
    private String address;
    private String notes;
}

public class ImportSummary {
    private Integer newStudents;
    private Integer minorStudents;
    private Integer adultLearners;
}
```

**Business Logic:**

1. Validate validationToken
2. Retrieve cached validation result
3. Return first 100 rows for preview
4. Calculate summary statistics:
   - newStudents: total count
   - minorStudents: count where is_minor = true
   - adultLearners: count where is_minor = false

**Error Cases:**

| Case | HTTP | Error Code |
|------|------|------------|
| Invalid/expired token | 422 | SIS-422-013 |

**Events:** None

**JSON Request Example:**

```json
{
  "validationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Preview generated successfully",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "totalRows": 147,
    "previewRows": [
      {
        "rowNumber": 1,
        "firstName": "Nguyễn Văn",
        "lastName": "A",
        "email": "nguyenvana@example.com",
        "phone": "+84901234567",
        "dateOfBirth": "2010-05-15",
        "gender": "MALE",
        "isMinor": true,
        "address": "123 Đường ABC, Hà Nội",
        "notes": "Học sinh giỏi toán"
      },
      {
        "rowNumber": 2,
        "firstName": "Trần Thị",
        "lastName": "B",
        "email": "tranthib@example.com",
        "phone": "+84912345678",
        "dateOfBirth": "2011-08-20",
        "gender": "FEMALE",
        "isMinor": true,
        "address": "456 Đường XYZ, TP.HCM",
        "notes": "Học sinh năng khiếu văn"
      }
    ],
    "summary": {
      "newStudents": 147,
      "minorStudents": 120,
      "adultLearners": 27
    }
  }
}
```

---

#### 3.2.1.13 POST /api/v1/students/import/confirm

**US Reference:** US-SIS-004 AC-6, AC-7 | **Permissions:** `STUDENT_MANAGE`

**Description:** Confirm and execute import.

**Request:**

```java
public class ConfirmImportRequest {
    @NotBlank private String validationToken;
}
```

**Response:**

```java
public class ImportResultRes {
    private Integer totalRows;
    private Integer successCount;
    private Integer failureCount;
    private List<Long> createdStudentIds;
    private List<RowError> errors; // if any rows failed
}
```

**Business Logic:**

1. Validate validationToken
2. Retrieve cached validation result
3. **Transaction begin**
4. For each row:
   - Generate student_code (STU-{tenantId}-{seq})
   - Create StudentAggregate
   - Set status = PENDING_INVITATION
   - Save to DB
5. **Transaction commit** (all-or-nothing)
6. Clear cache (validationToken)
7. Publish StudentImportedEvent (with list of IDs)

**Error Cases:**

| Case | HTTP | Error Code |
|------|------|------------|
| Invalid/expired token | 422 | SIS-422-013 |
| Transaction failed | 500 | SIS-500-001 |

**Events:** StudentImportedEvent → `edu.saas.sis.student.imported`

**JSON Request Example:**

```json
{
  "validationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Import completed successfully",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "totalRows": 147,
    "successCount": 147,
    "failureCount": 0,
    "createdStudentIds": [1001, 1002, 1003, 1004, 1005],
    "errors": []
  }
}
```

---

### 3.2.2 Parent API Endpoints

#### 3.2.2.1 POST /api/v1/parents/search

**US Reference:** US-SIS-002 (AC-1) | **Permissions:** `STUDENT_VIEW`

**Description:** Tìm kiếm và phân trang danh sách phụ huynh.

**Request:**

```java
public class SearchParentRequest {
    private String status;
    private String name; // search in firstName or lastName
    private String email;
    private List<String> statuses;
    private String relationship;
    private LocalDate createdAtFrom;
    private LocalDate createdAtTo;

    @NotNull
    private PageRequestBase page = new PageRequestBase();
}
```

**Response:**

```java
public class ParentRes {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String relationship;
    private String status;
    private Long ssoUserId;
    private String address;
    private String occupation;
    private String notes;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

**Business Logic:**

Similar to Student search with Parent-specific filters.

**JSON Request Example:**

```json
{
  "status": "ACTIVE",
  "name": "Nguyen",
  "email": "nguyen@example.com",
  "statuses": ["ACTIVE", "PENDING_INVITATION"],
  "relationship": "FATHER",
  "createdAtFrom": "2024-01-01",
  "createdAtTo": "2024-12-31",
  "page": {
    "pageNumber": 0,
    "pageSize": 20,
    "sortBy": "createdAt",
    "sortDirection": "DESC"
  }
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Success",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "hasContent": true,
    "number": 0,
    "size": 20,
    "numberOfElements": 2,
    "first": true,
    "last": true,
    "hasNext": false,
    "hasPrevious": false,
    "totalPages": 1,
    "totalElements": 2,
    "content": [
      {
        "id": 10,
        "firstName": "Nguyễn Văn",
        "lastName": "Hùng",
        "email": "nguyenvanhung@example.com",
        "phone": "+84909123456",
        "relationship": "FATHER",
        "status": "ACTIVE",
        "ssoUserId": 6001,
        "address": "789 Đường DEF, Hà Nội",
        "occupation": "Kỹ sư phần mềm",
        "notes": "Quan tâm nhiều đến con",
        "createdBy": "admin@school.edu",
        "updatedBy": "admin@school.edu",
        "createdAt": "2024-06-10T09:00:00",
        "updatedAt": "2024-06-10T09:00:00"
      },
      {
        "id": 11,
        "firstName": "Trần Thị",
        "lastName": "Mai",
        "email": "tranthimai@example.com",
        "phone": "+84918234567",
        "relationship": "MOTHER",
        "status": "ACTIVE",
        "ssoUserId": 6002,
        "address": "456 Đường GHI, TP.HCM",
        "occupation": "Giáo viên",
        "notes": "Thường xuyên liên hệ với giáo viên",
        "createdBy": "admin@school.edu",
        "updatedBy": "admin@school.edu",
        "createdAt": "2024-06-11T10:00:00",
        "updatedAt": "2024-06-11T10:00:00"
      }
    ]
  }
}
```

---

#### 3.2.2.2 GET /api/v1/parents/export

**US Reference:** US-SIS-002 (Export) | **Permissions:** `STUDENT_VIEW`

**Description:** Export danh sách phụ huynh ra file Excel/CSV.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| format | String | No | Export format: `excel` or `csv` (default: excel) |
| status | String | No | Filter by status |
| relationship | String | No | Filter by relationship |
| All search filters | Various | No | Same as search endpoint |

**Response:** File download

**Content-Type:**
- Excel: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- CSV: `text/csv; charset=utf-8`

**File Name Pattern:**
- Excel: `parents_export_{timestamp}.xlsx`
- CSV: `parents_export_{timestamp}.csv`

**Business Logic:**

Similar to Student export with Parent-specific columns:
- First Name
- Last Name
- Email
- Phone
- Relationship
- Status
- Occupation
- Created At
- Updated At

**Note:** Query parameters sử dụng tương tự như POST /parents/search. Response là file download (Excel hoặc CSV), không phải JSON.

---

#### 3.2.2.9 POST /api/v1/parents

**US Reference:** US-SIS-005 (AC-1, AC-2, AC-3) | **Permissions:** `STUDENT_MANAGE`

**Description:** Tạo phụ huynh mới (status = PENDING_INVITATION).

**Request:**

```java
public class CreateParentRequest {
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    @NotBlank @Email private String email;
    private String phone;
    @NotBlank private String relationship;
    private String occupation;
    private String address;
    private String notes;
}
```

**Response:**

```java
public class ParentRes {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String relationship;
    private String status;
    private Long ssoUserId;
    private String address;
    private String occupation;
    private String notes;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

**Business Logic:**

Similar logic to Create Student:
1. Check email uniqueness within tenant and PARENT role
2. Support multi-role (one email can be both PARENT and TEACHER)
3. Create parent with status = PENDING_INVITATION

**Error Cases:**

| Case | HTTP | Error Code |
|------|------|------------|
| Email exists (same role) | 422 | SIS-422-001 |
| Validation error | 400 | SIS-400-001 |

**Events:** None

**JSON Request Example:**

```json
{
  "firstName": "Nguyễn Văn",
  "lastName": "Hùng",
  "email": "nguyenvanhung@example.com",
  "phone": "+84909123456",
  "relationship": "FATHER",
  "occupation": "Kỹ sư phần mềm",
  "address": "789 Đường DEF, Hà Nội",
  "notes": "Quan tâm nhiều đến con"
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Parent created successfully",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "id": 10
  }
}
```

**Note:** To get full parent details, call `GET /api/v1/parents/{id}` after creation.

---

#### 3.2.2.10 GET /api/v1/parents/{id}

**US Reference:** US-SIS-007 (AC-1.1) | **Permissions:** `STUDENT_VIEW`

**Description:** Xem chi tiết phụ huynh theo ID.

**Response:**

```java
public class ParentDetailRes {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String relationship;
    private String status;
    private Long ssoUserId;
    private String address;
    private String occupation;
    private String notes;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<StudentInfo> students; // List of linked students
}

public class StudentInfo {
    private Long id;
    private Boolean isPrimary;  // From student_parent table
    private String studentCode;
    private String firstName;
    private String lastName;
    private String email;
    private String status;
}
```

**Business Logic:**

1. Find parent by ID and tenantId
2. Load ALL linked students from student_parent table (JOIN with student table)
3. For each student, include isPrimary field from student_parent table
4. Return ParentDetailRes

**Error Cases:**

| Case | HTTP | Error Code |
|------|------|------------|
| Parent not found | 404 | SIS-404-002 |

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Success",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "id": 10,
    "firstName": "Nguyễn Văn",
    "lastName": "Hùng",
    "email": "nguyenvanhung@example.com",
    "phone": "+84909123456",
    "relationship": "FATHER",
    "status": "ACTIVE",
    "ssoUserId": 6001,
    "address": "789 Đường DEF, Hà Nội",
    "occupation": "Kỹ sư phần mềm",
    "notes": "Quan tâm nhiều đến con",
    "createdBy": "admin@school.edu",
    "updatedBy": "admin@school.edu",
    "createdAt": "2024-06-10T09:00:00",
    "updatedAt": "2024-06-10T09:00:00",
    "students": [
      {
        "id": 1,
        "isPrimary": true,
        "studentCode": "STU-123-00001",
        "firstName": "Nguyễn Văn",
        "lastName": "A",
        "email": "nguyenvana@example.com",
        "status": "ACTIVE"
      },
      {
        "id": 2,
        "isPrimary": false,
        "studentCode": "STU-123-00002",
        "firstName": "Nguyễn Văn",
        "lastName": "B",
        "email": "nguyenvanb@example.com",
        "status": "ACTIVE"
      }
    ]
  }
}
```

---

#### 3.2.2.11 POST /api/v1/parents/{id}/history

**US Reference:** US-SIS-007 (View History) | **Permissions:** `STUDENT_VIEW`

**Description:** Xem lịch sử thay đổi của phụ huynh.

**Request:**

```java
public class ParentHistoryRequest {
    private LocalDate fromDate;
    private LocalDate toDate;
    private List<String> eventTypes; // CREATED, ACTIVATED, UPDATED, etc.

    @NotNull
    private PageRequestBase page = new PageRequestBase();
}
```

**Response:**

```java
public class ParentHistoryRes {
    private Long parentId;
    private String parentName;
    private List<HistoryEvent> events;
    private PageInfo pageInfo;
}
```

**Business Logic:**

Similar to Student history with parent-specific event types:
- PARENT_CREATED
- PARENT_ACTIVATED
- PARENT_UPDATED
- PARENT_SUSPENDED
- PARENT_REACTIVATED
- PARENT_DELETED
- STUDENT_LINKED
- STUDENT_UNLINKED

**JSON Request Example:**

```json
{
  "fromDate": "2024-01-01",
  "toDate": "2024-12-31",
  "eventTypes": ["PARENT_CREATED", "PARENT_UPDATED", "PARENT_ACTIVATED"],
  "page": {
    "pageNumber": 0,
    "pageSize": 20,
    "sortBy": "performedAt",
    "sortDirection": "DESC"
  }
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Success",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "hasContent": true,
    "number": 0,
    "size": 20,
    "numberOfElements": 2,
    "first": true,
    "last": true,
    "hasNext": false,
    "hasPrevious": false,
    "totalPages": 1,
    "totalElements": 2,
    "content": [
      {
        "id": 201,
        "eventType": "PARENT_ACTIVATED",
        "eventDescription": "Parent account activated and SSO account created",
        "performedBy": "admin@school.edu",
        "performedAt": "2024-06-12T10:30:00",
        "changes": {
          "status": {
            "before": "PENDING_INVITATION",
            "after": "ACTIVE"
          },
          "ssoUserId": {
            "before": null,
            "after": 6001
          }
        }
      },
      {
        "id": 200,
        "eventType": "PARENT_CREATED",
        "eventDescription": "Parent record created",
        "performedBy": "admin@school.edu",
        "performedAt": "2024-06-10T09:00:00",
        "changes": {
          "firstName": "Nguyễn Văn",
          "lastName": "Hùng",
          "email": "nguyenvanhung@example.com",
          "relationship": "FATHER",
          "status": "PENDING_INVITATION"
        }
      }
    ]
  }
}
```

---

#### 3.2.2.12 POST /api/v1/parents/{id}/activities

**US Reference:** US-SIS-007 (View Activities) | **Permissions:** `STUDENT_VIEW`

**Description:** Xem lịch sử hoạt động của phụ huynh trong hệ thống.

**Request:**

```java
public class ParentActivitiesRequest {
    private LocalDate fromDate;
    private LocalDate toDate;
    private List<String> activityTypes; // LOGIN, LOGOUT, PROFILE_UPDATE, etc.

    @NotNull
    private PageRequestBase page = new PageRequestBase();
}
```

**Response:**

```java
public class ParentActivitiesRes {
    private Long parentId;
    private String parentName;
    private List<Activity> activities;
    private PageInfo pageInfo;
}
```

**Business Logic:**

Similar to Student activities (no courses - parents don't take courses).
Activity types:
- LOGIN
- LOGOUT
- PROFILE_UPDATE
- VIEW_STUDENT_REPORT
- VIEW_STUDENT_GRADES

**JSON Request Example:**

```json
{
  "fromDate": "2024-12-01",
  "toDate": "2024-12-31",
  "activityTypes": ["LOGIN", "VIEW_STUDENT_REPORT"],
  "page": {
    "pageNumber": 0,
    "pageSize": 20,
    "sortBy": "activityTime",
    "sortDirection": "DESC"
  }
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Success",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "hasContent": true,
    "number": 0,
    "size": 20,
    "numberOfElements": 2,
    "first": true,
    "last": true,
    "hasNext": false,
    "hasPrevious": false,
    "totalPages": 1,
    "totalElements": 2,
    "content": [
      {
        "id": 401,
        "activityType": "VIEW_STUDENT_REPORT",
        "activityDescription": "Viewed student progress report",
        "activityTime": "2024-12-15T15:30:00",
        "ipAddress": "42.118.200.50",
        "deviceType": "Mobile",
        "metadata": {
          "studentId": 1,
          "reportType": "MONTHLY"
        }
      },
      {
        "id": 400,
        "activityType": "LOGIN",
        "activityDescription": "User logged in",
        "activityTime": "2024-12-15T15:25:00",
        "ipAddress": "42.118.200.50",
        "deviceType": "Mobile",
        "metadata": {}
      }
    ]
  }
}
```

---

#### 3.2.2.13 PUT /api/v1/parents/{id}

**US Reference:** US-SIS-009 (all ACs) | **Permissions:** `STUDENT_MANAGE`

**Description:** Cập nhật thông tin phụ huynh.

**Request:**

```java
public class UpdateParentRequest {
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    // NO email (cannot change after activation)
    private String phone;
    @NotBlank private String relationship;
    private String occupation;
    private String address;
    private String notes;

    // Student mapping/unmapping (optional)
    private StudentMappingRequest students;
}

public class StudentMappingRequest {
    private List<Long> mappingIds;    // Student IDs to link
    private List<Long> unMappingIds;  // Student IDs to unlink
}
```

**Response:**

```java
public class ParentRes {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String relationship;
    private String status;
    private Long ssoUserId;
    private String address;
    private String occupation;
    private String notes;
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

**Business Logic:**

1. **email READONLY** after activation (same as Student)
2. Update basic fields (firstName, lastName, phone, etc.)
3. **Handle student mapping/unmapping (if provided):**
   - **mappingIds**: Link parent to these students
     - Validate student exists and belongs to same tenant
     - Create student_parent records
   - **unMappingIds**: Unlink parent from these students
     - Delete student_parent records
   - Both operations can be done in same request

**Error Cases:**

| Case | HTTP | Error Code |
|------|------|------------|
| Parent not found | 404 | SIS-404-002 |
| Validation error | 400 | SIS-400-001 |

**Events:** None

**JSON Request Example (Basic update without student changes):**

```json
{
  "firstName": "Nguyễn Văn",
  "lastName": "Hùng",
  "phone": "+84909123457",
  "relationship": "FATHER",
  "occupation": "Kiến trúc sư phần mềm",
  "address": "789 Đường DEF, Hà Nội, Việt Nam",
  "notes": "Cập nhật thông tin nghề nghiệp và địa chỉ"
}
```

**JSON Request Example (Update with student mapping/unmapping):**

```json
{
  "firstName": "Nguyễn Văn",
  "lastName": "Hùng",
  "phone": "+84909123457",
  "relationship": "FATHER",
  "occupation": "Kiến trúc sư phần mềm",
  "address": "789 Đường DEF, Hà Nội, Việt Nam",
  "notes": "Cập nhật thông tin nghề nghiệp và địa chỉ",
  "students": {
    "mappingIds": [3, 4],
    "unMappingIds": [1]
  }
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Parent updated successfully",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "id": 10
  }
}
```

**Note:** To get full parent details, call `GET /api/v1/parents/{id}` after update.

---

#### 3.2.2.3 POST /api/v1/parents/activate/bulk

**US Reference:** US-SIS-002 (similar to US-SIS-001 AC-9) | **Permissions:** `STUDENT_MANAGE`

**Description:** Kích hoạt phụ huynh (tạo SSO account) và gửi email.

**Request:**

```java
public class BulkActivateParentRequest {
    @NotEmpty private List<Long> parentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}
```

**Business Logic:**

For each parent:
1. Validate status = PENDING_INVITATION
2. Create SSO account via sf-auth
3. Set status = ACTIVE
4. Send activation email
5. Publish ParentActivatedEvent

**Error Cases (per parent):**

| Case | Error Code |
|------|------------|
| Parent not found | SIS-404-002 |
| Already activated | SIS-422-023 |
| SSO creation failed | SIS-500-003 |

**Events:** ParentActivatedEvent (per parent)

**JSON Request Example:**

```json
{
  "parentIds": [10, 11, 12]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk operation completed with 2 successes and 1 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 2,
    "failureCount": 1,
    "errors": [
      {
        "parentId": 12,
        "errorCode": "SIS-422-023",
        "errorMessage": "Parent already activated"
      }
    ]
  }
}
```

---

#### 3.2.2.4 POST /api/v1/parents/resend-email/bulk

**US Reference:** US-SIS-002 (Resend Email) | **Permissions:** `STUDENT_MANAGE`

**Description:** Gửi lại email kích hoạt cho phụ huynh.

**Request:**

```java
public class BulkResendEmailRequest {
    @NotEmpty private List<Long> parentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}
```

**Business Logic:**

For each parent:
1. Load parent by ID and tenantId
2. Validate status = ACTIVE or PENDING_INVITATION
3. Send invitation/welcome email
4. Publish ParentEmailResentEvent

**Error Cases (per parent):**

| Case | Error Code |
|------|------------|
| Parent not found | SIS-404-002 |
| Invalid status | SIS-422-024 |
| Email send failed | SIS-500-002 |

**Events:** ParentEmailResentEvent (per parent)

**JSON Request Example:**

```json
{
  "parentIds": [10, 11, 12]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk operation completed with 3 successes and 0 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 3,
    "failureCount": 0,
    "errors": []
  }
}
```

---

#### 3.2.2.5 POST /api/v1/parents/inactive/bulk

**US Reference:** US-SIS-002 (similar to US-SIS-001 AC-12) | **Permissions:** `STUDENT_MANAGE`

**Description:** Tạm ngưng tài khoản phụ huynh.

**Request:**

```java
public class BulkInactivatedParentRequest {
    @NotEmpty private List<Long> parentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}
```

**Business Logic:**

For each parent:
1. Validate status = ACTIVE
2. Set status = INACTIVE
3. Disable SSO account temporarily
4. Publish ParentInactivatedEvent

**Error Cases (per parent):**

| Case | Error Code |
|------|------------|
| Parent not found | SIS-404-002 |
| Invalid status | SIS-422-025 |

**Events:** ParentInactivatedEvent (per parent)

**JSON Request Example:**

```json
{
  "parentIds": [10, 11, 12]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk operation completed with 3 successes and 0 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 3,
    "failureCount": 0,
    "errors": []
  }
}
```

---

#### 3.2.2.6 POST /api/v1/parents/suspend/bulk

**US Reference:** US-SIS-002 (Suspend) | **Permissions:** `STUDENT_MANAGE`

**Description:** Chấm dứt vĩnh viễn tài khoản phụ huynh (không thể khôi phục).

**Request:**

```java
public class BulkSuspendedParentRequest {
    @NotEmpty private List<Long> parentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}
```

**Business Logic:**

For each parent:
1. Validate status = ACTIVE or INACTIVE
2. Set status = SUSPENDED
3. Disable SSO account permanently
4. Publish ParentSuspendedEvent

**Error Cases (per parent):**

| Case                     | Error Code |
|--------------------------|------------|
| Parent not found         | SIS-404-002 |
| Cannot Suspended pending | SIS-422-026 |
| Already Suspended        | SIS-422-027 |

**Events:** ParentSuspendedEvent (per parent)

**Important Notes:**
- Inactivated parents CANNOT be reactivated
- Different from DELETE (which removes record)
- SSO account is permanently disabled

**JSON Request Example:**

```json
{
  "parentIds": [10, 11, 12]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk operation completed with 3 successes and 0 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 3,
    "failureCount": 0,
    "errors": []
  }
}
```

---

#### 3.2.2.7 POST /api/v1/parents/reactivate/bulk

**US Reference:** US-SIS-002 (similar to US-SIS-001 AC-13) | **Permissions:** `STUDENT_MANAGE`

**Description:** Kích hoạt lại tài khoản phụ huynh đã bị tạm ngưng.

**Request:**

```java
public class BulkReactivateParentRequest {
    @NotEmpty private List<Long> parentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}
```

**Business Logic:**

For each parent:
1. Validate status = SUSPENDED or INACTIVE
2. Set status = ACTIVE
3. Re-enable SSO account
4. Publish ParentReactivatedEvent

**Error Cases (per parent):**

| Case | Error Code |
|------|------------|
| Parent not found | SIS-404-002 |
| Invalid status | SIS-422-028 |
| Cannot reactivate INACTIVATED | SIS-422-029 |

**Events:** ParentReactivatedEvent (per parent)

**JSON Request Example:**

```json
{
  "parentIds": [10, 11, 12]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk operation completed with 3 successes and 0 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 3,
    "failureCount": 0,
    "errors": []
  }
}
```

---

#### 3.2.2.8 DELETE /api/v1/parents/bulk

**US Reference:** US-SIS-002 (similar to US-SIS-001 AC-14, AC-15) | **Permissions:** `STUDENT_MANAGE`

**Description:** Xóa vĩnh viễn phụ huynh (chỉ cho phép xóa khi status = PENDING_INVITATION).

**Request:**

```java
public class BulkDeleteParentRequest {
    @NotEmpty private List<Long> parentIds;
}
```

**Response:**

```java
public class BulkOperationResultRes {
    private Integer successCount;
    private Integer failureCount;
    private List<ErrorDetail> errors;
}
```

**Business Logic:**

For each parent:
1. Validate status = PENDING_INVITATION
2. Hard delete from database

**Error Cases (per parent):**

| Case | Error Code |
|------|------------|
| Parent not found | SIS-404-002 |
| Cannot delete (status != PENDING_INVITATION) | SIS-422-030 |

**Events:** None

**Important Note:** Only parents with PENDING_INVITATION status can be deleted. For other statuses, use INACTIVE instead.

**JSON Request Example:**

```json
{
  "parentIds": [10, 11, 12]
}
```

**JSON Response Example:**

```json
{
  "code": "SUCCESS",
  "messageKey": "SIS-001",
  "messageCode": "SIS_001",
  "messageValue": "Bulk operation completed with 2 successes and 1 failures",
  "timestamp": "2024-12-17T06:47:57.719Z",
  "data": {
    "successCount": 2,
    "failureCount": 1,
    "errors": [
      {
        "parentId": 12,
        "errorCode": "SIS-422-030",
        "errorMessage": "Cannot delete parent with status other than PENDING_INVITATION"
      }
    ]
  }
}
```

---

## 3.3 Source Code Structure (DDD/Hexagonal)

### 3.3.1 Overall Folder Structure

```
sf-sis/
├── src/main/java/com/edusaas/sis/
│   ├── domain/                          # Domain Layer (Core Business Logic)
│   │   ├── student/                     # Student Sub-domain
│   │   │   ├── model/                   # Domain Models & Value Objects
│   │   │   ├── aggregate/               # Aggregates (StudentAggregate)
│   │   │   ├── command/                 # Command objects
│   │   │   ├── query/                   # Query objects
│   │   │   ├── service/                 # Domain Services
│   │   │   └── port/                    # Ports (Interfaces)
│   │   │       ├── incoming/            # Use Case Ports
│   │   │       └── outgoing/            # Repository Ports, External Service Ports
│   │   ├── parent/                      # Parent Sub-domain (same structure)
│   │   └── shared/                      # Shared domain (Gender enum, etc.)
│   │       └── model/
│   │
│   ├── application/                     # Application Layer (Use Case Implementations)
│   │   ├── student/
│   │   │   └── usecase/                 # Use Case implementations
│   │   │       ├── handler/             # Handlers (execute commands/queries)
│   │   │       └── mapper/              # Mappers (Request → Command/Query)
│   │   └── parent/
│   │       └── usecase/
│   │           ├── handler/
│   │           └── mapper/
│   │
│   └── adapters/                        # Adapters Layer (Infrastructure)
       ├── infrastructure/
       │   ├── in/                      # Inbound Adapters
       │   │   └── rest/                # REST Controllers
       │   │       ├── controller/      # Controllers
       │   │       ├── request/         # Request DTOs
       │   │       └── response/        # Response DTOs
       │   └── out/                     # Outbound Adapters
       │       ├── persistence/         # Database Adapter
       │       │   ├── entity/          # JPA Entities (PDM) - extends BaseEntity
       │       │   ├── repository/      # JPA Repositories
       │       │   ├── implement/       # Repository Port Implementations
       │       │   └── mapper/          # Entity ↔ Model Mappers
       │       ├── event/               # Kafka Event Adapter
       │       │   ├── producer/        # Event Producers
       │       │   └── consumer/        # Event Consumers
       │       └── external/            # External Service Adapters
       │           └── sso/             # SSO Service Adapter
       └── config/                      # Configuration
           ├── security/
           ├── kafka/
           └── database/
```

---

### 3.3.2 Domain Layer Structure

#### 3.3.2.1 Domain Model (LDM)

```java
// domain/student/model/StudentModel.java
// Domain model does NOT extend BaseEntity
public class StudentModel {
    private Long id;
    private Long tenantId;
    private String studentCode;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private Gender gender;                    // Enum
    private Boolean isMinor;
    private StudentStatus status;             // Enum
    private Long ssoUserId;
    private String address;
    private String notes;

    // Audit fields (if needed in domain, otherwise can be omitted)
    private String createdBy;
    private String updatedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

// domain/student/model/StudentStatus.java
public enum StudentStatus {
    PENDING_INVITATION, ACTIVE, INACTIVE, SUSPENDED
}

// domain/shared/model/Gender.java
public enum Gender {
    MALE, FEMALE, OTHER
}
```

#### 3.3.2.2 Domain Aggregate

```java
// domain/student/aggregate/StudentAggregate.java
public class StudentAggregate {
    private StudentModel student;

    // No setters - all state changes through business methods

    public StudentAggregate create(CreateStudentCommand command) {
        this.student = new StudentModel();
        this.student.setFirstName(command.getFirstName());
        this.student.setLastName(command.getLastName());
        this.student.setEmail(command.getEmail());
        this.student.setGender(command.getGender());         // Enum
        this.student.setIsMinor(command.getIsMinor());
        this.student.setStatus(StudentStatus.PENDING_INVITATION);
        return this;
    }

    public StudentAggregate activate(Long ssoUserId) {
        if (this.student.getStatus() != StudentStatus.PENDING_INVITATION) {
            throw new InvalidStatusTransitionException();
        }
        if (this.student.getIsMinor() && !hasParent()) {
            throw new MinorRequiresParentException();
        }
        this.student.setStatus(StudentStatus.ACTIVE);
        this.student.setSsoUserId(ssoUserId);
        return this;
    }

    public StudentModel getModel() {
        return this.student;
    }

    private boolean hasParent() {
        return false; // placeholder
    }
}
```

#### 3.3.2.3 Domain Command & Query

```java
// domain/student/command/CreateStudentCommand.java
public class CreateStudentCommand {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private Gender gender;                        // Enum
    private Boolean isMinor;
    private String address;
    private String notes;
    // tenantId, createdBy auto-injected from ThreadContext
}

// domain/student/query/SearchStudentQuery.java
public class SearchStudentQuery {
    @Equal private StudentStatus status;          // Enum
    @Like private String name;
    @Equal private String email;
    @In private Set<StudentStatus> statuses;      // Enum set
    @Equal private Boolean isMinor;
    @Ge private LocalDate createdAtFrom;
    @Le private LocalDate createdAtTo;
    @Equal private Long tenantId;                 // Auto-injected

    private PageRequestBase page;
}
```

#### 3.3.2.4 Domain Service

```java
// domain/student/service/StudentDomainService.java
@Service
public class StudentDomainService {

    private final StudentRepoPort studentRepo;
    private final EventPublisherPort eventPublisher;

    public StudentModel create(CreateStudentCommand command) {
        // 1. Check email uniqueness
        Long tenantId = SecurityContextHolder.getTenantId();
        if (studentRepo.existsByEmailAndTenantId(command.getEmail(), tenantId)) {
            throw new EmailAlreadyExistsException();
        }

        // 2. Generate student code
        String studentCode = generateStudentCode(tenantId);

        // 3. Create aggregate
        StudentAggregate aggregate = new StudentAggregate();
        aggregate.create(command);
        aggregate.getModel().setStudentCode(studentCode);
        aggregate.getModel().setTenantId(tenantId);

        // 4. Save
        StudentModel saved = studentRepo.save(aggregate.getModel());

        // 5. Publish event
        eventPublisher.publish(new StudentCreatedEvent(saved));

        return saved;
    }

    private String generateStudentCode(Long tenantId) {
        Long nextSeq = studentRepo.getNextSequenceForTenant(tenantId);
        return String.format("STU-%d-%05d", tenantId, nextSeq);
    }
}
```

#### 3.3.2.5 Domain Ports

```java
// domain/student/port/outgoing/StudentRepoPort.java
public interface StudentRepoPort {
    StudentModel save(StudentModel student);
    Optional<StudentModel> findByIdAndTenantId(Long id, Long tenantId);
    boolean existsByEmailAndTenantId(String email, Long tenantId);
    Page<StudentModel> search(SearchStudentQuery query, Pageable pageable);
    Long getNextSequenceForTenant(Long tenantId);
}

// domain/student/port/outgoing/EventPublisherPort.java
public interface EventPublisherPort {
    void publish(DomainEvent event);
}
```

---

### 3.3.3 Application Layer Structure

#### 3.3.3.1 Use Case Handler

```java
// application/student/usecase/handler/CreateStudentHandler.java
@Service
public class CreateStudentHandler implements CreateStudentUsecasePort {

    private final StudentDomainService studentDomainService;
    private final CreateStudentMapper mapper;
    private final StudentUsecaseMapper usecaseMapper;

    @Override
    @Transactional
    public StudentRes execute(CreateStudentRequest request) {
        // 1. Map Request → Command (with enum conversion)
        CreateStudentCommand command = mapper.toCommand(request);

        // 2. Call Domain Service
        StudentModel created = studentDomainService.create(command);

        // 3. Map Model → Response
        return usecaseMapper.toRes(created);
    }
}
```

#### 3.3.3.2 Use Case Mappers

```java
// application/student/usecase/mapper/CreateStudentMapper.java
@Mapper(componentModel = "spring")
public interface CreateStudentMapper {

    @Mapping(target = "gender", expression = "java(mapGender(request.getGender()))")
    CreateStudentCommand toCommand(CreateStudentRequest request);

    // Convert String → Enum
    default Gender mapGender(String gender) {
        if (gender == null) return null;
        return Gender.valueOf(gender.toUpperCase());
    }
}

// application/student/usecase/mapper/StudentUsecaseMapper.java
@Mapper(componentModel = "spring")
public interface StudentUsecaseMapper {

    @Mapping(target = "status", expression = "java(mapStatusToString(model.getStatus()))")
    @Mapping(target = "gender", expression = "java(mapGenderToString(model.getGender()))")
    StudentRes toRes(StudentModel model);

    // Convert Enum → String
    default String mapStatusToString(StudentStatus status) {
        return status != null ? status.name() : null;
    }

    default String mapGenderToString(Gender gender) {
        return gender != null ? gender.name() : null;
    }
}
```

---

### 3.3.4 Adapters Layer Structure

#### 3.3.4.1 REST Controller

```java
// adapters/infrastructure/in/rest/controller/StudentController.java
@RestController
@RequestMapping("/api/v1/students")
public class StudentController {

    private final CreateStudentUsecasePort createStudentUsecase;
    private final SearchStudentUsecasePort searchStudentUsecase;
    private final SearchStudentMapper searchStudentMapper;

    @PostMapping("/search")
    public ResponseEntity<BasePageResponse<StudentRes>> search(
        @RequestBody SearchStudentRequest request
    ) {
        SearchStudentQuery query = searchStudentMapper.toQuery(request);
        Page<StudentRes> result = searchStudentUsecase.execute(query);
        return ResponseEntity.ok(BasePageResponse.success(result));
    }

    @PostMapping
    public ResponseEntity<BaseResponse<StudentRes>> create(
        @Valid @RequestBody CreateStudentRequest request
    ) {
        StudentRes result = createStudentUsecase.execute(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(BaseResponse.success(result));
    }
}
```

#### 3.3.4.2 Request/Response DTOs

```java
// adapters/infrastructure/in/rest/request/CreateStudentRequest.java
public class CreateStudentRequest {
    @NotBlank @Size(max = 100)
    private String firstName;

    @NotBlank @Size(max = 100)
    private String lastName;

    @NotBlank @Email
    private String email;

    private String phone;
    private LocalDate dateOfBirth;
    private String gender;                        // String from JSON

    @NotNull
    private Boolean isMinor;

    private String address;
    private String notes;
}

// adapters/infrastructure/in/rest/response/StudentRes.java
public class StudentRes {
    private Long id;
    private String studentCode;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;                        // String for JSON
    private Boolean isMinor;
    private String status;                        // String for JSON
    private Long ssoUserId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

#### 3.3.4.3 JPA Entity (PDM)

```java
// adapters/infrastructure/out/persistence/entity/StudentEntity.java
// Only JPA Entity extends BaseEntity
@Entity
@Table(name = "student")
public class StudentEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tenant_id", nullable = false)
    private Long tenantId;

    @Column(name = "student_code", length = 50, nullable = false)
    private String studentCode;

    @Column(name = "first_name", length = 100, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 100, nullable = false)
    private String lastName;

    @Column(name = "email", length = 255, nullable = false)
    private String email;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender", length = 10)
    @Enumerated(EnumType.STRING)                  // Store enum as VARCHAR
    private Gender gender;

    @Column(name = "is_minor", nullable = false)
    private Boolean isMinor;

    @Column(name = "status", length = 30, nullable = false)
    @Enumerated(EnumType.STRING)                  // Store enum as VARCHAR
    private StudentStatus status;

    @Column(name = "sso_user_id")
    private Long ssoUserId;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    // Audit fields (createdBy, updatedBy, createdAt, updatedAt) from BaseEntity
}
```

**BaseEntity Definition:**

```java
// BaseEntity.java (in common library)
@MappedSuperclass
public abstract class BaseEntity {

    @Column(name = "created_by", length = 100, nullable = false, updatable = false)
    private String createdBy;

    @Column(name = "updated_by", length = 100, nullable = false)
    private String updatedBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        createdBy = SecurityContextHolder.getUsername();      // From ThreadContext
        updatedBy = SecurityContextHolder.getUsername();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        updatedBy = SecurityContextHolder.getUsername();      // From ThreadContext
    }
}
```

#### 3.3.4.4 Repository Adapter

```java
// adapters/infrastructure/out/persistence/repository/StudentJpaRepository.java
@Repository
public interface StudentJpaRepository extends JpaRepository<StudentEntity, Long> {

    Optional<StudentEntity> findByIdAndTenantId(Long id, Long tenantId);

    boolean existsByEmailAndTenantId(String email, Long tenantId);

    @Query(value = "SELECT nextval_student_code(:tenantId)", nativeQuery = true)
    Long getNextSequenceForTenant(@Param("tenantId") Long tenantId);
}

// adapters/infrastructure/out/persistence/implement/StudentRepoAdapter.java
@Repository
public class StudentRepoAdapter implements StudentRepoPort {

    private final StudentJpaRepository jpaRepo;
    private final StudentPersistenceMapper mapper;

    @Override
    public StudentModel save(StudentModel student) {
        StudentEntity entity = mapper.toEntity(student);
        entity = jpaRepo.save(entity);
        return mapper.toModel(entity);
    }

    @Override
    public Optional<StudentModel> findByIdAndTenantId(Long id, Long tenantId) {
        return jpaRepo.findByIdAndTenantId(id, tenantId)
            .map(mapper::toModel);
    }

    @Override
    public boolean existsByEmailAndTenantId(String email, Long tenantId) {
        return jpaRepo.existsByEmailAndTenantId(email, tenantId);
    }

    @Override
    public Page<StudentModel> search(SearchStudentQuery query, Pageable pageable) {
        // Use QueryDSL or Specification to build dynamic query from annotations
        return jpaRepo.findAll(pageable).map(mapper::toModel);
    }

    @Override
    public Long getNextSequenceForTenant(Long tenantId) {
        return jpaRepo.getNextSequenceForTenant(tenantId);
    }
}
```

#### 3.3.4.5 Persistence Mapper

```java
// adapters/infrastructure/out/persistence/mapper/StudentPersistenceMapper.java
@Mapper(componentModel = "spring")
public interface StudentPersistenceMapper {

    StudentModel toModel(StudentEntity entity);

    StudentEntity toEntity(StudentModel model);
}
```

---

### 3.3.5 Key Architecture Patterns Summary

| Pattern | Implementation | Key Point |
|---------|---------------|-----------|
| **Dependency Inversion** | Domain depends on ports (interfaces), not implementations | Domain layer defines ports, Adapters implement |
| **Command/Query Separation** | Separate Command and Query objects | domain/student/command/, domain/student/query/ |
| **Aggregate Pattern** | Business logic in Aggregates, no direct setters | domain/student/aggregate/StudentAggregate |
| **Repository Pattern** | Repository ports in domain, implementations in adapters | StudentRepoPort (interface) vs StudentRepoAdapter (implementation) |
| **Mapper Pattern** | Separate mappers for each layer boundary | Request→Command, Model→Response, Entity↔Model |
| **Use Case Pattern** | Each use case = 1 Handler | application/student/usecase/handler/ |
| **Enum at Boundaries** | String in DTOs, Enum in domain | Mappers convert String↔Enum |
| **LDM vs PDM Separation** | Domain Model (LDM) ≠ JPA Entity (PDM) | StudentModel (no JPA) vs StudentEntity (with JPA annotations) |
| **BaseEntity Extension** | **Only JPA Entity** extends BaseEntity | StudentEntity extends BaseEntity, StudentModel does NOT |

---

## 4. WORKFLOWS

### 4.1 Main Workflows

#### 4.1.1 Create Student Workflow

**Nguồn:** US-SIS-003 (Thêm mới học sinh)

**Mô tả:** Workflow tạo mới học sinh trong hệ thống.

**Luồng chính:**

```
[School Admin]
    ↓
[1] Nhập thông tin học sinh (họ tên, email, SĐT, ngày sinh, giới tính, is_minor, phụ huynh nếu is_minor=true)
    ↓
[2] Submit → POST /api/v1/students
    ↓
[3] Validate: email unique trong role Student
    ↓
[4] Nếu is_minor = true → Validate: parent_id phải tồn tại
    ↓
[5] Tạo student_code = STU-{tenantId}-{nextval_student_code()}
    ↓
[6] Tạo StudentModel với status = PENDING_INVITATION
    ↓
[7] Lưu vào database
    ↓
[8] Nếu is_minor = true → Tạo record trong student_parent
    ↓
[9] Raise StudentCreatedEvent → Kafka
    ↓
[10] Trả về StudentRes
    ↓
[11] Hiển thị thông báo: "Thêm học sinh thành công"
```

**Luồng ngoại lệ:**

- **Email đã tồn tại (US-SIS-003 AC-3)**: Hiển thị lỗi "Email này đã tồn tại với vai trò Học sinh trong hệ thống."
- **Thiếu parent_id khi is_minor=true (US-SIS-003 AC-2)**: Hiển thị lỗi "Học sinh nhỏ tuổi bắt buộc phải chọn phụ huynh"
- **parent_id không tồn tại**: Hiển thị lỗi "Phụ huynh không tồn tại"

**Business Rules:**
- Email phải unique trong role Student trong cùng tenant
- is_minor=true bắt buộc phải có parent_id
- student_code tự động tạo từ PostgreSQL SEQUENCE
- Status mặc định = PENDING_INVITATION

---

#### 4.1.2 Activate Student Workflow

**Nguồn:** US-SIS-001 AC-9, AC-10, AC-11

**Mô tả:** Workflow kích hoạt học sinh (tạo tài khoản SSO và cho phép đăng nhập LMS).

**Luồng chính:**

```
[School Admin]
    ↓
[1] Chọn 1 hoặc nhiều học sinh với status = PENDING_INVITATION
    ↓
[2] Nhấn "Kích hoạt" → POST /api/v1/students/activate/bulk
    ↓
[3] Validate: Tất cả học sinh phải có status = PENDING_INVITATION
    ↓
[4] Validate: Nếu is_minor = true → Phải có parent (kiểm tra student_parent)
    ↓
[5] Cập nhật student.status = ACTIVE (ssoUserId = null)
    ↓
[6] Publish StudentActivatedEvent (request) → Kafka topic: sis-cqrs-saas
        → Payload: ssoUserId = null, result = null, mailSent = null
    ↓
[7] edu-saas-control-identity consumer → Tạo SSO user
    ↓
[8] edu-saas-control-identity publish StudentActivatedEvent (response) → Kafka
        → Payload: ssoUserId = {id}, result = true/false, mailSent = false
    ↓
[9] sf-sis consumer response → Cập nhật student.sso_user_id = ssoUserId
    ↓
[10] sf-lms consumer → Tạo LMS learner account với ssoUserId
    ↓
[11] sf-notification consumer → Gửi email kích hoạt
    ↓
[12] Trả về BulkOperationResultDto (successCount, failureCount)
    ↓
[13] Hiển thị thông báo: "Kích hoạt thành công X học sinh"
```

**Luồng ngoại lệ:**

- **Học sinh is_minor không có phụ huynh (US-SIS-001 AC-10)**: Skip học sinh đó, thêm vào failureList với lỗi "Học sinh nhỏ tuổi phải có phụ huynh trước khi kích hoạt"
- **Học sinh đã kích hoạt (US-SIS-001 AC-11)**: Skip học sinh đó, thêm vào failureList với lỗi "Học sinh đã được kích hoạt"
- **SSO GetOrCreateTenantUser thất bại**: Rollback transaction, thêm vào failureList

**Business Rules:**
- Chỉ activate được học sinh có status = PENDING_INVITATION
- is_minor=true bắt buộc phải có parent trong student_parent
- SSO tạo user với email = student.email, role = LEARNER
- Sau khi activate, email không thể thay đổi (US-SIS-008 AC-2)

---

#### 4.1.3 Import Student Workflow

**Nguồn:** US-SIS-004 (Import danh sách học sinh)

**Mô tả:** Workflow import hàng loạt học sinh từ file Excel/CSV.

**Luồng chính:**

```
[School Admin]
    ↓
[1] Upload file Excel/CSV → POST /api/v1/students/import
    ↓
[2] Validate: File format (Excel .xlsx hoặc CSV)
    ↓
[3] Parse file → Danh sách StudentRow
    ↓
[4] Validate: Max 1000 rows (US-SIS-004 AC-3)
    ↓
[5] Validate ALL rows (all-or-nothing):
    - Họ tên: bắt buộc, max 100 ký tự
    - Email: bắt buộc, RFC 5322 format
    - SĐT: optional, Vietnam phone regex
    - Ngày sinh: optional, không được ngày tương lai
    - Giới tính: optional, enum (Nam/Nữ/Khác)
    - is_minor: bắt buộc, true/false
    - parent_email (nếu is_minor=true): bắt buộc
    ↓
[6] Validate: Không có email trùng lặp trong file (US-SIS-004 AC-4)
    ↓
[7] Validate: Email không tồn tại trong database với role Student
    ↓
[8] Validate: Nếu is_minor=true → parent_email phải tồn tại trong bảng parent
    ↓
[9] Nếu CÓ BẤT KỲ lỗi nào:
    - Rollback transaction
    - Trả về ImportResultDto với danh sách ALL errors (theo row)
    - Không tạo bất kỳ học sinh nào
    ↓
[10] Nếu TẤT CẢ hợp lệ:
    - Tạo tất cả học sinh trong 1 transaction
    - Tạo student_code cho từng học sinh (nextval_student_code)
    - Tạo records trong student_parent nếu is_minor=true
    - Raise StudentImportedEvent
    - Commit transaction
    ↓
[11] Trả về ImportResultDto (totalRows, successCount=totalRows, failureCount=0)
    ↓
[12] Hiển thị thông báo: "Import thành công X học sinh"
```

**Luồng ngoại lệ:**

- **File sai format (US-SIS-004 AC-1)**: Hiển thị lỗi "File không đúng định dạng Excel hoặc CSV"
- **Quá 1000 rows (US-SIS-004 AC-3)**: Hiển thị lỗi "File vượt quá số lượng tối đa 1000 dòng"
- **Có lỗi validation (US-SIS-004 AC-2)**: Trả về danh sách TẤT CẢ lỗi theo row, không import bất kỳ row nào
- **Email trùng trong file (US-SIS-004 AC-4)**: Hiển thị lỗi "Email trùng lặp tại các dòng: X, Y, Z"

**Business Rules:**
- **All-or-nothing validation**: Nếu 1 row lỗi → Không import row nào
- Max 1000 rows per file
- Email phải unique trong file và trong database
- is_minor=true → parent_email bắt buộc và phải tồn tại

---

#### 4.1.4 Link Parent to Student Workflow

**Nguồn:** US-SIS-006 AC-2.3 (Liên kết phụ huynh)

**Mô tả:** Workflow liên kết phụ huynh với học sinh.

**Luồng chính:**

```
[School Admin]
    ↓
[1] Truy cập chi tiết học sinh → Tab "Phụ huynh"
    ↓
[2] Nhấn "Liên kết phụ huynh"
    ↓
[3] Chọn parent_id từ dropdown, chọn relationship (Cha/Mẹ/Ông/Bà/...)
    ↓
[4] Submit → POST /api/v1/students/{studentId}/parents/link
    ↓
[5] Validate: Student tồn tại
    ↓
[6] Validate: Parent tồn tại
    ↓
[7] Validate: Student chưa có parent (student_parent với student_id chưa tồn tại)
    ↓
[8] Tạo record trong student_parent:
    - student_id
    - parent_id
    - relationship
    - is_primary = true
    - tenant_id
    ↓
[9] Raise StudentParentLinkedEvent → Kafka
    ↓
[10] Trả về StudentParentDto
    ↓
[11] Hiển thị thông báo: "Liên kết phụ huynh thành công"
```

**Luồng ngoại lệ:**

- **Student đã có phụ huynh (US-SIS-006 AC-2.1)**: Hiển thị lỗi "Học sinh này đã có phụ huynh. Mỗi học sinh chỉ được liên kết với một phụ huynh."
- **Student hoặc Parent không tồn tại**: Hiển thị lỗi "Học sinh hoặc phụ huynh không tồn tại"

**Business Rules:**
- Một học sinh chỉ có tối đa 1 phụ huynh (US-SIS-006 AC-2.1)
- Một phụ huynh có thể có nhiều học sinh (US-SIS-007 AC-2.1)
- relationship: FATHER, MOTHER, GRANDFATHER, GRANDMOTHER, SIBLING, GUARDIAN, OTHER
- is_primary = true (vì chỉ có 1 parent)

---

#### 4.1.5 Unlink Parent from Student Workflow

**Nguồn:** US-SIS-006 AC-2.5 (Hủy liên kết phụ huynh)

**Mô tả:** Workflow hủy liên kết phụ huynh khỏi học sinh.

**Luồng chính:**

```
[School Admin]
    ↓
[1] Truy cập chi tiết học sinh → Tab "Phụ huynh"
    ↓
[2] Nhấn "Hủy liên kết" → DELETE /api/v1/students/{studentId}/parents/{parentId}
    ↓
[3] Validate: Student tồn tại
    ↓
[4] Validate: Parent tồn tại
    ↓
[5] Validate: Liên kết student_parent tồn tại
    ↓
[6] **CRITICAL VALIDATION (US-SIS-006 AC-2.5 Matrix)**:
    - Nếu is_minor = true VÀ status = ACTIVE → KHÔNG CHO PHÉP hủy liên kết
    - Nếu is_minor = true VÀ status = PENDING_INVITATION → CHO PHÉP hủy liên kết
    - Nếu is_minor = false → CHO PHÉP hủy liên kết (không ràng buộc)
    ↓
[7] Xóa record trong student_parent
    ↓
[8] Raise StudentParentUnlinkedEvent → Kafka
    ↓
[9] Hiển thị thông báo: "Hủy liên kết phụ huynh thành công"
```

**Luồng ngoại lệ:**

- **Học sinh nhỏ tuổi đã kích hoạt (US-SIS-006 AC-2.5)**: Hiển thị lỗi "Không thể hủy liên kết phụ huynh của học sinh nhỏ tuổi đã được kích hoạt."

**Business Rules Matrix (US-SIS-006 AC-2.5):**

| is_minor | status             | Cho phép hủy liên kết? |
|----------|-------------------|------------------------|
| true     | PENDING_INVITATION | ✅ Có                  |
| true     | ACTIVE            | ❌ Không               |
| true     | INACTIVE          | ❌ Không               |
| true     | SUSPENDED         | ❌ Không               |
| false    | Bất kỳ            | ✅ Có                  |

---

### 4.2 State Machine

#### 4.2.1 Student Status State Machine

**Các trạng thái:**
- **PENDING_INVITATION**: Chờ kích hoạt (trạng thái ban đầu)
- **ACTIVE**: Đang hoạt động
- **INACTIVE**: Ngưng hoạt động
- **SUSPENDED**: Tạm ngưng

**State Machine Diagram:**

```
                    [Create]
                       ↓
              ┌────────────────────┐
              │ PENDING_INVITATION │ (Initial State)
              └────────────────────┘
                       ↓
                   [Activate]
                       ↓
              ┌────────────────────┐
         ┌────│      ACTIVE        │────┐
         │    └────────────────────┘    │
         │                              │
    [Suspend]                      [Deactivate]
         │                              │
         ↓                              ↓
  ┌────────────┐                 ┌────────────┐
  │ SUSPENDED  │                 │  INACTIVE  │
  └────────────┘                 └────────────┘
         │                              │
         │                              │
         └──────→ [Reactivate] ←────────┘
                       ↓
              ┌────────────────────┐
              │      ACTIVE        │
              └────────────────────┘
```

**Ý nghĩa từng trạng thái:**

| Trạng thái | Ý nghĩa | Có thể đăng nhập LMS? | Hiển thị trong danh sách? |
|------------|---------|----------------------|---------------------------|
| PENDING_INVITATION | Chưa kích hoạt, chưa có tài khoản SSO | ❌ Không | ✅ Có (để Admin kích hoạt) |
| ACTIVE | Đã kích hoạt, đang học | ✅ Có | ✅ Có |
| INACTIVE | Ngưng học (nghỉ học, chuyển trường) | ❌ Không | ✅ Có (filter) |
| SUSPENDED | Tạm ngưng (vi phạm nội quy, nợ học phí) | ❌ Không | ✅ Có (filter) |

---

#### 4.2.2 Parent Status State Machine

**Các trạng thái:**
- **PENDING_INVITATION**: Chờ kích hoạt (trạng thái ban đầu)
- **ACTIVE**: Đang hoạt động
- **INACTIVE**: Ngưng hoạt động

**State Machine Diagram:**

```
                    [Create]
                       ↓
              ┌────────────────────┐
              │ PENDING_INVITATION │ (Initial State)
              └────────────────────┘
                       ↓
                   [Activate]
                       ↓
              ┌────────────────────┐
              │      ACTIVE        │
              └────────────────────┘
                       ↓
                 [Deactivate]
                       ↓
              ┌────────────────────┐
              │     INACTIVE       │
              └────────────────────┘
                       ↓
                 [Reactivate]
                       ↓
              ┌────────────────────┐
              │      ACTIVE        │
              └────────────────────┘
```

**Ý nghĩa từng trạng thái:**

| Trạng thái | Ý nghĩa | Có thể đăng nhập? | Có thể xem thông tin con? |
|------------|---------|-------------------|---------------------------|
| PENDING_INVITATION | Chưa kích hoạt | ❌ Không | ❌ Không |
| ACTIVE | Đã kích hoạt, có thể xem thông tin con | ✅ Có | ✅ Có (read-only) |
| INACTIVE | Ngưng hoạt động | ❌ Không | ❌ Không |

---

### 4.3 State Transition Table

#### 4.3.1 Student State Transition Table

| Từ trạng thái | Đến trạng thái | Action | Điều kiện | Permission | Use Case |
|--------------|---------------|--------|-----------|-----------|----------|
| PENDING_INVITATION | ACTIVE | Activate | is_minor=false HOẶC (is_minor=true VÀ có parent) | School Admin, Freelance Teacher | US-SIS-001 AC-9, AC-10 |
| ACTIVE | SUSPENDED | Suspend | Không có điều kiện | School Admin | US-SIS-001 AC-12 |
| ACTIVE | INACTIVE | Deactivate | Không có điều kiện | School Admin | (Implicit) |
| SUSPENDED | ACTIVE | Reactivate | Không có điều kiện | School Admin | US-SIS-001 AC-13 |
| INACTIVE | ACTIVE | Reactivate | Không có điều kiện | School Admin | US-SIS-001 AC-13 |
| PENDING_INVITATION | (Deleted) | Delete | status = PENDING_INVITATION | School Admin, Freelance Teacher | US-SIS-001 AC-14 |

**Chú thích:**
- **is_minor=true + ACTIVE**: Bắt buộc phải có parent trong student_parent
- **Không thể xóa** học sinh đã kích hoạt (status ≠ PENDING_INVITATION)
- **Không thể thay đổi email** sau khi kích hoạt (status ≠ PENDING_INVITATION)

---

#### 4.3.2 Parent State Transition Table

| Từ trạng thái | Đến trạng thái | Action | Điều kiện | Permission | Use Case |
|--------------|---------------|--------|-----------|-----------|----------|
| PENDING_INVITATION | ACTIVE | Activate | Không có điều kiện | School Admin, Freelance Teacher | US-SIS-002 (tương tự Student) |
| ACTIVE | INACTIVE | Deactivate | Không có điều kiện | School Admin | (Implicit) |
| INACTIVE | ACTIVE | Reactivate | Không có điều kiện | School Admin | (Implicit) |
| PENDING_INVITATION | (Deleted) | Delete | status = PENDING_INVITATION VÀ không có student liên kết | School Admin, Freelance Teacher | US-SIS-002 (tương tự Student) |

**Chú thích:**
- **Không thể xóa** parent đã có học sinh liên kết (phải unlink trước)
- **Không thể xóa** parent đã kích hoạt (status ≠ PENDING_INVITATION)
- **Không thể thay đổi email** sau khi kích hoạt (status ≠ PENDING_INVITATION)

---

## 5. EVENTS

> **📌 Clarification: Integration Events only**
>
> Events trong SIS (Student Information System) là **Integration Events** - dùng để đồng bộ dữ liệu giữa
> microservices (sf-sis → sf-lms, sf-notification). Business logic được xử lý đồng bộ trong
> sf-sis, không dùng Domain Events pattern.
>
> - ❌ Không phải Domain Events (DDD)
> - ✅ Integration Events để sync data cross-service
> - Consumers: **sf-lms**, **sf-notification**

### 5.1 Event Catalog

> **Note**: Chỉ các events ảnh hưởng đến LMS và cần gửi notification mới được publish.

#### 5.1.1 Student Events

| Event | Producer | Topics | Description | Consumer Actions |
|-------|----------|--------|-------------|------------------|
| `StudentActivatedEvent` | sf-sis | `sis-cqrs-saas`, `sf-notification-client` | Student được kích hoạt | **edu-saas-control-identity**: Tạo SSO user (request), publish response<br>**sf-sis**: Nhận response, cập nhật ssoUserId<br>**sf-lms**: Tạo LMS account (sau khi có ssoUserId)<br>**sf-notification**: Gửi email activation |
| `StudentSuspendedEvent` | sf-sis | `sis-cqrs-saas`, `sf-notification-client` | Student bị tạm ngưng | **sf-lms**: Suspend LMS access<br>**sf-notification**: Gửi email suspension |
| `StudentReactivatedEvent` | sf-sis | `sis-cqrs-saas`, `sf-notification-client` | Student được kích hoạt lại | **sf-lms**: Restore LMS access<br>**sf-notification**: Gửi email reactivation |
| `StudentImportedEvent` | sf-sis | `sf-notification-client` | Import batch thành công | **sf-notification**: Gửi email summary |

#### 5.1.2 Parent Events

| Event | Producer | Topics | Description | Consumer Actions |
|-------|----------|--------|-------------|------------------|
| `ParentActivatedEvent` | sf-sis | `sis-cqrs-saas`, `sf-notification-client` | Parent được kích hoạt | **edu-saas-control-identity**: Tạo SSO user (request), publish response<br>**sf-sis**: Nhận response, cập nhật ssoUserId<br>**sf-notification**: Gửi email activation |
| `ParentSuspendedEvent` | sf-sis | `sf-notification-client` | Parent bị tạm ngưng | **sf-notification**: Gửi email suspension |
| `ParentReactivatedEvent` | sf-sis | `sf-notification-client` | Parent được kích hoạt lại | **sf-notification**: Gửi email reactivation |

### 5.2 Kafka Topics

**Topic Naming Convention:**

```
aeh-{prod/nonprod}-{env}-{service}-{type}
```

| Component | Description | Example |
|-----------|-------------|---------|
| `aeh` | Namespace prefix | Cố định |
| `{prod/nonprod}` | Environment tier | prod, nonprod |
| `{env}` | Environment name | dev, stg, uat, prod |

**Topics:**

| Topic | Partition Key | Partitions | Retention | Description |
|-------|---------------|------------|-----------|-------------|
| `aeh-{prod/nonprod}-{env}-sis-cqrs-saas` | tenantId | 10 | 7 days | Luồng sync dữ liệu SIS (StudentActivated, StudentSuspended, StudentReactivated, ParentActivated, ParentSuspended, ParentReactivated) |
| `aeh-{prod/nonprod}-{env}-sf-notification-client` | tenantId | 10 | 7 days | Luồng notice (Gửi email cho Student/Parent - Activation, Suspension, Reactivation, Import Summary) |

**Example Topics (for dev environment):**
- `aeh-nonprod-dev-sis-cqrs-saas`
- `aeh-nonprod-dev-sf-notification-client`

**Example Topics (for prod environment):**
- `aeh-prod-prod-sis-cqrs-saas`
- `aeh-prod-prod-sf-notification-client`

### 5.3 Message Structure

#### 5.3.1 Cấu trúc cơ bản của Message

Mỗi message bao gồm 2 phần:
- **Message Attributes**: Metadata để nhận dạng message
- **Message Payload**: Nội dung muốn trao đổi

---

#### 5.3.2 Message Attributes

| Field | Type | Description | Values |
|-------|------|-------------|--------|
| `MessageGroup` | String | Nhóm của message | `MESSAGE` - Ghi nhận thông tin, có thể thực hiện hoặc không |
| `MessageStep` | String | Bước hiện tại của message | See table below |
| `OriginMessageService` | String | Service produce ra message | `edu-sf-sis` |
| `OriginMessageCode` | String | ID của đối tượng cần xử lý | `{studentId}` or `{parentId}` |
| `MessageAssigneeServices` | String | Services lắng nghe message | `null` (khi là MESSAGE) |

**MessageStep Values cho SIS Events**:

| MessageStep | Event | Description |
|-------------|-------|-------------|
| `MESSAGE.STUDENT.ACTIVATED.1` | StudentActivatedEvent | Student đã được kích hoạt |
| `MESSAGE.STUDENT.SUSPENDED.1` | StudentSuspendedEvent | Student đã bị tạm ngưng |
| `MESSAGE.STUDENT.REACTIVATED.1` | StudentReactivatedEvent | Student đã được kích hoạt lại |
| `MESSAGE.STUDENT.IMPORTED.1` | StudentImportedEvent | Import batch đã hoàn thành |
| `MESSAGE.PARENT.ACTIVATED.1` | ParentActivatedEvent | Parent đã được kích hoạt |
| `MESSAGE.PARENT.SUSPENDED.1` | ParentSuspendedEvent | Parent đã bị tạm ngưng |
| `MESSAGE.PARENT.REACTIVATED.1` | ParentReactivatedEvent | Parent đã được kích hoạt lại |

---

#### 5.3.3 Message Payload by Event Type

##### StudentActivatedEvent Payload

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `students` | Array[Object] | Yes | Danh sách students được kích hoạt |
| `result` | Boolean | No | Kết quả xử lý batch (null khi publish request, true/false khi response) |

**Student Object Structure:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `studentId` | Long | Yes | Student ID |
| `tenantId` | Long | Yes | Tenant ID |
| `studentCode` | String | Yes | Mã student (STU-{tenantId}-{seq}) |
| `firstName` | String | Yes | Tên |
| `lastName` | String | Yes | Họ |
| `email` | String | Yes | Email |
| `isMinor` | Boolean | Yes | Học sinh nhỏ tuổi hay không |
| `ssoUserId` | Long | No | SSO User ID (null khi publish request, có giá trị khi response từ identity service) |
| `status` | String | Yes | ACTIVE |
| `activatedAt` | String | Yes | Thời điểm kích hoạt (ISO 8601) |
| `activatedBy` | Long | Yes | User ID kích hoạt |
| `parents` | Array[Object] | No | Danh sách phụ huynh (nếu isMinor=true) |
| `mailSent` | Boolean | No | Trạng thái gửi email cho student này (tracking nội bộ) |

**Parent Object Structure (nested in Student):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `parentId` | Long | Yes | Parent ID |
| `firstName` | String | Yes | Tên |
| `lastName` | String | Yes | Họ |
| `email` | String | Yes | Email |
| `relationship` | String | Yes | Mối quan hệ (FATHER/MOTHER/GUARDIAN) |

##### StudentSuspendedEvent / StudentReactivatedEvent Payload

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `students` | Array[Object] | Yes | Danh sách students bị suspend/reactivate |

**Student Object Structure:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `studentId` | Long | Yes | Student ID |
| `tenantId` | Long | Yes | Tenant ID |
| `studentCode` | String | Yes | Mã student |
| `email` | String | Yes | Email |
| `isMinor` | Boolean | Yes | Học sinh nhỏ tuổi hay không |
| `ssoUserId` | Long | Yes | SSO User ID |
| `previousStatus` | String | Yes | Trạng thái trước |
| `currentStatus` | String | Yes | Trạng thái hiện tại (SUSPENDED / ACTIVE) |
| `reason` | String | No | Lý do thay đổi |
| `changedAt` | String | Yes | Thời điểm thay đổi (ISO 8601) |
| `changedBy` | Long | Yes | User ID thay đổi |
| `parents` | Array[Object] | No | Danh sách phụ huynh (nếu isMinor=true, để gửi thông báo) |

> **Note**: Parent object structure giống như trong StudentActivatedEvent

##### StudentImportedEvent Payload

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `importId` | String | Yes | Import batch ID (UUID) |
| `tenantId` | Long | Yes | Tenant ID |
| `totalRows` | Integer | Yes | Tổng số dòng trong file |
| `successCount` | Integer | Yes | Số dòng import thành công |
| `failureCount` | Integer | Yes | Số dòng import thất bại |
| `fileName` | String | Yes | Tên file import |
| `importedAt` | String | Yes | Thời điểm import (ISO 8601) |
| `importedBy` | Long | Yes | User ID người import |
| `students` | Array[Object] | Yes | Danh sách students đã import thành công (rút gọn nếu > 100) |

**Student Object Structure (for ImportedEvent):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `studentId` | Long | Yes | Student ID |
| `studentCode` | String | Yes | Mã student |
| `email` | String | Yes | Email |

##### ParentActivatedEvent Payload

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `parents` | Array[Object] | Yes | Danh sách parents được kích hoạt |
| `result` | Boolean | No | Kết quả xử lý batch (null khi publish request, true/false khi response) |

**Parent Object Structure:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `parentId` | Long | Yes | Parent ID |
| `tenantId` | Long | Yes | Tenant ID |
| `firstName` | String | Yes | Tên |
| `lastName` | String | Yes | Họ |
| `email` | String | Yes | Email |
| `ssoUserId` | Long | No | SSO User ID (null khi publish request, có giá trị khi response từ identity service) |
| `relationship` | String | Yes | Mối quan hệ (FATHER/MOTHER/GUARDIAN) |
| `status` | String | Yes | ACTIVE |
| `activatedAt` | String | Yes | Thời điểm kích hoạt (ISO 8601) |
| `activatedBy` | Long | Yes | User ID kích hoạt |
| `mailSent` | Boolean | No | Trạng thái gửi email cho parent này (tracking nội bộ) |

##### ParentSuspendedEvent / ParentReactivatedEvent Payload

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `parents` | Array[Object] | Yes | Danh sách parents bị suspend/reactivate |

**Parent Object Structure:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `parentId` | Long | Yes | Parent ID |
| `tenantId` | Long | Yes | Tenant ID |
| `email` | String | Yes | Email |
| `ssoUserId` | Long | Yes | SSO User ID |
| `previousStatus` | String | Yes | Trạng thái trước |
| `currentStatus` | String | Yes | Trạng thái hiện tại (SUSPENDED / ACTIVE) |
| `reason` | String | No | Lý do thay đổi |
| `changedAt` | String | Yes | Thời điểm thay đổi (ISO 8601) |
| `changedBy` | Long | Yes | User ID thay đổi |

---

#### 5.3.4 Complete Message Example

**StudentActivatedEvent (Request - sf-sis publish)**:

```json
{
  "attributes": {
    "MessageGroup": "MESSAGE",
    "MessageStep": "MESSAGE.STUDENT.ACTIVATED.1",
    "OriginMessageService": "sf-sis",
    "OriginMessageCode": "456",
    "MessageAssigneeServices": null
  },
  "payload": {
    "students": [
      {
        "studentId": 456,
        "tenantId": 1,
        "studentCode": "STU-1-00001",
        "firstName": "Nguyen Van",
        "lastName": "A",
        "email": "student@example.com",
        "isMinor": true,
        "ssoUserId": null,
        "status": "ACTIVE",
        "activatedAt": "2024-12-22T10:35:00.000Z",
        "activatedBy": 123,
        "parents": [
          {
            "parentId": 789,
            "firstName": "Nguyen Thi",
            "lastName": "B",
            "email": "parent@example.com",
            "relationship": "MOTHER"
          }
        ],
        "mailSent": null
      }
    ],
    "result": null
  }
}
```

**StudentActivatedEvent (Response - edu-saas-control-identity publish)**:

```json
{
  "attributes": {
    "MessageGroup": "MESSAGE",
    "MessageStep": "MESSAGE.STUDENT.ACTIVATED.1",
    "OriginMessageService": "sf-sis",
    "OriginMessageCode": "456",
    "MessageAssigneeServices": null
  },
  "payload": {
    "students": [
      {
        "studentId": 456,
        "tenantId": 1,
        "studentCode": "STU-1-00001",
        "firstName": "Nguyen Van",
        "lastName": "A",
        "email": "student@example.com",
        "isMinor": true,
        "ssoUserId": 789,
        "status": "ACTIVE",
        "activatedAt": "2024-12-22T10:35:00.000Z",
        "activatedBy": 123,
        "parents": [
          {
            "parentId": 789,
            "firstName": "Nguyen Thi",
            "lastName": "B",
            "email": "parent@example.com",
            "relationship": "MOTHER"
          }
        ],
        "mailSent": false
      }
    ],
    "result": true
  }
}
```

**StudentSuspendedEvent**:

```json
{
  "attributes": {
    "MessageGroup": "MESSAGE",
    "MessageStep": "MESSAGE.STUDENT.SUSPENDED.1",
    "OriginMessageService": "sf-sis",
    "OriginMessageCode": "456",
    "MessageAssigneeServices": null
  },
  "payload": {
    "students": [
      {
        "studentId": 456,
        "tenantId": 1,
        "studentCode": "STU-1-00001",
        "email": "student@example.com",
        "isMinor": true,
        "ssoUserId": 789,
        "previousStatus": "ACTIVE",
        "currentStatus": "SUSPENDED",
        "reason": "Vi phạm nội quy",
        "changedAt": "2024-12-22T15:00:00.000Z",
        "changedBy": 123,
        "parents": [
          {
            "parentId": 789,
            "firstName": "Nguyen Thi",
            "lastName": "B",
            "email": "parent@example.com",
            "relationship": "MOTHER"
          }
        ]
      }
    ]
  }
}
```

**StudentImportedEvent**:

```json
{
  "attributes": {
    "MessageGroup": "MESSAGE",
    "MessageStep": "MESSAGE.STUDENT.IMPORTED.1",
    "OriginMessageService": "sf-sis",
    "OriginMessageCode": "batch-uuid-123",
    "MessageAssigneeServices": null
  },
  "payload": {
    "importId": "batch-uuid-123",
    "tenantId": 1,
    "totalRows": 150,
    "successCount": 147,
    "failureCount": 3,
    "fileName": "students_import_2024.xlsx",
    "importedAt": "2024-12-22T10:00:00.000Z",
    "importedBy": 123,
    "students": [
      {
        "studentId": 456,
        "studentCode": "STU-1-00001",
        "email": "student1@example.com"
      },
      {
        "studentId": 457,
        "studentCode": "STU-1-00002",
        "email": "student2@example.com"
      },
      {
        "studentId": 458,
        "studentCode": "STU-1-00003",
        "email": "student3@example.com"
      }
    ]
  }
}
```

**ParentActivatedEvent (Request - sf-sis publish)**:

```json
{
  "attributes": {
    "MessageGroup": "MESSAGE",
    "MessageStep": "MESSAGE.PARENT.ACTIVATED.1",
    "OriginMessageService": "sf-sis",
    "OriginMessageCode": "789",
    "MessageAssigneeServices": null
  },
  "payload": {
    "parents": [
      {
        "parentId": 789,
        "tenantId": 1,
        "firstName": "Nguyen Thi",
        "lastName": "B",
        "email": "parent@example.com",
        "ssoUserId": null,
        "relationship": "MOTHER",
        "status": "ACTIVE",
        "activatedAt": "2024-12-22T11:00:00.000Z",
        "activatedBy": 123,
        "mailSent": null
      }
    ],
    "result": null
  }
}
```

**ParentActivatedEvent (Response - edu-saas-control-identity publish)**:

```json
{
  "attributes": {
    "MessageGroup": "MESSAGE",
    "MessageStep": "MESSAGE.PARENT.ACTIVATED.1",
    "OriginMessageService": "sf-sis",
    "OriginMessageCode": "789",
    "MessageAssigneeServices": null
  },
  "payload": {
    "parents": [
      {
        "parentId": 789,
        "tenantId": 1,
        "firstName": "Nguyen Thi",
        "lastName": "B",
        "email": "parent@example.com",
        "ssoUserId": 790,
        "relationship": "MOTHER",
        "status": "ACTIVE",
        "activatedAt": "2024-12-22T11:00:00.000Z",
        "activatedBy": 123,
        "mailSent": false
      }
    ],
    "result": true
  }
}
```

---

### 5.4 Consumer Groups

#### 5.4.1 Consumer Group: sf-lms

**Purpose:** Đồng bộ student data sang LMS để quản lý learner accounts

**Topic:** `aeh-{prod/nonprod}-{env}-sis-cqrs-saas`

**Event Handlers:**

| MessageStep | Handler | Action |
|-------------|---------|--------|
| MESSAGE.STUDENT.ACTIVATED.1 | StudentActivatedHandler | Tạo LMS learner account với ssoUserId |
| MESSAGE.STUDENT.SUSPENDED.1 | StudentSuspendedHandler | Suspend LMS access (disable login) |
| MESSAGE.STUDENT.REACTIVATED.1 | StudentReactivatedHandler | Restore LMS access (enable login) |

**Configuration:**
- **Group ID:** `sf-lms-sis-consumer-group`
- **Concurrency:** 10 (matching partition count)
- **Auto Offset Commit:** false (manual commit after processing)
- **Retry Policy:** 3 retries with exponential backoff (1s, 2s, 4s)

**Error Handling:**
- Failed events after 3 retries → Send to Dead Letter Queue
- DLQ Topic: `aeh-{prod/nonprod}-{env}-sis-dlq`

---

#### 5.4.2 Consumer Group: sf-notification

**Purpose:** Gửi email/notification cho students/parents

**Topic:** `aeh-{prod/nonprod}-{env}-sf-notification-client`

**Event Handlers:**

| MessageStep | Handler | Action |
|-------------|---------|--------|
| MESSAGE.STUDENT.ACTIVATED.1 | StudentActivatedNotificationHandler | Gửi activation email với link LMS |
| MESSAGE.STUDENT.SUSPENDED.1 | StudentSuspendedNotificationHandler | Gửi email thông báo tạm ngưng |
| MESSAGE.STUDENT.REACTIVATED.1 | StudentReactivatedNotificationHandler | Gửi email thông báo kích hoạt lại |
| MESSAGE.STUDENT.IMPORTED.1 | StudentImportedNotificationHandler | Gửi email summary import kết quả |
| MESSAGE.PARENT.ACTIVATED.1 | ParentActivatedNotificationHandler | Gửi activation email với link portal |
| MESSAGE.PARENT.SUSPENDED.1 | ParentSuspendedNotificationHandler | Gửi email thông báo tạm ngưng |
| MESSAGE.PARENT.REACTIVATED.1 | ParentReactivatedNotificationHandler | Gửi email thông báo kích hoạt lại |

**Configuration:**
- **Group ID:** `sf-notification-sis-consumer-group`
- **Concurrency:** 10 (matching partition count)
- **Auto Offset Commit:** false
- **Retry Policy:** 5 retries (email sending có thể retry nhiều hơn)

**Email Templates:**
- **Student Activation**: Chào mừng + LMS login credentials + link LMS
- **Parent Activation**: Chào mừng + Portal login credentials + link portal
- **Student Suspended**: Thông báo tạm ngưng + lý do + contact info
- **Student Reactivated**: Thông báo kích hoạt lại + link LMS
- **Parent Suspended**: Thông báo tạm ngưng + lý do + contact info
- **Parent Reactivated**: Thông báo kích hoạt lại + link portal
- **Import Summary**: Tổng kết import (success count, failure count, error details)

---

#### 5.4.3 Consumer Group: edu-saas-control-identity

**Purpose:** Tạo SSO user cho student/parent và publish response event

**Topic:** `aeh-{prod/nonprod}-{env}-sis-cqrs-saas`

**Event Handlers:**

| MessageStep | Handler | Action |
|-------------|---------|--------|
| MESSAGE.STUDENT.ACTIVATED.1 | CreateStudentSsoUserHandler | Kiểm tra `ssoUserId == null` → Tạo SSO user → Publish response event với `result` và `ssoUserId` |
| MESSAGE.PARENT.ACTIVATED.1 | CreateParentSsoUserHandler | Kiểm tra `ssoUserId == null` → Tạo SSO user → Publish response event với `result` và `ssoUserId` |

**Configuration:**
- **Group ID:** `edu-saas-control-identity-sis-consumer-group`
- **Concurrency:** 10 (matching partition count)
- **Auto Offset Commit:** false
- **Retry Policy:** 3 retries with exponential backoff

**Event Filter Logic:**
- Chỉ xử lý events có `ssoUserId == null` và `result == null` (request events)
- Skip events đã có `ssoUserId` và `result` (response events)

**Response Event Publishing:**
- Publish lại cùng MessageStep về topic `sis-cqrs-saas`
- Giữ nguyên toàn bộ payload gốc + bổ sung:
  - `ssoUserId`: ID của user vừa tạo
  - `result`: true (thành công) hoặc false (thất bại)
  - `mailSent`: false (chưa gửi mail)

---

#### 5.4.4 Consumer Group: sf-sis (Response Handler)

**Purpose:** Nhận response từ edu-saas-control-identity và cập nhật ssoUserId

**Topic:** `aeh-{prod/nonprod}-{env}-sis-cqrs-saas`

**Event Handlers:**

| MessageStep | Handler | Action |
|-------------|---------|--------|
| MESSAGE.STUDENT.ACTIVATED.1 | StudentActivatedResponseHandler | Kiểm tra `result != null` → Cập nhật `student.sso_user_id = ssoUserId` |
| MESSAGE.PARENT.ACTIVATED.1 | ParentActivatedResponseHandler | Kiểm tra `result != null` → Cập nhật `parent.sso_user_id = ssoUserId` |

**Configuration:**
- **Group ID:** `sf-sis-response-consumer-group`
- **Concurrency:** 10 (matching partition count)
- **Auto Offset Commit:** false
- **Retry Policy:** 3 retries with exponential backoff

**Event Filter Logic:**
- Chỉ xử lý events có `result != null` và `ssoUserId != null` (response events)
- Skip events có `result == null` (request events)

**Error Handling:**
- Nếu `result == false`: Log error, không update ssoUserId, notify admin
- Nếu `result == true`: Update student/parent record với ssoUserId

---

### 5.5 Cache Strategy

**Purpose:** Cache invalidation khi có thay đổi student/parent data

**Cache Key Patterns:**

```
sis:student:search:{tenantId}:{hash(query)}       # Search results cache
sis:student:detail:{studentId}                    # Student detail cache
sis:parent:search:{tenantId}:{hash(query)}        # Parent search results cache
sis:parent:detail:{parentId}                      # Parent detail cache
```

**Cache TTL:** 5 minutes

**Cache Invalidation Strategy:**

| Event | Cache Keys to Invalidate |
|-------|-------------------------|
| StudentActivatedEvent | `sis:student:search:{tenantId}:*` + `sis:student:detail:{studentId}` |
| StudentSuspendedEvent | `sis:student:search:{tenantId}:*` + `sis:student:detail:{studentId}` |
| StudentReactivatedEvent | `sis:student:search:{tenantId}:*` + `sis:student:detail:{studentId}` |
| ParentActivatedEvent | `sis:parent:search:{tenantId}:*` + `sis:parent:detail:{parentId}` |
| ParentSuspendedEvent | `sis:parent:search:{tenantId}:*` + `sis:parent:detail:{parentId}` |
| ParentReactivatedEvent | `sis:parent:search:{tenantId}:*` + `sis:parent:detail:{parentId}` |

**Implementation:**

```java
// adapters/infrastructure/in/event/consumer/CacheInvalidationEventConsumer.java
@Service
public class CacheInvalidationEventConsumer {

    private final RedisTemplate<String, String> redisTemplate;

    @KafkaListener(topics = {
        "edu.saas.sis.student.activated",
        "edu.saas.sis.student.suspended",
        "edu.saas.sis.student.reactivated"
    }, groupId = "sis-cache-invalidation-group")
    public void handleStudentEvent(SisEvent event) {
        Long tenantId = (Long) event.getPayload().get("tenantId");
        Long studentId = (Long) event.getPayload().get("studentId");

        // Invalidate search cache
        String searchPattern = String.format("sis:student:search:%d:*", tenantId);
        Set<String> searchKeys = redisTemplate.keys(searchPattern);
        if (searchKeys != null && !searchKeys.isEmpty()) {
            redisTemplate.delete(searchKeys);
        }

        // Invalidate detail cache
        String detailKey = String.format("sis:student:detail:%d", studentId);
        redisTemplate.delete(detailKey);
    }

    @KafkaListener(topics = {
        "edu.saas.sis.parent.activated",
        "edu.saas.sis.parent.suspended",
        "edu.saas.sis.parent.reactivated"
    }, groupId = "sis-cache-invalidation-group")
    public void handleParentEvent(SisEvent event) {
        Long tenantId = (Long) event.getPayload().get("tenantId");
        Long parentId = (Long) event.getPayload().get("parentId");

        // Invalidate search cache
        String searchPattern = String.format("sis:parent:search:%d:*", tenantId);
        Set<String> searchKeys = redisTemplate.keys(searchPattern);
        if (searchKeys != null && !searchKeys.isEmpty()) {
            redisTemplate.delete(searchKeys);
        }

        // Invalidate detail cache
        String detailKey = String.format("sis:parent:detail:%d", parentId);
        redisTemplate.delete(detailKey);
    }
}
```

---

### 5.6 Event Processing Guarantees

#### 5.6.1 At-Least-Once Delivery

**Guarantee:** Kafka ensures at-least-once delivery với producer configuration:

```yaml
spring:
  kafka:
    producer:
      acks: all                          # Wait for all replicas to acknowledge
      enable-idempotence: true           # Deduplication at producer level
      retries: 3                         # Retry failed sends
      compression-type: snappy           # Compress messages
```

**Implication:**
- Events có thể được delivered nhiều lần (duplicates)
- Consumers PHẢI implement idempotency handling

---

#### 5.6.2 Idempotency Handling

**Strategy:** Sử dụng `eventId` (UUID) làm idempotency key

**Database Table:**

```sql
CREATE TABLE sis_processed_event (
    id BIGSERIAL PRIMARY KEY,
    event_id VARCHAR(50) UNIQUE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    tenant_id BIGINT NOT NULL,
    entity_id BIGINT NOT NULL,
    processed_at TIMESTAMP NOT NULL DEFAULT NOW(),

    -- Indexes
    INDEX idx_processed_event_lookup (event_id),
    INDEX idx_processed_event_cleanup (processed_at) WHERE processed_at < NOW() - INTERVAL '7 days'
);
```

**Consumer Idempotency Pattern:**

```java
@KafkaListener(topics = "edu.saas.sis.student.activated", groupId = "sf-lms-sis-consumer-group")
public void handleStudentActivatedEvent(
    SisEvent event,
    Acknowledgment acknowledgment
) {
    String eventId = event.getEventId();
    Long studentId = (Long) event.getPayload().get("studentId");

    // 1. Check if already processed
    if (processedEventRepo.existsByEventId(eventId)) {
        log.info("Event already processed: eventId={}, studentId={}", eventId, studentId);
        acknowledgment.acknowledge();
        return; // Skip duplicate
    }

    try {
        // 2. Process event (business logic)
        Long ssoUserId = (Long) event.getPayload().get("ssoUserId");
        lmsService.createLearnerAccount(studentId, ssoUserId);

        // 3. Mark as processed (within same transaction if possible)
        ProcessedEventEntity processedEvent = new ProcessedEventEntity();
        processedEvent.setEventId(eventId);
        processedEvent.setEventType(event.getEventType());
        processedEvent.setTenantId(event.getTenantId());
        processedEvent.setEntityId(studentId);
        processedEventRepo.save(processedEvent);

        // 4. Commit offset
        acknowledgment.acknowledge();
        log.info("Successfully processed event: eventId={}, studentId={}", eventId, studentId);

    } catch (Exception e) {
        log.error("Failed to process event: eventId={}, studentId={}", eventId, studentId, e);
        // Don't acknowledge → Kafka will retry
        throw e;
    }
}
```

**Cleanup Job:**

```java
// Cron job chạy daily để cleanup old processed events
@Scheduled(cron = "0 0 2 * * *")  // Run at 2 AM daily
public void cleanupOldProcessedEvents() {
    LocalDateTime cutoffDate = LocalDateTime.now().minusDays(7);
    int deleted = processedEventRepo.deleteByProcessedAtBefore(cutoffDate);
    log.info("Cleaned up {} old processed events", deleted);
}
```

---

#### 5.6.3 Failure Handling & Dead Letter Queue (DLQ)

**DLQ Strategy:** Events failed sau N retries được gửi vào Dead Letter Queue để investigate

**Configuration:**

```yaml
spring:
  kafka:
    consumer:
      enable-auto-commit: false
    listener:
      ack-mode: manual
    retry:
      max-attempts: 3
      backoff:
        initial-interval: 1000ms
        multiplier: 2
        max-interval: 10000ms
```

**DLQ Topic:** `edu.saas.sis.dlq`

**DLQ Message Format:**

```json
{
  "originalTopic": "edu.saas.sis.student.activated",
  "originalPartition": 3,
  "originalOffset": 12345,
  "failedAt": "2024-12-22T15:30:00Z",
  "retryCount": 3,
  "errorMessage": "Failed to create LMS account: Connection timeout",
  "stackTrace": "com.example.LmsServiceException: Connection timeout\n\tat ...",
  "originalEvent": {
    "eventId": "uuid",
    "eventType": "StudentActivatedEvent",
    "eventVersion": "1.0",
    "timestamp": "2024-12-22T10:35:00.000Z",
    "tenantId": 1,
    "userId": 123,
    "username": "admin@school.edu.vn",
    "payload": {
      "studentId": 456,
      "studentCode": "STU-1-00001",
      "email": "student@example.com",
      "ssoUserId": 789,
      "status": "ACTIVE"
    }
  }
}
```

**DLQ Monitoring & Replay:**

1. **Monitoring**: Alert khi có messages trong DLQ (CloudWatch alarm)
2. **Investigation**: Review DLQ messages để identify root cause
3. **Manual Replay**: Sau khi fix issue, replay messages từ DLQ:

```java
@RestController
@RequestMapping("/api/internal/sis/dlq")
public class SisDlqReplayController {

    @PostMapping("/replay")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReplayResult> replayDlqMessages(
        @RequestParam String eventType,
        @RequestParam Long fromOffset,
        @RequestParam Long toOffset
    ) {
        // Read messages from DLQ topic
        List<DlqMessage> messages = dlqService.readMessages(
            "edu.saas.sis.dlq",
            eventType,
            fromOffset,
            toOffset
        );

        // Replay each message to original topic
        ReplayResult result = dlqService.replayMessages(messages);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/summary")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DlqSummary> getDlqSummary() {
        DlqSummary summary = dlqService.getSummary("edu.saas.sis.dlq");
        return ResponseEntity.ok(summary);
    }
}
```

**Alert Rules:**
- Alert if DLQ message count > 10 within 5 minutes
- Alert if same eventType fails repeatedly (> 5 times in 1 hour)
- Daily DLQ summary report to DevOps team

---
## 6. APPENDIX

### 6.1 Business Rules

#### 6.1.1 Minor Student Rules

| Rule ID | Rule Description | Enforcement | US Reference |
|---------|------------------|-------------|--------------|
| **BR-MS-001** | Minor student (`is_minor = true`) **MUST** have parent before activation | Application logic | US-SIS-001 AC-10 |
| **BR-MS-002** | Minor student **CANNOT** unlink parent after activation (status = ACTIVE) | Application logic | US-SIS-006 AC-2.5 |
| **BR-MS-003** | Minor student **CAN** unlink parent if status = PENDING_INVITATION | Application logic | US-SIS-006 AC-2.5 |
| **BR-MS-004** | `is_minor` field is **IMMUTABLE** after creation | Application logic + UI readonly | US-SIS-008 AC-4 |

#### 6.1.2 Email Uniqueness Rules

| Rule ID | Rule Description | Enforcement | US Reference |
|---------|------------------|-------------|--------------|
| **BR-EMAIL-001** | Email **UNIQUE** within STUDENT role per tenant | Database UNIQUE constraint | US-SIS-003 AC-3 |
| **BR-EMAIL-002** | Email **UNIQUE** within PARENT role per tenant | Database UNIQUE constraint | US-SIS-005 AC-3 |
| **BR-EMAIL-003** | Email **CAN** exist across different roles (multi-role) | Application logic | US-SIS-003 AC-1 |
| **BR-EMAIL-004** | Email **READONLY** after activation (status ≠ PENDING_INVITATION) | Application logic + UI readonly | US-SIS-008 AC-2, AC-3 |

#### 6.1.3 Multi-role Rules

| Rule ID | Rule Description | Enforcement | US Reference |
|---------|------------------|-------------|--------------|
| **BR-MULTI-001** | One email = **ONE** record per role per tenant | Database UNIQUE constraint | US-SIS-003 |
| **BR-MULTI-002** | One email = **MULTIPLE** records across different roles per tenant (allowed) | Application logic | US-SIS-003 AC-1 |
| **BR-MULTI-003** | SSO account **SHARED** across multiple roles (same `sso_user_id`) | Application logic | HLD |
| **BR-MULTI-004** | Display multi-role warning when creating Student/Parent with existing email in other role | UI warning dialog | US-SIS-003 AC-1 |

#### 6.1.4 Activation Rules

| Rule ID | Rule Description | Enforcement | US Reference |
|---------|------------------|-------------|--------------|
| **BR-ACT-001** | Only students with status = PENDING_INVITATION can be activated | Application logic | US-SIS-001 AC-9 |
| **BR-ACT-002** | Activation creates SSO account via `GetOrCreateTenantUser` API | Integration with SSO | US-SIS-001 AC-9 |
| **BR-ACT-003** | After activation, `sso_user_id` must be set | Application logic | US-SIS-001 AC-9 |
| **BR-ACT-004** | Activation triggers `StudentActivatedEvent` → LMS account creation | Event-driven | US-SIS-001 AC-9 |
| **BR-ACT-005** | Only students with status = PENDING_INVITATION can be deleted | Application logic | US-SIS-001 AC-14, AC-15 |

#### 6.1.5 Student-Parent Relationship Rules

| Rule ID | Rule Description | Enforcement | US Reference |
|---------|------------------|-------------|--------------|
| **BR-REL-001** | One student = **MAX 1 parent** | Application logic | US-SIS-006 AC-2.1 |
| **BR-REL-002** | One parent = **MULTIPLE students** (allowed) | Application logic | US-SIS-007 AC-2.1 |
| **BR-REL-003** | Relationship types: FATHER, MOTHER, GRANDFATHER, GRANDMOTHER, SIBLING, GUARDIAN, OTHER | Enum validation | US-SIS-006 AC-2.3 |
| **BR-REL-004** | `is_primary` always = `true` (since only 1 parent per student) | Application logic | Section 3.1.3 |

#### 6.1.6 Import Rules

| Rule ID | Rule Description | Enforcement | US Reference |
|---------|------------------|-------------|--------------|
| **BR-IMP-001** | Max **1000 rows** per import file | Application logic | US-SIS-004 AC-3 |
| **BR-IMP-002** | File format: Excel (.xlsx) or CSV only | Application logic | US-SIS-004 AC-1 |
| **BR-IMP-003** | **All-or-nothing validation**: If 1 row fails → rollback all | Transaction management | US-SIS-004 AC-2 |
| **BR-IMP-004** | No duplicate emails within import file | Application logic | US-SIS-004 AC-4 |
| **BR-IMP-005** | If `is_minor=true`, `parent_email` must exist in database | Application logic | US-SIS-004 AC-2 |

---

### 6.2 Constraints

#### 6.2.1 Field Validation Constraints

**Student Entity:**

| Field | Constraint | Validation | Error Message |
|-------|-----------|------------|---------------|
| `firstName` | Required, max 100 chars | `@NotBlank @Size(max=100)` | "Vui lòng nhập tên học sinh" |
| `lastName` | Required, max 100 chars | `@NotBlank @Size(max=100)` | "Vui lòng nhập họ học sinh" |
| `email` | Required, RFC 5322 format, unique | `@NotBlank @Email` | "Email không hợp lệ" |
| `phone` | Optional, Vietnam phone format | Regex: `^(\\+84\|0)[0-9]{9}$` | "Số điện thoại không hợp lệ" |
| `dateOfBirth` | Optional, not future date | `@Past` | "Ngày sinh không được là ngày tương lai" |
| `gender` | Optional, enum | MALE, FEMALE, OTHER | "Giới tính không hợp lệ" |
| `isMinor` | Required, boolean | `@NotNull` | "Vui lòng chọn loại học sinh" |
| `address` | Optional, max 255 chars | `@Size(max=255)` | "Địa chỉ quá dài" |
| `notes` | Optional, max 500 chars | `@Size(max=500)` | "Ghi chú quá dài" |

**Parent Entity:**

| Field | Constraint | Validation | Error Message |
|-------|-----------|------------|---------------|
| `firstName` | Required, max 100 chars | `@NotBlank @Size(max=100)` | "Vui lòng nhập tên phụ huynh" |
| `lastName` | Required, max 100 chars | `@NotBlank @Size(max=100)` | "Vui lòng nhập họ phụ huynh" |
| `email` | Required, RFC 5322 format, unique | `@NotBlank @Email` | "Email không hợp lệ" |
| `phone` | Optional, Vietnam phone format | Regex: `^(\\+84\|0)[0-9]{9}$` | "Số điện thoại không hợp lệ" |
| `relationship` | Required, enum | FATHER, MOTHER, ... | "Vui lòng chọn mối quan hệ" |
| `occupation` | Optional, max 100 chars | `@Size(max=100)` | "Nghề nghiệp quá dài" |
| `address` | Optional, max 255 chars | `@Size(max=255)` | "Địa chỉ quá dài" |
| `notes` | Optional, max 500 chars | `@Size(max=500)` | "Ghi chú quá dài" |

#### 6.2.2 Database Constraints

**Unique Constraints:**

| Table | Constraint Name | Columns | Purpose |
|-------|----------------|---------|---------|
| `student` | `uq_student_email_tenant` | `(email, tenant_id)` | Ensure email unique per tenant |
| `student` | `uq_student_code_tenant` | `(student_code, tenant_id)` | Ensure student_code unique per tenant |
| `parent` | `uq_parent_email_tenant` | `(email, tenant_id)` | Ensure email unique per tenant |
| `student_parent` | `uq_student_parent` | `(student_id, parent_id)` | Prevent duplicate links |

**Check Constraints:**

| Table | Constraint Name | Condition | Purpose |
|-------|----------------|-----------|---------|
| `student` | `chk_student_status` | `status IN ('PENDING_INVITATION', 'ACTIVE', 'INACTIVE', 'SUSPENDED')` | Valid status values |
| `student` | `chk_student_gender` | `gender IN ('MALE', 'FEMALE', 'OTHER')` | Valid gender values |
| `parent` | `chk_parent_status` | `status IN ('PENDING_INVITATION', 'ACTIVE', 'INACTIVE')` | Valid status values |

**Foreign Key Constraints:**

| Table | Constraint Name | Referenced Table | Purpose |
|-------|----------------|------------------|---------|
| `student_parent` | `fk_student` | `student(id)` | Ensure student exists |
| `student_parent` | `fk_parent` | `parent(id)` | Ensure parent exists |

**Indexes:**

| Table | Index Name | Columns | Type | Purpose |
|-------|-----------|---------|------|---------|
| `student` | `idx_student_tenant` | `(tenant_id)` | B-Tree | Fast tenant filtering |
| `student` | `idx_student_email` | `(email)` | B-Tree | Fast email lookup |
| `student` | `idx_student_phone` | `(tenant_id, phone)` | B-Tree | Fast phone search |
| `student` | `idx_student_status` | `(status)` | B-Tree | Fast status filtering |
| `student` | `idx_student_sso_user` | `(sso_user_id)` | B-Tree | Fast SSO user lookup |
| `parent` | `idx_parent_tenant` | `(tenant_id)` | B-Tree | Fast tenant filtering |
| `parent` | `idx_parent_email` | `(email)` | B-Tree | Fast email lookup |
| `student_parent` | `idx_student_parent_student` | `(student_id)` | B-Tree | Fast student lookup |
| `student_parent` | `idx_student_parent_parent` | `(parent_id)` | B-Tree | Fast parent lookup |

---

### 6.3 Performance Requirements

#### 6.3.1 API Response Time

| Operation | Target Response Time | Max Response Time | Measurement |
|-----------|---------------------|-------------------|-------------|
| **Search Students** (paginated) | < 200ms | < 500ms | P95 |
| **Create Student** | < 300ms | < 1s | P95 |
| **Activate Student** (single) | < 1s | < 3s | P95 (includes SSO call) |
| **Bulk Activate** (10 students) | < 5s | < 10s | P95 |
| **Import Students** (1000 rows) | < 30s | < 60s | P95 |
| **Search Parents** (paginated) | < 200ms | < 500ms | P95 |

#### 6.3.2 Import Performance

| Metric | Requirement | Rationale |
|--------|-------------|-----------|
| **Max rows per file** | 1000 rows | Prevent long-running transactions | US-SIS-004 AC-3 |
| **File size** | < 5MB | Prevent memory issues |
| **Processing time** | < 30s for 1000 rows | User experience |
| **Validation strategy** | All-or-nothing | Data consistency | US-SIS-004 AC-2 |
| **Transaction scope** | Single transaction for all rows | Atomicity |

#### 6.3.3 Caching Performance

| Cache | Key Pattern | TTL | Hit Ratio Target |
|-------|------------|-----|-----------------|
| **Search Results** | `sis:student:search:{tenantId}:{hash}` | 5 minutes | > 70% |
| **Student Detail** | `sis:student:detail:{id}` | 5 minutes | > 80% |
| **Parent Search** | `sis:parent:search:{tenantId}:{hash}` | 5 minutes | > 70% |

#### 6.3.4 Database Performance

| Metric | Requirement | Monitoring |
|--------|-------------|------------|
| **Query execution time** | < 100ms for indexed queries | CloudWatch RDS metrics |
| **Connection pool** | Max 20 connections (HikariCP) | Application metrics |
| **Slow query threshold** | > 1s | PostgreSQL slow query log |
| **Index usage** | > 95% of queries use indexes | EXPLAIN ANALYZE |

#### 6.3.5 Event Processing Performance

| Metric | Requirement | SLA |
|--------|-------------|-----|
| **Event publish time** | < 50ms | P95 |
| **Consumer lag** | < 10s | Average |
| **Event processing time** | < 1s per event | P95 |
| **DLQ threshold** | < 0.1% of events | Alert if exceeded |

---

### 6.4 Glossary

| Term | Definition |
|------|------------|
| **SIS** | Student Information System - Module quản lý thông tin học sinh và phụ huynh |
| **SSO** | Single Sign-On - Hệ thống xác thực tập trung (`edu-saas-control-identity`) |
| **LMS** | Learning Management System - Hệ thống quản lý học tập (`sf-lms`) |
| **Minor Student** | Học sinh nhỏ tuổi - học sinh cần phụ huynh giám sát (`is_minor = true`) |
| **Adult Learner** | Người học trưởng thành - học sinh tự quản lý (`is_minor = false`) |
| **Tenant** | Đơn vị tổ chức - trường học hoặc giáo viên tự do |
| **Multi-tenant** | Kiến trúc một ứng dụng phục vụ nhiều tenants với dữ liệu tách biệt |
| **Multi-role** | Một email có thể có nhiều vai trò (Student, Parent, Teacher, Admin) |
| **PENDING_INVITATION** | Trạng thái chờ kích hoạt - chưa có tài khoản SSO |
| **ACTIVE** | Trạng thái đang hoạt động - đã có tài khoản SSO, có thể đăng nhập |
| **INACTIVE** | Trạng thái ngưng hoạt động - tạm thời không sử dụng |
| **SUSPENDED** | Trạng thái tạm ngưng - bị đình chỉ do vi phạm hoặc nợ phí |
| **DDD** | Domain-Driven Design - Phương pháp thiết kế hướng domain |
| **Hexagonal Architecture** | Kiến trúc Ports & Adapters - tách biệt domain và infrastructure |
| **Aggregate** | Tập hợp các entity có consistency boundary rõ ràng |
| **Repository Port** | Interface định nghĩa cách truy cập dữ liệu (trong domain layer) |
| **Adapter** | Triển khai cụ thể của port (trong infrastructure layer) |
| **Command** | Đối tượng chứa thông tin để thực hiện action (write operation) |
| **Query** | Đối tượng chứa thông tin để tìm kiếm (read operation) |
| **Event** | Sự kiện domain đã xảy ra, được publish lên Kafka |
| **Consumer Group** | Nhóm consumer Kafka cùng subscribe một topic |
| **Idempotency** | Khả năng thực hiện cùng một operation nhiều lần mà kết quả giống nhau |
| **DLQ** | Dead Letter Queue - Queue chứa events xử lý thất bại |
| **All-or-nothing** | Tất cả thành công hoặc tất cả thất bại (transaction atomicity) |
| **BaseEntity** | Lớp cơ sở chứa audit fields (created_by, updated_by, created_at, updated_at) |
| **LDM** | Logical Data Model - Domain model không có JPA annotations |
| **PDM** | Physical Data Model - JPA entity với database annotations |
| **ThreadContext** | Ngữ cảnh chứa thông tin tenant, user trong thread hiện tại |

---

### 6.5 References

#### 6.5.1 Internal Documents

| Document | Location | Description |
|----------|----------|-------------|
| **HLD-SF-SIS** | `hld/output/sis/HLD-SF-SIS.md` | High-Level Design for SIS module |
| **US-SIS-001** | `us/input/sis/US-SIS-001-NEW.md` | User Story: Danh sách học sinh |
| **US-SIS-002** | `us/input/sis/US-SIS-002-NEW.md` | User Story: Danh sách phụ huynh |
| **US-SIS-003** | `us/input/sis/US-SIS-003-NEW.md` | User Story: Thêm mới học sinh |
| **US-SIS-004** | `us/input/sis/US-SIS-004-NEW.md` | User Story: Import danh sách học sinh |
| **US-SIS-005** | `us/input/sis/US-SIS-005-NEW.md` | User Story: Thêm mới phụ huynh |
| **US-SIS-006** | `us/input/sis/US-SIS-006-NEW.md` | User Story: Xem chi tiết học sinh |
| **US-SIS-007** | `us/input/sis/US-SIS-007-NEW.md` | User Story: Xem chi tiết phụ huynh |
| **US-SIS-008** | `us/input/sis/US-SIS-008-NEW.md` | User Story: Cập nhật thông tin học sinh |
| **US-SIS-009** | `us/input/sis/US-SIS-009-NEW.md` | User Story: Cập nhật thông tin phụ huynh |
| **US-SIS-010-NEW** | `us/input/sis/US-SIS-010-NEW.md` | Quản lý liên kết học sinh - phụ huynh |
| **SIS-UI-Message-Definition** | `us/input/sis/SIS-UI-Message-Definition.md` | UI Message codes (150+ messages) |
| **DD-SIS-SELLING** | `dd/pimv2/DD-SIS-SELLING.md` | Template reference for DD structure |
| **Coding Rules** | `java-springboot-gradle-rules.mdc` | Java/SpringBoot coding standards |

#### 6.5.2 External References

| Resource | URL | Description |
|----------|-----|-------------|
| **DDD Book** | Domain-Driven Design by Eric Evans | DDD principles and patterns |
| **Hexagonal Architecture** | Alistair Cockburn's Hexagonal Architecture | Ports & Adapters pattern |
| **Spring Boot** | https://spring.io/projects/spring-boot | Spring Boot documentation |
| **Kafka** | https://kafka.apache.org/ | Apache Kafka documentation |
| **PostgreSQL** | https://www.postgresql.org/ | PostgreSQL documentation |
| **RFC 5322** | https://www.rfc-editor.org/rfc/rfc5322 | Email format specification |

#### 6.5.3 API Documentation

| Service | Endpoint | Description |
|---------|----------|-------------|
| **sf-sis** | `POST /api/v1/students` | Create student |
| **sf-sis** | `POST /api/v1/students/activate/bulk` | Bulk activate students |
| **sf-sis** | `POST /api/v1/students/import` | Import students from file |
| **sf-sis** | `POST /api/v1/parents` | Create parent |

---

## Document Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-22 | Claude Sonnet 4.5 | Initial version - Complete DD for SIS module |

---

**END OF DOCUMENT**