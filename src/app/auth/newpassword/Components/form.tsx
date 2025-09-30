"use client"

import { InputProvider } from "@/hooks/InputContext"
import CustomInput from "@/components/Input"
import { faArrowRight, faKey } from "@fortawesome/free-solid-svg-icons"
import Btn from "@/components/Btn"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNotifications } from "@/components/Notifications/useNotification"
import { Controller, useForm } from "react-hook-form"
import supabase from "@/app/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"



interface Form {
    password: string,
    confirmPassword: string;
}



const UpdateForm = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);


    const { addNotification } = useNotifications();
    const router = useRouter()
    const { control, handleSubmit, reset } = useForm<Form>({
        mode: "onSubmit",
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hash = window.location.hash.substring(1); // Quita el '#'
            const params = new URLSearchParams(hash);

            const access = params.get("access_token");
            const refresh = params.get("refresh_token");

            if (access && refresh) {
                setAccessToken(access);
                setRefreshToken(refresh);
            } else {
                router.push("/not-found");
            }
        }
    }, []);

    useEffect(() => {
        if (accessToken && refreshToken) {
            supabase.auth
                .setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                })
                .then(() => {
                    addNotification({
                        type: "info",
                        title: "Session Set",
                        description: "Your session has been successfully restored.",
                    });
                })
                .catch(() => {
                    addNotification({
                        type: "error",
                        title: "Session Error",
                        description: "Could not restore session.",
                    });
                });
        }
    }, [accessToken, refreshToken]);

    const onSubmit = async (formdata: Form) => {
        try {
            const { password, confirmPassword } = formdata;


            if (password !== confirmPassword) {

                addNotification({
                    type: "error",
                    title: "Ouch! Passwords don’t match",
                    description: "Please make sure both passwords are the same.",
                });

                return;

            } else {

                const { data, error } = await supabase.auth.updateUser({ password });

                if (error) {
                    console.error(error);
                    addNotification({
                        type: "error",
                        title: "Ouch! Something went wrong",
                        description: error.message,
                    });
                } else {
                    console.log(data);
                    addNotification({
                        type: "success",
                        title: "Yey! User updated",
                        description: "Password changed successfully",
                    });
                    router.push("/dashboard/forecast");
                }
            }

            reset();
        } catch (error) {
            addNotification({
                type: "error",
                title: "Login Failed",
                description: error instanceof Error ? error.message : "Unknown error",
            });
        }
    };

    return (
        <div className="flex items-center justify-center flex-col gap-1">
            <InputProvider>
                <form onSubmit={handleSubmit(onSubmit, (e) => {
                    if (Object.keys(e).length > 0) {
                        const errorMessages = Object.values(e)
                            .map((error) => `• ${error?.message}`)
                            .join("\n");

                        addNotification({
                            type: "error",
                            title: "Ouch! Missing Fields",
                            description: errorMessages,
                        });
                    }
                })}
                    className="w-full h-full flex flex-col items-center justify-center">
                    <p className="text-2xl text-white font-medium ">Be sure to use a strong password.</p>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onBlur, onChange } }) => (
                            <CustomInput
                                className="w-[90%]"
                                placeholder="Password"
                                icon={faKey}
                                name="password"
                                onChange={onChange}
                                onBlur={onBlur}
                                autoComplete="new-password" />
                        )}
                    />
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field: { onBlur, onChange } }) => (
                            <CustomInput
                                className="w-[90%]"
                                placeholder="Confirm Password"
                                icon={faKey}
                                name="confirmPassword"
                                onChange={onChange}
                                onBlur={onBlur}
                                autoComplete="new-password" />
                        )}
                    />
                    <div className="absolute flex flex-col items-center justify-center md:bottom-0 bottom-20 w-full">
                        <Btn className="positive hardhover text-2xl w-[60%] m-5" btnStyle="positive" type="submit">NEXT <FontAwesomeIcon icon={faArrowRight} /></Btn>
                    </div>
                </form>
            </InputProvider>
        </div>
    )
}

export default UpdateForm