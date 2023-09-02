export function getPlanFromPriceId(priceId: string) {
    const env =
        process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "production" : "test";
    return PLANS.find(
        (plan) =>
            plan.price?.monthly.priceIds[env] === priceId ||
            plan.price?.yearly.priceIds[env] === priceId,
    );
}

// custom type coercion because Stripe's types are wrong
export function isNewCustomer(
    previousAttributes:
        | {
            default_payment_method?: string;
            items?: {
                data?: {
                    price?: {
                        id?: string;
                    }[];
                };
            };
        }
        | undefined,
) {
    let isNewCustomer = false;
    try {
        if (
            // if the project is upgrading from free to pro
            previousAttributes?.default_payment_method === null
        ) {
            isNewCustomer = true;
        } else {
            // if the project is upgrading from pro to plus
            const oldPriceId =
                //@ts-ignore
                previousAttributes?.items?.data?.[0].price.id;
            if (oldPriceId && getPlanFromPriceId(oldPriceId)?.slug === "pro") {
                isNewCustomer = true;
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
    return isNewCustomer;
}


export const PLANS = [
    {
        name: "Starter",
        slug: "free",
        href: "/login?from=Starter",
        priceMonthly: "Free",
        priceAnnually: "Free",
        description: "Ideal to get started and for your personal projects.",
        features: [
            "2 website",
            "2 Team Members",
            "100k monthly page views",
            "10k Custom Events",
            "3 Month Reporting Window",
            "6 Month Data Retention"
        ],
        notIncluded: [],
        quota: {
            websites: 2,
            pageViews: 100000,
            customEvents: 50000
        }
    },
    {
        name: "Pro",
        slug: "pro",
        href: "/login?from=pro",
        quota: {
            pageViews: 1000000,
            customEvents: 500000,
            websites: 5,
        },
        price: {
            monthly: {
                amount: 9,
                priceIds: {
                    test: "price_1NloHyHV96pYRflDJc4yBfXa",
                    production: "price_1NloLOHV96pYRflDkW6wagin",
                },
            },
            yearly: {
                amount: 90,
                priceIds: {
                    test: "price_1NloHyHV96pYRflD5P8umxhJ",
                    production: "price_1NloLOHV96pYRflDE3ARmlQH",
                },
            },
            // usage: {
            //     amount: 0.5,
            //     priceIds: {
            //         test: "price_1NlgzLHV96pYRflDxQDTA5A8",
            //         production: "price_1NloLOHV96pYRflDE3ARmlQH"
            //     }
            // }
        },
        priceMonthly: "8",
        priceAnnually: "10",
        description:
            "Everything on the free, plus",
        features: ["5 Websites", "Unlimited Team Member", "1 Million Monthly PageView", "500k Custom Events", "All Time Reporting Windows", "Unlimited Monthly Page Views", "Unlimited Data Retention", "50k API Requests", "Monthly Ingested Email"],
        notIncluded: [],
    },
    {
        name: "Plus",
        slug: "plus",
        href: "/login?from=Plus",
        priceMonthly: "50",
        priceAnnually: "Nan",
        description:
            "Everything on the pro, plus",
        features: ["20 Website", "Unlimited Custom Events", "Unlimited API Requests", "Configurable Ingested Email"],
        price: {
            monthly: {
                amount: 49,
                priceIds: {
                    test: "price_1NloIOHV96pYRflDKPqaY2bu",
                    production: "price_1NloKYHV96pYRflDgaGGdUvF",
                },
            },
            yearly: {
                amount: 490,
                priceIds: {
                    test: "price_1NloIOHV96pYRflDmDnnlH6U",
                    production: "price_1NloKYHV96pYRflDYuPYA7TW",
                },
            },
        },
        quota: {
            pageViews: 99999999999,
            customEvents: 9999999999,
            websites: 20,
        },
        notIncluded: [],
    }
];