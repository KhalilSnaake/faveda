import Link from "next/link";
import { ArrowRight, Eye, Leaf, MapPinned, Play, ShieldCheck, Sparkles, Timer, Truck } from "lucide-react";
import { db } from "@/db";
import { products, videos } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { AddToCartButton } from "@/components/AddToCartButton";
import { FREE_DELIVERY_FROM, faqs, testimonials, socialLinks } from "@/lib/catalog";
import { formatCfa } from "@/lib/format";
import { NewsletterForm } from "@/components/NewsletterForm";
import { FaqList } from "@/components/FaqList";
import { normalizeProductImages } from "@/lib/storage";
import { asc, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureSeeded();
  const rows = normalizeProductImages(await db.select().from(products).orderBy(asc(products.id)));
  const featured = rows.filter((product) => product.featured).slice(0, 4);
  const topVideos = await db.select().from(videos).orderBy(desc(videos.views)).limit(4);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/18237448/pexels-photo-18237448.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2200"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-leaf-deep/92 via-leaf-dark/78 to-leaf/35" />
        </div>
        <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-end px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8">
          <div className="max-w-xl text-cream">
            <p className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
              <Leaf size={13} /> Pharmacie des plantes
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] md:text-7xl">
              La nature, mise en bouteille pour votre bien-être.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-cream/80 md:text-lg">
              Faveda compose des soins naturels à partir des plantes, écorces et extraits médicinaux.
              Ongles, ventre, peau, rituels détox : chaque formule est pensée pour durer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/produits"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-cream px-6 text-sm font-medium text-leaf-dark"
              >
                Découvrir la boutique <ArrowRight size={16} />
              </Link>
              <Link
                href="/suivi"
                className="inline-flex h-12 items-center rounded-full border border-cream/30 px-6 text-sm text-cream"
              >
                Suivre une commande
              </Link>
            </div>
          </div>
          <div className="mt-10 rounded-[32px] border border-white/15 bg-white/10 p-5 backdrop-blur-md md:mt-0">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Sélection du moment</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {featured.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  href={`/produits/${product.slug}`}
                  className="overflow-hidden rounded-3xl bg-cream/10"
                >
                  <img src={product.image} alt={product.name} className="h-36 w-full object-cover" />
                  <p className="px-3 py-2 text-xs text-cream">{product.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-8 md:grid-cols-4 md:px-8">
        {[
          { icon: Leaf, title: "100 % végétal", text: "Plantes, écorces et extraits, sans chimie superflue." },
          { icon: Truck, title: "Livraison soignée", text: `Offerte dès ${formatCfa(FREE_DELIVERY_FROM)}.` },
          { icon: MapPinned, title: "Position GPS", text: "Partagez votre localisation pour un dépôt précis." },
          { icon: ShieldCheck, title: "Code secret", text: "4 chiffres pour confirmer chaque livraison." },
        ].map((item) => (
          <div key={item.title} className="rounded-[28px] border border-leaf/10 bg-paper p-5">
            <item.icon className="text-leaf" size={22} />
            <h3 className="mt-4 font-display text-2xl text-leaf-dark">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">La collection</p>
            <h2 className="font-display text-4xl text-leaf-dark md:text-5xl">Soins Faveda</h2>
          </div>
          <Link href="/produits" className="hidden items-center gap-2 text-sm text-leaf md:inline-flex">
            Toute la boutique <ArrowRight size={16} />
          </Link>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
          {featured.map((product) => (
            <article
              key={product.id}
              className="group w-[148px] shrink-0 rounded-2xl border border-leaf/10 bg-paper p-2.5 transition hover:-translate-y-0.5 hover:border-leaf/25 hover:shadow-[0_14px_34px_rgba(36,48,28,0.1)] sm:w-auto sm:flex-1"
            >
              <Link href={`/produits/${product.slug}`} className="block overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </Link>
              <Link href={`/produits/${product.slug}`} className="mt-2 block px-0.5">
                <p className="truncate text-sm font-medium leading-5 text-leaf-dark">{product.name}</p>
              </Link>
              <div className="mt-1 flex items-center justify-between gap-2 px-0.5">
                <p className="truncate text-xs font-medium text-leaf">{formatCfa(product.price)}</p>
                <AddToCartButton product={product} icon />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[36px] bg-leaf-dark text-cream md:grid-cols-2">
          <img src="/images/atelier-faveda.jpg" alt="Atelier Faveda" className="h-full min-h-[360px] w-full object-cover" />
          <div className="p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Maison Faveda</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Des recettes de plantes, transmises puis affinées.
            </h2>
            <p className="mt-5 text-sm leading-7 text-cream/75">
              Chaque soin naît d’une plante, d’une écorce, d’une infusion. Nous préparons nos formules
              pour le confort digestif, les ongles, la peau et les rituels de bien-être — avec la même exigence artisanale.
            </p>
            <Link
              href="/a-propos"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-cream px-5 text-sm text-leaf-dark"
            >
              Notre histoire <Sparkles size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Comment ça se passe</p>
        <h2 className="mt-2 font-display text-4xl text-leaf-dark">Commander n’a jamais été aussi fluide</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            { step: "01", title: "Choisissez", text: "Ajoutez vos soins au panier en un geste." },
            { step: "02", title: "Indiquez l’adresse", text: "Livraison + partage de votre position GPS." },
            { step: "03", title: "Payez", text: "Espèces, Wave, Orange Money, MTN ou carte." },
            { step: "04", title: "Suivez", text: "Un code de suivi et un code secret à 4 chiffres." },
          ].map((item) => (
            <div key={item.step} className="rounded-[28px] bg-paper p-6 shadow-[0_16px_40px_rgba(36,48,28,0.05)]">
              <p className="font-display text-3xl text-gold">{item.step}</p>
              <h3 className="mt-3 font-display text-2xl text-leaf-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {topVideos.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Faveda en vidéo</p>
              <h2 className="font-display text-4xl text-leaf-dark md:text-5xl">Tutos, coulisses & routines</h2>
            </div>
            <Link href="/videos" className="hidden items-center gap-2 text-sm text-leaf md:inline-flex">
              Toutes les vidéos <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topVideos.map((video) => (
              <Link
                key={video.id}
                href="/videos"
                className="group relative overflow-hidden rounded-[24px]"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="aspect-[9/16] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream/20 text-cream backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-cream/30">
                  <Play size={18} fill="currentColor" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-center gap-2 text-cream/70 text-[11px]">
                    <Eye size={11} /> {video.views >= 1000 ? `${(video.views / 1000).toFixed(1).replace(/\.0$/, "")}k` : video.views}
                    <Timer size={11} className="ml-1" /> {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}
                  </div>
                  <h3 className="mt-1 font-display text-lg leading-tight text-cream">{video.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-cream hover:bg-leaf-deep">
              TikTok
            </a>
            <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-4 py-2 text-sm text-white hover:bg-[#CC0000]">
              YouTube
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-4 py-2 text-sm text-white">
              Instagram
            </a>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Ils nous font confiance</p>
        <h2 className="mt-2 font-display text-4xl text-leaf-dark">Paroles de clients</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.name} className="rounded-[28px] bg-paper p-6">
              <p className="text-sm leading-7 text-ink/80">“{item.text}”</p>
              <footer className="mt-4 text-sm text-leaf-dark">
                {item.name} · {item.city}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Questions fréquentes</p>
          <h2 className="mt-2 font-display text-4xl text-leaf-dark">Tout ce qu’il faut savoir</h2>
          <FaqList items={faqs} />
        </div>
        <div className="rounded-[32px] bg-leaf-dark p-8 text-cream">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Le journal Faveda</p>
          <h2 className="mt-2 font-display text-4xl">Conseils plantes & offres</h2>
          <p className="mt-3 text-sm text-cream/75">
            Recevez nos rituels saisonniers et les codes promo en avant-première.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
