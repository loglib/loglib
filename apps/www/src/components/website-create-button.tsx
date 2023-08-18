"use client";

import { userWebsitesAtom, websiteFormAtom } from "@/jotai/store";
import { useAtom } from "jotai";
import * as React from "react";

import { Icons } from "@/components/icons";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function WebsiteCreateButton({ variant, ...props }: ButtonProps) {
    const [websites] = useAtom(userWebsitesAtom);
    const [, setCreateWebsite] = useAtom(websiteFormAtom);
    async function onClick() {
        if (websites.length > 1) {
            return toast({
                title: "Limit of 2 websites reached.",
                description: "We currently only support 2 websites per account.",
                variant: "destructive",
            });
        }
        setCreateWebsite(true);
    }
    return (
        <Button onClick={onClick} {...props}>
            <Icons.add className="h-4 w-4 " />
            <span className="">New Website</span>
        </Button>
    );
}
