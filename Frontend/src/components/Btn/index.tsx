import React from "react";
import { twMerge } from "tailwind-merge";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnStyle: "blurry" | "positive" | "negative";
    className?: string;
}

const Btn = (props: BtnProps) => {
    const { children, className, btnStyle, ...rest } = props;

    return (
        <button
            className={twMerge(className, btnStyle, "btn p-3")}
            {...rest} // Aquí pasan todas las props intrínsecas (onClick, disabled, type, etc)
        >
            {children}
        </button>
    );
};

export default Btn;
