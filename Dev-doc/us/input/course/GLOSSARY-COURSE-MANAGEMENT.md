# GLOSSARY - THUẬT NGỮ QUẢN LÝ KHÓA HỌC

## Mục đích
Tài liệu này định nghĩa thuật ngữ chuẩn được sử dụng trong tất cả User Stories của Course Management.

**Format hiển thị**: {Ngôn ngữ nghiệp vụ}-{Thuật ngữ kỹ thuật}

**Ví dụ**: Đã xuất bản-PUBLISHED, Đang chờ phản hồi-PENDING
--
## 1. Trạng thái khóa học (Course Status)

| Thuật ngữ kỹ thuật | Ngôn ngữ nghiệp vụ (chuẩn) | Format hiển thị | Hành động | Ghi chú |
|-------------------|---------------------------|-----------------|-----------|---------|
| DRAFT | Đã lưu | Bản nháp-DRAFT | Xem chi tiết, Chỉnh sửa, Archive | Khóa học đang được xây dựng |
| INVITING_INSTRUCTORS | Đang mời giảng viên | Đang mời giảng viên-INVITING_INSTRUCTORS | Xem chi tiết, Chỉnh sửa, Quản lý giảng viên, Archive | Đã gửi lời mời, chờ phản hồi |
| CONTENT_BUILDING | Đang xây dựng nội dung | Đang xây dựng nội dung-CONTENT_BUILDING | Xem chi tiết, Chỉnh sửa, Quản lý giảng viên, Preview, Archive | Giảng viên đang tạo nội dung |
| READY_FOR_REVIEW | Sẵn sàng review | Sẵn sàng review-READY_FOR_REVIEW | Xem chi tiết, Chỉnh sửa, Quản lý giảng viên, Preview, Archive | Nội dung đã xây dựng xong, chờ review |
| CONTENT_APPROVED | Nội dung đã duyệt | Nội dung đã duyệt-CONTENT_APPROVED | Xem chi tiết, Chỉnh sửa, Quản lý giảng viên, Preview, Archive | Nội dung đã được phê duyệt |
| PIM_READY | Sẵn sàng PIM | Sẵn sàng PIM-PIM_READY | Xem chi tiết, Chỉnh sửa, Quản lý giảng viên, Preview, Publish, Archive | Sẵn sàng tạo PIM (Product Information Management) |
| PUBLISHED | Đã xuất bản | Đã xuất bản-PUBLISHED | Xem chi tiết, Preview, Unpublish, Archive | Khóa học đã công khai |
| UNPUBLISHED | Đã ẩn | Đã ẩn-UNPUBLISHED | Xem chi tiết, Chỉnh sửa, Preview, Publish, Archive | Khóa học tạm thời không công khai |
| ARCHIVED | Dừng hoạt động | Đã lưu trữ-ARCHIVED | Xem chi tiết | Khóa học đã lưu trữ, không hoạt động |

### 1.1 Quy tắc hành động
| Hành động             | Điều kiện                                               |
|-----------------------|-----------------------------------------------------------|
| Xem chi tiết          | Luôn có ở mọi trạng thái                                 |
| Chỉnh sửa             | Không có ở PUBLISHED và ARCHIVED                          |
| Quản lý giảng viên (out of scope)   | Chỉ từ INVITING_INSTRUCTORS đến PIM_READY                 |
| Preview               | Từ CONTENT_BUILDING trở đi (khi có nội dung)              |
| Publish               | Chỉ ở PIM_READY và UNPUBLISHED                            |
| Unpublish             | Chỉ ở PUBLISHED                                           |
| Archive               | Tất cả trạng thái trừ ARCHIVED                            |
| Review Submission     | Chỉ ở READY_FOR_REVIEW                                    |


