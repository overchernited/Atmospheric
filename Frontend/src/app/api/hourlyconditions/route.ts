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

    // Helper para rellenar con cero
    const pad = (n: number) => n.toString().padStart(2, '0');

    // Fecha local YYYY-MM-DD para comparación
    const todayISO = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
        now.getDate()
    )}`;

    const currentHourNumber = now.getHours(); // 0-23

    // Construir lista plana de horas con fecha y hora
    const flatHours: any[] = json.days.flatMap((d: any) =>
        d.hours.map((h: any) => ({
            ...h,
            fullDateTime: `${d.datetime}T${h.datetime}`, // fecha + hora local
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

    // Generar fecha-hora local tipo ISO sin convertir a UTC
    const generatedAtLocal = `${todayISO}T${pad(now.getHours())}:${pad(
        now.getMinutes()
    )}:${pad(now.getSeconds())}`;

    return NextResponse.json({
        location: json.address,
        generatedAt: generatedAtLocal,
        next4Hours,
    });
}
