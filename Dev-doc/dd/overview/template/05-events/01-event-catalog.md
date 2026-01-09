# 5.1 Event Catalog

> **Hướng dẫn**: Document TẤT CẢ domain events với producer, consumers, và topic mapping.
> Focus vào OVERVIEW TABLE - đủ để dev team hiểu event flow và chia task.

## Event Naming Convention

- Format: `[Aggregate][Action]Event`
- Examples: `OrderCreatedEvent`, `PaymentCompletedEvent`, `InventoryUpdatedEvent`
- Past tense cho actions đã completed
- Present continuous cho actions đang in progress (nếu cần)

---

## 5.1.1 [SERVICE_NAME_1] Events

> Service: [service-name-1]

| Event Name | Producer | Consumer(s) | Topic | Mô tả |
|------------|----------|-------------|-------|-------|
| [Event1]Event | [service-1] | [service-2], [service-3] | [domain].[entity] | [Mô tả event - khi nào raise, purpose gì] |
| [Event2]Event | [service-1] | [service-2] | [domain].[entity] | [Mô tả event] |
| [Event3]Event | [service-1] | [service-4], [notif-service] | [domain].[entity] | [Mô tả event] |

---

## Event Details

### [Event1]Event

**Producer**: [service-name-1]

**Consumers**:
- `[service-2]`: [What this consumer does with the event]
- `[service-3]`: [What this consumer does with the event]

**Topic**: `[domain].[entity]`

**Partition Key**: `[key-field]` (e.g., `aggregateId`, `tenantId`)

> **Detailed partition strategy**: See [5.2 kafka-topics] for partition key selection guidelines

**Raised When**: [Describe the business condition that triggers this event]

**Payload**:
```json
{
  "eventId": "uuid",
  "eventType": "[Event1]Event",
  "aggregateId": "string",
  "aggregateType": "string",
  "occurredAt": "timestamp",
  "tenantId": "string",
  "payload": {
    "[field1]": "value",
    "[field2]": "value",
    "[nested_object]": {
      "[sub_field1]": "value"
    }
  }
}
```

**Business Impact**: [Describe what happens in the business when this event is raised]

---

### [Event2]Event

**Producer**: [service-name-1]

**Consumers**:
- `[service-2]`: [Action taken]

**Topic**: `[domain].[entity]`

**Partition Key**: `[key-field]`

**Raised When**: [Condition]

**Payload**:
```json
{
  "eventId": "uuid",
  "eventType": "[Event2]Event",
  ...
}
```

---

## Event Flow Diagram

```
[Service 1]
    │
    ├──► [Event1]Event ──► Kafka ──► [Service 2]
    │                               └► [Service 3]
    │
    └──► [Event2]Event ──► Kafka ──► [Service 2]

[Service 2]
    │
    └──► [Event4]Event ──► Kafka ──► [Service 1]
                                   └► [Service 3]
```

---

## Event Processing Guarantees

| Event | Guarantee | Idempotency Strategy |
|-------|-----------|---------------------|
| [Event1]Event | At-least-once | Redis key: `idempotency:{eventId}` |
| [Event2]Event | At-least-once | Redis key: `idempotency:{eventId}` |

**Note**: All events use Transactional Outbox pattern for at-least-once delivery guarantee.

> **Implementation details**: See [5.3 cache-strategy] for idempotency key implementation with code examples

---

## Lưu ý quan trọng

- **Overview tables**: Đủ để hiểu event flow và chia task cho team
- **Event details**: Chỉ cần cho critical/complex events - không phải mọi event
- **Payload schema**: List key fields only, không cần paste full JSON cho mọi event
- **Cross-reference**: Link to Section 4 (Workflows) to see event usage in sequence diagrams
- **Implementation**: See `java-springboot-gradle-rules.mdc` for Transactional Outbox pattern code


# 5.2 Kafka Topics Summary

> **Hướng dẫn**: Liệt kê TẤT CẢ Kafka topics với partition strategy, producers, và consumers
>
> **Event definitions**: See [5.1 event-catalog.md] for detailed producer/consumer mappings and event payload schemas

