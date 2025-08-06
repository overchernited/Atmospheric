import PageBackground from "@/hooks/Background"
import UpdateForm from "./Components/form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

const NewPassword = () => {
    return (
        <PageBackground>
            <div className="flex flex-col justify-center items-center text-2xl h-full w-full">
                <div className="md:p-10 xl:p-4 backdrop-blur-xl w-full h-full md:h-[35rem] md:w-[40rem] rounded-3xl shadow-zinc-800 shadow-2xl text-2xl">
                    <div className="flex flex-row justify-start items-center gap-4 text-4xl text-white m-3">
                        <p className="font-bold text-left">New Password</p>
                    </div>

                    <UpdateForm />
                </div>
            </div>

        </PageBackground>
    )
}

export default NewPassword