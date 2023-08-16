"use client";
import Features from "./features";
import styles from "./features.module.css";
import { motion } from "framer-motion";

export const FeatureAccordion = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className=" space-y-8 md:space-y-16 w-full flex items-center  flex-col justify-center relative"
        >
            <div className=" space-y-6 text-center">
                <h2 className=" font-medium text-3xl encbSy">
                    <span className={styles.magicText}>Beyond</span>{" "}
                    <span className=" ">
                        <span className=" font-bold">the basics</span>
                    </span>
                </h2>

                <p className=" text-slate-300">
                    Loglib is beyond a basic analytics tool, it&apos;s a powerful tool that can help
                    you understand your users and your product better.
                </p>
            </div>

            <Features />
        </motion.div>
    );
};
