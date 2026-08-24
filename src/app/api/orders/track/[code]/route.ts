import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { drivers, orderItems, orders } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const trackingCode = decodeURIComponent(code).trim().toUpperCase();
  const [order] = await db.select().from(orders).where(eq(orders.trackingCode, trackingCode)).limit(1);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
  const [driver] = order.driverId
    ? await db.select().from(drivers).where(eq(drivers.id, order.driverId)).limit(1)
    : [null];

  return NextResponse.json({
    trackingCode: order.trackingCode,
    confirmationCode: order.confirmationCode,
    status: order.status,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    address: order.address,
    city: order.city,
    landmark: order.landmark,
    latitude: order.latitude,
    longitude: order.longitude,
    paymentMethod: order.paymentMethod,
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    discount: order.discount,
    promoCode: order.promoCode,
    total: order.total,
    createdAt: order.createdAt,
    deliveredAt: order.deliveredAt,
    items,
    driver: driver
      ? {
          name: driver.name,
          phone: driver.phone,
          vehicle: driver.vehicle,
        }
      : null,
  });
}
