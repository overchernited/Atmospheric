"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import AccentLogo from "../../../public/branding/whiteaccentbrand.png";
import ContractionLogo from "../../../public/branding/whitebrand.png";
import Skeleton from "react-loading-skeleton";

const PageTitle = () => {
    const pathname = usePathname();
    const [city, setCity] = useState<string | null>(null);

    // Normaliza ruta
    const normalizePath = (p: string) => p.replace(/\/+$/, "") || "/";
    const currentPath = normalizePath(pathname);

    // Rutas especiales
    const SIMPLE_ROUTES = ["/auth/login", "/auth/signup"];
    const BLACKLIST_ROUTES = ["/", "/auth/login", "/auth/signup"];
    const HOME_ROUTE = "/home";
    const FORECAST_ROUTE = "/forecast";

    /** Obtener ciudad solo en /forecast */
    useEffect(() => {
        if (currentPath !== FORECAST_ROUTE || city) return;

        (async () => {
            try {
                // 1. Geolocalización
                const pos = await new Promise<GeolocationPosition>((res, rej) =>
                    navigator.geolocation.getCurrentPosition(res, rej, {
                        enableHighAccuracy: true,
                        timeout: 10_000,
                    })
                );
                const { latitude, longitude } = pos.coords;

                const res = await fetch(
                    `/api/location?latlng=${latitude},${longitude}`,
                    { cache: "no-store" }
                );
                if (!res.ok) throw new Error("weather error");

                const data: { city: string } = await res.json();
                setCity((data.city).toUpperCase());
            } catch {
                setCity("FORECAST");
            }
        })();
    }, [currentPath, city]);

    if (BLACKLIST_ROUTES.includes(currentPath)) return null;

    if (SIMPLE_ROUTES.includes(currentPath)) {
        return (
            <Image
                src={ContractionLogo}
                alt="Logo"
                priority
                className="absolute top-0 right-0 mt-15 2xl:mt-20 w-[95vw] h-[3vh] md:w-[50vw] md:h-[6vh]"
            />
        );
    }

    const isHome = currentPath === HOME_ROUTE;
    const isForecast = currentPath === FORECAST_ROUTE;

    const defaultTitle =
        currentPath.split("/").filter(Boolean).pop()?.toUpperCase() || "ATMOSPH";

    const title = isForecast ? city : defaultTitle;

    return (
        <div className="relative top-[-0] h-[30%] w-full overflow-hidden">

            <div className="h-full w-full transform rotate-180 md:-translate-x-36 xl:translate-x-20">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="h-full -translate-x-1/3 lg:-translate-x-1/6"
                >
                    <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="fill-[#141313]"
                    />
                </svg>
            </div>

            <div className="absolute top-1/3 flex h-full w-full justify-center text-3xl lg:text-5xl font-bold tracking-[30px] text-white md:translate-x-3">
                {isHome ? (
                    <Image
                        src={AccentLogo}
                        alt="Logo"
                        priority
                        className="w-[95vw] h-[3vh] md:w-[45vw] md:h-[6vh]"
                    />
                ) : (
                    title ? (
                        <p className="text-center">{title}</p>
                    ) : (
                        <Skeleton width={500} height={50} baseColor="#2b2f6e"        // gris oscuro
                            highlightColor="#734382" />
                    )
                )}
            </div>
        </div>
    );
};

export default PageTitle;
