"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import whitebrand from "@/app/assets/Branding/whiteaccentbrand.png"
import logo from "@/app/assets/atmosphericlogo.png"

const LogoHeader = () => {
    return (
        <>
            <motion.div
                animate={{ opacity: [1, 0.8, 0.6, 0.4, 0.2, 0], display: "none" }} transition={{ duration: 0.5, ease: "easeInOut" }} className="h-full w-full fixed bg-[#000000] z-[1000]">

            </motion.div>
            <motion.div
                animate={{ opacity: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                transition={{ duration: 4 }}
                className="flex flex-col items-center justify-center gap-2 md:gap-9 h-full pt-[10%] pb-[10%]">
                <Image src={whitebrand} alt="Logo" className="w-[95%] lg:w-[80%] " />
                <p className="text-center text-xl lg:text-5xl text-white font-bold">Forecasts that Matter.</p>
                <Image src={logo} alt="Logo" className="w-[30%] lg:w-[10%] lg:m-5" />
            </motion.div>
        </>
    )
}

export default LogoHeader