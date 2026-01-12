✅ TÓM TẮT CÁC THAY ĐỔI ĐÃ THỰC HIỆN
1. Chuẩn hóa Kafka Topic Naming
Format chuẩn: edu.{domain}.events hoặc edu.{domain}.sessions
File	Thay đổi
HLD-TF-STUDENT-MANAGEMENT.md	sis.events → edu.sis.events, enrollment.events → edu.enrollment.events, tf-student-mgmt.events → edu.student-management.events
HLD-TF-TEACHER-CALENDAR.md	tf.class-management.session.* → edu.class.sessions, tf.teacher-calendar.* → edu.teacher-calendar.events
HLD-SF-SIS.md	sis.events → edu.sis.events, sis.notifications → edu.sis.notifications
2. Xác định rõ ClassActivatedEvent và Session Topics
Đã chuẩn hóa theo tf-class-management:
Event Type	Topic	Consumers
ClassActivatedEvent	edu.class.events	lf-enrollment, tf-teacher-calendar
ClassCompletedEvent	edu.class.events	lf-enrollment
SessionCreatedEvent	edu.class.sessions	tf-teacher-calendar, lf-liveclass
SessionUpdatedEvent	edu.class.sessions	tf-teacher-calendar
SessionCancelledEvent	edu.class.sessions	tf-teacher-calendar, lf-liveclass
3. Chuẩn hóa API Prefix /api/v1/
File	API Endpoints đã sửa
HLD-TF-STUDENT-MANAGEMENT.md	GET /api/v1/classes/{classId}, GET /api/v1/classes/{classId}/teachers, POST /api/v1/late-enrollments, POST /api/v1/enrollments/{id}/drop
HLD-TF-CLASS-MANAGEMENT.md	GET /api/v1/teachers/{teacherId}, GET /api/v1/teachers/{teacherId}/availability, GET /api/v1/students/{studentId}, POST /api/v1/enrollments/batch-activate, POST /api/v1/enrollments/late-enroll, POST /api/v1/enrollments/batch-complete
HLD-LF-ENROLLMENT.md	GET /api/v1/classes/{id}, GET /api/v1/classes?status=..., POST /api/v1/enrollments/late-enroll, POST /api/v1/enrollments/{id}/drop, GET /api/v1/students/{id}, POST /api/v1/enrollments, POST /api/v1/waitlist, DELETE /api/v1/enrollments
📋 KAFKA TOPIC MAPPING (SAU KHI CHUẨN HÓA)
Service	Publishes To	Consumes From
sf-sis	edu.sis.events	-
lf-enrollment	edu.enrollment.events	edu.class.events
tf-class-management	edu.class.events, edu.class.sessions	edu.enrollment.events
tf-student-management	edu.student-management.events	edu.sis.events, edu.enrollment.events
tf-teacher-calendar	edu.teacher-calendar.events	edu.class.events, edu.class.sessions
tf-teacher-profile	edu.teacher.events	edu.rating.events
Tất cả các tài liệu HLD giờ đã nhất quán về:
✅ Kafka Topic naming convention
✅ Event definitions và consumers
✅ API prefix format /api/v1/



Tổng kết các thay đổi đã thực hiện:
1. Kafka Topic Naming (đã chuẩn hóa theo format edu.{domain}.events)
Vị trí	Topic cũ	Topic mới
Event Schema 6.2.2	lms.liveclass.provisioning	edu.liveclass.provisioning
Event Schema 6.2.3	lms.liveclass.lifecycle	edu.liveclass.events
Event Schema 6.2.4	lms.liveclass.lifecycle	edu.liveclass.events
Event Schema 6.2.5	lms.liveclass.provisioning	edu.liveclass.provisioning
Event Schema 6.2.6	zoom.webhooks	edu.zoom.webhooks
Code examples (4 instances)	lms.liveclass.lifecycle	edu.liveclass.events
DLQ example	lms.liveclass.lifecycle.DLQ	edu.liveclass.events.DLQ
2. API Prefix (đã chuẩn hóa /api/v1/)
API Call	Trước	Sau
lf-course	GET /courses/{courseId}/status	GET /api/v1/courses/{courseId}/status
lf-enrollment	GET /classes/{classId}/enrollments/count	GET /api/v1/classes/{classId}/enrollments/count
3. Tính nhất quán với tf-class-management
Đã xác nhận các events được đồng bộ đúng:
SessionCreatedEvent: tf-class-management → lf-liveclass (topic: edu.class.sessions) ✅
Events produced: lf-liveclass đã dùng đúng format topic edu.liveclass.* ✅



