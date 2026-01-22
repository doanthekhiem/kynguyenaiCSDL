// ToolGrid Component - KynguyenAI v3.0
// Responsive grid layout for AI Tools with filtering

"use client";

import { useState, useMemo } from "react";
import { ToolCard } from "./ToolCard";
import type { Tool, ToolCategory } from "@/types";
import { cn } from "@/lib/utils";

interface ToolGridProps {
  tools: Tool[];
  categories: ToolCategory[];
  className?: string;
}

type SortOption = "votes" | "newest" | "rating";

export function ToolGrid({ tools, categories, className }: ToolGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("votes");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSortedTools = useMemo(() => {
    let result = [...tools];

    // Filter by category
    if (selectedCategory) {
      result = result.filter((t) => t.category_id === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(query) || t.tagline.toLowerCase().includes(query));
    }

    // Sort
    switch (sortBy) {
      case "votes":
        result.sort((a, b) => b.vote_count - a.vote_count);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "rating":
        result.sort((a, b) => b.average_rating - a.average_rating);
        break;
    }

    return result;
  }, [tools, selectedCategory, sortBy, searchQuery]);

  return (
    <div className={className}>
      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm công cụ AI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-3 rounded-xl",
              "bg-surface border border-surface-border",
              "text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
              "transition-colors",
            )}
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Sắp xếp:</span>
          <div className="flex rounded-lg border border-surface-border overflow-hidden">
            {[
              { value: "votes", label: "Phổ biến" },
              { value: "newest", label: "Mới nhất" },
              { value: "rating", label: "Đánh giá" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value as SortOption)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors",
                  sortBy === option.value
                    ? "bg-primary text-white"
                    : "bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-hover",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            selectedCategory === null
              ? "bg-[hsl(199,89%,48%)] text-white"
              : "bg-surface border border-surface-border text-muted-foreground hover:text-foreground hover:border-primary/30",
          )}
        >
          Tất cả
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              selectedCategory === cat.id
                ? "bg-[hsl(199,89%,48%)] text-white"
                : "bg-surface border border-surface-border text-muted-foreground hover:text-foreground hover:border-primary/30",
            )}
          >
            {cat.name_vi}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">
        Hiển thị <span className="font-medium text-foreground">{filteredAndSortedTools.length}</span> công cụ
        {selectedCategory && <span> trong {categories.find((c) => c.id === selectedCategory)?.name_vi}</span>}
      </p>

      {/* Grid */}
      {filteredAndSortedTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-hover flex items-center justify-center">
            <SearchIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Không tìm thấy công cụ</h3>
          <p className="text-muted-foreground">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}
    </div>
  );
}

// Icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}
