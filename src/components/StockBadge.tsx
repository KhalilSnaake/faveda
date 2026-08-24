export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        Rupture de stock
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
        Plus que {stock} en stock
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-mist px-3 py-1 text-xs font-medium text-leaf-dark">
      <span className="h-2 w-2 rounded-full bg-leaf" />
      {stock} en stock
    </span>
  );
}
