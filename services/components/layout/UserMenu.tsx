// User Menu Component - KynguyenAI v3.0
// Lazy-loaded user dropdown menu (Rule 2.4)
// Rule 6.3 - Use hoisted icons

"use client";

import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { UserIcon, BookmarkIcon, LogoutIcon } from "@/components/icons/Icons";

interface UserMenuProps {
  user: User;
  onClose: () => void;
  onSignOut: () => void;
}

export function UserMenu({ user, onClose, onSignOut }: UserMenuProps) {
  const getUserInitial = () => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getUserName = () => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    return user.email?.split("@")[0] || "User";
  };

  return (
    <div className="absolute right-0 mt-2 w-56 rounded-xl glass-surface border border-surface-border shadow-xl animate-scale-in origin-top-right">
      <div className="p-3 border-b border-surface-border">
        <p className="font-medium text-sm truncate">{getUserName()}</p>
        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
      </div>
      <div className="p-1">
        <Link
          href="/profile"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-surface-hover transition-colors"
        >
          <UserIcon className="w-4 h-4" />
          Tài khoản
        </Link>
        <Link
          href="/bookmarks"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-surface-hover transition-colors"
        >
          <BookmarkIcon className="w-4 h-4" />
          Đã lưu
        </Link>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
        >
          <LogoutIcon className="w-4 h-4" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
