import { NextResponse } from "next/server";
import { desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const driverId = Number(searchParams.get("driverId"));
  if (!Number.isInteger(driverId) || driverId <= 0) {
    return NextResponse.json({ error: "Profil livreur requis" }, { status: 400 });
  }

  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.driverId, driverId))
    .orderBy(desc(orders.createdAt));

  const items = rows.length
    ? await db
        .select()
        .from(orderItems)
        .where(inArray(orderItems.orderId, rows.map((row) => row.id)))
    : [];

  return NextResponse.json(
    rows.map((order) => ({
      id: order.id,
      trackingCode: order.trackingCode,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      address: order.address,
      city: order.city,
      landmark: order.landmark,
      notes: order.notes,
      latitude: order.latitude,
      longitude: order.longitude,
      paymentMethod: order.paymentMethod,
      status: order.status,
      total: order.total,
      createdAt: order.createdAt,
      deliveredAt: order.deliveredAt,
      items: items.filter((item) => item.orderId === order.id),
    })),
    { headers: { "Cache-Control": "no-store" } },
  );
}
