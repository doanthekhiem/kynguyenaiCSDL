# 4. WORKFLOWS

> **Hướng dẫn**: Vẽ ASCII diagrams cho TỪNG workflow end-to-end. Mỗi workflow là một sub-section riêng.

## 4.1 Workflow: [WORKFLOW_NAME_1]

> [Mô tả ngắn gọn về workflow này - mục đích và kết quả cuối cùng]

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    WORKFLOW: [WORKFLOW_NAME_1]                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  [ACTOR_1] ──► [FRONTEND] ──► [BFF] ──► [SERVICE_1]                            │
│       │                                      │                                   │
│       │ 1. [Action description]              │                                   │
│       ▼                                      ▼                                   │
│  ┌───────────────────────────────────────────────────────────────┐              │
│  │               [SERVICE_1]                                      │              │
│  │  ┌──────────────┐    ┌──────────────┐                        │              │
│  │  │[Controller]  │───►│[AppService]  │                        │              │
│  │  └──────────────┘    └──────┬───────┘                        │              │
│  │                              │                                 │              │
│  │                     ┌────────▼────────┐                      │              │
│  │                     │ [Aggregate]     │                      │              │
│  │                     │ status=[STATE]  │                      │              │
│  │                     └────────┬────────┘                      │              │
│  │                              │                                 │              │
│  │                     ┌────────▼────────┐                      │              │
│  │                     │ Outbox Table    │                      │              │
│  │                     │ (same TX)       │                      │              │
│  │                     └────────┬────────┘                      │              │
│  └──────────────────────────────┼───────────────────────────────┘              │
│                                 │                                                │
│                                 ▼                                                │
│  ┌─────────────────────────────────────────────────────────────────┐            │
│  │                    Kafka: [topic-name]                           │            │
│  │                    [EventName]Event                              │            │
│  └───────────────────────────────┬─────────────────────────────────┘            │
│                                  │                                               │
│         ┌────────────────────────┼────────────────────────┐                     │
│         │                        │                        │                      │
│         ▼                        ▼                        ▼                      │
│  ┌─────────────┐          ┌─────────────┐          ┌─────────────┐              │
│  │ [Service2]  │          │ [Service3]  │          │ [Notif]     │              │
│  │             │          │             │          │ Service     │              │
│  │ [Action]    │          │ [Action]    │          │ Notify      │              │
│  │             │          │             │          │ [Actor]     │              │
│  └─────────────┘          └─────────────┘          └─────────────┘              │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Workflow Steps

1. **[Actor 1]**: [Detailed action description]
   - Input: [What actor provides]
   - Validation: [What system validates]
   - Outcome: [Result of this step]

2. **[Service 1]**: [Processing description]
   - Command: `[CommandName]Command`
   - Handler: `[CommandName]CommandHandler`
   - Aggregate: `[AggregateName]` with state `[STATE]`
   - Event raised: `[EventName]Event`
   - Outcome: [Result]

3. **Event Distribution**: `[EventName]Event` published to Kafka topic `[topic-name]`
   - Partition key: `[key-field]`
   - Consumers: [Service2], [Service3], [Notification Service]

4. **[Service 2]** consumes event:
   - Action: [What service does]
   - Side effects: [Any state changes or events raised]

5. **[Service 3]** consumes event:
   - Action: [What service does]
   - Side effects: [Any state changes or events raised]

6. **Notification Service**:
   - Notifies: [Actor] via [email/push/SMS]
   - Template: `[template-name]`

### State Transitions

| From State | Event | To State | Condition |
|-----------|-------|----------|-----------|
| [STATE_1] | [Action] | [STATE_2] | [Condition if any] |
| [STATE_2] | [Action] | [STATE_3] | [Condition if any] |

### Error Handling

- **Validation Failure**: [How handled]
- **Business Rule Violation**: [How handled]
- **External Service Failure**: [Retry strategy, fallback]
- **Event Processing Failure**: [DLQ strategy]

---

## 4.2 Workflow: [WORKFLOW_NAME_2]

> [Mô tả workflow 2]

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    WORKFLOW: [WORKFLOW_NAME_2]                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  [Vẽ ASCII diagram tương tự]                                                    │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Workflow Steps

[List steps tương tự như workflow 1]

---

## 4.3 Workflow: [WORKFLOW_NAME_3]

[Repeat pattern cho mỗi workflow]

---

## Workflow Characteristics Summary

| Workflow | Type | Duration | Cross-Tenant | Sync/Async | State Machine |
|----------|------|----------|--------------|------------|---------------|
| [Workflow 1] | [Request-Response/Event-Driven/Saga] | [Short/Long] | [Yes/No] | [Sync/Async/Mixed] | [Yes/No] |
| [Workflow 2] | [Type] | [Duration] | [Yes/No] | [Sync/Async] | [Yes/No] |

---

## Lưu ý

- Mỗi workflow phải có ASCII diagram rõ ràng
- List detailed steps với commands, events, state changes
- Document state transitions nếu có state machine
- Error handling strategy cho mỗi workflow
- Link events với Section 5 (Events catalog)
- Link services với Section 3 (Source Code Structure)
