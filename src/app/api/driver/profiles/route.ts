import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { drivers } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = await db.select().from(drivers).orderBy(asc(drivers.name));
  return NextResponse.json(
    rows.map(({ passwordHash, username, ...driver }) => driver),
    { headers: { "Cache-Control": "no-store" } },
  );
}
