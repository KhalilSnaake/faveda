import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { getAuthenticatedAdmin, logAdminAction } from "@/lib/admin";
import { hashPassword, normalizeUsername } from "@/lib/auth";
import { roleCan } from "@/lib/roles";
import { ensureSeeded } from "@/db/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  const actor = await getAuthenticatedAdmin();
  if (!actor) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  if (!roleCan(actor.role, "manage_users")) {
    return NextResponse.json({ error: "Réservé aux propriétaires" }, { status: 403 });
  }
  await ensureSeeded();
  const rows = await db.select().from(adminUsers).orderBy(desc(adminUsers.createdAt));
  return NextResponse.json(rows.map(({ passwordHash, ...user }) => user));
}

export async function POST(request: Request) {
  const actor = await getAuthenticatedAdmin();
  if (!actor) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  if (!roleCan(actor.role, "manage_users")) {
    return NextResponse.json({ error: "Réservé aux propriétaires" }, { status: 403 });
  }

  const body = (await request.json()) as {
    name?: string;
    username?: string;
    password?: string;
    role?: string;
  };

  const name = (body.name ?? "").trim();
  const username = normalizeUsername(body.username ?? "");
  const password = (body.password ?? "").trim();
  const role = ["owner", "manager", "support"].includes(body.role ?? "") ? body.role! : "manager";

  if (!name || !username || password.length < 6) {
    return NextResponse.json({ error: "Nom, identifiant et mot de passe (6 min.) requis" }, { status: 400 });
  }

  const existing = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).limit(1);
  if (existing.length > 0) {
    return NextResponse.json({ error: "Cet identifiant admin existe déjà" }, { status: 400 });
  }

  const [user] = await db
    .insert(adminUsers)
    .values({
      name,
      username,
      passwordHash: hashPassword(password),
      role,
      active: true,
      mustChangePassword: true,
    })
    .returning();

  await logAdminAction({
    actorAdminId: actor.id,
    action: "create_admin_user",
    entityType: "admin_user",
    entityId: String(user.id),
    description: `${actor.name} a créé le compte admin ${user.username}`,
    meta: { role: user.role, mustChangePassword: true },
  });

  const { passwordHash, ...safe } = user;
  return NextResponse.json(safe);
}
