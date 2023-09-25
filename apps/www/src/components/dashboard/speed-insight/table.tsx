import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetVitalsResponse } from "@loglib/types";
import { Asterisk, MapPin, MonitorSmartphone, PanelTop } from "lucide-react";

export const SpeedTables = ({
    data,
    activeStat,
}: { data?: GetVitalsResponse["data"]; activeStat: string }) => {
    return (
        <Tabs>
            <TabsList className="md:w-full space-x-2 md:justify-start grid grid-cols-4">
                <TabsTrigger value="pages" className=" space-x-2 ">
                    <PanelTop size={16} />
                    <p>Pages</p>
                </TabsTrigger>
                <TabsTrigger value="locations" className=" space-x-2">
                    <MapPin size={16} />
                    <p>Locations</p>
                </TabsTrigger>
                <TabsTrigger value="ref" className=" space-x-2">
                    <Asterisk size={16} />
                    <p>Referees</p>
                </TabsTrigger>
                <TabsTrigger value="device" className=" space-x-2">
                    <MonitorSmartphone size={16} />
                    <p>Devices</p>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="pages">
                <ScrollArea className=" md:h-96 xl:h-[450px] h-80">
                    <Table>
                        <TableRow>
                            <TableHead>page</TableHead>
                            <TableHead>score</TableHead>
                        </TableRow>
                        {data?.pages.map((page) => (
                            <TableRow key={page.page}>
                                <TableCell>{page.page}</TableCell>
                                <TableCell>
                                    {(page.data[activeStat] / 10000).toFixed(2)} sec
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </ScrollArea>
            </TabsContent>
        </Tabs>
    );
};
