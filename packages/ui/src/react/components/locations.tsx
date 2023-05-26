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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";


export function LocationsComponent({ city, country }: { city: City[], country: Country[] }) {
  return (
    <CardContent>
      <Tabs className=" w-full" defaultValue="country">
        <TabsList className=" border-gray-400 ml-auto">
          <TabsTrigger value="country">
            Country
          </TabsTrigger>
          <TabsTrigger value="city">
            City
          </TabsTrigger>
        </TabsList>
        <TabsContent value="country">
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
              {country.map((location) => (
                <TableRow key={location.location}>
                  <TableCell>{location.location}</TableCell>
                  <TableCell className="text-right">{location.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="city">
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
              {city.map((location) => (
                <TableRow key={location.location}>
                  <TableCell>{location.location}</TableCell>
                  <TableCell className="text-right">{location.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </CardContent>
  );
}

export type City = {
  location: string;
  visits: number;
};

type Country = {
  location: string,
  visits: number;
}