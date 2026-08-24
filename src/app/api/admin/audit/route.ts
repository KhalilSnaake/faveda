import { and, desc, eq, ilike } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { adminAuditLogs, adminUsers } from "@/db/schema";
import { getAuthenticatedAdmin } from "@/lib/admin";
import { type SQL } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const actor = await getAuthenticatedAdmin();
  if (!actor) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const adminId = searchParams.get("adminId");
  const action = searchParams.get("action")?.trim() ?? "";
  const limit = Math.min(Number(searchParams.get("limit") ?? 100), 300);

  const conditions: SQL[] = [];
  if (q) conditions.push(ilike(adminAuditLogs.description, `%${q}%`));
  if (adminId) conditions.push(eq(adminAuditLogs.actorAdminId, Number(adminId)));
  if (action) conditions.push(eq(adminAuditLogs.action, action));

  const logs = await db
    .select()
    .from(adminAuditLogs)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(adminAuditLogs.createdAt))
    .limit(limit);
  const users = await db.select().from(adminUsers);

  return NextResponse.json({
    actions: Array.from(new Set(logs.map((log) => log.action))),
    logs: logs.map((log) => {
      const user = users.find((u) => u.id === log.actorAdminId);
      return {
        ...log,
        actor: user
          ? { id: user.id, name: user.name, username: user.username }
          : null,
      };
    }),
  });
}
