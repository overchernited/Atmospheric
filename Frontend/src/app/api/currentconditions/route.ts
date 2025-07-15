import { NextRequest, NextResponse } from 'next/server';
import { toZonedTime, format, fromZonedTime } from 'date-fns-tz';

const API_KEY = process.env.WEATHER_API_KEY!;
const BASE = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function GET(req: NextRequest) {
    const loc = req.nextUrl.searchParams.get('loc');
    const userTz = req.nextUrl.searchParams.get('tz') || 'UTC';
    const currentTimeParam = req.nextUrl.searchParams.get('currentTime'); // ISO string opcional

    if (!loc)
        return NextResponse.json({ error: 'loc param required' }, { status: 400 });

    // Parsear la hora actual recibida o usar ahora mismo
    let currentTime: Date;
    if (currentTimeParam) {
        currentTime = new Date(currentTimeParam);
        if (isNaN(currentTime.getTime())) {
            return NextResponse.json({ error: 'Invalid currentTime param' }, { status: 400 });
        }
    } else {
        currentTime = new Date();
    }

    // Convertir currentTime a la zona horaria del usuario (userTz)
    // Si currentTime ya viene con zona horaria, este ajuste la adapta a userTz
    const clientTime = toZonedTime(currentTime, userTz);

    const currentHourNumber = parseInt(format(clientTime, 'H', { timeZone: userTz }), 10);

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

    const hoursArray: any[] = json.days?.[0]?.hours ?? [];

    // Ajustar cada hora del pronóstico a la zona horaria del usuario para comparar bien
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
        clientTime: clientTime.toISOString(),
        userTz,
        currentHourNumber,
    });
}
