// GitHub Trending Page - KynguyenAI v3.0
// ISR: Revalidate every 5 minutes
export const revalidate = 300;

import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { fetchGitHubTrending } from "@/lib/github-trending";
import { LanguageFilter } from "@/components/github/LanguageFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub Trending - Kỷ Nguyên AI",
  description: "Khám phá các repository AI đang trending trên GitHub hôm nay",
};

interface PageProps {
  searchParams: Promise<{ language?: string; since?: string }>;
}

export default async function GitHubTrendingPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const language = params.language || undefined;
  const since = (params.since as "daily" | "weekly" | "monthly") || "daily";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GitHubIcon className="w-10 h-10 text-foreground" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              GitHub <span className="text-[hsl(199,89%,48%)]">Trending</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Khám phá các repository AI và công cụ đang trending trên GitHub. Cập nhật mỗi 5 phút từ github.com/trending.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Time Range Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Thời gian:</span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <TimeRangeButton href={buildUrl(language, "daily")} active={since === "daily"}>
                Hôm nay
              </TimeRangeButton>
              <TimeRangeButton href={buildUrl(language, "weekly")} active={since === "weekly"}>
                Tuần này
              </TimeRangeButton>
              <TimeRangeButton href={buildUrl(language, "monthly")} active={since === "monthly"}>
                Tháng này
              </TimeRangeButton>
            </div>
          </div>

          {/* Language Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ngôn ngữ:</span>
            <LanguageFilter />
          </div>
        </div>

        {/* Trending List */}
        <Suspense fallback={<TrendingListSkeleton />}>
          <TrendingList language={language} since={since} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

async function TrendingList({ language, since }: { language?: string; since: "daily" | "weekly" | "monthly" }) {
  const repos = await fetchGitHubTrending(25, language, since);

  if (repos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Không tìm thấy repository nào. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {repos.map((repo, index) => (
        <article
          key={repo.repo_name}
          className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            {/* Rank */}
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground font-bold text-sm">
              {index + 1}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link
                    href={repo.url}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {repo.repo_name}
                    <ExternalLinkIcon className="w-4 h-4 opacity-50" />
                  </Link>
                  <p className="text-muted-foreground mt-1 line-clamp-2">{repo.description_vi}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                {/* Language */}
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                  <span className="text-muted-foreground">{repo.language}</span>
                </span>

                {/* Total Stars */}
                <span className="flex items-center gap-1 text-muted-foreground">
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  {formatNumber(repo.stars)}
                </span>

                {/* Today's Stars */}
                {repo.today_stars && repo.today_stars > 0 && (
                  <span className="flex items-center gap-1 text-green-500">
                    <TrendingUpIcon className="w-4 h-4" />
                    {formatNumber(repo.today_stars)} {getSinceLabel(since)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Hover effect */}
          <div className="absolute inset-0 rounded-xl bg-[hsl(199,89%,48%)]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </article>
      ))}
    </div>
  );
}

function TrendingListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-muted" />
            <div className="flex-1">
              <div className="h-6 w-48 bg-muted rounded mb-2" />
              <div className="h-4 w-full bg-muted rounded mb-4" />
              <div className="flex gap-4">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
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
        active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

function buildUrl(language?: string, since?: string): string {
  const params = new URLSearchParams();
  if (language) params.set("language", language);
  if (since && since !== "daily") params.set("since", since);
  const query = params.toString();
  return query ? `/github?${query}` : "/github";
}

function getSinceLabel(since: string): string {
  switch (since) {
    case "weekly":
      return "tuần này";
    case "monthly":
      return "tháng này";
    default:
      return "hôm nay";
  }
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    Python: "#3572A5",
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Rust: "#dea584",
    Go: "#00ADD8",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#178600",
    Ruby: "#701516",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Scala: "#c22d40",
    PHP: "#4F5D95",
  };
  return colors[language] || "#8b8b8b";
}

// Icons
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
