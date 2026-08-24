import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { applications, jobs } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    jobId?: number | null;
    kind?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    city?: string;
    experience?: string;
    profileLink?: string;
    message?: string;
  };

  const fullName = (body.fullName ?? "").trim();
  const message = (body.message ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();

  if (!fullName) {
    return NextResponse.json({ error: "Votre nom est requis" }, { status: 400 });
  }
  if (!email && !phone) {
    return NextResponse.json({ error: "Indiquez un email ou un téléphone" }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Votre message de motivation est requis" }, { status: 400 });
  }

  let jobId: number | null = null;
  let kind = "spontaneous";
  if (typeof body.jobId === "number" && body.jobId > 0) {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, body.jobId)).limit(1);
    if (job && job.active) {
      jobId = job.id;
      kind = "job";
    }
  }

  const [application] = await db
    .insert(applications)
    .values({
      jobId,
      kind,
      fullName,
      email: email || null,
      phone: phone || null,
      city: (body.city ?? "").trim() || null,
      experience: (body.experience ?? "").trim() || null,
      profileLink: (body.profileLink ?? "").trim() || null,
      message,
      status: "new",
    })
    .returning();

  return NextResponse.json({ ok: true, id: application.id });
}
