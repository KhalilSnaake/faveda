"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatCfa } from "@/lib/format";

export function CartDrawer() {
  const { items, open, setOpen, updateQuantity, removeItem, subtotal, deliveryFee, total } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="animate-fade-in absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-label="Fermer le panier"
      />
      <aside className="animate-slide-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-leaf/10 px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Votre sélection</p>
            <h2 className="font-display text-3xl text-leaf-dark">Panier</h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full bg-cream"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="rounded-3xl bg-cream p-8 text-center">
              <p className="font-display text-2xl text-leaf-dark">Votre panier est encore vide</p>
              <p className="mt-2 text-sm text-muted">Découvrez les soins Faveda et composez votre rituel.</p>
              <Link
                href="/produits"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex rounded-full bg-leaf px-5 py-2.5 text-sm text-cream"
              >
                Voir la boutique
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex gap-3 rounded-3xl border border-leaf/10 p-3">
                <img src={item.image} alt="" className="h-20 w-20 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-leaf-dark">{item.name}</p>
                  <p className="text-sm text-muted">{formatCfa(item.price)}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full bg-cream">
                      <button type="button" className="p-2" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button type="button" className="p-2" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button type="button" onClick={() => removeItem(item.productId)} className="text-muted hover:text-leaf">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-leaf/10 bg-cream px-5 py-5">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted">
                <span>Sous-total</span>
                <span>{formatCfa(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Livraison</span>
                <span>{deliveryFee === 0 ? "Offerte" : formatCfa(deliveryFee)}</span>
              </div>
              <div className="flex justify-between pt-2 font-medium text-leaf-dark">
                <span>Total</span>
                <span>{formatCfa(total)}</span>
              </div>
            </div>
            <Link
              href="/commande"
              onClick={() => setOpen(false)}
              className="mt-4 flex h-12 items-center justify-center rounded-full bg-leaf text-sm font-medium text-cream transition hover:bg-leaf-dark"
            >
              Valider ma commande
            </Link>
            <Link
              href="/panier"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-11 items-center justify-center text-sm text-leaf-dark"
            >
              Voir le panier
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
