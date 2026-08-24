import { NextResponse } from "next/server";
import { desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { drivers, orderItems, orders, products, type Product } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { isAdminAuthenticated } from "@/lib/auth";
import { applyPromo } from "@/lib/catalog";
import { generateConfirmationCode, generateTrackingCode } from "@/lib/format";
import { notifyNewOrder } from "@/lib/notifications";

export const dynamic = "force-dynamic";

type IncomingItem = {
  productId: number;
  quantity: number;
};

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  await ensureSeeded();
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt));
  const items = rows.length
    ? await db
        .select()
        .from(orderItems)
        .where(
          inArray(
            orderItems.orderId,
            rows.map((row) => row.id),
          ),
        )
    : [];
  const driverRows = await db.select().from(drivers);

  return NextResponse.json(
    rows.map((order) => ({
      ...order,
      items: items.filter((item) => item.orderId === order.id),
      driver: driverRows.find((driver) => driver.id === order.driverId) ?? null,
    })),
  );
}

export async function POST(request: Request) {
  await ensureSeeded();
  const body = (await request.json()) as {
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
    address?: string;
    city?: string;
    landmark?: string;
    notes?: string;
    latitude?: number | null;
    longitude?: number | null;
    paymentMethod?: string;
    paymentPhone?: string;
    promoCode?: string;
    items?: IncomingItem[];
  };

  const customerName = body.customerName?.trim() ?? "";
  const customerPhone = body.customerPhone?.trim() ?? "";
  const address = body.address?.trim() ?? "";
  const city = body.city?.trim() ?? "";
  const paymentMethod = body.paymentMethod?.trim() ?? "";
  const incomingItems = Array.isArray(body.items) ? body.items : [];

  if (!customerName || !customerPhone || !address || !city || !paymentMethod) {
    return NextResponse.json({ error: "Informations incomplètes" }, { status: 400 });
  }
  if (incomingItems.length === 0) {
    return NextResponse.json({ error: "Le panier est vide" }, { status: 400 });
  }

  const productIds = incomingItems.map((item) => item.productId);
  const catalog = await db.select().from(products).where(inArray(products.id, productIds));
  if (catalog.length !== productIds.length) {
    return NextResponse.json({ error: "Un produit est introuvable" }, { status: 400 });
  }

  const prepared: { product: Product; quantity: number }[] = [];
  for (const item of incomingItems) {
    const product = catalog.find((entry) => entry.id === item.productId);
    if (!product) {
      return NextResponse.json({ error: "Un produit est introuvable" }, { status: 400 });
    }
    const quantity = Math.max(1, Math.min(20, Number(item.quantity) || 1));
    if (quantity > product.stock) {
      return NextResponse.json({ error: `Stock insuffisant pour ${product.name}` }, { status: 400 });
    }
    prepared.push({ product, quantity });
  }

  const subtotal = prepared.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const quote = applyPromo(subtotal, body.promoCode);
  if (!quote.ok) {
    return NextResponse.json({ error: quote.error }, { status: 400 });
  }
  const deliveryFee = quote.deliveryFee;
  const total = quote.total;

  let trackingCode = generateTrackingCode();
  let confirmationCode = generateConfirmationCode();

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const existing = await db.select().from(orders).where(eq(orders.trackingCode, trackingCode)).limit(1);
    if (existing.length === 0) break;
    trackingCode = generateTrackingCode();
  }

  const [order] = await db
    .insert(orders)
    .values({
      trackingCode,
      confirmationCode,
      customerName,
      customerPhone,
      customerEmail: body.customerEmail?.trim() || null,
      address,
      city,
      landmark: body.landmark?.trim() || null,
      notes: body.notes?.trim() || null,
      latitude: typeof body.latitude === "number" ? body.latitude : null,
      longitude: typeof body.longitude === "number" ? body.longitude : null,
      paymentMethod,
      paymentPhone: body.paymentPhone?.trim() || null,
      status: "pending",
      subtotal,
      deliveryFee,
      discount: quote.discount,
      promoCode: quote.code || null,
      total,
    })
    .returning();

  await db.insert(orderItems).values(
    prepared.map((item) => ({
      orderId: order.id,
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.image,
      unitPrice: item.product.price,
      quantity: item.quantity,
    })),
  );

  for (const item of prepared) {
    await db
      .update(products)
      .set({ stock: Math.max(0, item.product.stock - item.quantity) })
      .where(eq(products.id, item.product.id));
  }

  await notifyNewOrder(order);

  return NextResponse.json({
    id: order.id,
    trackingCode: order.trackingCode,
    confirmationCode: order.confirmationCode,
    total: order.total,
    status: order.status,
  });
}
