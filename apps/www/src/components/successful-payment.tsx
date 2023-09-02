"use client"
import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useAtom } from "jotai"
import { usageAtom } from "@/jotai/store"
import { toast } from "./ui/use-toast"


export const SuccessfulPayment = () => {
    const [plan] = useAtom(usageAtom)
    const searchparams = useSearchParams()
    const success = !!searchparams.get("success")
    const cancel = !!searchparams.get("canceled")
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        if (success || cancel) {
            toast({
                title: "Payment Succeed",
                description: `Thanks for Subscribing to Loglib ${plan?.plan.name}`
            })
            router.push(pathname)
        }
    }, [])
    return null
}