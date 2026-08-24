"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", content: "", rating: 5, kind: "review" });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    setMessage(response.ok ? "Message envoyé. Merci pour votre retour." : "Envoi impossible, réessayez.");
    if (response.ok) setForm({ name: "", phone: "", email: "", content: "", rating: 5, kind: "review" });
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Parlons plantes</p>
      <h1 className="mt-2 font-display text-5xl text-leaf-dark">Contact & avis</h1>
      <p className="mt-3 text-muted">Une question, un conseil, ou un avis après livraison : l’équipe Faveda vous lit.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-[28px] bg-paper p-6">
        <div className="flex gap-2">
          {[
            { id: "review", label: "Laisser un avis" },
            { id: "contact", label: "Question" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setForm({ ...form, kind: item.id })}
              className={`rounded-full px-4 py-2 text-sm ${form.kind === item.id ? "bg-leaf text-cream" : "bg-cream text-leaf-dark"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <input
          required
          placeholder="Votre nom"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="h-12 w-full rounded-2xl bg-cream px-4"
        />
        <div className="grid gap-3 md:grid-cols-2">
          <input
            placeholder="Téléphone"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="h-12 rounded-2xl bg-cream px-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="h-12 rounded-2xl bg-cream px-4"
          />
        </div>
        {form.kind === "review" && (
          <label className="block text-sm text-muted">
            Note
            <input
              type="range"
              min={1}
              max={5}
              value={form.rating}
              onChange={(event) => setForm({ ...form, rating: Number(event.target.value) })}
              className="mt-2 w-full"
            />
            <span className="text-leaf-dark">{form.rating} / 5</span>
          </label>
        )}
        <textarea
          required
          rows={5}
          placeholder="Votre message"
          value={form.content}
          onChange={(event) => setForm({ ...form, content: event.target.value })}
          className="w-full rounded-2xl bg-cream px-4 py-3"
        />
        {message && <p className="text-sm text-leaf">{message}</p>}
        <button type="submit" disabled={busy} className="h-12 w-full rounded-full bg-leaf text-sm text-cream">
          {busy ? "Envoi..." : "Envoyer"}
        </button>
      </form>
    </main>
  );
}
