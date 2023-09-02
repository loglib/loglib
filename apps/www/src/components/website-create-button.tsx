"use client";

import { usageAtom, websiteFormAtom } from "@/jotai/store";
import { useAtom } from "jotai";
import * as React from "react";

import { Icons } from "@/components/icons";
import { Button, ButtonProps } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export function WebsiteCreateButton({ ...props }: ButtonProps) {
    const [, setCreateWebsite] = useAtom(websiteFormAtom);
    const [usage] = useAtom(usageAtom)
    async function onClick() {
        if (usage) {
            const limitReached = usage.websites >= usage.plan.quota.websites
            if (limitReached) {
                return toast({
                    title: `Limit of ${usage.plan.quota.websites} websites reached.`,
                    description: usage.plan.slug === "plus" ? `we currently only support ${usage.plan.quota.websites} websites. If you need more please contact us.` : `Please upgrade to ${usage.plan.slug === "free" ? "Pro or Plus" : "Plus"}`,
                    variant: "destructive",
                });
            }
            setCreateWebsite(true);
        }
    }
    return (
        <Button onClick={onClick} {...props}>
            <Icons.add className="h-4 w-4 " />
            <span className="">New Website</span>
        </Button>
    );
}
