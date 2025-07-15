"use client";

import { useEffect, useState } from "react";
import WeatherBox from "../WeatherBox";
import Skeleton from "react-loading-skeleton";
import { faCircleInfo, faCloud, faCloudRain, faCloudSun, faInfo, faSun } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Coords {
    lat: string;
    lon: string;
}

interface Analytics {
    datetime: string;
    temp: number;
    humidity: number;
    wind: number;
    solarradiation: number;
    aqius: number;
    feelslike: number
    conditions: string
}


const conditionIcons: Record<string, IconDefinition> = {
    clear: faCloud,
    partially: faCloudSun,
    cloudy: faCloud,
    sunny: faSun,
    rain: faCloudRain,
};

const conditionPhrases: Record<string, string> = {
    clear: "Go out and have a nice day",
    partially: "Don't let clouds hide your smile!",
    cloudy: "Weather is cloudy :(",
    sunny: "Don't forget your sunglasses",
    rain: "Don't forget your umbrella",
};

const MainWeatherAnalytics = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;



    function getIcon(condition: string): IconDefinition {
        const lower = condition.toLowerCase();

        for (const key in conditionIcons) {
            if (lower.includes(key)) {
                return conditionIcons[key];
            }
        }
        // fallback si no hay coincidencia
        return faCloud;
    }

    function getPhrase(condition: string) {
        const condLower = condition.toLowerCase();

        // Buscar key que esté contenida en la condición
        const key = Object.keys(conditionPhrases).find(k => condLower.includes(k));

        return key ? conditionPhrases[key] : "Clima desconocido";
    }

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
            `/api/currentconditions?loc=${lat},${lon}&tz=${encodeURIComponent(timezone)}`,
            { cache: "no-store" }
        );
        if (!res.ok) throw new Error("weather error");
        const data = await res.json();

        console.log(data)

        setAnalytics({
            datetime: data.datetime,
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

    const condition = analytics?.conditions ?? "";


    const SkeletonNode = !analytics ? (
        <>
            <Skeleton width={120} height={20} baseColor="#2b2f6e"        // gris oscuro
                highlightColor="#734382" />
            <Skeleton width={180} height={96} baseColor="#2b2f6e"        // gris oscuro
                highlightColor="#734382"   // gris más claro para animación
                enableAnimation={true} />
            <Skeleton width={300} height={50} borderRadius={9999} baseColor="#2b2f6e"        // gris oscuro
                highlightColor="#734382"
                enableAnimation={true} />

            <div className="flex flex-row justify-center items-center gap-4 text-4xl text-white m-3">

                <Skeleton width={128} height={100} baseColor="#2b2f6e"        // gris oscuro
                    highlightColor="#734382"   // gris más claro para animación
                    enableAnimation={true} />
                <Skeleton width={128} height={100} baseColor="#2b2f6e"        // gris oscuro
                    highlightColor="#734382"   // gris más claro para animación
                    enableAnimation={true} />
                <Skeleton width={128} height={100} baseColor="#2b2f6e"        // gris oscuro
                    highlightColor="#734382"   // gris más claro para animación
                    enableAnimation={true} />
            </div>
            <Skeleton width={128} height={100} baseColor="#2b2f6e"
                highlightColor="#734382"
                enableAnimation={true} />
            <Skeleton width={470} height={60} baseColor="#2b2f6e"
                highlightColor="#734382"
                enableAnimation={true} />
        </>
    ) : (
        <>
            <div className="text-center">
                <p className="text-base font-light">{coords.lat}, {coords.lon}</p>
                <p className="text-sm font-extralight">UTC: {timezone}</p>
            </div>

            <h1 className="text-6xl lg:text-8xl font-bold">
                {Math.round(analytics.temp)}°C
                <p className="text-base lg:text-base font-extralight text-center">feels like: {analytics.feelslike}°C</p>
            </h1>

            <div className="tracking-[.2rem] lg:tracking-[.2rem] text-lg lg:text-2xl backdrop-blur-3x flex gap-3 flex-row items-center justify-center bg-white/5 p-2 rounded-full">
                <p>{analytics.conditions}</p>
                <FontAwesomeIcon icon={getIcon(condition)} ></FontAwesomeIcon>
            </div>
            <p className="text-base lg:text-xs font-extralight text-center">{getPhrase(condition)}</p>

            <div className="flex gap-2 lg:gap-9 mt-4 items-center justify-center w-full">
                <WeatherBox title="ICA">{analytics.aqius}</WeatherBox>
                <WeatherBox title="RH">{analytics.humidity}%</WeatherBox>
                <WeatherBox title="WS">{analytics.wind} km/h</WeatherBox>
            </div>

            <div className="mt-4 w-[100%] flex justify-center itens-center">
                <WeatherBox title="UV">{analytics.solarradiation}</WeatherBox>
            </div>
            <div className="flex items-center justify-center gap-2 lg:w-[30%] text-center">
                <FontAwesomeIcon size="1x" icon={faCircleInfo} className="text-4xl" />
                <p className="text-xs font-extralight">This analytics was obtained from VisualCrossing.com at {analytics.datetime.split(" ")[1].split(":")[0]}:00 which may cause discrepancies with most up-to-date information.</p>
            </div>
        </>
    )


    return (
        <div className="w-full h-[65vh] flex flex-col items-center justify-center text-white gap-4">
            {SkeletonNode}
        </div>
    );
}

export default MainWeatherAnalytics;
