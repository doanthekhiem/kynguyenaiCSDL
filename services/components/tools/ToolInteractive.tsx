// ToolInteractive Component - KynguyenAI v3.0
// Client-side wrapper for interactive tool features (vote, review)

"use client";

import { useState, useEffect, useCallback } from "react";
import { ToolVoteButton } from "./ToolVoteButton";
import { ToolReviewForm } from "./ToolReviewForm";

interface ToolInteractiveProps {
  toolSlug: string;
  initialVoteCount: number;
}

export function ToolInteractive({ toolSlug, initialVoteCount }: ToolInteractiveProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check vote status on mount
  useEffect(() => {
    async function checkVoteStatus() {
      try {
        const response = await fetch(`/api/tools/${toolSlug}/vote-status`);
        if (response.ok) {
          const data = await response.json();
          setHasVoted(data.hasVoted);
        }
      } catch (error) {
        console.error("Failed to check vote status:", error);
      } finally {
        setLoading(false);
      }
    }

    checkVoteStatus();
  }, [toolSlug]);

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Vote button skeleton */}
        <div className="w-full py-4 rounded-xl border-2 border-surface-border bg-surface animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToolVoteButton toolSlug={toolSlug} initialVoteCount={initialVoteCount} initialVoted={hasVoted} />
    </div>
  );
}

export function ToolReviewSection({ toolSlug }: { toolSlug: string }) {
  const handleReviewSubmitted = useCallback(() => {
    window.location.reload();
  }, []);

  return <ToolReviewForm toolSlug={toolSlug} onReviewSubmitted={handleReviewSubmitted} className="mt-6" />;
}
