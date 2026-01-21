// Auth Provider - Client-side auth state management
// KynguyenAI v3.0
// Rule 5.5 - Use functional setState updates for stable callbacks
// Rule 4.4, 7.5 - Version and cache localStorage/auth data
// Rule 8.1 - Store values in refs to avoid recreation

"use client";

import { createContext, useContext, useEffect, useState, useMemo, useCallback, ReactNode, useRef } from "react";
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

// Rule 4.4 - Version localStorage for auth preferences
const AUTH_CACHE_VERSION = "v1";
const AUTH_CACHE_KEY = `auth:session:${AUTH_CACHE_VERSION}`;

// Rule 7.5 - Cache storage API calls
const authCache = new Map<string, any>();

function getCachedAuthData(key: string): any {
  if (typeof window === "undefined") return null;
  if (!authCache.has(key)) {
    try {
      const data = localStorage.getItem(key);
      authCache.set(key, data ? JSON.parse(data) : null);
    } catch {
      authCache.set(key, null);
    }
  }
  return authCache.get(key);
}

function setCachedAuthData(key: string, value: any) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    authCache.set(key, value);
  } catch {
    // localStorage may be disabled or full
  }
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithGithub: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Rule 8.1 - Store redirect URL in ref to avoid recreation
  const redirectOriginRef = useRef<string | null>(null);

  useEffect(() => {
    // Cache redirect origin once
    if (typeof window !== "undefined" && !redirectOriginRef.current) {
      redirectOriginRef.current = window.location.origin;
    }

    // Try to load cached session first (Rule 7.5)
    const cachedSession = getCachedAuthData(AUTH_CACHE_KEY);
    if (cachedSession && cachedSession.expiresAt > Date.now()) {
      setSession(cachedSession.session);
      setUser(cachedSession.session?.user ?? null);
    }

    // Get fresh session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Cache session with expiry (Rule 4.4)
      if (session) {
        setCachedAuthData(AUTH_CACHE_KEY, {
          session,
          expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
        });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Update cache (Rule 7.5)
      if (session) {
        setCachedAuthData(AUTH_CACHE_KEY, {
          session,
          expiresAt: Date.now() + 5 * 60 * 1000,
        });
      } else {
        authCache.delete(AUTH_CACHE_KEY);
        try {
          localStorage.removeItem(AUTH_CACHE_KEY);
        } catch {}
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Rule 5.5 - Use stable callbacks with useCallback
  // Use ref for redirectUrl to avoid recreation
  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${redirectOriginRef.current}/auth/callback`,
      },
    });
    return { error: error as Error | null };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${redirectOriginRef.current}/auth/callback`,
      },
    });
    return { error: error as Error | null };
  }, []);

  const signInWithGithub = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${redirectOriginRef.current}/auth/callback`,
      },
    });
    return { error: error as Error | null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    // Clear cache on sign out
    authCache.delete(AUTH_CACHE_KEY);
    try {
      localStorage.removeItem(AUTH_CACHE_KEY);
    } catch {}
  }, []);

  // Rule 5.3 - Include all dependencies in useMemo
  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signInWithGithub,
      signOut,
    }),
    [user, session, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithGithub, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
