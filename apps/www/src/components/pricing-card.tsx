"use client";

import { motion } from "framer-motion";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import Shiny from "./shine-effect";
import { User } from "next-auth";
import { createCheckoutSession } from "@/server/actions/billing";
import { useRouter } from "next/navigation";

interface Tier {
    name: string;
    href: string;
    priceMonthly: string;
    priceAnnually: string;
    description: string;
    features: string[];
    notIncluded: string[];
}
interface PricingCardProps {
    tier: Tier;
    memberType: string;
    blurred?: boolean;
    user?: User
}
export function PricingCard({ tier, blurred, memberType, user }: PricingCardProps) {
    const router = useRouter()
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
                "bg-gradient-to-br from-slate-900 to-[#080812] relative flex max-w-sm flex-col overflow-hidden rounded-lg shadow-lg ",
                blurred && "blur-md"
            )}
        >
            <div className="bg-stone-50 px-6 py-8 dark:bg-stone-900/80 sm:p-10 sm:pb-6  relative">
                <div>
                    <h3
                        className="text-logo inline-flex rounded-full bg-stone-800 px-4 py-1 text-sm font-semibold uppercase tracking-wide"
                        id="tier-standard"
                    >
                        {tier.name}
                    </h3>
                </div>
                <div className="mt-4 flex items-baseline text-6xl font-extrabold  text-stone-900 dark:text-stone-100">
                    {tier.priceMonthly === "Free" ? (
                        "Free"
                    ) : (
                        <div className="flex flex-col">
                            <div>
                                {tier.name === "Pro" && (
                                    <Tabs defaultValue="account" className="w-[400px]">
                                        <TabsList className="absolute right-2 top-1  bg-transparent">
                                            <TabsTrigger value="account" className="">Monthly</TabsTrigger>
                                            <TabsTrigger value="password">Annually</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="account">
                                            $ {tier.priceMonthly}
                                            <span className="ml-1 text-2xl font-medium text-stone-500">
                                                /mo
                                            </span>
                                        </TabsContent>
                                        <TabsContent value="password">
                                            $ {tier.priceAnnually}
                                            <span className="ml-1 text-2xl font-medium text-stone-500">
                                                /yr
                                            </span>
                                        </TabsContent>
                                    </Tabs>
                                )}
                                <div>
                                    {tier.name === "Plus" && ` \$ ${tier.priceMonthly}`}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <p className="mt-5 text-lg text-stone-500">{tier.description}</p>
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
                            <p className="ml-3 text-base text-stone-700 dark:text-stone-300">
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
                    <a
                        href={tier.href}
                        className=" tex-white  from-logo/10 flex items-center justify-center rounded-md border border-transparent bg-gradient-to-tr to-white/80 px-5 py-3  text-base font-bold hover:bg-stone-950 dark:to-stone-950/80"
                        aria-describedby="tier-standard"
                    >
                        Get started
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
