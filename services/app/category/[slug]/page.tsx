// Category Page - KynguyenAI v3.0
// Article listing by category

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BentoGrid, StandardTile, HeroTile } from "@/components/bento/BentoGrid";
import { getMockArticles } from "@/lib/mockdata";
import { formatRelativeTime, getCategoryColor } from "@/lib/utils";

const categoryConfig: Record<string, { title: string; description: string }> = {
  "ai-news": {
    title: "Tin tức AI",
    description: "Cập nhật tin tức công nghệ AI mới nhất từ các nguồn uy tín toàn cầu",
  },
  "ai-tools": {
    title: "Công cụ AI",
    description: "Giới thiệu các công cụ AI hữu ích cho công việc và cuộc sống",
  },
  "ai-tutorial": {
    title: "Hướng dẫn AI",
    description: "Các bài hướng dẫn chi tiết về AI, Machine Learning và LLMs",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const config = categoryConfig[slug];

  if (!config) {
    return { title: "Danh mục không tồn tại - KynguyenAI" };
  }

  return {
    title: `${config.title} - KynguyenAI`,
    description: config.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const config = categoryConfig[slug];

  if (!config) {
    notFound();
  }

  // Map slug to category name in articles
  const categoryMap: Record<string, string> = {
    "ai-news": "AI News",
    "ai-tools": "AI Tools",
    "ai-tutorial": "AI Tutorial",
  };

  const { data: articles, total } = getMockArticles({
    category: categoryMap[slug],
    limit: 20,
  });

  const featuredArticle = articles.find((a) => a.is_featured);
  const regularArticles = articles.filter((a) => !a.is_featured);

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
          <span className="text-foreground">{config.title}</span>
        </nav>

        {/* Hero Section */}
        <section className="mb-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{config.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{config.description}</p>
            <p className="text-sm text-muted-foreground mt-4">
              <span className="font-medium text-foreground">{total}</span> bài viết
            </p>
          </div>

          {/* Articles Bento Grid */}
          <BentoGrid>
            {/* Featured Article */}
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

            {/* Regular Articles */}
            {regularArticles.map((article) => (
              <StandardTile key={article.id}>
                <Link href={article.original_url} target="_blank" className="flex flex-col h-full group">
                  {article.thumbnail && (
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
              </StandardTile>
            ))}
          </BentoGrid>
        </section>

        {/* Empty state */}
        {articles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-hover flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Chưa có bài viết nào</h3>
            <p className="text-muted-foreground">Các bài viết trong danh mục này sẽ được cập nhật sớm</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
