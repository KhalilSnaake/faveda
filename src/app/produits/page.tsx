import { db } from "@/db";
import { products } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { ProductExplorer } from "@/components/ProductExplorer";
import { RitualPack } from "@/components/RitualPack";
import { ritualPacks } from "@/lib/catalog";
import { normalizeProductImages } from "@/lib/storage";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Boutique",
};

export default async function ProductsPage() {
  await ensureSeeded();
  const rows = normalizeProductImages(await db.select().from(products).orderBy(asc(products.id)));
  const packs = ritualPacks
    .map((pack) => ({
      ...pack,
      products: pack.slugs
        .map((slug) => rows.find((product) => product.slug === slug))
        .filter((product): product is (typeof rows)[number] => Boolean(product)),
    }))
    .filter((pack) => pack.products.length > 0);

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Collection botanique</p>
      <h1 className="mt-2 font-display text-5xl text-leaf-dark">Tous les soins Faveda</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Recherchez, filtrez, enregistrez vos favoris. Codes promo : FAVEDA10, NATURE15, LIVRAISON.
      </p>

      {packs.length > 0 && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {packs.map((pack) => (
            <RitualPack
              key={pack.id}
              title={pack.title}
              description={pack.description}
              badge={pack.badge}
              products={pack.products}
            />
          ))}
        </div>
      )}

      <ProductExplorer products={rows} />
    </main>
  );
}
