"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { estimateDelivery, formatCfa, formatDate } from "@/lib/format";
import { paymentLabel, statusLabel } from "@/lib/catalog";
import { ShareOrder } from "@/components/ShareOrder";
import { TrackingSkeleton } from "@/components/Skeleton";

type TrackedOrder = {
  trackingCode: string;
  confirmationCode: string;
  status: string;
  customerName: string;
  address: string;
  city: string;
  landmark: string | null;
  latitude: number | null;
  longitude: number | null;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  promoCode?: string | null;
  total: number;
  createdAt: string;
  deliveredAt: string | null;
  items: { id: number; productName: string; productImage: string; unitPrice: number; quantity: number }[];
  driver: { name: string; phone: string; vehicle: string } | null;
};

const steps = [
  { id: "pending", label: "Reçue" },
  { id: "confirmed", label: "Confirmée" },
  { id: "assigned", label: "Affectée" },
  { id: "in_transit", label: "En route" },
  { id: "delivered", label: "Livrée" },
];

export default function TrackOrderPage() {
  const params = useParams<{ code: string }>();
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/orders/track/${params.code}`);
      if (!response.ok) {
        setMissing(true);
        return;
      }
      setOrder((await response.json()) as TrackedOrder);
    }
    void load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [params.code]);

  if (missing) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="font-display text-4xl text-leaf-dark">Commande introuvable</h1>
        <p className="mt-3 text-muted">Vérifiez le code de suivi puis réessayez.</p>
        <Link href="/suivi" className="mt-6 inline-flex rounded-full bg-leaf px-5 py-3 text-sm text-cream">
          Nouvelle recherche
        </Link>
      </main>
    );
  }

  if (!order) {
    return <TrackingSkeleton />;
  }

  const currentIndex = order.status === "cancelled" ? -1 : steps.findIndex((step) => step.id === order.status);

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">{order.trackingCode}</p>
      <h1 className="mt-2 font-display text-5xl text-leaf-dark">Suivi de commande</h1>
      <p className="mt-2 text-muted">
        {order.status === "cancelled" ? "Cette commande a été annulée." : `Statut actuel : ${statusLabel(order.status)}`}
      </p>

      <div className="mt-8 grid gap-3 md:grid-cols-5">
        {steps.map((step, index) => {
          const active = currentIndex >= index;
          return (
            <div key={step.id} className={`rounded-2xl px-3 py-4 text-center ${active ? "bg-leaf text-cream" : "bg-paper text-muted"}`}>
              <p className="text-[11px] uppercase tracking-[0.14em]">{step.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[28px] bg-paper p-6">
          <h2 className="font-display text-2xl text-leaf-dark">Articles</h2>
          <div className="mt-4 space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img src={item.productImage} alt="" className="h-14 w-14 rounded-2xl object-cover" />
                <div className="flex-1">
                  <p className="text-sm text-leaf-dark">{item.productName}</p>
                  <p className="text-xs text-muted">x{item.quantity}</p>
                </div>
                <p className="text-sm">{formatCfa(item.unitPrice * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1 border-t border-leaf/10 pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>Sous-total</span>
              <span>{formatCfa(order.subtotal)}</span>
            </div>
            {(order.discount ?? 0) > 0 && (
              <div className="flex justify-between text-leaf">
                <span>Remise {order.promoCode ? `(${order.promoCode})` : ""}</span>
                <span>-{formatCfa(order.discount ?? 0)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted">
              <span>Livraison</span>
              <span>{order.deliveryFee === 0 ? "Offerte" : formatCfa(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-leaf-dark">
              <span>Total</span>
              <span>{formatCfa(order.total)}</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-[28px] bg-leaf-dark p-6 text-cream">
            <p className="text-xs uppercase tracking-[0.16em] text-gold">Code secret</p>
            <p className="mt-2 font-display text-5xl tracking-[0.18em]">{order.confirmationCode}</p>
            <p className="mt-2 text-sm text-cream/70">Présentez ce code au livreur pour confirmer la remise.</p>
          </div>
          <div className="rounded-[28px] bg-paper p-6 text-sm">
            <p className="font-medium text-leaf-dark">{order.customerName}</p>
            <p className="mt-1 text-muted">{order.address}</p>
            <p className="text-muted">{order.city}</p>
            {order.landmark && <p className="text-muted">Repère : {order.landmark}</p>}
            <p className="mt-3 text-muted">Paiement : {paymentLabel(order.paymentMethod)}</p>
            <p className="text-muted">Créée le {formatDate(order.createdAt)}</p>
            {order.status !== "delivered" && order.status !== "cancelled" && (
              <p className="text-leaf">Livraison estimée : {estimateDelivery(order.createdAt)}</p>
            )}
            {order.deliveredAt && <p className="text-leaf">Livrée le {formatDate(order.deliveredAt)}</p>}
            {order.driver && (
              <p className="mt-3 text-leaf-dark">
                Livreur : {order.driver.name} · {order.driver.vehicle} · {order.driver.phone}
              </p>
            )}
          </div>
          <div className="rounded-[28px] bg-paper p-5">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-gold-deep">Partager ce suivi</p>
            <ShareOrder trackingCode={order.trackingCode} />
          </div>
          {order.latitude && order.longitude && (
            <iframe
              title="Position de livraison"
              className="h-48 w-full rounded-[28px] border-0"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${order.longitude - 0.01}%2C${order.latitude - 0.01}%2C${order.longitude + 0.01}%2C${order.latitude + 0.01}&layer=mapnik&marker=${order.latitude}%2C${order.longitude}`}
            />
          )}
        </section>
      </div>
    </main>
  );
}
