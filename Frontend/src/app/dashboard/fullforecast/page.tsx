import PageBackground from "@/hooks/Background"
import FiveDayForecast from "./Components/FiveDayForecast"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import DashboardLayout from "../dashboardLayout"

const fullforecast = () => {
    return (
        <DashboardLayout>
            <PageBackground>
                <div className="gap-5 flex flex-col w-full h-[40rem] justify-center items-center my-5 p-2">
                    <FiveDayForecast />
                    <Link href="/dashboard/forecast" className="btn blurry !font-semibold !tracking-normal mb-20 shrink-0 hardhover lg:text-3xl md:text-2xl text-xl !rounded-md p-2 flex items-center justify-center gap-2">
                        Go back
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </div>
            </PageBackground>
        </DashboardLayout>
    )
}

export default fullforecast