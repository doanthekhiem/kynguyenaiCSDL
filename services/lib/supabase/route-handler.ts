// Supabase Route Handler Client - For API routes with cookie authentication
// KynguyenAI v3.0

import { createServerClient as createCookieClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create Supabase client for API routes with cookie-based authentication
// This client reads and writes cookies for session management
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createRouteHandlerClient(): Promise<SupabaseClient<any, any, any>> {
  const cookieStore = await cookies();

  return createCookieClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
}
