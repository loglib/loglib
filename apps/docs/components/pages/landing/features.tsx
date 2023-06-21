import { Icons } from "@/components/icons";
import React from "react";

type Props = {};

const Features = (props: Props) => {
  return (
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
          <div className="relative md:w-auto bg-background dark:bg-zinc-900 flex h-[200px] flex-col justify-between rounded-md p-6">
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
                No more headache-inducing task of adding tracking event codes to
                your code base.
              </p>
            </div>
          </div>
        </div>
        <div className="relative group rounded-lg border dark:border-zinc-700">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-primary rounded-md blur opacity-5 group-hover:opacity-30 transition duration-500 group-hover:duration-200"></div>
          <div className="relative bg-background dark:bg-zinc-900 flex h-[200px] flex-col justify-between rounded-md p-6">
            <Icons.route className="w-10 h-10" />
            <div className="space-y-2">
              <h3 className="font-bold">Journey Builder</h3>
              <p className="text-sm text-muted-foreground">
                build journey using events & page views and get analyzed
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
  );
};

export default Features;
