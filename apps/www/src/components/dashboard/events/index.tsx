"use client";
import useSWR from "swr";
import { columns } from "./column";
import { renderSubComponent } from "./detail-modal";
import { DataTable } from "./table-data";
import { EventsWithData } from "@loglib/types";
import { env } from "env.mjs";
import { fetcher } from "@/lib/utils";

const Events = ({
    startDate,
    endDate,
    websiteId
}: {
    startDate: Date;
    endDate: Date
    websiteId: string
}) => {
    console.log( websiteId, "event")
    const url = env.NEXT_PUBLIC_API_URL;
    const {data, isLoading} = useSWR<EventsWithData>(`${url}/events?websiteId=${websiteId}&startDate=${startDate}&endDate=${endDate}`, fetcher)
    if(!isLoading){
        console.log(data, "event ata")
    }
    return (
        <div className=" no-scrollbar">
            <DataTable
                columns={columns}
                data={data ?? []}
                renderSubComponent={renderSubComponent}
                isLoading={isLoading}
            />
        </div>
    );
};
export default Events;
