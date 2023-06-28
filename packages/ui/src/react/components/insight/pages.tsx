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
import { TableLoading } from "../util/tableLoading";
import { ScrollArea } from "../ui/scroll-area";

export function PagesComponent({ pageViews, filter, isLoading, websiteUrl }: { pageViews: PageViewsType[], filter: FilterProp, isLoading?: boolean, websiteUrl?: string }) {
  return (
    <CardContent>
      {
        filter.isFilterActive("page") ?
          <ClearFilter onClick={() => {
            filter.clearFilter("page")
          }} />
          : null
      }
      <ScrollArea className=" md:tw-h-96 tw-h-72">
        <Table>
          <TableCaption>
            Your pages and how many times they are visited {":)"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
              <TableHead className="tw-text-right">Views</TableHead>
            </TableRow>
          </TableHeader>
          {
            isLoading || !pageViews ? (
              <TableLoading cellCount={2} />
            ) : (
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
                    className=" tw-cursor-pointer"
                  >
                    <a
                      href={
                        websiteUrl ? websiteUrl + pageView.page : pageView.page
                      }
                      className=" hover:tw-underline"
                    >
                      <TableCell>{pageView.page.substring(0, 20)} {pageView.page.length > 20 ? "..." : ""}</TableCell>
                    </a>
                    <TableCell className="tw-text-right">{pageView.visits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )
          }
        </Table>
      </ScrollArea>
    </CardContent>
  );
}

export interface PageViewsType {
  page: string,
  visits: number,
}
