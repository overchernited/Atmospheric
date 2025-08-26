"use client";

import { useState, useEffect, useRef, use } from "react";
import Image from "next/image";
import supabase from "@/app/lib/supabase/client";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNotifications } from "@/components/Notifications/useNotification"
import * as icons from "@fortawesome/free-solid-svg-icons";


const UserImg = () => {
    const [user, setUser] = useState<any>(null);
    const [isUploading, setIsUploading] = useState(false);
    const { addNotification } = useNotifications()
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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


    const handleClick = () => {
        fileInputRef.current?.click(); // simula el click en el input
        console.log(supabase.auth.getUser())
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            await uploadImage(file);
            setIsUploading(false)

        }
    };


    const uploadImage = async (file: File) => {
        // Crear un nombre de archivo con extensión .png
        setIsUploading(true)
        const fileName = `${user.id}.png`;

        // Si quieres convertir realmente el archivo a PNG antes de subirlo, necesitarías usar canvas en el frontend:
        const imgBitmap = await createImageBitmap(file);
        const canvas = document.createElement("canvas");
        canvas.width = imgBitmap.width;
        canvas.height = imgBitmap.height;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(imgBitmap, 0, 0);

        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob((b) => resolve(b), "image/webp")
        );

        if (!blob) {
            console.error("Error al convertir a PNG");
            setIsUploading(false)
            return;
        }

        const { data, error } = await supabase.storage
            .from("profilesimg")
            .upload(fileName, blob, {
                cacheControl: "3600",
                upsert: true, // ⚡ Reemplaza si ya existe
            });

        console.log("Subiendo imagen:", file);
        if (error) {
            addNotification({
                type: "error",
                title: "Ouch! Something went wrong",
                description: error.message,

            });
            console.error("Error uploading image:", error);
            setIsUploading(false)
            return;
        }

        console.log("Subida exitosa:", data);

        const { data: publicUrlData } = supabase.storage
            .from("profilesimg")
            .getPublicUrl(fileName);
        const publicUrl = publicUrlData.publicUrl;
        console.log("URL pública:", publicUrl);

        await updateMetadata(publicUrl);
    };


    const updateMetadata = async (url: string) => {
        const { data, error } = await supabase.auth.updateUser({
            data: {
                avatar_url: `${url}?t=${Date.now()}`,
            },
        });

        setUser(data.user);

        if (error) {
            console.error("Error updating metadata:", error);
            setIsUploading(false)
            return;
        } else {
            console.log(data);
            console.log("Metadatos actualizados");
            setIsUploading(false)
        }
        addNotification({
            type: "success",
            title: "Yey! Image Updated",
            description: "You have updated your image successfully!",

        });
        setIsUploading(false)
    }

    if (!user) {
        return (
            <>
                <div className="flex items-center justify-center">
                    <Skeleton width={200} height={200} baseColor="#2b2f6e"
                        highlightColor="#734382"
                        className=" rounded-full!"
                        enableAnimation={true} />
                </div></>
        );
    }

    const avatarUrl = user.user_metadata.avatar_url;

    return (
        <motion.div whileHover={{ scale: 1.2 }} className="relative group w-48 h-48">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                type="button"
                onClick={handleClick}
                className="absolute inset-0 flex justify-center items-center rounded-full bg-black/0 hover:bg-black/60 transition cursor-pointer z-10"
            >
                <FontAwesomeIcon
                    className="invisible group-hover:visible text-white text-3xl"
                    icon={icons.faUpload}
                />
            </button>

            {isUploading ? (
                <div className="flex items-center justify-center w-full h-full rounded-full bg-[#7e4db2]">
                    <div className="animate-spin border-4 border-white border-t-transparent rounded-full w-12 h-12"></div>
                </div>
            ) : avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt="User Avatar"
                    width={200}
                    height={200}
                    priority
                    unoptimized
                    className="rounded-full shadow-2xl shadow-[#7e4db2] w-full h-full object-cover"
                />
            ) : (
                <p>No avatar available</p>
            )}
        </motion.div>
    );
};


export default UserImg;
