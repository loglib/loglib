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
} from "./select";
import { Separator } from "./separator";
import { getLastNinetyDays, getLastSevenDays, getLastThirtyDays, getThisMonth, getThisWeek, getThisYear, getToday, getTomorrow, getYesterday } from "../../lib/timeHelper";
import { format, subMonths } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

export function CalendarDateRangePicker({
  date,
  setDate,
  className
}: { date: DateRange, setDate: (state: { startDate: Date, endDate: Date, stringValue: string }) => void, className?: string }) {
  const lastMonth = subMonths(new Date(), 1)

  return (
    <div className={cn("tw-grid tw-gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            size="sm"
            className={cn(
              "tw-w-max tw-justify-start tw-text-left tw-font-normal",
              !date && "tw-text-muted-foreground"
            )}
          >
            <CalendarIcon className="tw-mr-2 tw-h-4 tw-w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="tw-w-auto" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={lastMonth}
            selected={date}
            onSelect={(selected) => {
              if (selected && selected.from && selected.to) {
                setDate({ startDate: selected.from, endDate: selected.to, stringValue: "custom" })
              }
            }
            }
            numberOfMonths={2}
            toMonth={new Date()}
            toDate={new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export const DatePicker = ({ setTimeRange, setCustomTime, timeRange, customTime }: { setTimeRange: React.Dispatch<React.SetStateAction<{ startDate: Date, endDate: Date, stringValue?: string }>>; timeRange: { startDate: Date, endDate: Date, stringValue?: string }; setCustomTime: (state: boolean) => void, customTime: boolean }) => {
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
    <div className=" tw-flex tw-space-x-2 tw-items-center">
      <Select
        onValueChange={(value) => setTime(value)}
        value={customTime ? "custom" : timeRange.stringValue}
        defaultValue="24hr"
        
      >
        <SelectTrigger className="tw-w-auto tw-px-2 tw-space-x-4 dark:tw-text-white/75">
          <CalendarDays className=" dark:tw-text-gray-300 tw-text-gray-700" />
          <SelectValue placeholder="Select Time" />
        </SelectTrigger>
 
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Choose Range</SelectLabel>
            <SelectItem value={"24hr"} >Last 24 Hours</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <Separator className="tw-my-2" />
            <SelectItem value="thisWeek">This Week</SelectItem>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <Separator className="tw-my-2" />
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="last30">Last 30 Days</SelectItem>
            <SelectItem value="last90">Last 90 Days</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
            <Separator className="tw-my-2" />
            <SelectItem value="custom">Custom</SelectItem>
          </SelectGroup>
        </SelectContent>        


      </Select>
    </div>
  );
};



