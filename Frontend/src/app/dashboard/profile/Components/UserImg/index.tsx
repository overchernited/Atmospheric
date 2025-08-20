"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import supabase from "@/app/lib/supabase/client";

const UserImg = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error getting user:", error);
                return;
            }
            if (data.user) {
                setUser(data.user);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <p>Loading user...</p>;
    }

    const avatarUrl = user.user_metadata?.avatar_url;

    return avatarUrl ? (
        <Image
            src={avatarUrl}
            alt="User Avatar"
            width={200}
            height={200}
            className="rounded-full shadow-2xl shadow-[#7e4db2]"
        />
    ) : (
        <p>No avatar available</p>
    );
};

export default UserImg;
