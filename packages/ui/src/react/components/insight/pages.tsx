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
import { FilterProp } from "@/react/lib/filter";
import { ClearFilter } from "../util/clearFilter";

export function PagesComponent({ pageViews, filter }: { pageViews: PageViewsType[], filter: FilterProp }) {
  return (
    <CardContent>
      {
        filter.isFilterActive("page") ?
          <ClearFilter onClick={() => {
            filter.clearFilter("page")
          }} />
          : null
      }
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
            <TableRow key={pageView.page}
              onClick={() => {
                filter.addFilter({
                  key: "page",
                  value: pageView.page,
                  operator: "is",
                  data: "pageview"
                })
              }}
              className=" cursor-pointer"
            >
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
