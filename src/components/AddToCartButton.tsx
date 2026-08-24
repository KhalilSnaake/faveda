"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/ToastProvider";

type AddToCartButtonProps = {
  product: {
    id: number;
    slug: string;
    name: string;
    price: number;
    image: string;
    stock?: number;
  };
  quantity?: number;
  compact?: boolean;
  icon?: boolean;
};

export function AddToCartButton({ product, quantity = 1, compact = false, icon = false }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { push } = useToast();

  return (
    <button
      type="button"
      onClick={() => {
        addItem(
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            stock: product.stock,
          },
          quantity,
        );
        push(`${product.name} ajouté au panier`);
      }}
      className={
        icon
          ? "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-leaf text-cream shadow-[0_6px_14px_rgba(75,97,58,0.3)] transition hover:bg-leaf-dark active:scale-95"
          : compact
            ? "inline-flex h-11 items-center gap-2 rounded-full bg-leaf px-4 text-sm text-cream transition hover:bg-leaf-dark"
            : "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-leaf px-6 text-sm font-medium text-cream transition hover:bg-leaf-dark"
      }
      aria-label={icon ? `Ajouter ${product.name} au panier` : undefined}
    >
      <ShoppingBag size={icon ? 15 : 16} />
      {!icon && (compact ? "Ajouter" : "Ajouter au panier")}
    </button>
  );
}
