import { XCircle } from "lucide-react"
import React from "react"


export function ClearFilter({ onClick }: { onClick: () => void }) {
    return (
        <div className=" flex gap-1 text-sm my-2 items-center justify-end font-bold cursor-pointer bg-gradient-to-br from-emphasis to-orange-600 text-transparent bg-clip-text"
            onClick={onClick}
        >
            <XCircle size={14} className="  text-orange-600" />
            <p>
                Clear Filter
            </p>
        </div>
    )
}