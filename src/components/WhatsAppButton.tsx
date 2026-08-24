"use client";

import { usePathname } from "next/navigation";
import { whatsappNumber } from "@/lib/catalog";

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/livreur")) return null;

  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Bonjour Faveda, je souhaite un conseil sur vos soins naturels.")}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-medium text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition hover:scale-[1.03]"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-lg">✆</span>
      WhatsApp
    </a>
  );
}
