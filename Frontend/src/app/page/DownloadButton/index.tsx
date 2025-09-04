"use client";
import Btn from "@/components/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { faComputer } from "@fortawesome/free-solid-svg-icons";
import { getURL } from "@/app/lib/utils";

const DownloadButton = () => {
    const handleDownload = () => {
        const url = getURL() + "atmospheric.apk";
        const filename = 'AtmosphericLatest.apk';

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-center">
            <Btn
                className="w-full h-[60%] shrink-0 softhover tracking-normal!"
                btnStyle="negative"
                onClick={handleDownload}
            >
                Download Android
            </Btn>
        </div>
    );
};

export default DownloadButton;
