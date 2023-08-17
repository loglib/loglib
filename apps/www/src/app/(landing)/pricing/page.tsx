import { PricingCard } from "@/components/pricing-card";

const tiers = [
    {
        name: "Starter",
        href: "/login?from=Starter",
        priceMonthly: "Free",
        description: "Ideal to get started and for your personal projects.",
        features: [
            "Upto 2 website",
            "Upto 1M page views per month",
            "Upto 10k api requests per month",
            "Throw in there 1 team",
        ],
        notIncluded: ["Custom Email Notification"],
    },
    {
        name: "Pro",
        href: "/login?from=Enterprise",
        priceMonthly: "240k",
        description:
            "Ideal for businesses of all sizes that need more advanced web analytics features.",
        features: ["Unlimited", "Unlimited", "unlimited", "unlimited"],
        notIncluded: [],
    },
];

export default function page() {
    return (
        <div className=" space-y-4">
            <div className="relative mx-auto max-w-6xl">
                <h1 className="bg-gradient-to-r from-stone-300 to-stone-400/80 bg-clip-text pb-3 text-center text-4xl font-semibold leading-tight tracking-tight text-transparent sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-relaxed">
                    Pricing
                </h1>
            </div>

            <div className=" flex items-center justify-center">
                <p className=" max-w-lg break-words text-center font-medium  italic text-stone-500">
                    Price is what you pay. <span className=" text-stone-300">Value</span> is what
                    you get. And with <span className=" text-stone-400">us,</span> you&apos;re
                    getting a <span className=" text-orange-300/60">whole</span> lot of value and a{" "}
                    <span className=" text-stone-400">few</span> extra
                    <span className=" text-yellow-300"> smiles</span> :) thrown in for{" "}
                    <span className=" text-stone-300">free</span>
                </p>
            </div>

            <div className=" flex items-center justify-center gap-10">
                <div className=" rounded-lg border border-stone-300/10">
                    <PricingCard tier={tiers[0]} />
                </div>

                <div className=" relative">
                    <PricingCard tier={tiers[1]} blur />
                    <ComingSoon />
                </div>
                <div className=" relative">
                    <PricingCard tier={tiers[1]} blur />
                    <ComingSoon />
                </div>
            </div>
        </div>
    );
}

const ComingSoon = () => {
    return (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col  items-center justify-center">
            <h2 className="font-heading bg-gradient-to-tr from-orange-800 to-stone-800 bg-clip-text text-2xl font-bold uppercase leading-6 tracking-wider text-transparent dark:from-stone-100 dark:to-stone-300">
                Coming <span className=" tex-stone-200">soon</span>
            </h2>
        </div>
    );
};
