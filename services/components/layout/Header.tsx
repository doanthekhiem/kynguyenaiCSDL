// Header Component - KynguyenAI v3.0
// Responsive navigation with auth integration
// Rule 2.4 - Dynamic imports for heavy components
// Rule 6.3 - Use hoisted icons

"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from "@/components/icons/Icons";

// Rule 2.4 - Lazy load mobile menu and user menu (ssr: false)
const MobileMenu = dynamic(() => import("./MobileMenu").then((m) => ({ default: m.MobileMenu })), {
  ssr: false,
});

const UserMenu = dynamic(() => import("./UserMenu").then((m) => ({ default: m.UserMenu })), {
  ssr: false,
});

// Rule 2.5 - Preload on user intent
function preloadMobileMenu() {
  if (typeof window !== "undefined") {
    void import("./MobileMenu");
  }
}

function preloadUserMenu() {
  if (typeof window !== "undefined") {
    void import("./UserMenu");
  }
}

const navLinks = [
  { href: "/newsletter", label: "Tin tức AI" },
  { href: "/tools", label: "Công cụ AI" },
  { href: "/skills", label: "AI Skills" },
  { href: "/github", label: "GitHub Trending" },
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
          isScrolled ? "glass-dark backdrop-blur-2xl shadow-lg border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[hsl(199,89%,48%)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold text-[hsl(199,89%,48%)]">KynguyenAI</span>
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
                <span className="absolute inset-x-2 bottom-0 h-0.5 bg-[hsl(199,89%,48%)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
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
                  onMouseEnter={preloadUserMenu}
                  onFocus={preloadUserMenu}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-hover transition-colors"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover border-2 border-[hsl(199,89%,48%)]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[hsl(199,89%,48%)] flex items-center justify-center text-white text-sm font-medium">
                      {getUserInitial()}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu - Lazy loaded */}
                {isUserMenuOpen && (
                  <UserMenu
                    user={user}
                    onClose={() => setIsUserMenuOpen(false)}
                    onSignOut={handleSignOut}
                  />
                )}
              </div>
            ) : (
              /* Login Button */
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-[hsl(199,89%,48%)] text-white hover:bg-[hsl(199,89%,43%)] transition-colors hover-lift"
              >
                Đăng nhập
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onMouseEnter={preloadMobileMenu}
              onFocus={preloadMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Lazy loaded */}
        {isMobileMenuOpen && (
          <MobileMenu
            navLinks={navLinks}
            user={user}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
    </>
  );
}
