"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, kind: "newsletter", name: "Abonné" }),
    });
    setMessage(response.ok ? "Inscription confirmée. Merci !" : "Impossible d’enregistrer cet email.");
    if (response.ok) setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Votre email"
        className="h-12 w-full rounded-full bg-white/10 px-4 text-sm text-cream outline-none placeholder:text-cream/50"
      />
      <button type="submit" className="h-12 w-full rounded-full bg-cream text-sm text-leaf-dark">
        S’abonner
      </button>
      {message && <p className="text-sm text-cream/80">{message}</p>}
    </form>
  );
}
