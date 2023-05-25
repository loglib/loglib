// "use client"
// import React from "react"
// import {
//     ColumnDef,
//     flexRender,
//     getCoreRowModel,
//     useReactTable,
// } from "@tanstack/react-table"

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "./components/ui/table"
// import { Badge } from "./components/ui/badge"

// type ServerEvents = {
//     id: string
//     name: string
//     type: string
//     payload?: Record<string, string>
//     createdAt: Date
// }

// const events: ServerEvents[] = [
//     {
//         id: "1",
//         name: "Search",
//         type: "manual",
//         payload: { term: "iphone" },
//         createdAt: new Date()
//     },
//     {
//         id: "2",
//         type: "Auto",
//         name: "Add to cart",
//         createdAt: new Date()
//     },
//     {
//         id: "3",
//         name: "Nav Bar",
//         type: "Auto",
//         createdAt: new Date()
//     },
//     {
//         id: "4",
//         name: "Apply",
//         type: "Auto",
//         createdAt: new Date()
//     }
// ]

// const columns: ColumnDef<ServerEvents>[] = [
//     {
//         accessorKey: "createdAt",
//         header: "Date",
//         cell: ({ row }) => {
//             const date: Date = row.getValue("createdAt")
//             return <div className="">
//                 <p>
//                     {date.toLocaleString().split(",")[0]}
//                 </p>
//                 <p className=" text-xs">
//                     {date.toLocaleString().split(",")[1]}
//                 </p>
//             </div>
//         },
//     },
//     {
//         accessorKey: "name",
//         header: "Event Name",
//     },
//     {
//         accessorKey: "type",
//         header: "",
//         cell: ({ row }) => {
//             const type: string = row.getValue("type")
//             return (
//                 <Badge>
//                     {type}
//                 </Badge>
//             )
//         },
//     },
//     // {
//     //     accessorKey: "payload",
//     //     header: "Data",
//     //     cell: ({ row }) => {
//     //         const payload = row.getValue<ServerEvents['payload']>("payload")
//     //         return (
//     //             <Badge>
//     //                 {payload}
//     //             </Badge>
//     //         )
//     //     },
//     // },
// ]

// interface DataTableProps<TData, TValue> {
//     columns: ColumnDef<TData, TValue>[]
//     data: TData[]
// }

// const Events = () => {
//     return (
//         <div>
//             <DataTable columns={columns} data={events} />
//         </div>
//     )
// }

// function DataTable<TData, TValue>({
//     columns,
//     data,
// }: DataTableProps<TData, TValue>) {
//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//     })

//     return (
//         <div className="rounded-md border">
//             <Table>
//                 <TableHeader>
//                     {table.getHeaderGroups().map((headerGroup) => (
//                         <TableRow key={headerGroup.id}>
//                             {headerGroup.headers.map((header) => {
//                                 return (
//                                     <TableHead key={header.id}>
//                                         {header.isPlaceholder
//                                             ? null
//                                             : flexRender(
//                                                 header.column.columnDef.header,
//                                                 header.getContext()
//                                             )}
//                                     </TableHead>
//                                 )
//                             })}
//                         </TableRow>
//                     ))}
//                 </TableHeader>
//                 <TableBody>
//                     {table.getRowModel().rows?.length ? (
//                         table.getRowModel().rows.map((row) => (
//                             <TableRow
//                                 key={row.id}
//                                 data-state={row.getIsSelected() && "selected"}
//                             >
//                                 {row.getVisibleCells().map((cell) => (
//                                     <TableCell key={cell.id}>
//                                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         ))
//                     ) : (
//                         <TableRow>
//                             <TableCell colSpan={columns.length} className="h-24 text-center">
//                                 No results.
//                             </TableCell>
//                         </TableRow>
//                     )}
//                 </TableBody>
//             </Table>
//         </div>
//     )
// }

// export { Events }