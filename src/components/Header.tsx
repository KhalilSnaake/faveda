"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Menu, PackageSearch, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { NotificationBell } from "@/components/NotificationBell";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/produits", label: "Boutique" },
  { href: "/videos", label: "Vidéos" },
  { href: "/a-propos", label: "Maison Faveda" },
  { href: "/carrieres", label: "Carrières" },
  { href: "/suivi", label: "Suivi" },
];

export function Header() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const hideChrome = pathname.startsWith("/admin") || pathname.startsWith("/livreur");

  if (hideChrome) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-leaf/10 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        <Link href="/" className="flex items-center" aria-label="Faveda — accueil">
          <img
            src="/images/logo-faveda.png"
            alt="Faveda — Tisane traditionnelle à base de plantes"
            className="h-16 w-auto md:h-20"
          />
        </Link>

        <nav className="hidden items-center gap-5 md:flex xl:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition ${
                pathname === link.href ? "text-leaf-dark" : "text-muted hover:text-leaf"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden h-11 items-center gap-2 rounded-full bg-leaf px-4 text-sm font-medium text-cream transition hover:bg-leaf-dark lg:inline-flex"
          >
            <LogIn size={16} />
            Connexion
          </Link>
          <Link
            href="/produits"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-leaf/15 bg-paper text-leaf-dark transition hover:bg-leaf-mist sm:inline-flex"
            aria-label="Rechercher"
          >
            <PackageSearch size={18} />
          </Link>
          <NotificationBell />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-leaf/15 bg-paper text-leaf-dark transition hover:bg-leaf-mist"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="animate-badge-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-leaf px-1 text-[10px] font-semibold text-cream" key={count}>
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-leaf/15 bg-paper text-leaf-dark md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-leaf/10 bg-cream px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-3 py-2 text-leaf-dark hover:bg-leaf-mist"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-2xl bg-leaf px-3 py-2 text-cream"
            >
              <LogIn size={16} /> Connexion
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
