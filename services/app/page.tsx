// Home Page - KynguyenAI v3.0
// ISR: Revalidate every 5 minutes
export const revalidate = 300;

import Link from "next/link";
import Image from "next/image";
import {
  BentoGrid,
  HeroTile,
  TallTile,
  StandardTile,
  WideTile,
} from "@/components/bento/BentoGrid";
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
  const { data: featuredTools } = getMockTools({ featured: true, limit: 3 });
  const sponsoredTiles = getMockSponsoredTiles(2);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              KynguyenAI
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="/category/ai-news" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Tin tức AI
              </Link>
              <Link href="/category/ai-tools" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Công cụ AI
              </Link>
              <Link href="/category/ai-tutorial" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Hướng dẫn
              </Link>
              <Link href="/tools" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                AI Tools Directory
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <button className="text-sm px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Tin tức AI mới nhất
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Cập nhật hàng ngày từ các nguồn tin AI uy tín nhất thế giới
          </p>
        </div>

        <BentoGrid>
          {/* Hero Article (2x2) */}
          {featuredArticle && (
            <HeroTile>
              <Link href={featuredArticle.original_url} target="_blank" className="flex flex-col h-full">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white mb-3 w-fit`}>
                  {featuredArticle.category}
                </span>
                <h2 className="font-bold text-xl md:text-2xl leading-tight mb-3 line-clamp-3">
                  {featuredArticle.title_vi}
                </h2>
                <p className="text-sm opacity-90 line-clamp-3 flex-grow">
                  {featuredArticle.summary_vi}
                </p>
                <div className="mt-auto pt-4 text-sm opacity-80 flex justify-between">
                  <span>{featuredArticle.source}</span>
                  <span>{formatRelativeTime(featuredArticle.published_at)}</span>
                </div>
              </Link>
            </HeroTile>
          )}

          {/* GitHub Trending (1x2) */}
          <TallTile>
            <div className="flex flex-col h-full">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub Trending
              </h3>
              <div className="space-y-3 flex-grow overflow-hidden">
                {githubRepos.map((repo, index) => (
                  <Link
                    key={repo.repo_name}
                    href={repo.url}
                    target="_blank"
                    className="block group"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-gray-400 mt-0.5">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                          {repo.repo_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {repo.description_vi}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            {(repo.stars / 1000).toFixed(1)}k
                          </span>
                          <span>{repo.language}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/github" className="text-xs text-blue-600 hover:underline mt-2">
                Xem thêm →
              </Link>
            </div>
          </TallTile>

          {/* Regular Articles */}
          {regularArticles.slice(0, 3).map((article) => (
            <StandardTile key={article.id}>
              <Link href={article.original_url} target="_blank" className="flex flex-col h-full">
                {article.thumbnail && (
                  <div className="relative h-20 -mx-4 -mt-4 mb-3 overflow-hidden rounded-t-xl">
                    <Image
                      src={article.thumbnail}
                      alt={article.title_vi}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mb-2 w-fit ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
                <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600">
                  {article.title_vi}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 flex-grow">
                  {article.summary_vi}
                </p>
                <div className="mt-auto pt-2 text-xs text-gray-500 flex justify-between">
                  <span>{article.source}</span>
                  <span>{formatRelativeTime(article.published_at)}</span>
                </div>
              </Link>
            </StandardTile>
          ))}

          {/* Sponsored Tile */}
          {sponsoredTiles[0] && (
            <WideTile className="bg-gradient-to-r from-indigo-500 to-purple-600">
              <Link href={sponsoredTiles[0].target_url} target="_blank" className="flex items-center gap-4 h-full">
                <div className="flex-1">
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded mb-2 inline-block">
                    Tài trợ
                  </span>
                  <h3 className="font-semibold text-lg mb-1">{sponsoredTiles[0].title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{sponsoredTiles[0].description}</p>
                  <span className="text-sm font-medium mt-2 inline-block hover:underline">
                    {sponsoredTiles[0].cta_text} →
                  </span>
                </div>
              </Link>
            </WideTile>
          )}

          {/* More Articles */}
          {regularArticles.slice(3, 6).map((article) => (
            <StandardTile key={article.id}>
              <Link href={article.original_url} target="_blank" className="flex flex-col h-full">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mb-2 w-fit ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
                <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
                  {article.title_vi}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 flex-grow">
                  {article.summary_vi}
                </p>
                <div className="mt-auto pt-2 text-xs text-gray-500 flex justify-between">
                  <span>{article.source}</span>
                  <span>{formatRelativeTime(article.published_at)}</span>
                </div>
              </Link>
            </StandardTile>
          ))}

          {/* Featured Tools Section */}
          <TallTile>
            <div className="flex flex-col h-full">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                AI Tools phổ biến
              </h3>
              <div className="space-y-3 flex-grow">
                {featuredTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-lg font-bold text-gray-500 flex-shrink-0">
                      {tool.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {tool.tagline}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                          {tool.vote_count}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          {tool.average_rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/tools" className="text-xs text-blue-600 hover:underline mt-2">
                Xem tất cả Tools →
              </Link>
            </div>
          </TallTile>

          {/* More Articles */}
          {regularArticles.slice(6, 10).map((article) => (
            <StandardTile key={article.id}>
              <Link href={article.original_url} target="_blank" className="flex flex-col h-full">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mb-2 w-fit ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
                <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
                  {article.title_vi}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 flex-grow">
                  {article.summary_vi}
                </p>
                <div className="mt-auto pt-2 text-xs text-gray-500 flex justify-between">
                  <span>{article.source}</span>
                  <span>{formatRelativeTime(article.published_at)}</span>
                </div>
              </Link>
            </StandardTile>
          ))}
        </BentoGrid>

        {/* Newsletter Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Đăng ký nhận tin AI hàng tuần</h2>
            <p className="opacity-90 mb-6">
              Nhận tổng hợp tin tức AI quan trọng nhất mỗi tuần qua email. Miễn phí!
            </p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="email@example.com"
                className="px-4 py-3 rounded-lg text-gray-900 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-4">KynguyenAI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nền tảng tin tức và công cụ AI hàng đầu cho cộng đồng developer Việt Nam.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Danh mục</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/category/ai-news" className="hover:text-blue-600">Tin tức AI</Link></li>
                <li><Link href="/category/ai-tools" className="hover:text-blue-600">Công cụ AI</Link></li>
                <li><Link href="/category/ai-tutorial" className="hover:text-blue-600">Hướng dẫn</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Tài nguyên</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/tools" className="hover:text-blue-600">AI Tools Directory</Link></li>
                <li><Link href="/tools/submit" className="hover:text-blue-600">Gửi công cụ mới</Link></li>
                <li><Link href="/github" className="hover:text-blue-600">GitHub Trending</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Thông tin</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/about" className="hover:text-blue-600">Về chúng tôi</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-600">Chính sách bảo mật</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Liên hệ</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-zinc-800 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} KynguyenAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
