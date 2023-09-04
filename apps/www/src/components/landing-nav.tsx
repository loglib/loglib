"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export const LandingNav = ({mobileView}:{mobileView?:boolean}) => {
    const pathname = usePathname();
   if(!mobileView){ return (
        <div className=" sticky top-1 overflow-hidden rounded-xl [--duration:500ms]  [transform:translateZ(0)]">
            <nav className="relative w-full rounded-xl border border-black/10 p-2 dark:border-white/10">
                <div
                    className={cn(
                        "dark:bg-logo/95 absolute bottom-0 left-0 h-1/2 w-[var(--width)] translate-x-2 bg-black/75 blur-xl transition-[width,transform] duration-500",
                        pathname === "/" && "translate-x-2",
                        pathname === "/pricing" && "translate-x-20",
                        pathname?.includes("/changelog") && "translate-x-44",
                        pathname?.includes("/docs") && " translate-x-72",
                    )}
                    style={{
                        width: "84.5px",
                        left: "0px",
                    }}
                ></div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr backdrop-blur-md dark:from-stone-950  dark:to-stone-950/80"></div>
                <div className="relative">
                    <div
                        className={cn(
                            "bg-black/39 dark:bg-logo/30 absolute bottom-0 left-0 h-1/3 w-7 translate-x-2  rounded-full blur-md transition-[width,transform] duration-500",
                            pathname === "/" && "translate-x-2",
                            pathname === "/pricing" && "translate-x-20",
                            pathname?.includes("/changelog") && "translate-x-44",
                            pathname?.includes("/docs") && " translate-x-72",
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
                                        pathname === "/" && "text-black/80 dark:text-white/75",
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
                                        "text-black/6 0 px-4 py-1 text-sm font-light transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                                        pathname === "/pricing" &&
                                        "text-black/80 dark:text-white/75",
                                    )}
                                >
                                    Pricing
                                </button>
                            </Link>
                        </li>

                        <li className="hidden md:block">
                            <Link href="/changelog">
                                <button
                                    type="button"
                                    className={cn(
                                        "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                                        pathname?.includes("/docs") &&
                                        "text-black/80 dark:text-white/75",
                                    )}
                                >
                                    Changelog
                                </button>
                            </Link>
                        </li>
                        <li className="hidden md:block">
                            <Link href="/docs">
                                <button
                                    type="button"
                                    className={cn(
                                        "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                                        pathname?.includes("/docs") &&
                                        "text-black/80 dark:text-white/75",
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
    );
    }
    else{
      return (
        <div className="fixed top-[4rem] left-0 flex justify-center mx-auto w-full py-4  backdrop-blur-sm ">
          <nav className=" w-full  border-b border-black/10 px-2 dark:border-white/10 px-4">

                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr backdrop-blur-md dark:from-stone-950  dark:to-stone-950/80"></div>
                <div className="relative">
                    <div
                        className={cn(
                            "bg-black/39 dark:bg-logo/30 absolute bottom-0 left-1/2  h-1/2 w-2 translate-x-4  rounded-full blur-md transition-[width,transform] duration-500",
                            pathname === "/" && "translate-x-2",
                            pathname === "/pricing" && "translate-x-24",
                            pathname?.includes("/changelog") && "translate-x-48",
                            pathname?.includes("/docs") && " translate-x-72",
                        )}
                        style={{
                            width: "84.5px",
                            left: "0px",
                        }}
                    ></div>
                    <ul className="relative flex items-center justify-center gap-3">
                        <li className="">
                            <Link href="/">
                                <button
                                    type="button"
                                    className={cn(
                                        "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                                        pathname === "/" && "text-black/80 dark:text-white/75",
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
                                        "text-black/6 0 px-4 py-1 text-sm font-light transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                                        pathname === "/pricing" &&
                                        "text-black/80 dark:text-white/75",
                                    )}
                                >
                                    Pricing
                                </button>
                            </Link>
                        </li>

                        <li className="">
                            <Link href="/changelog">
                                <button
                                    type="button"
                                    className={cn(
                                        "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                                        pathname?.includes("/docs") &&
                                        "text-black/80 dark:text-white/75",
                                    )}
                                >
                                    Changelog
                                </button>
                            </Link>
                        </li>
                        <li className="">
                            <Link href="/docs">
                                <button
                                    type="button"
                                    className={cn(
                                        "px-4 py-1 text-sm font-light text-black/60 transition-[text-shadow,color] duration-200 hover:text-black/80 focus:outline-none dark:text-white/60 dark:hover:text-white/75",
                                        pathname?.includes("/docs") &&
                                        "text-black/80 dark:text-white/75",
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

};
{
  /**
   * flex items-center justify-between md:mx-16 sticky top-0 mb-16 z-50 bg-white/60 backdrop-blur-sm dark:bg-stone-950
   */
}
