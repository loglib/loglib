"use client";
import React from "react";
import DetailValue from "./DetailValue";


interface KeyValuePairType {
  key: string;
  value: any;
}

function getNestedKeysAndValues(obj: any): KeyValuePairType[] {
  const keysAndValues: KeyValuePairType[] = [];
  function recurse(obj: any, path: string[]) {
    console.log("path ", path);
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "object") {
        recurse(value, [...path, key]);
      } else {
        keysAndValues.push({ key, value });
      }
    }
  }
  recurse(obj, []);
  return keysAndValues;
}

export default function EventTableRow({ event }: { event: EventType }) {
  return (
    <details className="overflow-hidden [&_summary::-webkit-details-marker]:hidden">
      <summary className="grid grid-cols-3 transition cursor-pointer p-4 text-md font-medium text-slate-600">
        <span className="capitalize">{event.eventName}</span>
        <span className="capitalize">{event.eventType}</span>
        <span className="capitalize">{event.pageId}</span>
      </summary>

      <div className="grid sm:grid-cols-3 border-t py-2 bg-slate-600/5 dark:bg-slate-600/30  px-6 gap-6">
        <dl className="sm:divide-y sm:divide-slate-400 dark:sm:divide-slate-600 text-sm font-light text-slate-400 max-w-xs w-full">
          <dt className="font-semibold capitalize p-2 text-slate-800">Payload</dt>
          {
            getNestedKeysAndValues(event.payload).map(({key , value }, i) => (
              <DetailValue key={i} keyName={key} value={value} />
            ))
          }
        </dl>
        <dl className="sm:divide-y sm:divide-slate-400 dark:sm:divide-slate-600 text-sm font-light text-slate-400 max-w-xs w-full">
          <DetailValue keyName={"Total"} value={300} />
          <DetailValue keyName={"City"} value={"+42"} />
          <DetailValue keyName={"Name"} value={"Post"} />
        </dl>
        <dl className="sm:divide-y sm:divide-slate-400 dark:sm:divide-slate-600 text-sm font-light text-slate-400 max-w-xs w-full">
          <DetailValue keyName={"Total"} value={300} />
          <DetailValue keyName={"City"} value={"+42"} />
          <DetailValue keyName={"Name"} value={"Post"} />
        </dl>
      </div>
    </details>
  );
}

export type EventType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  eventName: string;
  eventType: string;
  payload: Record<string, any> | null;
  pageId: string;
  sessionId: string;
  userId: string;
};
