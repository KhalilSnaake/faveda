"use client";

import { FormEvent, useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function DeliveryConfirmPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/orders/confirm-delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingCode, confirmationCode }),
      });
      const data = (await response.json()) as { error?: string; trackingCode?: string };
      if (!response.ok) throw new Error(data.error || "Confirmation impossible");
      setMessage(`Livraison confirmée pour ${data.trackingCode}.`);
      setTrackingCode("");
      setConfirmationCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-5 py-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Espace livreur</p>
      <h1 className="mt-2 font-display text-5xl text-leaf-dark">Confirmer une remise</h1>
      <p className="mt-3 text-muted">
        Demandez le code secret à 4 chiffres au client, puis validez la livraison.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-[28px] bg-paper p-6">
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Code de suivi</span>
          <input
            value={trackingCode}
            onChange={(event) => setTrackingCode(event.target.value.toUpperCase())}
            className="h-12 w-full rounded-2xl border border-leaf/10 bg-cream px-4 uppercase outline-none"
            placeholder="FAV-XXXXXX"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Code secret à 4 chiffres</span>
          <input
            value={confirmationCode}
            onChange={(event) => setConfirmationCode(event.target.value.replace(/\D/g, "").slice(0, 4))}
            className="h-12 w-full rounded-2xl border border-leaf/10 bg-cream px-4 tracking-[0.4em] outline-none"
            placeholder="••••"
            required
          />
        </label>
        {error && <p className="text-sm text-red-700">{error}</p>}
        {message && <p className="text-sm text-leaf">{message}</p>}
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-leaf text-sm text-cream"
        >
          <ShieldCheck size={16} /> {busy ? "Validation..." : "Valider la livraison"}
        </button>
      </form>
    </main>
  );
}
