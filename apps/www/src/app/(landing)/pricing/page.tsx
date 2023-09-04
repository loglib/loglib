"use client";

import { PricingCard } from "@/components/pricing-card";
import { PLANS } from "@/lib/stripe/plans";

export default function page() {
  return (
    <div className="relative max-w-full overflow-hidden space-y-4 ">
      <div className="mx-auto max-w-6xl">
        <h1 className="bg-gradient-to-r from-stone-300 to-stone-400/80 bg-clip-text mb-3 text-center text-4xl font-semibold leading-tight tracking-tight text-transparent sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-relaxed">
          Pricing
        </h1>
      </div>
      <div className=" flex items-center justify-center">
        <p className=" max-w-lg break-words text-center font-medium text-stone-50 mb-10">
          Start For Free. Scale as you grow.
        </p>
      </div>
      {/* <div className="grid grod-col-1 sm:grid-col-1 md:grid-col-2"> */}
        <div className=" flex-col md:flex-row flex items-center md:items-start justify-center space-y-2 md:space-y-0 md:gap-10 ">
          <div className=" rounded-lg border border-stone-300/10">
            <PricingCard tier={PLANS[0]} />
          </div>

          <div className="rounded-lg border-stone-900 mt-[-40px] relative">
            <PricingCard tier={PLANS[1]} />
          </div>
          <div className="rounded-lg border border-stone-900">
            <PricingCard tier={PLANS[2]} />
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}
