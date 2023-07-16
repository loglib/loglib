import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "../../env.mjs"
import { Metadata } from "next"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function constructMetadata({
  title = "Loglib -  Privacy first open source beautiful web analytics.",
  description = "Loglib is privacy first open source web analytics you can self host or use our cloud service.",
  image = "https://loglib.io/og.png",
}: {
  title?: string
  description?: string
  image?: string
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@loglib_io",
    },
    icons: "/favicon.ico",
    metadataBase: new URL("https://loglib.io"),
    themeColor: "#000",
  }
}

export function nFormatter(num?: number, digits?: number) {
  if (!num) return "0"
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0"
}

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length - 3)}...`
}

export const getHost = (url: string) => {
  return new URL(url).hostname.match(/[^.]+\.[^.]+$/)?.[0]
}
