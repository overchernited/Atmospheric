import { NextRequest, NextResponse } from 'next/server';
import { toZonedTime, format } from 'date-fns-tz';

const API_KEY = process.env.WEATHER_API_KEY!;
const BASE =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function GET(req: NextRequest) {
    const loc = req.nextUrl.searchParams.get('loc');
    const tz = req.nextUrl.searchParams.get('tz') || 'UTC';

    if (!loc)
        return NextResponse.json({ error: 'loc param required' }, { status: 400 });

    const url =
        `${BASE}/${encodeURIComponent(loc)}/next7days` +
        `?unitGroup=metric` +
        `&include=days` +
        `&contentType=json` +
        `&elements=datetime,temp,humidity,windspeed,aqius,uvindex,conditions,feelslike` +
        `&key=${API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok)
        return NextResponse.json({ error: 'Visual Crossing error' }, { status: 502 });

    const json = await res.json();

    const now = new Date();
    const clientTime = toZonedTime(now, tz);
    const todayISO = format(clientTime, 'yyyy-MM-dd', { timeZone: tz });

    // Filtrar los próximos 4 días (incluyendo el día actual)
    const next4Days = json.days
        .filter((d: any) => d.datetime >= todayISO)
        .slice(0, 4);

    // Genera fecha-hora local tipo ISO (zona cliente)
    const generatedAtLocal = format(clientTime, "yyyy-MM-dd'T'HH:mm:ss", { timeZone: tz });

    return NextResponse.json({
        location: json.address,
        generatedAt: generatedAtLocal,
        next4Days,
    });
}
