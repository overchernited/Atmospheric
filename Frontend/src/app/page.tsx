import DownloadButton from "@/app/page/DownloadButton";
import logo from "../../public/branding/whitebrand.png"
import LogoHeader from "@/app/page/Header";
import Link from 'next/link'
import MemberCard from "@/app/page/MemberCard";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFigma, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCloud, faFile } from "@fortawesome/free-solid-svg-icons";
import bybrand from "../../public/branding/ByEcoPositive.png";



const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#141313]">
            <section id="home">
                <LogoHeader />
            </section>

            <section id="download" className="flex flex-col items-center justify-center gap-4 ">
                <p className="text-white font-bold text-2xl md:text-3xl">¿Ready to get started?</p>
                <video
                    poster="/images/poster.png"
                    style={{ boxShadow: '0px 1px 50px #7e4db258' }}
                    className="h-full md:h-[20%] lg:h-[40%] lg:w-[40%] m-auto border-0 outline-0 rounded-2xl"
                    controls
                >
                    <source src="videos/hero.mp4" type="video/mp4" />
                </video>
                <p className="text-white font-medium text-xl">Download our app</p>
                <div className="flex flex-row gap-30 items-center justify-center">
                    <DownloadButton />
                </div>
                <p className="text-white font-medium text-xl">or use our website</p>
                <div className="flex flex-row gap-30 items-center justify-center">
                    <Link href="/auth" className=" positive p-4 vibration softhover">Atmospheric
                    </Link>
                    <Link href="/dashboard/forecast" className=" positive p-4 vibration softhover">Forecast Demo
                    </Link>
                </div>
            </section>

            <section id="features" className="bg-[#7e4db2] mt-5">
                <div className="top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="relative block md:w-[calc(100%+1.3px)] h-[155px]"
                    >
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            className="fill-[#141313]"
                        />
                    </svg>
                </div>

                <section className="md:pl-10 md:p-5 md:text-2xl text-xl">
                    <p className="text-white font-bold text-3xl text-center">Features :)</p>
                    <section className="flex justify-between md:text-2xl text-white font-bold m-10">
                        <div className="w-[40%] ">
                            Check real-time weather updates with accurate data to plan your day without surprises.
                        </div>
                    </section>
                    <section className="flex justify-between text-white font-bold m-10">
                        <div>xd</div>
                        <div className="w-[40%] ">
                            Check real-time weather updates with accurate data to plan your day without surprises.
                        </div>
                    </section>
                    <section className="flex justify-between text-white font-bold m-10">
                        <div className="w-[40%] ">
                            Discover and review nearby ecological points, helping you actively contribute to environmental care.
                        </div>
                    </section>
                    <section className="flex justify-between text-white font-bold m-10">
                        <div>xd</div>
                        <div className="w-[40%] ">
                            Customize your profile with preferences and settings to make the app perfectly suit your needs.
                        </div>
                    </section>
                    <section className="flex justify-between text-2xl text-white font-bold m-10">
                        <div className="w-[40%] ">
                            Share ecological reports and data with other users to foster a community committed to the planet.
                        </div>
                    </section>
                </section>
                <div className="top-0 left-0 w-full overflow-hidden leading-none">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="relative block md:w-[calc(100%+1.3px)] h-[155px]"
                    >
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            className="fill-[#141313]"
                        />
                    </svg>
                </div>
            </section>

            <section id="team">
                <div className="text-white font-bold text-3xl text-center my-3 md:m-4">ECOLABS <FontAwesomeIcon icon={faCloud} /> Team</div>
                <section className="p-4 flex flex-row items-center justify-center text-2xl text-white font-bold h-full w-full gap-12 flex-wrap">
                    <MemberCard name="Marlon Hernández" role="Full Stack Developer / Composer" description="Lead Developer of Atmospheric, responsible for Backend and Frontend development, API integrations, communications, and musical composition." quote="Coding at day, rocking at night." image="/images/marlon.jpg" />
                    <MemberCard name="Joham Gonzalez" role="Problem Statement Specialist/ Composer" description="Responsible for project documentation, conducting surveys, and contributing to musical composition." image="/images/joham.jpg" quote="Strumming strings and living dreams." />
                    <MemberCard name="Ivan Sierra" role="Research Analyst" description="In charge of project documentation, survey development, and traffic report analysis." quote="A good coffe and ready to go." image="/images/sierra.jpg" />
                    <MemberCard name="Dylan Fagua" role="Theoretical Lead" description="Responsible for developing the project hypothesis and contributing to project documentation." image="/images/fagua.jpg" quote="Dancing in the dark." />
                </section>
            </section>

            <section id="footer" className="bg-[#7e4db2] mt-5">
                <div className="top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="relative block md:w-[calc(100%+1.3px)] h-[155px]"
                    >
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            className="fill-[#141313]"
                        />
                    </svg>
                </div>
                <footer className="m-auto pb-20 md:pb-0">
                    <p className="text-center my-5 text-3xl md:text-4xl font-bold text-white">This is supossed to be a footer</p>
                    <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between w-full md:w-[99%]">
                        <div className="flex flex-col items-center gap-2">
                            <Image src={logo} alt="AtmosphericLogo" width={500} height={500} loading="lazy" />
                            <Image src={bybrand} alt="EcoLabs Logo" width={200} height={200} loading="lazy" />
                            <p className="text-white font-light text-sm">© 2025 Marlon Hernández All rights reserved</p>
                        </div>
                        <div className="mb-5">
                            <Link href="/home" className="btn positive p-2 softhover">GO ATMOSPHERIC</Link>
                            <Link href="/" className="btn positive p-2 softhover">TAKE ME UP</Link>

                            <p className="text-white font-bold text-xl m-5 flex border-b-white border-b-2"> Learn more about Atmospheric!</p>
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <Link href="https://github.com/overchernited/Atmospheric" className="btn positive p-2 softhover"><FontAwesomeIcon icon={faGithub} className="text-3xl" /></Link>
                                <Link href="https://www.figma.com/design/i6BgqAyiOW1S6cEedaNgY2/Atmospheric-Mockups?m=auto&t=HdVv0UszuKHzyP8P-1" className="btn positive p-2 softhover"><FontAwesomeIcon icon={faFigma} className="text-3xl" /></Link>
                                <Link href="https://docs.google.com/document/d/19QsUKvJKAnyK7J41cFzguVvVUYRCyTXpCz0mb-_hy84/edit?usp=sharing" className="btn positive p-2 softhover"><FontAwesomeIcon icon={faFile} className="text-3xl" /></Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
        </div>
    )
}

export default LandingPage