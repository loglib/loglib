"use client";
import { Icons } from "./icons";
import { toast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";

export const CopyToClipboard = ({
    text,
    children,
    className,
}: { text: string; children?: string | ReactElement; className?: string }) => {
    return (
        <div className=" flex items-center">
            {children}
            <Icons.clipboard
                className={cn("ml-2 h-5 w-5 cursor-pointer", className)}
                onClick={() => {
                    navigator.clipboard.writeText(text);
                    toast({
                        title: "Copied to clipboard",
                    });
                }}
            />
        </div>
    );
};
