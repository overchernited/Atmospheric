"use client"

import rainBg from "../../app/assets/raining.webp";
import cloudyBg from "../../app/assets/cloudy.webp";
import sunnyBg from "../../app/assets/sunny.webp";
import defaultBg from "../../app/assets/background.webp";   // el que ya tenías
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from 'next/navigation';

interface Analytics {
    temp: number;
    humidity: number;
    wind: number;
    solarradiation: number;
    aqius: number;
    conditions: string
}


export default function PageBackground({ children }: { children: ReactNode }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [bgPosition, setBgPosition] = useState({ x: 10, y: 0 });
    const [conditions, setConditions] = useState<String>("clear");

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [bgImage, setBgImage] = useState<StaticImageData>(defaultBg);
    const pathname = usePathname();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            setMousePosition({ x: clientX, y: clientY });
        };

        // Agregar el evento de movimiento del mouse
        window.addEventListener('mousemove', handleMouseMove);

        // Limpiar el evento cuando el componente se desmonte
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);


    useEffect(() => {
        if (pathname !== '/forecast') return;
        (async () => {
            try {
                const pos = await new Promise<GeolocationPosition>((res, rej) =>
                    navigator.geolocation.getCurrentPosition(res, rej, {
                        enableHighAccuracy: true,
                        timeout: 10_000,
                    })
                );
                const { latitude, longitude } = pos.coords;

                const res = await fetch(
                    `/api/currentconditions?loc=${latitude},${longitude}&tz=${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
                    { cache: "no-store" }
                );
                if (!res.ok) throw new Error("weather error");

                const data: Analytics = await res.json(); // tu objeto
                const cond = data.conditions.toLowerCase();

                setConditions(cond);

                if (cond.includes("rain")) setBgImage(rainBg);
                else if (cond.includes("cloud")) setBgImage(cloudyBg);
                else if (cond.includes("sun")) setBgImage(sunnyBg);
                else if (cond.includes("clear")) setBgImage(defaultBg);
                else setBgImage(defaultBg);
            } catch {
                setBgImage(defaultBg);            // fallback
            }
        })();
    }, []);

    useEffect(() => {
        const lerpSpeed = 0.05;


        const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

        const updateBackgroundPosition = () => {
            if (containerRef.current) {
                const { x, y } = mousePosition;
                const width = containerRef.current.offsetWidth;
                const height = containerRef.current.offsetHeight;

                // Cálculos del movimiento del fondo en ambos ejes
                const moveX = ((x / width) - 0.2) * 50;
                const moveY = ((y / height) - 0.2) * 50; // Mueve el fondo entre -20% y 20% verticalmente

                // Aplicamos interpolación para suavizar el movimiento
                setBgPosition((prev) => ({
                    x: lerp(prev.x, moveX, lerpSpeed),
                    y: lerp(prev.y, moveY, lerpSpeed),
                }));
            }
        };

        // Llamar a la función de actualización de fondo en cada renderizado
        const interval = setInterval(updateBackgroundPosition, 24); // 16ms (aproximadamente 60FPS)

        return () => {
            clearInterval(interval);
        };
    }, [mousePosition]);

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    key={bgImage?.src}
                    ref={containerRef}
                    className={`w-full min-h-full transition-all duration-300 background-cover ease-out fixed top-0 z-[-2] ${bgImage === defaultBg && conditions !== "clear" && pathname == "/forecast" ? "blur-3xl" : ""}`}
                    style={{
                        backgroundImage: `url(${bgImage?.src})`,
                        backgroundPosition: `${bgPosition.x}px ${bgPosition.y}px`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: 'cover',
                        pointerEvents: 'none',
                    }}
                >
                </motion.div>
            </AnimatePresence>
            {children}
        </>
    );
}
