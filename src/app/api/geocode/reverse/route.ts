import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  if (!lat || !lon) {
    return NextResponse.json({ error: "Coordonnées manquantes" }, { status: 400 });
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "FavedaBoutique/1.0 (hello@faveda.ci)",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Géocodage indisponible" }, { status: 502 });
  }

  const data = (await response.json()) as {
    display_name?: string;
    address?: { city?: string; town?: string; village?: string; suburb?: string };
  };

  return NextResponse.json({
    label: data.display_name ?? "",
    city: data.address?.city || data.address?.town || data.address?.village || data.address?.suburb || "",
  });
}
