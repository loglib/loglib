import React from "react"
import { CalendarIcon, Plus } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { cn } from "../../lib/utils"
import { Calendar } from "../ui/calendar"



const Filter = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-10 rounded-lg p-0">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add Filter</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto space-y-2" align="start">
                <div className="flex items-center space-x-2">
                    <Select>
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
                                <SelectItem value="dContains">
                                    Doesn't contain
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
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
        </Popover>
    )
}

export function CalendarDateRangePicker({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2023, 0, 20),
        to: addDays(new Date(2023, 0, 20), 20),
    })
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        size="sm"
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
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
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}



export default Filter