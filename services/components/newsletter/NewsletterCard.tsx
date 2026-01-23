// NewsletterCard Component - KynguyenAI v3.0
// Displays a single newsletter news item

import Image from "next/image";
import Link from "next/link";
import type { NewsletterCardProps } from "@/types";
import { formatRelativeTime, truncateText, getNewsletterCategoryColor } from "@/lib/utils";

export function NewsletterCard({ news, className }: NewsletterCardProps) {
  return (
    <Link
      href={news.original_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block group ${className || ""}`}
    >
      <article className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
        {/* Thumbnail */}
        {news.thumbnail_url && (
          <div className="relative w-full h-40 overflow-hidden">
            <Image
              src={news.thumbnail_url}
              alt={news.title_vi}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="flex flex-col flex-grow p-4">
          {/* Category & Source Badges */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {news.category && (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getNewsletterCategoryColor(news.category.slug)}`}
              >
                {news.category.name_vi}
              </span>
            )}
            {news.source && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {news.source.name}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base leading-tight mb-2 line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {news.title_vi}
          </h3>

          {/* Summary */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-grow">
            {truncateText(news.summary_vi, 120)}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-500">
            <span>{formatRelativeTime(news.published_at)}</span>
            <span className="text-blue-600 dark:text-blue-400 group-hover:underline">
              Đọc thêm →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Compact version for smaller grids
export function NewsletterCardCompact({ news, className }: NewsletterCardProps) {
  return (
    <Link
      href={news.original_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block group ${className || ""}`}
    >
      <article className="h-full flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
        {/* Thumbnail */}
        {news.thumbnail_url && (
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={news.thumbnail_url}
              alt={news.title_vi}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        )}

        <div className="flex flex-col flex-grow min-w-0">
          {/* Category Badge */}
          {news.category && (
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium w-fit mb-1 ${getNewsletterCategoryColor(news.category.slug)}`}
            >
              {news.category.name_vi}
            </span>
          )}

          {/* Title */}
          <h3 className="font-medium text-sm leading-tight line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {news.title_vi}
          </h3>

          {/* Footer */}
          <div className="flex items-center gap-2 mt-auto text-xs text-gray-500 dark:text-gray-500">
            {news.source && <span>{news.source.name}</span>}
            <span>•</span>
            <span>{formatRelativeTime(news.published_at)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Featured/Hero version for large display
export function NewsletterCardFeatured({ news, className }: NewsletterCardProps) {
  return (
    <Link
      href={news.original_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block group ${className || ""}`}
    >
      <article className="relative h-full min-h-[300px] flex flex-col justify-end p-6 rounded-2xl overflow-hidden">
        {/* Background Image */}
        {news.thumbnail_url && (
          <Image
            src={news.thumbnail_url}
            alt={news.title_vi}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-white">
          {/* Category Badge */}
          {news.category && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm mb-3">
              {news.category.name_vi}
            </span>
          )}

          {/* Title */}
          <h2 className="font-bold text-xl md:text-2xl leading-tight mb-2 line-clamp-3">
            {news.title_vi}
          </h2>

          {/* Summary */}
          <p className="text-sm opacity-90 line-clamp-2 mb-3">
            {truncateText(news.summary_vi, 150)}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm opacity-80">
            <span>{news.source?.name || "Newsletter"}</span>
            <span>{formatRelativeTime(news.published_at)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
