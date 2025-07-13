import fourzerofour from "../app/assets/404.webp";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
    return (
        <main className="min-h-screen bg-[#141313] flex flex-col justify-center items-center px-4">
            <Image
                src={fourzerofour}
                alt="Illustration of 404 error - Page not found"
                className="md:w-[25%] w-[70%]"
                priority
            />
            <p className="font-bold text-2xl md:text-4xl text-center text-white mt-6">
                The page you are looking for does not exist!
            </p>
            <Link
                href="/"
                className="md:w-[20%] w-[90%] mt-5 btn negative softhover hardhover text-center py-3 px-4 !tracking-normal shrink-0"
                aria-label="Take me home!"
            >
                Take me home
            </Link>
        </main>
    );
};

export default NotFound;
