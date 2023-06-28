"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    Row,
    SortingState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import React, { Fragment } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/react/components/ui/table"
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { TableLoading } from "../components/util/tableLoading"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    renderSubComponent: (props: { row: Row<TData> }) => React.ReactElement,
    isLoading: boolean
}

function DataTable<TData, TValue>({
    columns,
    data,
    renderSubComponent,
    isLoading
}: DataTableProps<TData, TValue>) {
    if (!data.length) {
        <TableLoading cellCount={5} />
    }
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 40,
    })

    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            pagination: pagination,
        },
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: () => {
            //pagination is handled by the load more button
        },
    })


    return (
        <AnimatePresence>
            <p className=" tw-text-sm tw-my-2">
                Showing <strong>
                    {table.getRowModel().rows?.length}</strong> of
                <strong> {data.length} </strong>
                events
            </p>
            <motion.div className="tw-rounded-md tw-border dark:tw-border-gray-800 scrollbar-hide" >
                <div className="tw-flex tw-items-center tw-py-4 tw-px-2">
                    <Input
                        placeholder="Search Events..."
                        value={(table.getColumn("eventName")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("eventName")?.setFilterValue(event.target.value)
                        }
                        className="tw-max-w-sm"
                    />

                </div>
                <Table className=" scrollbar-hide">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <Fragment key={row.id}>
                                    <TableRow
                                        data-state={row.getIsSelected() && "selected"}
                                        onClick={() => row.toggleExpanded()}
                                    >

                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}

                                    </TableRow>
                                    {row.getIsExpanded() && (
                                        <motion.tr
                                            initial={{ opacity: 0.8 }}
                                            animate={{ opacity: 1 }}
                                            tw-transition={{
                                                type: "just",
                                                delay: 0.2,
                                            }}
                                        >
                                            <TableCell colSpan={row.getVisibleCells().length}>
                                                {renderSubComponent({ row })}
                                            </TableCell>
                                        </motion.tr>

                                    )}
                                </Fragment>
                            ))
                        ) : isLoading ? <TableRow className={"tw-h-6 tw-gap-2 tw-bg-gray-200 dark:tw-bg-gray-800 tw-rounded-md tw-animate-pulse"} >
                            <TableCell colSpan={columns.length} className=" tw-h-6 tw-gap-2 tw-bg-gray-200 dark:tw-bg-gray-800 tw-animate-pulse tw-text-center">
                                Loading Data ...
                            </TableCell>
                        </TableRow> : <TableRow>
                            <TableCell colSpan={columns.length} className="tw-h-24 tw-text-center">
                                No results.
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </motion.div>
            <div className=" tw-flex tw-items-center tw-justify-center tw-my-2 tw-gap-6">
                {
                    pagination.pageSize < data.length && (
                        <Button
                            onClick={() => {
                                setPagination({
                                    pageIndex: 0,
                                    pageSize: pagination.pageSize + 40,
                                })
                            }}
                            variant="outline"
                        >
                            Load More
                        </Button>
                    )
                }
            </div>
        </AnimatePresence>
    )
}

export { DataTable }