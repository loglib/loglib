"use client";
import React from "react";
import { InsightCard } from "./InsightCard";

export function InsightComponent({ insight }) {
  const { uniqueVisitors, views, averageTime, bounceRate } = insight;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <InsightCard
        title={uniqueVisitors.title}
        Icon={uniqueVisitors.Icon}
        value={uniqueVisitors.value}
      >
        {uniqueVisitors.children}
      </InsightCard>
      <InsightCard title={views.title} Icon={views.Icon} value={views.value}>
        {views.children}
      </InsightCard>
      <InsightCard
        title={averageTime.title}
        Icon={averageTime.Icon}
        value={averageTime.value}
      >
        {averageTime.children}
      </InsightCard>
      <InsightCard
        title={bounceRate.title}
        Icon={bounceRate.Icon}
        value={bounceRate.value}
      >
        {bounceRate.children}
      </InsightCard>
    </div>
  );
}
