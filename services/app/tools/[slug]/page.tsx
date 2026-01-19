// Tool Detail Page - KynguyenAI v3.0
// Individual AI tool page with details, reviews, and related tools

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToolCard } from "@/components/tools/ToolCard";
import { getMockToolBySlug, getMockTools, getMockToolReviews, mockToolCategories } from "@/lib/mockdata";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = getMockToolBySlug(slug);

  if (!tool) {
    return { title: "Tool not found - KynguyenAI" };
  }

  return {
    title: `${tool.name} - AI Tools | KynguyenAI`,
    description: tool.tagline,
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getMockToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const reviews = getMockToolReviews(tool.id, 5);
  const { data: relatedTools } = getMockTools({ limit: 4 });
  const category = mockToolCategories.find((c) => c.id === tool.category_id);

  const pricingColors: Record<string, string> = {
    free: "badge-free",
    freemium: "badge-freemium",
    paid: "badge-paid",
    enterprise: "badge-enterprise",
  };

  const pricingLabels: Record<string, string> = {
    free: "Miễn phí",
    freemium: "Freemium",
    paid: "Trả phí",
    enterprise: "Doanh nghiệp",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-primary transition-colors">
            AI Tools
          </Link>
          <span>/</span>
          <span className="text-foreground">{tool.name}</span>
        </nav>

        {/* Hero Section */}
        <section className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Tool Info */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-6 mb-6">
              {/* Logo */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-hover flex-shrink-0 flex items-center justify-center">
                {tool.logo_url ? (
                  <Image src={tool.logo_url} alt={tool.name} width={80} height={80} className="object-contain" />
                ) : (
                  <span className="text-3xl font-bold gradient-text">{tool.name.charAt(0)}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{tool.name}</h1>
                  {tool.featured && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-lg text-muted-foreground mb-3">{tool.tagline}</p>
                <div className="flex flex-wrap items-center gap-3">
                  {category && (
                    <span className="badge-ai-tools px-3 py-1 text-sm rounded-full">{category.name_vi}</span>
                  )}
                  <span className={cn("px-3 py-1 text-sm rounded-full", pricingColors[tool.pricing_type])}>
                    {pricingLabels[tool.pricing_type]}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 p-4 rounded-xl bg-surface border border-surface-border mb-6">
              <div className="flex items-center gap-2">
                <ArrowUpIcon className="w-5 h-5 text-primary" />
                <div>
                  <span className="font-bold text-foreground">{tool.vote_count.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground ml-1">votes</span>
                </div>
              </div>
              <div className="w-px h-8 bg-surface-border" />
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <div>
                  <span className="font-bold text-foreground">{tool.average_rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground ml-1">({tool.review_count} đánh giá)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold text-foreground mb-4">Giới thiệu</h2>
              <div className="text-muted-foreground whitespace-pre-line">{tool.description}</div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-surface via-surface to-surface-hover border border-surface-border">
              <Link
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl text-center font-semibold gradient-hero text-white hover:opacity-90 transition-opacity hover-lift mb-4"
              >
                Truy cập {tool.name}
              </Link>

              {tool.pricing_details && (
                <p className="text-sm text-muted-foreground text-center mb-4">{tool.pricing_details}</p>
              )}

              <div className="flex justify-center gap-3">
                {tool.twitter_url && (
                  <Link
                    href={tool.twitter_url}
                    target="_blank"
                    className="p-2 rounded-lg bg-surface-hover hover:bg-surface-border transition-colors"
                    aria-label="Twitter"
                  >
                    <TwitterIcon className="w-5 h-5 text-muted-foreground" />
                  </Link>
                )}
                {tool.github_url && (
                  <Link
                    href={tool.github_url}
                    target="_blank"
                    className="p-2 rounded-lg bg-surface-hover hover:bg-surface-border transition-colors"
                    aria-label="GitHub"
                  >
                    <GitHubIcon className="w-5 h-5 text-muted-foreground" />
                  </Link>
                )}
                {tool.discord_url && (
                  <Link
                    href={tool.discord_url}
                    target="_blank"
                    className="p-2 rounded-lg bg-surface-hover hover:bg-surface-border transition-colors"
                    aria-label="Discord"
                  >
                    <DiscordIcon className="w-5 h-5 text-muted-foreground" />
                  </Link>
                )}
              </div>
            </div>

            {/* Vote Button */}
            <button className="w-full py-4 rounded-xl border-2 border-surface-border bg-surface hover:border-primary/50 transition-colors group flex items-center justify-center gap-2">
              <ArrowUpIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-semibold text-foreground">Vote</span>
            </button>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Đánh giá từ người dùng</h2>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 rounded-xl bg-surface border border-surface-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center flex-shrink-0">
                      {review.user?.avatar_url ? (
                        <Image
                          src={review.user.avatar_url}
                          alt={review.user.display_name || "User"}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-sm font-medium text-muted-foreground">
                          {review.user?.display_name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">
                          {review.user?.display_name || "Người dùng ẩn danh"}
                        </span>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon
                              key={i}
                              className={cn("w-4 h-4", i < review.rating ? "text-yellow-500" : "text-surface-border")}
                            />
                          ))}
                        </div>
                      </div>
                      {review.title && <h4 className="font-medium text-foreground mb-2">{review.title}</h4>}
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface rounded-xl border border-surface-border">
              <p className="text-muted-foreground">Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!</p>
            </div>
          )}
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Công cụ liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools
              .filter((t) => t.id !== tool.id)
              .slice(0, 4)
              .map((relatedTool) => (
                <ToolCard key={relatedTool.id} tool={relatedTool} />
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Icons
function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}
