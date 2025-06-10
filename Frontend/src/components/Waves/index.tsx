"use client"


import Image from 'next/image';
import type { ReactNode } from "react"
import { usePathname } from "next/navigation";
import AccentLogo from "../../app/assets/Branding/whiteaccentbrand.png"

const TopWave = () => {
    const pathname = usePathname();
    const isSimple = ["/auth/login", "/auth/signup"].includes(pathname.padEnd(1));
    const isBlackList = ["/"].includes(pathname.padEnd(1));
    const isHome = ["/home"].includes(pathname.padEnd(1));
    const lastSegment = pathname.split("/").filter(Boolean).pop()?.toUpperCase() || "ATMOSPH";


    if (isBlackList) return null;
    if (isSimple) return (
        <Image
            src={AccentLogo}
            alt="Logo"
            className='w-[95vw] h-[3vh] md:w-[45vw] md:h-[6vh] absolute top-0 left-1/2 -translate-x-1/2 mt-20'
            priority
        />
    )

    return (
        <div className="absolute top-0 h-[30%] w-full overflow-hidden">
            <div className="transform rotate-180 h-full w-full md:-translate-x-36 xl:translate-x-20">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" className="h-full -translate-x-1/3 lg:-translate-x-1/6" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#141313] "></path>
                </svg>
            </div>
            <div className="absolute top-1/3 text-white w-full flex justify-center h-full md:translate-x-3 text-5xl tracking-[30px] font-bold">
                {isHome ? (
                    <Image
                        src={AccentLogo}
                        alt="Logo"
                        className='w-[95vw] h-[3vh] md:w-[45vw] md:h-[6vh]'
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