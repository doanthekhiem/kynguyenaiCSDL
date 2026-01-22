// ToolCard Component - KynguyenAI v3.0
// Premium AI Tool card with vote, rating, and pricing display
// Rule 2.5 - Preload on user intent
// Rule 6.3 - Use hoisted icons

"use client";

import Link from "next/link";
import Image from "next/image";
import type { Tool } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, StarIcon } from "@/components/icons/Icons";

// Rule 2.5 - Preload interactive components on hover
function preloadToolInteractive() {
  if (typeof window !== "undefined") {
    void import("./ToolInteractive");
  }
}

interface ToolCardProps {
  tool: Tool;
  userVoted?: boolean;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

// Rule 7.4 - Cache repeated function calls - Hoist helper to module level
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

export function ToolCard({ tool, userVoted = false, className, variant = "default" }: ToolCardProps) {
  const pricingColors: Record<string, string> = {
    free: "badge-free",
    freemium: "badge-freemium",
    paid: "badge-paid",
    enterprise: "badge-enterprise",
  };

  const pricingLabels: Record<string, string> = {
    free: "Miễn phí",
    freemium: "Freemium",
    paid: "Trả phí",
    enterprise: "Doanh nghiệp",
  };

  if (variant === "compact") {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        onMouseEnter={preloadToolInteractive}
        onFocus={preloadToolInteractive}
        className={cn(
          "flex items-center gap-3 p-3 rounded-xl",
          "bg-surface border border-surface-border",
          "hover:border-[hsl(199,89%,48%)]/30 hover:shadow-md",
          "transition-all duration-200",
          "group",
          "[will-change:border-color,box-shadow]",
          className,
        )}
      >
        <ToolLogo tool={tool} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
            {tool.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">{tool.tagline}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ArrowUpIcon className="w-3 h-3" />
            {formatNumber(tool.vote_count)}
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        onMouseEnter={preloadToolInteractive}
        onFocus={preloadToolInteractive}
        className={cn(
          "relative overflow-hidden rounded-2xl p-6",
          "bg-surface",
          "border border-surface-border",
          "hover:border-[hsl(199,89%,48%)]/30 hover:shadow-xl",
          "hover:-translate-y-1",
          "transition-all duration-300",
          "group",
          "[will-change:transform,border-color,box-shadow]",
          className,
        )}
      >
        {/* Featured badge */}
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500 text-white">
            Featured
          </span>
        </div>

        <div className="flex items-start gap-4">
          <ToolLogo tool={tool} size="lg" />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{tool.tagline}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className={cn("px-2 py-1 text-xs font-medium rounded-full", pricingColors[tool.pricing_type])}>
            {pricingLabels[tool.pricing_type]}
          </span>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <ArrowUpIcon className={cn("w-4 h-4", userVoted && "text-primary")} />
              {formatNumber(tool.vote_count)}
            </span>
            <span className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              {tool.average_rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/tools/${tool.slug}`}
      onMouseEnter={preloadToolInteractive}
      onFocus={preloadToolInteractive}
      className={cn(
        "flex flex-col p-4 rounded-xl",
        "bg-surface border border-surface-border",
        "hover:border-[hsl(199,89%,48%)]/30 hover:shadow-lg hover:shadow-[hsl(199,89%,48%)]/5",
        "hover:-translate-y-0.5",
        "transition-all duration-200",
        "group",
        "[will-change:transform,border-color,box-shadow]",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <ToolLogo tool={tool} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {tool.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{tool.tagline}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={cn("px-2 py-0.5 text-xs font-medium rounded-full", pricingColors[tool.pricing_type])}>
          {pricingLabels[tool.pricing_type]}
        </span>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full",
              "bg-surface-hover",
              userVoted && "text-primary bg-primary/10",
            )}
          >
            <ArrowUpIcon className="w-3 h-3" />
            {formatNumber(tool.vote_count)}
          </span>
          <span className="flex items-center gap-1">
            <StarIcon className="w-3 h-3 text-yellow-500" />
            {tool.average_rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}

// Tool Logo with fallback
function ToolLogo({ tool, size = "md" }: { tool: Tool; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-xl",
  };

  const sizePixels = {
    sm: 32,
    md: 40,
    lg: 56,
  };

  if (tool.logo_url) {
    return (
      <div className={cn(sizeClasses[size], "relative rounded-xl overflow-hidden bg-surface-hover flex-shrink-0")}>
        <Image
          src={tool.logo_url}
          alt={tool.name}
          width={sizePixels[size]}
          height={sizePixels[size]}
          className="object-contain"
        />
      </div>
    );
  }

  // Fallback with initial letter
  return (
    <div
      className={cn(
        sizeClasses[size],
        "rounded-xl flex items-center justify-center flex-shrink-0",
        "bg-[hsl(199,89%,48%)]/10",
        "text-[hsl(199,89%,48%)] font-bold",
      )}
    >
      {tool.name.charAt(0).toUpperCase()}
    </div>
  );
}
