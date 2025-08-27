import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState, useEffect } from "react";
import { faBattery, faSeedling, faSkull } from "@fortawesome/free-solid-svg-icons"
import { motion } from 'framer-motion'

export function FormSelection() {
    const iconsRef = useRef<HTMLDivElement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ x: number }>({ x: 0 });
    const [type, setType] = useState<string>("");

    // Inicializa array de refs si no existe
    if (iconsRef.current.length === 0) {
        iconsRef.current = [];
    }

    useEffect(() => {
        // Posicionar el div sobre el primer icono al montar
        if (containerRef.current && iconsRef.current[0]) {
            const firstIcon = iconsRef.current[0];
            setPosition({ x: firstIcon.offsetLeft + firstIcon.offsetWidth / 2 - 32 }); // 32 = mitad del div absoluto (64px ancho / 2)
        }
    }, []);

    const handleClick = (index: number) => {
        const icon = iconsRef.current[index];
        if (icon) {
            const newType = icon.getAttribute("type-attr")!;
            setPosition({ x: icon.offsetLeft + icon.offsetWidth / 2 - 38 });
            setType(newType);
            console.log(newType); // ✅ aquí sí verás el valor correcto
        }
    };

    return (
        <div className="w-auto h-auto relative p-10">
            {/* Div absoluto animado con Framer Motion */}
            <motion.div
                className="h-18 w-18 rounded-full bg-[#141414] absolute z-20 translate-y-1/6"
                animate={{ x: position.x }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />

            {/* Contenedor de iconos */}
            <div
                className="bg-[#7347a1] text-white text-5xl w-auto p-2 flex justify-center items-center gap-20 rounded-full relative"
                ref={containerRef}
            >
                {[faSeedling, faSkull, faBattery].map((icon, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            iconsRef.current[i] = el!; // solo asigna, no devuelvas nada
                        }}
                        onClick={() => handleClick(i)}
                        type-attr={icon.iconName}
                        className="cursor-pointer p-4 z-[30]"
                    >
                        <FontAwesomeIcon icon={icon} />
                    </div>
                ))}
            </div>
        </div>
    );
}


const AddPoint = () => {
    return (
        <div className="text-5xl w-full flex justify-center items-center gap-5">
            <FormSelection />
        </div>
    )
}

export default AddPoint