"use client";

import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text: string;
    src?: string;
}

async function copyToClipboardWithMeta(value: string, _meta?: Record<string, unknown>) {
    navigator.clipboard.writeText(value);
}

export const CopyToClipboard = ({
    text,
    src,
    className,
    ...props
}: CopyButtonProps) => {
    const [hasCopied, setHasCopied] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);
    return (
        <button
            type="button"
            className={cn(
                "relative z-20 inline-flex h-8 items-center justify-center rounded-md border-zinc-200 p-2 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100 focus:outline-none dark:text-zinc-100 dark:hover:bg-zinc-800",
                className,
            )}
            onClick={() => {
                copyToClipboardWithMeta(text, {
                    component: src,
                });
                setHasCopied(true);
            }}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
    );
};
