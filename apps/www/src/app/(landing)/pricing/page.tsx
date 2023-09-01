"use client";

import { PricingCard } from "@/components/pricing-card";
import { tiers } from "@/app/_commons/shared";
// import { m } from "framer-motion";
import { motion } from "framer-motion";
import clsx from "clsx";
import Shiny from "@/components/shine-effect";

export default function page() {
  return (
    <div className="relative max-w-full overflow-hidden space-y-4">
      {/* <div className=""> */}
        <Shiny />
      {/* </div> */}
      <div className="relative mx-auto max-w-6xl">
        <h1 className="bg-gradient-to-r from-stone-300 to-stone-400/80 bg-clip-text pb-3 text-center text-4xl font-semibold leading-tight tracking-tight text-transparent sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-relaxed">
          Pricing
        </h1>
      </div>

      <div className=" flex items-center justify-center">
        <p className=" max-w-lg break-words text-center font-medium  italic text-stone-500 mb-20">
          Price is what you pay. <span className=" text-stone-300">Value</span>{" "}
          is what you get. And with <span className=" text-stone-400">us,</span>{" "}
          you&apos;re getting a{" "}
          <span className=" text-orange-300/60">whole</span> lot of value and a{" "}
          <span className=" text-stone-400">few</span> extra
          <span className=" text-yellow-300"> smiles</span> :) thrown in for{" "}
          <span className=" text-stone-300">free</span>
        </p>
      </div>

      <div className=" flex items-start justify-center gap-10">
        {/* <Shiny /> */}
        <div className=" rounded-lg border border-stone-300/10">
          <PricingCard tier={tiers[0]} blurred={false} memberType="starter" />
        </div>

        <div className=" relative rounded-lg border-stone-900 mt-[-40px]">
          <PricingCard tier={tiers[1]} blurred={false} memberType="pro" />
          {/* <ComingSoon /> */}
        </div>
        <div className="rounded-lg border border-stone-900">
          <PricingCard tier={tiers[2]} blurred={false} memberType="plus" />
          {/* <ComingSoon /> */}
        </div>
      </div>
    </div>
  );
}

const ComingSoon = () => {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col  items-center justify-center">
      <h2 className="font-heading bg-gradient-to-tr from-orange-800 to-stone-800 bg-clip-text text-2xl font-bold uppercase leading-6 tracking-wider text-transparent dark:from-stone-100 dark:to-stone-300">
        Coming <span className=" tex-stone-200">soon</span>
      </h2>
    </div>
  );
};
