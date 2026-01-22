// Hero Section Component - KynguyenAI v3.0
// Rule 1.5 - Strategic Suspense Boundaries

import Link from "next/link";
import Image from "next/image";
import { BentoGrid, HeroTile, StandardTile, GitHubTile, SkillsTile } from "@/components/bento/BentoGrid";
import { getMockArticles, getMockFeaturedArticle } from "@/lib/mockdata";
import { fetchGitHubTrending } from "@/lib/github-trending";
import { fetchSkillsTrending } from "@/lib/skills-trending";
import { formatRelativeTime, getCategoryColor } from "@/lib/utils";

export async function HeroSection() {
  // Fetch data for hero section
  const featuredArticle = getMockFeaturedArticle();
  const { data: articles } = getMockArticles({ limit: 15 });
  const regularArticles = articles.filter((a) => !a.is_featured);
  const githubRepos = await fetchGitHubTrending(5);
  const trendingSkills = await fetchSkillsTrending(5);

  return (
    <section className="mb-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Tin tức AI <span className="text-[hsl(199,89%,48%)]">mới nhất</span>
          </h1>
          <p className="text-muted-foreground text-lg">Cập nhật hàng ngày từ các nguồn tin AI uy tín nhất thế giới</p>
        </div>
        <Link
          href="/category/ai-news"
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Xem tất cả
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      <BentoGrid>
        {/* Hero Article (2x2) */}
        {featuredArticle && (
          <HeroTile>
            <Link href={featuredArticle.original_url} target="_blank" className="flex flex-col h-full">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white mb-3 w-fit">
                {featuredArticle.category}
              </span>
              <h2 className="font-bold text-xl md:text-2xl lg:text-3xl leading-tight mb-3 line-clamp-3">
                {featuredArticle.title_vi}
              </h2>
              <p className="text-sm md:text-base opacity-90 line-clamp-3 flex-grow">{featuredArticle.summary_vi}</p>
              <div className="mt-auto pt-4 text-sm opacity-80 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/60" />
                  {featuredArticle.source}
                </span>
                <span>{formatRelativeTime(featuredArticle.published_at)}</span>
              </div>
            </Link>
          </HeroTile>
        )}

        {/* GitHub Trending (1x2) */}
        <GitHubTile>
          <div className="flex flex-col h-full">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <GitHubIcon className="w-5 h-5" />
              GitHub Trending
            </h3>
            <div className="space-y-3 flex-grow overflow-hidden">
              {githubRepos.map((repo, index) => (
                <Link key={repo.repo_name} href={repo.url} target="_blank" className="block group">
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-white/40 font-mono mt-0.5 w-4">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-cyan-400 transition-colors">
                        {repo.repo_name}
                      </p>
                      <p className="text-xs text-white/60 truncate">{repo.description_vi}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <StarIcon className="w-3 h-3 text-yellow-500" />
                          {(repo.stars / 1000).toFixed(1)}k
                        </span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          />
                          {repo.language}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/github" className="text-xs text-cyan-400 hover:underline mt-3 flex items-center gap-1">
              Xem thêm <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </GitHubTile>

        {/* AI Agent Skills Trending (1x2) */}
        <SkillsTile>
          <div className="flex flex-col h-full">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <SkillsIcon className="w-5 h-5" />
              AI Skills Trending
            </h3>
            <div className="space-y-3 flex-grow overflow-hidden">
              {trendingSkills.map((skill) => (
                <Link key={skill.name} href={skill.url} target="_blank" className="block group">
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-white/40 font-mono mt-0.5 w-4">{skill.rank}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-purple-400 transition-colors">
                        {skill.name}
                      </p>
                      <p className="text-xs text-white/60 truncate">{skill.owner}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <DownloadIcon className="w-3 h-3 text-purple-400" />
                          {skill.installs_display}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/skills" className="text-xs text-purple-400 hover:underline mt-3 flex items-center gap-1">
              Xem thêm <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </SkillsTile>

        {/* Regular Articles */}
        {regularArticles.slice(0, 8).map((article) => (
          <StandardTile key={article.id}>
            <ArticleTileContent article={article} showImage={false} />
          </StandardTile>
        ))}
      </BentoGrid>
    </section>
  );
}

// Article Tile Content Component
function ArticleTileContent({
  article,
  showImage = true,
}: {
  article: (typeof import("@/lib/mockdata"))["mockArticles"][number];
  showImage?: boolean;
}) {
  return (
    <Link href={article.original_url} target="_blank" className="flex flex-col h-full group">
      {showImage && article.thumbnail && (
        <div className="relative h-20 -mx-4 -mt-4 mb-3 overflow-hidden rounded-t-xl">
          <Image
            src={article.thumbnail}
            alt={article.title_vi}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mb-2 w-fit ${getCategoryColor(article.category)}`}
      >
        {article.category}
      </span>
      <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
        {article.title_vi}
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-2 flex-grow">{article.summary_vi}</p>
      <div className="mt-auto pt-2 text-xs text-muted-foreground flex justify-between">
        <span>{article.source}</span>
        <span>{formatRelativeTime(article.published_at)}</span>
      </div>
    </Link>
  );
}

// Helper function
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    Python: "#3572A5",
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Rust: "#dea584",
    Go: "#00ADD8",
    Java: "#b07219",
    "C++": "#f34b7d",
    Ruby: "#701516",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
  };
  return colors[language] || "#8b8b8b";
}

// Icons (Rule 6.3 - will be hoisted in Phase 2.2)
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

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
