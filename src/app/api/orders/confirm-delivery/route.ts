import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { drivers, orders } from "@/db/schema";
import { notifyDelivered } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { trackingCode?: string; confirmationCode?: string };
  const trackingCode = body.trackingCode?.trim().toUpperCase() ?? "";
  const confirmationCode = body.confirmationCode?.trim() ?? "";

  if (!trackingCode || !/^\d{4}$/.test(confirmationCode)) {
    return NextResponse.json({ error: "Code de suivi ou code secret invalide" }, { status: 400 });
  }

  const [order] = await db.select().from(orders).where(eq(orders.trackingCode, trackingCode)).limit(1);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }
  if (order.status === "delivered") {
    return NextResponse.json({ error: "Cette commande est déjà livrée" }, { status: 400 });
  }
  if (order.status === "cancelled") {
    return NextResponse.json({ error: "Cette commande a été annulée" }, { status: 400 });
  }
  if (order.confirmationCode !== confirmationCode) {
    return NextResponse.json({ error: "Le code secret ne correspond pas" }, { status: 400 });
  }

  const [updated] = await db
    .update(orders)
    .set({
      status: "delivered",
      deliveredAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(orders.id, order.id))
    .returning();

  if (order.driverId) {
    await db.update(drivers).set({ status: "available" }).where(eq(drivers.id, order.driverId));
  }

  await notifyDelivered(updated);

  return NextResponse.json({
    ok: true,
    trackingCode: updated.trackingCode,
    status: updated.status,
    deliveredAt: updated.deliveredAt,
  });
}
