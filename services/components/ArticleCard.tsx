// ArticleCard Component - KynguyenAI v3.0
import Image from "next/image";
import Link from "next/link";
import type { ArticleCardProps } from "@/types";
import { formatRelativeTime, truncateText, getCategoryColor } from "@/lib/utils";

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <Link
      href={article.original_url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <article className="h-full flex flex-col">
        {/* Thumbnail */}
        {article.thumbnail && (
          <div className="relative w-full h-24 mb-3 rounded-lg overflow-hidden">
            <Image
              src={article.thumbnail}
              alt={article.title_vi}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        )}

        {/* Category Badge */}
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit mb-2 ${getCategoryColor(article.category)}`}
        >
          {article.category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
          {article.title_vi}
        </h3>

        {/* Summary */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 flex-grow">
          {truncateText(article.summary_vi, 100)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2 text-xs text-gray-500 dark:text-gray-500">
          <span>{article.source}</span>
          <span>{formatRelativeTime(article.published_at)}</span>
        </div>
      </article>
    </Link>
  );
}

// Hero Article Card (for 2x2 tiles)
export function HeroArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={article.original_url}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full flex flex-col"
    >
      <article className="h-full flex flex-col">
        {/* Category Badge */}
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit mb-3 bg-white/20 text-white">
          {article.category}
        </span>

        {/* Title */}
        <h2 className="font-bold text-xl md:text-2xl leading-tight mb-3 line-clamp-3">
          {article.title_vi}
        </h2>

        {/* Summary */}
        <p className="text-sm opacity-90 line-clamp-3 flex-grow">
          {article.summary_vi}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 text-sm opacity-80">
          <span>{article.source}</span>
          <span>{formatRelativeTime(article.published_at)}</span>
        </div>
      </article>
    </Link>
  );
}
