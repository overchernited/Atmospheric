"use client"

import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"

interface RecomendationCardProps {
    icon: IconDefinition
    title: string
    children: React.ReactNode
}



const RecomendationCard = (props: RecomendationCardProps) => {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.4, }}
            whileHover={{ scale: 1.2, y: -50 }}
            className="w-[25rem] h-[20rem] flex flex-col p-10 text-center items-center backdrop-blur-3xl  text-white rounded-2xl">
            <div className="w-full text-center flex flex-col justify-center items-center gap-2 font-bold text-xl">
                <p><FontAwesomeIcon size="2x" icon={props.icon} /></p>
                <h1>{props.title}</h1>
            </div>
            <div className="w-full text-center flex flex-col justify-center items-center gap-2 text-lg">
                {props.children}
            </div>

        </motion.section>
    )

}

export default RecomendationCard