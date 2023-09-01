export function getPlanFromPriceId(priceId: string) {
    const env =
        process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "production" : "test";
    return PLANS.find(
        (plan) =>
            plan.price.monthly.priceIds[env] === priceId ||
            plan.price.yearly.priceIds[env] === priceId,
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
        name: "Pro",
        slug: "pro",
        quota: [{
            pageViews: 1000000,
            customEvents: 500000,
            apiRequests: 10000
        }],
        price: {
            monthly: {
                amount: 9,
                priceIds: {
                    test: "price_1NlcnyHV96pYRflDSALmp3YI",
                    production: "price_1LodNLAlJJEpqkPVQSrt33Lc",
                },
            },
            yearly: {
                amount: 90,
                priceIds: {
                    test: "price_1NlcnyHV96pYRflDGHVvgiv2",
                    production: "price_1LodNLAlJJEpqkPVRxUyCQgZ",
                },
            },
            usage: {
                amount: 0.5,
                priceIds: {
                    test: "price_1NlcnyHV96pYRflDSALmp3YI",
                    production: "price_1NlclPHV96pYRflDzQtveTaw"
                }
            }
        },
    },
    {
        name: "Plus",
        slug: "plus",
        quota: [{
            pageviews: 99999999999,
            customEvents: 9999999999,
            apiRequest: 99999999999
        }],
        price: {
            monthly: {
                amount: 49,
                priceIds: {
                    test: "price_1NlcpIHV96pYRflDzIysTCFT",
                    production: "price_1NlcphHV96pYRflDM1yq4UpF",
                },
            },
            yearly: {
                amount: 490,
                priceIds: {
                    test: "price_1NlcpJHV96pYRflDVBUgyTYb",
                    production: "price_1NlcphHV96pYRflD6if9VHxO",
                },
            },
        },
    },
];