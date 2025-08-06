"use client"

import { InputProvider } from "@/hooks/InputContext"
import CustomInput from "@/components/Input"
import { faEnvelope, faArrowRight, faKey } from "@fortawesome/free-solid-svg-icons"
import Btn from "@/components/Btn"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNotifications } from "@/components/Notifications/useNotification"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import supabase from "@/app/lib/supabase/client"
import { useRouter } from "next/navigation"


interface LoginForm {
    Email: string;
    Password: string;
}


const LoginForm = () => {

    const { addNotification } = useNotifications();
    const router = useRouter()
    const { control, handleSubmit, reset } = useForm<LoginForm>({
        mode: "onSubmit",
        defaultValues: {
            Email: "",
            Password: "",
        }
    });

    const onSubmit = async (formdata: LoginForm) => {



        try {
            const { Email, Password } = formdata;
            const { data, error } = await supabase.auth.signInWithPassword({
                email: Email.trim().toLowerCase(),
                password: Password.trim(),
            });

            if (error) throw error;

            addNotification({
                type: "success",
                title: "Login Successful",
                description: "You have logged in successfully!",
            });

            const accessToken = data.session?.access_token;
            document.cookie = `access_token=${accessToken}; path=/; max-age=86400;`;

            console.log(data)


            router.push("/dashboard/forecast");

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
                    <p className="text-4xl text-white font-medium ">Welcome back!</p>
                    <Controller
                        name="Email"
                        control={control}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        }}
                        render={({ field: { onBlur, onChange } }) => (
                            <CustomInput
                                className="w-[90%]"
                                placeholder="E-mail"
                                icon={faEnvelope}
                                name="Email"
                                onChange={onChange}
                                onBlur={onBlur}
                                autoComplete="email" />
                        )}
                    />
                    <Controller
                        name="Password"
                        control={control}
                        render={({ field: { onBlur, onChange } }) => (
                            <CustomInput
                                className="w-[90%]"
                                placeholder="Password"
                                icon={faKey}
                                name="Password"
                                onChange={onChange}
                                onBlur={onBlur}
                                type="password"
                                autoComplete="current-password" />
                        )}
                    />
                    <div className="absolute flex flex-col items-center justify-center md:bottom-0 bottom-20 w-full">
                        <Btn className="positive hardhover text-2xl w-[60%]" btnStyle="positive" type="submit">NEXT <FontAwesomeIcon icon={faArrowRight} /></Btn>
                        <Link className="!rounded-full btn p-2 softhover text-base md:w-[50%] !tracking-normal m-2 negative" href="/auth/signup">Don't have an account?</Link>
                        <Link className="btn softhover text-base text-center underline md:w-[50%] text-white !tracking-normal m-2" href="/auth/changepassword">Don't remember your password?</Link>
                    </div>
                </form>
            </InputProvider>
        </div>
    )
}

export default LoginForm