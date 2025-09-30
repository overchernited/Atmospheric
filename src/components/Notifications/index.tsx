"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useNotifications } from "./useNotification";

interface NotificationProps {
    id: string;
    type: "success" | "error" | "info";
    title: string;
    description?: string;
}

const Notification = ({ id, type, title, description }: NotificationProps) => {
    const notificationTypes = {
        success: {
            icon: "fa-solid fa-check",
            color: "#6cc56c",
            defaultMessage: "!Yey¡",
        },
        error: {
            icon: "fa-solid fa-square-xmark",
            color: "#c04c43",
            defaultMessage: "An error has occurred.",
        },
        info: {
            icon: "fa-solid fa-warning",
            color: "#53a9db",
            defaultMessage: "Bear in mind",
        },
    };

    const { icon, color, defaultMessage } =
        notificationTypes[type] || notificationTypes.info;
    const message = description || defaultMessage;

    const { removeNotification } = useNotifications();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeNotification(id); // Eliminar la notificación después de 5 segundos
        }, 5000);

        return () => clearTimeout(timer); // Limpiar el temporizador cuando se desmonte el componente
    }, [id, removeNotification]);

    return (
        <motion.div
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }} // Animación de salida (movimiento a la izquierda)
            transition={{ type: "spring", duration: 0.7 }} // Ajustar la duración
            style={{ backgroundColor: color }}
            className="md:w-[60%] xl:w-[50%] md:h-[43%] xl:h-auto m-1 rounded-lg p-4 text-white"
        >
            <div className="flex flex-row w-full items-center gap-2 mb-2">
                <i className={`${icon} text-xl md:text-sm xl:text-4xl`} />
                <p className="font-extrabold">{defaultMessage}</p>
            </div>
            <p className="font-extrabold border-t-2 xl:text-sm">{title}</p>
            <p className="xl:text-sm">{message}</p>
        </motion.div>
    );
};

const NotificationList = () => {
    const { notifications } = useNotifications();

    return (
        <div className="fixed flex flex-col gap-2 w-[80%] h-[15%] overflow-hidden md:left-0 m-5 md:h-[40%] md:w-[50%] z-[2000] pointer-events-none flex-0">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        id={notification.id}
                        type={notification.type}
                        title={notification.title}
                        description={notification.description}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationList;
