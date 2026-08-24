import { NextResponse } from "next/server";

// Authentication is disabled: driver profiles are selected directly in /livreur.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ authenticated: true, authenticationEnabled: false });
}
