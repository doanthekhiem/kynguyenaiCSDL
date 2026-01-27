// Featured Tools Section - KynguyenAI v3.0
// Rule 1.5 - Strategic Suspense Boundaries

import Link from "next/link";
import { ToolCard } from "@/components/tools/ToolCard";
import { getTools } from "@/lib/supabase/tools";
import { Tool } from "@/types";

export async function FeaturedToolsSection() {
  const { data: featuredTools } = await getTools({ limit: 8, sort: "votes" });
  
  // If no tools, return null
  if (!featuredTools || featuredTools.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Công cụ AI <span className="text-[hsl(199,89%,48%)]">phổ biến</span>
          </h2>
          <p className="text-muted-foreground">Khám phá các công cụ AI được cộng đồng yêu thích nhất</p>
        </div>
        <Link
          href="/tools"
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Xem tất cả
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool as unknown as Tool} />
        ))}
      </div>
    </section>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
