import { CheckIcon, XIcon } from "lucide-react"

interface Tier {
  name: string
  href: string
  priceMonthly: string
  description: string
  features: string[]
  notIncluded: string[]
}
interface PricingCardProps {
  tier: Tier
  blur?: boolean
}
export function PricingCard({ tier, blur }: PricingCardProps) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="bg-slate-50 px-6 py-8 dark:bg-slate-800/40 sm:p-10 sm:pb-6">
        <div>
          <h3
            className="text-logo inline-flex rounded-full bg-slate-800 px-4 py-1 text-sm font-semibold uppercase tracking-wide"
            id="tier-standard"
          >
            {tier.name}
          </h3>
        </div>
        <div className="mt-4 flex items-baseline text-6xl font-extrabold  text-slate-900 dark:text-slate-100">
          {tier.priceMonthly === "Free" ? (
            "Free"
          ) : (
            <>
              $ {tier.priceMonthly}
              <span className="ml-1 text-2xl font-medium text-slate-500">
                /mo
              </span>
            </>
          )}
        </div>
        <p className="mt-5 text-lg text-slate-500">{tier.description}</p>
      </div>
      <div className="flex flex-1 flex-col justify-between space-y-6 bg-slate-100 px-6 pb-8 pt-6 dark:bg-slate-900/40 sm:p-10 sm:pt-6">
        <ul role="list" className="space-y-4">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <div className="flex-shrink-0">
                <CheckIcon
                  className="h-6 w-6 text-green-500"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-3 text-base text-slate-700 dark:text-slate-300">
                {feature}
              </p>
            </li>
          ))}
          {tier.notIncluded.map((feature) => (
            <li key={feature} className="flex items-start">
              <div className="flex-shrink-0">
                <XIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
              </div>
              <p className="ml-3 text-base text-slate-700 dark:text-slate-300">
                {feature}
              </p>
            </li>
          ))}
        </ul>
        <div className="rounded-md shadow">
          <a
            href={tier.href}
            className=" text-logo  flex items-center justify-center rounded-md border border-transparent bg-gradient-to-tr from-black to-slate-900/60 px-5  py-3 text-base font-bold hover:bg-slate-900"
            aria-describedby="tier-standard"
          >
            Get started
          </a>
        </div>
      </div>
      {blur && (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col  items-center justify-center backdrop-blur-md">
          <h2 className="dark:from-logo/80 bg-gradient-to-tr from-orange-800 to-slate-800 bg-clip-text text-2xl font-bold uppercase leading-6 tracking-wider text-transparent dark:to-slate-300 ">
            Coming soon
          </h2>
          <p className="ml-3 text-base italic text-slate-700 dark:text-slate-300">
            like very very soon!
          </p>
        </div>
      )}
    </div>
  )
}
