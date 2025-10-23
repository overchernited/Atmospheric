import PageBackground from "@/hooks/Background"
import RecomendationCard from "./Components/RecomendationCard"
import { faCloudRain, faLungs, faSun, faThermometer, faWind } from "@fortawesome/free-solid-svg-icons"

const Recomendations = () => {
    return (
        <PageBackground>
            <div className="flex gap-10 flex-wrap items-center justify-center text-2xl h-auto w-full p-5 shrink-0">
                <RecomendationCard icon={faSun} title="Recomendation Sun Radiation (UV)">
                    <p>- If it’s above 6, use sunscreen and sunglasses.</p>
                    <p>- If it’s between 0–2, no solar risk..</p>
                </RecomendationCard>
                <RecomendationCard icon={faLungs} title="Recomendation Air Quality (ICA)">
                    <p>- If it’s above 100, avoid outdoor exercise.</p>
                    <p>- If it’s below 50, the air is clean and safe.</p>
                </RecomendationCard>
                <RecomendationCard icon={faCloudRain} title="Recomendation Humidity (RH)">
                    <p>- If it’s over 80 %, wear a mask or ventilate the room.</p>
                    <p>- If it’s below 30 %, drink water and humidify the air.</p>
                </RecomendationCard>
                <RecomendationCard icon={faWind} title="Recomendation Wind Speed (WS)">
                    <p>- If it’s over 20 km/h, secure loose objects and skip umbrellas.</p>
                    <p>- If it’s under 5 km/h, the air will feel still and heavy.</p>
                </RecomendationCard>
                <RecomendationCard icon={faThermometer} title="Recomendation Temperature">
                    <p>- If it’s below 10 °C, dress warmly.</p>
                    <p>- If it’s above 25 °C, stay hydrated and avoid direct sun.</p>
                </RecomendationCard>
            </div>
        </PageBackground>
    )
}

export default Recomendations