"use client"
import { ClipboardCopy } from "lucide-react"
import { toast } from "./ui/use-toast"
import { loglib } from "@loglib/tracker"
import { ReactElement } from "react"
import { Icons } from "./icons"




export const CopyToClipboard = ({ text, children }: { text: string, children?: string | ReactElement }) => {
    return (
        <div className=" flex items-center">
            {children}
            <Icons.clipboard className="ml-2 h-5 w-5 cursor-pointer" onClick={() => {
                navigator.clipboard.writeText(text)
                toast({
                    title: "Copied to clipboard",
                })
            }
            } />
        </div>
    )
}