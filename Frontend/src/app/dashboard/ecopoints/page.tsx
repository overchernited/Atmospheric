"use client"

import dynamic from "next/dynamic";

import { useModal } from "@/hooks/Modal/useModal";
import { useEffect } from "react";
import PageBackground from "@/hooks/Background";
import AddPoint from "./modals/AddPoint";

const Map = dynamic(() => import("./components/MapComponent"), { ssr: false });
const EcoPointsPage = () => {
    const { openModal } = useModal();

    const handleOpenLogin = () => {
        openModal("Add Point", <AddPoint />);
    };

    return (
        <PageBackground>
            <div className="flex flex-col justify-center items-center text-2xl h-[80%] w-full">
                <Map />
                <button onClick={handleOpenLogin}>Login</button>
            </div>
        </PageBackground>
    );
}
export default EcoPointsPage