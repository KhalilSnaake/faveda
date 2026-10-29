"use client";

import { useState } from "react";
import { X, Gift } from "lucide-react";
import Link from "next/link";

export function PromoBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-leaf-dark via-leaf to-leaf-dark text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-12 py-2.5 text-center text-sm">
        <Gift size={15} className="shrink-0 text-gold" />
        <span>
          Code <strong className="tracking-wider text-gold">FAVEDA10</strong> = 10 % de remise sur votre première commande
        </span>
        <Link href="/produits" className="ml-2 hidden rounded-full bg-cream/15 px-3 py-0.5 text-xs text-cream sm:inline">
          J&apos;en profite →
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-cream/70"
        aria-label="Fermer"
      >
        <X size={12} />
      </button>
    </div>
  );
}
