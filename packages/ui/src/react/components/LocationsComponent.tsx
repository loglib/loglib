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

export function LocationsComponent({ locations } : { locations : LocationsType[]} ) {
  return (
    <CardContent>
      <Table>
        <TableCaption>
          Your locations and how many times they are visited  {":)"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location,i) => (
            <TableRow key={i}>
              <TableCell>{location.countryName}</TableCell>
              <TableCell className="text-right">{location.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
}

export type LocationsType = {
  countryName: string;
  value: number;
};
