"use client";
import {
  Asterisk, MapPin,
  MonitorSmartphone,
  PanelTop
} from "lucide-react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import React from "react";
import { PagesComponent } from "./PagesComponent";
import { LocationsComponent } from "./LocationsComponent";
import { DeviceComponent } from "./DeviceComponent";
import { RefComponent } from "./RefComponent";
import { refs } from "../data/refs";
import { devices } from "../data/devices";
import { locations } from "../data/locations";
import { pageViews } from "../data/pageViews";

export function BasicAnalytics() {
  return (
    <Card className=" md:col-span-3">
      <Tabs defaultValue="pages">
        <TabsList className="md:w-full space-x-2 md:justify-start grid grid-cols-4">
          <TabsTrigger value="pages" className=" space-x-2 ">
            <PanelTop size={16} />
            <p>Pages</p>
          </TabsTrigger>
          <TabsTrigger value="ref" className=" space-x-2">
            <Asterisk size={16} />
            <p>Referees</p>
          </TabsTrigger>
          <TabsTrigger value="device" className=" space-x-2">
            <MonitorSmartphone size={16} />
            <p>Devices</p>
          </TabsTrigger>
          <TabsTrigger
            value="locations"
            className=" space-x-2"
          >
            <MapPin size={16} />
            <p>Locations</p>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <PagesComponent pageViews={pageViews} />
        </TabsContent>
        <TabsContent value="ref">
          <RefComponent refs={refs} />
        </TabsContent>
        <TabsContent value="device">
          <DeviceComponent devices={devices} />
        </TabsContent>
        <TabsContent value="locations">
          <LocationsComponent locations={locations} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
