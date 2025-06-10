"use client"


import { usePathname } from "next/navigation";
import NavButton from "./navbutton";
import * as Icons from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const pathname = usePathname();
    const notShow = pathname.padEnd(1) === "/home" || pathname.includes("/auth");
    const isLanding = pathname.padEnd(1) === "/";

    if (notShow) return null;


    return (
        <div className="bg-[#0c0c0c] fixed p-6 flex md:flex-col justify-between items-center bottom-0 md:bottom-1/2 md:translate-y-1/2 -translate-x-1/2 left-1/2 md:left-0 md:translate-x-0  m-2 md:m-5 rounded-2xl md:h-[40%] md:w-[3%] h-[8%] w-[80%] z-50">
            {isLanding ? (
                <>
                    <NavButton to="#home" icon={Icons.faHome} color="#a57bd1">Home</NavButton>
                    <NavButton to="#download" icon={Icons.faDownload} color="#5690b6">Download</NavButton>
                    <NavButton to="#features" icon={Icons.faStar} color="#e9b45f">Features</NavButton>
                    <NavButton to="#team" icon={Icons.faPeopleGroup} color="#d36f56">Team</NavButton>
                </>
            ) : null}

        </div>
    );

}

export default Navbar