"use client";

import { useMemo } from "react";
import { formatCfa } from "@/lib/format";

type Order = {
  id: number;
  status: string;
  total: number;
  createdAt: string;
  items: { productName: string; unitPrice: number; quantity: number }[];
};

export function AdminStats({ orders }: { orders: Order[] }) {
  const stats = useMemo(() => {
    const delivered = orders.filter((order) => order.status === "delivered");
    const cancelled = orders.filter((order) => order.status === "cancelled");

    const dayMap = new Map<string, number>();
    orders.forEach((order) => {
      const day = new Date(order.createdAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      });
      dayMap.set(day, (dayMap.get(day) || 0) + 1);
    });
    const last7 = Array.from(dayMap.entries()).slice(-7);
    const maxDay = Math.max(...last7.map(([, count]) => count), 1);

    const productMap = new Map<string, { revenue: number; qty: number }>();
    orders
      .filter((order) => order.status !== "cancelled")
      .forEach((order) => {
        order.items.forEach((item) => {
          const prev = productMap.get(item.productName) || { revenue: 0, qty: 0 };
          productMap.set(item.productName, {
            revenue: prev.revenue + item.unitPrice * item.quantity,
            qty: prev.qty + item.quantity,
          });
        });
      });
    const topProducts = Array.from(productMap.entries())
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 6);

    const totalRevenue = orders
      .filter((order) => order.status !== "cancelled")
      .reduce((sum, order) => sum + order.total, 0);

    const avgBasket = orders.length > 0 ? Math.round(totalRevenue / Math.max(1, orders.length - cancelled.length)) : 0;

    return {
      delivered: delivered.length,
      cancelled: cancelled.length,
      deliveryRate: orders.length > 0 ? Math.round((delivered.length / orders.length) * 100) : 0,
      totalRevenue,
      avgBasket,
      last7,
      maxDay,
      topProducts,
    };
  }, [orders]);

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <section className="rounded-[28px] bg-paper p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Performance</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-2xl bg-cream p-4">
            <p className="font-display text-3xl text-leaf-dark">{stats.deliveryRate}%</p>
            <p className="text-xs text-muted">Taux livraison</p>
          </div>
          <div className="rounded-2xl bg-cream p-4">
            <p className="font-display text-3xl text-leaf-dark">{formatCfa(stats.avgBasket)}</p>
            <p className="text-xs text-muted">Panier moyen</p>
          </div>
          <div className="rounded-2xl bg-cream p-4">
            <p className="font-display text-3xl text-leaf">{stats.delivered}</p>
            <p className="text-xs text-muted">Livrées</p>
          </div>
          <div className="rounded-2xl bg-cream p-4">
            <p className="font-display text-3xl text-muted">{stats.cancelled}</p>
            <p className="text-xs text-muted">Annulées</p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] bg-paper p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Commandes / jour</p>
        <div className="mt-4 flex items-end gap-2" style={{ height: 120 }}>
          {stats.last7.map(([day, count]) => (
            <div key={day} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg bg-leaf transition"
                style={{ height: `${(count / stats.maxDay) * 100}%`, minHeight: 4 }}
              />
              <span className="text-[10px] text-muted">{day}</span>
            </div>
          ))}
          {stats.last7.length === 0 && <p className="mx-auto text-sm text-muted">Pas encore de données</p>}
        </div>
      </section>

      <section className="rounded-[28px] bg-paper p-6 md:col-span-2">
        <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Top produits</p>
        <div className="mt-4 space-y-2">
          {stats.topProducts.map(([name, data]) => {
            const pct = stats.totalRevenue > 0 ? Math.round((data.revenue / stats.totalRevenue) * 100) : 0;
            return (
              <div key={name} className="flex items-center gap-3">
                <span className="min-w-0 flex-1 truncate text-sm text-leaf-dark">{name}</span>
                <span className="text-xs text-muted">{data.qty} vendus</span>
                <div className="h-2 w-24 overflow-hidden rounded-full bg-cream">
                  <div className="h-full rounded-full bg-leaf transition" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-24 text-right text-sm text-leaf">{formatCfa(data.revenue)}</span>
              </div>
            );
          })}
          {stats.topProducts.length === 0 && <p className="text-sm text-muted">Aucune vente enregistrée.</p>}
        </div>
      </section>
    </div>
  );
}
