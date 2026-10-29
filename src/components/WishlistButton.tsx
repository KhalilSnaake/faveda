"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { readWishlist, toggleWishlistId } from "@/lib/local";
import { useToast } from "@/components/ToastProvider";

export function WishlistButton({ productId, name }: { productId: number; name?: string }) {
  const { push } = useToast();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setActive(readWishlist().includes(productId)), 0);
    return () => window.clearTimeout(timeout);
  }, [productId]);

  return (
    <button
      type="button"
      onClick={() => {
        const next = toggleWishlistId(productId);
        const nowActive = next.includes(productId);
        setActive(nowActive);
        push(nowActive ? `${name || "Soin"} ajouté aux favoris` : "Retiré des favoris");
      }}
      className={`grid h-10 w-10 place-items-center rounded-full border transition ${
        active ? "border-leaf bg-leaf text-cream" : "border-leaf/15 bg-paper text-leaf-dark hover:bg-leaf-mist"
      }`}
      aria-label="Ajouter aux favoris"
    >
      <Heart size={16} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
