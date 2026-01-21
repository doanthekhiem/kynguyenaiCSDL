// Supabase Client - Browser/Client-side
// KynguyenAI v3.0

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Client-side Supabase client using SSR package for cookie-based sessions
// This ensures sessions are stored in cookies and accessible by route handlers
export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
