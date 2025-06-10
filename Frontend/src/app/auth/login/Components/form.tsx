"use client"

import { InputProvider } from "@/hooks/InputContext"
import CustomInput from "@/components/Input"
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Btn from "@/components/Btn"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const LoginForm = () => {
    return (
        <div className="flex items-center justify-center flex-col gap-1">
            <InputProvider>
                <CustomInput className="w-full" placeholder="E-mail" icon={faEnvelope} name="email" onChange={() => { }} onBlur={() => { }} inputAttributes={{}} />
                <CustomInput className="w-full" placeholder="Password" icon={faEnvelope} name="password" onChange={() => { }} onBlur={() => { }} inputAttributes={{}} />
                <div className="absolute flex flex-col items-center justify-center bottom-0 w-full">
                    <Btn className="positive hardhover text-2xl w-[60%]" style="positive" onClick={() => { }}>NEXT <FontAwesomeIcon icon={faArrowRight} /></Btn>
                    <Link className="!rounded-full positive btn p-2 softhover text-base md:w-[50%] !tracking-normal m-2 negative" href="/auth/signup">Don't have an account?</Link>
                </div>
            </InputProvider>
        </div>
    )
}

export default LoginForm