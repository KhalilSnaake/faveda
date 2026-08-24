"use client";

import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/ToastProvider";
import { formatCfa } from "@/lib/format";

type PackProduct = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
};

export function RitualPack({
  title,
  description,
  badge,
  products,
}: {
  title: string;
  description: string;
  badge: string;
  products: PackProduct[];
}) {
  const { addItem } = useCart();
  const { push } = useToast();
  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <article className="rounded-[28px] border border-leaf/10 bg-paper p-5">
      <p className="text-[11px] uppercase tracking-[0.16em] text-gold-deep">{badge}</p>
      <h3 className="mt-2 font-display text-3xl text-leaf-dark">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <div className="mt-4 flex -space-x-3">
        {products.map((product) => (
          <img key={product.id} src={product.image} alt="" className="h-14 w-14 rounded-2xl border-2 border-paper object-cover" />
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{products.map((product) => product.name).join(" + ")}</p>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-medium text-leaf">{formatCfa(total)}</p>
        <button
          type="button"
          onClick={() => {
            products.forEach((product) =>
              addItem({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                stock: 20,
              }),
            );
            push("Rituel ajouté au panier");
          }}
          className="rounded-full bg-leaf px-4 py-2 text-sm text-cream"
        >
          Ajouter le rituel
        </button>
      </div>
    </article>
  );
}
