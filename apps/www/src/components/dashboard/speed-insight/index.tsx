import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import useSWR from "swr";
import { Website } from "@loglib/types/models";
import { Filter, TimeRange } from "../type";
import { fetcher } from "@/lib/utils";



export const SpeedInsight = ({ website, timeRange, setting, filters, token, url }: {
    website: Website,
    timeRange: TimeRange,
    setting: {
        graph: string | null,
        timezone: string
    },
    filters: Filter[],
    token: string,
    url: string
}) => {
    const { data, isLoading } = useSWR(
        `${url}/vitals?websiteId=${website.id
        }&startDate=${timeRange.startDate.toUTCString()}&endDate=${timeRange.endDate.toUTCString()}&timeZone=${setting.timezone}&token=${token}`,
        fetcher,
    );
    return (
        <div className=" grid grid-cols-5 gap-4 ">
            <div className=" col-span-4 flex flex-col justify-between ">
                <div className=" flex items-center gap-4">
                    <Card className=" flex-grow relative bg-gradient-to-tr from-stone-900 to-stone-950 shadow-lg shadow-brand-900/30">
                        <span className="absolute top-0 h-px blur-sm left-1/2 w-1/2 bg-gradient-circle from-brand-500/90 rounded-md to-brand-800/30"></span>
                        <CardHeader className=" flex-row justify-between items-center">
                            <CardTitle className=" text-base">
                                Largest Contentful Paint
                            </CardTitle>
                            <div className=" border px-3 rounded-md py-px bg-brand-900/40">
                                <span className="text-xs">
                                    LCP
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h4 className=" text-base font-bold">
                                2.65 sec
                            </h4>
                        </CardContent>
                    </Card>
                    <Card className=" flex-grow">
                        <CardHeader className=" flex-row justify-between items-center">
                            <CardTitle className=" text-base">
                                First Contentful Paint
                            </CardTitle>
                            <div className=" border px-3 rounded-md py-px bg-brand-900/40">
                                <span className="text-xs">
                                    FCP
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h4 className=" text-base font-bold">
                                2.65 sec
                            </h4>
                        </CardContent>
                    </Card>
                    <Card className=" flex-grow">
                        <CardHeader className=" flex-row justify-between items-center">
                            <CardTitle className=" text-base">
                                Cumulative Layout Shift
                            </CardTitle>
                            <div className=" border px-3 rounded-md py-px bg-brand-900/40">
                                <span className="text-xs">
                                    CLS
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h4 className=" text-base font-bold">
                                2.65 sec
                            </h4>
                        </CardContent>
                    </Card>
                    <Card className=" flex-grow">
                        <CardHeader className=" flex-row justify-between items-center">
                            <CardTitle className=" text-base">
                                Cumulative Layout Shift
                            </CardTitle>
                            <div className=" border px-3 rounded-md py-px bg-brand-900/40">
                                <span className="text-xs">
                                    CLS
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h4 className=" text-base font-bold">
                                2.65 sec
                            </h4>
                        </CardContent>
                    </Card>
                </div>
                <div className=" flex">
                    <div className=" w-1/2">
                        {/* <Graph data={[{ date: "1PM", visits: 1 }, { date: "2PM", visits: 10 }]} name="" Icon={ } isLoading={ } setTimeRange={ } bar={ } /> */}
                    </div>P
                </div>
            </div>
            <div className=" border p-4 bg-stone-800 h-min rounded-2xl space-y-2">
                <div>
                    <p className=" font-bold">
                        Largest Contentful Paint (LCP)
                    </p>
                </div>
                <p>
                    The Largest Contentful Paint (LCP) metric reports the render time of the largest image or text block visible within the viewport, relative to when the page first started loading.
                </p>
                <p>
                    To provide a good user experience, sites should strive to have Largest Contentful Paint of 2.5 seconds or less. To ensure you're hitting this target for most of your users, a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices.
                </p>
                <Button size="sm" className="gap-2 mt-4 text-brand-400" variant="outline">
                    <ExternalLink size={14} />
                    <span>
                        Learn More
                    </span>
                </Button>
            </div>
        </div>
    )
}