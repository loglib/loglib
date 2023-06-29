/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client"
import { TimeRange } from "@/react/lib/type"
import { LucideIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function Graph({ data, name, Icon, isLoading, setTimeRange }: { data: { date: string, visits: number }[], name: string, Icon: LucideIcon, isLoading: boolean, setTimeRange:(range: TimeRange)=>void }) {
    const [isMobile, setIsMobile] = useState<boolean>()
    const [filter, setFilter] = useState(false)
    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])
    return (
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
            {
                data.length ?
                    <LineChart data={data} onClick={(e)=>{
                        if(!data) return
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        const startDate = new Date(e.activePayload[0].payload.originalDate)
                        startDate.setHours(startDate.getHours()-1) 
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
                        const endDate = new Date(e.activePayload[0].payload.originalDate)
                        endDate.setHours(endDate.getHours()+1)
                        setTimeRange({
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                            startDate: new Date(e.activePayload[0].payload.originalDate),
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                            endDate: new Date(endDate),
                            stringValue: "custom"
                        })
                        setFilter(true)
                    }}>
                        <XAxis
                            dataKey="date"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Line dataKey="visits" fill="#fff" label="Visitors" />
                        <Tooltip contentStyle={{
                            backgroundColor: "black",
                            borderRadius: "10px"
                        }}
                            itemStyle={{
                                color: "white"
                            }}
                            label="visitors"
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="tw-custom-tooltip dark:tw-bg-black tw-bg-white/80 tw-px-2 tw-border tw-rounded-md tw-border-gray-700 tw-py-2">
                                            <div className=" tw-flex tw-items-center tw-gap-2 dark:tw-text-emphasis tw-text-black" >
                                                <Icon size={16} />
                                                <p className=" tw-font-medium">{`${payload[0].value} ${name}`}</p>
                                            </div>
                                            <p className="tw-text-gray-400 tw-text-sm">{label}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                            
                        />

                    </LineChart> 
                    : 
                    <div className=" tw-flex tw-flex-col tw-justify-center tw-gap-2">
                        <div className="tw-text-2xl tw-font-bold tw-text-center ">
                            {
                                isLoading ? <p className=" tw-text-sm tw-font-medium tw-italic">hmm loading...</p> :
                                    <>
                                        <p>
                                            No Data Just Yet
                                        </p>
                                        <p className=" tw-text-sm tw-font-light">
                                            if you haven't setup tracker refer to the <a href="https://docs.loglib.io" target="_blank" className=" tw-text-blue-700 tw-underline">doc</a> on how to do that.
                                        </p>
                                    </>
                            }
                        </div>
                    </div>
            }

        </ResponsiveContainer>
    )
}

