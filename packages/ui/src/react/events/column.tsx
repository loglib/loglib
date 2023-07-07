"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EventsWithData } from "@loglib/core";
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  UnfoldVertical,
} from "lucide-react";

export const columns: ColumnDef<EventsWithData[0]>[] = [
  {
    id: "expander",
    header: () => <UnfoldVertical />,
    cell: ({ row }) => {
      return (
        <span onClick={() => row.toggleExpanded}>
          {!row.getIsExpanded() ? <ChevronRight /> : <ChevronDown />}
        </span>
      );
    },
  },
  {
    id: "eventName",
    accessorKey: "eventName",
    header: ({ column }) => {
      return (
        <span
          className="tw-flex tw-items-center group tw-gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Name
          <ChevronsUpDown
            className="tw-mr-2 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-ease-in-out"
            size={15}
          />
        </span>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <span
          className="tw-flex tw-items-center group tw-gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ChevronsUpDown
            className="tw-mr-2 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-ease-in-out"
            size={15}
          />
        </span>
      );
    },
    cell: ({ row }) => {
      const currentDate = new Date();
      const eventDate = new Date(row.original.createdAt);
      const diff = currentDate.getTime() - eventDate.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor(diff / 1000);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (days > 0) {
        return `${days} days ago`;
      }
      if (hours > 0) {
        return `${hours} hours ago`;
      }
      if (minutes > 0) {
        return `${minutes} minutes ago`;
      }
      if (seconds > 0) {
        return `${seconds} seconds ago`;
      }
      return "Just now";
    },
  },
  {
    id: "city",
    accessorKey: "city",
    header: ({ column }) => {
      return (
        <span
          className="tw-flex tw-items-center group tw-gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          City
          <ChevronsUpDown
            className="tw-mr-2 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-ease-in-out"
            size={15}
          />
        </span>
      );
    },
  },
  {
    id: "country",
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <span
          className="tw-flex tw-items-center group tw-gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ChevronsUpDown
            className="tw-mr-2 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-ease-in-out"
            size={15}
          />
        </span>
      );
    },
  },
  {
    id: "os",
    accessorKey: "os",
    header: ({ column }) => {
      return (
        <span
          className="tw-flex tw-items-center group tw-gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          OS
          <ChevronsUpDown
            className="tw-mr-2 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-ease-in-out"
            size={15}
          />
        </span>
      );
    },
  },
];
