"use client"

import { InputProvider } from "@/hooks/InputContext"
import CustomInput from "@/components/Input"
import { faEnvelope, faArrowRight, faUser } from "@fortawesome/free-solid-svg-icons"
import Btn from "@/components/Btn"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const SignUpForm = () => {
    return (
        <div className="flex items-center justify-center flex-col xl2:gap-2">
            <InputProvider>
                <div className="flex flex-col items-center justify-center text-white text-md font-normal gap-2 m-2">
                    <p className="font-medium text-1xl">Create an account to start this adventure.</p>
                </div>
                <CustomInput className="w-[90%]" placeholder="Name" icon={faUser} name="Name" onChange={() => { }} onBlur={() => { }} inputAttributes={{}} />
                <CustomInput className="w-[90%]" placeholder="E-mail" icon={faEnvelope} name="email" onChange={() => { }} onBlur={() => { }} inputAttributes={{}} />
                <CustomInput className="w-[90%]" placeholder="Password" icon={faEnvelope} name="email" onChange={() => { }} onBlur={() => { }} inputAttributes={{}} />
                <div className="absolute flex flex-col items-center justify-center bottom-0 w-full">
                    <Btn className="positive hardhover text-2xl w-[60%]" style="positive" onClick={() => { }}>NEXT <FontAwesomeIcon icon={faArrowRight} /></Btn>
                    <Link className="!rounded-full positive btn p-2 softhover text-base md:w-[50%] !tracking-normal m-2 negative" href="/auth/login">Already have an account?</Link>
                </div>
            </InputProvider>
        </div>
    )
}

export default SignUpForm