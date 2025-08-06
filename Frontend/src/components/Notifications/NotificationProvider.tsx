"use client"

import { createContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid"; // Importar uuid para generar IDs únicos

// Definir el tipo para Notification
export interface Notification {
    id: string;
    type: "success" | "error" | "info";
    title: string;
    description?: string;
}

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, "id">) => void; // Aquí omitimos `id` para generarlo automáticamente
    removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Función para agregar una notificación con un ID generado automáticamente
    const addNotification = (notification: Omit<Notification, "id">) => {
        const id = uuidv4(); // Generar un ID único con uuid
        const newNotification = { ...notification, id }; // Agregar el ID a la notificación
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            newNotification,
        ]);
    };

    const removeNotification = (id: string) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification, removeNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
