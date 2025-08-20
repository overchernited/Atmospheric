"use client"

import Image from "next/image";
import { motion } from "framer-motion"

interface MemberCardProps {
    name: string;
    role: string;
    description: string;
    image: string;
    quote: string
}


const MemberCard = (props: MemberCardProps) => {
    return (
        <motion.div
            className="group h-[40rem] md:w-[27rem] md:h-[30rem] w-[24rem] bg-gradient-to-br from-[#251e2c] to-[#1b1b1b] rounded-xl relative"
            whileHover={{ scale: 1.1, boxShadow: '0px 1px 50px #202020eb', zIndex: 100, y: -80, height: '40rem' }}>
            <div className="text-white flex items-center flex-col m-5 gap-1 border-b-1 p-1 border-[#7e4db2]">
                <p className="text-4xl font-bold">{props.name}</p>
                <p className="text-sm font-medium">{props.role}</p>
            </div>
            <Image src={props.image} alt="Logo" className="rounded-t-xl m-auto object-cover aspect-square" width={300} height={300} loading="lazy" />
            <p className="p-5 mt-5 text-white font-normal text-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-100 text-center">{props.description}</p>
            <p className="absolute left-1/2 -translate-x-1/2 w-full bottom-0 mb-5 italic text-white font-light text-lg  md:group-hover:opacity-100 transition-opacity duration-100 text-center">"{props.quote}"</p>
        </motion.div>
    )
}

export default MemberCard