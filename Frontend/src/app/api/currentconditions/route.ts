import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns-tz';

const API_KEY = process.env.WEATHER_API_KEY!;
const BASE =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function GET(req: NextRequest) {
    const loc = req.nextUrl.searchParams.get('loc');
    const tz = req.nextUrl.searchParams.get('tz') || 'UTC'; // Ejemplo: 'America/Bogota'

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

    // ✅ Obtener la hora local en la zona horaria indicada
    const now = new Date();
    const currentHourNumber = parseInt(format(now, 'H', { timeZone: tz }), 10);

    const hoursArray: any[] = json.days?.[0]?.hours ?? [];

    // 🕒 Buscar coincidencia por hora
    const currentHour =
        hoursArray.find((h) => Number(h.datetime.split(':')[0]) === currentHourNumber) ??
        hoursArray[0];

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
