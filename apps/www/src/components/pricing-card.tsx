"use client";

import { motion } from "framer-motion";
import { CheckIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface Tier {
    name: string;
    href: string;
    priceMonthly: string;
    description: string;
    features: string[];
    notIncluded: string[];
}
interface PricingCardProps {
    tier: Tier;
    blur?: boolean;
}
export function PricingCard({ tier, blur }: PricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
                "relative flex max-w-sm flex-col overflow-hidden rounded-lg shadow-lg",
                blur && "blur-md",
            )}
        >
            <div className="bg-slate-50 px-6 py-8 dark:bg-slate-900/80 sm:p-10 sm:pb-6">
                <div>
                    <h3
                        className="text-logo inline-flex rounded-full bg-slate-800 px-4 py-1 text-sm font-semibold uppercase tracking-wide"
                        id="tier-standard"
                    >
                        {tier.name}
                    </h3>
                </div>
                <div className="mt-4 flex items-baseline text-6xl font-extrabold  text-slate-900 dark:text-slate-100">
                    {tier.priceMonthly === "Free" ? (
                        "Free"
                    ) : (
                        <>
                            $ {tier.priceMonthly}
                            <span className="ml-1 text-2xl font-medium text-slate-500">/mo</span>
                        </>
                    )}
                </div>
                <p className="mt-5 text-lg text-slate-500">{tier.description}</p>
            </div>
            <div className="flex flex-1 flex-col justify-between space-y-6 bg-slate-100 px-6 pb-8 pt-6 dark:bg-slate-950/80 sm:p-10 sm:pt-6">
                <ul role="list" className="space-y-4">
                    {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                                <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                            </div>
                            <p className="ml-3 text-base text-slate-700 dark:text-slate-300">
                                {feature}
                            </p>
                        </li>
                    ))}
                    {tier.notIncluded.map((feature) => (
                        <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                                <XIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                            </div>
                            <p className="ml-3 text-base text-slate-700 dark:text-slate-300">
                                {feature}
                            </p>
                        </li>
                    ))}
                </ul>
                <div className="rounded-md shadow">
                    <a
                        href={tier.href}
                        className=" text-logo  from-logo/10 flex items-center justify-center rounded-md border border-transparent bg-gradient-to-tr to-white/80 px-5 py-3  text-base font-bold hover:bg-slate-950 dark:to-slate-950/80"
                        aria-describedby="tier-standard"
                    >
                        Get started
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
