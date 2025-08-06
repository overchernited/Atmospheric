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
import { redirect, useRouter } from "next/navigation"
import { getURL } from "@/app/lib/utils"



interface Form {
    Email: string;
}



const UpdateForm = () => {
    const { addNotification } = useNotifications();
    const router = useRouter()
    const { control, handleSubmit, reset } = useForm<Form>({
        mode: "onSubmit",
        defaultValues: {
            Email: "",
        }
    });

    const recoveryEmail = async (email: string) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${getURL()}/auth/newpassword`,
        });

        if (error) {
            addNotification({
                type: "error",
                title: "Ouch!",
                description: "Error while sending email.",
            });
            console.error(error);
        } else {
            addNotification({
                type: "success",
                title: "Success!",
                description: "Email sent succesfully!",
            })
            router.push(`/auth/confirmation`)
        }
    };

    const onSubmit = async (formdata: Form) => {

        try {
            const { Email } = formdata;

            await recoveryEmail(Email);

            router.push(`/auth/confirmation?email=${encodeURIComponent(Email)}`);

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
                    <p className="text-2xl text-white font-medium ">We are going to send an email.</p>
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
                    <div className="absolute flex flex-col items-center justify-center md:bottom-0 bottom-20 w-full">
                        <Btn className="positive hardhover text-2xl w-[60%] m-5" btnStyle="positive" type="submit">NEXT <FontAwesomeIcon icon={faArrowRight} /></Btn>
                    </div>
                </form>
            </InputProvider>
        </div>
    )
}

export default UpdateForm