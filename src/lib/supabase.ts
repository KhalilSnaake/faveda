import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 * Keep SUPABASE_SERVICE_ROLE_KEY private: never prefix it with NEXT_PUBLIC_.
 * Database reads/writes in Faveda remain handled by Drizzle in src/db/index.ts.
 */
let cachedAdminClient: SupabaseClient | null | undefined;

export function getSupabaseAdmin() {
  if (cachedAdminClient !== undefined) return cachedAdminClient;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    cachedAdminClient = null;
    return cachedAdminClient;
  }

  cachedAdminClient = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return cachedAdminClient;
}

export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_DATABASE_URL);
}
