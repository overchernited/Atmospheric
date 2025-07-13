
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GEO_API_KEY!;
const BASE = "https://maps.googleapis.com/maps/api";

export async function GET(req: NextRequest) {
    const latlng = req.nextUrl.searchParams.get("latlng");

    if (!latlng) {
        return NextResponse.json({ error: "lat & lon required" }, { status: 400 });
    }

    const url = `${BASE}/geocode/json?latlng=${latlng}&key=${API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1 hora
    if (!res.ok) {
        return NextResponse.json({ error: `MAPS error ${res.status}` }, { status: 502 });
    }

    const data = await res.json();

    const components = data.results[0].address_components as {
        long_name: string;
        types: string[];
    }[];

    // 1º prioridad: locality (ciudad), 2º: administrative_area_level_2 (condado), 3º: sublocality
    const city =
        components.find(c => c.types.includes("locality"))?.long_name ||
        components.find(c => c.types.includes("administrative_area_level_2"))?.long_name ||
        components.find(c => c.types.includes("sublocality"))?.long_name ||
        "Unknown";

    return NextResponse.json({ city });
}
