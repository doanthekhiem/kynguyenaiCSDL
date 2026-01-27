// About Page - KynguyenAI v3.0

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về chúng tôi - KynguyenAI",
  description:
    "Tìm hiểu về KynguyenAI - Cổng thông tin AI #1 Việt Nam. Sứ mệnh, tầm nhìn và giá trị chúng tôi mang lại cho cộng đồng AI Việt Nam.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Về <span className="text-[hsl(199,89%,48%)]">KynguyenAI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cổng thông tin AI #1 Việt Nam - Tổng hợp tin tức AI thông minh, tự động hóa hoàn toàn
          </p>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-surface border border-surface-border rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Giới thiệu</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              KynguyenAI.vn được định vị là <strong className="text-foreground">"Cổng thông tin AI #1 Việt Nam"</strong> - một nền tảng tổng hợp tin tức AI (AI News Aggregator) thông minh, tự động hóa hoàn toàn, phục vụ tất cả người Việt Nam quan tâm đến Trí tuệ nhân tạo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Chúng tôi giải quyết bài toán <strong className="text-foreground">quá tải thông tin AI</strong> bằng cách tự động thu thập, tóm tắt, dịch sang tiếng Việt và phân loại thông tin về công cụ AI, xu hướng AI, hướng dẫn sử dụng AI từ các nguồn quốc tế uy tín nhất.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Mission */}
            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-[hsl(199,89%,48%)]/10 flex items-center justify-center mb-4">
                <MissionIcon className="w-6 h-6 text-[hsl(199,89%,48%)]" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Sứ mệnh</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-[hsl(199,89%,48%)] mt-1">•</span>
                  <span>Giải quyết bài toán quá tải thông tin AI cho người dùng Việt Nam</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[hsl(199,89%,48%)] mt-1">•</span>
                  <span>Cung cấp tin tức AI Việt hóa chất lượng cao từ nguồn quốc tế</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[hsl(199,89%,48%)] mt-1">•</span>
                  <span>Tự động thu thập, tóm tắt và phân loại thông tin về AI</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-[hsl(199,89%,48%)]/10 flex items-center justify-center mb-4">
                <VisionIcon className="w-6 h-6 text-[hsl(199,89%,48%)]" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Tầm nhìn</h3>
              <p className="text-muted-foreground leading-relaxed">
                Trở thành nền tảng tin tức AI hàng đầu tại Việt Nam, đóng vai trò <strong className="text-foreground">hạ tầng tri thức</strong> hỗ trợ mục tiêu quốc gia về AI, phổ cập kiến thức kỹ thuật tiên tiến bằng tiếng Việt và kết nối hệ sinh thái công nghệ trong nước và quốc tế.
              </p>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Giá trị chúng tôi mang lại</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-[hsl(199,89%,48%)]" />
                Cho Người dùng phổ thông
              </h3>
              <p className="text-muted-foreground">
                Tiếp cận AI dễ dàng, hiểu và sử dụng công cụ AI hiệu quả thông qua nội dung được dịch và giải thích bằng tiếng Việt.
              </p>
            </div>

            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <CodeIcon className="w-5 h-5 text-[hsl(199,89%,48%)]" />
                Cho Lập trình viên
              </h3>
              <p className="text-muted-foreground">
                Cập nhật framework AI mới, công cụ và thư viện AI/ML từ các nguồn uy tín, được tổng hợp và phân loại dễ tìm kiếm.
              </p>
            </div>

            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <BusinessIcon className="w-5 h-5 text-[hsl(199,89%,48%)]" />
                Cho Doanh nghiệp
              </h3>
              <p className="text-muted-foreground">
                Theo dõi xu hướng AI ứng dụng kinh doanh, case studies, giải pháp AI để đưa ra quyết định chiến lược.
              </p>
            </div>

            <div className="bg-surface border border-surface-border rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <EducationIcon className="w-5 h-5 text-[hsl(199,89%,48%)]" />
                Cho Sinh viên/Nghiên cứu
              </h3>
              <p className="text-muted-foreground">
                Tài liệu học tập, nghiên cứu AI, hướng dẫn từ cơ bản đến nâng cao, được tổng hợp từ nhiều nguồn quốc tế.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Tính năng chính</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Tin tức AI mới nhất",
                description: "Tổng hợp tin tức AI từ các newsletter hàng đầu thế giới, được dịch và phân loại tự động",
                icon: NewsIcon,
              },
              {
                title: "Công cụ AI Directory",
                description: "Thư viện công cụ AI đầy đủ với đánh giá, phân loại và hướng dẫn sử dụng",
                icon: ToolsIcon,
              },
              {
                title: "GitHub Trending",
                description: "Theo dõi các repository AI trending trên GitHub, được dịch và giải thích",
                icon: GitHubIcon,
              },
              {
                title: "AI Skills Trending",
                description: "Cập nhật các AI agent skills phổ biến nhất từ skills.sh",
                icon: SkillsIcon,
              },
            ].map((feature, index) => (
              <div key={index} className="bg-surface border border-surface-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[hsl(199,89%,48%)]/10 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-[hsl(199,89%,48%)]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Công nghệ</h2>
          <div className="bg-surface border border-surface-border rounded-xl p-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              KynguyenAI được xây dựng với các công nghệ hiện đại:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Frontend & Backend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Next.js 14 (App Router)</li>
                  <li>• React Server Components</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">AI & Data Processing</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Perplexity AI (Translation & Categorization)</li>
                  <li>• Gmail API (Newsletter Processing)</li>
                  <li>• Supabase (Database)</li>
                  <li>• Automated Content Pipeline</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-surface-hover border border-surface-border rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Liên hệ với chúng tôi</h2>
          <p className="text-muted-foreground mb-6">
            Có câu hỏi, góp ý hoặc muốn hợp tác? Chúng tôi luôn sẵn sàng lắng nghe!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(199,89%,48%)] text-white rounded-lg font-medium hover:bg-[hsl(199,89%,45%)] transition-colors"
          >
            Liên hệ ngay
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Icons
function MissionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function VisionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );
}

function BusinessIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function EducationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function NewsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      />
    </svg>
  );
}

function ToolsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function SkillsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
