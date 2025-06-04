"use client"

import background from '../../app/assets/background.webp';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export default function PageLayout({ children }: { children: ReactNode }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [bgPosition, setBgPosition] = useState({ x: 10, y: 0 });
    const containerRef = useRef<HTMLDivElement | null>(null);

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
        const lerpSpeed = 0.05;


        const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

        const updateBackgroundPosition = () => {
            if (containerRef.current) {
                const { x, y } = mousePosition;
                const width = containerRef.current.offsetWidth;
                const height = containerRef.current.offsetHeight;

                // Cálculos del movimiento del fondo en ambos ejes
                const moveX = ((x / width) - 0.2) * 40; 
                const moveY = ((y / height) - 0.2) * 40; // Mueve el fondo entre -20% y 20% verticalmente

                // Aplicamos interpolación para suavizar el movimiento
                setBgPosition((prev) => ({
                    x: lerp(prev.x, moveX, lerpSpeed),
                    y: lerp(prev.y, moveY, lerpSpeed),
                }));
            }
        };

        // Llamar a la función de actualización de fondo en cada renderizado
        const interval = setInterval(updateBackgroundPosition, 16); // 16ms (aproximadamente 60FPS)

        return () => {
            clearInterval(interval);
        };
    }, [mousePosition]);

    return (
        <>
            <div
                ref={containerRef}
                className="w-full h-full transition-all duration-300 ease-out absolute top-0 z-[-2]"
                style={{
                    backgroundImage: `url(${background.src})`,
                    backgroundPosition: `${bgPosition.x}px ${bgPosition.y}px`,
                    backgroundRepeat: 'repeat', // o 'repeat-x'
                    backgroundSize: 'cover', // o un tamaño específico como '600px'
                    pointerEvents: 'none',
                }}
            >
            </div>
            <div className="relative z-0 h-full">
                {children}
            </div>
        </>
    );
}
