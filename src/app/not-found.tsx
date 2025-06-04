"use client"


import Btn from "@/components/Btn"
import fourzerofour from "../app/assets/404.webp"
import Image from "next/image"
const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#141313] flex flex-col justify-center items-center">
            <Image src={fourzerofour} alt="Logo" className="w-[25%]" />
            <p className="font-bold text-4xl text-white">The page you are looking for does not exist!</p>
            <Btn className="w-[20%] h-[50%] shrink-0 softhover mt-5" style="negative" onClick={() => { window.location.href = "/" }}>Take me home</Btn>
        </div>

    )
}

export default NotFound