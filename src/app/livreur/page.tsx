"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  MapPin,
  Navigation,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import { formatCfa, formatDate } from "@/lib/format";
import { paymentLabel, statusLabel } from "@/lib/catalog";

type DriverInfo = {
  id: number;
  name: string;
  phone: string;
  vehicle: string;
  zone: string;
  status: string;
};

type DriverOrder = {
  id: number;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  landmark: string | null;
  notes: string | null;
  latitude: number | null;
  longitude: number | null;
  paymentMethod: string;
  status: string;
  total: number;
  createdAt: string;
  deliveredAt: string | null;
  items: { id: number; productName: string; productImage: string; unitPrice: number; quantity: number }[];
};

export default function DriverDashboardPage() {
  const [ready, setReady] = useState(false);
  const [drivers, setDrivers] = useState<DriverInfo[]>([]);
  const [driverId, setDriverId] = useState<number | null>(null);
  const [orders, setOrders] = useState<DriverOrder[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const driver = drivers.find((item) => item.id === driverId) ?? null;

  const loadOrders = useCallback(async (id: number) => {
    const res = await fetch(`/api/driver/orders?driverId=${id}`, { cache: "no-store" });
    if (res.ok) setOrders((await res.json()) as DriverOrder[]);
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/driver/profiles", { cache: "no-store" });
      if (res.ok) {
        const profiles = (await res.json()) as DriverInfo[];
        setDrivers(profiles);
        if (profiles[0]) {
          setDriverId(profiles[0].id);
          await loadOrders(profiles[0].id);
        }
      }
      setReady(true);
    })();
  }, [loadOrders]);

  useEffect(() => {
    if (!driverId) return;
    const interval = setInterval(() => void loadOrders(driverId), 20000);
    return () => clearInterval(interval);
  }, [driverId, loadOrders]);

  function selectDriver(id: number) {
    setDriverId(id);
    setSelectedId(null);
    setOrders([]);
    void loadOrders(id);
  }

  if (!ready) {
    return <main className="px-5 py-24 text-center text-muted">Chargement de l’espace livreur...</main>;
  }

  if (!driver) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20 text-center">
        <Users className="mx-auto text-leaf/40" size={38} />
        <h1 className="mt-4 font-display text-4xl text-leaf-dark">Aucun livreur disponible</h1>
        <p className="mt-2 text-muted">Ajoutez un livreur depuis le dashboard admin pour afficher ses tournées ici.</p>
      </main>
    );
  }

  const selected = orders.find((order) => order.id === selectedId) ?? null;
  const active = orders.filter((order) => ["assigned", "in_transit"].includes(order.status));
  const delivered = orders.filter((order) => order.status === "delivered");
  const todayDelivered = delivered.filter(
    (order) => order.deliveredAt && new Date(order.deliveredAt).toDateString() === new Date().toDateString(),
  );

  return (
    <main className="mx-auto max-w-5xl px-5 py-8 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Espace livreur · accès direct</p>
          <h1 className="font-display text-4xl text-leaf-dark">Tournées Faveda</h1>
          <p className="mt-1 text-sm text-muted">Sélectionnez le profil livreur pour consulter et gérer ses courses.</p>
        </div>
        <label className="min-w-56 text-sm">
          <span className="mb-1 block text-muted">Profil livreur</span>
          <select
            value={driver.id}
            onChange={(event) => selectDriver(Number(event.target.value))}
            className="h-11 w-full rounded-2xl border border-leaf/10 bg-paper px-3 text-leaf-dark"
          >
            {drivers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} · {item.vehicle}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="mt-6 flex flex-wrap items-center gap-3 rounded-[28px] bg-leaf-dark p-5 text-cream">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10"><Truck size={22} /></span>
        <div className="flex-1">
          <p className="font-display text-2xl">{driver.name}</p>
          <p className="text-sm text-cream/70">{driver.phone} · {driver.vehicle} · {driver.zone}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs ${driver.status === "available" ? "bg-white/10" : "bg-gold/25 text-gold"}`}>
          {driver.status === "available" ? "Disponible" : "En course"}
        </span>
      </section>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "À livrer", value: active.length, icon: Package },
          { label: "Livrées aujourd’hui", value: todayDelivered.length, icon: CheckCircle2 },
          { label: "Total livrées", value: delivered.length, icon: Truck },
        ].map((item) => (
          <div key={item.label} className="rounded-[22px] bg-paper p-4 text-center">
            <item.icon size={18} className="mx-auto text-leaf" />
            <p className="mt-2 font-display text-3xl text-leaf-dark">{item.value}</p>
            <p className="text-[11px] uppercase tracking-wide text-muted">{item.label}</p>
          </div>
        ))}
      </div>

      {selected ? (
        <DriverOrderDetail
          driverId={driver.id}
          order={selected}
          onBack={() => setSelectedId(null)}
          onRefresh={() => loadOrders(driver.id)}
        />
      ) : (
        <div className="mt-8 space-y-6">
          <section>
            <h2 className="font-display text-2xl text-leaf-dark">Courses actives ({active.length})</h2>
            {active.length === 0 ? (
              <p className="mt-3 rounded-[22px] bg-paper p-8 text-center text-sm text-muted">Aucune course active pour ce profil.</p>
            ) : (
              <div className="mt-3 space-y-3">
                {active.map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => setSelectedId(order.id)}
                    className="flex w-full items-center gap-3 rounded-[22px] bg-paper p-4 text-left transition hover:bg-leaf-mist/50"
                  >
                    <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${order.status === "in_transit" ? "bg-gold/20 text-gold-deep" : "bg-leaf-mist text-leaf-dark"}`}>
                      {order.status === "in_transit" ? <Truck size={18} /> : <Package size={18} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-leaf-dark">{order.customerName}</p>
                        <span className="text-xs text-muted">{statusLabel(order.status)}</span>
                      </div>
                      <p className="truncate text-sm text-muted">{order.address}, {order.city}</p>
                      <p className="text-xs text-muted">{order.trackingCode} · {formatCfa(order.total)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          {delivered.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-leaf-dark">Dernières livraisons</h2>
              <div className="mt-3 space-y-2">
                {delivered.slice(0, 8).map((order) => (
                  <div key={order.id} className="flex items-center gap-3 rounded-[18px] bg-paper/70 p-3">
                    <CheckCircle2 size={18} className="shrink-0 text-leaf" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-leaf-dark">{order.customerName} · {order.city}</p>
                      <p className="text-xs text-muted">{order.trackingCode}{order.deliveredAt ? ` · ${formatDate(order.deliveredAt)}` : ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}

function DriverOrderDetail({
  driverId,
  order,
  onBack,
  onRefresh,
}: {
  driverId: number;
  order: DriverOrder;
  onBack: () => void;
  onRefresh: () => Promise<void>;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function act(action: "start" | "deliver") {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/driver/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, confirmationCode: code, driverId }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Action impossible");
      if (action === "deliver") setMessage("Livraison confirmée ✅");
      await onRefresh();
      if (action === "deliver") setTimeout(onBack, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  const mapsUrl = order.latitude && order.longitude
    ? `https://www.google.com/maps/dir/?api=1&destination=${order.latitude},${order.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${order.address}, ${order.city}`)}`;

  return (
    <div className="mt-6">
      <button type="button" onClick={onBack} className="mb-4 inline-flex items-center gap-1 text-sm text-muted">
        <ChevronLeft size={16} /> Retour aux courses
      </button>
      <div className="rounded-[28px] bg-paper p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{order.trackingCode}</p>
            <h2 className="font-display text-3xl text-leaf-dark">{order.customerName}</h2>
          </div>
          <span className="rounded-full bg-leaf-mist px-3 py-1 text-xs text-leaf-dark">{statusLabel(order.status)}</span>
        </div>
        <div className="mt-4 flex items-start gap-2 text-sm text-muted">
          <MapPin size={16} className="mt-0.5 shrink-0 text-leaf" />
          <span>{order.address}, {order.city}{order.landmark ? ` · Repère : ${order.landmark}` : ""}</span>
        </div>
        {order.notes && <p className="mt-2 rounded-2xl bg-cream px-3 py-2 text-sm text-muted">Note : {order.notes}</p>}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <a href={`tel:${order.customerPhone}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-leaf/15 text-sm text-leaf-dark"><Phone size={15} /> Appeler</a>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-leaf-mist text-sm text-leaf-dark"><Navigation size={15} /> Itinéraire</a>
        </div>

        {order.latitude && order.longitude && <iframe title="Position client" className="mt-4 h-44 w-full rounded-2xl border-0" src={`https://www.openstreetmap.org/export/embed.html?bbox=${order.longitude - 0.008}%2C${order.latitude - 0.008}%2C${order.longitude + 0.008}%2C${order.latitude + 0.008}&layer=mapnik&marker=${order.latitude}%2C${order.longitude}`} />}

        <div className="mt-4 space-y-2 border-t border-leaf/10 pt-4">
          {order.items.map((item) => <div key={item.id} className="flex items-center justify-between text-sm"><span className="text-leaf-dark">{item.productName} × {item.quantity}</span><span className="text-muted">{formatCfa(item.unitPrice * item.quantity)}</span></div>)}
          <div className="flex items-center justify-between border-t border-leaf/10 pt-2 font-medium text-leaf-dark"><span>Total à encaisser</span><span>{formatCfa(order.total)}</span></div>
          <p className="text-xs text-muted">Paiement : {paymentLabel(order.paymentMethod)}</p>
        </div>

        {order.status === "assigned" && <button type="button" onClick={() => act("start")} disabled={busy} className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-leaf text-sm text-cream disabled:opacity-70"><Truck size={16} /> {busy ? "..." : "Démarrer la course"}</button>}
        {order.status === "in_transit" && (
          <div className="mt-5 rounded-2xl bg-cream p-4">
            <p className="text-sm font-medium text-leaf-dark">Confirmer la remise</p>
            <p className="mt-1 text-xs text-muted">Demandez le code secret à 4 chiffres au client.</p>
            <input value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="••••" className="mt-3 h-12 w-full rounded-2xl border border-leaf/10 bg-paper px-4 text-center tracking-[0.5em] outline-none" />
            {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
            {message && <p className="mt-2 text-sm text-leaf">{message}</p>}
            <button type="button" onClick={() => act("deliver")} disabled={busy || code.length !== 4} className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-leaf text-sm text-cream disabled:opacity-60"><ShieldCheck size={16} /> {busy ? "Validation..." : "Confirmer la livraison"}</button>
          </div>
        )}
        {order.status === "delivered" && <div className="mt-5 flex items-center gap-2 rounded-2xl bg-leaf-mist px-4 py-3 text-sm text-leaf-dark"><CheckCircle2 size={18} className="text-leaf" /> Course livrée {order.deliveredAt ? `le ${formatDate(order.deliveredAt)}` : ""}</div>}
      </div>
    </div>
  );
}
