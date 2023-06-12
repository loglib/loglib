"use client";
import { CardContent } from "../ui/card";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import COUNTRIES from "../../lib/constants";
import ReactCountryFlag from "react-country-flag"
import { Link2Icon } from "lucide-react";
import { FilterProp } from "@/react/lib/filter";
import { ClearFilter } from "../util/clearFilter";
import { TableLoading } from "../util/tableLoading";
import { ScrollArea } from "../ui/scroll-area";




export function LocationsComponent({ city, country, isLoading, filter: { addFilter, clearFilter, isFilterActive } }: { city?: City[], country?: Country[], filter: FilterProp, isLoading: boolean }) {
  return (
    <CardContent>

      <Tabs className=" w-full" defaultValue="country">
        {
          isFilterActive("country") || isFilterActive("city") ?
            <ClearFilter onClick={() => {
              clearFilter("country")
              clearFilter("city")
            }} />
            : null
        }
        <TabsList className=" border-gray-400 ml-auto">
          <TabsTrigger value="country">
            Country
          </TabsTrigger>
          <TabsTrigger value="city">
            City
          </TabsTrigger>
        </TabsList>
        <TabsContent value="country">
          <ScrollArea className=" md:h-96 h-72">
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
              {
                isLoading || !country ?
                  <TableLoading cellCount={2} />
                  :
                  <TableBody>
                    {country.map((location) => (
                      <TableRow key={location.location}>
                        <TableCell className=" flex items-center gap-1 cursor-pointer"
                          onClick={() => addFilter({
                            key: "country",
                            value: location.location,
                            operator: "is",
                            data: "session"
                          })}
                        >
                          {location.location === "Unknown" ?
                            <>
                              <Link2Icon />
                              Unknown
                            </>

                            : <>
                              <ReactCountryFlag countryCode={location.location} svg
                                style={{
                                  width: '1em',
                                  height: '1em',
                                }} />
                              {COUNTRIES[location.location]}
                            </>}
                        </TableCell>
                        <TableCell className="text-right">{location.visits}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              }
            </Table>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="city">
          <ScrollArea className=" md:h-96 h-72">
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
              {
                isLoading || !city ? <TableLoading cellCount={2} /> : <TableBody>
                  {city.map((location) => (
                    <TableRow key={location.location}
                      onClick={() => addFilter({
                        key: "city",
                        value: location.location,
                        operator: "is",
                        data: "session"
                      })
                      }
                      className=" cursor-pointer"
                    >
                      <TableCell>{location.location}</TableCell>
                      <TableCell className="text-right">{location.visits}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              }
            </Table>
          </ScrollArea>
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