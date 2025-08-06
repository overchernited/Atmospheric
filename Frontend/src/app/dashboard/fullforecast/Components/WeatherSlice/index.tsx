"use client";

import { faCloud, faCloudSun, faSun, faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { format, parseISO, addDays, isSameDay } from "date-fns";

interface WeatherSlice {
    datetime: string;
    conditions: string;
    temp: number;
    wind: number;
    aqius: number;
    humidity: number;
    uvindex: number;
}


const conditionIcons: Record<string, IconDefinition> = {
    clear: faCloud,
    partially: faCloudSun,
    cloudy: faCloud,
    overcast: faCloud,
    sunny: faSun,
    rain: faCloudRain,
};


const WeatherSlice = (props: WeatherSlice) => {


    const getIcon = (condition: string): IconDefinition => {
        const lower = condition.toLowerCase();

        for (const key in conditionIcons) {
            if (lower.includes(key)) {
                return conditionIcons[key];
            }
        }

        return faCloud;
    }

    const getLabel = () => {
        if (!props.datetime) return '';

        const today = new Date();
        const tomorrow = addDays(today, 1);
        const dateObj = parseISO(props.datetime);

        if (isSameDay(dateObj, today)) return 'Today';
        if (isSameDay(dateObj, tomorrow)) return 'Tomorrow';

        return format(dateObj, 'EEEE'); // nombre del día en inglés (e.g., Saturday)
    };

    return (
        <>
            <motion.div
                className="group flex flex-col overflow-hidden rounded-2xl justify-center items-center w-full md:w-[35rem] backdrop-blur-3xl h-[10rem] text-white"
                initial={{ height: "10rem" }}
                whileHover={{ scale: 1.1, height: "15rem" }}>
                <div className="flex items-center justify-around w-full">
                    <p className="font-bold text-2xl md:text-3xl">{getLabel()}</p>
                    <div className="flex flex-col justify-center items-center">
                        <FontAwesomeIcon icon={getIcon(props.conditions)} size="2xl" />
                        <p className="font-light text-sm">{props.conditions}</p>
                    </div>
                    <p className="font-normal text-2xl md:text-3xl">{props.wind} km/h</p>
                </div>
                <div className="absolute bottom-0 group-hover:opacity-100 group-hover:visible visible md:opacity-0 md:invisible transition-opacity duration-100 flex items-center justify-around w-full p-2">
                    <p className="font-light text-md">ICA: {props.aqius}</p>
                    <p className="font-light text-md">UV: {props.uvindex}</p>
                    <p className="font-light text-md">RH: {props.humidity}</p>
                </div>
            </motion.div>
        </>
    );
};

export default WeatherSlice;
