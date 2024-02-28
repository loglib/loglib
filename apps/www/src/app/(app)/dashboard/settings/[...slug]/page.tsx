import { PricingCard } from "@/components/pricing-card";
import { SuccessfulPayment } from "@/components/successful-payment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { TabModified, TabsContent, TabsList, TabsTrigger } from "@/components/billing-tab";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { PLANS } from "@/lib/stripe/plans";
import { nCommaFormat } from "@/lib/utils";
import { getUsage, mangePayment } from "@/server/actions/billing";
import { Eye, Layout, MousePointerClick } from "lucide-react";
import { getTeams } from "@/server/query";
import { UsageCard } from "@/components/usage-card";
import { getLimit } from "@/lib/limits";

const Setting = async ({ params }: { params: { slug: string[] } }) => {
    const user = await getCurrentUser()
    const teams = await getTeams()
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

    const planLimitTeam = getLimit(userWithBillingInfo?.plan)

    const portalUrl = userWithBillingInfo?.stripeId ? await mangePayment(userWithBillingInfo.stripeId) : ""
    return (
        <section className=" space-y-8">

            <div className="grid gap-1">
                <h1 className="font-heading text-3xl md:text-4xl">Setting</h1>
                <p className="text-muted-foreground text-lg">Manage your account settings</p>
                <Separator className=" mt-4" />
            </div>

            <TabModified defaultValue={route}>
                <TabsList>
                    <TabsTrigger value="billing">
                        Billing
                    </TabsTrigger>
                    <TabsTrigger value="usage">
                        Usage
                    </TabsTrigger>
                </TabsList>
                <Separator className="w-full mb-4 mt-[-3px]" />
                <TabsContent value="billing" className="flex flex-col max-w-[76rem] ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">

                        <UsageCard
                            title="Websites"
                            value={`${usage.websites}/${plan?.quota.websites}`}
                            description={`${plan.quota.websites as number - usage.websites} left`}
                            icon="layout"
                        />
                        <UsageCard
                            title="Custom Events"
                            value={`${nCommaFormat(usage.customEvents)}/${nCommaFormat(plan?.quota.customEvents)}`}
                            description={`${nCommaFormat(plan.quota.pageViews as number - (usage.pageViews as number))} left`}
                            icon="events"
                        />
                        <UsageCard
                            title="Page View"
                            value={`${nCommaFormat(usage.pageViews)}/${nCommaFormat(plan?.quota.pageViews)}`}
                            description={`${nCommaFormat(plan.quota.pageViews as number - (usage.pageViews as number))} left`}
                            icon="mousePointerClick"
                        />
                        <UsageCard
                            title="Teams"
                            value={`${teams.length}`}
                            description={`${userWithBillingInfo?.plan === 'free' ? (`${planLimitTeam - teams.length} left`) : 'Teams Created So Far'} `}
                            icon="users"
                        />
                    </div>

                    {/* <Card>
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
                                    value={
                                        ((usage.customEvents as number / (plan.quota.customEvents as number)) * 100)
                                    }
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
                    </Card> */}
                    <div className=" mt-6 flex-col md:flex-row flex justify-start items-start gap-8 pb-4">
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
                                    value={
                                        ((usage.customEvents as number / (plan.quota.customEvents as number)) * 100)
                                    }
                                    className=" h-2 mt-2"
                                />
                                <p className=" text-xs mt-2 text-ston-400">
                                    {nCommaFormat(plan.quota.customEvents as number - (usage.customEvents as number))} left
                                </p>
                            </div>

                        </CardContent>
                    </Card>
                </TabsContent>
            </TabModified>

            <SuccessfulPayment />
        </section>
    );
};
export default Setting;
