import { Card, CardContent } from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import COUNTRIES from "@/lib/constants";
import { GetVitalsResponse } from "@loglib/types";
import { Asterisk, Link2Icon, MapPin, MonitorSmartphone, PanelTop } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { InsightTable } from "../insight/table";
import { stats } from "./stats";

export type InsightTablesProps = {
    data?: GetVitalsResponse["data"];
    isLoading: boolean;
    websiteUrl?: string;
    activeStat: typeof stats[0];
};

export const SpeedTables = ({ data, websiteUrl, isLoading, activeStat }: InsightTablesProps) => {
    return (
        <Card className=" md:col-span-3 col-span-7 bg-gradient-to-tr from-stone-950 to-stone-900/50 ">
            <Tabs defaultValue="pages">
                <TabsList className="md:w-full space-x-2 md:justify-start grid grid-cols-4">
                    <TabsTrigger value="pages" className=" space-x-2 ">
                        <PanelTop size={16} />
                        <p>Pages</p>
                    </TabsTrigger>
                    <TabsTrigger value="locations" className=" space-x-2">
                        <MapPin size={16} />
                        <p>Locations</p>
                    </TabsTrigger>
                    <TabsTrigger value="browser" className=" space-x-2">
                        <Asterisk size={16} />
                        <p>Browser</p>
                    </TabsTrigger>
                    <TabsTrigger value="device" className=" space-x-2">
                        <MonitorSmartphone size={16} />
                        <p>Devices</p>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="pages">
                    <div className=" px-6 h-full p-0">
                        <InsightTable
                            data={data?.pages}
                            key="page"
                            meta={{
                                key: "page",
                                nameLabel: "Page",
                                valueLabel: "Visits",
                            }}
                            // searchFn={(t) => searchFn("page", t)}
                            hideSearchBar={data && data?.pages.length < 10}
                            searchPlaceholder="Search Page..."
                            Row={(d) => (
                                <TableRow>
                                    <TableCell className=" flex items-center gap-1 cursor-pointer">
                                        <a
                                            href={
                                                websiteUrl
                                                    ? `${
                                                          websiteUrl.endsWith("/")
                                                              ? websiteUrl
                                                              : `${websiteUrl}/`
                                                      }${d.page}`
                                                    : d.page
                                            }
                                            className=" hover:underline"
                                        >
                                            {d.page.substring(0, 45)}
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {activeStat.formatter(d.data[activeStat.short])}
                                    </TableCell>
                                </TableRow>
                            )}
                            tip={`Your pages and their ${activeStat.short} scores in the given time:)`}
                            isLoading={isLoading}
                        />
                    </div>
                </TabsContent>
                <TabsContent value="locations">
                    <div className=" px-6 h-full p-0">
                        <Tabs className=" w-full" defaultValue="country">
                            <TabsList className=" border-gray-400 ml-auto">
                                <TabsTrigger value="country">Country</TabsTrigger>
                                <TabsTrigger value="city">City</TabsTrigger>
                            </TabsList>
                            <TabsContent value="country">
                                <InsightTable
                                    data={data?.locations.byCountry.map((ctr) => ({
                                        location: COUNTRIES[ctr.location] ?? ctr.location,
                                        ogLocation: ctr.location,
                                        values: ctr.data,
                                    }))}
                                    searchPlaceholder="Search Country..."
                                    meta={{
                                        key: "location",
                                        nameLabel: "Country",
                                        valueLabel: "Visits",
                                    }}
                                    hideSearchBar={data && data?.locations.byCountry.length < 10}
                                    isLoading={isLoading}
                                    tip="Your visitors country and how many times they are visited :)"
                                    Row={(location) => (
                                        <TableRow>
                                            <TableCell className=" flex items-center gap-1 cursor-pointer">
                                                {location.location === "unknown" ? (
                                                    <>
                                                        <Link2Icon />
                                                        Unknown
                                                    </>
                                                ) : (
                                                    <>
                                                        <ReactCountryFlag
                                                            countryCode={location.ogLocation}
                                                            svg
                                                            style={{
                                                                width: "1em",
                                                                height: "1em",
                                                            }}
                                                        />
                                                        {location.location}
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {activeStat.formatter(
                                                    location.values[activeStat.short],
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                />
                            </TabsContent>
                            <TabsContent value="city">
                                <InsightTable
                                    data={data?.locations.byCity}
                                    meta={{
                                        key: "location",
                                        nameLabel: "City",
                                        valueLabel: "Visits",
                                    }}
                                    searchPlaceholder="Search City..."
                                    hideSearchBar={data && data?.locations.byCity.length < 10}
                                    isLoading={isLoading}
                                    tip="Your visitors city and how many times they are visited :)"
                                    Row={(location) => (
                                        <TableRow>
                                            <TableCell className=" flex items-center gap-1 cursor-pointer">
                                                {location.location === "unknown" ||
                                                !location.location ? (
                                                    <>
                                                        <Link2Icon />
                                                        Unknown
                                                    </>
                                                ) : (
                                                    <>
                                                        <ReactCountryFlag
                                                            countryCode={location.country}
                                                            svg
                                                            style={{
                                                                width: "1em",
                                                                height: "1em",
                                                            }}
                                                        />
                                                        {location.location}
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {activeStat.formatter(
                                                    location.data[activeStat.short],
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </TabsContent>

                {/* Browser */}
                <TabsContent value="browser">
                    <CardContent>
                        <Tabs defaultValue="os">
                            <TabsList>
                                <TabsTrigger value="os">OS</TabsTrigger>
                                <TabsTrigger value="browser">Browser</TabsTrigger>
                            </TabsList>
                            <TabsContent value="os">
                                <InsightTable
                                    data={data?.os}
                                    isLoading={isLoading}
                                    searchPlaceholder="Search OS..."
                                    meta={{
                                        key: "os",
                                        nameLabel: "OS",
                                        valueLabel: "visits",
                                    }}
                                    tip="Your OS and how many time your website is visited from them :)"
                                    hideSearchBar={data && data?.os.length < 10}
                                    Row={(d) => (
                                        <TableRow>
                                            <TableCell className=" flex items-center gap-1 cursor-pointer">
                                                {d.os}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {activeStat.formatter(d.data[activeStat.short])}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                />
                            </TabsContent>
                            <TabsContent value="browser">
                                <InsightTable
                                    data={data?.browsers}
                                    isLoading={isLoading}
                                    meta={{
                                        key: "browser",
                                        nameLabel: "OS",
                                        valueLabel: "visits",
                                    }}
                                    searchPlaceholder="search Browser..."
                                    tip="Your browsers and how many time your website is visited from them :)"
                                    hideSearchBar={data && data?.browsers.length < 10}
                                    Row={(d) => (
                                        <TableRow>
                                            <TableCell className=" flex items-center gap-1 cursor-pointer">
                                                {d.browser}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {activeStat.formatter(d.data[activeStat.short])}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </TabsContent>
                {/* Device*/}
                <TabsContent value="device" className=" bg-stone-950/30">
                    <CardContent className=" bg-stone-950/30">
                        <InsightTable
                            data={data?.devices}
                            isLoading={isLoading}
                            searchPlaceholder="Search device..."
                            meta={{
                                key: "device",
                                nameLabel: "device",
                                valueLabel: "score",
                            }}
                            tip="Your devices and how many time your website is visited from them :)"
                            hideSearchBar={data && data?.devices.length < 10}
                            Row={(d) => (
                                <TableRow>
                                    <TableCell className=" flex items-center gap-1 cursor-pointer">
                                        {d.device}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {activeStat.formatter(d.data[activeStat.short])}
                                    </TableCell>
                                </TableRow>
                            )}
                        />
                    </CardContent>
                </TabsContent>
            </Tabs>
        </Card>
    );
};
