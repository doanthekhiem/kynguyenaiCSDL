// Skills Trending Page - KynguyenAI v3.0
// ISR: Revalidate every 5 minutes
export const revalidate = 300;

import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { fetchSkillsTrending } from "@/lib/skills-trending";
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <SkillsIcon className="w-10 h-10 text-purple-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              AI Skills <span className="gradient-text">Trending</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Khám phá các AI Agent Skills đang trending. Cài đặt bằng lệnh{" "}
            <code className="bg-muted px-2 py-0.5 rounded text-sm">npx skills add owner/repo</code>. Cập nhật mỗi 5 phút
            từ skills.sh.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Time Range Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Xếp hạng:</span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <TimeRangeButton href="/skills?type=trending" active={type === "trending"}>
                Trending (24h)
              </TimeRangeButton>
              <TimeRangeButton href="/skills?type=alltime" active={type === "alltime"}>
                All Time
              </TimeRangeButton>
            </div>
          </div>
        </div>

        {/* Skills List */}
        <Suspense fallback={<SkillsListSkeleton />}>
          <SkillsList type={type} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

async function SkillsList({ type }: { type: "trending" | "alltime" }) {
  const skills = await fetchSkillsTrending(50, type);

  if (skills.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Không tìm thấy skills nào. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <article
          key={`${skill.owner}-${skill.name}`}
          className="group relative bg-card border border-border rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            {/* Rank */}
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 font-bold text-sm">
              {skill.rank}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link
                    href={skill.url}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-purple-400 transition-colors"
                  >
                    {skill.name}
                    <ExternalLinkIcon className="w-4 h-4 opacity-50" />
                  </Link>
                  <p className="text-muted-foreground mt-1">{skill.owner}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                {/* Installs */}
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <DownloadIcon className="w-4 h-4 text-purple-400" />
                  <span>{skill.installs_display} installs</span>
                </span>

                {/* Install command */}
                <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                  npx skills add {skill.owner}
                </code>
              </div>
            </div>
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </article>
      ))}
    </div>
  );
}

function SkillsListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-muted" />
            <div className="flex-1">
              <div className="h-6 w-48 bg-muted rounded mb-2" />
              <div className="h-4 w-32 bg-muted rounded mb-4" />
              <div className="flex gap-4">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-4 w-40 bg-muted rounded" />
              </div>
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
      className={`px-4 py-1.5 text-sm font-medium transition-colors ${
        active ? "bg-purple-500 text-white" : "bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

// Icons
function SkillsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}
