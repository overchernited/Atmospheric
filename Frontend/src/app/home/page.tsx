"use client"

import Link from "next/link"
import Btn from "../../components/Btn"
import PageBackground from "../../hooks/Background"
import PageTitle from "../../components/PageTitle"
import bybrand from "../assets/Branding/bybrand.png"
import Image from 'next/image';
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons"

const Home = () => {


    return (
        <>
            <PageBackground>
                <div className="flex flex-col h-[50vh] justify-center items-center text-2xl pt-5">
                    <div className="p-5 backdrop-blur-xl w-[95%] xl:w-[50vw] rounded-xl shadow-zinc-800 shadow-2xl text-2xl">
                        <div className="flex flex-row justify-start items-center gap-4 text-4xl text-white">
                            <Link href="/" className="btn hardhover"><FontAwesomeIcon icon={faArrowLeft} /></Link>
                            <p className="font-bold text-left">Authentication</p>
                        </div>
                        <div className="flex justify-center flex-col items-center gap-5">
                            <Link href="/auth/signup" className="w-[80%] h-[30%] md:h-[50%] btn positive shrink-0 hardhover lg:text-3xl md:text-2xl text-xl p-2">SIGN UP <FontAwesomeIcon icon={faArrowLeft} /></Link>
                            <Link href="/auth/login" className="w-[80%] h-[30%] md:h-[50%] btn negative shrink-0 hardhover lg:text-3xl md:text-2xl text-xl p-2">LOGIN <FontAwesomeIcon icon={faArrowRight} /></Link>
                        </div>
                    </div>
                </div>
            </PageBackground>
        </>
    )

}

export default Home