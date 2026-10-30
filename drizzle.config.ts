import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("SUPABASE_DATABASE_URL or DATABASE_URL is required for Drizzle Kit");
}

const url = new URL(databaseUrl);
const isSupabase =
  url.hostname.endsWith(".supabase.co") ||
  url.hostname.endsWith(".pooler.supabase.com") ||
  Boolean(process.env.SUPABASE_DATABASE_URL);

if (isSupabase && process.env.SUPABASE_SSL_REJECT_UNAUTHORIZED === "true") {
  url.searchParams.set("sslmode", "verify-full");
  url.searchParams.delete("uselibpqcompat");
} else if (isSupabase) {
  url.searchParams.set("sslmode", "require");
  url.searchParams.set("uselibpqcompat", "true");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: url.toString() },
  verbose: true,
  strict: true,
});
