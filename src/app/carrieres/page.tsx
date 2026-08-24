"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Briefcase, Clock, MapPin, Send, Sprout } from "lucide-react";

type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  contract: string;
  description: string;
  requirements: string;
  createdAt: string;
};

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  experience: "",
  profileLink: "",
  message: "",
};

export default function CarrieresPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobId, setJobId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/jobs", { cache: "no-store" });
      if (res.ok) setJobs((await res.json()) as Job[]);
      setLoading(false);
    })();
  }, []);

  const selectedJob = jobs.find((job) => job.id === jobId) ?? null;

  function applyTo(job: Job) {
    setJobId(job.id);
    setSuccess("");
    setError("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goSpontaneous() {
    setJobId(null);
    setSuccess("");
    setError("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, jobId }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Envoi impossible");
      setSuccess(
        selectedJob
          ? `Merci ${form.fullName} ! Votre candidature pour « ${selectedJob.title} » a bien été envoyée.`
          : `Merci ${form.fullName} ! Votre candidature spontanée a bien été envoyée.`,
      );
      setForm(emptyForm);
      setJobId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-[36px] bg-leaf-dark p-8 text-cream md:p-12">
        <p className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
          <Sprout size={13} /> Rejoignez Faveda
        </p>
        <h1 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
          Cultivez votre avenir avec les plantes
        </h1>
        <p className="mt-4 max-w-2xl text-cream/80">
          Faveda grandit : logistique, atelier, communication. Découvrez nos offres ouvertes ou envoyez-nous
          une candidature spontanée, nous regardons chaque profil avec attention.
        </p>
        <button
          type="button"
          onClick={goSpontaneous}
          className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-cream px-6 text-sm font-medium text-leaf-dark transition hover:bg-white"
        >
          <Send size={16} /> Candidature spontanée
        </button>
      </section>

      {/* Jobs */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Offres ouvertes</p>
            <h2 className="font-display text-4xl text-leaf-dark">Nos postes à pourvoir</h2>
          </div>
          <span className="rounded-full bg-leaf-mist px-3 py-1 text-sm text-leaf-dark">{jobs.length}</span>
        </div>

        {loading ? (
          <p className="mt-6 text-sm text-muted">Chargement des offres...</p>
        ) : jobs.length === 0 ? (
          <p className="mt-6 rounded-[28px] bg-paper p-8 text-center text-muted">
            Aucune offre ouverte pour le moment. Envoyez-nous une candidature spontanée !
          </p>
        ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <article key={job.id} className="flex flex-col rounded-2xl border border-leaf/10 bg-paper p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gold-deep">{job.department}</p>
                    <h3 className="mt-0.5 truncate font-display text-lg leading-tight text-leaf-dark">{job.title}</h3>
                  </div>
                  <Briefcase size={15} className="mt-0.5 shrink-0 text-leaf/40" />
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2 py-0.5">
                    <MapPin size={10} /> {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2 py-0.5">
                    <Clock size={10} /> {job.contract}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted">{job.description}</p>
                {job.requirements && (
                  <p className="mt-1.5 line-clamp-1 text-[11px] text-muted/80" title={job.requirements.split("\n").join(" · ")}>
                    Profil : {job.requirements.split("\n").filter(Boolean).join(" · ")}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => applyTo(job)}
                  className="mt-3 inline-flex h-9 items-center justify-center rounded-full bg-leaf text-xs text-cream transition hover:bg-leaf-dark"
                >
                  Postuler
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Application form */}
      <section ref={formRef} className="mt-14 scroll-mt-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Formulaire</p>
            <h2 className="mt-2 font-display text-4xl text-leaf-dark">
              {selectedJob ? "Postuler" : "Candidature spontanée"}
            </h2>
            <p className="mt-3 text-muted">
              {selectedJob
                ? `Vous candidatez pour le poste « ${selectedJob.title} » (${selectedJob.department}).`
                : "Aucun poste ne correspond ? Présentez-nous votre profil : atelier, livraison, vente, communication... nous pensons à vous pour la suite."}
            </p>
            <div className="mt-6 rounded-2xl bg-leaf-mist p-4 text-sm text-leaf-dark">
              <p className="font-medium">Type de candidature</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setJobId(null)}
                  className={`rounded-full px-3 py-1.5 text-xs ${jobId === null ? "bg-leaf text-cream" : "bg-paper text-leaf-dark"}`}
                >
                  Spontanée
                </button>
                {jobs.map((job) => (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => setJobId(job.id)}
                    className={`rounded-full px-3 py-1.5 text-xs ${jobId === job.id ? "bg-leaf text-cream" : "bg-paper text-leaf-dark"}`}
                  >
                    {job.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-[28px] border border-leaf/10 bg-paper p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nom complet *" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} required />
              <Field label="Téléphone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field label="Ville" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
              <Field label="Expérience (années / domaine)" value={form.experience} onChange={(v) => setForm({ ...form, experience: v })} />
              <Field label="Lien profil (LinkedIn, portfolio...)" value={form.profileLink} onChange={(v) => setForm({ ...form, profileLink: v })} />
            </div>
            <label className="mt-4 block text-sm">
              <span className="mb-1.5 block text-muted">Message de motivation *</span>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                required
                className="w-full rounded-2xl border border-leaf/10 bg-cream px-4 py-3 outline-none ring-leaf/30 focus:ring-2"
                placeholder="Parlez-nous de vous, de votre parcours et de ce qui vous attire chez Faveda..."
              />
            </label>
            {error && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            {success && <p className="mt-3 rounded-xl bg-leaf-mist px-3 py-2 text-sm text-leaf-dark">{success}</p>}
            <button
              type="submit"
              disabled={sending}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-leaf text-sm font-medium text-cream transition hover:bg-leaf-dark disabled:opacity-70"
            >
              <Send size={16} /> {sending ? "Envoi en cours..." : "Envoyer ma candidature"}
            </button>
            <p className="mt-3 text-center text-xs text-muted">
              Vos données sont utilisées uniquement dans le cadre du recrutement Faveda.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-2xl border border-leaf/10 bg-cream px-4 outline-none ring-leaf/30 focus:ring-2"
      />
    </label>
  );
}
