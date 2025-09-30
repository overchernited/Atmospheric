"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const PagWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{opacity: 0.5, x: 200 }}
                animate={{opacity: 1, x: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="h-[100vh] w-[100vw]"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export default PagWrapper