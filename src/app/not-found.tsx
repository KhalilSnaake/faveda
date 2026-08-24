import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">404</p>
      <h1 className="mt-2 font-display text-5xl text-leaf-dark">Page introuvable</h1>
      <p className="mt-3 text-muted">Cette page n’existe pas ou a été déplacée.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-leaf px-6 py-3 text-sm text-cream">
        Retour à l’accueil
      </Link>
    </main>
  );
}
