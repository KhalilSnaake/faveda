import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/admin";
import { authenticationEnabled } from "@/lib/auth";

export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ authenticated: false, authenticationEnabled }, { headers });
  }
  return NextResponse.json(
    {
      authenticated: true,
      authenticationEnabled,
      user: {
        id: admin.id,
        name: admin.name,
        username: admin.username,
        role: admin.role,
        active: admin.active,
        mustChangePassword: authenticationEnabled ? admin.mustChangePassword : false,
        lastLoginAt: admin.lastLoginAt,
        createdAt: admin.createdAt,
      },
    },
    { headers },
  );
}
