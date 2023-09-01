import { PricingCard } from "@/components/pricing-card";
import { SuccessfulPayment } from "@/components/successful-payment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { PLANS } from "@/lib/stripe/plans";

const tiers = [
    {
        name: "Starter",
        href: "/login?from=api/pricing/",
        priceMonthly: "Free",
        description: "Ideal to get started and for your personal projects.",
        features: [
            "Upto 2 website",
            "Upto 1M page views per month",
            "Upto 10k api requests per month",
            "Team upto 2 members",
        ],
        notIncluded: ["Email Notification"],
        // rome-ignore lint/style/noNonNullAssertion: <explanation>
        priceId: PLANS.find(pl => pl.slug === "pro")?.price.monthly.priceIds.test!
    },
    {
        name: "Pro",
        href: "/login?from=Pro",
        priceMonthly: "24",
        description:
            "Ideal for businesses of all sizes",
        features: ["Unlimited", "Unlimited", "unlimited", "unlimited"],
        notIncluded: [],
        // rome-ignore lint/style/noNonNullAssertion: <explanation>
        priceId: PLANS.find(pl => pl.slug === "pro")?.price.monthly.priceIds.test!
    },
];

const Setting = async ({ params }: { params: { slug: string[] } }) => {
    const user = await getCurrentUser()
    if (!user) {
        throw Error("user not found")
    }
    const route = params.slug[params.slug.length - 1]
    const userWithBillingInfo = await db.query.users.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, user.id)
        },
    })
    const startDate = userWithBillingInfo?.billingCycleStart ?? userWithBillingInfo?.createdAt?.getDate()
    const lastMonth = new Date()
    const thisMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    function getMonthName(date: Date): string {
        const monthNames: string[] = [
            'Jan', 'Feb', 'March', 'April', 'May', 'June',
            'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const monthIndex: number = date.getMonth();
        return monthNames[monthIndex];
    }
    return (
        <section className=" space-y-8">
            <div className="grid gap-1">
                <h1 className="font-heading text-3xl md:text-4xl">Setting</h1>
                <p className="text-muted-foreground text-lg">Manage your account settings</p>
            </div>
            <Card></Card>
            <Tabs defaultValue={route}>
                <TabsList>
                    <TabsTrigger value="billing">
                        Billing
                    </TabsTrigger>
                    <TabsTrigger value="usage">
                        Usage
                    </TabsTrigger>
                    <TabsTrigger value="integration">
                        Integrations
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="billing">
                    <PricingCard tier={tiers[1]} user={user} />
                </TabsContent>
                <TabsContent value="usage">
                    <Card>
                        <CardHeader className=" flex flex-row items-center justify-between">
                            <CardTitle>
                                Usage
                            </CardTitle>
                            <p className=" text-stone-300 text-sm">
                                {`${getMonthName(lastMonth)} ${startDate}`} -  {`${getMonthName(thisMonth)} ${startDate}`}
                            </p>
                        </CardHeader>
                        <CardContent className=" space-y-4">
                            <div>
                                <p className=" font-bold text-stone-300">
                                    Websites
                                </p>
                                <p className=" text-sm mt-2">
                                    1 / 5
                                </p>
                                <Progress
                                    value={10}
                                    className=" max-w-md h-2 mt-2"
                                />
                                <p className=" text-xs mt-2 text-ston-400">
                                    500,000 pageview left
                                </p>
                            </div>
                            <div>
                                <p className=" font-bold text-stone-300">
                                    Pageviews
                                </p>
                                <p className=" text-sm mt-2">
                                    100 / 100,000
                                </p>
                                <Progress
                                    value={10}
                                    className=" max-w-md h-2 mt-2"
                                />
                                <p className=" text-xs mt-2 text-ston-400">
                                    500,000 pageview left
                                </p>
                            </div>
                            <div>
                                <p className=" font-bold text-stone-300">
                                    Custom Events
                                </p>
                                <p className=" text-sm mt-2">
                                    100 / 100,000
                                </p>
                                <Progress
                                    value={10}
                                    className=" max-w-md h-2 mt-2"
                                />
                                <p className=" text-xs mt-2 text-ston-400">
                                    500,000 pageview left
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <SuccessfulPayment />
        </section>
    );
};
export default Setting;
