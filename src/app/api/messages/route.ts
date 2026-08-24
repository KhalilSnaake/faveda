import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/auth";
import { notifyNewMessage } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const rows = await db.select().from(messages).orderBy(desc(messages.createdAt));
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    phone?: string;
    email?: string;
    kind?: string;
    content?: string;
    rating?: number;
  };

  const name = body.name?.trim() ?? "";
  const content = body.content?.trim() ?? "";
  const kind = ["contact", "review", "newsletter"].includes(body.kind || "") ? body.kind! : "contact";

  if (kind === "newsletter") {
    if (!body.email?.trim()) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }
  } else if (!name || !content) {
    return NextResponse.json({ error: "Nom et message requis" }, { status: 400 });
  }

  const [row] = await db
    .insert(messages)
    .values({
      name: name || "Abonné",
      phone: body.phone?.trim() || null,
      email: body.email?.trim() || null,
      kind,
      content: content || "Inscription newsletter",
      rating: typeof body.rating === "number" ? Math.min(5, Math.max(1, body.rating)) : null,
    })
    .returning();

  await notifyNewMessage({
    kind,
    name: row.name,
    content: row.content,
    rating: row.rating,
  });

  return NextResponse.json(row);
}
