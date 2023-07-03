import { CheckIcon, XIcon } from "lucide-react";

interface Tier {
  name: string;
  href: string;
  priceMonthly: string;
  description: string;
  features: string[];
  notIncluded: string[];
}
interface PricingCardProps {
  tier: Tier;
  blur?: boolean;
}
export function PricingCard({ tier, blur }: PricingCardProps) {
  return (
    <div className="relative flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8 bg-slate-50 dark:bg-slate-950 sm:p-10 sm:pb-6">
        <div>
          <h3
            className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-logo/20 text-logo"
            id="tier-standard"
          >
            {tier.name}
          </h3>
        </div>
        <div className="mt-4 flex items-baseline text-6xl font-extrabold  dark:text-slate-100 text-slate-900">
          {tier.priceMonthly === "Free"
            ? 'Free'
            : <>
              $ {tier.priceMonthly}
              <span className="ml-1 text-2xl font-medium text-slate-500">/mo</span>
            </>}

        </div>
        <p className="mt-5 text-lg text-slate-500">{tier.description}</p>
      </div>
      <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-slate-100 dark:bg-slate-900 space-y-6 sm:p-10 sm:pt-6">
        <ul role="list" className="space-y-4">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <div className="flex-shrink-0">
                <CheckIcon
                  className="h-6 w-6 text-green-500"
                  aria-hidden="true" />
              </div>
              <p className="ml-3 text-base dark:text-slate-300 text-slate-700">
                {feature}
              </p>
            </li>
          ))}
          {tier.notIncluded.map((feature) => (
            <li key={feature} className="flex items-start">
              <div className="flex-shrink-0">
                <XIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
              </div>
              <p className="ml-3 text-base dark:text-slate-300 text-slate-700">
                {feature}
              </p>
            </li>
          ))}
        </ul>
        <div className="rounded-md shadow">
          <a
            href={tier.href}
            className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900"
            aria-describedby="tier-standard"
          >
            Get started
          </a>
        </div>
      </div>
      {blur &&
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md flex  flex-col justify-center items-center">
          <h2 className="text-2xl leading-6 font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">
            Coming soon
          </h2>
          <p className="ml-3 text-base dark:text-slate-300 text-slate-700">
            like very very soon!
          </p>
        </div>}
    </div>
  );
}
