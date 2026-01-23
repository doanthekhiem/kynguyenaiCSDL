// Newsletter News Page - KynguyenAI v3.0
// Display all newsletter news with filtering

import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterCard } from "@/components/newsletter/NewsletterCard";
import {
  getNewsletterNews,
  getNewsletterCategories,
  getNewsletterSources,
} from "@/lib/newsletter";
import Link from "next/link";

export const revalidate = 300; // ISR: 5 minutes

export const metadata = {
  title: "Tin tức AI - KynguyenAI",
  description:
    "Cập nhật tin tức AI mới nhất từ các newsletter hàng đầu. Đọc tin tức về mô hình AI, công cụ AI, nghiên cứu AI và nhiều hơn nữa.",
};

interface PageProps {
  searchParams: Promise<{
    category?: string;
    source?: string;
    page?: string;
  }>;
}

export default async function NewsletterPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const limit = 12;
  const offset = (page - 1) * limit;

  // Fetch data in parallel
  const [newsResult, categories, sources] = await Promise.all([
    getNewsletterNews({
      limit,
      offset,
      category: params.category,
      source: params.source,
    }),
    getNewsletterCategories(),
    getNewsletterSources(),
  ]);

  const { data: news, pagination } = newsResult;
  const totalPages = Math.ceil(pagination.total / limit);

  // Build filter URL helper
  const buildFilterUrl = (key: string, value: string | null) => {
    const searchParams = new URLSearchParams();
    if (params.category && key !== "category")
      searchParams.set("category", params.category);
    if (params.source && key !== "source")
      searchParams.set("source", params.source);
    if (value) searchParams.set(key, value);
    const queryString = searchParams.toString();
    return `/newsletter${queryString ? `?${queryString}` : ""}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tin tức <span className="text-[hsl(199,89%,48%)]">AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cập nhật tin tức AI mới nhất từ các newsletter hàng đầu thế giới,
            được dịch sang tiếng Việt
          </p>
        </section>

        {/* Filters */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Danh mục:
              </span>
              <Link
                href={buildFilterUrl("category", null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !params.category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Tất cả
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={buildFilterUrl("category", cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    params.category === cat.slug
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {cat.name_vi}
                </Link>
              ))}
            </div>
          </div>

          {/* Source Filter */}
          {sources.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm font-medium text-muted-foreground">
                Nguồn:
              </span>
              <Link
                href={buildFilterUrl("source", null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !params.source
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Tất cả
              </Link>
              {sources.map((src) => (
                <Link
                  key={src.slug}
                  href={buildFilterUrl("source", src.slug)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    params.source === src.slug
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {src.name}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Hiển thị {news.length} / {pagination.total} tin tức
        </div>

        {/* News Grid */}
        <Suspense fallback={<NewsGridSkeleton />}>
          {news.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {news.map((item) => (
                <NewsletterCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Chưa có tin tức nào trong danh mục này.
              </p>
              <Link
                href="/newsletter"
                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
              >
                Xem tất cả tin tức
              </Link>
            </div>
          )}
        </Suspense>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-12 flex justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/newsletter?page=${page - 1}${params.category ? `&category=${params.category}` : ""}${params.source ? `&source=${params.source}` : ""}`}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                ← Trước
              </Link>
            )}

            <span className="px-4 py-2 text-muted-foreground">
              Trang {page} / {totalPages}
            </span>

            {page < totalPages && (
              <Link
                href={`/newsletter?page=${page + 1}${params.category ? `&category=${params.category}` : ""}${params.source ? `&source=${params.source}` : ""}`}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Sau →
              </Link>
            )}
          </nav>
        )}
      </main>

      <Footer />
    </div>
  );
}

function NewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-[280px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}
