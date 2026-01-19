// Home Page - KynguyenAI v3.0
// ISR: Revalidate every 5 minutes
export const revalidate = 300;

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  BentoGrid,
  HeroTile,
  TallTile,
  StandardTile,
  WideTile,
  NewsletterTile,
  GitHubTile,
  ToolShowcaseTile,
} from "@/components/bento/BentoGrid";
import { ToolCard } from "@/components/tools/ToolCard";
import {
  getMockArticles,
  getMockFeaturedArticle,
  getMockGitHubTrending,
  getMockTools,
  getMockSponsoredTiles,
} from "@/lib/mockdata";
import { formatRelativeTime, getCategoryColor } from "@/lib/utils";

export default function Home() {
  // Fetch data (using mock data for now)
  const featuredArticle = getMockFeaturedArticle();
  const { data: articles } = getMockArticles({ limit: 15 });
  const regularArticles = articles.filter((a) => !a.is_featured);
  const githubRepos = getMockGitHubTrending(5);
  const { data: featuredTools } = getMockTools({ featured: true, limit: 4 });
  const sponsoredTiles = getMockSponsoredTiles(2);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Tin tức AI <span className="gradient-text">mới nhất</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Cập nhật hàng ngày từ các nguồn tin AI uy tín nhất thế giới
              </p>
            </div>
            <Link
              href="/category/ai-news"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Xem tất cả
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <BentoGrid>
            {/* Hero Article (2x2) */}
            {featuredArticle && (
              <HeroTile>
                <Link href={featuredArticle.original_url} target="_blank" className="flex flex-col h-full">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white mb-3 w-fit">
                    {featuredArticle.category}
                  </span>
                  <h2 className="font-bold text-xl md:text-2xl lg:text-3xl leading-tight mb-3 line-clamp-3">
                    {featuredArticle.title_vi}
                  </h2>
                  <p className="text-sm md:text-base opacity-90 line-clamp-3 flex-grow">{featuredArticle.summary_vi}</p>
                  <div className="mt-auto pt-4 text-sm opacity-80 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white/60" />
                      {featuredArticle.source}
                    </span>
                    <span>{formatRelativeTime(featuredArticle.published_at)}</span>
                  </div>
                </Link>
              </HeroTile>
            )}

            {/* GitHub Trending (1x2) */}
            <GitHubTile>
              <div className="flex flex-col h-full">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <GitHubIcon className="w-5 h-5" />
                  GitHub Trending
                </h3>
                <div className="space-y-3 flex-grow overflow-hidden">
                  {githubRepos.map((repo, index) => (
                    <Link key={repo.repo_name} href={repo.url} target="_blank" className="block group">
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-white/40 font-mono mt-0.5 w-4">{index + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate group-hover:text-cyan-400 transition-colors">
                            {repo.repo_name}
                          </p>
                          <p className="text-xs text-white/60 truncate">{repo.description_vi}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                              <StarIcon className="w-3 h-3 text-yellow-500" />
                              {(repo.stars / 1000).toFixed(1)}k
                            </span>
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: getLanguageColor(repo.language),
                                }}
                              />
                              {repo.language}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/github" className="text-xs text-cyan-400 hover:underline mt-3 flex items-center gap-1">
                  Xem thêm <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </GitHubTile>

            {/* Regular Articles */}
            {regularArticles.slice(0, 3).map((article) => (
              <StandardTile key={article.id}>
                <ArticleTileContent article={article} />
              </StandardTile>
            ))}

            {/* Sponsored Tile */}
            {sponsoredTiles[0] && (
              <WideTile>
                <Link href={sponsoredTiles[0].target_url} target="_blank" className="flex items-center gap-6 w-full">
                  <div className="flex-1">
                    <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded mb-2 inline-block">
                      Tài trợ
                    </span>
                    <h3 className="font-bold text-lg mb-1">{sponsoredTiles[0].title}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">{sponsoredTiles[0].description}</p>
                  </div>
                  <span className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                    {sponsoredTiles[0].cta_text}
                    <ArrowRightIcon className="w-4 h-4" />
                  </span>
                </Link>
              </WideTile>
            )}

            {/* More Articles */}
            {regularArticles.slice(3, 6).map((article) => (
              <StandardTile key={article.id}>
                <ArticleTileContent article={article} showImage={false} />
              </StandardTile>
            ))}

            {/* Featured Tools Section */}
            <ToolShowcaseTile>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-primary" />
                    AI Tools nổi bật
                  </h3>
                </div>
                <div className="space-y-3 flex-grow">
                  {featuredTools.slice(0, 3).map((tool) => (
                    <ToolCard key={tool.id} tool={tool} variant="compact" />
                  ))}
                </div>
                <Link href="/tools" className="text-xs text-primary hover:underline mt-3 flex items-center gap-1">
                  Khám phá thêm <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </ToolShowcaseTile>

            {/* More Articles */}
            {regularArticles.slice(6, 9).map((article) => (
              <StandardTile key={article.id}>
                <ArticleTileContent article={article} showImage={false} />
              </StandardTile>
            ))}
          </BentoGrid>
        </section>

        {/* Newsletter Section */}
        <section className="mb-12">
          <NewsletterTile>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Đăng ký nhận tin AI <span className="opacity-90">hàng tuần</span>
              </h2>
              <p className="opacity-90 mb-8 text-lg">
                Nhận tổng hợp tin tức AI quan trọng nhất mỗi tuần qua email. Hoàn toàn miễn phí!
              </p>
              <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="px-5 py-3 rounded-xl text-foreground bg-white dark:bg-white/10 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-muted-foreground dark:placeholder:text-white/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-[hsl(270,70%,50%)] font-semibold rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap hover-lift"
                >
                  Đăng ký ngay
                </button>
              </form>
              <p className="text-xs opacity-70 mt-4">Không spam, hủy đăng ký bất cứ lúc nào</p>
            </div>
          </NewsletterTile>
        </section>

        {/* Featured Tools Grid Section */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Công cụ AI <span className="gradient-text">phổ biến</span>
              </h2>
              <p className="text-muted-foreground">Khám phá các công cụ AI được cộng đồng yêu thích nhất</p>
            </div>
            <Link
              href="/tools"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Xem tất cả
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Article Tile Content Component
function ArticleTileContent({
  article,
  showImage = true,
}: {
  article: (typeof import("@/lib/mockdata"))["mockArticles"][number];
  showImage?: boolean;
}) {
  return (
    <Link href={article.original_url} target="_blank" className="flex flex-col h-full group">
      {showImage && article.thumbnail && (
        <div className="relative h-20 -mx-4 -mt-4 mb-3 overflow-hidden rounded-t-xl">
          <Image
            src={article.thumbnail}
            alt={article.title_vi}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mb-2 w-fit ${getCategoryColor(article.category)}`}
      >
        {article.category}
      </span>
      <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
        {article.title_vi}
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-2 flex-grow">{article.summary_vi}</p>
      <div className="mt-auto pt-2 text-xs text-muted-foreground flex justify-between">
        <span>{article.source}</span>
        <span>{formatRelativeTime(article.published_at)}</span>
      </div>
    </Link>
  );
}

// Helper function for language colors
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    Python: "#3572A5",
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Rust: "#dea584",
    Go: "#00ADD8",
    Java: "#b07219",
    "C++": "#f34b7d",
    Ruby: "#701516",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
  };
  return colors[language] || "#8b8b8b";
}

// Icons
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}
