"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/ToastProvider";
import { formatCfa } from "@/lib/format";

type CatalogProduct = {
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

export function CatalogModal() {
  const {
    items,
    count,
    total,
    catalogOpen,
    setCatalogOpen,
    setOpen,
    addItemSilent,
    updateQuantity,
    removeItem,
  } = useCart();
  const { push } = useToast();

  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tous");

  // Fetch products once when modal opens
  useEffect(() => {
    if (!catalogOpen) return;
    if (products.length > 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: CatalogProduct[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [catalogOpen, products.length]);

  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set(products.map((p) => p.category)))],
    [products],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchQuery =
        !needle ||
        p.name.toLowerCase().includes(needle) ||
        p.subtitle.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle);
      const matchCategory = category === "Tous" || p.category === category;
      return matchQuery && matchCategory;
    });
  }, [products, query, category]);

  function getItemQty(productId: number) {
    return items.find((item) => item.productId === productId)?.quantity ?? 0;
  }

  function handleAdd(product: CatalogProduct) {
    const currentQty = getItemQty(product.id);
    if (currentQty === 0) {
      // Use addItemSilent to avoid re-triggering the catalog modal open
      addItemSilent(
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
        },
        1,
      );
    } else {
      updateQuantity(product.id, currentQty + 1);
    }
    push(`${product.name} ajouté`);
  }

  function handleDecrement(product: CatalogProduct) {
    const currentQty = getItemQty(product.id);
    if (currentQty <= 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, currentQty - 1);
    }
  }

  function goToCart() {
    setCatalogOpen(false);
    setOpen(true);
  }

  if (!catalogOpen) return null;

  return (
    <div className="fixed inset-0 z-[55]">
      {/* Backdrop */}
      <button
        type="button"
        className="animate-fade-in absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={() => setCatalogOpen(false)}
        aria-label="Fermer"
      />

      {/* Modal */}
      <div className="animate-rise absolute inset-x-3 top-3 bottom-3 mx-auto flex max-w-lg flex-col overflow-hidden rounded-[28px] bg-paper shadow-2xl sm:inset-x-auto sm:inset-y-4 sm:w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-leaf/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛒</span>
            <div>
              <h2 className="font-display text-2xl text-leaf-dark">Créer mon panier</h2>
              {count > 0 && (
                <p className="text-xs text-muted">
                  {count} article{count > 1 ? "s" : ""} · {formatCfa(total)}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCatalogOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full bg-cream text-ink transition hover:bg-leaf-mist"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-leaf/10 px-5 py-3">
          <label className="relative block">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un soin..."
              className="h-11 w-full rounded-full bg-cream pl-10 pr-4 text-sm outline-none ring-leaf/20 focus:ring-2"
            />
          </label>
        </div>

        {/* Categories */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-leaf/10 px-5 py-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                category === cat
                  ? "bg-leaf text-cream"
                  : "border border-leaf/15 bg-paper text-leaf-dark hover:bg-cream"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product list */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex animate-pulse items-center gap-3 rounded-2xl bg-cream p-3">
                  <div className="h-16 w-16 rounded-xl bg-leaf/8" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-leaf/8" />
                    <div className="h-3 w-1/2 rounded bg-leaf/8" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-leaf/8" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">Aucun soin trouvé.</p>
          ) : (
            <div className="space-y-2">
              {filtered.map((product) => {
                const qty = getItemQty(product.id);
                const inCart = qty > 0;
                return (
                  <div
                    key={product.id}
                    className={`flex items-center gap-3 rounded-2xl border p-3 transition ${
                      inCart ? "border-leaf/30 bg-leaf-mist/50" : "border-leaf/10 bg-paper hover:bg-cream/60"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-leaf-dark">{product.name}</p>
                      <p className="text-sm text-leaf">
                        {formatCfa(product.price)}{" "}
                        <span className="text-xs text-muted">/ {product.volume}</span>
                      </p>
                    </div>

                    {inCart ? (
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleDecrement(product)}
                          className="grid h-9 w-9 place-items-center rounded-full border border-leaf/20 bg-paper text-leaf-dark transition hover:bg-cream"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium text-leaf-dark">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAdd(product)}
                          className="grid h-9 w-9 place-items-center rounded-full bg-leaf text-cream transition hover:bg-leaf-dark"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-leaf text-cream transition hover:bg-leaf-dark"
                      >
                        <Plus size={18} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer — cart summary */}
        {count > 0 && (
          <div className="border-t border-leaf/10 bg-cream px-5 py-4">
            {/* Mini cart items */}
            <div className="no-scrollbar -mx-1 mb-3 flex gap-2 overflow-x-auto px-1">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="relative shrink-0"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-12 w-12 rounded-xl border-2 border-paper object-cover"
                  />
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-leaf px-1 text-[10px] font-semibold text-cream">
                    {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted">
                  {count} article{count > 1 ? "s" : ""}
                </p>
                <p className="text-lg font-medium text-leaf-dark">{formatCfa(total)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goToCart}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-leaf/15 px-4 text-sm text-leaf-dark transition hover:bg-paper"
                >
                  <ShoppingBag size={15} /> Panier
                </button>
                <Link
                  href="/commande"
                  onClick={() => setCatalogOpen(false)}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-leaf px-5 text-sm font-medium text-cream transition hover:bg-leaf-dark"
                >
                  <Check size={15} /> Commander
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
