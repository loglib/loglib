import { PLANS } from "./stripe/plans";


export function getPlanFromSlug(slug: string) {
    const plan = PLANS.find((plan) => plan.slug === slug)
    if (!plan) {
        throw Error("Plan not found!")
    }
    return plan;
}