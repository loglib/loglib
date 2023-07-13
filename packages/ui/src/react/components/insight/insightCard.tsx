"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import React from "react";
import { ArrowDown, ArrowUpIcon, LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export type InsightType = {
  title: string;
  Icon: LucideIcon;
  data: {
    total: number | string;
    change: number;
  };
  valuePrefix?: string;
  changePrefix?: string;
  BottomChildren?: () => React.ReactNode;
  negative?: boolean;
  isLoading?: boolean;
  tooltip?: string;
};

export function InsightCard({
  title,
  Icon,
  data,
  valuePrefix,
  BottomChildren,
  isLoading,
  negative,
  changePrefix,
  tooltip,
}: InsightType) {
  const increase = negative ? data.change <= 0 : data.change >= 0;
  return (
    <Card className=" tw-bg-gradient-to-tr dark:tw-to-black  dark:tw-from-slate-900/30 tw-border tw-from-white tw-to-gray-100">
      <CardHeader className=" tw-flex tw-flex-row  tw-items-center tw-justify-between tw-space-y-0 tw-pb-2">
        <CardTitle className="tw-text-sm tw-font-medium">{title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className=" tw-cursor-pointer">
              <Icon className="tw-h-4 tw-w-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      {!isLoading && data ? (
        <CardContent className="">
          <div className="tw-text-2xl tw-font-bold">{`${
            data.total ? data.total.toLocaleString() : 0
          } ${valuePrefix ?? ""}`}</div>
          <div className=" tw-flex tw-justify-between">
            <div className=" tw-flex tw-text-xs">
              {increase ? (
                <ArrowUpIcon className=" tw-text-green-500" size={16} />
              ) : (
                <ArrowDown className=" tw-text-red-500" size={16} />
              )}
              <div>
                {" "}
                {changePrefix ?? ""}
                {data.change ? data.change.toLocaleString() : 0}%
              </div>
            </div>
            {BottomChildren && <BottomChildren />}
          </div>
        </CardContent>
      ) : (
        <CardContent className=" tw-h-24 tw-w-full tw-animate-pulse">
          <div className="tw-flex tw-flex-col tw-justify-center tw-gap-2">
            <div className="tw-text-2xl tw-font-bold">
              <div className="tw-bg-gray-200 dark:tw-bg-gray-800 tw-h-7 tw-w-24 "></div>
            </div>
            <div className="tw-text-2xl tw-font-bold">
              <div className="tw-bg-gray-200 dark:tw-bg-gray-800 tw-h-4 tw-w-9 "></div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
