import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema";

/**
 * Supabase is standard PostgreSQL. The application keeps using Drizzle while
 * switching transparently to Supabase whenever SUPABASE_DATABASE_URL is set.
 *
 * Recommended value: Supabase Shared Pooler / Session Pooler URL from the
 * Connect panel. Direct URLs also work for long-lived deployments and migrations.
 */
const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("SUPABASE_DATABASE_URL or DATABASE_URL is required");
}

const isSupabase =
  databaseUrl.includes("supabase.co") ||
  databaseUrl.includes("pooler.supabase.com") ||
  Boolean(process.env.SUPABASE_DATABASE_URL);

const poolMax = Number(process.env.DB_POOL_MAX || (isSupabase ? "5" : "10"));
const useSsl = isSupabase || process.env.DATABASE_SSL === "true";

const globalForDb = globalThis as typeof globalThis & {
  __favedaPostgresPool?: Pool;
};

export const pool =
  globalForDb.__favedaPostgresPool ??
  new Pool({
    connectionString: databaseUrl,
    max: Number.isFinite(poolMax) ? poolMax : 5,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 10_000,
    ssl: useSsl
      ? {
          // Supabase offers its root certificate in the Connect panel. Set this
          // env var to true only when a matching CA is configured in the host.
          rejectUnauthorized: process.env.SUPABASE_SSL_REJECT_UNAUTHORIZED === "true",
        }
      : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__favedaPostgresPool = pool;
}

export const db = drizzle(pool, { schema });
export const isUsingSupabase = isSupabase;
