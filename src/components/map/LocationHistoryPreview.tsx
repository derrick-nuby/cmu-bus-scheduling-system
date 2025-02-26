"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

interface LocationData {
  time: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export function LocationHistoryPreview() {
  const [locationHistory, setLocationHistory] = React.useState<LocationData[]>([]);

  // Function to fetch location history from local storage
  const fetchLocationHistory = React.useCallback(() => {
    const storedHistory = JSON.parse(localStorage.getItem("locationHistory") || "[]");
    setLocationHistory(storedHistory);
  }, []);

  // Fetch location history when the drawer is opened
  const handleDrawerOpen = () => {
    fetchLocationHistory();
  };

  return (
    <Drawer onOpenChange={handleDrawerOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">View Location History</Button>
      </DrawerTrigger>
      <DrawerContent>
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
  );
}

