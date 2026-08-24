"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatCfa } from "@/lib/format";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, deliveryFee, total } = useCart();

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Votre sélection</p>
      <h1 className="mt-2 font-display text-5xl text-leaf-dark">Panier</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-[32px] bg-paper p-10 text-center">
          <p className="font-display text-3xl text-leaf-dark">Rien pour le moment</p>
          <p className="mt-2 text-muted">Parcourez la boutique et composez votre rituel Faveda.</p>
          <Link href="/produits" className="mt-6 inline-flex rounded-full bg-leaf px-6 py-3 text-sm text-cream">
            Voir les produits
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 rounded-[28px] border border-leaf/10 bg-paper p-4">
                <img src={item.image} alt="" className="h-28 w-24 rounded-2xl object-cover" />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link href={`/produits/${item.slug}`} className="font-display text-2xl text-leaf-dark">
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted">{formatCfa(item.price)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full bg-cream">
                      <button type="button" className="p-2" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button type="button" className="p-2" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button type="button" onClick={() => removeItem(item.productId)} className="text-muted">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-[28px] bg-leaf-dark p-6 text-cream">
            <h2 className="font-display text-3xl">Récapitulatif</h2>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between text-cream/75">
                <span>Sous-total</span>
                <span>{formatCfa(subtotal)}</span>
              </div>
              <div className="flex justify-between text-cream/75">
                <span>Livraison</span>
                <span>{deliveryFee === 0 ? "Offerte" : formatCfa(deliveryFee)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 text-base">
                <span>Total</span>
                <span>{formatCfa(total)}</span>
              </div>
            </div>
            <Link
              href="/commande"
              className="mt-6 flex h-12 items-center justify-center rounded-full bg-cream text-sm font-medium text-leaf-dark"
            >
              Continuer vers la livraison
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
