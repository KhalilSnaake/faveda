export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-leaf/8 ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-leaf/10 bg-paper">
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-end justify-between">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-11 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function TrackingSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 md:px-8">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="mt-3 h-12 w-2/3" />
      <div className="mt-8 grid gap-3 md:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14" />
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Skeleton className="h-80 rounded-[28px]" />
        <div className="space-y-4">
          <Skeleton className="h-40 rounded-[28px]" />
          <Skeleton className="h-40 rounded-[28px]" />
        </div>
      </div>
    </div>
  );
}
