"use client";
import React from "react";
import { CalendarDateRangePicker } from "./datePicker";
import { AnimatePresence, motion } from "framer-motion";

export function TransitionUIComponent({ val }: { val: string; }) {
  return (
    <AnimatePresence>
      {val === "custom" && (
        <motion.div
          layout
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "keyframes",
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <CalendarDateRangePicker />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
