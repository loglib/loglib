"use client";
import { CardContent } from "./ui/card";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function DeviceComponent({ devices } : { devices : DevicesType[]} ) {
  return (
    <CardContent>
      <Table>
        <TableCaption>
          Your devices and how many times they are visited  {":)"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead className="text-right">Views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device,i) => (
            <TableRow key={i}>
              <TableCell>{device.deviceName}</TableCell>
              <TableCell className="text-right">{device.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
}

export type DevicesType = {
  deviceName: string;
  value: number;
};
