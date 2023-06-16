import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import PatternBackground from "./pattern";
import { Icons } from "@/components/icons";

export default function LandingPage() {
  return (
    <>
      <section className="relative z-10 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center space-y-5">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary rounded-md blur opacity-50 group-hover:opacity-30 transition duration-500 group-hover:duration-200"></div>
            <Link
              href={siteConfig.links.github}
              className="relative rounded-2xl bg-background dark:bg-neutral-800 border-[1px] px-5 py-1.5 text-xs md:text-sm font-medium"
              target="_blank"
            >
              🎉 Loglib first release is out! check it out →
            </Link>
          </div>
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl animate-text bg-gradient-to-r from-teal-600 via-purple-600 to-orange-600 bg-clip-text text-transparent p-1">
            Yet Another web analytics tool.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Track your app traffics with Loglib - privacy-first web analytics
            tool with a beautiful dashboard built for JS frameworks.
          </p>
          <div className="space-x-4">
            <Link
              href="/docs/get-started/introduction"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <PatternBackground
        width="550"
        className="absolute -mt-44 opacity-20 dark:opacity-30"
      />
      <PatternBackground
        width="550"
        className="hidden lg:block absolute right-0 -mt-44 opacity-20 dark:opacity-30"
      />
      <section
        id="features"
        className="bg-slate-50 dark:bg-transparent container space-y-6 py-8 md:py-12 lg:py-24"
      >
        <div className="relative mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Loglib brings you essential features to track your app traffics with
            ease and give you a better insights about your app.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative group rounded-lg border dark:border-zinc-700">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary rounded-md blur opacity-5 group-hover:opacity-30 transition duration-500 group-hover:duration-200"></div>
            <div className="relative w-80 md:w-auto bg-background dark:bg-zinc-900 flex h-[200px] flex-col justify-between rounded-md p-6">
              <Icons.ship className="w-10 h-10" />
              <div className="space-y-2">
                <h3 className="font-bold">No need to ship separately</h3>
                <p className="text-sm text-muted-foreground">
                  You can easily attach it to your project. No need to deploy
                  loglib separately.
                </p>
              </div>
            </div>
          </div>
          <div className="relative group rounded-lg border dark:border-zinc-700">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary rounded-md blur opacity-5 group-hover:opacity-30 transition duration-500 group-hover:duration-200"></div>
            <div className="relative bg-background dark:bg-zinc-900 flex h-[200px] flex-col justify-between rounded-md p-6">
              <Icons.zap className="w-10 h-10" />
              <div className="space-y-2">
                <h3 className="font-bold">Automatic event tracking</h3>
                <p className="text-sm text-muted-foreground">
                  No more headache-inducing task of adding tracking event codes
                  to your code base.
                </p>
              </div>
            </div>
          </div>
          <div className="relative group rounded-lg border dark:border-zinc-700">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary rounded-md blur opacity-5 group-hover:opacity-30 transition duration-500 group-hover:duration-200"></div>
            <div className="relative bg-background dark:bg-zinc-900 flex h-[200px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Journey Builder</h3>
                <p className="text-sm text-muted-foreground">
                  build a journey using events or page views and get analyzed
                  information about your funnel and your users flow.
                </p>
              </div>
            </div>
          </div>
          <div className="relative group rounded-lg border dark:border-zinc-700">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary rounded-md blur opacity-5 group-hover:opacity-30 transition duration-500 group-hover:duration-200"></div>
            <div className="relative bg-background dark:bg-zinc-900 flex h-[200px] flex-col justify-between rounded-md p-6">
              <Icons.wand2 className="w-10 h-10" />
              <div className="space-y-2">
                <h3 className="font-bold">Quick Setup</h3>
                <p className="text-sm text-muted-foreground">
                  With a fancy cli tool that onboard you, You can be up running
                  without a lot of hassle.
                </p>
              </div>
            </div>
          </div>
          <div className="relative group rounded-lg border dark:border-zinc-700">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary rounded-md blur opacity-5 group-hover:opacity-30 transition duration-500 group-hover:duration-200"></div>
            <div className="relative bg-background dark:bg-zinc-900 flex h-[200px] flex-col justify-between rounded-md p-6">
              <Icons.database className="w-10 h-10" />
              <div className="space-y-2">
                <h3 className="font-bold">Self-Managed Data Storages</h3>
                <p className="text-sm text-muted-foreground">
                  You can keep all your precious data safe and sound on your own
                  database.
                </p>
              </div>
            </div>
          </div>
          <div className="relative group rounded-lg border dark:border-zinc-700">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary rounded-md blur opacity-5 group-hover:opacity-30 transition duration-500 group-hover:duration-200"></div>
            <div className="relative bg-background dark:bg-zinc-900 flex h-[200px] flex-col justify-between rounded-md p-6">
              <Icons.gauge className="w-10 h-10" />
              <div className="space-y-2">
                <h3 className="font-bold">Insightful Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Every log is displayed on a beautiful dashboard to gives you
                  better insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Obviously, It's Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Why keep our tool a secret when sharing is caring... and having more
            developers contributing means fewer bugs for us to fix. 😉
          </p>

          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="flex"
          >
            <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-foreground"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
              <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium dark:bg-neutral-800">
                Give us a star on github
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
