import { NextResponse } from "next/server";

// Kept for backwards compatibility. Driver login is disabled in direct-access mode.
export async function POST() {
  return NextResponse.json({ ok: true, authenticationEnabled: false });
}
