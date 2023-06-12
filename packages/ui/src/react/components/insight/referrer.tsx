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
import { RefIcons } from "@/assets/Icons";
import { FilterProp } from "@/react/lib/filter";
import { ClearFilter } from "../util/clearFilter";
import { TableLoading } from "../util/tableLoading";
import { ScrollArea } from "../ui/scroll-area";

export function RefComponent({ refs, filter: { isFilterActive, clearFilter, addFilter }, isLoading }: { refs?: RefType[], filter: FilterProp, isLoading: boolean }) {
  return (
    <CardContent>
      {
        isFilterActive("referrer") ?
          <ClearFilter onClick={() => {
            clearFilter("referrer")
          }} />
          : null
      }
      <ScrollArea className=" md:h-96 h-72">
        <Table>
          <TableCaption>
            Your referees and how many times they are visited  {":)"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Referees</TableHead>
              <TableHead className="text-right">Views</TableHead>
            </TableRow>
          </TableHeader>
          {
            isLoading || !refs ? (
              <TableLoading cellCount={2} />
            )
              : <TableBody>
                {refs.map((refs, i) => (
                  <TableRow key={i}
                    onClick={() => {
                      addFilter({
                        key: "referrer",
                        value: refs.referrer ? refs.referrer : "direct",
                        operator: "is",
                        data: "session"
                      })
                    }}
                    className=" cursor-pointer"
                  >
                    <TableCell className="flex gap-1 items-center">
                      {
                        RefIcons[refs.referrer.toLowerCase()] ? RefIcons[refs.referrer.toLowerCase()]() : RefIcons["default"]()
                      }
                      {refs.referrer}
                    </TableCell>
                    <TableCell className="text-right">{refs.visits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
          }
        </Table>
      </ScrollArea>
    </CardContent>
  );
}

export type RefType = {
  referrer: string;
  visits: number;
};