### 1.2 Màu sắc UI:
- DRAFT: Xám (#9E9E9E)
- INVITING_INSTRUCTORS: Cam (#FF9800)
- CONTENT_BUILDING: Vàng (#FFC107)
- READY_FOR_REVIEW: Xanh dương (#2196F3)
- CONTENT_APPROVED: Tím (#9C27B0)
- PIM_READY: Xanh lá nhạt (#8BC34A)
- PUBLISHED: Xanh lá đậm (#4CAF50)
- UNPUBLISHED: Cam đậm (#FF5722)
- ARCHIVED: Xám đậm (#616161)

---

## 2. Trạng thái lời mời (Invitation Status)

| Thuật ngữ kỹ thuật | Ngôn ngữ nghiệp vụ (chuẩn) | Format hiển thị | Ghi chú |
|-------------------|---------------------------|-----------------|---------|
| PENDING | Đang chờ phản hồi | Đang chờ phản hồi-PENDING | Đã gửi lời mời, chưa có phản hồi |
| ACCEPTED | Đã chấp nhận | Đã chấp nhận-ACCEPTED | Giảng viên đồng ý tham gia |
| REJECTED | Đã từ chối | Đã từ chối-REJECTED | Giảng viên không tham gia |
| EXPIRED | Đã hết hạn | Đã hết hạn-EXPIRED | Quá 7 ngày chưa phản hồi |
| REVOKED | Đã thu hồi | Đã thu hồi-REVOKED | Admin hủy lời mời |

**Màu sắc UI:**
- PENDING: Cam (#FF9800)
- ACCEPTED: Xanh lá (#4CAF50)
- REJECTED: Xám (#9E9E9E)
- EXPIRED: Đỏ (#F44336)
- REVOKED: Xám đậm (#616161)

---

## 3. Trạng thái submissions (Submission Status)

| Thuật ngữ kỹ thuật | Ngôn ngữ nghiệp vụ (chuẩn) | Format hiển thị | Ghi chú |
|-------------------|---------------------------|-----------------|---------|
| DRAFT | Bản nháp | Bản nháp-DRAFT | Nội dung đang soạn thảo, chưa submit |
| SUBMITTED | Đã nộp, chờ review | Đã nộp, chờ review-SUBMITTED | Nội dung đã submit, chờ reviewer xem xét |
| UNDER_REVIEW | Đang được review | Đang được review-UNDER_REVIEW | Reviewer đang xem xét nội dung |
| NEEDS_REVISION | Cần chỉnh sửa | Cần chỉnh sửa-NEEDS_REVISION | Reviewer yêu cầu chỉnh sửa, giáo viên cần sửa lại |
| REJECTED | Đã từ chối | Đã từ chối-REJECTED | Nội dung bị từ chối, không được chấp nhận |
| APPROVED | Đã duyệt | Đã duyệt-APPROVED | Nội dung đã được phê duyệt, hoàn thành |

**Lưu ý**: Trong một số US, **REVISION_REQUIRED** được sử dụng thay cho **NEEDS_REVISION** (tương đương).

**Màu sắc UI:**
- DRAFT: Xám (#9E9E9E)
- SUBMITTED: Xanh dương (#2196F3)
- UNDER_REVIEW: Xanh dương nhạt (#64B5F6)
- NEEDS_REVISION / REVISION_REQUIRED: Cam (#FF9800)
- REJECTED: Đỏ (#F44336)
- APPROVED: Xanh lá (#4CAF50)

---

## 4. Vai trò giảng viên (Instructor Role)

| Thuật ngữ kỹ thuật | Ngôn ngữ nghiệp vụ (chuẩn) | Format hiển thị | Ghi chú |
|-------------------|---------------------------|-----------------|---------|
| OWNER | Giảng viên chủ trì | Giảng viên chủ trì-OWNER | Giảng viên/ giáo viên đóng góp toàn bộ khóa học (Course) |
| CONTRIBUTOR | Giảng viên đóng góp | Giảng viên đóng góp-CONTRIBUTOR | Đóng góp nội dung một phần theo contribution_scope. OUT OF SCOPE|
| REVIEWER | Giảng viên phản biện | Giảng viên phản biện-REVIEWER | Chỉ review, không tạo nội dung. OUT OF SCOPE |

**Màu sắc badge:**
- OWNER: Xanh dương (#2196F3)
- CONTRIBUTOR: Xanh lá (#4CAF50)
- REVIEWER: Tím (#9C27B0)

---

## 5. Thuật ngữ chung (General Terms)

| Thuật ngữ kỹ thuật (English) | Ngôn ngữ nghiệp vụ (Tiếng Việt) | Ghi chú |
|------------------------------|----------------------------------|---------|
| course | khóa học | |
| invitation | lời mời (tham gia giảng dạy) | |
| instructor | giảng viên | |
| workflow | quy trình phê duyệt | |
| course_code | mã khóa học | |
| invitation_code | mã lời mời | |
| owner_type | loại sở hữu | SCHOOL = Trường tư, INDIVIDUAL = Giảng viên tự do |
| submission | bài nộp / nội dung đã nộp | |
| contribution_scope | phạm vi đóng góp | Các section/lecture được phân công |
| freelance teacher | giáo viên tự do | Giáo viên INDIVIDUAL |
| school admin | quản trị viên nhà trường | Admin của PRIVATE_SCHOOL |
| section | phần học / section | Đơn vị trong curriculum |
| lecture | bài giảng / lecture | Nội dung cụ thể trong section |
| chapter | chương | Nhóm các section |

---

## 6. Nguyên tắc sử dụng

### 6.1. Trong Business Rules
Sử dụng format: `{Ngôn ngữ nghiệp vụ}-{Thuật ngữ kỹ thuật}`

**Ví dụ:**
```markdown
| Trạng thái khóa học hợp lệ | BR-PS-404 | Các trạng thái hợp lệ: Bản nháp-DRAFT, Đang mời giảng viên-INVITING_INSTRUCTORS, Đang xây dựng nội dung-CONTENT_BUILDING, ... |
```

### 6.2. Trong Acceptance Criteria
- **Tiêu đề AC**: Sử dụng Ngôn ngữ nghiệp vụ thuần túy
- **Trong mô tả**: Sử dụng format `{Ngôn ngữ nghiệp vụ}-{Thuật ngữ kỹ thuật}` khi đề cập đến trạng thái/vai trò cụ thể

**Ví dụ:**
```markdown
### AC-1: Happy Path - Xem danh sách lời mời đang chờ phản hồi
- **Tại** trang "Lời mời cộng tác"
- **Khi** có lời mời với trạng thái Đang chờ phản hồi-PENDING
- **Thì** hệ thống hiển thị danh sách với nhãn "Đang chờ phản hồi" (màu cam)
```

### 6.3. Trong UI/UX Design
Chỉ hiển thị **Ngôn ngữ nghiệp vụ** cho người dùng cuối, thuật ngữ kỹ thuật chỉ dùng trong tài liệu kỹ thuật.

**Ví dụ UI:**
```
🟠 Đang chờ phản hồi
✅ Đã chấp nhận
```

---

## 7. Workflow - Luồng quản lý khóa học

### 7.1. INDIVIDUAL (Giáo viên tự do)

**Đặc điểm:**
- Giáo viên tự do tạo và quản lý khóa học riêng
- Một người (single instructor) chịu tr책nhiệm toàn bộ nội dung
- Không có quy trình mời giảng viên hoặc review nội dung
- Workflow đơn giản, tập trung vào việc tạo nội dung và xuất bản

**Workflow states (4 trạng thái):**

```
DRAFT → PUBLISHED → UNPUBLISHED → ARCHIVED
  ↓                      ↓
  └──────────────────────┘
    (có thể quay về DRAFT)
```

**Chi tiết từng bước:**

1. **Bản nháp-DRAFT**
   - Khóa học mới được tạo, đang xây dựng
   - Giáo viên tự do tạo curriculum, upload nội dung
   - Có thể chỉnh sửa tự do, không giới hạn
   - **Điều kiện chuyển sang PUBLISHED**: Đủ nội dung tối thiểu (ít nhất 1 section có nội dung)

2. **Đã xuất bản-PUBLISHED**
   - Khóa học đã công khai, học viên có thể đăng ký
   - Chỉ cho phép chỉnh sửa minor (không xóa section/lecture có enrollment)
   - **Có thể chuyển sang**: UNPUBLISHED (tạm ẩn), ARCHIVED (lưu trữ)

3. **Đã ẩn-UNPUBLISHED** (Optional)
   - Khóa học tạm thời không công khai
   - Học viên đã đăng ký vẫn học được
   - **Có thể chuyển về**: DRAFT (để chỉnh sửa lớn), PUBLISHED (xuất bản lại)

4. **Đã lưu trữ-ARCHIVED** (Terminal state)
   - Khóa học đã lưu trữ, không hoạt động
   - Không thể khôi phục (soft delete)

**Ví dụ luồng điển hình:**
```
Tạo mới → DRAFT → Upload nội dung → Kiểm tra → PUBLISHED → Học viên đăng ký → ARCHIVED (sau 2 năm)
```

---

### 7.2. PRIVATE_SCHOOL (Trường tư nhân - Collaborative)

**Đặc điểm:**
- School Admin tạo khóa học khung, mời nhiều giảng viên cộng tác
- Multi-instructor collaboration với vai trò OWNER/CONTRIBUTOR/REVIEWER
- Quy trình phê duyệt nội dung (content review workflow)
- Delayed PIM creation (chỉ tạo PIM sau khi nội dung được duyệt)

**Workflow states (9 trạng thái):**

```
1.DRAFT → 2.INVITING_INSTRUCTORS → 3.CONTENT_BUILDING → 4.READY_FOR_REVIEW → 5.CONTENT_APPROVED → 6.PIM_READY → 7.PUBLISHED
                                                                                                          ↓
                                                                                                    8.UNPUBLISHED
                                                                                                          ↓
                                                                                                       9.ARCHIVED
```

**Chi tiết từng bước:**

1. **Bản nháp-DRAFT**
   - School Admin tạo khóa học khung
   - Thiết kế curriculum structure (chapters, sections, lectures)
   - Định nghĩa contribution_scope cho từng vai trò
   - **Điều kiện chuyển sang INVITING_INSTRUCTORS**: Curriculum đã được thiết kế xong

2. **Đang mời giảng viên-INVITING_INSTRUCTORS**
   - School Admin mời giảng viên với vai trò OWNER/CONTRIBUTOR/REVIEWER
   - Gửi invitation_code, phân công contribution_scope
   - Chờ giảng viên chấp nhận lời mời (PENDING → ACCEPTED)
   - **Điều kiện chuyển sang CONTENT_BUILDING**: Tất cả giảng viên đã ACCEPTED
    
   - **Trigger**: AllInstructorsAcceptedEvent

3. **Đang xây dựng nội dung-CONTENT_BUILDING**
   - Giảng viên cộng tác upload nội dung theo contribution_scope
   - Lưu draft, submit content để review
   - School Admin/REVIEWER review nội dung
   - **Điều kiện chuyển sang READY_FOR_REVIEW**: Tất cả section đã có submission

4. **Sẵn sàng review-READY_FOR_REVIEW**
   - Tất cả nội dung đã được submit
   - REVIEWER/School Admin tiến hành review toàn bộ
   - Approve hoặc yêu cầu revision (NEEDS_REVISION)
   - **Điều kiện chuyển sang CONTENT_APPROVED**: Tất cả submission có trạng thái APPROVED

5. **Nội dung đã duyệt-CONTENT_APPROVED**
   - Tất cả nội dung đã được phê duyệt
   - Sẵn sàng cho bước tiếp theo (tạo PIM, set pricing)
   - **Điều kiện chuyển sang PIM_READY**: PIM creation completed (delayed)

6. **Sẵn sàng PIM-PIM_READY**
   - PIM (Product Information Management) đã được tạo
   - School Admin set pricing, final review
   - **Điều kiện chuyển sang PUBLISHED**: School Admin approve và publish

7. **Đã xuất bản-PUBLISHED**
   - Khóa học đã công khai cho học viên
   - Không thể chỉnh sửa nội dung (read-only)
   - **Có thể chuyển sang**: UNPUBLISHED (tạm ẩn), ARCHIVED (lưu trữ)

8. **Đã ẩn-UNPUBLISHED** (Optional)
   - Khóa học tạm thời không công khai
   - Học viên đã đăng ký vẫn học được
   - **Có thể chuyển về**: PUBLISHED (xuất bản lại)

9. **Đã lưu trữ-ARCHIVED** (Terminal state)
   - Khóa học đã lưu trữ, không hoạt động
   - Không thể khôi phục

**Ví dụ luồng điển hình:**
```
School Admin tạo → DRAFT → Thiết kế curriculum → INVITING_INSTRUCTORS
  → Mời 3 giảng viên → Tất cả ACCEPTED → CONTENT_BUILDING
  → Giảng viên upload nội dung (3 tháng) → Tất cả submit → READY_FOR_REVIEW
  → Reviewer approve tất cả → CONTENT_APPROVED → Tạo PIM → PIM_READY
  → Set pricing → PUBLISHED → Học viên đăng ký
```

**Quy tắc quan trọng:**
- **Không thể skip bước**: Phải tuân thủ đúng thứ tự workflow
- **Rollback**: Một số trường hợp có thể quay về bước trước (ví dụ: READY_FOR_REVIEW → CONTENT_BUILDING nếu có revision)
- **Vai trò REVIEWER**: OUT OF SCOPE trong phase hiện tại, chỉ có OWNER và CONTRIBUTOR

---

### 7.3. So sánh INDIVIDUAL vs PRIVATE_SCHOOL

| Tiêu chí | INDIVIDUAL | PRIVATE_SCHOOL |
|----------|------------|----------------|
| Số instructor | 1 (single) | Nhiều (multi-instructor) |
| Workflow states | 4 trạng thái | 9 trạng thái |
| Độ phức tạp | Đơn giản | Phức tạp (collaborative) |
| Content review | Không | Có (REVIEWER/School Admin) |
| Invitation flow | Không | Có (PENDING → ACCEPTED) |
| PIM creation | Tạo ngay | Delayed (sau khi content approved) |
| Chỉnh sửa sau publish | Hạn chế (minor only) | Không cho phép (read-only) |
| Thời gian trung bình | 1-2 tuần | 3-6 tháng |

---

## 8. Tham chiếu

- **Checklist**: [CHECKLIST-US-COURSE-MANAGEMENT-V4.md](../Checklist/CHECKLIST-US-COURSE-MANAGEMENT-V4.md)
- **US Template**: [US-temp.md](../../edu-eop-wiki/Temp/US-temp.md)
- **HLD**: HLD-LF-COURSE_OPUS 2.md
- **US INDIVIDUAL**: US-COURSE-001 đến US-COURSE-029
- **US PRIVATE_SCHOOL**: US-PS-001 đến US-PS-022
- **US COLLABORATIVE**: US-PS-007 đến US-PS-014D (Freelance Teacher trong PRIVATE course)

---

**Phiên bản**: 1.1
**Ngày tạo**: 2025-12-07
**Ngày cập nhật**: 2025-12-07
**Người tạo**: BA Agent
**Trạng thái**: Active
**Thay đổi v1.1**: Bổ sung phần 7 - Workflow cho INDIVIDUAL và PRIVATE_SCHOOL
