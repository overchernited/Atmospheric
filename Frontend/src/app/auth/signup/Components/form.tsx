"use client"

import { InputProvider } from "@/hooks/InputContext"
import CustomInput from "@/components/Input"
import { faEnvelope, faArrowRight, faUser, faKey } from "@fortawesome/free-solid-svg-icons"
import Btn from "@/components/Btn"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form";
import { useNotifications } from "@/components/Notifications/useNotification"
import supabase from "@/app/lib/supabase/client"
import { useRouter } from "next/navigation"
import { getURL } from "@/app/lib/utils"

interface FormKeys {
    email: string;
    name: string;
    password: string;
}

const SignUpForm = () => {
    const { control, handleSubmit, reset, setValue } = useForm<FormKeys>({
        mode: "onSubmit",
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const { addNotification } = useNotifications()
    const router = useRouter()


    const onSubmit = async (data: FormKeys) => {
        try {
            console.log("Datos enviados:", data);
            const { error } = await supabase.auth.signUp({
                email: data.email.trim().toLowerCase(),
                password: data.password.trim(),
                options: {
                    emailRedirectTo: getURL() + "auth",
                    data: {
                        full_name: data.name.trim(),
                        avatar_url: `${process.env.NEXT_PUBLIC_PROFILESIMG_BUCKET}default.jpg`
                    },
                },
            });


            if (error) {
                throw error;
            }

            addNotification({
                type: "success",
                title: "Sign Up Successful",
                description: "You have signed up successfully!",

            });


            reset();
            router.push(`/auth/emailsend?email=${encodeURIComponent(data.email)}&message=You have signed up successfully! to continue the process check your email:`);
        } catch (error: unknown) {
            let errorMessage = "Error signing up. Please try again.";

            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === "string") {
                errorMessage = error;
            }

            addNotification({
                type: "error",
                title: "Sign Up Failed",
                description: errorMessage,
            });
        }
    };

    return (
        <div className="flex items-center justify-center flex-col xl2:gap-2">
            <form
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
                className="flex flex-col items-center justify-center w-full h-full"
            >
                <InputProvider>
                    <div className="flex flex-col items-center justify-center text-white text-md font-normal gap-2 m-2">
                        <p className="font-medium text-1xl">Create an account to start this adventure.</p>
                    </div>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                name="Name"
                                placeholder="Name"
                                icon={faUser}
                                autoComplete="name"
                                className="w-[90%]"
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: "Email is required" }}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                name="email"
                                placeholder="E-mail"
                                icon={faEnvelope}
                                autoComplete="email"
                                className="w-[90%]"
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "Email is required" }}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                name="Password"
                                placeholder="Password"
                                type="password"
                                icon={faKey}
                                autoComplete="new-password"
                                className="w-[90%]"
                            />
                        )}
                    />
                    <div className="absolute flex flex-col items-center justify-center md:bottom-0 bottom-20 w-full">
                        <Btn className="positive hardhover text-2xl w-[60%]" btnStyle="positive" type="submit" >NEXT <FontAwesomeIcon icon={faArrowRight} /></Btn>
                        <Link className="!rounded-full positive btn p-2 softhover text-base md:w-[50%] !tracking-normal m-2 negative" href="/auth/login">Already have an account?</Link>
                    </div>
                </InputProvider>
            </form>
        </div >
    )
}

export default SignUpForm