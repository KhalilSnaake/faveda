import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq, ne } from "drizzle-orm";
import { Check, ChevronLeft } from "lucide-react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { parseJsonList, formatCfa } from "@/lib/format";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";
import { WishlistButton } from "@/components/WishlistButton";
import { StockBadge } from "@/components/StockBadge";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await ensureSeeded();
  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return { title: product?.name ?? "Produit" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await ensureSeeded();
  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!product) notFound();
  const benefits = parseJsonList(product.benefits);
  const related = await db
    .select()
    .from(products)
    .where(and(eq(products.category, product.category), ne(products.id, product.id)))
    .limit(3);
  const fallback =
    related.length > 0
      ? related
      : await db.select().from(products).where(ne(products.id, product.id)).limit(3);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <Link href="/produits" className="mb-4 inline-flex items-center gap-1 text-sm text-muted">
            <ChevronLeft size={16} /> Boutique
          </Link>
          <div className="overflow-hidden rounded-[36px] border border-leaf/10 bg-paper">
            <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
        <div className="py-2">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">
              {product.category} · {product.volume}
            </p>
            <WishlistButton productId={product.id} name={product.name} />
          </div>
          <h1 className="mt-3 font-display text-5xl leading-tight text-leaf-dark">{product.name}</h1>
          <p className="mt-3 text-lg text-muted">{product.subtitle}</p>
          <div className="mt-6 flex items-center gap-4">
            <p className="font-display text-4xl text-leaf">{formatCfa(product.price)}</p>
            <StockBadge stock={product.stock} />
          </div>
          <p className="mt-6 leading-7 text-ink/80">{product.description}</p>
          <ul className="mt-6 space-y-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-sm text-leaf-dark">
                <Check size={16} className="text-leaf" /> {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ProductPurchase product={product} />
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-cream p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Utilisation</p>
              <p className="mt-2 text-sm leading-6 text-muted">{product.usage}</p>
            </div>
            <div className="rounded-3xl bg-cream p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Composition</p>
              <p className="mt-2 text-sm leading-6 text-muted">{product.ingredients}</p>
            </div>
          </div>
        </div>
      </div>

      {fallback.length > 0 && (
        <section className="mt-16">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">À associer</p>
          <h2 className="mt-2 font-display text-4xl text-leaf-dark">Complétez votre rituel</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {fallback.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
