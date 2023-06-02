"use client";
import { CardContent } from "../ui/card";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function DeviceComponent({ devices, os, browser }: { devices: DevicesType[], os: OSType[], browser: BrowserType[] }) {
  return (
    <CardContent>
      <Tabs className=" w-full" defaultValue="general">
        <TabsList className=" border-gray-400 ml-auto">
          <TabsTrigger value="general">
            Devices
          </TabsTrigger>
          <TabsTrigger value="os">
            OS
          </TabsTrigger>
          <TabsTrigger value="browser">
            Browser
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead className="text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device, i) => (
                <TableRow key={i}>
                  <TableCell>{device.device}</TableCell>
                  <TableCell className="text-right">{device.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="os">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>OS</TableHead>
                <TableHead className="text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {os.map((device, i) => (
                <TableRow key={i}>
                  <TableCell>{device.os}</TableCell>
                  <TableCell className="text-right">{device.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="browser">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>OS</TableHead>
                <TableHead className="text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {browser.map((device, i) => (
                <TableRow key={i}>
                  <TableCell>{device.browser}</TableCell>
                  <TableCell className="text-right">{device.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

    </CardContent>
  );
}

export type DevicesType = {
  device: string;
  visits: number;
};
type OSType = {
  os: string;
  visits: number;
};
type BrowserType = {
  browser: string;
  visits: number;
};

