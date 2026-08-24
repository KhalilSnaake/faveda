import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { getAuthenticatedAdmin, logAdminAction } from "@/lib/admin";
import { hashPassword } from "@/lib/auth";
import { roleCan } from "@/lib/roles";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const actor = await getAuthenticatedAdmin();
  if (!actor) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  if (!roleCan(actor.role, "manage_users")) {
    return NextResponse.json({ error: "Réservé aux propriétaires" }, { status: 403 });
  }

  const { id } = await params;
  const userId = Number(id);
  const body = (await request.json()) as {
    password?: string;
    forceChange?: boolean;
    active?: boolean;
    role?: string;
  };

  const [current] = await db.select().from(adminUsers).where(eq(adminUsers.id, userId)).limit(1);
  if (!current) {
    return NextResponse.json({ error: "Admin introuvable" }, { status: 404 });
  }

  const password = (body.password ?? "").trim();
  const updates: Partial<typeof current> = {};
  if (typeof body.active === "boolean") updates.active = body.active;
  if (body.role && ["owner", "manager", "support"].includes(body.role)) updates.role = body.role;
  if (password) {
    if (password.length < 6) {
      return NextResponse.json({ error: "Mot de passe requis (6 caractères min.)" }, { status: 400 });
    }
    updates.passwordHash = hashPassword(password);
    updates.mustChangePassword = Boolean(body.forceChange);
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Aucune modification valide" }, { status: 400 });
  }

  const [updated] = await db.update(adminUsers).set(updates).where(eq(adminUsers.id, userId)).returning();

  await logAdminAction({
    actorAdminId: actor.id,
    action: "update_admin_user",
    entityType: "admin_user",
    entityId: String(updated.id),
    description: `${actor.name} a mis à jour le compte admin ${updated.username}`,
    meta: {
      active: updated.active,
      role: updated.role,
      passwordChanged: Boolean(password),
      forcedChange: Boolean(password && body.forceChange),
    },
  });

  const { passwordHash, ...safe } = updated;
  return NextResponse.json(safe);
}
