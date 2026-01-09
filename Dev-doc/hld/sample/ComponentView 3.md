
Bạn là chuyên gia Enterprise Architect với rất nhiều năm kinh nghiệm trong việc triển khai các hệ thống lớn có hàng triệu người dùng, bạn sẽ là người hỗ trợ tôi (Chief Technology & AI Officer) trong toàn bộ quá trình thiết kế từ đầu đến cuối cho 1 hệ sinh thái (ecosystem) nhằm hướng đến việc chuyển đổi số hoàn toàn ngành giáo dục. Chúng ta sẽ cùng nhau tạo ra 1 hệ sinh thái số, trong đó cung cấp ra thị trường rất nhiều sản phẩm:
- có sản phẩm được triển khai phân tán (distributed deployment) dưới dạng SaaS (Software as a Service)
- có những sản phẩm được cung cấp cho end customer (Mass mobile/web application)
- có những sản phẩm dùng để quản trị (Internal Centralized System)

# COMPONENT VIEW
## DISTRIBUTED, EXTERNAL COMPONENTS - Đây là các thành phần được triển khai phân tán
### EMS - Education Management System
Đây là bộ giải pháp chung được bán dưới dạng SaaS Subscription Plans, bao gồm 3 sản phẩm: LMS, TeMS và SMS. Tuỳ thuộc vào quy mô mà có thể mua theo các plan như sau
- INDIVIDUAL
- EDUCATION_CENTRE
- PRIVATE_SCHOOL
- ENTERPRISE (CUSTOM)
### LMS - Learning Management System
LMS là sản phẩm dành cho người học. Học sinh sẽ vào LMS để học. Có các trường hợp sau:
- Đối với INDIVIDUAL Plan, LMS sẽ được triển khai dưới dạng POOLED model, chỉ phân biệt URL theo subdomain của giáo viên hoặc gia sư tự do. Cú pháp URL của LMS là https://{subdomain}.learning.theschools.vn. Ví dụ cụ thể: https://mshoa.learning.theschools.vn là LMS của giáo viên là mshoa.
- Đối với EDUCATION_CENTRE Plan, LMS sẽ được triển khai dưới dạng POOLED model, chỉ phân biệt URL theo subdomain của trung tâm giáo dục. Cú pháp URL của LMS là https://{subdomain}.learning.theschools.vn. Ví dụ cụ thể: https://trungtam1.learning.theschools.vn là LMS của trung tâm "trungtam1".
- Đối với PRIVATE_SCHOOL Plan, LMS sẽ được triển khai dưới dạng POOLED model, nhưng trường có thể dùng domain của trường thay vì dùng domain của hệ sinh thái. Nếu sử dụng của hệ sinh thái thì vẫn tương tự như 2 Plans trên. Cú pháp URL của LMS là https://{subdomain}.learning.theschools.vn. Ví dụ cụ thể: https://truongA.learning.theschools.vn là LMS của trường "truongA".
- Đối với ENTERPRISE Plan, LMS sẽ được triển khai dưới dạng HYBRID hoặc SILO model, tuỳ nhu cầu của doanh nghiệp. Tuy nhiên, hiện tại chưa triển khai.

Đây là các web/mobile application cũng như backend micro-services bên trong 1 LMS:
- lf-web → [ReactJS] Đây là trang web của LMS mà học sinh truy cập vào để học
- lf-graph → [Appolo GraphQL] Đây là GraphQL hoạt động như Backend For Frontend để lf-web gọi vào. GraphQL đứng ở giữa các web/mobile app và backend services
- lf-auth-client → [NodeJS] Đây là micro-service để thực hiện việc đăng nhập và xác thực tenant users của EMS. lf-auth-client sẽ tích hợp với sso-iam-service tập trung.
- lf-course → [Java Spring Boot] Quản lý những hoạt động liên quan đến khoá học trong toàn bộ quá trình học tập của học sinh, bao gồm các chức năng:
    - Course CRUD operations
    - Course publishing
    - Course versioning
    - Course categorization
    - Course metadata management
    - Course analytics
