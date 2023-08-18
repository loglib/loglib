import { LucideSettings, User2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Website as WebsiteType } from "generated/client";

interface WebsiteProps {
    site: WebsiteType;
    visitors: number;
    key: string;
    setSelected: (id: string) => void;
    setIsOpen: (state: boolean) => void;
}

export function Website({ site, visitors, key, setSelected, setIsOpen }: WebsiteProps) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Card
            key={key}
            className="@container/card border-stone-400/20 bg-gradient-to-tr shadow-sm shadow-orange-800/40 dark:from-black dark:to-stone-900/30"
        >
            <div className="card__layer1"></div>
            <div className="card__layer2"></div>
            <CardHeader className="">
                <div className=" flex items-center justify-between">
                    <h3 className=" font-heading text-2xl font-bold">{site.title}</h3>
                    <LucideSettings
                        className=" cursor-pointer"
                        onClick={() => {
                            setIsOpen(true);
                            setSelected(site.id);
                        }}
                    />
                </div>
                <p className="">{site.url}</p>
            </CardHeader>
            <CardContent className=" flex flex-col @[320px]/card:flex-row @[320px]/card:items-center justify-between gap-2">
                <div>
                    <div className=" flex items-center gap-2 text-orange-400">
                        <User2 size={20} className=" " />
                        <p className="  font-bold">{visitors} Visitors</p>
                    </div>
                </div>
                <Link className=" w-full @[320px]/card:w-fit " href={`/${site.id}`}>
                    <Button
                        variant="outline"
                        className=" w-full @[320px]/card:w-fit"
                        onClick={() => {
                            setIsLoading(true);
                        }}
                    >
                        {isLoading ? (
                            <Icons.spinner className=" h-4 w-4 animate-spin" />
                        ) : (
                            "Go to Dashboard"
                        )}
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}

Website.Skeleton = function WebsiteSkeleton() {
    return (
        <div className="p-4">
            <div className="space-y-3">
                <Skeleton className="h-5 w-2/5" />
                <Skeleton className="h-4 w-4/5" />
            </div>
        </div>
    );
};
