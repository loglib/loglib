"use client"

import { useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

export const LandingNav = () => {
  const { setTheme, theme } = useTheme()
  const switchOnRef = useRef<HTMLAudioElement>(null)
  const switchOffRef = useRef<HTMLAudioElement>(null)
  const pathname = usePathname()
  return (
    <div className="font-outfit relative overflow-hidden rounded-xl [--duration:500ms] [transform:translateZ(0)]">
      <nav className="relative w-full rounded-xl border border-black/10 p-2 dark:border-white/10">
        <div
          className="dark:bg-logo/95 absolute bottom-0 left-0 h-1/2 w-[var(--width)] translate-x-[var(--left)] bg-black/75 blur-xl transition-[width,transform] duration-500"
          style={{
            width: "84.5px",
            left: "0px",
          }}
        ></div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr backdrop-blur-md dark:from-slate-950  dark:to-slate-950/80"></div>
        <div className="relative">
          <div
            className={cn(
              "bg-black/39 dark:bg-logo/30 absolute bottom-0 left-0 h-1/3 w-7 translate-x-2 translate-y-full rounded-full blur-md transition-[width,transform] duration-500",
              pathname === "/" && "translate-x-2",
              pathname === "/pricing" && "translate-x-20",
              pathname === "/who-we-are" && "translate-x-44"
            )}
            style={{
              width: "84.5px",
              left: "0px",
            }}
          ></div>
          <ul className="relative flex items-center gap-4">
            <li className="">
              <Link href="/">
                <button
                  type="button"
                  className={cn(
                    "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                    pathname === "/" && "text-black/80 dark:text-white/75"
                  )}
                >
                  Home
                </button>
              </Link>
            </li>

            <li className="">
              <Link href="/pricing">
                <button
                  type="button"
                  className={cn(
                    "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                    pathname === "/pricing" &&
                      "text-black/80 dark:text-white/75"
                  )}
                >
                  Pricing
                </button>
              </Link>
            </li>
            <li className="">
              <Link href="/who-we-are">
                <button
                  type="button"
                  className={cn(
                    "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                    pathname === "/who-we-are" &&
                      "text-black/80 dark:text-white/75"
                  )}
                >
                  Reach Out
                </button>
              </Link>
            </li>
            <li className="hidden md:block">
              <Link href="https://docs.loglib.io">
                <button
                  type="button"
                  className={cn(
                    "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                    pathname === "/docs" && "text-black/80 dark:text-white/75"
                  )}
                >
                  Docs
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
