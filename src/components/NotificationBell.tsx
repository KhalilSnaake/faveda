"use client";

import Link from "next/link";
import { Bell, Package, Truck, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getNotifLastSeen, readTrackingCodes, setNotifLastSeen } from "@/lib/local";

type CustomerNotification = {
  id: number;
  type: string;
  title: string;
  body: string;
  trackingCode: string | null;
  createdAt: string;
};

function iconFor(type: string) {
  if (type.includes("delivered")) return <CheckCircle2 size={16} className="text-leaf" />;
  if (type.includes("transit") || type.includes("assigned")) return <Truck size={16} className="text-gold-deep" />;
  if (type.includes("cancelled")) return <XCircle size={16} className="text-red-500" />;
  if (type.includes("received")) return <Package size={16} className="text-leaf" />;
  return <Sparkles size={16} className="text-gold-deep" />;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days} j`;
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CustomerNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async () => {
    const codes = readTrackingCodes();
    if (codes.length === 0) {
      setItems([]);
      setUnread(0);
      return;
    }
    try {
      const res = await fetch(`/api/notifications/customer?codes=${encodeURIComponent(codes.join(","))}`);
      if (!res.ok) return;
      const data = (await res.json()) as { notifications: CustomerNotification[] };
      const list = data.notifications ?? [];
      setItems(list);
      const lastSeen = getNotifLastSeen();
      setUnread(list.filter((n) => new Date(n.createdAt).getTime() > lastSeen).length);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    void load();
    const interval = setInterval(load, 25000);
    return () => clearInterval(interval);
  }, [load]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next && items.length > 0) {
      const newest = Math.max(...items.map((n) => new Date(n.createdAt).getTime()));
      setNotifLastSeen(newest);
      setUnread(0);
    }
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={toggle}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-leaf/15 bg-paper text-leaf-dark transition hover:bg-leaf-mist"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="animate-badge-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-ink" key={unread}>
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="animate-rise absolute right-0 top-14 z-50 w-[min(88vw,360px)] overflow-hidden rounded-[24px] border border-leaf/10 bg-paper shadow-2xl">
          <div className="flex items-center justify-between border-b border-leaf/10 px-4 py-3">
            <p className="font-display text-xl text-leaf-dark">Notifications</p>
            {items.length > 0 && (
              <span className="text-xs text-muted">{items.length}</span>
            )}
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <Bell size={28} className="mx-auto text-leaf/30" />
                <p className="mt-3 text-sm text-muted">
                  Aucune notification pour le moment. Passez commande pour suivre son avancement ici.
                </p>
              </div>
            ) : (
              items.map((n) => {
                const content = (
                  <div className="flex gap-3 px-4 py-3 transition hover:bg-cream">
                    <div className="mt-0.5 shrink-0">{iconFor(n.type)}</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-leaf-dark">{n.title}</p>
                      <p className="mt-0.5 text-xs leading-5 text-muted">{n.body}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wide text-muted/70">{timeAgo(n.createdAt)}</p>
                    </div>
                  </div>
                );
                return n.trackingCode ? (
                  <Link
                    key={n.id}
                    href={`/suivi/${n.trackingCode}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-leaf/5 last:border-0"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={n.id} className="border-b border-leaf/5 last:border-0">
                    {content}
                  </div>
                );
              })
            )}
          </div>

          <Link
            href="/mes-commandes"
            onClick={() => setOpen(false)}
            className="block border-t border-leaf/10 bg-cream px-4 py-3 text-center text-sm text-leaf-dark"
          >
            Voir mes commandes
          </Link>
        </div>
      )}
    </div>
  );
}
