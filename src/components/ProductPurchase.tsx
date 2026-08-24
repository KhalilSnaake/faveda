"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AddToCartButton } from "@/components/AddToCartButton";

type ProductPurchaseProps = {
  product: {
    id: number;
    slug: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  };
};

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="rounded-[28px] border border-leaf/10 bg-paper p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{product.stock} en stock</p>
        <div className="inline-flex items-center rounded-full bg-cream">
          <button type="button" className="p-3" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
            <Minus size={16} />
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button type="button" className="p-3" onClick={() => setQuantity((value) => Math.min(10, value + 1))}>
            <Plus size={16} />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <AddToCartButton product={product} quantity={quantity} />
      </div>
    </div>
  );
}
