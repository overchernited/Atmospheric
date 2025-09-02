"use client"

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBattery, faBullseye, faPlus, faSeedling, faSkull } from "@fortawesome/free-solid-svg-icons";
import { InputProvider } from "@/hooks/InputContext";
import CustomInput from "@/components/Input";
import Btn from "@/components/Btn";
import { useNotifications } from "@/components/Notifications/useNotification";
import { Controller, useForm } from "react-hook-form";
import supabase from "@/app/lib/supabase/client";
import { point } from "leaflet";

interface Form {
    pointName: string;
    type: string; // 🔹 agregamos el campo para el select
}

interface Coords {
    lat: number;
    lon: number;
}

const AddPoint = () => {
    const [coords, setCoords] = useState<Coords>({ lat: 0, lon: 0 });
    const [loading, setLoading] = useState(false); // 🔹 estado de carga
    const { addNotification } = useNotifications();
    const [user, setUser] = useState<any>(null);
    const { control, handleSubmit, reset } = useForm<Form>({
        mode: "onSubmit",
        defaultValues: {
            pointName: "",
            type: "",
        },
    });

    const options = [
        { value: "seedling", label: "Organic", icon: faSeedling },
        { value: "skull", label: "Sanitary", icon: faSkull },
        { value: "battery", label: "Electronic", icon: faBattery },
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) console.error("Error getting user:", error);
            else if (data.user) setUser(data.user);
        };
        fetchUser();
    }, []);

    const insertEcopoint = async (
        location: { lat: number; lon: number },
        point_name: string,
        point_type: string,
        user_name: string,
        user_img: string
    ) => {
        setLoading(true); // 🔹 activamos spinner
        const date = new Date();
        const fulldate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        const { data, error } = await supabase.from("ecopoints").insert([
            {
                location,
                point_name,
                point_type,
                user_name,
                user_img,
                created_at: fulldate,
            },
        ]);

        setLoading(false); // 🔹 desactivamos spinner

        if (error) console.error("Error inserting ecopoint:", error);
        else {
            console.log("Ecopoint inserted:", data);
            addNotification({
                type: "success",
                title: "Ecopoint added!",
                description: `Point "${point_name}" has been added successfully.`,
            });
            reset(); // 🔹 limpia formulario
        }
    };

    const getCoords = async () => {
        const pos = await new Promise<GeolocationPosition>((res, rej) =>
            navigator.geolocation.getCurrentPosition(res, rej, {
                enableHighAccuracy: true,
                timeout: 10_000,
            })
        );
        const { latitude, longitude } = pos.coords;
        const c = { lat: latitude, lon: longitude };
        setCoords(c);
        return c;
    };

    const onSubmit = async (formdata: Form) => {
        const c = await getCoords();
        insertEcopoint(
            c,
            formdata.pointName,
            formdata.type,
            user?.user_metadata?.full_name || "Anonymous",
            user?.user_metadata?.avatar_url || ""
        );
    };

    return (
        <div className="w-auto h-auto relative flex items-center justify-center flex-col md:gap-1">
            <h1 className="m-2 font-bold text-white text-5xl">Type of point</h1>

            <form
                className="w-full flex flex-col md:flex-row items-center justify-center gap-6"
                onSubmit={handleSubmit(onSubmit, (e) => {
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
            >
                {/* 🔹 Select */}
                <Controller
                    name="type"
                    control={control}
                    rules={{ required: "Type of point is required" }}
                    render={({ field: { onChange, value } }) => (
                        <div className="flex flex-row items-center justify-center md:gap-5">
                            {value && (
                                <FontAwesomeIcon
                                    className="text-[#7347a1] text-3xl"
                                    icon={options.find((o) => o.value === value)!.icon}
                                />
                            )}
                            <select
                                value={value}
                                onChange={onChange}
                                className="bg-[#7347a1] text-white text-lg p-3 rounded-xl focus:outline-none cursor-pointer"
                                disabled={loading} // 🔹 deshabilitado mientras carga
                            >
                                <option value="" disabled>
                                    Select an option
                                </option>
                                {options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                />

                {/* 🔹 Input */}
                <InputProvider>
                    <Controller
                        name="pointName"
                        control={control}
                        rules={{ required: "Point name is required" }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <CustomInput
                                type="text"
                                name="pointName"
                                placeholder="Point Name"
                                icon={faBullseye}
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                disabled={loading} // 🔹 deshabilitado mientras carga
                            />
                        )}
                    />
                </InputProvider>

                {/* 🔹 Botón con spinner */}
                <Btn
                    type="submit"
                    className="fixed rounded-full m-5 left-0 bottom-0 flex items-center justify-center"
                    btnStyle="positive"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loader border-t-2 border-b-2 border-white rounded-full w-6 h-6 animate-spin" />
                    ) : (
                        <FontAwesomeIcon icon={faPlus} />
                    )}
                </Btn>
            </form>
        </div>
    );
}

export default AddPoint;
