"use server"
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session"
import { stripe } from "@/lib/stripe";
import { env } from "env.mjs";
import { queries } from "../query/queries";
import { PLANS } from "@/lib/stripe/plans";

//TODO: look into this
export async function cancelPlan(custmerId: string) {
    try {
        const subscriptionId = await stripe.subscriptions
            .list({
                customer: custmerId,
            })
            .then((res) => res.data[0].id);
        return await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true,
            cancellation_details: {
                comment: "Customer deleted their Loglib Account.",
            },
        });
    } catch (error) {
        console.log("Error cancelling Stripe subscription", error);
        return;
    }
}

export async function createCheckoutSession(priceId: { price: string, quantity?: number }[]) {
    const user = await getCurrentUser()
    if (!user || !user.email) {
        return null
    }
    const url = env.NEXT_PUBLIC_APP_URL
    const data = await stripe.checkout.sessions.create({
        billing_address_collection: "required",
        customer_email: user?.email,
        line_items: priceId,
        mode: 'subscription',
        allow_promotion_codes: true,
        success_url: `${url}/dashboard/settings/billing?success=true`,
        cancel_url: `${url}/dashboard/settings/billing?canceled=true`,
        client_reference_id: user.id
    });
    return JSON.parse(JSON.stringify(data)) as typeof data
}

export async function mangePayment(stripeId: string) {
    const { url } = await stripe.billingPortal.sessions.create({
        customer: stripeId,
        return_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/settings/billing`,
    });
    return url
}

export async function getUsage(startDate: Date, endDate: Date, userId: string) {
    const websites = await db.query.website.findMany({
        where(fields, operators) {
            return operators.eq(fields.userId, userId)
        },
    })
    const user = await db.query.users.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, userId)
        },
    })
    const plan = PLANS.find(p => p.slug === user?.plan)
    if (!websites.length) {
        return {
            customEvents: 0,
            pageViews: 0,
            websites: 0,
            plan: plan ?? PLANS[0]
        }
    }
    const findUsage = await queries.getTotalUsageCount(websites.map(w => w.id), startDate, endDate)

    return {
        ...findUsage,
        websites: websites.length,
        plan: plan ?? PLANS[0]
    }
}
export type Usage = Awaited<ReturnType<typeof getUsage>>