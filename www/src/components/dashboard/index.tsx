"use client";

import React, { Fragment, useState } from "react";
import { GetInsightResponse } from "@loglib/core";
import { Website } from "generated/client";
import ct from "countries-and-timezones";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Activity, Eye, Laptop2, TimerIcon, UserIcon, Users2 } from "lucide-react";
import useSWR from "swr";

import { getLast24Hour } from "@/lib/time-helper";
import { cn, fetcher } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { CalendarDateRangePicker, DatePicker } from "./date-picker";
import Events from "./events";
import { InsightCard } from "./insight/card";
import LocationMap from "./insight/location-map";
import { InsightTables } from "./insight/tables";
import { Graph } from "./insight/visitor-graph";
import { Filter, FilterProp, TimeRange } from "./type";

export const Dashboard = ({ website, isPublic }: { website: Website; isPublic: boolean }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startDate: getLast24Hour(),
    endDate: new Date(),
    stringValue: "24hr",
  });

  const [customTime, setCustomTime] = useState(false);

  const [filters, setFilters] = useState<Filter[]>([]);
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const url = `/api/loglib/${website.id}`;
  const { data, isLoading } = useSWR<GetInsightResponse>(
    `${url}?startDate=${timeRange.startDate.toUTCString()}&endDate=${timeRange.endDate.toUTCString()}&timeZone=${timezone}&filter=${JSON.stringify(
      filters,
    )}`,
    fetcher,
  );

  function addFilter(f: Filter) {
    setFilters([...filters, f]);
  }

  function clearFilter(key: string) {
    setFilters((prev) => prev.filter((f) => f.key !== key));
  }

  const isFilterActive = (key: string) => filters.some((filter) => filter.key === key);

  const filter: FilterProp = {
    addFilter,
    clearFilter,
    isFilterActive,
  };

  const timezones = {
    ...ct.getAllTimezones(),
    "Africa/Addis_Ababa": { name: "Africa/Addis_Ababa" },
  };

  const [curTableTab, setCurTableTab] = useState("");
  const [viCardSwitch, setViCardSwitch] = useState(false);

  return (
    <main>
      <LayoutGroup>
        <div
          className={cn(
            "w-full space-y-4 transition-all duration-700 dark:text-white/80 scrollbar-hide",
          )}
        >
          <Tabs defaultValue="insights" className="space-y-4">
            {!isPublic ? (
              <TabsList>
                <TabsTrigger
                  value="insights"
                  className=" dark:data-[state=active]:text-emphasis data-[state=active]:text-emphasis"
                >
                  Insights
                </TabsTrigger>

                <TabsTrigger
                  value="events"
                  className=" dark:data-[state=active]:text-emphasis data-[state=active]:text-emphasis"
                >
                  Events
                </TabsTrigger>
              </TabsList>
            ) : null}
            <div className=" flex justify-between">
              <div className=" flex gap-2 items-center">
                <DatePicker
                  setTimeRange={setTimeRange}
                  setCustomTime={setCustomTime}
                  timeRange={timeRange}
                  customTime={customTime}
                />
              </div>
              <div className=" flex flex-col items-end">
                <div className=" flex gap-1 items-center">
                  <div className=" w-2.5 h-2.5 bg-gradient-to-tr from-lime-500 to-lime-700 animate-pulse rounded-full"></div>
                  <p className=" text-sm bg-gradient-to-tr from-lime-600 to-lime-800 text-transparent bg-clip-text font-medium">
                    {data ? data.onlineUsers : 0} Online
                  </p>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {customTime && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "keyframes",
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <CalendarDateRangePicker
                    setDate={setTimeRange}
                    date={{
                      from: timeRange.startDate,
                      to: timeRange.endDate,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              <motion.div layout>
                <TabsContent value="insights" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 grid-cols-2 lg:grid-cols-4">
                    <InsightCard
                      title={viCardSwitch ? "New Visitors" : "Unique Visitors"}
                      Icon={UserIcon}
                      data={
                        data
                          ? viCardSwitch
                            ? data.insight.newVisitors
                            : data.insight.uniqueVisitors
                          : { change: 0, total: 0 }
                      }
                      isLoading={isLoading}
                      tooltip={
                        viCardSwitch
                          ? "The number of first-time visitors to your website."
                          : "The number of unique visitors to your website."
                      }
                      BottomChildren={() => (
                        <div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <Switch
                                    onCheckedChange={(v) => setViCardSwitch(v)}
                                    checked={viCardSwitch}
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Switch between unique visitors and new visitors</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    />
                    <InsightCard
                      title={"Views"}
                      Icon={Eye}
                      data={data ? data.insight.pageView : { change: 0, total: 0 }}
                      isLoading={isLoading}
                      tooltip="The total number of pages viewed. Repeated views of a single page are counted."
                    />
                    <InsightCard
                      title={"Average Time"}
                      Icon={TimerIcon}
                      data={data ? data.insight.averageTime : { change: 0, total: 0 }}
                      valuePrefix={""}
                      isLoading={isLoading}
                      tooltip="The average amount of time visitors spend on your website."
                    />
                    <InsightCard
                      title={"Bounce Rate"}
                      valuePrefix={"%"}
                      Icon={Activity}
                      negative
                      data={data ? data.insight.bounceRate : { change: 0, total: 0 }}
                      isLoading={isLoading}
                      tooltip=" The percentage of visitors who quickly exit your website without exploring further."
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 grid-cols-1">
                    <Card className="md:col-span-4 ">
                      {curTableTab === "locations" ? (
                        <Fragment>
                          <CardHeader className=" flex flex-row gap-2 items-end">
                            <CardTitle className="text-base py-4">Visitors Map</CardTitle>
                          </CardHeader>
                          <CardContent className={cn(curTableTab === "locations" && "zoom-in-95")}>
                            <LocationMap data={data ? data.data.locations.country : []} />
                          </CardContent>
                        </Fragment>
                      ) : (
                        <Tabs defaultValue="visitors">
                          <CardHeader className=" flex flex-row justify-between items-center">
                            <CardTitle className="text-base">Visitors</CardTitle>
                            <TabsList>
                              <TabsTrigger value="visitors">Visitors</TabsTrigger>
                              <TabsTrigger value="sessions">Sessions</TabsTrigger>
                            </TabsList>
                          </CardHeader>
                          <CardContent>
                            <div className="pl-2">
                              <TabsContent value="visitors">
                                <Graph
                                  data={data ? data.graph.uniqueVisitorsByDate : []}
                                  name="Visitors"
                                  Icon={Users2}
                                  isLoading={isLoading}
                                  setTimeRange={setTimeRange}
                                />
                              </TabsContent>
                              <TabsContent value="sessions" className=" ">
                                <Graph
                                  data={data ? data.graph.uniqueSessionByDate : []}
                                  name="Sessions"
                                  Icon={Laptop2}
                                  isLoading={isLoading}
                                  setTimeRange={setTimeRange}
                                />
                              </TabsContent>
                            </div>
                          </CardContent>
                        </Tabs>
                      )}
                    </Card>
                    <InsightTables
                      isLoading={isLoading}
                      filter={filter}
                      data={data}
                      websiteUrl={website.url}
                      setCurrentTableTab={setCurTableTab}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="events">
                  <Events events={data ? data.eventsWithData : []} isLoading={isLoading} />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </LayoutGroup>
    </main>
  );
};
