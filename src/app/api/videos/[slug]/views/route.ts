import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { videos } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  await db
    .update(videos)
    .set({ views: sql`${videos.views} + 1` })
    .where(eq(videos.slug, slug));
  return NextResponse.json({ ok: true });
}
