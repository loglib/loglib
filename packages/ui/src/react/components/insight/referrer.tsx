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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function RefComponent({ refs, filter: { isFilterActive, clearFilter, addFilter }, isLoading, utmCampaigns, utmSources }: ReferrerProps) {
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
              UTM Sources
            </TabsTrigger>
            <TabsTrigger value="sources" >
              UTM Campaigns
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
                Your campaigns tracked with utm_campaign parameter {":)"}
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
                    {utmCampaigns.map((campaign, i) => (
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
          <TabsContent value="sources">
            <Table>
              <TableCaption>
                Your campaigns tracked with utm_source parameter {":)"}
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
                    {utmSources.map((campaign, i) => (
                      <TableRow key={i}
                        onClick={() => {
                          addFilter({
                            key: "utmSource",
                            value: campaign.utmSource,
                            operator: "is",
                            data: "session"
                          })
                        }}
                        className=" cursor-pointer"
                      >
                        <TableCell className="flex gap-1 items-center">
                          {campaign.utmSource}
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

export type UtmCampaign = {
  utmCampaign: string;
  visits: number;
}
export type UTMSources = {
  utmSource: string;
  visits: number;
}

export type ReferrerProps = {
  refs?: RefType[];
  utmCampaigns?: UtmCampaign[];
  utmSources?: UTMSources[];
  isLoading: boolean;
  filter: FilterProp
}
