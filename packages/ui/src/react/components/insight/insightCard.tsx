"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import React from "react";
import { ArrowDown, ArrowUpIcon, LucideIcon } from "lucide-react";

export type InsightType = {
  title: string,
  Icon: LucideIcon,
  data: {
    total: number,
    change: number,
  }
  valuePrefix?: string,
  changePrefix?: string,
  bottomChildren?: React.ReactNode,
  negative?: boolean,
}

export function InsightCard({ title, Icon, data, valuePrefix, bottomChildren, negative, changePrefix }: InsightType) {

  return (
    <Card className=" bg-gradient-to-tr dark:from-black  dark:to-slate-900 border ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{`${!isNaN(data.total) ? data.total.toLocaleString() : 0} ${valuePrefix ?? ""}`}</div>
        <div className=" flex justify-between">
          <div className=" flex text-xs">
            {
              data.change > 0 && !negative ? (
                <ArrowUpIcon className=" text-green-500" size={16} />
              ) : (
                <ArrowDown className=" text-red-500" size={16} />)
            }
            <div> {changePrefix ?? ""}{data.change.toLocaleString()}%</div>
          </div>
          {bottomChildren}
        </div>

      </CardContent>
    </Card>
  );
}


