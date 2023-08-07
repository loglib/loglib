import { formatDistanceToNow } from "date-fns";
import { redirect } from "next/navigation";

import { DeleteKeys, GenerateKeys } from "@/components/api-key-generate-buttons";
import { GenerateApiKey } from "@/components/api-key-generate-modal";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const apiKeys = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return redirect("/login");
    }
    const keys = await db.apiKey
        .findMany({
            where: {
                userId: user.id,
            },
        })
        .then((res) => {
            return res.map((key) => ({
                ...key,
                key: key.key.slice(0, 5) + "*".repeat(key.key.length - 7) + key.key.slice(-2),
            }));
        });
    const websites = await db.website.findMany({
        where: {
            userId: user.id,
        },
    });
    return (
        <Card>
            <Card>
                <CardHeader>
                    <CardTitle>API Key</CardTitle>
                    <CardDescription>Manage your api keys here</CardDescription>
                </CardHeader>
                <CardContent>
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
                            {keys.map((key) => (
                                <TableRow key={key.id}>
                                    <TableCell className="font-medium">{key.name}</TableCell>
                                    <TableCell className="font-medium">
                                        {
                                            websites.find((website) => website.id === key.websiteId)
                                                ?.title
                                        }
                                    </TableCell>
                                    <TableCell className=" ll-ctc flex items-center">
                                        <div className="ll-ctc">{key.key}</div>
                                    </TableCell>
                                    <TableCell>{formatDistanceToNow(key.expires)}</TableCell>
                                    <TableCell className=" flex cursor-pointer justify-end">
                                        <DeleteKeys id={key.id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {!keys.length && <TableCaption>No API keys generated yet :)</TableCaption>}
                    </Table>
                </CardContent>
                <CardFooter>
                    <GenerateKeys disabled={!websites.length} />
                </CardFooter>
            </Card>
            <GenerateApiKey websites={websites} />
        </Card>
    );
};

export default apiKeys;
