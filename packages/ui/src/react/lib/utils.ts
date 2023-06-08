import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
export const fetcher = (url: string) => axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem("ll-token") ?? ""}` } }).then((res) => res.data.data);

export const getTheme = (): "dark" | "light" => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
        return localStorage.getItem("theme") as "light" | "dark";
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
};

export const changeTheme = () => {
    const theme = getTheme();
    if (theme === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
};

export const getUrl = () => {
    let url = "/api/loglib"
    if (process.env.LOGLIB_URL) {
        url = process.env.LOGLIB_URL
    }
    return url
}