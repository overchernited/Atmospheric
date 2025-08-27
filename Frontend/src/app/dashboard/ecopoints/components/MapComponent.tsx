// components/Map.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import { useEffect, useState } from "react";

const customIcon = L.icon({
    iconUrl: "/icons/biologic.png",
    iconSize: [44, 52],
    iconAnchor: [22, 52],
    popupAnchor: [0, -32],
});

interface Coords {
    lat: number;
    lon: number;
}



const Map = () => {
    const [coords, setCoords] = useState<Coords>({ lat: 0, lon: 0 });




    useEffect(() => {
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
            console.log(coords)
            return c;
        };
        getCoords();
    }, []);

    return (
        <MapContainer
            key={`${coords.lat}-${coords.lon}`}
            center={[coords.lat, coords.lon]} zoom={13} style={{ width: "80%", height: "30rem" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
            />
            <Marker position={[4.711, -74.0721]} icon={customIcon}>
                <Popup>Un punto en Bogotá</Popup>
            </Marker>
        </MapContainer>
    );
}

export default Map