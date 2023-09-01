'use client'

import {motion} from 'framer-motion'

import clsx from 'clsx'
const Shiny = () => {
    return (
        <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: "100%", opacity: [0, 1, 0, 0] }}
        transition={{
          delay: 1.4,
          duration: 1.84,
          ease: [0.85, 0, 0.15, 1],
        }}
        className="absolute -inset-x-64 inset-y-0 z-[-1]"
      >
        <div
          className={clsx(
            "absolute inset-y-0 w-10 -rotate-45 scale-[4] bg-black opacity-[0.08]",
            "dark:bg-white dark:opacity-[0.14]"
          )}
        />
      </motion.div>
    )
}
export default Shiny;