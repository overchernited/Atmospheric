"use client"

import PageBackground from "@/hooks/Background"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from "next/navigation"
import { useNotifications } from "@/components/Notifications/useNotification"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


const confirmation = () => {


    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const access_token = searchParams.get('access_token')

    const router = useRouter()



    useEffect(() => {
        if (access_token) {
            router.push("/auth/login")
        }
    })


    return (
        <PageBackground>
            <div className="flex flex-col justify-center items-center text-2xl h-[40rem] w-full">
                <div className="md:p-10 xl:p-4 backdrop-blur-xl w-full h-full md:h-[14rem] md:w-[40rem] rounded-3xl shadow-zinc-800 shadow-2xl text-2xl">
                    <div className="flex flex-row justify-start items-center gap-4 text-4xl text-white m-3">
                        <Link href="/auth/signup" className="btn hardhover"><FontAwesomeIcon icon={faArrowLeft} /></Link>
                        <p className="font-bold text-left">Email sent</p>
                    </div>
                    <p className="text-white font-normal text-center text-2xl mt-10 md:m-0">Check your email: <span className="font-semibold"> {decodeURIComponent(email || "johndoe@gmail.com")} </span> and click the link we sent to follow the process!</p>
                </div>
            </div>
        </PageBackground>
    )
}

export default confirmation