"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon issue
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

export default function MapComponent() {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const logLocation = (pos: GeolocationPosition) => {
    const location: [number, number] = [pos.coords.latitude, pos.coords.longitude];
    setPosition(location);

    const now = new Date();
    const humanReadableTime = now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const logData = {
      time: humanReadableTime,
      location: {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      },
    };

    console.log(JSON.stringify(logData, null, 2));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        logLocation,
        (error) => {
          console.error("Error getting location:", error);
          // Set a default position if geolocation fails
          setPosition([51.505, -0.09]);
        }
      );
    }, 60000); // 60 seconds

    // Initial call to set the position
    navigator.geolocation.getCurrentPosition(logLocation);

    return () => clearInterval(intervalId);
  }, []);

  if (!position) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
}

