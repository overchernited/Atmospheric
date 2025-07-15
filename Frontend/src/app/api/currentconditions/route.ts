import { NextRequest, NextResponse } from 'next/server';
import { toZonedTime, format } from 'date-fns-tz';

const API_KEY = process.env.WEATHER_API_KEY!;
const BASE = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function GET(req: NextRequest) {
    const loc = req.nextUrl.searchParams.get('loc');
    const userTz = req.nextUrl.searchParams.get('tz') || 'UTC';

    if (!loc)
        return NextResponse.json({ error: 'loc param required' }, { status: 400 });

    const url = `${BASE}/${encodeURIComponent(loc)}/today` +
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

    // Convierte ahora a zona horaria del usuario
    const clientTime = toZonedTime(now, userTz);
    const currentHourNumber = parseInt(format(clientTime, 'H', { timeZone: userTz }), 10);

    const hoursArray: any[] = json.days?.[0]?.hours ?? [];

    // Mapeamos horas y ajustamos el horario para comparar en la zona del usuario
    const adjustedHours = hoursArray.map((h) => {
        const iso = `${json.days[0].datetime}T${h.datetime}`;
        const dateInUserTZ = toZonedTime(new Date(iso), userTz);
        return {
            ...h,
            hourInUserTZ: parseInt(format(dateInUserTZ, 'H', { timeZone: userTz }), 10),
            dateInUserTZ,
        };
    });

    // Buscar la hora que coincida con la hora actual del usuario
    let currentHour = adjustedHours.find(h => h.hourInUserTZ === currentHourNumber);

    if (!currentHour) {
        currentHour = adjustedHours[0];
    }

    return NextResponse.json({
        datetime: `${json.days[0].datetime} ${currentHour.datetime}`,
        temp: currentHour.temp,
        humidity: currentHour.humidity,
        windspeed: currentHour.windspeed,
        aqius: currentHour.aqius,
        solarradiation: currentHour.solarradiation,
        feelslike: currentHour.feelslike,
        conditions: currentHour.conditions,
    });
}
