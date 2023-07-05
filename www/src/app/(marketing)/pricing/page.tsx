import { motion } from "framer-motion"
import { Quote } from "lucide-react"

import { PricingCard } from "@/components/pricing-card"

const tiers = [
  {
    name: "Starter",
    href: "/login?from=Starter",
    priceMonthly: "Free",
    description: "Ideal for get started with your personal projects.",
    features: [
      "Upto 2 website",
      "Upto 1M page views per month",
      "Upto 10k api requests per month",
      "Only 1 team",
    ],
    notIncluded: ["Custom Email Notification"],
  },
  {
    name: "Pro",
    href: "/login?from=Enterprise",
    priceMonthly: "240k",
    description:
      "Ideal for businesses of all sizes that need more advanced web analytics features.",
    features: ["Unlimited", "Unlimited", "unlimited", "unlimited"],
    notIncluded: [],
  },
]

export default function page() {
  return (
    <div className=" space-y-4">
      <h2 className=" text-center text-6xl font-bold text-slate-400/80">
        Pricing
      </h2>
      <div className=" flex items-center justify-center">
        <p className=" max-w-lg break-words text-center font-medium  text-slate-500">
          _price is what you pay. <span className=" text-slate-300">Value</span>{" "}
          is what you get. And with <span className=" text-slate-400">our</span>{" "}
          prices, you&apos;re getting a{" "}
          <span className=" text-orange-300/60">whole</span> lot of value and a{" "}
          <span className=" text-slate-400">few</span> extra
          <span className=" text-yellow-300"> smiles</span> :) thrown in for{" "}
          <span className=" text-slate-300">free</span>
        </p>
      </div>

      <div className=" flex items-center justify-center gap-10">
        <PricingCard tier={tiers[0]} />
        <PricingCard tier={tiers[1]} blur />
      </div>
    </div>
  )
}
