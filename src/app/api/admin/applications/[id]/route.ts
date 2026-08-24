import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { getAuthenticatedAdmin, logAdminAction } from "@/lib/admin";

export const dynamic = "force-dynamic";

const allowed = ["new", "contacted", "interview", "hired", "rejected"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const actor = await getAuthenticatedAdmin();
  if (!actor) return NextResponse.json({ error: "Indisponible" }, { status: 500 });

  const { id } = await params;
  const appId = Number(id);
  const body = (await request.json()) as { status?: string };
  const status = body.status && allowed.includes(body.status) ? body.status : undefined;
  if (!status) return NextResponse.json({ error: "Statut invalide" }, { status: 400 });

  const [updated] = await db
    .update(applications)
    .set({ status })
    .where(eq(applications.id, appId))
    .returning();
  if (!updated) return NextResponse.json({ error: "Candidature introuvable" }, { status: 404 });

  await logAdminAction({
    actorAdminId: actor.id,
    action: "update_application",
    entityType: "application",
    entityId: String(updated.id),
    description: `${actor.name} a passé la candidature de ${updated.fullName} en « ${status} »`,
  });

  return NextResponse.json(updated);
}
