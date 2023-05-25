"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import React, { ReactElement } from "react";
import { LucideIcon } from "lucide-react";

export function InsightCard( {title, Icon, value, children} : InsightType ) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className=" flex text-xs">{children}</div>
      </CardContent>
    </Card>
  );
}


export interface InsightType {
  title: string;
  Icon: LucideIcon;
  value: number | string;
  children: ReactElement | ReactElement[];
}