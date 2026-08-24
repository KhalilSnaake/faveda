import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { drivers } from "@/db/schema";
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
  if (!roleCan(actor.role, "reset_passwords")) {
    return NextResponse.json({ error: "Réservé aux propriétaires" }, { status: 403 });
  }

  const { id } = await params;
  const driverId = Number(id);
  const body = (await request.json()) as { password?: string };
  const password = (body.password ?? "").trim();

  if (password.length < 6) {
    return NextResponse.json({ error: "Mot de passe requis (6 caractères min.)" }, { status: 400 });
  }

  const [driver] = await db.select().from(drivers).where(eq(drivers.id, driverId)).limit(1);
  if (!driver) {
    return NextResponse.json({ error: "Livreur introuvable" }, { status: 404 });
  }

  await db.update(drivers).set({ passwordHash: hashPassword(password) }).where(eq(drivers.id, driverId));

  await logAdminAction({
    actorAdminId: actor.id,
    action: "reset_driver_password",
    entityType: "driver",
    entityId: String(driver.id),
    description: `${actor.name} a réinitialisé le mot de passe du livreur ${driver.name}`,
  });

  return NextResponse.json({ ok: true });
}
