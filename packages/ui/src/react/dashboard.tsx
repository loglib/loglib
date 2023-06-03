"use client";
import "../css/index.css";
import React, { useEffect, useState } from "react";
import { DatePicker, CalendarDateRangePicker } from "./components/ui/datePicker";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import useSWR from 'swr'
import { changeTheme, fetcher, getTheme } from "./lib/utils";
import { GetInsightResponse } from "@loglib/core/types"
import { InsightCard } from "./components/insight/insightCard";
import { Activity, Asterisk, Eye, Laptop2, MapPin, MonitorSmartphone, PanelTop, TimerIcon, UserIcon, Users2 } from "lucide-react";
import { Switch } from "./components/ui/switch";
import { PagesComponent } from "./components/insight/pages";
import { RefComponent } from "./components/insight/referrer";
import { DeviceComponent } from "./components/insight/devices";
import { LocationsComponent } from "./components/insight/locations";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { getToday, getTomorrow } from "./lib/timeHelper";
import { Graph } from "./components/insight/visitorsGraph";
import Events from "./components/events";
import LogoIcon from "./components/Icon/LogoIcon";
import NightModeIcon from "./components/Icon/NightModeIcon";

export interface DashboardConfig {
  color?: string;
  className?: string;
  api?: string;
}

export function Dashboard() {
  const [timeRange, setTimeRange] = useState<{
    startDate: Date,
    endDate: Date,
    stringValue?: string
  }>({
    startDate: getToday(),
    endDate: getTomorrow(),
    stringValue: "24hr"
  });

  const [customTime, setCustomTime] = useState(false)
  const url = process.env.LOGLIB_SERVER_URL || process.env.VERCEL_URL || location.origin + "/api/loglib"
  const { data, error } = useSWR<GetInsightResponse>(url + `?startDate=${timeRange.startDate.toUTCString()}&endDate=${timeRange.endDate.toUTCString()}&path=/dashboard`, fetcher)
  const [bySecond, setBySecond] = useState<boolean>(true)
  const [by, setBy] = useState<"bySec" | "byMin">("bySec")

  useEffect(() => {
    const theme = getTheme()
    document.documentElement.classList.add(theme);
  }, [0]);

  if (!data) {
    return <div>
      Loading...
    </div>
  }
  if (error) {
    console.log(error)
    return <div>
      Error
    </div>
  }

  return (
    <>
      <LayoutGroup>
        <div className="bg-white min-h-screen w-full  dark:bg-black transition-all duration-700 dark:text-white/90 scrollbar-hide">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-y-2">
                <LogoIcon />
                <h2 className="text-4xl font-bold tracking-tight">LOGLIB</h2>
              </div>
              <div className="lg:flex flex-col justify-center items-center col-span-1 self-center select-none relative">
                <div
                  className="border p-4 px-5 rounded-md cursor-pointer border-[#996A6A] hover:bg-gray-100 dark:hover:bg-gray-900 dark:bg-dark shadow-black/70 transition-al duration-300 ease-in-out"
                  onClick={changeTheme}
                >
                  <NightModeIcon />
                </div>
              </div>
            </div>
            <Tabs defaultValue="insights" className="space-y-4" >
              <TabsList>
                <TabsTrigger
                  value="insights"
                  className="data-[state=active]:text-emphasis"
                >
                  Insights
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="data-[state=active]:text-emphasis"
                >
                  Events
                </TabsTrigger>
              </TabsList>
              <div className=" flex justify-between">
                <div className=" flex gap-2 items-center">
                  <DatePicker setTimeRange={setTimeRange} setCustomTime={setCustomTime} timeRange={timeRange} customTime={customTime} />

                </div>

                <div className=" flex gap-1 items-center">
                  <div className=" w-2.5 h-2.5 bg-gradient-to-tr from-lime-500 to-lime-700 animate-pulse rounded-full" >
                  </div>
                  <p className=" text-sm bg-gradient-to-tr from-lime-600 to-lime-800 text-transparent bg-clip-text font-medium">
                    {data.onlineUsers} Online
                  </p>
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
                    <CalendarDateRangePicker setDate={setTimeRange} date={{
                      from: timeRange.startDate,
                      to: timeRange.endDate
                    }} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                <motion.div layout>
                  <TabsContent value="insights" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 grid-cols-2 lg:grid-cols-4">
                      <InsightCard
                        title={"Unique Visitors"}
                        Icon={UserIcon}
                        data={data.insight.uniqueVisitors}
                      />
                      <InsightCard
                        title={"Views"}
                        Icon={Eye}
                        data={data.insight.pageView}
                      />
                      <InsightCard
                        title={"Average Time"}
                        Icon={TimerIcon}
                        data={data.insight.averageTime[by]}
                        valuePrefix={!bySecond ? "min" : "sec"}
                        bottomChildren={(
                          <div className=" flex space-x-2 text-sm items-center">
                            <Switch id="min" onCheckedChange={(checked) => setBy(by === "byMin" ? "bySec" : "byMin")} />
                          </div>
                        )}
                      />
                      <InsightCard
                        title={"Bounce Rate"}
                        valuePrefix={"%"}
                        Icon={Activity}
                        negative
                        data={data.insight.bounceRate}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 grid-cols-1">
                      <Card className="col-span-4">
                        <Tabs defaultValue="visitors">
                          <CardHeader className=" flex-row justify-between items-center">
                            <CardTitle>Visitors</CardTitle>
                            <TabsList>
                              <TabsTrigger value="visitors">
                                Visitors

                              </TabsTrigger>
                              <TabsTrigger value="sessions">
                                Sessions

                              </TabsTrigger>
                            </TabsList>
                          </CardHeader>
                          <CardContent className="pl-2">
                            <TabsContent value="visitors">

                              <Graph data={data.graph.uniqueVisitorsByDate} name="Visitors" Icon={Users2} />
                            </TabsContent>
                            <TabsContent value="sessions">
                              <Graph data={data.graph.uniqueSessionByDate} name="Sessions" Icon={Laptop2} />
                            </TabsContent>
                          </CardContent>
                        </Tabs>
                      </Card>
                      <Card className=" md:col-span-3">
                        <Tabs defaultValue="pages">
                          <TabsList className="md:w-full space-x-2 md:justify-start grid grid-cols-4">
                            <TabsTrigger value="pages" className=" space-x-2 ">
                              <PanelTop size={16} />
                              <p>Pages</p>
                            </TabsTrigger>
                            <TabsTrigger
                              value="locations"
                              className=" space-x-2"
                            >
                              <MapPin size={16} />
                              <p>Locations</p>
                            </TabsTrigger>
                            <TabsTrigger value="ref" className=" space-x-2">
                              <Asterisk size={16} />
                              <p>Referees</p>
                            </TabsTrigger>
                            <TabsTrigger value="device" className=" space-x-2">
                              <MonitorSmartphone size={16} />
                              <p>Devices</p>
                            </TabsTrigger>

                          </TabsList>

                          <TabsContent value="pages">
                            <PagesComponent pageViews={data.data.pages} />
                          </TabsContent>
                          <TabsContent value="ref">
                            <RefComponent refs={data.data.referrer} />
                          </TabsContent>

                          <TabsContent value="locations">
                            <LocationsComponent country={data.data.locations.country} city={data.data.locations.city} />
                          </TabsContent>
                          <TabsContent value="device">
                            <DeviceComponent devices={data.data.devices} os={data.data.os} browser={data.data.browser} />
                          </TabsContent>
                        </Tabs>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="events">
                    <Events events={data.eventsWithData} />
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </LayoutGroup>
    </>
  );
}