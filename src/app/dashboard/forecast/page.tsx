"use client"

import PageBackground from "@/hooks/Background"
import MainWeatherAnalytics from "./Components/MainWeatherAnalytics"
import HourlyWeatherAnalytics from "./Components/HourlyWeatherAnalytics"
import Btn from "@/components/Btn"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useNotifications } from "@/components/Notifications/useNotification"

const Forecast = () => {

    return (
        <>
            <PageBackground>
                <div className="flex flex-col justify-center items-center gap-15">
                    <MainWeatherAnalytics />
                    <HourlyWeatherAnalytics />
                    <Link href="/dashboard/fullforecast" className="btn blurry !font-semibold !tracking-normal mb-20 shrink-0 hardhover lg:text-3xl md:text-2xl text-xl !rounded-md p-2 flex items-center justify-center gap-2">See more predictions <FontAwesomeIcon icon={faArrowRight} /></Link>
                </div>
            </PageBackground>

        </>
    )
}


export default Forecast