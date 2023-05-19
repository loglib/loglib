"use client"
import "../css/index.css"
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export interface DashboardConfig {
    color?: string
    className?: string
    api?: string
}

export function getDashboard() {
    return (
        function App() {
            return (
                <div>
                    <div className=' h-screen bg-default flex justify-center items-center'>
                        {RenderLineChart}
                    </div>
                </div>
            )
        }
    )
}


const data = [{ date: '01/01', views: 100 }, { date: '01/02', views: 50 }, { date: '01/03', views: 100 }, { date: '01/04', views: 400 }];

const RenderLineChart = (
    <LineChart width={600} height={300} data={data} margin={{ top: 40, right: 40, bottom: 10, left: 0 }} className=' border border-r-success   rounded-2xl font-neu font-light'>
        <Line type="monotone" dataKey="views" stroke="#F9A858" strokeWidth={3} />
        <CartesianGrid strokeDasharray="5 5" className="stroke-white/10 transition-all duration-200" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip wrapperClassName=" stroke-blue-400" labelClassName=" bg-white" />
    </LineChart>
);