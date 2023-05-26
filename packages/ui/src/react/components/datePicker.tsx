"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"

export function CalendarDateRangePicker({
    date,
    setDate,
    className
}: { date: DateRange, setDate: (state: { startDate: Date, endDate: Date, stringValue: string }) => void, className?: string }) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        size="sm"
                        className={cn(
                            "w-max justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
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
                <PopoverContent className="w-auto" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(selected) => {
                            if (selected && selected.from && selected.to) {
                                setDate({ startDate: selected.from, endDate: selected.to, stringValue: "custom" })
                            }
                        }
                        }
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}