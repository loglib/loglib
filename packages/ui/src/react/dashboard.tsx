import "../css/index.css";
import React, { FC, Fragment, useEffect, useState } from "react";
import { DatePicker, CalendarDateRangePicker } from "./components/ui/datePicker";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import useSWR from 'swr'
import {  cn, fetcher, getTheme, getUrl } from "@/react/lib/utils";
import { GetInsightResponse } from "@loglib/core"
import { InsightCard } from "./components/insight/insightCard";
import { Activity, Asterisk, Eye, Laptop2, MapPin, MonitorSmartphone, PanelTop, TimerIcon, UserIcon, Users2 } from "lucide-react";
import { PagesComponent } from "./components/insight/pages";
import { RefComponent } from "./components/insight/referrer";
import { DeviceComponent } from "./components/insight/devices";
import { LocationsComponent } from "./components/insight/locations";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { getToday, getTomorrow } from "./lib/timeHelper";
import { Graph } from "./components/insight/visitorsGraph";
import Events from "./events";
import { Filter, FilterProp } from "./lib/filter";
import { Login } from "./login";
import ct from "countries-and-timezones"
import { DefaultHeader } from "./components/header";
import LocationMap from "./components/insight/locationMap";
import { TimeRange } from "./lib/type";
import { Switch } from "./components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";


type DashboardProps = {
  websiteId?: string,
  websiteUrl?: string
  components?: typeof defaultComponents
  className?: string
  noAuth?: boolean
  style?: React.CSSProperties,
  theme?: "light" | "dark"
}

const defaultComponents = {
  header: DefaultHeader,
}

