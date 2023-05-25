"use client";
import { CalendarDays, Plus } from "lucide-react";
import { Button } from "./ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "./ui/popover";

export const FilterComponent = ({ setTimeRange }: { setTimeRange: React.Dispatch<React.SetStateAction<string>>; }) => {
  return (
    <div className=" flex space-x-2 items-center">
      <Select
        onValueChange={(value) => setTimeRange(value)}
        defaultValue="24hr"
      >
        <SelectTrigger className="w-auto px-2 space-x-4">
          <CalendarDays className=" dark:text-gray-300 text-gray-700" />
          <SelectValue placeholder="Select Time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Choose Range</SelectLabel>
            <SelectItem value="24hr">Last 24 Hours</SelectItem>
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
      <Popover>
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
      </Popover>
    </div>
  );
};
