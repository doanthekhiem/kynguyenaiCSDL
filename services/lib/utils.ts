// Utility functions - KynguyenAI v3.0
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to Vietnamese locale
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format relative time (e.g., "2 giờ trước")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} phút trước`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  } else if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  } else {
    return formatDate(dateString);
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Get category badge color
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "AI Tools": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "AI News": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "AI Tutorial": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };
  return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
}

/**
 * Get newsletter category badge color by slug
 */
export function getNewsletterCategoryColor(categorySlug: string): string {
  const colors: Record<string, string> = {
    "ai-models": "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
    "ai-tools": "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200",
    "ai-research": "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200",
    "ai-business": "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200",
    "ai-regulation": "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200",
    "ai-tutorials": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200",
    "ai-funding": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    "general": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };
  return colors[categorySlug] || colors["general"];
}
