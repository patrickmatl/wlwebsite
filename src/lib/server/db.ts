import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client using the SERVICE ROLE key.
 *
 * This bypasses RLS, so it must never be imported into a client component.
 * The quote tables have RLS on with zero policies precisely so that the
 * public anon key (which ships in the browser bundle) can't touch them.
 */

let cached: SupabaseClient | null = null;

export function db(): SupabaseClient {
  if (cached) return cached;

  // SUPABASE_URL (no NEXT_PUBLIC_ prefix) so the project URL never ships in the
  // browser bundle — nothing client-side talks to Supabase any more. The
  // NEXT_PUBLIC_ name is still accepted as a fallback for older deployments.
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

/** True when the quote system has everything it needs to run. */
export function quoteSystemConfigured(): boolean {
  return Boolean(
    (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.GEMINI_API_KEY,
  );
}
