"use client"

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase/client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKey } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link";

const Profile = () => {
    const [user, setUser] = useState<any>(null);

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

    if (!user) {
        return <p>Loading user...</p>;
    }

    const avatarUrl = user.user_metadata?.avatar_url;
    const fullName = user.user_metadata?.full_name;

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            {avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt="User Avatar"
                    width={200}
                    height={200}
                    className="rounded-full shadow-2xl shadow-[#7e4db2]"
                />
            ) : (
                <p>No avatar available</p>
            )}
            <p className="font-bold text-white text-4xl">{fullName}</p>
            <p className="font-medium text-white text-xl">{user.email}</p>
            <Link className="p-2 negative vibration softhover text-sm w-[20%] !tracking-normal flex items-center justify-center gap-2" href="/auth/changepassword" >Change password <FontAwesomeIcon icon={faKey} /></Link>
        </div>
    );
};

export default Profile;
