"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, MapPin, Phone } from "lucide-react";
import { socialLinks } from "@/lib/catalog";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/livreur")) return null;
  return (
    <footer className="border-t border-leaf/10 bg-leaf-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <img
            src="/images/logo-faveda.png"
            alt="Faveda — Tisane traditionnelle à base de plantes"
            className="h-24 w-auto rounded-xl md:h-28"
          />
          <p className="mt-5 max-w-md text-sm leading-7 text-cream/75">
            Solutions naturelles à base de plantes, d’écorces et d’extraits botaniques.
            Des soins authentiques pour le corps, le confort digestif et le bien-être au quotidien.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Explorer</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-cream/80">
            <Link href="/produits" className="hover:text-cream">Boutique</Link>
            <Link href="/videos" className="hover:text-cream">Vidéos</Link>
            <Link href="/a-propos" className="hover:text-cream">Maison Faveda</Link>
            <Link href="/suivi" className="hover:text-cream">Suivi de commande</Link>
            <Link href="/mes-commandes" className="hover:text-cream">Mes commandes</Link>
            <Link href="/contact" className="hover:text-cream">Contact & avis</Link>
            <Link href="/carrieres" className="hover:text-cream">Carrières & emplois</Link>
          </div>
        </div>

        <div className="space-y-3 text-sm text-cream/80">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Contact</p>
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 text-gold" />
            Atelier botanique, Abidjan
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} className="text-gold" />
            +225 07 00 11 22 33
          </p>
          <p className="flex items-center gap-2">
            <Leaf size={16} className="text-gold" />
            hello@faveda.ci
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-gold mt-4">Réseaux</p>
          <div className="mt-2 flex gap-3">
            <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-cream/70 hover:bg-white/20 hover:text-cream" aria-label="TikTok">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.08A6.33 6.33 0 0 0 3 15.64 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.33V9.14a8.16 8.16 0 0 0 3.89.99V6.69Z"/></svg>
            </a>
            <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-cream/70 hover:bg-white/20 hover:text-cream" aria-label="YouTube">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-cream/70 hover:bg-white/20 hover:text-cream" aria-label="Instagram">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838A6.162 6.162 0 1 0 12 18.163 6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-cream/70 hover:bg-white/20 hover:text-cream" aria-label="Facebook">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-cream/55">
        © {new Date().getFullYear()} Faveda — Soins naturels à base de plantes.
      </div>
    </footer>
  );
}
