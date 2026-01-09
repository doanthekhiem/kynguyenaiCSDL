# Quick Start Guide - 15 Phút

> Hướng dẫn nhanh để tạo documentation đầu tiên với template này trong 15 phút.

---

## Prerequisites

- ✅ Git (optional, cho version control)
- ✅ Markdown editor (VS Code, Cursor, hoặc text editor bất kỳ)
- ✅ AI Assistant (Claude, ChatGPT - optional nhưng recommended)

---

## Bước 1: Setup (2 phút)

### Clone/Download template

```bash
# Option 1: Clone nếu có Git
git clone <repo-url> my-project-docs
cd my-project-docs

# Option 2: Download ZIP và extract
# Sau đó cd vào folder
```

### Xem cấu trúc

```bash
# Quick tour
ls -la

# Bạn sẽ thấy:
# - README.md (hướng dẫn chi tiết)
# - CODING-RULES-TEMPLATE.mdc (coding rules template)
# - examples/ (ví dụ mẫu)
# - dd/, hld/, us/ (template folders)
```

---

## Bước 2: Chọn/Tạo Coding Rules (3 phút)

### Nếu dùng Java/Spring Boot:

```bash
cp examples/coding-rules/CODING-RULES-JAVA-SPRING-BOOT.mdc ./coding-rules.mdc
```

### Nếu dùng NodeJS/NestJS:

```bash
cp examples/coding-rules/CODING-RULES-NODEJS-NESTJS.mdc ./coding-rules.mdc
```

### Nếu dùng Frontend/NextJS:

```bash
cp examples/coding-rules/CODING-RULES-FRONTEND-NEXTJS.mdc ./coding-rules.mdc
```

### Nếu dùng tech stack khác:

```bash
cp CODING-RULES-TEMPLATE.mdc ./coding-rules.mdc

# Mở file và replace placeholders:
# - [PROJECT_NAME] → tên project của bạn
# - [LANGUAGE] → Java, TypeScript, Python, etc.
# - [FRAMEWORK] → Spring Boot, NestJS, Django, etc.
# - [BUILD_TOOL] → Gradle, npm, Maven, etc.
```

**Tip**: Xem [examples/coding-rules/](examples/coding-rules/) để tham khảo format.

---

## Bước 3: Tạo HLD đầu tiên (5 phút)

### 3.1. Tạo folder cho project

```bash
mkdir -p hld/output/my-first-project
```

### 3.2. Copy master template

```bash
cp hld/overview/template/00-master-hld-template.md \
   hld/output/my-first-project/HLD-USER-MANAGEMENT.md
```

### 3.3. Fill placeholders (với AI hoặc manual)

**Option A: Với AI (Claude, ChatGPT)**

Prompt mẫu:

```
Tôi có HLD template tại hld/output/my-first-project/HLD-USER-MANAGEMENT.md

Hãy giúp tôi fill template cho một User Management System với:
- Features: Registration, Login, Profile, Password Reset
- Tech: Backend API (REST)
- Database: PostgreSQL
- Multi-tenant: Yes (SaaS model)

Hãy replace tất cả placeholders và generate:
1. Context (Section 1)
2. Context Diagram (Section 2)
3. Workflows (Section 3)
4. State Machine (Section 4)
5. ERD (Section 5)

Dùng Mermaid syntax cho diagrams.
```

**Option B: Manual**

Mở file `HLD-USER-MANAGEMENT.md` và replace:

```markdown
# Trước:
[TÊN_HỆ_THỐNG] → User Management System
[ACTOR_NAME] → User, Admin, System
[SERVICE_NAME] → user-service, auth-service
[TABLE_NAME] → users, sessions, roles

# Sau:
# HLD - User Management System

## 1. Bối cảnh

### 1.4 Các chân dung (Actors)
- **User**: End users sử dụng hệ thống
- **Admin**: Quản trị viên
- **System**: Automated processes
...
```

### 3.4. Validate HLD

