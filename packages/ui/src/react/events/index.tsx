"use client";

import React from "react"
import { EventsWithData } from "@loglib/core"
import { DataTable } from "./tableData"
import { columns } from "./column"
import { renderSubComponent } from "./detailModal"



const Events = ({ events, isLoading }: { events: EventsWithData, isLoading: boolean }) => {
    const sortedEvents = events.sort((a, b) => {
        const aDate = new Date(a.createdAt)
        const bDate = new Date(b.createdAt)
        return bDate.getTime() - aDate.getTime()
    })
    return (
        <div className=" no-scrollbar">
            <DataTable columns={columns} data={sortedEvents} renderSubComponent={renderSubComponent} isLoading={isLoading} />
        </div>
    )
}
export default Events;