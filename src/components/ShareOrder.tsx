"use client";

import { Copy, ExternalLink, Share2 } from "lucide-react";
import { useState } from "react";
import { whatsappNumber } from "@/lib/catalog";

export function ShareOrder({ trackingCode }: { trackingCode: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/suivi/${trackingCode}` : "";

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Suivez ma commande Faveda : ${url}`)}`;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-full border border-leaf/15 bg-paper px-4 py-2 text-sm text-leaf-dark transition hover:bg-leaf-mist"
      >
        <Copy size={14} /> {copied ? "Copié !" : "Copier le lien"}
      </button>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm text-white"
      >
        <ExternalLink size={14} /> Partager WhatsApp
      </a>
      {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
        <button
          type="button"
          onClick={() =>
            navigator.share({ title: `Commande ${trackingCode}`, url })
          }
          className="inline-flex items-center gap-2 rounded-full border border-leaf/15 bg-paper px-4 py-2 text-sm text-leaf-dark"
        >
          <Share2 size={14} /> Partager
        </button>
      )}
    </div>
  );
}
