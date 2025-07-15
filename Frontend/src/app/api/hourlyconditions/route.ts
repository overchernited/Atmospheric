import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.WEATHER_API_KEY!;
const BASE =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function GET(req: NextRequest) {
    const loc = req.nextUrl.searchParams.get('loc');
    if (!loc)
        return NextResponse.json({ error: 'loc param required' }, { status: 400 });

    const url =
        `${BASE}/${encodeURIComponent(loc)}/next7days` +
        `?unitGroup=metric` +
        `&include=days,hours` +
        `&contentType=json` +
        `&elements=datetime,temp,humidity,windspeed,aqius,solarradiation,conditions,feelslike` +
        `&key=${API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok)
        return NextResponse.json({ error: 'Visual Crossing error' }, { status: 502 });

    const json = await res.json();


    const now = new Date();
    const currentHourNumber = now.getHours();          // 0‑23
    const pad = (n: number) => n.toString().padStart(2, '0');
    const todayISO = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;


    const flatHours: any[] = json.days.flatMap((d: any) =>
        d.hours.map((h: any) => ({
            ...h,
            fullDateTime: `${d.datetime}T${h.datetime}`,
            date: d.datetime,
            hourNum: parseInt(h.datetime.split(':')[0], 10),
        })),
    );
    let startIndex = flatHours.findIndex(
        (h) => h.date === todayISO && h.hourNum === currentHourNumber,
    );
    if (startIndex === -1) {
        startIndex = flatHours.findIndex(
            (h) => h.date === todayISO && h.hourNum > currentHourNumber,
        );
    }

    if (startIndex === -1) {
        startIndex = 0;
    }

    const next4Hours = [];
    for (let i = 0; i < 4; i++) {
        next4Hours.push(flatHours[(startIndex + i) % flatHours.length]);
    }

    return NextResponse.json({
        location: json.address,
        generatedAt: now.toISOString(),
        next4Hours,
    });
}
