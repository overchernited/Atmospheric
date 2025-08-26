"use client"

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase/client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faKey } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link";
import { useRouter } from "next/navigation";
import Btn from "@/components/Btn";
import UserImg from "./Components/UserImg";
import Skeleton from "react-loading-skeleton";

const Profile = () => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error getting user:", error);
            } else {
                setUser(data.user);
            }
        };
        fetchUser();
    }, []);


    const logout = async () => {

        document.cookie = "access_token=; path=/; max-age=0";
        await supabase.auth.signOut();

        router.push("/auth/login");
    }

    if (!user) {
        return (
            <div className="flex flex-col justify-center items-center gap-5">
                <Skeleton width={200} height={200} baseColor="#2b2f6e"
                    highlightColor="#734382"
                    className=" rounded-full!"
                    enableAnimation={true} />
                <Skeleton width={400} height={80} baseColor="#2b2f6e"
                    highlightColor="#734382"
                    enableAnimation={true} />
                <Skeleton width={128} height={40} baseColor="#2b2f6e"
                    highlightColor="#734382"
                    enableAnimation={true} />
                <Skeleton width={128} height={40} baseColor="#2b2f6e"
                    highlightColor="#734382"
                    enableAnimation={true} />
            </div>
        )
    }

    const fullName = user.user_metadata?.full_name;

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <UserImg />
            <p className="font-bold text-white text-4xl">{fullName}</p>
            <p className="font-medium text-white text-xl">{user.email}</p>
            <Link className="p-2 text-center negative vibration softhover text-sm w-[25%] !tracking-normal flex items-center justify-center gap-2" href="/auth/changepassword" >Change password <FontAwesomeIcon icon={faKey} /></Link>
            <Btn btnStyle="negative" className="vibration softhover !tracking-normal flex items-center justify-center gap-2 text-center" onClick={logout}>Logout <FontAwesomeIcon icon={faDoorOpen} /></Btn>
        </div>
    );
};

export default Profile;
