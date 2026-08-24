import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { drivers } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { getAuthenticatedAdmin, logAdminAction } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const actor = await getAuthenticatedAdmin();
  if (!actor) return NextResponse.json({ error: "Indisponible" }, { status: 500 });
  await ensureSeeded();
  const rows = await db.select().from(drivers).orderBy(desc(drivers.createdAt));
  return NextResponse.json(rows.map(({ passwordHash, username, ...driver }) => driver));
}

export async function POST(request: Request) {
  const actor = await getAuthenticatedAdmin();
  if (!actor) return NextResponse.json({ error: "Indisponible" }, { status: 500 });

  const body = (await request.json()) as { name?: string; phone?: string; vehicle?: string; zone?: string };
  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const vehicle = body.vehicle?.trim() || "Moto";
  const zone = body.zone?.trim() || "Ville";

  if (!name || !phone) {
    return NextResponse.json({ error: "Nom et téléphone requis" }, { status: 400 });
  }

  const [driver] = await db
    .insert(drivers)
    .values({ name, phone, vehicle, zone, status: "available", username: "", passwordHash: "" })
    .returning();

  await logAdminAction({
    actorAdminId: actor.id,
    action: "create_driver",
    entityType: "driver",
    entityId: String(driver.id),
    description: `${actor.name} a ajouté le livreur ${driver.name}`,
    meta: { zone: driver.zone },
  });

  const { passwordHash, username, ...safe } = driver;
  return NextResponse.json(safe);
}
