"use client";

import { useMemo, useState } from "react";
import { Eye, ExternalLink, Play, Search, ShoppingBag, Timer, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/ToastProvider";
import { formatCfa } from "@/lib/format";

type Video = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  platform: string;
  externalUrl: string | null;
  duration: number;
  views: number;
  productSlug: string | null;
  featured: boolean;
  published: boolean;
};

type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  stock: number;
};

function formatViews(views: number) {
  if (views >= 1000) return `${(views / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(views);
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function platformIcon(platform: string) {
  switch (platform) {
    case "tiktok":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.08A6.33 6.33 0 0 0 3 15.64 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.33V9.14a8.16 8.16 0 0 0 3.89.99V6.69Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    default:
      return <Play className="h-4 w-4" />;
  }
}

function platformLabel(platform: string) {
  switch (platform) {
    case "tiktok": return "TikTok";
    case "youtube": return "YouTube";
    case "instagram": return "Instagram";
    default: return "Faveda";
  }
}

export function VideoGallery({ videos, products }: { videos: Video[]; products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tous");
  const [platform, setPlatform] = useState("all");
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const { addItem } = useCart();
  const { push } = useToast();

  const categories = ["Tous", ...Array.from(new Set(videos.map((v) => v.category)))];
  const platforms = ["all", ...Array.from(new Set(videos.map((v) => v.platform)))];

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return videos.filter((v) => {
      const matchQuery = !needle || v.title.toLowerCase().includes(needle) || v.description.toLowerCase().includes(needle);
      const matchCat = category === "Tous" || v.category === category;
      const matchPlat = platform === "all" || v.platform === platform;
      return matchQuery && matchCat && matchPlat && v.published !== false;
    });
  }, [videos, query, category, platform]);

  const featured = videos.filter((v) => v.featured).slice(0, 3);

  function openVideo(video: Video) {
    setActiveVideo(video);
    void fetch(`/api/videos/${video.slug}/views`, { method: "POST" });
  }

  const linkedProduct = activeVideo?.productSlug
    ? products.find((p) => p.slug === activeVideo.productSlug) ?? null
    : null;

  return (
    <>
      {/* Featured hero strip */}
      {featured.length > 0 && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {featured.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => openVideo(video)}
              className="group relative overflow-hidden rounded-[28px] text-left"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="aspect-[9/16] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-2 text-cream/80">
                  {platformIcon(video.platform)}
                  <span className="text-xs">{platformLabel(video.platform)}</span>
                  <span className="text-xs">·</span>
                  <Eye size={12} />
                  <span className="text-xs">{formatViews(video.views)}</span>
                </div>
                <h3 className="mt-2 font-display text-2xl leading-tight text-cream">{video.title}</h3>
              </div>
              <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream/20 text-cream backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-cream/30">
                <Play size={22} fill="currentColor" />
              </div>
              <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-ink/60 px-2.5 py-1 text-xs text-cream">
                <Timer size={12} /> {formatDuration(video.duration)}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="mt-10 rounded-[28px] border border-leaf/10 bg-paper p-4 md:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un tutoriel, une routine..."
              className="h-12 w-full rounded-full bg-cream pl-11 pr-4 text-sm outline-none ring-leaf/20 focus:ring-2"
            />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm ${category === cat ? "bg-leaf text-cream" : "bg-cream text-leaf-dark"}`}
            >
              {cat}
            </button>
          ))}
          <span className="mx-1 self-center text-leaf/20">|</span>
          {platforms.map((plat) => (
            <button
              key={plat}
              type="button"
              onClick={() => setPlatform(plat)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm ${platform === plat ? "bg-leaf text-cream" : "bg-cream text-leaf-dark"}`}
            >
              {plat === "all" ? "Tous" : <>{platformIcon(plat)} {platformLabel(plat)}</>}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <p className="mt-5 text-sm text-muted">{filtered.length} vidéo{filtered.length > 1 ? "s" : ""}</p>
      <div className="stagger mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((video) => {
          const product = video.productSlug ? products.find((p) => p.slug === video.productSlug) : null;
          return (
            <article key={video.id} className="animate-rise group overflow-hidden rounded-[24px] border border-leaf/10 bg-paper">
              <button type="button" onClick={() => openVideo(video)} className="relative block w-full text-left">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="aspect-[9/16] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream/20 text-cream backdrop-blur-sm transition group-hover:scale-110">
                  <Play size={18} fill="currentColor" />
                </div>
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/60 px-2 py-0.5 text-[11px] text-cream">
                  <Timer size={11} /> {formatDuration(video.duration)}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink/50 px-2 py-0.5 text-[11px] text-cream">
                    {platformIcon(video.platform)} {platformLabel(video.platform)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink/50 px-2 py-0.5 text-[11px] text-cream">
                    <Eye size={11} /> {formatViews(video.views)}
                  </span>
                </div>
              </button>
              <div className="p-4">
                <span className="text-[11px] uppercase tracking-[0.14em] text-gold-deep">{video.category}</span>
                <h3 className="mt-1 font-display text-xl leading-tight text-leaf-dark">{video.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted">{video.description}</p>
                {product && (
                  <Link href={`/produits/${product.slug}`} className="mt-3 flex items-center gap-2 rounded-2xl bg-cream p-2">
                    <img src={product.image} alt="" className="h-10 w-10 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs text-leaf-dark">{product.name}</p>
                      <p className="text-xs text-leaf">{formatCfa(product.price)}</p>
                    </div>
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <p className="mt-10 rounded-[28px] bg-paper p-8 text-center text-muted">
          Aucune vidéo ne correspond à cette recherche.
        </p>
      )}

      {/* Video modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            className="animate-fade-in absolute inset-0 bg-ink/80 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
            aria-label="Fermer"
          />
          <div className="animate-rise absolute inset-x-4 top-4 bottom-4 mx-auto flex max-w-lg flex-col overflow-hidden rounded-[32px] bg-ink md:inset-x-auto md:max-w-sm">
            {/* Close */}
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink/60 text-cream"
            >
              <X size={18} />
            </button>

            {/* Video */}
            <div className="relative flex-1">
              <video
                src={activeVideo.videoUrl}
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            </div>

            {/* Info */}
            <div className="space-y-3 p-5 text-cream">
              <div className="flex items-center gap-2 text-cream/70">
                {platformIcon(activeVideo.platform)}
                <span className="text-xs">{platformLabel(activeVideo.platform)}</span>
                <span className="text-xs">·</span>
                <Eye size={12} />
                <span className="text-xs">{formatViews(activeVideo.views)} vues</span>
                <span className="text-xs">·</span>
                <Timer size={12} />
                <span className="text-xs">{formatDuration(activeVideo.duration)}</span>
              </div>
              <h2 className="font-display text-2xl">{activeVideo.title}</h2>
              <p className="text-sm leading-6 text-cream/70">{activeVideo.description}</p>

              {linkedProduct && (
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                  <img src={linkedProduct.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{linkedProduct.name}</p>
                    <p className="text-sm text-gold">{formatCfa(linkedProduct.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addItem({
                        productId: linkedProduct.id,
                        slug: linkedProduct.slug,
                        name: linkedProduct.name,
                        price: linkedProduct.price,
                        image: linkedProduct.image,
                        stock: linkedProduct.stock,
                      });
                      push(`${linkedProduct.name} ajouté`);
                    }}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-leaf text-cream"
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                {activeVideo.externalUrl && (
                  <a
                    href={activeVideo.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cream py-3 text-sm text-leaf-dark"
                  >
                    <ExternalLink size={14} /> Voir sur {platformLabel(activeVideo.platform)}
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-cream/20 py-3 text-sm text-cream"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