## Topics Overview

| Topic | Description | Partition Key | Partitions | Replication | Retention |
|-------|-------------|---------------|------------|-------------|-----------|
| [domain].[entity] | [Mô tả topic - events gì được publish] | [key-field] | [number] | [number] | [duration] |
| [domain].[entity2] | [Mô tả topic] | [key-field] | [number] | [number] | [duration] |
| [domain].[entity3] | [Mô tả topic] | [key-field] | [number] | [number] | [duration] |

---

## Topic Details

### Topic: `[domain].[entity]`

**Purpose**: [Mô tả chi tiết purpose của topic này]

**Events**:
- `[Event1]Event`
- `[Event2]Event`
- `[Event3]Event`

**Producers**:
- `[service-1]`: Produces [Event1], [Event2]
- `[service-2]`: Produces [Event3]

**Consumers**:
- `[service-3]` (consumer group: `[service-3]-group`)
- `[service-4]` (consumer group: `[service-4]-group`)
- `[notification-service]` (consumer group: `[notification-group]`)

**Partition Strategy**:
- **Key**: `[field-name]` (e.g., `aggregateId`, `tenantId`, `userId`)
- **Reasoning**: [Tại sao chọn key này - ordering requirements, load distribution]
- **Number of Partitions**: [N] (based on [expected throughput / parallelism needs])

**Replication**:
- **Factor**: [N] (e.g., 3 for high availability)
- **Min In-Sync Replicas**: [N] (e.g., 2)

**Retention**:
- **Duration**: [X days/hours] (e.g., 7 days)
- **Size**: [X GB] (optional size-based retention)
- **Compaction**: [Enabled/Disabled]

**Schema**:
- **Format**: JSON / Avro / Protobuf
- **Schema Registry**: [Yes/No]
- **Schema Evolution**: [Backward compatible / Forward compatible]

---

### Topic: `[domain].[entity2]`

**Purpose**: [Mô tả]

**Events**: [List events]

**Producers**: [List]

**Consumers**: [List]

**Partition Strategy**:
- **Key**: `[field-name]`
- **Reasoning**: [Reasoning]

[... other details ...]

---

## Partition Key Strategy Guidelines

### When to use different partition keys:

1. **Entity ID** (e.g., `orderId`, `customerId`):
   - ✅ Use when: Need strict ordering per entity
   - ✅ Example: All events for Order#123 go to same partition
   - ⚠️ Watch out: Hot partitions if some entities much more active

2. **Tenant ID**:
   - ✅ Use when: Multi-tenant system, need tenant isolation
   - ✅ Example: All events for Tenant#456 go to same partition
   - ⚠️ Watch out: Tenant size imbalance can cause hot partitions

3. **Composite Key** (e.g., `{tenantId}:{entityId}`):
   - ✅ Use when: Need both tenant isolation AND entity ordering
   - ✅ Example: `tenant-123:order-456`

4. **Random/Round-Robin** (null key):
   - ✅ Use when: No ordering requirements, maximize parallelism
   - ⚠️ Don't use if ordering matters

---

## Consumer Groups

| Consumer Group | Services | Processing Model | Offset Management |
|----------------|----------|------------------|-------------------|
| [group-name-1] | [service-1] | [Concurrent/Sequential] | [Auto/Manual commit] |
| [group-name-2] | [service-2], [service-3] | [Concurrent/Sequential] | [Auto/Manual commit] |

---

## Topic Configuration

### Production Environment

```yaml
# Example Kafka topic configuration
topics:
  - name: [domain].[entity]
    partitions: 10
    replication: 3
    min-insync-replicas: 2
    retention-ms: 604800000  # 7 days
    segment-ms: 86400000     # 1 day
    compression-type: lz4
    cleanup-policy: delete
```

### Development Environment

```yaml
topics:
  - name: [domain].[entity]
    partitions: 3
    replication: 1
    min-insync-replicas: 1
    retention-ms: 86400000  # 1 day
```

---

## Dead Letter Queue (DLQ) Strategy

