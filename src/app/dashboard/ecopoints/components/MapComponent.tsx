"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "@/hooks/Modal/useModal";
import { faSeedling, faSkull, faBattery } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";

const biologicIcon = L.icon({
    iconUrl: "/icons/biologic.png",
    iconSize: [44, 52],
    iconAnchor: [22, 52],
    popupAnchor: [0, -32],
});

const electronicIcon = L.icon({
    iconUrl: "/icons/electronic.png",
    iconSize: [44, 52],
    iconAnchor: [22, 52],
    popupAnchor: [0, -32],
});

const organicIcon = L.icon({
    iconUrl: "/icons/organic.png",
    iconSize: [44, 52],
    iconAnchor: [22, 52],
    popupAnchor: [0, -32],
});





const iconMap: Record<"seedling" | "skull" | "battery", any> = {
    seedling: faSeedling,
    skull: faSkull,
    battery: faBattery,
};

const leafletIcon: Record<"seedling" | "skull" | "battery", any> = {
    seedling: organicIcon,
    skull: biologicIcon,
    battery: electronicIcon,
};

interface Coords {
    lat: number;
    lon: number;
}

interface Ecopoint {
    id: string;
    location: Coords;
    point_name: string;
    point_type: "seedling" | "skull" | "battery";
    user_name: string;
    user_img: string;
    created_at: string;
}


interface PointProps {
    id: string

}

const PointModal = (props: PointProps) => {

    const [data, setData] = useState<Ecopoint | null>(null);


    useEffect(() => {

        const getEcopoint = async () => {
            const { data, error } = await supabase
                .from("ecopoints")
                .select("*")
                .eq("id", props.id);

            data && setData(data[0]);
        };

        getEcopoint();
    }, [])

    const Render = () => (
        data ? (
            <div className="flex justify-center flex-col items-center w-full text-white">
                <p className="text-lg font-normal">{data.location["lat"]}, {data.location["lon"]}</p>
                <p className="text-4xl font-bold">{data.point_name}</p>
                <p className="text-center gap-3 flex justify-center items-center font-medium">
                    Point
                    <FontAwesomeIcon
                        icon={(data && iconMap[data.point_type as keyof typeof iconMap]) ?? faSeedling}
                        className="text-4xl"
                    />
                </p>
                <img src={data?.user_img ?? ""} className="w-40 h-40 rounded-full aspect-square object-cover" alt="" />
                <p>
                    uploaded by <span className="text-2xl font-bold">{data?.user_name}</span>
                </p>
                <p>created on {data?.created_at}</p>
            </div>
        ) : (
            <div className="flex flex-col justify-center items-center gap-5">
                <Skeleton height={30} width={200} enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                <Skeleton height={20} width={100} enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                <Skeleton className="rounded-full!" height={200} width={200} enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                <Skeleton height={20} width={100} enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
                <Skeleton height={40} width={150} enableAnimation={true} baseColor="#2b2f6e" highlightColor="#734382" />
            </div >
        )
    );

    return (
        <Render />
    )
}

// Tipos
interface Coords {
    lat: number;
    lon: number;
}

interface Ecopoint {
    id: string;
    location: Coords;
    point_name: string;
    point_type: "seedling" | "skull" | "battery";
    user_name: string;
    user_img: string;
    created_at: string;
}

// 🔧 Este subcomponente actualiza la vista del mapa al cambiar coords
const MapUpdater = ({ coords }: { coords: Coords }) => {
    const map = useMap();

    useEffect(() => {
        if (coords.lat !== 0 && coords.lon !== 0) {
            map.setView([coords.lat, coords.lon], map.getZoom());
        }
    }, [coords, map]);

    return null;
};

// 🚀 Componente principal del mapa
const Map = () => {
    const [coords, setCoords] = useState<Coords>({ lat: 0, lon: 0 }); // Bogotá fallback
    const [points, setPoints] = useState<Ecopoint[]>([]);
    const { openModal } = useModal();

    // Obtener ubicación
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

    // Traer puntos de la DB
    useEffect(() => {
        const fetchPoints = async () => {
            const { data, error } = await supabase.from("ecopoints").select("*");

            if (error) {
                console.error("Error fetching ecopoints:", error);
            } else if (data) {
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
            className="w-full md:w-[80%] h-full"
            scrollWheelZoom={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap"
            />

            {/* Centrado dinámico */}
            <MapUpdater coords={coords} />

            {/* Marcador del usuario */}
            <Marker position={[coords.lat, coords.lon]}>
                <Popup>Tu ubicación</Popup>
            </Marker>

            {/* Marcadores de ecopoints */}
            {points.map((p) => (
                <Marker
                    key={p.id}
                    position={[p.location.lat, p.location.lon]}
                    icon={leafletIcon[p.point_type]}
                    eventHandlers={{
                        click: () => {
                            openModal("Detalles del punto", <PointModal id={p.id} />);
                        },
                    }}
                />
            ))}
        </MapContainer>
    );
};

export default Map;
