"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faSkull, faBattery } from "@fortawesome/free-solid-svg-icons";

const customIcon = L.icon({
    iconUrl: "/icons/biologic.png",
    iconSize: [44, 52],
    iconAnchor: [22, 52],
    popupAnchor: [0, -32],
});

const iconMap: Record<string, any> = {
    seedling: faSeedling,
    skull: faSkull,
    battery: faBattery,
};

interface Coords {
    lat: number;
    lon: number;
}

interface Ecopoint {
    id: string;
    location: Coords;
    point_name: string;
    point_type: string;
    user_name: string;
    user_img: string;
    created_at: string;
}

const Map = () => {
    const [coords, setCoords] = useState<Coords>({ lat: 4.711, lon: -74.072 }); // Bogotá por defecto
    const [points, setPoints] = useState<Ecopoint[]>([]);

    // Obtener la ubicación del usuario
    useEffect(() => {
        const getCoords = async () => {
            try {
                const pos = await new Promise<GeolocationPosition>((res, rej) =>
                    navigator.geolocation.getCurrentPosition(res, rej, {
                        enableHighAccuracy: true,
                        timeout: 10000,
                    })
                );
                setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
            } catch (err) {
                console.warn("No se pudo obtener la geolocalización, usando Bogotá por defecto.");
            }
        };
        getCoords();
    }, []);

    // Cargar ecopoints desde Supabase
    useEffect(() => {
        const fetchPoints = async () => {
            const { data, error } = await supabase
                .from("ecopoints")
                .select("*");

            if (error) {
                console.error("Error fetching ecopoints:", error);
            } else if (data) {
                // Mapear correctamente la location de JSON
                const mapped = data.map((p: any) => ({
                    id: p.id,
                    location: { lat: p.location.lat, lon: p.location.lon },
                    point_name: p.point_name,
                    point_type: p.point_type,
                    user_name: p.user_name,
                    user_img: p.user_img,
                    created_at: p.created_at,
                }));
                setPoints(mapped);
            }
        };
        fetchPoints();
    }, []);

    return (
        <MapContainer
            center={[coords.lat, coords.lon]}
            zoom={13}
            style={{ width: "80%", height: "30rem" }}
            scrollWheelZoom={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
            />

            {/* Marcador del usuario */}
            <Marker position={[coords.lat, coords.lon]}>
                <Popup>Tu ubicación</Popup>
            </Marker>

            {/* Marcadores de ecopoints */}
            {points.map((p) => (
                <Marker key={p.id} position={[p.location.lat, p.location.lon]} icon={customIcon}>
                    <Popup className="m-auto text-center">
                        <strong>{p.point_name}</strong> <br />
                        <FontAwesomeIcon icon={iconMap[p.point_type]} /><br />
                        Creado por: {p.user_name} <br />

                        <img src={p.user_img} alt={p.user_name} className="w-10 h-10 rounded-full mt-1" />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
