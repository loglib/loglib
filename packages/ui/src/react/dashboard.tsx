"use client";
import "../css/index.css";
import { insight } from "./data/insight";
import { EventData } from "./data/event";
import React, { useEffect, useState } from "react";
import { EventComponent } from "./components/EventComponent";
import { BasicAnalytics } from "./components/BasicAnalytics";
import { FilterComponent } from "./components/FilterComponent";
import { InsightComponent } from "./components/InsightComponent";
import { OverviewComponent } from "./components/OverviewComponent";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { TransitionUIComponent } from "./components/TransitionUIComponent";
import { NavUiComponent } from "./components/NavUiComponent";
import useSWR from 'swr'
import { fetcher } from "./lib/utils";
import { GetInsightResponse } from "@loglib/core/types"

export interface DashboardConfig {
  color?: string;
  className?: string;
  api?: string;
}

export function Dashboard() {
  const url = process.env.VERCEL_URL || process.env.LOGLIB_SERVER_URL || "http://localhost:3000/api/loglib"
  const { data } = useSWR<GetInsightResponse>(url + "?startDate=2023-05-23&endDate=2023-05-26&path=/insight", fetcher)
  const [timeRange, setTimeRange] = useState<string>("");
  useEffect(() => {
    if (data) {
      console.log(data, 'hmm')
    }
  }, [data])
  return (
    <>
      <LayoutGroup>
        <div className="bg-white min-h-screen w-full  dark:bg-black transition-all duration-700 dark:text-white/90">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <NavUiComponent />
            <Tabs defaultValue="overview" className="space-y-4" >
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
              <FilterComponent setTimeRange={setTimeRange} />
              <TransitionUIComponent val={timeRange} />
              <AnimatePresence>
                <motion.div layout>
                  <TabsContent value="insights" className="space-y-4">
                    <InsightComponent insight={insight} />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 grid-cols-1">
                      <OverviewComponent />
                      <BasicAnalytics />
                    </div>
                  </TabsContent>
                  <TabsContent value="events">
                    <EventComponent events={EventData} />
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