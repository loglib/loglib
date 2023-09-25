import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, fetcher } from "@/lib/utils";
import { GetVitalsResponse } from "@loglib/types";
import { Website } from "@loglib/types/models";
import { ExternalLink, GaugeCircle } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import { Filter, TimeRange } from "../type";
import { SpeedChart } from "./chart";
import { SpeedTables } from "./table";

export const SpeedInsight = ({
    website,
    timeRange,
    setting,
    filters,
    token,
    url,
}: {
    website: Website;
    timeRange: TimeRange;
    setting: {
        graph: string | null;
        timezone: string;
    };
    filters: Filter[];
    token: string;
    url: string;
}) => {
    const { data, isLoading } = useSWR<GetVitalsResponse>(
        `${url}/vitals?websiteId=${
            website.id
        }&startDate=${timeRange.startDate.toUTCString()}&endDate=${timeRange.endDate.toUTCString()}&timeZone=${
            setting.timezone
        }&token=${token}`,
        fetcher,
    );
    const [activeStat, setActiveStat] = useState("LCP");
    console.log(data);
    return (
        <div className=" grid grid-cols-5 gap-4 ">
            <div className=" col-span-4 flex flex-col justify-between ">
                <div className=" flex items-center gap-4">
                    <Card className=" flex-grow relative bg-gradient-to-tr from-stone-900 to-stone-950 shadow-sm shadow-brand-900/30">
                        <span className="absolute top-0 h-px blur-sm left-1/2 w-1/2 bg-gradient-circle from-brand-500/90 rounded-md to-brand-800/30"></span>
                        <CardHeader className=" flex-row justify-between items-center">
                            <CardTitle className=" text-sm">Largest Contentful Paint</CardTitle>
                            <div className=" border px-3 rounded-md py-px bg-brand-900/40">
                                <span className="text-xs">LCP</span>
                            </div>
                        </CardHeader>
                        <CardContent className=" flex items-center justify-between">
                            <h4 className=" text-xl font-bold">{data?.lcp?.toFixed(2)} sec</h4>
                            <span
                                className="text-xs text-white font-medium"
                                style={{
                                    color: data?.lcp
                                        ? data?.lcp <= 100
                                            ? "green"
                                            : data?.lcp <= 300
                                            ? "yellow"
                                            : "red"
                                        : "inherit",
                                }}
                            >
                                {data?.lcp
                                    ? data?.lcp <= 100
                                        ? "GOOD"
                                        : data?.lcp <= 300
                                        ? "NEEDS IMPROVEMENT"
                                        : "POOR"
                                    : "loading..."}
                            </span>
                        </CardContent>
                    </Card>
                    <Card className={cn(" flex-grow", "opacity-50")}>
                        <CardHeader className={cn(" flex-row justify-between items-center")}>
                            <CardTitle className=" text-sm">First Contentful Paint</CardTitle>
                            <div className=" border px-3 rounded-md py-px bg-brand-900/40">
                                <span className="text-xs">FCP</span>
                            </div>
                        </CardHeader>
                        <CardContent className=" flex items-center justify-between">
                            <h4 className=" text-xl font-bold">{data?.inp?.toFixed(2)} sec</h4>
                            <span
                                className="text-xs text-white font-medium"
                                style={{
                                    color: data?.fcp
                                        ? data?.fcp <= 100
                                            ? "green"
                                            : data?.fcp <= 300
                                            ? "yellow"
                                            : "red"
                                        : "inherit",
                                }}
                            >
                                {data?.fcp
                                    ? data?.fcp <= 100
                                        ? "GOOD"
                                        : data?.fcp <= 300
                                        ? "NEEDS IMPROVEMENT"
                                        : "POOR"
                                    : "loading..."}
                            </span>
                        </CardContent>
                    </Card>
                    <Card className={cn(" flex-grow", "opacity-50")}>
                        <CardHeader className=" flex-row justify-between items-center">
                            <CardTitle className=" text-sm">Cumulative Layout Shift</CardTitle>
                            <div className=" border px-3 rounded-md py-px bg-brand-900/40">
                                <span className="text-xs">CLS</span>
                            </div>
                        </CardHeader>
                        <CardContent className=" flex items-center justify-between">
                            <h4 className=" text-xl font-bold">{data?.cls?.toFixed(2)} sec</h4>
                            <span
                                className="text-xs text-white font-medium"
                                style={{
                                    color: data?.cls
                                        ? data?.cls <= 100
                                            ? "green"
                                            : data?.cls <= 300
                                            ? "yellow"
                                            : "red"
                                        : "inherit",
                                }}
                            >
                                {data?.cls
                                    ? data?.cls <= 100
                                        ? "GOOD"
                                        : data?.cls <= 300
                                        ? "NEEDS IMPROVEMENT"
                                        : "POOR"
                                    : "loading..."}
                            </span>
                        </CardContent>
                    </Card>
                    <Card className={cn(" flex-grow", "opacity-50")}>
                        <CardHeader className=" flex-row justify-between items-center">
                            <CardTitle className=" text-sm">First Interaction Delay</CardTitle>
                            <div className=" border px-3 rounded-md py-px bg-brand-900/40">
                                <span className="text-xs">FID</span>
                            </div>
                        </CardHeader>
                        <CardContent className=" flex items-center justify-between">
                            <h4 className=" text-xl font-bold">{data?.fid?.toFixed(2)} ms</h4>
                            <span
                                className="text-xs text-white font-medium"
                                style={{
                                    color: data?.fid
                                        ? data?.fid <= 100
                                            ? "green"
                                            : data?.fid <= 300
                                            ? "yellow"
                                            : "red"
                                        : "inherit",
                                }}
                            >
                                {data?.fid
                                    ? data?.fid <= 100
                                        ? "GOOD"
                                        : data?.fid <= 300
                                        ? "NEEDS IMPROVEMENT"
                                        : "POOR"
                                    : "loading..."}
                            </span>
                        </CardContent>
                    </Card>
                </div>
                <div className=" py-4 flex justify-between gap-2">
                    <div className=" min-w-1/2 flex-grow">
                        <SpeedChart
                            data={[
                                { name: "2AM", uv: "10" },
                                { name: "4AM", uv: "20" },
                                { name: "5AM", uv: "40" },
                            ]}
                            Icon={GaugeCircle}
                            name="Sec"
                        />
                    </div>
                    <SpeedTables data={data?.data} activeStat={activeStat} />
                </div>
            </div>
            <div className=" border p-4 bg-stone-800 h-min rounded-2xl space-y-2">
                <div>
                    <p className=" font-bold">Largest Contentful Paint (LCP)</p>
                </div>
                <p>
                    The Largest Contentful Paint (LCP) metric reports the render time of the largest
                    image or text block visible within the viewport, relative to when the page first
                    started loading.
                </p>
                <p>
                    To provide a good user experience, sites should strive to have Largest
                    Contentful Paint of 2.5 seconds or less. To ensure you're hitting this target
                    for most of your users, a good threshold to measure is the 75th percentile of
                    page loads, segmented across mobile and desktop devices.
                </p>
                <Button size="sm" className="gap-2 mt-4 text-brand-400" variant="outline">
                    <ExternalLink size={14} />
                    <span>Learn More</span>
                </Button>
            </div>
        </div>
    );
};
