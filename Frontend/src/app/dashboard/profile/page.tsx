"use client"

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase/client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faKey, faPen, faSave, faUser } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link";
import { useRouter } from "next/navigation";
import Btn from "@/components/Btn";
import UserImg from "./Components/UserImg";
import Skeleton from "react-loading-skeleton";
import CustomInput from "@/components/Input";
import { useForm, Controller } from "react-hook-form";
import { InputProvider } from "@/hooks/InputContext";
import { useNotifications } from "@/components/Notifications/useNotification"

interface FormKeys {
    fullName: string
}
const NameField = () => {
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [fullName, setFullName] = useState<string>("");
    const { addNotification } = useNotifications()
    const { control, handleSubmit, reset, setValue } = useForm<FormKeys>({
        mode: "onSubmit",
        defaultValues: {
            fullName: "",
        }
    });

    const onSubmit = async (data: FormKeys) => {
        const { error } = await supabase.auth.updateUser({
            data: {
                full_name: data.fullName,
            },
        });
        if (error) {
            addNotification({
                type: "error",
                title: "Ouch! Something went wrong",
                description: error.message,

            });
            throw error;
        }

        setFullName(data.fullName);
        addNotification({
            type: "success",
            title: "Yey! Profile Updated",
            description: "You have updated your profile successfully!",
        });
        setIsEditing(false);
    }

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error getting user:", error);
            } else if (data.user) {
                setUser(data.user);
                setFullName(data.user.user_metadata.full_name || "");

                reset({
                    fullName: data.user.user_metadata.full_name || "",
                });
            }
        };

        fetchUser();
    }, [reset]);

    return (
        <>
            {
                isEditing ?
                    <form
                        className="flex justify-center items-center"
                        autoComplete="off"
                        spellCheck="false"
                        onSubmit={handleSubmit(onSubmit, (errors) => {
                            if (Object.keys(errors).length > 0) {
                                const errorMessages = Object.values(errors)
                                    .map((error) => `• ${error?.message}`)
                                    .join("\n");

                                addNotification({
                                    type: "error",
                                    title: "Ouch! Missing Fields",
                                    description: errorMessages,
                                });
                            }
                        })}
                    >
                        <InputProvider>
                            <Controller name="fullName"
                                control={control}
                                rules={{ required: "Name is required" }}
                                render={({ field }) =>
                                    <CustomInput {...field}
                                        type="text"
                                        placeholder="Name"
                                        icon={faUser} />} />
                        </InputProvider>
                        <Btn type="submit" btnStyle="positive" className="vibration softhover !tracking-normal 
                    gap-2 text-center rounded-full!"><FontAwesomeIcon icon={faSave} /></Btn>
                    </form>
                    :
                    <div className="flex justify-center items-center gap-4">
                        <p className="font-bold text-white text-4xl">{fullName}</p>
                        <Btn btnStyle="positive" className="vibration softhover !tracking-normal 
                    gap-2 text-center rounded-full!" onClick={() => setIsEditing(true)}><FontAwesomeIcon icon={faPen} /></Btn>
                    </div>
            }
        </>
    )
}

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

        await supabase.auth.signOut();
        document.cookie = "access_token=; path=/; max-age=0";

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
            <NameField />
            <p className="font-medium text-white text-xl">{user.email}</p>
            <Link className="p-2 text-center negative vibration softhover text-sm w-[25%] !tracking-normal flex items-center justify-center gap-2" href="/auth/changepassword" >Change password <FontAwesomeIcon icon={faKey} /></Link>
            <Btn btnStyle="negative" className="vibration softhover !tracking-normal flex items-center justify-center gap-2 text-center" onClick={logout}>Logout <FontAwesomeIcon icon={faDoorOpen} /></Btn>
        </div>
    );
};

export default Profile;
