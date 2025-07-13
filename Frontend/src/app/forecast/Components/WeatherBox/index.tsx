import React from "react"


interface WeatherBoxProps {
    children: React.ReactNode;
    title: string
}



const WeatherBox = (props: WeatherBoxProps) => {
    return (
        <div className="backdrop-blur-3xl w-[30%] h-full 2xl:w-[8rem] 2xl:h-[6.5rem] bg-white/5 rounded-md overflow-hidden flex flex-col items-center justify-center shrink-0">
            <p className="font-semibold text-3xl">{props.title}</p>
            <p className="font-medium text-2xl">{props.children}</p>
        </div>
    )
}

export default WeatherBox