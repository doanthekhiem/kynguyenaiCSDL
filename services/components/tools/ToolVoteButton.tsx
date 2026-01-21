// ToolVoteButton Component - KynguyenAI v3.0
// Interactive vote button with optimistic update

"use client";

import { useState, useTransition } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";

interface ToolVoteButtonProps {
  toolSlug: string;
  initialVoteCount: number;
  initialVoted?: boolean;
  className?: string;
}

export function ToolVoteButton({ toolSlug, initialVoteCount, initialVoted = false, className }: ToolVoteButtonProps) {
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [voted, setVoted] = useState(initialVoted);
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleVote = async () => {
    // Check if user is logged in
    if (!user) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    // Optimistic update
    const newVoted = !voted;
    const newVoteCount = newVoted ? voteCount + 1 : voteCount - 1;
    setVoted(newVoted);
    setVoteCount(newVoteCount);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/tools/${toolSlug}/vote`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          // Revert on error
          setVoted(!newVoted);
          setVoteCount(newVoted ? newVoteCount - 1 : newVoteCount + 1);
          console.error("Vote failed:", await response.text());
        }
      } catch (error) {
        // Revert on error
        setVoted(!newVoted);
        setVoteCount(newVoted ? newVoteCount - 1 : newVoteCount + 1);
        console.error("Vote error:", error);
      }
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleVote}
        disabled={isPending}
        className={cn(
          "w-full py-4 rounded-xl border-2 transition-all duration-200",
          "flex items-center justify-center gap-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          voted
            ? "border-primary bg-primary/10 text-primary"
            : "border-surface-border bg-surface hover:border-primary/50",
          "group",
          className,
        )}
        aria-label={voted ? "Remove vote" : "Vote for this tool"}
      >
        <ArrowUpIcon
          className={cn(
            "w-5 h-5 transition-colors",
            voted ? "text-primary" : "text-muted-foreground group-hover:text-primary",
          )}
        />
        <span className={cn("font-semibold", voted ? "text-primary" : "text-foreground")}>
          {voteCount.toLocaleString()}
        </span>
        <span className={cn("text-sm", voted ? "text-primary" : "text-muted-foreground")}>
          {voted ? "Đã vote" : "Vote"}
        </span>
      </button>

      {/* Login prompt tooltip */}
      {showLoginPrompt && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-surface-hover border border-surface-border rounded-lg shadow-lg text-sm text-foreground whitespace-nowrap animate-fade-in">
          Vui lòng{" "}
          <a href="/login" className="text-primary hover:underline">
            đăng nhập
          </a>{" "}
          để vote
        </div>
      )}
    </div>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );
}
