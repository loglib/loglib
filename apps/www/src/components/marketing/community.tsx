"use client";

import { Spacer } from "@nextui-org/react";

import { sectionWrapper, titleWrapper, title, subtitle } from "../primitive";

import { FeaturesGrid } from "./feature-grid";
import { communityAccounts } from "@/lib/constant";
import Background from "../landing/grid-background/background";

export const Community = () => {
  return (
    <section
      className={sectionWrapper({
        class: "flex flex-col items-center mt-16 lg:mt-44",
      })}
    >
      <Background />
      <div className="max-w-4xl flex flex-col gap-8">
        <div>
          <div className={titleWrapper({ class: "items-center" })}>
            <div className="inline-flex items-center">
              <h1 className={title({ size: "lg" })}>Community</h1>&nbsp;&nbsp;
            </div>
          </div>
          <p
            className={subtitle({
              class: "md:w-full text-center flex justify-center items-center",
            })}
          >
            Get involved in our community. Everyone is welcome!
          </p>
          <Spacer y={12} />
          <FeaturesGrid
            classNames={{
              base: "lg:grid-cols-3",
              iconWrapper: "bg-transparent",
              body: "pt-0",
            }}
            features={communityAccounts}
          />
        </div>
      </div>
    </section>
  );
};
