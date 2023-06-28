"use client"
import { LucideIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function Graph({ data, name, Icon, isLoading }: { data: { date: string, visits: number }[], name: string, Icon: LucideIcon, isLoading: boolean }) {
    const [isMobile, setIsMobile] = useState<boolean>()
    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])
    return (
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
            {
                data.length ?
                    <LineChart data={data}>
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

                    </LineChart> : <div className=" tw-flex tw-flex-col tw-justify-center tw-gap-2">
                        <div className="tw-text-2xl tw-font-bold tw-text-center ">
                            {
                                isLoading ? <p className=" tw-text-sm tw-font-medium tw-italic">hmm loading...</p> :
                                    <>
                                        <p>
                                            No Data Just Yet
                                        </p>
                                        <p className=" tw-text-sm tw-font-light">
                                            if you haven't setup tracker refer to the <a href="https://loglib.io/docs" target="_blank" className=" tw-text-blue-700 tw-underline">doc</a> on how to do that.
                                        </p>
                                    </>
                            }
                        </div>
                    </div>
            }

        </ResponsiveContainer>
    )
}

