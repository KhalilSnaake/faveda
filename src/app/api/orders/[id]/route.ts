import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { drivers, orderItems, orders } from "@/db/schema";
import { getAuthenticatedAdmin, logAdminAction } from "@/lib/admin";
import { notifyStatusChange } from "@/lib/notifications";
import { roleCan } from "@/lib/roles";

export const dynamic = "force-dynamic";

const allowedStatuses = ["pending", "confirmed", "assigned", "in_transit", "delivered", "cancelled"];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const actor = await getAuthenticatedAdmin();
  if (!actor) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const orderId = Number(id);
  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
  const [driver] = order.driverId
    ? await db.select().from(drivers).where(eq(drivers.id, order.driverId)).limit(1)
    : [null];

  return NextResponse.json({ ...order, items, driver: driver ?? null });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const actor = await getAuthenticatedAdmin();
  if (!actor) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  if (!roleCan(actor.role, "manage_orders")) {
    return NextResponse.json({ error: "Rôle en lecture seule : modification impossible" }, { status: 403 });
  }

  const { id } = await params;
  const orderId = Number(id);
  const body = (await request.json()) as {
    status?: string;
    driverId?: number | null;
    adminNotes?: string;
  };
  const [current] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!current) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  const nextStatus = body.status && allowedStatuses.includes(body.status) ? body.status : current.status;
  const driverId = body.driverId === undefined ? current.driverId : body.driverId;
  const deliveredAt = nextStatus === "delivered" ? new Date() : current.deliveredAt;

  const [updated] = await db
    .update(orders)
    .set({
      status: nextStatus,
      driverId,
      deliveredAt,
      adminNotes: body.adminNotes === undefined ? current.adminNotes : body.adminNotes,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId))
    .returning();

  if (driverId) {
    await db.update(drivers).set({ status: nextStatus === "delivered" ? "available" : "busy" }).where(eq(drivers.id, driverId));
  }

  if (nextStatus !== current.status) {
    await notifyStatusChange(updated, nextStatus);
  }

  await logAdminAction({
    actorAdminId: actor.id,
    action: "update_order",
    entityType: "order",
    entityId: String(updated.id),
    description: `${actor.name} a mis à jour la commande ${updated.trackingCode}`,
    meta: {
      previousStatus: current.status,
      nextStatus,
      previousDriverId: current.driverId,
      nextDriverId: driverId,
      notesChanged: body.adminNotes !== undefined,
    },
  });

  return NextResponse.json(updated);
}
