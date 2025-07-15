"use client";

import { useEffect, useState } from "react";
import WeatherBox from "../WeatherBox";
import Skeleton from "react-loading-skeleton";

interface Coords {
    lat: string;
    lon: string;
}

interface Analytics {
    temp: number;
    humidity: number;
    wind: number;
    solarradiation: number;
    aqius: number;
    feelslike: number
    conditions: string
}

const MainWeatherAnalytics = () => {
    const [coords, setCoords] = useState<Coords>({ lat: "", lon: "" });
    const [analytics, setAnalytics] = useState<Analytics | null>(null);

    // 1) Obtenemos geolocalización
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
        const res = await fetch(
            `/api/currentconditions?loc=${lat},${lon}`,
            { cache: "no-store" }
        );
        if (!res.ok) throw new Error("weather error");
        const data = await res.json();

        console.log(data)

        setAnalytics({
            temp: data.temp,
            humidity: data.humidity,
            wind: data.windspeed,
            solarradiation: data.solarradiation,
            aqius: data.aqius,
            feelslike: data.feelslike,
            conditions: data.conditions ?? "—",
        });
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

    const tempNode = analytics ? (
        <>
            <h1 className="text-6xl lg:text-8xl font-bold">
                {Math.round(analytics.temp)}°C
                <p className="text-base lg:text-base font-extralight text-center">feels like: {analytics.feelslike}°C</p>
            </h1>
        </>
    ) : (
        <Skeleton width={180} height={96} baseColor="#2b2f6e"        // gris oscuro
            highlightColor="#734382"   // gris más claro para animación
            enableAnimation={true} />
    );

    const conditionNode = analytics ? (
        analytics.conditions.split(",")[0]
    ) : (
        <Skeleton width={200} height={40} borderRadius={9999} baseColor="#2b2f6e"        // gris oscuro
            highlightColor="#734382"
            enableAnimation={true} />
    );

    const boxesNode = analytics ? (
        <>
            <WeatherBox title="ICA">{analytics.aqius}</WeatherBox>
            <WeatherBox title="RH">{analytics.humidity}%</WeatherBox>
            <WeatherBox title="WS">{analytics.wind} km/h</WeatherBox>
        </>
    ) : (
        <>
            <Skeleton width={128} height={100} baseColor="#2b2f6e"        // gris oscuro
                highlightColor="#734382"   // gris más claro para animación
                enableAnimation={true} />
            <Skeleton width={128} height={100} baseColor="#2b2f6e"        // gris oscuro
                highlightColor="#734382"   // gris más claro para animación
                enableAnimation={true} />
            <Skeleton width={128} height={100} baseColor="#2b2f6e"        // gris oscuro
                highlightColor="#734382"   // gris más claro para animación
                enableAnimation={true} />
        </>
    );

    const uvNode = analytics ? (
        <WeatherBox title="UV">{analytics.solarradiation}</WeatherBox>
    ) : (
        <Skeleton width={128} height={100} baseColor="#2b2f6e"
            highlightColor="#734382"
            enableAnimation={true} />
    );

    return (
        <div className="w-full h-[65vh] flex flex-col items-center justify-center text-white gap-4">
            {coords.lat ? (
                <p className="text-base font-light">{coords.lat}, {coords.lon}</p>
            ) : (
                <Skeleton width={120} height={20} baseColor="#2b2f6e"        // gris oscuro
                    highlightColor="#734382" />
            )}

            {tempNode}

            <p className="tracking-[.2rem] lg:tracking-[.8rem] text-lg lg:text-2xl backdrop-blur-3xl text-center bg-white/5 p-2 rounded-full">
                {conditionNode}
            </p>

            <div className="flex gap-2 lg:gap-9 mt-4 items-center justify-center w-full">{boxesNode}</div>

            <div className="mt-4 w-[100%] flex justify-center itens-center">{uvNode}</div>
        </div>
    );
}

export default MainWeatherAnalytics;
