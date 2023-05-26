"use client";
import LogoIcon from "./Icon/LogoIcon";
import React, { useEffect } from "react";
import NightModeIcon from "./Icon/NightModeIcon";

export function NavUiComponent() {
  const getTheme = (): "dark" | "light" => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme") as "light" | "dark";
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  };

  const changeTheme = () => {
    const theme = getTheme();
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const theme = getTheme()
    document.documentElement.classList.add(theme);
  }, [0]);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 space-y-2">
        <LogoIcon />
        <h2 className="text-4xl font-bold tracking-tight">LOGLIB</h2>
      </div>
      <div className="lg:flex flex-col justify-center items-center col-span-1 self-center select-none relative">
        <div
          className="border p-4 px-5 rounded-md cursor-pointer border-[#996A6A] hover:bg-gray-100 dark:hover:bg-gray-900 dark:bg-dark shadow-black/70 transition-al duration-300 ease-in-out"
          onClick={changeTheme}
        >
          <NightModeIcon />
        </div>
      </div>
    </div>
  );
}
