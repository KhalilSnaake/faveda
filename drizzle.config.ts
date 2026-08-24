import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

if (!url) {
  throw new Error("SUPABASE_DATABASE_URL or DATABASE_URL is required for Drizzle Kit");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url },
  verbose: true,
  strict: true,
});
