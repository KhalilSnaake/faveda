import { NextResponse } from "next/server";

// Direct-access mode: there is no session to invalidate.
export async function POST() {
  return NextResponse.json({ ok: true, authenticationEnabled: false });
}
