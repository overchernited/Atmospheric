import PageBackground from "@/hooks/Background"
import MainWeatherAnalytics from "./Components/MainWeatherAnalytics"
import HourlyWeatherAnalytics from "./Components/HourlyWeatherAnalytics"

const Forecast = () => {
    return (
        <>

            <PageBackground>
                <div className="flex flex-col justify-center items-center gap-15">
                    <MainWeatherAnalytics />
                    <HourlyWeatherAnalytics />
                </div>
            </PageBackground>

        </>
    )
}


export default Forecast