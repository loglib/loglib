import UpgradeEmail from "@/components/emails/upgrade-email";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/resend";
import { stripe } from "@/lib/stripe";
import { getPlanFromPriceId, isNewCustomer } from "@/lib/stripe/plans";
import { schema } from "@loglib/db";
import { eq } from "drizzle-orm";
import Stripe from 'stripe';

const relevantEvents = new Set([
    "checkout.session.completed",
    "customer.subscription.updated",
    "customer.subscription.deleted",
]);

// POST /api/stripe/webhook – listen to Stripe webhooks
export const POST = async (req: Request) => {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature")
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;
    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.log(`❌ Error message: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, {
            status: 400
        })
    }
    if (relevantEvents.has(event.type)) {
        try {
            if (event.type === "checkout.session.completed") {
                const checkoutSession = event.data.object as Stripe.Checkout.Session;
                if (
                    checkoutSession.client_reference_id === null ||
                    checkoutSession.customer === null
                ) {
                    console.log({
                        message: "Missing items in Stripe webhook callback",
                        type: "cron",
                        mention: true,
                    });
                    return;
                }
                // when the project subscribes to a plan, set their stripe customer ID
                // in the database for easy identification in future webhook events
                // also update the billingCycleStart to today's date
                await db.update(schema.users).set({
                    billingCycleStart: new Date().getDate(),
                    stripeId: checkoutSession.customer.toString(),
                }).where(eq(schema.users.id, checkoutSession.client_reference_id))

            } else if (event.type === "customer.subscription.updated") {
                const subscriptionUpdated = event.data.object as Stripe.Subscription;
                const priceId = subscriptionUpdated.items.data[0].price.id;
                const newCustomer = isNewCustomer(event.data.previous_attributes);

                const plan = getPlanFromPriceId(priceId);
                if (!plan) {
                    console.log("Couldn't find the plan with the priceId. [PRICE ID]:", priceId)
                    return;
                }
                const stripeId = subscriptionUpdated.customer.toString();
                const data = await db.update(schema.users).set({
                    plan: plan.slug
                }).where(eq(schema.users.stripeId, stripeId)).returning()
                if (!data) {
                    console.log("User could not found in Stripe webhook `customer.subscription.created` callback")
                    return
                }

                if (newCustomer) {
                    const owner = data[0]
                    await sendEmail({
                        email: owner.email as string,
                        subject: `Thank you for upgrading to Loglib ${plan.name}!`,
                        react: UpgradeEmail({
                            name: owner.name,
                            email: owner.email as string,
                            plan: plan.name,
                        }),
                        marketing: true,
                    });
                }
            } else if (event.type === "customer.subscription.deleted") {
                const subscriptionDeleted = event.data.object as Stripe.Subscription;

                const stripeId = subscriptionDeleted.customer.toString();

                // If a project deletes their subscription.
                const data = await db.query.users.findFirst({
                    where(fields, operators) {
                        return operators.eq(fields.stripeId, stripeId)
                    },
                })

                if (!data) {
                    console.log("Project not found in Stripe webhook `customer.subscription.deleted` callback");
                    return;
                }
                await db.update(schema.users).set({
                    plan: "free"
                }).where(eq(schema.users.stripeId, stripeId))
            }
        } catch (error) {
            console.log(`Stripe webook failed. Error: ${error.message}`)
            return new Response(null, {
                status: 400
            })
        }
    }
    return new Response(JSON.stringify({ recived: true }), {
        status: 200
    })
}