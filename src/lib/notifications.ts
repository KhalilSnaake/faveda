import { db } from "@/db";
import { notifications, type Order } from "@/db/schema";
import { statusLabel } from "@/lib/catalog";
import { formatCfa } from "@/lib/format";

type CreateNotificationInput = {
  audience: "admin" | "customer";
  type: string;
  title: string;
  body: string;
  orderId?: number | null;
  trackingCode?: string | null;
};

export async function createNotification(input: CreateNotificationInput) {
  try {
    await db.insert(notifications).values({
      audience: input.audience,
      type: input.type,
      title: input.title,
      body: input.body,
      orderId: input.orderId ?? null,
      trackingCode: input.trackingCode ?? null,
    });
  } catch {
    // Notifications should never break the main flow
  }
}

export async function notifyNewOrder(order: Order) {
  await createNotification({
    audience: "admin",
    type: "new_order",
    title: "Nouvelle commande",
    body: `${order.customerName} · ${order.city} · ${formatCfa(order.total)} (${order.trackingCode})`,
    orderId: order.id,
    trackingCode: order.trackingCode,
  });
  await createNotification({
    audience: "customer",
    type: "order_received",
    title: "Commande reçue 🌿",
    body: `Merci ${order.customerName} ! Votre commande ${order.trackingCode} a bien été enregistrée. Total : ${formatCfa(order.total)}.`,
    orderId: order.id,
    trackingCode: order.trackingCode,
  });
}

const statusMessages: Record<string, string> = {
  confirmed: "Votre commande a été confirmée par Faveda et sera bientôt préparée.",
  assigned: "Un livreur a été assigné à votre commande.",
  in_transit: "Votre commande est en route ! Gardez votre code secret à portée de main.",
  delivered: "Votre commande a été livrée. Merci de votre confiance 🌿",
  cancelled: "Votre commande a été annulée. Contactez-nous pour toute question.",
};

export async function notifyStatusChange(order: Order, nextStatus: string) {
  const message = statusMessages[nextStatus];
  if (!message) return;
  await createNotification({
    audience: "customer",
    type: `status_${nextStatus}`,
    title: `Commande ${statusLabel(nextStatus)}`,
    body: `${order.trackingCode} — ${message}`,
    orderId: order.id,
    trackingCode: order.trackingCode,
  });
}

export async function notifyDelivered(order: Order) {
  await createNotification({
    audience: "admin",
    type: "delivered",
    title: "Commande livrée ✅",
    body: `${order.trackingCode} · ${order.customerName} a confirmé la réception.`,
    orderId: order.id,
    trackingCode: order.trackingCode,
  });
  await createNotification({
    audience: "customer",
    type: "status_delivered",
    title: "Commande livrée ✅",
    body: `${order.trackingCode} — Merci ${order.customerName} ! Votre commande a bien été livrée. À bientôt sur Faveda 🌿`,
    orderId: order.id,
    trackingCode: order.trackingCode,
  });
}

export async function notifyNewMessage(input: {
  kind: string;
  name: string;
  content: string;
  rating?: number | null;
}) {
  const titles: Record<string, string> = {
    contact: "Nouveau message",
    review: "Nouvel avis client",
    newsletter: "Nouvelle inscription newsletter",
  };
  await createNotification({
    audience: "admin",
    type: `message_${input.kind}`,
    title: titles[input.kind] ?? "Nouveau message",
    body:
      input.kind === "review" && input.rating
        ? `${input.name} · ${input.rating}/5 — ${input.content.slice(0, 100)}`
        : `${input.name} — ${input.content.slice(0, 120)}`,
  });
}
