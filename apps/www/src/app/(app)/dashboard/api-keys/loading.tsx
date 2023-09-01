import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function LoadingApiKeys() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>API Key</CardTitle>
                <CardDescription>Manage your api keys here</CardDescription>
            </CardHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Name</TableHead>
                        <TableHead className="">Website</TableHead>
                        <TableHead className="">Key</TableHead>
                        <TableHead>Expires In</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">
                            <Skeleton className=" h-6 w-12" />
                        </TableCell>
                        <TableCell className="font-medium">
                            <Skeleton className=" h-6 w-12" />
                        </TableCell>
                        <TableCell className=" ll-ctc flex items-center">
                            <div className="ll-ctc">
                                <Skeleton className=" h-6 w-12" />
                            </div>
                        </TableCell>
                        <TableCell>{<Skeleton className=" h-6 w-12" />}</TableCell>
                        <TableCell className=" flex cursor-pointer justify-end">
                            <Skeleton className=" h-6 w-12" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
}
