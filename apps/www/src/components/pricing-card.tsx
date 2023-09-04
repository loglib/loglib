"use client";

import { motion } from "framer-motion";
import { CheckIcon, XIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { createCheckoutSession } from "@/server/actions/billing";
import Link from "next/link";
import { useState } from "react";
import { PLANS } from "@/lib/stripe/plans";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

interface PricingCardProps {
    tier: typeof PLANS[0]
    user?: User & {
        portalUrl?: string
    }
    currentPlan?: boolean
}
export function PricingCard({ tier, user, currentPlan }: PricingCardProps) {
    const router = useRouter()
    const [annually, setAnnually] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
                "bg-gradient-to-br from-slate-900 border to-[#080812] relative flex max-w-sm flex-col overflow-hidden rounded-lg shadow-lg ",
            )}
        >
            <div className="mx-0 bg-stone-50 px-6 py-8 dark:bg-stone-900/80 sm:p-10 sm:pb-6  relative">
                <div>
                    <h3
                        className="text-logo inline-flex rounded-full bg-stone-800 px-4 py-1 text-sm font-semibold uppercase tracking-wide"
                        id="tier-standard"
                    >
                        {tier.name}
                    </h3>
                </div>
                <div className="mt-4 flex items-baseline text-3xl md:text-6xl font-extrabold  text-stone-900 dark:text-stone-100">
                    {tier.priceMonthly === "Free" ? (
                        "Free"
                    ) : (
                        <div className="flex flex-col">
                            <div>
                                <Tabs defaultValue="monthly" className="w-[400px]"
                                    onValueChange={(v) => {
                                        setAnnually(v === "annually")
                                    }}
                                >
                                    <TabsList className="absolute right-2 top-1  bg-transparent">
                                        <TabsTrigger value="monthly" className="">Monthly</TabsTrigger>
                                        <TabsTrigger value="annually">Annually</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="monthly">
                                        $ {tier.price?.monthly.amount}
                                        <span className="ml-1 text-2xl font-medium text-stone-500">
                                            /mo
                                        </span>
                                    </TabsContent>
                                    <TabsContent value="annually">
                                        $ {tier.price?.yearly.amount}
                                        <span className="ml-1 text-2xl font-medium text-stone-500">
                                            /yr
                                        </span>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    )}

                </div>

                {
                    currentPlan && <Badge className=" mt-2" variant="outline">
                        Current Plan
                    </Badge>
                }
                {
                    annually && !currentPlan && <Badge className=" mt-2" variant="secondary">
                        - 17%
                    </Badge>
                }
                <p className="mt-5 md:text-lg text-sm text-stone-500">{tier.description}</p>
            </div>
            <div className="flex flex-1 flex-col justify-between space-y-6 bg-stone-100 px-6 pb-8 pt-6 dark:bg-stone-950/80 sm:p-10 sm:pt-6">
                <ul role="list" className="space-y-4">
                    {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                                <CheckIcon
                                    className="h-6 w-6 text-green-500"
                                    aria-hidden="true"
                                />
                            </div>
                            <p className="ml-3 text-sm md:text-base text-stone-700 dark:text-stone-300">
                                {feature}
                            </p>
                        </li>
                    ))}
                    {tier.notIncluded.map((feature) => (
                        <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                                <XIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                            </div>
                            <p className="ml-3 text-base text-stone-700 dark:text-stone-300">
                                {feature}
                            </p>
                        </li>
                    ))}
                </ul>
                <div className="rounded-md shadow bg-gradient-to-br from-slate-900 to-#080812">
                    {
                        user ? <button
                            className=" tex-white from-logo/10 flex items-center justify-center rounded-md border border-transparent bg-gradient-to-tr to-white/80 px-5 py-3 transition-all duration-200  text-base font-bold hover:bg-stone-950/90 dark:to-stone-950/80 w-full disabled:opacity-50 disabled:hover:bg-inherit"
                            disabled={currentPlan}
                            onClick={async () => {
                                if (tier.slug === "free" && user.portalUrl) {
                                    router.push(user.portalUrl)
                                }
                                const env =
                                    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "production" : "test";
                                const priceId = annually ? tier.price?.yearly.priceIds[env] : tier.price?.monthly.priceIds[env]
                                const session = await createCheckoutSession(
                                    [{ price: priceId as string, quantity: 1 }]
                                )
                                if (!session?.url) {
                                    return
                                }
                                router.push(session.url)
                            }}
                        >
                            Change Plan
                        </button>
                            :
                            <Link
                                href={tier.href}
                                className=" tex-white  from-logo/10 flex items-center justify-center rounded-md border border-transparent bg-gradient-to-tr to-white/80 px-5 py-3  text-xs md:text-base font-bold hover:bg-stone-950 dark:to-stone-950/80"
                                aria-describedby="tier-standard"
                            >
                                Get started
                            </Link>
                    }

                </div>
            </div>
        </motion.div>
    );
}