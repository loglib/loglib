"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3 dark:text-stone-100 dark", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                    "text-stone-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-stone-400",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-stone-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected])]:bg-stone-800",
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                ),
                day_selected:
                    "bg-stone-900 text-stone-50 hover:bg-stone-900 hover:text-stone-50 focus:bg-stone-900 focus:text-stone-50 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50 dark:hover:text-stone-900 dark:focus:bg-stone-50 dark:focus:text-stone-900",
                day_today: "bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-50",
                day_outside: "text-stone-500  dark:text-stone-400",
                day_disabled: "text-stone-500 opacity-50 dark:text-stone-400",
                day_range_middle:
                    "aria-selected:bg-stone-100 aria-selected:text-stone-900 dark:aria-selected:bg-stone-800 dark:aria-selected:text-stone-50",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
