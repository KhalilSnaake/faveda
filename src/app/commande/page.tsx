"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { LoaderCircle, MapPinned, Navigation } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { applyPromo, paymentMethods } from "@/lib/catalog";
import { formatCfa } from "@/lib/format";
import { readProfile, saveProfile } from "@/lib/local";
import { CheckoutStepper } from "@/components/CheckoutStepper";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const quote = applyPromo(subtotal, promoCode);
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    address: "",
    city: "",
    landmark: "",
    notes: "",
    latitude: null as number | null,
    longitude: null as number | null,
    paymentMethod: "cash",
    paymentPhone: "",
  });

  const needsPaymentPhone = useMemo(
    () => ["orange", "mtn", "wave"].includes(form.paymentMethod),
    [form.paymentMethod],
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const profile = readProfile();
      if (profile) {
        setForm((current) => ({ ...current, ...profile }));
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  async function shareLocation() {
    if (!navigator.geolocation) {
      setError("La géolocalisation n’est pas disponible sur cet appareil.");
      return;
    }
    setLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setForm((current) => ({ ...current, latitude, longitude }));
        try {
          const response = await fetch(`/api/geocode/reverse?lat=${latitude}&lon=${longitude}`);
          const data = (await response.json()) as { label?: string; city?: string };
          setForm((current) => ({
            ...current,
            latitude,
            longitude,
            address: current.address || data.label || current.address,
            city: current.city || data.city || current.city,
          }));
        } catch {
          /* keep coordinates only */
        }
        setLocating(false);
      },
      () => {
        setError("Impossible d’obtenir votre position. Autorisez la localisation puis réessayez.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (items.length === 0) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          promoCode,
          items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        }),
      });
      const data = (await response.json()) as { error?: string; trackingCode?: string };
      if (!response.ok || !data.trackingCode) {
        throw new Error(data.error || "La commande n’a pas pu être créée.");
      }
      saveProfile({
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        customerEmail: form.customerEmail,
        address: form.address,
        city: form.city,
        landmark: form.landmark,
      });
      clear();
      router.push(`/commande/confirmation/${data.trackingCode}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue");
      setBusy(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h1 className="font-display text-4xl text-leaf-dark">Votre panier est vide</h1>
        <Link href="/produits" className="mt-6 inline-flex rounded-full bg-leaf px-6 py-3 text-sm text-cream">
          Retour à la boutique
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1.15fr_0.85fr] md:px-8">
      <form onSubmit={onSubmit} className="space-y-6">
        <CheckoutStepper current={3} />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Finaliser</p>
          <h1 className="mt-2 font-display text-5xl text-leaf-dark">Livraison & paiement</h1>
        </div>

        <section className="rounded-[28px] border border-leaf/10 bg-paper p-6">
          <h2 className="font-display text-2xl text-leaf-dark">Vos informations</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Nom complet" value={form.customerName} onChange={(value) => setForm({ ...form, customerName: value })} required />
            <Field label="Téléphone" value={form.customerPhone} onChange={(value) => setForm({ ...form, customerPhone: value })} required />
            <Field label="Email (optionnel)" value={form.customerEmail} onChange={(value) => setForm({ ...form, customerEmail: value })} type="email" />
            <Field label="Ville / commune" value={form.city} onChange={(value) => setForm({ ...form, city: value })} required />
            <div className="md:col-span-2">
              <Field label="Adresse de livraison" value={form.address} onChange={(value) => setForm({ ...form, address: value })} required />
            </div>
            <Field label="Point de repère" value={form.landmark} onChange={(value) => setForm({ ...form, landmark: value })} />
            <Field label="Note pour le livreur" value={form.notes} onChange={(value) => setForm({ ...form, notes: value })} />
          </div>
        </section>

        <section className="rounded-[28px] border border-leaf/10 bg-paper p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl text-leaf-dark">Position GPS</h2>
              <p className="mt-1 text-sm text-muted">Partagez votre localisation pour faciliter la livraison.</p>
            </div>
            <button
              type="button"
              onClick={shareLocation}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-leaf-mist px-4 text-sm text-leaf-dark"
            >
              {locating ? <LoaderCircle size={16} className="animate-spin" /> : <Navigation size={16} />}
              Partager
            </button>
          </div>
          {form.latitude && form.longitude ? (
            <div className="mt-4 overflow-hidden rounded-3xl">
              <p className="mb-2 flex items-center gap-2 text-sm text-leaf">
                <MapPinned size={16} /> {form.latitude.toFixed(5)}, {form.longitude.toFixed(5)}
              </p>
              <iframe
                title="Carte de livraison"
                className="h-52 w-full border-0"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${form.longitude - 0.01}%2C${form.latitude - 0.01}%2C${form.longitude + 0.01}%2C${form.latitude + 0.01}&layer=mapnik&marker=${form.latitude}%2C${form.longitude}`}
              />
            </div>
          ) : (
            <p className="mt-4 rounded-2xl bg-cream px-4 py-3 text-sm text-muted">
              Aucune position partagée pour le moment. Vous pouvez tout de même commander avec l’adresse écrite.
            </p>
          )}
        </section>

        <section className="rounded-[28px] border border-leaf/10 bg-paper p-6">
          <h2 className="font-display text-2xl text-leaf-dark">Mode de paiement</h2>
          <div className="mt-4 grid gap-3">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 ${
                  form.paymentMethod === method.id ? "border-leaf bg-leaf-mist" : "border-leaf/10"
                }`}
              >
                <div>
                  <p className="font-medium text-leaf-dark">{method.label}</p>
                  <p className="text-xs text-muted">{method.hint}</p>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={form.paymentMethod === method.id}
                  onChange={() => setForm({ ...form, paymentMethod: method.id })}
                />
              </label>
            ))}
          </div>
          {needsPaymentPhone && (
            <div className="mt-4">
              <Field
                label="Numéro Mobile Money"
                value={form.paymentPhone}
                onChange={(value) => setForm({ ...form, paymentPhone: value })}
                required
              />
            </div>
          )}
        </section>

        {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="flex h-12 w-full items-center justify-center rounded-full bg-leaf text-sm font-medium text-cream disabled:opacity-70"
        >
          {busy ? "Validation en cours..." : `Confirmer · ${formatCfa(quote.total)}`}
        </button>
      </form>

      <aside className="h-fit rounded-[28px] bg-cream p-6">
        <h2 className="font-display text-3xl text-leaf-dark">Votre commande</h2>
        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <img src={item.image} alt="" className="h-14 w-14 rounded-2xl object-cover" />
              <div className="flex-1">
                <p className="text-sm text-leaf-dark">{item.name}</p>
                <p className="text-xs text-muted">x{item.quantity}</p>
              </div>
              <p className="text-sm">{formatCfa(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-2">
          <input
            value={promoInput}
            onChange={(event) => setPromoInput(event.target.value.toUpperCase())}
            placeholder="Code promo"
            className="h-11 flex-1 rounded-2xl border border-leaf/10 bg-paper px-3 text-sm uppercase"
          />
          <button
            type="button"
            onClick={() => setPromoCode(promoInput.trim())}
            className="rounded-2xl bg-leaf px-4 text-sm text-cream"
          >
            OK
          </button>
        </div>
        {promoCode && (
          <p className={`mt-2 text-xs ${quote.ok ? "text-leaf" : "text-red-700"}`}>
            {quote.ok ? quote.label : quote.error}
          </p>
        )}
        <div className="mt-5 space-y-1 border-t border-leaf/10 pt-4 text-sm">
          <div className="flex justify-between text-muted">
            <span>Sous-total</span>
            <span>{formatCfa(subtotal)}</span>
          </div>
          {quote.discount > 0 && (
            <div className="flex justify-between text-leaf">
              <span>Remise</span>
              <span>-{formatCfa(quote.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-muted">
            <span>Livraison</span>
            <span>{quote.deliveryFee === 0 ? "Offerte" : formatCfa(quote.deliveryFee)}</span>
          </div>
          <div className="flex justify-between pt-2 text-base text-leaf-dark">
            <span>Total</span>
            <span>{formatCfa(quote.total)}</span>
          </div>
        </div>
      </aside>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-leaf/10 bg-cream px-4 outline-none ring-leaf/30 focus:ring-2"
      />
    </label>
  );
}
