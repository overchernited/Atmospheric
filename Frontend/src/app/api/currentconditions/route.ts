import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.WEATHER_API_KEY!;
const BASE = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function GET(req: NextRequest) {
    const loc = req.nextUrl.searchParams.get('loc');
    if (!loc)
        return NextResponse.json({ error: 'loc param required' }, { status: 400 });

    const url =
        `${BASE}/${encodeURIComponent(loc)}/today` +
        `?unitGroup=metric` +
        `&include=hours` +
        `&contentType=json` +
        `&elements=datetime,temp,humidity,windspeed,aqius,solarradiation,conditions` +
        `&key=${API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok)
        return NextResponse.json({ error: 'Visual Crossing error' }, { status: 502 });

    const json = await res.json();
    const now = new Date();

    // Buscar el registro horario más cercano al tiempo actual
    const currentHour = json?.days?.[0]?.hours?.reduce((closest: any, hour: any) => {
        const hourTime = new Date(`${json.days[0].datetime}T${hour.datetime}:00`);
        const closestTime = new Date(`${json.days[0].datetime}T${closest.datetime}:00`);
        return Math.abs(hourTime.getTime() - now.getTime()) < Math.abs(closestTime.getTime() - now.getTime())
            ? hour
            : closest;
    });

    if (!currentHour)
        return NextResponse.json({ error: 'No hourly data' }, { status: 500 });

    const current = {
        datetime: `${json.days[0].datetime} ${currentHour.datetime}`,
        temp: currentHour.temp,
        humidity: currentHour.humidity,
        windspeed: currentHour.windspeed,
        aqius: currentHour.aqius,
        solarradiation: currentHour.solarradiation,
        conditions: currentHour.conditions,
    };

    return NextResponse.json(current);
}