- lf-curriculumn → [Java Spring Boot] Quản lý chương trình học, bao gồm các chức năng: 
    - Module/Section management
    - Lesson management
    - Content ordering
    - Curriculum structure
    - Prerequisites management
- lf-content-delivery → [Java Spring Boot] Quản lý các nội dung học, bao gồm các chức năng:
    - Document viewing
    - Audio playback
    - Interactive content (H5P)
    - Offline download
- lf-assessment → [Java Spring Boot] Quản lý các bài thi, bao gồm các chức năng:
    - Quiz/Test creation
    - Question bank management
    - Multiple question types (MCQ, True/False, Short Answer, Essay)
    - Grading (auto + manual)
    - Assessment analytics
    - Time limits & attempts
- lf-assignment → [Java Spring Boot] Quản lý các bài tập của học sinh, bao gồm các chức năng:
    - Assignment creation
    - Submission management
    - File upload for submissions
    - Grading workflow
    - Feedback & comments
- lf-enrollment → [Java Spring Boot] Quản lý việc tham gia khoá học, bao gồm các chức năng:
    - Course enrollment
    - Enrollment status management
    - Access control
    - Enrollment analytics
    - Enrollment expiry
- lf-rating → [Java Spring Boot] Review và rating, bao gồm các chức năng:
    - Course reviews
    - Teacher reviews
    - Rating aggregation
    - Review moderation
    - Review analytics
    - Verified purchase reviews
- lf-liveclass → [Java Spring Boot] quản lý các lớp học trực tiếp (LIVE), tổ chức tại Zoom Meetings
- lf-policy-agent → [Java Spring Boot] Đây là micro-service hoạt động như 1 policy agent. Policy Agent sẽ nhận thông tin policies từ cp-pms-policy-master tập trung.
- lf-notification-client → [Java Spring Boot] Đây là micro-service quản lý toàn bộ notification được gửi từ cp-notification-hub đến LMS thông qua Kafka.
- lf-worker → [Java Spring Boot] Đây là micro-service tích hợp với Temporal workflow để thực hiện điều phối các tác vụ liên quan đến LMS

### TeMS - Teaching Management System
TeMS là sản phẩm dành cho người dạy. Giáo viên sẽ vào TeMS để dạy. Có các trường hợp sau:
- Đối với INDIVIDUAL Plan, TeMS sẽ được triển khai dưới dạng POOLED model, chỉ phân biệt URL theo subdomain của giáo viên hoặc gia sư tự do. Cú pháp URL của TeMS là https://{subdomain}.teaching.theschools.vn. Ví dụ cụ thể: https://mshoa.teaching.theschools.vn là TeMS của giáo viên là mshoa.
- Đối với EDUCATION_CENTRE Plan, TeMS sẽ được triển khai dưới dạng POOLED model, chỉ phân biệt URL theo subdomain của trung tâm giáo dục. Cú pháp URL của TeMS là https://{subdomain}.teaching.theschools.vn. Ví dụ cụ thể: https://trungtam1.teaching.theschools.vn là TeMS của trung tâm "trungtam1".
- Đối với PRIVATE_SCHOOL Plan, TeMS sẽ được triển khai dưới dạng POOLED model, nhưng trường có thể dùng domain của trường thay vì dùng domain của hệ sinh thái. Nếu sử dụng của hệ sinh thái thì vẫn tương tự như 2 Plans trên. Cú pháp URL của TeMS là https://{subdomain}.teaching.theschools.vn. Ví dụ cụ thể: https://truongA.teaching.theschools.vn là TeMS của trường "truongA".
- Đối với ENTERPRISE Plan, TeMS sẽ được triển khai dưới dạng HYBRID hoặc SILO model, tuỳ nhu cầu của doanh nghiệp. Tuy nhiên, hiện tại chưa triển khai.

