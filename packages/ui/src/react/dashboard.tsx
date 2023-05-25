"use client";
import "../css/index.css";
import { Metadata } from "next";
import { insight } from "./data/insight";
import { EventData } from "./data/event";
import React, { useState } from "react";
import { EventComponent } from "./components/EventComponent";
import { BasicAnalytics } from "./components/BasicAnalytics";
import { FilterComponent } from "./components/FilterComponent";
import { InsightComponent } from "./components/InsightComponent";
import { OverviewComponent } from "./components/OverviewComponent";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { TransitionUIComponent } from "./components/TransitionUIComponent";
import { NavUiComponent } from "./components/NavUiComponent";

export interface DashboardConfig {
  color?: string;
  className?: string;
  api?: string;
}

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

export function Dashboard() {
  const [timeRange, setTimeRange] = useState<string>("");
  return (
    <>
      <LayoutGroup>
        <div className="bg-white min-h-screen w-full  dark:bg-black transition-all duration-700 dark:text-white/90">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <NavUiComponent />
            <Tabs defaultValue="overview" className="space-y-4" orientation="vertical" >
              <TabsList>
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:text-emphasis"
                >
                  Insights
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:text-emphasis"
                >
                  Events
                </TabsTrigger>
              </TabsList>
              <FilterComponent setTimeRange={setTimeRange} />
              <TransitionUIComponent val={timeRange} />
              <AnimatePresence>
                <motion.div layout>
                  <TabsContent value="overview" className="space-y-4">
                    <InsightComponent insight={insight} />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                      <OverviewComponent />
                      <BasicAnalytics />
                    </div>
                  </TabsContent>
                  <TabsContent value="analytics">
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