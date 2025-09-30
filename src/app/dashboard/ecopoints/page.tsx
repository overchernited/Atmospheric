"use client"

import dynamic from "next/dynamic";

import { useModal } from "@/hooks/Modal/useModal";
import { useEffect } from "react";
import PageBackground from "@/hooks/Background";
import AddPoint from "./modals/AddPoint";
import Btn from "@/components/Btn";

const Map = dynamic(() => import("./components/MapComponent"), { ssr: false });
const EcoPointsPage = () => {
    const { openModal } = useModal();

    const handleAddPoint = () => {
        openModal("Add Point", <AddPoint />);
    };

    return (
        <PageBackground>
            <Btn btnStyle="positive" className="z-[1000] tracking-normal! left-1/2 -translate-x-1/2 fixed! bottom-[10%] md:bottom-[0] mb-5" onClick={handleAddPoint}>Add Point</Btn>
            <div className="flex flex-col justify-center items-center text-2xl h-[80%] w-full">
                <Map />
            </div>
        </PageBackground>
    );
}
export default EcoPointsPage