// components/LayoutClientWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TopWave from "@/components/Waves";

export default function LayoutClientWrapper() {
    const pathname = usePathname();
    const [is404, setIs404] = useState(false);

    useEffect(() => {
        const notFoundText = document.body.innerText.includes("The page you are looking for does not exist");
        setIs404(notFoundText);
    }, [pathname]);

    if (is404) return null;

    return (
        <>
            <Navbar />
            <TopWave />
        </>
    );
}
