"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCfa, formatDate } from "@/lib/format";
import { readOrders, type SavedOrder } from "@/lib/local";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<SavedOrder[]>([]);

  useEffect(() => {
    setOrders(readOrders());
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Espace client</p>
      <h1 className="mt-2 font-display text-5xl text-leaf-dark">Mes commandes</h1>
      <p className="mt-3 text-muted">
        Les commandes passées sur cet appareil sont mémorisées ici, avec leur code de suivi.
      </p>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-[28px] bg-paper p-8 text-center">
          <p className="font-display text-3xl text-leaf-dark">Aucune commande enregistrée</p>
          <Link href="/produits" className="mt-5 inline-flex rounded-full bg-leaf px-5 py-3 text-sm text-cream">
            Découvrir la boutique
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {orders.map((order) => (
            <Link
              key={order.trackingCode}
              href={`/suivi/${order.trackingCode}`}
              className="block rounded-[24px] bg-paper p-5 transition hover:bg-leaf-mist"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-leaf-dark">{order.trackingCode}</p>
                <p className="text-sm text-leaf">{formatCfa(order.total)}</p>
              </div>
              <p className="mt-1 text-sm text-muted">
                Secret {order.confirmationCode} · {formatDate(order.createdAt)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
