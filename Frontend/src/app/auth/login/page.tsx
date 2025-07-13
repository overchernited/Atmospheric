import PageBackground from "@/components/Background"
import LoginForm from "./Components/form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

const Login = () => {
    return (
        <PageBackground>
            <div className="flex flex-col justify-center items-center text-2xl h-full w-full">
                <div className="md:p-10 xl:p-4 backdrop-blur-xl h-[100vh] md:w-[60%] md:h-[85%] xl:w-[50%] xl:h-[90vh] 2xl:w-[80vh] 2xl:h-[65vh] rounded-3xl shadow-zinc-800 shadow-2xl text-2xl">
                    <div className="flex flex-row justify-start items-center gap-4 text-4xl text-white m-3">
                        <Link href="/home" className="btn hardhover"><FontAwesomeIcon icon={faArrowLeft} /></Link>
                        <p className="font-bold text-left">Login</p>
                    </div>

                    <LoginForm />
                </div>
            </div>

        </PageBackground>
    )
}

export default Login