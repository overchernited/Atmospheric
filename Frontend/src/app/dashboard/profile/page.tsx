"use client"

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase/client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKey } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link";
import { useRouter } from "next/navigation";
import Btn from "@/components/Btn";
import UserImg from "./Components/UserImg";

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
        return <p>Loading user...</p>;
    }

    const fullName = user.user_metadata?.full_name;

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <UserImg />
            <p className="font-bold text-white text-4xl">{fullName}</p>
            <p className="font-medium text-white text-xl">{user.email}</p>
            <Link className="p-2 negative vibration softhover text-sm w-[20%] !tracking-normal flex items-center justify-center gap-2" href="/auth/changepassword" >Change password <FontAwesomeIcon icon={faKey} /></Link>
            <Btn btnStyle="negative" className="vibration softhover !tracking-normal" onClick={logout}>Logout</Btn>
        </div>
    );
};

export default Profile;
