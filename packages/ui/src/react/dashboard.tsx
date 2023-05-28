"use client";
import "../css/index.css";
import React, { useState } from "react";
import { EventComponent } from "./components/eventComponent";
import { FilterComponent } from "./components/filter";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { NavUiComponent } from "./components/header";
import useSWR from 'swr'
import { fetcher } from "./lib/utils";
import { GetInsightResponse } from "@loglib/core/types"
import { InsightCard } from "./components/insightCard";
import { Activity, Asterisk, Eye, Laptop2, MapPin, MonitorSmartphone, PanelTop, TimerIcon, UserIcon, Users2 } from "lucide-react";
import { Switch } from "./components/ui/switch";
import { PagesComponent } from "./components/pages";
import { RefComponent } from "./components/referrer";
import { DeviceComponent } from "./components/devices";
import { LocationsComponent } from "./components/locations";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { getToday, getTomorrow } from "./lib/timeHelper";
import { CalendarDateRangePicker } from "./components/datePicker";
import { Graph } from "./components/visitorsGraph";
import { getAverageTime, getBounceRate, getBrowser, getDevice, getLoc, getOS, getOnlineUsers, getPageViews, getPages, getReferer, getUniqueVisitors, getVisitorsByDate } from "./lib/insight";
import { getEvents } from "./lib/events";

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
  const url = process.env.VERCEL_URL || process.env.LOGLIB_SERVER_URL || "http://localhost:3000/api/loglib"
  const { data } = useSWR<GetInsightResponse>(url + `?startDate=${timeRange.startDate.toUTCString()}&endDate=${timeRange.endDate.toUTCString()}&path=/dashboard`, fetcher)
  const [bySecond, setBySecond] = useState<boolean>(true)

  if (!data) {
    return <div>
      Loading...
    </div>
  }

  return (
    <>
      <LayoutGroup>
        <div className="bg-white min-h-screen w-full  dark:bg-black transition-all duration-700 dark:text-white/90">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <NavUiComponent />
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
                <FilterComponent setTimeRange={setTimeRange} setCustomTime={setCustomTime} timeRange={timeRange} customTime={customTime} />
                <div className=" flex gap-1 items-center">
                  <div className=" w-2.5 h-2.5 bg-gradient-to-tr from-lime-500 to-lime-700 animate-pulse rounded-full" >
                  </div>
                  <p className=" text-sm bg-gradient-to-tr from-lime-600 to-lime-800 text-transparent bg-clip-text font-medium">
                    {getOnlineUsers(data.sessions)} Online
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
                        data={getUniqueVisitors(data.users, data.pastUsers)}
                      />
                      <InsightCard
                        title={"Views"}
                        Icon={Eye}
                        data={getPageViews(data.pageViews, data.pastPageViews)}
                      />
                      <InsightCard
                        title={"Average Time"}
                        Icon={TimerIcon}
                        data={getAverageTime(data.sessions, data.pastSessions, bySecond)}
                        valuePrefix={!bySecond ? "min" : "sec"}
                        bottomChildren={(
                          <div className=" flex space-x-2 text-sm items-center">
                            <Switch id="min" onCheckedChange={(checked) => setBySecond(!checked)} />
                          </div>
                        )}
                      />
                      <InsightCard
                        title={"Bounce Rate"}
                        valuePrefix={"%"}
                        Icon={Activity}
                        negative
                        data={getBounceRate(data.pageViews, data.pastPageViews, data.sessions, data.pastSessions)}
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

                              <Graph data={getVisitorsByDate(data.sessions, timeRange.startDate, timeRange.endDate)} name="Visitors" Icon={Users2} />
                            </TabsContent>
                            <TabsContent value="sessions">
                              <Graph data={getVisitorsByDate(data.sessions, timeRange.startDate, timeRange.endDate, false)} name="Sessions" Icon={Laptop2} />
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
                            <TabsTrigger value="ref" className=" space-x-2">
                              <Asterisk size={16} />
                              <p>Referees</p>
                            </TabsTrigger>
                            <TabsTrigger value="device" className=" space-x-2">
                              <MonitorSmartphone size={16} />
                              <p>Devices</p>
                            </TabsTrigger>
                            <TabsTrigger
                              value="locations"
                              className=" space-x-2"
                            >
                              <MapPin size={16} />
                              <p>Locations</p>
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="pages">
                            <PagesComponent pageViews={getPages(data.pageViews)} />
                          </TabsContent>
                          <TabsContent value="ref">
                            <RefComponent refs={getReferer(data.sessions)} />
                          </TabsContent>

                          <TabsContent value="locations">
                            <LocationsComponent country={getLoc(data.sessions)} city={getLoc(data.sessions, false)} />
                          </TabsContent>
                          <TabsContent value="device">
                            <DeviceComponent devices={getDevice(data.sessions)} os={getOS(data.sessions)} browser={getBrowser(data.sessions)} />
                          </TabsContent>
                        </Tabs>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="events">
                    <EventComponent events={getEvents(data.events, data.sessions)} />
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