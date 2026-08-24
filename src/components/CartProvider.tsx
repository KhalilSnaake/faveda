"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { computeDeliveryFee } from "@/lib/catalog";

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock?: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  catalogOpen: boolean;
  setCatalogOpen: (value: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  addItemSilent: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "faveda-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.productId === item.productId);
      const max = item.stock ?? existing?.stock ?? 20;
      if (existing) {
        return current.map((entry) =>
          entry.productId === item.productId
            ? { ...entry, quantity: Math.min(max, entry.quantity + quantity), stock: max }
            : entry,
        );
      }
      return [...current, { ...item, quantity: Math.min(max, quantity), stock: max }];
    });
    // Open the catalog modal instead of the cart drawer
    setCatalogOpen(true);
  }, []);

  // Same as addItem but doesn't open the catalog (used inside catalog modal)
  const addItemSilent = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.productId === item.productId);
      const max = item.stock ?? existing?.stock ?? 20;
      if (existing) {
        return current.map((entry) =>
          entry.productId === item.productId
            ? { ...entry, quantity: Math.min(max, entry.quantity + quantity), stock: max }
            : entry,
        );
      }
      return [...current, { ...item, quantity: Math.min(max, quantity), stock: max }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((current) =>
      current
        .map((entry) => {
          if (entry.productId !== productId) return entry;
          const max = entry.stock ?? 20;
          return { ...entry, quantity: Math.min(max, quantity) };
        })
        .filter((entry) => entry.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((current) => current.filter((entry) => entry.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = computeDeliveryFee(subtotal);
    return {
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      open,
      setOpen,
      catalogOpen,
      setCatalogOpen,
      addItem,
      addItemSilent,
      updateQuantity,
      removeItem,
      clear,
    };
  }, [addItem, addItemSilent, catalogOpen, clear, items, open, removeItem, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
