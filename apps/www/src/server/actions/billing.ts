"use server"

import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/session"
import { stripe } from "@/lib/stripe";
import { env } from "env.mjs";

export async function createCheckoutSession(priceId: string) {
    const user = await getCurrentUser()
    if (!user || !user.email) {
        return null
    }
    const url = env.NEXT_PUBLIC_APP_URL
    const data = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: "required",
        customer_email: user?.email,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        allow_promotion_codes: true,
        success_url: `${url}/dashboard/settings/billing?success=true`,
        cancel_url: `${url}/dashboard/settings/billing?canceled=true`,
        client_reference_id: user.id
    });

    return JSON.parse(JSON.stringify(data)) as typeof data
}