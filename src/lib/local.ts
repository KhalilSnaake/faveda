export type SavedOrder = {
  trackingCode: string;
  confirmationCode: string;
  total: number;
  createdAt: string;
};

export type SavedProfile = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  city: string;
  landmark: string;
};

const ORDERS_KEY = "faveda-orders";
const PROFILE_KEY = "faveda-profile";
const WISHLIST_KEY = "faveda-wishlist";

export function readOrders(): SavedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]") as SavedOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: SavedOrder) {
  const next = [order, ...readOrders().filter((item) => item.trackingCode !== order.trackingCode)].slice(0, 12);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
}

export function readProfile(): SavedProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(localStorage.getItem(PROFILE_KEY) || "null") as SavedProfile | null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveProfile(profile: SavedProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function readWishlist(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]") as number[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleWishlistId(productId: number) {
  const current = readWishlist();
  const next = current.includes(productId)
    ? current.filter((id) => id !== productId)
    : [...current, productId];
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  return next;
}

const NOTIF_SEEN_KEY = "faveda-notif-seen";

export function readTrackingCodes(): string[] {
  return readOrders().map((order) => order.trackingCode);
}

export function getNotifLastSeen(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(NOTIF_SEEN_KEY);
  return raw ? Number(raw) || 0 : 0;
}

export function setNotifLastSeen(timestamp: number) {
  localStorage.setItem(NOTIF_SEEN_KEY, String(timestamp));
}
