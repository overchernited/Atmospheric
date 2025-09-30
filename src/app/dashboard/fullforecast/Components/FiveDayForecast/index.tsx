"use client"
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import WeatherSlice from "../WeatherSlice";


interface Analytics {
    datetime: string
    conditions: string
    temp: number
    wind: number
    aqius: number
    humidity: number
    uvindex: number
}

interface Coords {
    lat: string
    lon: string
}
const FiveDayForecast = () => {

    const [coords, setCoords] = useState<Coords>({ lat: "", lon: "" });
    const [nextDays, setNextDays] = useState<Analytics[]>([])

    const getCoords = async () => {
        const pos = await new Promise<GeolocationPosition>((res, rej) =>
            navigator.geolocation.getCurrentPosition(res, rej, {
                enableHighAccuracy: true,
                timeout: 10_000,
            })
        );
        const { latitude, longitude } = pos.coords;
        const c = { lat: `${latitude}`, lon: `${longitude}` };
        setCoords(c);
        return c;
    };

    const getAnalytics = async (lat: string, lon: string) => {
        const currentHour = new Date().getHours();

        const res = await fetch(
            `/api/fiveday?loc=${lat},${lon}&tz=${Intl.DateTimeFormat().resolvedOptions().timeZone}&currentHour=${currentHour}`,
            { cache: "no-store" }
        );
        if (!res.ok) throw new Error("weather error");
        const data = await res.json();

        console.log(currentHour)


        console.log(data)

        setNextDays(
            data.next4Days.map((h: any) => ({
                datetime: h.datetime,
                conditions: (h.conditions?.split(',')[0].trim()) ?? '—',
                temp: h.temp,
                humidity: h.humidity,
                wind: h.windspeed,
                uvindex: h.uvindex,
                aqius: h.aqius,
            }))
        );
    };

    useEffect(() => {
        (async () => {
            try {
                const { lat, lon } = await getCoords();
                await getAnalytics(lat, lon);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <>

            {nextDays.length > 0 ? nextDays.map((h, idx) => (
                <WeatherSlice key={idx} {...h} />
            )) :
                <>
                    <Skeleton height={80} width={470} enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                    <Skeleton height={80} width={470} enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                    <Skeleton height={80} width={470} enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                    <Skeleton height={80} width={470} enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                </>
            }
        </>
    )
};

export default FiveDayForecast