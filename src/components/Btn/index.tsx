"use client"

import { twMerge } from "tailwind-merge"



interface BtnProps {
    children: React.ReactNode,
    onClick: () => void,
    className?: string,
    style: "blurry" | "positive" | "negative"
}


const Btn = (props: BtnProps) => {
    return (
        <button className={twMerge(props.className, props.style, "btn p-3")} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Btn