Đây là các web/mobile application cũng như backend micro-services bên trong 1 TeMS:
- tf-graph → [Appolo GraphQL] Đây là GraphQL hoạt động như Backend For Frontend để tf-web gọi vào. GraphQL đứng ở giữa các web/mobile app và backend services
- tf-auth-client → [NodeJS] Đây là micro-service để thực hiện việc đăng nhập và xác thực tenant users của EMS. tf-auth-client sẽ tích hợp với sso-iam-service tập trung.
- tf-class-management → [Java Spring Boot] Đây là micro-service để hỗ trợ giáo viên trong quá trình giảng dạy, bao gồm các chức năng:
    - Class creation & scheduling
    - Class roster management
    - Attendance tracking
    - Class calendar
    - Class announcements
    - Recurring classes
- tf-curriculumn-planning → [Java Spring Boot] Đây là micro-service để hỗ trợ giáo viên lên kế hoạch về chương trình học, bao gồm các chức năng:
    - Curriculum templates
    - Lesson planning
    - Resource library
    - Curriculum versioning
    - Standards alignment (MOET standards)
    - Curriculum sharing
- tf-grading → [Java Spring Boot] Đây là micro-service để hỗ trợ giáo viên chấm điểm và đánh giá, bao gồm các chức năng:
    - Grade book management
    - Grading schemes
    - Weighted grades
    - Grade calculation (GPA, percentages)
    - Grade export
    - Grade distribution
- tf-teacher-calendar → [Java Spring Boot] Đây là micro-service để hỗ trợ giáo viên lên lịch giảng dạy, bao gồm các chức năng:
    - Calendar management
    - Event scheduling
    - Reminders & notifications
    - Calendar sync (Google Calendar)
    - Availability management
    - Booking slots
- tf-communication → [Java Spring Boot] Đây là micro-service để hỗ trợ giáo viên tương tác với học sinh và phụ huynh học sinh, bao gồm các chức năng:
    - Direct messaging
    - Bulk messaging
    - Announcements
    - Parent-teacher communication
    - Read receipts
    - Message templates
- tf-teacher-profile → [Java Spring Boot] Đây là micro-service để quản lý hồ sơ giáo viên, bao gồm các chức năng:
    - Teacher profile management
    - Credentials & certifications
    - Teaching experience
    - Specializations
    - Profile visibility settings
    - Verification badges
- tf-student-management → [Java Spring Boot] Đây là micro-service để quản lý học sinh, bao gồm các chức năng:
    - Student roster
    - Student notes
    - Parent/Guardian info
    - Student progress tracking
    - Student behavior tracking
    - Student grouping
- tf-policy-agent → [Java Spring Boot] Đây là micro-service hoạt động như 1 policy agent. Policy Agent sẽ nhận thông tin policies từ cp-pms-policy-master tập trung.
- tf-notification-client → [Java Spring Boot] Đây là micro-service quản lý toàn bộ notification được gửi từ cp-notification-hub đến TeMS thông qua Kafka.
- tf-worker → [Java Spring Boot] Đây là micro-service tích hợp với Temporal workflow để thực hiện điều phối các tác vụ liên quan đến TeMS

### SMS - School Management System
SMS là sản phẩm dành cho quản trị doanh nghiệp nằm bên trong bộ giải pháp EMS. Giáo viên tự do cũng có thể là 1 doanh nghiệp cho nên cũng có thể quản trị doanh nghiệp. Khi cần phải cấu hình hoặc quản trị doanh nghiệp, người dùng sẽ vào SMS. Có các trường hợp sau:
- Đối với INDIVIDUAL Plan, SMS sẽ được triển khai dưới dạng POOLED model, chỉ phân biệt URL theo subdomain của giáo viên hoặc gia sư tự do. Cú pháp URL của SMS là https://{subdomain}.portal.theschools.vn. Ví dụ cụ thể: https://mshoa.portal.theschools.vn là SMS của giáo viên là mshoa.
- Đối với EDUCATION_CENTRE Plan, SMS sẽ được triển khai dưới dạng POOLED model, chỉ phân biệt URL theo subdomain của trung tâm giáo dục. Cú pháp URL của SMS là https://{subdomain}.portal.theschools.vn. Ví dụ cụ thể: https://trungtam1.portal.theschools.vn là SMS của trung tâm "trungtam1".
- Đối với PRIVATE_SCHOOL Plan, SMS sẽ được triển khai dưới dạng POOLED model, nhưng trường có thể dùng domain của trường thay vì dùng domain của hệ sinh thái. Nếu sử dụng của hệ sinh thái thì vẫn tương tự như 2 Plans trên. Cú pháp URL của SMS là https://{subdomain}.portal.theschools.vn. Ví dụ cụ thể: https://truongA.portal.theschools.vn là SMS của trường "truongA".
- Đối với ENTERPRISE Plan, SMS sẽ được triển khai dưới dạng HYBRID hoặc SILO model, tuỳ nhu cầu của doanh nghiệp. Tuy nhiên, hiện tại chưa triển khai.

