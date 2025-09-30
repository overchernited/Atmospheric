"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { twMerge } from "tailwind-merge"


interface InfoDotProps {
    className?: string
    text: string
}

interface TextPopUpProps {
    x: number;
    y: number;
    text: string;
}

const TextPopUp = ({ x, y, text }: TextPopUpProps) => {
    return (
        <div
            className="fixed z-[1000] bg-[#141313] max-w-96 text-white text-sm p-2 rounded pointer-events-none transition-opacity duration-200 md:visible invisible"
            style={{ top: y + 10, left: x + 10 }}
        >
            {text}
        </div>
    );
};

import { useState } from "react";

interface InfoDotProps {
    text: string;
}

const InfoDot = (props: InfoDotProps) => {
    const [hovering, setHovering] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        setPos({ x: e.clientX, y: e.clientY });
    };

    return (
        <div
            className="relative w-[1rem] md:visible invisible"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={handleMouseMove}
        >
            <FontAwesomeIcon icon={faCircleInfo} className="text-white w-4 h-4 cursor-pointer" />
            {hovering && <TextPopUp x={pos.x} y={pos.y} text={props.text} />}
        </div>
    );
};

export default InfoDot;
