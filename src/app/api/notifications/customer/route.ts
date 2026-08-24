import { NextResponse } from "next/server";
import { and, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { notifications } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codesParam = searchParams.get("codes") ?? "";
  const codes = codesParam
    .split(",")
    .map((code) => code.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 30);

  if (codes.length === 0) {
    return NextResponse.json({ notifications: [] });
  }

  const rows = await db
    .select()
    .from(notifications)
    .where(
      and(
        eq(notifications.audience, "customer"),
        inArray(notifications.trackingCode, codes),
      ),
    )
    .orderBy(desc(notifications.createdAt))
    .limit(60);

  return NextResponse.json({ notifications: rows });
}
