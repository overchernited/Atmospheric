"use client"


import { usePathname } from "next/navigation";
import NavButton from "./navbutton";
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { normalize } from "path";

const Navbar = () => {
    const pathname = usePathname();
    const normalizePath = (p: string) => p.replace(/\/+$/, "") || "/";
    const currentPath = normalizePath(pathname);

    const BLACKLIST_ROUTES = ["/auth/login", "/auth/signup", "/auth/confirmation", "/auth"];
    const ISLANDING = "/"

    if (BLACKLIST_ROUTES.includes(currentPath)) return null;

    const landingButtons = (
        <>
            <NavButton to="#home" icon={Icons.faHome} color="#a57bd1">Home</NavButton>
            <NavButton to="#download" icon={Icons.faDownload} color="#5690b6">Download</NavButton>
            <NavButton to="#features" icon={Icons.faStar} color="#e9b45f">Features</NavButton>
            <NavButton to="#team" icon={Icons.faPeopleGroup} color="#d36f56">Team</NavButton>
        </>
    );

    const dashboardButtons = (
        <>
            <NavButton to="/dashboard/forecast" icon={Icons.faCloud} color="#a57bd1">Forecast's</NavButton>
            <NavButton to="/dashboard/ecopoints" icon={Icons.faMap} color="#5690b6">Ecopoints</NavButton>
            <NavButton to="/dashboard/profile" icon={Icons.faUser} color="#e9b45f">Profile</NavButton>
        </>
    );

    return (
        <div className="bg-[#0c0c0c] fixed p-6 flex md:flex-col justify-between items-center bottom-0 md:bottom-1/2 md:translate-y-1/2 -translate-x-1/2 left-1/2 md:left-0 md:translate-x-0  m-2 md:m-5 rounded-2xl md:h-[40%] md:w-[3%] h-[8%] w-[80%] z-[5000]">
            {currentPath === ISLANDING ? (
                landingButtons
            ) :
                dashboardButtons
            }

        </div>
    );

}

export default Navbar