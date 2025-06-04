"use client"


import Image from 'next/image';
import type { ReactNode } from "react"
import { usePathname } from "next/navigation";
import AccentLogo from "../../app/assets/Branding/whiteaccentbrand.png"

const TopWave = () => {
    const pathname = usePathname();
    const isLanding = pathname.padEnd(1) === "/";
    const isHome = pathname.padEnd(1) === "/home";
    const lastSegment = pathname.split("/").filter(Boolean).pop()?.toUpperCase() || "ATMOSPH";


    if (isLanding) return null;

    return (
        <div className="absolute top-0 h-[30%] w-full overflow-hidden ">
            <div className="transform rotate-180 h-full lg:translate-x-0 -translate-x-36">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" className="h-full -translate-x-1/3 lg:-translate-x-1/6" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#141313] "></path>
                </svg>
            </div>
            <div className="absolute top-1/3 text-white w-full flex justify-center h-full translate-x-3 text-5xl tracking-[30px] font-bold">
                {isHome ? (
                    <Image
                        src={AccentLogo}
                        alt="Logo"
                        className="lg:w-[32%] lg:h-[15%] h-[50px]"
                        priority
                    />
                ) : (
                    <p>{lastSegment}
                    </p>
                )}
            </div>
        </div>
    )
}

export default TopWave