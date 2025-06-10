
"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInputContext } from "@/hooks/InputContext/useContext";
import { twMerge } from "tailwind-merge";

interface InputProps {
    placeholder: string;
    icon: icon.IconDefinition;
    className?: string;
    name: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
}

const CustomInput = (props: InputProps) => {
    const { values, setValue } = useInputContext();
    const [focus, setFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(props.name, e.target.value); // Actualiza el contexto
        props.onChange(e); // Pasa el cambio a react-hook-form
    };

    return (
        <motion.div
            animate={{ scale: focus ? 1.04 : 1 }}
            transition={{ type: "spring", duration: 0.5, stiffness: 200 }}
            className={`${twMerge(" m-1 relative", props.className)}`}
        >
            <div
                className={`select-none absolute top-[25%] left-8 bg-[#141414] px-4 rounded-full text-[#7e4db2] items-center transition-all flex flex-row gap-2 text-xl lg:text-3xl z-40 ${focus || (values[props.name] && values[props.name].length > 0)
                    ? "-translate-y-[100%]"
                    : ""
                    }`}
                onClick={() => inputRef.current?.focus()}
            >
                <FontAwesomeIcon icon={props.icon} />
                <p className="font-semibold">{props.placeholder}</p>
            </div>
            <input
                ref={inputRef}
                name={props.name}
                value={props.value}
                onChange={handleChange}
                onFocus={() => setFocus(true)}
                onBlur={() => {
                    setFocus(false);
                    props.onBlur();
                }}
                {...props.inputAttributes}
                className={`${twMerge('shadow-lg rounded-full outline-0 m-2 p-4 pl-6 transition-all text-white duration-100 text-2xl w-full relative bg-[#141414] border-2', props.inputAttributes?.className, focus ? "border-[#7e4db2]" : "border-transparent")}`}
            />
        </motion.div>
    );
};

export default CustomInput;
