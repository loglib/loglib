"use client";
import { Activity, ArrowUpIcon, Eye, Timer, Users } from "lucide-react";
import React from "react";
import { ArrowDownIcon } from "lucide-react";


export const insight = {
  uniqueVisitors: {
    title: "Unique Visitors",
    Icon: Users,
    value: 700,
    children: (
      <>
        <ArrowDownIcon className=" text-red-600" size={16} />
        <div>24.8%</div>
      </>
    ),
  },
  views: {
    title: "Views",
    Icon: Eye,
    value: 2038,
    children: (
      <>
        <ArrowUpIcon className=" text-green-500" size={16} />
        <div>36.8%</div>
      </>
    ),
  },
  averageTime: {
    title: "Average Time",
    Icon: Timer,
    value: "25sec",
    children: <div>+19% from last month</div>,
  },
  bounceRate: {
    title: "Bounce Rate",
    Icon: Activity,
    value: "26%",
    children: <div>+201 since last hour</div>,
  },
};
