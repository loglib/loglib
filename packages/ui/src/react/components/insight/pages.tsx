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

export function PagesComponent({ pageViews }: { pageViews: PageViewsType[] }) {
  return (
    <CardContent>
      <Table>
        <TableCaption>
          Your pages and how many times they are visited {":)"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Page</TableHead>
            <TableHead className="text-right">Views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageViews.map((pageView) => (
            <TableRow key={pageView.page}>
              <TableCell>{pageView.page}</TableCell>
              <TableCell className="text-right">{pageView.visits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
}

export interface PageViewsType {
  page: string,
  visits: number,
}
