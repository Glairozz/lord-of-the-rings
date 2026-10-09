export interface SupabaseEnv {
  url: string | null;
  anonKey: string | null;
  serviceRoleKey: string | null;
}

/** Centralised reading of Supabase environment variables. */
export function getSupabaseEnv(): SupabaseEnv {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? null,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? null,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? null,
  };
}

/**
 * Whether the public-facing community features can work.
 * The anon key is safe to expose; the service role key never is.
 */
export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseEnv();
  return Boolean(url && anonKey);
}

/** Whether moderation tooling (service role) is available. */
export function hasServiceRole(): boolean {
  return Boolean(getSupabaseEnv().serviceRoleKey);
}