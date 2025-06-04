"use client"

import Link from "next/link"
import Btn from "../../components/Btn"
import PageLayout from "../../components/Layout"
import TopWave from "../../components/Waves"
import bybrand from "../assets/Branding/bybrand.png"
import Image from 'next/image';
import { useState } from "react"

const Home = () => {


    return (
        <>
            <PageLayout>
                <div className="flex flex-col justify-center items-center text-2xl h-full">
                    <div className="p-10 backdrop-blur-xl w-[80%] h-[30%] lg:w-[40%] lg:h-[20%] rounded-xl shadow-zinc-800 shadow-2xl flex justify-center flex-col items-center gap-5 text-2xl">
                        <Link href="/auth/signup" className="w-[50%] h-[50%] btn  positive shrink-0 hardhover ">SIGN UP</Link>
                        <Link href="/auth/login" className="w-[50%] h-[50%] btn  negative shrink-0 hardhover ">LOGIN</Link>
                    </div>
                </div>

                <Image
                    src={bybrand}
                    alt="Logo"
                    width={200}
                    height={100}
                    className="h-[5%] absolute bottom-0 text-center transition-transform hover:scale-[1.2] hover:cursor-pointer m-5"
                />

            </PageLayout >
        </>
    )

}

export default Home