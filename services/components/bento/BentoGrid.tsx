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

// Hero tile (2x2) - Featured articles with animated gradient
export function HeroTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "col-span-1 md:col-span-2 row-span-2 relative overflow-hidden",
        "rounded-2xl p-6 text-white",
        "gradient-hero",
        "hover:shadow-2xl hover:shadow-[hsl(270,70%,60%)]/20",
        "transition-all duration-500 ease-out",
        "group",
        "[will-change:transform,box-shadow]",
        className,
      )}
    >
      {/* Animated glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 [will-change:opacity]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">{children}</div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 [will-change:transform]" />
      <div className="absolute bottom-4 left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 [will-change:transform]" />
    </div>
  );
}

// Tall tile (1x2) - Sidebar content with glass effect
export function TallTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "row-span-2 relative overflow-hidden",
        "bg-surface border border-surface-border rounded-2xl p-5",
        "hover:border-[hsl(199,89%,48%)]/30 hover:shadow-lg hover:shadow-[hsl(199,89%,48%)]/5",
        "transition-all duration-300 ease-out",
        "group",
        className,
      )}
    >
      {/* Subtle gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(199,89%,48%)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
        "hover:shadow-lg hover:shadow-[hsl(199,89%,48%)]/5",
        "hover:-translate-y-1",
        "transition-all duration-300 ease-out",
        "group",
        "[will-change:transform,box-shadow,border-color]",
        className,
      )}
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
        "bg-gradient-to-r from-[hsl(270,70%,55%)] via-[hsl(290,70%,50%)] to-[hsl(330,80%,55%)]",
        "hover:shadow-xl hover:shadow-[hsl(270,70%,60%)]/20",
        "hover:-translate-y-0.5",
        "transition-all duration-300 ease-out",
        "group",
        className,
      )}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out [will-change:transform]" />

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
        "gradient-hero",
        "text-white",
        className,
      )}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 to-transparent rounded-full" />

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
        "bg-gradient-to-b from-[hsl(220,20%,10%)] to-[hsl(220,20%,6%)]",
        "border border-surface-border rounded-2xl p-5",
        "hover:border-white/10",
        "transition-all duration-300",
        "group",
        className,
      )}
    >
      {/* GitHub glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500" />

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
        "bg-gradient-to-br from-surface to-surface-hover",
        "border border-surface-border rounded-2xl p-5",
        "hover:border-[hsl(160,84%,39%)]/30 hover:shadow-lg hover:shadow-[hsl(160,84%,39%)]/5",
        "transition-all duration-300",
        "group",
        className,
      )}
    >
      {/* Accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(160,84%,39%)] via-[hsl(199,89%,48%)] to-[hsl(270,70%,60%)]" />

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
