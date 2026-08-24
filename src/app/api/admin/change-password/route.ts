import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { getAuthenticatedAdmin, logAdminAction } from "@/lib/admin";
import { hashPassword, verifyPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const actor = await getAuthenticatedAdmin();
  if (!actor) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = (await request.json()) as { currentPassword?: string; newPassword?: string };
  const currentPassword = (body.currentPassword ?? "").trim();
  const newPassword = (body.newPassword ?? "").trim();

  if (!verifyPassword(currentPassword, actor.passwordHash)) {
    return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 400 });
  }
  if (newPassword.length < 6) {
    return NextResponse.json({ error: "Nouveau mot de passe requis (6 caractères min.)" }, { status: 400 });
  }

  await db
    .update(adminUsers)
    .set({ passwordHash: hashPassword(newPassword), mustChangePassword: false })
    .where(eq(adminUsers.id, actor.id));

  await logAdminAction({
    actorAdminId: actor.id,
    action: "change_password",
    entityType: "admin_user",
    entityId: String(actor.id),
    description: `${actor.name} a changé son mot de passe`,
  });

  return NextResponse.json({ ok: true });
}
