import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.WEATHER_API_KEY!;
const BASE = "https://dataservice.accuweather.com";

export async function GET(req: NextRequest) {
    const locKey = req.nextUrl.searchParams.get("locKey");
    if (!locKey) {
        return NextResponse.json({ error: "locKey required" }, { status: 400 });
    }

    const url = `${BASE}/forecasts/v1/daily/5day/${locKey}?apikey=${API_KEY}&metric=true`;
    const res = await fetch(url, { next: { revalidate: 3_600 } }); // cache 1 h
    if (!res.ok) {
        return NextResponse.json({ error: "AccuWeather error" }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
