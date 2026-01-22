"use client";

// Skills Infinite Scroll Component - KynguyenAI v3.0
// Performance optimized with Intersection Observer and content-visibility

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { AgentSkill } from "@/types";
import styles from "@/app/skills/skills.module.css";

interface SkillsInfiniteListProps {
  initialType: "trending" | "alltime";
}

interface SkillsResponse {
  data: AgentSkill[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

const ITEMS_PER_PAGE = 50;

export function SkillsInfiniteList({ initialType }: SkillsInfiniteListProps) {
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as "trending" | "alltime") || initialType;

  const [skills, setSkills] = useState<AgentSkill[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const typeRef = useRef(type);
  const loadingRef = useRef(false);

  // Fetch skills function
  const fetchSkills = useCallback(
    async (reset = false) => {
      if (loadingRef.current) return;

      loadingRef.current = true;
      setLoading(true);
      const currentOffset = reset ? 0 : offsetRef.current;
      const currentType = typeRef.current;

      try {
        const response = await fetch(
          `/api/skills?type=${currentType}&limit=${ITEMS_PER_PAGE}&offset=${currentOffset}`
        );
        const result: SkillsResponse = await response.json();

        setSkills((prev) => (reset ? result.data : [...prev, ...result.data]));
        setHasMore(result.pagination.hasMore);
        offsetRef.current = reset ? result.data.length : offsetRef.current + result.data.length;
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    },
    []
  );

  // Reset and fetch when type changes
  useEffect(() => {
    if (typeRef.current !== type) {
      typeRef.current = type;
      offsetRef.current = 0;
      setSkills([]);
      setHasMore(true);
      fetchSkills(true);
    }
  }, [type, fetchSkills]);

  // Initial fetch
  useEffect(() => {
    if (skills.length === 0 && !loading) {
      fetchSkills(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchSkills();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before reaching bottom
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, fetchSkills]);

  if (skills.length === 0 && !loading) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-hover flex items-center justify-center">
          <SkillsIcon className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">Không tìm thấy skills nào. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <article
            key={`${skill.owner}-${skill.name}`}
            className={`${styles.skillItem} group relative bg-surface border border-surface-border rounded-xl p-5 hover:border-[hsl(199,89%,48%)]/40 hover:shadow-lg transition-all duration-200`}
          >
            <div className="flex items-center gap-4">
              {/* Rank Badge */}
              <div
                className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm ${
                  index < 3
                    ? "bg-[hsl(199,89%,48%)] text-white"
                    : "bg-surface-hover text-foreground"
                }`}
              >
                #{skill.rank}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={skill.url}
                    target="_blank"
                    className="text-lg font-semibold text-foreground hover:text-[hsl(199,89%,48%)] transition-colors truncate"
                  >
                    {skill.name}
                  </Link>
                  <ExternalLinkIcon className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground truncate">{skill.owner}</p>
              </div>

              {/* Stats */}
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-hover">
                  <DownloadIcon className="w-4 h-4 text-[hsl(199,89%,48%)]" />
                  <span className="text-sm font-medium text-foreground">{skill.installs_display}</span>
                </div>
                <code className="hidden md:block text-xs bg-surface-hover px-3 py-1.5 rounded-lg font-mono text-muted-foreground">
                  npx skills add {skill.owner}
                </code>
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="flex sm:hidden items-center gap-3 mt-3 pt-3 border-t border-surface-border">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <DownloadIcon className="w-4 h-4 text-[hsl(199,89%,48%)]" />
                <span>{skill.installs_display} installs</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Loading indicator / Observer target */}
      <div ref={observerTarget} className="py-8">
        {loading && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <div className="w-5 h-5 border-2 border-[hsl(199,89%,48%)] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Đang tải thêm...</span>
          </div>
        )}
        {!hasMore && skills.length > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            Đã hiển thị tất cả {skills.length} skills
          </div>
        )}
      </div>

    </>
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

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
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
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}
