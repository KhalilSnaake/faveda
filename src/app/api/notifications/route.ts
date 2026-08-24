import { NextResponse } from "next/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const rows = await db
    .select()
    .from(notifications)
    .where(eq(notifications.audience, "admin"))
    .orderBy(desc(notifications.createdAt))
    .limit(50);
  const unread = rows.filter((row) => !row.read).length;
  return NextResponse.json({ notifications: rows, unread });
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as { id?: number };
  if (body.id) {
    await db
      .update(notifications)
      .set({ read: true })
      .where(and(eq(notifications.id, body.id), eq(notifications.audience, "admin")));
  } else {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.audience, "admin"));
  }
  return NextResponse.json({ ok: true });
}