Đây là các web/mobile application cũng như backend micro-services bên trong 1 SMS:
- sf-online-store-web → [NextJS] Đây là web application thân thiện với SEO để doanh nghiệp có thể bán và quảng cáo hàng trên internet, hoạt động như 1 online store
- sf-portal-web → [ReactJS] Đây là web application, hoạt động như 1 Portal chung để doanh nghiệp có thể quản trị toàn bộ các hoạt động vận hành.
- sf-graph → [Appolo GraphQL] Đây là GraphQL hoạt động như Backend For Frontend để sf-web gọi vào. GraphQL đứng ở giữa các web/mobile app và backend services
- sf-auth-client → [NodeJS] Đây là micro-service để thực hiện việc đăng nhập và xác thực tenant users của EMS. sf-auth-client sẽ tích hợp với sso-iam-service tập trung.
- sf-sis → [Java Spring Boot] Đây là micro-service quản lý thông tin học sinh
- sf-hrms → [Java Spring Boot] Đây là micro-service quản lý nhân sự
- sf-billing → [Java Spring Boot] Đây là micro-service quản lý thông tin hoá đơn và thanh toán
- sf-accounting → [Java Spring Boot] Đây là micro-service quản lý toàn bộ hệ thống kế toán nội bộ
- sf-mdm → [Java Spring Boot] Đây là micro-service quản lý Master Data
- sf-product → [Java Spring Boot] Đây là micro-service quản lý toàn bộ các sản phẩm giáo dục
- sf-sales → [Java Spring Boot] Đây là micro-service quản lý các hoạt động bán hàng của doanh nghiệp
- sf-purchase → [Java Spring Boot] Đây là micro-service quản lý các hoạt động mua hàng của doanh nghiệp
- sf-mtp → [Java Spring Boot] Đây là micro-service quản lý các hoạt động marketing automation
- sf-customer → [Java Spring Boot] Đây là micro-service quản lý khách hàng, quan hệ khách hàng và các hoạt động chăm sóc khách hàng.
- sf-policy-agent → [Java Spring Boot] Đây là micro-service hoạt động như 1 policy agent. Policy Agent sẽ nhận thông tin policies từ cp-pms-policy-master tập trung.
- sf-notification-client → [Java Spring Boot] Đây là micro-service quản lý toàn bộ notification được gửi từ cp-notification-hub đến SMS thông qua Kafka.
- sf-worker → [Java Spring Boot] Đây là micro-service tích hợp với Temporal workflow để thực hiện điều phối các tác vụ liên quan đến SMS


## CENTRALIZED, INTERNAL COMPONENTS - Đây là các thành phần được triển khai tập trung và thuộc sở hữu của tập đoàn
- PMS → Policy Management System. Đây là hệ thống chuyên quản lí các policies, chủ yếu là PBAC (Policy Based Access Control)
    - cp-pms-policy-master → Đây là master service chuyên dùng để định nghĩa, quản lý và triển khai các policies đến các policy agents được phân bổ đều trong ecosystem
- SSO → Đây là cổng đăng nhập và xác thực trung tâm của toàn bộ hệ sinh thái. Bao gồm các services:
    - sso-iam-service → Đây là cổng xác thực tập trung. Service này chuyên tích hợp với Identity Provider là AWS Cognito
    - sso-iam-policy-agent → Đây là policy agent của SSO. Nó nhận thông tin từ cp-pms-policy-master
