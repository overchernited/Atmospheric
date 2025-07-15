"use client";

import Skeleton from "react-loading-skeleton";
import WeatherCard from "../WeatherCards"
import { useEffect, useState } from "react";


interface Analytics {
    date: string
    hour: string
    conditions: string
    temp: number
    humidity: number
    wind: number
    solarradiation: number
    aqius: number
    feelslike: number
}

interface Coords {
    lat: string
    lon: string
}

const HourlyWeatherAnalytics = () => {

    const [coords, setCoords] = useState<Coords>({ lat: "", lon: "" });
    const [nextHours, setNextHours] = useState<Analytics[]>([]);

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
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const date = new Date().toISOString()

        const res = await fetch(
            `/api/hourlyconditions?loc=${lat},${lon}&tz=${encodeURIComponent(timezone)}&currentTime=${date}`,
            { cache: "no-store" }
        );
        if (!res.ok) throw new Error("weather error");
        const data = await res.json();


        console.log(timezone)
        console.log(data)

        setNextHours(
            data.next4Hours.map((h: any) => ({
                date: h.date,
                hour: h.datetime.split(':')[0] + 'h',  //  "19h"
                conditions: h.conditions ?? '—',
                temp: h.temp,
                feelslike: h.feelslike,
                humidity: h.humidity,
                wind: h.windspeed,
                solarradiation: h.solarradiation,
                aqius: h.aqius,
            }))
        );
    };

    // 3) Efecto inicial
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
        <div className="m-2 flex flex-col lg:flex-row items-center justify-center gap-5">
            {nextHours.length > 0 ? nextHours.map((h, idx) => (
                <WeatherCard key={idx} {...h} />
            )) :
                <>
                    <Skeleton height={300} className="w-full lg:w-[20%]" enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                    <Skeleton height={300} className="" enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                    <Skeleton height={300} className="" enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                    <Skeleton height={300} className="" enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                </>
            }
        </div>
    );
}

export default HourlyWeatherAnalytics