| Topic | DLQ Topic | Max Retries | DLQ Retention |
|-------|-----------|-------------|---------------|
| [domain].[entity] | [domain].[entity].dlq | 3 | 30 days |
| [domain].[entity2] | [domain].[entity2].dlq | 3 | 30 days |

**DLQ Processing**:
- Monitor DLQ for failed messages
- Investigate root cause
- Fix issue and replay từ DLQ

---

## Monitoring & Alerts

### Metrics to Monitor

- **Producer metrics**:
  - Message send rate
  - Failed sends
  - Batch size

- **Consumer metrics**:
  - Lag per consumer group
  - Processing time
  - Error rate

- **Topic metrics**:
  - Message rate
  - Bytes in/out
  - Partition distribution

### Alerts

| Alert | Condition | Action |
|-------|-----------|--------|
| High consumer lag | Lag > [X messages] | Investigate slow consumers, scale if needed |
| DLQ messages | Messages in DLQ | Investigate failures |
| Partition imbalance | Partition size difference > [X%] | Review partition key strategy |

---

## Lưu ý

- **Partition key**: Critical for ordering và performance
- **Retention**: Balance between replay capability và storage cost
- **Replication**: High availability vs write latency trade-off
- **Consumer groups**: Each service/function có group riêng
- **DLQ**: Always have DLQ strategy cho failed messages
- **Monitoring**: Set up alerts cho lag và errors


# 5.3 Cache Strategy

> **Hướng dẫn**: Document cache key patterns và invalidation strategy.
> Focus vào KEY PATTERNS TABLE - đủ để dev team implement cache logic.
> KHÔNG paste code - dev sẽ follow cache patterns trong coding rules.

## Cache Overview

**Cache Technology**: [Redis/Elasticache/Memcached]

**Purpose**: [Improve read performance, reduce database load, etc.]

**Eviction Policy**: [LRU/LFU/TTL-based]

---

## Cache Keys by Service

### [SERVICE_NAME_1]

| Service | Cache Key Pattern | TTL | Mô tả | Invalidation Strategy |
|---------|-------------------|-----|-------|----------------------|
| [service-1] | [pattern]:{id} | [duration] | [What data is cached] | [When/how invalidated] |
| [service-1] | [pattern]:{tenantId}:{id} | [duration] | [What data is cached] | [When/how invalidated] |

### [SERVICE_NAME_2]

| Service | Cache Key Pattern | TTL | Mô tả | Invalidation Strategy |
|---------|-------------------|-----|-------|----------------------|
| [service-2] | [pattern]:{key} | [duration] | [What data is cached] | [When/how invalidated] |

---

## Cache Key Details

### Key: `[entity]:detail:{id}`

**Pattern**: `[entity]:detail:{id}`

**Example**: `order:detail:12345`

**Purpose**: Cache chi tiết của [entity]

**TTL**: [X hours/minutes]

**Data Structure**: [String/Hash/List/Set]

**Stored Data**:
```json
{
  "id": "12345",
  "[field1]": "value",
  "[field2]": "value",
  "cachedAt": "timestamp"
}
```

**Cache Hit Scenario**: [Khi nào hit cache]

**Cache Miss Scenario**: [Khi nào miss cache - fetch từ DB]

**Invalidation**:
- **When**: [Event nào trigger invalidation]
- **How**: Delete key hoặc update value
- **Code location**: `[service]/infrastructure/cache/[Entity]CacheService.java`

---

### Key: `[entity]:list:{tenantId}:{filter}`

**Pattern**: `[entity]:list:{tenantId}:{filter}`

**Example**: `product:list:tenant-123:status=ACTIVE`

**Purpose**: Cache danh sách [entities] với filter

**TTL**: [X minutes] (shorter than detail cache)

**Data Structure**: List / Set

**Invalidation**:
- **When**: Khi có entity mới được tạo/updated/deleted
- **How**: Delete all list keys matching pattern `[entity]:list:{tenantId}:*`

---

### Key: `idempotency:{eventId}`

> **Event context**: See [5.1 event-catalog.md] for which events require idempotency keys

**Pattern**: `idempotency:{eventId}`

**Example**: `idempotency:evt-abc-123`

