import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { jobs } from "@/db/schema";
import { getAuthenticatedAdmin, logAdminAction } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const actor = await getAuthenticatedAdmin();
  if (!actor) return NextResponse.json({ error: "Indisponible" }, { status: 500 });
  const rows = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const actor = await getAuthenticatedAdmin();
  if (!actor) return NextResponse.json({ error: "Indisponible" }, { status: 500 });

  const body = (await request.json()) as {
    title?: string;
    department?: string;
    location?: string;
    contract?: string;
    description?: string;
    requirements?: string;
  };

  const title = (body.title ?? "").trim();
  const department = (body.department ?? "").trim() || "Équipe";
  const location = (body.location ?? "").trim() || "Abidjan";
  const contract = (body.contract ?? "").trim() || "Temps plein";
  const description = (body.description ?? "").trim();
  const requirements = (body.requirements ?? "").trim();

  if (!title || !description) {
    return NextResponse.json({ error: "Titre et description requis" }, { status: 400 });
  }

  const [job] = await db
    .insert(jobs)
    .values({ title, department, location, contract, description, requirements, active: true })
    .returning();

  await logAdminAction({
    actorAdminId: actor.id,
    action: "create_job",
    entityType: "job",
    entityId: String(job.id),
    description: `${actor.name} a publié l'offre « ${job.title} »`,
  });

  return NextResponse.json(job);
}
