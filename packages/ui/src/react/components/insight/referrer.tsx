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

export function RefComponent({ refs, filter: { isFilterActive, clearFilter, addFilter }, isLoading }: { refs?: RefType[], filter: FilterProp, isLoading: boolean }) {
  const parseUrl = (url: string) => {
    try {
      const newUrl = new URL(url);
      return newUrl.hostname.replace("www.", "").replace(".com", "").charAt(0).toUpperCase() + newUrl.hostname.replace("www.", "").replace(".com", "").slice(1);
    } catch {
      return url;
    }
  };
  return (
    <CardContent>
      {
        isFilterActive("referrer") ?
          <ClearFilter onClick={() => {
            clearFilter("referrer")
          }} />
          : null
      }
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
                      RefIcons[parseUrl(refs.referrer).toLowerCase()] ? RefIcons[parseUrl(refs.referrer).toLowerCase()]() : RefIcons["default"]()
                    }
                    {parseUrl(refs.referrer)}
                  </TableCell>
                  <TableCell className="text-right">{refs.visits}</TableCell>
                </TableRow>
              ))}
            </TableBody>

        }
      </Table>
    </CardContent>
  );
}

export type RefType = {
  referrer: string;
  visits: number;
};
