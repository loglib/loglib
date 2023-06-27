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
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

export function RefComponent({ refs, filter: { isFilterActive, clearFilter, addFilter }, isLoading, campaigns }: ReferrerProps) {
  return (
    <CardContent>
      {
        isFilterActive("referrer") || isFilterActive("utmCampaign") ?
          <ClearFilter onClick={() => {
            clearFilter("referrer")
            clearFilter("utmCampaign")
          }} />
          : null
      }
      <ScrollArea className=" md:h-96 h-72">
        <Tabs defaultValue="referrer">
          <TabsList>
            <TabsTrigger value="referrer">
              Referrer
            </TabsTrigger>
            <TabsTrigger value="campaigns" >
              Campaigns
            </TabsTrigger>
          </TabsList>
          <TabsContent value="referrer">
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
                            value: refs.referrerDomain ? refs.referrerDomain : "direct",
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
          </TabsContent>
          <TabsContent value="campaigns">
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
                    {campaigns.map((campaign, i) => (
                      <TableRow key={i}
                        onClick={() => {
                          addFilter({
                            key: "utmCampaign",
                            value: campaign.utmCampaign,
                            operator: "is",
                            data: "session"
                          })
                        }}
                        className=" cursor-pointer"
                      >
                        <TableCell className="flex gap-1 items-center">
                          {campaign.utmCampaign}
                        </TableCell>
                        <TableCell className="text-right">{campaign.visits}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              }
            </Table>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </CardContent>
  );
}

export type RefType = {
  referrer: string;
  visits: number;
  referrerDomain: string;
};

export type CampaignType = {
  utmCampaign: string;
  visits: number;
}

export type ReferrerProps = {
  refs?: RefType[];
  campaigns?: CampaignType[];
  isLoading: boolean;
  filter: FilterProp
}
