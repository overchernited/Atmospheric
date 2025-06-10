import fourzerofour from "../app/assets/404.webp"
import Image from "next/image"
import Link from "next/link"
const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#141313] flex flex-col justify-center items-center">
            <Image src={fourzerofour} alt="Logo" className="md:w-[25%] w-[70%]" />
            <p className="font-bold text-2xl text-center md:text-4xl text-white">The page you are looking for does not exist!</p>
            <Link className="md:w-[20%] w-[90%] h-[50%] shrink-0 softhover mt-5 !tracking-normal btn negative hardhover text-center p-2" href="/">Take me home</Link>
        </div>

    )
}

export default NotFound