"use client"
import { Check, X } from "lucide-react"
import { Dialog, DialogContent } from "./ui/dialog"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"


export const SuccessfulPayment = () => {
    const searchparams = useSearchParams()
    const success = !!searchparams.get("success")
    const cancel = !!searchparams.get("canceled")
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(success || cancel)
    }, [])
    return (
        <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
            <DialogContent>

                {
                    success ?
                        <div className=" flex items-center gap-2">
                            <Check className=" text-green-700" />
                            <p className=" font-bold">
                                Payment Succeed
                            </p>
                        </div>
                        :
                        <div className=" flex items-center gap-2">
                            <X className=" text-red-700" />
                            <p className=" font-bold">
                                Payment Canceled
                            </p>
                        </div>
                }
            </DialogContent>
        </Dialog>
    )
}