**Purpose**: Prevent duplicate event processing

**TTL**: [24 hours]

**Data Structure**: String (simple flag "1")

**Stored Data**: "1" (presence indicates processed)

**Invalidation**: TTL-based automatic expiration (không cần manual invalidation)

> **Implementation**: See `java-springboot-gradle-rules.mdc` for Redis idempotency code pattern

---

## Cache Patterns Summary

| Pattern | Use Case | Flow Summary | Invalidation Trigger |
|---------|----------|--------------|---------------------|
| **Cache-Aside** | Detail read (GET /{id}) | 1. Check cache<br>2. If miss → DB<br>3. Store with TTL | On [Entity]UpdatedEvent, [Entity]DeletedEvent |
| **Write-Through** | Critical data updates | 1. Write to DB<br>2. Update cache | On write operation |
| **Event-Based Invalidation** | Cross-service cache sync | Consumer receives event → invalidate cache | On domain events |

> **Implementation patterns**: See `java-springboot-gradle-rules.mdc` for code examples

---

## Cache Key Naming Convention

Format: `{namespace}:{type}:{identifier}[:{subkey}]`

Examples:
- `product:detail:123`
- `product:list:tenant-456:status=ACTIVE`
- `user:session:user-789`
- `idempotency:evt-abc`

**Guidelines**:
- Use colons `:` to separate key parts
- Use lowercase
- Use descriptive namespaces
- Include tenant/user ID for multi-tenancy

---

## Cache Monitoring

### Metrics to Track

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Hit Rate | % of requests served from cache | < 80% |
| Miss Rate | % of requests requiring DB fetch | > 20% |
| Eviction Rate | Keys evicted due to memory pressure | > 10% of total keys |
| Memory Usage | Redis memory consumption | > 80% of allocated |
| Key Count | Total number of keys | Monitor growth |

### Cache Performance

| Cache Key Pattern | Expected Hit Rate | Actual Hit Rate | Action |
|-------------------|------------------|-----------------|--------|
| [pattern1] | > 90% | [Measure] | [If low, investigate] |
| [pattern2] | > 80% | [Measure] | [If low, adjust TTL] |

---

## Cache Invalidation Strategies

### Time-based (TTL)

**When to use**: Data có thể stale một chút

**Examples**:
- Product catalog: 1 hour TTL
- User profile: 30 minutes TTL

### Event-based

**When to use**: Data phải consistent

**Examples**:
- Order status: Invalidate on OrderStatusChangedEvent
- Inventory: Invalidate on InventoryUpdatedEvent

### Manual

**When to use**: Admin operations hoặc bulk updates

**Examples**:
- Clear all cache: `redis.flushAll()`
- Clear namespace: `redis.deleteKeys("product:*")`

---

## Cache Configuration Guidelines

### TTL Recommendations

| Data Type | TTL | Reason |
|-----------|-----|--------|
| Frequently changing | 5-15 min | Balance freshness vs load |
| Moderately changing | 30-60 min | Standard business data |
| Rarely changing | 1-24 hours | Reference data, configs |
| Idempotency keys | 24 hours | Event deduplication |

### Key Design Principles

1. **Tenant Isolation**: Always include `tenantId` in key
2. **Pattern Consistency**: Use same format across services (e.g., `{namespace}:{type}:{id}`)
3. **Invalidation Ease**: Design keys for easy wildcard deletion (e.g., `product:list:tenant-123:*`)

### Monitoring Metrics

| Metric | Alert Threshold | Action |
|--------|----------------|--------|
| Hit Rate | < 80% | Investigate cache strategy |
| Memory Usage | > 80% | Review eviction policy |
| Eviction Rate | > 10% | Increase memory or reduce TTL |

---

## Lưu ý quan trọng

- **Key patterns table**: Đủ để dev team implement caching
- **No code examples**: Dev follow patterns trong `java-springboot-gradle-rules.mdc`
- **Invalidation strategy**: Document WHEN to invalidate, not HOW (code level)
- **Cross-reference**: Link cache keys với events (Section 5.1) và APIs (Section 3.1)
