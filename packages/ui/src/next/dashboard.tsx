/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react"
import Insights from "./tabs/insights"
import Events from './tabs/events'
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/select";
import { CalendarDays } from "lucide-react";
import { Separator } from "./components/ui/separator";
import Filter, { CalendarDateRangePicker } from "./components/cards/filter";
import { fetcher } from "./lib/utils";
import useSWR from 'swr'
import { APIResponse } from "./type";
import { GetEventsResponse, GetInsightResponse } from "@loglib/core/types"
const Dashboard = () => {
    const getTheme = (): "dark" | "light" => {
        if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
            return localStorage.getItem("theme") as "light" | "dark";
        }
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    };

    const changeTheme = () => {
        const theme = getTheme();
        if (theme === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const [timeRange, setTimeRange] = React.useState("today");

    const { data, isLoading } = useSWR<GetInsightResponse>(`http://localhost:3000/api/loglib?startDate=2023-05-18T09:59:20.418Z&endDate=2023-05-23T09:59:20.418Z&path=/all`, fetcher);

    //set theme on mount
    React.useEffect(() => {
        const theme = getTheme();
        document.documentElement.classList.add(theme);
    }, []);





    return (
        <>
            <LayoutGroup>
                <div className="bg-white min-h-screen w-full  dark:bg-black transition-all duration-700 dark:text-white/90">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 space-y-2">
                                <svg
                                    width="59"
                                    height="55"
                                    viewBox="0 0 59 55"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g filter="url(#filter0_d_245_858)">
                                        <path
                                            d="M47.7214 23.6888C47.2594 23.7686 47.0733 24.3944 47.4471 24.6775C47.6666 24.8437 47.7101 25.1562 47.5443 25.3761L36.977 39.3936C36.1483 40.4928 34.4828 40.4457 33.7175 39.3015L26.8179 28.9852C26.0299 27.8069 24.3001 27.7997 23.5023 28.9715L17.4237 37.8991C16.7438 38.8976 15.3407 39.0702 14.4392 38.2661L10.8367 35.053C10.2236 34.5062 10.1629 33.5685 10.7003 32.9472C11.2486 32.3133 12.2094 32.2501 12.836 32.8067L13.8427 33.7008C14.7442 34.5015 16.1439 34.3284 16.8232 33.3322L23.5022 23.5375C24.3003 22.3669 26.029 22.3745 26.8168 23.5521L33.8451 34.0567C34.6106 35.2009 36.2763 35.2476 37.1047 34.148L42.7182 26.6971C43.6648 25.4407 42.8435 23.5466 41.4116 22.895C41.2014 22.7994 40.994 22.6967 40.7899 22.5872C39.5182 21.9046 38.3987 20.9688 37.5 19.8369C36.6013 18.705 35.9423 17.401 35.5635 16.0047C35.3863 15.3517 35.2721 14.685 35.2215 14.0137C35.1301 12.8011 34.2097 11.7163 32.9936 11.7163H8.84849C8.09302 11.7163 7.3685 12.0174 6.8343 12.5534C6.30011 13.0895 6 13.8164 6 14.5745V46.0144C6 46.7724 6.30011 47.4994 6.8343 48.0354C7.3685 48.5715 8.09302 48.8726 8.84849 48.8726H48.7273C49.4827 48.8726 50.2073 48.5715 50.7415 48.0354C51.2757 47.4994 51.5758 46.7724 51.5758 46.0144V24.3914C51.5758 23.4428 50.5099 22.8434 49.6212 23.1751C49.0057 23.4048 48.3697 23.5769 47.7214 23.6888Z"
                                            className="fill-[#2E2F33] dark:fill-white transition-all duration-700"
                                        ></path>
                                        <path
                                            d="M45.8788 20.2909C49.8117 20.2909 53 17.0918 53 13.1454C53 9.19912 49.8117 6 45.8788 6C41.9458 6 38.7576 9.19912 38.7576 13.1454C38.7576 17.0918 41.9458 20.2909 45.8788 20.2909Z"
                                            fill="#F9A858"
                                        ></path>
                                    </g>
                                    <defs>
                                        <filter
                                            id="filter0_d_245_858"
                                            x="0"
                                            y="0"
                                            width="59"
                                            height="54.8726"
                                            filterUnits="userSpaceOnUse"
                                            colorInterpolationFilters="sRGB"
                                        >
                                            <feFlood
                                                floodOpacity="0"
                                                result="BackgroundImageFix"
                                            ></feFlood>
                                            <feColorMatrix
                                                in="SourceAlpha"
                                                type="matrix"
                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                result="hardAlpha"
                                            ></feColorMatrix>
                                            <feOffset></feOffset>
                                            <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                                            <feComposite in2="hardAlpha" operator="out"></feComposite>
                                            <feColorMatrix
                                                type="matrix"
                                                values="0 0 0 0 0.976471 0 0 0 0 0.658823 0 0 0 0 0.345098 0 0 0 0.2 0"
                                            ></feColorMatrix>
                                            <feBlend
                                                mode="normal"
                                                in2="BackgroundImageFix"
                                                result="effect1_dropShadow_245_858"
                                            ></feBlend>
                                            <feBlend
                                                mode="normal"
                                                in="SourceGraphic"
                                                in2="effect1_dropShadow_245_858"
                                                result="shape"
                                            ></feBlend>
                                        </filter>
                                    </defs>
                                </svg>
                                <h2 className="text-4xl font-bold tracking-tight">LOGLIB</h2>
                            </div>
                            <div className="lg:flex flex-col justify-center items-center col-span-1 self-center select-none relative">
                                <div
                                    className="border p-4 px-5 rounded-md cursor-pointer border-[#996A6A] hover:bg-gray-100 dark:hover:bg-gray-900 dark:bg-dark shadow-black/70 transition-al duration-300 ease-in-out"
                                    onClick={changeTheme}
                                >
                                    <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 53 53"
                                        className="w-5 h-5"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M26.5 46.375C24.0708 46.375 21.9913 45.5101 20.2615 43.7802C18.5316 42.0504 17.6667 39.9708 17.6667 37.5417H11.0417C9.82709 37.5417 8.78696 37.1088 7.9213 36.2432C7.05563 35.3775 6.62353 34.3381 6.625 33.125C6.625 27.9722 8.31806 23.5276 11.7042 19.7911C15.0903 16.0546 19.2861 13.911 24.2917 13.3604V8.83334C24.2917 8.20765 24.5037 7.6828 24.9277 7.2588C25.3517 6.8348 25.8758 6.62354 26.5 6.62501C27.1257 6.62501 27.6505 6.83701 28.0745 7.26101C28.4985 7.68501 28.7098 8.20912 28.7083 8.83334V13.3604C33.7139 13.9125 37.9097 16.0568 41.2958 19.7933C44.6819 23.5298 46.375 27.9737 46.375 33.125C46.375 34.3396 45.9422 35.3797 45.0765 36.2454C44.2108 37.111 43.1714 37.5431 41.9583 37.5417H35.3333C35.3333 39.9708 34.4684 42.0504 32.7385 43.7802C31.0087 45.5101 28.9292 46.375 26.5 46.375ZM11.0417 33.125H41.9583C41.9583 28.8556 40.4493 25.2118 37.4313 22.1938C34.4132 19.1757 30.7694 17.6667 26.5 17.6667C22.2306 17.6667 18.5868 19.1757 15.5688 22.1938C12.5507 25.2118 11.0417 28.8556 11.0417 33.125Z"
                                            fill="#161010"
                                            className="dark:fill-white transition-all duration-700"
                                        ></path>
                                    </svg>
                                </div>
                            </div>

                        </div>
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
                            <Filter />
                        </div>
                        <AnimatePresence>
                            {timeRange === "custom" && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        type: "keyframes",
                                        duration: 0.5,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <CalendarDateRangePicker />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <Tabs
                            defaultValue="insights"
                            className="space-y-4"
                            orientation="vertical"
                        >
                            <TabsList>
                                <TabsTrigger
                                    value="insights"
                                    className="data-[state=active]:text-emphasis"
                                >
                                    Insights
                                </TabsTrigger>
                                <TabsTrigger
                                    value="events"
                                    className="data-[state=active]:text-emphasis"
                                >
                                    Events
                                </TabsTrigger>
                            </TabsList>
                            <motion.div layout>
                                <Insights data={data} isLoading={isLoading} />
                                <Events />
                            </motion.div>
                        </Tabs>
                    </div>
                </div>
            </LayoutGroup>
        </>
    )
}

export default Dashboard