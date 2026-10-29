"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, ChevronLeft, Eye, EyeOff, Users } from "lucide-react";
import { formatDate } from "@/lib/format";

type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  contract: string;
  description: string;
  requirements: string;
  active: boolean;
  createdAt: string;
};

type Application = {
  id: number;
  jobId: number | null;
  kind: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  experience: string | null;
  profileLink: string | null;
  message: string;
  status: string;
  createdAt: string;
  job: Job | null;
};

const statusLabels: Record<string, string> = {
  new: "Nouvelle",
  contacted: "Contacté(e)",
  interview: "Entretien",
  hired: "Retenu(e)",
  rejected: "Refusé(e)",
};

export default function AdminRecruitmentPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<"jobs" | "applications">("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "Abidjan",
    contract: "Temps plein",
    description: "",
    requirements: "",
  });
  const [error, setError] = useState("");

  const bootstrap = useCallback(async () => {
    const session = await fetch("/api/admin/session", { cache: "no-store" });
    const data = (await session.json()) as { authenticated: boolean };
    if (!data.authenticated) {
      router.replace("/admin/login");
      return;
    }
    const [jobsRes, appsRes] = await Promise.all([
      fetch("/api/admin/jobs", { cache: "no-store" }),
      fetch("/api/admin/applications", { cache: "no-store" }),
    ]);
    if (jobsRes.ok) setJobs((await jobsRes.json()) as Job[]);
    if (appsRes.ok) setApplications((await appsRes.json()) as Application[]);
    setReady(true);
  }, [router]);

  useEffect(() => {
    const timeout = window.setTimeout(() => void bootstrap(), 0);
    return () => window.clearTimeout(timeout);
  }, [bootstrap]);

  async function createJob() {
    setError("");
    const res = await fetch("/api/admin/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(data.error || "Création impossible");
      return;
    }
    setForm({ title: "", department: "", location: "Abidjan", contract: "Temps plein", description: "", requirements: "" });
    await bootstrap();
  }

  async function toggleJob(job: Job) {
    await fetch(`/api/admin/jobs/${job.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !job.active }),
    });
    await bootstrap();
  }

  async function setAppStatus(app: Application, status: string) {
    await fetch(`/api/admin/applications/${app.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await bootstrap();
  }

  if (!ready) {
    return <main className="px-5 py-24 text-center text-muted">Chargement du recrutement...</main>;
  }

  const newCount = applications.filter((a) => a.status === "new").length;

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-muted">
        <ChevronLeft size={16} /> Retour au dashboard
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold-deep">Recrutement</p>
          <h1 className="font-display text-5xl text-leaf-dark">Offres & candidatures</h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab("jobs")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${tab === "jobs" ? "bg-leaf text-cream" : "bg-paper text-leaf-dark"}`}
          >
            <Briefcase size={15} /> Offres ({jobs.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("applications")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${tab === "applications" ? "bg-leaf text-cream" : "bg-paper text-leaf-dark"}`}
          >
            <Users size={15} /> Candidatures ({applications.length})
            {newCount > 0 && <span className="rounded-full bg-gold px-1.5 text-[10px] font-semibold text-ink">{newCount}</span>}
          </button>
        </div>
      </div>

      {tab === "jobs" ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="h-fit rounded-[28px] bg-paper p-6">
            <h2 className="font-display text-3xl text-leaf-dark">Publier une offre</h2>
            <p className="mt-1 text-sm text-muted">L&apos;offre apparaît immédiatement sur la page /carrieres.</p>
            <div className="mt-4 space-y-3">
              <input placeholder="Intitulé du poste *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="h-11 w-full rounded-2xl border border-leaf/10 bg-cream px-3" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Service" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="h-11 rounded-2xl border border-leaf/10 bg-cream px-3" />
                <input placeholder="Lieu" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="h-11 rounded-2xl border border-leaf/10 bg-cream px-3" />
              </div>
              <input placeholder="Contrat (Temps plein, CDD...)" value={form.contract} onChange={(e) => setForm({ ...form, contract: e.target.value })} className="h-11 w-full rounded-2xl border border-leaf/10 bg-cream px-3" />
              <textarea placeholder="Description du poste *" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-2xl border border-leaf/10 bg-cream px-3 py-2" />
              <textarea placeholder="Profil recherché (une ligne par critère)" rows={3} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className="w-full rounded-2xl border border-leaf/10 bg-cream px-3 py-2" />
              {error && <p className="text-sm text-red-700">{error}</p>}
              <button type="button" onClick={createJob} className="h-11 w-full rounded-full bg-leaf text-sm text-cream">
                Publier l&apos;offre
              </button>
            </div>
          </section>

          <section className="space-y-3">
            {jobs.map((job) => (
              <article key={job.id} className="rounded-[24px] bg-paper p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{job.department} · {job.contract}</p>
                    <h3 className="font-display text-2xl text-leaf-dark">{job.title}</h3>
                    <p className="mt-1 text-sm text-muted">{job.location} · publiée le {formatDate(job.createdAt)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleJob(job)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${job.active ? "bg-leaf-mist text-leaf-dark" : "bg-slate-200 text-slate-600"}`}
                  >
                    {job.active ? <Eye size={13} /> : <EyeOff size={13} />}
                    {job.active ? "En ligne" : "Masquée"}
                  </button>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted">{job.description}</p>
                <p className="mt-2 text-xs text-muted">
                  {applications.filter((a) => a.jobId === job.id).length} candidature(s)
                </p>
              </article>
            ))}
            {jobs.length === 0 && <p className="rounded-[24px] bg-paper p-8 text-center text-sm text-muted">Aucune offre créée.</p>}
          </section>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {applications.map((app) => (
            <article key={app.id} className="rounded-[24px] bg-paper p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">
                    {app.kind === "job" ? `Offre : ${app.job?.title ?? "—"}` : "Candidature spontanée"}
                  </p>
                  <h3 className="font-display text-2xl text-leaf-dark">{app.fullName}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {[app.city, app.experience].filter(Boolean).join(" · ") || "—"} · reçu le {formatDate(app.createdAt)}
                  </p>
                </div>
                <select
                  value={app.status}
                  onChange={(e) => setAppStatus(app, e.target.value)}
                  className="h-10 rounded-full border border-leaf/10 bg-cream px-3 text-sm"
                >
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <p className="mt-3 rounded-2xl bg-cream px-4 py-3 text-sm leading-6 text-ink/80">{app.message}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                {app.email && <span>{app.email}</span>}
                {app.phone && <span>{app.phone}</span>}
                {app.profileLink && (
                  <a href={app.profileLink} target="_blank" rel="noreferrer" className="text-leaf underline">
                    Profil / portfolio
                  </a>
                )}
              </div>
            </article>
          ))}
          {applications.length === 0 && (
            <p className="rounded-[24px] bg-paper p-8 text-center text-sm text-muted">Aucune candidature pour le moment.</p>
          )}
        </div>
      )}
    </main>
  );
}
