import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/admin";
import { authenticationEnabled } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!authenticationEnabled) {
    const admin = await getAuthenticatedAdmin();
    return NextResponse.json({
      ok: true,
      authenticationEnabled: false,
      user: admin ? { id: admin.id, name: admin.name, role: admin.role } : null,
    });
  }

  return NextResponse.json(
    { error: "Le mode authentifié doit être activé avec APP_AUTH_ENABLED=true." },
    { status: 400 },
  );
}
