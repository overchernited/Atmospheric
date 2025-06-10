"use client";
import Btn from "@/components/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { faComputer } from "@fortawesome/free-solid-svg-icons";

const DownloadButton = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-center">
            <Btn
                className="w-[60%] h-[60%] shrink-0 softhover"
                style="positive"
                onClick={() => {
                    alert("Descargando...");
                }}
            >
                Download PC
                <FontAwesomeIcon icon={faComputer} className="text-3xl" />
            </Btn>
            <Btn
                className="w-[60%] h-[60%] shrink-0 softhover"
                style="negative"
                onClick={() => {
                    alert("Descargando...");
                }}
            >
                Download Android
                <FontAwesomeIcon icon={faGooglePlay} className="text-3xl" />
            </Btn>
        </div>
    );
};

export default DownloadButton;
