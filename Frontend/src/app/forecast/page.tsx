import PageBackground from "@/hooks/Background"
import MainWeatherAnalytics from "./Components/MainWeatherAnalytics"
import HourlyWeatherAnalytics from "./Components/HourlyWeatherAnalytics"

const Forecast = () => {
    return (
        <>

            <PageBackground>
                <MainWeatherAnalytics />
                <HourlyWeatherAnalytics />
            </PageBackground>

        </>
    )
}


export default Forecast