"use client"
import styles from "./section1.module.css"
import { Particles } from "./particles"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { FeatureCards } from "./feature-cards"
export const Section2 = () => {
  return (
    <div className=" space-y-8 md:space-y-16 w-full">
      <section className=" relative w-full flex items-center flex-col">
        <h2 className=" text-xl font-medium mt-4 text-center text-slate-300">
          Privacy-focused web analytics platform for{" "}
          <span className="text-logo">Everyone</span>
          <p className=" text-slate-400">
            Get valuable insights about your website visitors without
            compromising their privacy.
          </p>
        </h2>
        <div className={cn(styles.bg, "border border-slate-900")}>
          <motion.p
            className="absolute top-10 text-center bg-gradient-to-tr from-white to-slate-400 font-medium bg-clip-text text-transparent"
            initial={{ x: "100%" }}
            animate={{ x: "-50%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ whiteSpace: "nowrap" }}
          >
            privacy. analytics. insights. opensource. secure. user-friendly.
            customizable. fast. lightweight. privacy. privacy.
          </motion.p>
          <Particles />
        </div>
      </section>
      <FeatureCards />
    </div>
  )
}
