import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { jobs } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db
    .select()
    .from(jobs)
    .where(eq(jobs.active, true))
    .orderBy(desc(jobs.createdAt));
  return NextResponse.json(rows);
}
