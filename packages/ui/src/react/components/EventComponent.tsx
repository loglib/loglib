"use client";
import React from "react";
import EventTableRow, { EventType } from "./eventTableRow";

export const EventComponent = ({ events }: { events: EventType[] }) => {
  return (
    <div className="rounded-md border ">
      <div className="w-full overflow-auto caption-bottom text-sm">
        <header className="border-b grid grid-cols-3 p-4 text-slate-800">
          <tr>Event Name</tr>
          <tr>Event Type</tr>
          <tr>Current Status</tr>
        </header>
        <main>
          {events.map((e) => (
            <EventTableRow event={e} />
          ))}
        </main>
      </div>
    </div>
  );
};
