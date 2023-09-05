"use client";

import { Spacer } from "@nextui-org/react";

import { sectionWrapper, titleWrapper, title, subtitle } from "../primitive";

import { FeaturesGrid } from "./feature-grid";
import { communityAccounts } from "@/lib/social-constant";
import Background from "../landing/grid-background/background";
import styles from "./community.module.css";
export const Community = () => {
  return (
    <section
      className={sectionWrapper({
        class: "flex flex-col items-center mt-16 lg:mt-44",
      })}
    >
      <Background />
      <div className="max-w-full flex flex-col gap-8">
        <div>
          <div className=" space-y-6 text-center mb-[-20px]">
            <h2 className=" font-medium text-3xl encbSy">
              <span className={styles.magicText}>EveryOne is</span>{" "}
              <span className=" ">
                <span className=" font-bold">Welcomed</span>
              </span>
            </h2>
          </div>
          <Spacer y={12} />

          <div className="max-w-6xl">
            <FeaturesGrid
              classNames={{
                base: "lg:grid-cols-4",
                iconWrapper: "bg-transparent",
                body: "pt-0",
              }}
              features={communityAccounts}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
