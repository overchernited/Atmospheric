"use client"

import { InputProvider } from "@/hooks/InputContext"
import CustomInput from "@/components/Input"
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Btn from "@/components/Btn"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

const LoginForm = () => {
    return (
        <div className="flex items-center justify-center flex-col gap-1">
            <InputProvider>
                <p className="text-4xl text-white font-bold ">Welcome back!</p>
                <CustomInput className="w-[90%]" placeholder="E-mail" icon={faEnvelope} name="email" onChange={() => { }} onBlur={() => { }} inputAttributes={{}} />
                <CustomInput className="w-[90%]" placeholder="Password" icon={faEnvelope} name="password" onChange={() => { }} onBlur={() => { }} inputAttributes={{}} />
                <div className="absolute flex flex-col items-center justify-center bottom-0 w-full">
                    <Btn className="positive hardhover text-2xl w-[60%]" style="positive" onClick={() => { }}>NEXT <FontAwesomeIcon icon={faArrowRight} /></Btn>
                    <Link className="!rounded-full positive btn p-2 softhover text-base md:w-[50%] !tracking-normal m-2 negative" href="/auth/signup">Don't have an account?</Link>
                </div>
                <div className="flex flex-col items-center justify-center text-white text-md font-normal gap-2">
                    <p className="text-xl font-normal">or use</p>
                    <Btn className="negative hardhover text-2xl h-[3rem] w-[10rem] !rounded-full !tracking-normal" style="positive" onClick={() => { }}><FontAwesomeIcon icon={faGoogle} /> oogle</Btn>
                </div>
            </InputProvider>
        </div>
    )
}

export default LoginForm