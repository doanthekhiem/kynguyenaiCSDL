// Mobile Menu Component - KynguyenAI v3.0
// Lazy-loaded mobile menu (Rule 2.4 - Dynamic Imports for Heavy Components)

"use client";

import Link from "next/link";
import type { User } from "@supabase/supabase-js";

interface MobileMenuProps {
  navLinks: Array<{ href: string; label: string }>;
  user: User | null;
  onClose: () => void;
}

export function MobileMenu({ navLinks, user, onClose }: MobileMenuProps) {
  return (
    <div className="md:hidden py-4 border-t border-surface-border animate-fade-in">
      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
          >
            {link.label}
          </Link>
        ))}
        {!user && (
          <Link
            href="/login"
            onClick={onClose}
            className="mx-4 mt-2 px-4 py-3 text-sm font-medium text-center rounded-full bg-[hsl(199,89%,48%)] hover:bg-[hsl(199,89%,43%)] text-white transition-colors"
          >
            Đăng nhập
          </Link>
        )}
      </nav>
    </div>
  );
}
