import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { drivers, orders } from "@/db/schema";
import { notifyDelivered, notifyStatusChange } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const orderId = Number(id);
  const body = (await request.json()) as { action?: string; confirmationCode?: string; driverId?: number };
  const driverId = Number(body.driverId);

  if (!Number.isInteger(driverId) || driverId <= 0) {
    return NextResponse.json({ error: "Profil livreur requis" }, { status: 400 });
  }

  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order || order.driverId !== driverId) {
    return NextResponse.json({ error: "Course introuvable pour ce livreur" }, { status: 404 });
  }

  if (body.action === "start") {
    if (order.status !== "assigned") {
      return NextResponse.json({ error: "Cette course ne peut pas être démarrée" }, { status: 400 });
    }
    const [updated] = await db
      .update(orders)
      .set({ status: "in_transit", updatedAt: new Date() })
      .where(eq(orders.id, orderId))
      .returning();
    await notifyStatusChange(updated, "in_transit");
    return NextResponse.json({ ok: true, status: updated.status });
  }

  if (body.action === "deliver") {
    const code = (body.confirmationCode ?? "").trim();
    if (!/^\d{4}$/.test(code)) {
      return NextResponse.json({ error: "Code secret invalide" }, { status: 400 });
    }
    if (order.status === "delivered") {
      return NextResponse.json({ error: "Course déjà livrée" }, { status: 400 });
    }
    if (order.confirmationCode !== code) {
      return NextResponse.json({ error: "Le code secret ne correspond pas" }, { status: 400 });
    }
    const [updated] = await db
      .update(orders)
      .set({ status: "delivered", deliveredAt: new Date(), updatedAt: new Date() })
      .where(eq(orders.id, orderId))
      .returning();
    await db.update(drivers).set({ status: "available" }).where(eq(drivers.id, driverId));
    await notifyDelivered(updated);
    return NextResponse.json({ ok: true, status: updated.status });
  }

  return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
}
