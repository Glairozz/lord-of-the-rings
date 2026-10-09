import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';
import { getSupabaseEnv } from './config';

/**
 * Browser Supabase client for interactive pieces of the Discussion Hall
 * (vote buttons, reply forms once the auth UI lands). Returns `null` when the
 * project has not been configured, so the rest of the site never crashes over
 * missing environment variables.
 *
 * Only import this from Client Components — never from Server Components or
 * Server Actions, which should use `@/lib/supabase/server`.
 */
export function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  if (!url || !anonKey) return null;
  return createBrowserClient<Database>(url, anonKey);
}