- ✅ Tất cả placeholders đã được replace
- ✅ Diagrams render OK (test tại [mermaid.live](https://mermaid.live/))
- ✅ Sections 1-5 đã hoàn thành (6-8 optional)

---

## Bước 4: Viết User Story đầu tiên (3 phút)

### 4.1. Tạo folder

```bash
mkdir -p us/input/user-management
```

### 4.2. Tạo US file

```bash
# Tạo file
touch us/input/user-management/US-USER-001-Register-Account.md
```

### 4.3. Fill nội dung

Copy format từ [examples/us/US-EXAMPLE-AUTH-001.md](examples/us/US-EXAMPLE-AUTH-001.md):

```markdown
# US-USER-001-Register-Account

## User Story
As a **new user**, I want to **register an account** so that **I can access the system**.

## Acceptance Criteria

### Scenario 1: Successful registration
Given I am on the registration page
When I enter valid email, password, and accept terms
Then the system creates my account
And sends a verification email
And redirects me to the login page

### Scenario 2: Invalid email
Given I am on the registration page
When I enter an invalid email format
Then the system shows error "EMAIL_INVALID"
And does not create the account

## Business Rules
1. Email must be unique in the system
2. Password minimum 8 characters
3. Must accept terms and conditions
4. Email verification required before login

## API References
- POST /api/v1/users (create account)
- POST /api/v1/users/verify-email (verify email)
```

---

## Bước 5: Generate DD với AI (2 phút)

### 5.1. Với Claude/ChatGPT

Prompt:

```
Đọc HLD @hld/output/my-first-project/HLD-USER-MANAGEMENT.md
Đọc US @us/input/user-management/US-USER-001-Register-Account.md
Đọc Coding Rules @coding-rules.mdc

Hãy tạo Detailed Design cho US-USER-001 với:
1. API Endpoint spec (Section 3.1)
2. Workflow diagram (Section 4)
3. Events (Section 5)

Follow DD template tại dd/overview/template/
```

AI sẽ generate DD content. Copy vào:

```bash
mkdir -p dd/user-management
# Paste AI output vào dd/user-management/DD-USER-MANAGEMENT.md
```

---

## Bước 6: Verify & Next Steps (Optional)

### Verify checklist

- ✅ HLD đã có đầy đủ sections
- ✅ US có acceptance criteria rõ ràng
- ✅ DD có API specs và workflows
- ✅ Coding rules phù hợp với tech stack

### Next steps

**Bây giờ bạn có thể**:

1. **Generate code** từ DD + Coding Rules
2. **Viết thêm US** cho features khác
3. **Expand HLD** với more modules
4. **Create DD** cho từng API endpoint

**Với AI**:

```
Đọc DD @dd/user-management/DD-USER-MANAGEMENT.md
Đọc Coding Rules @coding-rules.mdc

Generate code cho API endpoint POST /api/v1/users theo:
- Section 3.1 (API spec)
- Section 2.1 (Architecture)
- Tuân thủ 100% coding rules

Add @author AI trong comments.
```

---

## Troubleshooting

### ❓ Diagrams không render

- **Solution**: Copy Mermaid code vào [mermaid.live](https://mermaid.live/) để test
- Check syntax errors (dấu ngoặc, arrow syntax)

### ❓ AI không hiểu templates

- **Solution**: Cung cấp thêm context:
  ```
  Đọc template index @dd/overview/template/00-TEMPLATE-INDEX.md
  Đọc example @examples/dd/DD-SIS-EXAMPLE.md
  ```

### ❓ Quên placeholders nào cần replace

- **Solution**: Search trong file: `\[.*?\]` (regex)
- Hoặc: `grep -o '\[.*?\]' file.md`

---

## Tips & Tricks

### 💡 Sử dụng AI hiệu quả

1. **Chia nhỏ tasks**: Đừng yêu cầu AI gen toàn bộ HLD một lúc
2. **Provide examples**: Reference đến examples/ folder
3. **Iterate**: Gen section-by-section, review, refine

### 💡 Tối ưu workflow

1. **Templates first**: Luôn bắt đầu từ templates, không viết from scratch
2. **Copy-paste-modify**: Copy từ examples, modify cho use case của bạn
3. **Version control**: Commit thường xuyên

### 💡 Collaboration

1. **Shared folder**: Sync qua Git/Dropbox cho team
2. **Review process**: Peer review HLD/DD trước khi code
3. **Documentation-first**: Update docs trước khi code changes

---

## What's Next?

### Đọc thêm

- 📖 [README.md](README.md) - Complete documentation
- 📚 [TEMPLATES-GUIDE.md](TEMPLATES-GUIDE.md) - Template details
- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md) - Design decisions
- 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute

### Học từ examples

- [HLD Example](examples/hld/HLD-GRADING-EXAMPLE.md) - Full HLD (6291 lines)
- [DD Example](examples/dd/DD-SIS-EXAMPLE.md) - Full DD (6435 lines)
- [US Example](examples/us/US-EXAMPLE-AUTH-001.md) - US format

### Join community

- 🐛 Report bugs: [GitHub Issues]
- 💬 Ask questions: [GitHub Discussions]
- ⭐ Star the repo if helpful!

---

**Congratulations!** 🎉

Bạn vừa tạo documentation set đầu tiên trong 15 phút. Workflow này scale được cho projects lớn với hàng trăm APIs và features.

**Pro tip**: Càng dùng nhiều, bạn càng quen với templates và workflow. Sau 2-3 lần, thời gian sẽ giảm còn 5-10 phút cho mỗi module mới.

---

**Last Updated**: 2026-01-09
**Version**: 2.0
