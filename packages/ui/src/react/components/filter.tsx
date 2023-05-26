"use client";
import { CalendarDays } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Separator } from "./ui/separator";
import { getLastNinetyDays, getLastSevenDays, getLastThirtyDays, getThisMonth, getThisWeek, getThisYear, getToday, getTomorrow, getYesterday } from "../lib/timeHelper";

export const FilterComponent = ({ setTimeRange, setCustomTime, timeRange, customTime }: { setTimeRange: React.Dispatch<React.SetStateAction<{ startDate: Date, endDate: Date, stringValue?: string }>>; timeRange: { startDate: Date, endDate: Date, stringValue?: string }; setCustomTime: (state: boolean) => void, customTime: boolean }) => {
  function setTime(value: string) {
    setCustomTime(false)
    switch (value) {
      case "24hr":
        setTimeRange({
          startDate: getToday(),
          endDate: getTomorrow(),
          stringValue: "24hr"
        })
        break;
      case "yesterday":
        setTimeRange({
          startDate: getYesterday(),
          endDate: getToday(),
          stringValue: "yesterday"
        })
        break
      case "thisWeek":
        setTimeRange({
          ...getThisWeek(),
          stringValue: "thisWeek"
        })
        break
      case "7days":
        setTimeRange({
          ...getLastSevenDays(),
          stringValue: "7days"
        })
        break
      case "thisMonth":
        setTimeRange({
          ...getThisMonth(),
          stringValue: "thisMonth"
        })
        break
      case "last30":
        setTimeRange({
          ...getLastThirtyDays(),
          stringValue: "last30"
        })
        break
      case "last90":
        setTimeRange({
          ...getLastNinetyDays(),
          stringValue: "last90"
        })
        break
      case "thisYear":
        setTimeRange({
          ...getThisYear(),
          stringValue: "thisYear"
        })
        break
      default:
        setCustomTime(true)
        break
    }
  }

  return (
    <div className=" flex space-x-2 items-center">
      <Select
        onValueChange={(value) => setTime(value)}
        value={customTime ? "custom" : timeRange.stringValue}
        defaultValue="24hr"
      >
        <SelectTrigger className="w-auto px-2 space-x-4">
          <CalendarDays className=" dark:text-gray-300 text-gray-700" />
          <SelectValue placeholder="Select Time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Choose Range</SelectLabel>
            <SelectItem value={"24hr"} >Last 24 Hours</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <Separator className="my-2" />
            <SelectItem value="thisWeek">This Week</SelectItem>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <Separator className="my-2" />
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="last30">Last 30 Days</SelectItem>
            <SelectItem value="last90">Last 90 Days</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
            <Separator className="my-2" />
            <SelectItem value="custom">Custom</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-10 rounded-lg p-0">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add Filter</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto space-y-2" align="start">
          <div className="flex items-center space-x-2">
            <Select onValueChange={(value) => setTimeRange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose Property" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose Property</SelectLabel>
                  <SelectItem value="os">OS</SelectItem>
                  <SelectItem value="device">Device</SelectItem>
                  <SelectItem value="page">Page</SelectItem>
                  <SelectItem value="referee">Referee</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => setTimeRange(value)}
              defaultValue="is"
            >
              <SelectTrigger className=" w-max">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className=" px-2">
                  <SelectLabel>Choose Range</SelectLabel>
                  <SelectItem value="is">Is</SelectItem>
                  <SelectItem value="isNot">Is not</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="dContains">Doesn't contain</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setTimeRange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Value</SelectLabel>
                  <SelectItem value="mac">Mac</SelectItem>
                  <SelectItem value="windows">Windows</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className=" " variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Separator className="my-2" />
          <div className=" flex flex-col justify-end items-end space-y-2">
            <Button className=" " variant="secondary">
              Filter
            </Button>
          </div>
        </PopoverContent>
      </Popover> */}
    </div>
  );
};
