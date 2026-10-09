import 'server-only';
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';
import { getSupabaseEnv } from './config';

/**
 * Supabase client bound to the current request's session cookie. Safe to use
 * in Server Components, Server Actions and Route Handlers.
 *
 * Returns `null` (never throws) when the project is not configured, so the
 * pages that use it can fall back to honest "not open yet" states.
 */
export async function createServerClient() {
  const { url, anonKey } = getSupabaseEnv();
  if (!url || !anonKey) return null;

  const cookieStore = await cookies();

  return createSupabaseServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component where setting cookies is not
          // allowed. When this scaffold grows sign-in pages, add the standard
          // `proxy.ts` session-refresh step described in SETUP.md instead.
        }
      },
    },
  });
}

/**
 * Service-role client for moderation tasks (hiding rule-breaking content) and
 * the occasional admin endpoint. Never expose this client or its key to the
 * browser; its requests bypass Row Level Security entirely.
 */
export async function createServiceRoleClient() {
  const { url, serviceRoleKey } = getSupabaseEnv();
  if (!url || !serviceRoleKey) return null;

  return createSupabaseJsClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}