# DD Template Index

> **Purpose**: Guide for using DD component templates to generate complete Detailed Design documents

## 📁 Template Structure Overview

```
dd/overview/template/
├── 00-TEMPLATE-INDEX.md (this file)
│
├── 01-hld-keypoints/ (1 file)
│   └── 01-business-context.md (Section 1)
│
├── 02-architecture-design/ (1 file)
│   └── 01-architecture-decisions.md (Section 2)
│
├── 03-source-code/ (1 file)
│   └── 01-api-endpoints.md (Section 3)
│
├── 04-workflows/ (1 file)
│   └── 01-workflow-diagrams.md (Section 4)
│
├── 05-events/ (1 file)
│   └── 01-event-catalog.md (Section 5)
│
└── 06-patterns/ (1 file)
    └── 01-pattern.md (Reference material)
```

---

## 🎯 Usage Guide

### For Complete System DD (like CODE-SPECS-PIM.md)

Use these component templates **in order**:

```markdown
# [PROJECT_NAME] - Detailed Design

## 1. HIGH-LEVEL DESIGN KEYPOINTS
   Use: 01-hld-keypoints/
   └── 01-business-context.md (Section 1)

## 2. ARCHITECTURE & DESIGN DECISIONS
   Use: 02-architecture-design/
   └── 01-architecture-decisions.md (Section 2)
       ├── 2.1 Architecture Decisions
       ├── 2.2 Design Model Decisions
       └── 2.3 Permission Mapping

## 3. SOURCE CODE
   Use: 03-source-code/
   └── 01-api-endpoints.md (Section 3)
       ├── 3.1 API Endpoints
       ├── 3.2 Source Code Structure
       ├── 3.3 Aggregates
       ├── 3.4 Coding Steps
       ├── 3.5 GraphQL Schema
       └── 3.6 TDD Test Cases Design (NEW)

## 4. WORKFLOWS
   Use: 04-workflows/
   └── 01-workflow-diagrams.md (Section 4)

## 5. EVENTS
   Use: 05-events/
   └── 01-event-catalog.md (Section 5)

## 6. ASSUMPTIONS
   Create ad-hoc based on project

## Pattern References
   Use: 06-patterns/ (when applicable)
   └── 01-pattern.md (and other patterns as needed)
```

---

## ⚠️ Important: Dual-Context Handling
**Multi-context**: Nếu 1 entity phục vụ N contexts → N workflows, KHÔNG tách sections

**DO** describe contexts via business workflows and actors:
- ✅ Use **Section 1.1** (Business Contexts table) to show tenant types and access patterns
- ✅ Use **Section 1.4** (Actors) to show who does what in which context
- ✅ Use **Section 4** (Workflows) with sequence diagrams showing context separation
- ✅ Use **Section 5** (Events) to show cross-context communication

### Example: PIM Module (1 domain, 2 contexts)

**In Section 1.1 (Business Context):**
```markdown
## Business Contexts

| Business Context | Tenant Type | Domain Access | Key Actions |
|-----------------|-------------|---------------|-------------|
| School manages PIM | PRIVATE_SCHOOL | Full write | Create, Publish, Approve |
| Teacher views PIM | INDIVIDUAL | Read-only | View, Register |
```

**In Section 4 (Workflows):**
```
Workflow 1: PIM Creation (Context: PRIVATE_SCHOOL)
  School Admin → sf-product → Create PIM

Workflow 2: PIM Registration (Context: INDIVIDUAL)
  Teacher → sf-product → View PIM → Register
```

**In Section 5 (Events):**
```
PimPublishedEvent:
  Producer: sf-product (PRIVATE_SCHOOL context)
  Consumer: sf-product (INDIVIDUAL context)
```

---

## 🔗 Cross-References Between Templates

Templates have minimal duplication with clean separation of concerns:

| Section | References | Purpose |
|---------|-----------|---------|
| Section 1 | Section 4 | Business context defines workflows |
| Section 2 | Section 3 | Architecture decisions guide implementation |
| Section 3 | Section 4 | API endpoints used in workflows |
| Section 4 | Section 5 | Workflows trigger events |
| Section 5 | All sections | Events integrate all components |

**Include all sections** - they build on each other to create complete system design.

---

## 📝 Pattern Reference Guide

Use `06-patterns/` folder when specific design patterns are needed:

| Pattern | When to Reference |
|---------|------------------|
| `01-pattern.md` | When designing aggregates and domain-driven design structure |

Patterns provide:
- ✅ Architectural decisions (when to use)
- ✅ Design guidelines
- ✅ Checklists
- ✅ Anti-patterns to avoid
- ❌ NOT full Java code implementation (see `java-springboot-gradle-rules.mdc`)

---

## 🎯 Token Optimization Tips

1. **Selective Inclusion**: Only include sections relevant to your project
   - Skip sections if not applicable to your system design

2. **Cross-Reference Instead of Duplicate**:
   - Reference patterns instead of copying content
   - Link between sections to avoid redundancy

3. **Component Assembly**: Assemble only what's needed
   - System-level DD: Use all 5 sections + patterns as needed
   - Service-level DD: Focus on Sections 3 (API) and 4 (Workflows)
   - Pattern documentation: Reference specific patterns in Section 2

---

## ✅ Validation Checklist

After generating DD document, verify:

- [ ] **Section 1 (Business Context)**: Key business requirements and tenant types defined
- [ ] **Section 2 (Architecture Decisions)**: Design decisions and patterns documented
- [ ] **Section 3 (API Endpoints)**: Complete API table with business logic and request/response
- [ ] **Section 4 (Workflows)**: Sequence diagrams showing interactions between services
- [ ] **Section 5 (Events)**: Event catalog with event types and producers/consumers
- [ ] **No heavy code**: References to `java-springboot-gradle-rules.mdc` instead of code listings
- [ ] **DD length**: Target <2000 lines for conciseness
- [ ] **Language**: Vietnamese (if applicable)

---

## 📚 Related Documents

- **Coding Rules**: `java-springboot-gradle-rules.mdc` (implementation details)
- **HLD Templates**: `hld/overview/template/` (high-level design)

---

**Template Version:** 4.0 (Simplified & Streamlined)
**Last Updated:** 2025-11-27
**Key Changes:**
- ✅ **Consolidated**: Reduced from 24 files to 7 core template files
- ✅ **Focused structure**: 5 essential sections + 1 pattern reference
- ✅ **Simplified templates**: Each section has single focused template file
- ✅ **Token optimized**: ~4-5K tokens per complete DD (highly efficient)
- ✅ **Clear guidance**: Easy-to-follow structure for rapid DD generation
