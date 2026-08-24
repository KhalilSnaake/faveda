import Link from "next/link";

export const metadata = {
  title: "Maison Faveda",
};

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/6694191/pexels-photo-6694191.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1800"
          alt=""
          className="h-[420px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-leaf-deep/70" />
        <div className="absolute inset-0 mx-auto flex max-w-5xl flex-col justify-end px-5 pb-12 md:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Depuis l’atelier</p>
          <h1 className="mt-2 font-display text-5xl text-cream md:text-6xl">Maison Faveda</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="font-display text-4xl text-leaf-dark">Des plantes, rien d’autre.</h2>
          <p className="mt-4 leading-7 text-muted">
            Faveda prépare des solutions de santé, de bien-être et de soins corporels à partir de plantes
            médicinales. Nos formules — traitements des ongles, douleurs au ventre, tisanes d’écorces,
            soin tête noire et lotion corporelle — s’inspirent de recettes traditionnelles, affinées pour
            un usage quotidien simple et sûr.
          </p>
          <p className="mt-4 leading-7 text-muted">
            Chaque lot est pensé pour rester proche de la plante : infusions, décoctions, extraits et
            émulsions végétales. Pas de promesses excessives, juste le geste d’une maison botanique.
          </p>
        </div>
        <img src="/images/atelier-faveda.jpg" alt="Atelier Faveda" className="h-full rounded-[32px] object-cover" />
      </section>

      <section className="bg-leaf-dark py-16 text-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-3 md:px-8">
          {[
            { title: "Sélection botanique", text: "Écorces, feuilles et extraits choisis pour leur usage traditionnel." },
            { title: "Préparation soignée", text: "Tisanes, lotions et traitements conditionnés dans notre atelier." },
            { title: "Livraison suivie", text: "Un code de suivi et un code secret à 4 chiffres pour chaque commande." },
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] bg-white/5 p-6">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-cream/75">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8">
        <h2 className="font-display text-4xl text-leaf-dark">Prêt à composer votre rituel ?</h2>
        <Link href="/produits" className="mt-6 inline-flex rounded-full bg-leaf px-6 py-3 text-sm text-cream">
          Explorer la boutique
        </Link>
      </section>
    </main>
  );
}
