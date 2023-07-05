import Link from "next/link"
import { motion } from "framer-motion"
import { Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function page() {
  return (
    <div className=" animate-in">
      <div className=" my-auto flex min-h-[70vh] flex-col items-center justify-center gap-10 space-y-4">
        <h2 className=" text-center text-6xl font-bold text-slate-400/80">
          Reach <span className=" text-slate-400">Out</span>
        </h2>
        <div className=" max-w-md">
          <p className="break-words border-l px-4">
            We&apos;re a small team of two developers from{" "}
            <span className=" font-medium">Addis Ababa,</span>
            <span className=" font-bold text-yellow-500"> Ethiopia </span>
            who enjoy long conversations and building cool things together. If
            you like what we&apos;re doing and want to get in touch, we&apos;d
            love to hear from you.
          </p>
          <div className=" mt-10 ">
            <Link
              href="https://cal.com/loglib/30min"
              className="rounded-sm bg-slate-900 p-3 text-white hover:bg-slate-950 dark:bg-[#cac5c1] dark:text-black dark:hover:bg-gray-300/80"
              id="lets_meet"
            >
              Let&apos;s Meet
            </Link>
            <Button variant="link" className=" gap-2">
              <Twitter size={16} />
              <Link href="https://twitter.com/loglib_io">
                Follow us on Twitter
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
