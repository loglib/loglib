"use client"
import { LucideIcon } from "lucide-react"
import React, { Fragment, useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function Graph({ data, name, Icon }: { data: { date: string, visits: number }[], name: string, Icon: LucideIcon }) {
    const [isMobile, setIsMobile] = useState<boolean>()
    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])
    return (
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
            <LineChart data={data}>
                {
                    data.length ?
                        <Fragment>
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
                                            <div className="custom-tooltip dark:bg-black bg-white/80 px-2 border rounded-md border-gray-700 py-2">
                                                <div className=" flex items-center gap-2 dark:text-emphasis text-black" >
                                                    <Icon size={16} />
                                                    <p className=" font-medium">{`${payload[0].value} ${name}`}</p>
                                                </div>
                                                <p className="text-gray-400 text-sm">{label}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />

                        </Fragment> : <div className=" flex flex-col justify-center gap-2">
                            <div className="text-2xl font-bold">
                                No Data
                            </div>
                        </div>
                }
            </LineChart>
        </ResponsiveContainer>
    )
}

