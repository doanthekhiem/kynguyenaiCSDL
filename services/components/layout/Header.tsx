// Header Component - KynguyenAI v3.0
// Responsive navigation with auth integration

"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

const navLinks = [
  { href: "/category/ai-news", label: "Tin tức AI" },
  { href: "/category/ai-tools", label: "Công cụ AI" },
  { href: "/category/ai-tutorial", label: "Hướng dẫn" },
  { href: "/tools", label: "AI Tools Directory" },
];

// localStorage cache theo rule 7.5 - Cache Storage API Calls
const THEME_VERSION = "v1";
const THEME_KEY = `theme:${THEME_VERSION}`;
const storageCache = new Map<string, string | null>();

function getThemeFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  
  if (!storageCache.has(THEME_KEY)) {
    try {
      storageCache.set(THEME_KEY, localStorage.getItem(THEME_KEY));
    } catch {
      storageCache.set(THEME_KEY, null);
    }
  }
  return storageCache.get(THEME_KEY) ?? null;
}

function setThemeToStorage(theme: string) {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(THEME_KEY, theme);
    storageCache.set(THEME_KEY, theme);
  } catch {
    // localStorage disabled or quota exceeded
  }
}

// Invalidate cache when storage changes in another tab
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === THEME_KEY) {
      storageCache.delete(THEME_KEY);
    }
  });
}

// Rule 6.3 - Hoist static JSX elements to avoid re-creation
function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Rule 5.6 - Lazy state initialization to avoid calling in effect
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const savedTheme = getThemeFromStorage();
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [mounted, setMounted] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    // Rule 4.2 - Use passive listeners for scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rule 5.3 - Narrow dependencies: only isDark matters, mounted is just a guard
  useEffect(() => {
    if (!mounted) return;
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", isDark);
    setThemeToStorage(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const getUserInitial = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    return user?.email?.split("@")[0] || "User";
  };

  return (
    <>
      {/* Prevent theme flicker - Rule 6.5 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme:v1') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            })();
          `,
        }}
      />
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-dark shadow-lg border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold gradient-text">KynguyenAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.label}
                <span className="absolute inset-x-2 bottom-0 h-0.5 bg-gradient-to-r from-[hsl(199,89%,48%)] to-[hsl(270,70%,60%)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
              aria-label="Toggle dark mode"
            >
              {!mounted || isDark ? (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {/* Auth Section */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-surface-hover animate-pulse" />
            ) : user ? (
              /* User Menu */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-hover transition-colors"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover border-2 border-[hsl(199,89%,48%)]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-medium">
                      {getUserInitial()}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl glass-surface border border-surface-border shadow-xl animate-scale-in origin-top-right">
                    <div className="p-3 border-b border-surface-border">
                      <p className="font-medium text-sm truncate">{getUserName()}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-surface-hover transition-colors"
                      >
                        <UserIcon className="w-4 h-4" />
                        Tài khoản
                      </Link>
                      <Link
                        href="/bookmarks"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-surface-hover transition-colors"
                      >
                        <BookmarkIcon className="w-4 h-4" />
                        Đã lưu
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                      >
                        <LogoutIcon className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button */
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-full gradient-hero text-white hover:opacity-90 transition-opacity hover-lift"
              >
                Đăng nhập
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-surface-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mx-4 mt-2 px-4 py-3 text-sm font-medium text-center rounded-full gradient-hero text-white"
                >
                  Đăng nhập
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  );
}
