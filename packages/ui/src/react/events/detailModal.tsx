"use client";

import { Row } from "@tanstack/react-table";
import { EventsWithData } from "@loglib/core";
import {
  Tabs,
  TabsTrigger,
  TabsList,
  TabsContent,
} from "../components/ui/tabs";

const renderSubComponent = ({ row }: { row: Row<EventsWithData[0]> }) => {
  const data = row.original;
  const automaticProperties = {
    Browser: data.browser,
    City: data.city,
    Country: data.country,
    Device: data.device,
    Referrer: data.page?.referrer,
    "Initial Referrer": data.page?.referrer,
    Url: location.protocol + "//" + location.host + data.page?.page,
    "Operating System": data.os,
    "Session Duration":
      data.duration && data.duration > 100
        ? `${Math.floor(data.duration / 60)} min ${data.duration % 60} sec`
        : `${data.duration} sec`,
    "Session Id": data.sessionId,
    "Event Type": data.eventType,
    "User Id": data.visitorId,
    Language: data.language,
    Time: new Date(data.createdAt).toLocaleString(),
  };
  const customProperties = {
    ...data.payload,
  };
  const allProperties = {
    ...automaticProperties,
    ...customProperties,
  };
  return (
    <div className=" tw-w-full dark:tw-border-gray-800 ">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Properties</TabsTrigger>
          <TabsTrigger value="auto">Automatic Properties</TabsTrigger>
          <TabsTrigger value="custom">Custom Properties</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-py-4 tw-px-2 tw-place-content-center ">
            {Object.keys(allProperties).map((key) => {
              return (
                <div
                  className=" tw-flex tw-border-b dark:tw-border-gray-800 tw-py-2 tw-gap-2"
                  key={key}
                >
                  <div className="tw-font-bold">{key}: </div>
                  <div>{allProperties[key as keyof typeof allProperties]}</div>
                </div>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="auto">
          <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-py-4 tw-px-2 tw-place-content-center ">
            {Object.keys(automaticProperties).map((key) => {
              return (
                <div
                  className=" tw-flex tw-border-b dark:tw-border-gray-800 tw-py-2 tw-gap-2"
                  key={key}
                >
                  <div className="tw-font-bold">{key}: </div>
                  <div>
                    {automaticProperties[key as keyof typeof allProperties]}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="custom">
          <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-py-4 tw-px-2 tw-place-content-center ">
            {Object.keys(customProperties).map((key) => {
              return (
                <div
                  className=" tw-flex tw-border-b dark:tw-border-gray-800 tw-py-2 tw-gap-2"
                  key={key}
                >
                  <div className="tw-font-bold">{key}: </div>
                  <div>{customProperties[key]}</div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { renderSubComponent };
