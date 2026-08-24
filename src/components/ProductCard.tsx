import Link from "next/link";
import { formatCfa } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";
import { WishlistButton } from "@/components/WishlistButton";

type ProductCardProps = {
  product: {
    id: number;
    slug: string;
    name: string;
    subtitle: string;
    price: number;
    image: string;
    volume: string;
    category: string;
    stock?: number;
  };
  /** Affiche le bouton favoris sur l'image (utilisé par la boutique). */
  withWishlist?: boolean;
};

export function ProductCard({ product, withWishlist = false }: ProductCardProps) {
  const imageBlock = (
    <img
      src={product.image}
      alt={product.name}
      className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
    />
  );
  const categoryBadge = (
    <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-leaf-dark">
      {product.category}
    </span>
  );

  return (
    <article className="group overflow-hidden rounded-[28px] border border-leaf/10 bg-paper shadow-[0_18px_50px_rgba(36,48,28,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(36,48,28,0.12)]">
      {withWishlist ? (
        <div className="relative overflow-hidden">
          <Link href={`/produits/${product.slug}`} className="block">
            {imageBlock}
          </Link>
          {categoryBadge}
          <div className="absolute right-4 top-4">
            <WishlistButton productId={product.id} name={product.name} />
          </div>
        </div>
      ) : (
        <Link href={`/produits/${product.slug}`} className="relative block overflow-hidden">
          {imageBlock}
          {categoryBadge}
        </Link>
      )}
      <div className="space-y-3 p-5">
        <div>
          <Link href={`/produits/${product.slug}`}>
            <h3 className="font-display text-2xl leading-tight text-leaf-dark">{product.name}</h3>
          </Link>
          <p className="mt-1 text-sm text-muted">{product.subtitle}</p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-medium text-leaf">{formatCfa(product.price)}</p>
            <p className="text-xs text-muted">{product.volume}</p>
          </div>
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </article>
  );
}
