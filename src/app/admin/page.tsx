"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Search } from "lucide-react";
import { formatCfa, formatDate } from "@/lib/format";
import { paymentLabel, statusLabel } from "@/lib/catalog";
import { AdminStats } from "@/components/AdminStats";
import { ExportCSV } from "@/components/ExportCSV";
import { AdminNotificationBell } from "@/components/AdminNotificationBell";
import { avatarColor, initials, roleCan, roleLabel, type AdminCapability } from "@/lib/roles";

type Driver = {
  id: number;
  name: string;
  phone: string;
  vehicle: string;
  zone: string;
  status: string;
  username?: string;
};

type OrderItem = {
  id: number;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
};

type Order = {
  id: number;
  trackingCode: string;
  confirmationCode: string;
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
  driverId: number | null;
  total: number;
  createdAt: string;
  adminNotes?: string | null;
  promoCode?: string | null;
  discount?: number;
  items: OrderItem[];
  driver: Driver | null;
};

type InboxItem = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  kind: string;
  content: string;
  rating: number | null;
  createdAt: string;
};

type AdminUser = {
  id: number;
  name: string;
  username: string;
  role: string;
  active: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

type AuditLog = {
  id: number;
  actorAdminId: number | null;
  action: string;
  entityType: string;
  entityId: string | null;
  description: string;
  meta: string | null;
  createdAt: string;
  actor: { id: number; name: string; username: string } | null;
};

type SessionUser = {
  id: number;
  name: string;
  username: string;
  role: string;
  active: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

function Avatar({ id, name, size = 44 }: { id: number; name: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-medium text-cream"
      style={{ width: size, height: size, backgroundColor: avatarColor(id), fontSize: size * 0.36 }}
    >
      {initials(name)}
    </span>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<"overview" | "orders" | "drivers" | "admins" | "activity" | "messages" | "stats">("overview");
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [inbox, setInbox] = useState<InboxItem[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [auditActions, setAuditActions] = useState<string[]>([]);

  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const [driverForm, setDriverForm] = useState({
    name: "",
    phone: "",
    vehicle: "Moto",
    zone: "",
    username: "",
    password: "",
  });
  const [driverError, setDriverError] = useState("");
  const [resetDriverId, setResetDriverId] = useState<number | null>(null);
  const [resetDriverPasswordValue, setResetDriverPasswordValue] = useState("");
  const [resetDriverForce, setResetDriverForce] = useState(false);

  const [adminForm, setAdminForm] = useState({
    name: "",
    username: "",
    password: "",
    role: "manager",
  });
  const [adminError, setAdminError] = useState("");
  const [resetAdminId, setResetAdminId] = useState<number | null>(null);
  const [resetAdminPassword, setResetAdminPassword] = useState("");
  const [resetAdminForce, setResetAdminForce] = useState(false);

  // audit filters
  const [auditQ, setAuditQ] = useState("");
  const [auditAdminId, setAuditAdminId] = useState("");
  const [auditAction, setAuditAction] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);

  async function loadAudit() {
    setAuditLoading(true);
    const params = new URLSearchParams();
    if (auditQ.trim()) params.set("q", auditQ.trim());
    if (auditAdminId) params.set("adminId", auditAdminId);
    if (auditAction) params.set("action", auditAction);
    const res = await fetch(`/api/admin/audit?${params.toString()}`);
    if (res.ok) {
      const data = (await res.json()) as { logs: AuditLog[]; actions: string[] };
      setAuditLogs(data.logs);
      setAuditActions(data.actions);
    }
    setAuditLoading(false);
  }

  const bootstrap = useCallback(async () => {
    const session = await fetch("/api/admin/session", {
      credentials: "include",
      cache: "no-store",
    });
    const data = (await session.json()) as { authenticated: boolean; user?: SessionUser };
    if (!data.authenticated || !data.user) {
      router.replace("/admin/login");
      return;
    }
    setCurrentUser(data.user);

    const canManageUsers = roleCan(data.user.role, "manage_users");
    const [orderRes, driverRes, messageRes, usersRes, auditRes] = await Promise.all([
      fetch("/api/orders"),
      fetch("/api/drivers"),
      fetch("/api/messages"),
      canManageUsers ? fetch("/api/admin/users") : Promise.resolve(null),
      fetch("/api/admin/audit"),
    ]);

    if (orderRes.ok) setOrders((await orderRes.json()) as Order[]);
    if (driverRes.ok) setDrivers((await driverRes.json()) as Driver[]);
    if (messageRes.ok) setInbox((await messageRes.json()) as InboxItem[]);
    if (usersRes && usersRes.ok) setAdminUsers((await usersRes.json()) as AdminUser[]);
    if (auditRes.ok) {
      const data2 = (await auditRes.json()) as { logs: AuditLog[]; actions: string[] };
      setAuditLogs(data2.logs);
      setAuditActions(data2.actions);
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    const timeout = window.setTimeout(() => void bootstrap(), 0);
    return () => window.clearTimeout(timeout);
  }, [bootstrap]);

  const can = (capability: AdminCapability) => Boolean(currentUser && roleCan(currentUser.role, capability));

  const selected = orders.find((order) => order.id === selectedId) ?? null;

  function selectOrder(id: number) {
    setSelectedId(id);
    setAdminNotes(orders.find((order) => order.id === id)?.adminNotes ?? "");
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesFilter = filter === "all" || order.status === filter;
      const haystack = `${order.trackingCode} ${order.customerName} ${order.customerPhone} ${order.city}`.toLowerCase();
      return matchesFilter && (!needle || haystack.includes(needle));
    });
  }, [filter, orders, query]);

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const activeOrders = orders.filter((order) => order.status !== "cancelled");
    return {
      total: orders.length,
      pending: orders.filter((order) => order.status === "pending").length,
      confirmed: orders.filter((order) => order.status === "confirmed").length,
      transit: orders.filter((order) => ["assigned", "in_transit"].includes(order.status)).length,
      delivered: orders.filter((order) => order.status === "delivered").length,
      revenue: activeOrders.reduce((sum, order) => sum + order.total, 0),
      todayCount: orders.filter((order) => new Date(order.createdAt).toDateString() === today).length,
      todayRevenue: orders
        .filter((order) => order.status !== "cancelled" && new Date(order.createdAt).toDateString() === today)
        .reduce((sum, order) => sum + order.total, 0),
      unassigned: orders.filter((order) => ["pending", "confirmed"].includes(order.status) && !order.driverId).length,
      availableDrivers: drivers.filter((driver) => driver.status === "available").length,
    };
  }, [orders, drivers]);

  const needsAttention = useMemo(
    () => orders.filter((order) => ["pending", "confirmed"].includes(order.status) && !order.driverId).slice(0, 6),
    [orders],
  );
  const activeDeliveries = useMemo(
    () => orders.filter((order) => ["assigned", "in_transit"].includes(order.status)).slice(0, 6),
    [orders],
  );
  const myLogs = useMemo(
    () => auditLogs.filter((log) => log.actor?.id === currentUser?.id).slice(0, 8),
    [auditLogs, currentUser?.id],
  );

  async function patchOrder(id: number, payload: { status?: string; driverId?: number | null; adminNotes?: string }) {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      await bootstrap();
    }
  }

  async function addDriver() {
    setDriverError("");
    const response = await fetch("/api/drivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driverForm),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setDriverError(data.error || "Création impossible");
      return;
    }
    setDriverForm({ name: "", phone: "", vehicle: "Moto", zone: "", username: "", password: "" });
    await bootstrap();
  }

  async function addAdminUser() {
    setAdminError("");
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminForm),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setAdminError(data.error || "Création impossible");
      return;
    }
    setAdminForm({ name: "", username: "", password: "", role: "manager" });
    await bootstrap();
  }

  async function updateAdminUser(id: number, payload: { active?: boolean; role?: string; password?: string; forceChange?: boolean }) {
    const response = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      setResetAdminId(null);
      setResetAdminPassword("");
      setResetAdminForce(false);
      await bootstrap();
    }
  }

  function exitDashboard() {
    router.push("/");
  }

  function printSlip(order: Order) {
    const popup = window.open("", "_blank", "width=720,height=900");
    if (!popup) return;
    popup.document.write(`
      <html><head><title>${order.trackingCode}</title>
      <style>
        body { font-family: Georgia, serif; padding: 32px; color: #24301c; }
        h1 { font-size: 28px; margin: 0; }
        .muted { color: #5d6556; }
        .box { border: 1px solid #d7decd; border-radius: 16px; padding: 16px; margin-top: 16px; }
        .code { font-size: 42px; letter-spacing: 0.2em; }
      </style></head><body>
        <h1>FAVEDA — Bon de livraison</h1>
        <p class="muted">${order.trackingCode} · ${statusLabel(order.status)}</p>
        <div class="box">
          <p><strong>${order.customerName}</strong><br/>${order.customerPhone}<br/>${order.address}, ${order.city}</p>
          <p>Code secret : <span class="code">${order.confirmationCode}</span></p>
        </div>
        <div class="box">
          ${order.items.map((item) => `<p>${item.productName} × ${item.quantity} — ${formatCfa(item.unitPrice * item.quantity)}</p>`).join("")}
          <p><strong>Total ${formatCfa(order.total)}</strong></p>
        </div>
      </body></html>
    `);
    popup.document.close();
    popup.focus();
    popup.print();
  }

  if (!ready || !currentUser) {
    return <main className="px-5 py-20 text-center text-muted">Chargement de l’espace admin...</main>;
  }

  const readonlyOrders = !can("manage_orders");

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar id={currentUser.id} name={currentUser.name} size={56} />
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">
              Dashboard personnalisé · {roleLabel(currentUser.role)}
            </p>
            <h1 className="font-display text-4xl text-leaf-dark">Bonjour {currentUser.name.split(" ")[0]}</h1>
            <p className="mt-1 text-sm text-muted">
              @{currentUser.username}
              {currentUser.lastLoginAt ? ` · dernier accès ${formatDate(currentUser.lastLoginAt)}` : ""}
              {" · "}membre depuis {formatDate(currentUser.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/recrutement" className="rounded-full border border-leaf/15 px-4 py-2 text-sm text-leaf-dark">
            Recrutement
          </Link>
          <AdminNotificationBell onChange={() => void bootstrap()} />
          <button type="button" onClick={exitDashboard} className="rounded-full bg-leaf px-4 py-2 text-sm text-cream">
            Retour à la boutique
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { label: "Aujourd’hui", value: String(stats.todayCount), sub: formatCfa(stats.todayRevenue) },
          { label: "À traiter", value: String(stats.pending + stats.confirmed), sub: `${stats.unassigned} sans livreur` },
          { label: "En tournée", value: String(stats.transit), sub: `${stats.availableDrivers} livreurs dispo` },
          {
            label: "Mon rôle",
            value: roleLabel(currentUser.role),
            sub: `${myLogs.length} action(s) récente(s) pour vous`,
          },
        ].map((item) => (
          <div key={item.label} className="rounded-[24px] bg-paper p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">{item.label}</p>
            <p className="mt-2 truncate font-display text-2xl text-leaf-dark">{item.value}</p>
            <p className="mt-1 text-xs text-muted">{item.sub}</p>
          </div>
        ))}
      </div>

      {readonlyOrders && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-sand/60 px-4 py-2 text-xs text-leaf-dark">
          <Lock size={13} /> Rôle Support : accès en lecture seule sur les commandes, livreurs et admins.
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-2">
        {([
          ["overview", "Vue d’ensemble"],
          ["orders", "Commandes"],
          ["drivers", "Livreurs"],
          ["admins", "Équipe"],
          ["activity", "Traçabilité"],
          ["messages", "Messages"],
          ["stats", "Statistiques"],
        ] as [typeof tab, string][]).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`rounded-full px-4 py-2 text-sm ${tab === value ? "bg-leaf text-cream" : "bg-paper text-leaf-dark"}`}
          >
            {label}
            {value === "admins" && !can("manage_users") && <span className="ml-1 inline-block align-middle text-[10px] opacity-60">🔒</span>}
          </button>
        ))}
        <ExportCSV orders={orders} />
      </div>

      {tab === "overview" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[28px] bg-paper p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-leaf-dark">Mes dernières actions</h2>
              <span className="rounded-full bg-leaf-mist px-3 py-1 text-xs text-leaf-dark">{myLogs.length}</span>
            </div>
            <div className="mt-4 space-y-3">
              {myLogs.length === 0 ? (
                <p className="rounded-2xl bg-cream p-6 text-center text-sm text-muted">
                  Aucune action enregistrée pour vous. Vos modifications apparaîtront ici.
                </p>
              ) : (
                myLogs.map((log) => (
                  <div key={log.id} className="rounded-2xl bg-cream px-4 py-3">
                    <p className="text-sm font-medium text-leaf-dark">{log.description}</p>
                    <p className="mt-1 text-xs text-muted">
                      {formatDate(log.createdAt)} · {log.entityType}
                      {log.entityId ? ` #${log.entityId}` : ""}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[28px] bg-paper p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-leaf-dark">À affecter</h2>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs text-gold-deep">{needsAttention.length}</span>
            </div>
            <div className="mt-4 space-y-2">
              {needsAttention.length === 0 ? (
                <p className="rounded-2xl bg-cream p-6 text-center text-sm text-muted">Tout est affecté. Beau travail 🌿</p>
              ) : (
                needsAttention.map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => { setTab("orders"); selectOrder(order.id); }}
                    className="flex w-full items-center justify-between rounded-2xl bg-cream px-4 py-3 text-left hover:bg-leaf-mist"
                  >
                    <div>
                      <p className="text-sm font-medium text-leaf-dark">{order.customerName}</p>
                      <p className="text-xs text-muted">{order.trackingCode} · {order.city}</p>
                    </div>
                    <span className="text-sm text-leaf">{formatCfa(order.total)}</span>
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[28px] bg-paper p-6 lg:col-span-2">
            <h2 className="font-display text-2xl text-leaf-dark">Activité récente de l’équipe</h2>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {auditLogs.slice(0, 6).map((log) => (
                <div key={log.id} className="rounded-2xl bg-cream px-4 py-3">
                  <p className="text-sm text-leaf-dark">{log.description}</p>
                  <p className="mt-1 text-xs text-muted">
                    {log.actor ? `${log.actor.name} (@${log.actor.username})` : "Système"} · {formatDate(log.createdAt)}
                  </p>
                </div>
              ))}
              {auditLogs.length === 0 && <p className="text-sm text-muted md:col-span-2">Aucune activité enregistrée.</p>}
            </div>
          </section>
        </div>
      ) : tab === "stats" ? (
        <AdminStats orders={orders} />
      ) : tab === "messages" ? (
        <div className="mt-6 space-y-3">
          {inbox.map((item) => (
            <article key={item.id} className="rounded-[24px] bg-paper p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-leaf-dark">{item.name}</p>
                <span className="text-xs uppercase tracking-[0.14em] text-muted">{item.kind}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{item.content}</p>
              <p className="mt-2 text-xs text-muted">
                {item.email || item.phone || "Sans contact"} {item.rating ? `· ${item.rating}/5` : ""} · {formatDate(item.createdAt)}
              </p>
            </article>
          ))}
          {inbox.length === 0 && <p className="rounded-[24px] bg-paper p-8 text-center text-sm text-muted">Aucun message pour le moment.</p>}
        </div>
      ) : tab === "orders" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-[28px] bg-paper p-4">
            <div className="relative mb-3">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher nom, téléphone, code..."
                className="h-11 w-full rounded-2xl bg-cream pl-10 pr-4 text-sm"
              />
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {["all", "pending", "confirmed", "assigned", "in_transit", "delivered", "cancelled"].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`rounded-full px-3 py-1 text-xs ${filter === value ? "bg-leaf text-cream" : "bg-cream text-muted"}`}
                >
                  {value === "all" ? "Toutes" : statusLabel(value)}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {filtered.map((order) => (
                <button
                  key={order.id}
                  type="button"
                  onClick={() => selectOrder(order.id)}
                  className={`w-full rounded-2xl px-4 py-3 text-left ${selectedId === order.id ? "bg-leaf-mist" : "bg-cream"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-leaf-dark">{order.trackingCode}</p>
                    <span className="text-xs text-muted">{statusLabel(order.status)}</span>
                  </div>
                  <p className="text-sm text-muted">{order.customerName} · {order.city} · {formatCfa(order.total)}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] bg-paper p-6">
            {!selected ? (
              <p className="text-sm text-muted">Sélectionnez une commande pour suivre et, selon votre rôle, affecter la livraison.</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{selected.trackingCode}</p>
                  <h2 className="font-display text-3xl text-leaf-dark">{selected.customerName}</h2>
                  <p className="text-sm text-muted">{selected.customerPhone}</p>
                </div>
                <p className="text-sm text-muted">
                  {selected.address}, {selected.city}
                  {selected.landmark ? ` · ${selected.landmark}` : ""}
                </p>
                {selected.notes && <p className="rounded-2xl bg-cream px-3 py-2 text-sm">{selected.notes}</p>}
                <p className="text-sm">Paiement : {paymentLabel(selected.paymentMethod)}</p>
                <p className="text-sm">Code secret client : <strong>{selected.confirmationCode}</strong></p>
                <p className="text-sm">Passée le {formatDate(selected.createdAt)}</p>
                <div className="space-y-2">
                  {selected.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span>{item.productName} × {item.quantity}</span>
                      <span>{formatCfa(item.unitPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                {selected.latitude && selected.longitude && (
                  <iframe
                    title="Position client"
                    className="h-40 w-full rounded-2xl border-0"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${selected.longitude - 0.01}%2C${selected.latitude - 0.01}%2C${selected.longitude + 0.01}%2C${selected.latitude + 0.01}&layer=mapnik&marker=${selected.latitude}%2C${selected.longitude}`}
                  />
                )}
                {readonlyOrders ? (
                  <p className="flex items-center gap-2 rounded-2xl bg-sand/50 px-4 py-3 text-sm text-leaf-dark">
                    <Lock size={15} /> Votre rôle ne permet pas de modifier cette commande.
                  </p>
                ) : (
                  <>
                    <label className="block text-sm">
                      <span className="mb-1.5 block text-muted">Affecter un livreur</span>
                      <select
                        value={selected.driverId ?? ""}
                        onChange={(event) => {
                          const driverId = event.target.value ? Number(event.target.value) : null;
                          void patchOrder(selected.id, {
                            driverId,
                            status: driverId ? "assigned" : selected.status,
                          });
                        }}
                        className="h-11 w-full rounded-2xl border border-leaf/10 bg-cream px-3"
                      >
                        <option value="">Non affectée</option>
                        {drivers.map((driver) => (
                          <option key={driver.id} value={driver.id}>
                            {driver.name} · {driver.zone} · {driver.status}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1.5 block text-muted">Statut</span>
                      <select
                        value={selected.status}
                        onChange={(event) => void patchOrder(selected.id, { status: event.target.value })}
                        className="h-11 w-full rounded-2xl border border-leaf/10 bg-cream px-3"
                      >
                        {["pending", "confirmed", "assigned", "in_transit", "delivered", "cancelled"].map((status) => (
                          <option key={status} value={status}>
                            {statusLabel(status)}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1.5 block text-muted">Note interne (traçée)</span>
                      <textarea
                        value={adminNotes}
                        onChange={(event) => setAdminNotes(event.target.value)}
                        className="min-h-20 w-full rounded-2xl border border-leaf/10 bg-cream px-3 py-2"
                      />
                      <button
                        type="button"
                        onClick={() => void patchOrder(selected.id, { adminNotes })}
                        className="mt-2 rounded-full bg-leaf-mist px-4 py-2 text-xs text-leaf-dark"
                      >
                        Enregistrer la note
                      </button>
                    </label>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => printSlip(selected)}
                  className="h-11 w-full rounded-full border border-leaf/15 text-sm text-leaf-dark"
                >
                  Imprimer le bon de livraison
                </button>
              </div>
            )}
          </section>
        </div>
      ) : tab === "drivers" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="h-fit rounded-[28px] bg-paper p-6">
            <h2 className="font-display text-3xl text-leaf-dark">Nouveau livreur</h2>
            <p className="mt-1 text-sm text-muted">Le profil apparaît directement dans l’espace de tournées, sans identifiant ni mot de passe.</p>
            <div className="mt-4 space-y-3">
              <input placeholder="Nom" value={driverForm.name} onChange={(event) => setDriverForm({ ...driverForm, name: event.target.value })} className="h-11 w-full rounded-2xl border border-leaf/10 bg-cream px-3" />
              <input placeholder="Téléphone" value={driverForm.phone} onChange={(event) => setDriverForm({ ...driverForm, phone: event.target.value })} className="h-11 w-full rounded-2xl border border-leaf/10 bg-cream px-3" />
              <input placeholder="Véhicule" value={driverForm.vehicle} onChange={(event) => setDriverForm({ ...driverForm, vehicle: event.target.value })} className="h-11 w-full rounded-2xl border border-leaf/10 bg-cream px-3" />
              <input placeholder="Zone" value={driverForm.zone} onChange={(event) => setDriverForm({ ...driverForm, zone: event.target.value })} className="h-11 w-full rounded-2xl border border-leaf/10 bg-cream px-3" />
              {driverError && <p className="text-sm text-red-700">{driverError}</p>}
              <button type="button" onClick={addDriver} className="h-11 w-full rounded-full bg-leaf text-sm text-cream">Ajouter le livreur</button>
            </div>
          </section>
          <section className="grid gap-3">
            {drivers.map((driver) => (
              <div key={driver.id} className="rounded-[24px] bg-paper p-5">
                <div className="flex items-center gap-3">
                  <Avatar id={driver.id} name={driver.name} size={40} />
                  <div className="flex-1">
                    <h3 className="font-display text-2xl text-leaf-dark">{driver.name}</h3>
                    <p className="text-sm text-muted">{driver.phone} · {driver.vehicle} · {driver.zone}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs ${driver.status === "available" ? "bg-leaf-mist text-leaf-dark" : "bg-gold/15 text-gold-deep"}`}>{driver.status === "available" ? "Disponible" : "En course"}</span>
                </div>
              </div>
            ))}
            {drivers.length === 0 && <p className="rounded-[24px] bg-paper p-8 text-center text-sm text-muted">Aucun livreur enregistré.</p>}
          </section>
        </div>
      ) : tab === "admins" ? (
        <section className="mt-6 rounded-[28px] bg-paper p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Organisation</p>
          <h2 className="mt-1 font-display text-3xl text-leaf-dark">Équipe Faveda</h2>
          <p className="mt-2 text-sm text-muted">Les profils servent à attribuer les actions dans le journal de traçabilité. Aucun identifiant ni mot de passe n’est demandé.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {adminUsers.map((user) => (
              <article key={user.id} className="rounded-2xl bg-cream p-4">
                <div className="flex items-center gap-3">
                  <Avatar id={user.id} name={user.name} size={44} />
                  <div>
                    <p className="font-medium text-leaf-dark">{user.name}</p>
                    <p className="text-sm text-muted">{roleLabel(user.role)}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted">Profil créé le {formatDate(user.createdAt)}</p>
              </article>
            ))}
            {adminUsers.length === 0 && <p className="text-sm text-muted">Aucun profil d’équipe disponible.</p>}
          </div>
        </section>
      ) : tab === "activity" ? (
        <div className="mt-6 rounded-[28px] bg-paper p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Traçabilité</p>
              <h2 className="font-display text-3xl text-leaf-dark">Journal des actions de l’équipe</h2>
            </div>
            <p className="text-sm text-muted">{auditLogs.length} entrées</p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
            <div className="relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={auditQ}
                onChange={(event) => setAuditQ(event.target.value)}
                placeholder="Rechercher une description..."
                className="h-11 w-full rounded-2xl bg-cream pl-10 pr-4 text-sm"
              />
            </div>
            <select value={auditAdminId} onChange={(event) => setAuditAdminId(event.target.value)} className="h-11 rounded-2xl bg-cream px-3 text-sm">
              <option value="">Tous les admins</option>
              {adminUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <select value={auditAction} onChange={(event) => setAuditAction(event.target.value)} className="h-11 rounded-2xl bg-cream px-3 text-sm">
              <option value="">Toutes les actions</option>
              {auditActions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 space-y-3">
            {auditLoading && <p className="text-center text-sm text-muted">Chargement...</p>}
            {!auditLoading && auditLogs.map((log) => (
              <article key={log.id} className="rounded-2xl bg-cream px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-leaf-dark">{log.description}</p>
                  <span className="text-xs text-muted">{formatDate(log.createdAt)}</span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {log.actor ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="grid h-4 w-4 place-items-center rounded-full text-[8px] font-semibold text-cream"
                        style={{ backgroundColor: avatarColor(log.actor.id) }}
                      >
                        {initials(log.actor.name)}
                      </span>
                      {log.actor.name} (@{log.actor.username})
                    </span>
                  ) : (
                    "Système"
                  )}
                  {" · "}{log.action} · {log.entityType}
                  {log.entityId ? ` #${log.entityId}` : ""}
                </p>
              </article>
            ))}
            {!auditLoading && auditLogs.length === 0 && <p className="text-center text-sm text-muted">Aucune action enregistrée avec ces filtres.</p>}
          </div>
        </div>
      ) : null}
    </main>
  );
}
