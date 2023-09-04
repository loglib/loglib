import { PricingCard } from "@/components/pricing-card";
import { SuccessfulPayment } from "@/components/successful-payment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { PLANS } from "@/lib/stripe/plans";
import { nCommaFormat } from "@/lib/utils";
import { getUsage, mangePayment } from "@/server/actions/billing";
import { Eye, Layout, MousePointerClick } from "lucide-react";
import Link from "next/link";

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
    const { plan, ...usage } = await getUsage(lastMonth, thisMonth, user.id)
    function getMonthName(date: Date): string {
        const monthNames: string[] = [
            'Jan', 'Feb', 'March', 'April', 'May', 'June',
            'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const monthIndex: number = date.getMonth();
        return monthNames[monthIndex];
    }
    const portalUrl = userWithBillingInfo?.stripeId ? await mangePayment(userWithBillingInfo.stripeId) : ""
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
                </TabsList>
                <TabsContent value="billing">
                    <Card>
                        <CardHeader className=" flex flex-row items-center justify-between">
                            <CardTitle>
                                Usage
                            </CardTitle>
                            <p className=" text-stone-300 text-sm">
                                {`${getMonthName(lastMonth)} ${startDate}`} -  {`${getMonthName(thisMonth)} ${startDate}`}
                            </p>
                        </CardHeader>
                        <CardContent className=" flex md:flex-row flex-col md:items-center md:justify-between gap-4">
                            <div className=" flex-grow">
                                <div className=" flex items-center gap-2">
                                    <Layout size={14} />
                                    <p className=" font-bold text-stone-300">
                                        Websites
                                    </p>
                                </div>
                                <p className=" text-sm mt-2">
                                    {usage.websites}/{plan?.quota.websites}
                                </p>
                                <Progress
                                    value={
                                        ((usage.websites / (plan.quota.websites as number)) * 100)
                                    }
                                    className=" h-2 mt-2"
                                />
                                <p className=" text-xs mt-2 text-ston-400">
                                    {plan.quota.websites as number - usage.websites} left
                                </p>
                            </div>
                            <div className=" flex-grow">
                                <div className=" flex items-center gap-2">
                                    <Eye size={16} />
                                    <p className=" font-bold text-stone-300">
                                        Pageviews
                                    </p>
                                </div>

                                <p className=" text-sm mt-2">
                                    {`${nCommaFormat(usage.pageViews)}/${nCommaFormat(plan?.quota.pageViews)}`}
                                </p>
                                <Progress
                                    value={
                                        ((usage.pageViews as number / (plan.quota.pageViews as number)) * 100)
                                    }
                                    className="h-2 mt-2"
                                />
                                <p className=" text-xs mt-2 text-ston-400">
                                    {nCommaFormat(plan.quota.pageViews as number - (usage.pageViews as number))} left
                                </p>
                            </div>
                            <div className=" flex-grow">
                                <div className=" flex items-center gap-2">
                                    <MousePointerClick size={14} />
                                    <p className=" font-bold text-stone-300">
                                        Custom Events
                                    </p>
                                </div>

                                <p className=" text-sm mt-2">
                                    {`${nCommaFormat(usage.customEvents)}/${nCommaFormat(plan?.quota.customEvents)}`}
                                </p>
                                <Progress
                                    value={10}
                                    className=" h-2 mt-2"
                                />
                                <p className=" text-xs mt-2 text-ston-400">
                                    {nCommaFormat(plan.quota.customEvents as number - (usage.customEvents as number))} left
                                </p>
                            </div>

                        </CardContent>
                        <CardFooter>
                            {
                                portalUrl && <Link href={portalUrl}>
                                    <Button>
                                        Manage Billing
                                    </Button>
                                </Link>
                            }
                        </CardFooter>
                    </Card>
                    <div className=" mt-6 flex-col md:flex-row flex items-center gap-8 pb-4">
                        <PricingCard tier={PLANS[0]} user={{
                            ...user,
                            portalUrl
                        }} currentPlan={userWithBillingInfo?.plan === PLANS[0].slug} />
                        <PricingCard tier={PLANS[1]} user={{
                            ...user,
                            portalUrl
                        }} currentPlan={userWithBillingInfo?.plan === PLANS[1].slug} />
                        <PricingCard tier={PLANS[2]} user={{
                            ...user,
                            portalUrl
                        }} currentPlan={userWithBillingInfo?.plan === PLANS[2].slug} />
                    </div>
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
                            <div className=" flex-grow">
                                <div className=" flex items-center gap-2">
                                    <Layout size={14} />
                                    <p className=" font-bold text-stone-300">
                                        Websites
                                    </p>
                                </div>
                                <p className=" text-sm mt-2">
                                    {usage.websites}/{plan?.quota.websites}
                                </p>
                                <Progress
                                    value={
                                        ((usage.websites / (plan.quota.websites as number)) * 100)
                                    }
                                    className=" h-2 mt-2"
                                />
                                <p className=" text-xs mt-2 text-ston-400">
                                    {plan.quota.websites as number - usage.websites} left
                                </p>
                            </div>
                            <div className=" flex-grow">
                                <div className=" flex items-center gap-2">
                                    <Eye size={16} />
                                    <p className=" font-bold text-stone-300">
                                        Pageviews
                                    </p>
                                </div>

                                <p className=" text-sm mt-2">
                                    {`${nCommaFormat(usage.pageViews)}/${nCommaFormat(plan?.quota.pageViews)}`}
                                </p>
                                <Progress
                                    value={
                                        ((usage.pageViews as number / (plan.quota.pageViews as number)) * 100)
                                    }
                                    className="h-2 mt-2"
                                />
                                <p className=" text-xs mt-2 text-ston-400">
                                    {nCommaFormat(plan.quota.pageViews as number - (usage.pageViews as number))} left
                                </p>
                            </div>
                            <div className=" flex-grow">
                                <div className=" flex items-center gap-2">
                                    <MousePointerClick size={14} />
                                    <p className=" font-bold text-stone-300">
                                        Custom Events
                                    </p>
                                </div>

                                <p className=" text-sm mt-2">
                                    {`${nCommaFormat(usage.customEvents)}/${nCommaFormat(plan?.quota.customEvents)}`}
                                </p>
                                <Progress
                                    value={10}
                                    className=" h-2 mt-2"
                                />
                                <p className=" text-xs mt-2 text-ston-400">
                                    {nCommaFormat(plan.quota.customEvents as number - (usage.customEvents as number))} left
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
