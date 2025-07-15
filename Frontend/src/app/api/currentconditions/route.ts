import { NextRequest, NextResponse } from 'next/server';
import { toZonedTime, format } from 'date-fns-tz';

const API_KEY = process.env.WEATHER_API_KEY!;
const BASE =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function GET(req: NextRequest) {
    const loc = req.nextUrl.searchParams.get('loc');
    const userTz = req.nextUrl.searchParams.get('tz') || 'UTC'; // zona usuario

    if (!loc)
        return NextResponse.json({ error: 'loc param required' }, { status: 400 });

    const url =
        `${BASE}/${encodeURIComponent(loc)}/today` +
        `?unitGroup=metric` +
        `&include=hours` +
        `&contentType=json` +
        `&elements=datetime,temp,humidity,windspeed,aqius,solarradiation,conditions,feelslike` +
        `&key=${API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok)
        return NextResponse.json({ error: 'Visual Crossing error' }, { status: 502 });

    const json = await res.json();
    const placeTz = json.timezone as string; // zona del lugar

    const now = new Date();
    const userHour = parseInt(format(now, 'H', { timeZone: userTz }), 10);

    const hoursArray: any[] = json.days?.[0]?.hours ?? [];

    // Aquí convierto la hora local (string) en fecha 'Date' en la zona local del lugar
    const convertedHours = hoursArray.map((h) => {
        const localDateStr = `${json.days[0].datetime}T${h.datetime}`; // ej: "2025-07-15T06:00"
        // Convertir esa fecha local a un Date en la zona del lugar
        const localDate = toZonedTime(new Date(localDateStr), placeTz);
        // Convertir esa fecha local a la hora en zona usuario
        const userDate = toZonedTime(localDate, userTz);
        const userHourConverted = parseInt(format(userDate, 'H', { timeZone: userTz }), 10);

        return { ...h, userHourConverted };
    });

    // Buscar la hora que coincida con la hora del usuario
    const currentHour =
        convertedHours.find((h) => h.userHourConverted === userHour) ?? convertedHours[0];

    if (!currentHour)
        return NextResponse.json({ error: 'No hourly data' }, { status: 500 });

    const current = {
        datetime: `${json.days[0].datetime} ${currentHour.datetime}`,
        temp: currentHour.temp,
        humidity: currentHour.humidity,
        windspeed: currentHour.windspeed,
        aqius: currentHour.aqius,
        solarradiation: currentHour.solarradiation,
        feelslike: currentHour.feelslike,
        conditions: currentHour.conditions,
    };

    return NextResponse.json(current);
}
