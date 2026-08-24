"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { readWishlist } from "@/lib/local";

type Product = {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  volume: string;
  category: string;
  stock: number;
};

export function ProductExplorer({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tous");
  const [sort, setSort] = useState("featured");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    setFavoriteIds(readWishlist());
  }, [favoritesOnly]);

  const categories = ["Tous", ...Array.from(new Set(products.map((product) => product.category)))];

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let rows = products.filter((product) => {
      const matchesQuery =
        !needle ||
        product.name.toLowerCase().includes(needle) ||
        product.subtitle.toLowerCase().includes(needle) ||
        product.category.toLowerCase().includes(needle);
      const matchesCategory = category === "Tous" || product.category === category;
      const matchesFav = !favoritesOnly || favoriteIds.includes(product.id);
      return matchesQuery && matchesCategory && matchesFav;
    });
    if (sort === "price-asc") rows = [...rows].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") rows = [...rows].sort((a, b) => b.price - a.price);
    if (sort === "name") rows = [...rows].sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return rows;
  }, [category, favoriteIds, favoritesOnly, products, query, sort]);

  return (
    <div>
      <div className="mt-8 rounded-[28px] border border-leaf/10 bg-paper p-4 md:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un soin, une plante, un usage..."
              className="h-12 w-full rounded-full bg-cream pl-11 pr-4 text-sm outline-none ring-leaf/20 focus:ring-2"
            />
          </label>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="h-12 rounded-full bg-cream px-4 text-sm"
          >
            <option value="featured">Trier : sélection</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name">Nom</option>
          </select>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm ${category === item ? "bg-leaf text-cream" : "bg-cream text-leaf-dark"}`}
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setFavoriteIds(readWishlist());
              setFavoritesOnly((value) => !value);
            }}
            className={`rounded-full px-4 py-2 text-sm ${favoritesOnly ? "bg-leaf text-cream" : "bg-cream text-leaf-dark"}`}
          >
            Favoris
          </button>
        </div>
      </div>

      <p className="mt-5 text-sm text-muted">{visible.length} soin{visible.length > 1 ? "s" : ""}</p>
      <div className="stagger mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} withWishlist />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-10 rounded-[28px] bg-paper p-8 text-center text-muted">
          Aucun soin ne correspond à cette recherche.
        </p>
      )}
    </div>
  );
}
