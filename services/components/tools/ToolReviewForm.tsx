// ToolReviewForm Component - KynguyenAI v3.0
// Form for submitting tool reviews with star rating

"use client";

import { useState, useTransition, useCallback } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";

interface ToolReviewFormProps {
  toolSlug: string;
  onReviewSubmitted?: () => void;
  className?: string;
}

// Rule 6.3 - Hoist static JSX elements to avoid re-creation
function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function ToolReviewForm({ toolSlug, onReviewSubmitted, className }: ToolReviewFormProps) {
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Rule 7.8 - Early return from functions for validation
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Early return - validation
    if (rating === 0) {
      setError("Vui lòng chọn số sao đánh giá");
      return;
    }
    if (content.length < 50) {
      setError("Nội dung đánh giá cần ít nhất 50 ký tự");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/tools/${toolSlug}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, title: title || undefined, content }),
        });

        if (!response.ok) {
          const data = await response.json();
          if (response.status === 409) {
            setError("Bạn đã đánh giá công cụ này rồi");
          } else if (response.status === 401) {
            setError("Vui lòng đăng nhập để đánh giá");
          } else {
            setError(data.error || "Có lỗi xảy ra, vui lòng thử lại");
          }
          return;
        }

        setSuccess(true);
        setRating(0);
        setTitle("");
        setContent("");
        onReviewSubmitted?.();

        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        console.error("Review error:", err);
        setError("Có lỗi xảy ra, vui lòng thử lại");
      }
    });
  }, [rating, content, title, toolSlug, onReviewSubmitted]);

  if (!user) {
    return (
      <div className={cn("p-6 rounded-xl bg-surface border border-surface-border text-center", className)}>
        <p className="text-muted-foreground">
          Vui lòng{" "}
          <a href="/login" className="text-primary hover:underline">
            đăng nhập
          </a>{" "}
          để viết đánh giá
        </p>
      </div>
    );
  }

  if (success) {
    return (
      <div className={cn("p-6 rounded-xl bg-green-500/10 border border-green-500/30 text-center", className)}>
        <p className="text-green-600 dark:text-green-400 font-medium">✓ Đánh giá của bạn đã được gửi thành công!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("p-6 rounded-xl bg-surface border border-surface-border", className)}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Viết đánh giá</h3>

      {/* Star Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Đánh giá của bạn <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 transition-transform hover:scale-110"
              aria-label={`Rate ${star} stars`}
            >
              <StarIcon
                className={cn(
                  "w-8 h-8 transition-colors",
                  (hoveredRating || rating) >= star ? "text-yellow-500" : "text-surface-border",
                )}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">{rating > 0 ? `${rating}/5 sao` : "Chọn số sao"}</span>
        </div>
      </div>

      {/* Title (optional) */}
      <div className="mb-4">
        <label htmlFor="review-title" className="block text-sm font-medium text-muted-foreground mb-2">
          Tiêu đề (không bắt buộc)
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tóm tắt trải nghiệm của bạn..."
          maxLength={200}
          className="w-full px-4 py-2 rounded-lg bg-background border border-surface-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Content */}
      <div className="mb-4">
        <label htmlFor="review-content" className="block text-sm font-medium text-muted-foreground mb-2">
          Nội dung đánh giá <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Chia sẻ trải nghiệm chi tiết của bạn với công cụ này... (tối thiểu 50 ký tự)"
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-background border border-surface-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-foreground placeholder:text-muted-foreground"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {content.length}/50 ký tự tối thiểu
          {content.length >= 50 && " ✓"}
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full py-3 rounded-xl font-semibold transition-all duration-200",
          "gradient-hero text-white",
          "hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      >
        {isPending ? "Đang gửi..." : "Gửi đánh giá"}
      </button>
    </form>
  );
}
