// Tool Interactive Wrapper - KynguyenAI v3.0
// Client component wrapper for lazy loading interactive features
// Rule 2.4 - Dynamic imports for heavy components

"use client";

import dynamic from "next/dynamic";

// Rule 2.4 - Lazy load interactive components (voting, reviews)
export const ToolInteractive = dynamic(
  () => import("./ToolInteractive").then((m) => ({ default: m.ToolInteractive })),
  {
    ssr: false,
    loading: () => <div className="w-full py-4 rounded-xl border-2 border-surface-border bg-surface animate-pulse h-16" />,
  },
);

export const ToolReviewSection = dynamic(
  () => import("./ToolInteractive").then((m) => ({ default: m.ToolReviewSection })),
  {
    ssr: false,
    loading: () => <div className="w-full p-6 rounded-xl border border-surface-border bg-surface animate-pulse h-32 mt-6" />,
  },
);
