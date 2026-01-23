// NewsletterNewsSection - Homepage Section
// KynguyenAI v3.0
// Displays latest newsletter news on the homepage

import Link from "next/link";
import { getLatestNewsletterNews } from "@/lib/newsletter";
import { NewsletterCard, NewsletterCardFeatured } from "./NewsletterCard";

export async function NewsletterNewsSection() {
  const news = await getLatestNewsletterNews(5);

  if (news.length === 0) {
    return null; // Don't show section if no news
  }

  const [featured, ...rest] = news;

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Tin tức AI mới nhất
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Cập nhật từ các newsletter AI hàng đầu
            </p>
          </div>
          <Link
            href="/newsletter"
            className="hidden sm:inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Xem tất cả
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured News */}
          <NewsletterCardFeatured news={featured} />

          {/* Other News */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((item) => (
              <NewsletterCard key={item.id} news={item} />
            ))}
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Xem tất cả tin tức
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Loading skeleton for Suspense
export function NewsletterNewsSectionSkeleton() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-5 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured skeleton */}
          <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />

          {/* Other skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[200px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
