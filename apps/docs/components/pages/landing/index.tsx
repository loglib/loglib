import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import PatternBackground from "./pattern";
import { Icons } from "@/components/icons";
import Features from "./features";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function LandingPage() {
  return (
    <div>
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
          <h1 className="animate-fade-in font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl animate-text bg-gradient-to-r from-teal-600 via-purple-600 to-orange-600 bg-clip-text text-transparent p-1">
            Yet Another web analytics tool.
          </h1>
          <p className="animate-fade-in max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
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
      <Features />
      <section className="p-20 h-fit hidden md:block">
        <AspectRatio
          className="border-[1px] rounded-lg border-neutral-600"
          ratio={1600 / 900}
        >
          <Image
            className="rounded-lg hidden dark:block"
            src="/dashboard-dark.png"
            alt="dashboard"
            fill={true}
          />
          <Image
            className="rounded-lg dark:hidden"
            src="/dashboard-light.png"
            alt="dashboard"
            fill={true}
          />
        </AspectRatio>
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
    </div>
  );
}
