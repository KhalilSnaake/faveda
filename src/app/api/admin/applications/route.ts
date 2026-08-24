import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { applications, jobs } from "@/db/schema";
import { getAuthenticatedAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const actor = await getAuthenticatedAdmin();
  if (!actor) return NextResponse.json({ error: "Indisponible" }, { status: 500 });

  const rows = await db.select().from(applications).orderBy(desc(applications.createdAt));
  const allJobs = await db.select().from(jobs);

  return NextResponse.json(
    rows.map((app) => ({
      ...app,
      job: allJobs.find((job) => job.id === app.jobId) ?? null,
    })),
  );
}
