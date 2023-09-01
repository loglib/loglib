
export  const tiers = [
    {
        name: "Starter",
        href: "/login?from=Starter",
        priceMonthly: "Free",
        priceAnnually:"Free",
        description: "Ideal to get started and for your personal projects.",
        features: [
            "Upto 2 website",
            "Upto 1M page views per month",
            "Upto 10k api requests per month",
            "Team upto 2 members",
        ],
        notIncluded: ["Email Notification"],
    },
    {
        name: "Pro",
        href: "/login?from=Enterprise",
        priceMonthly: "8",
        priceAnnually:"10",
        description:
            "Ideal for businesses of all sizes that need more advanced web analytics features.",
        features: ["2 Websites", "Unlimited Team Member", "1m Monthly Page View (0.5 USD / million events)", "500k Customer Event" , "All Time Reporting Windows" , "50k API Requests / month" , "Monthly Ingested Email"],
        notIncluded: [],
    },
    {
        name: "Plus",
        href: "/login?from=Plus",
        priceMonthly: "50",
        priceAnnually:"Nan",
        description:
            "Ideal for users who needs more kind of custome plan for their purchase method.",
        features: ["Everything on each plan" , "50 Website", "Unlimited Custome Event", "Unlimited API Requests", "Configurable Ingested Email"],
        notIncluded: ["You"],
    }
];