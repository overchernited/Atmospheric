import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.WEATHER_API_KEY!;
const BASE = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export async function GET(req: NextRequest) {
    const loc = req.nextUrl.searchParams.get('loc');
    if (!loc)
        return NextResponse.json({ error: 'loc param required' }, { status: 400 });

    // Recibe la hora actual enviada desde el navegador, solo como número 0-23
    const currentHourParam = req.nextUrl.searchParams.get('currentHour');
    let currentHourNumber: number;

    if (currentHourParam) {
        currentHourNumber = parseInt(currentHourParam, 10);
    } else {
        console.log("bip!")
        currentHourNumber = new Date().getHours();
    }

    const url = `${BASE}/${encodeURIComponent(loc)}/today` +
        `?unitGroup=metric` +
        `&include=hours` +
        `&contentType=json` +
        `&elements=datetime,temp,humidity,windspeed,aqius,uvindex,conditions,feelslike` +
        `&key=${API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok)
        return NextResponse.json({ error: 'Visual Crossing error' }, { status: 502 });

    const json = await res.json();

    const hoursArray: any[] = json.days?.[0]?.hours ?? [];

    // Buscar la hora que coincida con la hora actual pasada (sin timezone)
    let currentHour = hoursArray.find(h => {
        const hour = parseInt(h.datetime.split(':')[0], 10);
        return hour === currentHourNumber;
    });

    if (!currentHour) {
        currentHour = hoursArray[0];
    }

    console.log(currentHourNumber);

    return NextResponse.json({
        datetime: `${json.days[0].datetime} ${currentHour.datetime}`,
        temp: currentHour.temp,
        humidity: currentHour.humidity,
        windspeed: currentHour.windspeed,
        aqius: currentHour.aqius,
        uvindex: currentHour.uvindex,
        feelslike: currentHour.feelslike,
        conditions: currentHour.conditions,
        currentHourNumber,
    });
}
