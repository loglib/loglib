import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"



export const SpeedChart = ({ data, Icon, name }: { data: { name: string, uv: string }[], Icon: LucideIcon; name: string }) => {
    const [isMobile, setIsMobile] = useState<boolean>();
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);
    return (
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 400} className=" rounded-lg">
            {/* <AreaChart
                width={500}
                height={200}
                data={data}
                syncId="anyId"
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            > */}


            <BarChart width={150} height={40} data={data}>
                <CartesianGrid strokeDasharray="3 3" className=" opacity-20" />
                <Bar dataKey="uv" fill="#8884d8" />
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    interval="preserveStartEnd"
                    fontSize={12}
                    tickLine={false}
                    width={30}
                    axisLine={false}
                    tickMargin={0}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "black",
                        borderRadius: "10px",
                        color: "black",
                    }}
                    label="visitors"
                    cursor={false}
                    content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="custom-tooltip dark:bg-black bg-white/10 px-2 border rounded-md border-gray-700 py-2">
                                    <div className=" flex items-center gap-2 dark:text-emphasis text-black">
                                        <Icon size={16} />
                                        <p className=" font-medium">{`${payload[0]?.value} ${name}`}</p>
                                    </div>
                                    <p className="text-gray-400 text-sm">{label}</p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
            </BarChart>

            {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" /> */}
            {/* </AreaChart> */}
        </ResponsiveContainer>
    )
}