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
import { ArrowUpRight } from "lucide-react";

export function RefComponent({ refs }: { refs: RefType[] }) {
  return (
    <CardContent>
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
        <TableBody>
          {refs.map((refs, i) => (
            <TableRow key={i}>

              <TableCell className="flex gap-1 items-center">
                <ArrowUpRight size={16} />
                {refs.referrer}
              </TableCell>
              <TableCell className="text-right">{refs.visits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
}

export type RefType = {
  referrer: string;
  visits: number;
};
