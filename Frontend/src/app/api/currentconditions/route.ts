import { NextRequest, NextResponse } from 'next/server';
import { format, toZonedTime } from 'date-fns-tz';

const API_KEY = process.env.WEATHER_API_KEY!;
const BASE = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function GET(req: NextRequest) {
    const loc = req.nextUrl.searchParams.get('loc');
    const tz = req.nextUrl.searchParams.get('tz') || 'UTC'; // zona horaria del usuario

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

    const now = new Date();
    const userHour = parseInt(format(now, 'H', { timeZone: tz }), 10); // hora del usuario (0–23)

    const hoursArray: any[] = json.days?.[0]?.hours ?? [];

    // Convertir cada hora del pronóstico a la zona horaria del usuario
    const convertedHours = hoursArray.map((h) => {
        const fullISO = `${json.days[0].datetime}T${h.datetime}`;
        const userDate = toZonedTime(new Date(fullISO), tz);
        const userHourConverted = parseInt(format(userDate, 'H', { timeZone: tz }), 10);
        return { ...h, userHourConverted };
    });

    // Buscar coincidencia
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
