// problems
// pause tracking and share location and view location history are not showing in mobile, fix it

"use client";

import { DrawerFooter } from "@/components/ui/drawer";

import { useEffect, useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "images/marker-icon.png",
  iconUrl: "images/marker-icon.png",
  shadowUrl: "images/marker-shadow.png",
});

// This component updates the map view when position changes
function MapUpdater({ position }: { position: [number, number]; }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [map, position]);

  return null;
}

interface LocationData {
  time: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export default function MapComponent() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [locationHistory, setLocationHistory] = useState<LocationData[]>([]);
  const [isTracking, setIsTracking] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const logLocation = useCallback((pos: GeolocationPosition) => {
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

    const logData: LocationData = {
      time: humanReadableTime,
      location: {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      },
    };

    console.log(JSON.stringify(logData, null, 2));

    // Save to local storage
    const storedHistory = JSON.parse(localStorage.getItem("locationHistory") || "[]");
    const updatedHistory = [...storedHistory, logData];
    localStorage.setItem("locationHistory", JSON.stringify(updatedHistory));

    // Update state
    setLocationHistory(updatedHistory);
  }, []);

  const startTracking = useCallback(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Get the custom time interval from environment variable or use default
    const timeInterval = process.env.NEXT_PUBLIC_LOCATION_INTERVAL
      ? Number.parseInt(process.env.NEXT_PUBLIC_LOCATION_INTERVAL, 10) * 1000
      : 60000; // Default to 60 seconds if not provided

    // Set up new interval
    intervalRef.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        logLocation,
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    }, timeInterval);

    // Initial call to set the position
    navigator.geolocation.getCurrentPosition(
      logLocation,
      (error) => {
        console.error("Error getting initial location:", error);
        // Set a default position if geolocation fails
        setPosition([51.505, -0.09]);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );

    setIsTracking(true);
  }, [logLocation]);

  const stopTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTracking(false);
  }, []);

  useEffect(() => {
    // Load location history from local storage
    const storedHistory = JSON.parse(localStorage.getItem("locationHistory") || "[]");
    setLocationHistory(storedHistory);

    // Start tracking on component mount
    startTracking();

    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTracking]);

  if (!position) {
    return <div className="flex items-center justify-center h-screen">Loading map...</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-grow relative">
        <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
          {/* This is the key component that updates the map view */}
          <MapUpdater position={position} />
        </MapContainer>

        {/* Mobile-friendly controls positioned at the bottom of the map */}
        <div className="absolute bottom-4 left-0 right-0 z-[1000] px-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
            <Button
              variant="outline"
              className="bg-white shadow-md w-full sm:w-auto"
              onClick={() => {
                if (isTracking) {
                  stopTracking();
                } else {
                  startTracking();
                }
              }}
            >
              {isTracking ? "Pause Tracking" : "Resume Tracking"}
            </Button>

            <Button variant="outline" className="bg-white shadow-md w-full sm:w-auto">
              Share Location
            </Button>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="bg-white shadow-md w-full sm:w-auto">
                  View Location History
                </Button>
              </DrawerTrigger>
              <DrawerContent className="z-[2000]">
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Location History</DrawerTitle>
                    <DrawerDescription>Your recent location data</DrawerDescription>
                  </DrawerHeader>
                  <ScrollArea className="h-[50vh] px-4">
                    <div className="space-y-4 pr-4">
                      {locationHistory
                        .slice()
                        .reverse()
                        .map((entry, index) => (
                          <div key={index} className="border-b pb-2">
                            <p className="font-semibold">{entry.time}</p>
                            <p>Latitude: {entry.location.latitude.toFixed(6)}</p>
                            <p>Longitude: {entry.location.longitude.toFixed(6)}</p>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}

