// BentoGrid Components - KynguyenAI v3.0
// Reference: https://bentogrids.com

import { cn } from "@/lib/utils";
import type { BentoGridProps } from "@/types";

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]",
        className
      )}
    >
      {children}
    </div>
  );
}

// Hero tile (2x2) - Featured articles
export function HeroTile({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "col-span-1 md:col-span-2 row-span-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white",
        "hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}

// Tall tile (1x2) - Important news
export function TallTile({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "row-span-2 bg-gray-100 dark:bg-zinc-800 rounded-xl p-4",
        "hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}

// Standard tile (1x1) - Regular articles
export function StandardTile({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl p-4",
        "hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}

// Wide tile (2x1) - Announcements
export function WideTile({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "col-span-1 md:col-span-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-4 text-white",
        "hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
