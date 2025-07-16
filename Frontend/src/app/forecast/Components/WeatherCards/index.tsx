import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faCloudsmith, faSoundcloud } from "@fortawesome/free-brands-svg-icons"
import { faCloud, faSun, faCloudRain, faCloudSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"



interface WeatherCard {
    date: string
    conditions: string
    hour: string
    humidity: number
    temp: number
    wind: number
    solarradiation: number
    aqius: number
    feelslike: number
}

const conditionIcons: Record<string, IconDefinition> = {
    clear: faCloud,
    partially: faCloudSun,
    cloudy: faCloud,
    sunny: faSun,
    rain: faCloudRain,
};

const WeatherCard = (props: WeatherCard) => {

    function getIcon(condition: string): IconDefinition {
        const lower = condition.toLowerCase();

        for (const key in conditionIcons) {
            if (lower.includes(key)) {
                return conditionIcons[key];
            }
        }
        // fallback si no hay coincidencia
        return faCloud;
    }

    const icon = getIcon(props.conditions);



    return (
        <motion.div
            whileHover={{ scale: 1.1, boxShadow: '0px 1px 100px #5f35697f', zIndex: 100 }}

            className="flex flex-col items-center justify-center w-[100%] xl:w-auto ">
            <div className="relative backdrop-blur-3xl bg-white/5 h-[20rem] w-full xl:w-[10rem] rounded-lg overflow-hidden shrink-0 text-center p-5 text-white">
                <h1 className="font-bold text-4xl">{props.hour}</h1>
                <section className="flex flex-col my-4 text-xl items-center justify-center">
                    <FontAwesomeIcon className="text-xs h-12 w-12" fixedWidth={false} size="sm" icon={icon}></FontAwesomeIcon>
                    <p className="font-light text-xs">{props.conditions}</p>
                </section>
                <p className="font-light text-base">ICA {props.aqius}</p>
                <p className="font-light text-base">RH {props.humidity}</p>
                <p className="font-light text-base">WS {props.wind} km/h</p>
                <p className="font-light text-base">UV {props.solarradiation}</p>
                <section className="flex flex-col mb-2 absolute bottom-0  left-1/2 -translate-x-1/2">
                    <h1 className="font-semibold text-3xl">{props.temp}°C</h1>
                    <p className="font-extralight text-xs">feels like {props.feelslike}</p>
                </section>
            </div>
            <p className="text-center text-white fond-medium">{props.date}</p>
        </motion.div>
    )
}

export default WeatherCard