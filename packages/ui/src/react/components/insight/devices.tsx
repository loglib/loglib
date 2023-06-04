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
import { FilterProp } from "@/react/lib/filter";
import { ClearFilter } from "../util/clearFilter";

export function DeviceComponent({ devices, os, browser, filter: { clearFilter, addFilter, isFilterActive } }: { devices: DevicesType[], os: OSType[], browser: BrowserType[], filter: FilterProp }) {
  return (
    <CardContent>
      <Tabs className=" w-full" defaultValue="general">
        {
          isFilterActive("device") || isFilterActive("os") || isFilterActive("browser") ?
            <ClearFilter onClick={() => {
              clearFilter("device")
              clearFilter("os")
              clearFilter("browser")
            }} /> : null
        }
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
                <TableRow key={i}
                  onClick={() => {
                    addFilter({
                      key: "device",
                      operator: "is",
                      value: device.device,
                      data: "session"
                    })
                  }}
                  className=" cursor-pointer"
                >
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
              <TableRow

              >
                <TableHead>OS</TableHead>
                <TableHead className="text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {os.map((device, i) => (
                <TableRow key={i}
                  onClick={() => {
                    addFilter({
                      key: "os",
                      operator: "is",
                      value: device.os,
                      data: "session"
                    })
                  }}
                  className=" cursor-pointer"
                >
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
                <TableRow key={i}
                  onClick={() => {
                    addFilter({
                      key: "browser",
                      operator: "is",
                      value: device.browser,
                      data: "session"
                    })
                  }}
                  className=" cursor-pointer"
                >
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

