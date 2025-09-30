"use client";

import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";

interface NavButtonProps {
    to: string;
    icon: IconDefinition;
    children: React.ReactNode;
    color: string;
    className?: string;
}

const NavButton = (props: NavButtonProps) => {
    const router = useRouter();
    const [isHover, setIsHover] = useState(false);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (props.to.startsWith("#")) {
            e.preventDefault();
            const id = props.to.substring(1);
            const element = document.querySelector("#" + id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            router.push(props.to);
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1, color: props.color, cursor: "pointer" }}
            type="button"
            onClick={handleClick}
            className={twMerge("flex gap-2 items-center relative text-white", props.className)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <FontAwesomeIcon icon={props.icon} className="text-2xl " />

            <AnimatePresence>
                {isHover && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-7 md:top-8 left-1/2 -translate-x-1/2 font-bold text-white bg-gradient-to-br from-[#4c3561] to-[#1b1b1b] p-1 rounded-lg md:text-sm text-xs"
                    >
                        {props.children}
                    </motion.div>

                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default NavButton;
