
# Technology Stacks
Đây là các stacks sẽ được sử dụng trong toàn bộ ecosystem, từ frontend, mobile → GraphQL → Backend services.

# All the Technology Stacks
## Frontend
Dưới đây là các stack chính sử dụng để phát triển Web application
- ReactJS
- Vite

## Mobile development
Các stack chính sử dụng để phát triển ứng dụng mobile.
- Flutter
- Firebase → Analytics, Crashlytics, Push notification

## GraphQL
GraphQL được sử dụng như Backend For Frontend cho toàn bộ các requests đi vào từ frontend hoặc mobile
- Appolo GraphQL Router
- Appolo GraphQL Client

## Backend development
### Java 
- Java 21 LTS
- Spring Boot 3.5.3
- AWS SDK Java 2.x

### NodeJS
- NodeJS v22.16.0

### AWS Managed Services
- S3 - sử dụng cho cả internal buckets và external buckets cũng như backup databases và nhiều mục đích storage khác
- RDS for Non-Production and Aurora Postgresql for Production
- Cloudfront → for frontend CDN as well as S3 buckets được triển khai cho các external access.
- Secret Manager → for service configurations
- KMS → Key Management System
- SES → gửi email
- SNS → gửi tin nhắn Push Notification
- EKS → triển khai hệ thống
- ECR → quản lý images
- Elasticache Redis → cho các mục đích cache
- MSK Kafka → messaging platform and streaming
- Lambda → các pipeline nhỏ và Serverless Architecture approach trong 1 vài kịch bản nhỏ

## Deployment
Dưới đây là các stacks sử dụng trong việc triển khai hệ thống
- AWS Cloud → Triển khai hệ thống trên AWS Cloud Platform
- Helm Chart → quản lý deployment
- GitLab → quản lý source code
- TerraForm → Infrastructure as code
- Jenkins → sử dụng làm CI pipelines
- ArgoCD → sử dụng làm CD
