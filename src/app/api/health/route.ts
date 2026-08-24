import { db, isUsingSupabase } from "@/db";
import { isSupabaseConfigured } from "@/lib/supabase";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return Response.json({
      ok: true,
      database: isUsingSupabase ? "supabase-postgres" : "postgresql",
      supabasePlatformConfigured: isSupabaseConfigured(),
    });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