- CORE ECOMMERCE → Đây là sàn thương mại điện tử tập trung. Bao gồm các services:
    - cp-ecommerce-order → Đây là service quản lý toàn bộ Order và Return Order của Core eCommerce
    - cp-ecommerce-shipment → Đây là service quản lý toàn bộ các Shipment Orders trên  Core eCommerce
    - cp-ecommerce-mdm → Đây là service quản lý toàn bộ Master Data được sử dụng trong Core eCommerce
    - cp-ecommerce-pricing → Đây là service chuyên quản lý các chính sách giá được sử dụng trong Core eCommerce
    - cp-ecommerce-worker → Đây là worker service chuyên điều phối các steps bên trong Workflow tập trung là Temporal.
    - cp-ecommerce-policy-agent → Đây là policy agent của Core eCommerce. Nó nhận thông tin từ cp-pms-policy-master.
- BPM → Business Process Management. Component này chịu trách nhiệm về điều phối các quy trình kinh doanh bên trong hệ sinh thái. Bao gồm các services:
    - cp-bpm-cases → Đây là Cases Management. Service chuyên quản lý các Cases và phân bổ đến các nhân viên liên quan để hỗ trợ xử lý, từ chăm sóc khách hàng cho đến xử lý sự cố.
    - cp-bpm-worker → Đây là worker service chuyên điều phối các steps bên trong Workflow tập trung là Temporal.
    - cp-bpm-rules → Đây là service xử lý rules-based tasks cho các nghiệp vụ liên quan đến quy trình kinh doanh. Service tích hợp với DecisionsRule.
    - cp-bpm-policy-agent → Đây là policy agent của BPM. Nó nhận thông tin từ cp-pms-policy-master.
- CRM → Customer Relationship Management. Component này phục vụ việc quản lý các mối quan hệ khách hàng trên toàn bộ hệ sinh thái. Bao gồm các services:
    - cp-crm-camp → Đây là service chuyên quản lý các chiến dịch, bao gồm từ Campaign, Waves, Marketing Assets và Engagement.
    - cp-crm-mtp → Đây là Marketing Automation & Transfer. Nó thực hiện các công việc về Marketing Automation và tracking các chỉ số.
    - cp-crm-contact → Service này quản lý toàn bộ Contacts.
    - cp-crm-lead → Service này quản lý về Leads.
    - cp-crm-interaction → Service này quản lý tập trung toàn bộ các Interactions
    - cp-crm-lifecyle → Service quản lý toàn bộ vòng đời khách hàng
    - cp-crm-worker → Đây là worker service chuyên điều phối các steps bên trong Workflow tập trung là Temporal.
    - cp-crm-policy-agent → Đây là policy agent của CRM. Nó nhận thông tin từ cp-pms-policy-master.
- ERP → Enterprise Resource Planning. Component này quản lý và lập kế hoạch cho toàn bộ tài nguyên trong hệ sinh thái. Bao gồm các services:
    - cp-erp-asset → Service quản lý toàn bộ tài sản trong hệ sinh thái
    - cp-erp-accounting → Service này hỗ trợ các nghiệp vụ kế toán của hệ sinh thái
    - cp-erp-billing → Service quản lý hoá đơn và cân đối dòng tiền thanh toán
    - cp-erp-hrms → Service quản lý nhân sự
    - cp-erp-worker → Đây là worker service chuyên điều phối các steps bên trong Workflow tập trung là Temporal.
    - cp-erp-policy-agent → Đây là policy agent của ERP. Nó nhận thông tin từ cp-pms-policy-master.
- CMS → Content Management System. Component này quản lý toàn bộ nội dung số trên toàn bộ hệ sinh thái. Bao gồm các services:
    - cp-cms-mdm → Service này quản lý Master Data được sử dụng trong CMS
    - cp-cms-catalog → Service quản lý các danh mục
    - cp-cms-pim → Service này quản lý các Product Information sẵn sàng được bán qua sàn thương mại điện tử của Core eCommerce
    - cp-cms-worker → Đây là worker service chuyên điều phối các steps bên trong Workflow tập trung là Temporal.
    - cp-cms-policy-agent → Đây là policy agent của CMS. Nó nhận thông tin từ cp-pms-policy-master.
