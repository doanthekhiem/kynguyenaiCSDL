// BentoGrid Components - KynguyenAI v3.0
// Premium Bento Grid with glassmorphism and animations
// Rule 7.1 - will-change for animated elements

import { cn } from "@/lib/utils";
import type { BentoGridProps } from "@/types";

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]", className)}>
      {children}
    </div>
  );
}

// Hero tile (2x2) - Featured articles with refined solid color
export function HeroTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "col-span-1 md:col-span-2 row-span-2 relative overflow-hidden",
        "rounded-2xl p-6 text-white",
        "bg-[hsl(199,89%,48%)]",
        "hover:shadow-2xl hover:shadow-[hsl(199,89%,48%)]/25",
        "transition-all duration-300 ease-out",
        "group",
        "[will-change:transform,box-shadow]",
        className,
      )}
    >
      {/* Subtle overlay on hover */}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">{children}</div>

      {/* Subtle decorative element */}
      <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
    </div>
  );
}

// Tall tile (1x2) - Sidebar content with clean design
export function TallTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "row-span-2 relative overflow-hidden",
        "bg-surface border border-surface-border rounded-2xl p-5",
        "hover:border-[hsl(199,89%,48%)]/30 hover:shadow-lg",
        "transition-all duration-300 ease-out",
        "group",
        className,
      )}
    >
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

// Standard tile (1x1) - Regular articles
export function StandardTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "bg-surface border border-surface-border rounded-xl p-4",
        "hover:border-[hsl(199,89%,48%)]/30",
        "hover:shadow-lg",
        "hover:-translate-y-1",
        "transition-all duration-300 ease-out",
        "group",
        "[will-change:transform,box-shadow,border-color]",
        className,
      )}
    >
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

// Wide tile (2x1) - Announcements, Sponsored content
export function WideTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "col-span-1 md:col-span-2 relative overflow-hidden",
        "rounded-xl p-5 text-white",
        "bg-[hsl(199,89%,43%)]",
        "hover:shadow-xl hover:shadow-[hsl(199,89%,48%)]/20",
        "hover:-translate-y-0.5",
        "transition-all duration-300 ease-out",
        "group",
        className,
      )}
    >
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">{children}</div>
    </div>
  );
}

// Newsletter tile - Special CTA section
export function NewsletterTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "col-span-full relative overflow-hidden",
        "rounded-2xl p-8 md:p-12",
        "bg-[hsl(199,89%,48%)]",
        "text-white",
        className,
      )}
    >
      {/* Subtle background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// GitHub tile - For trending repos
export function GitHubTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "row-span-2 relative overflow-hidden",
        "bg-[hsl(220,20%,8%)]",
        "border border-surface-border rounded-2xl p-5",
        "hover:border-white/10",
        "transition-all duration-300",
        "group",
        className,
      )}
    >
      {/* Content */}
      <div className="relative z-10 h-full text-white">{children}</div>
    </div>
  );
}

// Skills tile - For AI Agent Skills trending
export function SkillsTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "row-span-2 relative overflow-hidden",
        "bg-[hsl(220,20%,8%)]",
        "border border-surface-border rounded-2xl p-5",
        "hover:border-white/10",
        "transition-all duration-300",
        "group",
        className,
      )}
    >
      {/* Content */}
      <div className="relative z-10 h-full text-white">{children}</div>
    </div>
  );
}

// Tool showcase tile
export function ToolShowcaseTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "row-span-2 relative overflow-hidden",
        "bg-surface",
        "border border-surface-border rounded-2xl p-5",
        "hover:border-[hsl(199,89%,48%)]/30 hover:shadow-lg",
        "transition-all duration-300",
        "group",
        className,
      )}
    >
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[hsl(199,89%,48%)]" />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

// Skeleton loading tile
export function SkeletonTile({
  size = "standard",
  className,
}: {
  size?: "hero" | "tall" | "wide" | "standard";
  className?: string;
}) {
  const sizeClasses = {
    hero: "col-span-1 md:col-span-2 row-span-2",
    tall: "row-span-2",
    wide: "col-span-1 md:col-span-2",
    standard: "",
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        "bg-surface border border-surface-border rounded-xl p-4",
        "animate-pulse",
        className,
      )}
    >
      <div className="skeleton h-4 w-20 mb-3" />
      <div className="skeleton h-6 w-full mb-2" />
      <div className="skeleton h-6 w-3/4 mb-4" />
      <div className="skeleton h-4 w-full mb-1" />
      <div className="skeleton h-4 w-2/3" />
    </div>
  );
}
