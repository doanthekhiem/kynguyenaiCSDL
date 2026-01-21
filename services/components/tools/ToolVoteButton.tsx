// ToolVoteButton Component - KynguyenAI v3.0
// Interactive vote button with optimistic update

"use client";

import { useState, useTransition, useCallback } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";

interface ToolVoteButtonProps {
  toolSlug: string;
  initialVoteCount: number;
  initialVoted?: boolean;
  className?: string;
}

// Rule 6.3 - Hoist static JSX elements to avoid re-creation
function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );
}

export function ToolVoteButton({ toolSlug, initialVoteCount, initialVoted = false, className }: ToolVoteButtonProps) {
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [voted, setVoted] = useState(initialVoted);
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Rule 5.5 - Use functional setState to avoid stale closures
  const handleVote = useCallback(async () => {
    // Check if user is logged in
    if (!user) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    // Optimistic update with functional setState
    let newVoted: boolean;
    let newVoteCount: number;
    
    setVoted((prev) => {
      newVoted = !prev;
      return newVoted;
    });
    
    setVoteCount((prev) => {
      newVoteCount = newVoted ? prev + 1 : prev - 1;
      return newVoteCount;
    });

    startTransition(async () => {
      try {
        const response = await fetch(`/api/tools/${toolSlug}/vote`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          // Revert on error with functional setState
          setVoted((prev) => !prev);
          setVoteCount((prev) => (newVoted ? prev - 1 : prev + 1));
          console.error("Vote failed:", await response.text());
        }
      } catch (error) {
        // Revert on error with functional setState
        setVoted((prev) => !prev);
        setVoteCount((prev) => (newVoted ? prev - 1 : prev + 1));
        console.error("Vote error:", error);
      }
    });
  }, [user, toolSlug]);

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
