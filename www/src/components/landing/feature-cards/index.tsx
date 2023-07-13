"use client"
import styles from "./section1.module.css"
import { Particles } from "./particles"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { FeatureCards } from "./feature-cards"
export const FeatureCard = () => {
  return (
    <div className=" space-y-8 md:space-y-16 w-full">
      <section className=" relative w-full flex items-center flex-col">
        <h2 className=" md:text-xl font-medium mt-4 text-sm text-center text-slate-300">
          Privacy-focused web analytics platform for{" "}
          <span className="text-logo">Everyone</span>
          <p className=" text-slate-400 text-xs md:text-base">
            Get valuable insights about your website visitors without
            compromising their privacy.
          </p>
        </h2>
        <div className={cn(styles.bg, "border border-slate-900 relative")}>
          <div className="absolute inset-0 blur-2xl scale-110 rounded-full animate-spin-slow bg-gradient-to-tl from-slate-800 to-slate-700 opacity-20"></div>
          <motion.p
            className="absolute top-10 text-center bg-gradient-to-tr from-white to-slate-400 font-medium bg-clip-text text-transparent"
            initial={{ x: "100%" }}
            animate={{ x: "-50%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ whiteSpace: "nowrap" }}
          >
            privacy. analytics. insights. open source. secure. user-friendly.
            customizable. fast. lightweight. privacy. privacy.
          </motion.p>
          <Particles />
          <div className=""></div>
        </div>
      </section>
      <FeatureCards />
    </div>
  )
}
