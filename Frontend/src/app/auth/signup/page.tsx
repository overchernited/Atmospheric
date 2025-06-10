import PageLayout from "@/components/Layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import SignUpForm from "./Components/form"


const signup = () => {
    return (
        <PageLayout>
            <div className="flex flex-col justify-center items-center text-2xl h-full w-full">
                <div className="md:p-10 p-4 backdrop-blur-xl h-[65%] md:w-[60%] md:h-[85%] lg:w-[40%] lg:h-[65%] rounded-3xl shadow-zinc-800 shadow-2xl text-2xl">
                    <div className="flex flex-row justify-start items-center gap-4 text-4xl text-white mb-1">
                        <Link href="/home" className="btn hardhover"><FontAwesomeIcon icon={faArrowLeft} /></Link>
                        <p className="font-bold text-left">Sign up</p>
                    </div>
                    <SignUpForm />
                </div>
            </div>

        </PageLayout>
    )
}

export default signup