- CORE PAYMENT → Component này quản lý thanh toán cho toàn bộ hệ sinh thái.. Bao gồm các services:
    - cp-payment-gateway → Service này đóng vai trò làm payment gateway cho toàn bộ giao dịch tiền online đi qua hệ sinh thái. Service này sẽ tích hợp với rất nhiều cổng thanh toán của các đối tác làm trung gian thanh toán.
    - cp-payment-transaction → Toàn bộ giao dịch thanh toán sẽ được ghi nhận tại đây để phục vụ đối soát cũng như quản lý dòng tiền 
    - cp-payment-policy-agent → Đây là policy agent của Core Payment. Nó nhận thông tin từ cp-pms-policy-master.
- NOTIFICATION HUB → [Java Spring Boot] Component này hoạt động như 1 HUB trung tâm của toàn bộ các Notification, từ SMS/Email/PUSH Notification
    - ct-notification-hub → [Java Spring Boot] Service này chính là Notification Hub, nó nhận toàn bộ yêu cầu gửi thông báo từ 1 nguồn và gửi đến đích thông qua các CHANNELS đã đăng ký từ nguồn


# Cơ cấu thành phần chính của hệ thống
Hệ thống có rất nhiều các thành phần lớn, được phân vùng như sau:
1. Các thành phần được triển khai phân tán ngoài thị trường, bao gồm:
    - EMS → Đây là bộ giải pháp chung, bộ giải pháp này được cung cấp dưới dạng SaaS và cho các giáo viên tự do, gia sư tự do, các trung tâm giáo dục và các trường học thuê và trả tiền theo tháng/quý/năm. Tuỳ vào đối tượng mà các subscription plan sẽ tương ứng với số lượng phân hệ tại LMS/TeMS/SMS khác nhau.
2. Các thành phần được triển khai tập trung, bao gồm 5 tầng từ ngoài vào trong như sau:
    - Tầng kết nối
        - SSO → thực hiện Single Signed On, chuyên dùng để quản lý users bên ngoài và bên trong hệ thống cũng như xác thực và phân quyền
        - One Connect → là cổng kết nối tập trung cho toàn bộ các requests từ bên ngoài internet vào bên trong hạ tầng
        - Education Omni Portal → là web portal chuyên dụng cho các Actors vận hành doanh nghiệp
    - Tầng sản phẩm
        - CMS → sản phẩm quản lý tập trung toàn bộ nội dung số của doanh nghiệp
        - BPM → Business Process Management, quản lý toàn bộ các quy trình kinh doanh thông qua công nghệ
        - ERP → Enterprise Resource Planning, quản lý toàn bộ tài nguyên và các quy trình kinh doanh vận hành doanh nghiệp
        - CRM → Customer Relationship Management, quản lý quan hệ khách hàng, bao gồm toàn bộ các modules của CRM 5th generation
        - Core Payment → chuyên quản lý toàn bộ thanh toán, các transactions trên toàn bộ ecosystem của doanh nghiệp sẽ được ghi nhận ở đây
    - Tầng công nghệ lõi
        - Workflow Management → quản lý toàn bộ workflow, sử dụng Temporal
        - Notification Hub → quản lý và điều phối toàn bộ Notifications trên toàn ecosystem, từ Push Notification, In App Notification cũng như gửi email/SMS đến các đích
        - AI/ML Services → cung cấp các dịch vụ liên quan đến AI và Machine Learning
        - SaaS Orchestration Platform → là 1 dịch vụ liên quan đến quản lý Control Plane và hỗ trợ cấp phát tài nguyên tenants để cung cấp dịch vụ SaaS
    - Tầng dữ liệu
        - Không cần quan tâm
    - Tầng hạ tầng 
        - Hạ tầng nằm trên AWS
        - Sử dụng Helm Chart, TerraForm, Jenkins, ArgoCD cùng toàn bộ các services được định nghĩa trong tài liệu **Tech-Stack.md**
