
import { NextRequest, NextResponse } from 'next/server';
import { toZonedTime, format } from 'date-fns-tz';

const API_KEY = process.env.WEATHER_API_KEY!;
const BASE =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function GET(req: NextRequest) {
    const loc = req.nextUrl.searchParams.get('loc');
    const tz = req.nextUrl.searchParams.get('tz') || 'UTC'; // lee zona horaria o usa UTC

    if (!loc)
        return NextResponse.json({ error: 'loc param required' }, { status: 400 });

    const url =
        `${BASE}/${encodeURIComponent(loc)}/next7days` +
        `?unitGroup=metric` +
        `&include=days,hours` +
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

    const currentHourNumber = parseInt(format(clientTime, 'H', { timeZone: tz }), 10);

    // Construir lista plana de horas con fecha y hora
    const flatHours: any[] = json.days.flatMap((d: any) =>
        d.hours.map((h: any) => ({
            ...h,
            fullDateTime: `${d.datetime}T${h.datetime}`,
            date: d.datetime,
            hourNum: parseInt(h.datetime.split(':')[0], 10),
        }))
    );

    let startIndex = flatHours.findIndex(
        (h) => h.date === todayISO && h.hourNum === currentHourNumber
    );

    if (startIndex === -1) {
        startIndex = flatHours.findIndex(
            (h) => h.date === todayISO && h.hourNum > currentHourNumber
        );
    }

    if (startIndex === -1) {
        startIndex = 0;
    }

    const next4Hours = [];
    for (let i = 0; i < 4; i++) {
        next4Hours.push(flatHours[(startIndex + i) % flatHours.length]);
    }

    // Genera fecha-hora local tipo ISO (zona cliente)
    const generatedAtLocal = format(clientTime, "yyyy-MM-dd'T'HH:mm:ss", { timeZone: tz });

    return NextResponse.json({
        location: json.address,
        generatedAt: generatedAtLocal,
        next4Hours,
    });
}
