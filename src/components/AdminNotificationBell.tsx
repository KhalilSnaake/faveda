"use client";

import { Bell, Package, MessageSquare, CheckCircle2, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type AdminNotification = {
  id: number;
  type: string;
  title: string;
  body: string;
  trackingCode: string | null;
  read: boolean;
  createdAt: string;
};

function iconFor(type: string) {
  if (type === "new_order") return <Package size={16} className="text-leaf" />;
  if (type === "delivered") return <CheckCircle2 size={16} className="text-leaf" />;
  if (type === "message_review") return <Star size={16} className="text-gold-deep" />;
  if (type.startsWith("message")) return <MessageSquare size={16} className="text-gold-deep" />;
  return <Bell size={16} className="text-muted" />;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours} h`;
  return `il y a ${Math.floor(hours / 24)} j`;
}

export function AdminNotificationBell({ onChange }: { onChange?: () => void }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AdminNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      if (!res.ok) return;
      const data = (await res.json()) as { notifications: AdminNotification[]; unread: number };
      setItems(data.notifications ?? []);
      setUnread(data.unread ?? 0);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => void load(), 0);
    const interval = setInterval(load, 20000);
    return () => {
      window.clearTimeout(timeout);
      clearInterval(interval);
    };
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

  async function markAllRead() {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setUnread(0);
    setItems((current) => current.map((n) => ({ ...n, read: true })));
    onChange?.();
  }

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next && unread > 0) void markAllRead();
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={toggle}
        className="relative inline-flex h-10 items-center gap-2 rounded-full border border-leaf/15 bg-paper px-4 text-sm text-leaf-dark transition hover:bg-leaf-mist"
      >
        <Bell size={16} />
        <span className="hidden sm:inline">Notifications</span>
        {unread > 0 && (
          <span className="animate-badge-pop grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-ink" key={unread}>
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="animate-rise absolute right-0 top-12 z-50 w-[min(90vw,380px)] overflow-hidden rounded-[24px] border border-leaf/10 bg-paper shadow-2xl">
          <div className="flex items-center justify-between border-b border-leaf/10 px-4 py-3">
            <p className="font-display text-xl text-leaf-dark">Notifications</p>
            <span className="text-xs text-muted">{items.length}</span>
          </div>
          <div className="max-h-[65vh] overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <Bell size={28} className="mx-auto text-leaf/30" />
                <p className="mt-3 text-sm text-muted">Aucune notification.</p>
              </div>
            ) : (
              items.map((n) => (
                <div
                  key={n.id}
                  className={`flex gap-3 border-b border-leaf/5 px-4 py-3 last:border-0 ${
                    n.read ? "" : "bg-leaf-mist/40"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{iconFor(n.type)}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-leaf-dark">{n.title}</p>
                    <p className="mt-0.5 text-xs leading-5 text-muted">{n.body}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wide text-muted/70">{timeAgo(n.createdAt)}</p>
                  </div>
                  {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
