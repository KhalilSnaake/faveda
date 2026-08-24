"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function TrackSearchPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!code.trim()) return;
    router.push(`/suivi/${code.trim().toUpperCase()}`);
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-20 md:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Suivi</p>
      <h1 className="mt-2 font-display text-5xl text-leaf-dark">Où en est votre commande ?</h1>
      <p className="mt-3 text-muted">
        Saisissez le code de suivi reçu à la confirmation — il commence par FAV-.
      </p>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="FAV-XXXXXX"
          className="h-14 flex-1 rounded-full border border-leaf/15 bg-paper px-5 uppercase outline-none ring-leaf/30 focus:ring-2"
        />
        <button type="submit" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-leaf px-6 text-cream">
          <Search size={16} /> Rechercher
        </button>
      </form>
    </main>
  );
}
