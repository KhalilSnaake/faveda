export function resolveSupabaseStorageUrl(value?: string | null): string {
  if (!value) return "";

  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const normalized = trimmed.replace(/\\/g, "/");
  if (normalized.startsWith("/images/") || normalized.startsWith("images/")) return normalized.startsWith("/") ? normalized : `/${normalized}`;

  const baseUrl = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
  if (!baseUrl) return trimmed;

  const bucket = (process.env.SUPABASE_STORAGE_BUCKET || "images").replace(/^\/+|\/+$/g, "");
  const productMatch = normalized.replace(/^\/+/, "").match(/^((?:images\/)?(?:produits|products)\/.*)$/i);
  if (!productMatch) return trimmed;

  return `${baseUrl}/storage/v1/object/public/${bucket}/${productMatch[1].replace(/^images\//i, "")}`;
}

export function normalizeProductImage<T extends { image?: string | null }>(product: T): T {
  return {
    ...product,
    image: resolveSupabaseStorageUrl(product.image),
  };
}

export function normalizeProductImages<T extends { image?: string | null }>(productsList: T[]): T[] {
  return productsList.map((product) => normalizeProductImage(product));
}
