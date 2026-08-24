import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { parseJsonList } from "@/lib/format";
import { normalizeProductImages } from "@/lib/storage";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureSeeded();
  const rows = normalizeProductImages(await db.select().from(products).orderBy(asc(products.id)));
  return NextResponse.json(
    rows.map((product) => ({
      ...product,
      benefits: parseJsonList(product.benefits),
    })),
  );
}
