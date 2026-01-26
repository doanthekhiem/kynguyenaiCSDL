// Contact Page - KynguyenAI v3.0

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ - KynguyenAI",
  description: "Liên hệ với đội ngũ KynguyenAI. Chúng tôi luôn sẵn sàng lắng nghe phản hồi và góp ý từ cộng đồng.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Liên hệ <span className="text-[hsl(199,89%,48%)]">với chúng tôi</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe phản hồi, góp ý và câu hỏi từ cộng đồng
          </p>
        </section>

        {/* Contact Methods */}
        <section className="space-y-8 mb-12">
          {/* Email */}
          <div className="bg-surface border border-surface-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[hsl(199,89%,48%)]/10 flex items-center justify-center shrink-0">
                <EmailIcon className="w-6 h-6 text-[hsl(199,89%,48%)]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground mb-3">
                  Gửi email cho chúng tôi về bất kỳ câu hỏi, góp ý hoặc yêu cầu nào
                </p>
                <a
                  href="mailto:contact@kynguyenai.vn"
                  className="text-[hsl(199,89%,48%)] hover:underline font-medium"
                >
                  contact@kynguyenai.vn
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-surface border border-surface-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[hsl(199,89%,48%)]/10 flex items-center justify-center shrink-0">
                <SocialIcon className="w-6 h-6 text-[hsl(199,89%,48%)]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Mạng xã hội</h3>
                <p className="text-muted-foreground mb-4">
                  Theo dõi và tương tác với chúng tôi trên các nền tảng mạng xã hội
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/kynguyenai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <GitHubIcon className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://twitter.com/kynguyenai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <TwitterIcon className="w-5 h-5" />
                    <span>Twitter</span>
                  </a>
                  <a
                    href="https://www.facebook.com/kynguyenai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FacebookIcon className="w-5 h-5" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-surface border border-surface-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[hsl(199,89%,48%)]/10 flex items-center justify-center shrink-0">
                <FeedbackIcon className="w-6 h-6 text-[hsl(199,89%,48%)]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Góp ý & Phản hồi</h3>
                <p className="text-muted-foreground mb-3">
                  Chúng tôi rất trân trọng mọi phản hồi từ cộng đồng để cải thiện dịch vụ
                </p>
                <p className="text-sm text-muted-foreground">
                  Bạn có thể gửi góp ý về nội dung, tính năng mới, hoặc báo cáo lỗi qua email hoặc
                  các kênh mạng xã hội
                </p>
              </div>
            </div>
          </div>

          {/* Partnership */}
          <div className="bg-surface border border-surface-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[hsl(199,89%,48%)]/10 flex items-center justify-center shrink-0">
                <PartnershipIcon className="w-6 h-6 text-[hsl(199,89%,48%)]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Hợp tác</h3>
                <p className="text-muted-foreground mb-3">
                  Quan tâm đến việc hợp tác hoặc quảng cáo trên KynguyenAI?
                </p>
                <a
                  href="mailto:partnership@kynguyenai.vn"
                  className="text-[hsl(199,89%,48%)] hover:underline font-medium"
                >
                  partnership@kynguyenai.vn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="bg-surface-hover border border-surface-border rounded-xl p-6 text-center">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Thời gian phản hồi:</strong> Chúng tôi thường phản
            hồi trong vòng 24-48 giờ làm việc
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Icons
function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function SocialIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
      />
    </svg>
  );
}

function FeedbackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      />
    </svg>
  );
}

function PartnershipIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
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

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