export const Dashboard: FC<DashboardProps> = (props = {
  components: defaultComponents
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startDate: getToday(),
    endDate: getTomorrow(),
    stringValue: "24hr"
  });

  const [customTime, setCustomTime] = useState(false)

  const [filters, setFilters] = useState<Filter[]>([])
  const [isAuth, setIsAuth] = useState(true)
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

  const { data, isLoading } = useSWR<GetInsightResponse>(getUrl() + `?startDate=${timeRange.startDate.toUTCString()}&endDate=${timeRange.endDate.toUTCString()}&timeZone=${timezone}&filter=${JSON.stringify(filters)}&path=/dashboard&websiteId=${props.websiteId ?? ""}`, fetcher, {
    onError(err: { response: { status: number; } }) {
      if (err.response.status === 401) {
        setIsAuth(false)
      }
    },
    refreshInterval: 1000 * 12
  })

  function addFilter(f: Filter) {
    setFilters([...filters, f])
  }

  function clearFilter(key: string) {
    setFilters((prev) => prev.filter((f) => f.key !== key))
  }

  const isFilterActive = (key: string) => filters.some((filter) => filter.key === key)


  const filter: FilterProp = {
    addFilter,
    clearFilter,
    isFilterActive
  }

  const [token, setToken] = useState("")

  //for some reason addis ababa is not included in the list of timezones which is I'm from
  const timezones = { ...ct.getAllTimezones(), "Africa/Addis_Ababa": { name: "Africa/Addis_Ababa" } }

  useEffect(() => {
    const theme = getTheme()
    document.documentElement.classList.add(theme);
    const storedToken = localStorage.getItem("ll-token")
    if (storedToken) {
      setToken(storedToken)
      setIsAuth(true)
    }
  }, []);

  function defaultLogout() {
    {
      setIsAuth(false)
      setToken('')
      localStorage.removeItem("ll-token")
      sessionStorage.removeItem("ll-auth")
    }
  }

  const [curTableTab, setCurTableTab] = useState("")
  const [viCardSwitch, setViCardSwitch] = useState(false)


  const [theme, setTheme] = useState(props.theme)

  useEffect(() => {
    if (props.theme) {
      setTheme(props.theme)
    }
  }, [props])
  return (
    <main className={
      theme === "dark" ? "dark" : ""
    }>
      <LayoutGroup>
        <div style={props.style} className={cn("tw-min-h-screen dark:tw-bg-[#02060f] tw-bg-white tw-w-full tw-space-y-4 tw-p-8 tw-pt-6 tw-transition-all tw-duration-700 dark:tw-text-white/80 scrollbar-hide", props.className)}>
          <props.components.header timezone={timezone} setTimezone={setTimezone} timezones={timezones} logoutFn={defaultLogout} hideLogout={!token} />
          {isAuth || props.noAuth ?
            <Tabs defaultValue="insights" className="tw-space-y-4" >
              <TabsList>
                <TabsTrigger
                  value="insights"
                  className=" dark:data-[state=active]:tw-text-emphasis data-[state=active]:tw-text-emphasis"
                >
                  Insights
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className=" dark:data-[state=active]:tw-text-emphasis data-[state=active]:tw-text-emphasis"
                >
                  Events
                </TabsTrigger>
              </TabsList>
              <div className=" tw-flex tw-justify-between">
                <div className=" tw-flex tw-gap-2 tw-items-center">
                  <DatePicker setTimeRange={setTimeRange} setCustomTime={setCustomTime} timeRange={timeRange} customTime={customTime} />
                </div>
                <div className=" tw-flex tw-flex-col tw-items-end">
                  <div className=" tw-flex tw-gap-1 tw-items-center">
                    <div className=" tw-w-2.5 tw-h-2.5 tw-bg-gradient-to-tr tw-from-lime-500 tw-to-lime-700 tw-animate-pulse tw-rounded-full" >
                    </div>
                    <p className=" tw-text-sm tw-bg-gradient-to-tr tw-from-lime-600 tw-to-lime-800 tw-text-transparent tw-bg-clip-text tw-font-medium">
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
                    tw-transition={{
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
                  <TabsContent value="insights" className="tw-space-y-4">
                    <div className="tw-grid tw-gap-4 md:tw-grid-cols-2 tw-grid-cols-2 lg:tw-grid-cols-4">
                      <InsightCard
                        title={viCardSwitch ? "New Visitors" : "Unique Visitors"}
                        Icon={UserIcon}
                        data={data ? viCardSwitch ? data.insight.newVisitors : data.insight.uniqueVisitors : { change: 0, total: 0 }}
                        isLoading={isLoading}
                        tooltip={
                          viCardSwitch ? "The number of first-time visitors to your website." : "The number of unique visitors to your website."
                        }
                        BottomChildren={() => (
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <Switch onCheckedChange={(v) => setViCardSwitch(v)} checked={viCardSwitch} />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    Switch between unique visitors and new visitors
                                  </p>
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
                    <div className="tw-grid tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-7 tw-grid-cols-1">
                      <Card className="md:tw-col-span-4 ">
                        {
                          curTableTab === "locations" ?
                            <Fragment>
                              <CardHeader className=" tw-flex tw-flex-row tw-gap-2 tw-items-end">
                                {/* <svg viewBox="0 0 24 24" className=" h-5 w-5 tw-stroke-emphasis" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.5 6L18.0333 7.1C17.6871 7.35964 17.2661 7.5 16.8333 7.5H13.475C12.8775 7.5 12.3312 7.83761 12.064 8.37206V8.37206C11.7342 9.03161 11.9053 9.83161 12.476 10.2986L14.476 11.9349C16.0499 13.2227 16.8644 15.22 16.6399 17.2412L16.5936 17.6577C16.5314 18.2177 16.4102 18.7695 16.232 19.304L16 20" stroke-width="2"></path> <path d="M2.5 10.5L5.7381 9.96032C7.09174 9.73471 8.26529 10.9083 8.03968 12.2619L7.90517 13.069C7.66434 14.514 8.3941 15.9471 9.70437 16.6022V16.6022C10.7535 17.1268 11.2976 18.3097 11.0131 19.4476L10.5 21.5" className=" tw-bg-emphasis" stroke-width="2"></path> <circle cx="12" cy="12" r="9" className=" tw-stroke-emphasis" stroke-width="2"></circle> </g></svg> */}
                                <CardTitle className="tw-text-base py-4">Visitors Map</CardTitle>

                              </CardHeader>
                              <CardContent className={
                                cn(
                                  curTableTab === "locations" && "tw-zoom-in-95"
                                )
                              } >
                                <LocationMap data={data ? data.data.locations.country : []} />
                              </CardContent>
                            </Fragment>
                            :
                            <Tabs defaultValue="visitors">
                              <CardHeader className=" tw-flex tw-flex-row tw-justify-between tw-items-center">

                                <CardTitle className="tw-text-base">Visitors</CardTitle>
                                <TabsList>
                                  <TabsTrigger value="visitors">
                                    Visitors
                                  </TabsTrigger>
                                  <TabsTrigger value="sessions">
                                    Sessions
                                  </TabsTrigger>
                                </TabsList>
                              </CardHeader>
                              <CardContent>
                                <div className="tw-pl-2">
                                  <TabsContent value="visitors">
                                    <Graph data={data ? data.graph.uniqueVisitorsByDate : []} name="Visitors" Icon={Users2} isLoading={isLoading} setTimeRange={setTimeRange} />
                                  </TabsContent>
                                  <TabsContent value="sessions" className=" ">
                                    <Graph data={data ? data.graph.uniqueSessionByDate : []} name="Sessions" Icon={Laptop2} isLoading={isLoading} setTimeRange={setTimeRange} />
                                  </TabsContent>
                                </div>
                              </CardContent>
                            </Tabs>
                        }

                      </Card>
                      <Card className=" md:tw-col-span-3">
                        <Tabs defaultValue="pages"
                          onValueChange={(val) => setCurTableTab(val)}
                        >
                          <TabsList className="md:tw-w-full tw-space-x-2 md:tw-justify-start tw-grid tw-grid-cols-4">
                            <TabsTrigger value="pages" className=" tw-space-x-2 ">
                              <PanelTop size={16} />
                              <p>Pages</p>
                            </TabsTrigger>
                            <TabsTrigger
                              value="locations"
                              className=" tw-space-x-2"
                            >
                              <MapPin size={16} />
                              <p>Locations</p>
                            </TabsTrigger>
                            <TabsTrigger value="ref" className=" tw-space-x-2">
                              <Asterisk size={16} />
                              <p>Referees</p>
                            </TabsTrigger>
                            <TabsTrigger value="device" className=" tw-space-x-2">
                              <MonitorSmartphone size={16} />
                              <p>Devices</p>
                            </TabsTrigger>

                          </TabsList>

                          <TabsContent value="pages">
                            <PagesComponent pageViews={data ? data.data.pages : []} filter={filter} isLoading={isLoading} websiteUrl={props.websiteUrl} />
                          </TabsContent>
                          <TabsContent value="locations">
                            <LocationsComponent country={data ? data.data.locations.country : []} city={data ? data.data.locations.city : []} filter={filter} isLoading={isLoading} />
                          </TabsContent>
                          <TabsContent value="ref">
                            <RefComponent refs={data ? data.data.referrer : []} utmCampaigns={data ? data.data.utmCampaigns : []} utmSources={data ? data.data.utmSources : []} filter={filter} isLoading={isLoading} />
                          </TabsContent>
                          <TabsContent value="device">
                            <DeviceComponent devices={data ? data.data.devices : []} os={data ? data.data.os : []} browser={data ? data.data.browser : []} filter={filter} isLoading={isLoading} />
                          </TabsContent>
                        </Tabs>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="events">
                    <Events events={data ? data.eventsWithData : []} isLoading={isLoading} />
                  </TabsContent>

                </motion.div>
              </AnimatePresence>
            </Tabs>
            : <Login setAuth={setIsAuth} setToken={setToken} />
          }
        </div>
      </LayoutGroup>
    </main>
  );
}