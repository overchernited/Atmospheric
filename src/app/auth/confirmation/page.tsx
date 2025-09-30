"use client";

import PageBackground from "@/hooks/Background";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const ConfirmationContent = () => {
    const searchParams = useSearchParams();
    const confirmLink = searchParams.get("confirmLink");

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.replace(/^#/, ""));
            const error = params.get("error");
            const description = params.get("error_description");

            if (error) {
                setErrorMessage(description || "This link is invalid or expired.");
            }
        }
    }, []);

    return (
        <PageBackground>
            <div className="flex flex-col justify-center items-center text-2xl h-[40rem] w-full">
                <div className="md:p-10 xl:p-4 backdrop-blur-xl w-full h-full md:h-[14rem] md:w-[40rem] rounded-3xl shadow-zinc-800 shadow-2xl text-2xl">
                    <div className="flex flex-row justify-start items-center gap-4 text-4xl text-white m-3">
                        <Link href="/auth/signup" className="btn hardhover">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Link>
                        <p className="font-bold text-left">Email sent</p>
                    </div>

                    <div className="text-white text-center mt-10">
                        {errorMessage ? (
                            <p>{errorMessage}</p>
                        ) : confirmLink ? (
                            <Link href={confirmLink} className="underline text-blue-400">
                                Confirm your account
                            </Link>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </PageBackground>
    );
};

const Confirmation = () => (
    <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
        <ConfirmationContent />
    </Suspense>
);

export default Confirmation;
