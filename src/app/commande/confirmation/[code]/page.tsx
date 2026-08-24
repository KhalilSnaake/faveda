"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Copy, Shield } from "lucide-react";
import { formatCfa, formatDate, estimateDelivery } from "@/lib/format";
import { paymentLabel, statusLabel } from "@/lib/catalog";
import { saveOrder } from "@/lib/local";
import { ShareOrder } from "@/components/ShareOrder";
import { CheckoutStepper } from "@/components/CheckoutStepper";

type TrackedOrder = {
  trackingCode: string;
  confirmationCode: string;
  status: string;
  total: number;
  createdAt: string;
  paymentMethod: string;
  city: string;
};

export default function ConfirmationPage() {
  const params = useParams<{ code: string }>();
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/orders/track/${params.code}`);
      if (response.ok) {
        const data = (await response.json()) as TrackedOrder;
        setOrder(data);
        saveOrder({
          trackingCode: data.trackingCode,
          confirmationCode: data.confirmationCode,
          total: data.total,
          createdAt: data.createdAt,
        });
      }
    }
    void load();
  }, [params.code]);

  async function copy(value: string, key: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-20 text-center">
        <p className="text-muted">Chargement de votre commande...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <CheckoutStepper current={4} />
      <div className="rounded-[36px] bg-paper p-8 text-center shadow-[0_20px_60px_rgba(36,48,28,0.08)] md:p-12">
        <CheckCircle2 className="mx-auto text-leaf" size={42} />
        <p className="mt-4 text-xs uppercase tracking-[0.22em] text-gold-deep">Commande enregistrée</p>
        <h1 className="mt-2 font-display text-5xl text-leaf-dark">Merci pour votre confiance</h1>
        <p className="mt-3 text-muted">
          Conservez précieusement ces deux codes. Ils vous seront demandés pour le suivi et à la livraison.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-cream p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Code de suivi</p>
            <p className="mt-2 font-display text-3xl text-leaf-dark">{order.trackingCode}</p>
            <button type="button" onClick={() => copy(order.trackingCode, "track")} className="mt-3 inline-flex items-center gap-1 text-sm text-leaf">
              <Copy size={14} /> {copied === "track" ? "Copié" : "Copier"}
            </button>
          </div>
          <div className="rounded-3xl bg-leaf-dark p-5 text-cream">
            <p className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-gold">
              <Shield size={13} /> Code secret livraison
            </p>
            <p className="mt-2 font-display text-5xl tracking-[0.2em]">{order.confirmationCode}</p>
            <p className="mt-2 text-xs text-cream/70">À communiquer uniquement au livreur Faveda.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-2 rounded-3xl bg-cream px-5 py-4 text-left text-sm text-muted">
          <p>Statut : {statusLabel(order.status)}</p>
          <p>Paiement : {paymentLabel(order.paymentMethod)}</p>
          <p>Ville : {order.city}</p>
          <p>Total : {formatCfa(order.total)}</p>
          <p>Passée le {formatDate(order.createdAt)}</p>
          <p>Livraison estimée : {estimateDelivery(order.createdAt)}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/suivi/${order.trackingCode}`} className="rounded-full bg-leaf px-6 py-3 text-sm text-cream">
            Suivre la commande
          </Link>
          <Link href="/mes-commandes" className="rounded-full border border-leaf/20 px-6 py-3 text-sm text-leaf-dark">
            Mes commandes
          </Link>
          <button type="button" onClick={() => window.print()} className="rounded-full border border-leaf/20 px-6 py-3 text-sm text-leaf-dark">
            Imprimer le reçu
          </button>
        </div>
        <div className="mt-6">
          <ShareOrder trackingCode={order.trackingCode} />
        </div>
      </div>
    </main>
  );
}
