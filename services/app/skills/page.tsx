// Skills Trending Page - KynguyenAI v3.0
// ISR: Revalidate every 5 minutes
export const revalidate = 300;

import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkillsInfiniteList } from "@/components/skills/SkillsInfiniteList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent Skills Trending - Kỷ Nguyên AI",
  description: "Khám phá các AI Agent Skills đang trending trên skills.sh - thư viện kỹ năng cho AI agents",
};

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function SkillsTrendingPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const type = (params.type as "trending" | "alltime") || "trending";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[hsl(199,89%,48%)]/10 flex items-center justify-center">
              <SkillsIcon className="w-6 h-6 text-[hsl(199,89%,48%)]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                AI Skills <span className="text-[hsl(199,89%,48%)]">Trending</span>
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Khám phá các AI Agent Skills đang trending. Cài đặt bằng lệnh{" "}
            <code className="bg-surface-hover px-2 py-0.5 rounded text-sm font-mono text-foreground">npx skills add owner/repo</code>
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Xếp hạng:</span>
            <div className="flex rounded-lg overflow-hidden border border-surface-border">
              <TimeRangeButton href="/skills?type=trending" active={type === "trending"}>
                Trending (24h)
              </TimeRangeButton>
              <TimeRangeButton href="/skills?type=alltime" active={type === "alltime"}>
                All Time
              </TimeRangeButton>
            </div>
          </div>
        </div>

        {/* Skills List with Infinite Scroll */}
        <Suspense fallback={<SkillsListSkeleton />}>
          <SkillsInfiniteList initialType={type} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

function SkillsListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bg-surface border border-surface-border rounded-xl p-5 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-surface-hover" />
            <div className="flex-1">
              <div className="h-5 w-48 bg-surface-hover rounded mb-2" />
              <div className="h-4 w-32 bg-surface-hover rounded" />
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <div className="h-8 w-20 bg-surface-hover rounded-lg" />
              <div className="h-8 w-40 bg-surface-hover rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TimeRangeButton({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        active 
          ? "bg-[hsl(199,89%,48%)] text-white" 
          : "bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-hover"
      }`}
    >
      {children}
    </Link>
  );
}

// Icons
function SkillsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  );
}
