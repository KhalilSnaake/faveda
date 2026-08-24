import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { jobs } from "@/db/schema";
import { getAuthenticatedAdmin, logAdminAction } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const actor = await getAuthenticatedAdmin();
  if (!actor) return NextResponse.json({ error: "Indisponible" }, { status: 500 });

  const { id } = await params;
  const jobId = Number(id);
  const [current] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
  if (!current) return NextResponse.json({ error: "Offre introuvable" }, { status: 404 });

  const body = (await request.json()) as {
    active?: boolean;
    title?: string;
    department?: string;
    location?: string;
    contract?: string;
    description?: string;
    requirements?: string;
  };

  const [updated] = await db
    .update(jobs)
    .set({
      active: body.active ?? current.active,
      title: (body.title ?? "").trim() || current.title,
      department: (body.department ?? "").trim() || current.department,
      location: (body.location ?? "").trim() || current.location,
      contract: (body.contract ?? "").trim() || current.contract,
      description: (body.description ?? "").trim() || current.description,
      requirements: body.requirements !== undefined ? body.requirements : current.requirements,
    })
    .where(eq(jobs.id, jobId))
    .returning();

  await logAdminAction({
    actorAdminId: actor.id,
    action: "update_job",
    entityType: "job",
    entityId: String(updated.id),
    description: `${actor.name} a modifié l'offre « ${updated.title} » (${updated.active ? "publiée" : "masquée"})`,
  });

  return NextResponse.json(updated);
}
